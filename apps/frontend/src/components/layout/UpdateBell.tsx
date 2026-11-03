/**
 * @file UpdateBell.tsx
 * @description Sidebar header bell that opens a popover to download a newer Lexora desktop release.
 */
import { AlertTriangle, Bell, BellOff, CheckCircle2, CircleStop, Download, FolderOpen, RotateCw, X } from 'lucide-react';
import { useId, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { getDesktopUpdatesApi, type DesktopUpdateState } from '../../desktop/desktop-updates';
import { useDesktopUpdate } from '../../hooks/useDesktopUpdate';
import { formatDate, formatNumber } from '../../i18n/formatters';
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '../ui/Popover';

const BYTES_PER_MB = 1024 * 1024;
const DATA_DIR = '~/.lexora';
const SAFE_PATH = /^[\w~/.+-]+$/;
const ICON_BUTTON = 'inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface';
const PRIMARY_ICON_BUTTON = 'inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface';

/** The bell unmounts once its version is skipped, so hand keyboard focus to a control that stays. */
function moveFocusAwayFromBell(): void {
  const trigger = document.querySelector<HTMLElement>('[data-sidebar="trigger"]');
  trigger?.focus();
  if (trigger === null || document.activeElement !== trigger) document.querySelector<HTMLElement>('main h1')?.focus();
}

const formatSize = (bytes: number) => `${formatNumber(bytes / BYTES_PER_MB, undefined, { maximumFractionDigits: 0 })} MB`;

function IconAction({ label, className = ICON_BUTTON, onClick, icon }: { label: string; className?: string; onClick: () => void; icon: ReactNode }) {
  return (
    <button type="button" aria-label={label} title={label} onClick={onClick} className={className}>
      {icon}
    </button>
  );
}

export function UpdateBell() {
  const { t } = useTranslation('updates');
  const titleId = useId();
  const state = useDesktopUpdate();
  const api = getDesktopUpdatesApi();
  if (!api || !state?.available || !state.latestVersion) return null;

  const version = state.latestVersion;
  const run = (action: () => Promise<unknown>) => () => { void action().catch(() => undefined); };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={t('bellLabel', { version })}
          title={t('bellTitle', { version })}
          aria-haspopup="dialog"
          className={`relative ${ICON_BUTTON}`}
        >
          <Bell aria-hidden="true" size={18} />
          <span data-update-dot aria-hidden="true" className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full border-2 border-surface bg-accent" />
        </button>
      </PopoverTrigger>
      <PopoverContent side="right" align="start" sideOffset={8} aria-labelledby={titleId} className="max-w-[calc(100vw-1.5rem)] !w-80 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h2 id={titleId} className="pt-2 text-base font-semibold text-foreground">{t('title', { version })}</h2>
          <PopoverClose aria-label={t('close')} title={t('close')} className={`-mr-2 -mt-2 ${ICON_BUTTON}`}>
            <X aria-hidden="true" size={18} />
          </PopoverClose>
        </div>
        <p className="text-sm text-muted">
          {t('summary', { current: state.currentVersion, date: formatDate(state.publishedAt, { dateStyle: 'medium', timeZone: 'UTC' }) })}
        </p>
        <UpdateBody state={state} version={version} run={run} />
      </PopoverContent>
    </Popover>
  );
}

function UpdateBody({ state, version, run }: { state: DesktopUpdateState; version: string; run: (action: () => Promise<unknown>) => () => void }) {
  const { t } = useTranslation('updates');
  const api = getDesktopUpdatesApi()!;
  const { download, asset } = state;
  const skip = (
    <IconAction label={t('skip', { version })} onClick={() => { moveFocusAwayFromBell(); run(() => api.dismiss(version))(); }} icon={<BellOff aria-hidden="true" size={18} />} />
  );

  if (download.status === 'downloading' && asset) {
    const percent = Math.min(100, Math.round((download.receivedBytes / asset.sizeBytes) * 100));
    const label = t('progressLabel', { received: formatSize(download.receivedBytes), total: formatSize(asset.sizeBytes) });
    return (
      <>
        <p className="break-all text-sm text-muted"><code className="rounded bg-secondary px-1 text-foreground">{asset.name}</code></p>
        <div role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} aria-label={label} className="h-2 overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${percent}%` }} />
        </div>
        <p className="text-sm text-muted">{label}</p>
        <div className="flex justify-end">
          <IconAction label={t('cancel')} onClick={run(() => api.cancelDownload())} icon={<CircleStop aria-hidden="true" size={18} />} />
        </div>
      </>
    );
  }

  if (download.status === 'done' && download.savedTo) {
    const path = download.savedTo;
    const next = state.install === 'appimage' ? t('nextAppImage') : state.install === 'deb' ? t('nextDeb') : t('nextUnknown');
    const command = state.install === 'deb' && SAFE_PATH.test(path) ? `sudo apt install ${path}` : null;
    return (
      <>
        <p className="flex items-start gap-2 text-sm text-foreground">
          <CheckCircle2 aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-primary" />
          <span className="break-all">{t('done', { path })}</span>
        </p>
        <p className="text-sm text-muted">{next}</p>
        {command && <code className="block break-all rounded bg-secondary px-2 py-1.5 text-xs text-foreground">{command}</code>}
        <p className="text-sm text-muted">{t('dataSafe', { dataDir: DATA_DIR })}</p>
        <div className="flex justify-end gap-1">
          <IconAction label={t('reveal')} className={PRIMARY_ICON_BUTTON} onClick={run(() => api.revealDownload())} icon={<FolderOpen aria-hidden="true" size={18} />} />
          {skip}
        </div>
      </>
    );
  }

  if (download.status === 'error') {
    const message = {
      network: t('errorNetwork'),
      verify: t('errorVerify'),
      disk: t('errorDisk', { dir: state.downloadDir }),
      'no-asset': t('errorNoAsset'),
    }[download.error ?? 'network'];
    return (
      <>
        <p className="flex items-start gap-2 text-sm text-danger">
          <AlertTriangle aria-hidden="true" size={18} className="mt-0.5 shrink-0" />
          <span className="text-foreground">{message}</span>
        </p>
        <div className="flex justify-end gap-1">
          {download.error !== 'no-asset' && (
            <IconAction label={t('retry')} className={PRIMARY_ICON_BUTTON} onClick={run(() => api.download())} icon={<RotateCw aria-hidden="true" size={18} />} />
          )}
          {skip}
        </div>
      </>
    );
  }

  return (
    <>
      {asset && (
        <p className="break-all text-sm text-muted">
          <code className="rounded bg-secondary px-1 text-foreground">{asset.name}</code> · {formatSize(asset.sizeBytes)}
        </p>
      )}
      <p className="text-sm text-muted">{t('savesTo', { dir: state.downloadDir })}</p>
      <div className="flex justify-end gap-1">
        {asset && (
          <IconAction
            label={t('download', { file: asset.name, size: formatSize(asset.sizeBytes) })}
            className={PRIMARY_ICON_BUTTON}
            onClick={run(() => api.download())}
            icon={<Download aria-hidden="true" size={18} />}
          />
        )}
        {skip}
      </div>
    </>
  );
}
