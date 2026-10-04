/**
 * @file ai-study-planner.schema.ts
 * @description Strict request, provider DTO, and id-free preview contracts for AI study planning.
 */
import { z } from 'zod';
import { civilDateSchema } from './study.schema.js';

const id = z.string().min(1).max(100);
const mode = z.enum(['new_words', 'context', 'topic', 'weak_words']);
const taskKind = z.enum(['LEARN_WORDS', 'REVIEW_WORDS', 'GRAMMAR']);
const safePositiveCount = z.number().int().min(1).max(Number.MAX_SAFE_INTEGER);

export const aiStudyPlannerRequestSchema = z.object({ locale: z.enum(['en', 'vi']) }).strict();
export type AiStudyPlannerRequest = z.infer<typeof aiStudyPlannerRequestSchema>;

/** Provider output is intentionally flat so every key is required under strict structured-output mode. */
export const aiStudyPlannerModelOutputSchema = z.object({
  suggestions: z.array(z.object({
    kind: taskKind,
    scheduledDate: z.string(),
    mode: mode.nullable(),
    contextId: id.nullable(),
    topicId: id.nullable(),
    lessonId: id.nullable(),
    revisionId: id.nullable(),
    targetCount: safePositiveCount,
  }).strict()).max(21),
}).strict();
export type AiStudyPlannerModelOutput = z.infer<typeof aiStudyPlannerModelOutputSchema>;

const learnSuggestionSchema = z.object({
  kind: z.literal('LEARN_WORDS'),
  scheduledDate: civilDateSchema,
  mode,
  contextId: id.optional(),
  topicId: id.optional(),
  targetCount: safePositiveCount,
}).strict().superRefine((suggestion, context) => {
  if (suggestion.mode === 'context' && !suggestion.contextId) {
    context.addIssue({ code: 'custom', path: ['contextId'], message: 'Context is required' });
  }
  if (suggestion.mode === 'topic' && !suggestion.topicId) {
    context.addIssue({ code: 'custom', path: ['topicId'], message: 'Topic is required' });
  }
  if (suggestion.mode !== 'context' && suggestion.contextId) {
    context.addIssue({ code: 'custom', path: ['contextId'], message: 'Context is not allowed for this mode' });
  }
  if (suggestion.mode !== 'topic' && suggestion.topicId) {
    context.addIssue({ code: 'custom', path: ['topicId'], message: 'Topic is not allowed for this mode' });
  }
});
const reviewSuggestionSchema = z.object({ kind: z.literal('REVIEW_WORDS'), scheduledDate: civilDateSchema, targetCount: safePositiveCount }).strict();
const grammarSuggestionSchema = z.object({
  kind: z.literal('GRAMMAR'), scheduledDate: civilDateSchema, lessonId: id, revisionId: id,
  revision: z.string().min(1).max(200), targetCount: z.literal(1),
}).strict();

const candidateCount = z.number().int().min(0).max(Number.MAX_SAFE_INTEGER);
const learningModeCandidateSchema = z.object({ mode: z.enum(['new_words', 'weak_words']), availableCount: candidateCount, maxQuantity: candidateCount }).strict();
const selectorCandidateSchema = z.object({ id, title: z.string(), availableCount: candidateCount, maxQuantity: candidateCount }).strict();
const grammarCandidateSchema = z.object({ lessonId: id, revisionId: id, revision: z.string().min(1).max(200), title: z.string(), maxQuantity: z.literal(1) }).strict();

export const aiStudyPlanPreviewSchema = z.object({
  timeZone: z.string().min(1),
  generatedAt: z.string().datetime(),
  from: civilDateSchema,
  to: civilDateSchema,
  suggestions: z.array(z.union([learnSuggestionSchema, reviewSuggestionSchema, grammarSuggestionSchema])).max(21),
  choices: z.object({
    days: z.array(z.object({ date: civilDateSchema, isStudyDay: z.boolean() }).strict()).length(7),
    dueCounts: z.array(z.object({ date: civilDateSchema, availableCount: candidateCount, maxQuantity: candidateCount }).strict()).length(7),
    learningModes: z.array(learningModeCandidateSchema),
    contexts: z.array(selectorCandidateSchema),
    topics: z.array(selectorCandidateSchema),
    grammar: z.array(grammarCandidateSchema),
    occupiedSlots: z.array(z.object({ date: civilDateSchema, kind: taskKind, lessonId: id.nullable() }).strict()),
  }).strict(),
}).strict();
export type AiStudyPlanSuggestion = z.infer<typeof aiStudyPlanPreviewSchema>['suggestions'][number];
export type AiStudyPlanPreview = z.infer<typeof aiStudyPlanPreviewSchema>;
export interface AiStudyPlannerProviderInput {
  locale: 'en' | 'vi';
  preferences: { timeZone: string; studyDays: number[]; learningTarget: number; reviewTarget: number; grammarTarget: 0 | 1 };
  range: { from: string; to: string };
  days: Array<{ date: string; status: string; isStudyDay: boolean }>;
  backlogCount: number;
  dueCounts: Array<{ date: string; scheduledDueCount: number; availableCount: number; maxQuantity: number }>;
  aggregateWordCounts: { newWords: number; weakWords: number };
  recentActivity: Array<{ date: string; kind: 'LEARN_WORDS' | 'REVIEW_WORDS' | 'GRAMMAR'; activityCount: number; wordCount: number }>;
  existingTasks: Array<{
    id: string; scheduledDate: string; kind: 'LEARN_WORDS' | 'REVIEW_WORDS' | 'GRAMMAR'; mode: string | null;
    contextId: string | null; topicId: string | null; lessonId: string | null; revisionId: string | null;
    targetCount: number; completedCount: number; cancelled: boolean; transferred: boolean;
  }>;
  candidates: {
    learningModes: Array<{ mode: 'new_words' | 'weak_words'; availableCount: number; maxQuantity: number }>;
    contexts: Array<{ id: string; title: string; availableCount: number; maxQuantity: number }>;
    topics: Array<{ id: string; title: string; availableCount: number; maxQuantity: number }>;
    grammar: Array<{ lessonId: string; revisionId: string; revision: string; title: string; maxQuantity: 1 }>;
  };
}
