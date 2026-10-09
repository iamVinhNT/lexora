/**
 * @file adaptive-review-backup-validation.test.ts
 * @description Behavioral tests for backup v6 adaptive review relational integrity, schema constraints, and receipt validation.
 */
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getDb, type AppDatabase } from '../../src/db/client.js';
import { ImportExportService } from '../../src/services/import-export.service.js';
import { backupSchema } from '../../src/schemas/data.schema.js';
import type { ReviewAttemptRow, ReviewAttemptRequestRow } from '../../src/schemas/review-attempt.schema.js';
import {
  now,
  seedTestWordAndTask,
  sampleCompletedAttempt,
  sampleCompleteRequest,
  sampleCompleteResult,
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

describe('adaptive review backup schema and relational validation', () => {
  it('rejects duplicate attempt IDs', () => {
    const backup = service.getBackup();
    const duplicateAttempts = [
      sampleCompletedAttempt,
      { ...sampleCompletedAttempt },
    ];
    const parsed = backupSchema.safeParse({
      ...backup,
      data: {
        ...backup.data,
        reviewAttempts: duplicateAttempts,
      },
    });
    expect(parsed.success).toBe(false);
  });

  it('rejects duplicate request IDs', () => {
    const backup = service.getBackup();
    const duplicateRequests = [
      sampleCompleteRequest,
      { ...sampleCompleteRequest },
    ];
    const parsed = backupSchema.safeParse({
      ...backup,
      data: {
        ...backup.data,
        reviewAttempts: [sampleCompletedAttempt],
        reviewAttemptRequests: duplicateRequests,
      },
    });
    expect(parsed.success).toBe(false);
  });

  it('rejects orphan word reference in review attempt', () => {
    const backup = service.getBackup();
    const orphanAttempt = {
      ...sampleCompletedAttempt,
      wordId: 'non-existent-word',
    };
    const parsed = backupSchema.safeParse({
      ...backup,
      data: {
        ...backup.data,
        reviewAttempts: [orphanAttempt],
      },
    });
    expect(parsed.success).toBe(false);
  });

  it('rejects orphan study task reference or non-review task kind', () => {
    const backup = service.getBackup();
    const orphanTaskAttempt = {
      ...sampleCompletedAttempt,
      studyTaskId: 'non-existent-task',
    };
    const parsed = backupSchema.safeParse({
      ...backup,
      data: {
        ...backup.data,
        reviewAttempts: [orphanTaskAttempt],
      },
    });
    expect(parsed.success).toBe(false);
  });

  it('rejects orphan attempt reference in requests', () => {
    const backup = service.getBackup();
    const orphanRequest = {
      ...sampleCompleteRequest,
      attemptId: 'missing-attempt',
    };
    const parsed = backupSchema.safeParse({
      ...backup,
      data: {
        ...backup.data,
        reviewAttempts: [sampleCompletedAttempt],
        reviewAttemptRequests: [orphanRequest],
      },
    });
    expect(parsed.success).toBe(false);
  });

  it('rejects multiple ACTIVE review attempts', () => {
    const backup = service.getBackup();
    const active1: ReviewAttemptRow = {
      ...sampleCompletedAttempt,
      id: 'attempt-active-01',
      status: 'ACTIVE',
      stage: 'RECALL',
      recallAnswer: null,
      recallResult: null,
      recallScore: null,
      responseTime: null,
      outputMethod: null,
      outputScore: null,
      outputAnswer: null,
      outputExplanation: null,
      outputSuggestion: null,
      outputConfigRevision: null,
      selfRating: null,
      effectiveRating: null,
      completedAt: null,
    };
    const active2: ReviewAttemptRow = {
      ...active1,
      id: 'attempt-active-02',
    };

    const parsed = backupSchema.safeParse({
      ...backup,
      data: {
        ...backup.data,
        reviewAttempts: [active1, active2],
      },
    });
    expect(parsed.success).toBe(false);
  });

  it('rejects recallResult present without recallAnswer', () => {
    const backup = service.getBackup();
    const missingAnswer: ReviewAttemptRow = {
      ...sampleCompletedAttempt,
      recallAnswer: null,
    };
    const parsed = backupSchema.safeParse({
      ...backup,
      data: {
        ...backup.data,
        reviewAttempts: [missingAnswer],
      },
    });
    expect(parsed.success).toBe(false);
  });

  it('rejects incorrect recall result with non-zero recall score or needsOutput false', () => {
    const backup = service.getBackup();
    const nonZeroScore: ReviewAttemptRow = {
      ...sampleCompletedAttempt,
      recallResult: 'INCORRECT',
      recallScore: 50,
    };
    expect(
      backupSchema.safeParse({
        ...backup,
        data: { ...backup.data, reviewAttempts: [nonZeroScore] },
      }).success,
    ).toBe(false);

    const noOutputNeeded: ReviewAttemptRow = {
      ...sampleCompletedAttempt,
      recallResult: 'INCORRECT',
      recallScore: 0,
      needsOutput: false,
    };
    expect(
      backupSchema.safeParse({
        ...backup,
        data: { ...backup.data, reviewAttempts: [noOutputNeeded] },
      }).success,
    ).toBe(false);
  });

  it('rejects OUTPUT stage with output evidence already recorded', () => {
    const backup = service.getBackup();
    const outputStageWithEvidence: ReviewAttemptRow = {
      ...sampleCompletedAttempt,
      status: 'ACTIVE',
      stage: 'OUTPUT',
      completedAt: null,
      selfRating: null,
      effectiveRating: null,
      outputAnswer: 'premature output',
      outputMethod: 'SELF',
    };
    const parsed = backupSchema.safeParse({
      ...backup,
      data: {
        ...backup.data,
        reviewAttempts: [outputStageWithEvidence],
      },
    });
    expect(parsed.success).toBe(false);
  });

  it('rejects effectiveRating that contradicts canonical calculateEffectiveRatings', () => {
    const backup = service.getBackup();
    const contradictoryRating: ReviewAttemptRow = {
      ...sampleCompletedAttempt,
      recallResult: 'INCORRECT',
      recallScore: 0,
      effectiveRating: 'EASY', // Must be AGAIN
    };
    const parsed = backupSchema.safeParse({
      ...backup,
      data: {
        ...backup.data,
        reviewAttempts: [contradictoryRating],
      },
    });
    expect(parsed.success).toBe(false);
  });

  it('rejects request with primitive JSON string body or response', () => {
    const backup = service.getBackup();
    const primitiveBodyRequest: ReviewAttemptRequestRow = {
      requestId: 'req-primitive-body',
      attemptId: sampleCompletedAttempt.id,
      action: 'COMPLETE',
      requestBody: '"raw primitive string"',
      response: JSON.stringify(sampleCompleteResult),
      createdAt: now,
    };
    expect(
      backupSchema.safeParse({
        ...backup,
        data: {
          ...backup.data,
          reviewAttempts: [sampleCompletedAttempt],
          reviewAttemptRequests: [primitiveBodyRequest],
        },
      }).success,
    ).toBe(false);

    const primitiveResponseRequest: ReviewAttemptRequestRow = {
      requestId: 'req-primitive-res',
      attemptId: sampleCompletedAttempt.id,
      action: 'COMPLETE',
      requestBody: JSON.stringify({
        requestId: 'req-primitive-res',
        attemptId: sampleCompletedAttempt.id,
        expectedVersion: 3,
        rating: 'GOOD',
      }),
      response: '"primitive response"',
      createdAt: now,
    };
    expect(
      backupSchema.safeParse({
        ...backup,
        data: {
          ...backup.data,
          reviewAttempts: [sampleCompletedAttempt],
          reviewAttemptRequests: [primitiveResponseRequest],
        },
      }).success,
    ).toBe(false);
  });

  it('rejects non-OUTPUT action with null response', () => {
    const backup = service.getBackup();
    const nullCompleteResponse: ReviewAttemptRequestRow = {
      requestId: 'req-null-complete',
      attemptId: sampleCompletedAttempt.id,
      action: 'COMPLETE',
      requestBody: JSON.stringify({
        requestId: 'req-null-complete',
        attemptId: sampleCompletedAttempt.id,
        expectedVersion: 3,
        rating: 'GOOD',
      }),
      response: null,
      createdAt: now,
    };
    const parsed = backupSchema.safeParse({
      ...backup,
      data: {
        ...backup.data,
        reviewAttempts: [sampleCompletedAttempt],
        reviewAttemptRequests: [nullCompleteResponse],
      },
    });
    expect(parsed.success).toBe(false);
  });

  it('rejects RECALL stage view response exposing word details before recall even when abandoned', () => {
    const backup = service.getBackup();
    const abandonedRecallAttempt: ReviewAttemptRow = {
      ...sampleCompletedAttempt,
      id: 'attempt-abandoned-recall',
      status: 'ABANDONED',
      stage: 'RECALL',
      recallAnswer: null,
      recallResult: null,
      recallScore: null,
      responseTime: null,
      outputAnswer: null,
      outputMethod: null,
      outputScore: null,
      outputExplanation: null,
      outputSuggestion: null,
      outputConfigRevision: null,
      selfRating: null,
      effectiveRating: null,
      completedAt: null,
    };

    const leakingAbandonResponse: ReviewAttemptRequestRow = {
      requestId: 'req-abandon-leak',
      attemptId: 'attempt-abandoned-recall',
      action: 'ABANDON',
      requestBody: JSON.stringify({
        requestId: 'req-abandon-leak',
        expectedVersion: 3,
      }),
      response: JSON.stringify({
        ...sampleCompleteResult.attempt,
        id: 'attempt-abandoned-recall',
        status: 'ABANDONED',
        stage: 'RECALL',
        recall: null,
        output: null,
        word: {
          id: sampleCompletedAttempt.wordId,
          word: 'serendipity',
          definition: 'fortunate accident',
          translation: 'sự tình cờ may mắn',
          phonetic: '/ˌser.ənˈdɪp.ə.ti/',
          partOfSpeech: 'noun',
        },
      }),
      createdAt: now,
    };

    const parsed = backupSchema.safeParse({
      ...backup,
      data: {
        ...backup.data,
        reviewAttempts: [abandonedRecallAttempt],
        reviewAttemptRequests: [leakingAbandonResponse],
      },
    });
    expect(parsed.success).toBe(false);
  });
});
