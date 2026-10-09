/**
 * @file review-attempt-backup.schema.ts
 * @description Validates review attempt backup rows and their relational integrity for backup v6.
 */
import { z } from 'zod';
import type { ReviewAttemptRow, ReviewAttemptRequestRow } from './review-attempt.schema.js';
import {
  validateReviewAttemptInvariants,
  type ReviewAttemptInvariantsContext,
} from './review-attempt-invariants.schema.js';
import {
  validateReviewAttemptReceipts,
  reviewAttemptViewSchema,
  completeReviewResultSchema,
  KNOWN_ACTIONS,
  type KnownAction,
} from './review-attempt-receipt.schema.js';

export type ReviewAttemptBackupData = {
  reviewAttempts: ReviewAttemptRow[];
  reviewAttemptRequests: ReviewAttemptRequestRow[];
};

export type ReviewAttemptValidationContext = ReviewAttemptBackupData & ReviewAttemptInvariantsContext;

export {
  reviewAttemptViewSchema,
  completeReviewResultSchema,
  validateReviewAttemptInvariants,
  validateReviewAttemptReceipts,
  KNOWN_ACTIONS,
  type KnownAction,
};

export function validateReviewAttemptRelations(
  data: ReviewAttemptValidationContext,
  ctx: z.RefinementCtx,
): void {
  const attemptMap = validateReviewAttemptInvariants(data.reviewAttempts, data, ctx);
  validateReviewAttemptReceipts(data.reviewAttemptRequests, attemptMap, ctx);
}
