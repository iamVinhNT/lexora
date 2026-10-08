/**
 * @file ai.routes.ts
 * @description Fastify route plugin for the cross-application AI assistant chat endpoint.
 */
import type { FastifyPluginAsync } from 'fastify';
import { aiAssistantChatRequestSchema } from '../schemas/ai-assistant.schema.js';
import { AiAssistantService, type AiAssistantDependencies } from '../services/ai-assistant.service.js';
import { registerApiErrorHandler } from './vocabulary.routes.js';
import { allowsLocalAiRequest } from './ai-local-boundary.js';
import { saveAiSettingsSchema, deleteAiSettingsSchema } from '../schemas/ai-settings.schema.js';
import type { AiSettingsService } from '../services/ai-settings.service.js';

export interface AiRouteOptions {
  settings: AiSettingsService;
  service?: AiAssistantService;
  aiAssistant?: AiAssistantDependencies;
}

const ASSISTANT_CALLS_PER_HOUR = 20;
const ASSISTANT_WINDOW_MS = 60 * 60 * 1000;


export const aiRoutes: FastifyPluginAsync<AiRouteOptions> = async (fastify, opts) => {
  const service = opts.service ?? new AiAssistantService({ aiAssistant: opts.aiAssistant });
  let windowStart = Date.now();
  let calls = 0;

  let basePath = '/api/ai';
  if (fastify.prefix) {
    if (fastify.prefix === '/api/ai' || fastify.prefix.endsWith('/api/ai')) {
      basePath = '';
    } else if (fastify.prefix === '/api' || fastify.prefix.endsWith('/api')) {
      basePath = '/ai';
    }
  }

  registerApiErrorHandler(fastify);
  fastify.addHook('onRequest', async (request, reply) => {
    if (!allowsLocalAiRequest(request)) return reply.status(403).send({
      success: false, error: { code: 'FORBIDDEN', message: 'Local AI request required.' },
    });
  });

  fastify.get(`${basePath}/settings`, async (_request, reply) => reply.send({ success: true, data: await opts.settings.getMetadata() }));
  fastify.put(`${basePath}/settings`, async (request, reply) => {
    const input = saveAiSettingsSchema.parse(request.body);
    return reply.send({ success: true, data: await opts.settings.save(input) });
  });
  fastify.delete(`${basePath}/settings`, async (request, reply) => {
    const input = deleteAiSettingsSchema.parse(request.body);
    return reply.send({ success: true, data: await opts.settings.delete(input.expectedRevision) });
  });

  fastify.post(`${basePath}/chat`, async (request, reply) => {
    const input = aiAssistantChatRequestSchema.parse(request.body);

    const now = Date.now();
    if (now - windowStart >= ASSISTANT_WINDOW_MS) {
      windowStart = now;
      calls = 0;
    }
    if (calls >= ASSISTANT_CALLS_PER_HOUR) {
      return reply.status(429).send({
        success: false,
        error: {
          code: 'RATE_LIMITED',
          message: 'AI assistant limit reached. Try again later.',
        },
      });
    }
    calls += 1;

    const data = await service.chat(input);
    return reply.send({ success: true, data });
  });
};
