/**
 * @file contracts.ts
 * @description Defines narrow desktop file-dialog IPC channels and payload contracts.
 */
export const FILE_DIALOG_CHANNELS = {
  open: 'lexora:file-dialog:open',
  save: 'lexora:file-dialog:save',
} as const;

export type OpenFileRequest = { kind: 'import' | 'backup' };
export type OpenFileResult = { canceled: true } | { canceled: false; name: string; content: string };
export type SaveFileRequest = {
  kind: 'export' | 'backup';
  suggestedName: string;
  content: string;
  format?: 'CSV' | 'JSON';
};
export type SaveFileResult = { canceled: boolean };

export const UPDATE_CHANNELS = {
  getState: 'lexora:update:get-state',
  download: 'lexora:update:download',
  cancelDownload: 'lexora:update:cancel-download',
  revealDownload: 'lexora:update:reveal-download',
  dismiss: 'lexora:update:dismiss',
  state: 'lexora:update:state',
} as const;

export type UpdateInstallKind = 'appimage' | 'deb' | 'unknown';
export type UpdateDownloadErrorCode = 'network' | 'verify' | 'disk' | 'no-asset';
export type UpdateDownloadState = {
  status: 'idle' | 'downloading' | 'done' | 'error';
  receivedBytes: number;
  savedTo?: string;
  error?: UpdateDownloadErrorCode;
};
export type UpdateState = {
  available: boolean;
  currentVersion: string;
  latestVersion?: string;
  publishedAt?: string;
  install: UpdateInstallKind;
  downloadDir: string;
  asset?: { name: string; sizeBytes: number };
  download: UpdateDownloadState;
};
export type DismissUpdateRequest = { version: string };
export type RevealDownloadResult = { shown: boolean };
