/**
 * @file ai-conversation.repository.ts
 * @description SQLite repository for persistent AI conversations and turns with immediate locking.
 */
import { createHash, randomUUID } from 'node:crypto';
import type Database from 'better-sqlite3';
import { AppError } from '../services/vocabulary.service.js';
import type {
  AiAssistantContextDescriptor,
  AiAssistantConversation,
  AiAssistantScreen,
  AiAssistantTurn,
  AiAssistantTurnStatus,
} from '../schemas/ai-conversation.schema.js';

export interface AiConversationRow {
  id: string;
  title: string;
  context_kind: string;
  context_screen: string;
  locale: 'vi' | 'en';
  include_content: number;
  include_progress: number;
  base_url: string;
  model: string;
  revision: number;
  generation_token: string;
  created_at: string;
  updated_at: string;
  progress_reset_at: string | null;
}

export interface AiConversationTurnRow {
  id: string;
  conversation_id: string;
  request_id: string;
  request_fingerprint: string;
  sequence: number;
  user_content: string;
  assistant_reply: string | null;
  status: AiAssistantTurnStatus;
  error_code: string | null;
  process_id: string | null;
  created_at: string;
  updated_at: string;
}

export function toConversationDto(row: AiConversationRow): AiAssistantConversation {
  return {
    id: row.id,
    title: row.title,
    context: row.context_kind === 'general'
      ? { kind: 'general' }
      : {
          kind: 'screen',
          screen: (row.context_screen || 'overview') as AiAssistantScreen,
        },
    locale: row.locale,
    includeContent: Boolean(row.include_content),
    includeProgress: Boolean(row.include_progress),
    baseURL: row.base_url,
    model: row.model,
    revision: row.revision,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    progressResetAt: row.progress_reset_at,
  };
}

export function toTurnDto(row: AiConversationTurnRow): AiAssistantTurn {
  return {
    id: row.id,
    requestId: row.request_id,
    sequence: row.sequence,
    userContent: row.user_content,
    assistantReply: row.assistant_reply,
    status: row.status,
    errorCode: row.error_code,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function computeRequestFingerprint(params: {
  conversationId: string;
  message: string;
  locale: string;
  context: AiAssistantContextDescriptor;
  includeContent: boolean;
  includeProgress: boolean;
  allowProviderChange?: boolean;
}): string {
  const payload = JSON.stringify([
    params.conversationId,
    params.message.trim(),
    params.locale,
    params.context.kind === 'screen' ? `screen:${params.context.screen}` : 'general',
    Boolean(params.includeContent),
    Boolean(params.includeProgress),
    Boolean(params.allowProviderChange),
  ]);
  return createHash('sha256').update(payload).digest('hex');
}

function isProcessAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error: unknown) {
    return Boolean(error && typeof error === 'object' && 'code' in error && error.code === 'EPERM');
  }
}

export class AiConversationRepository {
  readonly processOwnerId = `${process.pid}:${randomUUID()}`;

  constructor(private readonly sqlite: Database.Database) {}

  createConversation(data: {
    id?: string;
    title?: string;
    context: AiAssistantContextDescriptor;
    locale: 'vi' | 'en';
    includeContent: boolean;
    includeProgress: boolean;
    baseURL: string;
    model: string;
  }): AiAssistantConversation {
    const id = data.id ?? randomUUID();
    const now = new Date().toISOString();
    const generationToken = randomUUID();
    const title = data.title ?? (data.locale === 'vi' ? 'Cuộc trò chuyện mới' : 'New conversation');
    const contextKind = data.context.kind;
    const contextScreen = data.context.kind === 'screen' ? data.context.screen : 'general';

    this.sqlite.prepare(`
      INSERT INTO ai_conversations (
        id, title, context_kind, context_screen, locale,
        include_content, include_progress, base_url, model,
        revision, generation_token, created_at, updated_at, progress_reset_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, NULL)
    `).run(
      id,
      title,
      contextKind,
      contextScreen,
      data.locale,
      data.includeContent ? 1 : 0,
      data.includeProgress ? 1 : 0,
      data.baseURL,
      data.model,
      generationToken,
      now,
      now,
    );

    const row = this.getConversationRow(id);
    if (!row) throw new AppError(500, 'INTERNAL_ERROR', 'Failed to create conversation');
    return toConversationDto(row);
  }

  getConversationRow(id: string): AiConversationRow | null {
    return (this.sqlite.prepare('SELECT * FROM ai_conversations WHERE id = ?').get(id) as AiConversationRow) ?? null;
  }

  getConversation(id: string): AiAssistantConversation | null {
    const row = this.getConversationRow(id);
    return row ? toConversationDto(row) : null;
  }

  listConversations(options: { limit: number; offset: number }): { items: AiAssistantConversation[]; total: number } {
    const totalRow = this.sqlite.prepare('SELECT count(*) as count FROM ai_conversations').get() as { count: number };
    const total = totalRow?.count ?? 0;

    const rows = this.sqlite.prepare(`
      SELECT * FROM ai_conversations
      ORDER BY updated_at DESC, id DESC
      LIMIT ? OFFSET ?
    `).all(options.limit, options.offset) as AiConversationRow[];

    return {
      items: rows.map(toConversationDto),
      total,
    };
  }

  deleteConversation(id: string, expectedRevision: number): boolean {
    const txn = this.sqlite.transaction(() => {
      const row = this.getConversationRow(id);
      if (!row) return false;
      if (row.revision !== expectedRevision) {
        throw new AppError(409, 'AI_CONVERSATION_CONFLICT', 'Conversation revision conflict');
      }
      this.sqlite.prepare('DELETE FROM ai_conversations WHERE id = ?').run(id);
      return true;
    }).immediate;
    return txn();
  }

  claimTurn(data: {
    conversationId: string;
    requestId: string;
    requestFingerprint: string;
    expectedConversationRevision: number;
    userContent: string;
  }): { status: 'CLAIMED' | 'REPLAY'; turn: AiAssistantTurn; conversation: AiAssistantConversation; generationToken: string } {
    const result = this.sqlite.transaction(() => {
    const existingTurnRow = this.sqlite.prepare(
      'SELECT * FROM ai_conversation_turns WHERE request_id = ?'
    ).get(data.requestId) as AiConversationTurnRow | undefined;

    if (existingTurnRow) {
      if (existingTurnRow.request_fingerprint !== data.requestFingerprint) {
        throw new AppError(409, 'AI_REQUEST_CONFLICT', 'Duplicate request ID with different payload');
      }
      if (existingTurnRow.conversation_id !== data.conversationId) {
        throw new AppError(409, 'AI_REQUEST_CONFLICT', 'Request ID belongs to a different conversation');
      }

      const convRow = this.getConversationRow(existingTurnRow.conversation_id);
      if (!convRow) {
        throw new AppError(404, 'AI_CONVERSATION_NOT_FOUND', 'Conversation not found for request');
      }

      if (existingTurnRow.status === 'COMPLETED') {
        return {
          status: 'REPLAY' as const,
          turn: toTurnDto(existingTurnRow),
          conversation: toConversationDto(convRow),
          generationToken: convRow.generation_token,
        };
      }

      if (existingTurnRow.status === 'PENDING') {
        let isOwnerDead = false;
        if (!existingTurnRow.process_id) {
          isOwnerDead = true;
        } else {
          const pid = parseInt(existingTurnRow.process_id.split(':')[0], 10);
          if (Number.isNaN(pid) || !isProcessAlive(pid)) {
            isOwnerDead = true;
          }
        }

        if (isOwnerDead) {
          const now = new Date().toISOString();
          this.sqlite.prepare(`
            UPDATE ai_conversation_turns
            SET status = 'CANCELLED', error_code = 'AI_INTERRUPTED', process_id = NULL, updated_at = ?
            WHERE id = ? AND status = 'PENDING'
          `).run(now, existingTurnRow.id);
          return new AppError(409, 'AI_REQUEST_CONFLICT', 'Previous attempt was interrupted. Retry with a new request ID.');
        }

        throw new AppError(409, 'AI_REQUEST_IN_PROGRESS', 'Request is already in progress');
      }

      throw new AppError(409, 'AI_REQUEST_FAILED', `Request already finished with status ${existingTurnRow.status}. Retry with a new request ID.`);
    }

    // Recheck ownership while holding the write lock before inserting a new turn.
    const pendingRows = this.sqlite.prepare(`
      SELECT id, process_id FROM ai_conversation_turns
      WHERE conversation_id = ? AND status = 'PENDING'
    `).all(data.conversationId) as Array<{ id: string; process_id: string | null }>;

    const nowIso = new Date().toISOString();
    for (const pending of pendingRows) {
      let isDead = false;
      if (!pending.process_id) {
        isDead = true;
      } else {
        const pid = parseInt(pending.process_id.split(':')[0], 10);
        if (Number.isNaN(pid) || !isProcessAlive(pid)) {
          isDead = true;
        }
      }

      if (isDead) {
        this.sqlite.prepare(`
          UPDATE ai_conversation_turns
          SET status = 'CANCELLED', error_code = 'AI_INTERRUPTED', process_id = NULL, updated_at = ?
          WHERE id = ? AND status = 'PENDING'
        `).run(nowIso, pending.id);
      } else {
        throw new AppError(409, 'AI_REQUEST_IN_PROGRESS', 'A message is already being generated for this conversation');
      }
    }

      const convRow = this.getConversationRow(data.conversationId);
      if (!convRow) {
        throw new AppError(404, 'AI_CONVERSATION_NOT_FOUND', 'Conversation not found');
      }
      if (convRow.revision !== data.expectedConversationRevision) {
        throw new AppError(409, 'AI_CONVERSATION_CONFLICT', 'Conversation revision conflict');
      }

      const seqRow = this.sqlite.prepare(`
        SELECT COALESCE(MAX(sequence), 0) + 1 AS nextSeq
        FROM ai_conversation_turns
        WHERE conversation_id = ?
      `).get(data.conversationId) as { nextSeq: number };
      const sequence = seqRow?.nextSeq ?? 1;

      // Update title on first turn if placeholder
      if (sequence === 1 || convRow.title === 'Cuộc trò chuyện mới' || convRow.title === 'New conversation') {
        const generatedTitle = data.userContent.trim().slice(0, 60);
        if (generatedTitle) {
          this.sqlite.prepare('UPDATE ai_conversations SET title = ? WHERE id = ?').run(generatedTitle, data.conversationId);
        }
      }

      const turnId = randomUUID();
      const now = new Date().toISOString();

      this.sqlite.prepare(`
        INSERT INTO ai_conversation_turns (
          id, conversation_id, request_id, request_fingerprint, sequence,
          user_content, assistant_reply, status, error_code, process_id,
          created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, NULL, 'PENDING', NULL, ?, ?, ?)
      `).run(
        turnId,
        data.conversationId,
        data.requestId,
        data.requestFingerprint,
        sequence,
        data.userContent,
        this.processOwnerId,
        now,
        now,
      );

      const insertedRow = this.sqlite.prepare('SELECT * FROM ai_conversation_turns WHERE id = ?').get(turnId) as AiConversationTurnRow;
      const updatedConvRow = this.getConversationRow(data.conversationId)!;

      return {
        status: 'CLAIMED' as const,
        turn: toTurnDto(insertedRow),
        conversation: toConversationDto(updatedConvRow),
        generationToken: updatedConvRow.generation_token,
      };
    }).immediate();

    if (result instanceof AppError) throw result;
    return result;
  }

  commitTurnCompleted(params: {
    turnId: string;
    conversationId: string;
    generationToken: string;
    expectedRevision: number;
    assistantReply: string;
    newBaseURL?: string;
    newModel?: string;
  }): { newRevision: number } {
    const txn = this.sqlite.transaction(() => {
      const conv = this.getConversationRow(params.conversationId);
      if (!conv) {
        throw new AppError(404, 'AI_CONVERSATION_NOT_FOUND', 'Conversation not found');
      }
      if (conv.generation_token !== params.generationToken) {
        throw new AppError(409, 'AI_CONVERSATION_CONFLICT', 'Conversation generation token mismatch (thread was reset or recreated)');
      }
      if (conv.revision !== params.expectedRevision) {
        throw new AppError(409, 'AI_CONVERSATION_CONFLICT', 'Conversation revision conflict during commit');
      }

      const turn = this.sqlite.prepare('SELECT * FROM ai_conversation_turns WHERE id = ?').get(params.turnId) as AiConversationTurnRow | undefined;
      if (!turn) {
        throw new AppError(404, 'AI_TURN_NOT_FOUND', 'Turn not found');
      }
      if (turn.status !== 'PENDING') {
        throw new AppError(409, 'AI_TURN_CONFLICT', `Turn is no longer pending (status: ${turn.status})`);
      }
      if (turn.process_id !== this.processOwnerId) {
        throw new AppError(409, 'AI_TURN_CONFLICT', 'Turn was claimed by another process owner');
      }

      const newRevision = conv.revision + 1;
      const now = new Date().toISOString();

      this.sqlite.prepare(`
        UPDATE ai_conversations
        SET revision = ?,
            base_url = COALESCE(?, base_url),
            model = COALESCE(?, model),
            updated_at = ?
        WHERE id = ?
      `).run(
        newRevision,
        params.newBaseURL ?? null,
        params.newModel ?? null,
        now,
        params.conversationId,
      );

      this.sqlite.prepare(`
        UPDATE ai_conversation_turns
        SET status = 'COMPLETED',
            assistant_reply = ?,
            process_id = NULL,
            updated_at = ?
        WHERE id = ?
      `).run(params.assistantReply, now, params.turnId);

      return { newRevision };
    }).immediate;

    return txn();
  }

  failTurn(params: {
    turnId: string;
    conversationId: string;
    generationToken: string;
    errorCode: string;
  }): void {
    const now = new Date().toISOString();
    this.sqlite.prepare(`
      UPDATE ai_conversation_turns
      SET status = 'FAILED',
          error_code = ?,
          process_id = NULL,
          updated_at = ?
      WHERE id = ?
        AND conversation_id = ?
        AND status = 'PENDING'
        AND process_id = ?
        AND conversation_id IN (SELECT id FROM ai_conversations WHERE id = ? AND generation_token = ?)
    `).run(
      params.errorCode,
      now,
      params.turnId,
      params.conversationId,
      this.processOwnerId,
      params.conversationId,
      params.generationToken,
    );
  }

  cancelTurn(params: {
    turnId: string;
    conversationId: string;
    generationToken: string;
    errorCode?: string;
  }): void {
    const now = new Date().toISOString();
    this.sqlite.prepare(`
      UPDATE ai_conversation_turns
      SET status = 'CANCELLED',
          error_code = ?,
          process_id = NULL,
          updated_at = ?
      WHERE id = ?
        AND conversation_id = ?
        AND status = 'PENDING'
        AND process_id = ?
        AND conversation_id IN (SELECT id FROM ai_conversations WHERE id = ? AND generation_token = ?)
    `).run(
      params.errorCode ?? 'AI_CANCELLED',
      now,
      params.turnId,
      params.conversationId,
      this.processOwnerId,
      params.conversationId,
      params.generationToken,
    );
  }

  getTurns(
    conversationId: string,
    options: { limit: number; beforeSequence?: number },
  ): { items: AiAssistantTurn[]; hasMore: boolean; beforeSequence: number | null } {
    const limit = options.limit;
    const fetchLimit = limit + 1;

    let query = 'SELECT * FROM ai_conversation_turns WHERE conversation_id = ?';
    const params: Array<string | number> = [conversationId];

    if (options.beforeSequence !== undefined) {
      query += ' AND sequence < ?';
      params.push(options.beforeSequence);
    }

    query += ' ORDER BY sequence DESC LIMIT ?';
    params.push(fetchLimit);

    const rows = this.sqlite.prepare(query).all(...params) as AiConversationTurnRow[];
    const hasMore = rows.length > limit;
    const pageRows = hasMore ? rows.slice(0, limit) : rows;

    // Chronological order within page
    pageRows.reverse();

    return {
      items: pageRows.map(toTurnDto),
      hasMore,
      beforeSequence: hasMore ? pageRows[0].sequence : null,
    };
  }

  cleanupDeadProcessPendingTurns(): void {
    const pendingRows = this.sqlite.prepare(`
      SELECT id, process_id
      FROM ai_conversation_turns
      WHERE status = 'PENDING'
    `).all() as Array<{ id: string; process_id: string | null }>;

    const now = new Date().toISOString();
    for (const row of pendingRows) {
      let isDead = false;
      if (row.process_id) {
        const pid = parseInt(row.process_id.split(':')[0], 10);
        if (Number.isNaN(pid) || !isProcessAlive(pid)) {
          isDead = true;
        }
      } else {
        isDead = true;
      }

      if (isDead) {
        this.sqlite.prepare(`
          UPDATE ai_conversation_turns
          SET status = 'CANCELLED', error_code = 'AI_INTERRUPTED', process_id = NULL, updated_at = ?
          WHERE id = ?
        `).run(now, row.id);
      }
    }
  }

  cancelProcessPendingTurns(): void {
    const now = new Date().toISOString();
    this.sqlite.prepare(`
      UPDATE ai_conversation_turns
      SET status = 'CANCELLED', error_code = 'AI_CANCELLED', process_id = NULL, updated_at = ?
      WHERE status = 'PENDING' AND process_id = ?
    `).run(now, this.processOwnerId);
  }
}
