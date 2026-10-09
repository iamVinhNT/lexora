/**
 * @file ai-history-backup.schema.ts
 * @description Validates AI conversation and turn backup rows, monotonic sequence integrity, and referential constraints.
 */
import { z } from 'zod';

const timestampSchema = z
  .string()
  .datetime({ offset: true })
  .transform((value) => new Date(value).toISOString());

export const canonicalScreenEnum = z.enum([
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

const safeUrlSchema = z
  .string()
  .min(1)
  .max(2000)
  .refine((val) => {
    try {
      const url = new URL(val);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  }, 'Base URL must be a valid http or https URL');

export const aiTurnStatusEnum = z.enum(['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED']);

export const aiConversationRowSchema = z
  .object({
    id: z.string().uuid(),
    title: z.string().trim().min(1).max(500),
    contextKind: z.enum(['general', 'screen']),
    contextScreen: z.string().max(100),
    locale: z.enum(['vi', 'en']),
    includeContent: z.boolean(),
    includeProgress: z.boolean(),
    baseUrl: safeUrlSchema,
    model: z.string().trim().min(1).max(200),
    revision: z.number().int().nonnegative(),
    generationToken: z.string().min(1).max(200),
    createdAt: timestampSchema,
    updatedAt: timestampSchema,
    progressResetAt: timestampSchema.nullable(),
  })
  .strict()
  .superRefine((val, ctx) => {
    if (val.contextKind === 'screen') {
      const parsed = canonicalScreenEnum.safeParse(val.contextScreen);
      if (!parsed.success) {
        ctx.addIssue({
          code: 'custom',
          message: `Invalid contextScreen: "${val.contextScreen}". Expected canonical screen name.`,
          path: ['contextScreen'],
        });
      }
    } else if (val.contextKind === 'general') {
      if (val.contextScreen !== '' && val.contextScreen !== 'general') {
        ctx.addIssue({
          code: 'custom',
          message: `contextScreen for 'general' contextKind must be empty or 'general'`,
          path: ['contextScreen'],
        });
      }
    }
  });

export type AiConversationRow = z.infer<typeof aiConversationRowSchema>;

export const aiConversationTurnRowSchema = z
  .object({
    id: z.string().uuid(),
    conversationId: z.string().uuid(),
    requestId: z.string().uuid(),
    requestFingerprint: z.string().min(1).max(200),
    sequence: z.number().int().positive(),
    userContent: z.string().trim().min(1).max(4000),
    assistantReply: z.string().nullable(),
    status: aiTurnStatusEnum,
    errorCode: z.string().max(100).nullable(),
    processId: z.string().max(200).nullable().optional(),
    createdAt: timestampSchema,
    updatedAt: timestampSchema,
  })
  .strict()
  .superRefine((val, ctx) => {
    if (val.status === 'COMPLETED') {
      if (val.assistantReply === null || val.assistantReply.trim().length === 0 || val.assistantReply.length > 4000) {
        ctx.addIssue({
          code: 'custom',
          message: 'Completed turn must have non-blank assistantReply up to 4000 characters',
          path: ['assistantReply'],
        });
      }
    } else {
      if (val.assistantReply !== null) {
        ctx.addIssue({
          code: 'custom',
          message: `${val.status} turn must have null assistantReply`,
          path: ['assistantReply'],
        });
      }
    }
  });

export type AiConversationTurnRow = z.infer<typeof aiConversationTurnRowSchema>;

export type AiHistoryBackupData = {
  aiConversations: AiConversationRow[];
  aiConversationTurns: AiConversationTurnRow[];
};

export function validateAiHistoryRelations(
  data: {
    aiConversations?: AiConversationRow[];
    aiConversationTurns?: AiConversationTurnRow[];
  },
  ctx: z.RefinementCtx,
): void {
  const conversations = data.aiConversations ?? [];
  const turns = data.aiConversationTurns ?? [];

  const convIds = new Set<string>();
  for (const [idx, conv] of conversations.entries()) {
    if (convIds.has(conv.id)) {
      ctx.addIssue({
        code: 'custom',
        message: `Duplicate conversation ID: ${conv.id}`,
        path: ['aiConversations', idx, 'id'],
      });
    }
    convIds.add(conv.id);
  }

  const turnIds = new Set<string>();
  const requestIds = new Set<string>();
  const turnsByConv = new Map<string, Array<{ sequence: number; index: number }>>();

  for (const [idx, turn] of turns.entries()) {
    if (turnIds.has(turn.id)) {
      ctx.addIssue({
        code: 'custom',
        message: `Duplicate turn ID: ${turn.id}`,
        path: ['aiConversationTurns', idx, 'id'],
      });
    }
    turnIds.add(turn.id);

    if (requestIds.has(turn.requestId)) {
      ctx.addIssue({
        code: 'custom',
        message: `Duplicate turn request ID: ${turn.requestId}`,
        path: ['aiConversationTurns', idx, 'requestId'],
      });
    }
    requestIds.add(turn.requestId);

    if (!convIds.has(turn.conversationId)) {
      ctx.addIssue({
        code: 'custom',
        message: `Turn references non-existent conversation: ${turn.conversationId}`,
        path: ['aiConversationTurns', idx, 'conversationId'],
      });
    } else {
      const list = turnsByConv.get(turn.conversationId) ?? [];
      list.push({ sequence: turn.sequence, index: idx });
      turnsByConv.set(turn.conversationId, list);
    }
  }

  for (const [convId, list] of turnsByConv.entries()) {
    list.sort((a, b) => a.sequence - b.sequence);
    const seenSeq = new Set<number>();
    for (const item of list) {
      if (seenSeq.has(item.sequence)) {
        ctx.addIssue({
          code: 'custom',
          message: `Duplicate turn sequence ${item.sequence} in conversation ${convId}`,
          path: ['aiConversationTurns', item.index, 'sequence'],
        });
      }
      seenSeq.add(item.sequence);
    }

    for (let i = 0; i < list.length; i++) {
      if (list[i].sequence !== i + 1) {
        ctx.addIssue({
          code: 'custom',
          message: `Turn sequence gap or non-contiguous index in conversation ${convId}: expected ${i + 1}, got ${list[i].sequence}`,
          path: ['aiConversationTurns', list[i].index, 'sequence'],
        });
        break;
      }
    }
  }
}
