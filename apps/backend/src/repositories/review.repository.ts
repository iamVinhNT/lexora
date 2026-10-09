/**
 * @file review.repository.ts
 * @description Repository for due review queries, atomic review submissions, and immutable history retrieval.
 */

import { eq, and, sql, desc, asc, inArray, lte } from 'drizzle-orm';
import { randomUUID } from 'node:crypto';
import type { AppDatabase } from '../db/client.js';
import {
  words,
  examples,
  contextWords,
  contexts,
  learningProgress,
  reviewStates,
  reviewLogs,
} from '../db/schema.js';
import type {
  QueryReviewHistoryInput,
} from '../schemas/review.schema.js';

export class ReviewRepository {
  constructor(private db: AppDatabase) {}

  /**
   * Finds due reviews where review_states.due_at <= now, sorted by due_at ASC.
   * Joins words, learning_progress, examples, and contexts.
   */
  findDueReviews(limit: number = 50, now?: string | Date) {
    const nowStr = (now instanceof Date ? now.toISOString() : now) ?? new Date().toISOString();

    const dueRows = this.db
      .select({
        reviewState: reviewStates,
        word: words,
        progress: learningProgress,
      })
      .from(reviewStates)
      .innerJoin(words, eq(words.id, reviewStates.wordId))
      .leftJoin(learningProgress, eq(learningProgress.wordId, words.id))
      .where(lte(reviewStates.dueAt, nowStr))
      .orderBy(asc(reviewStates.dueAt))
      .limit(limit)
      .all();
    const wordIds = dueRows.map((r) => r.word.id);
    let allExamples: any[] = [];
    let allContexts: any[] = [];

    if (wordIds.length > 0) {
      allExamples = this.db
        .select()
        .from(examples)
        .where(inArray(examples.wordId, wordIds))
        .all();

      allContexts = this.db
        .select({
          wordId: contextWords.wordId,
          context: contexts,
        })
        .from(contextWords)
        .innerJoin(contexts, eq(contexts.id, contextWords.contextId))
        .where(inArray(contextWords.wordId, wordIds))
        .all();
    }

    // Compute summary counts across all due items
    const summaryRows = this.db
      .select({
        status: learningProgress.status,
        count: sql<number>`count(*)`,
      })
      .from(reviewStates)
      .leftJoin(learningProgress, eq(learningProgress.wordId, reviewStates.wordId))
      .where(lte(reviewStates.dueAt, nowStr))
      .groupBy(learningProgress.status)
      .all();

    const counts = {
      new: 0,
      learning: 0,
      familiar: 0,
      mastered: 0,
      maintenance: 0,
      total: 0,
    };

    for (const row of summaryRows) {
      const statusKey = (row.status || 'NEW').toLowerCase();
      const c = Number(row.count || 0);
      if (statusKey in counts) {
        (counts as any)[statusKey] += c;
      }
      counts.total += c;
    }

    const items = dueRows.map((row) => {
      const wordExamples = allExamples.filter((ex) => ex.wordId === row.word.id);
      const wordContextList = allContexts.filter((c) => c.wordId === row.word.id);

      let contextSentence: string | null = null;
      if (wordContextList.length > 0 && wordContextList[0].context?.content) {
        const sentences = wordContextList[0].context.content.split(/(?<=[.?!])\s+/);
        const matched = sentences.find((s: string) =>
          s.toLowerCase().includes(row.word.word.toLowerCase())
        );
        contextSentence = matched || wordContextList[0].context.content;
      } else if (wordExamples.length > 0) {
        contextSentence = wordExamples[0].sentence;
      }

      return {
        id: row.reviewState.id,
        wordId: row.word.id,
        word: row.word,
        reviewState: row.reviewState,
        learningProgress: row.progress,
        examples: wordExamples,
        contexts: wordContextList.map((c) => c.context),
        contextSentence,
      };
    });

    return {
      items,
      counts,
      countsByState: counts,
      total: counts.total,
    };
  }

  /**
   * Checks if a word is currently due for review.
   */
  isWordDue(wordId: string, now?: string | Date): boolean {
    const nowStr = (now instanceof Date ? now.toISOString() : now) ?? new Date().toISOString();
    const row = this.db
      .select({ wordId: reviewStates.wordId })
      .from(reviewStates)
      .where(and(eq(reviewStates.wordId, wordId), lte(reviewStates.dueAt, nowStr)))
      .limit(1)
      .all()[0];
    return Boolean(row);
  }


  /**
   * Returns paginated immutable review logs with word summary, sorted by created_at DESC.
   */
  findHistory(input: QueryReviewHistoryInput) {
    const conditions: any[] = [];
    if (input.wordId) {
      conditions.push(eq(reviewLogs.wordId, input.wordId));
    }
    if (input.reviewType) {
      conditions.push(eq(reviewLogs.reviewType, input.reviewType));
    }
    if (input.rating) {
      conditions.push(eq(reviewLogs.rating, input.rating));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const countRow = this.db
      .select({ count: sql<number>`count(*)` })
      .from(reviewLogs)
      .where(whereClause)
      .all()[0];

    const total = Number(countRow?.count ?? 0);
    const offset = (input.page - 1) * input.limit;

    const rows = this.db
      .select({
        id: reviewLogs.id,
        wordId: reviewLogs.wordId,
        reviewType: reviewLogs.reviewType,
        rating: reviewLogs.rating,
        responseTime: reviewLogs.responseTime,
        answer: reviewLogs.answer,
        correct: reviewLogs.correct,
        createdAt: reviewLogs.createdAt,
        word: {
          id: words.id,
          word: words.word,
          phonetic: words.phonetic,
          partOfSpeech: words.partOfSpeech,
          definition: words.definition,
          translation: words.translation,
          difficulty: words.difficulty,
        },
      })
      .from(reviewLogs)
      .innerJoin(words, eq(words.id, reviewLogs.wordId))
      .where(whereClause)
      .orderBy(desc(reviewLogs.createdAt))
      .limit(input.limit)
      .offset(offset)
      .all();

    const totalPages = Math.ceil(total / input.limit) || 1;

    return {
      items: rows,
      total,
      page: input.page,
      limit: input.limit,
      totalPages,
      pagination: {
        total,
        page: input.page,
        limit: input.limit,
        totalPages,
      },
    };
  }
}
