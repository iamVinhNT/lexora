/**
 * @file useVocabulary.ts
 * @description TanStack Query vocabulary reads and mutations.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createWord, deleteWord, getWord, listWords, updateWord, type WordPayload, type WordQuery } from '../api/vocabulary.api';
import { analyticsKeys } from './useAnalytics';
import { reviewKeys } from './useReviewQueue';

export const wordKeys = {
  all: ['words'] as const,
  lists: () => [...wordKeys.all, 'list'] as const,
  list: (query: WordQuery) => [...wordKeys.lists(), query] as const,
  details: () => [...wordKeys.all, 'detail'] as const,
  detail: (id: string) => [...wordKeys.details(), id] as const,
};

export function useWords(query: WordQuery) {
  return useQuery({ queryKey: wordKeys.list(query), queryFn: () => listWords(query) });
}

export function useWord(id: string | null) {
  return useQuery({ queryKey: wordKeys.detail(id ?? ''), queryFn: () => getWord(id!), enabled: Boolean(id) });
}

export function useCreateWord() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: (payload: WordPayload) => createWord(payload), onSuccess: () => { queryClient.invalidateQueries({ queryKey: wordKeys.all }); queryClient.invalidateQueries({ queryKey: ['contexts'] }); queryClient.invalidateQueries({ queryKey: reviewKeys.all }); queryClient.invalidateQueries({ queryKey: analyticsKeys.all }); } });
}

export function useUpdateWord() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: ({ id, payload }: { id: string; payload: Partial<WordPayload> }) => updateWord(id, payload), onSuccess: (_data, variables) => { queryClient.invalidateQueries({ queryKey: wordKeys.all }); queryClient.invalidateQueries({ queryKey: wordKeys.detail(variables.id) }); queryClient.invalidateQueries({ queryKey: ['contexts'] }); queryClient.invalidateQueries({ queryKey: reviewKeys.all }); queryClient.invalidateQueries({ queryKey: analyticsKeys.all }); } });
}

export function useDeleteWord() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: deleteWord, onSuccess: () => { queryClient.invalidateQueries({ queryKey: wordKeys.all }); queryClient.invalidateQueries({ queryKey: ['contexts'] }); queryClient.invalidateQueries({ queryKey: reviewKeys.all }); queryClient.invalidateQueries({ queryKey: analyticsKeys.all }); } });
}
