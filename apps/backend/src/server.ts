/**
 * @file server.ts
 * @description Production entry point for the Lexora HTTP server.
 */

import type { FastifyInstance } from 'fastify';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildApp, type BuildAppOptions } from './app.js';
import { prepareSharedDatabase, sharedDatabasePath } from './db/shared-database.js';

export function parsePort(value: string | undefined): number {
  if (value === undefined) return 3001;
  const port = Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535');
  }
  return port;
}

export function parseDatabasePath(value: string | undefined, home?: string): string {
  if (value === undefined) return sharedDatabasePath(home);
  if (value.trim() === '' || value.includes('\u0000')) {
    throw new Error('DATABASE_PATH must be a non-empty path or :memory:');
  }
  return value;
}

export interface StartServerOptions {
  env?: NodeJS.ProcessEnv;
  host?: string;
  logger?: boolean;
  signalEmitter?: SignalEmitter;
  appFactory?: (options: BuildAppOptions) => Promise<FastifyInstance>;
  prepareDatabase?: (databasePath: string) => Promise<void>;
}

export interface SignalEmitter {
  once(event: 'SIGINT' | 'SIGTERM', listener: () => void): unknown;
  removeListener(event: 'SIGINT' | 'SIGTERM', listener: () => void): unknown;
}

export async function startServer(options: StartServerOptions = {}): Promise<FastifyInstance> {
  const env = options.env ?? process.env;
  const port = parsePort(env.PORT);
  const databasePath = parseDatabasePath(env.DATABASE_PATH);
  if (databasePath !== ':memory:') {
    const prepare = options.prepareDatabase ?? prepareSharedDatabase;
    await prepare(databasePath);
    mkdirSync(dirname(databasePath), { recursive: true });
  }
  const app = await (options.appFactory ?? buildApp)({
    dbPath: databasePath,
    logger: options.logger ?? true,
    corsOrigins: env.CORS_ORIGINS,
  });
  const signalEmitter = options.signalEmitter ?? process;

  let signalHandlersRemoved = false;
  const removeSignalHandlers = () => {
    if (signalHandlersRemoved) return;
    signalHandlersRemoved = true;
    signalEmitter.removeListener('SIGINT', handleSigint);
    signalEmitter.removeListener('SIGTERM', handleSigterm);
  };

  const shutdown = async (signal: string) => {
    app.log.info({ signal }, 'Shutting down Lexora API');
    try {
      await app.close();
    } catch (error) {
      app.log.error({ err: error, signal }, 'Failed to shut down Lexora API cleanly');
    } finally {
      removeSignalHandlers();
    }
  };

  let shutdownPromise: Promise<void> | undefined;
  const handleSignal = (signal: string) => {
    shutdownPromise ??= shutdown(signal);
    void shutdownPromise;
  };
  const handleSigint = () => handleSignal('SIGINT');
  const handleSigterm = () => handleSignal('SIGTERM');

  app.addHook('onClose', async () => {
    removeSignalHandlers();
  });

  signalEmitter.once('SIGINT', handleSigint);
  signalEmitter.once('SIGTERM', handleSigterm);

  try {
    const address = await app.listen({ host: options.host ?? '127.0.0.1', port });
    app.log.info({ address }, 'Lexora API listening');
    return app;
  } catch (error) {
    removeSignalHandlers();
    try {
      await app.close();
    } catch (closeError) {
      app.log.error({ err: closeError }, 'Failed to close Lexora API after listen failure');
    }
    throw error;
  }
}

const isMainModule = process.argv[1]
  ? fileURLToPath(import.meta.url) === resolve(process.argv[1])
  : false;

if (isMainModule) {
  startServer().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
