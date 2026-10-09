/**
 * @file adaptive-review-backup.test.ts
 * @description Behavioral lifecycle tests for backup v6 adaptive review export, restore, and reset.
 */
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getDb, type AppDatabase } from '../../src/db/client.js';
import { ImportExportService } from '../../src/services/import-export.service.js';
import { restoreReviewAttempts } from '../../src/repositories/review-attempt-backup.repository.js';
import type { ReviewAttemptRow, ReviewAttemptRequestRow } from '../../src/schemas/review-attempt.schema.js';
import {
  now,
  wordId,
  taskId,
  seedTestWordAndTask,
  sampleCompletedAttempt,
  sampleCompleteRequest,
} from './adaptive-review-backup.fixtures.js';

let db: AppDatabase;
let service: ImportExportService;

beforeEach(() => {
  db = getDb(':memory:');
  seedTestWordAndTask(db);
  service = new ImportExportService(db);
});

afterEach(() => {
  db.sqlite.close();
});

describe('adaptive review backup v6 lifecycle', () => {
  it('exports version 7 with reviewAttempts and reviewAttemptRequests', () => {
    restoreReviewAttempts(db.sqlite, {
      reviewAttempts: [sampleCompletedAttempt],
      reviewAttemptRequests: [sampleCompleteRequest],
    });

    const backup = service.getBackup();
    expect(backup.version).toBe(7);
    expect(backup.data.reviewAttempts).toHaveLength(1);
    expect(backup.data.reviewAttempts[0].id).toBe(sampleCompletedAttempt.id);
    expect(backup.data.reviewAttemptRequests).toHaveLength(1);
    expect(backup.data.reviewAttemptRequests[0].requestId).toBe(sampleCompleteRequest.requestId);
  });

  it('roundtrips review attempts and receipts faithfully through restoreBackup', () => {
    restoreReviewAttempts(db.sqlite, {
      reviewAttempts: [sampleCompletedAttempt],
      reviewAttemptRequests: [sampleCompleteRequest],
    });

    const backup = service.getBackup();
    const preview = service.previewRestore(backup);
    expect(preview.valid).toBe(true);
    expect(preview.version).toBe(7);
    expect(preview.adaptiveReviewSummary.includedInBackup).toBe(true);
    expect(preview.adaptiveReviewSummary.warning).toBeNull();
    expect(preview.adaptiveReviewSummary.backupTableCounts.reviewAttempts).toBe(1);
    expect(preview.adaptiveReviewSummary.backupTableCounts.reviewAttemptRequests).toBe(1);

    const restoreResult = service.restoreBackup({
      backup,
      confirm: true,
      previewToken: preview.previewToken,
    });
    expect(restoreResult.restored).toBe(true);

    const restoredBackup = service.getBackup();
    expect(restoredBackup.data.reviewAttempts).toEqual(backup.data.reviewAttempts);
    expect(restoredBackup.data.reviewAttemptRequests).toEqual(backup.data.reviewAttemptRequests);
  });

  it('preserves legal pending AI OUTPUT claim with null response on restore', () => {
    const activeAttempt: ReviewAttemptRow = {
      id: 'attempt-active-01',
      wordId,
      studyTaskId: taskId,
      status: 'ACTIVE',
      stage: 'OUTPUT',
      version: 2,
      promptType: 'RECALL',
      promptText: 'fortunate accident',
      expectedDueAt: '2026-10-09T08:00:00.000Z',
      expectedLastReviewedAt: null,
      expectedRepetitions: 0,
      expectedInterval: 0,
      expectedEaseFactor: 2.5,
      expectedLapses: 0,
      expectedWordUpdatedAt: now,
      needsOutput: true,
      weakReasons: ['RETENTION_LAPSE'],
      recallAnswer: 'serendipity',
      recallResult: 'EXACT',
      recallScore: 100,
      responseTime: 1500,
      outputAnswer: null,
      outputMethod: null,
      outputScore: null,
      outputExplanation: null,
      outputSuggestion: null,
      outputConfigRevision: null,
      selfRating: null,
      effectiveRating: null,
      completedAt: null,
      createdAt: now,
      updatedAt: now,
    };

    const pendingAiRequest: ReviewAttemptRequestRow = {
      requestId: 'req-ai-pending-01',
      attemptId: 'attempt-active-01',
      action: 'OUTPUT',
      requestBody: JSON.stringify({
        requestId: 'req-ai-pending-01',
        expectedVersion: 2,
        action: 'OUTPUT',
        answer: 'Finding this was serendipity.',
        method: 'AI',
        configRevision: 'rev-01',
      }),
      response: null,
      createdAt: now,
    };

    restoreReviewAttempts(db.sqlite, {
      reviewAttempts: [activeAttempt],
      reviewAttemptRequests: [pendingAiRequest],
    });

    const backup = service.getBackup();
    const preview = service.previewRestore(backup);
    expect(preview.valid).toBe(true);

    service.restoreBackup({ backup, confirm: true, previewToken: preview.previewToken });
    const restored = service.getBackup();
    expect(restored.data.reviewAttempts).toHaveLength(1);
    expect(restored.data.reviewAttemptRequests).toHaveLength(1);
    expect(restored.data.reviewAttemptRequests[0].response).toBeNull();
  });

  it('warns before older backup restore clears current adaptive review evidence', () => {
    restoreReviewAttempts(db.sqlite, {
      reviewAttempts: [sampleCompletedAttempt],
      reviewAttemptRequests: [sampleCompleteRequest],
    });

    const currentBackup = service.getBackup();
    const { reviewAttempts: _ra, reviewAttemptRequests: _rar, aiConversations: _ac, aiConversationTurns: _at, ...v5Data } = currentBackup.data;
    const v5Backup = {
      ...currentBackup,
      version: 5,
      data: v5Data,
    };

    const preview = service.previewRestore(v5Backup);
    expect(preview.adaptiveReviewSummary.includedInBackup).toBe(false);
    expect(preview.adaptiveReviewSummary.warning).toMatch(/adaptive review/i);
    expect(preview.adaptiveReviewSummary.existingTableCounts.reviewAttempts).toBe(1);
    expect(preview.adaptiveReviewSummary.existingTableCounts.reviewAttemptRequests).toBe(1);

    service.restoreBackup({
      backup: v5Backup,
      confirm: true,
      previewToken: preview.previewToken,
    });

    const afterRestore = service.getBackup();
    expect(afterRestore.data.reviewAttempts).toEqual([]);
    expect(afterRestore.data.reviewAttemptRequests).toEqual([]);
  });

  it.each(['progress', 'all'] as const)('clears review attempts and receipts on resetData scope %s', (scope) => {
    restoreReviewAttempts(db.sqlite, {
      reviewAttempts: [sampleCompletedAttempt],
      reviewAttemptRequests: [sampleCompleteRequest],
    });

    expect(service.getBackup().data.reviewAttempts).toHaveLength(1);

    service.resetData({ scope, confirm: true });
    expect(service.getBackup().data.reviewAttempts).toHaveLength(0);
    expect(service.getBackup().data.reviewAttemptRequests).toHaveLength(0);
  });

  it('fails restore on malformed backup before DB mutation and preserves live evidence', () => {
    restoreReviewAttempts(db.sqlite, {
      reviewAttempts: [sampleCompletedAttempt],
      reviewAttemptRequests: [sampleCompleteRequest],
    });

    const initialCount = service.getBackup().data.reviewAttempts.length;
    expect(initialCount).toBe(1);

    const currentBackup = service.getBackup();
    const { aiConversations: _ac, aiConversationTurns: _at, ...v6BaseData } = currentBackup.data;
    const malformedBackup = {
      version: 6,
      application: 'Lexora',
      exportedAt: now,
      data: {
        ...v6BaseData,
        reviewAttempts: [
          {
            ...sampleCompletedAttempt,
            id: 'bad-attempt',
            recallResult: 'EXACT',
            recallScore: 33, // Incoherent score
          },
        ],
      },
    };

    expect(() => {
      service.restoreBackup({
        backup: malformedBackup,
        confirm: true,
        previewToken: 'any-token',
      });
    }).toThrow();

    // Verify live evidence is preserved
    expect(service.getBackup().data.reviewAttempts).toHaveLength(1);
    expect(service.getBackup().data.reviewAttempts[0].id).toBe(sampleCompletedAttempt.id);
  });
});
