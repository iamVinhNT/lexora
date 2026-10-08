/**
 * @file ai-settings.service.ts
 * @description Redacted AI configuration management and shared immutable request snapshots.
 */
import { randomUUID } from 'node:crypto';
import { AiSettingsRepository, type AiSettingsRecord } from '../repositories/ai-settings.repository.js';
import { aiProviderSettingsSchema, type AiProviderSettings, type AiSettingsMetadata, type SaveAiSettingsInput } from '../schemas/ai-settings.schema.js';
import { readAiConfig, type ResolvedAiConfig } from './ai-client.js';
import { AiSettingsCrypto, aiSettingsUnavailable } from './ai-settings-crypto.js';
import { AppError } from './vocabulary.service.js';

export class AiSettingsService {
  private environmentRevision = randomUUID();
  constructor(
    private readonly repository: AiSettingsRepository,
    private readonly crypto: AiSettingsCrypto,
    private readonly env: NodeJS.ProcessEnv = process.env,
  ) {}

  private provider(record: AiSettingsRecord): AiProviderSettings {
    try {
      const provider = aiProviderSettingsSchema.parse({ baseURL: record.base_url, models: JSON.parse(record.models_json), activeModel: record.active_model });
      if (!provider.models.includes(provider.activeModel) || !record.revision || !record.updated_at) throw aiSettingsUnavailable();
      return provider;
    } catch { throw aiSettingsUnavailable(); }
  }

  async getMetadata(): Promise<AiSettingsMetadata> {
    const record = this.repository.get();
    if (record) {
      const provider = this.provider(record);
      let isConfigured = true;
      try {
        const apiKey = await this.crypto.decrypt(record, provider);
        readAiConfig({ ...this.env, API_KEY: apiKey, BASE_URL: provider.baseURL, AI_MODEL: provider.activeModel });
      } catch (error) {
        if (!(error instanceof AppError)) throw error;
        isConfigured = false;
      }
      return { ...provider, hasApiKey: true, isConfigured, source: 'saved', revision: record.revision, updatedAt: record.updated_at };
    }
    let config;
    try { config = readAiConfig(this.env); } catch (error) { if (!(error instanceof AppError)) throw error; }
    return {
      baseURL: config?.baseURL ?? '', models: config ? [config.model] : [], activeModel: config?.model ?? '',
      hasApiKey: Boolean(this.env.API_KEY?.trim()), isConfigured: Boolean(config), source: 'environment', revision: this.environmentRevision, updatedAt: null,
    };
  }

  async resolve(): Promise<ResolvedAiConfig> {
    const record = this.repository.get();
    if (!record) return { config: readAiConfig(this.env), revision: this.environmentRevision };
    const provider = this.provider(record);
    const apiKey = await this.crypto.decrypt(record, provider);
    return { config: readAiConfig({ ...this.env, API_KEY: apiKey, BASE_URL: provider.baseURL, AI_MODEL: provider.activeModel }), revision: record.revision };
  }

  /** Offline generator still checks revision and saved-record integrity, without requiring an environment API key. */
  async resolveForGenerator(): Promise<ResolvedAiConfig> {
    if (this.repository.get()) return this.resolve();
    return {
      config: { apiKey: '', baseURL: '', model: '', timeoutMs: readAiConfig({ ...this.env, API_KEY: 'offline-test', BASE_URL: 'https://api.openai.com/v1', AI_MODEL: 'offline-test' }).timeoutMs },
      revision: this.environmentRevision,
    };
  }

  async save(input: SaveAiSettingsInput): Promise<AiSettingsMetadata> {
    const previous = this.repository.get();
    if (input.expectedRevision !== (previous?.revision ?? this.environmentRevision)) throw new AppError(409, 'CONFLICT', 'AI settings changed. Reload settings before saving.');
    const provider = { baseURL: input.baseURL, models: input.models, activeModel: input.activeModel };
    let apiKey = input.apiKey;
    readAiConfig({ ...this.env, API_KEY: 'validation-only', BASE_URL: provider.baseURL, AI_MODEL: provider.activeModel });
    if (!apiKey) {
      if (!previous || previous.base_url !== provider.baseURL) throw new AppError(400, 'AI_API_KEY_REQUIRED', 'Enter an API key for this endpoint.');
      apiKey = await this.crypto.decrypt(previous, this.provider(previous));
    }
    const encrypted = await this.crypto.encrypt(apiKey, provider);
    const now = new Date().toISOString();
    const record: AiSettingsRecord = {
      ...encrypted, base_url: provider.baseURL, models_json: JSON.stringify(provider.models), active_model: provider.activeModel,
      revision: randomUUID(), created_at: previous?.created_at ?? now, updated_at: now,
    };
    if (!previous && input.expectedRevision !== this.environmentRevision) throw new AppError(409, 'CONFLICT', 'AI settings changed. Reload settings before saving.');
    this.repository.save(record, previous?.revision);
    // Return this mutation's exact record, even if another process immediately writes a newer revision.
    return { ...provider, hasApiKey: true, isConfigured: true, source: 'saved', revision: record.revision, updatedAt: now };
  }

  async delete(expectedRevision: string): Promise<AiSettingsMetadata> {
    const previous = this.repository.get();
    if (expectedRevision !== (previous?.revision ?? this.environmentRevision)) throw new AppError(409, 'CONFLICT', 'AI settings changed. Reload settings before deleting.');
    this.repository.delete(previous?.revision);
    this.environmentRevision = randomUUID();
    return this.getMetadata();
  }
}
