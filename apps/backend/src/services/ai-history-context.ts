/**
 * @file ai-history-context.ts
 * @description Coordinator for persistent AI conversation context preparation,
 * server-side rolling summary compaction, raw lexical evidence retrieval, and prompt budgeting.
 */
import type Database from 'better-sqlite3';
import { type AiConfig } from './ai-client.js';
import { AppError } from './vocabulary.service.js';
import {
  type AiConversationSummary,
  type AiSummaryGenerator,
  validateSummary,
  executeSummarizerCall,
  persistSummaryWithCas,
  SUMMARIZER_SYSTEM_PROMPT,
} from './ai-history-summary.js';
import {
  type AiRetrievedEvidenceItem,
  searchThreadEvidence,
} from './ai-history-retrieval.js';
import {
  type TurnCandidate,
  measureSerializedPrompt,
  budgetSummarizerBatch,
  selectCompleteTurnsUnderBudget,
  assembleHistoryPrompt,
  HISTORY_PAIR_FRAMING_BYTES,
  PROMPT_MAX_INPUT_TOKENS,
  PROMPT_MAX_INPUT_BYTES,
  COMPACTION_THRESHOLD_TOKENS,
} from './ai-history-budget.js';

export type {
  AiConversationSummary,
  AiSummaryGenerator,
  AiRetrievedEvidenceItem,
};

export type AiMemoryBasePrompt = {
  locale: 'vi' | 'en';
  message: string;
  context: unknown;
  progress?: unknown;
};

export type AiPreparedMemory = {
  prompt: AiMemoryBasePrompt & {
    history?: Array<{ role: 'user' | 'assistant'; content: string }>;
    memory?: unknown;
    evidence?: unknown;
    historyProgressResetAt?: string;
  };
  memoryMode: 'full' | 'compacted' | 'limited';
};

interface SummaryRow {
  id: string;
  covered_through_sequence: number;
  conversation_revision: number;
  format_version: number;
  summary_json: string;
  source_turn_ids_json: string;
}

function ensureConversationCurrent(
  sqlite: Database.Database,
  conversation: { id: string; revision: number; generationToken: string },
): void {
  const row = sqlite
    .prepare('SELECT id FROM ai_conversations WHERE id = ? AND revision = ? AND generation_token = ?')
    .get(conversation.id, conversation.revision, conversation.generationToken);
  if (!row) {
    throw new AppError(409, 'AI_CONVERSATION_CONFLICT', 'Conversation modified or cancelled concurrently');
  }
}

/**
 * Prepares bounded prompt context from persistent SQLite conversation history.
 */
export async function prepareAiHistoryContext(
  sqlite: Database.Database,
  conversation: { id: string; generationToken: string; revision: number; progressResetAt: string | null },
  basePrompt: AiMemoryBasePrompt,
  options: {
    config?: AiConfig;
    signal: AbortSignal;
    deadline: number;
    summarize?: AiSummaryGenerator;
    systemPrompt?: string;
  },
): Promise<AiPreparedMemory> {
  options.signal.throwIfAborted();
  if (Date.now() >= options.deadline) {
    throw new AppError(504, 'AI_TIMEOUT', 'AI assistant timed out');
  }

  const systemPrompt = options.systemPrompt ?? '';
  const promptBase = {
    ...basePrompt,
    ...(conversation.progressResetAt ? { historyProgressResetAt: conversation.progressResetAt } : {}),
  };
  const baseOverhead = measureSerializedPrompt(systemPrompt, promptBase);
  if (baseOverhead.tokens > PROMPT_MAX_INPUT_TOKENS || baseOverhead.bytes > PROMPT_MAX_INPUT_BYTES) {
    throw new AppError(400, 'AI_CONTEXT_TOO_LARGE', 'Context exceeds token budget');
  }

  // 1. Bounded Thread Stats: aggregate counts without row array allocation
  const stats = sqlite.prepare(`
    SELECT COUNT(*) as count,
           SUM(length(CAST(json_quote(user_content) AS BLOB)) + length(CAST(json_quote(assistant_reply) AS BLOB))) as total_bytes,
           MAX(sequence) as max_sequence
    FROM ai_conversation_turns
    WHERE conversation_id = ? AND status = 'COMPLETED' AND assistant_reply IS NOT NULL
  `).get(conversation.id) as { count: number; total_bytes: number | null; max_sequence: number | null };

  const totalCompletedTurns = stats.count ?? 0;
  const totalHistoryTokens = Math.ceil(((stats.total_bytes ?? 0) + (stats.count ?? 0) * HISTORY_PAIR_FRAMING_BYTES) / 2);
  const maxCompletedSequence = stats.max_sequence ?? 0;

  if (totalCompletedTurns === 0) {
    ensureConversationCurrent(sqlite, conversation);
    return {
      prompt: {
        ...basePrompt,
        ...(conversation.progressResetAt ? { historyProgressResetAt: conversation.progressResetAt } : {}),
      },
      memoryMode: 'full',
    };
  }

  // 2. Inspect Existing Cached Summary with Bounded Source Verification
  const summaryRow = sqlite.prepare(`
    SELECT id, covered_through_sequence, conversation_revision, format_version,
           summary_json, source_turn_ids_json
    FROM ai_conversation_summaries
    WHERE conversation_id = ?
  `).get(conversation.id) as SummaryRow | undefined;

  let existingSummary: AiConversationSummary | null = null;
  let coveredThroughSequence = 0;

  if (summaryRow && summaryRow.format_version === 1 && summaryRow.covered_through_sequence <= maxCompletedSequence) {
    try {
      const parsed = JSON.parse(summaryRow.summary_json);
      const parsedSources = Array.isArray(parsed.sourceTurnIds) ? parsed.sourceTurnIds : [];
      if (parsedSources.length > 0 && parsedSources.length <= 100) {
        const placeholders = parsedSources.map(() => '?').join(',');
        const verifiedRows = sqlite.prepare(
          `SELECT id FROM ai_conversation_turns WHERE conversation_id = ? AND status = 'COMPLETED' AND id IN (${placeholders})`,
        ).all(conversation.id, ...parsedSources) as Array<{ id: string }>;

        if (verifiedRows.length === parsedSources.length) {
          const validated = validateSummary(parsed, new Set(parsedSources));
          if (validated) {
            existingSummary = validated;
            coveredThroughSequence = summaryRow.covered_through_sequence;
          }
        }
      }
    } catch {
      existingSummary = null;
    }
  }

  // 3. Case A: Below Compaction Threshold (and no previous summary exists)
  // Fetch the latest bounded short-history window; never lose the newest correction.
  if (totalHistoryTokens < COMPACTION_THRESHOLD_TOKENS && existingSummary === null) {
    const shortTurns = sqlite.prepare(`
      SELECT id, sequence, user_content as userContent, assistant_reply as assistantReply
      FROM ai_conversation_turns
      WHERE conversation_id = ? AND status = 'COMPLETED' AND assistant_reply IS NOT NULL
      ORDER BY sequence DESC
      LIMIT 400
    `).all(conversation.id) as TurnCandidate[];
    shortTurns.reverse();

    const { selectedTurns } = selectCompleteTurnsUnderBudget({
      turns: shortTurns,
      systemPrompt,
      basePromptTemplate: promptBase,
    });

    const candidates = searchThreadEvidence({
      sqlite,
      conversationId: conversation.id,
      maxSequenceExclusive: selectedTurns.length > 0 ? selectedTurns[0].sequence : maxCompletedSequence + 1,
      query: basePrompt.message,
    });

    const assembled = assembleHistoryPrompt({ systemPrompt, basePrompt: promptBase, turns: shortTurns, evidence: candidates });

    ensureConversationCurrent(sqlite, conversation);
    return {
      prompt: assembled.prompt,
      memoryMode: assembled.clipped || assembled.selectedTurns.length < totalCompletedTurns ? 'limited' : 'full',
    };
  }

  // 4. Case B: Compaction Threshold Reached or Existing Summary Present
  // Bounded SQL: Recent 4 complete turns only
  const recentTurnsDesc = sqlite.prepare(`
    SELECT id, sequence, user_content as userContent, assistant_reply as assistantReply
    FROM ai_conversation_turns
    WHERE conversation_id = ? AND status = 'COMPLETED' AND assistant_reply IS NOT NULL
    ORDER BY sequence DESC
    LIMIT 4
  `).all(conversation.id) as TurnCandidate[];

  const recentTurns = [...recentTurnsDesc].reverse();
  const minRecentSequence = recentTurns[0].sequence;

  // Bounded SQL: Unsummarized older turns batch only
  const unsummarizedOlderTurns = sqlite.prepare(`
    SELECT id, sequence, user_content as userContent, assistant_reply as assistantReply
    FROM ai_conversation_turns
    WHERE conversation_id = ? AND status = 'COMPLETED' AND assistant_reply IS NOT NULL
      AND sequence > ? AND sequence < ?
    ORDER BY sequence ASC
    LIMIT 21
  `).all(conversation.id, coveredThroughSequence, minRecentSequence) as TurnCandidate[];

  let activeSummary = existingSummary;
  let memoryMode: 'full' | 'compacted' | 'limited' = existingSummary ? 'compacted' : 'limited';

  if (unsummarizedOlderTurns.length > 0) {
    const remainingMs = options.deadline - Date.now();
    if (remainingMs < 3000) {
      memoryMode = 'limited';
    } else {
      const subdeadlineMs = Math.min(Math.floor(remainingMs * 0.4), 8000);
      const batch = budgetSummarizerBatch({
        previousSummary: activeSummary,
        turns: unsummarizedOlderTurns,
        systemPrompt: SUMMARIZER_SYSTEM_PROMPT,
      });

      const batchTurnIds = new Set(batch.map((t) => t.id));
      if (activeSummary) {
        for (const id of activeSummary.sourceTurnIds) batchTurnIds.add(id);
      }

      try {
        const generated = await executeSummarizerCall({
          config: options.config,
          summarize: options.summarize,
          existingSummary: activeSummary,
          batch,
          signal: options.signal,
          subdeadlineMs,
          validTurnIds: batchTurnIds,
        });

        if (generated) {
          const lastTurnSequence = batch[batch.length - 1].sequence;
          const casSuccess = persistSummaryWithCas({
            sqlite,
            conversationId: conversation.id,
            revision: conversation.revision,
            generationToken: conversation.generationToken,
            summary: generated,
            coveredThroughSequence: lastTurnSequence,
          });

          if (!casSuccess) {
            throw new AppError(409, 'AI_CONVERSATION_CONFLICT', 'Conversation modified or cancelled concurrently');
          }

          activeSummary = generated;
          coveredThroughSequence = lastTurnSequence;
          memoryMode = 'compacted';
        } else {
          memoryMode = 'limited';
        }
      } catch (err) {
        if (err instanceof AppError) throw err;
        if (options.signal.aborted) throw new AppError(499, 'AI_CANCELLED', 'AI request canceled');
        if (Date.now() >= options.deadline) throw new AppError(504, 'AI_TIMEOUT', 'AI assistant timed out');
        memoryMode = 'limited';
      }
    }
  }

  // Downgrade to limited if older backlog remains unsummarized
  const hasBacklog = sqlite.prepare(`
    SELECT 1 FROM ai_conversation_turns
    WHERE conversation_id = ? AND status = 'COMPLETED'
      AND sequence > ? AND sequence < ? LIMIT 1
  `).get(conversation.id, coveredThroughSequence, minRecentSequence);
  if (hasBacklog) {
    memoryMode = 'limited';
  } else if (activeSummary && memoryMode !== 'limited') {
    memoryMode = 'compacted';
  }

  // 5. Lexical Evidence from older turns
  const evidence = searchThreadEvidence({
    sqlite,
    conversationId: conversation.id,
    maxSequenceExclusive: minRecentSequence,
    query: basePrompt.message,
  });

  // 6. Final Assembly & Budget Measurement
  const assembled = assembleHistoryPrompt({
    systemPrompt,
    basePrompt: promptBase,
    turns: recentTurns,
    memory: activeSummary ?? undefined,
    evidence,
  });
  if (assembled.clipped) memoryMode = 'limited';

  ensureConversationCurrent(sqlite, conversation);
  return {
    prompt: assembled.prompt,
    memoryMode,
  };
}
