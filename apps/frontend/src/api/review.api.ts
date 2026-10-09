/**
 * @file review.api.ts
 * @description Typed client contracts for the spaced-repetition adaptive review workflow.
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

export interface ReviewAttemptPrompt {
  type: 'RECALL' | 'CLOZE';
  text: string;
}

export interface ReviewAttemptRecall {
  answer: string;
  result: 'EXACT' | 'TYPO' | 'INCORRECT';
  score: number;
  responseTime: number | null;
}

export interface ReviewAttemptOutput {
  answer: string;
  method: 'SELF' | 'AI';
  score: number | null;
  explanation: string | null;
  suggestion: string | null;
  configRevision: string | null;
}

export interface ReviewAttemptWord {
  id: string;
  word: string;
  definition: string;
  translation: string | null;
  phonetic: string | null;
  partOfSpeech: string | null;
}

export interface ReviewAttemptView {
  id: string;
  wordId: string;
  studyTaskId: string | null;
  status: 'ACTIVE' | 'COMPLETED' | 'ABANDONED';
  stage: 'RECALL' | 'FEEDBACK' | 'OUTPUT' | 'ASSESS';
  version: number;
  prompt: ReviewAttemptPrompt;
  needsOutput: boolean;
  weakReasons: string[];
  recall: ReviewAttemptRecall | null;
  output: ReviewAttemptOutput | null;
  word: ReviewAttemptWord | null;
  examples: Array<{ sentence: string; translation?: string | null }>;
  contexts: Array<{ title: string; content: string }>;
  intervalPreviews: Record<ReviewRating, string>;
  effectiveRatings: Record<ReviewRating, ReviewRating>;
  createdAt: string;
  updatedAt: string;
}

export interface CompleteReviewResult {
  attempt: ReviewAttemptView;
  selfRating: ReviewRating;
  effectiveRating: ReviewRating;
  reviewState: {
    id: string;
    wordId: string;
    interval: number;
    easeFactor: number;
    repetitions: number;
    lapses: number;
    dueAt: string;
    lastReviewedAt: string | null;
  };
  learningProgress: {
    wordId: string;
    status: string;
    recognitionScore: number;
    recallScore: number;
    productionScore: number;
  };
  reviewLog: {
    id: string;
    wordId: string;
    reviewType: string;
    rating: ReviewRating;
    answer: string | null;
    correct: boolean | null;
    responseTime: number | null;
    createdAt: string;
  };
}

export interface CompleteReviewPayload {
  requestId: string;
  attemptId: string;
  expectedVersion: number;
  rating: ReviewRating;
}
export type ReviewLog = CompleteReviewResult['reviewLog'];

export type ReviewStepAction =
  | { action: 'RECALL'; answer: string; responseTime?: number }
  | { action: 'CONTINUE'; practice?: boolean }
  | { action: 'OUTPUT'; answer: string; method: 'SELF' | 'AI'; configRevision?: string };

export type ReviewStepInput = {
  requestId: string;
  expectedVersion: number;
} & ReviewStepAction;

export type BeginReviewAttemptInput = {
  requestId: string;
  wordId: string;
  studyTaskId?: string;
};

export type AbandonReviewAttemptInput = {
  requestId: string;
  expectedVersion: number;
};

export function getDueReviews(query: ReviewQuery = {}) {
  return apiFetch<ReviewQueue>('/api/reviews/due', { query });
}

export function getActiveReviewAttempt(signal?: AbortSignal) {
  return apiFetch<ReviewAttemptView | null>('/api/reviews/attempt', { signal });
}

export function beginReviewAttempt(input: BeginReviewAttemptInput) {
  return apiFetch<ReviewAttemptView>('/api/reviews/attempt', {
    method: 'POST',
    body: input,
  });
}

export function submitReviewAttemptStep(attemptId: string, input: ReviewStepInput) {
  return apiFetch<ReviewAttemptView>(`/api/reviews/attempt/${attemptId}/step`, {
    method: 'POST',
    body: input,
  });
}

export function completeReview(payload: CompleteReviewPayload) {
  return apiFetch<CompleteReviewResult>('/api/reviews', {
    method: 'POST',
    body: payload,
  });
}
export function abandonReviewAttempt(attemptId: string, input: AbandonReviewAttemptInput) {
  return apiFetch<ReviewAttemptView>(`/api/reviews/attempt/${attemptId}/abandon`, {
    method: 'POST',
    body: input,
  });
}
