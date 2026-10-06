/**
 * @file grammar-practice.schema.ts
 * @description Strict bounded grammar practice requests and offset-paginated history queries.
 */
import {z} from 'zod';
const id=z.string().trim().min(1).max(200);
const text=z.string().trim().min(1).max(2000);
export const submitGrammarReviewSchema=z.object({requestId:id,lessonId:id,revisionId:id,exerciseId:id,
 answer:z.object({type:z.enum(['choice','text']),text}).strict(),
}).strict();
export type SubmitGrammarReviewInput=z.infer<typeof submitGrammarReviewSchema>;
export const submitGrammarOutputSchema=z.object({requestId:id,lessonId:id,revisionId:id,promptId:id,text,
 rubric:z.object({form:z.number().int().min(0).max(2),meaning:z.number().int().min(0).max(2),use:z.number().int().min(0).max(2)}).strict(),
}).strict();
export type SubmitGrammarOutputInput=z.infer<typeof submitGrammarOutputSchema>;
export const grammarPracticeHistoryQuerySchema=z.object({lessonId:id.optional(),revisionId:id.optional(),
 limit:z.coerce.number().int().min(1).max(100).default(50),offset:z.coerce.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER).default(0),
}).strict();
export type GrammarPracticeHistoryQuery=z.infer<typeof grammarPracticeHistoryQuerySchema>;
