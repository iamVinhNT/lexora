/**
 * @file ai-history.api.ts
 * @description REST client for AI conversation threads and turn history.
 */
import { apiFetch } from './client';
import type { AiChatContext, AiChatLocale } from './ai.api';

export interface AiConversation {
  id: string;
  title: string;
  context: AiChatContext;
  locale: AiChatLocale;
  includeContent: boolean;
  includeProgress: boolean;
  baseURL: string;
  model: string;
  revision: number;
  createdAt: string;
  updatedAt: string;
  progressResetAt: string | null;
}

export type AiTurnStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

export interface AiTurn {
  id: string;
  requestId: string;
  sequence: number;
  userContent: string;
  assistantReply: string | null;
  status: AiTurnStatus;
  errorCode: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AiConversationListResponse {
  items: AiConversation[];
  total: number;
  limit: number;
  offset: number;
}

export interface AiConversationDetailResponse {
  conversation: AiConversation;
  items: AiTurn[];
  hasMore: boolean;
  beforeSequence: number | null;
}

export interface CreateAiConversationPayload {
  context: AiChatContext;
  locale: AiChatLocale;
  includeContent: boolean;
  includeProgress: boolean;
  configRevision: string;
}

export async function listAiConversations(
  params?: { limit?: number; offset?: number },
  signal?: AbortSignal,
): Promise<AiConversationListResponse> {
  return apiFetch<AiConversationListResponse>('/api/ai/conversations', {
    query: params,
    signal,
  });
}

export async function createAiConversation(
  payload: CreateAiConversationPayload,
  signal?: AbortSignal,
): Promise<AiConversation> {
  return apiFetch<AiConversation>('/api/ai/conversations', {
    method: 'POST',
    body: payload,
    signal,
  });
}

export async function getAiConversation(
  id: string,
  params?: { limit?: number; beforeSequence?: number | null },
  signal?: AbortSignal,
): Promise<AiConversationDetailResponse> {
  return apiFetch<AiConversationDetailResponse>(`/api/ai/conversations/${encodeURIComponent(id)}`, {
    query: params,
    signal,
  });
}

export async function deleteAiConversation(
  id: string,
  expectedConversationRevision: number,
  signal?: AbortSignal,
): Promise<{ deleted: boolean }> {
  return apiFetch<{ deleted: boolean }>(`/api/ai/conversations/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    body: { expectedConversationRevision },
    signal,
  });
}
