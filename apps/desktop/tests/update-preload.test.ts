/**
 * @file update-preload.test.ts
 * @description Verifies the update bridge exposed by the real sandboxed preload against real Electron IPC.
 */
import { execFile } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath, pathToFileURL } from 'node:url';

import ts from 'typescript';
import { describe, expect, it } from 'vitest';

const execFileAsync = promisify(execFile);
const DESKTOP_ROOT = dirname(fileURLToPath(new URL('.', import.meta.url)));
const ELECTRON_PATH = join(DESKTOP_ROOT, 'node_modules', 'electron', 'dist', 'electron');

async function compile(outputRoot: string): Promise<string> {
  await mkdir(outputRoot, { recursive: true });
  for (const name of ['contracts.ts', 'ipc-security.ts', 'update-handlers.ts']) {
    const source = await readFile(join(DESKTOP_ROOT, 'src', name), 'utf8');
    const { outputText } = ts.transpileModule(source, { fileName: name, compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.NodeNext, moduleResolution: ts.ModuleResolutionKind.NodeNext } });
    await writeFile(join(outputRoot, name.replace('.ts', '.js')), outputText, 'utf8');
  }
  return join(outputRoot, 'update-handlers.js');
}

function harness(handlersPath: string): string {
  return `
import { BrowserWindow, app, ipcMain } from 'electron';
import { createServer } from 'node:http';
const { registerUpdateHandlers } = await import(${JSON.stringify(pathToFileURL(handlersPath).href)});
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const server = createServer((_req, res) => { res.writeHead(200, { 'content-type': 'text/html' }); res.end('<!doctype html><body>Lexora</body>'); });
const calls = [];
const STATE = { available: true, currentVersion: '0.3.0', install: 'appimage', download: { status: 'idle', receivedBytes: 0 } };
(async () => {
  try {
    await app.whenReady();
    await new Promise((resolve, reject) => server.listen(0, '127.0.0.1', (e) => e ? reject(e) : resolve()));
    const origin = 'http://127.0.0.1:' + server.address().port;
    registerUpdateHandlers({ ipcMain, allowedOrigin: origin, controller: {
      getState: () => { calls.push('getState'); return STATE; },
      startDownload: () => { calls.push('download'); return STATE; },
      cancelDownload: () => { calls.push('cancel'); return STATE; },
      revealDownload: () => { calls.push('reveal'); return { shown: true }; },
      dismiss: async (version) => { calls.push('dismiss:' + version); return STATE; },
    } });
    const win = new BrowserWindow({ show: false, webPreferences: { preload: ${JSON.stringify(join(DESKTOP_ROOT, 'src', 'preload.cjs'))}, nodeIntegration: false, contextIsolation: true, sandbox: true } });
    await win.loadURL(origin);
    const js = (code) => win.webContents.executeJavaScript(code);
    const shape = await js(\`(async () => {
      const u = window.lexoraDesktop.updates;
      const state = await u.getState();
      await u.download(); await u.cancelDownload();
      const reveal = await u.revealDownload();
      await u.dismiss('0.4.0');
      let badArg = 'no-throw'; try { u.onState('x'); } catch (e) { badArg = e.message; }
      return { keys: Object.keys(u).sort(), state, reveal, badArg };
    })()\`);
    await js("window.__received = []; window.__off = window.lexoraDesktop.updates.onState((s) => window.__received.push(s)); true");
    win.webContents.send('lexora:update:state', { n: 1 });
    await sleep(200);
    const afterFirst = await js('window.__received.length');
    await js('window.__off(); true');
    win.webContents.send('lexora:update:state', { n: 2 });
    await sleep(200);
    const received = await js('window.__received');
    process.stdout.write('LEXORA_UPDATE_RESULT ' + JSON.stringify({ shape, calls, afterFirst, received }) + '\\n');
    win.destroy();
    await new Promise((resolve) => server.close(() => resolve()));
    app.exit(0);
  } catch (error) {
    process.stderr.write(String(error && error.stack ? error.stack : error) + '\\n');
    app.exit(1);
  }
})();
`;
}

async function isSandboxHelperReady(): Promise<boolean> {
  try {
    const sandbox = await stat(join(DESKTOP_ROOT, 'node_modules', 'electron', 'dist', 'chrome-sandbox'));
    return sandbox.uid === 0 && (sandbox.mode & 0o7777) === 0o4755;
  } catch {
    return false;
  }
}

describe('update preload bridge', () => {
  it('exposes only the update methods, round-trips IPC, and unsubscribes cleanly in real Electron', async () => {
    if (!(await isSandboxHelperReady())) {
      console.warn('Skipping real Electron update bridge test: chrome-sandbox is not root-owned with mode 4755.');
      return;
    }
    const root = await mkdtemp(join(tmpdir(), 'lexora-update-bridge-'));
    try {
      const harnessPath = join(root, 'harness.mjs');
      await writeFile(harnessPath, harness(await compile(join(root, 'compiled'))), 'utf8');
      const { ELECTRON_RUN_AS_NODE: _drop, ...env } = process.env;
      const { stdout } = await execFileAsync(ELECTRON_PATH, [harnessPath, `--user-data-dir=${join(root, 'profile')}`], { cwd: DESKTOP_ROOT, env, timeout: 20_000, maxBuffer: 2 * 1024 * 1024 });
      const line = stdout.split('\n').find((l) => l.startsWith('LEXORA_UPDATE_RESULT '));
      expect(line).toBeDefined();
      const result = JSON.parse(line!.slice('LEXORA_UPDATE_RESULT '.length));

      expect(result.shape.keys).toEqual(['cancelDownload', 'dismiss', 'download', 'getState', 'onState', 'revealDownload']);
      expect(result.shape.state).toMatchObject({ available: true, currentVersion: '0.3.0' });
      expect(result.shape.reveal).toEqual({ shown: true });
      expect(result.shape.badArg).toBe('onState requires a listener function.');
      expect(result.calls).toEqual(['getState', 'download', 'cancel', 'reveal', 'dismiss:0.4.0']);
      expect(result.afterFirst).toBe(1);
      expect(result.received).toEqual([{ n: 1 }]);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  }, 30_000);
});
