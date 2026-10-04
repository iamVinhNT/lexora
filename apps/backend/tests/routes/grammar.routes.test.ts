/**
 * @file grammar.routes.test.ts
 * @description Exercises published grammar routes through the composed Fastify app.
 */
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../../src/app.js';
import { getGrammarCurriculum } from '../../src/grammar/content/manifest.js';
import type { GrammarCurriculum } from '../../src/grammar/content/types.js';

const temporaryDirectories: string[] = [];
const lessonId = 'grammar-a1-pronouns-and-articles';
const firstExerciseId = 'grammar-a1-pronouns-and-articles-q1';
const secondExerciseId = 'grammar-a1-pronouns-and-articles-q2';

function reviewedCurriculum(): GrammarCurriculum {
  const curriculum = getGrammarCurriculum();
  const foundation = curriculum.stages[0]!;
  foundation.publicationStatus = 'published';
  for (const lesson of foundation.lessons) {
    lesson.review = { status: 'approved', reviewer: 'Route integration fixture', reviewedAt: '2026-09-26T10:00:00.000Z' };
  }
  const stage = curriculum.stages.find(({ level }) => level === 'A1')!;
  stage.publicationStatus = 'published';
  stage.lessons = [stage.lessons[0]!];
  stage.lessons[0]!.review = {
    status: 'approved',
    reviewer: 'Route integration fixture',
    reviewedAt: '2026-09-26T10:00:00.000Z',
  };
  return curriculum;
}

function answer(requestId: string, exerciseId: string, text: string) {
  return {
    requestId,
    exerciseId,
    answer: { type: 'choice', text },
  };
}

async function createApp(dbPath: string, curriculum = reviewedCurriculum()): Promise<FastifyInstance> {
  return buildApp({ dbPath, logger: false, grammarCurriculum: curriculum });
}

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) rmSync(directory, { recursive: true, force: true });
});

describe('grammar HTTP routes', () => {
  it('keeps withdrawn draft content unavailable without revealing lesson existence or writing progress', async () => {
    const withdrawn = getGrammarCurriculum();
    withdrawn.stages[0]!.publicationStatus = 'draft';
    const app = await createApp(':memory:', withdrawn);
    try {
      const course = await app.inject({ method: 'GET', url: '/api/grammar' });
      expect(course.statusCode).toBe(200);
      expect(course.json()).toEqual({ success: true, data: { isComplete: false, stages: [], nextLessonId: null } });

      const draft = await app.inject({ method: 'GET', url: '/api/grammar/grammar-a1-pronouns-and-articles' });
      const missing = await app.inject({ method: 'GET', url: '/api/grammar/grammar-a1-not-authored' });
      expect(draft.statusCode).toBe(404);
      expect(missing.statusCode).toBe(404);
      expect(draft.json()).toEqual(missing.json());

      const submit = await app.inject({
        method: 'POST',
        url: `/api/grammar/${lessonId}/answers`,
        payload: answer('draft-request', firstExerciseId, 'him'),
      });
      expect(submit.statusCode).toBe(404);
      expect(app.db.sqlite.prepare('SELECT count(*) AS count FROM grammar_exercise_attempts').get()).toEqual({ count: 0 });
      expect(app.db.sqlite.prepare('SELECT count(*) AS count FROM grammar_lesson_progress').get()).toEqual({ count: 0 });
    } finally {
      await app.close();
    }
  });

  it('validates route input and returns reviewed content without canonical answer keys', async () => {
    const app = await createApp(':memory:');
    try {
      const invalidPath = await app.inject({ method: 'GET', url: '/api/grammar/not-a-grammar-id' });
      expect(invalidPath.statusCode).toBe(400);
      expect(invalidPath.json().error.code).toBe('VALIDATION_ERROR');

      const detail = await app.inject({ method: 'GET', url: `/api/grammar/${lessonId}` });
      expect(detail.statusCode).toBe(200);
      expect(detail.json().data).toMatchObject({
        lesson: {
          id: lessonId,
          revisionId: expect.any(String),
          revision: expect.any(String),
          exercises: [{ id: firstExerciseId }, { id: secondExerciseId }],
        },
        progress: null,
        nextLessonId: 'grammar-0-word-roles',
      });
      expect(detail.payload).not.toMatch(/"(?:correct|rationale|acceptedAnswers|review)"\s*:/);

      const invalidBody = await app.inject({
        method: 'POST',
        url: `/api/grammar/${lessonId}/answers`,
        payload: { ...answer('bad', firstExerciseId, 'he'), extra: true },
      });
      expect(invalidBody.statusCode).toBe(400);
      expect(invalidBody.json().error.code).toBe('VALIDATION_ERROR');
    } finally {
      await app.close();
    }
  });

  it('grades, retries idempotently, detects request conflicts, completes A1 lesson and reopens persisted progress', async () => {
    const directory = mkdtempSync(join(tmpdir(), 'grammar-routes-'));
    temporaryDirectories.push(directory);
    const dbPath = join(directory, 'grammar.db');
    let app = await createApp(dbPath);
    try {
      app.db.sqlite.prepare(`INSERT INTO study_tasks
        (id, scheduled_date, kind, target_count, source, lesson_id, revision_id, revision, version,
          created_at, updated_at, creation_intent)
        VALUES ('grammar-route-task', '2026-10-02', 'GRAMMAR', 1, 'MANUAL', ?, ?, ?, 1, ?, ?, '{}')`).run(
        lessonId,
        'grammar-a1-pronouns-and-articles@1.0.0',
        '1.0.0',
        '2026-10-02T00:00:00.000Z',
        '2026-10-02T00:00:00.000Z',
      );
      app.db.sqlite.prepare(`INSERT INTO words (id, word, definition, created_at)
        VALUES ('route-word', 'untouched', 'Existing vocabulary row', '2026-09-26T10:00:00.000Z')`).run();

      const wrong = await app.inject({
        method: 'POST', url: `/api/grammar/${lessonId}/answers`,
        payload: answer('wrong-request', firstExerciseId, 'he'),
      });
      expect(wrong.statusCode).toBe(200);
      expect(wrong.json().data).toMatchObject({
        attempt: { exerciseId: firstExerciseId, answer: { text: 'he' }, isCorrect: false },
        progress: { lastPosition: 1, isComplete: false },
        nextLessonId: 'grammar-0-word-roles',
      });
      expect(wrong.json().data.attempt.feedback).toContain('he');

      const retry = await app.inject({
        method: 'POST', url: `/api/grammar/${lessonId}/answers`,
        payload: answer('wrong-request', firstExerciseId, 'he'),
      });
      expect(retry.json().data).toEqual(wrong.json().data);
      const conflict = await app.inject({
        method: 'POST', url: `/api/grammar/${lessonId}/answers`,
        payload: answer('wrong-request', firstExerciseId, 'him'),
      });
      expect(conflict.statusCode).toBe(409);
      expect(conflict.json().error.code).toBe('CONFLICT');
      expect(app.db.sqlite.prepare('SELECT count(*) AS count FROM grammar_exercise_attempts').get()).toEqual({ count: 1 });

      const correct = await app.inject({
        method: 'POST', url: `/api/grammar/${lessonId}/answers`,
        payload: { ...answer('correct-request', secondExerciseId, 'an apple'), studyTaskId: 'grammar-route-task' },
      });
      expect(correct.statusCode).toBe(200);
      expect(correct.json().data).toMatchObject({
        attempt: { exerciseId: secondExerciseId, isCorrect: true, studyTaskId: 'grammar-route-task', completedLesson: true },
        progress: { lastPosition: 2, isComplete: true },
        nextLessonId: 'grammar-0-word-roles',
      });
      expect(correct.json().data.attempt.feedback).toContain('âm nguyên âm');
      expect(app.db.sqlite.prepare('SELECT count(*) AS count FROM grammar_exercise_attempts').get()).toEqual({ count: 2 });
      await app.close();
      app = await createApp(dbPath);

      const reopened = await app.inject({ method: 'GET', url: `/api/grammar/${lessonId}` });
      expect(reopened.statusCode).toBe(200);
      expect(reopened.json().data).toMatchObject({
        progress: { lastPosition: 2, isComplete: true },
        nextLessonId: 'grammar-0-word-roles',
      });
      const course = await app.inject({ method: 'GET', url: '/api/grammar' });
      expect(course.json().data.stages[1].lessons[0].progress).toMatchObject({ lastPosition: 2, isComplete: true });
    } finally {
      await app.close();
    }
  });
});
