/**
 * @file ai-settings.api.ts
 * @description Public, credential-redacted AI settings contracts and local API transport.
 */
import { apiFetch } from './client';

export interface AiSettingsMetadata {
  baseURL: string;
  models: string[];
  activeModel: string;
  hasApiKey: boolean;
  isConfigured: boolean;
  source: 'environment' | 'saved';
  revision: string;
  updatedAt: string | null;
}

export interface SaveAiSettingsInput {
  baseURL: string;
  models: string[];
  activeModel: string;
  apiKey?: string;
  expectedRevision: string;
}

export interface DeleteAiSettingsInput {
  expectedRevision: string;
}

export function getAiSettings(signal?: AbortSignal) {
  return apiFetch<AiSettingsMetadata>('/api/ai/settings', { signal });
}

export function saveAiSettings(input: SaveAiSettingsInput) {
  return apiFetch<AiSettingsMetadata>('/api/ai/settings', { method: 'PUT', body: input });
}

export function deleteAiSettings(input: DeleteAiSettingsInput) {
  return apiFetch<AiSettingsMetadata>('/api/ai/settings', { method: 'DELETE', body: input });
}
