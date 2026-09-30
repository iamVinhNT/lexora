/**
 * @file grammar-tutor.schema.ts
 * @description Strict bounds for grammar tutoring requests and structured responses.
 */

import { z } from 'zod';

const grammarTutorInputTextSchema = z.string().min(1).max(500).refine((value) => value.trim().length > 0);
const grammarTutorOutputTextSchema = z.string().min(1).max(1600).refine((value) => value.trim().length > 0);

export const grammarTutorRequestSchema = z.object({
  question: grammarTutorInputTextSchema,
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: grammarTutorInputTextSchema,
  }).strict()).max(8).optional(),
}).strict();

export const grammarTutorResponseSchema = z.object({
  explanation: grammarTutorOutputTextSchema,
  contrast: grammarTutorOutputTextSchema,
}).strict();

export type GrammarTutorRequest = z.infer<typeof grammarTutorRequestSchema>;
export type GrammarTutorResponse = z.infer<typeof grammarTutorResponseSchema>;
