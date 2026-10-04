/**
 * @file study.repository.ts
 * @description Persistence and direct evidence queries for local study calendar state.
 */
import { and, asc, eq, gte, isNull, lte, or, sql } from 'drizzle-orm';
import type { AppDatabase } from '../db/client.js';
import { contexts, contextWords, learningProgress, studyPreferences, studyTasks, tags, wordTags, words } from '../db/schema.js';
import { civilDateAt } from '../domain/study/calendar-date.js';
import { studyPreferencesInputSchema, studyTaskInputSchema, taskPatchSchema, type StudyPreferences, type StudyPreferencesInput, type StudyTask, type StudyTaskInput, type TaskParams, type TaskPatch, type TaskWriteResult } from '../schemas/study.schema.js';
import { applyTaskPatch, studyTaskFromRow } from './study-task-mutations.js';
import { ConflictError, NotFoundError } from '../services/vocabulary.service.js';

type Executor = Pick<AppDatabase, 'select' | 'insert' | 'update'>;
type TaskKind = StudyTask['kind'];

function validateRelations(executor: Executor, task: TaskParams): void {
  if (task.kind === 'LEARN_WORDS' && task.mode === 'context'
    && !executor.select({ id: contexts.id }).from(contexts).where(eq(contexts.id, task.contextId!)).all().length) {
    throw new NotFoundError(`Context "${task.contextId}" not found`);
  }
  if (task.kind === 'LEARN_WORDS' && task.mode === 'topic'
    && !executor.select({ id: tags.id }).from(tags).where(eq(tags.id, task.topicId!)).all().length) {
    throw new NotFoundError(`Topic "${task.topicId}" not found`);
  }
}

export class StudyRepository {
  constructor(private readonly db: AppDatabase) {}

  getPreferences(): StudyPreferences | null {
    const row = this.db.select().from(studyPreferences).where(eq(studyPreferences.id, 'local')).all()[0];
    if (!row) return null;
    return { id: 'local', timeZone: row.timeZone, studyDays: JSON.parse(row.studyDays) as number[], learningTarget: row.learningTarget,
      reviewTarget: row.reviewTarget, grammarTarget: row.grammarTarget as 0 | 1, updatedAt: row.updatedAt };
  }

  putPreferences(input: StudyPreferencesInput): StudyPreferences {
    const parsed = studyPreferencesInputSchema.parse(input);
    const now = new Date().toISOString();
    this.db.insert(studyPreferences).values({ id: 'local', timeZone: parsed.timeZone, studyDays: JSON.stringify(parsed.studyDays),
      learningTarget: parsed.learningTarget, reviewTarget: parsed.reviewTarget, grammarTarget: parsed.grammarTarget, updatedAt: now })
      .onConflictDoUpdate({ target: studyPreferences.id, set: { timeZone: parsed.timeZone, studyDays: JSON.stringify(parsed.studyDays),
        learningTarget: parsed.learningTarget, reviewTarget: parsed.reviewTarget, grammarTarget: parsed.grammarTarget, updatedAt: now } }).run();
    return this.getPreferences()!;
  }

  getPlannerCandidates() {
    const newWordCount = this.db.select({ count: sql<number>`count(*)` }).from(words)
      .leftJoin(learningProgress, eq(learningProgress.wordId, words.id))
      .where(or(eq(learningProgress.status, 'NEW'), isNull(learningProgress.id), isNull(learningProgress.lastStudiedAt))).all()[0]?.count ?? 0;
    const contextsList = this.db.select({ id: contexts.id, title: contexts.title, wordCount: sql<number>`count(${contextWords.wordId})` })
      .from(contexts).leftJoin(contextWords, eq(contextWords.contextId, contexts.id)).groupBy(contexts.id)
      .orderBy(asc(contexts.title), asc(contexts.id)).all();
    const topicsList = this.db.select({ id: tags.id, title: tags.name, wordCount: sql<number>`count(${wordTags.wordId})` })
      .from(tags).leftJoin(wordTags, eq(wordTags.tagId, tags.id)).groupBy(tags.id)
      .orderBy(asc(tags.name), asc(tags.id)).all();
    return { newWordCount: Number(newWordCount),
      contexts: contextsList.map((candidate) => ({ ...candidate, wordCount: Number(candidate.wordCount) })),
      topics: topicsList.map((candidate) => ({ ...candidate, wordCount: Number(candidate.wordCount) })) };
  }

  listTasks(from: string, to: string): StudyTask[] {
    return this.db.select().from(studyTasks).where(and(gte(studyTasks.scheduledDate, from), lte(studyTasks.scheduledDate, to)))
      .all().map(studyTaskFromRow);
  }

  findTask(id: string): StudyTask | null {
    const row = this.db.select().from(studyTasks).where(eq(studyTasks.id, id)).all()[0];
    return row ? studyTaskFromRow(row) : null;
  }

  createTask(input: StudyTaskInput, now: string): StudyTask {
    const task = studyTaskInputSchema.parse(input);
    const encoded = JSON.stringify(task);
    return this.db.sqlite.transaction(() => {
      const found = this.db.select().from(studyTasks).where(eq(studyTasks.id, task.id)).all()[0];
      if (found) {
        if (found.creationIntent === encoded || JSON.stringify(studyTaskInputSchema.parse(JSON.parse(found.creationIntent))) === encoded) return studyTaskFromRow(found);
        throw new ConflictError('Task ID was already used for a different creation intent', { reason: 'TASK_ID_REUSED', taskId: task.id });
      }
      const today = civilDateAt(now, this.getPreferences()?.timeZone ?? 'UTC');
      if (task.scheduledDate < today) throw new ConflictError('Cannot add study targets to a past day', { reason: 'PAST_TASK_LOCKED' });
      validateRelations(this.db, task);
      const occupied = this.db.select().from(studyTasks).where(and(eq(studyTasks.kind, task.kind), eq(studyTasks.scheduledDate, task.scheduledDate))).all()
        .some(row => !row.cancelledAt && !row.transferredAt && (task.kind !== 'GRAMMAR' || (task.lessonId !== null && row.lessonId === task.lessonId)));
      if (occupied) throw new ConflictError('A task already occupies this daily quota', { reason: 'DAILY_TASK_EXISTS', availableCount: 0 });
      this.db.insert(studyTasks).values({
        id: task.id, scheduledDate: task.scheduledDate, kind: task.kind, targetCount: task.targetCount, source: task.source,
        mode: task.kind === 'LEARN_WORDS' ? task.mode : null,
        contextId: task.kind === 'LEARN_WORDS' ? task.contextId ?? null : null,
        topicId: task.kind === 'LEARN_WORDS' ? task.topicId ?? null : null,
        lessonId: task.kind === 'GRAMMAR' ? task.lessonId : null,
        revisionId: task.kind === 'GRAMMAR' ? task.revisionId : null,
        revision: task.kind === 'GRAMMAR' ? task.revision : null,
        version: 1, createdAt: now, updatedAt: now, creationIntent: encoded,
      }).run();
      return studyTaskFromRow(this.db.select().from(studyTasks).where(eq(studyTasks.id, task.id)).all()[0]!);
    }).immediate();
  }

  patchTask(id: string, input: TaskPatch, now: string): TaskWriteResult {
    const patch = taskPatchSchema.parse(input);
    return this.db.sqlite.transaction(() => {
      const row = this.db.select().from(studyTasks).where(eq(studyTasks.id, id)).all()[0];
      if (!row) throw new NotFoundError(`Study task "${id}" not found`);
      if (patch.action === 'EDIT' && patch.params) validateRelations(this.db, patch.params);
      return applyTaskPatch(this.db, studyTaskFromRow(row), patch, now);
    }).immediate();
  }

  assertUsableTask(executor: Executor, id: string, kind: TaskKind, now: string): StudyTask {
    const row = executor.select().from(studyTasks).where(eq(studyTasks.id, id)).all()[0];
    if (!row) throw new NotFoundError(`Study task "${id}" not found`);
    if (row.kind !== kind) throw new ConflictError('Study task kind does not match executor', { reason: 'WRONG_TASK_KIND' });
    if (row.cancelledAt || row.transferredAt) throw new ConflictError('Cancelled or transferred task cannot be used', { reason: 'TASK_UNAVAILABLE' });
    const prefsRow = executor.select().from(studyPreferences).where(eq(studyPreferences.id, 'local')).all()[0];
    if (row.scheduledDate > civilDateAt(now, prefsRow?.timeZone ?? 'UTC')) throw new ConflictError('Future study task cannot be started', { reason: 'FUTURE_TASK' });
    return studyTaskFromRow(row);
  }

}
