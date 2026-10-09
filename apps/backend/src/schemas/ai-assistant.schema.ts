/**
 * @file ai-assistant.schema.ts
 * @description Request, response, and model schemas for the cross-application AI assistant.
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

export const aiAssistantHistoryItemSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().trim().min(1).max(4000),
}).strict();
export type AiAssistantHistoryItem = z.infer<typeof aiAssistantHistoryItemSchema>;

export const aiAssistantChatRequestSchema = z.object({
  configRevision: z.string().min(1).max(200),
  message: z.string().trim().min(1).max(2000),
  locale: z.enum(['vi', 'en']),
  context: aiAssistantContextSchema,
  includeContent: z.boolean().default(true),
  includeProgress: z.boolean().default(false),
  history: z
    .array(aiAssistantHistoryItemSchema)
    .max(8)
    .optional()
    .refine(
      (items) => !items || items.reduce((sum, item) => sum + item.content.length, 0) <= 16000,
      { message: 'History total content must not exceed 16000 characters' },
    ),
}).strict();
export type AiAssistantChatRequest = z.infer<typeof aiAssistantChatRequestSchema>;

// Validate our extracted text envelope locally; conversational providers need no JSON Schema.
export const aiAssistantModelOutputSchema = z.object({
  reply: z.string().min(1).max(4000),
}).strict();
export type AiAssistantModelOutput = z.infer<typeof aiAssistantModelOutputSchema>;

export const aiAssistantChatResponseSchema = z.object({
  configRevision: z.string().min(1).max(200),
  reply: z.string().trim().min(1).max(4000),
  context: z.object({
    kind: z.string(),
    label: z.string(),
  }).strict(),
}).strict();
export type AiAssistantChatResponse = z.infer<typeof aiAssistantChatResponseSchema>;

export interface AiAssistantSseMeta {
  success: true;
  data: {
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
