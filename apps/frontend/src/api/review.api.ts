/**
 * @file review.api.ts
 * @description Typed client contracts for the spaced-repetition review queue.
 */
import { apiFetch } from './client';

export const REVIEW_TYPES = ['RECOGNITION', 'RECALL', 'CLOZE', 'PRODUCTION', 'CONTEXTUAL'] as const;
export type ReviewType = (typeof REVIEW_TYPES)[number];

export const REVIEW_RATINGS = ['AGAIN', 'HARD', 'GOOD', 'EASY'] as const;
export type ReviewRating = (typeof REVIEW_RATINGS)[number];

export type ReviewQuery = {
  limit?: number;
};

export type ReviewWord = {
  id: string;
  word: string;
  phonetic?: string | null;
  partOfSpeech?: string | null;
  definition: string;
  translation?: string | null;
};

export type ReviewExample = {
  id: string;
  wordId: string;
  sentence: string;
  translation?: string | null;
  source?: string | null;
};

export type ReviewContext = {
  id: string;
  title: string;
  content: string;
  sourceType?: string | null;
};

export type ExercisePrompt = {
  type: ReviewType;
  prompt: string;
  question?: string;
  answer?: string | null;
  definition?: string | null;
  phonetic?: string | null;
  targetWord?: string;
  contextSentence?: string | null;
  contextText?: string | null;
};

export type ReviewState = {
  id: string;
  wordId: string;
  interval: number;
  easeFactor: number;
  repetitions: number;
  lapses: number;
  dueAt: string;
  lastReviewedAt?: string | null;
};

export type LearningProgress = {
  wordId?: string;
  status?: string;
  recognitionScore?: number;
  recallScore?: number;
  productionScore?: number;
};

export type ReviewItem = {
  id: string;
  wordId: string;
  word: ReviewWord;
  reviewState: ReviewState;
  learningProgress?: LearningProgress | null;
  examples?: ReviewExample[];
  contexts?: ReviewContext[];
  contextSentence?: string | null;
  exercisePrompts: Record<ReviewType, ExercisePrompt>;
  intervalPreviews: Record<ReviewRating, string>;
  intervalPreview?: Record<ReviewRating, string>;
};

export type ReviewCounts = {
  new: number;
  learning: number;
  familiar: number;
  mastered: number;
  maintenance: number;
  total: number;
};

export type ReviewQueue = {
  items: ReviewItem[];
  counts: ReviewCounts;
  countsByState?: ReviewCounts;
  total: number;
};

export type SubmitReviewPayload = {
  wordId: string;
  reviewType: ReviewType;
  rating: ReviewRating;
  answer?: string | null;
  correct?: boolean | null;
  responseTime?: number | null;
  studyTaskId?: string;
};

export type ReviewLog = {
  id?: string;
  wordId?: string;
  reviewType?: ReviewType;
  rating?: ReviewRating;
  answer?: string | null;
  correct?: boolean | null;
  responseTime?: number | null;
  createdAt?: string;
};

export type SubmitReviewResult = {
  reviewState: Partial<ReviewState> & Pick<ReviewState, 'interval'>;
  learningProgress?: LearningProgress | null;
  reviewLog?: ReviewLog | null;
};

export function getDueReviews(query: ReviewQuery = {}) {
  return apiFetch<ReviewQueue>('/api/reviews/due', { query });
}

export function submitReview(payload: SubmitReviewPayload) {
  return apiFetch<SubmitReviewResult>('/api/reviews', { method: 'POST', body: payload });
}
