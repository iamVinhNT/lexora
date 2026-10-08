/**
 * @file review.service.ts
 * @description Service orchestrating spaced repetition reviews, exercise prompts, interval previews, and history.
 */

import { ReviewRepository } from '../repositories/review.repository.js';
import {
  AppError,
  NotFoundError,
  ConflictError,
  ValidationError,
} from './vocabulary.service.js';
import type {
  SubmitReviewInput,
  QueryDueReviewsInput,
  QueryReviewHistoryInput,
  ReviewRating,
} from '../schemas/review.schema.js';
import { SM2Scheduler } from '../domain/spaced-repetition/sm2.js';
import type { ReviewItemState } from '../domain/spaced-repetition/types.js';
import { createCloze } from '../domain/text/cloze.js';

export {
  AppError,
  NotFoundError,
  ConflictError,
  ValidationError,
};

export function formatInterval(days: number): string {
  if (days <= 1) return '1d';
  if (days < 30) return `${days}d`;
  if (days < 365) {
    const months = Math.round(days / 30);
    return `${months}m`;
  }
  const years = (days / 365).toFixed(1);
  return `${years.endsWith('.0') ? years.slice(0, -2) : years}y`;
}

export interface PrepareExercisePromptsParams {
  word: {
    word: string;
    definition: string;
    translation?: string | null;
    phonetic?: string | null;
  };
  contextSentence?: string | null;
  exampleSentence?: string | null;
  context?: {
    title?: string | null;
    content?: string | null;
  } | null;
  contexts?: Array<{
    title?: string | null;
    content?: string | null;
  }> | null;
}

export function prepareExercisePrompts(params: PrepareExercisePromptsParams) {
  const { word, contextSentence, exampleSentence } = params;
  const sentenceForCloze = contextSentence || exampleSentence || null;
  const clozeSentence = sentenceForCloze ? createCloze(sentenceForCloze, word.word) : null;

  const ctx = params.context ?? params.contexts?.[0] ?? null;
  let contextText: string | null = null;

  if (ctx) {
    if (contextSentence && (contextSentence !== exampleSentence || ctx.content?.includes(contextSentence))) {
      contextText = contextSentence;
    } else if (ctx.title && ctx.content) {
      contextText = `${ctx.title}: ${ctx.content}`;
    } else {
      contextText = ctx.content || ctx.title || null;
    }
  } else if (contextSentence && contextSentence !== exampleSentence) {
    contextText = contextSentence;
  }

  const contextPrompt = contextText || `[No context available for "${word.word}"]`;

  return {
    RECOGNITION: {
      type: 'RECOGNITION',
      prompt: word.word,
      question: 'What is the definition of this word?',
      answer: word.definition,
      translation: word.translation ?? null,
    },
    RECALL: {
      type: 'RECALL',
      prompt: word.translation || word.definition,
      question: 'What word matches this meaning?',
      answer: word.word,
      phonetic: word.phonetic ?? null,
    },
    CLOZE: {
      type: 'CLOZE',
      prompt: clozeSentence || `[No sentence available for "${word.word}"]`,
      clozeSentence,
      originalSentence: sentenceForCloze,
      question: 'Fill in the missing word in the sentence.',
      answer: word.word,
    },
    PRODUCTION: {
      type: 'PRODUCTION',
      prompt: `Create a sentence with "${word.word}".`,
      question: `Write an original sentence using the word "${word.word}".`,
      targetWord: word.word,
      definition: word.definition,
    },
    CONTEXTUAL: {
      type: 'CONTEXTUAL',
      prompt: contextPrompt,
      instructions: 'Identify or apply the vocabulary in this context',
      question: 'Identify or apply the vocabulary in this context',
      targetWord: word.word,
      definition: word.definition,
      contextSentence: contextSentence ?? null,
      contextText: contextText ?? null,
    },
  };
}

export function computeIntervalPreviews(
  scheduler: SM2Scheduler,
  currentState: { interval: number; easeFactor: number; repetitions: number; lapses: number },
  nowStr?: string
): Record<ReviewRating, string> {
  const again = scheduler.schedule(currentState, 'AGAIN', nowStr);
  const hard = scheduler.schedule(currentState, 'HARD', nowStr);
  const good = scheduler.schedule(currentState, 'GOOD', nowStr);
  const easy = scheduler.schedule(currentState, 'EASY', nowStr);

  return {
    AGAIN: formatInterval(again.interval),
    HARD: formatInterval(hard.interval),
    GOOD: formatInterval(good.interval),
    EASY: formatInterval(easy.interval),
  };
}

export class ReviewService {
  private sm2Scheduler = new SM2Scheduler();

  constructor(private repo: ReviewRepository) {}

  /**
   * Retrieves due review items, dynamically prepares exercise prompts,
   * calculates interval previews for all 4 ratings, and computes summary counts by state.
   */
  getDueReviews(query?: QueryDueReviewsInput) {
    const limit = query?.limit ?? 50;
    const nowStr = new Date().toISOString();
    const result = this.repo.findDueReviews(limit, nowStr);

    const items = result.items.map((item) => {
      const exercisePrompts = prepareExercisePrompts({
        word: item.word,
        contextSentence: item.contextSentence,
        exampleSentence: item.examples?.[0]?.sentence ?? null,
        contexts: item.contexts,
      });

      const currentReviewState = {
        interval: item.reviewState.interval ?? 0,
        easeFactor: item.reviewState.easeFactor ?? 2.5,
        repetitions: item.reviewState.repetitions ?? 0,
        lapses: item.reviewState.lapses ?? 0,
      };

      const intervalPreviews = computeIntervalPreviews(
        this.sm2Scheduler,
        currentReviewState,
        nowStr
      );

      return {
        ...item,
        exercisePrompts,
        intervalPreviews,
        intervalPreview: intervalPreviews,
      };
    });

    return {
      items,
      counts: result.counts,
      countsByState: result.countsByState,
      total: result.total,
    };
  }

  /**
   * Checks if a word is currently due for review.
   */
  isWordDue(wordId: string, now?: string | Date): boolean {
    return this.repo.isWordDue(wordId, now);
  }

  /**
   * Coordinates SM-2 calculation and 3D knowledge assessment,
   * validates word existence (throws 404 if not found), and records review log.
   */
  submitReview(input: SubmitReviewInput) {
    return this.repo.submitReview(input);
  }

  /**
   * Returns paginated immutable review history logs with word summary, sorted DESC by created_at.
   */
  getHistory(query: QueryReviewHistoryInput) {
    return this.repo.findHistory(query);
  }

  /**
   * Helper to dynamically prepare exercise prompts for a word.
   */
  preparePrompts(params: Parameters<typeof prepareExercisePrompts>[0]) {
    return prepareExercisePrompts(params);
  }

  /**
   * Helper to calculate interval previews for all ratings (AGAIN, HARD, GOOD, EASY).
   */
  computePreviews(currentState: ReviewItemState, now?: string | Date) {
    const nowStr = (now instanceof Date ? now.toISOString() : now) ?? new Date().toISOString();
    return computeIntervalPreviews(this.sm2Scheduler, currentState, nowStr);
  }
}
