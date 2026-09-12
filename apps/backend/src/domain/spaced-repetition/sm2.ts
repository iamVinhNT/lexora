import type {
  ReviewRating,
  ReviewItemState,
  ScheduleResult,
  SpacedRepetitionScheduler,
} from './types.js';

export const RATING_GRADES: Record<ReviewRating, number> = {
  AGAIN: 1,
  HARD: 3,
  GOOD: 4,
  EASY: 5,
};

export const SM2_GRADES = RATING_GRADES;

export const MIN_EASE_FACTOR = 1.3;
export const DEFAULT_EASE_FACTOR = 2.5;

/**
 * Calculates the updated SM-2 ease factor.
 * Formula: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
 * Clamped at minimum 1.3.
 */
export function calculateNewEaseFactor(currentEaseFactor: number, grade: number): number {
  const efDelta = 0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02);
  const updatedEf = currentEaseFactor + efDelta;
  // Round to 2 decimal places to avoid floating point precision artifacts
  const rounded = Math.round((updatedEf + Number.EPSILON) * 100) / 100;
  return Math.max(MIN_EASE_FACTOR, rounded);
}

/**
 * Calculates the next due date at the start of its UTC day.
 */
export function calculateNextDueDate(reviewDate: Date | string, intervalDays: number): Date {
  const reviewDateTime = typeof reviewDate === 'string' ? new Date(reviewDate) : reviewDate;
  if (!(reviewDateTime instanceof Date) || isNaN(reviewDateTime.getTime())) {
    throw new Error(`Invalid reviewDate provided: ${reviewDate}`);
  }
  const dueDate = new Date(reviewDateTime);
  dueDate.setUTCDate(dueDate.getUTCDate() + intervalDays);
  dueDate.setUTCHours(0, 0, 0, 0);
  return dueDate;
}

/**
 * Pure function executing the SM-2 algorithm.
 */
export function calculateSM2(
  currentState: ReviewItemState,
  rating: ReviewRating,
  reviewDate: Date | string = new Date()
): ScheduleResult {
  if (!rating || !(rating in SM2_GRADES)) {
    throw new Error(`Invalid rating provided: "${rating}". Must be one of: ${Object.keys(SM2_GRADES).join(', ')}`);
  }

  const reviewDateTime = typeof reviewDate === 'string' ? new Date(reviewDate) : reviewDate;
  if (!(reviewDateTime instanceof Date) || isNaN(reviewDateTime.getTime())) {
    throw new Error(`Invalid reviewDate provided: ${reviewDate}`);
  }

  const grade = SM2_GRADES[rating];
  const currentEf = currentState.easeFactor ?? DEFAULT_EASE_FACTOR;
  const currentReps = currentState.repetitions ?? 0;
  const currentInterval = currentState.interval ?? 0;
  const currentLapses = currentState.lapses ?? 0;

  const newEaseFactor = calculateNewEaseFactor(currentEf, grade);

  let newRepetitions: number;
  let newInterval: number;
  let newLapses = currentLapses;

  if (grade < 3) {
    // Rating AGAIN: repetitions reset to 0, interval = 1, lapses incremented by 1
    newRepetitions = 0;
    newInterval = 1;
    newLapses += 1;
  } else {
    // Ratings HARD (grade 3), GOOD (grade 4), EASY (grade 5)
    newRepetitions = currentReps + 1;

    if (newRepetitions === 1) {
      newInterval = 1;
    } else if (newRepetitions === 2) {
      newInterval = 6;
    } else {
      const baseInterval = currentInterval > 0 ? currentInterval : 6;
      newInterval = Math.round(baseInterval * newEaseFactor);
    }
  }

  const dueAt = calculateNextDueDate(reviewDateTime, newInterval);

  return {
    repetitions: newRepetitions,
    interval: newInterval,
    easeFactor: newEaseFactor,
    lapses: newLapses,
    dueAt,
    lastReviewedAt: reviewDateTime,
  };
}

/**
 * SM2Scheduler adapter implementing SpacedRepetitionScheduler interface.
 */
export class SM2Scheduler implements SpacedRepetitionScheduler {
  schedule(
    currentState: ReviewItemState,
    rating: ReviewRating,
    reviewDate: Date | string = new Date()
  ): ScheduleResult {
    return calculateSM2(currentState, rating, reviewDate);
  }

  getNextDueDate(reviewDate: Date | string, intervalDays: number): Date {
    return calculateNextDueDate(reviewDate, intervalDays);
  }
}
