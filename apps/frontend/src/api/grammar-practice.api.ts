/**
 * @file grammar-practice.api.ts
 * @description Typed contracts and client calls for grammar spaced repetition reviews and output practice.
 */
import { apiFetch } from './client';
import type { GrammarAnswer, GrammarExerciseKind } from './grammar.api';

export type GrammarPracticeDueItem = {
  lessonId: string;
  revisionId: string;
  lessonTitle: string;
  dueAt: string;
  exercise: {
    id: string;
    kind: GrammarExerciseKind;
    prompt: string;
    options: Array<{ text: string }>;
  };
};

export type GrammarPracticeDueResponse = {
  items: GrammarPracticeDueItem[];
};

export type GrammarReviewRating = 'AGAIN' | 'GOOD';

export type GrammarReviewState = {
  lessonId: string;
  revisionId: string;
  revision: string;
  easeFactor: number;
  repetitions: number;
  interval: number;
  lapses: number;
  dueAt: string;
  lastReviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type GrammarOutputRubric = {
  form: number;
  meaning: number;
  use: number;
};

export type GrammarPracticeAttempt = {
  id: string;
  requestId: string;
  lessonId: string;
  revisionId: string;
  revision: string;
  kind: 'review' | 'output';
  exerciseId: string | null;
  promptId: string | null;
  answer: GrammarAnswer | null;
  text: string | null;
  rubric: GrammarOutputRubric | null;
  assessmentSource: 'deterministic' | 'self';
  isCorrect: boolean | null;
  feedback: string | null;
  rating: GrammarReviewRating | null;
  createdAt: string;
  state: GrammarReviewState | null;
};

export type SubmitGrammarReviewInput = {
  requestId: string;
  lessonId: string;
  revisionId: string;
  exerciseId: string;
  answer: GrammarAnswer;
};

export type SubmitGrammarReviewResponse = {
  attempt: GrammarPracticeAttempt;
  state: GrammarReviewState;
};

export type SubmitGrammarOutputInput = {
  requestId: string;
  lessonId: string;
  revisionId: string;
  promptId: string;
  text: string;
  rubric: GrammarOutputRubric;
};

export type SubmitGrammarOutputResponse = {
  attempt: GrammarPracticeAttempt;
  modelAnswer: string;
};

export type GrammarAccuracyStat = {
  correct: number;
  total: number;
  percent: number | null;
};

export type GrammarPracticeProgressLesson = {
  lessonId: string;
  revisionId: string;
  recognition: GrammarAccuracyStat;
  recall: GrammarAccuracyStat;
  outputCount: number;
  reviewCount: number;
  isStable: boolean;
  state: GrammarReviewState | null;
};

export type GrammarPracticeProgressResponse = {
  lessons: GrammarPracticeProgressLesson[];
};

export type GrammarPracticeHistoryQuery = {
  lessonId?: string;
  revisionId?: string;
  limit?: number;
  offset?: number;
};

export type GrammarPracticeHistoryResponse = {
  items: GrammarPracticeAttempt[];
};

export function getGrammarPracticeDue(signal?: AbortSignal) {
  return apiFetch<GrammarPracticeDueResponse>('/api/grammar-practice/due', { signal });
}

export function submitGrammarReview(input: SubmitGrammarReviewInput) {
  return apiFetch<SubmitGrammarReviewResponse>('/api/grammar-practice/reviews', {
    method: 'POST',
    body: input,
  });
}

export function submitGrammarOutput(input: SubmitGrammarOutputInput) {
  return apiFetch<SubmitGrammarOutputResponse>('/api/grammar-practice/outputs', {
    method: 'POST',
    body: input,
  });
}

export function getGrammarPracticeProgress(signal?: AbortSignal) {
  return apiFetch<GrammarPracticeProgressResponse>('/api/grammar-practice/progress', { signal });
}

export function getGrammarPracticeHistory(query?: GrammarPracticeHistoryQuery, signal?: AbortSignal) {
  return apiFetch<GrammarPracticeHistoryResponse>('/api/grammar-practice/history', {
    query: query as Record<string, string | number | undefined | null>,
    signal,
  });
}
