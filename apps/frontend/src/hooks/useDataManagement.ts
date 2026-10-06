/**
 * @file useDataManagement.ts
 * @description Data-management mutations and cache invalidation boundaries.
 */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commitImport, exportVocabulary, getBackup, previewImport, previewRestore, resetAll, resetProgress, restoreBackup, type BackupPayload, type ExportFormat, type ExportResult, type ImportCommitResult, type ImportFormat, type ImportPreview, type ResetResult, type RestorePreview, type RestoreResult } from '../api/data.api';
import { analyticsKeys } from './useAnalytics';
import { contextKeys } from './useContexts';
import { reviewKeys } from './useReviewQueue';
import { sessionKeys } from './useLearningSession';
import { wordKeys } from './useVocabulary';
import { grammarKeys } from './useGrammar';
import { studyKeys } from './useStudyCalendar';
import { grammarPracticeKeys } from './useGrammarPractice';
export const dataKeys = { all: ['data-management'] as const };

function invalidateDataCaches(queryClient: ReturnType<typeof useQueryClient>) {
  return Promise.all([
    queryClient.invalidateQueries({ queryKey: wordKeys.all }),
    queryClient.invalidateQueries({ queryKey: contextKeys.all }),
    queryClient.invalidateQueries({ queryKey: reviewKeys.all }),
    queryClient.invalidateQueries({ queryKey: sessionKeys.all }),
    queryClient.invalidateQueries({ queryKey: analyticsKeys.all }),
    queryClient.invalidateQueries({ queryKey: grammarKeys.all }),
    queryClient.invalidateQueries({ queryKey: grammarPracticeKeys.all }),
    queryClient.invalidateQueries({ queryKey: studyKeys.all }),
  ]);
}

export function useImportPreview() {
  return useMutation<ImportPreview, Error, { format: ImportFormat; content: string }>({ mutationFn: ({ format, content }) => previewImport(format, content) });
}

export function useCommitImport() {
  const queryClient = useQueryClient();
  return useMutation<ImportCommitResult, Error, { format: ImportFormat; content: string; previewToken: string; selectedIndices?: number[] }>({
    mutationFn: ({ format, content, previewToken, selectedIndices }: { format: ImportFormat; content: string; previewToken: string; selectedIndices?: number[] }) => commitImport(format, content, previewToken, selectedIndices),
    onSuccess: () => invalidateDataCaches(queryClient),
  });
}

export function useExportVocabulary() {
  return useMutation<ExportResult, Error, ExportFormat>({ mutationFn: exportVocabulary });
}

export function useGetBackup() {
  return useMutation<BackupPayload, Error, void>({ mutationFn: getBackup });
}

export function useRestorePreview() {
  return useMutation<RestorePreview, Error, BackupPayload>({ mutationFn: (backup) => previewRestore(backup) });
}

export function useRestoreBackup() {
  const queryClient = useQueryClient();
  return useMutation<RestoreResult, Error, { backup: BackupPayload; previewToken: string }>({
    mutationFn: async ({ backup, previewToken }: { backup: BackupPayload; previewToken: string }) => assertRestoreSuccess(await restoreBackup(backup, previewToken)),
    onSuccess: () => invalidateDataCaches(queryClient),
  });
}

export function useResetProgress() {
  const queryClient = useQueryClient();
  return useMutation<ResetResult, Error, void>({
    mutationFn: async () => assertResetSuccess(await resetProgress(), 'progress'),
    onSuccess: () => invalidateDataCaches(queryClient),
  });
}

export function useResetAll() {
  const queryClient = useQueryClient();
  return useMutation<ResetResult, Error, void>({
    mutationFn: async () => assertResetSuccess(await resetAll(), 'all'),
    onSuccess: () => invalidateDataCaches(queryClient),
  });
}

function assertRestoreSuccess(result: RestoreResult) {
  if (!result || result.restored !== true) throw new Error('Restore response did not confirm completion.');
  return result;
}

function assertResetSuccess(result: ResetResult, expectedScope: ResetResult['scope']) {
  if (!result || result.reset !== true || result.scope !== expectedScope) throw new Error(`Reset response did not confirm ${expectedScope} reset.`);
  return result;
}
