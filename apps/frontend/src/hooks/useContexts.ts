/**
 * @file useContexts.ts
 * @description TanStack Query context reads, CRUD, and word-link mutations.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createContext, deleteContext, getContext, linkWords, listContexts, unlinkWord, updateContext, type ContextPayload, type ContextQuery } from '../api/context.api';
import { wordKeys } from './useVocabulary';

export const contextKeys = {
  all: ['contexts'] as const,
  lists: () => [...contextKeys.all, 'list'] as const,
  list: (query: ContextQuery) => [...contextKeys.lists(), query] as const,
  details: () => [...contextKeys.all, 'detail'] as const,
  detail: (id: string) => [...contextKeys.details(), id] as const,
};

export function useContexts(query: ContextQuery) {
  return useQuery({ queryKey: contextKeys.list(query), queryFn: ({ signal }) => listContexts(query, signal) });
}

export function useContext(id: string | null) {
  return useQuery({ queryKey: contextKeys.detail(id ?? ''), queryFn: ({ signal }) => getContext(id!, signal), enabled: Boolean(id) });
}

function invalidateRelated(queryClient: ReturnType<typeof useQueryClient>, id?: string) {
  queryClient.invalidateQueries({ queryKey: contextKeys.all });
  queryClient.invalidateQueries({ queryKey: wordKeys.all });
  if (id) queryClient.invalidateQueries({ queryKey: contextKeys.detail(id) });
}

export function useCreateContext() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: (payload: ContextPayload) => createContext(payload), onSuccess: () => invalidateRelated(queryClient) });
}

export function useUpdateContext() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: ({ id, payload }: { id: string; payload: Partial<Omit<ContextPayload, 'wordIds'>> }) => updateContext(id, payload), onSuccess: (_data, variables) => invalidateRelated(queryClient, variables.id) });
}

export function useDeleteContext() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: deleteContext, onSuccess: () => invalidateRelated(queryClient) });
}

export function useLinkWords() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: ({ contextId, wordIds }: { contextId: string; wordIds: string[] }) => linkWords(contextId, wordIds), onSuccess: (_data, variables) => invalidateRelated(queryClient, variables.contextId) });
}

export function useUnlinkWord() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: ({ contextId, wordId }: { contextId: string; wordId: string }) => unlinkWord(contextId, wordId), onSuccess: (_data, variables) => invalidateRelated(queryClient, variables.contextId) });
}
