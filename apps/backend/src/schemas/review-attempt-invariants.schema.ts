/**
 * @file review-attempt-invariants.schema.ts
 * @description Validates relational and state invariants for review attempt rows in backup v6.
 */
import { z } from 'zod';
import type { ReviewAttemptRow } from './review-attempt.schema.js';
import { calculateEffectiveRatings } from '../domain/review/prompt.js';

export type ReviewAttemptInvariantsContext = {
  words: Array<{ id: string }>;
  studyTasks?: Array<{ id: string; kind?: string }>;
};

function addIssue(ctx: z.RefinementCtx, path: (string | number)[], message: string): void {
  ctx.addIssue({ code: z.ZodIssueCode.custom, message, path });
}

export function validateReviewAttemptInvariants(
  attempts: ReviewAttemptRow[],
  context: ReviewAttemptInvariantsContext,
  ctx: z.RefinementCtx,
): Map<string, ReviewAttemptRow> {
  const attemptIds = new Set<string>();
  const attemptMap = new Map<string, ReviewAttemptRow>();
  let activeCount = 0;
  const wordIds = new Set(context.words.map((w) => w.id));
  const taskMap = context.studyTasks ? new Map(context.studyTasks.map((t) => [t.id, t.kind])) : null;

  for (const [index, attempt] of attempts.entries()) {
    const path = ['reviewAttempts', index];

    // Duplicate attempt ID check
    if (attemptIds.has(attempt.id)) {
      addIssue(ctx, path, `Duplicate review attempt ID: ${attempt.id}`);
    }
    attemptIds.add(attempt.id);
    attemptMap.set(attempt.id, attempt);

    // Foreign key to words
    if (!wordIds.has(attempt.wordId)) {
      addIssue(ctx, [...path, 'wordId'], `Orphan word reference in review attempt: ${attempt.wordId}`);
    }

    // Foreign key to studyTasks
    if (attempt.studyTaskId !== null && taskMap !== null) {
      if (!taskMap.has(attempt.studyTaskId)) {
        addIssue(ctx, [...path, 'studyTaskId'], `Orphan study task in review attempt: ${attempt.studyTaskId}`);
      } else if (taskMap.get(attempt.studyTaskId) !== 'REVIEW_WORDS') {
        addIssue(ctx, [...path, 'studyTaskId'], 'Review attempt must link to a REVIEW_WORDS task');
      }
    }

    // Active uniqueness
    if (attempt.status === 'ACTIVE') {
      activeCount++;
      if (activeCount > 1) {
        addIssue(ctx, [...path, 'status'], 'Only one active review attempt allowed');
      }
      if (attempt.completedAt !== null) {
        addIssue(ctx, [...path, 'completedAt'], 'Active attempt cannot have completedAt');
      }
      if (attempt.selfRating !== null || attempt.effectiveRating !== null) {
        addIssue(ctx, [...path, 'selfRating'], 'Active attempt cannot have ratings');
      }
    }

    // Completed status constraints
    if (attempt.status === 'COMPLETED') {
      if (attempt.stage !== 'ASSESS') {
        addIssue(ctx, [...path, 'stage'], 'Completed attempt must be in ASSESS stage');
      }
      if (attempt.completedAt === null) {
        addIssue(ctx, [...path, 'completedAt'], 'Completed attempt must have completedAt timestamp');
      }
      if (attempt.selfRating === null) {
        addIssue(ctx, [...path, 'selfRating'], 'Completed attempt must have selfRating');
      }
      if (attempt.effectiveRating === null) {
        addIssue(ctx, [...path, 'effectiveRating'], 'Completed attempt must have effectiveRating');
      }

      // Canonical effective rating validation
      if (attempt.selfRating !== null && attempt.effectiveRating !== null) {
        const canonicalRatings = calculateEffectiveRatings({
          recallResult: attempt.recallResult,
          recallScore: attempt.recallScore,
          outputMethod: attempt.outputMethod,
          outputScore: attempt.outputScore,
        });
        if (canonicalRatings[attempt.selfRating] !== attempt.effectiveRating) {
          addIssue(
            ctx,
            [...path, 'effectiveRating'],
            `effectiveRating (${attempt.effectiveRating}) does not match canonical rating (${canonicalRatings[attempt.selfRating]}) for selfRating ${attempt.selfRating}`,
          );
        }
      }
    }

    // Abandoned status constraints
    if (attempt.status === 'ABANDONED') {
      if (attempt.completedAt !== null) {
        addIssue(ctx, [...path, 'completedAt'], 'Abandoned attempt cannot have completedAt');
      }
      if (attempt.selfRating !== null || attempt.effectiveRating !== null) {
        addIssue(ctx, [...path, 'selfRating'], 'Abandoned attempt cannot have ratings');
      }
    }

    // Recall result and score binding
    if (attempt.recallResult !== null) {
      if (attempt.recallAnswer === null) {
        addIssue(ctx, [...path, 'recallAnswer'], 'recallAnswer is required when recallResult exists');
      }
      if (attempt.recallResult === 'EXACT' && attempt.recallScore !== 100) {
        addIssue(ctx, [...path, 'recallScore'], `EXACT recall must have score 100, got ${attempt.recallScore}`);
      }
      if (attempt.recallResult === 'TYPO' && attempt.recallScore !== 70) {
        addIssue(ctx, [...path, 'recallScore'], `TYPO recall must have score 70, got ${attempt.recallScore}`);
      }
      if (attempt.recallResult === 'INCORRECT') {
        if (attempt.recallScore !== 0) {
          addIssue(ctx, [...path, 'recallScore'], `INCORRECT recall must have score 0, got ${attempt.recallScore}`);
        }
        if (!attempt.needsOutput) {
          addIssue(ctx, [...path, 'needsOutput'], 'INCORRECT recall must set needsOutput to true');
        }
      }
    } else {
      if (attempt.recallAnswer !== null) {
        addIssue(ctx, [...path, 'recallAnswer'], 'recallAnswer must be null when recallResult is null');
      }
      if (attempt.recallScore !== null) {
        addIssue(ctx, [...path, 'recallScore'], 'recallScore must be null when recallResult is null');
      }
    }

    // Stage vs Evidence coherence
    if (attempt.stage === 'RECALL') {
      if (attempt.recallResult !== null || attempt.recallScore !== null || attempt.recallAnswer !== null) {
        addIssue(ctx, [...path, 'recallResult'], 'RECALL stage cannot have recallResult, recallScore, or recallAnswer');
      }
      if (attempt.responseTime !== null) {
        addIssue(ctx, [...path, 'responseTime'], 'RECALL stage cannot have responseTime');
      }
      if (attempt.outputMethod !== null || attempt.outputScore !== null || attempt.outputAnswer !== null || attempt.outputExplanation !== null || attempt.outputSuggestion !== null || attempt.outputConfigRevision !== null) {
        addIssue(ctx, [...path, 'outputMethod'], 'RECALL stage cannot have output evidence');
      }
    }

    if (attempt.stage === 'FEEDBACK') {
      if (attempt.recallResult === null || attempt.recallScore === null || attempt.recallAnswer === null) {
        addIssue(ctx, [...path, 'recallResult'], 'FEEDBACK stage must have recallResult, recallScore, and recallAnswer');
      }
      if (attempt.outputMethod !== null || attempt.outputScore !== null || attempt.outputAnswer !== null || attempt.outputExplanation !== null || attempt.outputSuggestion !== null || attempt.outputConfigRevision !== null) {
        addIssue(ctx, [...path, 'outputMethod'], 'FEEDBACK stage cannot have output evidence');
      }
    }

    if (attempt.stage === 'OUTPUT') {
      if (attempt.recallResult === null || attempt.recallScore === null || attempt.recallAnswer === null) {
        addIssue(ctx, [...path, 'recallResult'], 'OUTPUT stage must have recall evidence recorded');
      }
      if (attempt.outputMethod !== null || attempt.outputScore !== null || attempt.outputAnswer !== null || attempt.outputExplanation !== null || attempt.outputSuggestion !== null || attempt.outputConfigRevision !== null) {
        addIssue(ctx, [...path, 'outputMethod'], 'OUTPUT stage must have no output evidence recorded yet');
      }
    }

    if (attempt.stage === 'ASSESS') {
      if (attempt.recallResult === null || attempt.recallScore === null || attempt.recallAnswer === null) {
        addIssue(ctx, [...path, 'recallResult'], 'ASSESS stage must have recall evidence recorded');
      }
      if (attempt.needsOutput) {
        if (attempt.outputAnswer === null || attempt.outputAnswer.trim().length === 0) {
          addIssue(ctx, [...path, 'outputAnswer'], 'ASSESS stage with needsOutput requires non-blank outputAnswer');
        }
        if (attempt.outputMethod === null) {
          addIssue(ctx, [...path, 'outputMethod'], 'ASSESS stage with needsOutput requires outputMethod');
        }
      }
    }

    // Output method / score consistency
    if (attempt.outputMethod === 'SELF') {
      if (attempt.outputAnswer === null || attempt.outputAnswer.trim().length === 0) {
        addIssue(ctx, [...path, 'outputAnswer'], 'SELF output requires non-blank outputAnswer');
      }
      if (attempt.outputScore !== null) {
        addIssue(ctx, [...path, 'outputScore'], 'SELF output must have null outputScore');
      }
      if (attempt.outputExplanation !== null) {
        addIssue(ctx, [...path, 'outputExplanation'], 'SELF output must have null outputExplanation');
      }
      if (attempt.outputSuggestion !== null) {
        addIssue(ctx, [...path, 'outputSuggestion'], 'SELF output must have null outputSuggestion');
      }
      if (attempt.outputConfigRevision !== null) {
        addIssue(ctx, [...path, 'outputConfigRevision'], 'SELF output must have null outputConfigRevision');
      }
    }

    if (attempt.outputMethod === 'AI') {
      if (attempt.outputAnswer === null || attempt.outputAnswer.trim().length === 0) {
        addIssue(ctx, [...path, 'outputAnswer'], 'AI output requires non-blank outputAnswer');
      }
      if (attempt.outputScore === null) {
        addIssue(ctx, [...path, 'outputScore'], 'AI output must have non-null outputScore');
      }
      if (attempt.outputExplanation === null || attempt.outputExplanation.trim().length === 0) {
        addIssue(ctx, [...path, 'outputExplanation'], 'AI output requires non-blank outputExplanation');
      }
      if (attempt.outputConfigRevision === null || attempt.outputConfigRevision.trim().length === 0) {
        addIssue(ctx, [...path, 'outputConfigRevision'], 'AI output requires non-blank outputConfigRevision');
      }
    }

    if (attempt.outputMethod === null) {
      if (attempt.outputScore !== null || attempt.outputAnswer !== null || attempt.outputExplanation !== null || attempt.outputSuggestion !== null || attempt.outputConfigRevision !== null) {
        addIssue(ctx, [...path, 'outputMethod'], 'Null outputMethod cannot have output evidence');
      }
    }

    // Dates plausibility
    const createdTime = new Date(attempt.createdAt).getTime();
    const updatedTime = new Date(attempt.updatedAt).getTime();
    if (createdTime > updatedTime + 1000) {
      addIssue(ctx, [...path, 'createdAt'], 'createdAt cannot be after updatedAt');
    }
    if (attempt.completedAt !== null) {
      const completedTime = new Date(attempt.completedAt).getTime();
      if (createdTime > completedTime + 1000) {
        addIssue(ctx, [...path, 'completedAt'], 'createdAt cannot be after completedAt');
      }
    }
  }

  return attemptMap;
}
