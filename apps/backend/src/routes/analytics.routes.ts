/**
 * @file analytics.routes.ts
 * @description Fastify route plugin for vocabulary progress, weak words, mastered words, and statistics analytics endpoints.
 */

import type { FastifyPluginAsync } from 'fastify';
import { getDb, type AppDatabase } from '../db/client.js';
import { registerApiErrorHandler } from './vocabulary.routes.js';
import { AnalyticsRepository } from '../repositories/analytics.repository.js';
import { AnalyticsService } from '../services/analytics.service.js';
import {
  queryTrendsSchema,
  queryWeakWordsSchema,
  queryMasteredWordsSchema,
} from '../schemas/analytics.schema.js';

type SuccessResponse<T> = { success: true; data: T };
type ProgressOverviewReply = SuccessResponse<ReturnType<AnalyticsService['getProgressOverview']>>;
type WeakWordsReply = SuccessResponse<ReturnType<AnalyticsService['getWeakWords']>>;
type MasteredWordsReply = SuccessResponse<ReturnType<AnalyticsService['getMasteredWords']>>;
type WordProgressReply = SuccessResponse<ReturnType<AnalyticsService['getWordProgress']>>;
type DashboardStatisticsReply = SuccessResponse<ReturnType<AnalyticsService['getDashboardStatistics']>>;
type ReviewTrendsReply = SuccessResponse<ReturnType<AnalyticsService['getReviewTrends']>>;
type InsightsReply = SuccessResponse<ReturnType<AnalyticsService['getInsights']>>;

interface RawPaginationQuery {
  page?: string;
  limit?: string;
}

interface RawReviewTrendsQuery {
  days?: string;
}

export interface AnalyticsRouteOptions {
  db?: AppDatabase;
  service?: AnalyticsService;
}

export const analyticsRoutes: FastifyPluginAsync<AnalyticsRouteOptions> = async (
  fastify,
  opts
) => {
  const db = opts.db ?? fastify.db ?? getDb();
  const service = opts.service ?? new AnalyticsService(new AnalyticsRepository(db));

  let apiPrefix = '/api';
  if (fastify.prefix) {
    if (fastify.prefix === '/api' || fastify.prefix.endsWith('/api')) {
      apiPrefix = '';
    }
  }

  registerApiErrorHandler(fastify);

  // GET /api/progress
  fastify.get<{ Reply: ProgressOverviewReply }>(`${apiPrefix}/progress`, async () => {
    const data = service.getProgressOverview();
    return { success: true, data };
  });

  // GET /api/progress/weak
  fastify.get<{ Querystring: RawPaginationQuery; Reply: WeakWordsReply }>(`${apiPrefix}/progress/weak`, async (request) => {
    const query = queryWeakWordsSchema.parse(request.query);
    const data = service.getWeakWords(query);
    return { success: true, data };
  });

  // GET /api/progress/mastered
  fastify.get<{ Querystring: RawPaginationQuery; Reply: MasteredWordsReply }>(`${apiPrefix}/progress/mastered`, async (request) => {
    const query = queryMasteredWordsSchema.parse(request.query);
    const data = service.getMasteredWords(query);
    return { success: true, data };
  });

  // GET /api/progress/:wordId
  fastify.get<{ Params: { wordId: string }; Reply: WordProgressReply }>(`${apiPrefix}/progress/:wordId`, async (request) => {
    const { wordId } = request.params;
    const data = service.getWordProgress(wordId);
    return { success: true, data };
  });

  // GET /api/statistics/dashboard
  fastify.get<{ Reply: DashboardStatisticsReply }>(`${apiPrefix}/statistics/dashboard`, async () => {
    const data = service.getDashboardStatistics();
    return { success: true, data };
  });

  // GET /api/statistics/trends
  fastify.get<{ Querystring: RawReviewTrendsQuery; Reply: ReviewTrendsReply }>(`${apiPrefix}/statistics/trends`, async (request) => {
    const query = queryTrendsSchema.parse(request.query);
    const data = service.getReviewTrends(query);
    return { success: true, data };
  });

  // GET /api/statistics/insights
  fastify.get<{ Reply: InsightsReply }>(`${apiPrefix}/statistics/insights`, async () => {
    const data = service.getInsights();
    return { success: true, data };
  });
};
