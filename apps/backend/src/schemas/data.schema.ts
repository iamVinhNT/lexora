/**
 * @file data.schema.ts
 * @description Zod validation schemas for data management (import, export, backup, restore, reset).
 */

import { z } from 'zod';
import { normalizeWord } from '../domain/text/normalization.js';

const timestampSchema = z.string().datetime({ offset: true }).transform((value) => new Date(value).toISOString());
const nonNegativeIntegerSchema = z.number().int().nonnegative();
const scoreSchema = z.number().int().min(0).max(100);
const easeFactorSchema = z.number().finite().min(1.3);
const nonBlankStringSchema = z.string().min(1).refine((value) => value.trim().length > 0, 'Value must not be blank');

const trimmedNameSchema = z
  .string()
  .min(1)
  .refine((value) => value === value.trim(), 'Value must not have surrounding whitespace');

const canonicalWordSchema = trimmedNameSchema.refine(
  (value) => value === normalizeWord(value),
  'Word must equal normalizeWord(word)'
);

export const importFormatEnum = z.preprocess(
  (val) => (typeof val === 'string' ? val.toUpperCase() : val),
  z.enum(['TXT', 'CSV', 'JSON'])
);

export const importPreviewSchema = z.object({
  format: importFormatEnum,
  content: z.string(),
});

export type ImportPreviewInput = z.infer<typeof importPreviewSchema>;

export const importCommitSchema = z.object({
  format: importFormatEnum,
  content: z.string(),
  previewToken: z.string().min(1),
  selectedIndices: z.array(z.number().int().nonnegative()).optional(),
});

export type ImportCommitInput = z.infer<typeof importCommitSchema>;

export const exportFormatEnum = z.preprocess(
  (val) => (typeof val === 'string' ? val.toUpperCase() : val),
  z.enum(['JSON', 'CSV'])
);

export const exportScopeEnum = z.enum(['words', 'all']);

export const exportQuerySchema = z
  .object({
    format: exportFormatEnum.optional().default('JSON'),
    scope: exportScopeEnum.optional().default('words'),
  })
  .refine((data) => !(data.format === 'CSV' && data.scope === 'all'), {
    message: 'CSV format is not supported for full export. One CSV cannot safely represent full relational backup.',
    path: ['format'],
  });

export type ExportQuery = z.infer<typeof exportQuerySchema>;

export const exportVocabQuerySchema = z.object({
  format: exportFormatEnum.optional().default('JSON'),
});

export type ExportVocabQuery = z.infer<typeof exportVocabQuerySchema>;

export const exportFullQuerySchema = z
  .object({
    format: exportFormatEnum.optional().default('JSON'),
  })
  .refine((data) => data.format !== 'CSV', {
    message: 'CSV format is not supported for full export. One CSV cannot safely represent full relational backup.',
    path: ['format'],
  });

export type ExportFullQuery = z.infer<typeof exportFullQuerySchema>;

/** Strict v1 schemas. Nullable database columns remain required keys. */
export const userRowSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1),
    email: z.string().email().refine((value) => value === value.toLowerCase(), 'Email must be lowercase'),
    createdAt: timestampSchema,
  })
  .strict();

export const wordRowSchema = z
  .object({
    id: z.string().min(1),
    word: canonicalWordSchema,
    phonetic: z.string().nullable(),
    partOfSpeech: z.string().nullable(),
    definition: z.string(),
    translation: z.string().nullable(),
    difficulty: z.string().nullable(),
    createdAt: timestampSchema,
    updatedAt: timestampSchema.nullable(),
  })
  .strict();

export const wordFamilyRowSchema = z
  .object({
    id: z.string().min(1),
    wordId: z.string().min(1),
    relatedWordId: z.string().min(1),
    relationship: z.string().min(1),
  })
  .strict();

export const collocationRowSchema = z
  .object({
    id: z.string().min(1),
    wordId: z.string().min(1),
    phrase: z.string().min(1),
  })
  .strict();

export const exampleRowSchema = z
  .object({
    id: z.string().min(1),
    wordId: z.string().min(1),
    sentence: z.string().min(1),
    translation: z.string().nullable(),
    source: z.string().nullable(),
  })
  .strict();

export const contextRowSchema = z
  .object({
    id: z.string().min(1),
    title: z.string().min(1),
    content: z.string(),
    sourceType: z.enum([
      'READING',
      'LISTENING',
      'CONVERSATION',
      'BOOK',
      'ARTICLE',
      'YOUTUBE',
      'WORK',
      'PERSONAL',
      'MANUAL',
    ]).nullable(),
    sourceUrl: z.string().nullable(),
    createdAt: timestampSchema,
    updatedAt: timestampSchema.nullable(),
  })
  .strict();

export const contextWordRowSchema = z
  .object({
    contextId: z.string().min(1),
    wordId: z.string().min(1),
    exposureCount: nonNegativeIntegerSchema,
    firstSeenAt: timestampSchema.nullable(),
    lastSeenAt: timestampSchema.nullable(),
  })
  .strict();

export const learningProgressRowSchema = z
  .object({
    id: z.string().min(1),
    wordId: z.string().min(1),
    status: z.enum(['NEW', 'LEARNING', 'FAMILIAR', 'MASTERED', 'MAINTENANCE']),
    recognitionScore: scoreSchema,
    recallScore: scoreSchema,
    productionScore: scoreSchema,
    lastStudiedAt: timestampSchema.nullable(),
    updatedAt: timestampSchema.nullable(),
  })
  .strict();

export const reviewStateRowSchema = z
  .object({
    id: z.string().min(1),
    wordId: z.string().min(1),
    interval: nonNegativeIntegerSchema,
    easeFactor: easeFactorSchema,
    repetitions: nonNegativeIntegerSchema,
    lapses: nonNegativeIntegerSchema,
    dueAt: timestampSchema,
    lastReviewedAt: timestampSchema.nullable(),
  })
  .strict();

export const reviewLogRowSchema = z
  .object({
    id: z.string().min(1),
    wordId: z.string().min(1),
    reviewType: z.enum(['RECOGNITION', 'RECALL', 'CLOZE', 'PRODUCTION', 'CONTEXTUAL']),
    rating: z.enum(['AGAIN', 'HARD', 'GOOD', 'EASY']),
    responseTime: nonNegativeIntegerSchema.nullable(),
    answer: z.string().nullable(),
    correct: z.boolean().nullable(),
    performanceScore: scoreSchema.nullable().optional(),
    createdAt: timestampSchema,
  })
  .strict();

export const tagRowSchema = z
  .object({
    id: z.string().min(1),
    name: trimmedNameSchema,
    createdAt: timestampSchema.nullable(),
  })
  .strict();

export const wordTagRowSchema = z
  .object({
    wordId: z.string().min(1),
    tagId: z.string().min(1),
  })
  .strict();

export const learningAttemptRowSchema = z
  .object({
    id: z.string().min(1),
    sessionItemId: z.string().min(1),
    requestId: z.string().min(1),
    type: z.enum(['RECALL', 'OUTPUT']),
    attemptNumber: z.union([z.literal(1), z.literal(2)]),
    answer: z.string(),
    result: z.string().min(1),
    performanceScore: scoreSchema,
    feedbackCodes: z.string().nullable(),
    explanation: z.string().nullable().default(null),
    suggestion: z.string().nullable().default(null),
    source: z.string().min(1),
    createdAt: timestampSchema,
  })
  .strict();

export const learningSessionRowSchema = z
  .object({
    id: z.string().min(1),
    sessionType: z.enum([
      'new_words',
      'context',
      'topic',
      'weak_words',
      'daily_plan',
      'NEW_WORDS',
      'CONTEXT',
      'TOPIC',
      'WEAK_WORDS',
      'DAILY_PLAN',
      'REVIEW',
    ]),
    totalWords: nonNegativeIntegerSchema,
    status: z.enum(['IN_PROGRESS', 'COMPLETED', 'ABANDONED']).optional(),
    startedAt: timestampSchema,
    completedAt: timestampSchema.nullable(),
  })
  .strict();

export const learningSessionItemRowSchema = z
  .object({
    id: z.string().min(1),
    sessionId: z.string().min(1),
    wordId: z.string().min(1),
    position: nonNegativeIntegerSchema.optional(),
    groupIndex: nonNegativeIntegerSchema.optional(),
    completedStep: z.enum(['CONTEXT', 'UNDERSTAND', 'RECALL', 'OUTPUT', 'ASSESS']).nullable(),
    recallResult: z.enum(['CORRECT', 'ALMOST_CORRECT', 'INCORRECT']).nullable(),
    outputSentence: z.string().nullable(),
    reviewRating: z.enum(['AGAIN', 'HARD', 'GOOD', 'EASY']).nullable(),
    createdAt: timestampSchema.nullable(),
  })
  .strict();

export const grammarLessonProgressRowSchema = z.object({
  lessonId: nonBlankStringSchema,
  revisionId: nonBlankStringSchema,
  revision: nonBlankStringSchema,
  lastPosition: nonNegativeIntegerSchema,
  isComplete: z.boolean(),
  completedAt: timestampSchema.nullable(),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
}).strict();

export const grammarExerciseAttemptRowSchema = z.object({
  id: nonBlankStringSchema,
  lessonId: nonBlankStringSchema,
  revisionId: nonBlankStringSchema,
  revision: nonBlankStringSchema,
  exerciseId: nonBlankStringSchema,
  requestId: nonBlankStringSchema,
  answer: z.discriminatedUnion('type', [
    z.object({ type: z.literal('choice'), text: z.string().min(1).max(2000).refine((value) => value.trim().length > 0, 'Value must not be blank') }).strict(),
    z.object({ type: z.literal('text'), text: z.string().min(1).max(2000).refine((value) => value.trim().length > 0, 'Value must not be blank') }).strict(),
  ]),
  isCorrect: z.boolean(),
  feedback: nonBlankStringSchema,
  createdAt: timestampSchema,
}).strict();

type BackupDataShape = {
  users: z.infer<typeof userRowSchema>[];
  words: z.infer<typeof wordRowSchema>[];
  wordFamilies: z.infer<typeof wordFamilyRowSchema>[];
  collocations: z.infer<typeof collocationRowSchema>[];
  examples: z.infer<typeof exampleRowSchema>[];
  contexts: z.infer<typeof contextRowSchema>[];
  contextWords: z.infer<typeof contextWordRowSchema>[];
  learningProgress: z.infer<typeof learningProgressRowSchema>[];
  reviewStates: z.infer<typeof reviewStateRowSchema>[];
  reviewLogs: z.infer<typeof reviewLogRowSchema>[];
  tags: z.infer<typeof tagRowSchema>[];
  wordTags: z.infer<typeof wordTagRowSchema>[];
  learningSessions: z.infer<typeof learningSessionRowSchema>[];
  learningSessionItems: z.infer<typeof learningSessionItemRowSchema>[];
  learningAttempts: z.infer<typeof learningAttemptRowSchema>[];
  grammarLessonProgress?: z.infer<typeof grammarLessonProgressRowSchema>[];
  grammarExerciseAttempts?: z.infer<typeof grammarExerciseAttemptRowSchema>[];
};

function addIssue(ctx: z.RefinementCtx, message: string, path: (string | number)[] = []) {
  ctx.addIssue({ code: z.ZodIssueCode.custom, message, path });
}

function validateBackupRelations(data: BackupDataShape, ctx: z.RefinementCtx): void {
  const idTables = [
    ['users', data.users],
    ['words', data.words],
    ['wordFamilies', data.wordFamilies],
    ['collocations', data.collocations],
    ['examples', data.examples],
    ['contexts', data.contexts],
    ['learningProgress', data.learningProgress],
    ['reviewStates', data.reviewStates],
    ['reviewLogs', data.reviewLogs],
    ['tags', data.tags],
    ['learningSessions', data.learningSessions],
    ['learningSessionItems', data.learningSessionItems],
  ] as const;

  for (const [table, rows] of idTables) {
    const ids = new Set<string>();
    rows.forEach((row, index) => {
      const id = row.id;
      if (ids.has(id)) addIssue(ctx, `Duplicate id in ${table}: ${id}`, [table, index, 'id']);
      ids.add(id);
    });
  }

  const wordsById = new Set(data.words.map((row) => row.id));
  const contextsById = new Set(data.contexts.map((row) => row.id));
  const tagsById = new Set(data.tags.map((row) => row.id));
  const sessionsById = new Set(data.learningSessions.map((row) => row.id));

  const normalizedWords = new Map<string, number>();
  data.words.forEach((row, index) => {
    const normalized = normalizeWord(row.word);
    if (!normalized) addIssue(ctx, 'Word must contain letters or numbers', ['words', index, 'word']);
    if (normalizedWords.has(normalized)) {
      addIssue(ctx, `Duplicate normalized word: ${normalized}`, ['words', index, 'word']);
    }
    normalizedWords.set(normalized, index);
  });

  const uniqueValues = (
    values: string[],
    table: string,
    field: string,
    key = (value: string) => value.toLowerCase()
  ) => {
    const seen = new Set<string>();
    values.forEach((value, index) => {
      const normalizedValue = key(value);
      if (seen.has(normalizedValue)) addIssue(ctx, `Duplicate ${field}: ${value}`, [table, index, field]);
      seen.add(normalizedValue);
    });
  };
  uniqueValues(data.users.map((row) => row.email), 'users', 'email');
  uniqueValues(data.tags.map((row) => row.name), 'tags', 'name', (value) => value);

  const requireWord = (wordId: string, table: string, index: number, field: string) => {
    if (!wordsById.has(wordId)) addIssue(ctx, `Orphan word reference: ${wordId}`, [table, index, field]);
  };
  data.wordFamilies.forEach((row, index) => {
    requireWord(row.wordId, 'wordFamilies', index, 'wordId');
    requireWord(row.relatedWordId, 'wordFamilies', index, 'relatedWordId');
  });
  data.collocations.forEach((row, index) => requireWord(row.wordId, 'collocations', index, 'wordId'));
  data.examples.forEach((row, index) => requireWord(row.wordId, 'examples', index, 'wordId'));
  data.contextWords.forEach((row, index) => {
    if (!contextsById.has(row.contextId)) addIssue(ctx, `Orphan context reference: ${row.contextId}`, ['contextWords', index, 'contextId']);
    requireWord(row.wordId, 'contextWords', index, 'wordId');
  });
  data.learningProgress.forEach((row, index) => requireWord(row.wordId, 'learningProgress', index, 'wordId'));
  data.reviewStates.forEach((row, index) => requireWord(row.wordId, 'reviewStates', index, 'wordId'));
  data.reviewLogs.forEach((row, index) => requireWord(row.wordId, 'reviewLogs', index, 'wordId'));
  data.wordTags.forEach((row, index) => {
    requireWord(row.wordId, 'wordTags', index, 'wordId');
    if (!tagsById.has(row.tagId)) addIssue(ctx, `Orphan tag reference: ${row.tagId}`, ['wordTags', index, 'tagId']);
  });
  const sessionItemsById = new Set(data.learningSessionItems.map((row) => row.id));
  data.learningSessionItems.forEach((row, index) => {
    if (!sessionsById.has(row.sessionId)) addIssue(ctx, `Orphan session reference: ${row.sessionId}`, ['learningSessionItems', index, 'sessionId']);
    requireWord(row.wordId, 'learningSessionItems', index, 'wordId');
  });
  const requestIds = new Set<string>();
  const attemptKeys = new Set<string>();
  for (const [index, row] of data.learningAttempts.entries()) {
    if (!sessionItemsById.has(row.sessionItemId)) addIssue(ctx, `Orphan session item reference: ${row.sessionItemId}`, ['learningAttempts', index, 'sessionItemId']);
    if (requestIds.has(row.requestId)) addIssue(ctx, `Duplicate request id: ${row.requestId}`, ['learningAttempts', index, 'requestId']);
    requestIds.add(row.requestId);
    const key = `${row.sessionItemId}\u0000${row.type}\u0000${row.attemptNumber}`;
    if (attemptKeys.has(key)) addIssue(ctx, `Duplicate attempt: ${key}`, ['learningAttempts', index]);
    attemptKeys.add(key);
  }

  const uniqueComposite = (values: string[], table: string) => {
    const seen = new Set<string>();
    values.forEach((value, index) => {
      if (seen.has(value)) addIssue(ctx, `Duplicate composite key in ${table}: ${value}`, [table, index]);
      seen.add(value);
    });
  };
  uniqueComposite(data.contextWords.map((row) => `${row.contextId}\u0000${row.wordId}`), 'contextWords');
  uniqueComposite(data.wordTags.map((row) => `${row.wordId}\u0000${row.tagId}`), 'wordTags');
  uniqueComposite(data.learningProgress.map((row) => row.wordId), 'learningProgress');
  uniqueComposite(data.reviewStates.map((row) => row.wordId), 'reviewStates');

  const grammarLessons = new Map<string, { revisionId: string; revision: string }>();
  for (const [index, row] of (data.grammarLessonProgress ?? []).entries()) {
    if (grammarLessons.has(row.lessonId)) addIssue(ctx, `Duplicate lesson id: ${row.lessonId}`, ['grammarLessonProgress', index, 'lessonId']);
    grammarLessons.set(row.lessonId, { revisionId: row.revisionId, revision: row.revision });
  }
  const grammarRequestIds = new Set<string>();
  for (const [index, row] of (data.grammarExerciseAttempts ?? []).entries()) {
    const progress = grammarLessons.get(row.lessonId);
    if (!progress) addIssue(ctx, `Orphan grammar lesson reference: ${row.lessonId}`, ['grammarExerciseAttempts', index, 'lessonId']);
    else if (progress.revisionId !== row.revisionId || progress.revision !== row.revision) {
      addIssue(ctx, `Grammar attempt revision does not match lesson progress: ${row.lessonId}`, ['grammarExerciseAttempts', index, 'revisionId']);
    }
    if (grammarRequestIds.has(row.requestId)) addIssue(ctx, `Duplicate grammar request id: ${row.requestId}`, ['grammarExerciseAttempts', index, 'requestId']);
    grammarRequestIds.add(row.requestId);
  }
}

const backupTables = {
  users: z.array(userRowSchema),
  words: z.array(wordRowSchema),
  wordFamilies: z.array(wordFamilyRowSchema),
  collocations: z.array(collocationRowSchema),
  examples: z.array(exampleRowSchema),
  contexts: z.array(contextRowSchema),
  contextWords: z.array(contextWordRowSchema),
  learningProgress: z.array(learningProgressRowSchema),
  reviewStates: z.array(reviewStateRowSchema),
  reviewLogs: z.array(reviewLogRowSchema),
  tags: z.array(tagRowSchema),
  wordTags: z.array(wordTagRowSchema),
  learningSessions: z.array(learningSessionRowSchema),
  learningSessionItems: z.array(learningSessionItemRowSchema),
} as const;

export const backupDataSchema = z.object({
  ...backupTables,
  learningAttempts: z.array(learningAttemptRowSchema).default([]),
}).strict().superRefine(validateBackupRelations);

export const backupV3DataSchema = z.object({
  ...backupTables,
  learningAttempts: z.array(learningAttemptRowSchema).default([]),
  grammarLessonProgress: z.array(grammarLessonProgressRowSchema),
  grammarExerciseAttempts: z.array(grammarExerciseAttemptRowSchema),
}).strict().superRefine(validateBackupRelations);

export const backupV1DataSchema = z.object(backupTables).strict().superRefine((data, ctx) => {
  validateBackupRelations({ ...data, learningAttempts: [] }, ctx);
});

const backupEnvelope = {
  application: z.literal('Lexora', { errorMap: () => ({ message: 'Invalid backup file. Application must be "Lexora".' }) }),
  exportedAt: timestampSchema,
};

export const backupV1Schema = z.object({ version: z.literal(1), ...backupEnvelope, data: backupV1DataSchema }).strict();
export const backupV2Schema = z.object({ version: z.literal(2), ...backupEnvelope, data: backupDataSchema }).strict();
export const backupV3Schema = z.object({ version: z.literal(3), ...backupEnvelope, data: backupV3DataSchema }).strict();
export const backupSchema = z.union([backupV1Schema, backupV2Schema, backupV3Schema]);

export type BackupData = z.infer<typeof backupV3DataSchema>;
export type BackupPayload = z.infer<typeof backupV3Schema>;

const restoreEnvelope = z.object({ confirm: z.literal(true), previewToken: z.string().min(1) }).strict();

export const restoreSchema = z.union([
  z.object({ backup: backupV1Schema, ...restoreEnvelope.shape }).strict(),
  z.object({ backup: backupV2Schema, ...restoreEnvelope.shape }).strict(),
  z.object({ backup: backupV3Schema, ...restoreEnvelope.shape }).strict(),
  backupV1Schema.extend(restoreEnvelope.shape).strict().transform((val) => {
    const { confirm, previewToken, ...backup } = val;
    return { backup, confirm: true as const, previewToken };
  }),
  backupV2Schema.extend(restoreEnvelope.shape).strict().transform((val) => {
    const { confirm, previewToken, ...backup } = val;
    return { backup, confirm: true as const, previewToken };
  }),
  backupV3Schema.extend(restoreEnvelope.shape).strict().transform((val) => {
    const { confirm, previewToken, ...backup } = val;
    return { backup, confirm: true as const, previewToken };
  }),
]);

export type RestoreInput = z.infer<typeof restoreSchema>;

export const restorePreviewSchema = z.union([
  z.object({ backup: backupSchema }).strict(),
  backupSchema.transform((backup) => ({ backup })),
]);

export type RestorePreviewInput = z.infer<typeof restorePreviewSchema>;

export const confirmOnlySchema = z
  .object({
    confirm: z.literal(true, { errorMap: () => ({ message: 'Confirmation required: confirm must be true' }) }),
  })
  .strict();

export type ConfirmOnlyInput = z.infer<typeof confirmOnlySchema>;

export const resetSchema = z
  .object({
    scope: z.enum(['progress', 'all']),
    confirm: z.literal(true, { errorMap: () => ({ message: 'Confirmation required: confirm must be true' }) }),
  })
  .strict();

export type ResetInput = z.infer<typeof resetSchema>;
