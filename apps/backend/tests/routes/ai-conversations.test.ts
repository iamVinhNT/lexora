/**
 * @file ai-conversations.test.ts
 * @description Comprehensive backend regressions for persistent AI conversation threads,
 * turn lifecycle, atomic claim/replay, revision guards, and provider sharing boundaries.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp, type AiAssistantPrompt } from '../../src/app.js';
import { createAiConversationTables } from '../../src/db/ai-conversation-tables.js';
import { computeRequestFingerprint } from '../../src/repositories/ai-conversation.repository.js';

let app: FastifyInstance;
let prompts: AiAssistantPrompt[];
let generate: (prompt: AiAssistantPrompt) => Promise<unknown>;
let configRevision: string;

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

beforeEach(async () => {
  prompts = [];
  generate = async () => ({ reply: 'Here is your personalized learning guidance.' });
  app = await buildApp({
    dbPath: ':memory:',
    logger: false,
    aiAssistant: {
      env: { AI_TIMEOUT_MS: '2000' },
      getConfig: async () => ({
        config: {
          apiKey: 'local-test-only',
          baseURL: 'https://current-provider.example/v1',
          model: 'current-model',
          timeoutMs: 2000,
        },
        revision: configRevision,
      }),
      generate: async (prompt) => {
        prompts.push(prompt);
        return generate(prompt);
      },
    },
  });
  configRevision = (await app.inject({ method: 'GET', url: '/api/ai/settings' })).json().data.revision;
});

afterEach(async () => {
  vi.restoreAllMocks();
  await app.close();
});

describe('AI persistent conversations & turn lifecycle', () => {
  it('creates and lists conversation threads with correct defaults and pagination', async () => {
    // List initially empty
    const listInitial = await app.inject({
      method: 'GET',
      url: '/api/ai/conversations?limit=10&offset=0',
    });
    expect(listInitial.statusCode).toBe(200);
    expect(listInitial.json().data).toEqual({
      items: [],
      total: 0,
      limit: 10,
      offset: 0,
    });

    // Create thread
    const createRes = await app.inject({
      method: 'POST',
      url: '/api/ai/conversations',
      payload: {
        context: { kind: 'screen', screen: 'vocabulary' },
        locale: 'vi',
        includeContent: true,
        includeProgress: false,
        configRevision,
      },
    });
    expect(createRes.statusCode).toBe(200);
    const created = createRes.json().data;
    expect(created).toMatchObject({
      title: 'Cuộc trò chuyện mới',
      context: { kind: 'screen', screen: 'vocabulary' },
      locale: 'vi',
      includeContent: true,
      includeProgress: false,
      revision: 1,
      progressResetAt: null,
    });
    expect(created.id).toBeDefined();
    expect(created).not.toHaveProperty('generationToken'); // Guard: internal token not exposed

    // List reflects created conversation
    const listAfter = await app.inject({
      method: 'GET',
      url: '/api/ai/conversations',
    });
    expect(listAfter.statusCode).toBe(200);
    expect(listAfter.json().data.total).toBe(1);
    expect(listAfter.json().data.items[0].id).toBe(created.id);
  });

  it('retrieves conversation detail with turns in chronological order and pagination', async () => {
    const cRes = await app.inject({
      method: 'POST',
      url: '/api/ai/conversations',
      payload: {
        context: { kind: 'general' },
        locale: 'en',
        includeContent: true,
        includeProgress: false,
        configRevision,
      },
    });
    const conv = cRes.json().data;

    // Send first chat message
    const req1 = crypto.randomUUID();
    const chat1 = await app.inject({
      method: 'POST',
      url: '/api/ai/chat',
      payload: {
        conversationId: conv.id,
        requestId: req1,
        expectedConversationRevision: 1,
        message: 'What does ephemeral mean?',
        locale: 'en',
        context: { kind: 'general' },
        includeContent: true,
        includeProgress: false,
        configRevision,
      },
    });
    expect(chat1.statusCode).toBe(200);

    // Send second chat message
    const req2 = crypto.randomUUID();
    const chat2 = await app.inject({
      method: 'POST',
      url: '/api/ai/chat',
      payload: {
        conversationId: conv.id,
        requestId: req2,
        expectedConversationRevision: 2,
        message: 'Give me an example sentence.',
        locale: 'en',
        context: { kind: 'general' },
        includeContent: true,
        includeProgress: false,
        configRevision,
      },
    });
    expect(chat2.statusCode).toBe(200);

    // Get detail
    const detail = await app.inject({
      method: 'GET',
      url: `/api/ai/conversations/${conv.id}?limit=40`,
    });
    expect(detail.statusCode).toBe(200);
    const body = detail.json().data;
    expect(body.conversation.title).toBe('What does ephemeral mean?'); // First question derived title
    expect(body.conversation.revision).toBe(3);
    expect(body.items).toHaveLength(2);
    expect(body.items[0].sequence).toBe(1);
    expect(body.items[0].userContent).toBe('What does ephemeral mean?');
    expect(body.items[0].assistantReply).toBe('Here is your personalized learning guidance.');
    expect(body.items[0].status).toBe('COMPLETED');
    expect(body.items[1].sequence).toBe(2);
    expect(body.items[1].userContent).toBe('Give me an example sentence.');
  });

  it('enforces delete CAS revision and cascades deletions', async () => {
    const cRes = await app.inject({
      method: 'POST',
      url: '/api/ai/conversations',
      payload: {
        context: { kind: 'general' },
        locale: 'en',
        includeContent: true,
        includeProgress: false,
        configRevision,
      },
    });
    const conv = cRes.json().data;

    // Delete with stale revision fails with 409
    const staleDel = await app.inject({
      method: 'DELETE',
      url: `/api/ai/conversations/${conv.id}`,
      payload: { expectedConversationRevision: 999 },
    });
    expect(staleDel.statusCode).toBe(409);
    expect(staleDel.json().error.code).toBe('AI_CONVERSATION_CONFLICT');

    // Delete with matching revision succeeds
    const goodDel = await app.inject({
      method: 'DELETE',
      url: `/api/ai/conversations/${conv.id}`,
      payload: { expectedConversationRevision: 1 },
    });
    expect(goodDel.statusCode).toBe(200);
    expect(goodDel.json().data).toEqual({ deleted: true });

    // Subsequent GET returns 404
    const getRes = await app.inject({
      method: 'GET',
      url: `/api/ai/conversations/${conv.id}`,
    });
    expect(getRes.statusCode).toBe(404);
  });

  it('replays completed turn idempotently without calling provider model again', async () => {
    const cRes = await app.inject({
      method: 'POST',
      url: '/api/ai/conversations',
      payload: {
        context: { kind: 'general' },
        locale: 'en',
        includeContent: true,
        includeProgress: false,
        configRevision,
      },
    });
    const conv = cRes.json().data;
    const stableRequestId = crypto.randomUUID();

    // First send calls provider
    const firstRes = await app.inject({
      method: 'POST',
      url: '/api/ai/chat',
      payload: {
        conversationId: conv.id,
        requestId: stableRequestId,
        expectedConversationRevision: 1,
        message: 'Explain past perfect tense.',
        locale: 'en',
        context: { kind: 'general' },
        includeContent: true,
        includeProgress: false,
        configRevision,
      },
    });
    expect(firstRes.statusCode).toBe(200);
    expect(prompts).toHaveLength(1);

    // Duplicate request ID with same payload replays saved reply without calling provider
    const replayRes = await app.inject({
      method: 'POST',
      url: '/api/ai/chat',
      payload: {
        conversationId: conv.id,
        requestId: stableRequestId,
        expectedConversationRevision: 1, // Can even be original revision
        message: 'Explain past perfect tense.',
        locale: 'en',
        context: { kind: 'general' },
        includeContent: true,
        includeProgress: false,
        configRevision,
      },
    });
    expect(replayRes.statusCode).toBe(200);
    expect(prompts).toHaveLength(1); // Provider NOT called a second time!

    const events = parseSseEvents(replayRes.body);
    const doneEvent = events.find((e) => e.event === 'done');
    expect(doneEvent?.data).toMatchObject({
      success: true,
      data: {
        reply: 'Here is your personalized learning guidance.',
        conversationId: conv.id,
        requestId: stableRequestId,
      },
    });
  });

  it('rejects duplicate request ID with altered payload with 409 AI_REQUEST_CONFLICT', async () => {
    const cRes = await app.inject({
      method: 'POST',
      url: '/api/ai/conversations',
      payload: {
        context: { kind: 'general' },
        locale: 'en',
        includeContent: true,
        includeProgress: false,
        configRevision,
      },
    });
    const conv = cRes.json().data;
    const stableRequestId = crypto.randomUUID();

    await app.inject({
      method: 'POST',
      url: '/api/ai/chat',
      payload: {
        conversationId: conv.id,
        requestId: stableRequestId,
        expectedConversationRevision: 1,
        message: 'Question A',
        locale: 'en',
        context: { kind: 'general' },
        includeContent: true,
        includeProgress: false,
        configRevision,
      },
    });

    // Same requestId, different question
    const conflictRes = await app.inject({
      method: 'POST',
      url: '/api/ai/chat',
      payload: {
        conversationId: conv.id,
        requestId: stableRequestId,
        expectedConversationRevision: 2,
        message: 'Question B (altered payload)',
        locale: 'en',
        context: { kind: 'general' },
        includeContent: true,
        includeProgress: false,
        configRevision,
      },
    });
    expect(conflictRes.statusCode).toBe(409);
    expect(conflictRes.json().error.code).toBe('AI_REQUEST_CONFLICT');
  });

  it('rejects mismatched thread scope (context, locale, consent) with 400 AI_SCOPE_MISMATCH', async () => {
    const cRes = await app.inject({
      method: 'POST',
      url: '/api/ai/conversations',
      payload: {
        context: { kind: 'screen', screen: 'grammar' },
        locale: 'vi',
        includeContent: true,
        includeProgress: false,
        configRevision,
      },
    });
    const conv = cRes.json().data;

    // Wrong screen
    const wrongScreen = await app.inject({
      method: 'POST',
      url: '/api/ai/chat',
      payload: {
        conversationId: conv.id,
        requestId: crypto.randomUUID(),
        expectedConversationRevision: 1,
        message: 'Hello',
        locale: 'vi',
        context: { kind: 'screen', screen: 'vocabulary' },
        includeContent: true,
        includeProgress: false,
        configRevision,
      },
    });
    expect(wrongScreen.statusCode).toBe(400);
    expect(wrongScreen.json().error.code).toBe('AI_SCOPE_MISMATCH');

    // Wrong locale
    const wrongLocale = await app.inject({
      method: 'POST',
      url: '/api/ai/chat',
      payload: {
        conversationId: conv.id,
        requestId: crypto.randomUUID(),
        expectedConversationRevision: 1,
        message: 'Hello',
        locale: 'en',
        context: { kind: 'screen', screen: 'grammar' },
        includeContent: true,
        includeProgress: false,
        configRevision,
      },
    });
    expect(wrongLocale.statusCode).toBe(400);
    expect(wrongLocale.json().error.code).toBe('AI_SCOPE_MISMATCH');

    // Wrong consent
    const wrongConsent = await app.inject({
      method: 'POST',
      url: '/api/ai/chat',
      payload: {
        conversationId: conv.id,
        requestId: crypto.randomUUID(),
        expectedConversationRevision: 1,
        message: 'Hello',
        locale: 'vi',
        context: { kind: 'screen', screen: 'grammar' },
        includeContent: false, // mismatch
        includeProgress: false,
        configRevision,
      },
    });
    expect(wrongConsent.statusCode).toBe(400);
    expect(wrongConsent.json().error.code).toBe('AI_SCOPE_MISMATCH');
  });

  it('requires explicit allowProviderChange when provider or model differs', async () => {
    // Insert conversation with legacy / different model
    const convId = crypto.randomUUID();
    const now = new Date().toISOString();
    app.db.sqlite.prepare(`
      INSERT INTO ai_conversations (
        id, title, context_kind, context_screen, locale,
        include_content, include_progress, base_url, model,
        revision, generation_token, created_at, updated_at
      ) VALUES (?, 'Custom Thread', 'general', 'general', 'en', 1, 0, 'https://old-provider.example/v1', 'old-model', 1, ?, ?, ?)
    `).run(convId, crypto.randomUUID(), now, now);

    // Chat without allowProviderChange throws 409 AI_PROVIDER_CHANGED
    const blockedRes = await app.inject({
      method: 'POST',
      url: '/api/ai/chat',
      payload: {
        conversationId: convId,
        requestId: crypto.randomUUID(),
        expectedConversationRevision: 1,
        message: 'Can you help?',
        locale: 'en',
        context: { kind: 'general' },
        includeContent: true,
        includeProgress: false,
        configRevision,
      },
    });
    expect(blockedRes.statusCode).toBe(409);
    expect(blockedRes.json().error.code).toBe('AI_PROVIDER_CHANGED');

    // Chat with allowProviderChange: true succeeds and updates provider binding
    const allowedRes = await app.inject({
      method: 'POST',
      url: '/api/ai/chat',
      payload: {
        conversationId: convId,
        requestId: crypto.randomUUID(),
        expectedConversationRevision: 1,
        allowProviderChange: true,
        message: 'Can you help?',
        locale: 'en',
        context: { kind: 'general' },
        includeContent: true,
        includeProgress: false,
        configRevision,
      },
    });
    expect(allowedRes.statusCode).toBe(200);

    const updatedRow = app.db.sqlite.prepare('SELECT * FROM ai_conversations WHERE id = ?').get(convId) as { revision: number; model: string };
    expect(updatedRow.revision).toBe(2);
  });

  it('permanently marks dead owner PENDING turns as CANCELLED in SQLite when claimTurn encounters them', async () => {
    const cRes = await app.inject({
      method: 'POST',
      url: '/api/ai/conversations',
      payload: {
        context: { kind: 'general' },
        locale: 'en',
        includeContent: true,
        includeProgress: false,
        configRevision,
      },
    });
    const conv = cRes.json().data;
    const deadRequestId = crypto.randomUUID();
    const message = 'Orphaned message';
    const requestFingerprint = computeRequestFingerprint({
      conversationId: conv.id,
      message,
      locale: 'en',
      context: { kind: 'general' },
      includeContent: true,
      includeProgress: false,
    });
    const now = new Date().toISOString();

    // A syntactically valid owner token with an impossible Linux PID proves owner-death recovery.
    const deadProcessId = `${2_147_483_647}:${crypto.randomUUID()}`;
    app.db.sqlite.prepare(`
      INSERT INTO ai_conversation_turns (
        id, conversation_id, request_id, request_fingerprint, sequence,
        user_content, assistant_reply, status, error_code, process_id,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, 1, ?, NULL, 'PENDING', NULL, ?, ?, ?)
    `).run(crypto.randomUUID(), conv.id, deadRequestId, requestFingerprint, message, deadProcessId, now, now);

    // Claim with same request ID triggers dead owner recovery and throws 409
    const retryRes = await app.inject({
      method: 'POST',
      url: '/api/ai/chat',
      payload: {
        conversationId: conv.id,
        requestId: deadRequestId,
        expectedConversationRevision: 1,
        message: 'Orphaned message',
        locale: 'en',
        context: { kind: 'general' },
        includeContent: true,
        includeProgress: false,
        configRevision,
      },
    });
    expect(retryRes.statusCode).toBe(409);
    expect(retryRes.json().error.code).toBe('AI_REQUEST_CONFLICT');

    // Verify in SQLite that the turn was indeed persisted as CANCELLED (not rolled back!)
    const turnRow = app.db.sqlite.prepare('SELECT status, error_code, process_id FROM ai_conversation_turns WHERE request_id = ?').get(deadRequestId) as { status: string; error_code: string; process_id: string | null };
    expect(turnRow.status).toBe('CANCELLED');
    expect(turnRow.error_code).toBe('AI_INTERRUPTED');
    expect(turnRow.process_id).toBeNull();
  });

  it('generation token guard prevents late commit if conversation was recreated', async () => {
    const cRes = await app.inject({
      method: 'POST',
      url: '/api/ai/conversations',
      payload: {
        context: { kind: 'general' },
        locale: 'en',
        includeContent: true,
        includeProgress: false,
        configRevision,
      },
    });
    const conv = cRes.json().data;

    const { promise: modelDone, resolve: resolveModel } = Promise.withResolvers<{ reply: string }>();
    const { promise: modelStarted, resolve: signalModelStarted } = Promise.withResolvers<void>();

    generate = async () => {
      signalModelStarted();
      return modelDone;
    };

    const chatPromise = app.inject({
      method: 'POST',
      url: '/api/ai/chat',
      payload: {
        conversationId: conv.id,
        requestId: crypto.randomUUID(),
        expectedConversationRevision: 1,
        message: 'Slow question',
        locale: 'en',
        context: { kind: 'general' },
        includeContent: true,
        includeProgress: false,
        configRevision,
      },
    });

    await modelStarted;

    // Simulate database restore/recreate with a new generation token
    app.db.sqlite.prepare('UPDATE ai_conversations SET generation_token = ? WHERE id = ?').run(crypto.randomUUID(), conv.id);

    // Now resolve model output
    resolveModel({ reply: 'Late response' });
    const response = await chatPromise;

    const events = parseSseEvents(response.body);
    const err = events.find((e) => e.event === 'error');
    expect(err).toBeDefined();
    expect(err?.data).toMatchObject({
      success: false,
      error: { code: 'AI_CONVERSATION_CONFLICT' },
    });
  });
});
