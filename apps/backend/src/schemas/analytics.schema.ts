/**
 * @file analytics.schema.ts
 * @description Zod validation schemas for vocabulary knowledge progress and analytics queries.
 */

import { z } from 'zod';

export const queryTrendsSchema = z.object({
  days: z.coerce
    .number()
    .int('days must be an integer')
    .min(1, 'days must be at least 1')
    .max(90, 'days cannot exceed 90')
    .default(30),
});

export const queryWeakWordsSchema = z.object({
  page: z.coerce
    .number()
    .int('page must be an integer')
    .min(1, 'page must be at least 1')
    .default(1),
  limit: z.coerce
    .number()
    .int('limit must be an integer')
    .min(1, 'limit must be at least 1')
    .max(100, 'limit cannot exceed 100')
    .default(20),
});

export const queryMasteredWordsSchema = z.object({
  page: z.coerce
    .number()
    .int('page must be an integer')
    .min(1, 'page must be at least 1')
    .default(1),
  limit: z.coerce
    .number()
    .int('limit must be an integer')
    .min(1, 'limit must be at least 1')
    .max(100, 'limit cannot exceed 100')
    .default(20),
});

export type QueryTrendsInput = z.infer<typeof queryTrendsSchema>;
export type QueryWeakWordsInput = z.infer<typeof queryWeakWordsSchema>;
export type QueryMasteredWordsInput = z.infer<typeof queryMasteredWordsSchema>;
