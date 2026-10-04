/**
 * @file analytics.repository.ts
 * @description Repository for vocabulary progress calculations, streaks, weak word analysis, and trend metrics.
 */

import { eq, and, sql, inArray, desc, lte, gte, lt } from 'drizzle-orm';
import type { AppDatabase } from '../db/client.js';
import {
  words,
  learningProgress,
  reviewStates,
  reviewLogs,
  studyPreferences,
} from '../db/schema.js';
import { civilDateAt, dayRangeUtc, addCivilDays } from '../domain/study/calendar-date.js';
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
 * Calculates current and longest review streaks based on distinct active civil dates (YYYY-MM-DD).
 */
export function calculateStreaks(distinctDatesAsc: string[], todayCivil: string): {
  currentStreak: number;
  longestStreak: number;
} {
  if (distinctDatesAsc.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  let longestStreak = 1;
  let currentRun = 1;

  for (let i = 1; i < distinctDatesAsc.length; i++) {
    if (addCivilDays(distinctDatesAsc[i - 1], 1) === distinctDatesAsc[i]) {
      currentRun += 1;
      if (currentRun > longestStreak) longestStreak = currentRun;
    } else {
      currentRun = 1;
    }
  }

  const dateSet = new Set(distinctDatesAsc);
  let currentStreak = 0;
  let checkDate = dateSet.has(todayCivil) ? todayCivil : addCivilDays(todayCivil, -1);
  if (!dateSet.has(checkDate)) return { currentStreak: 0, longestStreak };
  while (dateSet.has(checkDate)) {
    currentStreak += 1;
    checkDate = addCivilDays(checkDate, -1);
  }
  return { currentStreak, longestStreak: Math.max(longestStreak, currentStreak) };
}

export class AnalyticsRepository {
  constructor(private db: AppDatabase) {}

  private getCalendarTimeZone(): string {
    return this.db.select({ timeZone: studyPreferences.timeZone }).from(studyPreferences)
      .where(eq(studyPreferences.id, 'local')).all()[0]?.timeZone ?? 'UTC';
  }

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
    const nowIso = now.toISOString();
    const zone = this.getCalendarTimeZone();
    const todayCivil = civilDateAt(now, zone);
    const todayRange = dayRangeUtc(todayCivil, zone);

    const todayReviewsRow = this.db.select({ count: sql<number>`count(*)` }).from(reviewLogs)
      .where(and(gte(reviewLogs.createdAt, todayRange.start), lt(reviewLogs.createdAt, todayRange.end))).all()[0];
    const todayReviews = Number(todayReviewsRow?.count ?? 0);
    const learnedFromLogs = this.db.select({ wordId: reviewLogs.wordId }).from(reviewLogs)
      .where(and(gte(reviewLogs.createdAt, todayRange.start), lt(reviewLogs.createdAt, todayRange.end))).all();
    const learnedFromProgress = this.db.select({ wordId: learningProgress.wordId }).from(learningProgress)
      .where(and(gte(learningProgress.lastStudiedAt, todayRange.start), lt(learningProgress.lastStudiedAt, todayRange.end))).all();
    const todayLearnedWordIds = new Set<string>();
    for (const row of learnedFromLogs) todayLearnedWordIds.add(row.wordId);
    for (const row of learnedFromProgress) todayLearnedWordIds.add(row.wordId);

    const allLogsStats = this.db.select({
      total: sql<number>`sum(case when ${reviewLogs.correct} is not null then 1 else 0 end)`,
      correct: sql<number>`sum(case when ${reviewLogs.correct} = 1 then 1 else 0 end)`,
    }).from(reviewLogs).all()[0];
    const totalLogs = Number(allLogsStats?.total ?? 0);
    const totalCorrect = Number(allLogsStats?.correct ?? 0);
    const overallAccuracy = totalLogs > 0 ? Math.round((totalCorrect / totalLogs) * 100) : null;

    const activeDateRows = this.db.select({ createdAt: reviewLogs.createdAt }).from(reviewLogs).all();
    const distinctDatesAsc = [...new Set(activeDateRows.map((row) => civilDateAt(row.createdAt, zone)))].sort();
    const { currentStreak, longestStreak } = calculateStreaks(distinctDatesAsc, todayCivil);
    const stateBreakdown = this.getProgressOverview().countsPerState;
    const dueRow = this.db.select({ count: sql<number>`count(*)` }).from(reviewStates)
      .where(lte(reviewStates.dueAt, nowIso)).all()[0];

    return {
      todayReviews,
      todayLearned: todayLearnedWordIds.size,
      overallAccuracy,
      currentStreak,
      longestStreak,
      stateBreakdown,
      dueCount: Number(dueRow?.count ?? 0),
    };
  }

  /**
   * Aggregates review volume, accuracy, and average response times grouped by day
   * over the past N days.
   */
  getReviewTrends(days: number = 30, nowInput?: string | Date) {
    const now = nowInput instanceof Date ? nowInput : nowInput ? new Date(nowInput) : new Date();
    const zone = this.getCalendarTimeZone();
    const todayCivil = civilDateAt(now, zone);
    const dateMap = new Map<string, { reviewsCount: number; knownCorrectnessCount: number; correctCount: number; sumResponseTime: number; countResponseTime: number }>();
    for (let i = days - 1; i >= 0; i--) {
      dateMap.set(addCivilDays(todayCivil, -i), {
        reviewsCount: 0, knownCorrectnessCount: 0, correctCount: 0, sumResponseTime: 0, countResponseTime: 0,
      });
    }

    const firstDate = Array.from(dateMap.keys())[0];
    const firstRange = dayRangeUtc(firstDate, zone);
    const endRange = dayRangeUtc(addCivilDays(todayCivil, 1), zone);
    const logs = this.db.select({
      createdAt: reviewLogs.createdAt,
      correct: reviewLogs.correct,
      responseTime: reviewLogs.responseTime,
    }).from(reviewLogs)
      .where(and(gte(reviewLogs.createdAt, firstRange.start), lt(reviewLogs.createdAt, endRange.end))).all();

    for (const log of logs) {
      const date = civilDateAt(log.createdAt, zone);
      const entry = dateMap.get(date);
      if (!entry) continue;
      entry.reviewsCount += 1;
      if (log.correct !== null) entry.knownCorrectnessCount += 1;
      if (log.correct === true) entry.correctCount += 1;
      if (log.responseTime !== null && log.responseTime !== undefined) {
        entry.sumResponseTime += log.responseTime;
        entry.countResponseTime += 1;
      }
    }

    const trends: DailyTrendItem[] = [];
    for (const [date, data] of dateMap.entries()) {
      trends.push({
        date,
        reviewsCount: data.reviewsCount,
        reviewCount: data.reviewsCount,
        correctCount: data.correctCount,
        accuracy: data.knownCorrectnessCount > 0 ? Math.round((data.correctCount / data.knownCorrectnessCount) * 100) : null,
        averageResponseTime: data.countResponseTime > 0 ? Math.round(data.sumResponseTime / data.countResponseTime) : null,
      });
    }
    return { days, trends };
  }
}
