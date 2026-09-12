import type { FastifyPluginAsync } from 'fastify';
import { getDb, type AppDatabase } from '../db/client.js';
import { registerApiErrorHandler } from './vocabulary.routes.js';
import { ContextRepository } from '../repositories/context.repository.js';
import {
  ContextService,
} from '../services/context.service.js';
import {
  createContextSchema,
  updateContextSchema,
  queryContextsSchema,
  linkWordsSchema,
} from '../schemas/context.schema.js';

export interface ContextRouteOptions {
  db?: AppDatabase;
  service?: ContextService;
}

export const contextRoutes: FastifyPluginAsync<ContextRouteOptions> = async (
  fastify,
  opts
) => {
  const db = opts.db ?? (fastify as any).db ?? getDb();
  const service = opts.service ?? new ContextService(new ContextRepository(db));

  // Determine base route path based on fastify.prefix
  let basePath = '/api/contexts';
  if (fastify.prefix) {
    if (fastify.prefix === '/api/contexts' || fastify.prefix.endsWith('/api/contexts')) {
      basePath = '';
    } else if (fastify.prefix === '/api' || fastify.prefix.endsWith('/api')) {
      basePath = '/contexts';
    }
  }

  const contextPath = basePath || '/';
  const contextIdPath = `${basePath}/:id`;
  const contextWordsPath = `${basePath}/:id/words`;
  const contextWordIdPath = `${basePath}/:id/words/:wordId`;

  registerApiErrorHandler(fastify);

  // POST /api/contexts (201 Created)
  fastify.post(contextPath, async (request, reply) => {
    const validated = createContextSchema.parse(request.body);
    const result = service.createContext(validated);
    return reply.status(201).send({
      success: true,
      data: result,
    });
  });

  // GET /api/contexts (200 OK)
  fastify.get(contextPath, async (request, reply) => {
    const query = queryContextsSchema.parse(request.query);
    const result = service.listContexts(query);
    return reply.status(200).send({
      success: true,
      data: result,
    });
  });

  // GET /api/contexts/:id (200 OK or 404)
  fastify.get(contextIdPath, async (request, reply) => {
    const { id } = request.params as { id: string };
    const result = service.getContextById(id);
    return reply.status(200).send({
      success: true,
      data: result,
    });
  });

  // PATCH /api/contexts/:id (200 OK or 404)
  fastify.patch(contextIdPath, async (request, reply) => {
    const { id } = request.params as { id: string };
    const validated = updateContextSchema.parse(request.body);
    const result = service.updateContext(id, validated);
    return reply.status(200).send({
      success: true,
      data: result,
    });
  });

  // DELETE /api/contexts/:id (200 OK or 404)
  fastify.delete(contextIdPath, async (request, reply) => {
    const { id } = request.params as { id: string };
    service.deleteContext(id);
    return reply.status(200).send({
      success: true,
      data: { id, deleted: true },
    });
  });

  // POST /api/contexts/:id/words (200 OK)
  fastify.post(contextWordsPath, async (request, reply) => {
    const { id } = request.params as { id: string };
    const validated = linkWordsSchema.parse(request.body);
    const result = service.linkWords(id, validated.wordIds);
    return reply.status(200).send({
      success: true,
      data: result,
    });
  });

  // DELETE /api/contexts/:id/words/:wordId (200 OK)
  fastify.delete(contextWordIdPath, async (request, reply) => {
    const { id, wordId } = request.params as { id: string; wordId: string };
    service.unlinkWord(id, wordId);
    return reply.status(200).send({
      success: true,
      data: { contextId: id, wordId, unlinked: true },
    });
  });
};
