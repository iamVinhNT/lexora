/**
 * @file desktop-updates.ts
 * @description Adapts the optional Electron update bridge while keeping the browser build free of update UI.
 */
export type DesktopUpdateDownload = {
  status: 'idle' | 'downloading' | 'done' | 'error';
  receivedBytes: number;
  savedTo?: string;
  error?: 'network' | 'verify' | 'disk' | 'no-asset';
};

export type DesktopUpdateState = {
  available: boolean;
  currentVersion: string;
  latestVersion?: string;
  publishedAt?: string;
  install: 'appimage' | 'deb' | 'unknown';
  downloadDir: string;
  asset?: { name: string; sizeBytes: number };
  download: DesktopUpdateDownload;
};

export type DesktopUpdatesApi = {
  getState: () => Promise<DesktopUpdateState>;
  download: () => Promise<DesktopUpdateState>;
  cancelDownload: () => Promise<DesktopUpdateState>;
  revealDownload: () => Promise<{ shown: boolean }>;
  dismiss: (version: string) => Promise<DesktopUpdateState>;
  onState: (listener: (state: DesktopUpdateState) => void) => () => void;
};

export function getDesktopUpdatesApi(): DesktopUpdatesApi | undefined {
  return window.lexoraDesktop?.updates;
}
