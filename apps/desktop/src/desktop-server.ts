/**
 * @file desktop-server.ts
 * @description Starts the embedded Fastify API and compiled SPA on a loopback origin.
 */
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

import { buildApp } from '@lexora/backend/app';

export interface DesktopServerHandle {
  app: Awaited<ReturnType<typeof buildApp>>;
  origin: string;
  close: () => Promise<void>;
}

const SPA_CONTENT_SECURITY_POLICY = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'";

export async function startDesktopServer(options: {
  databasePath: string;
  rendererRoot: string;
  logger?: boolean;
}): Promise<DesktopServerHandle> {
  mkdirSync(dirname(options.databasePath), { recursive: true });
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
