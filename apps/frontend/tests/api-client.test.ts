/**
 * @file api-client.test.ts
 * @description Verifies configured, desktop production, and web development API base URL resolution.
 */
import { describe, expect, it } from 'vitest';

import { resolveApiBaseUrl } from '../src/api/client';

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
