/**
 * @file ai-history-backup.test.ts
 * @description Behavioral lifecycle tests for backup v7 AI conversation export, restore, and reset.
 */
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getDb, type AppDatabase } from '../../src/db/client.js';
import { ImportExportService } from '../../src/services/import-export.service.js';
import {
  exportAiHistory,
  restoreAiHistory,
} from '../../src/repositories/ai-history-backup.repository.js';
import {
  ensureAiConversationTables,
  sampleConversation,
  sampleCompletedTurn,
  sampleCompletedTurn2,
  samplePendingTurn,
} from './ai-history-backup.fixtures.js';

let db: AppDatabase;
let service: ImportExportService;

beforeEach(() => {
  db = getDb(':memory:');
  ensureAiConversationTables(db.sqlite);
  service = new ImportExportService(db);
});

afterEach(() => {
  db.sqlite.close();
});

describe('AI history backup v7 lifecycle', () => {
  it('exports version 7 with aiConversations and aiConversationTurns and excludes summaries/credentials', () => {
    restoreAiHistory(db.sqlite, {
      aiConversations: [sampleConversation],
      aiConversationTurns: [sampleCompletedTurn, sampleCompletedTurn2],
    });

    // Add a summary in database cache to verify it is NOT exported
    db.sqlite.prepare(`
      INSERT INTO ai_conversation_summaries (
        id, conversation_id, covered_through_sequence, conversation_revision,
        format_version, summary_json, source_turn_ids_json, created_at, updated_at
      ) VALUES (
        '33333333-3333-4333-8333-333333333333', '${sampleConversation.id}', 2, 1,
        1, '{"topics":["serendipity"]}', '["${sampleCompletedTurn.id}"]',
        '2026-10-09T04:05:00.000Z', '2026-10-09T04:05:00.000Z'
      )
    `).run();

    const backup = service.getBackup();
    expect(backup.version).toBe(7);
    expect(backup.data.aiConversations).toHaveLength(1);
    expect(backup.data.aiConversations[0].id).toBe(sampleConversation.id);
    expect(backup.data.aiConversations[0].title).toBe(sampleConversation.title);
    expect(backup.data.aiConversationTurns).toHaveLength(2);
    expect(backup.data.aiConversationTurns[0].sequence).toBe(1);
    expect(backup.data.aiConversationTurns[1].sequence).toBe(2);

    // Summary cache must NOT be in backup data
    expect('aiConversationSummaries' in backup.data).toBe(false);
    expect('summaries' in backup.data).toBe(false);
  });

  it('roundtrips AI conversations and turns faithfully through previewRestore and restoreBackup', () => {
    restoreAiHistory(db.sqlite, {
      aiConversations: [sampleConversation],
      aiConversationTurns: [sampleCompletedTurn, sampleCompletedTurn2],
    });

    const backup = service.getBackup();
    const preview = service.previewRestore(backup);
    expect(preview.valid).toBe(true);
    expect(preview.version).toBe(7);
    expect(preview.aiHistorySummary.includedInBackup).toBe(true);
    expect(preview.aiHistorySummary.warning).toBeNull();
    expect(preview.aiHistorySummary.backupTableCounts.aiConversations).toBe(1);
    expect(preview.aiHistorySummary.backupTableCounts.aiConversationTurns).toBe(2);

    const restoreResult = service.restoreBackup({
      backup,
      confirm: true,
      previewToken: preview.previewToken,
    });
    expect(restoreResult.restored).toBe(true);

    const exported = exportAiHistory(db.sqlite);
    expect(exported.aiConversations).toHaveLength(1);
    expect(exported.aiConversations[0].id).toBe(sampleConversation.id);
    expect(exported.aiConversations[0].title).toBe(sampleConversation.title);
    // Verified fresh generationToken issued to prevent collision with stale CAS
    expect(exported.aiConversations[0].generationToken).not.toBe(sampleConversation.generationToken);
    expect(exported.aiConversations[0].revision).toBeGreaterThan(sampleConversation.revision);
    expect(exported.aiConversationTurns).toHaveLength(2);
  });

  it('cancels legal pending turns on restoreBackup to prevent late SSE mutations', () => {
    const currentBackup = service.getBackup();
    const v7BackupWithPending = {
      ...currentBackup,
      version: 7 as const,
      data: {
        ...currentBackup.data,
        aiConversations: [sampleConversation],
        aiConversationTurns: [
          sampleCompletedTurn,
          sampleCompletedTurn2,
          {
            ...samplePendingTurn,
            sequence: 3,
            status: 'PENDING' as const,
            assistantReply: null,
            processId: 'proc-owner-1',
          },
        ],
      },
    };

    const preview = service.previewRestore(v7BackupWithPending);
    expect(preview.valid).toBe(true);
    expect(preview.aiHistorySummary.includedInBackup).toBe(true);

    const restoreResult = service.restoreBackup({
      backup: v7BackupWithPending,
      confirm: true,
      previewToken: preview.previewToken,
    });
    expect(restoreResult.restored).toBe(true);

    const exported = exportAiHistory(db.sqlite);
    const restoredPending = exported.aiConversationTurns.find((t) => t.id === samplePendingTurn.id);
    expect(restoredPending).toBeDefined();
    expect(restoredPending?.status).toBe('CANCELLED');
    expect(restoredPending?.assistantReply).toBeNull();
    expect(restoredPending?.errorCode).toBe('RESTORE_ABORTED');
    expect(restoredPending?.processId).toBeNull();
  });
  it('warns before older backup restore clears current AI conversation evidence', () => {
    restoreAiHistory(db.sqlite, {
      aiConversations: [sampleConversation],
      aiConversationTurns: [sampleCompletedTurn],
    });

    const currentBackup = service.getBackup();
    const { aiConversations: _c, aiConversationTurns: _t, ...v6Data } = currentBackup.data;
    const v6Backup = {
      ...currentBackup,
      version: 6,
      data: v6Data,
    };

    const preview = service.previewRestore(v6Backup);
    expect(preview.aiHistorySummary.includedInBackup).toBe(false);
    expect(preview.aiHistorySummary.warning).toMatch(/AI conversations/i);
    expect(preview.aiHistorySummary.existingTableCounts.aiConversations).toBe(1);
    expect(preview.aiHistorySummary.existingTableCounts.aiConversationTurns).toBe(1);

    service.restoreBackup({
      backup: v6Backup,
      confirm: true,
      previewToken: preview.previewToken,
    });

    const afterRestore = exportAiHistory(db.sqlite);
    expect(afterRestore.aiConversations).toEqual([]);
    expect(afterRestore.aiConversationTurns).toEqual([]);
  });

  it('clears all AI conversations and turns on resetData scope all', () => {
    restoreAiHistory(db.sqlite, {
      aiConversations: [sampleConversation],
      aiConversationTurns: [sampleCompletedTurn],
    });

    expect(exportAiHistory(db.sqlite).aiConversations).toHaveLength(1);

    const result = service.resetData({ scope: 'all', confirm: true });
    expect(result.reset).toBe(true);
    expect(result.scope).toBe('all');

    const afterReset = exportAiHistory(db.sqlite);
    expect(afterReset.aiConversations).toHaveLength(0);
    expect(afterReset.aiConversationTurns).toHaveLength(0);
  });

  it('retains transcript, stamps progressResetAt, invalidates token and deletes summaries on resetData scope progress', () => {
    restoreAiHistory(db.sqlite, {
      aiConversations: [sampleConversation],
      aiConversationTurns: [sampleCompletedTurn, sampleCompletedTurn2],
    });

    // Add summary cache
    db.sqlite.prepare(`
      INSERT INTO ai_conversation_summaries (
        id, conversation_id, covered_through_sequence, conversation_revision,
        format_version, summary_json, source_turn_ids_json, created_at, updated_at
      ) VALUES (
        '33333333-3333-4333-8333-333333333333', '${sampleConversation.id}', 2, 1,
        1, '{"topics":["serendipity"]}', '["${sampleCompletedTurn.id}"]',
        '2026-10-09T04:05:00.000Z', '2026-10-09T04:05:00.000Z'
      )
    `).run();

    const initialToken = sampleConversation.generationToken;

    const result = service.resetData({ scope: 'progress', confirm: true });
    expect(result.reset).toBe(true);
    expect(result.scope).toBe('progress');

    const afterReset = exportAiHistory(db.sqlite);
    // Transcript preserved
    expect(afterReset.aiConversations).toHaveLength(1);
    expect(afterReset.aiConversationTurns).toHaveLength(2);

    // progressResetAt stamped with timestamp
    expect(afterReset.aiConversations[0].progressResetAt).not.toBeNull();
    // generationToken rotated
    expect(afterReset.aiConversations[0].generationToken).not.toBe(initialToken);
    // revision bumped
    expect(afterReset.aiConversations[0].revision).toBeGreaterThan(sampleConversation.revision);

    // Summary cache deleted
    const summaryCount = Number(
      (db.sqlite.prepare('SELECT count(*) as count FROM ai_conversation_summaries').get() as { count: number }).count,
    );
    expect(summaryCount).toBe(0);
  });

  it('cancels PENDING turns and clears process ownership on resetData scope progress', () => {
    restoreAiHistory(db.sqlite, {
      aiConversations: [sampleConversation],
      aiConversationTurns: [sampleCompletedTurn],
    });

    // Seed raw canonical SQL legal PENDING turn so it actually starts in PENDING status in DB
    db.sqlite.prepare(`
      INSERT INTO ai_conversation_turns (
        id, conversation_id, request_id, request_fingerprint, sequence, user_content,
        assistant_reply, status, error_code, process_id, created_at, updated_at
      ) VALUES (
        '99999999-9999-4999-8999-999999999999', '${sampleConversation.id}', '88888888-8888-4888-8888-888888888888',
        'fp-pending-reset', 2, 'Pending question',
        NULL, 'PENDING', NULL, 'proc-reset-owner',
        '2026-10-09T04:02:00.000Z', '2026-10-09T04:02:00.000Z'
      )
    `).run();

    const beforeRow = db.sqlite
      .prepare(`SELECT status, process_id AS processId FROM ai_conversation_turns WHERE id = '99999999-9999-4999-8999-999999999999'`)
      .get();
    expect(beforeRow).toEqual({ status: 'PENDING', processId: 'proc-reset-owner' });

    service.resetData({ scope: 'progress', confirm: true });

    const exported = exportAiHistory(db.sqlite);
    const pendingTurn = exported.aiConversationTurns.find((t) => t.id === '99999999-9999-4999-8999-999999999999');
    expect(pendingTurn).toBeDefined();
    expect(pendingTurn?.status).toBe('CANCELLED');
    expect(pendingTurn?.assistantReply).toBeNull();
    expect(pendingTurn?.errorCode).toBe('RESET_CANCELLED');
    expect(pendingTurn?.processId).toBeNull();
  });
  it('fails closed on restoreAiHistory if database tables are missing', () => {
    const freshDb = getDb(':memory:');
    // Fresh memory DB does not have AI tables unless created
    freshDb.sqlite.exec('DROP TABLE IF EXISTS ai_conversation_summaries; DROP TABLE IF EXISTS ai_conversation_turns; DROP TABLE IF EXISTS ai_conversations;');

    expect(() => {
      restoreAiHistory(freshDb.sqlite, {
        aiConversations: [sampleConversation],
        aiConversationTurns: [sampleCompletedTurn],
      });
    }).toThrow(/required database tables are missing/i);
    freshDb.sqlite.close();
  });
});
