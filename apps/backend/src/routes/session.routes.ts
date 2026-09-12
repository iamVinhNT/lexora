/**
 * @file session.routes.ts
 * @description Fastify route plugin for learning session lifecycle and step progression.
 */

import type { FastifyPluginAsync } from 'fastify';
import { getDb, type AppDatabase } from '../db/client.js';
import { registerApiErrorHandler } from './vocabulary.routes.js';
import { SessionRepository } from '../repositories/session.repository.js';
import {
  SessionService,
} from '../services/session.service.js';
import {
  startSessionSchema,
  submitStepSchema,
} from '../schemas/session.schema.js';

export interface SessionRouteOptions {
  db?: AppDatabase;
  service?: SessionService;
}

export const sessionRoutes: FastifyPluginAsync<SessionRouteOptions> = async (
  fastify,
  opts
) => {
  const db = opts.db ?? (fastify as any).db ?? getDb();
  const service = opts.service ?? new SessionService(new SessionRepository(db));

  // Determine base route path based on fastify.prefix
  let basePath = '/api/learning/session';
  if (fastify.prefix) {
    if (fastify.prefix === '/api/learning/session' || fastify.prefix.endsWith('/api/learning/session')) {
      basePath = '';
    } else if (fastify.prefix === '/api' || fastify.prefix.endsWith('/api')) {
      basePath = '/learning/session';
    }
  }

  const sessionPath = basePath || '/';
  const sessionIdPath = `${basePath}/:id`;
  const sessionStepPath = `${basePath}/:id/step`;
  const sessionCompletePath = `${basePath}/:id/complete`;

  registerApiErrorHandler(fastify);

  // POST /api/learning/session (201 Created)
  fastify.post(sessionPath, async (request, reply) => {
    const validated = startSessionSchema.parse(request.body);
    const result = service.startSession(validated);
    return reply.status(201).send({
      success: true,
      data: result,
    });
  });

  // GET /api/learning/session (200 OK - active or latest sessions)
  fastify.get(sessionPath, async (request, reply) => {
    const active = service.findActiveSession();
    const recent = service.getRecentSessions();
    const latest = recent[0] ?? null;

    return reply.status(200).send({
      success: true,
      data: {
        activeSession: active,
        latestSession: latest,
        sessions: recent,
        ...(active
          ? {
              id: active.id,
              totalWords: active.totalWords,
              items: active.items,
              sessionType: active.sessionType,
            }
          : {}),
      },
    });
  });

  // GET /api/learning/session/:id (200 OK or 404)
  fastify.get(sessionIdPath, async (request, reply) => {
    const { id } = request.params as { id: string };
    const result = service.getSessionById(id);
    return reply.status(200).send({
      success: true,
      data: result,
    });
  });

  // POST /api/learning/session/:id/step (200 OK or 400/404)
  fastify.post(sessionStepPath, async (request, reply) => {
    const { id } = request.params as { id: string };
    const validated = submitStepSchema.parse(request.body);
    const result = service.submitStep(id, validated);
    return reply.status(200).send({
      success: true,
      data: result,
    });
  });

  // POST /api/learning/session/:id/complete (200 OK or 400/404)
  fastify.post(sessionCompletePath, async (request, reply) => {
    const { id } = request.params as { id: string };
    const result = service.completeSession(id);
    return reply.status(200).send({
      success: true,
      data: result,
    });
  });
};
