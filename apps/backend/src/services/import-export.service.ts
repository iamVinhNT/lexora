/**
 * @file import-export.service.ts
 * @description Service for importing, exporting, backing up, restoring, and resetting system data.
 */

import { createHash, randomUUID } from 'node:crypto';
import { sql, eq } from 'drizzle-orm';
import type { AppDatabase } from '../db/client.js';
import {
  words,
  learningProgress,
  reviewStates,
  tags,
  wordTags,
  contexts,
  contextWords,
  learningSessions,
  learningSessionItems,
  learningAttempts,
  reviewLogs,
  collocations,
  examples,
  wordFamilies,
  users,
  studyPreferences,
  studyTasks,
} from '../db/schema.js';
import { normalizeWord } from '../domain/text/normalization.js';
import { groupSessionItems } from '../domain/learning/grouping.js';
import { AppError, ValidationError } from './vocabulary.service.js';
import {
  backupSchema,
  backupV6Schema,
  type ImportPreviewInput,
  type ImportCommitInput,
  type ExportQuery,
  type BackupPayload,
  type ResetInput,
  restoreSchema,
} from '../schemas/data.schema.js';
import { clearGrammarPractice, countGrammarPractice, exportGrammarPractice, restoreGrammarPractice } from './grammar-practice-backup.js';
import { clearReviewAttempts, countReviewAttempts, exportReviewAttempts, restoreReviewAttempts } from '../repositories/review-attempt-backup.repository.js';

export interface RawImportItem {
  word?: string;
  definition?: string;
  translation?: string;
  difficulty?: string;
  phonetic?: string;
  partOfSpeech?: string;
  tags?: string[];
}

export interface ValidImportItem {
  index: number;
  word: string;
  definition: string;
  translation?: string | null;
  difficulty?: string | null;
  phonetic?: string | null;
  partOfSpeech?: string | null;
  tags?: string[];
}

export interface DuplicateImportItem {
  index: number;
  word: string;
  reason: string;
}

export interface InvalidImportItem {
  index: number;
  raw?: unknown;
  reason: string;
}

type InvalidParsedImportItem = {
  __invalidRaw: unknown;
  __reason: string;
};

type ParsedImportItem = RawImportItem | InvalidParsedImportItem;

export interface ImportPreviewResult {
  validItems: ValidImportItem[];
  duplicates: DuplicateImportItem[];
  invalidItems: InvalidImportItem[];
  validCount: number;
  duplicateCount: number;
  invalidCount: number;
  previewToken: string;
}

export interface RestorePreviewResult {
  valid: boolean;
  version: number;
  application: string;
  exportedAt: string;
  tableCounts: Record<string, number>;
  totalRecords: number;
  conflictSummary: {
    existingRecordsCount: number;
    willOverwrite: boolean;
    existingTableCounts: Record<string, number>;
  };
  grammarSummary: {
    includedInBackup: boolean;
    willOverwrite: boolean;
    warning: string | null;
    backupTableCounts: { grammarLessonProgress: number; grammarExerciseAttempts: number };
    existingTableCounts: { grammarLessonProgress: number; grammarExerciseAttempts: number };
  };
  practiceSummary: {
    includedInBackup: boolean; willOverwrite: boolean; warning: string | null;
    backupTableCounts: { grammarPracticeAttempts: number; grammarReviewStates: number };
    existingTableCounts: { grammarPracticeAttempts: number; grammarReviewStates: number };
  };
  adaptiveReviewSummary: {
    includedInBackup: boolean; willOverwrite: boolean; warning: string | null;
    backupTableCounts: { reviewAttempts: number; reviewAttemptRequests: number };
    existingTableCounts: { reviewAttempts: number; reviewAttemptRequests: number };
  };
  calendarSummary: {
    includedInBackup: boolean;
    willOverwrite: boolean;
    backupTaskCount: number;
    existingTaskCount: number;
    willReplacePreferences: boolean;
  };
  previewToken: string;
}

type PreviewAction = 'import' | 'restore';
type PreviewSession = {
  action: PreviewAction;
  fingerprint: string;
  expiresAt: number;
};

const PREVIEW_TOKEN_TTL_MS = 15 * 60 * 1000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isInvalidParsedImportItem(item: ParsedImportItem): item is InvalidParsedImportItem {
  return '__invalidRaw' in item;
}

function fingerprint(action: PreviewAction, payload: string): string {
  return createHash('sha256').update(`${action}\u0000${payload}`, 'utf8').digest('hex');
}

/** Parses RFC-style CSV content and rejects malformed quoting. */
function parseCsv(content: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;
  let closedQuote = false;
  let fieldStarted = false;

  const finishRow = () => {
    currentRow.push(currentField);
    if (currentRow.some((field) => field.trim().length > 0)) rows.push(currentRow);
    currentRow = [];
    currentField = '';
    closedQuote = false;
    fieldStarted = false;
  };

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        currentField += '"';
        i++;
      } else if (char === '"') {
        inQuotes = !inQuotes;
        closedQuote = true;
      } else {
        currentField += char;
      }
      continue;
    }

    if (closedQuote) {
      if (char === ',') {
        currentRow.push(currentField);
        currentField = '';
        closedQuote = false;
        fieldStarted = false;
      } else if (char === '\r' || char === '\n') {
        if (char === '\r' && nextChar === '\n') i++;
        finishRow();
      } else {
        throw new ValidationError('Malformed CSV: unexpected characters after closing quote');
      }
    } else if (char === '"') {
      if (fieldStarted || currentField.length > 0) {
        throw new ValidationError('Malformed CSV: quote must start a field');
      }
      inQuotes = true;
      fieldStarted = true;
    } else if (char === ',') {
      currentRow.push(currentField);
      currentField = '';
      fieldStarted = false;
    } else if (char === '\r' || char === '\n') {
      if (char === '\r' && nextChar === '\n') i++;
      finishRow();
    } else {
      currentField += char;
      fieldStarted = true;
    }
  }

  if (inQuotes) {
    throw new ValidationError('Malformed CSV: unclosed quoted field');
  }

  if (currentField.length > 0 || currentRow.length > 0 || fieldStarted || closedQuote) finishRow();

  return rows;
}

/** Escapes a field for CSV output */
function escapeCsvField(val: unknown): string {
  if (val === null || val === undefined) return '';
  const original = String(val);
  const trimmed = original.trim();
  const str = /^[=+\-@]/.test(trimmed) ? `'${trimmed}` : original;
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export class ImportExportService {
  private readonly previewSessions = new Map<string, PreviewSession>();

  constructor(private db: AppDatabase) {}

  private prunePreviewSessions(now = Date.now()): void {
    for (const [token, session] of this.previewSessions) {
      if (session.expiresAt <= now) this.previewSessions.delete(token);
    }
  }

  private issuePreviewToken(action: PreviewAction, payload: string): string {
    this.prunePreviewSessions();
    const token = randomUUID();
    this.previewSessions.set(token, {
      action,
      fingerprint: fingerprint(action, payload),
      expiresAt: Date.now() + PREVIEW_TOKEN_TTL_MS,
    });
    return token;
  }

  private authorizePreview(action: PreviewAction, token: string, payload: string): void {
    this.prunePreviewSessions();
    const session = this.previewSessions.get(token);
    if (!session || session.action !== action || session.fingerprint !== fingerprint(action, payload)) {
      throw new ValidationError('Preview token is invalid, expired, or does not match this operation payload');
    }
  }

  private consumePreview(action: PreviewAction, token: string, payload: string): void {
    this.authorizePreview(action, token, payload);
    this.previewSessions.delete(token);
  }

  private parseRawContent(format: 'TXT' | 'CSV' | 'JSON', content: string): ParsedImportItem[] {
    if (format === 'TXT') {
      return content
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
        .map((word) => ({ word }));
    }

    if (format === 'CSV') {
      const rows = parseCsv(content);
      if (rows.length === 0) return [];

      const headerNames = new Map([
        ['word', 'word'],
        ['definition', 'definition'],
        ['translation', 'translation'],
        ['difficulty', 'difficulty'],
        ['phonetic', 'phonetic'],
        ['partofspeech', 'partOfSpeech'],
        ['tags', 'tags'],
      ]);
      const headerIndexMap: Record<string, number> = {};
      const unknownHeaders: string[] = [];
      rows[0].forEach((header, idx) => {
        const normalizedHeader = header.trim().toLowerCase();
        const canonicalHeader = headerNames.get(normalizedHeader);
        if (!canonicalHeader) {
          unknownHeaders.push(header);
          return;
        }
        if (canonicalHeader in headerIndexMap) {
          throw new ValidationError(`Malformed CSV: duplicate header "${header}"`);
        }
        headerIndexMap[canonicalHeader] = idx;
      });

      if (!('word' in headerIndexMap) || !('definition' in headerIndexMap)) {
        throw new ValidationError('Malformed CSV: missing required headers "word" and "definition"');
      }
      if (unknownHeaders.length > 0) {
        throw new ValidationError(`Malformed CSV: unknown header "${unknownHeaders[0]}"`);
      }

      const dataRows = rows.slice(1);

      return dataRows.map((cols, rowIndex) => {
        if (cols.length !== rows[0].length) {
          throw new ValidationError(
            `Malformed CSV: row ${rowIndex + 2} has ${cols.length} fields; expected ${rows[0].length}`
          );
        }
        const getCol = (key: string) => cols[headerIndexMap[key]]?.trim();
        const word = getCol('word');
        const definition = getCol('definition');
        if (!word || !definition) {
          throw new ValidationError(`Malformed CSV: row ${rowIndex + 2} requires word and definition values`);
        }

        const rawTags = getCol('tags');
        const parsedTags = rawTags
          ? Array.from(new Set(rawTags.split(/[;,]/).map((t) => t.trim()).filter(Boolean)))
          : undefined;

        return {
          word,
          definition,
          translation: getCol('translation'),
          difficulty: getCol('difficulty'),
          phonetic: getCol('phonetic'),
          partOfSpeech: getCol('partofspeech'),
          tags: parsedTags,
        };
      });
    }

    if (format === 'JSON') {
      let parsed: unknown;
      try {
        parsed = JSON.parse(content);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        throw new ValidationError(`Invalid JSON content: ${message}`);
      }

      if (!Array.isArray(parsed)) {
        throw new ValidationError('JSON import content must be an array of objects');
      }

       return parsed.map((item): ParsedImportItem => {
         if (!isRecord(item)) {
           return { __invalidRaw: item, __reason: 'Row must be a non-null object' };
         }

         const allowedKeys = new Set(['word', 'definition', 'translation', 'difficulty', 'phonetic', 'partOfSpeech', 'tags']);
         const unknownKeys = Object.keys(item).filter((key) => !allowedKeys.has(key));
         if (unknownKeys.length > 0) {
           throw new ValidationError(`Invalid JSON row: unknown key(s) ${unknownKeys.join(', ')}`);
         }

         if (item.definition === undefined || item.definition === null) {
           throw new ValidationError('Invalid JSON row: definition is required');
         }

         const rawTags = item.tags;
         let tags: string[] | undefined;
         if (Array.isArray(rawTags)) {
           if (rawTags.some((tag) => typeof tag !== 'string')) {
             throw new ValidationError('Invalid JSON row: tags must contain only strings');
           }
           tags = Array.from(new Set(rawTags.map((tag) => tag.trim()).filter(Boolean)));
         } else if (typeof rawTags === 'string') {
           tags = Array.from(new Set(rawTags.split(/[;,]/).map((t) => t.trim()).filter(Boolean)));
         } else if (rawTags !== undefined && rawTags !== null) {
           throw new ValidationError('Invalid JSON row: tags must be an array of strings or a string');
         }

        const stringFields = ['word', 'definition', 'translation', 'difficulty', 'phonetic', 'partOfSpeech'];
        for (const f of stringFields) {
           if (item[f] !== undefined && item[f] !== null && typeof item[f] !== 'string') {
             return { __invalidRaw: item, __reason: `Field "${f}" must be a string` };
           }
        }

        return {
          word: typeof item.word === 'string' ? item.word : undefined,
          definition: typeof item.definition === 'string' ? item.definition : undefined,
          translation: typeof item.translation === 'string' ? item.translation : undefined,
          difficulty: typeof item.difficulty === 'string' ? item.difficulty : undefined,
          phonetic: typeof item.phonetic === 'string' ? item.phonetic : undefined,
          partOfSpeech: typeof item.partOfSpeech === 'string' ? item.partOfSpeech : undefined,
          tags,
        };
      });
    }

    throw new ValidationError(`Unsupported import format: ${format}`);
  }

  private calculateImportPreview(input: ImportPreviewInput): Omit<ImportPreviewResult, 'previewToken'> {
    const rawItems = this.parseRawContent(input.format, input.content);

    const validItems: ValidImportItem[] = [];
    const duplicates: DuplicateImportItem[] = [];
    const invalidItems: InvalidImportItem[] = [];

    const seenInFile = new Set<string>();

    for (let index = 0; index < rawItems.length; index++) {
      const item = rawItems[index];

      if (isInvalidParsedImportItem(item)) {
        invalidItems.push({ index, raw: item.__invalidRaw, reason: item.__reason });
        continue;
      }

      if (!item.word || typeof item.word !== 'string' || item.word.trim().length === 0) {
        invalidItems.push({ index, raw: item, reason: 'Word is missing or empty' });
        continue;
      }

      if (
        input.format === 'CSV' &&
        (!item.definition || typeof item.definition !== 'string' || item.definition.trim().length === 0)
      ) {
        invalidItems.push({ index, raw: item, reason: 'Definition is required for CSV import' });
        continue;
      }

      const normalized = normalizeWord(item.word);
      if (!normalized) {
        invalidItems.push({ index, raw: item, reason: 'Word contains no valid alphanumeric characters' });
        continue;
      }

      if (seenInFile.has(normalized)) {
        duplicates.push({ index, word: normalized, reason: 'Duplicate word within import content' });
        continue;
      }
      seenInFile.add(normalized);

      const existingDbWord = this.db
        .select({ id: words.id, word: words.word })
        .from(words)
        .where(sql`lower(${words.word}) = lower(${normalized})`)
        .all()[0];

      if (existingDbWord) {
        duplicates.push({ index, word: normalized, reason: 'Word already exists in database' });
        continue;
      }

      validItems.push({
        index,
        word: normalized,
        definition: typeof item.definition === 'string' ? item.definition.trim() : '',
        translation: typeof item.translation === 'string' && item.translation.trim().length > 0 ? item.translation.trim() : null,
        difficulty: typeof item.difficulty === 'string' && item.difficulty.trim().length > 0 ? item.difficulty.trim() : null,
        phonetic: typeof item.phonetic === 'string' && item.phonetic.trim().length > 0 ? item.phonetic.trim() : null,
        partOfSpeech: typeof item.partOfSpeech === 'string' && item.partOfSpeech.trim().length > 0 ? item.partOfSpeech.trim() : null,
        tags: item.tags,
      });
    }

    return {
      validItems,
      duplicates,
      invalidItems,
      validCount: validItems.length,
      duplicateCount: duplicates.length,
      invalidCount: invalidItems.length,
    };
  }

  previewImport(input: ImportPreviewInput): ImportPreviewResult {
    return {
      ...this.calculateImportPreview(input),
      previewToken: this.issuePreviewToken('import', `${input.format}\u0000${input.content}`),
    };
  }

  commitImport(input: ImportCommitInput): { importedCount: number; wordIds: string[] } {
    const tokenPayload = `${input.format}\u0000${input.content}`;
    this.authorizePreview('import', input.previewToken, tokenPayload);
    const preview = this.calculateImportPreview({ format: input.format, content: input.content });
    this.consumePreview('import', input.previewToken, tokenPayload);

    const selectedSet = input.selectedIndices ? new Set(input.selectedIndices) : null;
    const toCommit = selectedSet
      ? preview.validItems.filter((item) => selectedSet.has(item.index))
      : preview.validItems;

    if (toCommit.length === 0) {
      return { importedCount: 0, wordIds: [] };
    }

    const wordIds: string[] = [];

    this.db.transaction((tx) => {
      const now = new Date().toISOString();

      for (const item of toCommit) {
        const wordId = randomUUID();
        wordIds.push(wordId);

        tx.insert(words)
          .values({
            id: wordId,
            word: item.word,
            definition: item.definition || '',
            translation: item.translation ?? null,
            difficulty: item.difficulty ?? null,
            phonetic: item.phonetic ?? null,
            partOfSpeech: item.partOfSpeech ?? null,
            createdAt: now,
            updatedAt: now,
          })
          .run();

        tx.insert(learningProgress)
          .values({
            id: randomUUID(),
            wordId,
            status: 'NEW',
            recognitionScore: 0,
            recallScore: 0,
            productionScore: 0,
            lastStudiedAt: null,
            updatedAt: now,
          })
          .run();

        tx.insert(reviewStates)
          .values({
            id: randomUUID(),
            wordId,
            interval: 0,
            easeFactor: 2.5,
            repetitions: 0,
            lapses: 0,
            dueAt: now,
            lastReviewedAt: null,
          })
          .run();

        if (item.tags && item.tags.length > 0) {
          const uniqueTags = Array.from(new Set(item.tags.map((t) => t.trim()).filter(Boolean)));
          for (const tagName of uniqueTags) {
            let tag = tx.select().from(tags).where(eq(tags.name, tagName)).all()[0];
            if (!tag) {
              const tagId = randomUUID();
              tx.insert(tags).values({ id: tagId, name: tagName, createdAt: now }).run();
              tag = { id: tagId, name: tagName, createdAt: now };
            }
            tx.insert(wordTags).values({ wordId, tagId: tag.id }).run();
          }
        }
      }
    });

    return { importedCount: toCommit.length, wordIds };
  }

  exportData(query: ExportQuery) {
    const allWords = this.db.select().from(words).all();
    const allWordTags = this.db.select().from(wordTags).all();
    const allTags = this.db.select().from(tags).all();

    const tagMap = new Map(allTags.map((t) => [t.id, t.name]));
    const wordTagsMap = new Map<string, string[]>();
    for (const wt of allWordTags) {
      const tagName = tagMap.get(wt.tagId);
      if (tagName) {
        const list = wordTagsMap.get(wt.wordId) ?? [];
        list.push(tagName);
        wordTagsMap.set(wt.wordId, list);
      }
    }

    const wordRecords = allWords.map((w) => ({
      ...w,
      tags: wordTagsMap.get(w.id) ?? [],
    }));

    if (query.format === 'CSV') {
      const headers = ['word', 'definition', 'translation', 'difficulty', 'phonetic', 'partOfSpeech', 'tags'];
      const lines = [headers.join(',')];

      for (const w of wordRecords) {
        lines.push(
          [
            escapeCsvField(w.word),
            escapeCsvField(w.definition),
            escapeCsvField(w.translation),
            escapeCsvField(w.difficulty),
            escapeCsvField(w.phonetic),
            escapeCsvField(w.partOfSpeech),
            escapeCsvField(w.tags.join(';')),
          ].join(',')
        );
      }

      return {
        format: 'CSV',
        scope: query.scope,
        content: lines.join('\n'),
      };
    }

    if (query.scope === 'all') {
      const backup = this.getBackup();
      return {
        format: 'JSON',
        scope: 'all',
        version: backup.version,
        data: backup.data,
      };
    }

    return {
      format: 'JSON',
      scope: query.scope,
      items: wordRecords,
    };
  }

  getBackup(): BackupPayload {
    const data = this.db.transaction((tx) => {
      const grammarLessonProgress = this.db.sqlite.prepare(`
        SELECT lesson_id AS lessonId, revision_id AS revisionId, revision, last_position AS lastPosition,
          is_complete AS isComplete, completed_at AS completedAt, created_at AS createdAt, updated_at AS updatedAt
        FROM grammar_lesson_progress
      `).all() as Array<{ lessonId: string; revisionId: string; revision: string; lastPosition: number; isComplete: number; completedAt: string | null; createdAt: string; updatedAt: string }>;
      const grammarExerciseAttempts = this.db.sqlite.prepare(`
        SELECT id, lesson_id AS lessonId, revision_id AS revisionId, revision, exercise_id AS exerciseId,
          request_id AS requestId, answer, is_correct AS isCorrect, feedback, created_at AS createdAt,
          study_task_id AS studyTaskId, completed_lesson AS completedLesson
        FROM grammar_exercise_attempts
      `).all() as Array<{ id: string; lessonId: string; revisionId: string; revision: string; exerciseId: string; requestId: string; answer: string; isCorrect: number; feedback: string; createdAt: string; studyTaskId: string | null; completedLesson: number }>;
      return {
        users: tx.select().from(users).all(),
        words: tx.select().from(words).all(),
        wordFamilies: tx.select().from(wordFamilies).all(),
        collocations: tx.select().from(collocations).all(),
        examples: tx.select().from(examples).all(),
        contexts: tx.select().from(contexts).all(),
        contextWords: tx.select().from(contextWords).all(),
        learningProgress: tx.select().from(learningProgress).all(),
        reviewStates: tx.select().from(reviewStates).all(),
        reviewLogs: tx.select().from(reviewLogs).all(),
        tags: tx.select().from(tags).all(),
        wordTags: tx.select().from(wordTags).all(),
        learningSessions: tx.select().from(learningSessions).all(),
        learningSessionItems: tx.select().from(learningSessionItems).all(),
        learningAttempts: tx.select().from(learningAttempts).all(),
        grammarLessonProgress: grammarLessonProgress.map((row) => ({ ...row, isComplete: Boolean(row.isComplete) })),
        grammarExerciseAttempts: grammarExerciseAttempts.map((row) => ({ ...row, answer: JSON.parse(row.answer), isCorrect: Boolean(row.isCorrect), completedLesson: Boolean(row.completedLesson) })),
        ...exportGrammarPractice(this.db.sqlite),
        studyPreferences: tx.select().from(studyPreferences).all(),
        studyTasks: tx.select().from(studyTasks).all(),
        ...exportReviewAttempts(this.db.sqlite),
      };
    });
    return backupV6Schema.parse({ version: 6, exportedAt: new Date().toISOString(), application: 'Lexora', data });
  }

  previewRestore(backupPayload: unknown): RestorePreviewResult {
    const validated = backupSchema.parse(backupPayload);
    const { data } = validated;
    const grammarLessonProgress = 'grammarLessonProgress' in data ? data.grammarLessonProgress : [];
    const grammarExerciseAttempts = 'grammarExerciseAttempts' in data ? data.grammarExerciseAttempts : [];
    const studyTasksCount = 'studyTasks' in data ? data.studyTasks.length : 0;
    const studyPreferencesCount = 'studyPreferences' in data ? data.studyPreferences.length : 0;
    const tableCounts: Record<string, number> = {
      users: data.users.length, words: data.words.length, wordFamilies: data.wordFamilies.length,
      collocations: data.collocations.length, examples: data.examples.length, contexts: data.contexts.length,
      contextWords: data.contextWords.length, learningProgress: data.learningProgress.length,
      reviewStates: data.reviewStates.length, reviewLogs: data.reviewLogs.length, tags: data.tags.length,
      wordTags: data.wordTags.length, learningSessions: data.learningSessions.length,
      learningSessionItems: data.learningSessionItems.length,
      learningAttempts: 'learningAttempts' in data ? data.learningAttempts.length : 0,
      grammarLessonProgress: grammarLessonProgress.length, grammarExerciseAttempts: grammarExerciseAttempts.length,
      grammarPracticeAttempts: 'grammarPracticeAttempts' in data ? data.grammarPracticeAttempts.length : 0,
      grammarReviewStates: 'grammarReviewStates' in data ? data.grammarReviewStates.length : 0,
      reviewAttempts: 'reviewAttempts' in data ? data.reviewAttempts.length : 0,
      reviewAttemptRequests: 'reviewAttemptRequests' in data ? data.reviewAttemptRequests.length : 0,
      studyPreferences: studyPreferencesCount, studyTasks: studyTasksCount,
    };
    const existingTableCounts: Record<string, number> = {
      users: this.db.select().from(users).all().length, words: this.db.select().from(words).all().length,
      wordFamilies: this.db.select().from(wordFamilies).all().length, collocations: this.db.select().from(collocations).all().length,
      examples: this.db.select().from(examples).all().length, contexts: this.db.select().from(contexts).all().length,
      contextWords: this.db.select().from(contextWords).all().length, learningProgress: this.db.select().from(learningProgress).all().length,
      reviewStates: this.db.select().from(reviewStates).all().length, reviewLogs: this.db.select().from(reviewLogs).all().length,
      tags: this.db.select().from(tags).all().length, wordTags: this.db.select().from(wordTags).all().length,
      learningSessions: this.db.select().from(learningSessions).all().length,
      learningSessionItems: this.db.select().from(learningSessionItems).all().length,
      learningAttempts: this.db.select().from(learningAttempts).all().length,
      grammarLessonProgress: Number((this.db.sqlite.prepare('SELECT count(*) AS count FROM grammar_lesson_progress').get() as { count: number }).count),
      grammarExerciseAttempts: Number((this.db.sqlite.prepare('SELECT count(*) AS count FROM grammar_exercise_attempts').get() as { count: number }).count),
      ...countGrammarPractice(this.db.sqlite),
      ...countReviewAttempts(this.db.sqlite),
      studyPreferences: this.db.select().from(studyPreferences).all().length,
      studyTasks: this.db.select().from(studyTasks).all().length,
    };
    const existingRecordsCount = Object.values(existingTableCounts).reduce((acc, count) => acc + count, 0);
    const includesGrammar = validated.version >= 3;

    return {
      valid: true,
      version: validated.version,
      application: validated.application,
      exportedAt: validated.exportedAt,
      tableCounts,
      totalRecords: Object.values(tableCounts).reduce((acc, count) => acc + count, 0),
      conflictSummary: { existingRecordsCount, willOverwrite: existingRecordsCount > 0, existingTableCounts },
      grammarSummary: {
        includedInBackup: includesGrammar,
        willOverwrite: true,
        warning: includesGrammar ? null : 'This backup does not contain grammar progress or attempts; restoring it will clear current grammar data.',
        backupTableCounts: { grammarLessonProgress: grammarLessonProgress.length, grammarExerciseAttempts: grammarExerciseAttempts.length },
        existingTableCounts: {
          grammarLessonProgress: existingTableCounts.grammarLessonProgress,
          grammarExerciseAttempts: existingTableCounts.grammarExerciseAttempts,
        },
      },
      practiceSummary: {
        includedInBackup: validated.version >= 5, willOverwrite: true,
        warning: validated.version >= 5 ? null : 'This older backup has no grammar practice reviews or outputs; restore clears current practice evidence.',
        backupTableCounts: { grammarPracticeAttempts: tableCounts.grammarPracticeAttempts, grammarReviewStates: tableCounts.grammarReviewStates },
        existingTableCounts: { grammarPracticeAttempts: existingTableCounts.grammarPracticeAttempts, grammarReviewStates: existingTableCounts.grammarReviewStates },
      },
      adaptiveReviewSummary: {
        includedInBackup: validated.version >= 6, willOverwrite: true,
        warning: validated.version >= 6 ? null : 'This older backup has no adaptive review attempts or receipts; restoring it clears current adaptive review evidence.',
        backupTableCounts: { reviewAttempts: tableCounts.reviewAttempts, reviewAttemptRequests: tableCounts.reviewAttemptRequests },
        existingTableCounts: { reviewAttempts: existingTableCounts.reviewAttempts, reviewAttemptRequests: existingTableCounts.reviewAttemptRequests },
      },
      calendarSummary: {
        includedInBackup: validated.version >= 4,
        willOverwrite: true,
        backupTaskCount: studyTasksCount,
        existingTaskCount: existingTableCounts.studyTasks,
        willReplacePreferences: true,
      },
      previewToken: this.issuePreviewToken('restore', JSON.stringify(validated)),
    };
  }

  restoreBackup(input: unknown): { restored: boolean } {
    if (!input || typeof input !== 'object' || !('confirm' in input) || input.confirm !== true) {
      throw new ValidationError('Confirmation required: confirm must be true');
    }
    const validated = restoreSchema.parse(input);
    const backupRepresentation = JSON.stringify(validated.backup);
    this.authorizePreview('restore', validated.previewToken, backupRepresentation);
    this.consumePreview('restore', validated.previewToken, backupRepresentation);
    const { data } = validated.backup;

    this.db.transaction((tx) => {
      clearReviewAttempts(this.db.sqlite);
      clearGrammarPractice(this.db.sqlite);
      tx.run(sql`DELETE FROM grammar_exercise_attempts`);
      tx.run(sql`DELETE FROM grammar_lesson_progress`);
      tx.delete(learningAttempts).run();
      tx.delete(learningSessionItems).run();
      tx.delete(learningSessions).run();
      tx.delete(reviewLogs).run();
      tx.delete(studyTasks).run();
      tx.delete(studyPreferences).run();
      tx.delete(reviewStates).run();
      tx.delete(learningProgress).run();
      tx.delete(wordTags).run();
      tx.delete(tags).run();
      tx.delete(contextWords).run();
      tx.delete(contexts).run();
      tx.delete(examples).run();
      tx.delete(collocations).run();
      tx.delete(wordFamilies).run();
      tx.delete(words).run();
      tx.delete(users).run();
      if (validated.backup.version === 4 || validated.backup.version === 5 || validated.backup.version === 6) {
        const calendarData = validated.backup.data;
        for (const preference of calendarData.studyPreferences) tx.insert(studyPreferences).values(preference).run();
        for (const task of calendarData.studyTasks) tx.insert(studyTasks).values({ ...task, transferredToTaskId: null }).run();
        for (const task of calendarData.studyTasks) {
          if (task.transferredToTaskId !== null) {
            tx.update(studyTasks).set({ transferredToTaskId: task.transferredToTaskId }).where(eq(studyTasks.id, task.id)).run();
          }
        }
      }

      for (const u of data.users) tx.insert(users).values(u).run();
      for (const w of data.words) tx.insert(words).values(w).run();
      for (const wf of data.wordFamilies) tx.insert(wordFamilies).values(wf).run();
      for (const col of data.collocations) tx.insert(collocations).values(col).run();
      for (const ex of data.examples) tx.insert(examples).values(ex).run();
      for (const ctx of data.contexts) tx.insert(contexts).values(ctx).run();
      for (const cw of data.contextWords) tx.insert(contextWords).values(cw).run();
      for (const t of data.tags) tx.insert(tags).values(t).run();
      for (const wt of data.wordTags) tx.insert(wordTags).values(wt).run();
      for (const lp of data.learningProgress) tx.insert(learningProgress).values(lp).run();
      for (const rs of data.reviewStates) tx.insert(reviewStates).values(rs).run();
      for (const rl of data.reviewLogs) tx.insert(reviewLogs).values({ ...rl, studyTaskId: 'studyTaskId' in rl ? rl.studyTaskId : null }).run();
      for (const ls of data.learningSessions) tx.insert(learningSessions).values({
        ...ls,
        status: ls.status ?? (ls.completedAt ? 'COMPLETED' : 'IN_PROGRESS'),
        studyTaskId: 'studyTaskId' in ls ? ls.studyTaskId : null,
      }).run();
      const wordsById = new Map(data.words.map((word) => [word.id, word]));
      const sessionItemsBySession = new Map<string, typeof data.learningSessionItems>();
      for (const item of data.learningSessionItems) {
        const items = sessionItemsBySession.get(item.sessionId) ?? [];
        items.push(item);
        sessionItemsBySession.set(item.sessionId, items);
      }
      for (const items of sessionItemsBySession.values()) {
        const legacyItems = items.map((item) => ({ id: item.id, difficulty: wordsById.get(item.wordId)?.difficulty }));
        const assignments = groupSessionItems(legacyItems).flat();
        const assignmentsById = new Map(assignments.map((assignment) => [assignment.id, assignment]));
        for (const item of items) {
          const assignment = assignmentsById.get(item.id);
          tx.insert(learningSessionItems).values({ ...item, position: item.position ?? assignment?.position ?? 0, groupIndex: item.groupIndex ?? assignment?.groupIndex ?? 0 }).run();
        }
      }
      for (const attempt of ('learningAttempts' in data ? data.learningAttempts : [])) tx.insert(learningAttempts).values(attempt).run();

      if (validated.backup.version === 3 || validated.backup.version === 4 || validated.backup.version === 5 || validated.backup.version === 6) {
        const insertLesson = this.db.sqlite.prepare(`
          INSERT INTO grammar_lesson_progress (lesson_id, revision_id, revision, last_position, is_complete, completed_at, created_at, updated_at)
          VALUES (@lessonId, @revisionId, @revision, @lastPosition, @isComplete, @completedAt, @createdAt, @updatedAt)
        `);
        for (const row of validated.backup.data.grammarLessonProgress) insertLesson.run({ ...row, isComplete: Number(row.isComplete) });
        const insertAttempt = this.db.sqlite.prepare(`
          INSERT INTO grammar_exercise_attempts
            (id, lesson_id, revision_id, revision, exercise_id, request_id, answer, is_correct, feedback, created_at, study_task_id, completed_lesson)
          VALUES (@id, @lessonId, @revisionId, @revision, @exerciseId, @requestId, @answer, @isCorrect, @feedback, @createdAt, @studyTaskId, @completedLesson)
        `);
        for (const row of validated.backup.data.grammarExerciseAttempts) insertAttempt.run({
          ...row, answer: JSON.stringify(row.answer), isCorrect: Number(row.isCorrect),
          studyTaskId: 'studyTaskId' in row ? row.studyTaskId : null,
          completedLesson: 'completedLesson' in row ? Number(row.completedLesson) : 0,
        });
      }
      if (validated.backup.version === 5 || validated.backup.version === 6) restoreGrammarPractice(this.db.sqlite, validated.backup.data);
      if (validated.backup.version === 6) restoreReviewAttempts(this.db.sqlite, validated.backup.data);

      const foreignKeyViolations = this.db.sqlite.prepare('PRAGMA foreign_key_check').all();
      if (foreignKeyViolations.length > 0) throw new Error('Restored backup violates foreign keys');
    });

    return { restored: true };
  }

  resetData(input: ResetInput): { reset: boolean; scope: 'progress' | 'all' } {
    if (!input || input.confirm !== true) {
      throw new ValidationError('Confirmation required: confirm must be true');
    }

    const now = new Date().toISOString();

    if (input.scope === 'progress') {
      this.db.transaction((tx) => {
        clearReviewAttempts(this.db.sqlite);
        clearGrammarPractice(this.db.sqlite);
        tx.delete(learningSessionItems).run();
        tx.delete(learningSessions).run();
        tx.run(sql`DELETE FROM grammar_exercise_attempts`);
        tx.run(sql`DELETE FROM grammar_lesson_progress`);
        tx.delete(reviewLogs).run();
        tx.delete(studyTasks).run();

        tx.update(learningProgress)
          .set({
            status: 'NEW',
            recognitionScore: 0,
            recallScore: 0,
            productionScore: 0,
            lastStudiedAt: null,
            updatedAt: now,
          })
          .run();

        tx.update(reviewStates)
          .set({
            interval: 0,
            easeFactor: 2.5,
            repetitions: 0,
            lapses: 0,
            dueAt: now,
            lastReviewedAt: null,
          })
          .run();
      });

      return { reset: true, scope: 'progress' };
    }

    if (input.scope === 'all') {
      this.db.transaction((tx) => {
        clearReviewAttempts(this.db.sqlite);
        clearGrammarPractice(this.db.sqlite);
        tx.run(sql`DELETE FROM grammar_exercise_attempts`);
        tx.run(sql`DELETE FROM grammar_lesson_progress`);
        tx.delete(learningSessionItems).run();
        tx.delete(learningSessions).run();
        tx.delete(reviewLogs).run();
        tx.delete(studyTasks).run();
        tx.delete(studyPreferences).run();
        tx.delete(reviewStates).run();
        tx.delete(learningProgress).run();
        tx.delete(wordTags).run();
        tx.delete(tags).run();
        tx.delete(contextWords).run();
        tx.delete(contexts).run();
        tx.delete(examples).run();
        tx.delete(collocations).run();
        tx.delete(wordFamilies).run();
        tx.delete(words).run();
        tx.delete(users).run();

        // Seed marker is outside the application tables but must not survive a full reset.
        tx.run(sql`CREATE TABLE IF NOT EXISTS lexora_seed_markers (
          id TEXT PRIMARY KEY,
          created_at TEXT NOT NULL
        )`);
        tx.run(sql`DELETE FROM lexora_seed_markers`);
      });

      return { reset: true, scope: 'all' };
    }

    throw new ValidationError('Unknown reset scope');
  }
}
