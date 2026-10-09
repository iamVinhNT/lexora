/**
 * @file review-attempt-view.ts
 * @description Projects adaptive review attempts with hidden target until the first recall answer.
 */

import type { ReviewEvidenceRepository } from '../repositories/review-evidence.repository.js';
import { NotFoundError } from './vocabulary.service.js';
import { calculateEffectiveRatings } from '../domain/review/prompt.js';
import { formatInterval } from './review.service.js';
import type { SM2Scheduler } from '../domain/spaced-repetition/sm2.js';
import type { ReviewRating } from '../schemas/review.schema.js';
import type {
  ReviewAttemptRow,
  ReviewAttemptView,
} from '../schemas/review-attempt.schema.js';

const ALL_RATINGS: readonly ReviewRating[] = ['AGAIN', 'HARD', 'GOOD', 'EASY'];

export function buildReviewAttemptView(
  reviewRepo: ReviewEvidenceRepository,
  attempt: ReviewAttemptRow,
  scheduler: SM2Scheduler
): ReviewAttemptView {
  const isBeforeRecall = attempt.stage === 'RECALL';
  const wordRow = isBeforeRecall ? undefined : reviewRepo.getWord(attempt.wordId);
  if (!isBeforeRecall && !wordRow) {
    throw new NotFoundError(`Word with id "${attempt.wordId}" not found`);
  }
  const wordExamples = isBeforeRecall ? undefined : reviewRepo.getExamples(attempt.wordId);
  const wordContexts = isBeforeRecall ? undefined : reviewRepo.getContexts(attempt.wordId);

  const effectiveRatings = calculateEffectiveRatings({
    recallResult: attempt.recallResult,
    recallScore: attempt.recallScore,
    outputMethod: attempt.outputMethod,
    outputScore: attempt.outputScore,
  });

  const now = new Date().toISOString();
  const intervalPreviews = {} as Record<ReviewRating, string>;
  for (const r of ALL_RATINGS) {
    const scheduled = scheduler.schedule(
      {
        interval: attempt.expectedInterval,
        easeFactor: attempt.expectedEaseFactor,
        repetitions: attempt.expectedRepetitions,
        lapses: attempt.expectedLapses,
      },
      effectiveRatings[r],
      now
    );
    intervalPreviews[r] = formatInterval(scheduled.interval);
  }


  return {
    id: attempt.id,
    wordId: attempt.wordId,
    studyTaskId: attempt.studyTaskId,
    status: attempt.status,
    stage: attempt.stage,
    version: attempt.version,
    prompt: {
      type: attempt.promptType,
      text: attempt.promptText,
    },
    needsOutput: attempt.needsOutput,
    weakReasons: attempt.weakReasons,
    recall: attempt.recallResult
      ? {
          answer: attempt.recallAnswer ?? '',
          result: attempt.recallResult,
          score: attempt.recallScore ?? 0,
          responseTime: attempt.responseTime,
        }
      : null,
    output: attempt.outputMethod
      ? {
          answer: attempt.outputAnswer ?? '',
          method: attempt.outputMethod,
          score: attempt.outputScore,
          explanation: attempt.outputExplanation,
          suggestion: attempt.outputSuggestion,
          configRevision: attempt.outputConfigRevision,
        }
      : null,
    word: isBeforeRecall
      ? null
      : {
          id: wordRow!.id,
          word: wordRow!.word,
          definition: wordRow!.definition,
          translation: wordRow!.translation ?? null,
          phonetic: wordRow!.phonetic ?? null,
          partOfSpeech: wordRow!.partOfSpeech ?? null,
        },
    examples: isBeforeRecall
      ? []
      : wordExamples!.map((e) => ({
          sentence: e.sentence,
          translation: e.translation ?? null,
        })),
    contexts: isBeforeRecall
      ? []
      : wordContexts!.map((c) => ({
          title: c.title,
          content: c.content,
        })),
    intervalPreviews,
    effectiveRatings,
    createdAt: attempt.createdAt,
    updatedAt: attempt.updatedAt,
  };
}
