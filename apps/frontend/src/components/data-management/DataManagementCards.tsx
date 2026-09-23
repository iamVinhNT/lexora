/**
 * @file DataManagementCards.tsx
 * @description Stateless localized cards for import, export, restore, and destructive data actions.
 */
import type { ReactNode } from 'react';
import { Download, FileUp, ShieldAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { ImportFormat, ImportPreview, RestorePreview } from '../../api/data.api';
import { ApiError } from '../../api/client';
import { getLocalizedErrorMessage } from '../../i18n/presentation';
import { formatNumber } from '../../i18n/formatters';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';

const inputClass = 'min-h-11 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary';

export type DataManagementCardsProps = {
  format: ImportFormat;
  onFormatChange: (value: ImportFormat) => void;
  importName: string;
  onImportFile: (file?: File) => void;
  desktopFiles: boolean;
  onSelectImport: () => void;
  importLoading: boolean;
  importPreview: ImportPreview | null;
  importConfirmed: boolean;
  setImportConfirmed: (value: boolean) => void;
  onImportCommit: () => void;
  importPending: boolean;
  importError: string;
  onExport: () => void;
  onBackup: () => void;
  exportPending: boolean;
  backupPending: boolean;
  exportError: Error | null;
  onRestoreFile: (file?: File) => void;
  onSelectRestore: () => void;
  restorePreview: RestorePreview | null;
  restoreLoading: boolean;
  onOpenRestore: () => void;
  onResetProgress: () => void;
  onDeleteAll: () => void;
};

export function DataManagementCards(props: DataManagementCardsProps) {
  return <>
    <ImportCard format={props.format} onFormatChange={props.onFormatChange} importName={props.importName} onFile={props.onImportFile} desktopFiles={props.desktopFiles} onSelect={props.onSelectImport} loading={props.importLoading} preview={props.importPreview} confirmed={props.importConfirmed} setConfirmed={props.setImportConfirmed} onCommit={props.onImportCommit} pending={props.importPending} error={props.importError} />
    <ExportCard onExport={props.onExport} onBackup={props.onBackup} exportPending={props.exportPending} backupPending={props.backupPending} error={props.exportError} />
    <RestoreCard onFile={props.onRestoreFile} desktopFiles={props.desktopFiles} onSelect={props.onSelectRestore} preview={props.restorePreview} loading={props.restoreLoading} onOpen={props.onOpenRestore} />
    <DangerCard onProgress={props.onResetProgress} onAll={props.onDeleteAll} />
  </>;
}

export type ImportCardProps = {
  format: ImportFormat;
  onFormatChange: (value: ImportFormat) => void;
  importName: string;
  onFile: (file?: File) => void;
  desktopFiles: boolean;
  onSelect: () => void;
  loading: boolean;
  preview: ImportPreview | null;
  confirmed: boolean;
  setConfirmed: (value: boolean) => void;
  onCommit: () => void;
  pending: boolean;
  error: string;
};

export function ImportCard({ format, onFormatChange, importName, onFile, desktopFiles, onSelect, loading, preview, confirmed, setConfirmed, onCommit, pending, error }: ImportCardProps) {
  const { t } = useTranslation('settings');
  const { t: tCommon } = useTranslation('common');
  const importButtonLabel = tCommon('actions.importItems', { count: preview?.validCount ?? 0 });

  return (
    <Card className="space-y-5 p-5">
      <CardHeading icon={<FileUp aria-hidden="true" size={20} />} title={t('importVocabulary')} description={t('importDescription')} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="import-format" className="text-sm font-semibold text-foreground">{t('importFormat')}</label>
          <Select value={format} onValueChange={(value) => onFormatChange(value as ImportFormat)}>
            <SelectTrigger id="import-format" aria-label={t('importFormat')} className={`${inputClass} mt-2`}><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="TXT">TXT</SelectItem><SelectItem value="CSV">CSV</SelectItem><SelectItem value="JSON">JSON</SelectItem></SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="import-file" className="text-sm font-semibold text-foreground">{t('importFile')}</label>
          {desktopFiles ? (
            <Button id="import-file" type="button" variant="secondary" className="mt-2" onClick={onSelect}>{t('importFile')}</Button>
          ) : (
            <input id="import-file" type="file" accept=".txt,.csv,.json" onChange={(event) => onFile(event.target.files?.[0])} className={`${inputClass} mt-2 file:mr-3 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-2`} />
          )}
        </div>
      </div>
      {importName && <p className="text-sm text-muted">{t('selected', { name: importName })}</p>}
      {loading && <p role="status" className="text-sm text-muted">{t('preparing')}</p>}
      {preview && <div className="space-y-4 rounded-xl border border-border bg-secondary p-4">
        <h4 className="font-semibold text-foreground">{t('importPreview')}</h4>
        <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          <Summary label={t('valid')} value={preview.validCount} />
          <Summary label={t('duplicate')} value={preview.duplicateCount} />
          <Summary label={t('invalid')} value={preview.invalidCount} />
          <p className="text-muted">{t('skipped')}</p>
        </div>
        <label className="flex min-h-11 items-center gap-3 text-sm text-foreground">
          <input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} />
          {t('reviewedValid')}
        </label>
        <Button type="button" onClick={onCommit} disabled={!confirmed || preview.validCount === 0 || pending}>{pending ? tCommon('status.loading') : importButtonLabel}</Button>
        {preview.validCount === 0 && <p className="text-sm text-muted">{t('noValidItems')}</p>}
      </div>}
      {error && <p role="alert" className="text-sm text-foreground">{error}</p>}
    </Card>
  );
}

export type ExportCardProps = { onExport: () => void; onBackup: () => void; exportPending: boolean; backupPending: boolean; error: Error | null };

export function ExportCard({ onExport, onBackup, exportPending, backupPending, error }: ExportCardProps) {
  const { t } = useTranslation('settings');
  const { t: tCommon } = useTranslation('common');
  return <Card className="space-y-5 p-5">
    <CardHeading icon={<Download aria-hidden="true" size={20} />} title={t('exportBackup')} description={t('exportDescription')} />
    <div className="flex flex-col gap-3 sm:flex-row">
       <Button type="button" variant="secondary" onClick={onExport} disabled={exportPending}>{exportPending ? t('exporting') : tCommon('actions.exportVocabulary')}</Button>
       <Button type="button" variant="secondary" onClick={onBackup} disabled={backupPending}>{backupPending ? t('preparingBackup') : tCommon('actions.downloadFullBackup')}</Button>
     </div>
     {error && <ErrorMessage error={error} />}
  </Card>;
}

export type RestoreCardProps = { onFile: (file?: File) => void; desktopFiles: boolean; onSelect: () => void; preview: RestorePreview | null; loading: boolean; onOpen: () => void };

export function RestoreCard({ onFile, desktopFiles, onSelect, preview, loading, onOpen }: RestoreCardProps) {
  const { t } = useTranslation('settings');
  const { t: tCommon } = useTranslation('common');
  return <Card className="space-y-5 p-5">
    <CardHeading icon={<FileUp aria-hidden="true" size={20} />} title={t('restore')} description={t('restoreDescription')} />
    <label htmlFor="restore-file" className="text-sm font-semibold text-foreground">{t('restoreFile')}</label>
    {desktopFiles ? (
      <Button id="restore-file" type="button" variant="secondary" onClick={onSelect}>{t('restoreFile')}</Button>
    ) : (
      <input id="restore-file" type="file" accept=".json,application/json" onChange={(event) => onFile(event.target.files?.[0])} className={`${inputClass} file:mr-3 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-2`} />
    )}
     {loading && <p role="status" className="text-sm text-muted">{tCommon('status.preparingRestore')}</p>}
    {preview && <div className="space-y-3 rounded-xl border border-border bg-secondary p-4">
      <h4 className="font-semibold text-foreground">{t('restorePreview')}</h4>
      <p className="text-sm text-foreground">{t('records', { count: preview.totalRecords, application: preview.application, version: preview.version })}</p>
      <p className="text-sm text-foreground">{preview.conflictSummary.willOverwrite ? t('overwrite', { count: preview.conflictSummary.existingRecordsCount }) : t('noOverwrite')}</p>
      <Button type="button" variant="danger" onClick={onOpen}>{t('openRestore')}</Button>
    </div>}
  </Card>;
}

export function DangerCard({ onProgress, onAll }: { onProgress: () => void; onAll: () => void }) {
  const { t } = useTranslation('settings');
  return <Card className="space-y-5 border-danger p-5">
    <CardHeading icon={<ShieldAlert aria-hidden="true" className="text-danger" size={20} />} title={t('dangerZone')} description={t('dangerDescription')} />
    <div className="grid gap-3 sm:grid-cols-2">
      <div><p className="font-semibold text-foreground">{t('resetProgress')}</p><p className="mt-1 text-sm text-muted">{t('resetDescription')}</p><Button type="button" variant="danger" className="mt-4" onClick={onProgress}>{t('resetProgress')}</Button></div>
      <div><p className="font-semibold text-foreground">{t('deleteAll')}</p><p className="mt-1 text-sm text-muted">{t('deleteAllDescription')}</p><Button type="button" variant="danger" className="mt-4" onClick={onAll}>{t('deleteAll')}</Button></div>
    </div>
  </Card>;
}

export function CardHeading({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return <div className="flex items-start gap-3"><span className="mt-1 text-primary">{icon}</span><div><h3 className="font-semibold text-foreground">{title}</h3><p className="mt-1 text-sm text-muted">{description}</p></div></div>;
}

export function Summary({ label, value }: { label: string; value: number }) {
  return <p className="text-muted">{label}: {formatNumber(value)}</p>;
}

function ErrorMessage({ error }: { error: unknown }) {
  const { t } = useTranslation('common');
  const diagnosticError = error instanceof Error && !(error instanceof ApiError) ? error.message : null;
  return <p role="alert" className="text-sm text-foreground"><span>{getLocalizedErrorMessage(error, t)}</span>{diagnosticError && <span className="sr-only"> {diagnosticError}</span>}</p>;
}
