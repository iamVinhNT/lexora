/**
 * @file update-controller.test.ts
 * @description Verifies update scheduling, dismissal, download state, throttling, and cleanup in the desktop update controller.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { UpdateState } from '../src/contracts.js';
import { parseRelease, UpdateCheckError, type ReleaseAsset, type UpdateCheckResult } from '../src/update-check.js';
import { UpdateDownloadError } from '../src/update-download.js';
import { createUpdateController, type UpdateControllerDeps } from '../src/update-controller.js';
import type { PersistedUpdateState } from '../src/update-state.js';

const DIGEST = `sha256:${'a'.repeat(64)}`;
const HOUR = 3_600_000;

function release(version: string) {
  const base = `https://github.com/iamVinhNT/lexora/releases/download/v${version}`;
  return parseRelease({
    tag_name: `v${version}`, draft: false, prerelease: false, published_at: '2026-11-03T08:00:00Z',
    assets: [
      { name: `Lexora-${version}-x86_64.AppImage`, size: 1000, digest: DIGEST, browser_download_url: `${base}/Lexora-${version}-x86_64.AppImage` },
      { name: `lexora_${version}_amd64.deb`, size: 800, digest: DIGEST, browser_download_url: `${base}/lexora_${version}_amd64.deb` },
    ],
  })!;
}
const available = (version: string): UpdateCheckResult => ({ kind: 'available', release: release(version) });

function memoryStore(initial: PersistedUpdateState = {}) {
  let data = { ...initial };
  return { load: vi.fn(async () => ({ ...data })), save: vi.fn(async (patch: PersistedUpdateState) => { data = { ...data, ...patch }; }), peek: () => data };
}

function setup(overrides: Partial<UpdateControllerDeps> = {}, persisted: PersistedUpdateState = {}) {
  const emitted: UpdateState[] = [];
  const store = memoryStore(persisted);
  const deps: UpdateControllerDeps = {
    currentVersion: '0.3.0',
    install: 'appimage',
    store,
    check: vi.fn(async () => available('0.4.0')),
    download: vi.fn(async ({ asset }: { asset: ReleaseAsset }) => ({ path: `/home/u/Downloads/${asset.name}` })),
    downloadsDir: '/home/u/Downloads',
    homeDir: '/home/u',
    showItemInFolder: vi.fn(),
    emit: (state) => emitted.push(state),
    logError: vi.fn(),
    ...overrides,
  };
  return { controller: createUpdateController(deps), deps, store, emitted };
}

beforeEach(() => { vi.useFakeTimers(); vi.setSystemTime(new Date('2026-11-03T08:00:00Z')); });
afterEach(() => { vi.useRealTimers(); });

describe('update checks', () => {
  it('checks 10 seconds after start, shows the bell, and records the check time', async () => {
    const { controller, deps, store, emitted } = setup();
    await controller.start();
    expect(deps.check).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(10_000);
    expect(deps.check).toHaveBeenCalledTimes(1);
    expect(controller.getState()).toMatchObject({ available: true, currentVersion: '0.3.0', latestVersion: '0.4.0', install: 'appimage', downloadDir: '~/Downloads', asset: { name: 'Lexora-0.4.0-x86_64.AppImage', sizeBytes: 1000 } });
    expect(store.peek().lastCheckedAt).toBe('2026-11-03T08:00:10.000Z');
    expect(emitted.at(-1)?.available).toBe(true);
    controller.dispose();
  });

  it('does not check again at launch when the last check was under 24 hours ago, then checks once it is due', async () => {
    const { controller, deps } = setup({}, { lastCheckedAt: new Date(Date.now() - HOUR).toISOString() });
    await controller.start();
    await vi.advanceTimersByTimeAsync(10_000);
    expect(deps.check).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(23 * HOUR);
    expect(deps.check).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(5 * HOUR);
    expect(deps.check).toHaveBeenCalledTimes(1);
    controller.dispose();
  });

  it('stays silent on a failed check, logs it, and retries on a later tick', async () => {
    const check = vi.fn().mockRejectedValueOnce(new UpdateCheckError('network', 'offline')).mockResolvedValue(available('0.4.0'));
    const { controller, deps, store, emitted } = setup({ check });
    await controller.start();
    await vi.advanceTimersByTimeAsync(10_000);
    expect(controller.getState().available).toBe(false);
    expect(emitted).toHaveLength(0);
    expect(store.peek().lastCheckedAt).toBeUndefined();
    expect(deps.logError).toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(HOUR);
    expect(controller.getState().available).toBe(true);
    controller.dispose();
  });

  it('reports not available when the latest release is current', async () => {
    const { controller } = setup({ check: vi.fn(async () => ({ kind: 'current' }) as UpdateCheckResult) });
    await controller.start();
    await vi.advanceTimersByTimeAsync(10_000);
    expect(controller.getState()).toMatchObject({ available: false, install: 'appimage', downloadDir: '~/Downloads' });
    controller.dispose();
  });

  it('stops all timers on dispose', async () => {
    const { controller, deps } = setup();
    await controller.start();
    controller.dispose();
    await vi.advanceTimersByTimeAsync(48 * HOUR);
    expect(deps.check).not.toHaveBeenCalled();
  });
});

describe('dismissal', () => {
  async function started(persisted: PersistedUpdateState = {}, overrides: Partial<UpdateControllerDeps> = {}) {
    const result = setup(overrides, persisted);
    await result.controller.start();
    await vi.advanceTimersByTimeAsync(10_000);
    return result;
  }

  it('hides the bell for the dismissed version and persists it', async () => {
    const { controller, store } = await started();
    await controller.dismiss('0.4.0');
    expect(controller.getState().available).toBe(false);
    expect(store.peek().dismissedVersion).toBe('0.4.0');
    controller.dispose();
  });

  it('only accepts the version that is currently offered', async () => {
    const { controller, store } = await started();
    await controller.dismiss('9.9.9');
    await controller.dismiss('0.3.0');
    expect(controller.getState().available).toBe(true);
    expect(store.save).not.toHaveBeenCalledWith(expect.objectContaining({ dismissedVersion: expect.anything() }));
    controller.dispose();
  });

  it('keeps a persisted dismissal across launches and shows a newer release again', async () => {
    const first = await started({ dismissedVersion: '0.4.0' });
    expect(first.controller.getState().available).toBe(false);
    first.controller.dispose();
    const second = await started({ dismissedVersion: '0.4.0' }, { check: vi.fn(async () => available('0.5.0')) });
    expect(second.controller.getState()).toMatchObject({ available: true, latestVersion: '0.5.0' });
    second.controller.dispose();
  });

  it('ignores a dismiss request with an invalid version', async () => {
    const { controller, store } = await started();
    await controller.dismiss('nightly');
    expect(controller.getState().available).toBe(true);
    expect(store.save).not.toHaveBeenCalledWith(expect.objectContaining({ dismissedVersion: expect.anything() }));
    controller.dispose();
  });

  it('cancels a running download when its version is dismissed', async () => {
    let seenSignal!: AbortSignal;
    const download = vi.fn(({ signal }: { signal: AbortSignal }) => new Promise<{ path: string }>((_resolve, reject) => {
      seenSignal = signal;
      signal.addEventListener('abort', () => reject(new DOMException('x', 'AbortError')));
    }));
    const { controller } = await started({}, { download: download as never });
    controller.startDownload();
    await controller.dismiss('0.4.0');
    expect(seenSignal.aborted).toBe(true);
    expect(controller.getState().download.status).toBe('idle');
    controller.dispose();
  });
});

describe('downloads', () => {
  async function started(overrides: Partial<UpdateControllerDeps> = {}) {
    const result = setup(overrides);
    await result.controller.start();
    await vi.advanceTimersByTimeAsync(10_000);
    return result;
  }

  it('downloads the AppImage into the downloads folder and reports a home-relative path', async () => {
    const { controller, deps, emitted } = await started();
    controller.startDownload();
    expect(controller.getState().download.status).toBe('downloading');
    await vi.advanceTimersByTimeAsync(0);
    expect(deps.download).toHaveBeenCalledWith(expect.objectContaining({ directory: '/home/u/Downloads', asset: expect.objectContaining({ name: 'Lexora-0.4.0-x86_64.AppImage' }) }));
    expect(controller.getState().download).toEqual({ status: 'done', receivedBytes: 1000, savedTo: '~/Downloads/Lexora-0.4.0-x86_64.AppImage' });
    expect(emitted.at(-1)?.download.status).toBe('done');
    controller.dispose();
  });

  it('downloads the deb for a deb install', async () => {
    const { controller, deps } = await started({ install: 'deb' });
    controller.startDownload();
    await vi.advanceTimersByTimeAsync(0);
    expect(deps.download).toHaveBeenCalledWith(expect.objectContaining({ asset: expect.objectContaining({ name: 'lexora_0.4.0_amd64.deb' }) }));
    controller.dispose();
  });

  it('reports no-asset when the release has no file for this install', async () => {
    const empty = { kind: 'available', release: { version: '0.4.0', assets: [] } } as UpdateCheckResult;
    const { controller, deps } = await started({ check: vi.fn(async () => empty) });
    controller.startDownload();
    expect(controller.getState().download).toMatchObject({ status: 'error', error: 'no-asset' });
    expect(deps.download).not.toHaveBeenCalled();
    controller.dispose();
  });

  it('ignores a second start while a download is running', async () => {
    const download = vi.fn(() => new Promise<{ path: string }>(() => undefined));
    const { controller } = await started({ download: download as never });
    controller.startDownload();
    controller.startDownload();
    await vi.advanceTimersByTimeAsync(0);
    expect(download).toHaveBeenCalledTimes(1);
    controller.dispose();
  });

  it('ignores a start when no update is available', async () => {
    const { controller, deps } = setup();
    await controller.start();
    controller.startDownload();
    expect(deps.download).not.toHaveBeenCalled();
    expect(controller.getState().download.status).toBe('idle');
    controller.dispose();
  });

  it('throttles progress events to four per second and keeps received bytes current', async () => {
    let onProgress!: (bytes: number) => void;
    let finish!: (value: { path: string }) => void;
    const download = vi.fn((options: { onProgress: (n: number) => void }) => new Promise<{ path: string }>((resolve) => { onProgress = options.onProgress; finish = resolve; }));
    const { controller, emitted } = await started({ download: download as never });
    controller.startDownload();
    await vi.advanceTimersByTimeAsync(0);
    const before = emitted.length;
    for (let bytes = 10; bytes <= 100; bytes += 10) onProgress(bytes);
    expect(emitted.length - before).toBeLessThanOrEqual(1);
    expect(controller.getState().download.receivedBytes).toBe(100);
    await vi.advanceTimersByTimeAsync(300);
    onProgress(500);
    expect(emitted.at(-1)?.download.receivedBytes).toBe(500);
    finish({ path: '/home/u/Downloads/Lexora-0.4.0-x86_64.AppImage' });
    controller.dispose();
  });

  it('cancels back to idle', async () => {
    let seenSignal!: AbortSignal;
    const download = vi.fn(({ signal }: { signal: AbortSignal }) => new Promise<{ path: string }>((_resolve, reject) => {
      seenSignal = signal;
      signal.addEventListener('abort', () => reject(new DOMException('x', 'AbortError')));
    }));
    const { controller } = await started({ download: download as never });
    controller.startDownload();
    await vi.advanceTimersByTimeAsync(0);
    controller.cancelDownload();
    await vi.advanceTimersByTimeAsync(0);
    expect(seenSignal.aborted).toBe(true);
    expect(controller.getState().download).toMatchObject({ status: 'idle', receivedBytes: 0 });
    controller.dispose();
  });

  it.each([
    [new UpdateDownloadError('verify', 'bad'), 'verify'],
    [new UpdateDownloadError('disk', 'full'), 'disk'],
    [new Error('boom'), 'network'],
  ])('maps %s to the %s error and allows a retry', async (error, code) => {
    const download = vi.fn().mockRejectedValueOnce(error).mockResolvedValueOnce({ path: '/home/u/Downloads/Lexora-0.4.0-x86_64.AppImage' });
    const { controller, deps } = await started({ download: download as never });
    controller.startDownload();
    await vi.advanceTimersByTimeAsync(0);
    expect(controller.getState().download).toMatchObject({ status: 'error', error: code });
    expect(deps.logError).toHaveBeenCalled();
    controller.startDownload();
    await vi.advanceTimersByTimeAsync(0);
    expect(controller.getState().download.status).toBe('done');
    controller.dispose();
  });

  it('reveals only a finished download, using the full path kept in the main process', async () => {
    const { controller, deps } = await started();
    expect(controller.revealDownload()).toEqual({ shown: false });
    controller.startDownload();
    await vi.advanceTimersByTimeAsync(0);
    expect(controller.revealDownload()).toEqual({ shown: true });
    expect(deps.showItemInFolder).toHaveBeenCalledWith('/home/u/Downloads/Lexora-0.4.0-x86_64.AppImage');
    controller.dispose();
  });

  it('resets the download state when a newer release replaces the known one', async () => {
    const check = vi.fn().mockResolvedValueOnce(available('0.4.0')).mockResolvedValueOnce(available('0.5.0'));
    const { controller } = await started({ check });
    controller.startDownload();
    await vi.advanceTimersByTimeAsync(0);
    expect(controller.getState().download.status).toBe('done');
    await controller.runCheck();
    expect(controller.getState()).toMatchObject({ latestVersion: '0.5.0', download: { status: 'idle' } });
    controller.dispose();
  });

  it('aborts a running download on dispose', async () => {
    let seenSignal!: AbortSignal;
    const download = vi.fn(({ signal }: { signal: AbortSignal }) => new Promise<{ path: string }>((_resolve, reject) => {
      seenSignal = signal;
      signal.addEventListener('abort', () => reject(new DOMException('x', 'AbortError')));
    }));
    const { controller } = await started({ download: download as never });
    controller.startDownload();
    await vi.advanceTimersByTimeAsync(0);
    controller.dispose();
    expect(seenSignal.aborted).toBe(true);
  });
});
