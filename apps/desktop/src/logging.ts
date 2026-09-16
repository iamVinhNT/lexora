/**
 * @file logging.ts
 * @description Writes append-only structured startup and shutdown error records.
 */
import { appendFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

export async function writeDesktopError(logPath: string, message: string, error: unknown): Promise<void> {
  await mkdir(dirname(logPath), { recursive: true });
  const normalized = error instanceof Error
    ? { name: error.name, message: error.message, stack: error.stack }
    : { name: 'UnknownError', message: String(error) };
  await appendFile(logPath, `${JSON.stringify({ timestamp: new Date().toISOString(), message, error: normalized })}\n`, 'utf8');
}
