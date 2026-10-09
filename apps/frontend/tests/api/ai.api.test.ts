/**
 * @file ai.api.test.ts
 * @description Behavioral regressions for SSE streaming parser, chunks, UTF-8 boundaries, malformed frames, and terminal events.
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { streamAiChatMessage, type AiChatRequest } from '../../src/api/ai.api';

function createMockStreamResponse(chunks: (string | Uint8Array)[]): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) {
        if (typeof chunk === 'string') {
          controller.enqueue(encoder.encode(chunk));
        } else {
          controller.enqueue(chunk);
        }
      }
      controller.close();
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
    },
  });
}

const baseRequest: AiChatRequest = {
  configRevision: 'rev-1',
  message: 'Hello',
  locale: 'en',
  context: { kind: 'screen', screen: 'vocabulary' },
  includeContent: true,
  includeProgress: false,
};

describe('SSE streamAiChatMessage parser behavior', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('delivers progressive deltas and resolves with final payload on complete SSE stream', async () => {
    const rawChunks = [
      'event: meta\ndata: {"success":true,"data":{"configRevision":"rev-1","context":{"kind":"screen","label":"Vocabulary"}}}\n\n',
      'event: delta\ndata: {"success":true,"data":{"text":"Hello "}}\n\n',
      'event: delta\ndata: {"success":true,"data":{"text":"world!"}}\n\n',
      'event: done\ndata: {"success":true,"data":{"reply":"Hello world!","configRevision":"rev-1","context":{"kind":"screen","label":"Vocabulary"}}}\n\n',
    ];

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(createMockStreamResponse(rawChunks)));

    const receivedDeltas: string[] = [];
    let metaEvent: unknown = null;

    const result = await streamAiChatMessage(baseRequest, {
      onMeta: (meta) => {
        metaEvent = meta;
      },
      onDelta: (text) => {
        receivedDeltas.push(text);
      },
    });

    expect(metaEvent).toEqual({
      configRevision: 'rev-1',
      context: { kind: 'screen', label: 'Vocabulary' },
    });
    expect(receivedDeltas).toEqual(['Hello ', 'world!']);
    expect(result).toEqual({
      reply: 'Hello world!',
      configRevision: 'rev-1',
      context: { kind: 'screen', label: 'Vocabulary' },
    });
  });

  it('correctly decodes multi-byte UTF-8 sequences split across network chunks', async () => {
    const encoder = new TextEncoder();
    const fullText = 'event: meta\ndata: {"success":true,"data":{"configRevision":"rev-1","context":{"kind":"screen","label":"Vocabulary"}}}\n\n' +
      'event: delta\ndata: {"success":true,"data":{"text":"Tiếng Việt học tập"}}\n\n' +
      'event: done\ndata: {"success":true,"data":{"reply":"Tiếng Việt học tập","configRevision":"rev-1","context":{"kind":"screen","label":"Vocabulary"}}}\n\n';

    const fullBytes = encoder.encode(fullText);
    // Split byte buffer arbitrarily into 7-byte network chunks to cut through UTF-8 multi-byte characters
    const chunks: Uint8Array[] = [];
    const chunkSize = 7;
    for (let i = 0; i < fullBytes.length; i += chunkSize) {
      chunks.push(fullBytes.slice(i, i + chunkSize));
    }

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(createMockStreamResponse(chunks)));

    const deltas: string[] = [];
    const result = await streamAiChatMessage(baseRequest, {
      onDelta: (text) => deltas.push(text),
    });

    expect(deltas.join('')).toBe('Tiếng Việt học tập');
    expect(result.reply).toBe('Tiếng Việt học tập');
  });

  it('rejects with MALFORMED_STREAM when delta event arrives before meta event', async () => {
    const rawChunks = [
      'event: delta\ndata: {"success":true,"data":{"text":"Premature text"}}\n\n',
    ];

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(createMockStreamResponse(rawChunks)));

    await expect(streamAiChatMessage(baseRequest)).rejects.toMatchObject({
      name: 'ApiError',
      code: 'MALFORMED_STREAM',
    });
  });

  it('rejects with AI_CONFIG_CHANGED when response configRevision differs from request', async () => {
    const rawChunks = [
      'event: meta\ndata: {"success":true,"data":{"configRevision":"rev-stale","context":{"kind":"screen","label":"Vocabulary"}}}\n\n',
    ];

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(createMockStreamResponse(rawChunks)));

    await expect(streamAiChatMessage(baseRequest)).rejects.toMatchObject({
      name: 'ApiError',
      code: 'AI_CONFIG_CHANGED',
      status: 409,
    });
  });

  it('rejects with STREAM_TRUNCATED when stream terminates without terminal done or error', async () => {
    const rawChunks = [
      'event: meta\ndata: {"success":true,"data":{"configRevision":"rev-1","context":{"kind":"screen","label":"Vocabulary"}}}\n\n',
      'event: delta\ndata: {"success":true,"data":{"text":"Partial..."}}\n\n',
      // Stream abruptly ends here without done
    ];

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(createMockStreamResponse(rawChunks)));

    await expect(streamAiChatMessage(baseRequest)).rejects.toMatchObject({
      name: 'ApiError',
      code: 'STREAM_TRUNCATED',
    });
  });

  it('rejects with MALFORMED_STREAM when event data is not valid JSON', async () => {
    const rawChunks = [
      'event: meta\ndata: {not-valid-json}\n\n',
    ];

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(createMockStreamResponse(rawChunks)));

    await expect(streamAiChatMessage(baseRequest)).rejects.toMatchObject({
      name: 'ApiError',
      code: 'MALFORMED_STREAM',
    });
  });

  it('rejects with server error code when stream emits error event', async () => {
    const rawChunks = [
      'event: meta\ndata: {"success":true,"data":{"configRevision":"rev-1","context":{"kind":"screen","label":"Vocabulary"}}}\n\n',
      'event: error\ndata: {"success":false,"error":{"code":"RATE_LIMIT_EXCEEDED","message":"Too many requests"}}\n\n',
    ];

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(createMockStreamResponse(rawChunks)));

    await expect(streamAiChatMessage(baseRequest)).rejects.toMatchObject({
      name: 'ApiError',
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests',
    });
  });

  it('rejects incomplete terminal frames and mismatched final text', async () => {
    const prefix = 'event: meta\ndata: {"success":true,"data":{"configRevision":"rev-1","context":{"kind":"screen","label":"Vocabulary"}}}\n\n' +
      'event: delta\ndata: {"success":true,"data":{"text":"Visible text"}}\n\n';
    for (const [reply, ending, code] of [
      ['Visible text', '', 'STREAM_TRUNCATED'],
      ['Different text', '\n\n', 'MALFORMED_STREAM'],
      ['', '\n\n', 'MALFORMED_STREAM'],
    ]) {
      const terminal = `event: done\ndata: ${JSON.stringify({ success: true, data: { reply, configRevision: 'rev-1', context: { kind: 'screen', label: 'Vocabulary' } } })}${ending}`;
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(createMockStreamResponse([prefix, terminal])));
      await expect(streamAiChatMessage(baseRequest)).rejects.toMatchObject({ code });
    }
  });

  it('aborts cleanly when AbortSignal is triggered during stream', async () => {
    const controller = new AbortController();

    const stream = new ReadableStream<Uint8Array>({
      start(ctrl) {
        ctrl.enqueue(new TextEncoder().encode('event: meta\ndata: {"success":true,"data":{"configRevision":"rev-1","context":{"kind":"screen","label":"Vocabulary"}}}\n\n'));
      },
      pull() {
        controller.abort();
      },
    });

    const mockResponse = new Response(stream, {
      status: 200,
      headers: { 'Content-Type': 'text/event-stream' },
    });

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResponse));

    await expect(streamAiChatMessage(baseRequest, {}, controller.signal)).rejects.toThrow();
  });
});
