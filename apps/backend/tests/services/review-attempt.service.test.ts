/**
 * @file review-attempt.service.test.ts
 * @description Unit and behavioral tests for adaptive review attempts, leak prevention, and state transitions.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { randomUUID } from 'node:crypto';
import { eq } from 'drizzle-orm';
import { getDb, type AppDatabase } from '../../src/db/client.js';
import { words, reviewStates, reviewLogs, learningProgress, studyTasks } from '../../src/db/schema.js';
import { ReviewAttemptRepository } from '../../src/repositories/review-attempt.repository.js';
import { ReviewAttemptService } from '../../src/services/review-attempt.service.js';
import type { OutputGrader } from '../../src/domain/learning/ai-output-grader.js';
import { AppError } from '../../src/services/vocabulary.service.js';

describe('Adaptive Review Service', () => {

  describe('ReviewAttemptService Behavioral Operations', () => {
    let db: AppDatabase;
    let repo: ReviewAttemptRepository;
    let service: ReviewAttemptService;
    let mockGrader: OutputGrader;

    beforeEach(() => {
      db = getDb(':memory:');
      repo = new ReviewAttemptRepository(db.sqlite);
      mockGrader = {
        grade: async ({ sentence }) => ({
          score: 85,
          explanation: 'Excellent test sentence.',
          suggestion: sentence,
        }),
      };
      service = new ReviewAttemptService(db, repo, {
        outputGrader: mockGrader,
        getConfig: async () => ({
          config: { apiKey: 'test-key', baseURL: 'https://api.openai.com/v1', model: 'gpt-4o-mini', timeoutMs: 15000 },
          revision: 'rev-stable-1',
        }),
      });
    });

    afterEach(() => {
      db.sqlite.close();
    });

    function insertTestWord(word: string, overrides: Partial<typeof words.$inferInsert> = {}) {
      const id = randomUUID();
      const now = new Date().toISOString();
      db.insert(words).values({
        id,
        word,
        definition: `Definition of ${word}`,
        translation: `Nghĩa của ${word}`,
        phonetic: null,
        partOfSpeech: 'noun',
        difficulty: 'B2',
        createdAt: now,
        updatedAt: now,
        ...overrides,
      }).run();

      db.insert(reviewStates).values({
        id: randomUUID(),
        wordId: id,
        interval: 0,
        easeFactor: 2.5,
        repetitions: 0,
        lapses: 0,
        dueAt: now,
        lastReviewedAt: null,
      }).run();

      return id;
    }

    it('keeps target hidden when abandoning before recall, including replay', () => {
      const wordId = insertTestWord('unobtrusive');
      const attempt = service.startAttempt({ requestId: 'hidden-start', wordId });
      const intent = { requestId: 'hidden-abandon', expectedVersion: attempt.version };
      const abandoned = service.abandonAttempt(attempt.id, intent);
      expect(abandoned.status).toBe('ABANDONED');
      expect(abandoned.word).toBeNull();
      expect(abandoned.examples).toEqual([]);
      expect(abandoned.contexts).toEqual([]);
      expect(service.abandonAttempt(attempt.id, intent)).toEqual(abandoned);
      expect(service.getActiveAttempt()).toBeNull();
      expect(db.select().from(reviewLogs).all()).toEqual([]);
      expect(db.select().from(reviewStates).all()[0].repetitions).toBe(0);
    });

    it('rejects starting review on word whose due date is in future (Point 1)', () => {
      const tomorrow = new Date();
      tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
      const wordId = insertTestWord('future-word');
      db.update(reviewStates).set({ dueAt: tomorrow.toISOString() }).where(eq(reviewStates.wordId, wordId)).run();

      expect(() => {
        service.startAttempt({ requestId: 'req-fut', wordId });
      }).toThrowError(/not currently due/i);
    });

    it('resumes active attempt with matching task intent and rejects mismatched task intent (Point 1)', () => {
      const wordId = insertTestWord('intent-test');
      const taskId = randomUUID();
      const now = new Date().toISOString();
      db.insert(studyTasks).values({
        id: taskId,
        scheduledDate: now.slice(0, 10),
        kind: 'REVIEW_WORDS',
        targetCount: 1,
        source: 'MANUAL',
        version: 1,
        createdAt: now,
        updatedAt: now,
        creationIntent: '{}',
      }).run();

      const attempt = service.startAttempt({
        requestId: 'req-intent-1',
        wordId,
        studyTaskId: taskId,
      });
      expect(attempt.studyTaskId).toBe(taskId);

      // Same word and same task -> resumes
      const resumed = service.startAttempt({
        requestId: 'req-intent-2',
        wordId,
        studyTaskId: taskId,
      });
      expect(resumed.id).toBe(attempt.id);

      // Same word but different task intent -> rejects with 409
      expect(() => {
        service.startAttempt({
          requestId: 'req-intent-3',
          wordId,
          studyTaskId: undefined, // mismatched!
        });
      }).toThrowError(/study task intent/i);
    });

    it('detects word content edits during review and throws 409 conflict (Point 2)', async () => {
      const wordId = insertTestWord('edited-word');
      const attempt = service.startAttempt({ requestId: 'edit-start', wordId });

      await service.stepAttempt(attempt.id, {
        requestId: 'edit-recall',
        expectedVersion: attempt.version,
        action: 'RECALL',
        answer: 'edited-word',
      });

      const feedback = service.getActiveAttempt()!;
      await service.stepAttempt(attempt.id, {
        requestId: 'edit-cont',
        expectedVersion: feedback.version,
        action: 'CONTINUE',
      });

      const readyForAssess = service.getActiveAttempt()!;

      // Concurrently edit the word definition
      db.update(words)
        .set({ updatedAt: new Date(Date.now() + 1000).toISOString(), definition: 'Changed definition' })
        .where(eq(words.id, wordId))
        .run();

      // Completing now fails due to word snapshot conflict
      expect(() => {
        service.completeAttempt({
          requestId: 'edit-complete',
          attemptId: attempt.id,
          expectedVersion: readyForAssess.version,
          rating: 'GOOD',
        });
      }).toThrowError(/edited during review/i);
    });

    it('handles AI provider failure by cleaning up request claim to allow retry or SELF (Point 5)', async () => {
      const wordId = insertTestWord('ai-failure-word');
      const attempt = service.startAttempt({ requestId: 'ai-fail-start', wordId });

      await service.stepAttempt(attempt.id, {
        requestId: 'ai-fail-recall',
        expectedVersion: attempt.version,
        action: 'RECALL',
        answer: 'ai-failure-word',
      });

      const feedback = service.getActiveAttempt()!;
      await service.stepAttempt(attempt.id, {
        requestId: 'ai-fail-cont',
        expectedVersion: feedback.version,
        action: 'CONTINUE',
        practice: true,
      });

      const outputStage = service.getActiveAttempt()!;

      // Configure grader that fails with provider error
      let failGrader = true;
      const failingService = new ReviewAttemptService(db, repo, {
        outputGrader: {
          grade: async () => {
            if (failGrader) throw new Error('Provider 503 timeout');
            return { score: 90, explanation: 'Passed after retry.', suggestion: 'good' };
          },
        },
        getConfig: async () => ({
          config: { apiKey: 'k', baseURL: 'https://api.openai.com/v1', model: 'm', timeoutMs: 15000 },
          revision: 'rev-stable-1',
        }),
      });

      // Attempt AI grading fails with 503
      await expect(
        failingService.stepAttempt(attempt.id, {
          requestId: 'ai-req-1',
          expectedVersion: outputStage.version,
          action: 'OUTPUT',
          answer: 'This is a sentence for ai-failure-word.',
          method: 'AI',
          configRevision: 'rev-stable-1',
        })
      ).rejects.toThrowError(/AI evaluation failed/i);

      // Request claim was deleted so stage is unchanged and user can switch to SELF
      const stillOutputStage = service.getActiveAttempt()!;
      expect(stillOutputStage.stage).toBe('OUTPUT');

      // Now user can complete via SELF
      const selfResult = await failingService.stepAttempt(attempt.id, {
        requestId: 'ai-req-self',
        expectedVersion: stillOutputStage.version,
        action: 'OUTPUT',
        answer: 'This is a formal sentence for ai-failure-word.',
        method: 'SELF',
      });

      expect(selfResult.stage).toBe('ASSESS');
      expect(selfResult.output?.method).toBe('SELF');
    });

    it('enforces formal checks on SELF output (Point 7)', async () => {
      const wordId = insertTestWord('formal-check-word');
      const attempt = service.startAttempt({ requestId: 'form-start', wordId });
      await service.stepAttempt(attempt.id, {
        requestId: 'form-recall',
        expectedVersion: attempt.version,
        action: 'RECALL',
        answer: 'formal-check-word',
      });
      const feedback = service.getActiveAttempt()!;
      await service.stepAttempt(attempt.id, {
        requestId: 'form-cont',
        expectedVersion: feedback.version,
        action: 'CONTINUE',
        practice: true,
      });
      const outputStage = service.getActiveAttempt()!;

      // Too short sentence fails formal check
      await expect(
        service.stepAttempt(attempt.id, {
          requestId: 'form-short',
          expectedVersion: outputStage.version,
          action: 'OUTPUT',
          answer: 'short sentence',
          method: 'SELF',
        })
      ).rejects.toThrowError(/formal requirements.*TOO_SHORT/i);

      // Sentence missing target word fails formal check
      await expect(
        service.stepAttempt(attempt.id, {
          requestId: 'form-missing',
          expectedVersion: outputStage.version,
          action: 'OUTPUT',
          answer: 'A sentence that does not contain the word.',
          method: 'SELF',
        })
      ).rejects.toThrowError(/formal requirements.*TARGET_MISSING/i);

      // Valid sentence succeeds
      const success = await service.stepAttempt(attempt.id, {
        requestId: 'form-valid',
        expectedVersion: outputStage.version,
        action: 'OUTPUT',
        answer: 'A valid test sentence containing formal-check-word.',
        method: 'SELF',
      });
      expect(success.stage).toBe('ASSESS');
    });
  });
});
