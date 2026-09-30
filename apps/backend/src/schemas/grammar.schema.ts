/**
 * @file grammar.schema.ts
 * @description Strict, bounded input schemas for grammar lesson routes and answer submissions.
 */
import { z } from 'zod';

const grammarContentIdSchema = z.string()
  .min(1)
  .max(120)
  .regex(/^grammar-(?:0|a1|a2|b1|b2|c1|c2)-[a-z0-9]+(?:-[a-z0-9]+)*$/)
  .refine((value) => value.trim().length > 0);

export const grammarLessonParamsSchema = z.object({
  lessonId: grammarContentIdSchema,
}).strict();

const grammarAnswerSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('choice'), text: z.string().min(1).max(2000).refine((value) => value.trim().length > 0) }).strict(),
  z.object({ type: z.literal('text'), text: z.string().min(1).max(2000).refine((value) => value.trim().length > 0) }).strict(),
]);

export const submitGrammarAnswerSchema = z.object({
  requestId: z.string().min(1).max(100).refine((value) => value.trim().length > 0),
  exerciseId: grammarContentIdSchema,
  answer: grammarAnswerSchema,
}).strict();

export type GrammarLessonParams = z.infer<typeof grammarLessonParamsSchema>;
export type SubmitGrammarAnswerInput = z.infer<typeof submitGrammarAnswerSchema>;
