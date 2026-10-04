/**
 * @file study.routes.ts
 * @description Strict HTTP routes for study preferences, calendar previews, and tasks.
 */
import type { FastifyPluginAsync } from 'fastify';
import type { StudyService } from '../services/study.service.js';
import {
  studyCalendarQuerySchema,
  studyPlanPreviewInputSchema,
  studyPreferencesInputSchema,
  studyTaskIdSchema,
  studyTaskInputSchema,
  taskPatchSchema,
} from '../schemas/study.schema.js';
import { registerApiErrorHandler } from './vocabulary.routes.js';

export interface StudyRouteOptions {
  service: StudyService;
}

export const studyRoutes: FastifyPluginAsync<StudyRouteOptions> = async (fastify, options) => {
  const base = '/api';
  registerApiErrorHandler(fastify);

  fastify.get(`${base}/study-preferences`, async (_request, reply) => {
    return reply.status(200).send({ success: true, data: options.service.getPreferences() });
  });

  fastify.put(`${base}/study-preferences`, async (request, reply) => {
    const input = studyPreferencesInputSchema.parse(request.body);
    return reply.status(200).send({ success: true, data: options.service.putPreferences(input) });
  });

  fastify.get(`${base}/study-calendar`, async (request, reply) => {
    const query = studyCalendarQuerySchema.parse(request.query);
    return reply.status(200).send({ success: true, data: options.service.getCalendar(query, new Date().toISOString()) });
  });

  fastify.get(`${base}/study-tasks/:id`, async (request, reply) => {
    const params = studyTaskIdSchema.parse(request.params);
    return reply.status(200).send({ success: true, data: options.service.getTask(params.id, new Date().toISOString()) });
  });

  fastify.post(`${base}/study-plan-previews`, async (request, reply) => {
    studyPlanPreviewInputSchema.parse(request.body);
    return reply.status(200).send({ success: true, data: options.service.previewPlan(new Date().toISOString()) });
  });

  fastify.post(`${base}/study-tasks`, async (request, reply) => {
    const input = studyTaskInputSchema.parse(request.body);
    const result = options.service.createTask(input, new Date().toISOString());
    const { wasReplay, ...data } = result;
    return reply.status(wasReplay ? 200 : 201).send({ success: true, data });
  });

  fastify.patch(`${base}/study-tasks/:id`, async (request, reply) => {
    const params = studyTaskIdSchema.parse(request.params);
    const patch = taskPatchSchema.parse(request.body);
    const result = options.service.patchTask(params.id, patch, new Date().toISOString());
    return reply.status(200).send({ success: true, data: result });
  });
};
