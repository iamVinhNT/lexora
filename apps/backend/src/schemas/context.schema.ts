import { z } from 'zod';

export const ContextSourceTypeEnum = z.enum([
  'READING',
  'LISTENING',
  'CONVERSATION',
  'BOOK',
  'ARTICLE',
  'YOUTUBE',
  'WORK',
  'PERSONAL',
  'MANUAL',
]);

export type ContextSourceType = z.infer<typeof ContextSourceTypeEnum>;

export const contextSourceTypeSchema = z.preprocess(
  (val) => (typeof val === 'string' ? val.trim().toUpperCase() : val),
  ContextSourceTypeEnum
);

export const createContextSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  content: z.string().trim().min(1, 'Content is required'),
  sourceType: contextSourceTypeSchema,
  sourceUrl: z.string().optional().nullable(),
  wordIds: z.array(z.string().uuid('Each word ID must be a valid UUID')).optional(),
});

export const updateContextSchema = createContextSchema.omit({ wordIds: true }).partial();

export const queryContextsSchema = z.object({
  search: z.string().optional(),
  sourceType: z
    .preprocess(
      (val) => (typeof val === 'string' && val.trim() !== '' ? val.trim().toUpperCase() : undefined),
      ContextSourceTypeEnum.optional()
    ),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const linkWordsSchema = z.object({
  wordIds: z.array(z.string().uuid('Each word ID must be a valid UUID')),
});

export type CreateContext = z.infer<typeof createContextSchema>;
export type UpdateContext = z.infer<typeof updateContextSchema>;
export type QueryContexts = z.infer<typeof queryContextsSchema>;
export type LinkWords = z.infer<typeof linkWordsSchema>;
