/**
 * @file logging.test.ts
 * @description Verifies append-only structured desktop error logging.
 */
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { describe, expect, it } from 'vitest';

import { writeDesktopError } from '../src/logging.js';

describe('writeDesktopError', () => {
  it('creates the parent directory and writes one normalized JSON line', async () => {
    const root = await mkdtemp(join(tmpdir(), 'lexora-desktop-log-'));
    const logPath = join(root, 'logs', 'desktop.log');
    const error = new Error('startup failed');

    try {
      await writeDesktopError(logPath, 'Desktop startup failed.', error);
      const lines = (await readFile(logPath, 'utf8')).trim().split('\n');
      const entry = JSON.parse(lines[0]) as { timestamp: string; message: string; error: { name: string; message: string; stack?: string } };

      expect(lines).toHaveLength(1);
      expect(entry.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
      expect(entry.message).toBe('Desktop startup failed.');
      expect(entry.error).toMatchObject({ name: 'Error', message: 'startup failed' });
      expect(entry.error.stack).toContain('Error: startup failed');
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
