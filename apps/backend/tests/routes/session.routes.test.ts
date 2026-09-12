import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';
import { getDb, AppDatabase } from '../../src/db/client.js';
import { vocabularyRoutes } from '../../src/routes/vocabulary.routes.js';
import { contextRoutes } from '../../src/routes/context.routes.js';
import { sessionRoutes } from '../../src/routes/session.routes.js';
import {
  learningSessions,
  learningSessionItems,
  learningProgress,
  reviewStates,
  reviewLogs,
  words,
  tags,
  wordTags,
} from '../../src/db/schema.js';
import { eq } from 'drizzle-orm';

describe('Learning Session Routes & Cognitive Flow Integration', () => {
  let db: AppDatabase;
  let app: FastifyInstance;

  beforeEach(async () => {
    db = getDb(':memory:');
    app = Fastify();
    await app.register(vocabularyRoutes, { db });
    await app.register(contextRoutes, { db });
    await app.register(sessionRoutes, { db });
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
    db.sqlite.close();
  });

  // Helper to create test word
  async function createWord(word: string, extra: Record<string, any> = {}) {
    const res = await app.inject({
      method: 'POST',
      url: '/api/words',
      payload: {
        word,
        phonetic: `/fəˈnetɪk/`,
        partOfSpeech: 'noun',
        definition: `Definition of ${word}`,
        translation: `Nghĩa của ${word}`,
        difficulty: 'B2',
        collocations: [`common ${word}`],
        examples: [
          {
            sentence: `This is an example sentence using ${word}.`,
            translation: `Đây là câu ví dụ dùng ${word}.`,
            source: 'OXFORD',
          },
        ],
        tags: ['Technology'],
        ...extra,
      },
    });
    expect(res.statusCode).toBe(201);
    return JSON.parse(res.payload).data;
  }

  // Helper to create test context
  async function createContext(title: string, content: string, wordIds: string[]) {
    const res = await app.inject({
      method: 'POST',
      url: '/api/contexts',
      payload: {
        title,
        content,
        sourceType: 'ARTICLE',
        wordIds,
      },
    });
    expect(res.statusCode).toBe(201);
    return JSON.parse(res.payload).data;
  }

  describe('1. Zod Schemas & POST /api/learning/session - Start Session', () => {
    it('creates a session with mode: new_words', async () => {
      const w1 = await createWord('apple');
      const w2 = await createWord('banana');

      const res = await app.inject({
        method: 'POST',
        url: '/api/learning/session',
        payload: {
          mode: 'new_words',
          count: 5,
        },
      });

      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.id).toBeDefined();
      expect(body.data.sessionType).toBe('new_words');
      expect(body.data.totalWords).toBe(2);
      expect(body.data.items).toHaveLength(2);
      expect(body.data.completedAt).toBeNull();

      // Check item structure
      const item = body.data.items[0];
      expect(item.wordId).toBeDefined();
      expect(item.word).toBeDefined();
      expect(item.word.headword).toBeDefined();
      expect(item.word.definition).toBeDefined();
      expect(item.word.pronunciation).toBeDefined();
      expect(item.word.examples).toBeInstanceOf(Array);
      expect(item.word.collocations).toBeInstanceOf(Array);
    });

    it('creates a session with mode: context', async () => {
      const w1 = await createWord('resilient');
      const w2 = await createWord('scalable');
      const w3 = await createWord('unrelated');

      const ctx = await createContext(
        'System Architecture',
        'A resilient and scalable system is critical for success.',
        [w1.id, w2.id]
      );

      const res = await app.inject({
        method: 'POST',
        url: '/api/learning/session',
        payload: {
          mode: 'context',
          contextId: ctx.id,
          count: 10,
        },
      });

      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.totalWords).toBe(2);
      const wordIds = body.data.items.map((i: any) => i.wordId);
      expect(wordIds).toContain(w1.id);
      expect(wordIds).toContain(w2.id);
      expect(wordIds).not.toContain(w3.id);
      expect(body.data.items[0].word.contextSentence).toBeDefined();
    });

    it('creates a session with mode: topic', async () => {
      const w1 = await createWord('algorithm', { tags: ['Computer Science'] });
      const w2 = await createWord('database', { tags: ['Computer Science'] });
      const w3 = await createWord('gardening', { tags: ['Hobby'] });

      const res = await app.inject({
        method: 'POST',
        url: '/api/learning/session',
        payload: {
          mode: 'topic',
          topic: 'Computer Science',
          count: 10,
        },
      });

      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.totalWords).toBe(2);
      const wordIds = body.data.items.map((i: any) => i.wordId);
      expect(wordIds).toContain(w1.id);
      expect(wordIds).toContain(w2.id);
      expect(wordIds).not.toContain(w3.id);
    });

    it('creates a session with mode: weak_words (lapses >= 2, ignoring lapses = 1)', async () => {
      const w1 = await createWord('fragile');
      const w2 = await createWord('strong');

      // Set w1 as weak (lapses = 2)
      db.update(reviewStates)
        .set({ lapses: 2 })
        .where(eq(reviewStates.wordId, w1.id))
        .run();

      // Set w2 with lapses = 1 (should NOT be considered weak under domain rule lapses >= 2)
      db.update(reviewStates)
        .set({ lapses: 1 })
        .where(eq(reviewStates.wordId, w2.id))
        .run();

      const res = await app.inject({
        method: 'POST',
        url: '/api/learning/session',
        payload: {
          mode: 'weak_words',
          count: 10,
        },
      });

      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.totalWords).toBe(1);
      expect(body.data.items[0].wordId).toBe(w1.id);
    });

    it('creates a session with mode: daily_plan', async () => {
      const w1 = await createWord('daily1');
      const w2 = await createWord('daily2');

      const res = await app.inject({
        method: 'POST',
        url: '/api/learning/session',
        payload: {
          mode: 'daily_plan',
          count: 10,
        },
      });

      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.totalWords).toBe(2);
    });

    it('rejects invalid session mode with 400 VALIDATION_ERROR', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/learning/session',
        payload: {
          mode: 'invalid_mode',
        },
      });

      expect(res.statusCode).toBe(400);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('VALIDATION_ERROR');
    });

    it('rejects context mode without contextId with 400', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/learning/session',
        payload: {
          mode: 'context',
        },
      });

      expect(res.statusCode).toBe(400);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
    });
  });

  describe('2. GET /api/learning/session & GET /api/learning/session/:id', () => {
    it('returns active session via GET /api/learning/session', async () => {
      const w = await createWord('activeWord');
      const startRes = await app.inject({
        method: 'POST',
        url: '/api/learning/session',
        payload: { mode: 'new_words' },
      });
      const session = JSON.parse(startRes.payload).data;

      const getRes = await app.inject({
        method: 'GET',
        url: '/api/learning/session',
      });

      expect(getRes.statusCode).toBe(200);
      const body = JSON.parse(getRes.payload);
      expect(body.success).toBe(true);
      expect(body.data.activeSession).toBeDefined();
      expect(body.data.activeSession.id).toBe(session.id);
    });

    it('returns session by id with populated items and word data', async () => {
      const w = await createWord('detailWord');
      const startRes = await app.inject({
        method: 'POST',
        url: '/api/learning/session',
        payload: { mode: 'new_words' },
      });
      const sessionId = JSON.parse(startRes.payload).data.id;

      const res = await app.inject({
        method: 'GET',
        url: `/api/learning/session/${sessionId}`,
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.id).toBe(sessionId);
      expect(body.data.items).toHaveLength(1);

      const item = body.data.items[0];
      expect(item.word.headword).toBe('detailword');
      expect(item.word.definition).toBe('Definition of detailWord');
      expect(item.word.pronunciation).toBe('/fəˈnetɪk/');
      expect(item.word.examples).toHaveLength(1);
      expect(item.word.collocations).toHaveLength(1);
      expect(item.word.contextSentence).toBeDefined();
    });

    it('returns 404 for non-existent session id', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/learning/session/00000000-0000-0000-0000-000000000000',
      });

      expect(res.statusCode).toBe(404);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('NOT_FOUND');
    });
  });

  describe('3. POST /api/learning/session/:id/step - Step Submissions', () => {
    it('records steps sequentially: CONTEXT, UNDERSTAND, RECALL, OUTPUT, ASSESS', async () => {
      const w = await createWord('cognitive');
      const startRes = await app.inject({
        method: 'POST',
        url: '/api/learning/session',
        payload: { mode: 'new_words' },
      });
      const session = JSON.parse(startRes.payload).data;
      const wordId = session.items[0].wordId;

      // 1. CONTEXT
      const step1 = await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: {
          wordId,
          step: 'CONTEXT',
        },
      });
      expect(step1.statusCode).toBe(200);
      expect(JSON.parse(step1.payload).data.completedStep).toBe('CONTEXT');

      // 2. UNDERSTAND
      const step2 = await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: {
          wordId,
          step: 'UNDERSTAND',
        },
      });
      expect(step2.statusCode).toBe(200);
      expect(JSON.parse(step2.payload).data.completedStep).toBe('UNDERSTAND');

      // 3. RECALL - provides clozeSentence and records recall result
      const step3 = await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: {
          wordId,
          step: 'RECALL',
          recallAnswer: 'cognitive',
          recallCorrect: true,
        },
      });
      expect(step3.statusCode).toBe(200);
      const step3Data = JSON.parse(step3.payload).data;
      expect(step3Data.completedStep).toBe('RECALL');
      expect(step3Data.recallResult).toBe('CORRECT');
      expect(step3Data.clozeSentence).toContain('______');

      // 4. OUTPUT - records userSentence
      const step4 = await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: {
          wordId,
          step: 'OUTPUT',
          userSentence: 'Cognitive psychology is fascinating.',
        },
      });
      expect(step4.statusCode).toBe(200);
      const step4Data = JSON.parse(step4.payload).data;
      expect(step4Data.completedStep).toBe('OUTPUT');
      expect(step4Data.outputSentence).toBe('Cognitive psychology is fascinating.');

      // 5. ASSESS - records assessmentRating
      const step5 = await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: {
          wordId,
          step: 'ASSESS',
          assessmentRating: 'GOOD',
        },
      });
      expect(step5.statusCode).toBe(200);
      const step5Data = JSON.parse(step5.payload).data;
      expect(step5Data.completedStep).toBe('ASSESS');
      expect(step5Data.reviewRating).toBe('GOOD');
    });

    it('rejects step submission for non-existent word or invalid step', async () => {
      const w = await createWord('testword');
      const startRes = await app.inject({
        method: 'POST',
        url: '/api/learning/session',
        payload: { mode: 'new_words' },
      });
      const sessionId = JSON.parse(startRes.payload).data.id;

      const resWrongWord = await app.inject({
        method: 'POST',
        url: `/api/learning/session/${sessionId}/step`,
        payload: {
          wordId: 'a0000000-0000-0000-0000-000000000000',
          step: 'CONTEXT',
        },
      });
      expect(resWrongWord.statusCode).toBe(404);

      const resWrongStep = await app.inject({
        method: 'POST',
        url: `/api/learning/session/${sessionId}/step`,
        payload: {
          wordId: w.id,
          step: 'INVALID_STEP',
        },
      });
      expect(resWrongStep.statusCode).toBe(400);
    });

    it('rejects skipping steps with 400 VALIDATION_ERROR', async () => {
      const w = await createWord('skipword');
      const startRes = await app.inject({
        method: 'POST',
        url: '/api/learning/session',
        payload: { mode: 'new_words' },
      });
      const sessionId = JSON.parse(startRes.payload).data.id;
      const wordId = JSON.parse(startRes.payload).data.items[0].wordId;

      // 1. Initial -> RECALL (skipping CONTEXT)
      const resSkipToRecall = await app.inject({
        method: 'POST',
        url: `/api/learning/session/${sessionId}/step`,
        payload: {
          wordId,
          step: 'RECALL',
          recallAnswer: 'skipword',
        },
      });
      expect(resSkipToRecall.statusCode).toBe(400);
      const body1 = JSON.parse(resSkipToRecall.payload);
      expect(body1.success).toBe(false);
      expect(body1.error.code).toBe('VALIDATION_ERROR');
      expect(body1.error.message).toContain('Invalid step transition from initial to RECALL');

      // Now submit CONTEXT
      const resContext = await app.inject({
        method: 'POST',
        url: `/api/learning/session/${sessionId}/step`,
        payload: {
          wordId,
          step: 'CONTEXT',
        },
      });
      expect(resContext.statusCode).toBe(200);

      // 2. CONTEXT -> ASSESS (skipping UNDERSTAND, RECALL, OUTPUT)
      const resSkipToAssess = await app.inject({
        method: 'POST',
        url: `/api/learning/session/${sessionId}/step`,
        payload: {
          wordId,
          step: 'ASSESS',
          assessmentRating: 'GOOD',
        },
      });
      expect(resSkipToAssess.statusCode).toBe(400);
      const body2 = JSON.parse(resSkipToAssess.payload);
      expect(body2.success).toBe(false);
      expect(body2.error.code).toBe('VALIDATION_ERROR');
      expect(body2.error.message).toContain('Invalid step transition from CONTEXT to ASSESS');
    });

    it('requires assessmentRating when step is ASSESS', async () => {
      const w = await createWord('assessword');
      const startRes = await app.inject({
        method: 'POST',
        url: '/api/learning/session',
        payload: { mode: 'new_words' },
      });
      const sessionId = JSON.parse(startRes.payload).data.id;
      const wordId = JSON.parse(startRes.payload).data.items[0].wordId;

      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${sessionId}/step`,
        payload: { wordId, step: 'CONTEXT' },
      });
      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${sessionId}/step`,
        payload: { wordId, step: 'UNDERSTAND' },
      });
      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${sessionId}/step`,
        payload: { wordId, step: 'RECALL', recallAnswer: 'assessword', recallCorrect: true },
      });
      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${sessionId}/step`,
        payload: { wordId, step: 'OUTPUT', userSentence: 'A sentence.' },
      });

      // Submit ASSESS without assessmentRating
      const res = await app.inject({
        method: 'POST',
        url: `/api/learning/session/${sessionId}/step`,
        payload: {
          wordId,
          step: 'ASSESS',
        },
      });
      expect(res.statusCode).toBe(400);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('VALIDATION_ERROR');
      expect(body.error.message).toContain('assessmentRating is required');
    });

    it('requires recall and output text before advancing mandatory steps', async () => {
      await createWord('required-evidence');
      const startRes = await app.inject({
        method: 'POST',
        url: '/api/learning/session',
        payload: { mode: 'new_words' },
      });
      const session = JSON.parse(startRes.payload).data;
      const wordId = session.items[0].wordId;

      await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload: { wordId, step: 'CONTEXT' } });
      await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload: { wordId, step: 'UNDERSTAND' } });

      const missingRecall = await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: { wordId, step: 'RECALL', recallAnswer: '   ' },
      });
      expect(missingRecall.statusCode).toBe(400);
      expect(JSON.parse(missingRecall.payload).error).toMatchObject({
        code: 'VALIDATION_ERROR',
        message: 'recallAnswer is required for RECALL step',
      });

      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: { wordId, step: 'RECALL', recallAnswer: 'required-evidence' },
      });
      const missingOutput = await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: { wordId, step: 'OUTPUT', userSentence: '   ' },
      });
      expect(missingOutput.statusCode).toBe(400);
      expect(JSON.parse(missingOutput.payload).error).toMatchObject({
        code: 'VALIDATION_ERROR',
        message: 'userSentence is required for OUTPUT step',
      });
    });
  });

  describe('4. POST /api/learning/session/:id/complete - Completion & Progression', () => {
    it('completes session, updates SM-2 review_states, advances learning_progress, and writes review_logs', async () => {
      const w = await createWord('persistent');
      const startRes = await app.inject({
        method: 'POST',
        url: '/api/learning/session',
        payload: { mode: 'new_words' },
      });
      const session = JSON.parse(startRes.payload).data;
      const wordId = session.items[0].wordId;

      // Submit all steps
      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: { wordId, step: 'CONTEXT' },
      });
      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: { wordId, step: 'UNDERSTAND' },
      });
      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: {
          wordId,
          step: 'RECALL',
          recallAnswer: 'persistent',
          recallCorrect: true,
        },
      });
      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: {
          wordId,
          step: 'OUTPUT',
          userSentence: 'She has a persistent drive to learn.',
        },
      });
      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: {
          wordId,
          step: 'ASSESS',
          assessmentRating: 'GOOD',
        },
      });

      // Complete session
      const completeRes = await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/complete`,
      });

      expect(completeRes.statusCode).toBe(200);
      const completeBody = JSON.parse(completeRes.payload);
      expect(completeBody.success).toBe(true);
      expect(completeBody.data.completedAt).not.toBeNull();

      // Verify learning_progress updated
      const progress = db
        .select()
        .from(learningProgress)
        .where(eq(learningProgress.wordId, wordId))
        .all()[0];
      expect(progress.status).toBe('LEARNING');
      expect(progress.recognitionScore).toBeGreaterThan(0);
      expect(progress.recallScore).toBeGreaterThan(0);
      expect(progress.productionScore).toBeGreaterThan(0);
      expect(progress.lastStudiedAt).not.toBeNull();

      // Verify review_states updated by SM2
      const reviewState = db
        .select()
        .from(reviewStates)
        .where(eq(reviewStates.wordId, wordId))
        .all()[0];
      expect(reviewState.repetitions).toBe(1);
      expect(reviewState.interval).toBe(1);
      expect(reviewState.lastReviewedAt).not.toBeNull();

      // Verify review_logs written
      const logs = db
        .select()
        .from(reviewLogs)
        .where(eq(reviewLogs.wordId, wordId))
        .all();
      expect(logs.length).toBeGreaterThanOrEqual(1);

      // Verify cannot submit step to completed session
      const afterStepRes = await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: { wordId, step: 'CONTEXT' },
      });
      expect(afterStepRes.statusCode).toBe(400);

      // Verify cannot complete already completed session
      const reCompleteRes = await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/complete`,
      });
      expect(reCompleteRes.statusCode).toBe(400);
    });

    it('handles AGAIN rating correctly by resetting repetitions and incrementing lapses in review_states', async () => {
      const w = await createWord('difficultWord');
      const startRes = await app.inject({
        method: 'POST',
        url: '/api/learning/session',
        payload: { mode: 'new_words' },
      });
      const session = JSON.parse(startRes.payload).data;
      const wordId = session.items[0].wordId;

      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: { wordId, step: 'CONTEXT' },
      });
      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: { wordId, step: 'UNDERSTAND' },
      });
      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: {
          wordId,
          step: 'RECALL',
          recallAnswer: 'wrong answer',
          recallCorrect: false,
        },
      });
      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: {
          wordId,
          step: 'OUTPUT',
          userSentence: 'Difficult sentence.',
        },
      });
      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: {
          wordId,
          step: 'ASSESS',
          assessmentRating: 'AGAIN',
        },
      });

      const completeRes = await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/complete`,
      });
      expect(completeRes.statusCode).toBe(200);

      const reviewState = db
        .select()
        .from(reviewStates)
        .where(eq(reviewStates.wordId, wordId))
        .all()[0];
      expect(reviewState.repetitions).toBe(0);
      expect(reviewState.interval).toBe(1);
      expect(reviewState.lapses).toBe(1);
    });

    it('records correct: false in RECALL review log when recall is INCORRECT even with rating HARD', async () => {
      const w = await createWord('recallFailWord');
      const startRes = await app.inject({
        method: 'POST',
        url: '/api/learning/session',
        payload: { mode: 'new_words' },
      });
      const session = JSON.parse(startRes.payload).data;
      const wordId = session.items[0].wordId;

      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: { wordId, step: 'CONTEXT' },
      });
      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: { wordId, step: 'UNDERSTAND' },
      });
      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: {
          wordId,
          step: 'RECALL',
          recallAnswer: 'wrong answer',
          recallCorrect: false,
        },
      });
      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: {
          wordId,
          step: 'OUTPUT',
          userSentence: 'Output sentence.',
        },
      });
      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: {
          wordId,
          step: 'ASSESS',
          assessmentRating: 'HARD',
        },
      });

      const completeRes = await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/complete`,
      });
      expect(completeRes.statusCode).toBe(200);

      const recallLog = db
        .select()
        .from(reviewLogs)
        .where(eq(reviewLogs.wordId, wordId))
        .all()
        .find((l) => l.reviewType === 'RECALL');

      expect(recallLog).toBeDefined();
      expect(Boolean(recallLog?.correct)).toBe(false);
    });

    it('records correct: false in RECOGNITION and PRODUCTION review logs when rating is AGAIN', async () => {
      const w = await createWord('againRatingWord');
      const startRes = await app.inject({
        method: 'POST',
        url: '/api/learning/session',
        payload: { mode: 'new_words' },
      });
      const session = JSON.parse(startRes.payload).data;
      const wordId = session.items[0].wordId;

      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: { wordId, step: 'CONTEXT' },
      });
      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: { wordId, step: 'UNDERSTAND' },
      });
      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: {
          wordId,
          step: 'RECALL',
          recallAnswer: 'againRatingWord',
          recallCorrect: true,
        },
      });
      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: {
          wordId,
          step: 'OUTPUT',
          userSentence: 'I write a sentence.',
        },
      });
      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: {
          wordId,
          step: 'ASSESS',
          assessmentRating: 'AGAIN',
        },
      });

      const completeRes = await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/complete`,
      });
      expect(completeRes.statusCode).toBe(200);

      const logs = db
        .select()
        .from(reviewLogs)
        .where(eq(reviewLogs.wordId, wordId))
        .all();

      const recognitionLog = logs.find((l) => l.reviewType === 'RECOGNITION');
      const productionLog = logs.find((l) => l.reviewType === 'PRODUCTION');

      expect(recognitionLog).toBeDefined();
      expect(Boolean(recognitionLog?.correct)).toBe(false);

      expect(productionLog).toBeDefined();
      expect(Boolean(productionLog?.correct)).toBe(false);
    });

    it('rejects completion when any item is incomplete without changing persistence', async () => {
      const w1 = await createWord('completedItemWord');
      const w2 = await createWord('uncompletedItemWord');
      const startRes = await app.inject({
        method: 'POST',
        url: '/api/learning/session',
        payload: { mode: 'new_words', count: 2 },
      });
      const session = JSON.parse(startRes.payload).data;
      expect(session.items).toHaveLength(2);

      const item1 = session.items.find((i: any) => i.wordId === w1.id);
      const item2 = session.items.find((i: any) => i.wordId === w2.id);

      // Only complete steps for item1
      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: { wordId: item1.wordId, step: 'CONTEXT' },
      });
      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: { wordId: item1.wordId, step: 'UNDERSTAND' },
      });
      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: { wordId: item1.wordId, step: 'RECALL', recallAnswer: 'completedItemWord', recallCorrect: true },
      });
      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: { wordId: item1.wordId, step: 'OUTPUT', userSentence: 'Item 1 output' },
      });
      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: { wordId: item1.wordId, step: 'ASSESS', assessmentRating: 'GOOD' },
      });

      // For item2, we do nothing (or only CONTEXT)
      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: { wordId: item2.wordId, step: 'CONTEXT' },
      });

      const sessionBefore = db
        .select()
        .from(learningSessions)
        .where(eq(learningSessions.id, session.id))
        .all();
      const itemsBefore = db
        .select()
        .from(learningSessionItems)
        .where(eq(learningSessionItems.sessionId, session.id))
        .all();
      const logsBefore = db.select().from(reviewLogs).all();
      const item1ReviewStateBefore = db
        .select()
        .from(reviewStates)
        .where(eq(reviewStates.wordId, item1.wordId))
        .all();
      const item2ReviewStateBefore = db
        .select()
        .from(reviewStates)
        .where(eq(reviewStates.wordId, item2.wordId))
        .all();
      const item1ProgressBefore = db
        .select()
        .from(learningProgress)
        .where(eq(learningProgress.wordId, item1.wordId))
        .all();
      const item2ProgressBefore = db
        .select()
        .from(learningProgress)
        .where(eq(learningProgress.wordId, item2.wordId))
        .all();

      const completeRes = await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/complete`,
      });
      expect(completeRes.statusCode).toBe(400);
      expect(JSON.parse(completeRes.payload)).toMatchObject({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
        },
      });

      expect(
        JSON.parse(completeRes.payload).error.message
      ).toContain('all items must be assessed');
      expect(
        db.select().from(learningSessions).where(eq(learningSessions.id, session.id)).all()
      ).toEqual(sessionBefore);
      expect(
        db.select().from(learningSessionItems).where(eq(learningSessionItems.sessionId, session.id)).all()
      ).toEqual(itemsBefore);
      expect(db.select().from(reviewLogs).all()).toEqual(logsBefore);
      expect(
        db.select().from(reviewStates).where(eq(reviewStates.wordId, item1.wordId)).all()
      ).toEqual(item1ReviewStateBefore);
      expect(
        db.select().from(reviewStates).where(eq(reviewStates.wordId, item2.wordId)).all()
      ).toEqual(item2ReviewStateBefore);
      expect(
        db.select().from(learningProgress).where(eq(learningProgress.wordId, item1.wordId)).all()
      ).toEqual(item1ProgressBefore);
      expect(
        db.select().from(learningProgress).where(eq(learningProgress.wordId, item2.wordId)).all()
      ).toEqual(item2ProgressBefore);
    });

    it('rejects completion when an assessed item has no review rating', async () => {
      await createWord('missingRatingWord');
      const startRes = await app.inject({
        method: 'POST',
        url: '/api/learning/session',
        payload: { mode: 'new_words' },
      });
      const session = JSON.parse(startRes.payload).data;
      const wordId = session.items[0].wordId;

      for (const step of [
        { step: 'CONTEXT' },
        { step: 'UNDERSTAND' },
        { step: 'RECALL', recallAnswer: 'missingRatingWord', recallCorrect: true },
        { step: 'OUTPUT', userSentence: 'A missing rating sentence.' },
        { step: 'ASSESS', assessmentRating: 'GOOD' },
      ]) {
        const stepRes = await app.inject({
          method: 'POST',
          url: `/api/learning/session/${session.id}/step`,
          payload: { wordId, ...step },
        });
        expect(stepRes.statusCode).toBe(200);
      }

      db.update(learningSessionItems)
        .set({ reviewRating: null })
        .where(eq(learningSessionItems.sessionId, session.id))
        .run();

      const sessionBefore = db
        .select()
        .from(learningSessions)
        .where(eq(learningSessions.id, session.id))
        .all();
      const itemsBefore = db
        .select()
        .from(learningSessionItems)
        .where(eq(learningSessionItems.sessionId, session.id))
        .all();
      const logsBefore = db.select().from(reviewLogs).where(eq(reviewLogs.wordId, wordId)).all();
      const reviewStateBefore = db.select().from(reviewStates).where(eq(reviewStates.wordId, wordId)).all();
      const progressBefore = db.select().from(learningProgress).where(eq(learningProgress.wordId, wordId)).all();

      const completeRes = await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/complete`,
      });

      expect(completeRes.statusCode).toBe(400);
      expect(JSON.parse(completeRes.payload)).toMatchObject({
        success: false,
        error: { code: 'VALIDATION_ERROR' },
      });
      expect(JSON.parse(completeRes.payload).error.message).toContain('all items must be assessed');
      expect(db.select().from(learningSessions).where(eq(learningSessions.id, session.id)).all()).toEqual(sessionBefore);
      expect(db.select().from(learningSessionItems).where(eq(learningSessionItems.sessionId, session.id)).all()).toEqual(itemsBefore);
      expect(db.select().from(reviewLogs).where(eq(reviewLogs.wordId, wordId)).all()).toEqual(logsBefore);
      expect(db.select().from(reviewStates).where(eq(reviewStates.wordId, wordId)).all()).toEqual(reviewStateBefore);
      expect(db.select().from(learningProgress).where(eq(learningProgress.wordId, wordId)).all()).toEqual(progressBefore);
    });

    it('auto-detects typo in recallAnswer when recallCorrect is omitted', async () => {
      const w = await createWord('beautiful');
      const startRes = await app.inject({
        method: 'POST',
        url: '/api/learning/session',
        payload: { mode: 'new_words' },
      });
      const session = JSON.parse(startRes.payload).data;
      const wordId = session.items[0].wordId;

      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: { wordId, step: 'CONTEXT' },
      });
      await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: { wordId, step: 'UNDERSTAND' },
      });

      // 1 char distance typo on length >= 4 => ALMOST_CORRECT
      const stepRes = await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload: {
          wordId,
          step: 'RECALL',
          recallAnswer: 'beautifol',
        },
      });
      expect(stepRes.statusCode).toBe(200);
      const data = JSON.parse(stepRes.payload).data;
      expect(data.recallResult).toBe('ALMOST_CORRECT');
    });
  });

  describe('5. Error Handling & Edge Cases', () => {
    it('returns activeSession as null when no sessions exist', async () => {
      const getRes = await app.inject({
        method: 'GET',
        url: '/api/learning/session',
      });

      expect(getRes.statusCode).toBe(200);
      const body = JSON.parse(getRes.payload);
      expect(body.success).toBe(true);
      expect(body.data.activeSession).toBeNull();
    });

    it('sanitizes unexpected internal 500 errors', async () => {
      // Create separate app where service throws unhandled Error
      const faultApp = Fastify();
      const faultyService: any = {
        startSession: () => {
          throw new Error('Database connection crashed with secret internal info');
        },
        findActiveSession: () => null,
        getRecentSessions: () => [],
      };
      await faultApp.register(sessionRoutes, { service: faultyService });
      await faultApp.ready();

      const res = await faultApp.inject({
        method: 'POST',
        url: '/api/learning/session',
        payload: { mode: 'new_words' },
      });

      expect(res.statusCode).toBe(500);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('INTERNAL_ERROR');
      expect(body.error.message).toBe('Internal server error');
      expect(body.error.message).not.toContain('secret');

      await faultApp.close();
    });
  });
});
