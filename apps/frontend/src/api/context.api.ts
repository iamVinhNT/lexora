/**
 * @file context.api.ts
 * @description Typed context endpoint functions and response contracts.
 */
import { apiFetch } from './client';

export const CONTEXT_SOURCE_TYPES = ['READING', 'LISTENING', 'CONVERSATION', 'BOOK', 'ARTICLE', 'YOUTUBE', 'WORK', 'PERSONAL', 'MANUAL'] as const;
export type ContextSourceType = (typeof CONTEXT_SOURCE_TYPES)[number];

export type ContextWord = {
  wordId: string;
  exposureCount: number;
  firstSeenAt?: string | null;
  lastSeenAt?: string | null;
  word: { id: string; word: string; definition: string; translation?: string | null; difficulty?: string | null; phonetic?: string | null; partOfSpeech?: string | null };
};
export type Context = {
  id: string;
  title: string;
  content: string;
  sourceType?: ContextSourceType | null;
  sourceUrl?: string | null;
  createdAt?: string;
  updatedAt?: string | null;
  wordCount: number;
  words?: ContextWord[];
};
export type ContextList = { total: number; page: number; limit: number; items: Context[] };
export type ContextQuery = { search?: string; sourceType?: ContextSourceType | ''; page?: number; limit?: number };
export type ContextPayload = { title: string; content: string; sourceType: ContextSourceType; sourceUrl?: string | null; wordIds?: string[] };

export function listContexts(query: ContextQuery = {}, signal?: AbortSignal) {
  return apiFetch<ContextList>('/api/contexts', { query, signal });
}

export function getContext(id: string, signal?: AbortSignal) {
  return apiFetch<Context>(`/api/contexts/${id}`, { signal });
}

export function createContext(payload: ContextPayload) {
  return apiFetch<Context>('/api/contexts', { method: 'POST', body: payload });
}

export function updateContext(id: string, payload: Partial<Omit<ContextPayload, 'wordIds'>>) {
  return apiFetch<Context>(`/api/contexts/${id}`, { method: 'PATCH', body: payload });
}

export function deleteContext(id: string) {
  return apiFetch<{ id: string; deleted: true }>(`/api/contexts/${id}`, { method: 'DELETE' });
}

export function linkWords(contextId: string, wordIds: string[]) {
  return apiFetch<Context>(`/api/contexts/${contextId}/words`, { method: 'POST', body: { wordIds } });
}

export function unlinkWord(contextId: string, wordId: string) {
  return apiFetch<{ contextId: string; wordId: string; unlinked: true }>(`/api/contexts/${contextId}/words/${wordId}`, { method: 'DELETE' });
}
