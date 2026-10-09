/**
 * @file review-attempt-view.schema.ts
 * @description Validates client view representations and complete review results for backup v6 receipts.
 */
import { z } from 'zod';
import { reviewAttemptRatingEnum } from './review-attempt.schema.js';

export const reviewAttemptViewSchema = z
  .object({
    id: z.string().min(1),
    wordId: z.string().min(1),
    studyTaskId: z.string().min(1).nullable(),
    status: z.enum(['ACTIVE', 'COMPLETED', 'ABANDONED']),
    stage: z.enum(['RECALL', 'FEEDBACK', 'OUTPUT', 'ASSESS']),
    version: z.number().int().positive(),
    prompt: z.object({
      type: z.enum(['RECALL', 'CLOZE']),
      text: z.string().min(1),
    }),
    needsOutput: z.boolean(),
    weakReasons: z.array(z.string()),
    recall: z
      .object({
        answer: z.string(),
        result: z.enum(['EXACT', 'TYPO', 'INCORRECT']),
        score: z.number(),
        responseTime: z.number().nullable(),
      })
      .nullable(),
    output: z
      .object({
        answer: z.string(),
        method: z.enum(['SELF', 'AI']),
        score: z.number().nullable(),
        explanation: z.string().nullable(),
        suggestion: z.string().nullable(),
        configRevision: z.string().nullable(),
      })
      .nullable(),
    word: z
      .object({
        id: z.string().min(1),
        word: z.string().min(1),
        definition: z.string(),
        translation: z.string().nullable(),
        phonetic: z.string().nullable(),
        partOfSpeech: z.string().nullable(),
      })
      .nullable(),
    examples: z.array(z.object({ sentence: z.string(), translation: z.string().nullable().optional() })),
    contexts: z.array(z.object({ title: z.string(), content: z.string() })),
    intervalPreviews: z.record(z.string(), z.string()),
    effectiveRatings: z.record(z.string(), z.string()),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .superRefine((val, ctx) => {
    if (val.stage === 'RECALL') {
      if (val.word !== null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'RECALL stage view must not expose word details',
          path: ['word'],
        });
      }
      if (val.examples.length > 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'RECALL stage view must not expose examples',
          path: ['examples'],
        });
      }
      if (val.contexts.length > 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'RECALL stage view must not expose contexts',
          path: ['contexts'],
        });
      }
    }
  });

export const completeReviewResultSchema = z.object({
  attempt: reviewAttemptViewSchema,
  selfRating: reviewAttemptRatingEnum,
  effectiveRating: reviewAttemptRatingEnum,
  reviewState: z.object({
    id: z.string(),
    wordId: z.string(),
    interval: z.number(),
    easeFactor: z.number(),
    repetitions: z.number(),
    lapses: z.number(),
    dueAt: z.string(),
    lastReviewedAt: z.string().nullable(),
  }),
  learningProgress: z.object({
    wordId: z.string(),
    status: z.string(),
    recognitionScore: z.number(),
    recallScore: z.number(),
    productionScore: z.number(),
  }),
  reviewLog: z.object({
    id: z.string(),
    wordId: z.string(),
    reviewType: z.string(),
    rating: reviewAttemptRatingEnum,
    answer: z.string().nullable(),
    correct: z.boolean().nullable(),
    responseTime: z.number().nullable(),
    createdAt: z.string(),
  }),
});
