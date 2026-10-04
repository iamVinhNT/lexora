/**
 * @file study.repository.test.ts
 * @description Verifies calendar task identity, optimistic writes, and atomic evidence-aware transfers.
 */
import { afterEach, describe, expect, it } from 'vitest';
import { getDb, type AppDatabase } from '../../src/db/client.js';
import { grammarExerciseAttempts, grammarLessonProgress, learningSessionItems, learningSessions, reviewLogs, reviewStates, words } from '../../src/db/schema.js';
import { StudyRepository } from '../../src/repositories/study.repository.js';
import type { StudyTaskInput } from '../../src/schemas/study.schema.js';
import { ConflictError, NotFoundError, ValidationError } from '../../src/services/vocabulary.service.js';

const dbs: AppDatabase[] = [];
function setup(): { db: AppDatabase; repo: StudyRepository } {
  const db = getDb(':memory:');
  dbs.push(db);
  return { db, repo: new StudyRepository(db) };
}
function reviewTask(id: string, scheduledDate = '2026-10-04', targetCount = 5): StudyTaskInput {
  return { id, kind: 'REVIEW_WORDS', scheduledDate, targetCount, source: 'MANUAL' };
}
function word(db: AppDatabase, id: string): void {
  db.insert(words).values({ id, word: id, definition: id, createdAt: '2026-10-03T00:00:00.000Z', updatedAt: '2026-10-03T00:00:00.000Z' }).run();
}

afterEach(() => { for (const db of dbs.splice(0)) db.sqlite.close(); });

describe('StudyRepository task mutations', () => {
  it('keeps GET preferences read-only and makes creation intent stable by ID', () => {
    const { repo } = setup();
    expect(repo.getPreferences()).toBeNull();
    const task = reviewTask('stable');
    expect(repo.createTask(task, '2026-10-03T12:00:00.000Z')).toEqual(repo.createTask(task, '2026-10-03T12:01:00.000Z'));
    repo.patchTask(task.id, { action: 'EDIT', version: 1, targetCount: task.targetCount + 1 }, '2026-10-03T12:02:00.000Z');
    expect(repo.createTask(task, '2026-10-03T12:03:00.000Z').targetCount).toBe(task.targetCount + 1);
    expect(() => repo.createTask({ ...task, targetCount: 7 }, '2026-10-03T12:04:00.000Z')).toThrow(ConflictError);
  });
  it('requires learning context and topic relations to exist', () => {
    const { repo } = setup();
    expect(() => repo.createTask({ id: 'missing-context', kind: 'LEARN_WORDS', mode: 'context', contextId: 'absent', scheduledDate: '2026-10-04', targetCount: 2, source: 'MANUAL' }, '2026-10-03T12:00:00.000Z')).toThrow(NotFoundError);
    expect(() => repo.createTask({ id: 'missing-topic', kind: 'LEARN_WORDS', mode: 'topic', topicId: 'absent', scheduledDate: '2026-10-04', targetCount: 2, source: 'MANUAL' }, '2026-10-03T12:00:00.000Z')).toThrow(NotFoundError);
  });


  it('moves only remainder from distinct linked review evidence and replays same intent after source transfer', () => {
    const { db, repo } = setup();
    repo.putPreferences({ timeZone: 'UTC', studyDays: [1, 2, 3, 4, 5, 6, 7], learningTarget: 10, reviewTarget: 10, grammarTarget: 1 });
    repo.createTask(reviewTask('source', '2026-10-03', 10), '2026-10-03T08:00:00.000Z');
    word(db, 'word-1'); word(db, 'word-2');
    db.insert(reviewStates).values({ id: 'due-state', wordId: 'word-1', dueAt: '2026-10-09T00:00:00.000Z' }).run();
    const dueStatesBeforeMove = db.select().from(reviewStates).all();
    db.insert(reviewLogs).values([
      { id: 'r1', wordId: 'word-1', reviewType: 'RECALL', rating: 'GOOD', createdAt: '2026-10-03T09:00:00.000Z', studyTaskId: 'source' },
      { id: 'r2', wordId: 'word-1', reviewType: 'RECALL', rating: 'GOOD', createdAt: '2026-10-03T09:01:00.000Z', studyTaskId: 'source' },
      { id: 'r3', wordId: 'word-2', reviewType: 'RECALL', rating: 'GOOD', createdAt: '2026-10-04T09:02:00.000Z', studyTaskId: 'source' },
    ]).run();
    const move = { action: 'MOVE' as const, version: 1, scheduledDate: '2026-10-04', destinationId: 'destination', destinationVersion: null };
    const first = repo.patchTask('source', move, '2026-10-04T12:00:00.000Z');
    db.sqlite.prepare('UPDATE study_tasks SET transfer_intent = ? WHERE id = ?').run(JSON.stringify({
      destinationVersion: null, destinationId: 'destination', scheduledDate: '2026-10-04', version: 1, action: 'MOVE',
    }, null, 2), 'source');
    const replay = repo.patchTask('source', move, '2026-10-04T12:00:00.000Z');
    expect(first.task.transferredCount).toBe(8);
    expect(first.destination?.targetCount).toBe(8);
    expect(replay.destination).toEqual(first.destination);
    expect(db.select().from(reviewStates).all()).toEqual(dueStatesBeforeMove);
    expect(repo.findTask('source')?.version).toBe(2);
    expect(() => repo.assertUsableTask(db, 'source', 'REVIEW_WORDS', '2026-10-04T12:00:00.000Z')).toThrow(ConflictError);
  });

  it('counts distinct words from completed linked sessions only', () => {
    const { db, repo } = setup();
    repo.createTask({ id: 'learn-source', kind: 'LEARN_WORDS', mode: 'new_words', scheduledDate: '2026-10-02', targetCount: 4, source: 'MANUAL' }, '2026-10-02T08:00:00.000Z');
    word(db, 'session-word');
    db.insert(learningSessions).values([
      { id: 'completed-1', sessionType: 'new_words', totalWords: 1, status: 'COMPLETED', startedAt: '2026-10-02T09:00:00.000Z', studyTaskId: 'learn-source' },
      { id: 'completed-2', sessionType: 'new_words', totalWords: 1, status: 'COMPLETED', startedAt: '2026-10-02T10:00:00.000Z', studyTaskId: 'learn-source' },
      { id: 'unfinished', sessionType: 'new_words', totalWords: 1, status: 'ABANDONED', startedAt: '2026-10-02T11:00:00.000Z', studyTaskId: 'learn-source' },
    ]).run();
    db.insert(learningSessionItems).values([
      { id: 'item-1', sessionId: 'completed-1', wordId: 'session-word', position: 0 },
      { id: 'item-2', sessionId: 'completed-2', wordId: 'session-word', position: 0 },
      { id: 'item-3', sessionId: 'unfinished', wordId: 'session-word', position: 0 },
    ]).run();
    const moved = repo.patchTask('learn-source', { action: 'MOVE', version: 1, scheduledDate: '2026-10-03', destinationId: 'learn-destination', destinationVersion: null }, '2026-10-03T12:00:00.000Z');
    expect(moved.task.transferredCount).toBe(3);
    expect(moved.destination?.targetCount).toBe(3);
  });

  it('rejects stale edits, past-date quota changes, and date edits that bypass evidence transfer', () => {
    const { db, repo } = setup();
    repo.putPreferences({ timeZone: 'UTC', studyDays: [1, 2, 3, 4, 5, 6, 7], learningTarget: 10, reviewTarget: 10, grammarTarget: 1 });
    repo.createTask(reviewTask('task', '2026-10-03', 3), '2026-10-03T08:00:00.000Z');
    word(db, 'reviewed');
    db.insert(reviewLogs).values({ id: 'review', wordId: 'reviewed', reviewType: 'RECALL', rating: 'GOOD', createdAt: '2026-10-03T09:00:00.000Z', studyTaskId: 'task' }).run();
    repo.patchTask('task', { action: 'EDIT', version: 1, targetCount: 4 }, '2026-10-03T11:00:00.000Z');
    expect(() => repo.patchTask('task', { action: 'EDIT', version: 1, targetCount: 5 }, '2026-10-03T12:00:00.000Z')).toThrow(ConflictError);
    repo.createTask(reviewTask('past-task', '2026-10-02', 3), '2026-10-02T08:00:00.000Z');
    expect(() => repo.patchTask('past-task', { action: 'EDIT', version: 1, targetCount: 4 }, '2026-10-03T12:00:00.000Z')).toThrow(ConflictError);
  });

  it('rolls back incompatible transfer intents without changing either task', () => {
    const { repo } = setup();
    repo.createTask({ id: 'source', kind: 'LEARN_WORDS', mode: 'new_words', scheduledDate: '2026-10-02', targetCount: 5, source: 'MANUAL' }, '2026-10-02T08:00:00.000Z');
    repo.createTask({ id: 'destination', kind: 'LEARN_WORDS', mode: 'weak_words', scheduledDate: '2026-10-03', targetCount: 2, source: 'MANUAL' }, '2026-10-03T08:00:00.000Z');
    expect(() => repo.patchTask('source', { action: 'MOVE', version: 1, scheduledDate: '2026-10-03', destinationId: 'destination', destinationVersion: 1 }, '2026-10-03T12:00:00.000Z')).toThrow(ConflictError);
    expect(repo.findTask('source')?.transferredAt).toBeNull();
    expect(repo.findTask('destination')?.targetCount).toBe(2);
  });

  it('rejects MOVE during a linked active session without changing task or destination', () => {
    const { db, repo } = setup();
    repo.createTask({ id: 'active-task', kind: 'LEARN_WORDS', mode: 'new_words', scheduledDate: '2026-10-03', targetCount: 3, source: 'MANUAL' }, '2026-10-03T08:00:00.000Z');
    db.insert(learningSessions).values({ id: 'active', sessionType: 'new_words', totalWords: 1, status: 'IN_PROGRESS', startedAt: '2026-10-03T09:00:00.000Z', studyTaskId: 'active-task' }).run();
    expect(() => repo.patchTask('active-task', { action: 'MOVE', version: 1, scheduledDate: '2026-10-04', destinationId: 'new-task', destinationVersion: null }, '2026-10-03T10:00:00.000Z')).toThrow(ConflictError);
    expect(repo.findTask('active-task')?.transferredAt).toBeNull();
    expect(repo.findTask('new-task')).toBeNull();
  });

  it('rejects grammar-task merges instead of breaking one-task quota', () => {
    const { repo } = setup();
    const grammar = (id: string, scheduledDate: string): StudyTaskInput => ({ id, kind: 'GRAMMAR', lessonId: null, revisionId: null, revision: null, scheduledDate, targetCount: 1, source: 'MANUAL' });
    repo.createTask(grammar('grammar-source', '2026-10-02'), '2026-10-02T08:00:00.000Z');
    repo.createTask(grammar('grammar-destination', '2026-10-03'), '2026-10-03T08:00:00.000Z');
    expect(() => repo.patchTask('grammar-source', { action: 'MOVE', version: 1, scheduledDate: '2026-10-03', destinationId: 'grammar-destination', destinationVersion: 1 }, '2026-10-03T10:00:00.000Z')).toThrow(ConflictError);
    expect(repo.findTask('grammar-source')?.transferredAt).toBeNull();
    expect(repo.findTask('grammar-destination')?.targetCount).toBe(1);
  });

  it('counts only linked completed_lesson attempts as grammar progress', () => {
    const { db, repo } = setup();
    db.insert(grammarLessonProgress).values({ lessonId: 'lesson-1', revisionId: 'revision-1', revision: 'rev-1', lastPosition: 0, isComplete: false, completedAt: null, createdAt: '2026-10-03T08:00:00.000Z', updatedAt: '2026-10-03T08:00:00.000Z' }).run();
    repo.createTask({ id: 'grammar-task', kind: 'GRAMMAR', lessonId: 'lesson-1', revisionId: 'revision-1', revision: 'rev-1', scheduledDate: '2026-10-03', targetCount: 1, source: 'MANUAL' }, '2026-10-03T08:00:00.000Z');
    db.insert(grammarExerciseAttempts).values({ id: 'attempt', lessonId: 'lesson-1', revisionId: 'revision-1', revision: 'rev-1', exerciseId: 'exercise-1', requestId: 'request-1', answer: '{}', isCorrect: true, feedback: 'Correct', createdAt: '2026-10-03T09:00:00.000Z', studyTaskId: 'grammar-task', completedLesson: true }).run();
    expect(() => repo.patchTask('grammar-task', { action: 'MOVE', version: 1, scheduledDate: '2026-10-04', destinationId: 'grammar-next', destinationVersion: null }, '2026-10-04T12:00:00.000Z')).toThrow(ConflictError);
    expect(repo.findTask('grammar-next')).toBeNull();
  });
  it('allows resuming past tasks but blocks future and cancelled tasks', () => {
    const { db, repo } = setup();
    repo.putPreferences({ timeZone: 'UTC', studyDays: [1, 2, 3, 4, 5, 6, 7], learningTarget: 10, reviewTarget: 10, grammarTarget: 1 });
    repo.createTask(reviewTask('past', '2026-10-02'), '2026-10-02T08:00:00.000Z');
    repo.createTask(reviewTask('future', '2026-10-04'), '2026-10-02T08:00:00.000Z');
    expect(repo.assertUsableTask(db, 'past', 'REVIEW_WORDS', '2026-10-03T12:00:00.000Z').id).toBe('past');
    expect(() => repo.assertUsableTask(db, 'future', 'REVIEW_WORDS', '2026-10-03T12:00:00.000Z')).toThrow(ConflictError);
    repo.patchTask('future', { action: 'CANCEL', version: 1 }, '2026-10-03T12:00:00.000Z');
    expect(() => repo.assertUsableTask(db, 'future', 'REVIEW_WORDS', '2026-10-03T12:00:00.000Z')).toThrow(ConflictError);
  });

  it('resolves an unstarted grammar task without rejecting its persisted DTO fields', () => {
    const { repo } = setup();
    repo.createTask({ id: 'resolve', kind: 'GRAMMAR', lessonId: null, revisionId: null, revision: null, scheduledDate: '2026-10-03', targetCount: 1, source: 'MANUAL' }, '2026-10-03T08:00:00.000Z');
    const result = repo.patchTask('resolve', { action: 'EDIT', version: 1, params: { kind: 'GRAMMAR', lessonId: 'fresh-lesson', revisionId: 'revision-new', revision: 'new-revision' } }, '2026-10-03T09:00:00.000Z');
    expect(result.task).toMatchObject({ kind: 'GRAMMAR', lessonId: 'fresh-lesson', revisionId: 'revision-new', revision: 'new-revision', targetCount: 1, version: 2 });
  });

  it('keeps task kind and selectors immutable after abandoned linked activity', () => {
    const { db, repo } = setup();
    const task = repo.createTask({ id: 'abandoned-task', kind: 'LEARN_WORDS', mode: 'new_words', scheduledDate: '2026-10-03', targetCount: 2, source: 'MANUAL' }, '2026-10-03T08:00:00.000Z');
    db.insert(learningSessions).values({ id: 'abandoned', sessionType: 'new_words', totalWords: 1, status: 'ABANDONED', startedAt: '2026-10-03T08:30:00.000Z', studyTaskId: task.id }).run();
    expect(() => repo.patchTask(task.id, { action: 'EDIT', version: 1, params: { kind: 'REVIEW_WORDS' } }, '2026-10-03T09:00:00.000Z')).toThrow(ConflictError);
    expect(repo.findTask(task.id)).toEqual(task);
    expect(db.select().from(learningSessions).all()[0]?.studyTaskId).toBe(task.id);
  });

  it('uses UTC before preferences exist and rejects wrong executor kinds with conflict', () => {
    const { db, repo } = setup();
    const task = repo.createTask(reviewTask('future-no-prefs'), '2026-10-03T08:00:00.000Z');
    expect(() => repo.assertUsableTask(db, task.id, 'REVIEW_WORDS', '2026-10-03T09:00:00.000Z')).toThrow(ConflictError);
    expect(() => repo.assertUsableTask(db, task.id, 'GRAMMAR', '2026-10-04T09:00:00.000Z')).toThrow(ConflictError);
    expect(repo.findTask(task.id)).toEqual(task);
  });

  it('rejects retrospective creation but permits replay of a task created before midnight', () => {
    const { repo } = setup();
    const input = reviewTask('created-on-time', '2026-10-03');
    const task = repo.createTask(input, '2026-10-03T08:00:00.000Z');
    expect(repo.createTask(input, '2026-10-04T08:00:00.000Z')).toEqual(task);
    expect(() => repo.createTask(reviewTask('retrospective', '2026-10-02'), '2026-10-03T08:00:00.000Z')).toThrow(ConflictError);
    expect(repo.findTask('retrospective')).toBeNull();
  });

  it('rejects date edits and moves into past days without changing source or destination', () => {
    const { repo } = setup();
    const task = repo.createTask(reviewTask('current', '2026-10-03'), '2026-10-03T08:00:00.000Z');
    expect(() => repo.patchTask(task.id, { action: 'EDIT', version: 1, scheduledDate: '2026-10-02' }, '2026-10-03T09:00:00.000Z')).toThrow(ConflictError);
    expect(() => repo.patchTask(task.id, { action: 'MOVE', version: 1, scheduledDate: '2026-10-02', destinationId: 'past-destination', destinationVersion: null }, '2026-10-03T09:00:00.000Z')).toThrow(ConflictError);
    expect(repo.findTask(task.id)).toEqual(task);
    expect(repo.findTask('past-destination')).toBeNull();
  });

  it('soft-cancels an overdue task while retaining linked review evidence and quota', () => {
    const { db, repo } = setup();
    const task = repo.createTask(reviewTask('cancel-past', '2026-10-02'), '2026-10-02T08:00:00.000Z');
    word(db, 'past-reviewed');
    db.insert(reviewLogs).values({ id: 'past-log', wordId: 'past-reviewed', reviewType: 'RECALL', rating: 'AGAIN', createdAt: '2026-10-02T09:00:00.000Z', studyTaskId: task.id }).run();
    const logs = db.select().from(reviewLogs).all();
    const result = repo.patchTask(task.id, { action: 'CANCEL', version: 1 }, '2026-10-03T08:00:00.000Z');
    expect(result.task).toMatchObject({ scheduledDate: '2026-10-02', targetCount: 5, cancelledAt: '2026-10-03T08:00:00.000Z', version: 2 });
    expect(db.select().from(reviewLogs).all()).toEqual(logs);
  });
});

describe('StudyRepository contract boundaries', () => {
  it('rejects grammar quota edits above one without changing task', () => {
    const { repo } = setup();
    const task = repo.createTask({ id: 'one-lesson', kind: 'GRAMMAR', lessonId: null, revisionId: null, revision: null, scheduledDate: '2026-10-03', targetCount: 1, source: 'MANUAL' }, '2026-10-03T08:00:00.000Z');
    expect(() => repo.patchTask(task.id, { action: 'EDIT', version: 1, targetCount: 2 }, '2026-10-03T09:00:00.000Z')).toThrow(ValidationError);
    expect(repo.findTask(task.id)).toEqual(task);
  });

  it('rejects an imported exhausted version rather than returning an unsafe version', () => {
    const { db, repo } = setup();
    repo.createTask(reviewTask('version-limit', '2026-10-03'), '2026-10-03T08:00:00.000Z');
    db.sqlite.prepare('UPDATE study_tasks SET version = ? WHERE id = ?').run(Number.MAX_SAFE_INTEGER, 'version-limit');
    const before = repo.findTask('version-limit');
    expect(() => repo.patchTask('version-limit', { action: 'EDIT', version: Number.MAX_SAFE_INTEGER, targetCount: 6 }, '2026-10-03T09:00:00.000Z')).toThrow(ConflictError);
    expect(repo.findTask('version-limit')).toEqual(before);
  });
});
