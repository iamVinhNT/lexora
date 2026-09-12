/**
 * @file app.test.ts
 * @description Integration coverage for the composed Lexora Fastify application.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';

describe('buildApp', () => {
  let app: FastifyInstance | undefined;

  afterEach(async () => {
    await app?.close();
    app = undefined;
  });

  it('exposes health and all completed route plugin families under one API prefix', async () => {
    app = await buildApp({ dbPath: ':memory:', logger: false });

    const health = await app.inject({ method: 'GET', url: '/api/health' });
    expect(health.statusCode).toBe(200);
    expect(JSON.parse(health.payload)).toEqual({
      success: true,
      data: { status: 'ok', app: 'Lexora API' },
    });

    const routes = [
      '/api/words',
      '/api/contexts',
      '/api/learning/session',
      '/api/reviews/due',
      '/api/progress',
      '/api/statistics/dashboard',
      '/api/backup',
    ];

    for (const url of routes) {
      const response = await app.inject({ method: 'GET', url });
      expect(response.statusCode, url).toBe(200);
      expect(JSON.parse(response.payload).success, url).toBe(true);
    }

    const duplicatePrefix = await app.inject({ method: 'GET', url: '/api/api/progress' });
    expect(duplicatePrefix.statusCode).toBe(404);
  });

  it('allows only configured local origins and handles CORS preflight safely', async () => {
    app = await buildApp({ dbPath: ':memory:', logger: false });

    const allowedResponse = await app.inject({
      method: 'GET',
      url: '/api/health',
      headers: { origin: 'http://localhost:5173' },
    });
    expect(allowedResponse.headers['access-control-allow-origin']).toBe('http://localhost:5173');

    const preflight = await app.inject({
      method: 'OPTIONS',
      url: '/api/words',
      headers: {
        origin: 'http://127.0.0.1:5173',
        'access-control-request-method': 'POST',
        'access-control-request-headers': 'content-type',
      },
    });
    expect(preflight.statusCode).toBe(204);
    expect(preflight.headers['access-control-allow-origin']).toBe('http://127.0.0.1:5173');
    expect(preflight.headers['access-control-allow-methods']).toContain('POST');

    const untrustedResponse = await app.inject({
      method: 'GET',
      url: '/api/health',
      headers: { origin: 'https://untrusted.example' },
    });
    expect(untrustedResponse.headers['access-control-allow-origin']).toBeUndefined();
    expect(untrustedResponse.statusCode).toBe(200);

    const untrustedPreflight = await app.inject({
      method: 'OPTIONS',
      url: '/api/words',
      headers: {
        origin: 'https://untrusted.example',
        'access-control-request-method': 'POST',
      },
    });
    expect(untrustedPreflight.headers['access-control-allow-origin']).toBeUndefined();
    expect(untrustedPreflight.statusCode).toBe(404);
  });

  it('uses CORS_ORIGINS as an explicit allowlist', async () => {
    vi.stubEnv('CORS_ORIGINS', 'https://lexora.example, https://admin.lexora.example');
    app = await buildApp({ dbPath: ':memory:', logger: false });

    const configured = await app.inject({
      method: 'GET',
      url: '/api/health',
      headers: { origin: 'https://lexora.example' },
    });
    expect(configured.headers['access-control-allow-origin']).toBe('https://lexora.example');

    const defaultLocal = await app.inject({
      method: 'GET',
      url: '/api/health',
      headers: { origin: 'http://localhost:5173' },
    });
    expect(defaultLocal.headers['access-control-allow-origin']).toBeUndefined();
    vi.unstubAllEnvs();
  });

  it('preserves standardized shared not-found responses', async () => {
    app = await buildApp({ dbPath: ':memory:', logger: false });

    const missing = await app.inject({ method: 'GET', url: '/api/does-not-exist' });
    expect(missing.statusCode).toBe(404);
    expect(JSON.parse(missing.payload)).toEqual({
      success: false,
      error: { code: 'NOT_FOUND', message: 'Route not found' },
    });
  });

  it('sanitizes unexpected errors from a composed route plugin', async () => {
    app = await buildApp({ dbPath: ':memory:', logger: false });
    app.db.sqlite.exec(`
      CREATE TRIGGER fail_word_insert
      BEFORE INSERT ON words
      BEGIN
        SELECT RAISE(ABORT, 'sensitive internal database detail');
      END;
    `);

    const response = await app.inject({
      method: 'POST',
      url: '/api/words',
      payload: { word: 'triggered', definition: 'must fail safely' },
    });

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.payload)).toEqual({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Internal server error' },
    });
    expect(response.payload).not.toContain('sensitive internal database detail');
  });
});
