/**
 * @file update-handlers.ts
 * @description Registers narrow, sender-validated IPC handlers for desktop update state and downloads.
 */
import { UPDATE_CHANNELS, type RevealDownloadResult, type UpdateState } from './contracts.js';
import { isTrustedSender } from './ipc-security.js';

interface IpcRegistrar {
  handle(channel: string, handler: (event: unknown, request?: unknown) => Promise<unknown>): void;
}

export interface UpdateHandlerController {
  getState(): UpdateState;
  startDownload(): UpdateState;
  cancelDownload(): UpdateState;
  revealDownload(): RevealDownloadResult;
  dismiss(version: string): Promise<UpdateState>;
}

export interface RegisterUpdateHandlersOptions {
  ipcMain: IpcRegistrar;
  allowedOrigin: string;
  controller: UpdateHandlerController;
}

function parseDismissRequest(request: unknown): string {
  if (request === null || typeof request !== 'object' || Array.isArray(request)) throw new Error('Invalid update request.');
  const keys = Object.keys(request);
  const { version } = request as { version?: unknown };
  if (keys.length !== 1 || keys[0] !== 'version' || typeof version !== 'string') throw new Error('Invalid update request.');
  return version;
}

export function registerUpdateHandlers({ ipcMain, allowedOrigin, controller }: RegisterUpdateHandlersOptions): void {
  const guarded = (handler: (request: unknown) => unknown) => async (event: unknown, request?: unknown) => {
    if (!isTrustedSender(event, allowedOrigin)) throw new Error('Update operation is not allowed from this page.');
    return handler(request);
  };

  ipcMain.handle(UPDATE_CHANNELS.getState, guarded(() => controller.getState()));
  ipcMain.handle(UPDATE_CHANNELS.download, guarded(() => controller.startDownload()));
  ipcMain.handle(UPDATE_CHANNELS.cancelDownload, guarded(() => controller.cancelDownload()));
  ipcMain.handle(UPDATE_CHANNELS.revealDownload, guarded(() => controller.revealDownload()));
  ipcMain.handle(UPDATE_CHANNELS.dismiss, guarded((request) => controller.dismiss(parseDismissRequest(request))));
}
