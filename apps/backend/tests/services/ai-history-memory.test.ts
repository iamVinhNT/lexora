/**
 * @file ai-history-memory.test.ts
 * @description Checks summary cache integrity, restore generation guards, and incremental compaction.
 */
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import Database from 'better-sqlite3';
import { createAiConversationTables } from '../../src/db/ai-conversation-tables.js';
import {
  prepareAiHistoryContext,
  type AiConversationSummary,
  type AiSummaryGenerator,
} from '../../src/services/ai-history-context.js';
import { AppError } from '../../src/services/vocabulary.service.js';

let db: Database.Database;

const CONVERSATION_ID = 'conv-test-202';
const GENERATION_TOKEN = 'token-gen-xyz';

function seedConversation(options: {
  id?: string;
  revision?: number;
  generationToken?: string;
  progressResetAt?: string | null;
} = {}): void {
  const id = options.id ?? CONVERSATION_ID;
  const revision = options.revision ?? 1;
  const generationToken = options.generationToken ?? GENERATION_TOKEN;
  const progressResetAt = options.progressResetAt ?? null;
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO ai_conversations (
      id, title, context_kind, context_screen, locale, include_content,
      include_progress, base_url, model, revision, generation_token,
      created_at, updated_at, progress_reset_at
    ) VALUES (
      ?, 'Học tiếng Anh', 'screen', 'learn', 'vi', 1, 1,
      'http://127.0.0.1:20128/v1', 'test-model', ?, ?, ?, ?, ?
    )
  `).run(id, revision, generationToken, now, now, progressResetAt);
}

function insertTurn(turn: {
  id: string;
  conversationId?: string;
  sequence: number;
  userContent: string;
  assistantReply: string | null;
  status?: 'COMPLETED' | 'PENDING' | 'FAILED' | 'CANCELLED';
}): void {
  const convId = turn.conversationId ?? CONVERSATION_ID;
  const status = turn.status ?? 'COMPLETED';
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO ai_conversation_turns (
      id, conversation_id, request_id, request_fingerprint, sequence,
      user_content, assistant_reply, status, created_at, updated_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
  `).run(
    turn.id,
    convId,
    `req-${turn.id}`,
    `fp-${turn.id}`,
    turn.sequence,
    turn.userContent,
    turn.assistantReply,
    status,
    now,
    now,
  );
}

beforeEach(() => {
  db = new Database(':memory:');
  createAiConversationTables(db);
  seedConversation();
});

afterEach(() => {
  db.close();
});

describe('AI Context Compression & Memory Regressions', () => {

  it('5) sourceunknown/cacheinvalid: rejects cached summary with unknown source IDs and format_version != 1 without fabricating memory', async () => {
    insertTurn({
      id: 'turn-real-1',
      sequence: 1,
      userContent: 'Real question',
      assistantReply: 'Real reply',
    });

    // Insert corrupt summary with source turn IDs that do NOT exist in the thread
    db.prepare(`
      INSERT INTO ai_conversation_summaries (
        id, conversation_id, covered_through_sequence, conversation_revision,
        format_version, summary_json, source_turn_ids_json, created_at, updated_at
      ) VALUES (
        'sum-corrupt', ?, 1, 1, 1,
        '{"goal":"Fabricated","userConstraints":[],"englishContent":{"examples":[],"errorsAndCorrections":[]},"keyTakeaways":[],"openQuestions":[],"recentCorrections":[],"sourceTurnIds":["fake-turn-999"]}',
        '["fake-turn-999"]',
        datetime('now'), datetime('now')
      )
    `).run(CONVERSATION_ID);

    const result = await prepareAiHistoryContext(
      db,
      { id: CONVERSATION_ID, generationToken: GENERATION_TOKEN, revision: 1, progressResetAt: null },
      { locale: 'vi', message: 'Hello', context: {} },
      {
        signal: new AbortController().signal,
        deadline: Date.now() + 10000,
      },
    );

    // Corrupt summary was rejected; memory was not fabricated
    expect(result.prompt.memory).toBeUndefined();
  });

  it('6) restoregeneration during summaryreject: throws 409 conflict if generationToken changed concurrently during summary', async () => {
    for (let i = 1; i <= 10; i++) {
      insertTurn({
        id: `turn-conc-${i}`,
        sequence: i,
        userContent: `Text for compaction ${i}: grammar exercises with conditionals and relative clauses.`.repeat(10),
        assistantReply: `Reply for compaction ${i}: explanation of conditional clauses and practice tasks.`.repeat(10),
      });
    }

    const concurrentMutatingSummarizer: AiSummaryGenerator = async (input) => {
      // Simulate restore or reset bumping generation_token while summarizer was in-flight
      db.prepare('UPDATE ai_conversations SET generation_token = ? WHERE id = ?').run('new-restored-token', CONVERSATION_ID);

      return {
        goal: 'Valid summary goal',
        userConstraints: [],
        englishContent: { examples: [], errorsAndCorrections: [] },
        keyTakeaways: [],
        openQuestions: [],
        recentCorrections: [],
        sourceTurnIds: input.turns.map((t) => t.id),
      };
    };

    await expect(
      prepareAiHistoryContext(
        db,
        { id: CONVERSATION_ID, generationToken: GENERATION_TOKEN, revision: 1, progressResetAt: null },
        { locale: 'vi', message: 'Continue', context: {} },
        {
          signal: new AbortController().signal,
          deadline: Date.now() + 10000,
          summarize: concurrentMutatingSummarizer,
        },
      ),
    ).rejects.toThrow(AppError);
  });

  it('7) limitedbacklog: sets mode to limited when unsummarized backlog remains between summary and recent window', async () => {
    // 12 turns total: turns 1-2 covered by summary, turns 3-8 are backlog, turns 9-12 are recent 4
    for (let i = 1; i <= 12; i++) {
      insertTurn({
        id: `turn-backlog-${i}`,
        sequence: i,
        userContent: `User question ${i}: practice grammar`,
        assistantReply: `Assistant answer ${i}: grammar explanation`,
      });
    }

    const partialSummary: AiConversationSummary = {
      goal: 'Initial lessons',
      userConstraints: [],
      englishContent: { examples: [], errorsAndCorrections: [] },
      keyTakeaways: ['Learned basics'],
      openQuestions: [],
      recentCorrections: [],
      sourceTurnIds: ['turn-backlog-1', 'turn-backlog-2'],
    };

    db.prepare(`
      INSERT INTO ai_conversation_summaries (
        id, conversation_id, covered_through_sequence, conversation_revision,
        format_version, summary_json, source_turn_ids_json, created_at, updated_at
      ) VALUES (
        'sum-partial', ?, 2, 1, 1, ?, ?, datetime('now'), datetime('now')
      )
    `).run(CONVERSATION_ID, JSON.stringify(partialSummary), JSON.stringify(partialSummary.sourceTurnIds));

    // Deadline is short (< 3000ms remaining), so summarizer does NOT run.
    // Unsummarized backlog (turns 3-8) remains between covered sequence (2) and recent window (9-12).
    const result = await prepareAiHistoryContext(
      db,
      { id: CONVERSATION_ID, generationToken: GENERATION_TOKEN, revision: 1, progressResetAt: null },
      { locale: 'vi', message: 'Status query', context: {} },
      {
        signal: new AbortController().signal,
        deadline: Date.now() + 1500, // Short deadline: < 3000ms remaining!
      },
    );

    // Backlog remains unsummarized -> mode must be limited!
    expect(result.memoryMode).toBe('limited');
    expect(result.prompt.memory).toBeDefined();
  });

  it('8) exactlyonecall/cachedskip: invokes summarizer exactly once when needed and skips on next call with fresh cache', async () => {
    // 15 representative turns: each ~800 bytes, enough so 15 turns total > 12000 bytes (6000 tokens threshold),
    // but recent 4 turns + summary comfortably fit within the 36000 byte prompt budget (no clipping).
    for (let i = 1; i <= 15; i++) {
      insertTurn({
        id: `turn-mod-${i}`,
        sequence: i,
        userContent: `English learner question ${i}: how to use complex sentences with adverbial clauses? `.repeat(5),
        assistantReply: `Tutor answer ${i}: use subordinate conjunctions like although, because, and while correctly. `.repeat(5),
      });
    }

    let callCount = 0;
    const countingSummarizer: AiSummaryGenerator = async (input) => {
      callCount++;
      return {
        goal: 'Adverbial clauses practice',
        userConstraints: ['Intermediate'],
        englishContent: { examples: ['Although it rained, we went.'], errorsAndCorrections: [] },
        keyTakeaways: ['Subordinate clauses connect ideas'],
        openQuestions: [],
        recentCorrections: [],
        sourceTurnIds: input.turns.map((t) => t.id),
      };
    };

    // First request: triggers compaction
    const firstResult = await prepareAiHistoryContext(
      db,
      { id: CONVERSATION_ID, generationToken: GENERATION_TOKEN, revision: 1, progressResetAt: null },
      { locale: 'vi', message: 'First query after practice', context: {} },
      {
        signal: new AbortController().signal,
        deadline: Date.now() + 10000,
        summarize: countingSummarizer,
      },
    );

    expect(callCount).toBe(1);
    expect(firstResult.memoryMode).toBe('compacted');

    // Second request: cache is fresh, unsummarized older turns == 0
    const secondResult = await prepareAiHistoryContext(
      db,
      { id: CONVERSATION_ID, generationToken: GENERATION_TOKEN, revision: 1, progressResetAt: null },
      { locale: 'vi', message: 'Second query after practice', context: {} },
      {
        signal: new AbortController().signal,
        deadline: Date.now() + 10000,
        summarize: countingSummarizer,
      },
    );

    // Call count remains 1! No second compaction call, cache reused cleanly
    expect(callCount).toBe(1);
    expect(secondResult.memoryMode).toBe('compacted');
  });
});
