/**
 * @file update-service.test.ts
 * @description Verifies production wiring of the desktop update service: sources, paths, handlers, and an end-to-end download.
 */
import { createHash } from 'node:crypto';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { UPDATE_CHANNELS } from '../src/contracts.js';
import { createUpdateService } from '../src/update-service.js';

const CONTENT = Buffer.from('release-bytes-'.repeat(200));
const DIGEST = `sha256:${createHash('sha256').update(CONTENT).digest('hex')}`;
const TRUSTED = { senderFrame: { url: 'http://127.0.0.1:45678/' } };

function releaseJson(version: string, urlFor: (name: string) => string) {
  const names = [`Lexora-${version}-x86_64.AppImage`, `lexora_${version}_amd64.deb`];
  return {
    tag_name: `v${version}`, draft: false, prerelease: false, published_at: '2026-11-03T08:00:00Z',
    assets: names.map((name) => ({ name, size: CONTENT.length, digest: DIGEST, browser_download_url: urlFor(name) })),
  };
}

let userData: string;
let downloads: string;
beforeEach(async () => {
  userData = await mkdtemp(join(tmpdir(), 'lexora-svc-user-'));
  downloads = await mkdtemp(join(tmpdir(), 'lexora-svc-dl-'));
});
afterEach(async () => {
  await rm(userData, { recursive: true, force: true });
  await rm(downloads, { recursive: true, force: true });
});

function build(overrides: Record<string, unknown> = {}) {
  const handlers = new Map<string, (event: unknown, request?: unknown) => Promise<unknown>>();
  const ipcMain = { handle: vi.fn((channel: string, handler: never) => handlers.set(channel, handler)) };
  const sendState = vi.fn();
  const logError = vi.fn();
  const showItemInFolder = vi.fn();
  const fetchFn = vi.fn();
  const service = createUpdateService({
    ipcMain, allowedOrigin: 'http://127.0.0.1:45678', sendState, logError,
    app: { getVersion: () => '0.3.0', getPath: (name: string) => (name === 'userData' ? userData : downloads), isPackaged: true },
    shell: { showItemInFolder },
    homeDir: '/home/u', execPath: '/tmp/.mount_x/lexora', env: {},
    fetch: fetchFn,
    ...overrides,
  } as never);
  return { service, handlers, sendState, logError, showItemInFolder, fetchFn };
}

describe('createUpdateService', () => {
  it('registers the update IPC handlers for the embedded origin only', async () => {
    const { handlers } = build();
    expect([...handlers.keys()]).toContain(UPDATE_CHANNELS.getState);
    await expect(handlers.get(UPDATE_CHANNELS.getState)!({ senderFrame: { url: 'https://evil.example/' } })).rejects.toThrow();
    expect(await handlers.get(UPDATE_CHANNELS.getState)!(TRUSTED)).toMatchObject({ available: false, currentVersion: '0.3.0', install: 'unknown' });
  });

  it('detects an AppImage install from APPIMAGE', async () => {
    const { handlers } = build({ env: { APPIMAGE: '/home/u/Lexora.AppImage' } });
    expect(await handlers.get(UPDATE_CHANNELS.getState)!(TRUSTED)).toMatchObject({ install: 'appimage' });
  });

  it('checks GitHub and ignores the development override in a packaged app', async () => {
    const { service, fetchFn } = build({ env: { LEXORA_UPDATE_DEV_ORIGIN: 'http://127.0.0.1:4555', LEXORA_DOWNLOAD_DIR: '/tmp/elsewhere' } });
    fetchFn.mockResolvedValue(new Response(JSON.stringify(releaseJson('0.3.0', (name) => `https://github.com/iamVinhNT/lexora/releases/download/v0.3.0/${name}`))));
    await service.controller.runCheck();
    expect(fetchFn).toHaveBeenCalledWith('https://api.github.com/repos/iamVinhNT/lexora/releases/latest', expect.anything());
  });

  it('downloads end to end from a loopback source into the override folder in development', async () => {
    const origin = 'http://127.0.0.1:4555';
    const { service, fetchFn, sendState, showItemInFolder } = build({
      app: { getVersion: () => '0.3.0', getPath: (name: string) => (name === 'userData' ? userData : '/should/not/be/used'), isPackaged: false },
      env: { APPIMAGE: '/home/u/Lexora.AppImage', LEXORA_UPDATE_DEV_ORIGIN: origin, LEXORA_DOWNLOAD_DIR: downloads },
    });
    fetchFn.mockImplementation(async (url: string) => {
      if (url === `${origin}/latest`) return new Response(JSON.stringify(releaseJson('0.4.0', (name) => `${origin}/download/v0.4.0/${name}`)));
      if (url.startsWith(`${origin}/download/`)) return new Response(CONTENT, { status: 200 });
      throw new Error(`unexpected ${url}`);
    });

    await service.controller.runCheck();
    expect(service.controller.getState()).toMatchObject({ available: true, latestVersion: '0.4.0' });
    service.controller.startDownload();
    await vi.waitFor(() => expect(service.controller.getState().download.status).toBe('done'));

    expect(await readFile(join(downloads, 'Lexora-0.4.0-x86_64.AppImage'))).toEqual(CONTENT);
    expect(sendState).toHaveBeenLastCalledWith(expect.objectContaining({ download: expect.objectContaining({ status: 'done' }) }));
    expect(service.controller.revealDownload()).toEqual({ shown: true });
    expect(showItemInFolder).toHaveBeenCalledWith(join(downloads, 'Lexora-0.4.0-x86_64.AppImage'));
    service.dispose();
  });

  it('persists dismissal in the user data folder across service instances', async () => {
    const first = build();
    first.fetchFn.mockResolvedValue(new Response(JSON.stringify(releaseJson('0.4.0', (name) => `https://github.com/iamVinhNT/lexora/releases/download/v0.4.0/${name}`))));
    await first.service.start();
    await first.service.controller.runCheck();
    await first.handlers.get(UPDATE_CHANNELS.dismiss)!(TRUSTED, { version: '0.4.0' });
    first.service.dispose();

    const second = build();
    second.fetchFn.mockResolvedValue(new Response(JSON.stringify(releaseJson('0.4.0', (name) => `https://github.com/iamVinhNT/lexora/releases/download/v0.4.0/${name}`))));
    await second.service.start();
    await second.service.controller.runCheck();
    expect(second.service.controller.getState().available).toBe(false);
    second.service.dispose();
  });

  it('uses the development version override only when the app is not packaged', async () => {
    const dev = build({ app: { getVersion: () => '44.3.0', getPath: () => userData, isPackaged: false }, env: { LEXORA_UPDATE_DEV_VERSION: '0.3.0' } });
    expect(await dev.handlers.get(UPDATE_CHANNELS.getState)!(TRUSTED)).toMatchObject({ currentVersion: '0.3.0' });
    const packaged = build({ app: { getVersion: () => '0.3.0', getPath: () => userData, isPackaged: true }, env: { LEXORA_UPDATE_DEV_VERSION: '0.0.1' } });
    expect(await packaged.handlers.get(UPDATE_CHANNELS.getState)!(TRUSTED)).toMatchObject({ currentVersion: '0.3.0' });
  });

  it('refuses a development version that is not X.Y.Z', () => {
    expect(() => build({ app: { getVersion: () => '44.3.0', getPath: () => userData, isPackaged: false }, env: { LEXORA_UPDATE_DEV_VERSION: 'dev' } })).toThrow(/X\.Y\.Z/);
  });

  it('refuses a development origin that is not loopback', () => {
    expect(() => build({ app: { getVersion: () => '0.3.0', getPath: () => userData, isPackaged: false }, env: { LEXORA_UPDATE_DEV_ORIGIN: 'https://example.com' } })).toThrow(/loopback/i);
  });
});
