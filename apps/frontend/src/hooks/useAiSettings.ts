/**
 * @file useAiSettings.ts
 * @description Shares redacted settings metadata and immediately collects credential mutation cache entries.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteAiSettings, getAiSettings, saveAiSettings } from '../api/ai-settings.api';

export const aiSettingsKeys = { current: ['ai', 'settings'] as const };
export const aiSettingsQueryOptions = {
  queryKey: aiSettingsKeys.current,
  queryFn: ({ signal }: { signal: AbortSignal }) => getAiSettings(signal),
  staleTime: 0,
  retry: false,
  refetchOnWindowFocus: false,
};

export function useAiSettings(enabled = true) {
  return useQuery({ ...aiSettingsQueryOptions, enabled });
}

export function useSaveAiSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saveAiSettings,
    gcTime: 0,
    onSuccess: metadata => queryClient.setQueryData(aiSettingsKeys.current, metadata),
  });
}

export function useDeleteAiSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAiSettings,
    onSuccess: metadata => queryClient.setQueryData(aiSettingsKeys.current, metadata),
  });
}
