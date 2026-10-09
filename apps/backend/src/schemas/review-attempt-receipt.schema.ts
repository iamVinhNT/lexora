/**
 * @file review-attempt-receipt.schema.ts
 * @description Validates request and response receipt payloads for review attempts in backup v6.
 */
import { z } from 'zod';
import {
  startReviewAttemptSchema,
  stepReviewAttemptSchema,
  completeReviewAttemptSchema,
  abandonReviewAttemptSchema,
  type ReviewAttemptRow,
  type ReviewAttemptRequestRow,
} from './review-attempt.schema.js';
import { reviewAttemptViewSchema, completeReviewResultSchema } from './review-attempt-view.schema.js';

export const KNOWN_ACTIONS = ['START', 'RECALL', 'CONTINUE', 'OUTPUT', 'COMPLETE', 'ABANDON'] as const;
export type KnownAction = (typeof KNOWN_ACTIONS)[number];

const KNOWN_ACTION_LOOKUP: Record<string, true> = {
  START: true,
  RECALL: true,
  CONTINUE: true,
  OUTPUT: true,
  COMPLETE: true,
  ABANDON: true,
};

function addIssue(ctx: z.RefinementCtx, path: (string | number)[], message: string): void {
  ctx.addIssue({ code: z.ZodIssueCode.custom, message, path });
}

export { reviewAttemptViewSchema, completeReviewResultSchema };

export function validateReviewAttemptReceipts(
  requests: ReviewAttemptRequestRow[],
  attemptMap: Map<string, ReviewAttemptRow>,
  ctx: z.RefinementCtx,
): void {
  const requestIds = new Set<string>();

  for (const [index, request] of requests.entries()) {
    const path = ['reviewAttemptRequests', index];

    if (requestIds.has(request.requestId)) {
      addIssue(ctx, path, `Duplicate review attempt request ID: ${request.requestId}`);
    }
    requestIds.add(request.requestId);

    const attempt = attemptMap.get(request.attemptId);
    if (!attempt) {
      addIssue(ctx, [...path, 'attemptId'], `Orphan review attempt request reference: ${request.attemptId}`);
      continue;
    }

    if (!KNOWN_ACTION_LOOKUP[request.action]) {
      addIssue(ctx, [...path, 'action'], `Unknown action: ${request.action}`);
      continue;
    }

    // Parse and validate requestBody
    let bodyObj: unknown;
    try {
      bodyObj = JSON.parse(request.requestBody);
    } catch {
      addIssue(ctx, [...path, 'requestBody'], 'requestBody must be valid JSON');
      continue;
    }

    if (typeof bodyObj !== 'object' || bodyObj === null || Array.isArray(bodyObj)) {
      addIssue(ctx, [...path, 'requestBody'], 'requestBody must be a JSON object');
      continue;
    }

    let bodyRequestId: unknown;
    if ('requestId' in bodyObj) {
      bodyRequestId = bodyObj.requestId;
    }
    if (bodyRequestId !== request.requestId) {
      addIssue(
        ctx,
        [...path, 'requestBody'],
        `requestBody.requestId (${String(bodyRequestId)}) does not match request.requestId (${request.requestId})`,
      );
    }

    // Action-specific input schema checks
    if (request.action === 'START') {
      const parsed = startReviewAttemptSchema.safeParse(bodyObj);
      if (!parsed.success) {
        addIssue(ctx, [...path, 'requestBody'], `requestBody failed startReviewAttemptSchema: ${parsed.error.message}`);
      } else if (parsed.data.wordId !== attempt.wordId) {
        addIssue(
          ctx,
          [...path, 'requestBody'],
          `START request wordId (${parsed.data.wordId}) does not match attempt wordId (${attempt.wordId})`,
        );
      }
    } else if (request.action === 'RECALL' || request.action === 'CONTINUE' || request.action === 'OUTPUT') {
      const parsed = stepReviewAttemptSchema.safeParse(bodyObj);
      if (!parsed.success) {
        addIssue(ctx, [...path, 'requestBody'], `requestBody failed stepReviewAttemptSchema: ${parsed.error.message}`);
      } else {
        if (parsed.data.action !== request.action) {
          addIssue(
            ctx,
            [...path, 'requestBody'],
            `requestBody action (${parsed.data.action}) does not match request action (${request.action})`,
          );
        }
        if (parsed.data.expectedVersion > attempt.version) {
          addIssue(
            ctx,
            [...path, 'requestBody'],
            `expectedVersion (${parsed.data.expectedVersion}) cannot exceed attempt version (${attempt.version})`,
          );
        }
      }
    } else if (request.action === 'COMPLETE') {
      const parsed = completeReviewAttemptSchema.safeParse(bodyObj);
      if (!parsed.success) {
        addIssue(ctx, [...path, 'requestBody'], `requestBody failed completeReviewAttemptSchema: ${parsed.error.message}`);
      } else {
        if (parsed.data.attemptId !== attempt.id) {
          addIssue(
            ctx,
            [...path, 'requestBody'],
            `COMPLETE request attemptId (${parsed.data.attemptId}) does not match attempt id (${attempt.id})`,
          );
        }
        if (parsed.data.expectedVersion > attempt.version) {
          addIssue(
            ctx,
            [...path, 'requestBody'],
            `expectedVersion (${parsed.data.expectedVersion}) cannot exceed attempt version (${attempt.version})`,
          );
        }
        if (attempt.status === 'COMPLETED' && parsed.data.rating !== attempt.selfRating) {
          addIssue(
            ctx,
            [...path, 'requestBody'],
            `COMPLETE request rating (${parsed.data.rating}) does not match attempt selfRating (${attempt.selfRating})`,
          );
        }
      }
    } else if (request.action === 'ABANDON') {
      const parsed = abandonReviewAttemptSchema.safeParse(bodyObj);
      if (!parsed.success) {
        addIssue(ctx, [...path, 'requestBody'], `requestBody failed abandonReviewAttemptSchema: ${parsed.error.message}`);
      } else if (parsed.data.expectedVersion > attempt.version) {
        addIssue(
          ctx,
          [...path, 'requestBody'],
          `expectedVersion (${parsed.data.expectedVersion}) cannot exceed attempt version (${attempt.version})`,
        );
      }
    }

    // Response validation
    if (request.response === null) {
      if (request.action !== 'OUTPUT') {
        addIssue(
          ctx,
          [...path, 'response'],
          `Null response is only legal for pending AI OUTPUT claims, got action ${request.action}`,
        );
      }
    } else {
      let responseObj: unknown;
      try {
        responseObj = JSON.parse(request.response);
      } catch {
        addIssue(ctx, [...path, 'response'], 'response must be valid JSON');
        continue;
      }

      if (typeof responseObj !== 'object' || responseObj === null || Array.isArray(responseObj)) {
        addIssue(ctx, [...path, 'response'], 'response must be a JSON object');
        continue;
      }

      if (request.action === 'COMPLETE') {
        const parsed = completeReviewResultSchema.safeParse(responseObj);
        if (!parsed.success) {
          addIssue(ctx, [...path, 'response'], `COMPLETE response does not match CompleteReviewResult: ${parsed.error.message}`);
        } else {
          if (parsed.data.attempt.id !== attempt.id) {
            addIssue(
              ctx,
              [...path, 'response'],
              `COMPLETE response attempt.id (${parsed.data.attempt.id}) does not match attempt.id (${attempt.id})`,
            );
          }
          if (parsed.data.attempt.wordId !== attempt.wordId) {
            addIssue(
              ctx,
              [...path, 'response'],
              `COMPLETE response attempt.wordId (${parsed.data.attempt.wordId}) does not match attempt.wordId (${attempt.wordId})`,
            );
          }
          if (parsed.data.selfRating !== attempt.selfRating) {
            addIssue(
              ctx,
              [...path, 'response'],
              `COMPLETE response selfRating (${parsed.data.selfRating}) does not match attempt.selfRating (${attempt.selfRating})`,
            );
          }
          if (parsed.data.effectiveRating !== attempt.effectiveRating) {
            addIssue(
              ctx,
              [...path, 'response'],
              `COMPLETE response effectiveRating (${parsed.data.effectiveRating}) does not match attempt.effectiveRating (${attempt.effectiveRating})`,
            );
          }
        }
      } else {
        const parsed = reviewAttemptViewSchema.safeParse(responseObj);
        if (!parsed.success) {
          addIssue(ctx, [...path, 'response'], `${request.action} response does not match ReviewAttemptView: ${parsed.error.message}`);
        } else {
          if (parsed.data.id !== attempt.id) {
            addIssue(
              ctx,
              [...path, 'response'],
              `${request.action} response id (${parsed.data.id}) does not match attempt id (${attempt.id})`,
            );
          }
          if (parsed.data.wordId !== attempt.wordId) {
            addIssue(
              ctx,
              [...path, 'response'],
              `${request.action} response wordId (${parsed.data.wordId}) does not match attempt wordId (${attempt.wordId})`,
            );
          }
          if (parsed.data.version > attempt.version) {
            addIssue(
              ctx,
              [...path, 'response'],
              `${request.action} response version (${parsed.data.version}) cannot exceed attempt version (${attempt.version})`,
            );
          }
          if (request.action === 'START' && parsed.data.stage !== 'RECALL') {
            addIssue(ctx, [...path, 'response'], `START response must have stage RECALL, got ${parsed.data.stage}`);
          }
          if (request.action === 'RECALL' && parsed.data.stage !== 'FEEDBACK') {
            addIssue(ctx, [...path, 'response'], `RECALL response must have stage FEEDBACK, got ${parsed.data.stage}`);
          }
          if (request.action === 'CONTINUE' && parsed.data.stage !== 'OUTPUT' && parsed.data.stage !== 'ASSESS') {
            addIssue(ctx, [...path, 'response'], `CONTINUE response must have stage OUTPUT or ASSESS, got ${parsed.data.stage}`);
          }
          if (request.action === 'OUTPUT' && parsed.data.stage !== 'ASSESS') {
            addIssue(ctx, [...path, 'response'], `OUTPUT response must have stage ASSESS, got ${parsed.data.stage}`);
          }
          if (request.action === 'ABANDON' && parsed.data.status !== 'ABANDONED') {
            addIssue(ctx, [...path, 'response'], `ABANDON response must have status ABANDONED, got ${parsed.data.status}`);
          }
        }
      }
    }
  }
}
