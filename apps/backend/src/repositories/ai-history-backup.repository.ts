/**
 * @file ai-history-backup.repository.ts
 * @description Serializes and restores AI conversation transcripts and relational turns with generation invalidation.
 */
import { randomUUID } from 'node:crypto';
import type Database from 'better-sqlite3';
import {
  aiConversationRowSchema,
  aiConversationTurnRowSchema,
  type AiHistoryBackupData,
} from '../schemas/ai-history-backup.schema.js';

export function tableExists(sqlite: Database.Database, name: string): boolean {
  const row = sqlite.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?").get(name);
  return Boolean(row);
}

const conversationSelect = `
  id,
  title,
  context_kind AS contextKind,
  context_screen AS contextScreen,
  locale,
  include_content AS includeContent,
  include_progress AS includeProgress,
  base_url AS baseUrl,
  model,
  revision,
  generation_token AS generationToken,
  created_at AS createdAt,
  updated_at AS updatedAt,
  progress_reset_at AS progressResetAt
`;

const turnSelect = `
  id,
  conversation_id AS conversationId,
  request_id AS requestId,
  request_fingerprint AS requestFingerprint,
  sequence,
  user_content AS userContent,
  assistant_reply AS assistantReply,
  status,
  error_code AS errorCode,
  process_id AS processId,
  created_at AS createdAt,
  updated_at AS updatedAt
`;

export function exportAiHistory(sqlite: Database.Database): AiHistoryBackupData {
  if (!tableExists(sqlite, 'ai_conversations') || !tableExists(sqlite, 'ai_conversation_turns')) {
    return { aiConversations: [], aiConversationTurns: [] };
  }

  const rawConversations = sqlite
    .prepare(`SELECT ${conversationSelect} FROM ai_conversations ORDER BY created_at, id`)
    .all() as Array<Record<string, unknown>>;

  const rawTurns = sqlite
    .prepare(`SELECT ${turnSelect} FROM ai_conversation_turns ORDER BY conversation_id, sequence`)
    .all() as Array<Record<string, unknown>>;

  const aiConversations = rawConversations.map((row) =>
    aiConversationRowSchema.parse({
      ...row,
      includeContent: Boolean(row.includeContent),
      includeProgress: Boolean(row.includeProgress),
    }),
  );

  const aiConversationTurns = rawTurns.map((row) => aiConversationTurnRowSchema.parse(row));

  return { aiConversations, aiConversationTurns };
}

export function countAiHistory(sqlite: Database.Database): {
  aiConversations: number;
  aiConversationTurns: number;
} {
  const convExists = tableExists(sqlite, 'ai_conversations');
  const turnsExists = tableExists(sqlite, 'ai_conversation_turns');

  let convCount = 0;
  if (convExists) {
    const row = sqlite.prepare('SELECT count(*) AS count FROM ai_conversations').get();
    if (row && typeof row === 'object' && 'count' in row) {
      convCount = Number(row.count);
    }
  }

  let turnsCount = 0;
  if (turnsExists) {
    const row = sqlite.prepare('SELECT count(*) AS count FROM ai_conversation_turns').get();
    if (row && typeof row === 'object' && 'count' in row) {
      turnsCount = Number(row.count);
    }
  }

  return { aiConversations: convCount, aiConversationTurns: turnsCount };
}

export function clearAiHistory(sqlite: Database.Database): void {
  if (tableExists(sqlite, 'ai_conversation_summaries')) {
    sqlite.exec('DELETE FROM ai_conversation_summaries');
  }
  if (tableExists(sqlite, 'ai_conversation_turns')) {
    sqlite.exec('DELETE FROM ai_conversation_turns');
  }
  if (tableExists(sqlite, 'ai_conversations')) {
    sqlite.exec('DELETE FROM ai_conversations');
  }
}

export function restoreAiHistory(sqlite: Database.Database, data: AiHistoryBackupData): void {
  if (!tableExists(sqlite, 'ai_conversations') || !tableExists(sqlite, 'ai_conversation_turns')) {
    throw new Error('Cannot restore AI history: required database tables are missing');
  }

  // Clear existing AI history tables first
  clearAiHistory(sqlite);

  const insertConversation = sqlite.prepare(`
    INSERT INTO ai_conversations (
      id, title, context_kind, context_screen, locale, include_content, include_progress,
      base_url, model, revision, generation_token, created_at, updated_at, progress_reset_at
    ) VALUES (
      @id, @title, @contextKind, @contextScreen, @locale, @includeContent, @includeProgress,
      @baseUrl, @model, @revision, @generationToken, @createdAt, @updatedAt, @progressResetAt
    )
  `);

  for (const conv of data.aiConversations) {
    // Generate fresh generationToken and increment revision by 1 to invalidate stale client SSE/CAS
    insertConversation.run({
      ...conv,
      generationToken: randomUUID(),
      revision: conv.revision + 1,
      includeContent: Number(conv.includeContent),
      includeProgress: Number(conv.includeProgress),
    });
  }

  const insertTurn = sqlite.prepare(`
    INSERT INTO ai_conversation_turns (
      id, conversation_id, request_id, request_fingerprint, sequence, user_content,
      assistant_reply, status, error_code, process_id, created_at, updated_at
    ) VALUES (
      @id, @conversationId, @requestId, @requestFingerprint, @sequence, @userContent,
      @assistantReply, @status, @errorCode, @processId, @createdAt, @updatedAt
    )
  `);

  for (const turn of data.aiConversationTurns) {
    // Invalidate stale in-flight PENDING turns so they cannot mutate restored data
    const status = turn.status === 'PENDING' ? 'CANCELLED' : turn.status;
    const assistantReply = status === 'COMPLETED' ? turn.assistantReply : null;
    const errorCode = turn.status === 'PENDING' ? 'RESTORE_ABORTED' : turn.errorCode;

    insertTurn.run({
      ...turn,
      status,
      assistantReply,
      errorCode,
      processId: null,
    });
  }
}

export function resetAiHistoryProgress(sqlite: Database.Database, resetAt: string): void {
  if (tableExists(sqlite, 'ai_conversation_summaries')) {
    sqlite.exec('DELETE FROM ai_conversation_summaries');
  }

  if (tableExists(sqlite, 'ai_conversation_turns')) {
    sqlite
      .prepare(
        `UPDATE ai_conversation_turns
         SET status = 'CANCELLED',
             assistant_reply = NULL,
             error_code = 'RESET_CANCELLED',
             process_id = NULL,
             updated_at = ?
         WHERE status = 'PENDING'`,
      )
      .run(resetAt);

    sqlite
      .prepare(
        `UPDATE ai_conversation_turns
         SET process_id = NULL
         WHERE process_id IS NOT NULL`,
      )
      .run();
  }

  if (tableExists(sqlite, 'ai_conversations')) {
    const rows = sqlite.prepare('SELECT id, revision FROM ai_conversations').all();
    const updateStmt = sqlite.prepare(`
      UPDATE ai_conversations
      SET progress_reset_at = @resetAt,
          generation_token = @generationToken,
          revision = @revision,
          updated_at = @resetAt
      WHERE id = @id
    `);

    for (const row of rows) {
      if (row && typeof row === 'object' && 'id' in row && 'revision' in row) {
        updateStmt.run({
          id: String(row.id),
          resetAt,
          generationToken: randomUUID(),
          revision: Number(row.revision) + 1,
        });
      }
    }
  }
}
