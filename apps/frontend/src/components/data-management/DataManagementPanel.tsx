/**
 * @file DataManagementPanel.tsx
 * @description Coordinates safe import, export, restore, and destructive data operations.
 */
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { BackupPayload, ExportResult, ImportFormat, ImportPreview, RestorePreview } from '../../api/data.api';
import { getLocalizedErrorMessage } from '../../i18n/presentation';
import { formatNumber } from '../../i18n/formatters';
import {
  useCommitImport,
  useExportVocabulary,
  useGetBackup,
  useImportPreview,
  useResetAll,
  useResetProgress,
  useRestoreBackup,
  useRestorePreview,
} from '../../hooks/useDataManagement';
import {
  hasDesktopFileApi,
  openDesktopBackupFile,
  openDesktopImportFile,
  saveDesktopBackup,
  saveDesktopExport,
} from '../../desktop/desktop-files';
import { DataManagementCards, type DataManagementCardsProps } from './DataManagementCards';
import { getPracticeRestoreMessage } from './PracticeRestoreWarning';
import { TypedConfirmDialog } from './TypedConfirmDialog';

async function readFileText(file: File): Promise<string> {
  if (typeof file.text === 'function') return file.text();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ''));
    reader.onerror = () => reject(new Error('Could not read selected file.'));
    reader.readAsText(file);
  });
}

function downloadData(content: string, filename: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function serializeExport(result: ExportResult) {
  if (result.content !== undefined) return { content: result.content, type: 'text/csv;charset=utf-8' };
  return { content: JSON.stringify(result.data ?? { items: result.items ?? [] }, null, 2), type: 'application/json;charset=utf-8' };
}

export function DataManagementPanel() {
  const { t, i18n } = useTranslation('settings');
  const { t: tCommon } = useTranslation('common');
  const { t: tCalendar } = useTranslation('calendar');
  const [format, setFormat] = useState<ImportFormat>('TXT');
  const [importContent, setImportContent] = useState('');
  const [importName, setImportName] = useState('');
  const [importPreview, setImportPreview] = useState<ImportPreview | null>(null);
  const [confirmImport, setConfirmImport] = useState(false);
  const [restoreBackup, setRestoreBackup] = useState<BackupPayload | null>(null);
  const [restorePreview, setRestorePreview] = useState<RestorePreview | null>(null);
  const [restoreOpen, setRestoreOpen] = useState(false);
  const [restorePhrase, setRestorePhrase] = useState('');
  const [progressOpen, setProgressOpen] = useState(false);
  const [allOpen, setAllOpen] = useState(false);
  const [progressPhrase, setProgressPhrase] = useState('');
  const [allPhrase, setAllPhrase] = useState('');
  const [status, setStatus] = useState('');
  const [fileError, setFileError] = useState('');
  const [importPreviewPending, setImportPreviewPending] = useState(false);
  const [importCommitState, setImportCommitState] = useState({ pending: false, error: '' });
  const [restorePreviewPending, setRestorePreviewPending] = useState(false);
  const [restoreCommitState, setRestoreCommitState] = useState({ pending: false, error: '' });
  const importRequestId = useRef(0);
  const importPreviewIdentity = useRef<{ requestId: number; previewToken: string | null }>({ requestId: 0, previewToken: null });
  const restoreRequestId = useRef(0);
  const restorePreviewIdentity = useRef<{ requestId: number; previewToken: string | null }>({ requestId: 0, previewToken: null });
  const previousLanguage = useRef(i18n.language);

  const importPreviewMutation = useImportPreview();
  const commitMutation = useCommitImport();
  const exportMutation = useExportVocabulary();
  const backupMutation = useGetBackup();
  const restorePreviewMutation = useRestorePreview();
  const restoreMutation = useRestoreBackup();
  const resetProgressMutation = useResetProgress();
  const resetAllMutation = useResetAll();

  const restoreConfirmationPhrase = t('confirmation.restorePhrase');
  const progressConfirmationPhrase = t('confirmation.resetProgressPhrase');
  const allConfirmationPhrase = t('confirmation.deleteAllPhrase');

  useEffect(() => {
    if (previousLanguage.current === i18n.language) return;
    previousLanguage.current = i18n.language;
    setRestorePhrase('');
    setProgressPhrase('');
    setAllPhrase('');
  }, [i18n.language]);

  function operationError(error: unknown, fallbackKey: 'errors.previewImport' | 'errors.import' | 'errors.previewRestore' | 'errors.restore'): string {
    if (error) return getLocalizedErrorMessage(error, tCommon);
    return t(fallbackKey);
  }

  async function handleImportContent(name: string, content: string, requestId = ++importRequestId.current) {
    setFileError(''); setImportPreviewPending(true); setStatus(''); setImportPreview(null); setImportCommitState({ pending: false, error: '' });
    importPreviewIdentity.current = { requestId, previewToken: null }; setConfirmImport(false); setImportName(name);
    const extension = name.toLowerCase().split('.').pop();
    const detectedFormat = extension === 'csv' || extension === 'json' || extension === 'txt' ? extension.toUpperCase() as ImportFormat : format;
    setFormat(detectedFormat);
    setImportContent(content);
    try {
      const preview = await importPreviewMutation.mutateAsync({ format: detectedFormat, content });
      if (requestId === importRequestId.current) {
        setImportPreviewPending(false); importPreviewIdentity.current = { requestId, previewToken: preview.previewToken }; setImportPreview(preview);
      }
    } catch (error) {
      if (requestId === importRequestId.current) { setImportPreviewPending(false); setFileError(operationError(error, 'errors.previewImport')); }
    }
  }

  async function handleImportFile(file?: File) {
    if (!file) return;
    const requestId = ++importRequestId.current;
    try {
      const content = await readFileText(file);
      if (requestId !== importRequestId.current) return;
      await handleImportContent(file.name, content, requestId);
    } catch (error) {
      if (requestId === importRequestId.current) setFileError(operationError(error, 'errors.previewImport'));
    }
  }

  async function handleDesktopImport() {
    try {
      const selected = await openDesktopImportFile();
      if (!selected || selected.canceled) return;
      await handleImportContent(selected.name, selected.content);
    } catch (error) {
      setFileError(operationError(error, 'errors.previewImport'));
    }
  }

  function handleImportFormatChange(nextFormat: ImportFormat) {
    ++importRequestId.current;
    importPreviewIdentity.current = { requestId: importRequestId.current, previewToken: null };
    setFormat(nextFormat); setImportPreview(null); setConfirmImport(false); setStatus(''); setFileError(''); setImportPreviewPending(false); setImportCommitState({ pending: false, error: '' });
    importPreviewMutation.reset(); commitMutation.reset();
  }

  async function handleImportCommit() {
    if (!importPreview || !confirmImport || importPreview.validCount === 0 || importCommitState.pending) return;
    const requestId = importRequestId.current; const previewToken = importPreview.previewToken;
    setImportCommitState({ pending: true, error: '' });
    try {
      const result = await commitMutation.mutateAsync({ format, content: importContent, previewToken, selectedIndices: importPreview.validItems.map((item) => item.index) });
      if (importPreviewIdentity.current.requestId !== requestId || importPreviewIdentity.current.previewToken !== previewToken) return;
       setStatus(tCommon('status.imported', { count: result.importedCount })); setImportPreview(null); importPreviewIdentity.current = { requestId, previewToken: null }; setConfirmImport(false); setImportCommitState({ pending: false, error: '' });
    } catch (error) {
      if (importPreviewIdentity.current.requestId === requestId && importPreviewIdentity.current.previewToken === previewToken) setImportCommitState({ pending: false, error: operationError(error, 'errors.import') });
    }
  }

  async function handleExport() {
    if (exportMutation.isPending) return;
    setFileError('');
    try {
      const result = serializeExport(await exportMutation.mutateAsync('CSV'));
      const file = {
        suggestedName: 'lexora-vocabulary.csv',
        content: result.content,
        format: 'CSV' as const,
      };
      let desktopResult;
      try {
        desktopResult = await saveDesktopExport(file);
      } catch (error) {
        setFileError(getLocalizedErrorMessage(error, tCommon));
        return;
      }
      if (desktopResult?.canceled) return;
      if (desktopResult === null) downloadData(file.content, file.suggestedName, result.type);
      setStatus(tCommon('status.exportDownloaded'));
    } catch { /* Mutation error remains beside action. */ }
  }

  async function handleBackup() {
    if (backupMutation.isPending) return;
    setFileError('');
    try {
      const content = JSON.stringify(await backupMutation.mutateAsync(), null, 2);
      const file = { suggestedName: `lexora-backup-${new Date().toISOString().slice(0, 10)}.json`, content };
      let desktopResult;
      try {
        desktopResult = await saveDesktopBackup(file);
      } catch (error) {
        setFileError(getLocalizedErrorMessage(error, tCommon));
        return;
      }
      if (desktopResult?.canceled) return;
      if (desktopResult === null) downloadData(file.content, file.suggestedName, 'application/json;charset=utf-8');
      setStatus(tCommon('status.backupDownloaded'));
    } catch { /* Mutation error remains beside action. */ }
  }

  async function handleRestoreContent(_name: string, content: string, requestId = ++restoreRequestId.current) {
    setFileError(''); setStatus(''); setRestoreBackup(null); setRestorePreview(null); setRestoreOpen(false); setRestorePreviewPending(true); setRestoreCommitState({ pending: false, error: '' }); restorePreviewIdentity.current = { requestId, previewToken: null }; restorePreviewMutation.reset(); restoreMutation.reset();
    try {
      const backup = JSON.parse(content) as BackupPayload;
      setRestoreBackup(backup);
      const preview = await restorePreviewMutation.mutateAsync(backup);
      if (requestId !== restoreRequestId.current) return;
      setRestorePreviewPending(false); setRestorePreview(preview); restorePreviewIdentity.current = { requestId, previewToken: preview.previewToken }; setRestorePhrase(''); setRestoreOpen(true);
    } catch (error) {
      if (requestId === restoreRequestId.current) { setRestorePreviewPending(false); setFileError(operationError(error, 'errors.previewRestore')); }
    }
  }

  async function handleRestoreFile(file?: File) {
    if (!file) return;
    const requestId = ++restoreRequestId.current;
    try {
      const content = await readFileText(file);
      if (requestId !== restoreRequestId.current) return;
      await handleRestoreContent(file.name, content, requestId);
    } catch (error) {
      if (requestId === restoreRequestId.current) setFileError(operationError(error, 'errors.previewRestore'));
    }
  }

  async function handleDesktopRestore() {
    try {
      const selected = await openDesktopBackupFile();
      if (!selected || selected.canceled) return;
      await handleRestoreContent(selected.name, selected.content);
    } catch (error) {
      setFileError(operationError(error, 'errors.previewRestore'));
    }
  }

  async function handleRestore() {
    if (!restoreBackup || !restorePreview?.previewToken || restorePhrase !== restoreConfirmationPhrase || restoreCommitState.pending) return;
    const requestId = restoreRequestId.current; const previewToken = restorePreview.previewToken;
    const isCurrentOperation = () => restoreRequestId.current === requestId && restorePreviewIdentity.current.requestId === requestId && restorePreviewIdentity.current.previewToken === previewToken;
    setStatus(''); setRestoreCommitState({ pending: true, error: '' });
    try {
      await restoreMutation.mutateAsync({ backup: restoreBackup, previewToken });
      if (!isCurrentOperation()) return;
       setStatus(tCommon('status.restoreCompleted')); setRestoreBackup(null); setRestorePreview(null); setRestoreOpen(false); setRestorePhrase(''); setRestoreCommitState({ pending: false, error: '' });
    } catch (error) { if (isCurrentOperation()) setRestoreCommitState({ pending: false, error: operationError(error, 'errors.restore') }); }
  }

  async function handleReset(scope: 'progress' | 'all') {
    const phrase = scope === 'progress' ? progressPhrase : allPhrase;
    const expectedPhrase = scope === 'progress' ? progressConfirmationPhrase : allConfirmationPhrase;
    if (phrase !== expectedPhrase) return;
    const mutation = scope === 'progress' ? resetProgressMutation : resetAllMutation;
    if (mutation.isPending) return;
    setStatus('');
    try {
      await mutation.mutateAsync();
       setStatus(scope === 'progress' ? tCommon('status.progressReset') : tCommon('status.allDataDeleted'));
      if (scope === 'progress') { setProgressOpen(false); setProgressPhrase(''); } else { setAllOpen(false); setAllPhrase(''); }
    } catch { /* Keep dialog open so destructive failures remain visible. */ }
  }

  const cards: DataManagementCardsProps = {
    format, onFormatChange: handleImportFormatChange, importName, onImportFile: handleImportFile, desktopFiles: hasDesktopFileApi(), onSelectImport: () => void handleDesktopImport(), importLoading: importPreviewPending, importPreview, importConfirmed: confirmImport, setImportConfirmed: setConfirmImport, onImportCommit: handleImportCommit, importPending: importCommitState.pending, importError: importCommitState.error,
    onExport: handleExport, onBackup: handleBackup, exportPending: exportMutation.isPending, backupPending: backupMutation.isPending, exportError: exportMutation.error ?? backupMutation.error,
    onRestoreFile: handleRestoreFile, onSelectRestore: () => void handleDesktopRestore(), restorePreview, restoreLoading: restorePreviewPending, onOpenRestore: () => { setRestorePhrase(''); setRestoreOpen(true); },
    onResetProgress: () => { setProgressPhrase(''); setProgressOpen(true); }, onDeleteAll: () => { setAllPhrase(''); setAllOpen(true); },
  };

  return <section aria-labelledby="data-title" className="min-w-0 space-y-4">
    <div><h2 id="data-title" className="text-xl font-semibold text-foreground">{t('dataManagement')}</h2><p className="mt-1 text-sm text-muted">{t('dataDescription')}</p></div>
    <div aria-live="polite" className="sr-only">{status}</div>
    {status && <p role="status" className="rounded-xl border border-border bg-primary-subtle px-4 py-3 text-sm text-foreground">{status}</p>}
    {fileError && <p role="alert" className="rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground">{fileError}</p>}
    <DataManagementCards {...cards} />
     {restoreOpen && restorePreview && <TypedConfirmDialog title={t('restoreTitle')} phrase={restoreConfirmationPhrase} value={restorePhrase} onChange={setRestorePhrase} description={`${t('restoreDescriptionDialog')}${restorePreview.grammarSummary?.willOverwrite ? ` ${t('grammarOverwrite', { count: restorePreview.grammarSummary.existingTableCounts.grammarLessonProgress, attempts: restorePreview.grammarSummary.existingTableCounts.grammarExerciseAttempts })}${!restorePreview.grammarSummary.includedInBackup ? ` ${t('grammarAbsent')}` : ''}` : ''}${restorePreview.practiceSummary ? ` ${getPracticeRestoreMessage(restorePreview.practiceSummary, t)}` : ''}${restorePreview.calendarSummary ? ` ${tCalendar('backup.restoreDialogWarning')}${restorePreview.calendarSummary.includedInBackup ? ` ${tCalendar('backup.calendarIncluded', { tasks: formatNumber(restorePreview.calendarSummary.backupTaskCount) })}` : ` ${tCalendar('backup.calendarAbsent')}`}${restorePreview.calendarSummary.willOverwrite ? ` ${tCalendar('backup.calendarOverwrite', { tasks: formatNumber(restorePreview.calendarSummary.existingTaskCount) })}` : ''}` : ''}`} descriptionRole={(restorePreview.calendarSummary || (restorePreview.practiceSummary && (!restorePreview.practiceSummary.includedInBackup || restorePreview.practiceSummary.willOverwrite))) ? 'alert' : undefined} actionLabel={tCommon('actions.restoreBackup')} pending={restoreCommitState.pending} error={restoreCommitState.error ? new Error(restoreCommitState.error) : null} onClose={() => { setRestoreOpen(false); setRestorePhrase(''); }} onConfirm={() => void handleRestore()} inputLabel={t('confirmation.restore', { phrase: restoreConfirmationPhrase })} />}
     {progressOpen && <TypedConfirmDialog title={t('resetDialogTitle')} phrase={progressConfirmationPhrase} value={progressPhrase} onChange={setProgressPhrase} description={`${t('resetDialogDescription')} ${tCalendar('backup.resetProgressDescription')}`} actionLabel={tCommon('actions.confirmReset')} pending={resetProgressMutation.isPending} error={resetProgressMutation.error} onClose={() => { setProgressOpen(false); setProgressPhrase(''); }} onConfirm={() => void handleReset('progress')} inputLabel={t('confirmation.resetProgress', { phrase: progressConfirmationPhrase })} />}
     {allOpen && <TypedConfirmDialog title={t('deleteDialogTitle')} phrase={allConfirmationPhrase} value={allPhrase} onChange={setAllPhrase} description={`${t('deleteDialogDescription')} ${tCalendar('backup.resetAllDescription')}`} actionLabel={tCommon('actions.confirmDeletion')} pending={resetAllMutation.isPending} error={resetAllMutation.error} onClose={() => { setAllOpen(false); setAllPhrase(''); }} onConfirm={() => void handleReset('all')} inputLabel={t('confirmation.deleteAll', { phrase: allConfirmationPhrase })} />}
  </section>;
}
