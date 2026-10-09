/**
 * @file ai-history-backup.fixtures.ts
 * @description Test fixtures and DDL helper for AI conversation backup/restore/reset tests.
 */
import type Database from 'better-sqlite3';
import type { AiConversationRow, AiConversationTurnRow } from '../../src/schemas/ai-history-backup.schema.js';
import { createAiConversationTables } from '../../src/db/ai-conversation-tables.js';

export function ensureAiConversationTables(sqlite: Database.Database): void {
  createAiConversationTables(sqlite);
}

export const CONV_ID_1 = '11111111-1111-4111-8111-111111111111';
export const CONV_ID_2 = '22222222-2222-4222-8222-222222222222';
export const TURN_ID_1 = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
export const TURN_ID_2 = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
export const TURN_ID_3 = 'cccccccc-cccc-4ccc-8ccc-cccccccccccc';
export const REQ_ID_1 = '10000000-0000-4000-8000-000000000001';
export const REQ_ID_2 = '10000000-0000-4000-8000-000000000002';
export const REQ_ID_3 = '10000000-0000-4000-8000-000000000003';

export const sampleConversation: AiConversationRow = {
  id: CONV_ID_1,
  title: 'English Phrasal Verbs Discussion',
  contextKind: 'screen',
  contextScreen: 'learn',
  locale: 'en',
  includeContent: true,
  includeProgress: true,
  baseUrl: 'https://api.openai.com/v1',
  model: 'gpt-4o-mini',
  revision: 1,
  generationToken: 'gen-token-001',
  createdAt: '2026-10-09T04:00:00.000Z',
  updatedAt: '2026-10-09T04:10:00.000Z',
  progressResetAt: null,
};

export const sampleConversation2: AiConversationRow = {
  id: CONV_ID_2,
  title: 'Grammar practice questions',
  contextKind: 'screen',
  contextScreen: 'grammar',
  locale: 'vi',
  includeContent: true,
  includeProgress: false,
  baseUrl: 'https://api.openai.com/v1',
  model: 'gpt-4o-mini',
  revision: 2,
  generationToken: 'gen-token-002',
  createdAt: '2026-10-09T04:30:00.000Z',
  updatedAt: '2026-10-09T04:35:00.000Z',
  progressResetAt: null,
};

export const sampleCompletedTurn: AiConversationTurnRow = {
  id: TURN_ID_1,
  conversationId: CONV_ID_1,
  requestId: REQ_ID_1,
  requestFingerprint: 'fp-001',
  sequence: 1,
  userContent: 'What does serendipity mean?',
  assistantReply: 'Serendipity means finding valuable things unexpectedly.',
  status: 'COMPLETED',
  errorCode: null,
  processId: 'p-1',
  createdAt: '2026-10-09T04:00:00.000Z',
  updatedAt: '2026-10-09T04:01:00.000Z',
};

export const sampleCompletedTurn2: AiConversationTurnRow = {
  id: TURN_ID_2,
  conversationId: CONV_ID_1,
  requestId: REQ_ID_2,
  requestFingerprint: 'fp-002',
  sequence: 2,
  userContent: 'Can you give an example sentence?',
  assistantReply: 'Finding this book was pure serendipity.',
  status: 'COMPLETED',
  errorCode: null,
  processId: 'p-1',
  createdAt: '2026-10-09T04:02:00.000Z',
  updatedAt: '2026-10-09T04:03:00.000Z',
};

export const samplePendingTurn: AiConversationTurnRow = {
  id: TURN_ID_3,
  conversationId: CONV_ID_1,
  requestId: REQ_ID_3,
  requestFingerprint: 'fp-003',
  sequence: 3,
  userContent: 'Give another example',
  assistantReply: null,
  status: 'PENDING',
  errorCode: null,
  processId: 'p-1',
  createdAt: '2026-10-09T04:04:00.000Z',
  updatedAt: '2026-10-09T04:04:00.000Z',
};
