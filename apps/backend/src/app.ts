/**
 * @file app.ts
 * @description Composes the Lexora Fastify application and all backend route plugins.
 */

import Fastify, { type FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { createTables, getDb, type AppDatabase } from './db/client.js';
import { vocabularyRoutes } from './routes/vocabulary.routes.js';
import { contextRoutes } from './routes/context.routes.js';
import { sessionRoutes } from './routes/session.routes.js';
import { reviewRoutes } from './routes/review.routes.js';
import { analyticsRoutes } from './routes/analytics.routes.js';
import { dataRoutes } from './routes/data.routes.js';
import { registerApiErrorHandler } from './routes/vocabulary.routes.js';

declare module 'fastify' {
  interface FastifyInstance {
    db: AppDatabase;
  }
}

export interface BuildAppOptions {
  dbPath?: string;
  logger?: boolean;
  corsOrigins?: string;
}

const DEFAULT_CORS_ORIGINS = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]);

function getCorsOrigins(value: string | undefined): Set<string> {
  if (value === undefined) return DEFAULT_CORS_ORIGINS;
  return new Set(value.split(',').map((origin) => origin.trim()).filter(Boolean));
}

export async function buildApp(options: BuildAppOptions = {}): Promise<FastifyInstance> {
  const app = Fastify({ logger: options.logger ?? true });
  const db = getDb(options.dbPath ?? ':memory:');
  createTables(db.sqlite);
  app.decorate('db', db);

  const allowedOrigins = getCorsOrigins(options.corsOrigins ?? process.env.CORS_ORIGINS);
  await app.register(cors, {
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }
      callback(null, allowedOrigins.has(origin) ? origin : false);
    },
  });

  registerApiErrorHandler(app);

  app.get('/api/health', async () => ({
    success: true,
    data: { status: 'ok', app: 'Lexora API' },
  }));

  await app.register(vocabularyRoutes, { db });
  await app.register(contextRoutes, { db });
  await app.register(sessionRoutes, { db });
  await app.register(reviewRoutes, { db });
  await app.register(analyticsRoutes, { db });
  await app.register(dataRoutes, { db });

  app.setNotFoundHandler((_request, reply) => reply.status(404).send({
    success: false,
    error: { code: 'NOT_FOUND', message: 'Route not found' },
  }));
  app.addHook('onClose', async () => {
    if (db.sqlite.open) db.sqlite.close();
  });

  return app;
}
