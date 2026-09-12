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

  describe('POST /api/reviews - Submit Review', () => {
    it('submits a review with rating AGAIN, resetting repetitions and incrementing lapses', async () => {
      const word = await createWord('meticulous');

      // Set initial repetitions = 3, interval = 12, lapses = 1
      db.update(reviewStates)
        .set({
          repetitions: 3,
          interval: 12,
          lapses: 1,
          easeFactor: 2.5,
        })
        .where(eq(reviewStates.wordId, word.id))
        .run();

      const res = await app.inject({
        method: 'POST',
        url: '/api/reviews',
        payload: {
          wordId: word.id,
          reviewType: 'RECALL',
          rating: 'AGAIN',
          answer: 'wrong answer',
          responseTime: 4500,
        },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);

      // Verify returned reviewState
      expect(body.data.reviewState).toBeDefined();
      expect(body.data.reviewState.repetitions).toBe(0);
      expect(body.data.reviewState.interval).toBe(1);
      expect(body.data.reviewState.lapses).toBe(2);
      expect(body.data.reviewState.easeFactor).toBeLessThan(2.5);

      // Verify returned reviewLog
      expect(body.data.reviewLog).toBeDefined();
      expect(body.data.reviewLog.wordId).toBe(word.id);
      expect(body.data.reviewLog.reviewType).toBe('RECALL');
      expect(body.data.reviewLog.rating).toBe('AGAIN');
      expect(body.data.reviewLog.answer).toBe('wrong answer');
      expect(body.data.reviewLog.correct).toBe(false);
      expect(body.data.reviewLog.responseTime).toBe(4500);

      // Verify returned learningProgress
      expect(body.data.learningProgress).toBeDefined();
      expect(body.data.learningProgress.wordId).toBe(word.id);

      // Verify in DB directly
      const dbReview = db.select().from(reviewStates).where(eq(reviewStates.wordId, word.id)).all()[0];
      expect(dbReview.repetitions).toBe(0);
      expect(dbReview.interval).toBe(1);
      expect(dbReview.lapses).toBe(2);

      const dbLogs = db.select().from(reviewLogs).where(eq(reviewLogs.wordId, word.id)).all();
      expect(dbLogs).toHaveLength(1);
      expect(dbLogs[0].rating).toBe('AGAIN');
    });

    it('submits sequential reviews (GOOD) updating SM-2 repetitions and intervals (1 -> 6 -> interval * EF)', async () => {
      const word = await createWord('pragmatic');

      // 1st review: GOOD -> repetitions = 1, interval = 1
      const res1 = await app.inject({
        method: 'POST',
        url: '/api/reviews',
        payload: {
          wordId: word.id,
          reviewType: 'RECOGNITION',
          rating: 'GOOD',
          responseTime: 2000,
        },
      });
      expect(res1.statusCode).toBe(200);
      const body1 = JSON.parse(res1.payload);
      expect(body1.data.reviewState.repetitions).toBe(1);
      expect(body1.data.reviewState.interval).toBe(1);

      // 2nd review: GOOD -> repetitions = 2, interval = 6
      const res2 = await app.inject({
        method: 'POST',
        url: '/api/reviews',
        payload: {
          wordId: word.id,
          reviewType: 'RECALL',
          rating: 'GOOD',
          responseTime: 1800,
        },
      });
      expect(res2.statusCode).toBe(200);
      const body2 = JSON.parse(res2.payload);
      expect(body2.data.reviewState.repetitions).toBe(2);
      expect(body2.data.reviewState.interval).toBe(6);

      // 3rd review: GOOD -> repetitions = 3, interval = Math.round(6 * EF)
      const res3 = await app.inject({
        method: 'POST',
        url: '/api/reviews',
        payload: {
          wordId: word.id,
          reviewType: 'CLOZE',
          rating: 'GOOD',
          responseTime: 1500,
        },
      });
      expect(res3.statusCode).toBe(200);
      const body3 = JSON.parse(res3.payload);
      expect(body3.data.reviewState.repetitions).toBe(3);
      expect(body3.data.reviewState.interval).toBeGreaterThanOrEqual(14);
      expect(body3.data.learningProgress.status).not.toBe('NEW');
    });

    it('preserves immutable review logs across multiple reviews', async () => {
      const word = await createWord('immutable');

      await app.inject({
        method: 'POST',
        url: '/api/reviews',
        payload: {
          wordId: word.id,
          reviewType: 'RECOGNITION',
          rating: 'GOOD',
          responseTime: 1000,
        },
      });

      await app.inject({
        method: 'POST',
        url: '/api/reviews',
        payload: {
          wordId: word.id,
          reviewType: 'RECALL',
          rating: 'HARD',
          responseTime: 3000,
        },
      });

      await app.inject({
        method: 'POST',
        url: '/api/reviews',
        payload: {
          wordId: word.id,
          reviewType: 'PRODUCTION',
          rating: 'EASY',
          answer: 'We wrote an immutable ledger.',
          responseTime: 4000,
        },
      });

      const logs = db
        .select()
        .from(reviewLogs)
        .where(eq(reviewLogs.wordId, word.id))
        .all();

      expect(logs).toHaveLength(3);
      expect(logs[0].reviewType).toBe('RECOGNITION');
      expect(logs[0].rating).toBe('GOOD');
      expect(logs[1].reviewType).toBe('RECALL');
      expect(logs[1].rating).toBe('HARD');
      expect(logs[2].reviewType).toBe('PRODUCTION');
      expect(logs[2].rating).toBe('EASY');
      expect(logs[2].answer).toBe('We wrote an immutable ledger.');
    });

    it('returns 404 when wordId does not exist', async () => {
      const nonExistentId = 'a0000000-0000-0000-0000-000000000000';
      const res = await app.inject({
        method: 'POST',
        url: '/api/reviews',
        payload: {
          wordId: nonExistentId,
          reviewType: 'RECALL',
          rating: 'GOOD',
        },
      });

      expect(res.statusCode).toBe(404);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('NOT_FOUND');
    });

    it('returns 400 VALIDATION_ERROR on invalid request bodies', async () => {
      // Invalid rating
      const res1 = await app.inject({
        method: 'POST',
        url: '/api/reviews',
        payload: {
          wordId: '12345',
          reviewType: 'RECALL',
          rating: 'EXCELLENT', // invalid rating
        },
      });
      expect(res1.statusCode).toBe(400);
      const body1 = JSON.parse(res1.payload);
      expect(body1.success).toBe(false);
      expect(body1.error.code).toBe('VALIDATION_ERROR');

      // Invalid reviewType
      const res2 = await app.inject({
        method: 'POST',
        url: '/api/reviews',
        payload: {
          wordId: 'a0000000-0000-0000-0000-000000000000',
          reviewType: 'FLASHCARD', // invalid type
          rating: 'GOOD',
        },
      });
      expect(res2.statusCode).toBe(400);
      const body2 = JSON.parse(res2.payload);
      expect(body2.success).toBe(false);
      expect(body2.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('GET /api/reviews/history - Review History', () => {
    it('returns paginated review logs sorted by created_at DESC with word details', async () => {
      const word1 = await createWord('tenacious');
      const word2 = await createWord('resilient');

      // Submit reviews
      await app.inject({
        method: 'POST',
        url: '/api/reviews',
        payload: {
          wordId: word1.id,
          reviewType: 'RECALL',
          rating: 'GOOD',
          answer: 'tenacious',
        },
      });

      await app.inject({
        method: 'POST',
        url: '/api/reviews',
        payload: {
          wordId: word2.id,
          reviewType: 'CLOZE',
          rating: 'HARD',
          answer: 'resilient',
        },
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

      // Verify item shape
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

      await app.inject({
        method: 'POST',
        url: '/api/reviews',
        payload: {
          wordId: word.id,
          reviewType: 'RECOGNITION',
          rating: 'GOOD',
        },
      });

      await app.inject({
        method: 'POST',
        url: '/api/reviews',
        payload: {
          wordId: word.id,
          reviewType: 'RECALL',
          rating: 'AGAIN',
        },
      });

      // Filter by wordId and rating AGAIN
      const res = await app.inject({
        method: 'GET',
        url: `/api/reviews/history?wordId=${word.id}&rating=AGAIN`,
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.items).toHaveLength(1);
      expect(body.data.items[0].rating).toBe('AGAIN');
      expect(body.data.items[0].reviewType).toBe('RECALL');
    });

    it('handles pagination correctly (page 2 with limit 1)', async () => {
      const word = await createWord('versatile');

      for (let i = 0; i < 3; i++) {
        await app.inject({
          method: 'POST',
          url: '/api/reviews',
          payload: {
            wordId: word.id,
            reviewType: 'RECOGNITION',
            rating: 'GOOD',
          },
        });
      }

      const res = await app.inject({
        method: 'GET',
        url: `/api/reviews/history?wordId=${word.id}&page=2&limit=1`,
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.items).toHaveLength(1);
      expect(body.data.page).toBe(2);
      expect(body.data.limit).toBe(1);
      expect(body.data.total).toBe(3);
      expect(body.data.totalPages).toBe(3);
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
      } as any;

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

    it('handles explicit correct boolean flag passed to submit review', async () => {
      const word = await createWord('explicitflag');

      const res = await app.inject({
        method: 'POST',
        url: '/api/reviews',
        payload: {
          wordId: word.id,
          reviewType: 'PRODUCTION',
          rating: 'HARD',
          correct: false, // explicitly false even though rating is HARD
        },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.data.reviewLog.correct).toBe(false);
    });
  });
});
