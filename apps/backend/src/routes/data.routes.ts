/**
 * @file data.routes.ts
 * @description Fastify route plugin for import, export, backup, restore, and reset operations.
 */

import type { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { getDb, type AppDatabase } from '../db/client.js';
import { registerApiErrorHandler } from './vocabulary.routes.js';
import { ImportExportService } from '../services/import-export.service.js';
import {
  importPreviewSchema,
  importCommitSchema,
  exportQuerySchema,
  exportVocabQuerySchema,
  exportFullQuerySchema,
  restoreSchema,
  restorePreviewSchema,
  confirmOnlySchema,
  resetSchema,
  type ImportCommitInput,
  type RestoreInput,
} from '../schemas/data.schema.js';

export interface DataRouteOptions {
  db?: AppDatabase;
  service?: ImportExportService;
}

export const dataRoutes: FastifyPluginAsync<DataRouteOptions> = async (fastify, opts) => {
  const db = opts.db ?? fastify.db ?? getDb();
  const service = opts.service ?? new ImportExportService(db);

  let apiPrefix = '/api';
  if (fastify.prefix) {
    if (fastify.prefix === '/api' || fastify.prefix.endsWith('/api')) {
      apiPrefix = '';
    }
  }

  registerApiErrorHandler(fastify);

  // POST /api/import/preview
  fastify.post(`${apiPrefix}/import/preview`, async (request, reply) => {
    const validated = importPreviewSchema.parse(request.body);
    return reply.status(200).send({ success: true, data: service.previewImport(validated) });
  });

  // POST /api/import/commit
  fastify.post<{ Body: ImportCommitInput }>(`${apiPrefix}/import/commit`, async (request, reply) => {
    const validated = importCommitSchema.parse(request.body);
    return reply.status(200).send({ success: true, data: service.commitImport(validated) });
  });

  // GET /api/export/vocabulary
  fastify.get(`${apiPrefix}/export/vocabulary`, async (request, reply) => {
    const query = exportVocabQuerySchema.parse(request.query);
    return reply.status(200).send({
      success: true,
      data: service.exportData({ format: query.format, scope: 'words' }),
    });
  });

  // GET /api/export/full
  fastify.get(`${apiPrefix}/export/full`, async (request, reply) => {
    exportFullQuerySchema.parse(request.query);
    return reply.status(200).send({
      success: true,
      data: service.exportData({ format: 'JSON', scope: 'all' }),
    });
  });

  // GET /api/export (compatibility alias)
  fastify.get(`${apiPrefix}/export`, async (request, reply) => {
    const query = exportQuerySchema.parse(request.query);
    return reply.status(200).send({ success: true, data: service.exportData(query) });
  });

  // POST & GET /api/backup
  const backupHandler = async (_request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).send({ success: true, data: service.getBackup() });
  };
  fastify.post(`${apiPrefix}/backup`, backupHandler);
  fastify.get(`${apiPrefix}/backup`, backupHandler);

  // POST /api/restore/preview
  fastify.post(`${apiPrefix}/restore/preview`, async (request, reply) => {
    const validated = restorePreviewSchema.parse(request.body);
    return reply.status(200).send({
      success: true,
      data: service.previewRestore(validated.backup),
    });
  });

  // POST /api/restore
  fastify.post<{ Body: RestoreInput }>(`${apiPrefix}/restore`, async (request, reply) => {
    const validated = restoreSchema.parse(request.body);
    return reply.status(200).send({
      success: true,
      data: service.restoreBackup(validated),
    });
  });

  // POST /api/data/reset-progress and /api/reset-progress
  for (const path of [`${apiPrefix}/data/reset-progress`, `${apiPrefix}/reset-progress`]) {
    fastify.post(path, async (request, reply) => {
      confirmOnlySchema.parse(request.body);
      return reply.status(200).send({ success: true, data: service.resetData({ scope: 'progress', confirm: true }) });
    });
  }

  // POST /api/data/reset-all and /api/reset-all
  for (const path of [`${apiPrefix}/data/reset-all`, `${apiPrefix}/reset-all`]) {
    fastify.post(path, async (request, reply) => {
      confirmOnlySchema.parse(request.body);
      return reply.status(200).send({ success: true, data: service.resetData({ scope: 'all', confirm: true }) });
    });
  }

  // POST /api/data/reset and /api/reset
  for (const path of [`${apiPrefix}/data/reset`, `${apiPrefix}/reset`]) {
    fastify.post(path, async (request, reply) => {
      const validated = resetSchema.parse(request.body);
      return reply.status(200).send({ success: true, data: service.resetData(validated) });
    });
  }
};
