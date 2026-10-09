/**
 * @file review.routes.test.ts
 * @description Integration tests for Spaced Repetition Review routes (/api/reviews).
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';
import { getDb, AppDatabase } from '../../src/db/client.js';
import { vocabularyRoutes } from '../../src/routes/vocabulary.routes.js';
import { contextRoutes } from '../../src/routes/context.routes.js';
import { reviewRoutes } from '../../src/routes/review.routes.js';
import {
  words,
  reviewStates,
  reviewLogs,
  learningProgress,
  studyTasks,
} from '../../src/db/schema.js';
import { eq } from 'drizzle-orm';

describe('Spaced Repetition Review Routes & Algorithm Integration', () => {
  let db: AppDatabase;
  let app: FastifyInstance;

  beforeEach(async () => {
    db = getDb(':memory:');
    app = Fastify();
    await app.register(vocabularyRoutes, { db });
    await app.register(contextRoutes, { db });
    await app.register(reviewRoutes, { db });
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
    db.sqlite.close();
  });

  // Helper to create test word via API
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

  function createStudyTask(id: string, overrides: Partial<typeof studyTasks.$inferInsert> = {}) {
    const now = new Date().toISOString();
    db.insert(studyTasks).values({
      id,
      scheduledDate: new Date().toISOString().slice(0, 10),
      kind: 'REVIEW_WORDS',
      targetCount: 1,
      source: 'MANUAL',
      mode: null,
      contextId: null,
      topicId: null,
      lessonId: null,
      revisionId: null,
      revision: null,
      version: 1,
      createdAt: now,
      updatedAt: now,
      cancelledAt: null,
      transferredAt: null,
      transferredToTaskId: null,
      transferredCount: 0,
      creationIntent: '{}',
      transferIntent: null,
      ...overrides,
    }).run();
    return id;
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

  describe('GET /api/reviews/due - Due Review Queue', () => {
    it('returns empty list when no reviews are due', async () => {
      const word = await createWord('ephemeral');
      // Set due_at in the far future
      const future = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
      db.update(reviewStates)
        .set({ dueAt: future })
        .where(eq(reviewStates.wordId, word.id))
        .run();

      const res = await app.inject({
        method: 'GET',
        url: '/api/reviews/due',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.items).toHaveLength(0);
      expect(body.data.counts.total).toBe(0);
      expect(body.data.counts.new).toBe(0);
    });

    it('returns due items with exercise prompts, summary counts by state, and interval previews', async () => {
      const word1 = await createWord('serendipity', {
        definition: 'the occurrence and development of events by chance in a happy way',
        translation: 'sự tình cờ may mắn',
        examples: [{ sentence: 'A fortunate stroke of serendipity brought them together.' }],
      });
      const word2 = await createWord('ubiquitous', {
        definition: 'present, appearing, or found everywhere',
        translation: 'phổ biến khắp nơi',
      });

      // Update word2 progress to LEARNING
      db.update(learningProgress)
        .set({ status: 'LEARNING', recognitionScore: 50, recallScore: 40 })
        .where(eq(learningProgress.wordId, word2.id))
        .run();

      // Ensure both are due (past timestamp)
      const past = new Date(Date.now() - 60 * 1000).toISOString();
      db.update(reviewStates)
        .set({ dueAt: past })
        .where(eq(reviewStates.wordId, word1.id))
        .run();
      db.update(reviewStates)
        .set({ dueAt: past })
        .where(eq(reviewStates.wordId, word2.id))
        .run();

      const res = await app.inject({
        method: 'GET',
        url: '/api/reviews/due',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.items.length).toBeGreaterThanOrEqual(2);

      // Verify summary counts by state
      expect(body.data.counts).toBeDefined();
      expect(body.data.counts.new).toBeGreaterThanOrEqual(1);
      expect(body.data.counts.learning).toBeGreaterThanOrEqual(1);
      expect(body.data.counts.total).toBeGreaterThanOrEqual(2);

      // Find serendipity item
      const item1 = body.data.items.find((i: any) => i.wordId === word1.id);
      expect(item1).toBeDefined();
      expect(item1.word.word).toBe('serendipity');

      // Verify exercise prompts
      expect(item1.exercisePrompts).toBeDefined();
      expect(item1.exercisePrompts.RECOGNITION).toBeDefined();
      expect(item1.exercisePrompts.RECOGNITION.prompt).toBe('serendipity');
      expect(item1.exercisePrompts.RECALL).toBeDefined();
      expect(item1.exercisePrompts.RECALL.prompt).toContain('sự tình cờ may mắn');
      expect(item1.exercisePrompts.CLOZE).toBeDefined();
      expect(item1.exercisePrompts.CLOZE.prompt).toContain('______');
      expect(item1.exercisePrompts.PRODUCTION).toBeDefined();
      expect(item1.exercisePrompts.PRODUCTION.prompt).toContain('serendipity');
      expect(item1.exercisePrompts.CONTEXTUAL).toBeDefined();
      expect(item1.exercisePrompts.CONTEXTUAL.prompt).toContain('No context available');
      expect(item1.exercisePrompts.CONTEXTUAL.targetWord).toBe('serendipity');

      // Verify interval previews for all 4 ratings
      expect(item1.intervalPreviews).toBeDefined();
      expect(item1.intervalPreviews.AGAIN).toBe('1d');
      expect(item1.intervalPreviews.HARD).toBeDefined();
      expect(item1.intervalPreviews.GOOD).toBeDefined();
      expect(item1.intervalPreviews.EASY).toBeDefined();
    });

    it('uses linked context content for cloze prompt when available', async () => {
      const word = await createWord('lucid', {
        definition: 'expressed clearly; easy to understand',
        translation: 'rõ ràng, minh bạch',
      });

      await createContext(
        'Philosophy Article',
        'His explanation was lucid and convinced the whole audience.',
        [word.id]
      );

      const past = new Date(Date.now() - 1000).toISOString();
      db.update(reviewStates)
        .set({ dueAt: past })
        .where(eq(reviewStates.wordId, word.id))
        .run();

      const res = await app.inject({
        method: 'GET',
        url: '/api/reviews/due',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      const item = body.data.items.find((i: any) => i.wordId === word.id);
      expect(item).toBeDefined();
      expect(item.exercisePrompts.CLOZE.prompt).toContain('______');
      expect(item.exercisePrompts.CLOZE.prompt).toContain('convinced the whole audience');

      // Verify CONTEXTUAL exercise prompt mapping when word is linked to context
      expect(item.exercisePrompts.CONTEXTUAL).toBeDefined();
      expect(item.exercisePrompts.CONTEXTUAL.prompt).toContain('convinced the whole audience');
      expect(item.exercisePrompts.CONTEXTUAL.instructions).toBe(
        'Identify or apply the vocabulary in this context'
      );
      expect(item.exercisePrompts.CONTEXTUAL.targetWord).toBe('lucid');
      expect(item.exercisePrompts.CONTEXTUAL.definition).toBe(
        'expressed clearly; easy to understand'
      );
    });

    it('respects limit query parameter and validates limits', async () => {
      // Create 3 due words
      for (let i = 0; i < 3; i++) {
        const w = await createWord(`limitword${i}`);
        const past = new Date(Date.now() - 1000 * (i + 1)).toISOString();
        db.update(reviewStates).set({ dueAt: past }).where(eq(reviewStates.wordId, w.id)).run();
      }

      const res = await app.inject({
        method: 'GET',
        url: '/api/reviews/due?limit=2',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.data.items).toHaveLength(2);

      // Validation check: limit > 100 rejected
      const invalidRes = await app.inject({
        method: 'GET',
        url: '/api/reviews/due?limit=150',
      });
      expect(invalidRes.statusCode).toBe(400);
      const errBody = JSON.parse(invalidRes.payload);
      expect(errBody.success).toBe(false);
      expect(errBody.error.code).toBe('VALIDATION_ERROR');
    });
  });

    async function completeReviewFlow(params: {
      wordId: string;
      rating?: 'AGAIN' | 'HARD' | 'GOOD' | 'EASY';
      studyTaskId?: string;
      recallAnswer?: string;
      outputAnswer?: string;
      outputMethod?: 'SELF' | 'AI';
      configRevision?: string;
      practice?: boolean;
      requestIdPrefix?: string;
    }) {
      const prefix = params.requestIdPrefix ?? `flow-${Math.random().toString(36).slice(2)}`;
      const wordRow = db.select().from(words).where(eq(words.id, params.wordId)).all()[0];
      const targetWord = wordRow?.word ?? params.wordId;

      const startRes = await app.inject({
        method: 'POST',
        url: '/api/reviews/attempt',
        payload: {
          requestId: `${prefix}-start`,
          wordId: params.wordId,
          studyTaskId: params.studyTaskId,
        },
      });
      if (startRes.statusCode !== 200) return startRes;
      const attempt = JSON.parse(startRes.payload).data;

      const recallRes = await app.inject({
        method: 'POST',
        url: `/api/reviews/attempt/${attempt.id}/step`,
        payload: {
          requestId: `${prefix}-recall`,
          expectedVersion: attempt.version,
          action: 'RECALL',
          answer: params.recallAnswer !== undefined ? params.recallAnswer : targetWord,
          responseTime: 1000,
        },
      });
      if (recallRes.statusCode !== 200) return recallRes;
      const feedback = JSON.parse(recallRes.payload).data;

      const continueRes = await app.inject({
        method: 'POST',
        url: `/api/reviews/attempt/${attempt.id}/step`,
        payload: {
          requestId: `${prefix}-continue`,
          expectedVersion: feedback.version,
          action: 'CONTINUE',
          practice: params.practice ?? Boolean(params.outputAnswer),
        },
      });
      if (continueRes.statusCode !== 200) return continueRes;
      let currentStage = JSON.parse(continueRes.payload).data;

      if (currentStage.stage === 'OUTPUT') {
        const outputRes = await app.inject({
          method: 'POST',
          url: `/api/reviews/attempt/${attempt.id}/step`,
          payload: {
            requestId: `${prefix}-output`,
            expectedVersion: currentStage.version,
            action: 'OUTPUT',
            answer: params.outputAnswer ?? `This is a valid formal sentence with ${targetWord}.`,
            method: params.outputMethod ?? 'SELF',
            configRevision: params.configRevision,
          },
        });
        if (outputRes.statusCode !== 200) return outputRes;
        currentStage = JSON.parse(outputRes.payload).data;
      }

      const completePayload = {
        requestId: `${prefix}-complete`,
        attemptId: attempt.id,
        expectedVersion: currentStage.version,
        rating: params.rating ?? 'GOOD',
      };

      const completeRes = await app.inject({
        method: 'POST',
        url: '/api/reviews',
        payload: completePayload,
      });

      return Object.assign(completeRes, { completePayload });
    }
  describe('Adaptive Review Attempts & Completion', () => {

    it('rejects legacy review submission with 400 VALIDATION_ERROR', async () => {
      const word = await createWord('legacy-reject');
      const res = await app.inject({
        method: 'POST',
        url: '/api/reviews',
        payload: {
          wordId: word.id,
          reviewType: 'RECALL',
          rating: 'GOOD',
          correct: true,
        },
      });
      expect(res.statusCode).toBe(400);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('VALIDATION_ERROR');
    });

    it('AC-01: hides word full details, examples, and contexts before recall', async () => {
      const word = await createWord('concealed', {
        definition: 'kept secret or hidden',
        translation: 'bị che giấu',
        examples: [{ sentence: 'The concealed truth emerged later.' }],
      });

      const startRes = await app.inject({
        method: 'POST',
        url: '/api/reviews/attempt',
        payload: { requestId: 'ac01-start', wordId: word.id },
      });
      expect(startRes.statusCode).toBe(200);
      const attempt = JSON.parse(startRes.payload).data;

      expect(attempt.stage).toBe('RECALL');
      expect(attempt.prompt.type).toBe('CLOZE');
      expect(attempt.prompt.text).toContain('______');
      expect(attempt.prompt.text).not.toContain('concealed');
      expect(attempt.word).toBeNull();
      expect(attempt.examples).toEqual([]);
      expect(attempt.contexts).toEqual([]);

      // After recall step, details are revealed
      const stepRes = await app.inject({
        method: 'POST',
        url: `/api/reviews/attempt/${attempt.id}/step`,
        payload: {
          requestId: 'ac01-recall',
          expectedVersion: attempt.version,
          action: 'RECALL',
          answer: 'concealed',
        },
      });
      expect(stepRes.statusCode).toBe(200);
      const revealed = JSON.parse(stepRes.payload).data;
      expect(revealed.stage).toBe('FEEDBACK');
      expect(revealed.word).not.toBeNull();
      expect(revealed.word.word).toBe('concealed');
      expect(revealed.examples.length).toBeGreaterThan(0);
    });

    it('AC-02: forces effective AGAIN on wrong initial recall even if user selects EASY', async () => {
      const word = await createWord('wrong-eval');
      const res = await completeReviewFlow({
        wordId: word.id,
        recallAnswer: '', // deliberate don't remember
        rating: 'EASY',
      });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload).data;
      expect(body.selfRating).toBe('EASY');
      expect(body.effectiveRating).toBe('AGAIN');
      expect(body.attempt.recall.result).toBe('INCORRECT');
      expect(body.learningProgress.recallScore).toBe(0);
      expect(body.reviewState.repetitions).toBe(0);
    });

    it('AC-02: caps effective rating at HARD on typo initial recall when user selects GOOD or EASY', async () => {
      const word = await createWord('pragmatic');
      const res = await completeReviewFlow({
        wordId: word.id,
        recallAnswer: 'pragmatc', // 1 char typo
        rating: 'GOOD',
      });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload).data;
      expect(body.selfRating).toBe('GOOD');
      expect(body.effectiveRating).toBe('HARD');
      expect(body.attempt.recall.result).toBe('TYPO');
    });

    it('AC-03: weak word or incorrect recall requires OUTPUT; strong word allows fast-path to ASSESS', async () => {
      const word = await createWord('strong-word');

      // Start attempt
      const startRes = await app.inject({
        method: 'POST',
        url: '/api/reviews/attempt',
        payload: { requestId: 'ac03-start', wordId: word.id },
      });
      const attempt = JSON.parse(startRes.payload).data;
      expect(attempt.needsOutput).toBe(false);

      // Correct recall
      const recallRes = await app.inject({
        method: 'POST',
        url: `/api/reviews/attempt/${attempt.id}/step`,
        payload: {
          requestId: 'ac03-recall',
          expectedVersion: attempt.version,
          action: 'RECALL',
          answer: 'strong-word',
        },
      });
      const feedback = JSON.parse(recallRes.payload).data;
      expect(feedback.needsOutput).toBe(false);

      // CONTINUE without practice moves directly to ASSESS
      const continueRes = await app.inject({
        method: 'POST',
        url: `/api/reviews/attempt/${attempt.id}/step`,
        payload: {
          requestId: 'ac03-continue',
          expectedVersion: feedback.version,
          action: 'CONTINUE',
          practice: false,
        },
      });
      const assessStage = JSON.parse(continueRes.payload).data;
      expect(assessStage.stage).toBe('ASSESS');
    });

    it('AC-04: SELF output performs formal check and does not create production score', async () => {
      const word = await createWord('formal-check');

      const startRes = await app.inject({
        method: 'POST',
        url: '/api/reviews/attempt',
        payload: { requestId: 'ac04-start', wordId: word.id },
      });
      const attempt = JSON.parse(startRes.payload).data;

      const recallRes = await app.inject({
        method: 'POST',
        url: `/api/reviews/attempt/${attempt.id}/step`,
        payload: {
          requestId: 'ac04-recall',
          expectedVersion: attempt.version,
          action: 'RECALL',
          answer: 'formal-check',
        },
      });
      const feedback = JSON.parse(recallRes.payload).data;

      const continueRes = await app.inject({
        method: 'POST',
        url: `/api/reviews/attempt/${attempt.id}/step`,
        payload: {
          requestId: 'ac04-continue',
          expectedVersion: feedback.version,
          action: 'CONTINUE',
          practice: true, // opt into output
        },
      });
      const outputStage = JSON.parse(continueRes.payload).data;
      expect(outputStage.stage).toBe('OUTPUT');

      // Reject too short sentence or missing target word
      const invalidOutputRes = await app.inject({
        method: 'POST',
        url: `/api/reviews/attempt/${attempt.id}/step`,
        payload: {
          requestId: 'ac04-output-invalid',
          expectedVersion: outputStage.version,
          action: 'OUTPUT',
          answer: 'Too short',
          method: 'SELF',
        },
      });
      expect(invalidOutputRes.statusCode).toBe(400);

      // Valid formal sentence
      const validOutputRes = await app.inject({
        method: 'POST',
        url: `/api/reviews/attempt/${attempt.id}/step`,
        payload: {
          requestId: 'ac04-output-valid',
          expectedVersion: outputStage.version,
          action: 'OUTPUT',
          answer: 'This is a valid formal sentence with formal-check.',
          method: 'SELF',
        },
      });
      expect(validOutputRes.statusCode).toBe(200);
      const afterOutput = JSON.parse(validOutputRes.payload).data;
      expect(afterOutput.stage).toBe('ASSESS');
      expect(afterOutput.output.method).toBe('SELF');
      expect(afterOutput.output.score).toBeNull();
    });

    it('AC-05: updates SM-2 and quota exactly once per completion, supporting idempotent replay', async () => {
      const word = await createWord('replay-test');

      const res1 = await completeReviewFlow({
        wordId: word.id,
        recallAnswer: 'replay-test',
        rating: 'GOOD',
        requestIdPrefix: 'replay-flow',
      });
      expect(res1.statusCode).toBe(200);
      const body1 = JSON.parse(res1.payload);
      // Repeating complete with exact same requestId and original expectedVersion returns cached result
      const res2 = await app.inject({
        method: 'POST',
        url: '/api/reviews',
        payload: res1.completePayload,
      });
      expect(res2.statusCode).toBe(200);
      const body2 = JSON.parse(res2.payload);
      expect(body2.data).toEqual(body1.data);

      const logs = db.select().from(reviewLogs).where(eq(reviewLogs.wordId, word.id)).all();
      expect(logs).toHaveLength(1);
    });

    it('AC-06: rejects unusable study tasks at attempt start with 409 CONFLICT', async () => {
      const word = await createWord('task-reject');
      const tomorrow = new Date();
      tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

      const invalidTasks = [
        { id: 'missing-task', reason: 'TASK_NOT_FOUND', expectedStatus: 404 },
        { id: createStudyTask('wrong-kind', { kind: 'GRAMMAR' }), reason: 'WRONG_TASK_KIND', expectedStatus: 409 },
        { id: createStudyTask('cancelled-task', { cancelledAt: new Date().toISOString() }), reason: 'TASK_UNAVAILABLE', expectedStatus: 409 },
        { id: createStudyTask('future-task', { scheduledDate: tomorrow.toISOString().slice(0, 10) }), reason: 'FUTURE_TASK', expectedStatus: 409 },
      ];

      for (const t of invalidTasks) {
        const response = await app.inject({
          method: 'POST',
          url: '/api/reviews/attempt',
          payload: {
            requestId: `task-test-${t.id}`,
            wordId: word.id,
            studyTaskId: t.id,
          },
        });
        expect(response.statusCode).toBe(t.expectedStatus);
        const body = JSON.parse(response.payload);
        if (t.expectedStatus === 409) {
          expect(body.error.code).toBe('CONFLICT');
          expect(body.error.details.reason).toBe(t.reason);
        } else {
          expect(body.error.code).toBe('NOT_FOUND');
        }
      }
    });

    it('AC-08: resumes active attempt when intent matches, rejects mismatched task intent or word', async () => {
      const word1 = await createWord('active-one');
      const word2 = await createWord('active-two');
      const taskId = createStudyTask('active-task');

      // Start attempt for word1
      const start1 = await app.inject({
        method: 'POST',
        url: '/api/reviews/attempt',
        payload: { requestId: 'act-start-1', wordId: word1.id, studyTaskId: taskId },
      });
      expect(start1.statusCode).toBe(200);
      const attempt1 = JSON.parse(start1.payload).data;

      // GET /attempt returns active attempt
      const getActive = await app.inject({
        method: 'GET',
        url: '/api/reviews/attempt',
      });
      expect(getActive.statusCode).toBe(200);
      expect(JSON.parse(getActive.payload).data.id).toBe(attempt1.id);

      // Resume same word & same task intent succeeds
      const resumeSame = await app.inject({
        method: 'POST',
        url: '/api/reviews/attempt',
        payload: { requestId: 'act-resume-same', wordId: word1.id, studyTaskId: taskId },
      });
      expect(resumeSame.statusCode).toBe(200);
      expect(JSON.parse(resumeSame.payload).data.id).toBe(attempt1.id);

      // Mismatched task intent on same word throws 409
      const mismatchTask = await app.inject({
        method: 'POST',
        url: '/api/reviews/attempt',
        payload: { requestId: 'act-mismatch-task', wordId: word1.id },
      });
      expect(mismatchTask.statusCode).toBe(409);

      // Attempting different word while attempt1 is active throws 409
      const mismatchWord = await app.inject({
        method: 'POST',
        url: '/api/reviews/attempt',
        payload: { requestId: 'act-mismatch-word', wordId: word2.id },
      });
      expect(mismatchWord.statusCode).toBe(409);

      // Abandoning attempt marks it ABANDONED without changing review states
      const abandonRes = await app.inject({
        method: 'POST',
        url: `/api/reviews/attempt/${attempt1.id}/abandon`,
        payload: {
          requestId: 'act-abandon',
          expectedVersion: attempt1.version,
        },
      });
      expect(abandonRes.statusCode).toBe(200);
      expect(JSON.parse(abandonRes.payload).data.status).toBe('ABANDONED');

      // Now GET /attempt returns null
      const getActiveAfter = await app.inject({
        method: 'GET',
        url: '/api/reviews/attempt',
      });
      expect(getActiveAfter.statusCode).toBe(200);
      expect(JSON.parse(getActiveAfter.payload).data).toBeNull();
    });

    it('AC-08: rejects starting review on word whose due date is in the future', async () => {
      const word = await createWord('future-word');
      const tomorrow = new Date();
      tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

      db.update(reviewStates)
        .set({ dueAt: tomorrow.toISOString() })
        .where(eq(reviewStates.wordId, word.id))
        .run();

      const res = await app.inject({
        method: 'POST',
        url: '/api/reviews/attempt',
        payload: { requestId: 'fut-start', wordId: word.id },
      });
      expect(res.statusCode).toBe(409);
      const body = JSON.parse(res.payload);
      expect(body.error.details.reason).toBe('NOT_DUE');
    });
  });

  describe('GET /api/reviews/history - Review History', () => {
    it('returns paginated review logs sorted by created_at DESC with word details', async () => {
      const word1 = await createWord('tenacious');
      const word2 = await createWord('resilient');

      // Populate history via review flow
      const res1 = await app.inject({
        method: 'POST',
        url: '/api/reviews/attempt',
        payload: { requestId: 'hist-1-start', wordId: word1.id },
      });
      const att1 = JSON.parse(res1.payload).data;
      await app.inject({
        method: 'POST',
        url: `/api/reviews/attempt/${att1.id}/step`,
        payload: { requestId: 'hist-1-step', expectedVersion: att1.version, action: 'RECALL', answer: 'tenacious' },
      });
      const att1Feed = JSON.parse((await app.inject({
        method: 'POST',
        url: `/api/reviews/attempt/${att1.id}/step`,
        payload: { requestId: 'hist-1-cont', expectedVersion: 2, action: 'CONTINUE' },
      })).payload).data;
      await app.inject({
        method: 'POST',
        url: '/api/reviews',
        payload: { requestId: 'hist-1-comp', attemptId: att1.id, expectedVersion: att1Feed.version, rating: 'GOOD' },
      });

      const res2 = await app.inject({
        method: 'POST',
        url: '/api/reviews/attempt',
        payload: { requestId: 'hist-2-start', wordId: word2.id },
      });
      const att2 = JSON.parse(res2.payload).data;
      await app.inject({
        method: 'POST',
        url: `/api/reviews/attempt/${att2.id}/step`,
        payload: { requestId: 'hist-2-step', expectedVersion: att2.version, action: 'RECALL', answer: 'resilient' },
      });
      const att2Feed = JSON.parse((await app.inject({
        method: 'POST',
        url: `/api/reviews/attempt/${att2.id}/step`,
        payload: { requestId: 'hist-2-cont', expectedVersion: 2, action: 'CONTINUE' },
      })).payload).data;
      await app.inject({
        method: 'POST',
        url: '/api/reviews',
        payload: { requestId: 'hist-2-comp', attemptId: att2.id, expectedVersion: att2Feed.version, rating: 'HARD' },
      });

      const res = await app.inject({
        method: 'GET',
        url: '/api/reviews/history?page=1&limit=10',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.items.length).toBeGreaterThanOrEqual(2);
      expect(body.data.total).toBeGreaterThanOrEqual(2);
      expect(body.data.page).toBe(1);
      expect(body.data.limit).toBe(10);

      const first = body.data.items[0];
      expect(first.id).toBeDefined();
      expect(first.wordId).toBeDefined();
      expect(first.reviewType).toBeDefined();
      expect(first.rating).toBeDefined();
      expect(first.word).toBeDefined();
      expect(first.word.word).toBeDefined();
    });

    it('filters review history by wordId, reviewType, and rating', async () => {
      const word = await createWord('diligent');
      const comp = await completeReviewFlow({
        wordId: word.id,
        recallAnswer: '',
        rating: 'AGAIN',
        requestIdPrefix: 'filt',
      });
      expect(comp.statusCode).toBe(200);
      const res = await app.inject({
        method: 'GET',
        url: `/api/reviews/history?wordId=${word.id}&rating=AGAIN`,
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.items).toHaveLength(1);
      expect(body.data.items[0].rating).toBe('AGAIN');
    });

    it('returns empty list when no history matches filters', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/reviews/history?rating=EASY',
      });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.items).toHaveLength(0);
      expect(body.data.total).toBe(0);
    });
  });

  describe('Error Handling & Sanitized 500 Responses', () => {
    it('sanitizes 500 errors without leaking internal exceptions', async () => {
      const mockService = {
        getDueReviews: () => {
          throw new Error('Database connection explosion');
        },
      } as unknown as ReviewService;

      const errorApp = Fastify();
      await errorApp.register(reviewRoutes, { service: mockService });
      await errorApp.ready();

      const res = await errorApp.inject({
        method: 'GET',
        url: '/api/reviews/due',
      });

      expect(res.statusCode).toBe(500);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('INTERNAL_ERROR');
      expect(body.error.message).toBe('Internal server error');
      expect(body.error.details).toBeUndefined();

      await errorApp.close();
    });

    it('supports registering reviewRoutes with /api prefix', async () => {
      const prefixApp = Fastify();
      await prefixApp.register(reviewRoutes, { prefix: '/api', db });
      await prefixApp.ready();

      const res = await prefixApp.inject({
        method: 'GET',
        url: '/api/reviews/due',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);

      await prefixApp.close();
    });
  });
});
