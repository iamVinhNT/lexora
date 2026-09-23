/**
 * @file useReviewQueue.ts
 * @description React Query hooks for due review retrieval and rating mutations.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getDueReviews, submitReview, type ReviewCounts, type ReviewQuery, type ReviewQueue, type SubmitReviewPayload } from '../api/review.api';
import { analyticsKeys } from './useAnalytics';

export const reviewKeys = {
  all: ['reviews'] as const,
  dueAll: ['reviews', 'due'] as const,
  due: (query: ReviewQuery = {}) => [...reviewKeys.dueAll, query] as const,
};

export function useReviewQueue(query: ReviewQuery = {}) {
  return useQuery({
    queryKey: reviewKeys.due(query),
    queryFn: () => getDueReviews(query),
    staleTime: 0,
  });
}

export function useSubmitReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SubmitReviewPayload) => submitReview(payload),
    onSuccess: async (_result, variables) => {
      queryClient.setQueriesData<ReviewQueue>({ queryKey: reviewKeys.dueAll }, (queue) => {
        if (!queue) return queue;
        const index = queue.items.findIndex((item) => item.wordId === variables.wordId);
        if (index < 0) return queue;
        const status = queue.items[index].learningProgress?.status?.toLowerCase() as keyof Omit<ReviewCounts, 'total'> | undefined;
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
        queryClient.invalidateQueries({ queryKey: ['progress'] }),
        queryClient.invalidateQueries({ queryKey: analyticsKeys.all }),
      ]);
    },
  });
}
