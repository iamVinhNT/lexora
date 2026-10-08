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
export type OutputGradeInput = { word: string; definition: string; sentence: string };
export interface OutputGrader { grade(input: OutputGradeInput): Promise<OutputGrade> }
