/**
 * @file analytics.api.ts
 * @description Typed analytics endpoint functions matching the backend route contracts.
 */
import { apiFetch } from './client';

export type VocabularyState = 'NEW' | 'LEARNING' | 'FAMILIAR' | 'MASTERED' | 'MAINTENANCE';

export type WordRecord = {
  id: string;
  word: string;
  phonetic: string | null;
  partOfSpeech: string | null;
  definition: string;
  translation: string | null;
  difficulty: string | null;
  createdAt: string;
  updatedAt: string | null;
};

export type ProgressOverview = {
  totalWords: number;
  countsPerState: Record<VocabularyState, number>;
  byState: { new: number; learning: number; familiar: number; mastered: number; maintenance: number };
  averageDimensions: { recognition: number | null; recall: number | null; production: number | null };
  passiveVsActive: { passive: number; active: number };
  passiveWords: number;
  activeWords: number;
  weakWordsCount: number;
};

export type DashboardStatistics = {
  todayReviews: number;
  todayLearned: number;
  overallAccuracy: number | null;
  currentStreak: number;
  longestStreak: number;
  stateBreakdown: Record<VocabularyState, number>;
  dueCount: number;
};

export type DailyTrend = {
  date: string;
  reviewsCount: number;
  reviewCount: number;
  correctCount: number;
  accuracy: number | null;
  averageResponseTime: number | null;
};

export type ReviewTrends = { days: number; trends: DailyTrend[] };
export type Insight = { id: string; type: 'RECOMMENDATION' | 'WARNING' | 'ACHIEVEMENT' | 'INFO'; title: string; message: string; params?: Record<string, string | number>; action?: { label: string; link: string } };
export type Insights = { insights: Insight[]; summary: { weakWordsCount: number; dueCount: number; passiveWords: number; activeWords: number; strengths: string[]; weaknesses: string[] } };
export type ProgressWordPage<T> = { items: T[]; total: number; page: number; limit: number; totalPages: number };
export type WeakWord = { wordId: string; word: WordRecord; status: string; scores: { recognitionScore: number; recallScore: number; productionScore: number }; reasons: string[]; lapses: number; interval: number };
export type MasteredWord = { wordId: string; word: WordRecord; status: string; scores: { recognitionScore: number; recallScore: number; productionScore: number }; interval: number; lastReviewedAt: string | null };

export const analyticsKeys = {
  all: ['analytics'] as const,
  progress: () => [...analyticsKeys.all, 'progress'] as const,
  dashboard: () => [...analyticsKeys.all, 'dashboard'] as const,
  trends: (days: number) => [...analyticsKeys.all, 'trends', days] as const,
  insights: () => [...analyticsKeys.all, 'insights'] as const,
  weak: (page = 1, limit = 20) => [...analyticsKeys.all, 'weak', page, limit] as const,
  mastered: (page = 1, limit = 20) => [...analyticsKeys.all, 'mastered', page, limit] as const,
};

export function getProgressOverview() {
  return apiFetch<ProgressOverview>('/api/progress');
}

export function getDashboardStatistics() {
  return apiFetch<DashboardStatistics>('/api/statistics/dashboard');
}

export function getReviewTrends(days = 30) {
  return apiFetch<ReviewTrends>('/api/statistics/trends', { query: { days } });
}

export function getInsights() {
  return apiFetch<Insights>('/api/statistics/insights');
}

export function getWeakWords(page = 1, limit = 20) {
  return apiFetch<ProgressWordPage<WeakWord>>('/api/progress/weak', { query: { page, limit } });
}

export function getMasteredWords(page = 1, limit = 20) {
  return apiFetch<ProgressWordPage<MasteredWord>>('/api/progress/mastered', { query: { page, limit } });
}
