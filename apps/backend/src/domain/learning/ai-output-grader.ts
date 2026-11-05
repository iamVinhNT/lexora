/**
 * @file ai-output-grader.ts
 * @description Domain contracts and validation schema for learning output grading.
 */
import { z } from 'zod';

export const outputGradeSchema = z.object({
  score: z.number().int().min(0).max(100),
  explanation: z.string().min(1).max(1000),
  suggestion: z.string().min(1).max(1000),
}).strict();
export type OutputGrade = z.infer<typeof outputGradeSchema>;
export const outputBatchGradeSchema = z.object({
  grades: z.array(z.object({
    id: z.string().min(1),
    score: z.number().int().min(0).max(100),
    explanation: z.string().min(1).max(1000),
    suggestion: z.string().min(1).max(1000),
  }).strict()),
}).strict();
export type OutputBatchGrade = z.infer<typeof outputBatchGradeSchema>['grades'][number];
export type OutputGradeInput = { word: string; definition: string; sentence: string };
export type OutputBatchGradeInput = OutputGradeInput & { id: string };
export interface OutputGrader {
  grade(input: OutputGradeInput): Promise<OutputGrade>;
  /** Grades every sentence in one provider call. Callers fall back to `grade` per sentence when absent. */
  gradeBatch?(inputs: OutputBatchGradeInput[]): Promise<OutputBatchGrade[]>;
}
