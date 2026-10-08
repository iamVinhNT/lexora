/**
 * @file ai-client.test.ts
 * @description Verifies shared AI configuration trust-boundary errors and timeout limits.
 */
import { describe, expect, it } from 'vitest';
import { readAiConfig } from '../../src/services/ai-client.js';

describe('readAiConfig', () => {

  it('rejects missing or empty API_KEY', () => {
    for (const env of [{}, { API_KEY: '' }, { API_KEY: '   ' }]) {
      expect(() => readAiConfig(env)).toThrowError(
        expect.objectContaining({ statusCode: 503, code: 'AI_NOT_CONFIGURED' }),
      );
    }
  });

  it('rejects custom BASE_URL without explicit model', () => {
    expect(() => readAiConfig({
      API_KEY: 'test-key',
      BASE_URL: 'https://custom.provider/v1',
    })).toThrowError(
      expect.objectContaining({ statusCode: 503, code: 'AI_NOT_CONFIGURED' }),
    );
  });

  it('rejects invalid or unsafe base URLs', () => {
    const invalidUrls = [
      'not-a-valid-url',
      'ftp://example.com/v1',
      'ws://example.com/v1',
      'https://user:pass@example.com/v1',
      'https://example.com/v1?token=secret',
      'https://example.com/v1#anchor',
      'http://remote.example/v1',
      'https://example.com/v1?',
      'https://example.com/v1#',
      'https://@example.com/v1',
    ];
    for (const BASE_URL of invalidUrls) {
      expect(() => readAiConfig({ API_KEY: 'key', BASE_URL, AI_MODEL: 'model' })).toThrowError(
        expect.objectContaining({ statusCode: 503, code: 'AI_NOT_CONFIGURED' }),
      );
    }
  });

  it('rejects invalid timeout values outside 1..30000 ms range or non-integers', () => {
    const invalidTimeouts = ['0', '-500', '30001', 'abc', '15.5', 'Infinity'];
    for (const AI_TIMEOUT_MS of invalidTimeouts) {
      expect(() => readAiConfig({ API_KEY: 'key', AI_TIMEOUT_MS })).toThrowError(
        expect.objectContaining({ statusCode: 503, code: 'AI_NOT_CONFIGURED' }),
      );
    }
  });

  it('accepts exact lower and upper timeout boundaries', () => {
    expect(readAiConfig({ API_KEY: 'key', AI_TIMEOUT_MS: '1' }).timeoutMs).toBe(1);
    expect(readAiConfig({ API_KEY: 'key', AI_TIMEOUT_MS: '30000' }).timeoutMs).toBe(30_000);
  });
});
