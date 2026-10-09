/**
 * @file ai-history-backup-validation.test.ts
 * @description Unit tests for relational constraints, sequence integrity, and status validation in AI backup schemas.
 */
import { describe, expect, it } from 'vitest';
import type { z } from 'zod';
import {
  aiConversationRowSchema,
  aiConversationTurnRowSchema,
  validateAiHistoryRelations,
} from '../../src/schemas/ai-history-backup.schema.js';
import {
  sampleConversation,
  sampleCompletedTurn,
  sampleCompletedTurn2,
  samplePendingTurn,
} from './ai-history-backup.fixtures.js';

function createMockCtx(): { ctx: z.RefinementCtx; issues: z.IssueData[] } {
  const issues: z.IssueData[] = [];
  const ctx = {
    addIssue: (issue: z.IssueData) => {
      issues.push(issue);
    },
    path: [],
  } as unknown as z.RefinementCtx;
  return { ctx, issues };
}

describe('AI history backup validation', () => {
  it('accepts valid conversations and contiguous turns', () => {
    const { ctx, issues } = createMockCtx();

    validateAiHistoryRelations(
      {
        aiConversations: [sampleConversation],
        aiConversationTurns: [sampleCompletedTurn, sampleCompletedTurn2],
      },
      ctx,
    );

    expect(issues).toHaveLength(0);
  });

  it('rejects duplicate conversation IDs', () => {
    const { ctx, issues } = createMockCtx();

    validateAiHistoryRelations(
      {
        aiConversations: [sampleConversation, { ...sampleConversation }],
        aiConversationTurns: [],
      },
      ctx,
    );

    expect(issues).toHaveLength(1);
    expect(issues[0].message).toMatch(/Duplicate conversation ID/i);
  });

  it('rejects turn referencing non-existent conversation', () => {
    const { ctx, issues } = createMockCtx();

    validateAiHistoryRelations(
      {
        aiConversations: [sampleConversation],
        aiConversationTurns: [
          {
            ...sampleCompletedTurn,
            conversationId: '99999999-9999-4999-8999-999999999999',
          },
        ],
      },
      ctx,
    );

    expect(issues).toHaveLength(1);
    expect(issues[0].message).toMatch(/non-existent conversation/i);
  });

  it('rejects duplicate turn IDs', () => {
    const { ctx, issues } = createMockCtx();

    validateAiHistoryRelations(
      {
        aiConversations: [sampleConversation],
        aiConversationTurns: [
          sampleCompletedTurn,
          {
            ...sampleCompletedTurn2,
            id: sampleCompletedTurn.id, // duplicate turn id
          },
        ],
      },
      ctx,
    );

    expect(issues.some((i) => i.message?.includes('Duplicate turn ID'))).toBe(true);
  });

  it('rejects duplicate turn request IDs', () => {
    const { ctx, issues } = createMockCtx();

    validateAiHistoryRelations(
      {
        aiConversations: [sampleConversation],
        aiConversationTurns: [
          sampleCompletedTurn,
          {
            ...sampleCompletedTurn2,
            requestId: sampleCompletedTurn.requestId, // duplicate request id
          },
        ],
      },
      ctx,
    );

    expect(issues.some((i) => i.message?.includes('Duplicate turn request ID'))).toBe(true);
  });

  it('rejects duplicate turn sequence in the same conversation', () => {
    const { ctx, issues } = createMockCtx();

    validateAiHistoryRelations(
      {
        aiConversations: [sampleConversation],
        aiConversationTurns: [
          sampleCompletedTurn, // sequence 1
          {
            ...sampleCompletedTurn2,
            sequence: 1, // duplicate sequence 1
          },
        ],
      },
      ctx,
    );

    expect(issues.some((i) => i.message?.includes('Duplicate turn sequence'))).toBe(true);
  });

  it('rejects sequence gaps (non-contiguous sequences starting at 1)', () => {
    const { ctx, issues } = createMockCtx();

    validateAiHistoryRelations(
      {
        aiConversations: [sampleConversation],
        aiConversationTurns: [
          sampleCompletedTurn, // sequence 1
          {
            ...sampleCompletedTurn2,
            sequence: 3, // gap: expected 2, got 3
          },
        ],
      },
      ctx,
    );

    expect(issues.some((i) => i.message?.includes('Turn sequence gap'))).toBe(true);
  });

  it('rejects completed turn with null assistantReply', () => {
    expect(() => {
      aiConversationTurnRowSchema.parse({
        ...sampleCompletedTurn,
        status: 'COMPLETED',
        assistantReply: null,
      });
    }).toThrow(/assistantReply/i);
  });

  it('rejects pending turn with non-null assistantReply', () => {
    expect(() => {
      aiConversationTurnRowSchema.parse({
        ...samplePendingTurn,
        status: 'PENDING',
        assistantReply: 'Premature assistant reply',
      });
    }).toThrow(/assistantReply/i);
  });
  it('rejects failed turn with non-null assistantReply', () => {
    expect(() => {
      aiConversationTurnRowSchema.parse({
        ...sampleCompletedTurn,
        status: 'FAILED',
        assistantReply: 'Should not have reply on failure',
        errorCode: 'TIMEOUT',
      });
    }).toThrow(/assistantReply/i);
  });

  it('rejects completed turn with whitespace-only assistantReply', () => {
    expect(() => {
      aiConversationTurnRowSchema.parse({
        ...sampleCompletedTurn,
        status: 'COMPLETED',
        assistantReply: '   ',
      });
    }).toThrow(/assistantReply/i);
  });

  it('validates canonical contextScreen for screen contextKind', () => {
    expect(() => {
      aiConversationRowSchema.parse({
        ...sampleConversation,
        contextKind: 'screen',
        contextScreen: 'invalid-non-canonical-screen',
      });
    }).toThrow(/canonical screen name/i);
  });

  it('accepts general contextKind with empty contextScreen', () => {
    const parsed = aiConversationRowSchema.parse({
      ...sampleConversation,
      contextKind: 'general',
      contextScreen: '',
    });
    expect(parsed.contextKind).toBe('general');
    expect(parsed.contextScreen).toBe('');
  });

  it('rejects unsafe baseUrl protocol', () => {
    expect(() => {
      aiConversationRowSchema.parse({
        ...sampleConversation,
        baseUrl: 'ftp://insecure-host/v1',
      });
    }).toThrow(/valid http or https URL/i);
  });

  it('rejects non-UUID conversation ID', () => {
    expect(() => {
      aiConversationRowSchema.parse({
        ...sampleConversation,
        id: 'not-a-uuid',
      });
    }).toThrow(/Invalid uuid/i);
  });

  it('rejects non-UUID turn ID', () => {
    expect(() => {
      aiConversationTurnRowSchema.parse({
        ...sampleCompletedTurn,
        id: 'not-a-uuid',
      });
    }).toThrow(/Invalid uuid/i);
  });

  it('rejects non-UUID turn conversationId', () => {
    expect(() => {
      aiConversationTurnRowSchema.parse({
        ...sampleCompletedTurn,
        conversationId: 'not-a-uuid',
      });
    }).toThrow(/Invalid uuid/i);
  });

  it('rejects non-UUID turn requestId', () => {
    expect(() => {
      aiConversationTurnRowSchema.parse({
        ...sampleCompletedTurn,
        requestId: 'not-a-uuid',
      });
    }).toThrow(/Invalid uuid/i);
  });
});
