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
  SubmitReviewInput,
  QueryReviewHistoryInput,
  ReviewRating,
} from '../schemas/review.schema.js';
import { SM2Scheduler } from '../domain/spaced-repetition/sm2.js';
import { KnowledgeAssessmentService } from '../domain/knowledge/assessment.js';
import type { ReviewLogEntry } from '../domain/knowledge/types.js';
import {
  AppError,
  NotFoundError,
  ConflictError,
  ValidationError,
} from '../services/vocabulary.service.js';

import { StudyRepository } from './study.repository.js';

export class ReviewRepository {
  private sm2Scheduler = new SM2Scheduler();
  private assessmentService = new KnowledgeAssessmentService();

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
   * Submits a review inside a transaction:
   * 1. Updates review_states using SM2Scheduler.
   * 2. Writes an immutable review_logs record.
   * 3. Evaluates 3D knowledge dimensions and state transition via KnowledgeAssessmentService.
   */
  submitReview(input: SubmitReviewInput) {
    const word = this.db.select().from(words).where(eq(words.id, input.wordId)).all()[0];
    if (!word) {
      throw new NotFoundError(`Word with id "${input.wordId}" not found`);
    }

    const now = new Date().toISOString();
    return this.db.transaction((tx) => {
      // Validate task evidence before changing scheduler or learning state.
      if (input.studyTaskId !== undefined) {
        try {
          new StudyRepository(this.db).assertUsableTask(tx, input.studyTaskId, 'REVIEW_WORDS', now);
        } catch (error) {
          if (error instanceof NotFoundError) {
            throw new ConflictError('Study task not found', {
              reason: 'TASK_NOT_FOUND',
              taskId: input.studyTaskId,
            });
          }
          throw error;
        }
      }

      // 1. Load current review_states
      const existingReviewState = tx
        .select()
        .from(reviewStates)
        .where(eq(reviewStates.wordId, input.wordId))
        .all()[0];

      const currentState = {
        interval: existingReviewState?.interval ?? 0,
        easeFactor: existingReviewState?.easeFactor ?? 2.5,
        repetitions: existingReviewState?.repetitions ?? 0,
        lapses: existingReviewState?.lapses ?? 0,
      };

      // 2. SM-2 calculation
      const scheduleResult = this.sm2Scheduler.schedule(currentState, input.rating, now);

      if (existingReviewState) {
        tx.update(reviewStates)
          .set({
            interval: scheduleResult.interval,
            easeFactor: scheduleResult.easeFactor,
            repetitions: scheduleResult.repetitions,
            lapses: scheduleResult.lapses,
            dueAt: scheduleResult.dueAt.toISOString(),
            lastReviewedAt: scheduleResult.lastReviewedAt.toISOString(),
          })
          .where(eq(reviewStates.wordId, input.wordId))
          .run();
      } else {
        tx.insert(reviewStates)
          .values({
            id: randomUUID(),
            wordId: input.wordId,
            interval: scheduleResult.interval,
            easeFactor: scheduleResult.easeFactor,
            repetitions: scheduleResult.repetitions,
            lapses: scheduleResult.lapses,
            dueAt: scheduleResult.dueAt.toISOString(),
            lastReviewedAt: scheduleResult.lastReviewedAt.toISOString(),
          })
          .run();
      }

      // 3. Write immutable review log
      const isCorrect =
        input.correct !== undefined && input.correct !== null
          ? Boolean(input.correct)
          : input.rating !== 'AGAIN';

      const logId = randomUUID();
      tx.insert(reviewLogs)
        .values({
          id: logId,
          wordId: input.wordId,
          reviewType: input.reviewType,
          rating: input.rating,
          answer: input.answer ?? null,
          correct: isCorrect,
          responseTime: input.responseTime ?? null,
          createdAt: now,
          studyTaskId: input.studyTaskId ?? null,
        })
        .run();

      // 4. Evaluate 3D knowledge dimensions and state transition
      const allLogs = tx
        .select()
        .from(reviewLogs)
        .where(eq(reviewLogs.wordId, input.wordId))
        .all();

      const logEntries: ReviewLogEntry[] = allLogs.map((l) => ({
        reviewType: l.reviewType,
        rating: l.rating as ReviewRating,
        correct: Boolean(l.correct),
        createdAt: l.createdAt,
      }));

      const assessment = this.assessmentService.assess({
        reviewLogs: logEntries,
        repetitions: scheduleResult.repetitions,
        interval: scheduleResult.interval,
        lapses: scheduleResult.lapses,
      });

      const existingProgress = tx
        .select()
        .from(learningProgress)
        .where(eq(learningProgress.wordId, input.wordId))
        .all()[0];

      if (existingProgress) {
        tx.update(learningProgress)
          .set({
            status: assessment.state,
            recognitionScore: assessment.scores.recognitionScore,
            recallScore: assessment.scores.recallScore,
            productionScore: assessment.scores.productionScore,
            lastStudiedAt: now,
            updatedAt: now,
          })
          .where(eq(learningProgress.wordId, input.wordId))
          .run();
      } else {
        tx.insert(learningProgress)
          .values({
            id: randomUUID(),
            wordId: input.wordId,
            status: assessment.state,
            recognitionScore: assessment.scores.recognitionScore,
            recallScore: assessment.scores.recallScore,
            productionScore: assessment.scores.productionScore,
            lastStudiedAt: now,
            updatedAt: now,
          })
          .run();
      }

      const updatedReviewState = tx
        .select()
        .from(reviewStates)
        .where(eq(reviewStates.wordId, input.wordId))
        .all()[0];

      const updatedLearningProgress = tx
        .select()
        .from(learningProgress)
        .where(eq(learningProgress.wordId, input.wordId))
        .all()[0];

      const createdReviewLog = tx
        .select()
        .from(reviewLogs)
        .where(eq(reviewLogs.id, logId))
        .all()[0];

      return {
        reviewState: updatedReviewState,
        learningProgress: updatedLearningProgress,
        reviewLog: createdReviewLog,
      };
    });
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
