/**
 * @file session.routes.ts
 * @description Fastify routes for learning options, sessions, actions, completion, and abandonment.
 */
import type { FastifyPluginAsync } from 'fastify';
import { getDb, type AppDatabase } from '../db/client.js';
import { registerApiErrorHandler } from './vocabulary.routes.js';
import { SessionRepository } from '../repositories/session.repository.js';
import { SessionService } from '../services/session.service.js';
import { startSessionSchema, submitStepSchema } from '../schemas/session.schema.js';
import type { OutputGrader } from '../domain/learning/ai-output-grader.js';

export interface SessionRouteOptions { db?: AppDatabase; service?: SessionService; outputGrader?: OutputGrader; }
export const sessionRoutes: FastifyPluginAsync<SessionRouteOptions> = async (fastify, opts) => {
  const db = opts.db ?? (fastify as any).db ?? getDb();
  const service = opts.service ?? new SessionService(new SessionRepository(db), opts.outputGrader);
  let base = '/api/learning/session';
  if (fastify.prefix === '/api' || fastify.prefix?.endsWith('/api')) base = '/learning/session';
  if (fastify.prefix === '/api/learning/session' || fastify.prefix?.endsWith('/api/learning/session')) base = '';
  const sessionPath = base || '/';
  registerApiErrorHandler(fastify);
  const optionsPath = base === '/api/learning/session' ? '/api/learning/options' : '/learning/options';
  fastify.get(optionsPath, async (_request, reply) => reply.send({ success: true, data: service.getOptions() }));
  fastify.post(sessionPath, async (request, reply) => reply.status(201).send({ success: true, data: service.startSession(startSessionSchema.parse(request.body)) }));
  fastify.get(sessionPath, async (_request, reply) => {
    const active = service.findActiveSession();
    const sessions = service.getRecentSessions();
    return reply.send({ success: true, data: { activeSession: active, latestSession: sessions[0] ?? null, sessions } });
  });
  fastify.get(`${base}/:id`, async (request, reply) => reply.send({ success: true, data: service.getSessionById((request.params as { id: string }).id) }));
  fastify.post(`${base}/:id/step`, async (request, reply) => reply.send({ success: true, data: await service.submitStep((request.params as { id: string }).id, submitStepSchema.parse(request.body)) }));
  fastify.post(`${base}/:id/complete`, async (request, reply) => reply.send({ success: true, data: service.completeSession((request.params as { id: string }).id) }));
  fastify.post(`${base}/:id/abandon`, async (request, reply) => reply.send({ success: true, data: service.abandonSession((request.params as { id: string }).id) }));
};
