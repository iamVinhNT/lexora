/**
 * @file ai-settings.routes.test.ts
 * @description Real API and SQLite regressions for encrypted, revisioned AI configuration.
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { mkdtemp, mkdir, readFile, rm, stat, unlink, writeFile, chmod, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../../src/app.js';

const apps: FastifyInstance[] = [];
const directories: string[] = [];
const secret = 'settings-secret-not-for-export';
const bundle = { baseURL: 'https://provider.example/v1', models: ['model-one', 'model-two'], activeModel: 'model-one', apiKey: secret };
async function start(options: Parameters<typeof buildApp>[0] = {}) {
  const app = await buildApp({ logger: false, aiSettings: { env: {} }, ...options });
  apps.push(app);
  return app;
}
async function metadata(app: FastifyInstance) {
  const response = await app.inject({ method: 'GET', url: '/api/ai/settings' });
  expect(response.statusCode).toBe(200);
  expect(response.body).not.toContain(secret);
  return response.json().data;
}
async function save(app: FastifyInstance, input: object = bundle, expectedRevision?: string) {
  return app.inject({ method: 'PUT', url: '/api/ai/settings', payload: { ...input, expectedRevision: expectedRevision ?? (await metadata(app)).revision } });
}
async function persistent() {
  const root = await mkdtemp(join(tmpdir(), 'lexora-ai-settings-'));
  directories.push(root);
  return { dbPath: join(root, 'test.db'), aiSettings: { env: {}, keyPath: join(root, 'security', 'master.key') } };
}
afterEach(async () => {
  vi.restoreAllMocks();
  await Promise.all(apps.splice(0).map(app => app.close()));
  await Promise.all(directories.splice(0).map(path => rm(path, { recursive: true, force: true })));
});

describe('encrypted AI settings', () => {
  it('does not create keys on startup or GET; saves ciphertext and models across restart', async () => {
    const options = await persistent();
    const first = await start(options);
    const initial = await metadata(first);
    expect(initial).toMatchObject({ source: 'environment', hasApiKey: false, isConfigured: false });
    await expect(stat(options.aiSettings.keyPath)).rejects.toMatchObject({ code: 'ENOENT' });
    const result = await save(first);
    expect(result.statusCode).toBe(200);
    const saved = result.json().data;
    expect(saved).toMatchObject({ source: 'saved', models: bundle.models, activeModel: bundle.activeModel, isConfigured: true, hasApiKey: true });
    expect(saved.revision).not.toBe(initial.revision);
    const row = first.db.sqlite.prepare('SELECT * FROM ai_settings').get();
    expect(JSON.stringify(row)).not.toContain(secret);
    expect(first.db.sqlite.serialize().includes(Buffer.from(secret))).toBe(false);
    expect((await stat(options.aiSettings.keyPath)).mode & 0o777).toBe(0o600);
    expect((await stat(join(options.aiSettings.keyPath, '..'))).mode & 0o777).toBe(0o700);
    expect((await readFile(options.aiSettings.keyPath)).length).toBe(32);
    await first.close(); apps.splice(apps.indexOf(first), 1);
    const second = await start(options);
    expect(await metadata(second)).toEqual(saved);
    expect((await readFile(options.dbPath)).includes(Buffer.from(secret))).toBe(false);
  });

  it('retains credential only for same endpoint; rejects stale revisions and stale assistant models before generation', async () => {
    const generate = vi.fn(async () => ({ reply: 'Provider response.' }));
    const app = await start({ aiAssistant: { generate } });
    const saved = (await save(app)).json().data;
    expect((await save(app, { ...bundle, apiKey: undefined, baseURL: 'https://other.example/v1' }, saved.revision)).json().error.code).toBe('AI_API_KEY_REQUIRED');
    const changed = await save(app, { baseURL: bundle.baseURL, models: bundle.models, activeModel: 'model-two' }, saved.revision);
    expect(changed.statusCode).toBe(200);
    expect((await save(app, bundle, saved.revision)).statusCode).toBe(409);
    const request = { message: 'Explain.', locale: 'en', context: { kind: 'general' }, includeProgress: false };
    const stale = await app.inject({ method: 'POST', url: '/api/ai/chat', payload: { ...request, configRevision: saved.revision } });
    expect(stale.statusCode).toBe(409);
    expect(stale.json().error.code).toBe('AI_CONFIG_CHANGED');
    expect(generate).not.toHaveBeenCalled();
    const revision = changed.json().data.revision;
    const current = await app.inject({ method: 'POST', url: '/api/ai/chat', payload: { ...request, configRevision: revision } });
    expect(current.statusCode).toBe(200);
    expect(current.json().data.configRevision).toBe(revision);
    expect(JSON.stringify(generate.mock.calls)).not.toContain(secret);
  });

  it('isolates credential from backup/export/reset/restore and deletes config without learner writes', async () => {
    const app = await start();
    await app.inject({ method: 'POST', url: '/api/words', payload: { word: 'clear', definition: 'easy to understand' } });
    const before = (await app.inject({ method: 'GET', url: '/api/backup' })).json().data;
    const saved = (await save(app)).json().data;
    for (const url of ['/api/backup', '/api/export/full', '/api/export/vocabulary']) {
      const result = await app.inject({ method: 'GET', url });
      expect(result.statusCode).toBe(200);
      expect(result.body).not.toMatch(/settings-secret-not-for-export|api_key_ciphertext|ai_settings/);
    }
    const after = (await app.inject({ method: 'GET', url: '/api/backup' })).json().data;
    expect(after.data).toEqual(before.data);
    const deleted = await app.inject({ method: 'DELETE', url: '/api/ai/settings', payload: { expectedRevision: saved.revision } });
    expect(deleted.statusCode).toBe(200);
    expect((await app.inject({ method: 'GET', url: '/api/words' })).json().data).toMatchObject({ total: 1 });
    await save(app);
    expect((await app.inject({ method: 'POST', url: '/api/data/reset-all', payload: { confirm: true } })).statusCode).toBe(200);
    expect((await metadata(app)).source).toBe('saved');
    const preview = await app.inject({ method: 'POST', url: '/api/restore/preview', payload: { backup: before } });
    const restore = await app.inject({ method: 'POST', url: '/api/restore', payload: { backup: before, confirm: true, previewToken: preview.json().data.previewToken } });
    expect(restore.statusCode).toBe(200);
    expect((await metadata(app)).source).toBe('saved');
  });

  it('fails closed on metadata/ciphertext tampering, missing or wrong master key; explicit replacement recovers', async () => {
    const options = await persistent();
    const app = await start({ ...options, aiAssistant: { generate: async () => ({ reply: 'Must not run.' }) } });
    const saved = (await save(app)).json().data;
    app.db.sqlite.prepare('UPDATE ai_settings SET active_model = ?').run('model-two');
    expect((await metadata(app)).isConfigured).toBe(false);
    const chat = { message: 'Explain.', locale: 'en', context: { kind: 'general' }, includeProgress: false, configRevision: saved.revision };
    expect((await app.inject({ method: 'POST', url: '/api/ai/chat', payload: chat })).json().error.code).toBe('AI_SETTINGS_UNAVAILABLE');
    expect((await save(app, { baseURL: bundle.baseURL, models: bundle.models, activeModel: 'model-two' })).statusCode).toBe(503);
    expect((await save(app)).statusCode).toBe(200);
    await unlink(options.aiSettings.keyPath);
    expect((await metadata(app)).isConfigured).toBe(false);
    await expect(stat(options.aiSettings.keyPath)).rejects.toMatchObject({ code: 'ENOENT' });
    expect((await save(app, { baseURL: bundle.baseURL, models: bundle.models, activeModel: bundle.activeModel })).statusCode).toBe(503);
    expect((await save(app)).statusCode).toBe(200);
    await writeFile(options.aiSettings.keyPath, Buffer.alloc(32, 7), { mode: 0o600 });
    expect((await metadata(app)).isConfigured).toBe(false);
    expect((await save(app)).statusCode).toBe(200);
  });

  it('enforces input policy and local peer/Host/Origin for every settings verb', async () => {
    const app = await start();
    const initial = await metadata(app);
    for (const input of [
      { ...bundle, models: [] }, { ...bundle, models: ['dup', ' dup '] }, { ...bundle, activeModel: 'missing' },
      { ...bundle, apiKey: '' }, { ...bundle, models: ['x'.repeat(201)] }, { ...bundle, surprise: secret },
      ...['http://remote.example/v1', 'https://user:pass@example.com/v1', 'https://example.com/v1?key=secret', 'https://example.com/#x'].map(baseURL => ({ ...bundle, baseURL })),
    ]) expect((await save(app, input, initial.revision)).statusCode).toBe(400);
    expect((await save(app, { ...bundle, apiKey: undefined }, initial.revision)).json().error.code).toBe('AI_API_KEY_REQUIRED');
    for (const method of ['GET', 'PUT', 'DELETE'] as const) for (const boundary of [
      { remoteAddress: '192.168.1.2' }, { headers: { host: 'attacker.example' } },
      { headers: { host: 'localhost:3001', origin: 'https://attacker.example' } },
    ]) expect((await app.inject({ method, url: '/api/ai/settings', ...(method === 'GET' ? {} : { payload: { ...bundle, expectedRevision: initial.revision } }), ...boundary })).statusCode).toBe(403);
    expect((await save(app, { ...bundle, baseURL: 'http://127.0.0.1:9000/v1' })).statusCode).toBe(200);
  });

  it('pins an in-flight request to original revision and never retries after settings change', async () => {
    let finish!: (value: unknown) => void;
    let began!: () => void;
    const started = new Promise<void>(resolve => { began = resolve; });
    const generate = vi.fn(() => { began(); return new Promise(resolve => { finish = resolve; }); });
    const app = await start({ aiAssistant: { generate } });
    const saved = (await save(app)).json().data;
    const pending = app.inject({ method: 'POST', url: '/api/ai/chat', payload: {
      message: 'Explain.', locale: 'en', context: { kind: 'general' }, includeProgress: false, configRevision: saved.revision,
    } });
    await started;
    const changed = await save(app, { baseURL: bundle.baseURL, models: bundle.models, activeModel: 'model-two' }, saved.revision);
    expect(changed.statusCode).toBe(200);
    finish({ reply: 'Response started before change.' });
    const response = await pending;
    expect(response.statusCode).toBe(200);
    expect(response.json().data.configRevision).toBe(saved.revision);
    expect(generate).toHaveBeenCalledTimes(1);
  });

  it('keeps in-memory master keys off disk and restores complete environment bundle on explicit deletion', async () => {
    const options = await persistent();
    const env = { API_KEY: 'environment-key', BASE_URL: 'https://environment.example/v1', AI_MODEL: 'environment-model' };
    const app = await start({ dbPath: ':memory:', aiSettings: { env, keyPath: options.aiSettings.keyPath } });
    const initial = await metadata(app);
    expect(initial).toMatchObject({ source: 'environment', baseURL: env.BASE_URL, activeModel: env.AI_MODEL, isConfigured: true });
    const saved = (await save(app)).json().data;
    expect(saved).toMatchObject({ source: 'saved', baseURL: bundle.baseURL, activeModel: bundle.activeModel });
    await expect(stat(options.aiSettings.keyPath)).rejects.toMatchObject({ code: 'ENOENT' });
    const result = await app.inject({ method: 'DELETE', url: '/api/ai/settings', payload: { expectedRevision: saved.revision } });
    expect(result.statusCode).toBe(200);
    const deleted = result.json().data;
    expect(deleted).toMatchObject({ source: 'environment', baseURL: env.BASE_URL, models: [env.AI_MODEL], activeModel: env.AI_MODEL, isConfigured: true });
    expect(deleted.revision).not.toBe(initial.revision);
    expect(deleted.revision).not.toContain(env.API_KEY);
    expect((await save(app, bundle, initial.revision)).statusCode).toBe(409);
  });


  it('uses exclusive fully-written master-key publication and CAS across concurrent backend instances', async () => {
    const options = await persistent();
    const first = await start(options);
    const second = await start(options);
    const [firstRevision, secondRevision] = await Promise.all([metadata(first), metadata(second)]);
    const results = await Promise.all([
      save(first, bundle, firstRevision.revision),
      save(second, { ...bundle, activeModel: 'model-two' }, secondRevision.revision),
    ]);
    expect(results.map(result => result.statusCode).sort()).toEqual([200, 409]);
    const current = await metadata(first);
    expect(current.isConfigured).toBe(true);
    expect(await metadata(second)).toEqual(current);
    const keyBefore = await readFile(options.aiSettings.keyPath);
    const rowBefore = first.db.sqlite.prepare('SELECT api_key_nonce FROM ai_settings').get() as { api_key_nonce: string };
    const updated = await save(second, { baseURL: bundle.baseURL, models: bundle.models, activeModel: 'model-two' }, current.revision);
    expect(updated.statusCode).toBe(200);
    expect(await readFile(options.aiSettings.keyPath)).toEqual(keyBefore);
    const rowAfter = first.db.sqlite.prepare('SELECT api_key_nonce, api_key_tag FROM ai_settings').get() as { api_key_nonce: string; api_key_tag: string };
    expect(rowAfter.api_key_nonce).not.toBe(rowBefore.api_key_nonce);
    expect(Buffer.from(rowAfter.api_key_nonce, 'base64')).toHaveLength(12);
    expect(Buffer.from(rowAfter.api_key_tag, 'base64')).toHaveLength(16);
    expect((await first.inject({ method: 'DELETE', url: '/api/ai/settings', payload: { expectedRevision: current.revision } })).statusCode).toBe(409);
  });

  it('authenticates provider/model metadata and ciphertext without falling back to environment', async () => {
    const generate = vi.fn(async () => ({ reply: 'Never run.' }));
    const app = await start({ aiAssistant: { generate }, aiSettings: { env: { API_KEY: 'environment-key' } } });
    for (const [column, value] of [
      ['base_url', 'https://attacker.example/v1'], ['models_json', '["model-one","model-two","extra"]'],
      ['active_model', 'model-two'], ['api_key_ciphertext', 'AAAA'], ['api_key_nonce', 'AAAA'], ['api_key_tag', 'AAAA'], ['crypto_version', 2],
    ] as const) {
      const saved = (await save(app)).json().data;
      app.db.sqlite.prepare('UPDATE ai_settings SET ' + column + ' = ?').run(value);
      expect((await metadata(app)).isConfigured).toBe(false);
      const response = await app.inject({ method: 'POST', url: '/api/ai/chat', payload: {
        message: 'Explain.', locale: 'en', context: { kind: 'general' }, includeProgress: false, configRevision: saved.revision,
      } });
      expect(response.statusCode).toBe(503);
      expect(response.json().error.code).toBe('AI_SETTINGS_UNAVAILABLE');
      expect(response.body).not.toContain(secret);
      expect(generate).not.toHaveBeenCalled();
    }
  });


  it('rejects insecure and symlink master keys without overwriting them', async () => {
    const options = await persistent();
    await mkdir(join(options.aiSettings.keyPath, '..'), { mode: 0o700 });
    const app = await start(options);
    await writeFile(options.aiSettings.keyPath, Buffer.alloc(32, 1), { mode: 0o644 });
    expect((await save(app)).statusCode).toBe(503);
    await chmod(options.aiSettings.keyPath, 0o600);
    await writeFile(options.aiSettings.keyPath, Buffer.alloc(31, 1));
    expect((await save(app)).statusCode).toBe(503);
    expect(await readFile(options.aiSettings.keyPath)).toHaveLength(31);
    await chmod(join(options.aiSettings.keyPath, '..'), 0o755);
    expect((await save(app)).statusCode).toBe(503);
    await chmod(join(options.aiSettings.keyPath, '..'), 0o700);
    await unlink(options.aiSettings.keyPath);
    const target = join(options.aiSettings.keyPath, '..', 'target');
    await writeFile(target, Buffer.alloc(32, 2), { mode: 0o600 });
    await symlink(target, options.aiSettings.keyPath);
    expect((await save(app)).statusCode).toBe(503);
    expect(await readFile(target)).toEqual(Buffer.alloc(32, 2));
  });
});
