/**
 * @file update-controller.ts
 * @description Owns desktop update state: scheduled checks, dismissal, throttled download progress, and cleanup.
 */
import type { RevealDownloadResult, UpdateDownloadErrorCode, UpdateDownloadState, UpdateInstallKind, UpdateState } from './contracts.js';
import { compareVersions, selectAsset, type ReleaseAsset, type ReleaseInfo, type UpdateCheckResult, type UpdateSource } from './update-check.js';
import { UpdateDownloadError } from './update-download.js';
import type { PersistedUpdateState, UpdateStateStore } from './update-state.js';

const HOUR_MS = 3_600_000;
const CHECK_INTERVAL_MS = 24 * HOUR_MS;
const SEMVER = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

export interface UpdateControllerDeps {
  currentVersion: string;
  install: UpdateInstallKind;
  source?: UpdateSource;
  store: UpdateStateStore;
  check: () => Promise<UpdateCheckResult>;
  download: (options: { asset: ReleaseAsset; directory: string; signal: AbortSignal; onProgress: (receivedBytes: number) => void }) => Promise<{ path: string }>;
  downloadsDir: string;
  homeDir: string;
  showItemInFolder: (path: string) => void;
  emit: (state: UpdateState) => void;
  logError: (message: string, error: unknown) => void;
  now?: () => Date;
  initialDelayMs?: number;
  tickMs?: number;
  progressIntervalMs?: number;
}

export interface UpdateController {
  start(): Promise<void>;
  dispose(): void;
  getState(): UpdateState;
  runCheck(): Promise<void>;
  startDownload(): UpdateState;
  cancelDownload(): UpdateState;
  revealDownload(): RevealDownloadResult;
  dismiss(version: string): Promise<UpdateState>;
}

const IDLE: UpdateDownloadState = { status: 'idle', receivedBytes: 0 };

function unref(timer: unknown): void {
  (timer as { unref?: () => void }).unref?.();
}

export function createUpdateController(deps: UpdateControllerDeps): UpdateController {
  const now = deps.now ?? (() => new Date());
  const progressIntervalMs = deps.progressIntervalMs ?? 250;
  let persisted: PersistedUpdateState = {};
  let latest: ReleaseInfo | null = null;
  let download: UpdateDownloadState = IDLE;
  let savedPath: string | undefined;
  let activeDownload: AbortController | undefined;
  let checking = false;
  let initialTimer: ReturnType<typeof setTimeout> | undefined;
  let tickTimer: ReturnType<typeof setInterval> | undefined;
  let lastProgressEmit = 0;

  const displayPath = (path: string) => (path.startsWith(`${deps.homeDir}/`) ? `~${path.slice(deps.homeDir.length)}` : path);

  const isAvailable = () => latest !== null
    && compareVersions(latest.version, deps.currentVersion) > 0
    && (persisted.dismissedVersion === undefined || compareVersions(latest.version, persisted.dismissedVersion) > 0);

  function getState(): UpdateState {
    const state: UpdateState = { available: false, currentVersion: deps.currentVersion, install: deps.install, downloadDir: displayPath(deps.downloadsDir), download: { ...download } };
    if (latest === null || !isAvailable()) return state;
    state.available = true;
    state.latestVersion = latest.version;
    if (latest.publishedAt !== undefined) state.publishedAt = latest.publishedAt;
    const asset = selectAsset(latest, deps.install, deps.source);
    if (asset) state.asset = { name: asset.name, sizeBytes: asset.size };
    return state;
  }

  const emit = () => deps.emit(getState());

  function resetDownload(): void {
    activeDownload?.abort();
    activeDownload = undefined;
    savedPath = undefined;
    download = IDLE;
  }

  function applyLatest(release: ReleaseInfo | null): void {
    if (latest?.version !== release?.version) resetDownload();
    latest = release;
  }

  async function runCheck(): Promise<void> {
    if (checking) return;
    checking = true;
    try {
      const result = await deps.check();
      applyLatest(result.kind === 'available' ? result.release : null);
      persisted = { ...persisted, lastCheckedAt: now().toISOString() };
      await deps.store.save({ lastCheckedAt: persisted.lastCheckedAt! }).catch((error) => deps.logError('Could not save update check time.', error));
      emit();
    } catch (error) {
      deps.logError('Update check failed.', error);
    } finally {
      checking = false;
    }
  }

  async function checkIfDue(): Promise<void> {
    const last = persisted.lastCheckedAt ? Date.parse(persisted.lastCheckedAt) : 0;
    if (now().getTime() - last >= CHECK_INTERVAL_MS) await runCheck();
  }

  async function runDownload(asset: ReleaseAsset, controller: AbortController): Promise<void> {
    try {
      const { path } = await deps.download({
        asset,
        directory: deps.downloadsDir,
        signal: controller.signal,
        onProgress: (receivedBytes) => {
          if (activeDownload !== controller) return;
          download = { status: 'downloading', receivedBytes };
          if (now().getTime() - lastProgressEmit >= progressIntervalMs) {
            lastProgressEmit = now().getTime();
            emit();
          }
        },
      });
      if (activeDownload !== controller) return;
      savedPath = path;
      download = { status: 'done', receivedBytes: asset.size, savedTo: displayPath(path) };
    } catch (error) {
      if (activeDownload !== controller) return;
      if (error instanceof Error && error.name === 'AbortError') {
        download = IDLE;
      } else {
        deps.logError('Update download failed.', error);
        const code: UpdateDownloadErrorCode = error instanceof UpdateDownloadError ? error.code : 'network';
        download = { status: 'error', receivedBytes: 0, error: code };
      }
    }
    activeDownload = undefined;
    emit();
  }

  function startDownload(): UpdateState {
    if (latest === null || !isAvailable() || download.status === 'downloading') return getState();
    const asset = selectAsset(latest, deps.install, deps.source);
    if (!asset) {
      download = { status: 'error', receivedBytes: 0, error: 'no-asset' };
      emit();
      return getState();
    }
    const controller = new AbortController();
    activeDownload = controller;
    savedPath = undefined;
    download = { status: 'downloading', receivedBytes: 0 };
    lastProgressEmit = now().getTime();
    emit();
    void runDownload(asset, controller);
    return getState();
  }

  function cancelDownload(): UpdateState {
    if (download.status === 'downloading') {
      resetDownload();
      emit();
    }
    return getState();
  }

  return {
    async start() {
      persisted = await deps.store.load();
      initialTimer = setTimeout(() => void checkIfDue(), deps.initialDelayMs ?? 10_000);
      tickTimer = setInterval(() => void checkIfDue(), deps.tickMs ?? HOUR_MS);
      unref(initialTimer);
      unref(tickTimer);
    },
    dispose() {
      clearTimeout(initialTimer);
      clearInterval(tickTimer);
      resetDownload();
    },
    getState,
    runCheck,
    startDownload,
    cancelDownload,
    revealDownload() {
      if (download.status !== 'done' || savedPath === undefined) return { shown: false };
      deps.showItemInFolder(savedPath);
      return { shown: true };
    },
    async dismiss(version) {
      if (!SEMVER.test(version) || latest === null || version !== latest.version) return getState();
      if (download.status === 'downloading') resetDownload();
      persisted = { ...persisted, dismissedVersion: version };
      await deps.store.save({ dismissedVersion: version }).catch((error) => deps.logError('Could not save dismissed update version.', error));
      emit();
      return getState();
    },
  };
}
