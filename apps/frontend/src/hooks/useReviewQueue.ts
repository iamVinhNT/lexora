/**
 * @file useReviewQueue.ts
 * @description React Query hooks for due review retrieval, active attempt lifecycle, and rating mutations.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  abandonReviewAttempt,
  beginReviewAttempt,
  completeReview,
  getActiveReviewAttempt,
  getDueReviews,
  submitReviewAttemptStep,
  type AbandonReviewAttemptInput,
  type BeginReviewAttemptInput,
  type CompleteReviewPayload,
  type CompleteReviewResult,
  type ReviewAttemptView,
  type ReviewCounts,
  type ReviewQuery,
  type ReviewQueue,
  type ReviewStepInput,
} from '../api/review.api';
import { analyticsKeys } from './useAnalytics';
import { invalidateStudyQueries } from './useStudyCalendar';

export const reviewKeys = {
  all: ['reviews'] as const,
  dueAll: ['reviews', 'due'] as const,
  due: (query: ReviewQuery = {}) => [...reviewKeys.dueAll, query] as const,
  attempt: ['reviews', 'attempt'] as const,
};

export function useReviewQueue(query: ReviewQuery = {}) {
  return useQuery({
    queryKey: reviewKeys.due(query),
    queryFn: () => getDueReviews(query),
    staleTime: 0,
  });
}

export function useActiveReviewAttempt() {
  return useQuery({
    queryKey: reviewKeys.attempt,
    queryFn: ({ signal }) => getActiveReviewAttempt(signal),
    staleTime: 0,
    retry: false,
  });
}

export function useBeginReviewAttempt() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: BeginReviewAttemptInput) => beginReviewAttempt(input),
    onSuccess: (attempt) => {
      queryClient.setQueryData<ReviewAttemptView | null>(reviewKeys.attempt, attempt);
    },
  });
}

export function useSubmitReviewStep() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ attemptId, input }: { attemptId: string; input: ReviewStepInput }) =>
      submitReviewAttemptStep(attemptId, input),
    onSuccess: (attempt) => {
      queryClient.setQueryData<ReviewAttemptView | null>(reviewKeys.attempt, attempt);
    },
  });
}

export function useCompleteReview() {
  const queryClient = useQueryClient();

  return useMutation<CompleteReviewResult, Error, CompleteReviewPayload>({
    mutationFn: (payload: CompleteReviewPayload) => completeReview(payload),
    onSuccess: async (result) => {
      queryClient.setQueryData<ReviewAttemptView | null>(reviewKeys.attempt, null);

      queryClient.setQueriesData<ReviewQueue>({ queryKey: reviewKeys.dueAll }, (queue) => {
        if (!queue) return queue;
        const wordId = result.attempt.wordId;
        const index = queue.items.findIndex((item) => item.wordId === wordId);
        if (index < 0) return queue;
        const status = queue.items[index].learningProgress?.status?.toLowerCase() as
          | keyof Omit<ReviewCounts, 'total'>
          | undefined;
        const decrementCounts = (counts: ReviewCounts): ReviewCounts => ({
          ...counts,
          ...(status && status in counts ? { [status]: Math.max(0, counts[status] - 1) } : {}),
          total: Math.max(0, counts.total - 1),
        });

        return {
          ...queue,
          items: [...queue.items.slice(0, index), ...queue.items.slice(index + 1)],
          counts: decrementCounts(queue.counts),
          ...(queue.countsByState ? { countsByState: decrementCounts(queue.countsByState) } : {}),
          total: Math.max(0, queue.total - 1),
        };
      });

      await Promise.all([
        invalidateStudyQueries(queryClient),
        queryClient.invalidateQueries({ queryKey: ['progress'] }),
        queryClient.invalidateQueries({ queryKey: analyticsKeys.all }),
        queryClient.invalidateQueries({ queryKey: reviewKeys.all }),
      ]);
    },
  });
}


export function useAbandonReviewAttempt() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ attemptId, input }: { attemptId: string; input: AbandonReviewAttemptInput }) =>
      abandonReviewAttempt(attemptId, input),
    onSuccess: () => {
      queryClient.setQueryData<ReviewAttemptView | null>(reviewKeys.attempt, null);
    },
  });
}
