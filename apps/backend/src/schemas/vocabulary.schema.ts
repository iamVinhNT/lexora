import { z } from 'zod';

export const collocationItemSchema = z.union([
  z.string().min(1),
  z.object({
    phrase: z.string().min(1),
  }),
]);

export const exampleItemSchema = z.union([
  z.string().min(1),
  z.object({
    sentence: z.string().min(1),
    translation: z.string().optional().nullable(),
    source: z.string().optional().nullable(),
  }),
]);

export const wordFamilyItemSchema = z.object({
  relatedWordId: z.string().min(1, 'relatedWordId is required'),
  relationship: z.string().min(1, 'relationship is required'),
});

export const createWordSchema = z.object({
  word: z.string().min(1, 'Word is required'),
  phonetic: z.string().optional().nullable(),
  partOfSpeech: z.string().optional().nullable(),
  definition: z.string().min(1, 'Definition is required'),
  translation: z.string().optional().nullable(),
  difficulty: z.string().optional().nullable(),
  collocations: z.array(collocationItemSchema).optional(),
  examples: z.array(exampleItemSchema).optional(),
  tags: z.array(z.string().min(1)).optional(),
  wordFamilies: z.array(wordFamilyItemSchema).optional(),
});

export const updateWordSchema = z.object({
  word: z.string().min(1).optional(),
  phonetic: z.string().optional().nullable(),
  partOfSpeech: z.string().optional().nullable(),
  definition: z.string().min(1).optional(),
  translation: z.string().optional().nullable(),
  difficulty: z.string().optional().nullable(),
  collocations: z.array(collocationItemSchema).optional(),
  examples: z.array(exampleItemSchema).optional(),
  tags: z.array(z.string().min(1)).optional(),
  wordFamilies: z.array(wordFamilyItemSchema).optional(),
});

export const queryWordsSchema = z.object({
  search: z.string().optional(),
  difficulty: z.string().optional(),
  status: z.string().optional(),
  tag: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type WordFamilyItem = z.infer<typeof wordFamilyItemSchema>;
export type CreateWord = z.infer<typeof createWordSchema>;
export type UpdateWord = z.infer<typeof updateWordSchema>;
export type QueryWords = z.infer<typeof queryWordsSchema>;
