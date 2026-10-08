/**
 * @file ai.api.ts
 * @description Typed client interface for Lexora's unified read-only AI chat assistant.
 */
import { apiFetch } from './client';

export type AiChatLocale = 'vi' | 'en';

export type AiChatScreen =
  | 'overview'
  | 'learn'
  | 'review'
  | 'vocabulary'
  | 'calendar'
  | 'grammar'
  | 'contexts'
  | 'statistics'
  | 'settings';

export type AiChatContext =
  | { kind: 'general' }
  | { kind: 'screen'; screen: AiChatScreen }
  | { kind: 'grammar'; lessonId: string; revisionId: string }
  | { kind: 'word'; wordId: string }
  | { kind: 'context'; contextId: string }
  | { kind: 'learning'; sessionId: string; wordId: string; step: 'CONTEXT' | 'UNDERSTAND' | 'RECALL' | 'OUTPUT' | 'ASSESS' }
  | { kind: 'review'; wordId: string };

export type AiChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export type AiChatRequest = {
  message: string;
  locale: AiChatLocale;
  context: AiChatContext;
  includeProgress: boolean;
  configRevision: string;
  history?: AiChatMessage[];
};

export type AiChatResponse = {
  reply: string;
  configRevision: string;
  context: {
    label: string;
    kind: string;
  };
};

export function sendAiChatMessage(payload: AiChatRequest): Promise<AiChatResponse> {
  return apiFetch<AiChatResponse>('/api/ai/chat', {
    method: 'POST',
    body: payload,
  });
}
