/**
 * @file study.service.ts
 * @description Study preferences, calendar projections, previews, and task mutations.
 */
import { addCivilDays, civilDateAt } from '../domain/study/calendar-date.js';
import { GrammarLessonUnavailableError, GrammarCurriculumChangedConflictError } from '../grammar/course-read-model.js';
import type { GrammarService } from './grammar.service.js';
import { ConflictError, NotFoundError } from './vocabulary.service.js';
import type { StudyCalendarRepository } from '../repositories/study-calendar.repository.js';
import type { StudyRepository } from '../repositories/study.repository.js';
import {
  studyPreferencesInputSchema,
  studyTaskInputSchema,
  taskPatchSchema,
  type StudyCalendarResult,
  type StudyPlanPreview,
  type StudyPreferences,
  type StudyPreferencesInput,
  type StudyTask,
  type StudyTaskInput,
  type StudyTaskView,
  type TaskMutationResult,
  type TaskPatch,
} from '../schemas/study.schema.js';

type CreateResult = TaskMutationResult & { readonly wasReplay?: boolean };
type GrammarAvailability = { isUnavailable: false; unavailableReason: null } | { isUnavailable: true; unavailableReason: string };

const DEFAULT_PREFERENCES: StudyPreferencesInput = {
  timeZone: 'UTC', studyDays: [1, 2, 3, 4, 5, 6, 7], learningTarget: 0, reviewTarget: 0, grammarTarget: 0,
};

function weekday(date: string): number {
  const day = new Date(`${date}T00:00:00.000Z`).getUTCDay();
  return day === 0 ? 7 : day;
}

export class StudyService {
  constructor(
    private readonly repo: StudyRepository,
    private readonly calendar: StudyCalendarRepository,
    private readonly grammar: GrammarService,
  ) {}

  getPreferences(): StudyPreferences | null {
    return this.repo.getPreferences();
  }

  putPreferences(input: StudyPreferencesInput): StudyPreferences {
    return this.repo.putPreferences(studyPreferencesInputSchema.parse(input));
  }

  getCalendar(query: { from: string; to: string }, now: string): StudyCalendarResult {
    const result = this.calendar.getCalendar(query.from, query.to, now);
    return {
      ...result,
      days: result.days.map((day) => ({ ...day, tasks: day.tasks.map((task) => this.overlay(task)) })),
    };
  }

  getTask(id: string, now: string): StudyTaskView {
    const task = this.calendar.getTaskView(id, now);
    if (!task) throw new NotFoundError(`Study task "${id}" not found`);
    return this.overlay(task);
  }

  previewPlan(now: string): StudyPlanPreview {
    const stored = this.repo.getPreferences();
    const preferences = stored ?? { ...DEFAULT_PREFERENCES };
    const today = civilDateAt(now, preferences.timeZone);
    const to = addCivilDays(today, 6);
    const snapshot = this.calendar.getCalendar(today, to, now);
    const existing = new Set(this.repo.listTasks(today, to).map((task) => `${task.kind}:${task.scheduledDate}`));
    const tasks: StudyTaskInput[] = [];
    const warnings: StudyPlanPreview['warnings'] = [];
    const course = this.grammar.getCourseWithProgress();
    const nextLesson = course.stages.flatMap((stage) => stage.lessons).find((lesson) => lesson.id === course.nextLessonId) ?? null;

    for (const day of snapshot.days) {
      if (!preferences.studyDays.includes(weekday(day.date))) continue;
      const date = day.date;
      if (preferences.reviewTarget > 0 && !existing.has(`REVIEW_WORDS:${date}`)) {
        const knownDue = (date === today ? snapshot.backlogCount : 0) + (day.scheduledDueCount ?? 0);
        const target = Math.min(preferences.reviewTarget, knownDue);
        if (target > 0) {
          tasks.push({ id: `preview-review-${date}`, kind: 'REVIEW_WORDS', scheduledDate: date, targetCount: target, source: 'AUTO' });
        }
        if (knownDue < preferences.reviewTarget) {
          warnings.push({ code: 'INSUFFICIENT_CONTENT', date, availableCount: knownDue });
        }
        if (date === today && snapshot.backlogCount > preferences.reviewTarget) {
          warnings.push({ code: 'BACKLOG_EXCEEDS_TARGET', date, availableCount: snapshot.backlogCount });
        }
        if (date > today && (day.scheduledDueCount ?? 0) > 0) {
          warnings.push({ code: 'FUTURE_DUE_SNAPSHOT', date, availableCount: day.scheduledDueCount });
        }
      }
      if (preferences.learningTarget > 0 && !existing.has(`LEARN_WORDS:${date}`)) {
        tasks.push({ id: `preview-learning-${date}`, kind: 'LEARN_WORDS', mode: 'new_words', scheduledDate: date,
          targetCount: preferences.learningTarget, source: 'AUTO' });
      }
      if (preferences.grammarTarget === 1 && !existing.has(`GRAMMAR:${date}`) && nextLesson) {
        if (date === today) {
          tasks.push({ id: `preview-grammar-${date}`, kind: 'GRAMMAR', lessonId: nextLesson.id, revisionId: nextLesson.revisionId,
            revision: nextLesson.revision, scheduledDate: date, targetCount: 1, source: 'AUTO' });
        } else {
          tasks.push({ id: `preview-grammar-${date}`, kind: 'GRAMMAR', lessonId: null, revisionId: null, revision: null,
            scheduledDate: date, targetCount: 1, source: 'AUTO' });
        }
      }
    }

    return { timeZone: preferences.timeZone, generatedAt: now, from: today, to, tasks, warnings };
  }

  createTask(input: StudyTaskInput, now: string): CreateResult {
    const parsed = studyTaskInputSchema.parse(input);
    this.assertGrammarAvailable(parsed);
    const replay = this.repo.findTask(parsed.id) !== null;
    const task = this.repo.createTask(parsed, now);
    const view = this.getTask(task.id, now);
    const result = { task: view, destination: null } as CreateResult;
    Object.defineProperty(result, 'wasReplay', { value: replay, enumerable: false });
    return result;
  }

  patchTask(id: string, input: TaskPatch, now: string): TaskMutationResult {
    const parsed = taskPatchSchema.parse(input);
    const current = this.repo.findTask(id);
    if (!current) throw new NotFoundError(`Study task "${id}" not found`);
    if (parsed.action === 'EDIT' && parsed.params) this.assertGrammarAvailable(parsed.params);
    const result = this.repo.patchTask(id, parsed, now);
    return {
      task: this.overlay(this.requireTaskView(result.task.id, now)),
      destination: result.destination ? this.overlay(this.requireTaskView(result.destination.id, now)) : null,
    };
  }

  private requireTaskView(id: string, now: string): StudyTaskView {
    const task = this.calendar.getTaskView(id, now);
    if (!task) throw new NotFoundError(`Study task "${id}" not found`);
    return task;
  }

  private assertGrammarAvailable(input: StudyTaskInput | Extract<TaskPatch, { action: 'EDIT' }>['params']): void {
    if (!input || input.kind !== 'GRAMMAR' || input.lessonId === null || input.revisionId === null || input.revision === null) return;
    const availability = this.grammarAvailability(input.lessonId, input.revisionId, input.revision);
    if (availability.isUnavailable) {
      throw new ConflictError('Grammar lesson is unavailable for this task revision', { reason: availability.unavailableReason });
    }
  }

  private grammarAvailability(lessonId: string, revisionId: string, revision: string): GrammarAvailability {
    const course = this.grammar.getCourseWithProgress();
    const lesson = course.stages.flatMap((stage) => stage.lessons).find((item) => item.id === lessonId);
    if (!lesson) {
      try {
        this.grammar.getLesson(lessonId);
      } catch (error) {
        if (error instanceof GrammarCurriculumChangedConflictError) {
          return { isUnavailable: true, unavailableReason: 'NOT_FOUND' };
        }
        if (error instanceof GrammarLessonUnavailableError) {
          return { isUnavailable: true, unavailableReason: error.reason === 'unpublished' ? 'UNPUBLISHED' : 'NOT_FOUND' };
        }
      }
      return { isUnavailable: true, unavailableReason: 'UNPUBLISHED' };
    }
    if (lesson.revisionId !== revisionId || lesson.revision !== revision) {
      return { isUnavailable: true, unavailableReason: 'REVISION_MISMATCH' };
    }
    return { isUnavailable: false, unavailableReason: null };
  }

  private overlay(task: StudyTaskView): StudyTaskView {
    if (task.kind !== 'GRAMMAR' || task.lessonId === null || task.revisionId === null || task.revision === null) return task;
    const availability = this.grammarAvailability(task.lessonId, task.revisionId, task.revision);
    return availability.isUnavailable
      ? { ...task, isUnavailable: true, unavailableReason: availability.unavailableReason }
      : { ...task, isUnavailable: false, unavailableReason: null };
  }
}
