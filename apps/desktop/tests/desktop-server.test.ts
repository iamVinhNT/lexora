/**
 * @file desktop-server.test.ts
 * @description Proves the embedded desktop server uses loopback and an ephemeral port.
 */
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { afterEach, describe, expect, it } from 'vitest';

import { startDesktopServer, type DesktopServerHandle } from '../src/desktop-server.js';

describe('startDesktopServer', () => {
  let server: DesktopServerHandle | undefined;

  afterEach(async () => {
    await server?.close();
    server = undefined;
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
});
