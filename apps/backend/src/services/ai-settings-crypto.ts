/**
 * @file ai-settings-crypto.ts
 * @description AES-GCM credentials and safely published per-user master keys outside learner storage.
 */
import { createCipheriv, createDecipheriv, randomBytes, randomUUID } from 'node:crypto';
import { constants, type Stats } from 'node:fs';
import { link, lstat, mkdir, open, realpath, unlink } from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import type { AiProviderSettings } from '../schemas/ai-settings.schema.js';
import type { AiSettingsRecord } from '../repositories/ai-settings.repository.js';
import { AppError } from './vocabulary.service.js';

export const AI_SETTINGS_CRYPTO_VERSION = 1;
export function aiSettingsUnavailable(): AppError {
  return new AppError(503, 'AI_SETTINGS_UNAVAILABLE', 'Saved AI settings are unavailable. Enter a new API key or delete saved settings.');
}

function checkProtected(stats: Stats, directory: boolean): void {
  if ((directory ? !stats.isDirectory() : !stats.isFile()) || stats.isSymbolicLink()
    || (process.getuid && stats.uid !== process.getuid())
    || (stats.mode & 0o7777) !== (directory ? 0o700 : 0o600)) throw aiSettingsUnavailable();
}

export class AiSettingsCrypto {
  private readonly memoryKey: Buffer | undefined;
  private readonly keyPath: string;
  constructor(memory: boolean, keyPath?: string) {
    this.memoryKey = memory ? randomBytes(32) : undefined;
    this.keyPath = resolve(keyPath ?? join(homedir(), '.lexora', 'security', 'ai-settings.key'));
  }

  private async masterKey(create: boolean): Promise<Buffer> {
    if (this.memoryKey) return this.memoryKey;
    const directory = dirname(this.keyPath);
    try {
      if (create) await mkdir(directory, { recursive: true, mode: 0o700 });
      checkProtected(await lstat(directory), true);
      if (await realpath(directory) !== directory) throw aiSettingsUnavailable();
      try { return await this.readKey(); }
      catch (error) {
        if (!create || (error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
      }
      const temporary = join(directory, `.ai-settings-${process.pid}-${randomUUID()}.tmp`);
      const file = await open(temporary, constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | constants.O_NOFOLLOW, 0o600);
      try {
        checkProtected(await file.stat(), false);
        await file.writeFile(randomBytes(32));
        await file.sync();
        await file.close();
        try { await link(temporary, this.keyPath); }
        catch (error) { if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error; }
        const dirHandle = await open(directory, constants.O_RDONLY | constants.O_DIRECTORY | constants.O_NOFOLLOW);
        try { await dirHandle.sync(); } finally { await dirHandle.close(); }
      } finally {
        await file.close();
        await unlink(temporary);
      }
      return await this.readKey();
    } catch { throw aiSettingsUnavailable(); }
  }

  private async readKey(): Promise<Buffer> {
    const file = await open(this.keyPath, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
    try {
      const stats = await file.stat();
      checkProtected(stats, false);
      if (stats.size !== 32) throw aiSettingsUnavailable();
      const key = await file.readFile();
      if (key.length !== 32) throw aiSettingsUnavailable();
      return key;
    } finally { await file.close(); }
  }

  async encrypt(apiKey: string, provider: AiProviderSettings): Promise<Pick<AiSettingsRecord, 'api_key_ciphertext' | 'api_key_nonce' | 'api_key_tag' | 'crypto_version'>> {
    const key = await this.masterKey(true);
    const nonce = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', key, nonce, { authTagLength: 16 });
    cipher.setAAD(Buffer.from(JSON.stringify([AI_SETTINGS_CRYPTO_VERSION, provider.baseURL, provider.models, provider.activeModel])));
    const ciphertext = Buffer.concat([cipher.update(apiKey, 'utf8'), cipher.final()]);
    return { api_key_ciphertext: ciphertext.toString('base64'), api_key_nonce: nonce.toString('base64'), api_key_tag: cipher.getAuthTag().toString('base64'), crypto_version: AI_SETTINGS_CRYPTO_VERSION };
  }

  async decrypt(record: AiSettingsRecord, provider: AiProviderSettings): Promise<string> {
    try {
      if (record.crypto_version !== AI_SETTINGS_CRYPTO_VERSION) throw aiSettingsUnavailable();
      const nonce = Buffer.from(record.api_key_nonce, 'base64');
      const tag = Buffer.from(record.api_key_tag, 'base64');
      const ciphertext = Buffer.from(record.api_key_ciphertext, 'base64');
      if (nonce.length !== 12 || tag.length !== 16 || !ciphertext.length
        || nonce.toString('base64') !== record.api_key_nonce || tag.toString('base64') !== record.api_key_tag
        || ciphertext.toString('base64') !== record.api_key_ciphertext) throw aiSettingsUnavailable();
      const decipher = createDecipheriv('aes-256-gcm', await this.masterKey(false), nonce, { authTagLength: 16 });
      decipher.setAAD(Buffer.from(JSON.stringify([record.crypto_version, provider.baseURL, provider.models, provider.activeModel])));
      decipher.setAuthTag(tag);
      const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf8');
      if (!plaintext.trim() || plaintext.length > 4096) throw aiSettingsUnavailable();
      return plaintext;
    } catch { throw aiSettingsUnavailable(); }
  }
}
