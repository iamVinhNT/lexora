/**
 * @file ai-settings.repository.ts
 * @description Singleton encrypted AI settings persistence with atomic revision compare-and-swap.
 */
import type Database from 'better-sqlite3';
import { AppError } from '../services/vocabulary.service.js';

export interface AiSettingsRecord {
  base_url: string;
  models_json: string;
  active_model: string;
  api_key_ciphertext: string;
  api_key_nonce: string;
  api_key_tag: string;
  crypto_version: number;
  revision: string;
  created_at: string;
  updated_at: string;
}
export class AiSettingsRepository {
  constructor(private readonly sqlite: Database.Database) {}

  get(): AiSettingsRecord | undefined {
    return this.sqlite.prepare("SELECT base_url, models_json, active_model, api_key_ciphertext, api_key_nonce, api_key_tag, crypto_version, revision, created_at, updated_at FROM ai_settings WHERE id = 'current'").get() as AiSettingsRecord | undefined;
  }

  save(record: AiSettingsRecord, previousRevision: string | undefined): void {
    this.sqlite.transaction(() => {
      if (this.get()?.revision !== previousRevision) throw new AppError(409, 'CONFLICT', 'AI settings changed. Reload settings before saving.');
      this.sqlite.prepare(`INSERT INTO ai_settings (id, base_url, models_json, active_model, api_key_ciphertext, api_key_nonce, api_key_tag, crypto_version, revision, created_at, updated_at)
        VALUES ('current', @base_url, @models_json, @active_model, @api_key_ciphertext, @api_key_nonce, @api_key_tag, @crypto_version, @revision, @created_at, @updated_at)
        ON CONFLICT(id) DO UPDATE SET base_url=excluded.base_url, models_json=excluded.models_json, active_model=excluded.active_model,
          api_key_ciphertext=excluded.api_key_ciphertext, api_key_nonce=excluded.api_key_nonce, api_key_tag=excluded.api_key_tag,
          crypto_version=excluded.crypto_version, revision=excluded.revision, updated_at=excluded.updated_at`).run(record);
    }).immediate();
  }

  delete(previousRevision: string | undefined): void {
    this.sqlite.transaction(() => {
      if (this.get()?.revision !== previousRevision) throw new AppError(409, 'CONFLICT', 'AI settings changed. Reload settings before deleting.');
      this.sqlite.prepare("DELETE FROM ai_settings WHERE id = 'current'").run();
    }).immediate();
  }
}
