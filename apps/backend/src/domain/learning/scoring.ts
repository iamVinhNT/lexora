/**
 * @file scoring.ts
 * @description Objective learning scores, effective ratings, and monotonic state rules.
 */

import type { VocabularyState } from '../knowledge/types.js';
import type { ReviewRating } from '../spaced-repetition/types.js';

export function scoreAttempt(attemptNumber: 1 | 2, passed: boolean): 0 | 70 | 100 {
  if (!passed) return 0;
  return attemptNumber === 1 ? 100 : 70;
}

export function deriveEffectiveRating(recallScore: number, productionScore: number, selfRating: ReviewRating): ReviewRating {
  const modifier: Record<ReviewRating, number> = { AGAIN: -10, HARD: -5, GOOD: 0, EASY: 5 };
  const score = Math.max(0, Math.min(100, Math.round(recallScore * 0.5 + productionScore * 0.5) + modifier[selfRating]));
  return score < 40 ? 'AGAIN' : score < 60 ? 'HARD' : score < 85 ? 'GOOD' : 'EASY';
}

const stateOrder: VocabularyState[] = ['NEW', 'LEARNING', 'FAMILIAR', 'MASTERED', 'MAINTENANCE'];
export function advanceStateOneLevel(current: VocabularyState, calculated: VocabularyState): VocabularyState {
  const currentIndex = stateOrder.indexOf(current);
  const calculatedIndex = stateOrder.indexOf(calculated);
  return stateOrder[Math.max(currentIndex, Math.min(currentIndex + 1, calculatedIndex))] ?? current;
}
