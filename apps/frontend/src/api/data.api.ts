/**
 * @file data.api.ts
 * @description Typed import, export, backup, restore, and reset endpoint functions.
 */
import { apiFetch } from './client';

export type ImportFormat = 'TXT' | 'CSV' | 'JSON';
export type ExportFormat = 'JSON' | 'CSV';
export type ImportPreview = {
  validItems: Array<{ index: number; word: string; definition: string; translation?: string | null; difficulty?: string | null; phonetic?: string | null; partOfSpeech?: string | null; tags?: string[] }>;
  duplicates: Array<{ index: number; word: string; reason: string }>;
  invalidItems: Array<{ index: number; raw?: unknown; reason: string }>;
  validCount: number;
  duplicateCount: number;
  invalidCount: number;
  previewToken: string;
};
export type ImportCommitResult = { importedCount: number; wordIds: string[] };
export type ExportResult = { format: ExportFormat; scope: 'words'; content?: string; items?: unknown[]; data?: unknown };
export type BackupPayload = { version: 1 | 2 | 3 | 4 | 5 | 6; application: 'Lexora'; exportedAt: string; data: Record<string, unknown[]> };
export type PracticeSummary = {
  includedInBackup: boolean;
  willOverwrite: boolean;
  warning: string | null;
  backupTableCounts: { grammarPracticeAttempts: number; grammarReviewStates: number };
  existingTableCounts: { grammarPracticeAttempts: number; grammarReviewStates: number };
};
export type AdaptiveReviewSummary = {
  includedInBackup: boolean;
  willOverwrite: boolean;
  warning: string | null;
  backupTableCounts: { reviewAttempts: number; reviewAttemptRequests: number };
  existingTableCounts: { reviewAttempts: number; reviewAttemptRequests: number };
};
/** Explicit calendar restore warning contract consumed by Task21. */
export type CalendarSummary = { includedInBackup: boolean; willOverwrite: boolean; backupTaskCount: number; existingTaskCount: number; willReplacePreferences: boolean };
export type RestorePreview = {
  valid: boolean;
  version: number;
  application: string;
  exportedAt: string;
  tableCounts: Record<string, number>;
  totalRecords: number;
  previewToken: string;
  conflictSummary?: { existingRecordsCount: number; willOverwrite: boolean; existingTableCounts: Record<string, number> };
  grammarSummary?: { includedInBackup: boolean; willOverwrite: boolean; warning: string | null; backupTableCounts: { grammarLessonProgress: number; grammarExerciseAttempts: number }; existingTableCounts: { grammarLessonProgress: number; grammarExerciseAttempts: number } };
  practiceSummary?: PracticeSummary;
  calendarSummary?: CalendarSummary;
  adaptiveReviewSummary?: AdaptiveReviewSummary;
};
export type RestoreResult = { restored: boolean };
export type ResetResult = { reset: boolean; scope: 'progress' | 'all' };

export function previewImport(format: ImportFormat, content: string) {
  return apiFetch<ImportPreview>('/api/import/preview', { method: 'POST', body: { format, content } });
}

export function commitImport(format: ImportFormat, content: string, previewToken: string, selectedIndices?: number[]) {
  return apiFetch<ImportCommitResult>('/api/import/commit', { method: 'POST', body: { format, content, previewToken, selectedIndices } });
}

export function exportVocabulary(format: ExportFormat = 'CSV') {
  return apiFetch<ExportResult>('/api/export/vocabulary', { query: { format } });
}

export function getBackup() {
  return apiFetch<BackupPayload>('/api/backup');
}

export function previewRestore(backup: BackupPayload) {
  return apiFetch<RestorePreview>('/api/restore/preview', { method: 'POST', body: { backup } });
}

export function restoreBackup(backup: BackupPayload, previewToken: string) {
  return apiFetch<RestoreResult>('/api/restore', { method: 'POST', body: { backup, confirm: true, previewToken } });
}

export function resetProgress() {
  return apiFetch<ResetResult>('/api/data/reset-progress', { method: 'POST', body: { confirm: true } });
}

export function resetAll() {
  return apiFetch<ResetResult>('/api/data/reset-all', { method: 'POST', body: { confirm: true } });
}
