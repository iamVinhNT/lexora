/**
 * @file review.routes.ts
 * @description Fastify route plugin for adaptive active review attempts, due queue, and history endpoints.
 */

import type { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { getDb, type AppDatabase } from '../db/client.js';
import { registerApiErrorHandler } from './vocabulary.routes.js';
import { allowsLocalAiRequest } from './ai-local-boundary.js';
import { ReviewRepository } from '../repositories/review.repository.js';
import { ReviewAttemptRepository } from '../repositories/review-attempt.repository.js';
import { ReviewService } from '../services/review.service.js';
import { ReviewAttemptService } from '../services/review-attempt.service.js';
import type { OutputGrader } from '../domain/learning/ai-output-grader.js';
import type { AiSettingsService } from '../services/ai-settings.service.js';
import type { AiConfigResolver } from '../services/ai-client.js';
import {
  submitReviewSchema,
  queryDueReviewsSchema,
  queryReviewHistorySchema,
} from '../schemas/review.schema.js';
import {
  startReviewAttemptSchema,
  stepReviewAttemptSchema,
  abandonReviewAttemptSchema,
} from '../schemas/review-attempt.schema.js';

export interface ReviewRouteOptions {
  db?: AppDatabase;
  service?: ReviewService;
  attemptService?: ReviewAttemptService;
  outputGrader?: OutputGrader;
  aiSettings?: AiSettingsService;
  getConfig?: AiConfigResolver;
  env?: NodeJS.ProcessEnv;
}

const paramsWithIdSchema = z.object({
  id: z.string().trim().min(1),
}).strict();

export const reviewRoutes: FastifyPluginAsync<ReviewRouteOptions> = async (
  fastify,
  opts
) => {
  const fastifyWithDb = 'db' in fastify && fastify.db ? (fastify.db as AppDatabase) : undefined;
  const db = opts.db ?? fastifyWithDb ?? getDb();
  const service = opts.service ?? new ReviewService(new ReviewRepository(db));
  const attemptRepo = new ReviewAttemptRepository(db);
  const attemptService =
    opts.attemptService ??
    new ReviewAttemptService(db, attemptRepo, {
      outputGrader: opts.outputGrader,
      aiSettings: opts.aiSettings,
      getConfig: opts.getConfig,
      env: opts.env,
    });

  // Determine base route path based on fastify.prefix
  let basePath = '/api/reviews';
  if (fastify.prefix) {
    if (fastify.prefix === '/api/reviews' || fastify.prefix.endsWith('/api/reviews')) {
      basePath = '';
    } else if (fastify.prefix === '/api' || fastify.prefix.endsWith('/api')) {
      basePath = '/reviews';
    }
  }

  const reviewsRootPath = basePath || '/';
  const duePath = `${basePath}/due`;
  const historyPath = `${basePath}/history`;
  const attemptPath = `${basePath}/attempt`;
  const attemptStepPath = `${basePath}/attempt/:id/step`;
  const attemptAbandonPath = `${basePath}/attempt/:id/abandon`;

  registerApiErrorHandler(fastify);

  // GET /api/reviews/due
  fastify.get(duePath, async (request, reply) => {
    const query = queryDueReviewsSchema.parse(request.query);
    const result = service.getDueReviews(query);
    return reply.status(200).send({
      success: true,
      data: result,
    });
  });

  // GET /api/reviews/history
  fastify.get(historyPath, async (request, reply) => {
    const query = queryReviewHistorySchema.parse(request.query);
    const result = service.getHistory(query);
    return reply.status(200).send({
      success: true,
      data: result,
    });
  });

  // GET /api/reviews/attempt
  fastify.get(attemptPath, async (_request, reply) => {
    const result = attemptService.getActiveAttempt();
    return reply.status(200).send({
      success: true,
      data: result,
    });
  });

  // POST /api/reviews/attempt
  fastify.post(attemptPath, async (request, reply) => {
    const validated = startReviewAttemptSchema.parse(request.body);
    const result = attemptService.startAttempt(validated);
    return reply.status(200).send({
      success: true,
      data: result,
    });
  });

  // POST /api/reviews/attempt/:id/step
  fastify.post(attemptStepPath, async (request, reply) => {
    const params = paramsWithIdSchema.parse(request.params);
    const validated = stepReviewAttemptSchema.parse(request.body);

    if (validated.action === 'OUTPUT' && validated.method === 'AI') {
      if (!allowsLocalAiRequest(request)) {
        return reply.status(403).send({
          success: false,
          error: { code: 'FORBIDDEN', message: 'Local AI request required.' },
        });
      }
    }

    const result = await attemptService.stepAttempt(params.id, validated);
    return reply.status(200).send({
      success: true,
      data: result,
    });
  });

  // POST /api/reviews/attempt/:id/abandon
  fastify.post(attemptAbandonPath, async (request, reply) => {
    const params = paramsWithIdSchema.parse(request.params);
    const validated = abandonReviewAttemptSchema.parse(request.body);
    const result = attemptService.abandonAttempt(params.id, validated);
    return reply.status(200).send({
      success: true,
      data: result,
    });
  });

  // POST /api/reviews (clean cutover completion)
  fastify.post(reviewsRootPath, async (request, reply) => {
    const validated = submitReviewSchema.parse(request.body);
    const result = attemptService.completeAttempt(validated);
    return reply.status(200).send({
      success: true,
      data: result,
    });
  });
};
