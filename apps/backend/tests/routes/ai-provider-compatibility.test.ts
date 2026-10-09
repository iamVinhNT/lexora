/**
 * @file ai-provider-compatibility.test.ts
 * @description Real ChatOpenAI stream transport regressions for providers that return normal conversational text.
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

function parseSseEvents(body: string): Array<{ event: string; data: Record<string, unknown> }> {
  const events: Array<{ event: string; data: Record<string, unknown> }> = [];
  const frames = body.split('\n\n');
  for (const frame of frames) {
    if (!frame.trim()) continue;
    const lines = frame.split('\n');
    const eventLine = lines.find((l) => l.startsWith('event: '));
    const dataLine = lines.find((l) => l.startsWith('data: '));
    if (eventLine && dataLine) {
      events.push({
        event: eventLine.slice(7).trim(),
        data: JSON.parse(dataLine.slice(6)) as Record<string, unknown>,
      });
    }
  }
  return events;
}

function parseSseData<T = Record<string, unknown>>(body: string, eventName: string): T | null {
  const events = parseSseEvents(body);
  const found = events.find((e) => e.event === eventName);
  return found ? (found.data as unknown as T) : null;
}

beforeEach(async () => {
  reply = 'Chào bạn! Tôi có thể giúp bạn học tiếng Anh.';
  formatRequested = false;
  calls = 0;
  provider = createServer(async (request, response) => {
    let text = '';
    for await (const chunk of request) text += chunk;
    const input = JSON.parse(text) as { model: string; stream?: boolean; tools?: unknown[] };
    formatRequested = 'response_format' in input || Boolean(input.tools?.length);
    calls += 1;

    if (input.stream) {
      response.setHeader('content-type', 'text/event-stream');
      const items = Array.isArray(reply) ? reply : [reply];
      for (const item of items) {
        let delta: Record<string, unknown>;
        if (typeof item === 'string') {
          delta = { content: item };
        } else if (item && typeof item === 'object' && 'type' in item) {
          const typed = item as { type: string; reasoning?: string; text?: string };
          if (typed.type === 'reasoning') {
            delta = { reasoning_content: typed.reasoning };
          } else {
            delta = { content: typed.text ?? '' };
          }
        } else {
          delta = { content: String(item) };
        }
        response.write(
          `data: ${JSON.stringify({
            id: 'local-provider-chat',
            object: 'chat.completion.chunk',
            created: 1700000000,
            model: input.model,
            choices: [{ index: 0, delta, finish_reason: null }],
          })}\n\n`,
        );
      }
      response.write(
        `data: ${JSON.stringify({
          id: 'local-provider-chat',
          object: 'chat.completion.chunk',
          created: 1700000000,
          model: input.model,
          choices: [{ index: 0, delta: {}, finish_reason: 'stop' }],
        })}\n\n`,
      );
      response.write('data: [DONE]\n\n');
      response.end();
      return;
    }

    response.setHeader('content-type', 'application/json');
    response.end(
      JSON.stringify({
        id: 'local-provider-chat',
        object: 'chat.completion',
        created: 1700000000,
        model: input.model,
        choices: [{ index: 0, message: { role: 'assistant', content: reply }, finish_reason: 'stop' }],
        usage: { prompt_tokens: 10, completion_tokens: 10, total_tokens: 20 },
      }),
    );
  });
  await new Promise<void>((resolve) => provider.listen(0, '127.0.0.1', resolve));
  const port = (provider.address() as AddressInfo).port;
  app = await buildApp({
    dbPath: ':memory:',
    logger: false,
    aiSettings: {
      env: {
        BASE_URL: `http://127.0.0.1:${port}/v1`,
        API_KEY: 'local-test-only',
        AI_MODEL: 'luna',
        AI_TIMEOUT_MS: '2000',
      },
    },
  });
  revision = (await app.inject({ method: 'GET', url: '/api/ai/settings' })).json().data.revision;
});

afterEach(async () => {
  await app.close();
  await new Promise<void>((resolve, reject) => provider.close((error) => (error ? reject(error) : resolve())));
});

function ask(bodyOverrides: Record<string, unknown> = {}) {
  return app.inject({
    method: 'POST',
    url: '/api/ai/chat',
    payload: {
      message: 'hi',
      locale: 'vi',
      context: { kind: 'general' },
      includeProgress: false,
      configRevision: revision,
      ...bodyOverrides,
    },
  });
}

describe('conversational provider compatibility', () => {
  it('accepts ordinary provider text without requiring a JSON schema or tool response', async () => {
    const before = app.db.sqlite.serialize();
    const result = await ask();
    expect(result.statusCode).toBe(200);
    expect(result.headers['content-type']).toContain('text/event-stream');

    const done = parseSseData<{ data: { reply: string; configRevision: string } }>(result.body, 'done');
    expect(done?.data.reply).toBe(reply);
    expect(done?.data.configRevision).toBe(revision);
    expect(formatRequested).toBe(false);
    expect(calls).toBe(1);
    expect(before.equals(app.db.sqlite.serialize())).toBe(true);
  });

  it('streams distinct delta frames across multi-chunk responses', async () => {
    reply = ['Xin ', 'chào ', 'bạn!'];
    const result = await ask();
    expect(result.statusCode).toBe(200);

    const events = parseSseEvents(result.body);
    expect(events[0]?.event).toBe('meta');

    const deltas = events.filter((e) => e.event === 'delta');
    expect(deltas.length).toBeGreaterThanOrEqual(1);

    const done = events.find((e) => e.event === 'done');
    expect(done?.data).toMatchObject({
      success: true,
      data: { reply: 'Xin chào bạn!', configRevision: revision },
    });
  });

  it('includes only visible text blocks, never reasoning content', async () => {
    reply = [
      { type: 'reasoning', reasoning: 'private internal reasoning' },
      { type: 'text', text: 'A visible explanation.' },
    ];
    const result = await ask();
    expect(result.statusCode).toBe(200);
    expect(result.body).not.toContain('private internal reasoning');

    const done = parseSseData<{ data: { reply: string } }>(result.body, 'done');
    expect(done?.data.reply).toBe('A visible explanation.');

    reply = [{ type: 'reasoning', reasoning: 'private internal reasoning' }];
    const invalid = await ask();
    expect(invalid.statusCode).toBe(200);
    const err = parseSseData<{ error: { code: string } }>(invalid.body, 'error');
    expect(err?.error.code).toBe('AI_INVALID_OUTPUT');
  });

  it('keeps blank and oversized provider output as recoverable errors without retry', async () => {
    for (const value of ['', '   ', 'x'.repeat(4001)]) {
      reply = value;
      const before = calls;
      const result = await ask();
      expect(result.statusCode).toBe(200);
      const err = parseSseData<{ error: { code: string } }>(result.body, 'error');
      expect(err?.error.code).toBe('AI_INVALID_OUTPUT');
      expect(calls).toBe(before + 1);
    }
  });
});
