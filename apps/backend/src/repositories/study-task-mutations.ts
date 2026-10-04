/**
 * @file study-task-mutations.ts
 * @description Atomic study-task edit, cancel, move, and transfer behavior.
 */
import { and, eq, sql } from 'drizzle-orm';
import type { AppDatabase } from '../db/client.js';
import { grammarExerciseAttempts, learningSessions, learningSessionItems, reviewLogs, studyTasks, studyPreferences } from '../db/schema.js';
import { taskPatchSchema, type StudyTask, type TaskPatch, type TaskWriteResult, type TaskParams } from '../schemas/study.schema.js';
import { civilDateAt } from '../domain/study/calendar-date.js';
import { ConflictError, NotFoundError, ValidationError } from '../services/vocabulary.service.js';

type Executor = Pick<AppDatabase, 'select' | 'insert' | 'update'>;
type Row = typeof studyTasks.$inferSelect;

function failConflict(message: string, reason = 'CONFLICT', details?: Record<string, unknown>): never {
  throw new ConflictError(message, { ...details, reason });
}
export function studyTaskFromRow(row: Row): StudyTask {
  const base = {
    id: row.id, scheduledDate: row.scheduledDate, targetCount: row.targetCount, source: row.source as 'AUTO' | 'MANUAL',
    version: row.version, createdAt: row.createdAt, updatedAt: row.updatedAt, cancelledAt: row.cancelledAt,
    transferredAt: row.transferredAt, transferredToTaskId: row.transferredToTaskId, transferredCount: row.transferredCount,
  };
  if (row.kind === 'LEARN_WORDS') return { ...base, kind: 'LEARN_WORDS', mode: row.mode as 'new_words' | 'context' | 'topic' | 'weak_words', ...(row.contextId ? { contextId: row.contextId } : {}), ...(row.topicId ? { topicId: row.topicId } : {}) };
  if (row.kind === 'REVIEW_WORDS') return { ...base, kind: 'REVIEW_WORDS' };
  return { ...base, kind: 'GRAMMAR', lessonId: row.lessonId, revisionId: row.revisionId, revision: row.revision, targetCount: 1 };
}
function intent(value: unknown): string { return JSON.stringify(value); }
function params(task: StudyTask): TaskParams {
  if (task.kind === 'LEARN_WORDS') return { kind: task.kind, mode: task.mode, ...(task.contextId ? { contextId: task.contextId } : {}), ...(task.topicId ? { topicId: task.topicId } : {}) };
  if (task.kind === 'REVIEW_WORDS') return { kind: task.kind };
  return { kind: task.kind, lessonId: task.lessonId, revisionId: task.revisionId, revision: task.revision };
}
function rowValues(task: StudyTask, createdAt: string, creationIntent: string) {
  const p = params(task);
  return {
    id: task.id, scheduledDate: task.scheduledDate, kind: task.kind, targetCount: task.targetCount, source: task.source,
    mode: p.kind === 'LEARN_WORDS' ? p.mode : null,
    contextId: p.kind === 'LEARN_WORDS' ? p.contextId ?? null : null,
    topicId: p.kind === 'LEARN_WORDS' ? p.topicId ?? null : null,
    lessonId: p.kind === 'GRAMMAR' ? p.lessonId : null, revisionId: p.kind === 'GRAMMAR' ? p.revisionId : null,
    revision: p.kind === 'GRAMMAR' ? p.revision : null, version: task.version, createdAt, updatedAt: createdAt,
    cancelledAt: null, transferredAt: null, transferredToTaskId: null, transferredCount: 0, creationIntent,
  };
}
function completedCount(executor: Executor, task: StudyTask): number {
  if (task.kind === 'LEARN_WORDS') {
    const row = executor.select({ count: sql<number>`count(distinct ${learningSessionItems.wordId})` }).from(learningSessionItems)
      .innerJoin(learningSessions, eq(learningSessions.id, learningSessionItems.sessionId))
      .where(and(eq(learningSessions.studyTaskId, task.id), eq(learningSessions.status, 'COMPLETED'))).all()[0];
    return Number(row?.count ?? 0);
  }
  if (task.kind === 'REVIEW_WORDS') {
    const row = executor.select({ count: sql<number>`count(distinct ${reviewLogs.wordId})` }).from(reviewLogs)
      .where(eq(reviewLogs.studyTaskId, task.id)).all()[0];
    return Number(row?.count ?? 0);
  }
  return executor.select({ id: grammarExerciseAttempts.id }).from(grammarExerciseAttempts)
    .where(and(eq(grammarExerciseAttempts.studyTaskId, task.id), eq(grammarExerciseAttempts.completedLesson, true))).limit(1).all().length;
}
function activeSession(executor: Executor, taskId: string): boolean {
  return executor.select({ id: learningSessions.id }).from(learningSessions)
    .where(and(eq(learningSessions.studyTaskId, taskId), eq(learningSessions.status, 'IN_PROGRESS'))).limit(1).all().length > 0;
}
function activeRow(executor: Executor, id: string): Row | undefined {
  return executor.select().from(studyTasks).where(eq(studyTasks.id, id)).all()[0];
}
function sameParams(a: StudyTask, b: StudyTask): boolean { return intent(params(a)) === intent(params(b)); }

export function applyTaskPatch(executor: Executor, task: StudyTask, input: TaskPatch, now: string): TaskWriteResult {
  const current = activeRow(executor, task.id);
  if (!current) throw new NotFoundError(`Study task "${task.id}" not found`);
  const transferIntent = input.action === 'MOVE' ? intent(input) : null;
  if (input.action === 'MOVE' && current.transferIntent !== null
    && (current.transferIntent === transferIntent || intent(taskPatchSchema.parse(JSON.parse(current.transferIntent))) === transferIntent)) {
    const destination = current.transferredToTaskId ? activeRow(executor, current.transferredToTaskId) : undefined;
    return { task: studyTaskFromRow(current), destination: destination ? studyTaskFromRow(destination) : null };
  }
  if (current.version !== input.version) failConflict('Study task changed; reload before retrying', 'STALE_TASK_VERSION', { expectedVersion: current.version });
  if (current.version === Number.MAX_SAFE_INTEGER) failConflict('Task version cannot be incremented safely', 'INSUFFICIENT_CAPACITY');
  const live = studyTaskFromRow(current);
  if (current.cancelledAt || current.transferredAt) failConflict('Cancelled or transferred tasks cannot be changed', 'TASK_UNAVAILABLE');
  const prefs = executor.select().from(studyPreferences).where(eq(studyPreferences.id, 'local')).all()[0];
  const today = civilDateAt(now, prefs?.timeZone ?? 'UTC');
  if (input.action === 'EDIT' && live.scheduledDate < today) failConflict('Past study targets cannot be edited', 'PAST_TASK_LOCKED');
  if (input.action !== 'CANCEL' && input.scheduledDate !== undefined && input.scheduledDate < today) failConflict('Tasks can only move to today or a future day', 'PAST_TASK_LOCKED');
  if (input.action === 'EDIT') {
    if (activeSession(executor, live.id) && ((input.scheduledDate !== undefined && input.scheduledDate !== live.scheduledDate) || (input.params !== undefined && intent(input.params) !== intent(params(live))))) {
      failConflict('Task with an active session cannot change date or content', 'ACTIVE_SESSION_EXISTS');
    }
    const nextParams = input.params ?? params(live);
    const next = { ...live, ...(input.scheduledDate ? { scheduledDate: input.scheduledDate } : {}), ...(input.targetCount ? { targetCount: input.targetCount } : {}), ...nextParams, version: live.version + 1, updatedAt: now } as StudyTask;
    if (next.kind === 'GRAMMAR') {
      if (input.targetCount !== undefined && input.targetCount !== 1) throw new ValidationError('Grammar task quota must be one');
      next.targetCount = 1;
    }
    const completed = completedCount(executor, live);
    if (next.targetCount < completed) failConflict('Target cannot be below completed progress', 'TARGET_BELOW_PROGRESS', { completedCount: completed });
    const hasEvidence = executor.select({ value: sql<number>`
      EXISTS(SELECT 1 FROM ${learningSessions} WHERE ${learningSessions.studyTaskId} = ${live.id})
      OR EXISTS(SELECT 1 FROM ${reviewLogs} WHERE ${reviewLogs.studyTaskId} = ${live.id})
      OR EXISTS(SELECT 1 FROM ${grammarExerciseAttempts} WHERE ${grammarExerciseAttempts.studyTaskId} = ${live.id})
    ` }).from(studyTasks).where(eq(studyTasks.id, live.id)).all()[0]?.value;
    if (hasEvidence && input.scheduledDate !== undefined && input.scheduledDate !== live.scheduledDate) failConflict('Tasks with evidence must use MOVE to change scheduled date', 'MOVE_REQUIRED');
    if (hasEvidence && input.params !== undefined && intent(nextParams) !== intent(params(live))) failConflict('Task parameters cannot change after evidence exists', 'INCOMPATIBLE_TASK');
    const collision = executor.select().from(studyTasks).where(and(eq(studyTasks.scheduledDate, next.scheduledDate), eq(studyTasks.kind, next.kind))).all()
      .some(row => row.id !== live.id && !row.cancelledAt && !row.transferredAt
        && (next.kind !== 'GRAMMAR' || (next.lessonId !== null && row.lessonId === next.lessonId)));
    if (collision) failConflict('A task already occupies this daily quota', next.kind === 'GRAMMAR' ? 'GRAMMAR_QUOTA_CONFLICT' : 'DAILY_TASK_EXISTS', { availableCount: 0 });
    const changed = executor.update(studyTasks).set({ scheduledDate: next.scheduledDate, targetCount: next.targetCount, kind: next.kind,
      mode: next.kind === 'LEARN_WORDS' ? next.mode : null, contextId: next.kind === 'LEARN_WORDS' ? next.contextId ?? null : null,
      topicId: next.kind === 'LEARN_WORDS' ? next.topicId ?? null : null,
      lessonId: next.kind === 'GRAMMAR' ? next.lessonId : null, revisionId: next.kind === 'GRAMMAR' ? next.revisionId : null,
      revision: next.kind === 'GRAMMAR' ? next.revision : null, version: next.version, updatedAt: now })
      .where(and(eq(studyTasks.id, live.id), eq(studyTasks.version, input.version))).run();
    if (Number(changed.changes) !== 1) failConflict('Study task changed; reload before retrying', 'STALE_TASK_VERSION');
    return { task: studyTaskFromRow(activeRow(executor, live.id)!), destination: null };
  }
  if (input.action === 'CANCEL') {
    if (activeSession(executor, live.id)) failConflict('Task with an active session cannot be cancelled', 'ACTIVE_SESSION_EXISTS');
    const changed = executor.update(studyTasks).set({ cancelledAt: now, updatedAt: now, version: live.version + 1 })
      .where(and(eq(studyTasks.id, live.id), eq(studyTasks.version, input.version))).run();
    if (Number(changed.changes) !== 1) failConflict('Study task changed; reload before retrying', 'STALE_TASK_VERSION');
    return { task: studyTaskFromRow(activeRow(executor, live.id)!), destination: null };
  }
  if (activeSession(executor, live.id)) failConflict('Task with an active session cannot be moved', 'ACTIVE_SESSION_EXISTS');
  const done = completedCount(executor, live);
  const remaining = Math.max(0, live.targetCount - done);
  const eligibleToReschedule = done === 0 && live.scheduledDate >= today;
  if (eligibleToReschedule) {
    if (input.destinationVersion !== null) failConflict('Reschedule does not merge into a destination', 'INCOMPATIBLE_TASK');
    const occupied = executor.select().from(studyTasks).where(and(eq(studyTasks.scheduledDate, input.scheduledDate), eq(studyTasks.kind, live.kind))).all()
      .some(row => row.id !== live.id && !row.cancelledAt && !row.transferredAt
        && (live.kind !== 'GRAMMAR' || (live.lessonId !== null && row.lessonId === live.lessonId && row.revisionId === live.revisionId)));
    if (occupied) failConflict('A task of this kind already exists on the destination date', live.kind === 'GRAMMAR' ? 'GRAMMAR_QUOTA_CONFLICT' : 'DAILY_TASK_EXISTS', { availableCount: 0, scheduledDate: input.scheduledDate });
    executor.update(studyTasks).set({ scheduledDate: input.scheduledDate, updatedAt: now, version: live.version + 1, transferIntent })
      .where(and(eq(studyTasks.id, live.id), eq(studyTasks.version, input.version))).run();
    return { task: studyTaskFromRow(activeRow(executor, live.id)!), destination: null };
  }
  if (remaining === 0) failConflict('Completed task has no work to transfer', 'NO_REMAINING_WORK');
  const destRow = activeRow(executor, input.destinationId);
  let destination: StudyTask;
  if (destRow) {
    if (destRow.id === live.id) failConflict('Task cannot be transferred into itself', 'INCOMPATIBLE_TASK');
    const target = studyTaskFromRow(destRow);
    if (destRow.cancelledAt || destRow.transferredAt || target.scheduledDate !== input.scheduledDate || input.destinationVersion !== target.version || !sameParams(live, target)) {
      failConflict('Destination task is not compatible', 'INCOMPATIBLE_TASK');
    }
    if (target.kind === 'GRAMMAR') failConflict('Grammar daily quota allows one task per lesson', 'GRAMMAR_QUOTA_CONFLICT', { availableCount: 0 });
    if (target.version === Number.MAX_SAFE_INTEGER) failConflict('Destination version cannot be incremented safely', 'INSUFFICIENT_CAPACITY');
    const availableCount = Number.MAX_SAFE_INTEGER - target.targetCount;
    if (remaining > availableCount) failConflict('Destination quota cannot contain transferred work', 'INSUFFICIENT_CAPACITY', { availableCount });
    const changed = executor.update(studyTasks).set({ targetCount: target.targetCount + remaining, updatedAt: now, version: target.version + 1 })
      .where(and(eq(studyTasks.id, target.id), eq(studyTasks.version, target.version))).run();
    if (Number(changed.changes) !== 1) failConflict('Destination task changed; reload before retrying', 'STALE_TASK_VERSION');
    destination = studyTaskFromRow(activeRow(executor, target.id)!);
  } else {
    if (input.destinationVersion !== null) failConflict('Destination task not found', 'DESTINATION_NOT_FOUND');
    const occupied = executor.select().from(studyTasks).where(and(eq(studyTasks.kind, live.kind), eq(studyTasks.scheduledDate, input.scheduledDate))).all()
      .some(row => !row.cancelledAt && !row.transferredAt
        && (live.kind !== 'GRAMMAR' || (live.lessonId !== null && row.lessonId === live.lessonId && row.revisionId === live.revisionId)));
    if (occupied) failConflict('A task of this kind already exists on the destination date', live.kind === 'GRAMMAR' ? 'GRAMMAR_QUOTA_CONFLICT' : 'DAILY_TASK_EXISTS', { availableCount: 0 });
    destination = { ...live, id: input.destinationId, scheduledDate: input.scheduledDate, targetCount: live.kind === 'GRAMMAR' ? 1 : remaining, version: 1,
      createdAt: now, updatedAt: now, cancelledAt: null, transferredAt: null, transferredToTaskId: null, transferredCount: 0 } as StudyTask;
    executor.insert(studyTasks).values({ ...rowValues(destination, now, intent({ ...params(destination), id: destination.id, scheduledDate: destination.scheduledDate, targetCount: destination.targetCount, source: destination.source })), transferIntent: null }).run();
  }
  const changed = executor.update(studyTasks).set({ transferredAt: now, transferredToTaskId: destination.id, transferredCount: remaining, transferIntent, updatedAt: now, version: live.version + 1 })
    .where(and(eq(studyTasks.id, live.id), eq(studyTasks.version, input.version))).run();
  if (Number(changed.changes) !== 1) failConflict('Study task changed; reload before retrying', 'STALE_TASK_VERSION');
  return { task: studyTaskFromRow(activeRow(executor, live.id)!), destination };
}
