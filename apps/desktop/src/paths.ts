/**
 * @file paths.ts
 * @description Resolves mutable desktop data, log, and packaged renderer paths.
 */
import { join, resolve } from 'node:path';
import { sharedDatabasePath } from '@lexora/backend/shared-database';

export interface DesktopPaths {
  databasePath: string;
  logPath: string;
  rendererRoot: string;
}

export interface ResolveDesktopPathsOptions {
  databasePath?: string;
  home?: string;
  env?: NodeJS.ProcessEnv;
}

export function resolveDesktopPaths(
  userDataPath: string,
  resourcesPath: string,
  options?: ResolveDesktopPathsOptions | string
): DesktopPaths {
  const opts = typeof options === 'string' ? { home: options } : (options ?? {});
  const env = opts.env ?? process.env;
  const databasePath = opts.databasePath ?? env.DATABASE_PATH ?? sharedDatabasePath(opts.home);

  return {
    databasePath,
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
