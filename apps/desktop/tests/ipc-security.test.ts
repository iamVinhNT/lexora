/**
 * @file ipc-security.test.ts
 * @description Verifies IPC sender-origin validation shared by desktop handlers.
 */
import { describe, expect, it } from 'vitest';

import { isTrustedSender } from '../src/ipc-security.js';

const ORIGIN = 'http://127.0.0.1:45678';

describe('isTrustedSender', () => {
  it('accepts the embedded server origin from the sender frame or the web contents URL', () => {
    expect(isTrustedSender({ senderFrame: { url: `${ORIGIN}/words` } }, ORIGIN)).toBe(true);
    expect(isTrustedSender({ sender: { getURL: () => `${ORIGIN}/` } }, ORIGIN)).toBe(true);
  });

  it.each([
    ['another origin', { senderFrame: { url: 'https://evil.example/' } }],
    ['another port', { senderFrame: { url: 'http://127.0.0.1:1/' } }],
    ['a lookalike host', { senderFrame: { url: 'http://127.0.0.1:45678.evil.example/' } }],
    ['an invalid URL', { senderFrame: { url: 'not a url' } }],
    ['no sender', {}],
    ['a non-object event', null],
  ])('rejects %s', (_label, event) => {
    expect(isTrustedSender(event, ORIGIN)).toBe(false);
  });
});
