/**
 * @file ai-settings.schema.ts
 * @description Public AI settings contracts and credential-free provider metadata validation.
 */
import { z } from 'zod';
import { normalizeAiBaseURL } from '../services/ai-client.js';

export const aiProviderSettingsSchema = z.object({
  baseURL: z.string().trim().min(1).max(2048).transform((value, ctx) => {
    try { return normalizeAiBaseURL(value); }
    catch { ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Use HTTPS or a loopback HTTP endpoint without credentials, query or fragment' }); return z.NEVER; }
  }),
  models: z.array(z.string().trim().min(1).max(200)).min(1).max(20)
    .refine(models => new Set(models).size === models.length, 'Model names must be distinct'),
  activeModel: z.string().trim().min(1).max(200),
}).strict();
export const saveAiSettingsSchema = aiProviderSettingsSchema.extend({
  apiKey: z.string().trim().min(1).max(4096).optional(),
  expectedRevision: z.string().min(1).max(200),
}).refine(input => input.models.includes(input.activeModel), 'Active model must belong to model list');
export const deleteAiSettingsSchema = z.object({ expectedRevision: z.string().min(1).max(200) }).strict();
export type AiProviderSettings = z.infer<typeof aiProviderSettingsSchema>;
export type SaveAiSettingsInput = z.infer<typeof saveAiSettingsSchema>;
export interface AiSettingsMetadata extends AiProviderSettings {
  hasApiKey: boolean;
  isConfigured: boolean;
  source: 'environment' | 'saved';
  revision: string;
  updatedAt: string | null;
}
