export type ReviewRating = 'AGAIN' | 'HARD' | 'GOOD' | 'EASY';

export interface ReviewItemState {
  repetitions: number;
  interval: number;
  easeFactor: number;
  lapses: number;
  dueAt?: Date | string;
  lastReviewedAt?: Date | string | null;
}

export interface ScheduleResult {
  repetitions: number;
  interval: number;
  easeFactor: number;
  lapses: number;
  dueAt: Date;
  lastReviewedAt: Date;
}

export interface SpacedRepetitionScheduler {
  schedule(
    currentState: ReviewItemState,
    rating: ReviewRating,
    reviewDate?: Date | string
  ): ScheduleResult;

  getNextDueDate(reviewDate: Date | string, intervalDays: number): Date;
}
