/**
 * @file ai-provider-compatibility.test.ts
 * @description Real ChatOpenAI transport regressions for providers that return normal conversational text.
 */
import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import type { FastifyInstance } from 'fastify';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { buildApp } from '../../src/app.js';

let app: FastifyInstance;
let provider: Server;
let reply: unknown;
let formatRequested: boolean;
let calls: number;
let revision: string;

beforeEach(async () => {
  reply = 'Chào bạn! Tôi có thể giúp bạn học tiếng Anh.';
  formatRequested = false;
  calls = 0;
  provider = createServer(async (request, response) => {
    let text = '';
    for await (const chunk of request) text += chunk;
    const input = JSON.parse(text);
    formatRequested = 'response_format' in input || Boolean(input.tools?.length);
    calls += 1;
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify({
      id: 'local-provider-chat', object: 'chat.completion', created: 1700000000, model: input.model,
      choices: [{ index: 0, message: { role: 'assistant', content: reply }, finish_reason: 'stop' }],
      usage: { prompt_tokens: 10, completion_tokens: 10, total_tokens: 20 },
    }));
  });
  await new Promise<void>(resolve => provider.listen(0, '127.0.0.1', resolve));
  const port = (provider.address() as AddressInfo).port;
  app = await buildApp({ dbPath: ':memory:', logger: false, aiSettings: { env: {
    BASE_URL: `http://127.0.0.1:${port}/v1`, API_KEY: 'local-test-only', AI_MODEL: 'luna', AI_TIMEOUT_MS: '2000',
  } } });
  revision = (await app.inject({ method: 'GET', url: '/api/ai/settings' })).json().data.revision;
});
afterEach(async () => {
  await app.close();
  await new Promise<void>((resolve, reject) => provider.close(error => error ? reject(error) : resolve()));
});

function ask() {
  return app.inject({ method: 'POST', url: '/api/ai/chat', payload: {
    message: 'hi', locale: 'vi', context: { kind: 'general' }, includeProgress: false, configRevision: revision,
  } });
}

describe('conversational provider compatibility', () => {
  it('accepts ordinary provider text without requiring a JSON schema or tool response', async () => {
    const before = app.db.sqlite.serialize();
    const result = await ask();
    expect(result.statusCode).toBe(200);
    expect(result.json().data.reply).toBe(reply);
    expect(result.json().data.configRevision).toBe(revision);
    expect(formatRequested).toBe(false);
    expect(calls).toBe(1);
    expect(before.equals(app.db.sqlite.serialize())).toBe(true);
  });

  it('includes only visible text blocks, never reasoning content', async () => {
    reply = [{ type: 'reasoning', reasoning: 'private internal reasoning' }, { type: 'text', text: 'A visible explanation.' }];
    const result = await ask();
    expect(result.statusCode).toBe(200);
    expect(result.json().data.reply).toBe('A visible explanation.');
    expect(result.body).not.toContain('private internal reasoning');
    reply = [{ type: 'reasoning', reasoning: 'private internal reasoning' }];
    expect((await ask()).json().error.code).toBe('AI_INVALID_OUTPUT');
  });

  it('keeps blank and oversized provider output as recoverable errors without retry', async () => {
    for (const value of ['', '   ', 'x'.repeat(4001)]) {
      reply = value;
      const before = calls;
      const result = await ask();
      expect(result.statusCode).toBe(502);
      expect(result.json().error.code).toBe('AI_INVALID_OUTPUT');
      expect(calls).toBe(before + 1);
    }
  });
});
