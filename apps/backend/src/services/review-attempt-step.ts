/**
 * @file review-attempt-step.ts
 * @description State transitions for RECALL, CONTINUE, and OUTPUT with durable claims and formal validation.
 */

import type { AppDatabase } from '../db/client.js';
import type { ReviewAttemptRepository } from '../repositories/review-attempt.repository.js';
import type { ReviewEvidenceRepository } from '../repositories/review-evidence.repository.js';
import type { SM2Scheduler } from '../domain/spaced-repetition/sm2.js';
import { checkAnswer } from '../domain/text/normalization.js';
import { evaluateOutput } from '../domain/learning/output-evaluation.js';
import { buildReviewAttemptView } from './review-attempt-view.js';
import {
  AppError,
  NotFoundError,
  ConflictError,
  ValidationError,
} from './vocabulary.service.js';
import type { OutputGrader, OutputGrade } from '../domain/learning/ai-output-grader.js';
import type { ResolvedAiConfig } from './ai-client.js';
import type {
  ReviewAttemptRow,
  StepReviewAttemptInput,
  ReviewAttemptView,
} from '../schemas/review-attempt.schema.js';

export async function executeStepReviewAttempt(params: {
  db: AppDatabase;
  attemptRepo: ReviewAttemptRepository;
  reviewRepo: ReviewEvidenceRepository;
  scheduler: SM2Scheduler;
  outputGrader: OutputGrader;
  resolveAiConfig: () => Promise<ResolvedAiConfig>;
  attemptId: string;
  input: StepReviewAttemptInput;
}): Promise<ReviewAttemptView> {
  const { db, attemptRepo, reviewRepo, scheduler, outputGrader, resolveAiConfig, attemptId, input } =
    params;

  // 1. Replay check with attemptId and action verification
  const existingRequest = attemptRepo.findRequest(input.requestId);
  if (existingRequest) {
    if (
      existingRequest.attemptId !== attemptId ||
      existingRequest.action !== input.action ||
      existingRequest.requestBody !== JSON.stringify(input)
    ) {
      throw new ConflictError('Request ID reused with different payload');
    }
    if (existingRequest.response !== null) {
      return JSON.parse(existingRequest.response) as ReviewAttemptView;
    }
    // Existing claim without response means an in-flight operation
    throw new ConflictError('Operation already in progress for this request. Please wait.', {
      reason: 'IN_FLIGHT_REQUEST',
    });
  }

  // 2. Load and validate attempt
  const attempt = attemptRepo.getAttemptById(attemptId);
  if (!attempt) {
    throw new NotFoundError(`Review attempt with id "${attemptId}" not found`);
  }
  if (attempt.status !== 'ACTIVE') {
    throw new ConflictError('Review attempt is no longer active');
  }
  if (attempt.version !== input.expectedVersion) {
    throw new ConflictError('Stale review attempt version', {
      reason: 'VERSION_MISMATCH',
      expectedVersion: input.expectedVersion,
      actualVersion: attempt.version,
    });
  }

  // 3. RECALL step
  if (input.action === 'RECALL') {
    if (attempt.stage !== 'RECALL') {
      throw new ConflictError(`Cannot perform RECALL from stage ${attempt.stage}`);
    }

    const word = reviewRepo.getWord(attempt.wordId);
    if (!word) {
      throw new NotFoundError(`Word with id "${attempt.wordId}" not found`);
    }

    const answer = input.answer;
    let recallResult: 'EXACT' | 'TYPO' | 'INCORRECT';
    let recallScore: number;

    if (answer.trim() === '') {
      recallResult = 'INCORRECT';
      recallScore = 0;
    } else {
      const checked = checkAnswer(answer, word.word);
      if (checked.exact) {
        recallResult = 'EXACT';
        recallScore = 100;
      } else if (checked.almostCorrect) {
        recallResult = 'TYPO';
        recallScore = 70;
      } else {
        recallResult = 'INCORRECT';
        recallScore = 0;
      }
    }

    const needsOutput = attempt.needsOutput || recallResult === 'INCORRECT';
    const now = new Date().toISOString();

    const updatedAttempt: ReviewAttemptRow = {
      ...attempt,
      stage: 'FEEDBACK',
      version: attempt.version + 1,
      recallAnswer: answer,
      recallResult,
      recallScore,
      responseTime: input.responseTime ?? null,
      needsOutput,
      updatedAt: now,
    };

    let view!: ReviewAttemptView;
    db.sqlite.transaction(() => {
      const success = attemptRepo.updateAttempt(updatedAttempt, attempt.version);
      if (!success) {
        throw new ConflictError('Concurrent edit on review attempt');
      }
      view = buildReviewAttemptView(reviewRepo, updatedAttempt, scheduler);
      attemptRepo.insertRequest({
        requestId: input.requestId,
        attemptId: attempt.id,
        action: 'RECALL',
        requestBody: JSON.stringify(input),
        response: JSON.stringify(view),
        createdAt: now,
      });
    })();

    return view;
  }

  // 4. CONTINUE step
  if (input.action === 'CONTINUE') {
    if (attempt.stage !== 'FEEDBACK') {
      throw new ConflictError(`Cannot perform CONTINUE from stage ${attempt.stage}`);
    }

    const nextStage = attempt.needsOutput || input.practice ? 'OUTPUT' : 'ASSESS';
    const now = new Date().toISOString();

    const updatedAttempt: ReviewAttemptRow = {
      ...attempt,
      stage: nextStage,
      version: attempt.version + 1,
      updatedAt: now,
    };

    let view!: ReviewAttemptView;
    db.sqlite.transaction(() => {
      const success = attemptRepo.updateAttempt(updatedAttempt, attempt.version);
      if (!success) {
        throw new ConflictError('Concurrent edit on review attempt');
      }
      view = buildReviewAttemptView(reviewRepo, updatedAttempt, scheduler);
      attemptRepo.insertRequest({
        requestId: input.requestId,
        attemptId: attempt.id,
        action: 'CONTINUE',
        requestBody: JSON.stringify(input),
        response: JSON.stringify(view),
        createdAt: now,
      });
    })();

    return view;
  }

  // 5. OUTPUT step
  if (input.action === 'OUTPUT') {
    if (attempt.stage !== 'OUTPUT') {
      throw new ConflictError(`Cannot perform OUTPUT from stage ${attempt.stage}`);
    }

    const word = reviewRepo.getWord(attempt.wordId);
    if (!word) {
      throw new NotFoundError(`Word with id "${attempt.wordId}" not found`);
    }

    // Word content snapshot check
    if (word.updatedAt !== attempt.expectedWordUpdatedAt) {
      throw new ConflictError('Word definition or content changed during review', {
        reason: 'WORD_EDITED_CONFLICT',
      });
    }

    // Formal evaluation check (non-empty, >=4 tokens, target present)
    const formalCheck = evaluateOutput(input.answer, word.word);
    if (!formalCheck.valid) {
      throw new ValidationError(
        `Sentence does not meet formal requirements: ${formalCheck.codes.join(', ')}`
      );
    }

    if (input.method === 'SELF') {
      const now = new Date().toISOString();
      const updatedAttempt: ReviewAttemptRow = {
        ...attempt,
        stage: 'ASSESS',
        version: attempt.version + 1,
        outputAnswer: input.answer.trim(),
        outputMethod: 'SELF',
        outputScore: null,
        outputExplanation: null,
        outputSuggestion: null,
        outputConfigRevision: null,
        updatedAt: now,
      };

      let view!: ReviewAttemptView;
      db.sqlite.transaction(() => {
        const success = attemptRepo.updateAttempt(updatedAttempt, attempt.version);
        if (!success) {
          throw new ConflictError('Concurrent edit on review attempt');
        }
        view = buildReviewAttemptView(reviewRepo, updatedAttempt, scheduler);
        attemptRepo.insertRequest({
          requestId: input.requestId,
          attemptId: attempt.id,
          action: 'OUTPUT',
          requestBody: JSON.stringify(input),
          response: JSON.stringify(view),
          createdAt: now,
        });
      })();

      return view;
    }

    // AI method
    if (!input.configRevision) {
      throw new ValidationError('configRevision is required for AI output evaluation');
    }

    const preSnapshot = await resolveAiConfig();
    if (input.configRevision !== preSnapshot.revision) {
      throw new AppError(
        409,
        'AI_CONFIG_CHANGED',
        'AI configuration changed. Reload before asking again.'
      );
    }

    const claimTime = new Date().toISOString();
    // Persist claim before calling provider
    attemptRepo.insertRequest({
      requestId: input.requestId,
      attemptId: attempt.id,
      action: 'OUTPUT',
      requestBody: JSON.stringify(input),
      response: null,
      createdAt: claimTime,
    });

    let gradeResult: OutputGrade;
    try {
      gradeResult = await outputGrader.grade({
        word: word.word,
        definition: word.definition,
        sentence: input.answer.trim(),
      });
    } catch (error) {
      // Clear claim on provider failure so same-intent retry or switch to SELF works
      attemptRepo.deleteRequest(input.requestId);
      if (error instanceof AppError) throw error;
      throw new AppError(
        503,
        'AI_UNAVAILABLE',
        'AI evaluation failed. Your sentence draft has been preserved.'
      );
    }

    const postSnapshot = await resolveAiConfig();
    if (input.configRevision !== postSnapshot.revision) {
      attemptRepo.deleteRequest(input.requestId);
      throw new AppError(
        409,
        'AI_CONFIG_CHANGED',
        'AI configuration changed. Reload before asking again.'
      );
    }

    const now = new Date().toISOString();
    const updatedAttempt: ReviewAttemptRow = {
      ...attempt,
      stage: 'ASSESS',
      version: attempt.version + 1,
      outputAnswer: input.answer.trim(),
      outputMethod: 'AI',
      outputScore: gradeResult.score,
      outputExplanation: gradeResult.explanation,
      outputSuggestion: gradeResult.suggestion,
      outputConfigRevision: input.configRevision,
      updatedAt: now,
    };

    let view!: ReviewAttemptView;
    db.sqlite.transaction(() => {
      const success = attemptRepo.updateAttempt(updatedAttempt, attempt.version);
      if (!success) {
        attemptRepo.deleteRequest(input.requestId);
        throw new ConflictError('Concurrent edit on review attempt');
      }
      view = buildReviewAttemptView(reviewRepo, updatedAttempt, scheduler);
      attemptRepo.updateRequestResponse(input.requestId, JSON.stringify(view));
    })();

    return view;
  }

  throw new ValidationError('Unknown step action');
}
