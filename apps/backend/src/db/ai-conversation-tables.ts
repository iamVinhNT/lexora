/**
 * @file ai-conversation-tables.ts
 * @description Standalone DDL and table initialization for AI persistent conversations, turns, and summaries.
 */
import type Database from 'better-sqlite3';

export const AI_CONVERSATION_TABLES = {
  ai_conversations: `CREATE TABLE IF NOT EXISTS ai_conversations (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    context_kind TEXT NOT NULL DEFAULT 'screen',
    context_screen TEXT NOT NULL,
    locale TEXT NOT NULL CHECK (locale IN ('vi', 'en')),
    include_content INTEGER NOT NULL CHECK (include_content IN (0, 1)),
    include_progress INTEGER NOT NULL CHECK (include_progress IN (0, 1)),
    base_url TEXT NOT NULL,
    model TEXT NOT NULL,
    revision INTEGER NOT NULL DEFAULT 1,
    generation_token TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    progress_reset_at TEXT
  )`,
  ai_conversation_turns: `CREATE TABLE IF NOT EXISTS ai_conversation_turns (
    id TEXT PRIMARY KEY,
    conversation_id TEXT NOT NULL REFERENCES ai_conversations(id) ON DELETE CASCADE,
    request_id TEXT NOT NULL UNIQUE,
    request_fingerprint TEXT NOT NULL,
    sequence INTEGER NOT NULL,
    user_content TEXT NOT NULL,
    assistant_reply TEXT,
    status TEXT NOT NULL CHECK (status IN ('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED')),
    error_code TEXT,
    process_id TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    UNIQUE(conversation_id, sequence)
  )`,
  ai_conversation_summaries: `CREATE TABLE IF NOT EXISTS ai_conversation_summaries (
    id TEXT PRIMARY KEY,
    conversation_id TEXT NOT NULL UNIQUE REFERENCES ai_conversations(id) ON DELETE CASCADE,
    covered_through_sequence INTEGER NOT NULL,
    conversation_revision INTEGER NOT NULL,
    format_version INTEGER NOT NULL DEFAULT 1,
    summary_json TEXT NOT NULL,
    source_turn_ids_json TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,
} as const;

export const AI_CONVERSATION_INDEXES = [
  'CREATE INDEX IF NOT EXISTS idx_ai_conversations_updated_at ON ai_conversations(updated_at DESC)',
  'CREATE INDEX IF NOT EXISTS idx_ai_conversation_turns_conversation_sequence ON ai_conversation_turns(conversation_id, sequence ASC)',
  'CREATE INDEX IF NOT EXISTS idx_ai_conversation_turns_request_id ON ai_conversation_turns(request_id)',
  'CREATE INDEX IF NOT EXISTS idx_ai_conversation_turns_status ON ai_conversation_turns(status)',
  'CREATE UNIQUE INDEX IF NOT EXISTS uq_ai_conversation_turns_pending ON ai_conversation_turns(conversation_id) WHERE status = \'PENDING\'',
  'CREATE INDEX IF NOT EXISTS idx_ai_conversation_summaries_conversation_id ON ai_conversation_summaries(conversation_id)',
] as const;

/**
 * Creates persistent AI conversation tables and indexes if they do not exist.
 */
export function createAiConversationTables(sqlite: Database.Database): void {
  sqlite.pragma('foreign_keys = ON');
  sqlite.exec(AI_CONVERSATION_TABLES.ai_conversations);
  sqlite.exec(AI_CONVERSATION_TABLES.ai_conversation_turns);
  sqlite.exec(AI_CONVERSATION_TABLES.ai_conversation_summaries);

  for (const indexSql of AI_CONVERSATION_INDEXES) {
    sqlite.exec(indexSql);
  }
}
