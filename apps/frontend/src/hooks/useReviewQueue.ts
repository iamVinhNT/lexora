/**
 * @file useReviewQueue.ts
 * @description React Query hooks for due review retrieval and rating mutations.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getDueReviews, submitReview, type ReviewQuery, type SubmitReviewPayload } from '../api/review.api';
import { analyticsKeys } from './useAnalytics';

export const reviewKeys = {
  all: ['reviews'] as const,
  due: (query: ReviewQuery = {}) => [...reviewKeys.all, 'due', query] as const,
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
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: reviewKeys.all }),
        queryClient.invalidateQueries({ queryKey: ['progress'] }),
        queryClient.invalidateQueries({ queryKey: analyticsKeys.all }),
      ]);
    },
  });
}
