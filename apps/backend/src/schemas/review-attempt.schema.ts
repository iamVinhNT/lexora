/**
 * @file review-attempt.schema.ts
 * @description Strict schemas for adaptive review attempts, step transitions, receipts, and backup rows.
 */
import { z } from 'zod';
import type { ReviewRating } from './review.schema.js';

const timestampSchema = z
  .string()
  .datetime({ offset: true })
  .transform((value) => new Date(value).toISOString());

const jsonStringSchema = z.string().refine((val) => {
  try {
    JSON.parse(val);
    return true;
  } catch {
    return false;
  }
}, 'Value must be valid JSON string');

const nullableJsonStringSchema = z.string().nullable().refine((val) => {
  if (val === null) return true;
  try {
    JSON.parse(val);
    return true;
  } catch {
    return false;
  }
}, 'Value must be valid JSON string or null');

export const reviewAttemptStatusEnum = z.enum(['ACTIVE', 'COMPLETED', 'ABANDONED']);
export const reviewAttemptStageEnum = z.enum(['RECALL', 'FEEDBACK', 'OUTPUT', 'ASSESS']);
export const reviewAttemptPromptTypeEnum = z.enum(['RECALL', 'CLOZE']);
export const reviewAttemptRecallResultEnum = z.enum(['EXACT', 'TYPO', 'INCORRECT']);
export const reviewAttemptOutputMethodEnum = z.enum(['SELF', 'AI']);
export const reviewAttemptRatingEnum = z.enum(['AGAIN', 'HARD', 'GOOD', 'EASY']);

export const reviewAttemptRowSchema = z
  .object({
    id: z.string().min(1),
    wordId: z.string().min(1),
    studyTaskId: z.string().min(1).nullable(),
    status: reviewAttemptStatusEnum,
    stage: reviewAttemptStageEnum,
    version: z.number().int().positive(),
    promptType: reviewAttemptPromptTypeEnum,
    promptText: z.string().min(1),
    expectedDueAt: timestampSchema,
    expectedLastReviewedAt: timestampSchema.nullable(),
    expectedRepetitions: z.number().int().nonnegative(),
    expectedInterval: z.number().int().nonnegative(),
    expectedEaseFactor: z.number().finite().positive(),
    expectedLapses: z.number().int().nonnegative(),
    expectedWordUpdatedAt: timestampSchema.nullable(),
    needsOutput: z.boolean(),
    weakReasons: z.array(z.string()),
    recallAnswer: z.string().nullable(),
    recallResult: reviewAttemptRecallResultEnum.nullable(),
    recallScore: z.number().min(0).max(100).nullable(),
    responseTime: z.number().int().nonnegative().nullable(),
    outputAnswer: z.string().nullable(),
    outputMethod: reviewAttemptOutputMethodEnum.nullable(),
    outputScore: z.number().min(0).max(100).nullable(),
    outputExplanation: z.string().nullable(),
    outputSuggestion: z.string().nullable(),
    outputConfigRevision: z.string().nullable(),
    selfRating: reviewAttemptRatingEnum.nullable(),
    effectiveRating: reviewAttemptRatingEnum.nullable(),
    completedAt: timestampSchema.nullable(),
    createdAt: timestampSchema,
    updatedAt: timestampSchema,
  })
  .strict();

export type ReviewAttemptRow = z.infer<typeof reviewAttemptRowSchema>;

export const reviewAttemptRequestRowSchema = z
  .object({
    requestId: z.string().min(1),
    attemptId: z.string().min(1),
    action: z.string().min(1),
    requestBody: jsonStringSchema,
    response: nullableJsonStringSchema,
    createdAt: timestampSchema,
  })
  .strict();

export type ReviewAttemptRequestRow = z.infer<typeof reviewAttemptRequestRowSchema>;

export const startReviewAttemptSchema = z
  .object({
    requestId: z.string().trim().min(1).max(200),
    wordId: z.string().trim().min(1).max(200),
    studyTaskId: z.string().trim().min(1).max(200).optional(),
  })
  .strict();

export type StartReviewAttemptInput = z.infer<typeof startReviewAttemptSchema>;

export const stepReviewAttemptSchema = z.discriminatedUnion('action', [
  z
    .object({
      requestId: z.string().trim().min(1).max(200),
      expectedVersion: z.number().int().positive(),
      action: z.literal('RECALL'),
      answer: z.string().max(2000),
      responseTime: z.number().int().nonnegative().optional(),
    })
    .strict(),
  z
    .object({
      requestId: z.string().trim().min(1).max(200),
      expectedVersion: z.number().int().positive(),
      action: z.literal('CONTINUE'),
      practice: z.boolean().optional(),
    })
    .strict(),
  z
    .object({
      requestId: z.string().trim().min(1).max(200),
      expectedVersion: z.number().int().positive(),
      action: z.literal('OUTPUT'),
      answer: z.string().trim().min(1).max(2000),
      method: reviewAttemptOutputMethodEnum,
      configRevision: z.string().trim().min(1).max(200).optional(),
    })
    .strict(),
]);

export type StepReviewAttemptInput = z.infer<typeof stepReviewAttemptSchema>;

export const completeReviewAttemptSchema = z
  .object({
    requestId: z.string().trim().min(1).max(200),
    attemptId: z.string().trim().min(1).max(200),
    expectedVersion: z.number().int().positive(),
    rating: reviewAttemptRatingEnum,
  })
  .strict();

export type CompleteReviewAttemptInput = z.infer<typeof completeReviewAttemptSchema>;

export const abandonReviewAttemptSchema = z
  .object({
    requestId: z.string().trim().min(1).max(200),
    expectedVersion: z.number().int().positive(),
  })
  .strict();

export type AbandonReviewAttemptInput = z.infer<typeof abandonReviewAttemptSchema>;

export interface ReviewAttemptView {
  id: string;
  wordId: string;
  studyTaskId: string | null;
  status: 'ACTIVE' | 'COMPLETED' | 'ABANDONED';
  stage: 'RECALL' | 'FEEDBACK' | 'OUTPUT' | 'ASSESS';
  version: number;
  prompt: {
    type: 'RECALL' | 'CLOZE';
    text: string;
  };
  needsOutput: boolean;
  weakReasons: string[];
  recall: {
    answer: string;
    result: 'EXACT' | 'TYPO' | 'INCORRECT';
    score: number;
    responseTime: number | null;
  } | null;
  output: {
    answer: string;
    method: 'SELF' | 'AI';
    score: number | null;
    explanation: string | null;
    suggestion: string | null;
    configRevision: string | null;
  } | null;
  word: {
    id: string;
    word: string;
    definition: string;
    translation: string | null;
    phonetic: string | null;
    partOfSpeech: string | null;
  } | null;
  examples: Array<{
    sentence: string;
    translation?: string | null;
  }>;
  contexts: Array<{
    title: string;
    content: string;
  }>;
  intervalPreviews: Record<ReviewRating, string>;
  effectiveRatings: Record<ReviewRating, ReviewRating>;
  createdAt: string;
  updatedAt: string;
}

export interface CompleteReviewResult {
  attempt: ReviewAttemptView;
  selfRating: ReviewRating;
  effectiveRating: ReviewRating;
  reviewState: {
    id: string;
    wordId: string;
    interval: number;
    easeFactor: number;
    repetitions: number;
    lapses: number;
    dueAt: string;
    lastReviewedAt: string | null;
  };
  learningProgress: {
    wordId: string;
    status: string;
    recognitionScore: number;
    recallScore: number;
    productionScore: number;
  };
  reviewLog: {
    id: string;
    wordId: string;
    reviewType: string;
    rating: ReviewRating;
    answer: string | null;
    correct: boolean | null;
    responseTime: number | null;
    createdAt: string;
  };
}
