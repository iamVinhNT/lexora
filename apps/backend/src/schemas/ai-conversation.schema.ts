/**
 * @file ai-conversation.schema.ts
 * @description Zod schemas and TypeScript types for persistent AI conversations, turns, and streaming.
 */
import { z } from 'zod';

export const aiAssistantScreenEnum = z.enum([
  'overview',
  'learn',
  'review',
  'vocabulary',
  'calendar',
  'grammar',
  'contexts',
  'statistics',
  'settings',
]);
export type AiAssistantScreen = z.infer<typeof aiAssistantScreenEnum>;

export const aiAssistantContextSchema = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('general'),
  }).strict(),
  z.object({
    kind: z.literal('screen'),
    screen: aiAssistantScreenEnum,
  }).strict(),
]);
export type AiAssistantContextDescriptor = z.infer<typeof aiAssistantContextSchema>;

export const aiAssistantConversationSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(500),
  context: aiAssistantContextSchema,
  locale: z.enum(['vi', 'en']),
  includeContent: z.boolean(),
  includeProgress: z.boolean(),
  baseURL: z.string(),
  model: z.string(),
  revision: z.number().int().min(0),
  createdAt: z.string(),
  updatedAt: z.string(),
  progressResetAt: z.string().nullable(),
}).strict();
export type AiAssistantConversation = z.infer<typeof aiAssistantConversationSchema>;

export const aiAssistantTurnStatusEnum = z.enum([
  'PENDING',
  'COMPLETED',
  'FAILED',
  'CANCELLED',
]);
export type AiAssistantTurnStatus = z.infer<typeof aiAssistantTurnStatusEnum>;

export const aiAssistantTurnSchema = z.object({
  id: z.string().uuid(),
  requestId: z.string().uuid(),
  sequence: z.number().int().min(1),
  userContent: z.string(),
  assistantReply: z.string().nullable(),
  status: aiAssistantTurnStatusEnum,
  errorCode: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
}).strict();
export type AiAssistantTurn = z.infer<typeof aiAssistantTurnSchema>;

export const createAiConversationSchema = z.object({
  context: aiAssistantContextSchema,
  locale: z.enum(['vi', 'en']),
  includeContent: z.boolean().default(true),
  includeProgress: z.boolean().default(false),
  configRevision: z.string().min(1).max(200),
}).strict();
export type CreateAiConversationInput = z.infer<typeof createAiConversationSchema>;

export const listAiConversationsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});
export type ListAiConversationsQuery = z.infer<typeof listAiConversationsQuerySchema>;

export const listAiConversationsResponseSchema = z.object({
  items: z.array(aiAssistantConversationSchema),
  total: z.number().int().min(0),
  limit: z.number().int().min(1),
  offset: z.number().int().min(0),
}).strict();
export type ListAiConversationsResponse = z.infer<typeof listAiConversationsResponseSchema>;

export const getAiConversationQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(40),
  beforeSequence: z.coerce.number().int().min(1).optional(),
});
export type GetAiConversationQuery = z.infer<typeof getAiConversationQuerySchema>;

export const getAiConversationResponseSchema = z.object({
  conversation: aiAssistantConversationSchema,
  items: z.array(aiAssistantTurnSchema),
  hasMore: z.boolean(),
  beforeSequence: z.number().int().nullable(),
}).strict();
export type GetAiConversationResponse = z.infer<typeof getAiConversationResponseSchema>;

export const deleteAiConversationSchema = z.object({
  expectedConversationRevision: z.number().int().min(0),
}).strict();
export type DeleteAiConversationInput = z.infer<typeof deleteAiConversationSchema>;

export const deleteAiConversationResponseSchema = z.object({
  deleted: z.literal(true),
}).strict();
export type DeleteAiConversationResponse = z.infer<typeof deleteAiConversationResponseSchema>;

export const aiAssistantChatRequestSchema = z.object({
  conversationId: z.string().uuid(),
  requestId: z.string().uuid(),
  expectedConversationRevision: z.number().int().min(0),
  allowProviderChange: z.boolean().optional(),
  configRevision: z.string().min(1).max(200),
  message: z.string().trim().min(1).max(2000),
  locale: z.enum(['vi', 'en']),
  context: aiAssistantContextSchema,
  includeContent: z.boolean().default(true),
  includeProgress: z.boolean().default(false),
}).strict();
export type AiAssistantChatRequest = z.infer<typeof aiAssistantChatRequestSchema>;

export const aiAssistantMemoryModeEnum = z.enum(['full', 'compacted', 'limited']);
export type AiAssistantMemoryMode = z.infer<typeof aiAssistantMemoryModeEnum>;

export interface AiAssistantSseMeta {
  success: true;
  data: {
    conversationId: string;
    requestId: string;
    conversationRevision: number;
    memoryMode: AiAssistantMemoryMode;
    configRevision: string;
    context: {
      kind: string;
      label: string;
    };
  };
}

export interface AiAssistantSseDelta {
  success: true;
  data: {
    text: string;
  };
}

export interface AiAssistantSseDone {
  success: true;
  data: {
    reply: string;
    conversationId: string;
    requestId: string;
    conversationRevision: number;
    memoryMode: AiAssistantMemoryMode;
    configRevision: string;
    context: {
      kind: string;
      label: string;
    };
  };
}

export interface AiAssistantSseError {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

export type AiAssistantSseEvent =
  | { event: 'meta'; data: AiAssistantSseMeta }
  | { event: 'delta'; data: AiAssistantSseDelta }
  | { event: 'done'; data: AiAssistantSseDone }
  | { event: 'error'; data: AiAssistantSseError };
