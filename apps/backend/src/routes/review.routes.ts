/**
 * @file review.routes.ts
 * @description Fastify route plugin for spaced repetition reviews, due queue, and history endpoints.
 */

import type { FastifyPluginAsync } from 'fastify';
import { getDb, type AppDatabase } from '../db/client.js';
import { registerApiErrorHandler } from './vocabulary.routes.js';
import { ReviewRepository } from '../repositories/review.repository.js';
import {
  ReviewService,
} from '../services/review.service.js';
import {
  submitReviewSchema,
  queryDueReviewsSchema,
  queryReviewHistorySchema,
} from '../schemas/review.schema.js';

export interface ReviewRouteOptions {
  db?: AppDatabase;
  service?: ReviewService;
}

export const reviewRoutes: FastifyPluginAsync<ReviewRouteOptions> = async (
  fastify,
  opts
) => {
  const db = opts.db ?? (fastify as any).db ?? getDb();
  const service = opts.service ?? new ReviewService(new ReviewRepository(db));

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

  // POST /api/reviews
  fastify.post(reviewsRootPath, async (request, reply) => {
    const validated = submitReviewSchema.parse(request.body);
    const result = service.submitReview(validated);
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
};
