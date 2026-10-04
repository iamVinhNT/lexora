/**
 * @file analytics.routes.test.ts
 * @description Integration tests for vocabulary progress and statistics analytics routes.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';
import { randomUUID } from 'node:crypto';
import { getDb, AppDatabase } from '../../src/db/client.js';
import { vocabularyRoutes } from '../../src/routes/vocabulary.routes.js';
import { reviewRoutes } from '../../src/routes/review.routes.js';
import { analyticsRoutes } from '../../src/routes/analytics.routes.js';
import { AnalyticsRepository } from '../../src/repositories/analytics.repository.js';
import { AnalyticsService } from '../../src/services/analytics.service.js';
import { StudyRepository } from '../../src/repositories/study.repository.js';
import {
  reviewStates,
  reviewLogs,
  learningProgress,
} from '../../src/db/schema.js';
import { eq, inArray, desc } from 'drizzle-orm';

describe('Progress & Analytics Routes Integration', () => {
  let db: AppDatabase;
  let app: FastifyInstance;

  beforeEach(async () => {
    db = getDb(':memory:');
    app = Fastify();
    await app.register(vocabularyRoutes, { db });
    await app.register(reviewRoutes, { db });
    await app.register(analyticsRoutes, { db });
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
    db.sqlite.close();
  });

  async function createWord(word: string, extra: Record<string, any> = {}) {
    const res = await app.inject({
      method: 'POST',
      url: '/api/words',
      payload: {
        word,
        definition: `Definition of ${word}`,
        translation: `Nghia cua ${word}`,
        difficulty: 'B2',
        ...extra,
      },
    });
    expect(res.statusCode).toBe(201);
    return JSON.parse(res.payload).data;
  }

  describe('GET /api/progress - Progress Overview', () => {
    it('returns empty progress metrics when no words exist', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/progress',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.totalWords).toBe(0);
      expect(body.data.countsPerState.NEW).toBe(0);
      expect(body.data.averageDimensions.recognition).toBeNull();
      expect(body.data.averageDimensions.recall).toBeNull();
      expect(body.data.averageDimensions.production).toBeNull();
      expect(body.data.passiveVsActive.passive).toBe(0);
      expect(body.data.passiveVsActive.active).toBe(0);
      expect(body.data.weakWordsCount).toBe(0);
    });

    it('calculates state counts, average 3D scores, passive/active counts, and weak words', async () => {
      const w1 = await createWord('lucid');
      const w2 = await createWord('ephemeral');
      const w3 = await createWord('serendipity');
      const w4 = await createWord('pragmatic');

      // w1: MASTERED with high scores (active vocabulary: production >= 60)
      db.update(learningProgress)
        .set({
          status: 'MASTERED',
          recognitionScore: 95,
          recallScore: 85,
          productionScore: 75,
        })
        .where(eq(learningProgress.wordId, w1.id))
        .run();

      // w2: FAMILIAR with high recognition but low production (passive vocabulary & weak word)
      db.update(learningProgress)
        .set({
          status: 'FAMILIAR',
          recognitionScore: 85,
          recallScore: 65,
          productionScore: 20,
        })
        .where(eq(learningProgress.wordId, w2.id))
        .run();
      db.update(reviewStates)
        .set({ repetitions: 2, interval: 6 })
        .where(eq(reviewStates.wordId, w2.id))
        .run();

      // w3: LEARNING with frequent lapses >= 2 (weak word)
      db.update(learningProgress)
        .set({
          status: 'LEARNING',
          recognitionScore: 50,
          recallScore: 30,
          productionScore: 0,
        })
        .where(eq(learningProgress.wordId, w3.id))
        .run();
      db.update(reviewStates)
        .set({ lapses: 2, repetitions: 1, interval: 1 })
        .where(eq(reviewStates.wordId, w3.id))
        .run();

      // w4: untouched (status remains NEW)

      const res = await app.inject({
        method: 'GET',
        url: '/api/progress',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);

      expect(body.data.totalWords).toBe(4);
      expect(body.data.countsPerState.NEW).toBe(1);
      expect(body.data.countsPerState.LEARNING).toBe(1);
      expect(body.data.countsPerState.FAMILIAR).toBe(1);
      expect(body.data.countsPerState.MASTERED).toBe(1);
      expect(body.data.countsPerState.MAINTENANCE).toBe(0);

      // Average scores:
      // recognition: (95 + 85 + 50 + 0) / 4 = 57.5 -> 58
      // recall: (85 + 65 + 30 + 0) / 4 = 45
      // production: (75 + 20 + 0 + 0) / 4 = 23.75 -> 24
      expect(body.data.averageDimensions.recognition).toBe(58);
      expect(body.data.averageDimensions.recall).toBe(45);
      expect(body.data.averageDimensions.production).toBe(24);

      // Passive vs Active
      expect(body.data.passiveVsActive.active).toBe(1); // w1
      expect(body.data.passiveVsActive.passive).toBe(1); // w2 (rec >= 60, prod < 60)
      expect(body.data.weakWordsCount).toBe(2); // w2 (rec >= 70, prod < 50), w3 (lapses >= 2)
    });
  });

  describe('GET /api/progress/:wordId - Single Word Progress', () => {
    it('returns detailed word progress including 3D scores, review summary, and weak reasons', async () => {
      const word = await createWord('meticulous', { partOfSpeech: 'adjective' });

      db.update(learningProgress)
        .set({
          status: 'LEARNING',
          recognitionScore: 80,
          recallScore: 40,
          productionScore: 20,
        })
        .where(eq(learningProgress.wordId, word.id))
        .run();

      db.update(reviewStates)
        .set({
          interval: 2,
          repetitions: 1,
          lapses: 2,
          easeFactor: 2.3,
        })
        .where(eq(reviewStates.wordId, word.id))
        .run();

      const res = await app.inject({
        method: 'GET',
        url: `/api/progress/${word.id}`,
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.word.word).toBe('meticulous');
      expect(body.data.word.partOfSpeech).toBe('adjective');
      expect(body.data.status).toBe('LEARNING');
      expect(body.data.scores.recognitionScore).toBe(80);
      expect(body.data.scores.recallScore).toBe(40);
      expect(body.data.scores.productionScore).toBe(20);
      expect(body.data.reviewSummary.lapses).toBe(2);
      expect(body.data.reviewSummary.easeFactor).toBe(2.3);
      expect(body.data.weakStatus.isWeak).toBe(true);
      expect(body.data.weakStatus.reasons).toContain('Frequent lapses (>= 2)');
    });

    it('returns 404 NOT_FOUND when wordId does not exist', async () => {
      const nonExistent = 'a0000000-0000-0000-0000-000000000000';
      const res = await app.inject({
        method: 'GET',
        url: `/api/progress/${nonExistent}`,
      });

      expect(res.statusCode).toBe(404);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('NOT_FOUND');
    });
  });

  describe('GET /api/progress/weak - Weak Vocabulary Queue', () => {
    it('returns paginated weak words with reasons and metadata', async () => {
      const w1 = await createWord('tenacious');
      const w2 = await createWord('resilient');

      // w1 weak by frequent lapses
      db.update(reviewStates)
        .set({ lapses: 3, repetitions: 2, interval: 3 })
        .where(eq(reviewStates.wordId, w1.id))
        .run();
      db.update(learningProgress)
        .set({ status: 'LEARNING', recognitionScore: 80, recallScore: 70, productionScore: 60 })
        .where(eq(learningProgress.wordId, w1.id))
        .run();

      // w2 strong, not weak
      db.update(reviewStates)
        .set({ lapses: 0, repetitions: 3, interval: 10 })
        .where(eq(reviewStates.wordId, w2.id))
        .run();
      db.update(learningProgress)
        .set({ status: 'FAMILIAR', recognitionScore: 90, recallScore: 80, productionScore: 70 })
        .where(eq(learningProgress.wordId, w2.id))
        .run();

      const res = await app.inject({
        method: 'GET',
        url: '/api/progress/weak?page=1&limit=10',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.items).toHaveLength(1);
      expect(body.data.items[0].word.word).toBe('tenacious');
      expect(body.data.items[0].reasons).toContain('Frequent lapses (>= 2)');
      expect(body.data.total).toBe(1);
      expect(body.data.page).toBe(1);
      expect(body.data.limit).toBe(10);
    });

    it('validates pagination parameters', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/progress/weak?limit=150',
      });

      expect(res.statusCode).toBe(400);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('VALIDATION_ERROR');
    });

    it('returns empty list when no weak words exist', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/progress/weak',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.data.items).toHaveLength(0);
      expect(body.data.total).toBe(0);
    });

    it('does NOT flag or list a word practiced only for recognition as weak, maintaining review-log isolation from weak words', async () => {
      const word1 = await createWord('recognitiononly');

      // Word 1 has 1 recognition review log and repetitions = 1
      db.insert(reviewLogs)
        .values({
          id: randomUUID(),
          wordId: word1.id,
          reviewType: 'RECOGNITION',
          rating: 'GOOD',
          correct: true,
          responseTime: 800,
          createdAt: new Date().toISOString(),
        })
        .run();

      db.update(learningProgress)
        .set({
          status: 'LEARNING',
          recognitionScore: 100,
          recallScore: 0,
          productionScore: 0,
        })
        .where(eq(learningProgress.wordId, word1.id))
        .run();

      db.update(reviewStates)
        .set({ repetitions: 1, interval: 1, lapses: 0 })
        .where(eq(reviewStates.wordId, word1.id))
        .run();

      // Create second word with Recall and Production review logs that make it weak
      const word2 = await createWord('weakwithrecall');

      db.insert(reviewLogs)
        .values({
          id: randomUUID(),
          wordId: word2.id,
          reviewType: 'RECALL',
          rating: 'AGAIN',
          correct: false,
          responseTime: 2500,
          createdAt: new Date().toISOString(),
        })
        .run();

      db.insert(reviewLogs)
        .values({
          id: randomUUID(),
          wordId: word2.id,
          reviewType: 'PRODUCTION',
          rating: 'AGAIN',
          correct: false,
          responseTime: 3200,
          createdAt: new Date().toISOString(),
        })
        .run();

      db.update(learningProgress)
        .set({
          status: 'LEARNING',
          recognitionScore: 80,
          recallScore: 20,
          productionScore: 10,
        })
        .where(eq(learningProgress.wordId, word2.id))
        .run();

      db.update(reviewStates)
        .set({ repetitions: 1, interval: 1, lapses: 2 })
        .where(eq(reviewStates.wordId, word2.id))
        .run();

      // Check /api/progress/weak list - only word2 must be present
      const weakRes = await app.inject({
        method: 'GET',
        url: '/api/progress/weak',
      });
      expect(weakRes.statusCode).toBe(200);
      const weakBody = JSON.parse(weakRes.payload);
      expect(weakBody.success).toBe(true);
      expect(weakBody.data.total).toBe(1);
      expect(weakBody.data.items).toHaveLength(1);
       expect(weakBody.data.items.find((item) => item.wordId === word1.id)).toBeUndefined();
       const weakItem2 = weakBody.data.items.find((item) => item.wordId === word2.id);
      expect(weakItem2).toBeDefined();
      expect(weakItem2.reasons).toHaveLength(3);
      expect(weakItem2.reasons).toContain('Frequent lapses (>= 2)');
      expect(weakItem2.reasons).toContain('Low recall accuracy (< 50%) after practice');
      expect(weakItem2.reasons).toContain('High recognition but low production (< 50%)');

      // Check /api/progress overview - weakWordsCount must agree
      const progressRes = await app.inject({
        method: 'GET',
        url: '/api/progress',
      });
      expect(progressRes.statusCode).toBe(200);
      const progressBody = JSON.parse(progressRes.payload);
      expect(progressBody.success).toBe(true);
      expect(progressBody.data.totalWords).toBe(2);
      expect(progressBody.data.weakWordsCount).toBe(1);

      // Check GET /api/progress/:wordId for word1 (recognition-only: not weak)
      const detailRes1 = await app.inject({
        method: 'GET',
        url: `/api/progress/${word1.id}`,
      });
      expect(detailRes1.statusCode).toBe(200);
      const detailBody1 = JSON.parse(detailRes1.payload);
      expect(detailBody1.success).toBe(true);
      expect(detailBody1.data.weakStatus.isWeak).toBe(false);
      expect(detailBody1.data.weakStatus.reasons).toHaveLength(0);

      // Check GET /api/progress/:wordId for word2 (weak with reasons based only on its own logs)
      const detailRes2 = await app.inject({
        method: 'GET',
        url: `/api/progress/${word2.id}`,
      });
      expect(detailRes2.statusCode).toBe(200);
      const detailBody2 = JSON.parse(detailRes2.payload);
      expect(detailBody2.success).toBe(true);
      expect(detailBody2.data.weakStatus.isWeak).toBe(true);
      expect(detailBody2.data.weakStatus.reasons).toHaveLength(3);
      expect(detailBody2.data.weakStatus.reasons).toContain('Frequent lapses (>= 2)');
      expect(detailBody2.data.weakStatus.reasons).toContain('Low recall accuracy (< 50%) after practice');
      expect(detailBody2.data.weakStatus.reasons).toContain('High recognition but low production (< 50%)');
    });
  });

  describe('GET /api/progress/mastered - Mastered Vocabulary', () => {
    it('returns only MASTERED and MAINTENANCE words', async () => {
      const w1 = await createWord('masteredword');
      const w2 = await createWord('learningword');

      db.update(learningProgress)
        .set({ status: 'MASTERED', recognitionScore: 95, recallScore: 90, productionScore: 85 })
        .where(eq(learningProgress.wordId, w1.id))
        .run();

      db.update(learningProgress)
        .set({ status: 'LEARNING', recognitionScore: 50, recallScore: 30, productionScore: 0 })
        .where(eq(learningProgress.wordId, w2.id))
        .run();

      const res = await app.inject({
        method: 'GET',
        url: '/api/progress/mastered',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.items).toHaveLength(1);
      expect(body.data.items[0].word.word).toBe('masteredword');
      expect(body.data.items[0].status).toBe('MASTERED');
    });

    it('returns empty list when no words are mastered', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/progress/mastered',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.data.items).toHaveLength(0);
      expect(body.data.total).toBe(0);
    });

    it('paginates mastered words correctly with page and limit', async () => {
      for (let i = 1; i <= 3; i++) {
        const w = await createWord(`mastered_${i}`);
        db.update(learningProgress)
          .set({ status: 'MASTERED', recognitionScore: 90, recallScore: 90, productionScore: 90 })
          .where(eq(learningProgress.wordId, w.id))
          .run();
      }

      const res = await app.inject({
        method: 'GET',
        url: '/api/progress/mastered?page=2&limit=2',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.total).toBe(3);
      expect(body.data.page).toBe(2);
      expect(body.data.limit).toBe(2);
      expect(body.data.totalPages).toBe(2);
      expect(body.data.items).toHaveLength(1);
    });

    it('provides deterministic pagination when multiple mastered words have equal updatedAt', async () => {
      const fixedTimestamp = '2026-09-06T12:00:00.000Z';
      const w1 = await createWord('mastered_equal_1');
      const w2 = await createWord('mastered_equal_2');
      const w3 = await createWord('mastered_equal_3');

      // Set identical updatedAt for all three words
      for (const w of [w1, w2, w3]) {
        db.update(learningProgress)
          .set({
            status: 'MASTERED',
            recognitionScore: 90,
            recallScore: 90,
            productionScore: 90,
            updatedAt: fixedTimestamp,
          })
          .where(eq(learningProgress.wordId, w.id))
          .run();
      }

      // Query learningProgress to know expected secondary order by learningProgress.id DESC
      const lpRecords = db
        .select({
          wordId: learningProgress.wordId,
          lpId: learningProgress.id,
        })
        .from(learningProgress)
        .where(inArray(learningProgress.wordId, [w1.id, w2.id, w3.id]))
        .orderBy(desc(learningProgress.id))
        .all();

      const expectedOrderedWordIds = lpRecords.map((r) => r.wordId);

      // Page through one item at a time (limit = 1) across all pages
      const collectedIds: string[] = [];

      for (let page = 1; page <= 3; page++) {
        const res = await app.inject({
          method: 'GET',
          url: `/api/progress/mastered?page=${page}&limit=1`,
        });
        expect(res.statusCode).toBe(200);
        const body = JSON.parse(res.payload);
        expect(body.success).toBe(true);
        expect(body.data.total).toBe(3);
        expect(body.data.totalPages).toBe(3);
        expect(body.data.page).toBe(page);
        expect(body.data.limit).toBe(1);
        expect(body.data.items).toHaveLength(1);
        collectedIds.push(body.data.items[0].wordId);
      }

      // Assert no duplicate IDs across pages
      expect(new Set(collectedIds).size).toBe(3);

      // Assert all expected word IDs are returned without missing any
      expect([...collectedIds].sort()).toEqual([w1.id, w2.id, w3.id].sort());

      // Assert deterministic ordering matches desc(learningProgress.id)
      expect(collectedIds).toEqual(expectedOrderedWordIds);
    });
  });

  describe('GET /api/statistics/dashboard - Dashboard Statistics & Streak', () => {
    it('computes accuracy, state breakdown, and due count with empty logs', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/statistics/dashboard',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.todayReviews).toBe(0);
      expect(body.data.todayLearned).toBe(0);
      expect(body.data.overallAccuracy).toBeNull();
      expect(body.data.currentStreak).toBe(0);
      expect(body.data.longestStreak).toBe(0);
      expect(body.data.dueCount).toBe(0);
    });

    it('returns zero accuracy when review logs exist but none are correct', async () => {
      const word = await createWord('zeroaccuracy');

      db.insert(reviewLogs)
        .values({
          id: randomUUID(),
          wordId: word.id,
          reviewType: 'RECALL',
          rating: 'AGAIN',
          correct: false,
          createdAt: '2026-09-08T10:00:00.000Z',
        })
        .run();

      const res = await app.inject({
        method: 'GET',
        url: '/api/statistics/dashboard',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.overallAccuracy).toBe(0);
    });

    it('ignores unknown correctness while preserving actual incorrect accuracy', async () => {
      const word = await createWord('nullableaccuracy');
      for (const correct of [null, false, true]) {
        db.insert(reviewLogs)
          .values({
            id: randomUUID(),
            wordId: word.id,
            reviewType: 'RECALL',
            rating: correct === true ? 'GOOD' : 'AGAIN',
            correct,
            createdAt: new Date().toISOString(),
          })
          .run();
      }

      const res = await app.inject({ method: 'GET', url: '/api/statistics/dashboard' });
      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res.payload).data.overallAccuracy).toBe(50);
    });

    it('computes today reviews, accuracy, due reviews, and consecutive streaks across mock dates', async () => {
      const word = await createWord('streakword');
      const now = new Date('2026-09-06T12:00:00.000Z');

      // Make word due
      db.update(reviewStates)
        .set({ dueAt: '2026-09-06T08:00:00.000Z' })
        .where(eq(reviewStates.wordId, word.id))
        .run();

      // Insert mock review logs across consecutive dates:
      // 2026-09-01 (1 correct)
      // 2026-09-02 (1 correct)
      // 2026-09-03 (1 correct)
      // (2026-09-04 missing gap)
      // 2026-09-05 (1 correct)
      // 2026-09-06 (1 correct, 1 incorrect = 50% today)
      const dates = [
        { date: '2026-09-01T10:00:00.000Z', correct: true },
        { date: '2026-09-02T10:00:00.000Z', correct: true },
        { date: '2026-09-03T10:00:00.000Z', correct: true },
        { date: '2026-09-05T10:00:00.000Z', correct: true },
        { date: '2026-09-06T09:00:00.000Z', correct: true },
        { date: '2026-09-06T10:00:00.000Z', correct: false },
      ];

      for (const d of dates) {
        db.insert(reviewLogs)
          .values({
            id: randomUUID(),
            wordId: word.id,
            reviewType: 'RECALL',
            rating: d.correct ? 'GOOD' : 'AGAIN',
            correct: d.correct,
            responseTime: 1200,
            createdAt: d.date,
          })
          .run();
      }

      // Also update learningProgress lastStudiedAt to today
      db.update(learningProgress)
        .set({ status: 'LEARNING', lastStudiedAt: '2026-09-06T09:00:00.000Z' })
        .where(eq(learningProgress.wordId, word.id))
        .run();

      // Query dashboard passing mock date via service direct call or custom instance
      const analyticsRepo = new (await import('../../src/repositories/analytics.repository.js')).AnalyticsRepository(db);
      const stats = analyticsRepo.getDashboardStatistics(now);

      expect(stats.todayReviews).toBe(2);
      expect(stats.todayLearned).toBe(1);
      // Total 6 reviews, 5 correct -> 5/6 = 83%
      expect(stats.overallAccuracy).toBe(83);
      // Current streak: Sep 6 and Sep 5 -> 2 days
      expect(stats.currentStreak).toBe(2);
      // Longest streak: Sep 1, 2, 3 -> 3 days
      expect(stats.longestStreak).toBe(3);
      expect(stats.dueCount).toBe(1);
      expect(stats.stateBreakdown.LEARNING).toBe(1);

      // API endpoint returns 200
      const res = await app.inject({
        method: 'GET',
        url: '/api/statistics/dashboard',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.stateBreakdown).toBeDefined();
      expect(body.data.overallAccuracy).toBe(83);
    });

    it('maintains streak when active yesterday even if not yet active today', async () => {
      const word = await createWord('streakyesterday');
      const now = new Date('2026-09-06T12:00:00.000Z');

      const dates = [
        '2026-09-03T10:00:00.000Z',
        '2026-09-04T10:00:00.000Z',
        '2026-09-05T10:00:00.000Z',
      ];

      for (const d of dates) {
        db.insert(reviewLogs)
          .values({
            id: randomUUID(),
            wordId: word.id,
            reviewType: 'RECOGNITION',
            rating: 'GOOD',
            correct: true,
            createdAt: d,
          })
          .run();
      }

      const analyticsRepo = new (await import('../../src/repositories/analytics.repository.js')).AnalyticsRepository(db);
      const stats = analyticsRepo.getDashboardStatistics(now);

      // Active on Sep 3, 4, 5. Today is Sep 6. Yesterday was Sep 5 -> streak is 3!
      expect(stats.currentStreak).toBe(3);
      expect(stats.longestStreak).toBe(3);
    });
  });

  describe('GET /api/statistics/trends - Review Trends', () => {
    it('aggregates daily volume, accuracy, and response time over N days', async () => {
      const word = await createWord('trendsword');

      // Today's log
      db.insert(reviewLogs)
        .values({
          id: randomUUID(),
          wordId: word.id,
          reviewType: 'RECALL',
          rating: 'GOOD',
          correct: true,
          responseTime: 1500,
          createdAt: new Date().toISOString(),
        })
        .run();

      const res = await app.inject({
        method: 'GET',
        url: '/api/statistics/trends?days=7',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.days).toBe(7);
      expect(body.data.trends).toHaveLength(7);

      const latestDay = body.data.trends[body.data.trends.length - 1];
      expect(latestDay.reviewsCount).toBe(1);
      expect(latestDay.correctCount).toBe(1);
      expect(latestDay.accuracy).toBe(100);
      expect(latestDay.averageResponseTime).toBe(1500);
    });

    it('returns null accuracy for no-review days and zero for all-incorrect review days', async () => {
      const word = await createWord('trendaccuracy');
      const now = new Date();

      db.insert(reviewLogs)
        .values({
          id: randomUUID(),
          wordId: word.id,
          reviewType: 'RECALL',
          rating: 'AGAIN',
          correct: false,
          responseTime: 1200,
          createdAt: now.toISOString(),
        })
        .run();

      const res = await app.inject({
        method: 'GET',
        url: '/api/statistics/trends?days=3',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);

      const today = now.toISOString().slice(0, 10);
       const todayTrend = body.data.trends.find((item) => item.date === today);
       const noReviewTrend = body.data.trends.find((item) => item.reviewsCount === 0);

      expect(todayTrend.reviewsCount).toBe(1);
      expect(todayTrend.correctCount).toBe(0);
       expect(todayTrend.accuracy).toBe(0);
       expect(noReviewTrend.accuracy).toBeNull();
       expect(noReviewTrend.averageResponseTime).toBeNull();
     });

    it('returns null when reviews have no timing sample and preserves a real zero millisecond sample', async () => {
      const word = await createWord('trendtiming');
      const now = new Date();

      db.insert(reviewLogs)
        .values({
          id: randomUUID(),
          wordId: word.id,
          reviewType: 'RECALL',
          rating: 'GOOD',
          correct: true,
          createdAt: now.toISOString(),
        })
        .run();

      const noTimingRes = await app.inject({
        method: 'GET',
        url: '/api/statistics/trends?days=1',
      });
      expect(noTimingRes.statusCode).toBe(200);
      const noTimingBody = JSON.parse(noTimingRes.payload);
      expect(noTimingBody.data.trends[0].averageResponseTime).toBeNull();

      db.insert(reviewLogs)
        .values({
          id: randomUUID(),
          wordId: word.id,
          reviewType: 'RECALL',
          rating: 'GOOD',
          correct: true,
          responseTime: 0,
          createdAt: now.toISOString(),
        })
        .run();

      const zeroTimingRes = await app.inject({
        method: 'GET',
        url: '/api/statistics/trends?days=1',
      });
      expect(zeroTimingRes.statusCode).toBe(200);
      const zeroTimingBody = JSON.parse(zeroTimingRes.payload);
      expect(zeroTimingBody.data.trends[0].averageResponseTime).toBe(0);
    });

    it('rejects invalid days parameter outside 1-90 range', async () => {
      const res1 = await app.inject({
        method: 'GET',
        url: '/api/statistics/trends?days=0',
      });
      expect(res1.statusCode).toBe(400);

      const res2 = await app.inject({
        method: 'GET',
        url: '/api/statistics/trends?days=120',
      });
      expect(res2.statusCode).toBe(400);
    });

  });

  describe('GET /api/statistics/insights - Learning Insights', () => {
    it('recommends sentence production when recognition significantly exceeds production', async () => {
      const w1 = await createWord('imbalance1');
      const w2 = await createWord('imbalance2');

      db.update(learningProgress)
        .set({ status: 'LEARNING', recognitionScore: 90, recallScore: 60, productionScore: 20 })
        .where(eq(learningProgress.wordId, w1.id))
        .run();

      db.update(learningProgress)
        .set({ status: 'LEARNING', recognitionScore: 80, recallScore: 50, productionScore: 10 })
        .where(eq(learningProgress.wordId, w2.id))
        .run();

      const res = await app.inject({
        method: 'GET',
        url: '/api/statistics/insights',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.insights.length).toBeGreaterThan(0);

       const outputInsight = body.data.insights.find(
         (i) => i.id === 'recommend-output-practice'
       );
      expect(outputInsight).toBeDefined();
      expect(outputInsight.params).toBeUndefined();
      expect(outputInsight.title).toContain('Sentence Production');
      expect(outputInsight.action.link).toBe('/learn?mode=output');
    });

    it('warns when weak words exist with high lapses', async () => {
      const w = await createWord('lapsedword');
      db.update(reviewStates)
        .set({ lapses: 3, repetitions: 1, interval: 1 })
        .where(eq(reviewStates.wordId, w.id))
        .run();

      const res = await app.inject({
        method: 'GET',
        url: '/api/statistics/insights',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
       const weakInsight = body.data.insights.find((i) => i.id === 'reinforce-weak-words');
      expect(weakInsight).toBeDefined();
      expect(weakInsight.type).toBe('WARNING');
      expect(weakInsight).toMatchObject({ params: { count: 1 } });
    });

    it('does not report low accuracy when no reviews exist', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/statistics/insights',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.summary.weaknesses).not.toContain('Overall accuracy below 65%');
    });

    it('reports low accuracy when reviews exist and all are incorrect', async () => {
      const word = await createWord('zeroaccuracyinsight');

      db.insert(reviewLogs)
        .values({
          id: randomUUID(),
          wordId: word.id,
          reviewType: 'RECALL',
          rating: 'AGAIN',
          correct: false,
          createdAt: '2026-09-08T10:00:00.000Z',
        })
        .run();

      const res = await app.inject({
        method: 'GET',
        url: '/api/statistics/insights',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.summary.weaknesses).toContain('Overall accuracy below 65%');
    });
  });

  describe('Prefix & Error Handling', () => {
    it('supports registration with /api prefix', async () => {
      const prefixApp = Fastify();
      await prefixApp.register(analyticsRoutes, { prefix: '/api', db });
      await prefixApp.ready();

      const res = await prefixApp.inject({
        method: 'GET',
        url: '/api/progress',
      });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);

      await prefixApp.close();
    });

    it('sanitizes 500 errors without leaking internal exceptions', async () => {
       const mockService = new AnalyticsService(new AnalyticsRepository(db));
       vi.spyOn(mockService, 'getProgressOverview').mockImplementation(() => {
         throw new Error('Secret DB failure');
       });

      const errorApp = Fastify();
      await errorApp.register(analyticsRoutes, { service: mockService });
      await errorApp.ready();

      const res = await errorApp.inject({
        method: 'GET',
        url: '/api/progress',
      });

      expect(res.statusCode).toBe(500);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('INTERNAL_ERROR');
      expect(body.error.message).toBe('Internal server error');
      expect(body.error.details).toBeUndefined();

      await errorApp.close();
    });
  });
  describe('Stored calendar timezone', () => {
    it('buckets Vietnam midnight while retaining log-count, distinct-learned and UTC-due formulas', async () => {
      const first = await createWord('zone-first');
      const second = await createWord('zone-second');
      const study = new StudyRepository(db);
      const preferences = { timeZone: 'Asia/Ho_Chi_Minh', studyDays: [1, 2, 3, 4, 5, 6, 7], learningTarget: 1, reviewTarget: 1, grammarTarget: 0 as const };
      study.putPreferences(preferences);
      db.insert(reviewLogs).values([
        { id: 'zone-before', wordId: first.id, reviewType: 'RECALL', rating: 'GOOD', correct: true, responseTime: 1000, createdAt: '2026-10-03T16:59:59.999Z' },
        { id: 'zone-midnight', wordId: first.id, reviewType: 'RECALL', rating: 'AGAIN', correct: false, responseTime: 2000, createdAt: '2026-10-03T17:00:00.000Z' },
        { id: 'zone-repeat', wordId: first.id, reviewType: 'RECALL', rating: 'GOOD', correct: true, responseTime: 3000, createdAt: '2026-10-03T17:10:00.000Z' },
      ]).run();
      db.update(learningProgress).set({ lastStudiedAt: '2026-10-03T17:05:00.000Z', status: 'LEARNING' }).where(eq(learningProgress.wordId, second.id)).run();
      db.update(reviewStates).set({ dueAt: '2026-10-03T17:30:00.000Z' }).run();
      const now = '2026-10-03T18:00:00.000Z';
      const repo = new AnalyticsRepository(db);
      const stats = repo.getDashboardStatistics(now);
      expect(stats).toMatchObject({ todayReviews: 2, todayLearned: 2, dueCount: 2 });
      expect(repo.getReviewTrends(2, now)).toEqual({
        days: 2,
        trends: [
          { date: '2026-10-03', reviewsCount: 1, reviewCount: 1, correctCount: 1, accuracy: 100, averageResponseTime: 1000 },
          { date: '2026-10-04', reviewsCount: 2, reviewCount: 2, correctCount: 1, accuracy: 50, averageResponseTime: 2500 },
        ],
      });
      const dueBefore = db.select().from(reviewStates).all();
      study.putPreferences({ ...preferences, timeZone: 'UTC' });
      expect(repo.getDashboardStatistics(now).dueCount).toBe(stats.dueCount);
      expect(db.select().from(reviewStates).all()).toEqual(dueBefore);
    });

    it.each([
      ['spring', '2026-03-09T16:00:00.000Z', ['2026-03-07T05:00:00.000Z', '2026-03-08T05:00:00.000Z', '2026-03-09T05:00:00.000Z'], ['2026-03-07', '2026-03-08', '2026-03-09']],
      ['fall', '2026-11-02T16:00:00.000Z', ['2026-10-31T04:00:00.000Z', '2026-11-01T04:00:00.000Z', '2026-11-02T05:00:00.000Z'], ['2026-10-31', '2026-11-01', '2026-11-02']],
    ] as const)('keeps three civil days consecutive across %s DST', async (_transition, now, timestamps, dates) => {
      const word = await createWord('dst-word');
      new StudyRepository(db).putPreferences({ timeZone: 'America/New_York', studyDays: [1, 2, 3, 4, 5, 6, 7], learningTarget: 0, reviewTarget: 1, grammarTarget: 0 });
      db.insert(reviewLogs).values(timestamps.map((createdAt, index) => ({
        id: `dst-${index}`, wordId: word.id, reviewType: 'RECALL' as const, rating: 'GOOD' as const, correct: true, createdAt,
      }))).run();
      const repo = new AnalyticsRepository(db);
      expect(repo.getDashboardStatistics(now)).toMatchObject({ todayReviews: 1, currentStreak: 3, longestStreak: 3 });
      expect(repo.getReviewTrends(3, now).trends.map(({ date, reviewCount }) => ({ date, reviewCount })))
        .toEqual(dates.map(date => ({ date, reviewCount: 1 })));
    });
  });
});
