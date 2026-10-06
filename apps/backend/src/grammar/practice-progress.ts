/**
 * @file practice-progress.ts
 * @description Pure domain calculations for grammar practice progress, retention metrics, and schedule derivations.
 */
import type { GrammarReviewState } from '../repositories/grammar-practice.repository.js';

export interface GrammarPracticeCategoryStats {
  correct: number;
  total: number;
  percent: number | null;
}

export interface GrammarPracticeLessonProgress {
  lessonId: string;
  revisionId: string;
  recognition: GrammarPracticeCategoryStats;
  recall: GrammarPracticeCategoryStats;
  outputCount: number;
  reviewCount: number;
  isStable: boolean;
  state: GrammarReviewState | null;
}

export interface FirstAttemptSample {
  exerciseId: string;
  kind: 'choice' | 'gap' | 'transform' | 'correction';
  isCorrect: boolean;
}

/**
 * Calculates the next UTC midnight following lesson completion.
 * GET /due and progress evaluation do not mutate the database;
 * initial schedule derives from completedAt.
 */
export function calculateInitialDueAt(completedAt: string): string {
  const date = new Date(completedAt);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid completedAt timestamp: ${completedAt}`);
  }
  const nextUtc = new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate() + 1,
    0,
    0,
    0,
    0,
  ));
  return nextUtc.toISOString();
}

/**
 * Derives an initial unpersisted review state when a controlled lesson is complete.
 */
export function deriveInitialReviewState(
  lessonId: string,
  revisionId: string,
  revision: string,
  completedAt: string,
): GrammarReviewState {
  return {
    lessonId,
    revisionId,
    revision,
    easeFactor: 2.5,
    repetitions: 0,
    interval: 0,
    lapses: 0,
    dueAt: calculateInitialDueAt(completedAt),
    lastReviewedAt: null,
    createdAt: completedAt,
    updatedAt: completedAt,
  };
}

export function computeCategoryStats(correct: number, total: number): GrammarPracticeCategoryStats {
  return {
    correct,
    total,
    percent: total >= 5 ? Math.round((correct / total) * 100) : null,
  };
}

export function checkIsStable(
  recognition: GrammarPracticeCategoryStats,
  recall: GrammarPracticeCategoryStats,
  successfulReviewUtcDaysCount: number,
): boolean {
  const distinctItems = recognition.total + recall.total;
  if (distinctItems < 10) return false;
  const combinedCorrect = recognition.correct + recall.correct;
  const combinedAccuracy = combinedCorrect / distinctItems;
  if (combinedAccuracy < 0.8) return false;
  if (successfulReviewUtcDaysCount < 2) return false;
  return true;
}

export function evaluateLessonPracticeProgress(params: {
  lessonId: string;
  revisionId: string;
  firstAttempts: FirstAttemptSample[];
  outputCount: number;
  reviewCount: number;
  successfulReviewUtcDaysCount: number;
  state: GrammarReviewState | null;
}): GrammarPracticeLessonProgress {
  let recognitionCorrect = 0;
  let recognitionTotal = 0;
  let recallCorrect = 0;
  let recallTotal = 0;

  for (const sample of params.firstAttempts) {
    if (sample.kind === 'choice') {
      recognitionTotal += 1;
      if (sample.isCorrect) recognitionCorrect += 1;
    } else {
      recallTotal += 1;
      if (sample.isCorrect) recallCorrect += 1;
    }
  }

  const recognition = computeCategoryStats(recognitionCorrect, recognitionTotal);
  const recall = computeCategoryStats(recallCorrect, recallTotal);
  const isStable = checkIsStable(recognition, recall, params.successfulReviewUtcDaysCount);

  return {
    lessonId: params.lessonId,
    revisionId: params.revisionId,
    recognition,
    recall,
    outputCount: params.outputCount,
    reviewCount: params.reviewCount,
    isStable,
    state: params.state,
  };
}
