/**
 * @file ai.api.ts
 * @description Menu-scoped assistant contracts and bounded, cancelable POST SSE transport.
 */
import { ApiError, resolveApiBaseUrl } from './client';

export type AiChatLocale = 'vi' | 'en';
export type AiChatScreen = 'overview' | 'learn' | 'review' | 'vocabulary' | 'calendar' | 'grammar' | 'contexts' | 'statistics' | 'settings';
export type AiChatContext = { kind: 'general' } | { kind: 'screen'; screen: AiChatScreen };
export type AiChatMessage = { role: 'user' | 'assistant'; content: string };
export type AiChatRequest = {
  configRevision: string;
  message: string;
  locale: AiChatLocale;
  context: AiChatContext;
  includeContent: boolean;
  includeProgress: boolean;
  history?: AiChatMessage[];
};
export type AiChatStreamMeta = { configRevision: string; context: { kind: string; label: string } };
export type AiChatStreamDone = AiChatStreamMeta & { reply: string };
export type AiChatStreamCallbacks = {
  onMeta?: (meta: AiChatStreamMeta) => void;
  onDelta?: (text: string) => void;
};

function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw malformed();
  return value as Record<string, unknown>;
}
function malformed() { return new ApiError('Invalid assistant stream.', 502, 'MALFORMED_STREAM'); }
function metadata(value: unknown, revision: string): AiChatStreamMeta {
  const data = object(value);
  const context = object(data.context);
  if (typeof data.configRevision !== 'string' || !['general', 'screen'].includes(String(context.kind))
    || typeof context.label !== 'string' || !context.label || context.label.length > 1000) throw malformed();
  if (data.configRevision !== revision) throw new ApiError('AI configuration changed.', 409, 'AI_CONFIG_CHANGED');
  return { configRevision: data.configRevision, context: { kind: String(context.kind), label: context.label } };
}

export async function streamAiChatMessage(
  payload: AiChatRequest,
  callbacks: AiChatStreamCallbacks = {},
  signal?: AbortSignal,
): Promise<AiChatStreamDone> {
  signal?.throwIfAborted();
  const response = await fetch(new URL('/api/ai/chat', resolveApiBaseUrl()), {
    method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream' },
    body: JSON.stringify(payload), signal,
  });
  if (!response.ok) {
    let error: { message: string; code: string; details?: unknown } = { message: response.statusText || 'Request failed', code: 'HTTP_ERROR' };
    try {
      const body = object(await response.json());
      const source = object(body.error);
      if (body.success === false && typeof source.message === 'string' && typeof source.code === 'string') {
        error = { message: source.message, code: source.code, details: source.details };
      }
    } catch { /* An invalid error body still retains its HTTP status. */ }
    throw new ApiError(error.message, response.status, error.code, error.details);
  }
  if (!response.body || !response.headers.get('content-type')?.startsWith('text/event-stream')) throw malformed();
  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8', { fatal: true });
  let buffer = '';
  let meta: AiChatStreamMeta | undefined;
  let text = '';
  const cancel = () => { void reader.cancel().catch(() => {}); };
  signal?.addEventListener('abort', cancel, { once: true });
  try {
    while (true) {
      signal?.throwIfAborted();
      const chunk = await reader.read();
      signal?.throwIfAborted();
      if (chunk.done) throw new ApiError('Stream closed before completion.', 502, 'STREAM_TRUNCATED');
      buffer += decoder.decode(chunk.value, { stream: true });
      let boundary: RegExpExecArray | null;
      while ((boundary = /\r?\n\r?\n/.exec(buffer))) {
        const frame = buffer.slice(0, boundary.index);
        buffer = buffer.slice(boundary.index + boundary[0].length);
        if (frame.length > 65536) throw malformed();
        let event = '';
        const dataLines: string[] = [];
        for (const line of frame.split(/\r?\n/)) {
          if (line.startsWith('event:')) event = line.slice(6).trim();
          if (line.startsWith('data:')) dataLines.push(line.slice(5).replace(/^ /, ''));
        }
        if (!dataLines.length) continue;
        let body: Record<string, unknown>;
        try { body = object(JSON.parse(dataLines.join('\n'))); } catch { throw malformed(); }
        if (event === 'error') {
          const error = object(body.error);
          if (body.success !== false || typeof error.message !== 'string' || typeof error.code !== 'string') throw malformed();
          throw new ApiError(error.message, 502, error.code);
        }
        if (body.success !== true) throw malformed();
        if (event === 'meta') {
          if (meta) throw malformed();
          meta = metadata(body.data, payload.configRevision);
          callbacks.onMeta?.(meta);
        } else if (event === 'delta') {
          const data = object(body.data);
          if (!meta || typeof data.text !== 'string' || text.length + data.text.length > 4000) throw malformed();
          text += data.text;
          callbacks.onDelta?.(data.text);
        } else if (event === 'done') {
          if (!meta) throw malformed();
          const data = object(body.data);
          const doneMeta = metadata(data, payload.configRevision);
          if (typeof data.reply !== 'string' || !data.reply.trim() || data.reply.length > 4000 || data.reply !== text.trim()
            || doneMeta.context.kind !== meta.context.kind || doneMeta.context.label !== meta.context.label) throw malformed();
          return { ...doneMeta, reply: data.reply };
        } else throw malformed();
      }
      if (buffer.length > 65536) throw malformed();
    }
  } finally {
    signal?.removeEventListener('abort', cancel);
    await reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}
