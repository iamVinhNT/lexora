/**
 * @file paths.ts
 * @description Resolves mutable desktop data, log, and packaged renderer paths.
 */
import { join, resolve } from 'node:path';

export interface DesktopPaths {
  databasePath: string;
  logPath: string;
  rendererRoot: string;
}

export function resolveDesktopPaths(userDataPath: string, resourcesPath: string): DesktopPaths {
  return {
    databasePath: join(userDataPath, 'data', 'lexora.db'),
    logPath: join(userDataPath, 'logs', 'desktop.log'),
    rendererRoot: join(resourcesPath, 'frontend'),
  };
}

export function resolveDevelopmentRendererRoot(desktopRoot: string): string {
  return resolve(desktopRoot, '../../frontend/dist');
}

export function resolveDesktopIconPath(desktopRoot: string, resourcesPath: string, isPackaged: boolean): string {
  return isPackaged
    ? join(resourcesPath, 'icon.png')
    : resolve(desktopRoot, '../build/icons/512x512.png');
}
