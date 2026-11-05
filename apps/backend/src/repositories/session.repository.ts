/**
 * @file session.repository.ts
 * @description Transactional persistence for delayed-recall learning sessions.
 */
import { and, desc, eq, gte, inArray, isNull, lt, lte, ne, or, sql } from 'drizzle-orm';
import { randomUUID } from 'node:crypto';
import type { AppDatabase } from '../db/client.js';
import {
  collocations, contextWords, contexts, examples, learningAttempts, learningProgress,
  learningSessionItems, learningSessions, reviewLogs, reviewStates, tags, wordTags, words,
} from '../db/schema.js';
import { StudyRepository } from './study.repository.js';
import { ConflictError as StudyConflictError } from '../services/vocabulary.service.js';
import type { AssessmentRating, SessionStep, StartSessionInput, SubmitStepInput } from '../schemas/session.schema.js';
import { checkAnswer } from '../domain/text/normalization.js';
import { createCloze } from '../domain/text/cloze.js';
import { groupSessionItems } from '../domain/learning/grouping.js';
import { deriveLearningCursor, type LearningAttempt, type LearningCursor, type LearningCursorItem } from '../domain/learning/cursor.js';
import { advanceStateOneLevel, deriveEffectiveRating, OUTPUT_PASSING_SCORE, scoreAttempt } from '../domain/learning/scoring.js';
import { needsOutputGrade } from '../domain/learning/pending-output.js';
import type { OutputGrade } from '../domain/learning/ai-output-grader.js';
import { SM2Scheduler } from '../domain/spaced-repetition/sm2.js';
import type { ReviewRating } from '../domain/spaced-repetition/types.js';
import { KnowledgeAssessmentService } from '../domain/knowledge/assessment.js';
import type { ReviewLogEntry } from '../domain/knowledge/types.js';

export class AppError extends Error {
  constructor(public readonly statusCode: number, public readonly code: string, message: string) { super(message); this.name = 'AppError'; }
}
export class NotFoundError extends AppError { constructor(message: string) { super(404, 'NOT_FOUND', message); this.name = 'NotFoundError'; } }
export class ConflictError extends AppError { constructor(message: string, code = 'CONFLICT') { super(409, code, message); this.name = 'ConflictError'; } }
export class ValidationError extends AppError { constructor(message: string, code = 'VALIDATION_ERROR') { super(400, code, message); this.name = 'ValidationError'; } }

export type LearningFeedback = {
  outcome: string; attemptNumber: 1 | 2 | null; canRetry: boolean;
  score?: number; explanation?: string; suggestion?: string;
  hint?: { firstLetter: string; letterCount: number }; revealedAnswer?: string; codes?: string[];
};
export type PendingOutputGrade = { itemId: string; word: string; definition: string; sentence: string };
export type LearningActionResult = { item: any; cursor: LearningCursor; feedback: LearningFeedback | null };

function cursorItems(items: any[]): LearningCursorItem[] {
  return items.map((item) => ({
    id: item.id, wordId: item.wordId, position: item.position, groupIndex: item.groupIndex,
    completedStep: item.completedStep as LearningCursorItem['completedStep'], reviewRating: item.reviewRating,
  }));
}
function attemptModels(attempts: any[]): LearningAttempt[] {
  return attempts.map((attempt) => ({ id: attempt.id, sessionItemId: attempt.sessionItemId, type: attempt.type, attemptNumber: attempt.attemptNumber, result: attempt.result }));
}
function hint(answer: string) {
  const letters = Array.from(answer).filter((char) => /\p{L}/u.test(char));
  return { firstLetter: letters[0] ?? '', letterCount: letters.length };
}
function groupBy<T>(rows: T[], key: (row: T) => string) {
  return rows.reduce((groups, row) => {
    const group = groups.get(key(row)) ?? [];
    group.push(row);
    groups.set(key(row), group);
    return groups;
  }, new Map<string, T[]>());
}

export class SessionRepository {
  private readonly sm2 = new SM2Scheduler();
  private readonly assessment = new KnowledgeAssessmentService();
  constructor(private readonly db: AppDatabase) {}

  private populateItems(rawItems: any[], executor: any, attempts: any[]) {
    if (!rawItems.length) return [];
    const wordIds = rawItems.map((item) => item.wordId);
    const wordRows: any[] = executor.select().from(words).where(inArray(words.id, wordIds)).all();
    const wordMap = new Map<string, any>(wordRows.map((word: any) => [word.id, word]));
    const exampleRows: any[] = executor.select().from(examples).where(inArray(examples.wordId, wordIds)).all();
    const collocationRows: any[] = executor.select().from(collocations).where(inArray(collocations.wordId, wordIds)).all();
    const contextRows: any[] = executor.select({ wordId: contextWords.wordId, content: contexts.content }).from(contextWords).innerJoin(contexts, eq(contexts.id, contextWords.contextId)).where(inArray(contextWords.wordId, wordIds)).all();
    const examplesByWord = groupBy(exampleRows, (row: any) => row.wordId);
    const collocationsByWord = groupBy(collocationRows, (row: any) => row.wordId);
    const contextsByWord = groupBy(contextRows, (row: any) => row.wordId);
    return rawItems.map((item) => {
      const word = wordMap.get(item.wordId);
      if (!word) return null;
      const wordExamples = examplesByWord.get(word.id) ?? [];
      const wordCollocations = collocationsByWord.get(word.id) ?? [];
      const linked = contextsByWord.get(word.id)?.[0];
      const contextSentence = linked?.content?.split(/(?<=[.?!])\s+/).find((sentence: string) => sentence.toLowerCase().includes(word.word.toLowerCase())) ?? linked?.content ?? wordExamples[0]?.sentence ?? null;
      const itemAttempts = attempts.filter((attempt) => attempt.sessionItemId === item.id);
      const latestAttempt = [...itemAttempts].sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt))).at(-1);
      return {
        id: item.id, sessionId: item.sessionId, wordId: item.wordId, position: item.position, groupIndex: item.groupIndex,
        completedStep: item.completedStep, recallResult: item.recallResult, outputSentence: item.outputSentence,
        reviewRating: item.reviewRating, createdAt: item.createdAt, clozeSentence: contextSentence ? createCloze(contextSentence, word.word) : null,
        attempts: itemAttempts,
        feedback: latestAttempt ? feedbackForAttempt(latestAttempt, word.word) : null,
        word: { id: word.id, word: word.word, headword: word.word, definition: word.definition, phonetic: word.phonetic,
          pronunciation: word.phonetic, partOfSpeech: word.partOfSpeech, translation: word.translation, difficulty: word.difficulty,
          examples: wordExamples, collocations: wordCollocations, contextSentence },
      };
    }).filter(Boolean);
  }

  private activeSessionExists(executor: any = this.db): boolean {
    return executor.select().from(learningSessions).where(eq(learningSessions.status, 'IN_PROGRESS')).limit(1).all().length > 0;
  }

  createSession(data: StartSessionInput) {
    const count = data.count || 10;
    const now = new Date().toISOString();
    let sessionId = '';
    this.db.transaction((tx) => {
      if (this.activeSessionExists(tx)) throw new ConflictError('An active learning session already exists', 'ACTIVE_SESSION_EXISTS');
      let selectedWords: Array<typeof words.$inferSelect> = [];
      let taskId: string | null = null;
      if (data.studyTaskId) {
        const task = new StudyRepository(this.db).assertUsableTask(tx, data.studyTaskId, 'LEARN_WORDS', now);
        if (task.kind !== 'LEARN_WORDS' || task.mode !== data.mode
          || (task.mode === 'context' && task.contextId !== data.contextId)
          || (task.mode === 'topic' && task.topicId !== data.topicId)) {
          throw new StudyConflictError('Learning session does not match study task', { reason: 'TASK_PARAMS_MISMATCH' });
        }
        const completed = tx.select({ count: sql<number>`count(distinct ${learningSessionItems.wordId})` })
          .from(learningSessionItems).innerJoin(learningSessions, eq(learningSessions.id, learningSessionItems.sessionId))
          .where(and(eq(learningSessions.studyTaskId, task.id), eq(learningSessions.status, 'COMPLETED'))).all()[0];
        const remaining = Math.max(0, task.targetCount - Number(completed?.count ?? 0));
        if (count > remaining) throw new StudyConflictError('Session exceeds remaining study task quota', { reason: 'TASK_QUOTA_EXCEEDED', availableCount: remaining });
        taskId = task.id;
      }
      const uncredited = taskId
        ? sql`NOT EXISTS (SELECT 1 FROM learning_session_items credited_item
            INNER JOIN learning_sessions credited_session ON credited_session.id = credited_item.session_id
            WHERE credited_item.word_id = words.id AND credited_session.study_task_id = ${taskId}
              AND credited_session.status = 'COMPLETED')`
        : undefined;
      if (data.mode === 'new_words') {
        selectedWords = tx.select({ word: words }).from(words).leftJoin(learningProgress, eq(words.id, learningProgress.wordId)).where(and(or(eq(learningProgress.status, 'NEW'), isNull(learningProgress.id), isNull(learningProgress.lastStudiedAt)), ...(uncredited ? [uncredited] : []))).limit(count).all().map((row: { word: typeof words.$inferSelect }) => row.word);
      } else if (data.mode === 'context') {
        selectedWords = tx.selectDistinct({ word: words }).from(contextWords).innerJoin(words, eq(words.id, contextWords.wordId)).where(and(eq(contextWords.contextId, data.contextId!), ...(uncredited ? [uncredited] : []))).orderBy(sql`context_words.rowid`).limit(count).all().map((row: { word: typeof words.$inferSelect }) => row.word);
      } else if (data.mode === 'topic') {
        selectedWords = tx.selectDistinct({ word: words }).from(words).innerJoin(wordTags, eq(words.id, wordTags.wordId)).innerJoin(tags, eq(tags.id, wordTags.tagId)).where(and(eq(tags.id, data.topicId!), ...(uncredited ? [uncredited] : []))).limit(count).all().map((row: { word: typeof words.$inferSelect }) => row.word);
      } else if (data.mode === 'weak_words') {
        selectedWords = tx.selectDistinct({ word: words }).from(words).leftJoin(reviewStates, eq(words.id, reviewStates.wordId)).leftJoin(learningProgress, eq(words.id, learningProgress.wordId)).where(and(or(gte(reviewStates.lapses, 2), and(ne(learningProgress.status, 'NEW'), lt(learningProgress.recallScore, 50)), and(ne(learningProgress.status, 'NEW'), gte(learningProgress.recognitionScore, 70), lt(learningProgress.productionScore, 50))), ...(uncredited ? [uncredited] : []))).limit(count).all().map((row: { word: typeof words.$inferSelect }) => row.word);
      } else {
        const due = tx.selectDistinct({ word: words }).from(words).innerJoin(reviewStates, eq(words.id, reviewStates.wordId)).where(and(lte(reviewStates.dueAt, now), ...(uncredited ? [uncredited] : []))).limit(count).all().map((row: { word: typeof words.$inferSelect }) => row.word);
        const fresh = tx.select({ word: words }).from(words).leftJoin(learningProgress, eq(words.id, learningProgress.wordId)).where(and(or(eq(learningProgress.status, 'NEW'), isNull(learningProgress.id)), ...(uncredited ? [uncredited] : []))).limit(Math.max(0, count - due.length)).all().map((row: { word: typeof words.$inferSelect }) => row.word);
        selectedWords = [...due, ...fresh].filter((word, index, all) => all.findIndex((candidate) => candidate.id === word.id) === index).slice(0, count);
      }
      if (taskId && selectedWords.length < count) throw new StudyConflictError('Fewer words are available than requested', { reason: 'INSUFFICIENT_WORDS', availableCount: selectedWords.length });
      if (!selectedWords.length) throw new ValidationError('No words available for learning session', 'NO_WORDS_AVAILABLE');
      sessionId = randomUUID();
      tx.insert(learningSessions).values({ id: sessionId, sessionType: data.mode, totalWords: selectedWords.length, status: 'IN_PROGRESS', startedAt: now, completedAt: null, studyTaskId: taskId }).run();
      for (const group of groupSessionItems(selectedWords)) for (const assignment of group) {
        tx.insert(learningSessionItems).values({ id: randomUUID(), sessionId, wordId: assignment.id, position: assignment.position, groupIndex: assignment.groupIndex, completedStep: null, recallResult: null, outputSentence: null, reviewRating: null, createdAt: now }).run();
      }
    });
    return this.findById(sessionId)!;
  }

  findById(id: string) {
    const session = this.db.select().from(learningSessions).where(eq(learningSessions.id, id)).all()[0];
    if (!session) return null;
    const rawItems = this.db.select().from(learningSessionItems).where(eq(learningSessionItems.sessionId, id)).all();
    const attempts = this.db.select().from(learningAttempts).where(sql`${learningAttempts.sessionItemId} IN (SELECT id FROM learning_session_items WHERE session_id = ${id})`).all();
    const items = this.populateItems(rawItems, this.db, attempts);
    return { id: session.id, sessionType: session.sessionType, mode: session.sessionType, totalWords: session.totalWords, startedAt: session.startedAt, completedAt: session.completedAt, status: session.status, studyTaskId: session.studyTaskId ?? null, cursor: deriveLearningCursor(cursorItems(rawItems), attemptModels(attempts)), items, ...(session.status === 'COMPLETED' ? { summary: summarizeSession(rawItems, attempts, session.totalWords) } : {}) };
  }

  findActiveSession() { const session = this.db.select().from(learningSessions).where(eq(learningSessions.status, 'IN_PROGRESS')).orderBy(desc(learningSessions.startedAt)).limit(1).all()[0]; return session ? this.findById(session.id) : null; }
  findRecentSessions(limit = 10) { return this.db.select().from(learningSessions).orderBy(desc(learningSessions.startedAt)).limit(limit).all().map((session) => this.findById(session.id)).filter(Boolean); }

  /** Saved Output sentences that no AI attempt has graded yet, in session order. */
  getPendingOutputGrades(sessionId: string): PendingOutputGrade[] {
    const session = this.db.select().from(learningSessions).where(eq(learningSessions.id, sessionId)).all()[0];
    if (!session) throw new NotFoundError(`Session with id "${sessionId}" not found`);
    if (session.status !== 'IN_PROGRESS') throw new ConflictError('Session is not active', 'INVALID_SESSION_TRANSITION');
    const items = this.db.select().from(learningSessionItems).where(eq(learningSessionItems.sessionId, sessionId)).orderBy(learningSessionItems.position).all();
    const attempts = this.sessionAttempts(this.db, sessionId);
    if (deriveLearningCursor(cursorItems(items), attemptModels(attempts)).phase !== 'COMPLETE') throw new ConflictError('Every item must be assessed before its sentences are graded', 'INVALID_SESSION_TRANSITION');
    const pending = items.filter((item) => needsOutputGrade(item, attempts));
    if (!pending.length) return [];
    const wordRows = this.db.select().from(words).where(inArray(words.id, pending.map((item) => item.wordId))).all();
    return pending.map((item) => {
      const word = wordRows.find((row) => row.id === item.wordId)!;
      return { itemId: item.id, word: word.word, definition: word.definition, sentence: item.outputSentence! };
    });
  }

  /** Stores one AI attempt per graded sentence; sentences graded or edited since the read are skipped. */
  commitOutputGrades(sessionId: string, grades: Array<{ itemId: string; sentence: string; grade: OutputGrade }>) {
    this.db.transaction((tx) => {
      const session = tx.select().from(learningSessions).where(eq(learningSessions.id, sessionId)).all()[0];
      if (!session) throw new NotFoundError(`Session with id "${sessionId}" not found`);
      if (session.status !== 'IN_PROGRESS') throw new ConflictError('Session is not active', 'INVALID_SESSION_TRANSITION');
      const items = tx.select().from(learningSessionItems).where(eq(learningSessionItems.sessionId, sessionId)).all();
      const attempts = this.sessionAttempts(tx, sessionId);
      for (const { itemId, sentence, grade } of grades) {
        const item = items.find((candidate) => candidate.id === itemId);
        if (!item || item.outputSentence !== sentence || !needsOutputGrade(item, attempts)) continue;
        const attemptNumber = attempts.filter((attempt) => attempt.sessionItemId === itemId && attempt.type === 'OUTPUT').length + 1;
        if (attemptNumber > 2) continue;
        const passed = grade.score >= OUTPUT_PASSING_SCORE;
        tx.insert(learningAttempts).values({
          id: randomUUID(), sessionItemId: itemId, requestId: `${itemId}:output-grade:${attemptNumber}`, type: 'OUTPUT', attemptNumber, answer: sentence,
          result: passed ? (attemptNumber === 1 ? 'VALID' : 'VALID_AFTER_FEEDBACK') : 'INVALID', performanceScore: grade.score, feedbackCodes: null,
          explanation: grade.explanation, suggestion: grade.suggestion, source: 'AI', createdAt: new Date().toISOString(),
        }).run();
      }
    });
  }

  private sessionAttempts(executor: any, sessionId: string) {
    return executor.select().from(learningAttempts).where(sql`${learningAttempts.sessionItemId} IN (SELECT id FROM learning_session_items WHERE session_id = ${sessionId})`).all() as Array<typeof learningAttempts.$inferSelect>;
  }

  getOptions() {
    const contextRows = this.db.select({ id: contexts.id, title: contexts.title, wordCount: sql<number>`count(${contextWords.wordId})` }).from(contexts).leftJoin(contextWords, eq(contextWords.contextId, contexts.id)).groupBy(contexts.id).all();
    const topicRows = this.db.select({ id: tags.id, name: tags.name, wordCount: sql<number>`count(${wordTags.wordId})` }).from(tags).leftJoin(wordTags, eq(wordTags.tagId, tags.id)).groupBy(tags.id).all();
    const newWords = this.db.select({ count: sql<number>`count(*)` }).from(words).leftJoin(learningProgress, eq(words.id, learningProgress.wordId)).where(or(eq(learningProgress.status, 'NEW'), isNull(learningProgress.id))).all()[0]?.count ?? 0;
    const weakWords = this.db.select({ count: sql<number>`count(*)` }).from(words).leftJoin(learningProgress, eq(words.id, learningProgress.wordId)).where(and(ne(learningProgress.status, 'NEW'), lt(learningProgress.recallScore, 50))).all()[0]?.count ?? 0;
    const dueWords = this.db.select({ count: sql<number>`count(*)` }).from(words).innerJoin(reviewStates, eq(words.id, reviewStates.wordId)).where(lte(reviewStates.dueAt, new Date().toISOString())).all()[0]?.count ?? 0;
    return { contexts: contextRows, topics: topicRows, availability: { newWords, weakWords, dueWords } };
  }

  submitAction(sessionId: string, input: SubmitStepInput): LearningActionResult {
    let result: LearningActionResult | null = null;
    this.db.transaction((tx) => {
      const session = tx.select().from(learningSessions).where(eq(learningSessions.id, sessionId)).all()[0];
      if (!session) throw new NotFoundError(`Session with id "${sessionId}" not found`);
      if (session.status !== 'IN_PROGRESS') throw new ConflictError('Session is not active', 'INVALID_SESSION_TRANSITION');
      const rawItems = tx.select().from(learningSessionItems).where(eq(learningSessionItems.sessionId, sessionId)).all();
      const attempts = tx.select().from(learningAttempts).where(sql`${learningAttempts.sessionItemId} IN (SELECT id FROM learning_session_items WHERE session_id = ${sessionId})`).all();
      const persistedAttempt = attempts.find((attempt) => attempt.requestId === input.requestId);
      if (persistedAttempt) {
        const persistedItem = rawItems.find((candidate) => candidate.id === persistedAttempt.sessionItemId)!;
        const persistedWord = tx.select().from(words).where(eq(words.id, persistedItem.wordId)).all()[0];
        const persistedFeedback = feedbackForAttempt(persistedAttempt, persistedWord.word);
        result = { item: this.populateItems([persistedItem], tx, attempts)[0], cursor: deriveLearningCursor(cursorItems(rawItems), attemptModels(attempts)), feedback: persistedFeedback };
        return;
      }
      const cursor = deriveLearningCursor(cursorItems(rawItems), attemptModels(attempts));
      const requestedItem = rawItems.find((item) => item.wordId === input.wordId);
      if (input.step === 'RECALL' && requestedItem && attempts.filter((attempt) => attempt.sessionItemId === requestedItem.id && attempt.type === 'RECALL').length >= 2) {
        throw new ConflictError('Attempt limit reached');
      }
      if (input.step === 'OUTPUT' && requestedItem && requestedItem.outputSentence === input.answer && (requestedItem.completedStep === 'OUTPUT' || requestedItem.completedStep === 'ASSESS')) {
        // A retry of a save whose response was lost: the sentence is already stored, so replay instead of conflicting.
        result = { item: this.populateItems([requestedItem], tx, attempts)[0], cursor, feedback: null };
        return;
      }
      if (cursor.itemId !== requestedItem?.id || cursor.step !== input.step) throw new ConflictError('Action does not match current session cursor', 'INVALID_SESSION_TRANSITION');
      const item = rawItems.find((candidate) => candidate.id === cursor.itemId)!;
      let feedback: LearningFeedback = { outcome: 'COMPLETED', attemptNumber: null, canRetry: false };
      if (input.step === 'CONTEXT' || input.step === 'UNDERSTAND') {
        tx.update(learningSessionItems).set({ completedStep: input.step }).where(eq(learningSessionItems.id, item.id)).run();
      } else if (input.step === 'OUTPUT') {
        tx.update(learningSessionItems).set({ completedStep: 'OUTPUT', outputSentence: input.answer ?? '' }).where(eq(learningSessionItems.id, item.id)).run();
      } else if (input.step === 'RECALL') {
        const previous = attempts.filter((attempt) => attempt.sessionItemId === item.id && attempt.type === 'RECALL');
        if (previous.length >= 2) throw new ConflictError('Attempt limit reached');
        const attemptNumber = (previous.length + 1) as 1 | 2;
        const word = tx.select().from(words).where(eq(words.id, item.wordId)).all()[0];
        const checked = checkAnswer(input.answer ?? '', word.word);
        const passed = checked.exact || checked.almostCorrect;
        const resultName = checked.exact ? (attemptNumber === 1 ? 'CORRECT' : 'CORRECT_AFTER_HINT') : checked.almostCorrect ? 'CORRECT_AFTER_HINT' : 'INCORRECT';
        feedback = feedbackForRecall(resultName, attemptNumber, word.word);
        tx.insert(learningAttempts).values({ id: randomUUID(), sessionItemId: item.id, requestId: input.requestId, type: 'RECALL', attemptNumber, answer: input.answer ?? '', result: resultName, performanceScore: scoreAttempt(attemptNumber, passed), feedbackCodes: null, explanation: null, suggestion: null, source: 'LOCAL', createdAt: new Date().toISOString() }).run();
        if (passed || attemptNumber === 2) tx.update(learningSessionItems).set({ completedStep: 'RECALL', recallResult: resultName === 'INCORRECT' ? 'INCORRECT' : resultName === 'CORRECT_AFTER_HINT' ? 'ALMOST_CORRECT' : 'CORRECT' }).where(eq(learningSessionItems.id, item.id)).run();
      } else {
        tx.update(learningSessionItems).set({ completedStep: 'ASSESS', reviewRating: input.assessmentRating }).where(eq(learningSessionItems.id, item.id)).run();
      }
      const nextItems = tx.select().from(learningSessionItems).where(eq(learningSessionItems.sessionId, sessionId)).all();
      const nextAttempts = tx.select().from(learningAttempts).where(sql`${learningAttempts.sessionItemId} IN (SELECT id FROM learning_session_items WHERE session_id = ${sessionId})`).all();
      result = { item: this.populateItems([tx.select().from(learningSessionItems).where(eq(learningSessionItems.id, item.id)).all()[0]], tx, nextAttempts)[0], cursor: deriveLearningCursor(cursorItems(nextItems), attemptModels(nextAttempts)), feedback: input.step === 'RECALL' ? feedback : null };
    });
    return result!;
  }

  abandonSession(id: string) {
    const session = this.db.select().from(learningSessions).where(eq(learningSessions.id, id)).all()[0];
    if (!session) throw new NotFoundError(`Session with id "${id}" not found`);
    if (session.status === 'COMPLETED') throw new ConflictError('Completed session cannot be abandoned');
    this.db.update(learningSessions).set({ status: 'ABANDONED' }).where(and(eq(learningSessions.id, id), eq(learningSessions.status, 'IN_PROGRESS'))).run();
    return this.findById(id)!;
  }

  completeSession(sessionId: string) {
    const now = new Date().toISOString();
    let completed: any;
    this.db.transaction((tx) => {
      const session = tx.select().from(learningSessions).where(eq(learningSessions.id, sessionId)).all()[0];
      if (!session) throw new NotFoundError(`Session with id "${sessionId}" not found`);
      if (session.status === 'COMPLETED') { completed = this.findById(sessionId); return; }
      if (session.status === 'ABANDONED') throw new ConflictError('Abandoned session cannot be completed');
      const items = tx.select().from(learningSessionItems).where(eq(learningSessionItems.sessionId, sessionId)).all();
      const attempts = tx.select().from(learningAttempts).where(sql`${learningAttempts.sessionItemId} IN (SELECT id FROM learning_session_items WHERE session_id = ${sessionId})`).all();
      if (deriveLearningCursor(cursorItems(items), attemptModels(attempts)).phase !== 'COMPLETE') throw new ValidationError('Cannot complete session before all items are assessed');
      if (items.some((item) => needsOutputGrade(item, attempts))) throw new ValidationError('Output sentences must be graded before completing the session', 'OUTPUT_NOT_GRADED');
      tx.update(learningSessions).set({ status: 'COMPLETED', completedAt: now }).where(and(eq(learningSessions.id, sessionId), eq(learningSessions.status, 'IN_PROGRESS'))).run();
      for (const item of items) this.applyCompletion(tx, item, attempts.filter((attempt) => attempt.sessionItemId === item.id), now);
    });
    return this.findById(sessionId) ?? completed;
  }

  private applyCompletion(tx: any, item: any, attempts: any[], now: string) {
    const recall = finalAttempt(attempts, 'RECALL');
    const output = finalAttempt(attempts, 'OUTPUT');
    const rating = item.reviewRating as ReviewRating;
    const recallScore = recall?.performanceScore ?? 0;
    const productionScore = output?.performanceScore ?? 0;
    const effective = deriveEffectiveRating(recallScore, productionScore, rating);
    for (const [type, attempt] of [['RECALL', recall], ['PRODUCTION', output]] as const) if (attempt) tx.insert(reviewLogs).values({ id: randomUUID(), wordId: item.wordId, reviewType: type, rating: effective, responseTime: null, answer: attempt.answer, correct: type === 'PRODUCTION' ? attempt.performanceScore >= OUTPUT_PASSING_SCORE : attempt.performanceScore > 0, performanceScore: attempt.performanceScore, createdAt: now }).run();
    const old = tx.select().from(reviewStates).where(eq(reviewStates.wordId, item.wordId)).all()[0];
    const schedule = this.sm2.schedule({ interval: old?.interval ?? 0, easeFactor: old?.easeFactor ?? 2.5, repetitions: old?.repetitions ?? 0, lapses: old?.lapses ?? 0 }, effective, now);
    if (old) tx.update(reviewStates).set({ ...schedule, dueAt: schedule.dueAt.toISOString(), lastReviewedAt: schedule.lastReviewedAt.toISOString() }).where(eq(reviewStates.wordId, item.wordId)).run();
    else tx.insert(reviewStates).values({ id: randomUUID(), wordId: item.wordId, interval: schedule.interval, easeFactor: schedule.easeFactor, repetitions: schedule.repetitions, lapses: schedule.lapses, dueAt: schedule.dueAt.toISOString(), lastReviewedAt: schedule.lastReviewedAt.toISOString() }).run();
    const logs = tx.select().from(reviewLogs).where(eq(reviewLogs.wordId, item.wordId)).all();
    const calculated = this.assessment.assess({ reviewLogs: logs.map((log: any): ReviewLogEntry => ({ reviewType: log.reviewType, rating: log.rating, correct: log.correct, performanceScore: log.performanceScore, createdAt: log.createdAt })), repetitions: schedule.repetitions, interval: schedule.interval, lapses: schedule.lapses });
    const progress = tx.select().from(learningProgress).where(eq(learningProgress.wordId, item.wordId)).all()[0];
    const status = advanceStateOneLevel(progress?.status ?? 'NEW', calculated.state);
    if (progress) tx.update(learningProgress).set({ status, recognitionScore: calculated.scores.recognitionScore, recallScore: calculated.scores.recallScore, productionScore: calculated.scores.productionScore, lastStudiedAt: now, updatedAt: now }).where(eq(learningProgress.wordId, item.wordId)).run();
    else tx.insert(learningProgress).values({ id: randomUUID(), wordId: item.wordId, status, recognitionScore: calculated.scores.recognitionScore, recallScore: calculated.scores.recallScore, productionScore: calculated.scores.productionScore, lastStudiedAt: now, updatedAt: now }).run();
  }
}

function finalAttempt(attempts: any[], type: 'RECALL' | 'OUTPUT') {
  return attempts.filter((attempt) => attempt.type === type).sort((a, b) => b.attemptNumber - a.attemptNumber)[0];
}

function feedbackForAttempt(attempt: any, answer: string): LearningFeedback {
  if (attempt.type === 'RECALL') return feedbackForRecall(attempt.result, attempt.attemptNumber, answer);
  return { outcome: attempt.result, attemptNumber: attempt.attemptNumber, canRetry: false, ...(attempt.source === 'AI' ? { score: attempt.performanceScore, explanation: attempt.explanation, suggestion: attempt.suggestion } : {}), ...(attempt.feedbackCodes ? { codes: JSON.parse(attempt.feedbackCodes) } : {}) };
}

function summarizeSession(items: any[], attempts: any[], totalWords: number) {
  const summary = { totalWords, recallFirstTry: 0, recallSecondTry: 0, recallFailed: 0, outputValid: 0, outputInvalid: 0, legacyUnknown: 0 };
  for (const item of items) {
    const itemAttempts = attempts.filter((attempt) => attempt.sessionItemId === item.id);
    const recall = finalAttempt(itemAttempts, 'RECALL');
    const output = finalAttempt(itemAttempts, 'OUTPUT');
    if (!recall || !output) {
      summary.legacyUnknown += 1;
      continue;
    }
    if (recall.result === 'CORRECT') summary.recallFirstTry += 1;
    else if (recall.result === 'CORRECT_AFTER_HINT') summary.recallSecondTry += 1;
    else if (recall.result === 'INCORRECT') summary.recallFailed += 1;
    if (output.result === 'VALID' || output.result === 'VALID_AFTER_FEEDBACK') summary.outputValid += 1;
    else if (output.result === 'INVALID') summary.outputInvalid += 1;
  }
  return summary;
}

function feedbackForRecall(result: string, attemptNumber: 1 | 2, answer: string): LearningFeedback {
  if (result === 'INCORRECT' && attemptNumber === 1) return { outcome: result, attemptNumber, canRetry: true, hint: hint(answer) };
  if (result === 'INCORRECT') return { outcome: result, attemptNumber, canRetry: false, revealedAnswer: answer };
  return { outcome: result, attemptNumber, canRetry: false };
}
