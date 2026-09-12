/**
 * @file useAnalytics.ts
 * @description TanStack Query analytics reads with endpoint-specific remote state.
 */
import { useQuery } from '@tanstack/react-query';
import { getDashboardStatistics, getInsights, getMasteredWords, getProgressOverview, getReviewTrends, getWeakWords, analyticsKeys } from '../api/analytics.api';

export { analyticsKeys };

export function useProgressOverview() {
  return useQuery({ queryKey: analyticsKeys.progress(), queryFn: getProgressOverview });
}

export function useDashboardStatistics() {
  return useQuery({ queryKey: analyticsKeys.dashboard(), queryFn: getDashboardStatistics });
}

export function useReviewTrends(days: number) {
  return useQuery({ queryKey: analyticsKeys.trends(days), queryFn: () => getReviewTrends(days) });
}

export function useInsights() {
  return useQuery({ queryKey: analyticsKeys.insights(), queryFn: getInsights });
}

export function useWeakWords(page = 1, limit = 20) {
  return useQuery({ queryKey: analyticsKeys.weak(page, limit), queryFn: () => getWeakWords(page, limit) });
}

export function useMasteredWords(page = 1, limit = 20) {
  return useQuery({ queryKey: analyticsKeys.mastered(page, limit), queryFn: () => getMasteredWords(page, limit) });
}
