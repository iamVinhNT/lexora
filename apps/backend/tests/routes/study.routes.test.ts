/**
 * @file study.routes.test.ts
 * @description Exercises study preferences, previews, task mutations, and grammar availability over Fastify.
 */
import { afterEach, describe, expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../../src/app.js';
import { createTestCurriculum } from '../grammar/fixtures.js';
import { type AiStudyPlannerDependencies } from '../../src/services/ai-study-planner.service.js';
import { readAiConfig } from '../../src/services/ai-client.js';
import { reviewLogs, reviewStates, words } from '../../src/db/schema.js';

const apps: FastifyInstance[] = [];
const today = new Date().toISOString().slice(0, 10);

const publishedFixture = createTestCurriculum;

async function createApp(curriculum = publishedFixture(), aiStudyPlanner?: AiStudyPlannerDependencies): Promise<FastifyInstance> {
  const app = await buildApp({ dbPath: ':memory:', logger: false, grammarCurriculum: curriculum,
    ...(aiStudyPlanner ? { aiStudyPlanner } : {}) });
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
  it('returns an editable AI preview without changing tasks, review evidence, or due dates', async () => {
    const app = await createApp(undefined, {
      env: { API_KEY: 'fixture-key', AI_MODEL: 'fixture-model' },
      generate: async () => ({ suggestions: [] }),
    });
    await app.inject({ method: 'PUT', url: '/api/study-preferences', payload: {
      timeZone: 'UTC', studyDays: [1, 2, 3, 4, 5, 6, 7], learningTarget: 2, reviewTarget: 2, grammarTarget: 0,
    } });
    await app.inject({ method: 'POST', url: '/api/study-tasks', payload: {
      id: 'ai-existing-review', kind: 'REVIEW_WORDS', scheduledDate: today, targetCount: 1, source: 'MANUAL',
    } });
    app.db.insert(words).values({ id: 'ai-due-word', word: 'canary-word', definition: 'canary-definition',
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }).run();
    app.db.insert(reviewStates).values({ id: 'ai-due-state', wordId: 'ai-due-word', dueAt: new Date(Date.now() - 60_000).toISOString() }).run();
    app.db.insert(reviewLogs).values({ id: 'ai-existing-log', wordId: 'ai-due-word', reviewType: 'RECALL', rating: 'GOOD',
      answer: 'canary-answer', createdAt: new Date().toISOString() }).run();
    const tasksBefore = app.db.sqlite.prepare('SELECT * FROM study_tasks ORDER BY id').all();
    const dueBefore = app.db.sqlite.prepare('SELECT * FROM review_states ORDER BY id').all();
    const logsBefore = app.db.sqlite.prepare('SELECT * FROM review_logs ORDER BY id').all();

    const response = await app.inject({ method: 'POST', url: '/api/ai-study-plan-previews', payload: { locale: 'vi' } });

    expect(response.statusCode).toBe(200);
    expect(response.json().data).toMatchObject({ timeZone: 'UTC', from: today, suggestions: [] });
    expect(app.db.sqlite.prepare('SELECT * FROM study_tasks ORDER BY id').all()).toEqual(tasksBefore);
    expect(app.db.sqlite.prepare('SELECT * FROM review_states ORDER BY id').all()).toEqual(dueBefore);
    expect(app.db.sqlite.prepare('SELECT * FROM review_logs ORDER BY id').all()).toEqual(logsBefore);
  });

  it('maps model-output errors to a stable response without returning provider details', async () => {
    const app = await createApp(undefined, {
      env: { API_KEY: 'fixture-key', AI_MODEL: 'fixture-model' },
      generate: async () => ({ providerSecret: 'DO_NOT_EXPOSE' }),
    });
    const response = await app.inject({ method: 'POST', url: '/api/ai-study-plan-previews', payload: { locale: 'en' } });
    expect(response.statusCode).toBe(502);
    expect(response.json()).toMatchObject({ success: false, error: { code: 'AI_INVALID_RESPONSE', message: 'AI planner returned an invalid response' } });
    expect(response.payload).not.toContain('DO_NOT_EXPOSE');
    expect(app.db.sqlite.prepare('SELECT * FROM study_tasks').all()).toEqual([]);
  });

  it('rejects unsupported AI planner request fields', async () => {
    const app = await createApp(undefined, { env: { API_KEY: 'fixture-key' }, generate: async () => ({ suggestions: [] }) });
    const response = await app.inject({ method: 'POST', url: '/api/ai-study-plan-previews', payload: { locale: 'en', candidates: [] } });
    expect(response.statusCode).toBe(400);
    expect(response.json()).toMatchObject({ success: false, error: { code: 'VALIDATION_ERROR' } });
  });
  it('maps missing planner credentials to a stable error without calling a provider', async () => {
    const savedApiKey = process.env.API_KEY;
    const savedBaseUrl = process.env.BASE_URL;
    delete process.env.API_KEY;
    delete process.env.BASE_URL;
    try {
      const app = await createApp();
      const response = await app.inject({ method: 'POST', url: '/api/ai-study-plan-previews', payload: { locale: 'en' } });
      expect(response.statusCode).toBe(503);
      expect(response.json()).toMatchObject({ success: false, error: { code: 'AI_NOT_CONFIGURED' } });
    } finally {
      if (savedApiKey === undefined) delete process.env.API_KEY; else process.env.API_KEY = savedApiKey;
      if (savedBaseUrl === undefined) delete process.env.BASE_URL; else process.env.BASE_URL = savedBaseUrl;
    }
  });
  it('rejects invalid planner configuration before provider access', async () => {
    const previous = { API_KEY: process.env.API_KEY, BASE_URL: process.env.BASE_URL, AI_MODEL: process.env.AI_MODEL, AI_TIMEOUT_MS: process.env.AI_TIMEOUT_MS };
    const request = async () => (await createApp()).inject({ method: 'POST', url: '/api/ai-study-plan-previews', payload: { locale: 'en' } });
    const expectNotConfigured = (response: Awaited<ReturnType<typeof request>>) => {
      expect(response.statusCode).toBe(503);
      expect(response.json()).toMatchObject({ success: false, error: { code: 'AI_NOT_CONFIGURED' } });
    };
    try {
      process.env.API_KEY = 'test-key';
      process.env.BASE_URL = 'not-a-url';
      process.env.AI_MODEL = 'fixture-model';
      expectNotConfigured(await request());

      process.env.BASE_URL = 'https://provider.example/v1';
      delete process.env.AI_MODEL;
      expectNotConfigured(await request());

      delete process.env.BASE_URL;
      process.env.AI_TIMEOUT_MS = '30001';
      expectNotConfigured(await request());
    } finally {
      for (const [key, value] of Object.entries(previous)) {
        if (value === undefined) delete process.env[key]; else process.env[key] = value;
      }
    }
  });
});
describe('AI planner provider configuration', () => {

  it('rejects missing credentials, malformed or credential-bearing URLs, missing custom models, and unsafe timeouts', () => {
    const invalidConfigurations: NodeJS.ProcessEnv[] = [
      {},
      { API_KEY: 'fixture-key', BASE_URL: 'not-a-url', AI_MODEL: 'fixture-model' },
      { API_KEY: 'fixture-key', BASE_URL: 'https://user:pass@provider.example/v1', AI_MODEL: 'fixture-model' },
      { API_KEY: 'fixture-key', BASE_URL: 'https://provider.example/v1' },
      { API_KEY: 'fixture-key', AI_TIMEOUT_MS: '0' },
      { API_KEY: 'fixture-key', AI_TIMEOUT_MS: '30001' },
    ];
    for (const env of invalidConfigurations) {
      let error: unknown;
      try { readAiConfig(env); } catch (caught) { error = caught; }
      expect(error).toMatchObject({ statusCode: 503, code: 'AI_NOT_CONFIGURED' });
    }
    expect(readAiConfig({ API_KEY: 'fixture-key', AI_TIMEOUT_MS: '1' }).timeoutMs).toBe(1);
    expect(readAiConfig({ API_KEY: 'fixture-key', AI_TIMEOUT_MS: '30000' }).timeoutMs).toBe(30_000);
  });
});
