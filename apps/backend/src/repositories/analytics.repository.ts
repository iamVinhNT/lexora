/**
 * @file analytics.repository.ts
 * @description Repository for vocabulary progress calculations, streaks, weak word analysis, and trend metrics.
 */

import { eq, and, sql, inArray, desc, lte, gte } from 'drizzle-orm';
import type { AppDatabase } from '../db/client.js';
import {
  words,
  learningProgress,
  reviewStates,
  reviewLogs,
} from '../db/schema.js';
import { identifyWeakReasons } from '../domain/knowledge/assessment.js';
import type { VocabularyState, ReviewLogEntry } from '../domain/knowledge/types.js';

export interface ProgressOverviewResult {
  totalWords: number;
  countsPerState: Record<VocabularyState, number>;
  byState: {
    new: number;
    learning: number;
    familiar: number;
    mastered: number;
    maintenance: number;
  };
  averageDimensions: {
    recognition: number | null;
    recall: number | null;
    production: number | null;
  };
  passiveVsActive: {
    passive: number;
    active: number;
  };
  passiveWords: number;
  activeWords: number;
  weakWordsCount: number;
}

export interface WordProgressResult {
  word: {
    id: string;
    word: string;
    phonetic: string | null;
    partOfSpeech: string | null;
    definition: string;
    translation: string | null;
    difficulty: string | null;
  };
  status: string;
  scores: {
    recognitionScore: number;
    recallScore: number;
    productionScore: number;
  };
  dimensions: {
    recognition: number;
    recall: number;
    production: number;
  };
  reviewSummary: {
    interval: number;
    easeFactor: number;
    repetitions: number;
    lapses: number;
    dueAt: string | null;
    lastReviewedAt: string | null;
    totalReviews: number;
  };
  weakStatus: {
    isWeak: boolean;
    reasons: string[];
  };
  lastStudiedAt: string | null;
}

export interface WeakWordItem {
  wordId: string;
  word: typeof words.$inferSelect;
  status: string;
  scores: {
    recognitionScore: number;
    recallScore: number;
    productionScore: number;
  };
  reasons: string[];
  lapses: number;
  interval: number;
}

export interface MasteredWordItem {
  wordId: string;
  word: typeof words.$inferSelect;
  status: string;
  scores: {
    recognitionScore: number;
    recallScore: number;
    productionScore: number;
  };
  interval: number;
  lastReviewedAt: string | null;
}

export interface DailyTrendItem {
  date: string;
  reviewsCount: number;
  reviewCount: number;
  correctCount: number;
  accuracy: number | null;
  averageResponseTime: number | null;
}

export interface DashboardStatisticsResult {
  todayReviews: number;
  todayLearned: number;
  overallAccuracy: number | null;
  currentStreak: number;
  longestStreak: number;
  stateBreakdown: Record<VocabularyState, number>;
  dueCount: number;
}

/**
 * Calculates current and longest review streaks based on distinct active UTC dates (YYYY-MM-DD).
 */
export function calculateStreaks(distinctDatesAsc: string[], todayUtc: string): {
  currentStreak: number;
  longestStreak: number;
} {
  if (distinctDatesAsc.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  // Calculate longest streak across all distinct sorted dates
  let longestStreak = 1;
  let currentRun = 1;

  for (let i = 1; i < distinctDatesAsc.length; i++) {
    const prevDate = new Date(`${distinctDatesAsc[i - 1]}T00:00:00.000Z`);
    const currDate = new Date(`${distinctDatesAsc[i]}T00:00:00.000Z`);
    const diffDays = Math.round((currDate.getTime() - prevDate.getTime()) / (24 * 60 * 60 * 1000));

    if (diffDays === 1) {
      currentRun += 1;
      if (currentRun > longestStreak) {
        longestStreak = currentRun;
      }
    } else if (diffDays > 1) {
      currentRun = 1;
    }
  }

  // Calculate current streak relative to todayUtc
  const dateSet = new Set(distinctDatesAsc);
  let currentStreak = 0;
  let checkDate = new Date(`${todayUtc}T00:00:00.000Z`);

  // If not active today, check if active yesterday to keep streak alive
  if (!dateSet.has(todayUtc)) {
    checkDate.setUTCDate(checkDate.getUTCDate() - 1);
    const yesterdayUtc = checkDate.toISOString().slice(0, 10);
    if (!dateSet.has(yesterdayUtc)) {
      return { currentStreak: 0, longestStreak };
    }
  }

  // Count backwards day-by-day while date exists in set
  while (dateSet.has(checkDate.toISOString().slice(0, 10))) {
    currentStreak += 1;
    checkDate.setUTCDate(checkDate.getUTCDate() - 1);
  }

  return {
    currentStreak,
    longestStreak: Math.max(longestStreak, currentStreak),
  };
}

export class AnalyticsRepository {
  constructor(private db: AppDatabase) {}

  /**
   * Retrieves review logs grouped by word ID for candidate evaluation.
   */
  private getReviewLogsByWordId(): Map<string, ReviewLogEntry[]> {
    const allLogs = this.db
      .select({
        wordId: reviewLogs.wordId,
        reviewType: reviewLogs.reviewType,
        correct: reviewLogs.correct,
        rating: reviewLogs.rating,
      })
      .from(reviewLogs)
      .all();

    const logsByWordId = new Map<string, ReviewLogEntry[]>();
    for (const log of allLogs) {
      let list = logsByWordId.get(log.wordId);
      if (!list) {
        list = [];
        logsByWordId.set(log.wordId, list);
      }
      list.push({
        reviewType: log.reviewType,
        correct: Boolean(log.correct),
        rating: log.rating,
      });
    }

    return logsByWordId;
  }

  /**
   * Calculates overall vocabulary knowledge metrics:
   * Total words, state breakdown, average 3D scores, passive vs active counts, and weak words count.
   */
  getProgressOverview(): ProgressOverviewResult {
    const allWords = this.db
      .select({
        word: words,
        progress: learningProgress,
        reviewState: reviewStates,
      })
      .from(words)
      .leftJoin(learningProgress, eq(learningProgress.wordId, words.id))
      .leftJoin(reviewStates, eq(reviewStates.wordId, words.id))
      .all();

    const logsByWordId = this.getReviewLogsByWordId();

    const totalWords = allWords.length;

    const countsPerState: Record<VocabularyState, number> = {
      NEW: 0,
      LEARNING: 0,
      FAMILIAR: 0,
      MASTERED: 0,
      MAINTENANCE: 0,
    };

    let sumRecognition = 0;
    let sumRecall = 0;
    let sumProduction = 0;
    let recognitionSamples = 0;
    let recallSamples = 0;
    let productionSamples = 0;

    let passiveCount = 0;
    let activeCount = 0;
    let weakWordsCount = 0;

    for (const row of allWords) {
      const state = (row.progress?.status || 'NEW') as VocabularyState;
      if (state in countsPerState) {
        countsPerState[state] += 1;
      } else {
        countsPerState.NEW += 1;
      }

      const rec = row.progress?.recognitionScore ?? null;
      const reca = row.progress?.recallScore ?? null;
      const prod = row.progress?.productionScore ?? null;

      if (rec !== null) {
        sumRecognition += rec;
        recognitionSamples += 1;
      }
      if (reca !== null) {
        sumRecall += reca;
        recallSamples += 1;
      }
      if (prod !== null) {
        sumProduction += prod;
        productionSamples += 1;
      }

      const recognitionScore = rec ?? 0;
      const recallScore = reca ?? 0;
      const productionScore = prod ?? 0;

      // Active vocabulary: productionScore >= 60
      if (productionScore >= 60) {
        activeCount += 1;
      } else if (recognitionScore >= 60 || recallScore >= 60) {
        // Passive vocabulary: recognized or recalled but not yet active
        passiveCount += 1;
      }

      // Check weak status
      const reasons = identifyWeakReasons({
        lapses: row.reviewState?.lapses ?? 0,
        repetitions: row.reviewState?.repetitions ?? 0,
        interval: row.reviewState?.interval ?? 0,
        scores: {
          recognitionScore,
          recallScore,
          productionScore,
        },
        reviewLogs: logsByWordId.get(row.word.id) ?? [],
      });

      if (reasons.length > 0) {
        weakWordsCount += 1;
      }
    }

    const averageDimensions = {
      recognition: recognitionSamples > 0 ? Math.round(sumRecognition / recognitionSamples) : null,
      recall: recallSamples > 0 ? Math.round(sumRecall / recallSamples) : null,
      production: productionSamples > 0 ? Math.round(sumProduction / productionSamples) : null,
    };

    return {
      totalWords,
      countsPerState,
      byState: {
        new: countsPerState.NEW,
        learning: countsPerState.LEARNING,
        familiar: countsPerState.FAMILIAR,
        mastered: countsPerState.MASTERED,
        maintenance: countsPerState.MAINTENANCE,
      },
      averageDimensions,
      passiveVsActive: {
        passive: passiveCount,
        active: activeCount,
      },
      passiveWords: passiveCount,
      activeWords: activeCount,
      weakWordsCount,
    };
  }

  /**
   * Retrieves detailed progress metrics for a single word by its UUID.
   */
  getWordProgress(wordId: string): WordProgressResult | null {
    const word = this.db
      .select()
      .from(words)
      .where(eq(words.id, wordId))
      .all()[0];

    if (!word) {
      return null;
    }

    const progress = this.db
      .select()
      .from(learningProgress)
      .where(eq(learningProgress.wordId, wordId))
      .all()[0];

    const reviewState = this.db
      .select()
      .from(reviewStates)
      .where(eq(reviewStates.wordId, wordId))
      .all()[0];

    const logs = this.db
      .select()
      .from(reviewLogs)
      .where(eq(reviewLogs.wordId, wordId))
      .orderBy(desc(reviewLogs.createdAt))
      .all();

    const reasons = identifyWeakReasons({
      lapses: reviewState?.lapses ?? 0,
      repetitions: reviewState?.repetitions ?? 0,
      interval: reviewState?.interval ?? 0,
      scores: {
        recognitionScore: progress?.recognitionScore ?? 0,
        recallScore: progress?.recallScore ?? 0,
        productionScore: progress?.productionScore ?? 0,
      },
      reviewLogs: logs.map((l) => ({
        reviewType: l.reviewType,
        correct: Boolean(l.correct),
        rating: l.rating,
      })),
    });

    const rec = progress?.recognitionScore ?? 0;
    const reca = progress?.recallScore ?? 0;
    const prod = progress?.productionScore ?? 0;

    return {
      word: {
        id: word.id,
        word: word.word,
        phonetic: word.phonetic,
        partOfSpeech: word.partOfSpeech,
        definition: word.definition,
        translation: word.translation,
        difficulty: word.difficulty,
      },
      status: progress?.status ?? 'NEW',
      scores: {
        recognitionScore: rec,
        recallScore: reca,
        productionScore: prod,
      },
      dimensions: {
        recognition: rec,
        recall: reca,
        production: prod,
      },
      reviewSummary: {
        interval: reviewState?.interval ?? 0,
        easeFactor: reviewState?.easeFactor ?? 2.5,
        repetitions: reviewState?.repetitions ?? 0,
        lapses: reviewState?.lapses ?? 0,
        dueAt: reviewState?.dueAt ?? null,
        lastReviewedAt: reviewState?.lastReviewedAt ?? null,
        totalReviews: logs.length,
      },
      weakStatus: {
        isWeak: reasons.length > 0,
        reasons,
      },
      lastStudiedAt: progress?.lastStudiedAt ?? null,
    };
  }

  /**
   * Retrieves paginated weak words with identified domain reasons.
   */
  getWeakWords(options?: { page?: number; limit?: number }) {
    const page = Math.max(1, options?.page ?? 1);
    const limit = Math.max(1, Math.min(100, options?.limit ?? 20));

    const rows = this.db
      .select({
        word: words,
        progress: learningProgress,
        reviewState: reviewStates,
      })
      .from(words)
      .leftJoin(learningProgress, eq(learningProgress.wordId, words.id))
      .leftJoin(reviewStates, eq(reviewStates.wordId, words.id))
      .all();

    const logsByWordId = this.getReviewLogsByWordId();

    const weakItems: WeakWordItem[] = [];

    for (const row of rows) {
      const rec = row.progress?.recognitionScore ?? 0;
      const reca = row.progress?.recallScore ?? 0;
      const prod = row.progress?.productionScore ?? 0;

      const reasons = identifyWeakReasons({
        lapses: row.reviewState?.lapses ?? 0,
        repetitions: row.reviewState?.repetitions ?? 0,
        interval: row.reviewState?.interval ?? 0,
        scores: {
          recognitionScore: rec,
          recallScore: reca,
          productionScore: prod,
        },
        reviewLogs: logsByWordId.get(row.word.id) ?? [],
      });

      if (reasons.length > 0) {
        weakItems.push({
          wordId: row.word.id,
          word: row.word,
          status: row.progress?.status ?? 'NEW',
          scores: {
            recognitionScore: rec,
            recallScore: reca,
            productionScore: prod,
          },
          reasons,
          lapses: row.reviewState?.lapses ?? 0,
          interval: row.reviewState?.interval ?? 0,
        });
      }
    }

    const total = weakItems.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const offset = (page - 1) * limit;
    const items = weakItems.slice(offset, offset + limit);

    return {
      items,
      total,
      page,
      limit,
      totalPages,
    };
  }

  /**
   * Retrieves paginated words in MASTERED or MAINTENANCE state.
   */
  getMasteredWords(options?: { page?: number; limit?: number }) {
    const page = Math.max(1, options?.page ?? 1);
    const limit = Math.max(1, Math.min(100, options?.limit ?? 20));
    const offset = (page - 1) * limit;

    const totalRow = this.db
      .select({ count: sql<number>`count(*)` })
      .from(words)
      .innerJoin(
        learningProgress,
        and(
          eq(learningProgress.wordId, words.id),
          inArray(learningProgress.status, ['MASTERED', 'MAINTENANCE'])
        )
      )
      .all()[0];

    const total = Number(totalRow?.count ?? 0);
    const totalPages = Math.ceil(total / limit) || 1;

    const rows = this.db
      .select({
        word: words,
        progress: learningProgress,
        reviewState: reviewStates,
      })
      .from(words)
      .innerJoin(
        learningProgress,
        and(
          eq(learningProgress.wordId, words.id),
          inArray(learningProgress.status, ['MASTERED', 'MAINTENANCE'])
        )
      )
      .leftJoin(reviewStates, eq(reviewStates.wordId, words.id))
      .orderBy(desc(learningProgress.updatedAt), desc(learningProgress.id))
      .limit(limit)
      .offset(offset)
      .all();

    const items: MasteredWordItem[] = rows.map((r) => ({
      wordId: r.word.id,
      word: r.word,
      status: r.progress.status,
      scores: {
        recognitionScore: r.progress.recognitionScore,
        recallScore: r.progress.recallScore,
        productionScore: r.progress.productionScore,
      },
      interval: r.reviewState?.interval ?? 0,
      lastReviewedAt: r.reviewState?.lastReviewedAt ?? null,
    }));

    return {
      items,
      total,
      page,
      limit,
      totalPages,
    };
  }

  /**
   * Computes dashboard statistics:
   * Today's reviews, today's learned count, accuracy, streaks, state breakdown, and due count.
   */
  getDashboardStatistics(nowInput?: string | Date): DashboardStatisticsResult {
    const now = nowInput instanceof Date ? nowInput : nowInput ? new Date(nowInput) : new Date();
    const todayUtc = now.toISOString().slice(0, 10);
    const nowIso = now.toISOString();

    // 1. Today's review count
    const todayReviewsRow = this.db
      .select({ count: sql<number>`count(*)` })
      .from(reviewLogs)
      .where(sql`strftime('%Y-%m-%d', ${reviewLogs.createdAt}) = ${todayUtc}`)
      .all()[0];
    const todayReviews = Number(todayReviewsRow?.count ?? 0);

    // 2. Today's learned count: distinct words reviewed or updated in learningProgress today
    const learnedFromLogs = this.db
      .select({ wordId: reviewLogs.wordId })
      .from(reviewLogs)
      .where(sql`strftime('%Y-%m-%d', ${reviewLogs.createdAt}) = ${todayUtc}`)
      .all();

    const learnedFromProgress = this.db
      .select({ wordId: learningProgress.wordId })
      .from(learningProgress)
      .where(sql`strftime('%Y-%m-%d', ${learningProgress.lastStudiedAt}) = ${todayUtc}`)
      .all();

    const todayLearnedWordIds = new Set<string>();
    for (const r of learnedFromLogs) todayLearnedWordIds.add(r.wordId);
    for (const r of learnedFromProgress) todayLearnedWordIds.add(r.wordId);
    const todayLearned = todayLearnedWordIds.size;

    // 3. Overall accuracy from review_logs
    const allLogsStats = this.db
      .select({
        total: sql<number>`sum(case when ${reviewLogs.correct} is not null then 1 else 0 end)`,
        correct: sql<number>`sum(case when ${reviewLogs.correct} = 1 then 1 else 0 end)`,
      })
      .from(reviewLogs)
      .all()[0];

    const totalLogs = Number(allLogsStats?.total ?? 0);
    const totalCorrect = Number(allLogsStats?.correct ?? 0);
    const overallAccuracy = totalLogs > 0 ? Math.round((totalCorrect / totalLogs) * 100) : null;

    // 4. Streaks (analyzing consecutive distinct active dates in UTC)
    const activeDateRows = this.db
      .select({
        date: sql<string>`DISTINCT strftime('%Y-%m-%d', ${reviewLogs.createdAt})`,
      })
      .from(reviewLogs)
      .orderBy(sql`strftime('%Y-%m-%d', ${reviewLogs.createdAt}) ASC`)
      .all();

    const distinctDatesAsc = activeDateRows
      .map((r) => r.date)
      .filter((d): d is string => Boolean(d));

    const { currentStreak, longestStreak } = calculateStreaks(distinctDatesAsc, todayUtc);

    // 5. State breakdown
    const overview = this.getProgressOverview();
    const stateBreakdown = overview.countsPerState;

    // 6. Due count (review_states.due_at <= now)
    const dueRow = this.db
      .select({ count: sql<number>`count(*)` })
      .from(reviewStates)
      .where(lte(reviewStates.dueAt, nowIso))
      .all()[0];
    const dueCount = Number(dueRow?.count ?? 0);

    return {
      todayReviews,
      todayLearned,
      overallAccuracy,
      currentStreak,
      longestStreak,
      stateBreakdown,
      dueCount,
    };
  }

  /**
   * Aggregates review volume, accuracy, and average response times grouped by day
   * over the past N days.
   */
  getReviewTrends(days: number = 30, nowInput?: string | Date) {
    const now = nowInput instanceof Date ? nowInput : nowInput ? new Date(nowInput) : new Date();

    // Build map of the past N calendar dates in UTC
    const dateMap = new Map<
      string,
      { reviewsCount: number; knownCorrectnessCount: number; correctCount: number; sumResponseTime: number; countResponseTime: number }
    >();

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now.getTime());
      d.setUTCDate(d.getUTCDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      dateMap.set(dateStr, {
        reviewsCount: 0,
        knownCorrectnessCount: 0,
        correctCount: 0,
        sumResponseTime: 0,
        countResponseTime: 0,
      });
    }

    const firstDateStr = Array.from(dateMap.keys())[0];

    const logs = this.db
      .select({
        date: sql<string>`strftime('%Y-%m-%d', ${reviewLogs.createdAt})`,
        correct: reviewLogs.correct,
        responseTime: reviewLogs.responseTime,
      })
      .from(reviewLogs)
      .where(gte(reviewLogs.createdAt, `${firstDateStr}T00:00:00.000Z`))
      .all();

    for (const log of logs) {
      if (log.date && dateMap.has(log.date)) {
        const entry = dateMap.get(log.date)!;
        entry.reviewsCount += 1;
        if (log.correct !== null) {
          entry.knownCorrectnessCount += 1;
        }
        if (log.correct === true) {
          entry.correctCount += 1;
        }
        if (log.responseTime !== null && log.responseTime !== undefined) {
          entry.sumResponseTime += log.responseTime;
          entry.countResponseTime += 1;
        }
      }
    }

    const trends: DailyTrendItem[] = [];
    for (const [date, data] of dateMap.entries()) {
      const accuracy =
        data.knownCorrectnessCount > 0 ? Math.round((data.correctCount / data.knownCorrectnessCount) * 100) : null;
      const averageResponseTime =
        data.countResponseTime > 0 ? Math.round(data.sumResponseTime / data.countResponseTime) : null;

      trends.push({
        date,
        reviewsCount: data.reviewsCount,
        reviewCount: data.reviewsCount,
        correctCount: data.correctCount,
        accuracy,
        averageResponseTime,
      });
    }

    return {
      days,
      trends,
    };
  }
}
