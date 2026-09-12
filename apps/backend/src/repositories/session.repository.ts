/**
 * @file session.repository.ts
 * @description Repository for learning sessions, step recording, and session completion transactions.
 */

import { eq, and, or, sql, desc, inArray, isNull, gte, lte, lt, ne } from 'drizzle-orm';
import { randomUUID } from 'node:crypto';
import type { AppDatabase } from '../db/client.js';
import {
  learningSessions,
  learningSessionItems,
  words,
  examples,
  collocations,
  contextWords,
  contexts,
  tags,
  wordTags,
  learningProgress,
  reviewStates,
  reviewLogs,
} from '../db/schema.js';
import type { StartSessionInput, SubmitStepInput, SessionStep, AssessmentRating } from '../schemas/session.schema.js';
import { SM2Scheduler } from '../domain/spaced-repetition/sm2.js';
import type { ReviewRating } from '../domain/spaced-repetition/types.js';
import { KnowledgeAssessmentService } from '../domain/knowledge/assessment.js';
import type { ReviewLogEntry } from '../domain/knowledge/types.js';
import { createCloze } from '../domain/text/cloze.js';
import { checkAnswer } from '../domain/text/normalization.js';

export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: string,
    message: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(404, 'NOT_FOUND', message);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(409, 'CONFLICT', message);
    this.name = 'ConflictError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(400, 'VALIDATION_ERROR', message);
    this.name = 'ValidationError';
  }
}

export class SessionRepository {
  private sm2Scheduler = new SM2Scheduler();
  private assessmentService = new KnowledgeAssessmentService();

  constructor(private db: AppDatabase) {}

  /**
   * Helper to build populated item structure with word details and cloze sentence.
   */
  private buildPopulatedItem(item: any, executor: any = this.db) {
    const word = executor
      .select()
      .from(words)
      .where(eq(words.id, item.wordId))
      .all()[0];

    if (!word) return null;

    const wordExamples = executor
      .select()
      .from(examples)
      .where(eq(examples.wordId, word.id))
      .all();

    const wordCollocations = executor
      .select()
      .from(collocations)
      .where(eq(collocations.wordId, word.id))
      .all();

    // Check if word has linked context
    const linkedContext = executor
      .select({ content: contexts.content })
      .from(contextWords)
      .innerJoin(contexts, eq(contexts.id, contextWords.contextId))
      .where(eq(contextWords.wordId, word.id))
      .all()[0];

    let contextSentence: string | null = null;
    if (linkedContext?.content) {
      const sentences = linkedContext.content.split(/(?<=[.?!])\s+/);
      const matched = sentences.find((s: string) =>
        s.toLowerCase().includes(word.word.toLowerCase())
      );
      contextSentence = matched || linkedContext.content;
    } else if (wordExamples.length > 0) {
      contextSentence = wordExamples[0].sentence;
    }

    const clozeSentence = contextSentence ? createCloze(contextSentence, word.word) : null;

    return {
      id: item.id,
      sessionId: item.sessionId,
      wordId: item.wordId,
      completedStep: item.completedStep,
      recallResult: item.recallResult,
      outputSentence: item.outputSentence,
      reviewRating: item.reviewRating,
      createdAt: item.createdAt,
      clozeSentence,
      word: {
        id: word.id,
        word: word.word,
        headword: word.word,
        definition: word.definition,
        phonetic: word.phonetic,
        pronunciation: word.phonetic,
        partOfSpeech: word.partOfSpeech,
        translation: word.translation,
        difficulty: word.difficulty,
        examples: wordExamples,
        collocations: wordCollocations,
        contextSentence,
      },
    };
  }

  /**
   * Creates a learning session and its items in a transaction based on the chosen mode.
   */
  createSession(data: StartSessionInput) {
    const count = data.count || 10;
    const now = new Date().toISOString();
    let sessionId = '';

    this.db.transaction((tx) => {
      let selectedWords: any[] = [];

      switch (data.mode) {
        case 'new_words': {
          selectedWords = tx
            .select({ word: words })
            .from(words)
            .leftJoin(learningProgress, eq(words.id, learningProgress.wordId))
            .where(
              or(
                eq(learningProgress.status, 'NEW'),
                isNull(learningProgress.id),
                isNull(learningProgress.lastStudiedAt)
              )
            )
            .limit(count)
            .all()
            .map((r) => r.word);

          // Fallback to any words if no strictly NEW words found
          if (selectedWords.length === 0) {
            selectedWords = tx.select().from(words).limit(count).all();
          }
          break;
        }

        case 'context': {
          if (!data.contextId) {
            throw new ValidationError('contextId is required for context mode');
          }

          selectedWords = tx
            .select({ word: words })
            .from(words)
            .innerJoin(contextWords, eq(words.id, contextWords.wordId))
            .where(eq(contextWords.contextId, data.contextId))
            .limit(count)
            .all()
            .map((r) => r.word);

          if (selectedWords.length === 0) {
            throw new NotFoundError('No words found for this context');
          }
          break;
        }

        case 'topic': {
          const topicName = data.topic || data.tag;
          if (!topicName) {
            throw new ValidationError('topic or tag is required for topic mode');
          }

          selectedWords = tx
            .select({ word: words })
            .from(words)
            .innerJoin(wordTags, eq(words.id, wordTags.wordId))
            .innerJoin(tags, eq(tags.id, wordTags.tagId))
            .where(sql`lower(${tags.name}) = lower(${topicName.trim()})`)
            .limit(count)
            .all()
            .map((r) => r.word);

          if (selectedWords.length === 0) {
            throw new NotFoundError(`No words found for topic "${topicName}"`);
          }
          break;
        }

        case 'weak_words': {
          selectedWords = tx
            .select({ word: words })
            .from(words)
            .leftJoin(reviewStates, eq(words.id, reviewStates.wordId))
            .leftJoin(learningProgress, eq(words.id, learningProgress.wordId))
            .where(
              or(
                gte(reviewStates.lapses, 2),
                and(ne(learningProgress.status, 'NEW'), lt(learningProgress.recallScore, 50)),
                and(
                  ne(learningProgress.status, 'NEW'),
                  gte(learningProgress.recognitionScore, 70),
                  lt(learningProgress.productionScore, 50)
                )
              )
            )
            .limit(count)
            .all()
            .map((r) => r.word);

          if (selectedWords.length === 0) {
            throw new NotFoundError('No weak words found for learning session');
          }
          break;
        }

        case 'daily_plan': {
          // Select due reviews first
          const dueWords = tx
            .select({ word: words })
            .from(words)
            .innerJoin(reviewStates, eq(words.id, reviewStates.wordId))
            .innerJoin(learningProgress, eq(words.id, learningProgress.wordId))
            .where(and(lte(reviewStates.dueAt, now), ne(learningProgress.status, 'NEW')))
            .limit(count)
            .all()
            .map((r) => r.word);

          const neededNew = count - dueWords.length;
          const newCandidates = neededNew > 0
            ? tx
                .select({ word: words })
                .from(words)
                .leftJoin(learningProgress, eq(words.id, learningProgress.wordId))
                .where(
                  or(
                    eq(learningProgress.status, 'NEW'),
                    isNull(learningProgress.id)
                  )
                )
                .limit(neededNew)
                .all()
                .map((r) => r.word)
            : [];

          const combined = [...dueWords, ...newCandidates];
          const seen = new Set<string>();
          for (const w of combined) {
            if (!seen.has(w.id)) {
              seen.add(w.id);
              selectedWords.push(w);
            }
          }

          if (selectedWords.length === 0) {
            selectedWords = tx.select().from(words).limit(count).all();
          }
          break;
        }
      }

      if (selectedWords.length === 0) {
        throw new ValidationError('No words available for learning session');
      }

      sessionId = randomUUID();

      tx.insert(learningSessions)
        .values({
          id: sessionId,
          sessionType: data.mode,
          totalWords: selectedWords.length,
          startedAt: now,
          completedAt: null,
        })
        .run();

      for (const word of selectedWords) {
        tx.insert(learningSessionItems)
          .values({
            id: randomUUID(),
            sessionId,
            wordId: word.id,
            completedStep: null,
            recallResult: null,
            outputSentence: null,
            reviewRating: null,
            createdAt: now,
          })
          .run();
      }
    });

    return this.findById(sessionId)!;
  }

  /**
   * Finds a session by ID with populated items and word data.
   */
  findById(id: string) {
    const session = this.db
      .select()
      .from(learningSessions)
      .where(eq(learningSessions.id, id))
      .all()[0];

    if (!session) return null;

    const rawItems = this.db
      .select()
      .from(learningSessionItems)
      .where(eq(learningSessionItems.sessionId, id))
      .all();

    const populatedItems = rawItems
      .map((item) => this.buildPopulatedItem(item))
      .filter(Boolean);

    return {
      id: session.id,
      sessionType: session.sessionType,
      mode: session.sessionType,
      totalWords: session.totalWords,
      startedAt: session.startedAt,
      completedAt: session.completedAt,
      status: session.completedAt ? 'COMPLETED' : 'IN_PROGRESS',
      items: populatedItems,
    };
  }

  /**
   * Returns any currently IN_PROGRESS session.
   */
  findActiveSession() {
    const active = this.db
      .select()
      .from(learningSessions)
      .where(isNull(learningSessions.completedAt))
      .orderBy(desc(learningSessions.startedAt))
      .limit(1)
      .all()[0];

    if (!active) return null;
    return this.findById(active.id);
  }

  /**
   * Returns recent sessions.
   */
  findRecentSessions(limit: number = 10) {
    const sessions = this.db
      .select()
      .from(learningSessions)
      .orderBy(desc(learningSessions.startedAt))
      .limit(limit)
      .all();

    return sessions
      .map((s) => this.findById(s.id))
      .filter(Boolean);
  }

  /**
   * Updates an item's step progress, recall outcome, user sentence, and assessment rating.
   */
  updateSessionItem(params: {
    sessionId: string;
    wordId: string;
    step: SessionStep;
    recallAnswer?: string;
    recallCorrect?: boolean;
    userSentence?: string;
    assessmentRating?: AssessmentRating;
  }) {
    const item = this.db
      .select()
      .from(learningSessionItems)
      .where(
        and(
          eq(learningSessionItems.sessionId, params.sessionId),
          eq(learningSessionItems.wordId, params.wordId)
        )
      )
      .all()[0];

    if (!item) return null;

    let recallResult = item.recallResult;
    if (params.recallCorrect !== undefined) {
      recallResult = params.recallCorrect ? 'CORRECT' : 'INCORRECT';
    } else if (params.recallAnswer !== undefined) {
      const word = this.db.select().from(words).where(eq(words.id, params.wordId)).all()[0];
      if (word) {
        const check = checkAnswer(params.recallAnswer, word.word);
        recallResult = check.exact ? 'CORRECT' : check.almostCorrect ? 'ALMOST_CORRECT' : 'INCORRECT';
      }
    }

    const outputSentence =
      params.userSentence !== undefined ? params.userSentence : item.outputSentence;
    const reviewRating =
      params.assessmentRating !== undefined ? params.assessmentRating : item.reviewRating;
    const completedStep = params.step;

    this.db
      .update(learningSessionItems)
      .set({
        completedStep,
        recallResult,
        outputSentence,
        reviewRating,
      })
      .where(eq(learningSessionItems.id, item.id))
      .run();

    const updatedRaw = this.db
      .select()
      .from(learningSessionItems)
      .where(eq(learningSessionItems.id, item.id))
      .all()[0];

    return this.buildPopulatedItem(updatedRaw);
  }

  /**
   * Completes a learning session in a transaction:
   * 1. Marks completedAt
   * 2. Updates SM-2 review_states
   * 3. Writes review_logs
   * 4. Recalculates 3D dimension scores and advances state in learning_progress
   */
  completeSession(sessionId: string) {
    const session = this.findById(sessionId);
    if (!session) {
      throw new NotFoundError(`Session with id "${sessionId}" not found`);
    }

    if (session.completedAt) {
      throw new ValidationError('Session is already completed');
    }

    const now = new Date().toISOString();

    this.db.transaction((tx) => {
      // 1. Mark session as completed
      tx.update(learningSessions)
        .set({ completedAt: now })
        .where(eq(learningSessions.id, sessionId))
        .run();

      // 2. Fetch all session items
      const rawItems = tx
        .select()
        .from(learningSessionItems)
        .where(eq(learningSessionItems.sessionId, sessionId))
        .all();

      for (const item of rawItems) {
        if (item.completedStep !== 'ASSESS' || !item.reviewRating) {
          continue;
        }

        const rating = item.reviewRating as ReviewRating;

        // Write review_logs
        // A. RECOGNITION log
        tx.insert(reviewLogs)
          .values({
            id: randomUUID(),
            wordId: item.wordId,
            reviewType: 'RECOGNITION',
            rating,
            responseTime: null,
            answer: null,
            correct: rating !== 'AGAIN',
            createdAt: now,
          })
          .run();

        // B. RECALL log
        const isRecallCorrect =
          item.recallResult !== null && item.recallResult !== undefined
            ? (item.recallResult === 'CORRECT' || item.recallResult === 'ALMOST_CORRECT')
            : (rating !== 'AGAIN');

        tx.insert(reviewLogs)
          .values({
            id: randomUUID(),
            wordId: item.wordId,
            reviewType: 'RECALL',
            rating,
            responseTime: null,
            answer: item.recallResult ?? null,
            correct: isRecallCorrect,
            createdAt: now,
          })
          .run();

        // C. PRODUCTION log (if userSentence provided)
        if (item.outputSentence) {
          tx.insert(reviewLogs)
            .values({
              id: randomUUID(),
              wordId: item.wordId,
              reviewType: 'PRODUCTION',
              rating,
              responseTime: null,
              answer: item.outputSentence,
              correct: rating !== 'AGAIN',
              createdAt: now,
            })
            .run();
        }

        // Update review_states via SM2Scheduler
        const existingReviewState = tx
          .select()
          .from(reviewStates)
          .where(eq(reviewStates.wordId, item.wordId))
          .all()[0];

        const currentState = {
          interval: existingReviewState?.interval ?? 0,
          easeFactor: existingReviewState?.easeFactor ?? 2.5,
          repetitions: existingReviewState?.repetitions ?? 0,
          lapses: existingReviewState?.lapses ?? 0,
        };

        const scheduleResult = this.sm2Scheduler.schedule(currentState, rating, now);

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
            .where(eq(reviewStates.wordId, item.wordId))
            .run();
        } else {
          tx.insert(reviewStates)
            .values({
              id: randomUUID(),
              wordId: item.wordId,
              interval: scheduleResult.interval,
              easeFactor: scheduleResult.easeFactor,
              repetitions: scheduleResult.repetitions,
              lapses: scheduleResult.lapses,
              dueAt: scheduleResult.dueAt.toISOString(),
              lastReviewedAt: scheduleResult.lastReviewedAt.toISOString(),
            })
            .run();
        }

        // Recalculate learning_progress via KnowledgeAssessmentService
        const allLogs = tx
          .select()
          .from(reviewLogs)
          .where(eq(reviewLogs.wordId, item.wordId))
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
          .where(eq(learningProgress.wordId, item.wordId))
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
            .where(eq(learningProgress.wordId, item.wordId))
            .run();
        } else {
          tx.insert(learningProgress)
            .values({
              id: randomUUID(),
              wordId: item.wordId,
              status: assessment.state,
              recognitionScore: assessment.scores.recognitionScore,
              recallScore: assessment.scores.recallScore,
              productionScore: assessment.scores.productionScore,
              lastStudiedAt: now,
              updatedAt: now,
            })
            .run();
        }
      }
    });

    return this.findById(sessionId)!;
  }
}
