/**
 * @file review.schema.ts
 * @description Zod validation schemas for spaced repetition review operations.
 */

import { z } from 'zod';

export const reviewTypeEnum = z.enum([
  'RECOGNITION',
  'RECALL',
  'CLOZE',
  'PRODUCTION',
  'CONTEXTUAL',
]);

export const reviewRatingEnum = z.enum([
  'AGAIN',
  'HARD',
  'GOOD',
  'EASY',
]);

export const submitReviewSchema = z
  .object({
    requestId: z.string().trim().min(1).max(200),
    attemptId: z.string().trim().min(1).max(200),
    expectedVersion: z.number().int().positive(),
    rating: reviewRatingEnum,
  })
  .strict();

export const queryDueReviewsSchema = z.object({
  limit: z.coerce.number().int().positive().max(100).default(50),
});

export const queryReviewHistorySchema = z.object({
  wordId: z.string().uuid('wordId must be a valid UUID').optional(),
  reviewType: reviewTypeEnum.optional(),
  rating: reviewRatingEnum.optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type ReviewType = z.infer<typeof reviewTypeEnum>;
export type ReviewRating = z.infer<typeof reviewRatingEnum>;
export type SubmitReviewInput = z.infer<typeof submitReviewSchema>;
export type QueryDueReviewsInput = z.infer<typeof queryDueReviewsSchema>;
export type QueryReviewHistoryInput = z.infer<typeof queryReviewHistorySchema>;
