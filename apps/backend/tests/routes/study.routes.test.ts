/**
 * @file study.routes.test.ts
 * @description Exercises study preferences, previews, task mutations, and grammar availability over Fastify.
 */
import { afterEach, describe, expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../../src/app.js';
import { getGrammarCurriculum } from '../../src/grammar/content/manifest.js';
import type { GrammarCurriculum } from '../../src/grammar/content/types.js';

const apps: FastifyInstance[] = [];
const today = new Date().toISOString().slice(0, 10);

function publishedFixture(): GrammarCurriculum {
  const curriculum = getGrammarCurriculum();
  for (const [index, stage] of curriculum.stages.entries()) {
    stage.publicationStatus = index === 0 ? 'published' : 'draft';
    if (index === 0) {
      stage.lessons = [stage.lessons[0]!];
      stage.lessons[0]!.review = { status: 'approved', reviewer: 'Study route fixture', reviewedAt: '2026-09-26T10:00:00.000Z' };
    }
  }
  return curriculum;
}

async function createApp(curriculum = publishedFixture()): Promise<FastifyInstance> {
  const app = await buildApp({ dbPath: ':memory:', logger: false, grammarCurriculum: curriculum });
  apps.push(app);
  return app;
}

afterEach(async () => {
  for (const app of apps.splice(0)) await app.close();
});

describe('study HTTP routes', () => {
  it('returns null before setup and persists explicit preferences', async () => {
    const app = await createApp();
    expect((await app.inject({ method: 'GET', url: '/api/study-preferences' })).json()).toEqual({ success: true, data: null });

    const response = await app.inject({ method: 'PUT', url: '/api/study-preferences', payload: {
      timeZone: 'UTC', studyDays: [1, 2, 3], learningTarget: 5, reviewTarget: 8, grammarTarget: 1,
    } });
    expect(response.statusCode).toBe(200);
    expect(response.json().data).toMatchObject({ timeZone: 'UTC', studyDays: [1, 2, 3], learningTarget: 5, reviewTarget: 8, grammarTarget: 1 });
  });

  it('keeps calendar reads and previews read-only', async () => {
    const app = await createApp();
    await app.inject({ method: 'PUT', url: '/api/study-preferences', payload: {
      timeZone: 'UTC', studyDays: [1, 2, 3, 4, 5, 6, 7], learningTarget: 2, reviewTarget: 2, grammarTarget: 1,
    } });
    const before = app.db.sqlite.prepare('SELECT * FROM study_tasks').all();
    const calendar = await app.inject({ method: 'GET', url: `/api/study-calendar?from=${today}&to=${today}` });
    const preview = await app.inject({ method: 'POST', url: '/api/study-plan-previews', payload: {} });
    expect(calendar.statusCode).toBe(200);
    expect(preview.statusCode).toBe(200);
    expect(preview.json().data.from).toBe(today);
    expect(app.db.sqlite.prepare('SELECT * FROM study_tasks').all()).toEqual(before);
  });

  it('replays stable task IDs and returns explicit conflicts', async () => {
    const app = await createApp();
    const input = { id: 'review-today', kind: 'REVIEW_WORDS', scheduledDate: today, targetCount: 1, source: 'MANUAL' };
    const first = await app.inject({ method: 'POST', url: '/api/study-tasks', payload: input });
    const replay = await app.inject({ method: 'POST', url: '/api/study-tasks', payload: input });
    const changed = await app.inject({ method: 'POST', url: '/api/study-tasks', payload: { ...input, targetCount: 2 } });
    expect(first.statusCode).toBe(201);
    expect(replay.statusCode).toBe(200);
    expect(replay.json().data.task.id).toBe(first.json().data.task.id);
    expect(changed.statusCode).toBe(409);
    expect(changed.json().error.details.reason).toBe('TASK_ID_REUSED');
  });

  it('rejects malformed deep links and stale task versions', async () => {
    const app = await createApp();
    const missing = await app.inject({ method: 'GET', url: '/api/study-tasks/missing' });
    const invalid = await app.inject({ method: 'GET', url: '/api/study-calendar?from=2026-10-01&to=2026-11-20' });
    const created = await app.inject({ method: 'POST', url: '/api/study-tasks', payload: {
      id: 'patch-me', kind: 'REVIEW_WORDS', scheduledDate: today, targetCount: 1, source: 'MANUAL',
    } });
    const stale = await app.inject({ method: 'PATCH', url: '/api/study-tasks/patch-me', payload: { action: 'CANCEL', version: 2 } });
    expect(missing.statusCode).toBe(404);
    expect(invalid.statusCode).toBe(400);
    expect(created.statusCode).toBe(201);
    expect(stale.statusCode).toBe(409);
    expect(stale.json().error.details.reason).toBe('STALE_TASK_VERSION');
  });

  it('accepts fresh published grammar, then overlays withdrawal without mutating the task', async () => {
    const curriculum = publishedFixture();
    const app = await createApp(curriculum);
    const lesson = curriculum.stages[0]!.lessons[0]!;
    const fresh = await app.inject({ method: 'POST', url: '/api/study-tasks', payload: {
      id: 'grammar-fresh', kind: 'GRAMMAR', lessonId: lesson.id, revisionId: lesson.revisionId, revision: lesson.revision,
      scheduledDate: today, targetCount: 1, source: 'MANUAL',
    } });
    expect(fresh.statusCode).toBe(201);
    expect(fresh.json().data.task.isUnavailable).toBe(false);

    curriculum.stages[0]!.publicationStatus = 'draft';
    const task = await app.inject({ method: 'GET', url: '/api/study-tasks/grammar-fresh' });
    const calendar = await app.inject({ method: 'GET', url: `/api/study-calendar?from=${today}&to=${today}` });
    expect(task.statusCode).toBe(200);
    expect(task.json().data).toMatchObject({ isUnavailable: true, unavailableReason: 'UNPUBLISHED' });
    expect(calendar.json().data.days[0].tasks[0]).toMatchObject({ isUnavailable: true, unavailableReason: 'UNPUBLISHED' });
  });

  it('rejects revision mismatch before mutation', async () => {
    const app = await createApp();
    const lesson = publishedFixture().stages[0]!.lessons[0]!;
    const mismatch = await app.inject({ method: 'POST', url: '/api/study-tasks', payload: {
      id: 'grammar-mismatch', kind: 'GRAMMAR', lessonId: lesson.id, revisionId: 'old-revision', revision: lesson.revision,
      scheduledDate: today, targetCount: 1, source: 'MANUAL',
    } });
    expect(mismatch.statusCode).toBe(409);
    expect(mismatch.json().error.details.reason).toBe('REVISION_MISMATCH');
    expect(app.db.sqlite.prepare('SELECT id FROM study_tasks WHERE id = ?').get('grammar-mismatch')).toBeUndefined();
  });
});
