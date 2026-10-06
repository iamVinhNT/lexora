/**
 * @file grammar-practice.routes.ts
 * @description Fastify routes for grammar practice due items, reviews, self-assessed outputs, progress, and history.
 */
import type { FastifyPluginAsync, FastifyReply } from 'fastify';
import type { AppDatabase } from '../db/client.js';
import type { GrammarCurriculum } from '../grammar/content/types.js';
import {
  GrammarPracticeRepository,
  GrammarPracticeRepositoryConflictError,
} from '../repositories/grammar-practice.repository.js';
import { GrammarRepository } from '../repositories/grammar.repository.js';
import { GrammarPracticeService } from '../services/grammar-practice.service.js';
import { GrammarPracticeConflictError, GrammarPracticeInvalidAnswerError, GrammarPracticeInvalidContentError, GrammarPracticeInvalidExerciseError, GrammarPracticeInvalidPromptError } from '../services/grammar-practice.errors.js';
import { registerApiErrorHandler } from './vocabulary.routes.js';

export interface GrammarPracticeRouteOptions {
  db: AppDatabase;
  service?: GrammarPracticeService;
  repository?: GrammarPracticeRepository;
  coreRepository?: GrammarRepository;
  curriculum: GrammarCurriculum;
}

function sendGrammarPracticeError(error: unknown, reply: FastifyReply) {
  if (
    error instanceof GrammarPracticeConflictError
    || error instanceof GrammarPracticeRepositoryConflictError
  ) {
    return reply.status(409).send({
      success: false,
      error: { code: 'CONFLICT', message: error.message },
    });
  }
  if (
    error instanceof GrammarPracticeInvalidExerciseError
    || error instanceof GrammarPracticeInvalidAnswerError
    || error instanceof GrammarPracticeInvalidPromptError
  ) {
    return reply.status(400).send({
      success: false,
      error: { code: 'BAD_REQUEST', message: error.message },
    });
  }
  if (error instanceof GrammarPracticeInvalidContentError) {
    return reply.status(500).send({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Internal server error' },
    });
  }
  throw error;
}

export const grammarPracticeRoutes: FastifyPluginAsync<GrammarPracticeRouteOptions> = async (
  fastify,
  opts,
) => {
  let service = opts.service;
  if (!service) {
    const { db, curriculum } = opts;
    const repository = opts.repository ?? new GrammarPracticeRepository(db.sqlite);
    const coreRepository = opts.coreRepository ?? new GrammarRepository(db.sqlite);
    service = new GrammarPracticeService(curriculum, repository, coreRepository);
  }

  registerApiErrorHandler(fastify);

  let base = '/api/grammar-practice';
  if (fastify.prefix === '/api' || fastify.prefix?.endsWith('/api')) base = '/grammar-practice';
  if (fastify.prefix === '/api/grammar-practice' || fastify.prefix?.endsWith('/api/grammar-practice')) base = '';

  const duePath = base ? `${base}/due` : '/due';
  const reviewsPath = base ? `${base}/reviews` : '/reviews';
  const outputsPath = base ? `${base}/outputs` : '/outputs';
  const progressPath = base ? `${base}/progress` : '/progress';
  const historyPath = base ? `${base}/history` : '/history';

  fastify.get(duePath, async (_request, reply) => {
    try {
      return reply.send({ success: true, data: service.getDueItems() });
    } catch (error) {
      return sendGrammarPracticeError(error, reply);
    }
  });

  fastify.post(reviewsPath, async (request, reply) => {
    try {
      const result = service.submitReview(request.body);
      return reply.send({ success: true, data: result });
    } catch (error) {
      return sendGrammarPracticeError(error, reply);
    }
  });

  fastify.post(outputsPath, async (request, reply) => {
    try {
      const result = service.submitOutput(request.body);
      return reply.send({ success: true, data: result });
    } catch (error) {
      return sendGrammarPracticeError(error, reply);
    }
  });

  fastify.get(progressPath, async (_request, reply) => {
    try {
      return reply.send({ success: true, data: service.getProgress() });
    } catch (error) {
      return sendGrammarPracticeError(error, reply);
    }
  });

  fastify.get(historyPath, async (request, reply) => {
    try {
      return reply.send({ success: true, data: service.getHistory(request.query) });
    } catch (error) {
      return sendGrammarPracticeError(error, reply);
    }
  });
};
