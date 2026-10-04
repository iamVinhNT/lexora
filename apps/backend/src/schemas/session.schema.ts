/**
 * @file session.schema.ts
 * @description Zod schemas and TypeScript types for learning sessions and cognitive steps.
 */

import { z } from 'zod';

export const SessionModeEnum = z.enum([
  'new_words',
  'context',
  'topic',
  'weak_words',
  'daily_plan',
]);

export type SessionMode = z.infer<typeof SessionModeEnum>;

export const SessionStepEnum = z.enum([
  'CONTEXT',
  'UNDERSTAND',
  'RECALL',
  'OUTPUT',
  'ASSESS',
]);

export type SessionStep = z.infer<typeof SessionStepEnum>;

export const AssessmentRatingEnum = z.enum([
  'AGAIN',
  'HARD',
  'GOOD',
  'EASY',
]);

export type AssessmentRating = z.infer<typeof AssessmentRatingEnum>;

export const startSessionSchema = z.object({
  mode: SessionModeEnum,
  count: z.coerce.number().int().min(1).max(50).default(10),
  contextId: z.string().min(1).optional(),
  topicId: z.string().min(1).optional(),
  studyTaskId: z.string().min(1).optional(),
}).strict();

export const submitStepSchema = z.object({
  requestId: z.string().min(1).max(100),
  wordId: z.string().min(1),
  step: SessionStepEnum,
  answer: z.string().max(2000).optional(),
  assessmentRating: AssessmentRatingEnum.optional(),
}).strict();

export type StartSessionInput = z.infer<typeof startSessionSchema>;
export type SubmitStepInput = z.infer<typeof submitStepSchema>;
