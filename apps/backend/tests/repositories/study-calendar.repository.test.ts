/**
 * @file study-calendar.repository.test.ts
 * @description Verifies date-bounded activity and linked-task progress projection.
 */
import { afterEach, describe, expect, it } from 'vitest';
import { getDb, type AppDatabase } from '../../src/db/client.js';
import { reviewLogs, reviewStates, studyPreferences, studyTasks, words } from '../../src/db/schema.js';
import { StudyCalendarRepository } from '../../src/repositories/study-calendar.repository.js';
import { StudyRepository } from '../../src/repositories/study.repository.js';
import type { StudyTaskInput } from '../../src/schemas/study.schema.js';

const dbs: AppDatabase[] = [];
function setup(): { db: AppDatabase; tasks: StudyRepository; calendar: StudyCalendarRepository } {
  const db = getDb(':memory:');
  dbs.push(db);
  return { db, tasks: new StudyRepository(db), calendar: new StudyCalendarRepository(db) };
}
function addWord(db: AppDatabase, id: string): void {
  db.insert(words).values({ id, word: id, definition: id, createdAt: '2026-03-01T00:00:00.000Z', updatedAt: '2026-03-01T00:00:00.000Z' }).run();
}
function task(id: string, date: string): StudyTaskInput {
  return { id, kind: 'REVIEW_WORDS', scheduledDate: date, targetCount: 2, source: 'MANUAL' };
}
afterEach(() => { for (const db of dbs.splice(0)) db.sqlite.close(); });

describe('StudyCalendarRepository', () => {
  it('projects distinct review words as late activity without moving originating task into displayed day', () => {
    const { db, tasks, calendar } = setup();
    tasks.createTask(task('origin', '2026-10-02'), '2026-10-02T09:00:00.000Z');
    addWord(db, 'same-word');
    db.insert(reviewLogs).values([
      { id: 'repeat-a', wordId: 'same-word', reviewType: 'RECALL', rating: 'GOOD', createdAt: '2026-10-03T09:00:00.000Z', studyTaskId: 'origin' },
      { id: 'repeat-b', wordId: 'same-word', reviewType: 'PRODUCTION', rating: 'GOOD', createdAt: '2026-10-03T09:01:00.000Z', studyTaskId: 'origin' },
    ]).run();
    addWord(db, 'unlinked-word');
    db.insert(reviewLogs).values({ id: 'unlinked-log', wordId: 'unlinked-word', reviewType: 'RECALL', rating: 'GOOD',
      createdAt: '2026-10-03T10:00:00.000Z', studyTaskId: null }).run();
    const result = calendar.getCalendar('2026-10-03', '2026-10-03', '2026-10-03T12:00:00.000Z');
    expect(result.days[0]).toMatchObject({ status: 'NO_PLAN', tasks: [] });
    expect(result.days[0]?.activities).toHaveLength(3);
    expect(result.days[0]?.activities.filter(activity => activity.studyTaskId === null).every(activity => activity.isOutsidePlan)).toBe(true);
    expect(result.days[0]?.activities.filter(activity => activity.studyTaskId !== null).every(activity => activity.isLate)).toBe(true);
    expect(calendar.getTaskView('origin', '2026-10-03T12:00:00.000Z')).toMatchObject({ completedCount: 1, onTimeCount: 0, isLate: false });
  });

  it('uses DST-aware local-day boundaries for backlog and current review buckets', () => {
    const { db, calendar } = setup();
    db.insert(studyPreferences).values({ id: 'local', timeZone: 'America/New_York', studyDays: '[1,2,3,4,5,6,7]',
      learningTarget: 5, reviewTarget: 5, grammarTarget: 1, updatedAt: '2026-03-01T00:00:00.000Z' }).run();
    for (const id of ['backlog', 'now-a', 'now-b', 'later', 'tomorrow']) addWord(db, id);
    db.insert(reviewStates).values([
      { id: 'backlog-state', wordId: 'backlog', dueAt: '2026-03-08T04:59:59.999Z' },
      { id: 'now-a-state', wordId: 'now-a', dueAt: '2026-03-08T05:00:00.000Z' },
      { id: 'now-b-state', wordId: 'now-b', dueAt: '2026-03-08T05:30:00.000Z' },
      { id: 'later-state', wordId: 'later', dueAt: '2026-03-08T06:30:00.000Z' },
      { id: 'tomorrow-state', wordId: 'tomorrow', dueAt: '2026-03-09T04:00:00.000Z' },
    ]).run();
    const result = calendar.getCalendar('2026-03-08', '2026-03-09', '2026-03-08T06:00:00.000Z');
    expect(result.backlogCount).toBe(1);
    expect(result.days[0]).toMatchObject({ scheduledDueCount: 3, dueNowCount: 2, dueLaterTodayCount: 1 });
    expect(result.days[1]).toMatchObject({ scheduledDueCount: 1, dueNowCount: 0, dueLaterTodayCount: 0 });
  });

  it('returns null for deleted deep-link tasks', () => {
    const { db, tasks, calendar } = setup();
    tasks.createTask(task('removed', '2026-10-03'), '2026-10-03T08:00:00.000Z');
    db.delete(studyTasks).run();
    expect(calendar.getTaskView('removed', '2026-10-03T09:00:00.000Z')).toBeNull();
  });
});
