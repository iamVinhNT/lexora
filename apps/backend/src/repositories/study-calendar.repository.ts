/**
 * @file study-calendar.repository.ts
 * @description Batched calendar and task-view projection from persisted study evidence.
 */
import { and, eq, gte, lt, lte, or, sql } from 'drizzle-orm';
import type { AppDatabase } from '../db/client.js';
import { grammarExerciseAttempts, learningSessionItems, learningSessions, reviewLogs, reviewStates, studyPreferences, studyTasks } from '../db/schema.js';
import { addCivilDays, civilDateAt, dayRangeUtc } from '../domain/study/calendar-date.js';
import { deriveDayStatus } from '../domain/study/task-progress.js';
import type { DayStatusInput, StudyActivity, StudyCalendarDay, StudyCalendarResult, StudyTask, StudyTaskView } from '../schemas/study.schema.js';
import { studyTaskFromRow } from './study-task-mutations.js';

type Progress = { completed: Set<string>; onTime: Set<string> };

export class StudyCalendarRepository {
  constructor(private readonly db: AppDatabase) {}

  private project(tasks: StudyTask[], zone: string): StudyTaskView[] {
    const progress = new Map<string, Progress>();
    const sessions = new Map<string, string | null>();
    for (const task of tasks) progress.set(task.id, { completed: new Set(), onTime: new Set() });
    const taskById = new Map(tasks.map(task => [task.id, task]));
    const learnTaskIds = tasks.filter(t => t.kind === 'LEARN_WORDS').map(t => t.id);
    const sessionRows = learnTaskIds.length ? this.db.select({ id: learningSessions.id, taskId: learningSessions.studyTaskId, status: learningSessions.status,
      completedAt: learningSessions.completedAt, wordId: learningSessionItems.wordId })
      .from(learningSessions).leftJoin(learningSessionItems, eq(learningSessionItems.sessionId, learningSessions.id))
      .where(sql`${learningSessions.studyTaskId} IN (${sql.join(learnTaskIds.map(id => sql`${id}`), sql`, `)})`).all() : [];
    for (const row of sessionRows) {
      if (row.taskId && row.status === 'IN_PROGRESS') sessions.set(row.taskId, row.id);
      if (row.taskId && row.status === 'COMPLETED' && row.wordId) {
        const item = progress.get(row.taskId);
        const task = taskById.get(row.taskId);
        if (item && task) {
          item.completed.add(row.wordId);
          if (row.completedAt && civilDateAt(row.completedAt, zone) === task.scheduledDate) item.onTime.add(row.wordId);
        }
      }
    }
    const reviewRows = tasks.some(t => t.kind === 'REVIEW_WORDS') ? this.db.select({ taskId: reviewLogs.studyTaskId, wordId: reviewLogs.wordId,
      id: reviewLogs.id, createdAt: reviewLogs.createdAt }).from(reviewLogs)
      .where(sql`${reviewLogs.studyTaskId} IN (${sql.join(tasks.filter(t => t.kind === 'REVIEW_WORDS').map(t => sql`${t.id}`), sql`, `)})`).all() : [];
    for (const row of reviewRows) {
      if (!row.taskId) continue;
      const item = progress.get(row.taskId);
      const task = taskById.get(row.taskId);
      if (item && task) {
        item.completed.add(row.wordId);
        if (civilDateAt(row.createdAt, zone) === task.scheduledDate) item.onTime.add(row.wordId);
      }
    }
    const grammarTasks = tasks.filter(t => t.kind === 'GRAMMAR' && t.lessonId && t.revisionId);
    const grammarRows = grammarTasks.length ? this.db.select({ id: grammarExerciseAttempts.id, taskId: grammarExerciseAttempts.studyTaskId,
      lessonId: grammarExerciseAttempts.lessonId, revisionId: grammarExerciseAttempts.revisionId, completedLesson: grammarExerciseAttempts.completedLesson,
      createdAt: grammarExerciseAttempts.createdAt }).from(grammarExerciseAttempts)
      .where(and(eq(grammarExerciseAttempts.completedLesson, true), sql`${grammarExerciseAttempts.studyTaskId} IN (${sql.join(grammarTasks.map(t => sql`${t.id}`), sql`, `)})`)).all() : [];
    for (const row of grammarRows) {
      const task = taskById.get(row.taskId!);
      const item = progress.get(row.taskId!);
      if (task?.kind === 'GRAMMAR' && task.lessonId === row.lessonId && task.revisionId === row.revisionId && item) {
        item.completed.add(task.id);
        if (civilDateAt(row.createdAt, zone) === task.scheduledDate) item.onTime.add(task.id);
      }
    }
    return tasks.map(task => {
      const item = progress.get(task.id)!;
      const completedCount = item.completed.size;
      const onTimeCount = item.onTime.size;
      return { ...task, completedCount, onTimeCount, isComplete: completedCount >= task.targetCount,
        isLate: completedCount >= task.targetCount && onTimeCount < task.targetCount,
        isUnavailable: false, unavailableReason: null, activeSessionId: sessions.get(task.id) ?? null };
    });
  }

  getTaskView(id: string, now: string): StudyTaskView | null {
    const row = this.db.select().from(studyTasks).where(eq(studyTasks.id, id)).all()[0];
    if (!row) return null;
    const prefs = this.db.select().from(studyPreferences).where(eq(studyPreferences.id, 'local')).all()[0];
    return this.project([studyTaskFromRow(row)], prefs?.timeZone ?? 'UTC')[0]!;
  }

  private activities(from: string, to: string, zone: string): StudyActivity[] {
    const start = dayRangeUtc(from, zone).start;
    const end = dayRangeUtc(to, zone).end;
    const output: StudyActivity[] = [];
    const sessionRows = this.db.select({ id: learningSessions.id, taskId: learningSessions.studyTaskId, status: learningSessions.status,
      startedAt: learningSessions.startedAt, completedAt: learningSessions.completedAt, totalWords: learningSessions.totalWords })
      .from(learningSessions).where(or(
        and(gte(learningSessions.startedAt, start), lt(learningSessions.startedAt, end)),
        and(eq(learningSessions.status, 'COMPLETED'), gte(learningSessions.completedAt, start), lt(learningSessions.completedAt, end)),
      )).all();
    const reviewRows = this.db.select({ id: reviewLogs.id, taskId: reviewLogs.studyTaskId, createdAt: reviewLogs.createdAt })
      .from(reviewLogs).where(and(gte(reviewLogs.createdAt, start), lt(reviewLogs.createdAt, end))).all();
    const grammarRows = this.db.select({ id: grammarExerciseAttempts.id, taskId: grammarExerciseAttempts.studyTaskId, lessonId: grammarExerciseAttempts.lessonId,
      revisionId: grammarExerciseAttempts.revisionId, completedLesson: grammarExerciseAttempts.completedLesson, createdAt: grammarExerciseAttempts.createdAt })
      .from(grammarExerciseAttempts).where(and(gte(grammarExerciseAttempts.createdAt, start), lt(grammarExerciseAttempts.createdAt, end))).all();
    const ids = [...new Set([...sessionRows.map(r => r.taskId), ...reviewRows.map(r => r.taskId), ...grammarRows.map(r => r.taskId)].filter((id): id is string => !!id))];
    const linkedRows = ids.length ? this.db.select().from(studyTasks).where(sql`${studyTasks.id} IN (${sql.join(ids.map(id => sql`${id}`), sql`, `)})`).all() : [];
    const linked = new Map(linkedRows.map(row => [row.id, studyTaskFromRow(row)]));
    const late = (taskId: string | null, at: string, committed: boolean) => {
      const origin = taskId ? linked.get(taskId) : undefined;
      return Boolean(committed && origin && civilDateAt(at, zone) > origin.scheduledDate);
    };
    for (const row of sessionRows) {
      const incomplete = row.status !== 'COMPLETED';
      const occurredAt = row.status === 'COMPLETED' && row.completedAt ? row.completedAt : row.startedAt;
      output.push({ kind: 'LEARN_WORDS', referenceId: row.id, occurredAt, wordCount: row.totalWords, lessonId: null, studyTaskId: row.taskId,
        isOutsidePlan: !row.taskId, isIncomplete: incomplete, isLate: late(row.taskId, occurredAt, !incomplete) });
    }
    for (const row of reviewRows) output.push({ kind: 'REVIEW_WORDS', referenceId: row.id, occurredAt: row.createdAt, wordCount: 1, lessonId: null,
      studyTaskId: row.taskId, isOutsidePlan: !row.taskId, isIncomplete: false, isLate: late(row.taskId, row.createdAt, true) });
    for (const row of grammarRows) {
      const origin = row.taskId ? linked.get(row.taskId) : undefined;
      const matches = origin?.kind === 'GRAMMAR' && origin.lessonId === row.lessonId && origin.revisionId === row.revisionId;
      output.push({ kind: 'GRAMMAR', referenceId: row.id, occurredAt: row.createdAt, wordCount: null, lessonId: row.lessonId, studyTaskId: row.taskId,
        isOutsidePlan: !row.taskId, isIncomplete: !row.completedLesson, isLate: late(row.taskId, row.createdAt, Boolean(matches && row.completedLesson)) });
    }
    return output;
  }

  getCalendar(from: string, to: string, now: string): StudyCalendarResult {
    const prefs = this.db.select().from(studyPreferences).where(eq(studyPreferences.id, 'local')).all()[0];
    const zone = prefs?.timeZone ?? 'UTC';
    const today = civilDateAt(now, zone);
    const taskRows = this.db.select().from(studyTasks).where(and(gte(studyTasks.scheduledDate, from), lte(studyTasks.scheduledDate, to))).all();
    const tasks = taskRows.map(studyTaskFromRow);
    const activities = this.activities(from, to, zone);
    // Include linked source tasks outside range to compute late badges and all-time task views in one batched lookup.
    const linkedIds = [...new Set(activities.map(a => a.studyTaskId).filter((id): id is string => !!id))];
    const sourceRows = linkedIds.length ? this.db.select().from(studyTasks).where(sql`${studyTasks.id} IN (${sql.join(linkedIds.map(id => sql`${id}`), sql`, `)})`).all() : [];
    const allTasks = [...new Map([...tasks, ...sourceRows.map(studyTaskFromRow)].map(t => [t.id, t])).values()];
    const views = this.project(allTasks, zone);
    const byDate = new Map<string, StudyTaskView[]>();
    for (const task of views) if (task.scheduledDate >= from && task.scheduledDate <= to) byDate.set(task.scheduledDate, [...(byDate.get(task.scheduledDate) ?? []), task]);
    const todayRange = dayRangeUtc(today, zone);
    const tomorrow = dayRangeUtc(addCivilDays(today, 1), zone);
    const reviewStatesRows = this.db.select({ dueAt: reviewStates.dueAt }).from(reviewStates).all();
    const backlogCount = reviewStatesRows.filter(row => row.dueAt < todayRange.start).length;
    const dates: string[] = [];
    for (let date = from; date <= to; date = addCivilDays(date, 1)) dates.push(date);
    const days: StudyCalendarDay[] = dates.map(date => {
      const dayTasks = byDate.get(date) ?? [];
      const dayActivities = activities.filter(activity => civilDateAt(activity.occurredAt, zone) === date);
      const currentOrFuture = date >= today;
      const range = currentOrFuture ? dayRangeUtc(date, zone) : null;
      const due = range ? reviewStatesRows.filter(row => row.dueAt >= range.start && row.dueAt < range.end).length : null;
      const dueNowCount = date === today ? reviewStatesRows.filter(row => row.dueAt >= todayRange.start && row.dueAt <= now).length : date < today ? null : 0;
      const dueLaterTodayCount = date === today ? reviewStatesRows.filter(row => row.dueAt > now && row.dueAt < tomorrow.start).length : date < today ? null : 0;
      const effective = dayTasks.filter(task => !task.cancelledAt && !task.transferredAt);
      const completedOnTimeTaskCount = effective.filter(task => task.onTimeCount >= task.targetCount).length;
      const input: DayStatusInput = { isPast: date < today, taskCount: dayTasks.length, effectiveTaskCount: effective.length,
        completedOnTimeTaskCount, hasActivity: dayActivities.some(activity => activity.studyTaskId !== null),
        hasQualifyingEvidence: dayTasks.some(task => task.onTimeCount > 0), hasTransferredRemainder: dayTasks.some(task => task.transferredAt !== null && task.transferredCount > 0) };
      return { date, status: deriveDayStatus(input), tasks: dayTasks, activities: dayActivities, scheduledDueCount: due,
        dueNowCount, dueLaterTodayCount, isStudyDay: prefs ? (JSON.parse(prefs.studyDays) as number[]).includes(new Date(`${date}T00:00:00Z`).getUTCDay() || 7) : false };
    });
    return { timeZone: zone, today, generatedAt: now, backlogCount, days };
  }
}
