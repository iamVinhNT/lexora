/**
 * @file api-client.test.ts
 * @description Verifies API base URL resolution and request cancellation plumbing.
 */
import { afterEach, describe, expect, it, vi } from 'vitest';

import { listWords } from '../src/api/vocabulary.api';
import { resolveApiBaseUrl } from '../src/api/client';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe('resolveApiBaseUrl', () => {
  it('prefers configured deployment URL', () => {
    expect(resolveApiBaseUrl('https://api.lexora.example', 'http://127.0.0.1:45000')).toBe('https://api.lexora.example');
  });

  it('uses current origin in production desktop bundle', () => {
    expect(resolveApiBaseUrl('', 'http://127.0.0.1:45000')).toBe('http://127.0.0.1:45000');
  });

  it('sends development API requests to the LAN website, not the visitor loopback', async () => {
    vi.stubEnv('VITE_API_BASE_URL', '');
    vi.stubEnv('PROD', false);
    vi.stubGlobal('window', { location: { origin: 'http://192.168.1.23:5173' } });
    vi.resetModules();
    // The API origin is captured at module load; import after setting the visitor origin.
    const { apiFetch } = await import('../src/api/client');
    const fetchMock = vi.fn(async (_url: URL) => ({
      ok: true,
      json: async () => ({ success: true, data: { status: 'ok' } }),
    }));
    vi.stubGlobal('fetch', fetchMock);

    await apiFetch('/api/health');

    expect(fetchMock.mock.calls[0][0].href).toBe('http://192.168.1.23:5173/api/health');
  });
});

describe('request cancellation', () => {
  it('forwards an abort signal through an endpoint function to fetch', async () => {
    const controller = new AbortController();
    const fetchMock = vi.fn(() => Promise.resolve({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: async () => ({ success: true, data: { total: 0, page: 1, limit: 20, items: [] } }),
    }));
    vi.stubGlobal('fetch', fetchMock);

    await listWords({ search: 'obsolete' }, controller.signal);

    expect(fetchMock).toHaveBeenCalledWith(expect.any(URL), expect.objectContaining({ signal: controller.signal }));
  });
});
