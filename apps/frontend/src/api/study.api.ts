/**
 * @file study.api.ts
 * @description Typed study preferences, calendar, preview, and task endpoints.
 */
import { apiFetch } from './client';

export type CivilDate = string;
export type StudyPreferencesInput = {
  timeZone: string;
  studyDays: number[];
  learningTarget: number;
  reviewTarget: number;
  grammarTarget: 0 | 1;
};
export type StudyPreferences = StudyPreferencesInput & { id: 'local'; updatedAt: string };
export type TaskParams =
  | { kind: 'LEARN_WORDS'; mode: 'new_words' | 'context' | 'topic' | 'weak_words'; contextId?: string; topicId?: string }
  | { kind: 'REVIEW_WORDS' }
  | { kind: 'GRAMMAR'; lessonId: string | null; revisionId: string | null; revision: string | null };
export type StudyTaskInput = TaskParams & {
  id: string;
  scheduledDate: CivilDate;
  targetCount: number;
  source: 'AUTO' | 'MANUAL';
};
export type StudyTask = StudyTaskInput & {
  version: number;
  createdAt: string;
  updatedAt: string;
  cancelledAt: string | null;
  transferredAt: string | null;
  transferredToTaskId: string | null;
  transferredCount: number;
};
export type TaskPatch =
  | { action: 'EDIT'; version: number; scheduledDate?: CivilDate; targetCount?: number; params?: TaskParams }
  | { action: 'CANCEL'; version: number }
  | { action: 'MOVE'; version: number; scheduledDate: CivilDate; destinationId: string; destinationVersion: number | null };
export type StudyTaskView = StudyTask & {
  completedCount: number;
  onTimeCount: number;
  isComplete: boolean;
  isLate: boolean;
  isUnavailable: boolean;
  unavailableReason: string | null;
  activeSessionId: string | null;
};
export type TaskWriteResult = { task: StudyTask; destination: StudyTask | null };
export type TaskMutationResult = { task: StudyTaskView; destination: StudyTaskView | null };
export type DayStatus = 'NO_PLAN' | 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'PARTIAL' | 'MISSED' | 'CANCELLED';
export type DayStatusInput = {
  isPast: boolean;
  taskCount: number;
  effectiveTaskCount: number;
  completedOnTimeTaskCount: number;
  hasActivity: boolean;
  hasQualifyingEvidence: boolean;
  hasTransferredRemainder: boolean;
};
export type StudyActivity = {
  kind: 'LEARN_WORDS' | 'REVIEW_WORDS' | 'GRAMMAR';
  referenceId: string;
  occurredAt: string;
  wordCount: number | null;
  lessonId: string | null;
  studyTaskId: string | null;
  isOutsidePlan: boolean;
  isIncomplete: boolean;
  isLate: boolean;
};
export type StudyCalendarDay = {
  date: CivilDate;
  status: DayStatus;
  tasks: StudyTaskView[];
  activities: StudyActivity[];
  scheduledDueCount: number | null;
  dueNowCount: number | null;
  dueLaterTodayCount: number | null;
  isStudyDay: boolean;
};
export type StudyCalendarResult = {
  timeZone: string;
  today: CivilDate;
  generatedAt: string;
  backlogCount: number;
  days: StudyCalendarDay[];
};
export type StudyPlanPreview = {
  timeZone: string;
  generatedAt: string;
  from: CivilDate;
  to: CivilDate;
  tasks: StudyTaskInput[];
  warnings: Array<{
    code: 'BACKLOG_EXCEEDS_TARGET' | 'INSUFFICIENT_CONTENT' | 'FUTURE_DUE_SNAPSHOT';
    date: CivilDate | null;
    availableCount: number | null;
  }>;
};

export function getStudyPreferences() {
  return apiFetch<StudyPreferences | null>('/api/study-preferences');
}

export function putStudyPreferences(input: StudyPreferencesInput) {
  return apiFetch<StudyPreferences>('/api/study-preferences', { method: 'PUT', body: input });
}

export function getStudyCalendar(from: CivilDate, to: CivilDate) {
  return apiFetch<StudyCalendarResult>('/api/study-calendar', { query: { from, to } });
}

export function getStudyTask(id: string) {
  return apiFetch<StudyTaskView>(`/api/study-tasks/${encodeURIComponent(id)}`);
}

export function previewStudyPlan() {
  return apiFetch<StudyPlanPreview>('/api/study-plan-previews', { method: 'POST', body: {} });
}

export function createStudyTask(input: StudyTaskInput) {
  return apiFetch<StudyTaskView>('/api/study-tasks', { method: 'POST', body: input });
}

export function patchStudyTask(id: string, patch: TaskPatch) {
  return apiFetch<TaskMutationResult>(`/api/study-tasks/${encodeURIComponent(id)}`, { method: 'PATCH', body: patch });
}
