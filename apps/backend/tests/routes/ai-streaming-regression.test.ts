/**
 * @file ai-streaming-regression.test.ts
 * @description Focused regressions for real ChatOpenAI stream transport: multi-chunk,
 * reasoning exclusion, privacy boundaries, cancellation, and failure modes.
 */
import { createServer, type Server, type ServerResponse } from 'node:http';
import type { AddressInfo } from 'node:net';
import type { FastifyInstance } from 'fastify';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { buildApp } from '../../src/app.js';

let app: FastifyInstance;
let providerServer: Server;
let providerPort: number;
let configRevision: string;

type ProviderHandler = (reqBody: Record<string, unknown>, res: ServerResponse) => void | Promise<void>;
let currentHandler: ProviderHandler;

function parseSseEvents(body: string): Array<{ event: string; data: Record<string, unknown> }> {
  const events: Array<{ event: string; data: Record<string, unknown> }> = [];
  const frames = body.split('\n\n');
  for (const frame of frames) {
    if (!frame.trim()) continue;
    const lines = frame.split('\n');
    const eventLine = lines.find((l) => l.startsWith('event: '));
    const dataLine = lines.find((l) => l.startsWith('data: '));
    if (eventLine && dataLine) {
      const parsed = JSON.parse(dataLine.slice(6));
      if (parsed && typeof parsed === 'object') {
        events.push({
          event: eventLine.slice(7).trim(),
          data: parsed as Record<string, unknown>,
        });
      }
    }
  }
  return events;
}

function extractEventField(eventData: Record<string, unknown> | undefined, field: string): unknown {
  if (!eventData || typeof eventData !== 'object') return undefined;
  const innerData = eventData.data;
  if (!innerData || typeof innerData !== 'object') return undefined;
  if (field in innerData) {
    return (innerData as Record<string, unknown>)[field];
  }
  return undefined;
}

beforeEach(async () => {
  currentHandler = (_body, res) => {
    res.setHeader('content-type', 'text/event-stream');
    res.write(
      `data: ${JSON.stringify({
        id: 'chat-test',
        object: 'chat.completion.chunk',
        created: 1700000000,
        model: 'luna',
        choices: [{ index: 0, delta: { content: 'Default response' }, finish_reason: null }],
      })}\n\n`,
    );
    res.write('data: [DONE]\n\n');
    res.end();
  };

  providerServer = createServer(async (req, res) => {
    let raw = '';
    for await (const chunk of req) raw += chunk;
    const body = (raw ? JSON.parse(raw) : {}) as Record<string, unknown>;
    await currentHandler(body, res);
  });

  await new Promise<void>((resolve) => providerServer.listen(0, '127.0.0.1', resolve));
  providerPort = (providerServer.address() as AddressInfo).port;

  app = await buildApp({
    dbPath: ':memory:',
    logger: false,
    aiSettings: {
      env: {
        BASE_URL: `http://127.0.0.1:${providerPort}/v1`,
        API_KEY: 'test-key',
        AI_MODEL: 'luna',
        AI_TIMEOUT_MS: '2000',
      },
    },
  });

  const settingsRes = await app.inject({ method: 'GET', url: '/api/ai/settings' });
  const settingsJson = settingsRes.json();
  const settingsData = settingsJson && typeof settingsJson === 'object' && 'data' in settingsJson ? settingsJson.data : null;
  configRevision = typeof settingsData === 'object' && settingsData !== null && 'revision' in settingsData && typeof settingsData.revision === 'string'
    ? settingsData.revision
    : '';
});

afterEach(async () => {
  await app.close();
  await new Promise<void>((resolve, reject) => providerServer.close((err) => (err ? reject(err) : resolve())));
});

function postChat(overrides: Record<string, unknown> = {}) {
  return app.inject({
    method: 'POST',
    url: '/api/ai/chat',
    payload: {
      message: 'Hello assistant',
      locale: 'en',
      context: { kind: 'general' },
      includeContent: true,
      includeProgress: false,
      configRevision,
      ...overrides,
    },
  });
}

describe('AI Streaming Protocol & Boundary Regressions', () => {
  it('delivers ordered meta, multi-delta and done frames through ChatOpenAI stream', async () => {
    currentHandler = (_body, res) => {
      res.setHeader('content-type', 'text/event-stream');
      const chunks = ['Grammar ', 'is ', 'structured ', 'logically.'];
      for (const text of chunks) {
        res.write(
          `data: ${JSON.stringify({
            id: 'test',
            object: 'chat.completion.chunk',
            created: 1,
            model: 'luna',
            choices: [{ index: 0, delta: { content: text }, finish_reason: null }],
          })}\n\n`,
        );
      }
      res.write(
        `data: ${JSON.stringify({
          id: 'test',
          object: 'chat.completion.chunk',
          created: 1,
          model: 'luna',
          choices: [{ index: 0, delta: {}, finish_reason: 'stop' }],
        })}\n\n`,
      );
      res.write('data: [DONE]\n\n');
      res.end();
    };

    const response = await postChat();
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toContain('text/event-stream');
    expect(response.headers['cache-control']).toBe('no-cache, no-transform');

    const events = parseSseEvents(response.body);
    expect(events.length).toBeGreaterThanOrEqual(4);
    expect(events[0]?.event).toBe('meta');
    expect(events[0]?.data).toMatchObject({
      success: true,
      data: { configRevision, context: { kind: 'general' } },
    });

    const deltas = events.filter((e) => e.event === 'delta');
    expect(deltas.length).toBe(4);
    const collectedText = deltas.map((d) => extractEventField(d.data, 'text')).join('');
    expect(collectedText).toBe('Grammar is structured logically.');

    const done = events.find((e) => e.event === 'done');
    expect(done?.data).toMatchObject({
      success: true,
      data: {
        reply: 'Grammar is structured logically.',
        configRevision,
      },
    });
  });

  it('filters out reasoning chunks completely while streaming visible text', async () => {
    currentHandler = (_body, res) => {
      res.setHeader('content-type', 'text/event-stream');
      const items = [
        { reasoning: 'Step 1: check syntax' },
        { text: 'Correct usage: ' },
        { reasoning: 'Step 2: formulate rule' },
        { text: '"neither... nor" takes a singular verb.' },
      ];
      for (const item of items) {
        const delta = 'reasoning' in item
          ? { reasoning_content: item.reasoning }
          : { content: item.text };
        res.write(
          `data: ${JSON.stringify({
            id: 'test',
            object: 'chat.completion.chunk',
            created: 1,
            model: 'luna',
            choices: [{ index: 0, delta, finish_reason: null }],
          })}\n\n`,
        );
      }
      res.write(
        `data: ${JSON.stringify({
          id: 'test',
          object: 'chat.completion.chunk',
          created: 1,
          model: 'luna',
          choices: [{ index: 0, delta: {}, finish_reason: 'stop' }],
        })}\n\n`,
      );
      res.write('data: [DONE]\n\n');
      res.end();
    };

    const response = await postChat();
    expect(response.statusCode).toBe(200);
    expect(response.body).not.toContain('Step 1: check syntax');
    expect(response.body).not.toContain('Step 2: formulate rule');

    const done = parseSseEvents(response.body).find((e) => e.event === 'done');
    expect(extractEventField(done?.data, 'reply')).toBe(
      'Correct usage: "neither... nor" takes a singular verb.',
    );
  });


  it('safely transmits error frame and terminates stream when provider fails mid-stream', async () => {
    currentHandler = (_body, res) => {
      res.setHeader('content-type', 'text/event-stream');
      res.write(
        `data: ${JSON.stringify({
          id: 'test',
          object: 'chat.completion.chunk',
          created: 1,
          model: 'luna',
          choices: [{ index: 0, delta: { content: 'Beginning...' }, finish_reason: null }],
        })}\n\n`,
      );
      queueMicrotask(() => {
        res.destroy(new Error('Upstream socket exploded'));
      });
    };

    const response = await postChat();
    expect(response.statusCode).toBe(200);

    const events = parseSseEvents(response.body);
    expect(events[0]?.event).toBe('meta');

    const errorEvent = events.find((e) => e.event === 'error');
    expect(errorEvent).toBeDefined();
    expect(errorEvent?.data).toMatchObject({
      success: false,
      error: { code: 'AI_PROVIDER_ERROR' },
    });
    expect(response.body).not.toContain('Upstream socket exploded');
  });

  it('handles provider timeout gracefully with error event', async () => {
    currentHandler = () => {
      // Intentionally never respond to trigger timeout
    };

    const fastTimeoutApp = await buildApp({
      dbPath: ':memory:',
      logger: false,
      aiSettings: {
        env: {
          BASE_URL: `http://127.0.0.1:${providerPort}/v1`,
          API_KEY: 'test-key',
          AI_MODEL: 'luna',
          AI_TIMEOUT_MS: '50',
        },
      },
    });

    try {
      const fastSettingsRes = await fastTimeoutApp.inject({ method: 'GET', url: '/api/ai/settings' });
      const fastJson = fastSettingsRes.json();
      const fastData = fastJson && typeof fastJson === 'object' && 'data' in fastJson ? fastJson.data : null;
      const fastRevision = typeof fastData === 'object' && fastData !== null && 'revision' in fastData && typeof fastData.revision === 'string'
        ? fastData.revision
        : '';

      const response = await fastTimeoutApp.inject({
        method: 'POST',
        url: '/api/ai/chat',
        payload: {
          message: 'Hurry up',
          locale: 'en',
          context: { kind: 'general' },
          configRevision: fastRevision,
        },
      });

      expect(response.statusCode).toBe(200);
      const events = parseSseEvents(response.body);
      const errorEvent = events.find((e) => e.event === 'error');
      expect(errorEvent).toBeDefined();
      expect(errorEvent?.data).toMatchObject({
        success: false,
        error: { code: 'AI_TIMEOUT' },
      });
    } finally {
      await fastTimeoutApp.close();
    }
  });
});
