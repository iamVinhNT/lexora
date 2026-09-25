/**
 * @file desktop-server.test.ts
 * @description Proves the embedded desktop server uses loopback and an ephemeral port.
 */
import { chmod, mkdir, mkdtemp, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { startDesktopServer, type DesktopServerHandle } from '../src/desktop-server.js';

describe('startDesktopServer', () => {
  let server: DesktopServerHandle | undefined;

  afterEach(async () => {
    await server?.close();
    server = undefined;
  });

  it('repairs owner-write permissions on an existing database before opening it', async () => {
    const rendererRoot = await mkdtemp(join(tmpdir(), 'lexora-desktop-spa-'));
    const databasePath = join(rendererRoot, 'data', 'lexora.db');
    const databaseFiles = [databasePath, `${databasePath}-wal`, `${databasePath}-shm`];
    await mkdir(join(rendererRoot, 'data'), { recursive: true });

    try {
      await Promise.all(databaseFiles.map((filePath) => writeFile(filePath, '')));
      await Promise.all(databaseFiles.map((filePath) => chmod(filePath, 0o444)));

      server = await startDesktopServer({ databasePath, rendererRoot });

      for (const filePath of databaseFiles) {
        expect((await stat(filePath)).mode & 0o777).toBe(0o644);
      }

      const response = await fetch(`${server.origin}/api/words`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ word: 'persist', definition: 'to save' }),
      });
      expect(response.status).toBe(201);
      const body = await response.json();
      expect(body.success).toBe(true);
      expect(body.data.learningProgress).toMatchObject({
        status: 'NEW',
        recognitionScore: 0,
        recallScore: 0,
        productionScore: 0,
      });
      expect(body.data.reviewState).toMatchObject({
        interval: 0,
        easeFactor: 2.5,
        repetitions: 0,
        lapses: 0,
      });
      expect(body.data.reviewState.dueAt).toBeDefined();
    } finally {
      await rm(rendererRoot, { recursive: true, force: true });
    }
  });

  it('rejects a database path whose parent cannot be used as a directory', async () => {
    const rendererRoot = await mkdtemp(join(tmpdir(), 'lexora-desktop-spa-'));
    const blockedDirectory = join(rendererRoot, 'blocked');
    await writeFile(blockedDirectory, 'not a directory');

    try {
      await expect(startDesktopServer({
        databasePath: join(blockedDirectory, 'lexora.db'),
        rendererRoot,
      })).rejects.toThrow(`Desktop database storage is not writable (${blockedDirectory})`);
    } finally {
      await rm(rendererRoot, { recursive: true, force: true });
    }
  });

  it('leaves missing database sidecars for SQLite to create', async () => {
    const rendererRoot = await mkdtemp(join(tmpdir(), 'lexora-desktop-spa-'));
    const dataDirectory = join(rendererRoot, 'data');
    const databasePath = join(dataDirectory, 'lexora.db');

    try {
      server = await startDesktopServer({ databasePath, rendererRoot });
      expect(new Set(await readdir(dataDirectory))).toEqual(new Set(['lexora.db', 'lexora.db-wal', 'lexora.db-shm']));
    } finally {
      await rm(rendererRoot, { recursive: true, force: true });
    }
  });

  it('listens on loopback with an operating-system-assigned port', async () => {
    const rendererRoot = await mkdtemp(join(tmpdir(), 'lexora-desktop-spa-'));
    await writeFile(join(rendererRoot, 'index.html'), '<!doctype html><div>Lexora desktop</div>');

    try {
      server = await startDesktopServer({
        databasePath: join(rendererRoot, 'data', 'lexora.db'),
        rendererRoot,
      });
      const address = server.app.server.address();

      expect(address).not.toBeNull();
      expect(typeof address).not.toBe('string');
      if (!address || typeof address === 'string') throw new Error('Expected TCP address');
      expect(address.address).toBe('127.0.0.1');
      expect(address.port).toBeGreaterThan(0);

      const health = await fetch(`${server.origin}/api/health`);
      const route = await fetch(`${server.origin}/settings`);
      const missing = await fetch(`${server.origin}/api/missing`);

      expect(health.status).toBe(200);
      expect(route.status).toBe(200);
      expect(await route.text()).toContain('Lexora desktop');
      expect(missing.status).toBe(404);
      expect(missing.headers.get('content-type')).toContain('application/json');
    } finally {
      await rm(rendererRoot, { recursive: true, force: true });
    }
  });

  it('invokes database preparation when databasePath is not :memory:', async () => {
    const rendererRoot = await mkdtemp(join(tmpdir(), 'lexora-desktop-spa-'));
    const databasePath = join(rendererRoot, 'data', 'lexora.db');
    const prepareDatabase = vi.fn().mockResolvedValue(undefined);

    try {
      server = await startDesktopServer({
        databasePath,
        rendererRoot,
        prepareDatabase,
      });

      expect(prepareDatabase).toHaveBeenCalledWith(databasePath);
    } finally {
      await rm(rendererRoot, { recursive: true, force: true });
    }
  });

  it('skips database preparation when databasePath is :memory:', async () => {
    const rendererRoot = await mkdtemp(join(tmpdir(), 'lexora-desktop-spa-'));
    const prepareDatabase = vi.fn().mockResolvedValue(undefined);

    try {
      server = await startDesktopServer({
        databasePath: ':memory:',
        rendererRoot,
        prepareDatabase,
      });

      expect(prepareDatabase).not.toHaveBeenCalled();
    } finally {
      await rm(rendererRoot, { recursive: true, force: true });
    }
  });
});
