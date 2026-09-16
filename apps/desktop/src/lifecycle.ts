/**
 * @file lifecycle.ts
 * @description Provides idempotent shutdown and existing-window focus helpers.
 */
import type { BrowserWindow } from 'electron';

export function createShutdownController(closeResources: () => Promise<void>): () => Promise<void> {
  let shutdownPromise: Promise<void> | undefined;
  return () => {
    shutdownPromise ??= closeResources();
    return shutdownPromise;
  };
}

export function focusMainWindow(mainWindow: BrowserWindow | null): void {
  if (!mainWindow) return;
  if (mainWindow.isMinimized()) mainWindow.restore();
  mainWindow.show();
  mainWindow.focus();
}
