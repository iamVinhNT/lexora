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
import type { OutputGrader } from '../../src/domain/learning/ai-output-grader.js';
import { SessionRepository } from '../../src/repositories/session.repository.js';
import { StudyRepository } from '../../src/repositories/study.repository.js';
import { words, contexts, contextWords, learningSessions, learningSessionItems, learningAttempts, reviewLogs, studyTasks } from '../../src/db/schema.js';

const uuid = (n: number) => `00000000-0000-4000-8000-${String(n).padStart(12, '0')}`;

describe('redesigned learning session contract', () => {
  let db: AppDatabase;
  let app: FastifyInstance;
  let scoreOutput: (sentence: string) => number;
  let gradeCalls: number;

  beforeEach(async () => {
    db = getDb(':memory:');
    app = Fastify();
    scoreOutput = (sentence) => sentence.length < 12 ? 0 : 70;
    gradeCalls = 0;
    await app.register(vocabularyRoutes, { db });
    await app.register(sessionRoutes, { db, outputGrader: { grade: async ({ sentence }) => (gradeCalls++, { score: scoreOutput(sentence), explanation: 'Mock grading result.', suggestion: sentence }) } });
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

  const sessionUrl = (id: string, suffix = '') => `/api/learning/session/${id}${suffix}`;
  const submit = (id: string, payload: Record<string, unknown>) => app.inject({ method: 'POST', url: sessionUrl(id, '/step'), payload });
  const gradeOutputs = (id: string) => app.inject({ method: 'POST', url: sessionUrl(id, '/grade-outputs') });
  const outputAttempts = () => db.select().from(learningAttempts).all().filter((attempt) => attempt.type === 'OUTPUT');
  const sessionData = async (id: string) => JSON.parse((await app.inject({ method: 'GET', url: sessionUrl(id) })).payload).data;

  async function replaceApp(outputGrader: OutputGrader) {
    await app.close();
    app = Fastify();
    await app.register(vocabularyRoutes, { db });
    await app.register(sessionRoutes, { db, outputGrader });
    await app.ready();
  }

  /** Answers whatever step the server cursor asks for until the session has no step left. */
  async function driveSession(id: string, sentenceFor: (word: string) => string = (word) => `This ${word} example works.`) {
    for (let guard = 0; guard < 60; guard++) {
      const session = await sessionData(id);
      const { step, wordId } = session.cursor;
      if (!step) return session;
      const word = session.items.find((item: { wordId: string }) => item.wordId === wordId).word.word;
      const extra = step === 'RECALL' ? { answer: word } : step === 'OUTPUT' ? { answer: sentenceFor(word) } : step === 'ASSESS' ? { assessmentRating: 'GOOD' } : {};
      expect((await submit(id, { requestId: `drive-${guard}`, wordId, step, ...extra })).statusCode).toBe(200);
    }
    throw new Error('session never reached the end of its cursor');
  }

  async function startSession(count: number) {
    return JSON.parse((await app.inject({ method: 'POST', url: '/api/learning/session', payload: { mode: 'new_words', count } })).payload).data;
  }

  async function prepareCompleteSession() {
    const session = await startSession(1);
    await driveSession(session.id);
    expect((await gradeOutputs(session.id)).statusCode).toBe(200);
    return { id: session.id, wordId: session.items[0].wordId };
  }

  it('saves the Output sentence without grading it and moves straight to Assess', async () => {
    const session = await startSession(1);
    const wordId = session.items[0].wordId;
    for (const [step, requestId] of [['CONTEXT', 'save-context'], ['UNDERSTAND', 'save-understand']]) await submit(session.id, { requestId, wordId, step });
    await submit(session.id, { requestId: 'save-recall', wordId, step: 'RECALL', answer: session.items[0].word.word });
    const saved = await submit(session.id, { requestId: 'save-output', wordId, step: 'OUTPUT', answer: '  She occupies the room.  ' });
    expect(saved.statusCode).toBe(200);
    expect(JSON.parse(saved.payload).data).toMatchObject({ feedback: null, cursor: { step: 'ASSESS', attemptNumber: null }, item: { completedStep: 'OUTPUT', outputSentence: 'She occupies the room.' } });
    expect(gradeCalls).toBe(0);
    expect(outputAttempts()).toHaveLength(0);
    await submit(session.id, { requestId: 'save-assess', wordId, step: 'ASSESS', assessmentRating: 'GOOD' });
    expect((await sessionData(session.id)).cursor).toMatchObject({ phase: 'COMPLETE', step: null });
  });

  it('replays a repeated Output save whose first response was lost', async () => {
    const session = await startSession(1);
    const wordId = session.items[0].wordId;
    for (const [step, requestId] of [['CONTEXT', 'replay-context'], ['UNDERSTAND', 'replay-understand']]) await submit(session.id, { requestId, wordId, step });
    await submit(session.id, { requestId: 'replay-recall', wordId, step: 'RECALL', answer: session.items[0].word.word });
    const payload = { requestId: 'replay-output', wordId, step: 'OUTPUT', answer: 'She occupies the room.' };
    const first = await submit(session.id, payload);
    const second = await submit(session.id, payload);
    expect([first.statusCode, second.statusCode]).toEqual([200, 200]);
    expect(JSON.parse(second.payload).data).toMatchObject({ feedback: null, cursor: { step: 'ASSESS' }, item: { outputSentence: 'She occupies the room.' } });
    const different = await submit(session.id, { ...payload, requestId: 'replay-other', answer: 'A different sentence.' });
    expect(different.statusCode).toBe(409);
  });

  it('refuses to grade before every item is assessed', async () => {
    const session = await startSession(2);
    const word = session.items[0];
    for (const [step, requestId] of [['CONTEXT', 'early-c1'], ['UNDERSTAND', 'early-u1']]) await submit(session.id, { requestId, wordId: word.wordId, step });
    const early = await gradeOutputs(session.id);
    expect(early.statusCode).toBe(409);
    expect(JSON.parse(early.payload).error.code).toBe('INVALID_SESSION_TRANSITION');
    expect(gradeCalls).toBe(0);
  });

  it('rejects an empty Output sentence without saving anything', async () => {
    const session = await startSession(1);
    const wordId = session.items[0].wordId;
    for (const [step, requestId] of [['CONTEXT', 'empty-context'], ['UNDERSTAND', 'empty-understand']]) await submit(session.id, { requestId, wordId, step });
    await submit(session.id, { requestId: 'empty-recall', wordId, step: 'RECALL', answer: session.items[0].word.word });
    const empty = await submit(session.id, { requestId: 'empty-output', wordId, step: 'OUTPUT', answer: '   ' });
    expect(empty.statusCode).toBe(400);
    expect(JSON.parse(empty.payload).error.code).toBe('EMPTY_OUTPUT');
    expect((await sessionData(session.id)).cursor).toMatchObject({ step: 'OUTPUT' });
  });

  it('refuses to complete while saved sentences are still ungraded', async () => {
    const session = await startSession(1);
    await driveSession(session.id);
    const early = await app.inject({ method: 'POST', url: sessionUrl(session.id, '/complete') });
    expect(early.statusCode).toBe(400);
    expect(JSON.parse(early.payload).error.code).toBe('OUTPUT_NOT_GRADED');
    expect((await sessionData(session.id)).status).toBe('IN_PROGRESS');
    expect(db.select().from(reviewLogs).all()).toHaveLength(0);
  });

  it('grades every saved sentence in one provider call and applies the 60-point threshold', async () => {
    const batches: Array<Array<{ id: string; word: string; definition: string; sentence: string }>> = [];
    await replaceApp({
      grade: async () => { throw new Error('single grading must not be used'); },
      gradeBatch: async (inputs) => { batches.push(inputs); return inputs.map((input) => ({ id: input.id, score: input.sentence.includes('below') ? 59 : 60, explanation: `Explained ${input.word}.`, suggestion: `Better ${input.word}.` })); },
    });
    const session = await startSession(2);
    await driveSession(session.id, (word) => (word === 'word1' ? `A below sentence with ${word}.` : `A passing sentence with ${word}.`));
    const graded = await gradeOutputs(session.id);
    expect(graded.statusCode).toBe(200);
    expect(batches).toHaveLength(1);
    expect(batches[0].map((input) => [input.word, input.definition, input.sentence])).toEqual([
      ['word1', 'definition', 'A below sentence with word1.'], ['word2', 'definition', 'A passing sentence with word2.'],
    ]);
    expect(outputAttempts().map((attempt) => [attempt.attemptNumber, attempt.result, attempt.performanceScore, attempt.source])).toEqual([[1, 'INVALID', 59, 'AI'], [1, 'VALID', 60, 'AI']]);
    const items = JSON.parse(graded.payload).data.items;
    expect(items[0].feedback).toMatchObject({ outcome: 'INVALID', score: 59, canRetry: false, explanation: 'Explained word1.', suggestion: 'Better word1.' });
    const completed = JSON.parse((await app.inject({ method: 'POST', url: sessionUrl(session.id, '/complete') })).payload).data;
    expect(completed.summary).toMatchObject({ outputValid: 1, outputInvalid: 1 });
    expect(db.sqlite.prepare("SELECT correct, performance_score AS performanceScore FROM review_logs WHERE word_id = ? AND review_type = 'PRODUCTION'").get(session.items[0].wordId)).toEqual({ correct: 0, performanceScore: 59 });
    expect(db.sqlite.prepare("SELECT correct, performance_score AS performanceScore FROM review_logs WHERE word_id = ? AND review_type = 'PRODUCTION'").get(session.items[1].wordId)).toEqual({ correct: 1, performanceScore: 60 });
  });

  it('falls back to grading each sentence separately when the grader has no batch support', async () => {
    const session = await startSession(2);
    await driveSession(session.id);
    expect((await gradeOutputs(session.id)).statusCode).toBe(200);
    expect(gradeCalls).toBe(2);
    expect(outputAttempts()).toHaveLength(2);
  });

  it('reports final recall and output results in the completion summary and review logs', async () => {
    const session = await startSession(1);
    const wordId = session.items[0].wordId;
    const word = session.items[0].word.word;
    for (const [step, requestId, answer] of [['CONTEXT', 'summary-context'], ['UNDERSTAND', 'summary-understand'], ['RECALL', 'summary-recall-wrong', 'wrong'], ['RECALL', 'summary-recall-right', word], ['OUTPUT', 'summary-output', `This ${word} example works.`]]) {
      expect((await submit(session.id, { requestId, wordId, step, ...(answer ? { answer } : {}) })).statusCode).toBe(200);
    }
    await submit(session.id, { requestId: 'summary-assess', wordId, step: 'ASSESS', assessmentRating: 'GOOD' });
    await gradeOutputs(session.id);
    const data = JSON.parse((await app.inject({ method: 'POST', url: sessionUrl(session.id, '/complete') })).payload).data;
    expect(data.summary).toEqual({ totalWords: 1, recallFirstTry: 0, recallSecondTry: 1, recallFailed: 0, outputValid: 1, outputInvalid: 0, legacyUnknown: 0 });
    expect(db.sqlite.prepare("SELECT performance_score AS performanceScore, answer FROM review_logs WHERE word_id = ? AND review_type = 'RECALL'").get(wordId)).toEqual({ performanceScore: 70, answer: word });
    expect(db.sqlite.prepare("SELECT performance_score AS performanceScore, answer FROM review_logs WHERE word_id = ? AND review_type = 'PRODUCTION'").get(wordId)).toEqual({ performanceScore: 70, answer: `This ${word} example works.` });
    expect(db.select().from(reviewLogs).all().every((log) => log.studyTaskId === null)).toBe(true);
  });

  it('records a below-threshold sentence as incorrect production', async () => {
    scoreOutput = () => 42;
    const session = await prepareCompleteSession();
    expect((await app.inject({ method: 'POST', url: sessionUrl(session.id, '/complete') })).statusCode).toBe(200);
    expect(db.sqlite.prepare("SELECT correct, performance_score AS performanceScore FROM review_logs WHERE word_id = ? AND review_type = 'PRODUCTION'").get(session.wordId)).toEqual({ correct: 0, performanceScore: 42 });
  });

  it('commits concurrent grading requests only once', async () => {
    const session = await startSession(1);
    await driveSession(session.id);
    const responses = await Promise.all([gradeOutputs(session.id), gradeOutputs(session.id)]);
    expect(responses.map((response) => response.statusCode)).toEqual([200, 200]);
    expect(outputAttempts()).toHaveLength(1);
    expect((await gradeOutputs(session.id)).statusCode).toBe(200);
    expect(outputAttempts()).toHaveLength(1);
  });

  it('persists AI score and feedback, and returns them on resume', async () => {
    await replaceApp({ grade: async () => ({ score: 84, explanation: 'Correct meaning and grammar.', suggestion: 'She occupies the front room.' }) });
    const session = await startSession(1);
    await driveSession(session.id, () => 'She occupies the room.');
    const graded = await gradeOutputs(session.id);
    expect(graded.statusCode).toBe(200);
    expect(outputAttempts()[0]).toMatchObject({ performanceScore: 84, source: 'AI', answer: 'She occupies the room.' });
    expect((await sessionData(session.id)).items[0].feedback).toMatchObject({ score: 84, explanation: 'Correct meaning and grammar.', suggestion: 'She occupies the front room.' });
  });

  it('keeps sentences ungraded when the provider fails and succeeds on retry', async () => {
    let calls = 0;
    await replaceApp({ grade: async () => { if (++calls === 1) throw new Error('private-provider-detail'); return { score: 42, explanation: 'Wrong sense.', suggestion: 'Try another sentence.' }; } });
    const session = await startSession(1);
    await driveSession(session.id, () => 'She occupies the room.');
    const failed = await gradeOutputs(session.id);
    expect(failed.statusCode).toBe(503);
    expect(JSON.parse(failed.payload).error.code).toBe('SERVICE_UNAVAILABLE');
    expect(failed.payload).not.toContain('private-provider-detail');
    expect(outputAttempts()).toHaveLength(0);
    expect((await sessionData(session.id)).items[0].outputSentence).toBe('She occupies the room.');
    expect((await gradeOutputs(session.id)).statusCode).toBe(200);
    expect(outputAttempts()).toHaveLength(1);
  });

  it('treats a batch response that misses a sentence as a grading failure', async () => {
    await replaceApp({ grade: async () => { throw new Error('unused'); }, gradeBatch: async (inputs) => inputs.slice(1).map((input) => ({ id: input.id, score: 90, explanation: 'ok', suggestion: 'ok' })) });
    const session = await startSession(2);
    await driveSession(session.id);
    expect((await gradeOutputs(session.id)).statusCode).toBe(503);
    expect(outputAttempts()).toHaveLength(0);
  });

  it('rejects grading for a session that is not in progress', async () => {
    const session = await startSession(1);
    await app.inject({ method: 'POST', url: sessionUrl(session.id, '/abandon') });
    expect((await gradeOutputs(session.id)).statusCode).toBe(409);
    expect((await gradeOutputs('missing-session')).statusCode).toBe(404);
  });

  it('grades a sentence saved after a legacy graded first attempt as attempt two', async () => {
    const session = await startSession(1);
    const wordId = session.items[0].wordId;
    for (const [step, requestId] of [['CONTEXT', 'legacy-context'], ['UNDERSTAND', 'legacy-understand']]) await submit(session.id, { requestId, wordId, step });
    await submit(session.id, { requestId: 'legacy-recall', wordId, step: 'RECALL', answer: session.items[0].word.word });
    db.insert(learningAttempts).values({ id: 'legacy-output-1', sessionItemId: session.items[0].id, requestId: 'legacy-output-1', type: 'OUTPUT', attemptNumber: 1, answer: 'too short', result: 'INVALID', performanceScore: 0, source: 'AI' }).run();
    expect((await sessionData(session.id)).cursor).toMatchObject({ step: 'OUTPUT', attemptNumber: 2 });
    await submit(session.id, { requestId: 'legacy-output-2', wordId, step: 'OUTPUT', answer: `This ${session.items[0].word.word} example works.` });
    await submit(session.id, { requestId: 'legacy-assess', wordId, step: 'ASSESS', assessmentRating: 'GOOD' });
    expect((await gradeOutputs(session.id)).statusCode).toBe(200);
    expect(outputAttempts().map((attempt) => [attempt.attemptNumber, attempt.result])).toEqual([[1, 'INVALID'], [2, 'VALID_AFTER_FEEDBACK']]);
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
