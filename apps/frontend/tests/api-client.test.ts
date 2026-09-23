/**
 * @file api-client.test.ts
 * @description Verifies API base URL resolution and request cancellation plumbing.
 */
import { afterEach, describe, expect, it, vi } from 'vitest';

import { listWords } from '../src/api/vocabulary.api';
import { resolveApiBaseUrl } from '../src/api/client';

afterEach(() => vi.unstubAllGlobals());

describe('resolveApiBaseUrl', () => {
  it('prefers configured deployment URL', () => {
    expect(resolveApiBaseUrl('https://api.lexora.example', true, 'http://127.0.0.1:45000')).toBe('https://api.lexora.example');
  });

  it('uses current origin in production desktop bundle', () => {
    expect(resolveApiBaseUrl('', true, 'http://127.0.0.1:45000')).toBe('http://127.0.0.1:45000');
  });

  it('keeps standalone backend URL in development', () => {
    expect(resolveApiBaseUrl('', false, 'http://localhost:5173')).toBe('http://localhost:3001');
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
