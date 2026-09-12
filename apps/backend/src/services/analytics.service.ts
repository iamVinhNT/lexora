/**
 * @file analytics.service.ts
 * @description Service orchestrating progress overview, single word progress, weak words, dashboard statistics, trends, and learning insights.
 */

import { AnalyticsRepository } from '../repositories/analytics.repository.js';
import {
  AppError,
  NotFoundError,
  ConflictError,
  ValidationError,
} from './vocabulary.service.js';
import type {
  QueryTrendsInput,
  QueryWeakWordsInput,
  QueryMasteredWordsInput,
} from '../schemas/analytics.schema.js';

export {
  AppError,
  NotFoundError,
  ConflictError,
  ValidationError,
};

export interface InsightItem {
  id: string;
  type: 'RECOMMENDATION' | 'WARNING' | 'ACHIEVEMENT' | 'INFO';
  title: string;
  message: string;
  params?: Record<string, string | number>;
  action?: {
    label: string;
    link: string;
  };
}

export interface InsightsResult {
  insights: InsightItem[];
  summary: {
    weakWordsCount: number;
    dueCount: number;
    passiveWords: number;
    activeWords: number;
    strengths: string[];
    weaknesses: string[];
  };
}

export class AnalyticsService {
  constructor(private repo: AnalyticsRepository) {}

  /**
   * Returns aggregated knowledge progress across the entire vocabulary.
   */
  getProgressOverview() {
    return this.repo.getProgressOverview();
  }

  /**
   * Retrieves detailed progress for a single word. Throws NotFoundError if not found.
   */
  getWordProgress(wordId: string) {
    const progress = this.repo.getWordProgress(wordId);
    if (!progress) {
      throw new NotFoundError(`Word progress for id "${wordId}" not found`);
    }
    return progress;
  }

  /**
   * Retrieves paginated list of weak words based on domain assessment rules.
   */
  getWeakWords(query?: QueryWeakWordsInput) {
    return this.repo.getWeakWords(query);
  }

  /**
   * Retrieves paginated list of words in MASTERED or MAINTENANCE status.
   */
  getMasteredWords(query?: QueryMasteredWordsInput) {
    return this.repo.getMasteredWords(query);
  }

  /**
   * Returns dashboard KPI statistics (today's counts, accuracy, streaks, state breakdown, due count).
   */
  getDashboardStatistics(now?: string | Date) {
    return this.repo.getDashboardStatistics(now);
  }

  /**
   * Returns daily review volume, accuracy, and response times over the past N days.
   */
  getReviewTrends(query?: QueryTrendsInput, now?: string | Date) {
    const days = query?.days ?? 30;
    return this.repo.getReviewTrends(days, now);
  }

  /**
   * Formats actionable learning insights based on user strengths, weaknesses, and activity.
   */
  getInsights(now?: string | Date): InsightsResult {
    const overview = this.repo.getProgressOverview();
    const stats = this.repo.getDashboardStatistics(now);

    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const insights: InsightItem[] = [];

    // Evaluate Strengths
    if (overview.averageDimensions.recognition !== null && overview.averageDimensions.recognition >= 70) {
      strengths.push('Strong word recognition');
    }
    if (overview.averageDimensions.recall !== null && overview.averageDimensions.recall >= 60) {
      strengths.push('High recall retention');
    }
    if (overview.averageDimensions.production !== null && overview.averageDimensions.production >= 60) {
      strengths.push('Solid active sentence production');
    }
    if (stats.overallAccuracy !== null && stats.overallAccuracy >= 80) {
      strengths.push('High overall review accuracy');
    }
    if (stats.currentStreak >= 3) {
      strengths.push('Consistent daily review streak');
    }

    // Evaluate Weaknesses
    const recognition = overview.averageDimensions.recognition;
    const production = overview.averageDimensions.production;
    const hasDimensionComparison = recognition !== null && production !== null;
    const recVsProdDiff = hasDimensionComparison
      ? recognition - production
      : null;
    if (
      recognition !== null &&
      recognition >= 60 &&
      production !== null &&
      recVsProdDiff !== null &&
      (recVsProdDiff >= 25 || production < 50)
    ) {
      weaknesses.push('Sentence production lags behind recognition');
    }
    if (overview.weakWordsCount > 0) {
      weaknesses.push(`${overview.weakWordsCount} weak word${overview.weakWordsCount > 1 ? 's' : ''} needing reinforcement`);
    }
    if (stats.overallAccuracy !== null && stats.overallAccuracy < 65) {
      weaknesses.push('Overall accuracy below 65%');
    }

    // Recommendation 1: Output practice when recognition >> production
    if (
      recognition !== null &&
      recognition >= 60 &&
      production !== null &&
      recVsProdDiff !== null &&
      (recVsProdDiff >= 25 || production < 50)
    ) {
      insights.push({
        id: 'recommend-output-practice',
        type: 'RECOMMENDATION',
        title: 'Focus on Sentence Production',
        message: 'Your recognition is strong, but production is significantly lower. Focus on sentence production to convert passive vocabulary into active knowledge.',
        action: {
          label: 'Practice Output',
          link: '/learn?mode=output',
        },
      });
    }

    // Warning: Weak words
    if (overview.weakWordsCount > 0) {
      insights.push({
        id: 'reinforce-weak-words',
        type: 'WARNING',
        title: 'Reinforce Weak Vocabulary',
        message: `You have ${overview.weakWordsCount} word${overview.weakWordsCount > 1 ? 's' : ''} flagged with frequent lapses or low retention.`,
        params: { count: overview.weakWordsCount },
        action: {
          label: 'Review Weak Words',
          link: '/learn?mode=weak_words',
        },
      });
    }

    // Info: Pending due reviews
    if (stats.dueCount > 0) {
      insights.push({
        id: 'pending-due-reviews',
        type: 'INFO',
        title: 'Reviews Waiting',
        message: `You have ${stats.dueCount} review${stats.dueCount > 1 ? 's' : ''} ready today. Regular spaced repetition boosts memory retention.`,
        params: { count: stats.dueCount },
        action: {
          label: 'Start Review',
          link: '/review',
        },
      });
    }

    // Achievement: Streak
    if (stats.currentStreak >= 3) {
      insights.push({
        id: 'streak-achievement',
        type: 'ACHIEVEMENT',
        title: 'Keep Up The Momentum!',
        message: `You are on a ${stats.currentStreak}-day learning streak! Consistent practice yields the fastest language acquisition.`,
        params: { count: stats.currentStreak },
      });
    }

    // Info: New words ready
    if (overview.countsPerState.NEW > 0 && stats.dueCount === 0) {
      insights.push({
        id: 'explore-new-words',
        type: 'INFO',
        title: 'Ready for New Words',
        message: `You have ${overview.countsPerState.NEW} new word${overview.countsPerState.NEW > 1 ? 's' : ''} in your library waiting to be learned.`,
        params: { count: overview.countsPerState.NEW },
        action: {
          label: 'Learn New Words',
          link: '/learn?mode=new_words',
        },
      });
    }

    // Fallback: Welcome if empty
    if (overview.totalWords === 0) {
      insights.push({
        id: 'welcome-start',
        type: 'INFO',
        title: 'Start Your Vocabulary Journey',
        message: 'Add words or import contexts to begin your 5-step cognitive learning process.',
        action: {
          label: 'Add Words',
          link: '/vocabulary',
        },
      });
    }

    return {
      insights,
      summary: {
        weakWordsCount: overview.weakWordsCount,
        dueCount: stats.dueCount,
        passiveWords: overview.passiveWords,
        activeWords: overview.activeWords,
        strengths,
        weaknesses,
      },
    };
  }
}
