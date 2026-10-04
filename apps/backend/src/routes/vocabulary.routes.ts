import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { ZodError } from 'zod';
import { getDb, type AppDatabase } from '../db/client.js';
import { VocabularyRepository } from '../repositories/vocabulary.repository.js';
import {
  VocabularyService,
} from '../services/vocabulary.service.js';
import {
  createWordSchema,
  updateWordSchema,
  queryWordsSchema,
} from '../schemas/vocabulary.schema.js';

export interface VocabularyRouteOptions {
  db?: AppDatabase;
  service?: VocabularyService;
}

interface ErrorWithStatus extends Error {
  statusCode?: number;
  code?: string;
  details?: Record<string, unknown>;
}

export interface ApiErrorHandlerOptions {
  mapDatabaseErrors?: boolean;
}

function isAppError(error: unknown): error is ErrorWithStatus & { statusCode: number; code: string } {
  if (!(error instanceof Error)) return false;
  const typed = error as ErrorWithStatus;
  return Number.isInteger(typed.statusCode) && typed.statusCode! >= 400
    && (typed.statusCode! < 500 || typed.statusCode === 503) && typeof typed.code === 'string';
}

function isClientDatabaseConstraintError(error: ErrorWithStatus): boolean {
  return (
    error.code === 'SQLITE_CONSTRAINT_FOREIGNKEY' ||
    error.code === 'SQLITE_CONSTRAINT_UNIQUE' ||
    error.code === 'SQLITE_CONSTRAINT_NOTNULL' ||
    error.code === 'SQLITE_CONSTRAINT_CHECK' ||
    /(?:FOREIGN KEY|UNIQUE|NOT NULL|CHECK) constraint failed/i.test(error.message)
  );
}

export function registerApiErrorHandler(
  fastify: FastifyInstance,
  options: ApiErrorHandlerOptions = { mapDatabaseErrors: true }
): void {
  fastify.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: error.errors.map((issue) => issue.message).join(', '),
          details: error.errors,
        },
      });
    }

    if (isAppError(error)) {
      return reply.status(error.statusCode).send({
        success: false,
        error: { code: error.code, message: error.message, ...(error.details === undefined ? {} : { details: error.details }) },
      });
    }

    const typedError = error as ErrorWithStatus;
    if (options.mapDatabaseErrors && isClientDatabaseConstraintError(typedError)) {
      request.log.error({ err: error }, 'SQLite data request failed');
      return reply.status(400).send({
        success: false,
        error: { code: 'BAD_REQUEST', message: 'Invalid data request' },
      });
    }

    request.log.error(error);
    const statusCode = typedError.statusCode && typedError.statusCode >= 400 ? typedError.statusCode : 500;
    return reply.status(statusCode).send({
      success: false,
      error: {
        code: statusCode === 400 ? 'BAD_REQUEST' : 'INTERNAL_ERROR',
        message: statusCode === 400 ? 'Bad request' : 'Internal server error',
      },
    });
  });
}

export const vocabularyRoutes: FastifyPluginAsync<VocabularyRouteOptions> = async (
  fastify,
  opts
) => {
  const db = opts.db ?? (fastify as any).db ?? getDb();
  const service = opts.service ?? new VocabularyService(new VocabularyRepository(db));

  // Determine base route path based on fastify.prefix
  let basePath = '/api/words';
  if (fastify.prefix) {
    if (fastify.prefix === '/api/words' || fastify.prefix.endsWith('/api/words')) {
      basePath = '';
    } else if (fastify.prefix === '/api' || fastify.prefix.endsWith('/api')) {
      basePath = '/words';
    }
  }

  const wordPath = basePath || '/';
  const wordIdPath = `${basePath}/:id`;

  registerApiErrorHandler(fastify);

  // POST /api/words
  fastify.post(wordPath, async (request, reply) => {
    const validated = createWordSchema.parse(request.body);
    const result = service.createWord(validated);
    return reply.status(201).send({
      success: true,
      data: result,
    });
  });

  // GET /api/words
  fastify.get(wordPath, async (request, reply) => {
    const query = queryWordsSchema.parse(request.query);
    const result = service.listWords(query);
    return reply.status(200).send({
      success: true,
      data: result,
    });
  });

  // GET /api/words/:id
  fastify.get(wordIdPath, async (request, reply) => {
    const { id } = request.params as { id: string };
    const result = service.getWordById(id);
    return reply.status(200).send({
      success: true,
      data: result,
    });
  });

  // PATCH /api/words/:id
  fastify.patch(wordIdPath, async (request, reply) => {
    const { id } = request.params as { id: string };
    const validated = updateWordSchema.parse(request.body);
    const result = service.updateWord(id, validated);
    return reply.status(200).send({
      success: true,
      data: result,
    });
  });

  // DELETE /api/words/:id
  fastify.delete(wordIdPath, async (request, reply) => {
    const { id } = request.params as { id: string };
    service.deleteWord(id);
    return reply.status(200).send({
      success: true,
      data: { id, deleted: true },
    });
  });
};
