/**
 * @file study.schema.ts
 * @description Study calendar request validation and shared domain contracts.
 */
import { z } from 'zod';
import { isCivilDate, isTimeZone } from '../domain/study/calendar-date.js';

export const civilDateSchema = z.string().refine(isCivilDate, 'Invalid civil date');
export type CivilDate = z.infer<typeof civilDateSchema>;
export const timeZoneSchema = z.string().refine(isTimeZone, 'Invalid IANA timezone');
const idSchema = z.string().min(1).max(100);
const safeCount = z.number().int().min(0).max(Number.MAX_SAFE_INTEGER);
const versionSchema = z.number().int().min(1).max(Number.MAX_SAFE_INTEGER);

export const studyPreferencesInputSchema = z.object({
  timeZone: timeZoneSchema,
  studyDays: z.array(z.number().int().min(1).max(7)).max(7)
    .refine(days => new Set(days).size === days.length, 'Duplicate study weekdays'),
  learningTarget: safeCount, reviewTarget: safeCount, grammarTarget: z.union([z.literal(0), z.literal(1)]),
}).strict();
export const studyPreferencesSchema = studyPreferencesInputSchema.extend({
  id: z.literal('local'), updatedAt: z.string().datetime(),
});
export type StudyPreferencesInput = z.infer<typeof studyPreferencesInputSchema>;
export type StudyPreferences = z.infer<typeof studyPreferencesSchema>;

const learningParams = z.object({
  kind: z.literal('LEARN_WORDS'), mode: z.enum(['new_words', 'context', 'topic', 'weak_words']),
  contextId: idSchema.optional(), topicId: idSchema.optional(),
}).strict();
const reviewParams = z.object({ kind: z.literal('REVIEW_WORDS') }).strict();
const grammarParams = z.object({
  kind: z.literal('GRAMMAR'), lessonId: idSchema.nullable(),
  revisionId: idSchema.nullable(), revision: z.string().min(1).max(200).nullable(),
}).strict();
const paramsUnion = z.discriminatedUnion('kind', [learningParams, reviewParams, grammarParams]);
export type TaskParams = z.infer<typeof paramsUnion>;

function validateParams(value: TaskParams, context: z.RefinementCtx): void {
  if (value.kind === 'LEARN_WORDS') {
    if (value.mode === 'context' && !value.contextId) context.addIssue({ code: 'custom', path: ['contextId'], message: 'Context is required' });
    if (value.mode === 'topic' && !value.topicId) context.addIssue({ code: 'custom', path: ['topicId'], message: 'Topic is required' });
    if (value.mode !== 'context' && value.contextId) context.addIssue({ code: 'custom', path: ['contextId'], message: 'Context is not allowed for this mode' });
    if (value.mode !== 'topic' && value.topicId) context.addIssue({ code: 'custom', path: ['topicId'], message: 'Topic is not allowed for this mode' });
  } else if (value.kind === 'GRAMMAR') {
    const bound = [value.lessonId, value.revisionId, value.revision].filter(v => v !== null).length;
    if (bound !== 0 && bound !== 3) context.addIssue({ code: 'custom', message: 'Grammar lesson and revision must be bound together' });
  }
}
export const taskParamsSchema = paramsUnion.superRefine(validateParams);
const taskInputFields = {
  id: idSchema, scheduledDate: civilDateSchema, targetCount: safeCount.min(1), source: z.enum(['AUTO', 'MANUAL']),
};
export const studyTaskInputSchema = z.discriminatedUnion('kind', [
  learningParams.extend(taskInputFields), reviewParams.extend(taskInputFields),
  grammarParams.extend({ ...taskInputFields, targetCount: z.literal(1) }),
]).superRefine(validateParams);
export type StudyTaskInput = z.infer<typeof studyTaskInputSchema>;
export type StudyTask = StudyTaskInput & {
  version: number; createdAt: string; updatedAt: string; cancelledAt: string | null;
  transferredAt: string | null; transferredToTaskId: string | null; transferredCount: number;
};

export const taskPatchSchema = z.discriminatedUnion('action', [
  z.object({ action: z.literal('EDIT'), version: versionSchema, scheduledDate: civilDateSchema.optional(),
    targetCount: safeCount.min(1).optional(), params: taskParamsSchema.optional() }).strict(),
  z.object({ action: z.literal('CANCEL'), version: versionSchema }).strict(),
  z.object({ action: z.literal('MOVE'), version: versionSchema, scheduledDate: civilDateSchema,
    destinationId: idSchema, destinationVersion: versionSchema.nullable() }).strict(),
]).superRefine((value, context) => {
  if (value.action === 'EDIT' && value.scheduledDate === undefined && value.targetCount === undefined && value.params === undefined) {
    context.addIssue({ code: 'custom', message: 'An edit must change a task field' });
  }
});
export type TaskPatch = z.infer<typeof taskPatchSchema>;
export const studyCalendarQuerySchema = z.object({ from: civilDateSchema, to: civilDateSchema }).strict()
  .superRefine((value, context) => {
    if (!isCivilDate(value.from) || !isCivilDate(value.to)) return;
    const difference = new Date(`${value.to}T00:00:00Z`).getTime() - new Date(`${value.from}T00:00:00Z`).getTime();
    if (difference < 0 || difference > 41 * 86_400_000) context.addIssue({ code: 'custom', message: 'Calendar range must contain 1–42 days' });
  });
export const studyTaskIdSchema = z.object({ id: idSchema }).strict();
export const studyPlanPreviewInputSchema = z.object({}).strict();
export type StudyTaskView = StudyTask & {
  completedCount: number; onTimeCount: number; isComplete: boolean; isLate: boolean;
  isUnavailable: boolean; unavailableReason: string | null; activeSessionId: string | null;
};
export type TaskWriteResult = { task: StudyTask; destination: StudyTask | null };
export type TaskMutationResult = { task: StudyTaskView; destination: StudyTaskView | null };
export type DayStatus = 'NO_PLAN' | 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'PARTIAL' | 'MISSED' | 'CANCELLED';
export type DayStatusInput = {
  isPast: boolean; taskCount: number; effectiveTaskCount: number; completedOnTimeTaskCount: number;
  hasActivity: boolean; hasQualifyingEvidence: boolean; hasTransferredRemainder: boolean;
};
export type StudyActivity = {
  kind: 'LEARN_WORDS' | 'REVIEW_WORDS' | 'GRAMMAR'; referenceId: string; occurredAt: string;
  wordCount: number | null; lessonId: string | null; studyTaskId: string | null;
  isOutsidePlan: boolean; isIncomplete: boolean; isLate: boolean;
};
export type StudyCalendarDay = {
  date: CivilDate; status: DayStatus; tasks: StudyTaskView[]; activities: StudyActivity[];
  scheduledDueCount: number | null; dueNowCount: number | null; dueLaterTodayCount: number | null;
  isStudyDay: boolean;
};
export type StudyCalendarResult = {
  timeZone: string; today: CivilDate; generatedAt: string; backlogCount: number; days: StudyCalendarDay[];
};
export type StudyPlanPreview = {
  timeZone: string; generatedAt: string; from: CivilDate; to: CivilDate; tasks: StudyTaskInput[];
  warnings: Array<{ code: 'BACKLOG_EXCEEDS_TARGET' | 'INSUFFICIENT_CONTENT' | 'FUTURE_DUE_SNAPSHOT';
    date: CivilDate | null; availableCount: number | null }>;
};
