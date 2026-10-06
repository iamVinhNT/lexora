/**
 * @file useGrammarPractice.ts
 * @description React Query reads and mutations for grammar spaced repetition reviews and output practice.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getGrammarPracticeDue,
  getGrammarPracticeHistory,
  getGrammarPracticeProgress,
  submitGrammarOutput,
  submitGrammarReview,
  type GrammarPracticeHistoryQuery,
  type SubmitGrammarOutputInput,
  type SubmitGrammarReviewInput,
} from '../api/grammar-practice.api';
import { grammarKeys } from './useGrammar';

export const grammarPracticeKeys = {
  all: ['grammar-practice'] as const,
  due: () => [...grammarPracticeKeys.all, 'due'] as const,
  progress: () => [...grammarPracticeKeys.all, 'progress'] as const,
  historyPrefix: () => [...grammarPracticeKeys.all, 'history'] as const,
  history: (query?: GrammarPracticeHistoryQuery) => [
    ...grammarPracticeKeys.historyPrefix(),
    { lessonId: query?.lessonId, revisionId: query?.revisionId, limit: query?.limit, offset: query?.offset },
  ] as const,
};

export function useGrammarPracticeDue() {
  return useQuery({
    queryKey: grammarPracticeKeys.due(),
    queryFn: ({ signal }) => getGrammarPracticeDue(signal),
  });
}

export function useGrammarPracticeProgress() {
  return useQuery({
    queryKey: grammarPracticeKeys.progress(),
    queryFn: ({ signal }) => getGrammarPracticeProgress(signal),
  });
}

export function useGrammarPracticeHistory(query?: GrammarPracticeHistoryQuery) {
  return useQuery({
    queryKey: grammarPracticeKeys.history(query),
    queryFn: ({ signal }) => getGrammarPracticeHistory(query, signal),
  });
}

export function useSubmitGrammarReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: SubmitGrammarReviewInput) => submitGrammarReview(input),
    onSuccess: () => {
      // Invalidate review due queue, progress, and history after commit.
      // Do NOT touch calendar study queries (safe transfer, no task completion).
      void queryClient.invalidateQueries({ queryKey: grammarPracticeKeys.due() });
      void queryClient.invalidateQueries({ queryKey: grammarPracticeKeys.progress() });
      void queryClient.invalidateQueries({ queryKey: grammarPracticeKeys.historyPrefix() });
      void queryClient.invalidateQueries({ queryKey: grammarKeys.course() });
    },
  });
}

export function useSubmitGrammarOutput() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: SubmitGrammarOutputInput) => submitGrammarOutput(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: grammarPracticeKeys.progress() });
      void queryClient.invalidateQueries({ queryKey: grammarPracticeKeys.historyPrefix() });
    },
  });
}
