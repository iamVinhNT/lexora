/**
 * @file useAiHistory.ts
 * @description React Query hooks for AI conversation threads, turn history pagination, and lifecycle mutations.
 */
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteAiConversation,
  getAiConversation,
  listAiConversations,
} from '../api/ai-history.api';
import { useAiAssistantStore } from '../stores/ai-assistant.store';

export const aiHistoryKeys = {
  all: ['ai', 'conversations'] as const,
  lists: () => [...aiHistoryKeys.all, 'list'] as const,
  list: (params?: { limit?: number; offset?: number }) => [...aiHistoryKeys.lists(), params] as const,
  details: () => [...aiHistoryKeys.all, 'detail'] as const,
  detail: (id: string) => [...aiHistoryKeys.details(), id] as const,
  turns: (id: string, limit?: number) => [...aiHistoryKeys.detail(id), 'turns', limit] as const,
};

export function useAiConversations(params?: { limit?: number; offset?: number }, enabled = true) {
  return useQuery({
    queryKey: aiHistoryKeys.list(params),
    queryFn: ({ signal }) => listAiConversations(params, signal),
    enabled,
    staleTime: 30_000,
  });
}

export function useAiConversation(
  id: string | null,
  params?: { limit?: number; beforeSequence?: number | null },
  enabled = true,
) {
  return useQuery({
    queryKey: [...aiHistoryKeys.detail(id ?? ''), params],
    queryFn: ({ signal }) => getAiConversation(id!, params, signal),
    enabled: Boolean(id) && enabled,
    staleTime: 30_000,
  });
}

export function useAiConversationTurns(id: string | null, limit = 40, enabled = true) {
  return useInfiniteQuery({
    queryKey: aiHistoryKeys.turns(id ?? '', limit),
    queryFn: ({ pageParam, signal }) =>
      getAiConversation(id!, { limit, beforeSequence: pageParam }, signal),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.beforeSequence : undefined),
    enabled: Boolean(id) && enabled,
    staleTime: 30_000,
  });
}


export function useDeleteAiConversation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      expectedConversationRevision,
    }: {
      id: string;
      expectedConversationRevision: number;
    }) => deleteAiConversation(id, expectedConversationRevision),
    onSuccess: (_, { id }) => {
      const state = useAiAssistantStore.getState();
      if (state.activeConversationId === id) {
        state.resetActiveConversation();
      }
      queryClient.removeQueries({ queryKey: aiHistoryKeys.detail(id) });
      void queryClient.invalidateQueries({ queryKey: aiHistoryKeys.lists() });
    },
  });
}
