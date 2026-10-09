/**
 * @file review-attempt-completion.ts
 * @description Single-transaction completion, snapshot concurrency verification, and SM-2 scheduling.
 */

import { randomUUID } from 'node:crypto';
import type { AppDatabase } from '../db/client.js';
import type { ReviewAttemptRepository } from '../repositories/review-attempt.repository.js';
import type { StudyRepository } from '../repositories/study.repository.js';
import type { ReviewEvidenceRepository } from '../repositories/review-evidence.repository.js';
import type { SM2Scheduler } from '../domain/spaced-repetition/sm2.js';
import type { KnowledgeAssessmentService } from '../domain/knowledge/assessment.js';
import type { ReviewLogEntry, VocabularyState } from '../domain/knowledge/types.js';
import { advanceStateOneLevel } from '../domain/learning/scoring.js';
import { calculateEffectiveRatings } from '../domain/review/prompt.js';
import { buildReviewAttemptView } from './review-attempt-view.js';
import { NotFoundError, ConflictError } from './vocabulary.service.js';
import type { ReviewRating } from '../schemas/review.schema.js';
import type {
  ReviewAttemptRow,
  CompleteReviewAttemptInput,
  CompleteReviewResult,
} from '../schemas/review-attempt.schema.js';

export function executeCompleteReviewAttempt(params: {
  db: AppDatabase;
  attemptRepo: ReviewAttemptRepository;
  studyRepo: StudyRepository;
  reviewRepo: ReviewEvidenceRepository;
  scheduler: SM2Scheduler;
  assessmentService: KnowledgeAssessmentService;
  input: CompleteReviewAttemptInput;
}): CompleteReviewResult {
  const { db, attemptRepo, reviewRepo, studyRepo, scheduler, assessmentService, input } = params;

  // 1. Replay check with attemptId and action verification
  const existingRequest = attemptRepo.findRequest(input.requestId);
  if (existingRequest) {
    if (
      existingRequest.attemptId !== input.attemptId ||
      existingRequest.action !== 'COMPLETE' ||
      existingRequest.requestBody !== JSON.stringify(input)
    ) {
      throw new ConflictError('Request ID reused with different payload');
    }
    if (existingRequest.response !== null) {
      return JSON.parse(existingRequest.response) as CompleteReviewResult;
    }
  }

  // 2. Pre-check attempt
  const attempt = attemptRepo.getAttemptById(input.attemptId);
  if (!attempt) {
    throw new NotFoundError(`Review attempt with id "${input.attemptId}" not found`);
  }
  if (attempt.status !== 'ACTIVE') {
    throw new ConflictError('Review attempt is no longer active');
  }
  if (attempt.stage !== 'ASSESS') {
    throw new ConflictError(`Cannot complete review attempt from stage ${attempt.stage}`);
  }
  if (attempt.version !== input.expectedVersion) {
    throw new ConflictError('Stale review attempt version', {
      expectedVersion: input.expectedVersion,
      actualVersion: attempt.version,
    });
  }
  if (!attempt.recallResult) {
    throw new ConflictError('Cannot complete attempt without recall evaluation');
  }

  // 3. Complete within an immediate transaction
  return db.sqlite.transaction(() => {
    const now = new Date().toISOString();

    // Re-read live attempt inside transaction to avoid race conditions
    const liveAttempt = attemptRepo.getAttemptById(input.attemptId);
    if (
      !liveAttempt ||
      liveAttempt.status !== 'ACTIVE' ||
      liveAttempt.stage !== 'ASSESS' ||
      liveAttempt.version !== input.expectedVersion
    ) {
      throw new ConflictError('Review attempt changed or is no longer active', {
        reason: 'CONCURRENT_ATTEMPT_EDIT',
      });
    }

    // Snapshot guard on word content
    const word = reviewRepo.getWord(liveAttempt.wordId);
    if (!word) {
      throw new NotFoundError(`Word with id "${liveAttempt.wordId}" not found`);
    }
    if (word.updatedAt !== liveAttempt.expectedWordUpdatedAt) {
      throw new ConflictError(
        'Word definition or content was edited during review. Please restart review for this word.',
        { reason: 'WORD_EDITED_CONFLICT' }
      );
    }

    // Snapshot guard on reviewState
    const currentReviewState = reviewRepo.getReviewState(liveAttempt.wordId);

    const currentInterval = currentReviewState?.interval ?? 0;
    const currentEase = currentReviewState?.easeFactor ?? 2.5;
    const currentReps = currentReviewState?.repetitions ?? 0;
    const currentLapses = currentReviewState?.lapses ?? 0;
    const currentDue = currentReviewState?.dueAt ?? liveAttempt.expectedDueAt;
    const currentLastReviewedAt = currentReviewState?.lastReviewedAt ?? null;

    if (
      currentInterval !== liveAttempt.expectedInterval ||
      Math.abs(currentEase - liveAttempt.expectedEaseFactor) > 0.001 ||
      currentReps !== liveAttempt.expectedRepetitions ||
      currentLapses !== liveAttempt.expectedLapses ||
      currentDue !== liveAttempt.expectedDueAt ||
      currentLastReviewedAt !== liveAttempt.expectedLastReviewedAt
    ) {
      throw new ConflictError(
        'Review state changed concurrently. Please restart review for this word.',
        { reason: 'STALE_REVIEW_SNAPSHOT' }
      );
    }

    // Usable study task verification
    if (liveAttempt.studyTaskId) {
      studyRepo.assertUsableTask(db, liveAttempt.studyTaskId, 'REVIEW_WORDS', now);
    }

    // Calculate effective rating based on objective recall evidence
    const ratingsMap = calculateEffectiveRatings({
      recallResult: liveAttempt.recallResult,
      recallScore: liveAttempt.recallScore,
      outputMethod: liveAttempt.outputMethod,
      outputScore: liveAttempt.outputScore,
    });
    const effectiveRating = ratingsMap[input.rating];

    // Compute SM-2 schedule
    const sm2State = {
      interval: liveAttempt.expectedInterval,
      easeFactor: liveAttempt.expectedEaseFactor,
      repetitions: liveAttempt.expectedRepetitions,
      lapses: liveAttempt.expectedLapses,
    };
    const scheduled = scheduler.schedule(sm2State, effectiveRating, now);

    // Update or insert review_states
    if (currentReviewState) {
      reviewRepo.updateReviewState(liveAttempt.wordId, {
          interval: scheduled.interval,
          easeFactor: scheduled.easeFactor,
          repetitions: scheduled.repetitions,
          lapses: scheduled.lapses,
          dueAt: scheduled.dueAt.toISOString(),
          lastReviewedAt: scheduled.lastReviewedAt.toISOString(),
      });
    } else {
      reviewRepo.insertReviewState({
          id: randomUUID(),
          wordId: liveAttempt.wordId,
          interval: scheduled.interval,
          easeFactor: scheduled.easeFactor,
          repetitions: scheduled.repetitions,
          lapses: scheduled.lapses,
          dueAt: scheduled.dueAt.toISOString(),
          lastReviewedAt: scheduled.lastReviewedAt.toISOString(),
      });
    }

    // 1. RECALL log: task quota on recall log only
    const isRecallCorrect = liveAttempt.recallResult === 'EXACT';
    const recallLogId = randomUUID();
    reviewRepo.insertReviewLog({
        id: recallLogId,
        wordId: liveAttempt.wordId,
        reviewType: liveAttempt.promptType,
        rating: effectiveRating,
        answer: liveAttempt.recallAnswer ?? null,
        correct: isRecallCorrect,
        responseTime: liveAttempt.responseTime ?? null,
        performanceScore: liveAttempt.recallScore ?? null,
        createdAt: now,
        studyTaskId: liveAttempt.studyTaskId ?? null,
    });

    // 2. Graded PRODUCTION log: only if evaluated with AI (never for SELF)
    if (liveAttempt.outputMethod === 'AI' && liveAttempt.outputScore !== null) {
      const productionLogId = randomUUID();
      const isProductionCorrect = liveAttempt.outputScore >= 60;
      reviewRepo.insertReviewLog({
          id: productionLogId,
          wordId: liveAttempt.wordId,
          reviewType: 'PRODUCTION',
          rating: effectiveRating,
          answer: liveAttempt.outputAnswer ?? null,
          correct: isProductionCorrect,
          responseTime: null,
          performanceScore: liveAttempt.outputScore,
          createdAt: now,
          studyTaskId: null, // quota credited on recall log only
      });
    }

    // Assess knowledge progression with performanceScore preserved
    const allLogs = reviewRepo.getHistory(liveAttempt.wordId);

    const logEntries: ReviewLogEntry[] = allLogs.map((l) => ({
      reviewType: l.reviewType,
      rating: l.rating as ReviewRating,
      correct: Boolean(l.correct),
      performanceScore:
        l.performanceScore !== null && l.performanceScore !== undefined
          ? Number(l.performanceScore)
          : undefined,
      createdAt: l.createdAt,
    }));

    const assessment = assessmentService.assess({
      reviewLogs: logEntries,
      repetitions: scheduled.repetitions,
      interval: scheduled.interval,
      lapses: scheduled.lapses,
    });

    const existingProgress = reviewRepo.getProgress(liveAttempt.wordId);

    const currentProgressStatus =
      (existingProgress?.status as VocabularyState) ?? 'NEW';
    const nextStatus = advanceStateOneLevel(currentProgressStatus, assessment.state);

    if (existingProgress) {
      reviewRepo.updateProgress(liveAttempt.wordId, {
          status: nextStatus,
          recognitionScore: assessment.scores.recognitionScore,
          recallScore: assessment.scores.recallScore,
          productionScore: assessment.scores.productionScore,
          lastStudiedAt: now,
          updatedAt: now,
      });
    } else {
      reviewRepo.insertProgress({
          id: randomUUID(),
          wordId: liveAttempt.wordId,
          status: nextStatus,
          recognitionScore: assessment.scores.recognitionScore,
          recallScore: assessment.scores.recallScore,
          productionScore: assessment.scores.productionScore,
          lastStudiedAt: now,
          updatedAt: now,
      });
    }

    // Complete attempt with CAS check
    const completedAttemptRow: ReviewAttemptRow = {
      ...liveAttempt,
      status: 'COMPLETED',
      version: liveAttempt.version + 1,
      selfRating: input.rating,
      effectiveRating,
      completedAt: now,
      updatedAt: now,
    };

    const updateSuccess = attemptRepo.updateAttempt(completedAttemptRow, liveAttempt.version);
    if (!updateSuccess) {
      throw new ConflictError(
        'Failed to complete review attempt due to concurrent version conflict',
        { reason: 'CONCURRENT_ATTEMPT_EDIT' }
      );
    }

    const updatedReviewStateRow = reviewRepo.getReviewState(liveAttempt.wordId)!;
    const updatedProgressRow = reviewRepo.getProgress(liveAttempt.wordId)!;
    const createdRecallLogRow = reviewRepo.getReviewLog(recallLogId)!;

    const attemptView = buildReviewAttemptView(reviewRepo, completedAttemptRow, scheduler);

    const result: CompleteReviewResult = {
      attempt: attemptView,
      selfRating: input.rating,
      effectiveRating,
      reviewState: {
        id: updatedReviewStateRow.id,
        wordId: updatedReviewStateRow.wordId,
        interval: updatedReviewStateRow.interval,
        easeFactor: updatedReviewStateRow.easeFactor,
        repetitions: updatedReviewStateRow.repetitions,
        lapses: updatedReviewStateRow.lapses,
        dueAt: updatedReviewStateRow.dueAt,
        lastReviewedAt: updatedReviewStateRow.lastReviewedAt,
      },
      learningProgress: {
        wordId: updatedProgressRow.wordId,
        status: updatedProgressRow.status,
        recognitionScore: updatedProgressRow.recognitionScore,
        recallScore: updatedProgressRow.recallScore,
        productionScore: updatedProgressRow.productionScore,
      },
      reviewLog: {
        id: createdRecallLogRow.id,
        wordId: createdRecallLogRow.wordId,
        reviewType: createdRecallLogRow.reviewType,
        rating: createdRecallLogRow.rating as ReviewRating,
        answer: createdRecallLogRow.answer,
        correct:
          createdRecallLogRow.correct !== null
            ? Boolean(createdRecallLogRow.correct)
            : null,
        responseTime: createdRecallLogRow.responseTime,
        createdAt: createdRecallLogRow.createdAt,
      },
    };

    attemptRepo.insertRequest({
      requestId: input.requestId,
      attemptId: liveAttempt.id,
      action: 'COMPLETE',
      requestBody: JSON.stringify(input),
      response: JSON.stringify(result),
      createdAt: now,
    });

    return result;
  })();
}
