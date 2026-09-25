/**
 * @file desktop-server.ts
 * @description Starts the embedded Fastify API and compiled SPA on a loopback origin.
 */
import { accessSync, chmodSync, constants, mkdirSync, statSync } from 'node:fs';
import { dirname } from 'node:path';

import { buildApp } from '@lexora/backend/app';
import { prepareSharedDatabase } from '@lexora/backend/shared-database';

export interface DesktopServerHandle {
  app: Awaited<ReturnType<typeof buildApp>>;
  origin: string;
  close: () => Promise<void>;
}

const SPA_CONTENT_SECURITY_POLICY = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'";
const DATABASE_SIDECARS = ['', '-wal', '-shm'];

function prepareDatabaseStorage(databasePath: string): void {
  if (databasePath === ':memory:') return;
  const databaseDirectory = dirname(databasePath);

  try {
    mkdirSync(databaseDirectory, { recursive: true });
    const directoryMode = statSync(databaseDirectory).mode & 0o7777;
    if ((directoryMode & 0o300) !== 0o300) {
      chmodSync(databaseDirectory, directoryMode | 0o300);
    }
    accessSync(databaseDirectory, constants.W_OK | constants.X_OK);

    for (const suffix of DATABASE_SIDECARS) {
      const filePath = `${databasePath}${suffix}`;
      try {
        const mode = statSync(filePath).mode & 0o7777;
        if ((mode & 0o200) === 0) chmodSync(filePath, mode | 0o200);
        accessSync(filePath, constants.W_OK);
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') continue;
        throw error;
      }
    }
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new Error(`Desktop database storage is not writable (${databaseDirectory}): ${reason}`, { cause: error });
  }
}

export async function startDesktopServer(options: {
  databasePath: string;
  rendererRoot: string;
  logger?: boolean;
  prepareDatabase?: (databasePath: string) => Promise<void>;
}): Promise<DesktopServerHandle> {
  const prepare = options.prepareDatabase ?? prepareSharedDatabase;
  if (options.databasePath !== ':memory:') {
    await prepare(options.databasePath);
  }
  prepareDatabaseStorage(options.databasePath);
  const app = await buildApp({
    dbPath: options.databasePath,
    logger: options.logger ?? false,
    corsOrigins: '',
    spaRoot: options.rendererRoot,
    spaContentSecurityPolicy: SPA_CONTENT_SECURITY_POLICY,
  });

  try {
    await app.listen({ host: '127.0.0.1', port: 0 });
    const address = app.server.address();
    if (!address || typeof address === 'string') throw new Error('Desktop server did not expose a TCP address');

    return {
      app,
      origin: `http://127.0.0.1:${address.port}`,
      close: async () => app.close(),
    };
  } catch (error) {
    await app.close();
    throw error;
  }
}
