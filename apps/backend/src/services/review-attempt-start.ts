/**
 * @file review-attempt-start.ts
 * @description Starts or resumes an adaptive review attempt with due-date and intent guards.
 */

import { randomUUID } from 'node:crypto';
import type { AppDatabase } from '../db/client.js';
import type { ReviewAttemptRepository } from '../repositories/review-attempt.repository.js';
import type { StudyRepository } from '../repositories/study.repository.js';
import type { ReviewEvidenceRepository } from '../repositories/review-evidence.repository.js';
import type { SM2Scheduler } from '../domain/spaced-repetition/sm2.js';
import { identifyWeakReasons } from '../domain/knowledge/assessment.js';
import type { ReviewLogEntry } from '../domain/knowledge/types.js';
import { buildAdaptiveReviewPrompt } from '../domain/review/prompt.js';
import { buildReviewAttemptView } from './review-attempt-view.js';
import { NotFoundError, ConflictError } from './vocabulary.service.js';
import type { ReviewRating } from '../schemas/review.schema.js';
import type {
  ReviewAttemptRow,
  StartReviewAttemptInput,
  ReviewAttemptView,
} from '../schemas/review-attempt.schema.js';

export function executeStartReviewAttempt(params: {
  db: AppDatabase;
  attemptRepo: ReviewAttemptRepository;
  studyRepo: StudyRepository;
  reviewRepo: ReviewEvidenceRepository;
  scheduler: SM2Scheduler;
  input: StartReviewAttemptInput;
}): ReviewAttemptView {
  const { db, attemptRepo, reviewRepo, studyRepo, scheduler, input } = params;

  // 1. Replay receipt check
  const existingRequest = attemptRepo.findRequest(input.requestId);
  if (existingRequest) {
    if (existingRequest.action !== 'START' || existingRequest.requestBody !== JSON.stringify(input)) {
      throw new ConflictError('Request ID reused with different payload');
    }
    if (existingRequest.response) {
      return JSON.parse(existingRequest.response) as ReviewAttemptView;
    }
  }

  // 2. Existing active attempt guard & resume
  const active = attemptRepo.getActiveAttempt();
  if (active) {
    if (active.wordId === input.wordId) {
      const requestedTaskId = input.studyTaskId ?? null;
      if (active.studyTaskId !== requestedTaskId) {
        throw new ConflictError(
          'Active review attempt exists for this word with a different study task intent',
          {
            reason: 'TASK_INTENT_MISMATCH',
            activeTaskId: active.studyTaskId,
            requestedTaskId,
          }
        );
      }
      const view = buildReviewAttemptView(reviewRepo, active, scheduler);
      attemptRepo.insertRequest({
        requestId: input.requestId,
        attemptId: active.id,
        action: 'START',
        requestBody: JSON.stringify(input),
        response: JSON.stringify(view),
        createdAt: new Date().toISOString(),
      });
      return view;
    }
    throw new ConflictError('An active review attempt already exists for another word.', {
      reason: 'ACTIVE_ATTEMPT_EXISTS',
      activeAttemptId: active.id,
      wordId: active.wordId,
    });
  }

  // 3. Word existence check
  const word = reviewRepo.getWord(input.wordId);
  if (!word) {
    throw new NotFoundError(`Word with id "${input.wordId}" not found`);
  }

  const now = new Date().toISOString();

  // 4. Word due-date guard (cannot start future review)
  const reviewState = reviewRepo.getReviewState(input.wordId);

  if (reviewState && reviewState.dueAt > now) {
    throw new ConflictError('Word is not currently due for review', {
      reason: 'NOT_DUE',
      dueAt: reviewState.dueAt,
    });
  }

  // 5. Usable study task verification
  if (input.studyTaskId) {
    studyRepo.assertUsableTask(db, input.studyTaskId, 'REVIEW_WORDS', now);
  }

  const expectedInterval = reviewState?.interval ?? 0;
  const expectedEaseFactor = reviewState?.easeFactor ?? 2.5;
  const expectedRepetitions = reviewState?.repetitions ?? 0;
  const expectedLapses = reviewState?.lapses ?? 0;
  const expectedDueAt = reviewState?.dueAt ?? now;
  const expectedLastReviewedAt = reviewState?.lastReviewedAt ?? null;
  const expectedWordUpdatedAt = word.updatedAt ?? null;

  const wordExamples = reviewRepo.getExamples(input.wordId);
  const wordContexts = reviewRepo.getContexts(input.wordId);
  const pastLogs = reviewRepo.getHistory(input.wordId);

  const logEntries: ReviewLogEntry[] = pastLogs.map((l) => ({
    reviewType: l.reviewType,
    rating: l.rating as ReviewRating,
    correct: Boolean(l.correct),
    performanceScore:
      l.performanceScore !== null && l.performanceScore !== undefined
        ? Number(l.performanceScore)
        : undefined,
    createdAt: l.createdAt,
  }));

  const weakReasons = identifyWeakReasons({
    lapses: expectedLapses,
    repetitions: expectedRepetitions,
    interval: expectedInterval,
    reviewLogs: logEntries,
  });
  const needsOutput = weakReasons.length > 0;

  const prompt = buildAdaptiveReviewPrompt({
    word,
    examples: wordExamples,
    contexts: wordContexts,
  });

  const newAttempt: ReviewAttemptRow = {
    id: randomUUID(),
    wordId: input.wordId,
    studyTaskId: input.studyTaskId ?? null,
    status: 'ACTIVE',
    stage: 'RECALL',
    version: 1,
    promptType: prompt.type,
    promptText: prompt.text,
    expectedDueAt,
    expectedLastReviewedAt,
    expectedRepetitions,
    expectedInterval,
    expectedEaseFactor,
    expectedLapses,
    expectedWordUpdatedAt,
    needsOutput,
    weakReasons,
    recallAnswer: null,
    recallResult: null,
    recallScore: null,
    responseTime: null,
    outputAnswer: null,
    outputMethod: null,
    outputScore: null,
    outputExplanation: null,
    outputSuggestion: null,
    outputConfigRevision: null,
    selfRating: null,
    effectiveRating: null,
    completedAt: null,
    createdAt: now,
    updatedAt: now,
  };

  let resultView!: ReviewAttemptView;
  db.sqlite.transaction(() => {
    attemptRepo.insertAttempt(newAttempt);
    resultView = buildReviewAttemptView(reviewRepo, newAttempt, scheduler);
    attemptRepo.insertRequest({
      requestId: input.requestId,
      attemptId: newAttempt.id,
      action: 'START',
      requestBody: JSON.stringify(input),
      response: JSON.stringify(resultView),
      createdAt: now,
    });
  })();

  return resultView;
}
