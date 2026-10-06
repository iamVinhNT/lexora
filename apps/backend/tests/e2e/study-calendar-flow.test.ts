/**
 * @file study-calendar-flow.test.ts
 * @description End-to-end proof for preferences, linked task evidence, calendar projection, move, and backup restore.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import type { FastifyInstance, LightMyRequestResponse } from 'fastify';
import { buildApp } from '../../src/app.js';
import { seedDatabase } from '../../src/db/seed.js';
import { createTestCurriculum } from '../grammar/fixtures.js';

const today = '2026-10-03';
const tomorrow = '2026-10-04';

type Envelope<T> = { success: true; data: T };
type Session = { id: string; items: Array<{ wordId: string; word: { word: string } }> };
type Backup = { version: number; data: { studyTasks: Array<{ id: string }>; learningSessions: Array<{ studyTaskId: string | null }>; reviewLogs: Array<{ studyTaskId: string | null }>; grammarExerciseAttempts: Array<{ studyTaskId: string | null }>; reviewStates: Array<{ wordId: string; dueAt: string }> } };

const outputGrader = { grade: async ({ sentence }: { sentence: string }) => ({ score: 80, explanation: 'Valid test sentence.', suggestion: sentence }) };
const apps: FastifyInstance[] = [];
const directories: string[] = [];

function data<T>(response: LightMyRequestResponse): T {
  return (JSON.parse(response.payload) as Envelope<T>).data;
}

async function createApp(dbPath = ':memory:'): Promise<FastifyInstance> {
  const app = await buildApp({ dbPath, logger: false, outputGrader, grammarCurriculum: createTestCurriculum() });
  await seedDatabase(app.db);
  apps.push(app);
  return app;
}

async function createTask(app: FastifyInstance, payload: Record<string, unknown>) {
  const response = await app.inject({ method: 'POST', url: '/api/study-tasks', payload });
  expect([200, 201]).toContain(response.statusCode);
  return data<{ task: { id: string; version: number; completedCount: number; targetCount: number }; destination: unknown }>(response);
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(new Date('2026-10-03T12:00:00.000Z'));
});

afterEach(async () => {
  try {
    for (const app of apps.splice(0)) await app.close();
    for (const directory of directories.splice(0)) rmSync(directory, { recursive: true, force: true });
  } finally {
    vi.useRealTimers();
  }
});

describe('study calendar flow end to end', () => {
  it('persists preferences, links all evidence, moves remaining work, and restores the current backup', async () => {
    const app = await createApp();
    const preferences = await app.inject({ method: 'PUT', url: '/api/study-preferences', payload: {
      timeZone: 'UTC', studyDays: [1, 2, 3, 4, 5, 6, 7], learningTarget: 2, reviewTarget: 2, grammarTarget: 1,
    } });
    expect(preferences.statusCode).toBe(200);

    const learnTask = await createTask(app, {
      id: 'calendar-learn', kind: 'LEARN_WORDS', mode: 'new_words', scheduledDate: today, targetCount: 2, source: 'MANUAL',
    });
    const reviewTask = await createTask(app, {
      id: 'calendar-review', kind: 'REVIEW_WORDS', scheduledDate: today, targetCount: 1, source: 'MANUAL',
    });
    const lesson = createTestCurriculum().stages[0]!.lessons[0]!;
    const grammarTask = await createTask(app, {
      id: 'calendar-grammar', kind: 'GRAMMAR', lessonId: lesson.id, revisionId: lesson.revisionId, revision: lesson.revision,
      scheduledDate: today, targetCount: 1, source: 'MANUAL',
    });

    const started = await app.inject({ method: 'POST', url: '/api/learning/session', payload: {
      mode: 'new_words', count: 1, studyTaskId: learnTask.task.id,
    } });
    expect(started.statusCode).toBe(201);
    const session = data<Session>(started);
    const item = session.items[0]!;
    for (const payload of [
      { requestId: 'calendar-context', wordId: item.wordId, step: 'CONTEXT' },
      { requestId: 'calendar-understand', wordId: item.wordId, step: 'UNDERSTAND' },
      { requestId: 'calendar-recall', wordId: item.wordId, step: 'RECALL', answer: item.word.word },
      { requestId: 'calendar-output', wordId: item.wordId, step: 'OUTPUT', answer: `A ${item.word.word} sentence.` },
      { requestId: 'calendar-assess', wordId: item.wordId, step: 'ASSESS', assessmentRating: 'GOOD' },
    ]) {
      const step = await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/step`, payload });
      expect(step.statusCode).toBe(200);
    }
    const completed = await app.inject({ method: 'POST', url: `/api/learning/session/${session.id}/complete` });
    expect(completed.statusCode).toBe(200);
    const review = await app.inject({ method: 'POST', url: '/api/reviews', payload: {
      wordId: item.wordId, reviewType: 'RECALL', rating: 'GOOD', correct: true, studyTaskId: reviewTask.task.id,
    } });
    expect(review.statusCode).toBe(200);

    for (const [index, exercise] of lesson.exercises.entries()) {
      const answer = exercise.acceptedAnswers[0]!.text;
      expect(answer).toBeDefined();
      const attempt = await app.inject({ method: 'POST', url: `/api/grammar/${lesson.id}/answers`, payload: {
        requestId: `calendar-grammar-${index}`, exerciseId: exercise.id, answer: { type: exercise.kind === 'choice' ? 'choice' : 'text', text: answer }, studyTaskId: grammarTask.task.id,
      } });
      expect(attempt.statusCode).toBe(200);
    }

    const calendar = data<{ days: Array<{ date: string; tasks: Array<{ id: string; completedCount: number; onTimeCount: number; isComplete: boolean }> }> }>(
      await app.inject({ method: 'GET', url: `/api/study-calendar?from=${today}&to=${today}` }),
    );
    const day = calendar.days[0]!;
    expect(day.date).toBe(today);
    expect(day.tasks.find((task) => task.id === learnTask.task.id)).toMatchObject({ completedCount: 1, onTimeCount: 1 });
    expect(day.tasks.find((task) => task.id === reviewTask.task.id)).toMatchObject({ completedCount: 1, onTimeCount: 1, isComplete: true });
    expect(day.tasks.find((task) => task.id === grammarTask.task.id)).toMatchObject({ completedCount: 1, onTimeCount: 1, isComplete: true });


    const backupBeforeMove = data<Backup>(await app.inject({ method: 'GET', url: '/api/backup' }));
    const dueAtBeforeMove = backupBeforeMove.data.reviewStates.find((state) => state.wordId === item.wordId)?.dueAt;
    expect(dueAtBeforeMove).toBeDefined();

    const moved = await app.inject({ method: 'PATCH', url: `/api/study-tasks/${learnTask.task.id}`, payload: {
      action: 'MOVE', version: learnTask.task.version, scheduledDate: tomorrow, destinationId: 'calendar-learn-moved', destinationVersion: null,
    } });
    expect(moved.statusCode).toBe(200);
    expect(data<{ task: { version: number; transferredToTaskId: string | null }; destination: { id: string; targetCount: number } }>(moved)).toMatchObject({
      task: { version: 2, transferredToTaskId: 'calendar-learn-moved' }, destination: { id: 'calendar-learn-moved', targetCount: 1 },
    });

    const backup = data<Backup>(await app.inject({ method: 'GET', url: '/api/backup' }));
    expect(backup.data.reviewStates.find((state) => state.wordId === item.wordId)?.dueAt).toBe(dueAtBeforeMove);

    const directory = mkdtempSync(join(tmpdir(), 'study-calendar-restore-'));
    directories.push(directory);
    const restoredApp = await createApp(join(directory, 'restored.db'));
    const preview = data<{ previewToken: string }>(await restoredApp.inject({ method: 'POST', url: '/api/restore/preview', payload: { backup } }));
    const restored = await restoredApp.inject({ method: 'POST', url: '/api/restore', payload: { backup, confirm: true, previewToken: preview.previewToken } });
    expect(restored.statusCode).toBe(200);
    const restoredCalendar = data<{ days: Array<{ tasks: Array<{ id: string; targetCount: number; version: number; completedCount: number; onTimeCount: number; isComplete: boolean; transferredToTaskId: string | null }> }> }>(await restoredApp.inject({ method: 'GET', url: `/api/study-calendar?from=${today}&to=${tomorrow}` }));
    const restoredTasks = restoredCalendar.days.flatMap((calendarDay) => calendarDay.tasks);
    expect(restoredTasks.find((task) => task.id === 'calendar-learn')).toMatchObject({
      targetCount: 2, version: 2, completedCount: 1, onTimeCount: 1, isComplete: false, transferredToTaskId: 'calendar-learn-moved',
    });
    expect(restoredTasks.find((task) => task.id === 'calendar-learn-moved')).toMatchObject({
      targetCount: 1, version: 1, completedCount: 0, onTimeCount: 0, isComplete: false,
    });
    expect(restoredTasks.find((task) => task.id === 'calendar-review')).toMatchObject({
      targetCount: 1, version: 1, completedCount: 1, onTimeCount: 1, isComplete: true,
    });
    expect(restoredTasks.find((task) => task.id === 'calendar-grammar')).toMatchObject({
      targetCount: 1, version: 1, completedCount: 1, onTimeCount: 1, isComplete: true,
    });
    const restoredBackup = data<Backup>(await restoredApp.inject({ method: 'GET', url: '/api/backup' }));
    expect(restoredBackup.data.learningSessions.some((row) => row.studyTaskId === 'calendar-learn')).toBe(true);
    expect(restoredBackup.data.reviewLogs.some((row) => row.studyTaskId === 'calendar-review')).toBe(true);
    expect(restoredBackup.data.grammarExerciseAttempts.some((row) => row.studyTaskId === 'calendar-grammar')).toBe(true);
    expect(restoredCalendar.days.flatMap((calendarDay) => calendarDay.tasks).map((task) => task.id)).toEqual(expect.arrayContaining(['calendar-review', 'calendar-grammar', 'calendar-learn-moved']));
    expect(restoredApp.db.sqlite.prepare('PRAGMA foreign_key_check').all()).toEqual([]);
  });
});
