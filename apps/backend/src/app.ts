/**
 * @file app.ts
 * @description Composes the Lexora Fastify application and all backend route plugins.
 */

import Fastify, { type FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import staticPlugin from '@fastify/static';
import { createTables, getDb, type AppDatabase } from './db/client.js';
import { vocabularyRoutes } from './routes/vocabulary.routes.js';
import { contextRoutes } from './routes/context.routes.js';
import { sessionRoutes } from './routes/session.routes.js';
import { reviewRoutes } from './routes/review.routes.js';
import { analyticsRoutes } from './routes/analytics.routes.js';
import { dataRoutes } from './routes/data.routes.js';
import { grammarRoutes } from './routes/grammar.routes.js';
import { studyRoutes } from './routes/study.routes.js';
import { GrammarRepository } from './repositories/grammar.repository.js';
import { StudyRepository } from './repositories/study.repository.js';
import { AnalyticsRepository } from './repositories/analytics.repository.js';
import { StudyCalendarRepository } from './repositories/study-calendar.repository.js';
import { GrammarService } from './services/grammar.service.js';
import { StudyService } from './services/study.service.js';
import { AiStudyPlannerService, type AiStudyPlannerDependencies } from './services/ai-study-planner.service.js';
import { getGrammarCurriculum } from './grammar/content/manifest.js';
import { registerApiErrorHandler } from './routes/vocabulary.routes.js';
import type { OutputGrader } from './domain/learning/ai-output-grader.js';
import type { GrammarCurriculum } from './grammar/content/types.js';
import type { GrammarTutorProvider } from './services/grammar-tutor.service.js';

declare module 'fastify' {
  interface FastifyInstance {
    db: AppDatabase;
  }
}

export interface BuildAppOptions {
  dbPath?: string;
  logger?: boolean;
  corsOrigins?: string;
  spaRoot?: string;
  spaContentSecurityPolicy?: string;
  outputGrader?: OutputGrader;
  /** @internal Test seam for reviewed grammar route fixtures. */
  grammarCurriculum?: GrammarCurriculum;
  /** @internal Offline test provider; production uses configured OpenAI. */
  grammarTutorProvider?: GrammarTutorProvider;
  /** @internal Offline provider and environment fixture for AI planner route tests. */
  aiStudyPlanner?: AiStudyPlannerDependencies;
  /** @internal Test seam for failures after database acquisition. */
  afterDbAcquired?: (app: FastifyInstance, db: AppDatabase) => void | Promise<void>;
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

  try {
    createTables(db.sqlite);
    app.decorate('db', db);
    await options.afterDbAcquired?.(app, db);

    const allowedOrigins = getCorsOrigins(options.corsOrigins ?? process.env.CORS_ORIGINS);
    await app.register(cors, {
      methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'],
      origin: (origin, callback) => {
        if (!origin) {
          callback(null, true);
          return;
        }
        callback(null, allowedOrigins.has(origin) ? origin : false);
      },
    });

    const grammarCurriculum = options.grammarCurriculum ?? getGrammarCurriculum();
    const grammarService = new GrammarService(grammarCurriculum, new GrammarRepository(db.sqlite));
    const studyRepository = new StudyRepository(db);
    const calendarRepository = new StudyCalendarRepository(db);
    const studyService = new StudyService(studyRepository, calendarRepository, grammarService);
    const analyticsRepository = new AnalyticsRepository(db);
    const aiPlanner = new AiStudyPlannerService(studyRepository, calendarRepository, grammarService, analyticsRepository, options.aiStudyPlanner);
    app.get('/api/health', async () => ({
      success: true,
      data: { status: 'ok', app: 'Lexora API' },
    }));

    await app.register(vocabularyRoutes, { db });
    await app.register(contextRoutes, { db });
    await app.register(sessionRoutes, { db, outputGrader: options.outputGrader });
    await app.register(grammarRoutes, { db, curriculum: grammarCurriculum, service: grammarService, tutorProvider: options.grammarTutorProvider });
    await app.register(studyRoutes, { service: studyService, aiPlanner });
    await app.register(reviewRoutes, { db });
    await app.register(analyticsRoutes, { db });
    await app.register(dataRoutes, { db });

    if (options.spaRoot) {
      await app.register(staticPlugin, {
        root: options.spaRoot,
        wildcard: false,
        setHeaders: (reply) => {
          if (options.spaContentSecurityPolicy) {
            reply.header('Content-Security-Policy', options.spaContentSecurityPolicy);
          }
        },
      });
    }

    app.setNotFoundHandler((request, reply) => {
      const pathname = request.url.split('?', 1)[0];
      const isApiNamespace = pathname === '/api' || pathname.startsWith('/api/');
      if (options.spaRoot && request.method === 'GET' && !isApiNamespace) {
        return reply.type('text/html; charset=utf-8').sendFile('index.html');
      }
      return reply.status(404).send({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Route not found' },
      });
    });
    app.addHook('onClose', async () => {
      if (db.sqlite.open) db.sqlite.close();
    });

    return app;
  } catch (error) {
    if (db.sqlite.open) db.sqlite.close();
    throw error;
  }
}
