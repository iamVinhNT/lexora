/**
 * @file session.routes.test.ts
 * @description Contract tests for redesigned learning session requests and responses.
 */
import { eq } from 'drizzle-orm';
import Fastify, { type FastifyInstance } from 'fastify';
import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { getDb, type AppDatabase } from '../../src/db/client.js';
import { sessionRoutes } from '../../src/routes/session.routes.js';
import { vocabularyRoutes } from '../../src/routes/vocabulary.routes.js';
import { SessionRepository } from '../../src/repositories/session.repository.js';
import { StudyRepository } from '../../src/repositories/study.repository.js';
import { words, contexts, contextWords, learningSessions, learningSessionItems, learningAttempts, reviewLogs, studyTasks } from '../../src/db/schema.js';

const uuid = (n: number) => `00000000-0000-4000-8000-${String(n).padStart(12, '0')}`;

describe('redesigned learning session contract', () => {
  let db: AppDatabase;
  let app: FastifyInstance;
  let scoreOutput: (sentence: string) => number;

  beforeEach(async () => {
    db = getDb(':memory:');
    app = Fastify();
    scoreOutput = (sentence) => sentence.length < 12 ? 0 : 70;
    await app.register(vocabularyRoutes, { db });
    await app.register(sessionRoutes, { db, outputGrader: { grade: async ({ sentence }) => ({ score: scoreOutput(sentence), explanation: 'Mock grading result.', suggestion: sentence }) } });
    await app.ready();
    for (let i = 1; i <= 6; i++) {
      db.insert(words).values({ id: uuid(i), word: `word${i}`, definition: 'definition', difficulty: 'B1', createdAt: new Date().toISOString() }).run();
    }
  });

  afterEach(async () => {
    await app.close();
    db.sqlite.close();
  });

  it('persists linked task on session detail and rejects parameter mismatch without inserting', async () => {
    const today = new Date().toISOString().slice(0, 10);
    new StudyRepository(db).createTask({
      id: 'learn-linked', scheduledDate: today, kind: 'LEARN_WORDS', mode: 'new_words',
      targetCount: 2, source: 'MANUAL',
    }, new Date().toISOString());
    const started = await app.inject({ method: 'POST', url: '/api/learning/session', payload: { mode: 'new_words', count: 1, studyTaskId: 'learn-linked' } });
    expect(started.statusCode).toBe(201);
    const session = JSON.parse(started.payload).data;
    expect(session.studyTaskId).toBe('learn-linked');
    expect(JSON.parse((await app.inject({ method: 'GET', url: `/api/learning/session/${session.id}` })).payload).data.studyTaskId).toBe('learn-linked');
    await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/abandon` });
    const before = db.select().from(learningSessions).all().length;
    const mismatch = await app.inject({ method: 'POST', url: '/api/learning/session', payload: { mode: 'weak_words', count: 1, studyTaskId: 'learn-linked' } });
    expect(mismatch.statusCode).toBe(409);
    expect(db.select().from(learningSessions).all()).toHaveLength(before);
  });

  it('returns exact availableCount and creates no session when linked selection is short', async () => {
    db.insert(contexts).values({ id: 'short-context', title: 'Short', content: 'word1', createdAt: new Date().toISOString() }).run();
    db.insert(contextWords).values({ contextId: 'short-context', wordId: uuid(1) }).run();
    new StudyRepository(db).createTask({
      id: 'learn-short', scheduledDate: new Date().toISOString().slice(0, 10), kind: 'LEARN_WORDS',
      mode: 'context', contextId: 'short-context', targetCount: 3, source: 'MANUAL',
    }, new Date().toISOString());
    const response = await app.inject({ method: 'POST', url: '/api/learning/session', payload: { mode: 'context', contextId: 'short-context', count: 2, studyTaskId: 'learn-short' } });
    expect(response.statusCode).toBe(409);
    expect(JSON.parse(response.payload).error.details.availableCount).toBe(1);
    expect(db.select().from(learningSessions).all()).toHaveLength(0);
    expect(db.select().from(learningSessionItems).all()).toHaveLength(0);
  });
  it('rejects future, wrong-kind, cancelled, and transferred linked tasks without session writes', async () => {
    const now = new Date().toISOString();
    const today = now.slice(0, 10);
    const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
    const repository = new StudyRepository(db);
    repository.createTask({ id: 'future-task', scheduledDate: tomorrow, kind: 'LEARN_WORDS', mode: 'new_words', targetCount: 1, source: 'MANUAL' }, now);
    repository.createTask({ id: 'review-task', scheduledDate: today, kind: 'REVIEW_WORDS', targetCount: 1, source: 'MANUAL' }, now);
    repository.createTask({ id: 'cancel-task', scheduledDate: today, kind: 'LEARN_WORDS', mode: 'new_words', targetCount: 1, source: 'MANUAL' }, now);
    repository.patchTask('cancel-task', { action: 'CANCEL', version: 1 }, now);
    repository.createTask({ id: 'transfer-task', scheduledDate: today, kind: 'LEARN_WORDS', mode: 'new_words', targetCount: 1, source: 'MANUAL' }, now);
    db.update(studyTasks).set({ transferredAt: now }).where(eq(studyTasks.id, 'transfer-task')).run();
    for (const studyTaskId of ['future-task', 'review-task', 'cancel-task', 'transfer-task']) {
      const response = await app.inject({ method: 'POST', url: '/api/learning/session', payload: { mode: 'new_words', count: 1, studyTaskId } });
      expect(response.statusCode).toBe(409);
    }
    expect(db.select().from(learningSessions).all()).toHaveLength(0);
  });
  it('excludes already credited linked IDs before LIMIT and reports exhausted quota', async () => {
    const now = new Date().toISOString();
    db.insert(contexts).values({ id: 'linked-context', title: 'Linked', content: 'word1 word2' , createdAt: now }).run();
    db.insert(contextWords).values({ contextId: 'linked-context', wordId: uuid(1) }).run();
    db.insert(contextWords).values({ contextId: 'linked-context', wordId: uuid(2) }).run();
    new StudyRepository(db).createTask({ id: 'linked-selector', scheduledDate: now.slice(0, 10), kind: 'LEARN_WORDS', mode: 'context', contextId: 'linked-context', targetCount: 2, source: 'MANUAL' }, now);
    db.insert(learningSessions).values({ id: 'credited-session', sessionType: 'context', totalWords: 1, status: 'COMPLETED', startedAt: now, completedAt: now, studyTaskId: 'linked-selector' }).run();
    db.insert(learningSessionItems).values({ id: 'credited-item', sessionId: 'credited-session', wordId: uuid(1), position: 0, groupIndex: 0, completedStep: 'ASSESS', recallResult: 'CORRECT', outputSentence: 'ok', reviewRating: 'GOOD', createdAt: now }).run();
    const next = await app.inject({ method: 'POST', url: '/api/learning/session', payload: { mode: 'context', contextId: 'linked-context', count: 1, studyTaskId: 'linked-selector' } });
    expect(next.statusCode).toBe(201);
    expect(JSON.parse(next.payload).data.items[0].wordId).toBe(uuid(2));
    await app.inject({ method: 'POST', url: `/api/learning/session/${JSON.parse(next.payload).data.id}/abandon` });
    db.update(learningSessions).set({ status: 'COMPLETED', completedAt: now }).where(eq(learningSessions.id, JSON.parse(next.payload).data.id)).run();
    const exhausted = await app.inject({ method: 'POST', url: '/api/learning/session', payload: { mode: 'context', contextId: 'linked-context', count: 1, studyTaskId: 'linked-selector' } });
    expect(exhausted.statusCode).toBe(409);
    expect(JSON.parse(exhausted.payload).error.details.availableCount).toBe(0);
  });
  it('preserves context selection order for deterministic first-word sessions', async () => {
    db.insert(contexts).values({ id: 'context-order', title: 'Ordered context', content: 'word3 word1', createdAt: new Date().toISOString() }).run();
    db.insert(contextWords).values({ contextId: 'context-order', wordId: uuid(3) }).run();
    db.insert(contextWords).values({ contextId: 'context-order', wordId: uuid(1) }).run();
    const response = await app.inject({ method: 'POST', url: '/api/learning/session', payload: { mode: 'context', contextId: 'context-order', count: 1 } });
    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.payload).data.items[0].wordId).toBe(uuid(3));
  });

  it('loads item relations with bounded batch queries', async () => {
    const start = await app.inject({ method: 'POST', url: '/api/learning/session', payload: { mode: 'new_words', count: 6 } });
    const sessionId = JSON.parse(start.payload).data.id;
    let selectCount = 0;
    const trackedDb = new Proxy(db, {
      get(target, property, receiver) {
        if (property !== 'select') return Reflect.get(target, property, receiver);
        return (...args: unknown[]) => {
          selectCount += 1;
          return (target as any).select(...args);
        };
      },
    }) as AppDatabase;
    new SessionRepository(trackedDb).findById(sessionId);
    expect(selectCount).toBeLessThanOrEqual(7);
  });

  it('rejects deprecated client correctness and answer fields', async () => {
    const response = await app.inject({ method: 'POST', url: '/api/learning/session', payload: { mode: 'new_words', count: 1 } });
    const session = JSON.parse(response.payload).data;
    const result = await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload: { requestId: 'r1', wordId: session.items[0].wordId, step: 'CONTEXT', recallCorrect: true, userSentence: 'bad' } });
    expect(result.statusCode).toBe(400);
  });

  it('creates stable grouped positions and prevents a second active session', async () => {
    const first = await app.inject({ method: 'POST', url: '/api/learning/session', payload: { mode: 'new_words', count: 6 } });
    expect(first.statusCode).toBe(201);
    const data = JSON.parse(first.payload).data;
    expect(data.items.map((item: any) => [item.position, item.groupIndex])).toEqual([[0, 0], [1, 0], [2, 0], [3, 1], [4, 1], [5, 1]]);
    const second = await app.inject({ method: 'POST', url: '/api/learning/session', payload: { mode: 'new_words', count: 1 } });
    expect(second.statusCode).toBe(409);
  });

  it('moves from first word encoding to second word context before retrieval', async () => {
    const start = await app.inject({ method: 'POST', url: '/api/learning/session', payload: { mode: 'new_words', count: 2 } });
    const session = JSON.parse(start.payload).data;
    const first = session.items[0];
    const second = session.items[1];
    for (const [step, requestId] of [['CONTEXT', 'sequence-context'], ['UNDERSTAND', 'sequence-understand']] as const) {
      const response = await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload: { requestId, wordId: first.wordId, step } });
      expect(response.statusCode).toBe(200);
    }
    const encoding = await app.inject({ method: 'GET', url: `/api/learning/session/${session.id}` });
    expect(JSON.parse(encoding.payload).data.cursor).toMatchObject({ phase: 'ENCODE', step: 'CONTEXT', itemId: second.id, wordId: second.wordId });
    expect(JSON.parse(encoding.payload).data.cursor.itemId).not.toBe(first.id);
    for (const [step, requestId] of [['CONTEXT', 'sequence-second-context'], ['UNDERSTAND', 'sequence-second-understand']] as const) {
      const response = await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload: { requestId, wordId: second.wordId, step } });
      expect(response.statusCode).toBe(200);
    }
    const retrieval = await app.inject({ method: 'GET', url: `/api/learning/session/${session.id}` });
    expect(JSON.parse(retrieval.payload).data.cursor).toMatchObject({ phase: 'RETRIEVE', step: 'RECALL', itemId: first.id, wordId: first.wordId });
  });

  it('persists exact cursor-relevant actions and idempotent request IDs', async () => {
    const start = await app.inject({ method: 'POST', url: '/api/learning/session', payload: { mode: 'new_words', count: 1 } });
    const session = JSON.parse(start.payload).data;
    const wordId = session.items[0].wordId;
    for (const [step, requestId] of [['CONTEXT', 'context-request'], ['UNDERSTAND', 'understand-request']]) {
      const response = await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload: { requestId, wordId, step } });
      expect(response.statusCode).toBe(200);
    }
    const payload = { requestId: 'same-request', wordId, step: 'RECALL', answer: 'wrong' };
    const first = await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload });
    const second = await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload });
    expect(first.statusCode).toBe(200);
    expect(second.statusCode).toBe(200);
    expect(JSON.parse(second.payload)).toEqual(JSON.parse(first.payload));
    expect(db.select().from(learningAttempts).all()).toHaveLength(1);
  });

  it('resumes persisted recall retry and reveals answer after second failure', async () => {
    const start = await app.inject({ method: 'POST', url: '/api/learning/session', payload: { mode: 'new_words', count: 1 } });
    const session = JSON.parse(start.payload).data;
    const wordId = session.items[0].wordId;
    for (const [step, requestId] of [['CONTEXT', 'resume-context'], ['UNDERSTAND', 'resume-understand']]) {
      expect((await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload: { requestId, wordId, step } })).statusCode).toBe(200);
    }
    const first = await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload: { requestId: 'resume-recall-one', wordId, step: 'RECALL', answer: 'wrong' } });
    expect(JSON.parse(first.payload).data.feedback).toMatchObject({ attemptNumber: 1, canRetry: true, hint: { firstLetter: 'w', letterCount: 4 } });
    expect(JSON.parse(first.payload).data.feedback).not.toHaveProperty('revealedAnswer');
    const resumed = await app.inject({ method: 'GET', url: `/api/learning/session/${session.id}` });
    expect(JSON.parse(resumed.payload).data.cursor).toMatchObject({ step: 'RECALL', attemptNumber: 2 });
    expect(JSON.parse(resumed.payload).data.items[0].attempts).toHaveLength(1);
    const second = await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload: { requestId: 'resume-recall-two', wordId, step: 'RECALL', answer: 'still wrong' } });
    expect(JSON.parse(second.payload).data.feedback).toMatchObject({ attemptNumber: 2, canRetry: false, revealedAnswer: session.items[0].word.word });
    expect(JSON.parse(second.payload).data.cursor).toMatchObject({ step: 'OUTPUT', attemptNumber: 1 });
  });

  it('rejects a third attempt without creating another persisted attempt', async () => {
    const start = await app.inject({ method: 'POST', url: '/api/learning/session', payload: { mode: 'new_words', count: 1 } });
    const session = JSON.parse(start.payload).data;
    const wordId = session.items[0].wordId;
    for (const [step, requestId] of [['CONTEXT', 'third-context'], ['UNDERSTAND', 'third-understand']]) {
      expect((await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload: { requestId, wordId, step } })).statusCode).toBe(200);
    }
    for (const requestId of ['recall-one', 'recall-two']) {
      expect((await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload: { requestId, wordId, step: 'RECALL', answer: 'wrong' } })).statusCode).toBe(200);
    }
    const third = await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload: { requestId: 'recall-three', wordId, step: 'RECALL', answer: 'wrong' } });
    expect(third.statusCode).toBe(409);
    expect(JSON.parse(third.payload).error.code).toBe('CONFLICT');
    expect(db.select().from(learningAttempts).all()).toHaveLength(2);
  });

  async function prepareCompleteSession() {
    const start = await app.inject({ method: 'POST', url: '/api/learning/session', payload: { mode: 'new_words', count: 1 } });
    const session = JSON.parse(start.payload).data;
    const wordId = session.items[0].wordId;
    const steps = [
      { requestId: 'complete-context', wordId, step: 'CONTEXT' },
      { requestId: 'complete-understand', wordId, step: 'UNDERSTAND' },
      { requestId: 'complete-recall', wordId, step: 'RECALL', answer: session.items[0].word.word },
      { requestId: 'complete-output', wordId, step: 'OUTPUT', answer: `This ${session.items[0].word.word} example works.` },
      { requestId: 'complete-assess', wordId, step: 'ASSESS', assessmentRating: 'GOOD' },
    ];
    for (const payload of steps) {
      expect((await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload })).statusCode).toBe(200);
    }
    return { id: session.id, wordId };
  }

  it('reports final recall and output attempts in completion summary and review logs', async () => {
    const start = await app.inject({ method: 'POST', url: '/api/learning/session', payload: { mode: 'new_words', count: 1 } });
    const session = JSON.parse(start.payload).data;
    const wordId = session.items[0].wordId;
    const actions = [
      { requestId: 'summary-context', wordId, step: 'CONTEXT' },
      { requestId: 'summary-understand', wordId, step: 'UNDERSTAND' },
      { requestId: 'summary-recall-wrong', wordId, step: 'RECALL', answer: 'wrong' },
      { requestId: 'summary-recall-right', wordId, step: 'RECALL', answer: session.items[0].word.word },
      { requestId: 'summary-output-invalid', wordId, step: 'OUTPUT', answer: 'too short' },
      { requestId: 'summary-output-valid', wordId, step: 'OUTPUT', answer: `This ${session.items[0].word.word} example works.` },
      { requestId: 'summary-assess', wordId, step: 'ASSESS', assessmentRating: 'GOOD' },
    ];
    for (const payload of actions) expect((await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload })).statusCode).toBe(200);

    const completed = await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/complete` });
    const data = JSON.parse(completed.payload).data;
    expect(data.summary).toEqual({ totalWords: 1, recallFirstTry: 0, recallSecondTry: 1, recallFailed: 0, outputValid: 1, outputInvalid: 0, legacyUnknown: 0 });
    expect(db.sqlite.prepare("SELECT performance_score AS performanceScore, answer FROM review_logs WHERE word_id = ? AND review_type = 'RECALL'").get(wordId)).toEqual({ performanceScore: 70, answer: session.items[0].word.word });
    expect(db.sqlite.prepare("SELECT performance_score AS performanceScore, answer FROM review_logs WHERE word_id = ? AND review_type = 'PRODUCTION'").get(wordId)).toEqual({ performanceScore: 70, answer: `This ${session.items[0].word.word} example works.` });
    expect(db.select().from(reviewLogs).all().every((log) => log.studyTaskId === null)).toBe(true);
  });

  it('persists invalid Output attempt one and advances to Assess after valid attempt two', async () => {
    const start = await app.inject({ method: 'POST', url: '/api/learning/session', payload: { mode: 'new_words', count: 1 } });
    const session = JSON.parse(start.payload).data;
    const wordId = session.items[0].wordId;
    for (const payload of [
      { requestId: 'output-valid-context', wordId, step: 'CONTEXT' },
      { requestId: 'output-valid-understand', wordId, step: 'UNDERSTAND' },
      { requestId: 'output-valid-recall', wordId, step: 'RECALL', answer: session.items[0].word.word },
      { requestId: 'output-invalid-one', wordId, step: 'OUTPUT', answer: 'too short' },
    ]) expect((await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload })).statusCode).toBe(200);
    const first = db.select().from(learningAttempts).all();
    expect(first).toHaveLength(2);
    expect(first.find((attempt) => attempt.type === 'OUTPUT')).toMatchObject({ attemptNumber: 1, result: 'INVALID', performanceScore: 0, source: 'AI' });
    const second = await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload: { requestId: 'output-valid-two', wordId, step: 'OUTPUT', answer: `This ${session.items[0].word.word} example works.` } });
    expect(JSON.parse(second.payload).data.cursor).toMatchObject({ step: 'ASSESS', attemptNumber: null });
    expect(db.select().from(learningAttempts).all()).toHaveLength(3);
    expect(db.select().from(learningAttempts).all().find((attempt) => attempt.type === 'OUTPUT' && attempt.attemptNumber === 2)).toMatchObject({ result: 'VALID_AFTER_FEEDBACK', performanceScore: 70 });
  });

  it('completes a below-threshold Output after attempt two and records it as incorrect', async () => {
    const start = await app.inject({ method: 'POST', url: '/api/learning/session', payload: { mode: 'new_words', count: 1 } });
    const session = JSON.parse(start.payload).data;
    const wordId = session.items[0].wordId;
    scoreOutput = () => 42;
    for (const payload of [
      { requestId: 'output-invalid-context', wordId, step: 'CONTEXT' },
      { requestId: 'output-invalid-understand', wordId, step: 'UNDERSTAND' },
      { requestId: 'output-invalid-recall', wordId, step: 'RECALL', answer: session.items[0].word.word },
      { requestId: 'output-invalid-one', wordId, step: 'OUTPUT', answer: 'This sentence uses the word.' },
      { requestId: 'output-invalid-two', wordId, step: 'OUTPUT', answer: 'This revised sentence uses the word.' },
    ]) expect((await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload })).statusCode).toBe(200);
    const outputAttempts = db.select().from(learningAttempts).all().filter((attempt) => attempt.type === 'OUTPUT');
    expect(JSON.parse((await app.inject({ method: 'GET', url: `/api/learning/session/${session.id}` })).payload).data.cursor).toMatchObject({ step: 'ASSESS', attemptNumber: null });
    expect(outputAttempts).toHaveLength(2);
    expect(outputAttempts.map((attempt) => [attempt.attemptNumber, attempt.result, attempt.performanceScore])).toEqual([[1, 'INVALID', 42], [2, 'INVALID', 42]]);
    expect((await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload: { requestId: 'output-invalid-assess', wordId, step: 'ASSESS', assessmentRating: 'GOOD' } })).statusCode).toBe(200);
    expect((await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/complete` })).statusCode).toBe(200);
    expect(db.sqlite.prepare("SELECT correct, performance_score AS performanceScore FROM review_logs WHERE word_id = ? AND review_type = 'PRODUCTION'").get(wordId)).toEqual({ correct: 0, performanceScore: 42 });
  });

  it('uses the inclusive 60-point Output pass threshold', async () => {
    const start = await app.inject({ method: 'POST', url: '/api/learning/session', payload: { mode: 'new_words', count: 1 } });
    const session = JSON.parse(start.payload).data;
    const wordId = session.items[0].wordId;
    for (const payload of [
      { requestId: 'threshold-context', wordId, step: 'CONTEXT' },
      { requestId: 'threshold-understand', wordId, step: 'UNDERSTAND' },
      { requestId: 'threshold-recall', wordId, step: 'RECALL', answer: session.items[0].word.word },
    ]) await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload });
    scoreOutput = () => 59;
    const below = await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload: { requestId: 'threshold-below', wordId, step: 'OUTPUT', answer: 'This is the first boundary sentence.' } });
    expect(JSON.parse(below.payload).data.feedback).toMatchObject({ score: 59, outcome: 'INVALID', canRetry: true });
    scoreOutput = () => 60;
    const passing = await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload: { requestId: 'threshold-passing', wordId, step: 'OUTPUT', answer: 'This is the revised boundary sentence.' } });
    expect(JSON.parse(passing.payload).data).toMatchObject({ cursor: { step: 'ASSESS' }, feedback: { score: 60, outcome: 'VALID_AFTER_FEEDBACK', canRetry: false } });
  });

  it('commits concurrent retries with the same Output request ID only once', async () => {
    const start = await app.inject({ method: 'POST', url: '/api/learning/session', payload: { mode: 'new_words', count: 1 } });
    const session = JSON.parse(start.payload).data;
    const wordId = session.items[0].wordId;
    for (const payload of [
      { requestId: 'concurrent-context', wordId, step: 'CONTEXT' },
      { requestId: 'concurrent-understand', wordId, step: 'UNDERSTAND' },
      { requestId: 'concurrent-recall', wordId, step: 'RECALL', answer: session.items[0].word.word },
    ]) await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload });
    const payload = { requestId: 'concurrent-output', wordId, step: 'OUTPUT', answer: 'This sentence is graded concurrently.' };
    const responses = await Promise.all([
      app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload }),
      app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload }),
    ]);
    expect(responses.map((response) => response.statusCode)).toEqual([200, 200]);
    expect(JSON.parse(responses[1].payload)).toEqual(JSON.parse(responses[0].payload));
    expect(db.select().from(learningAttempts).all().filter((attempt) => attempt.type === 'OUTPUT')).toHaveLength(1);
  });

  it('persists AI score and feedback, and returns them on resume', async () => {
    const start = await app.inject({ method: 'POST', url: '/api/learning/session', payload: { mode: 'new_words', count: 1 } });
    const session = JSON.parse(start.payload).data;
    const wordId = session.items[0].wordId;
    for (const payload of [
      { requestId: 'ai-context', wordId, step: 'CONTEXT' },
      { requestId: 'ai-understand', wordId, step: 'UNDERSTAND' },
      { requestId: 'ai-recall', wordId, step: 'RECALL', answer: session.items[0].word.word },
    ]) await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload });
    app.close();
    app = Fastify();
    await app.register(vocabularyRoutes, { db });
    await app.register(sessionRoutes, { db, outputGrader: { grade: async () => ({ score: 84, explanation: 'Correct meaning and grammar.', suggestion: 'She occupies the front room.' }) } });
    await app.ready();
    const output = await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload: { requestId: 'ai-output', wordId, step: 'OUTPUT', answer: 'She occupies the room.' } });
    expect(output.statusCode).toBe(200);
    expect(JSON.parse(output.payload).data.feedback).toMatchObject({ score: 84, explanation: 'Correct meaning and grammar.', suggestion: 'She occupies the front room.' });
    expect(db.select().from(learningAttempts).all().find((attempt) => attempt.type === 'OUTPUT')).toMatchObject({ performanceScore: 84, source: 'AI' });
    const resumed = await app.inject({ method: 'GET', url: `/api/learning/session/${session.id}` });
    expect(JSON.parse(resumed.payload).data.items[0].feedback).toMatchObject({ score: 84, explanation: 'Correct meaning and grammar.', suggestion: 'She occupies the front room.' });
  });

  it('does not consume an Output attempt when grading fails and allows same request ID retry', async () => {
    const start = await app.inject({ method: 'POST', url: '/api/learning/session', payload: { mode: 'new_words', count: 1 } });
    const session = JSON.parse(start.payload).data;
    const wordId = session.items[0].wordId;
    for (const payload of [
      { requestId: 'ai-fail-context', wordId, step: 'CONTEXT' },
      { requestId: 'ai-fail-understand', wordId, step: 'UNDERSTAND' },
      { requestId: 'ai-fail-recall', wordId, step: 'RECALL', answer: session.items[0].word.word },
    ]) await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload });
    app.close();
    app = Fastify();
    await app.register(vocabularyRoutes, { db });
    let calls = 0;
    await app.register(sessionRoutes, { db, outputGrader: { grade: async () => { if (++calls === 1) throw new Error('private-provider-detail'); return { score: 42, explanation: 'Wrong sense.', suggestion: 'Try another sentence.' }; } } });
    await app.ready();
    const payload = { requestId: 'retry-ai-id', wordId, step: 'OUTPUT', answer: 'She occupies the room.' };
    const failed = await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload });
    expect(failed.statusCode).toBe(503);
    expect(JSON.parse(failed.payload).error.code).toBe('SERVICE_UNAVAILABLE');
    expect(failed.payload).not.toContain('private-provider-detail');
    expect(db.select().from(learningAttempts).all().filter((attempt) => attempt.type === 'OUTPUT')).toHaveLength(0);
    expect(JSON.parse((await app.inject({ method: 'GET', url: `/api/learning/session/${session.id}` })).payload).data.cursor).toMatchObject({ step: 'OUTPUT', attemptNumber: 1 });
    const retried = await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload });
    expect(retried.statusCode).toBe(200);
    expect(JSON.parse(retried.payload).data.feedback).toMatchObject({ score: 42, canRetry: true, attemptNumber: 1 });
    expect(db.select().from(learningAttempts).all().filter((attempt) => attempt.type === 'OUTPUT')).toHaveLength(1);
  });

  it('makes repeated and concurrent completion idempotent', async () => {
    const session = await prepareCompleteSession();
    const responses = await Promise.all([
      app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/complete` }),
      app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/complete` }),
    ]);
    expect(responses.map((response) => response.statusCode)).toEqual([200, 200]);
    expect(responses.map((response) => JSON.parse(response.payload).data.status)).toEqual(['COMPLETED', 'COMPLETED']);
    expect(db.select().from(learningAttempts).all()).toHaveLength(2);
    expect(db.sqlite.prepare("SELECT count(*) AS count FROM review_logs WHERE word_id = ?").get(session.wordId)).toEqual({ count: 2 });
    expect(db.sqlite.prepare("SELECT count(*) AS count FROM review_states WHERE word_id = ?").get(session.wordId)).toEqual({ count: 1 });
  });

  it('rolls back every completion effect when a review log write fails', async () => {
    const session = await prepareCompleteSession();
    db.sqlite.exec(`
      CREATE TRIGGER fail_learning_completion
      BEFORE INSERT ON review_logs
      BEGIN
        SELECT RAISE(ABORT, 'learning completion failure');
      END;
    `);
    const response = await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/complete` });
    expect(response.statusCode).toBe(500);
    expect(db.sqlite.prepare('SELECT status, completed_at AS completedAt FROM learning_sessions WHERE id = ?').get(session.id)).toEqual({ status: 'IN_PROGRESS', completedAt: null });
    expect(db.sqlite.prepare("SELECT count(*) AS count FROM review_logs WHERE word_id = ?").get(session.wordId)).toEqual({ count: 0 });
    expect(db.sqlite.prepare("SELECT count(*) AS count FROM review_states WHERE word_id = ?").get(session.wordId)).toEqual({ count: 0 });
    expect(db.sqlite.prepare("SELECT count(*) AS count FROM learning_progress WHERE word_id = ?").get(session.wordId)).toEqual({ count: 0 });
  });

  it('abandons idempotently without deleting session evidence or applying progress', async () => {
    const session = await prepareCompleteSession();
    const first = await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/abandon` });
    const second = await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/abandon` });
    expect(first.statusCode).toBe(200);
    expect(second.statusCode).toBe(200);
    expect(JSON.parse(second.payload).data.status).toBe('ABANDONED');
    expect(db.sqlite.prepare('SELECT count(*) AS count FROM learning_session_items WHERE session_id = ?').get(session.id)).toEqual({ count: 1 });
    expect(db.sqlite.prepare("SELECT count(*) AS count FROM review_logs WHERE word_id = ?").get(session.wordId)).toEqual({ count: 0 });
    expect(db.sqlite.prepare("SELECT count(*) AS count FROM learning_progress WHERE word_id = ?").get(session.wordId)).toEqual({ count: 0 });
  });
});
