/**
 * @file ai-history-context.test.ts
 * @description Checks short-thread retention, Unicode source retrieval, and complete-pair input bounds.
 */
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import Database from 'better-sqlite3';
import { createAiConversationTables } from '../../src/db/ai-conversation-tables.js';
import {
  prepareAiHistoryContext,
  type AiSummaryGenerator,
} from '../../src/services/ai-history-context.js';
import {
  budgetSummarizerBatch,
  measureSerializedPrompt,
} from '../../src/services/ai-history-budget.js';

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
  it('retains all 30 short turns below threshold without summary call', async () => {
    for (let i = 1; i <= 30; i++) {
      insertTurn({
        id: `turn-short-${i}`,
        sequence: i,
        userContent: `Question ${i}: short content`,
        assistantReply: `Reply ${i}: short content`,
      });
    }

    let summaryCalled = false;
    const testSummarizer: AiSummaryGenerator = async () => {
      summaryCalled = true;
      return null;
    };

    const result = await prepareAiHistoryContext(
      db,
      { id: CONVERSATION_ID, generationToken: GENERATION_TOKEN, revision: 1, progressResetAt: null },
      { locale: 'vi', message: 'Next question', context: { screen: 'learn' } },
      {
        signal: new AbortController().signal,
        deadline: Date.now() + 10000,
        summarize: testSummarizer,
      },
    );

    expect(summaryCalled).toBe(false);
    expect(result.memoryMode).toBe('full');
    expect(result.prompt.history).toBeDefined();
    // All 30 complete turns remain available, not just newest page.
    expect(result.prompt.history).toHaveLength(60);
    expect(result.prompt.history?.[0].content).toContain('Question 1');
    expect(result.prompt.history?.[59].content).toContain('Reply 30');
  });

  it('2) veryoldrareterm+Unicode: retrieves turn 1 across whole thread (85 turns, NFD query vs NFC text) as exact evidence', async () => {
    // Turn 1 has rare Vietnamese text stored in NFC
    const nfcContent = 'Tác giả có khuynh hướng duy mỹ trong văn học là ai?'.normalize('NFC');
    const nfcReply = 'Khuynh hướng duy mỹ chú trọng cái đẹp hình thức nghệ thuật hơn giá trị xã hội.'.normalize('NFC');

    insertTurn({
      id: 'turn-old-rare-1',
      sequence: 1,
      userContent: nfcContent,
      assistantReply: nfcReply,
    });

    // 84 intervening turns of moderate size to exceed 6000 token threshold (forces compaction/limited)
    for (let i = 2; i <= 85; i++) {
      insertTurn({
        id: `turn-intervening-${i}`,
        sequence: i,
        userContent: `English practice conversation item ${i}: discuss daily work routines and learning goals.`,
        assistantReply: `Assistant guidance item ${i}: practice using present simple and continuous verb forms correctly.`,
      });
    }

    // Query uses decomposed Unicode NFD
    const nfdQuery = 'Giải thích lại khuynh hướng duy mỹ?'.normalize('NFD');

    const result = await prepareAiHistoryContext(
      db,
      { id: CONVERSATION_ID, generationToken: GENERATION_TOKEN, revision: 1, progressResetAt: null },
      { locale: 'vi', message: nfdQuery, context: { screen: 'learn' } },
      {
        signal: new AbortController().signal,
        deadline: Date.now() + 10000,
        summarize: async (input) => ({
          goal: 'English grammar practice',
          userConstraints: [],
          englishContent: { examples: [], errorsAndCorrections: [] },
          keyTakeaways: ['Practice ongoing'],
          openQuestions: [],
          recentCorrections: [],
          sourceTurnIds: input.turns.map((t) => t.id),
        }),
      },
    );

    expect(result.prompt.evidence).toBeDefined();
    const evidence = result.prompt.evidence as Array<{ turnId: string; userContent: string; assistantReply: string }>;
    expect(evidence.some((e) => e.turnId === 'turn-old-rare-1')).toBe(true);
    const item = evidence.find((e) => e.turnId === 'turn-old-rare-1')!;
    expect(item.userContent).toContain('khuynh hướng duy mỹ');
  });

  it('3) no unrelatedevidence: turns with 0 actual hits never get attached as evidence via tie-breaker', async () => {
    for (let i = 1; i <= 8; i++) {
      insertTurn({
        id: `turn-vocab-${i}`,
        sequence: i,
        userContent: `Learning vocabulary words apple banana orange item ${i}`,
        assistantReply: `Definitions for fruits item ${i}`,
      });
    }

    const result = await prepareAiHistoryContext(
      db,
      { id: CONVERSATION_ID, generationToken: GENERATION_TOKEN, revision: 1, progressResetAt: null },
      { locale: 'vi', message: 'How do rocket engines work in space?', context: { screen: 'learn' } },
      {
        signal: new AbortController().signal,
        deadline: Date.now() + 10000,
      },
    );

    // No matching terms in older turns -> evidence must be undefined
    expect(result.prompt.evidence).toBeUndefined();
  });

  it('4) largebatchtotalinputbudget: budgets entire serialized summarizer request under byte caps and retains whole pairs', () => {
    const hugeTurns = Array.from({ length: 30 }, (_, idx) => ({
      id: `turn-huge-${idx}`,
      sequence: idx + 1,
      userContent: 'Very long question text '.repeat(80),
      assistantReply: 'Very long answer text '.repeat(80),
    }));

    const batch = budgetSummarizerBatch({
      previousSummary: null,
      turns: hugeTurns,
      systemPrompt: 'System summarizer prompt with standard instructions',
      maxBatchCount: 20,
    });

    // Entire serialized batch + system prompt must be bounded under 24000 bytes
    const testPayload = JSON.stringify({
      previousSummary: null,
      turns: batch.map((t) => ({ id: t.id, sequence: t.sequence, user: t.userContent, assistant: t.assistantReply })),
    });
    const measurement = measureSerializedPrompt('System summarizer prompt with standard instructions', testPayload);

    expect(measurement.bytes).toBeLessThanOrEqual(24000);
    expect(batch.length).toBeLessThan(20);
    expect(batch.length).toBeGreaterThan(0);
    // Every item retained must have complete userContent and assistantReply
    for (const item of batch) {
      expect(item.userContent.length).toBeGreaterThan(0);
      expect(item.assistantReply.length).toBeGreaterThan(0);
    }
  });

  ;

  ;

  ;

  ;
});
