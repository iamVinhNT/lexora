/**
 * @file update-service.ts
 * @description Wires the update controller, state store, release source, and IPC handlers for the desktop app.
 */
import { join } from 'node:path';

import type { UpdateState } from './contracts.js';
import { checkForUpdate, detectInstallKind, GITHUB_SOURCE, loopbackSource } from './update-check.js';
import { createUpdateController, type UpdateController } from './update-controller.js';
import { downloadUpdate } from './update-download.js';
import { registerUpdateHandlers } from './update-handlers.js';
import { createUpdateStateStore } from './update-state.js';

export interface UpdateServiceOptions {
  ipcMain: { handle(channel: string, handler: (event: unknown, request?: unknown) => Promise<unknown>): void };
  allowedOrigin: string;
  sendState: (state: UpdateState) => void;
  logError: (message: string, error: unknown) => void;
  app: { getVersion(): string; getPath(name: 'userData' | 'downloads'): string; isPackaged: boolean };
  shell: { showItemInFolder(path: string): void };
  homeDir: string;
  execPath: string;
  env: Record<string, string | undefined>;
  fetch: typeof fetch;
}

export interface UpdateService {
  controller: UpdateController;
  start(): Promise<void>;
  dispose(): void;
}

export function createUpdateService(options: UpdateServiceOptions): UpdateService {
  const { app, env } = options;
  // Development overrides point at a local fake release server and never apply to a packaged app.
  const devOrigin = !app.isPackaged ? env.LEXORA_UPDATE_DEV_ORIGIN : undefined;
  const source = devOrigin ? loopbackSource(devOrigin) : GITHUB_SOURCE;
  const downloadsDir = !app.isPackaged && env.LEXORA_DOWNLOAD_DIR ? env.LEXORA_DOWNLOAD_DIR : app.getPath('downloads');
  // An unpackaged Electron run reports Electron's own version, so development may name the version to compare.
  const devVersion = !app.isPackaged ? env.LEXORA_UPDATE_DEV_VERSION : undefined;
  if (devVersion !== undefined && !/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(devVersion)) {
    throw new Error('LEXORA_UPDATE_DEV_VERSION must be an X.Y.Z version.');
  }
  const currentVersion = devVersion ?? app.getVersion();

  const controller = createUpdateController({
    currentVersion,
    install: detectInstallKind(env, options.execPath),
    source,
    store: createUpdateStateStore(join(app.getPath('userData'), 'update-state.json')),
    check: () => checkForUpdate({ currentVersion, fetch: options.fetch, source }),
    download: (downloadOptions) => downloadUpdate({ ...downloadOptions, fetch: options.fetch, source }),
    downloadsDir,
    homeDir: options.homeDir,
    showItemInFolder: (path) => options.shell.showItemInFolder(path),
    emit: options.sendState,
    logError: options.logError,
  });

  registerUpdateHandlers({ ipcMain: options.ipcMain, allowedOrigin: options.allowedOrigin, controller });

  return {
    controller,
    start: () => controller.start(),
    dispose: () => controller.dispose(),
  };
}
