/**
 * @file grammar.routes.ts
 * @description Published grammar course reads and isolated learner submissions.
 */
import type { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { getDb, type AppDatabase } from '../db/client.js';
import { getGrammarCurriculum } from '../grammar/content/manifest.js';
import type { GrammarCurriculum } from '../grammar/content/types.js';
import { GrammarLessonUnavailableError, GrammarCurriculumChangedConflictError } from '../grammar/course-read-model.js';
import { GrammarRepository, GrammarRepositoryConflictError } from '../repositories/grammar.repository.js';
import { grammarLessonParamsSchema, submitGrammarAnswerSchema } from '../schemas/grammar.schema.js';
import {
  GrammarService,
  GrammarServiceConflictError,
  GrammarServiceInvalidAnswerError,
  GrammarServiceInvalidContentError,
} from '../services/grammar.service.js';
import { registerApiErrorHandler } from './vocabulary.routes.js';

export interface GrammarRouteOptions {
  db?: AppDatabase;
  service?: GrammarService;
  /** @internal Injected curriculum for isolated route tests. */
  curriculum?: GrammarCurriculum;
}

interface GrammarApiError {
  status: number;
  code: string;
  message: string;
  reason?: 'CURRICULUM_CHANGED';
}

function mapGrammarError(error: unknown): GrammarApiError | undefined {
  if (error instanceof GrammarCurriculumChangedConflictError) {
    return { status: 409, code: 'CONFLICT', message: error.message, reason: error.reason };
  }
  if (error instanceof GrammarLessonUnavailableError) {
    return { status: 404, code: 'NOT_FOUND', message: 'Grammar lesson not found.' };
  }
  if (error instanceof GrammarServiceInvalidAnswerError) {
    return { status: 400, code: 'BAD_REQUEST', message: error.message };
  }
  if (error instanceof GrammarServiceConflictError || error instanceof GrammarRepositoryConflictError) {
    return { status: 409, code: 'CONFLICT', message: error.message };
  }
  if (error instanceof GrammarServiceInvalidContentError) {
    return { status: 500, code: 'INTERNAL_ERROR', message: 'Internal server error' };
  }
  return undefined;
}

function sendGrammarError(error: unknown, reply: FastifyReply) {
  const mapped = mapGrammarError(error);
  if (!mapped) throw error;
  return reply.status(mapped.status).send({ success: false, error: { code: mapped.code, message: mapped.message, ...(mapped.reason ? { details: { reason: mapped.reason } } : {}) } });
}

export const grammarRoutes: FastifyPluginAsync<GrammarRouteOptions> = async (fastify, opts) => {
  const db = opts.db ?? fastify.db ?? getDb();
  const curriculum = opts.curriculum ?? getGrammarCurriculum();
  const repository = new GrammarRepository(db.sqlite);
  const service = opts.service ?? new GrammarService(curriculum, repository);
  let base = '/api/grammar';
  if (fastify.prefix === '/api' || fastify.prefix?.endsWith('/api')) base = '/grammar';
  if (fastify.prefix === '/api/grammar' || fastify.prefix?.endsWith('/api/grammar')) base = '';
  registerApiErrorHandler(fastify);

  // Course progress and next-lesson selection live in GrammarService for reuse.

  fastify.get(base || '/', async (_request, reply) => {
    try {
      return reply.send({ success: true, data: service.getCourseWithProgress() });
    } catch (error) {
      return sendGrammarError(error, reply);
    }
  });

  fastify.get(`${base}/:lessonId`, async (request, reply) => {
    const { lessonId } = grammarLessonParamsSchema.parse(request.params);
    try {
      return reply.send({ success: true, data: service.getLessonWithProgress(lessonId) });
    } catch (error) {
      return sendGrammarError(error, reply);
    }
  });

  fastify.post(`${base}/:lessonId/answers`, async (request, reply) => {
    const { lessonId } = grammarLessonParamsSchema.parse(request.params);
    const input = submitGrammarAnswerSchema.parse(request.body);
    try {
      const result = service.submitAnswer(lessonId, input);
      const course = service.getCourseWithProgress();
      return reply.send({
        success: true,
        data: {
          attempt: result.attempt,
          progress: result.progress,
          firstAttemptAccuracy: result.firstAttemptAccuracy,
          nextLessonId: course.nextLessonId,
        },
      });
    } catch (error) {
      return sendGrammarError(error, reply);
    }
  });

};
