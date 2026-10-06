/**
 * @file file-dialogs.test.ts
 * @description Verifies sender, payload, extension, cancellation, and filesystem error boundaries for native dialogs.
 */
import { execFile } from 'node:child_process';
import { mkdir, mkdtemp, readFile as readFileAsync, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath, pathToFileURL } from 'node:url';

import ts from 'typescript';
import { describe, expect, it, vi } from 'vitest';

import { FILE_DIALOG_CHANNELS } from '../src/contracts.js';
import { DesktopFileError, registerFileDialogHandlers } from '../src/file-dialogs.js';

const ALLOWED_ORIGIN = 'http://127.0.0.1:45678';
const execFileAsync = promisify(execFile);
const DESKTOP_ROOT = dirname(fileURLToPath(new URL('.', import.meta.url)));
const ELECTRON_PATH = join(DESKTOP_ROOT, 'node_modules', 'electron', 'dist', 'electron');

function setup(overrides: Record<string, unknown> = {}) {
  const handlers = new Map<string, (event: unknown, request: unknown) => Promise<unknown>>();
  const ipcMain = { handle: vi.fn((channel: string, handler: (event: unknown, request: unknown) => Promise<unknown>) => handlers.set(channel, handler)) };
  const dialog = {
    showOpenDialog: vi.fn(),
    showSaveDialog: vi.fn(),
  };
  const readFile = vi.fn();
  const writeFile = vi.fn();
  const logError = vi.fn();

  registerFileDialogHandlers({
    ipcMain,
    dialog,
    allowedOrigin: ALLOWED_ORIGIN,
    readFile,
    writeFile,
    logError,
    ...overrides,
  });

  return { handlers, dialog, readFile, writeFile, logError };
}

function trustedEvent(url = ALLOWED_ORIGIN) {
  return { senderFrame: { url } };
}

async function compileDialogModules(outputRoot: string): Promise<string> {
  const sourceRoot = join(DESKTOP_ROOT, 'src');
  const outputFiles = ['contracts.ts', 'file-dialogs.ts'];
  await mkdir(outputRoot, { recursive: true });
  for (const sourceName of outputFiles) {
    const source = await readFileAsync(join(sourceRoot, sourceName), 'utf8');
    const compiled = ts.transpileModule(source, {
      fileName: sourceName,
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.NodeNext,
        moduleResolution: ts.ModuleResolutionKind.NodeNext,
      },
    });
    await writeFile(join(outputRoot, sourceName.replace('.ts', '.js')), compiled.outputText, 'utf8');
  }
  return join(outputRoot, 'file-dialogs.js');
}

async function writeElectronIpcHarness(harnessPath: string, handlersPath: string): Promise<void> {
  const preloadPath = join(DESKTOP_ROOT, 'src', 'preload.cjs');
  const source = `
import { BrowserWindow, app, ipcMain } from 'electron';
import { createServer } from 'node:http';

const { registerFileDialogHandlers } = await import(${JSON.stringify(pathToFileURL(handlersPath).href)});
const selectedPath = '/tmp/private/lexora-backup.json';
let writtenFile;
const server = createServer((_request, response) => {
  response.writeHead(200, { 'content-type': 'text/html' });
  response.end('<!doctype html><html><body>Lexora</body></html>');
});

async function run() {
try {
  await app.whenReady();
  await new Promise((resolve, reject) => server.listen(0, '127.0.0.1', (error) => error ? reject(error) : resolve()));
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('Harness server did not expose a TCP address.');
  const origin = 'http://127.0.0.1:' + address.port;
  registerFileDialogHandlers({
    ipcMain,
    allowedOrigin: origin,
    dialog: {
      showOpenDialog: async () => ({ canceled: false, filePaths: [selectedPath] }),
      showSaveDialog: async () => ({ canceled: false, filePath: selectedPath }),
    },
    readFile: async () => '{"version":1}',
    writeFile: async (path, content, encoding) => { writtenFile = { path, content, encoding }; },
  });
  const mainWindow = new BrowserWindow({
    show: false,
    webPreferences: { preload: ${JSON.stringify(preloadPath)}, nodeIntegration: false, contextIsolation: true, sandbox: true },
  });
  await mainWindow.loadURL(origin);
  const bridgeResults = await mainWindow.webContents.executeJavaScript(${JSON.stringify("Promise.all([window.lexoraDesktop.openBackupFile(), window.lexoraDesktop.saveBackupFile({ suggestedName: 'backup.json', content: '{\"version\":1}' })])")});
  process.stdout.write('LEXORA_IPC_RESULT ' + JSON.stringify({ bridgeResults, writtenFile }) + '\\n');
  mainWindow.destroy();
  await new Promise((resolve) => server.close(() => resolve()));
  app.exit(0);
} catch (error) {
  process.stderr.write(String(error && error.stack ? error.stack : error) + '\\n');
  app.exit(1);
}
}
void run();
`;
  await writeFile(harnessPath, source, 'utf8');
}

async function isSandboxHelperReady(): Promise<boolean> {
  try {
    const sandbox = await stat(join(DESKTOP_ROOT, 'node_modules', 'electron', 'dist', 'chrome-sandbox'));
    return sandbox.uid === 0 && (sandbox.mode & 0o7777) === 0o4755;
  } catch {
    return false;
  }
}

describe('registerFileDialogHandlers', () => {
  it('opens allowed import files and returns only name and text content', async () => {
    const { handlers, dialog, readFile } = setup();
    dialog.showOpenDialog.mockResolvedValue({ canceled: false, filePaths: ['/tmp/words.csv'] });
    readFile.mockResolvedValue('lucid,clear');

    const result = await handlers.get(FILE_DIALOG_CHANNELS.open)?.(trustedEvent(), { kind: 'import' });

    expect(dialog.showOpenDialog).toHaveBeenCalledWith(expect.objectContaining({ properties: ['openFile'] }));
    expect(dialog.showOpenDialog.mock.calls[0][0].filters).toEqual([{ name: 'Import files', extensions: ['txt', 'csv', 'json'] }]);
    expect(readFile).toHaveBeenCalledWith('/tmp/words.csv', 'utf8');
    expect(result).toEqual({ canceled: false, name: 'words.csv', content: 'lucid,clear' });
  });

  it('restricts backup open dialogs to JSON files', async () => {
    const { handlers, dialog, readFile } = setup();
    dialog.showOpenDialog.mockResolvedValue({ canceled: false, filePaths: ['/tmp/backup.json'] });
    readFile.mockResolvedValue('{}');

    await handlers.get(FILE_DIALOG_CHANNELS.open)?.(trustedEvent(), { kind: 'backup' });

    expect(dialog.showOpenDialog.mock.calls[0][0].filters).toEqual([{ name: 'Lexora backups', extensions: ['json'] }]);
  });

  it('opens a backup and returns only its basename and text content', async () => {
    const { handlers, dialog, readFile } = setup();
    dialog.showOpenDialog.mockResolvedValue({ canceled: false, filePaths: ['/home/test/lexora-backup.json'] });
    readFile.mockResolvedValue('{"version":1}');

    const result = await handlers.get(FILE_DIALOG_CHANNELS.open)?.(trustedEvent(), { kind: 'backup' });

    expect(result).toEqual({ canceled: false, name: 'lexora-backup.json', content: '{"version":1}' });
    expect(JSON.stringify(result)).not.toContain('/home/test');
  });

  it('returns typed cancellation without reading or writing files', async () => {
    const { handlers, dialog, readFile, writeFile } = setup();
    dialog.showOpenDialog.mockResolvedValue({ canceled: true, filePaths: [] });
    const openResult = await handlers.get(FILE_DIALOG_CHANNELS.open)?.(trustedEvent(), { kind: 'import' });
    dialog.showSaveDialog.mockResolvedValue({ canceled: true, filePath: undefined });
    const saveResult = await handlers.get(FILE_DIALOG_CHANNELS.save)?.(trustedEvent(), { kind: 'backup', suggestedName: 'backup.json', content: '{}' });

    expect(openResult).toEqual({ canceled: true });
    expect(saveResult).toEqual({ canceled: true });
    expect(readFile).not.toHaveBeenCalled();
    expect(writeFile).not.toHaveBeenCalled();
  });

  it('keeps every native file-operation cancellation silent', async () => {
    const { handlers, dialog, readFile, writeFile } = setup();
    dialog.showOpenDialog
      .mockResolvedValueOnce({ canceled: true, filePaths: [] })
      .mockResolvedValueOnce({ canceled: true, filePaths: [] });
    dialog.showSaveDialog
      .mockResolvedValueOnce({ canceled: true, filePath: undefined })
      .mockResolvedValueOnce({ canceled: true, filePath: undefined });

    const results = [
      await handlers.get(FILE_DIALOG_CHANNELS.open)?.(trustedEvent(), { kind: 'import' }),
      await handlers.get(FILE_DIALOG_CHANNELS.open)?.(trustedEvent(), { kind: 'backup' }),
      await handlers.get(FILE_DIALOG_CHANNELS.save)?.(trustedEvent(), { kind: 'export', suggestedName: 'export.csv', content: '', format: 'CSV' }),
      await handlers.get(FILE_DIALOG_CHANNELS.save)?.(trustedEvent(), { kind: 'backup', suggestedName: 'backup.json', content: '{}' }),
    ];

    expect(results).toEqual([{ canceled: true }, { canceled: true }, { canceled: true }, { canceled: true }]);
    expect(readFile).not.toHaveBeenCalled();
    expect(writeFile).not.toHaveBeenCalled();
  });

  it('sanitizes suggested save names and writes only selected paths', async () => {
    const { handlers, dialog, writeFile } = setup();
    dialog.showSaveDialog.mockResolvedValue({ canceled: false, filePath: '/home/test/export.csv' });

    const result = await handlers.get(FILE_DIALOG_CHANNELS.save)?.(trustedEvent(), {
      kind: 'export',
      suggestedName: '../../secret.csv',
      content: 'word,definition',
      format: 'CSV',
    });

    expect(dialog.showSaveDialog).toHaveBeenCalledWith(expect.objectContaining({ defaultPath: 'secret.csv' }));
    expect(writeFile).toHaveBeenCalledWith('/home/test/export.csv', 'word,definition', 'utf8');
    expect(result).toEqual({ canceled: false });
  });

  it('saves a backup through the selected JSON path', async () => {
    const { handlers, dialog, writeFile } = setup();
    dialog.showSaveDialog.mockResolvedValue({ canceled: false, filePath: '/home/test/lexora-backup.json' });

    const result = await handlers.get(FILE_DIALOG_CHANNELS.save)?.(trustedEvent(), {
      kind: 'backup',
      suggestedName: 'lexora-backup.json',
      content: '{"version":1}',
    });

    expect(dialog.showSaveDialog).toHaveBeenCalledWith({
      defaultPath: 'lexora-backup.json',
      filters: [{ name: 'Lexora backups', extensions: ['json'] }],
    });
    expect(writeFile).toHaveBeenCalledWith('/home/test/lexora-backup.json', '{"version":1}', 'utf8');
    expect(result).toEqual({ canceled: false });
  });

  it('rejects a selected save path whose extension does not match the requested format', async () => {
    const { handlers, dialog, writeFile } = setup();
    dialog.showSaveDialog.mockResolvedValue({ canceled: false, filePath: '/home/test/export.txt' });

    await expect(handlers.get(FILE_DIALOG_CHANNELS.save)?.(trustedEvent(), {
      kind: 'export',
      suggestedName: 'export.csv',
      content: 'word,definition',
      format: 'CSV',
    })).rejects.toBeInstanceOf(DesktopFileError);

    expect(writeFile).not.toHaveBeenCalled();
  });

  it('rejects an export request without an explicit format before opening a dialog', async () => {
    const { handlers, dialog } = setup();

    await expect(handlers.get(FILE_DIALOG_CHANNELS.save)?.(trustedEvent(), {
      kind: 'export',
      suggestedName: 'export.csv',
      content: 'word,definition',
    })).rejects.toBeInstanceOf(DesktopFileError);

    expect(dialog.showSaveDialog).not.toHaveBeenCalled();
  });

  it('rejects untrusted senders before opening a dialog', async () => {
    const { handlers, dialog } = setup();

    await expect(handlers.get(FILE_DIALOG_CHANNELS.open)?.({ senderFrame: { url: 'https://untrusted.example' } }, { kind: 'import' })).rejects.toBeInstanceOf(DesktopFileError);

    expect(dialog.showOpenDialog).not.toHaveBeenCalled();
  });

  it('rejects malformed payloads and disallowed extensions', async () => {
    const { handlers, dialog } = setup();
    dialog.showOpenDialog.mockResolvedValue({ canceled: false, filePaths: ['/tmp/backup.txt'] });

    await expect(handlers.get(FILE_DIALOG_CHANNELS.open)?.(trustedEvent(), { kind: 'backup' })).rejects.toBeInstanceOf(DesktopFileError);
    await expect(handlers.get(FILE_DIALOG_CHANNELS.save)?.(trustedEvent(), { kind: 'backup', suggestedName: 'backup.txt', content: '{}' })).rejects.toBeInstanceOf(DesktopFileError);
    await expect(handlers.get(FILE_DIALOG_CHANNELS.save)?.(trustedEvent(), { kind: 'export', suggestedName: 'export.csv', content: 123, format: 'CSV' })).rejects.toBeInstanceOf(DesktopFileError);

    expect(dialog.showSaveDialog).not.toHaveBeenCalled();
  });

  it('sanitizes filesystem failures while logging technical errors', async () => {
    const { handlers, dialog, readFile, logError } = setup();
    const technicalError = new Error('permission denied: /private/secret');
    dialog.showOpenDialog.mockResolvedValue({ canceled: false, filePaths: ['/tmp/words.txt'] });
    readFile.mockRejectedValue(technicalError);

    await expect(handlers.get(FILE_DIALOG_CHANNELS.open)?.(trustedEvent(), { kind: 'import' })).rejects.toEqual(expect.objectContaining({ message: 'Could not read selected file.' }));
    expect(logError).toHaveBeenCalledWith('Could not read selected file.', technicalError);
  });

  it('sanitizes backup write failures while logging technical errors', async () => {
    const { handlers, dialog, writeFile, logError } = setup();
    const technicalError = new Error('permission denied: /private/secret');
    dialog.showSaveDialog.mockResolvedValue({ canceled: false, filePath: '/tmp/backup.json' });
    writeFile.mockRejectedValue(technicalError);

    await expect(handlers.get(FILE_DIALOG_CHANNELS.save)?.(trustedEvent(), {
      kind: 'backup',
      suggestedName: 'backup.json',
      content: '{}',
    })).rejects.toEqual(expect.objectContaining({ message: 'Could not save selected file.' }));
    expect(logError).toHaveBeenCalledWith('Could not save selected file.', technicalError);
  });

  it('keeps logger rejection contained when a native read fails', async () => {
    const { handlers, dialog, readFile, logError } = setup();
    const technicalError = new Error('permission denied');
    const loggerError = new Error('logger unavailable');
    dialog.showOpenDialog.mockResolvedValue({ canceled: false, filePaths: ['/tmp/words.txt'] });
    readFile.mockRejectedValue(technicalError);
    logError.mockImplementation(() => { throw loggerError; });

    await expect(handlers.get(FILE_DIALOG_CHANNELS.open)?.(trustedEvent(), { kind: 'import' })).rejects.toEqual(expect.objectContaining({ message: 'Could not read selected file.' }));
  });

  it('transports backup open and save through the real sandboxed preload bridge', async () => {
    if (!(await isSandboxHelperReady())) {
      console.warn('Skipping real Electron IPC harness: chrome-sandbox is not root-owned with mode 4755.');
      return;
    }
    const harnessRoot = await mkdtemp(join(tmpdir(), 'lexora-ipc-harness-'));
    try {
      const handlersPath = await compileDialogModules(join(harnessRoot, 'compiled'));
      const harnessPath = join(harnessRoot, 'harness.mjs');
      await writeElectronIpcHarness(harnessPath, handlersPath);
      const { ELECTRON_RUN_AS_NODE: _electronRunAsNode, ...electronEnvironment } = process.env;
      const result = await execFileAsync(ELECTRON_PATH, [harnessPath, `--user-data-dir=${join(harnessRoot, 'profile')}`], {
        cwd: DESKTOP_ROOT,
        env: electronEnvironment,
        timeout: 20_000,
        maxBuffer: 2 * 1024 * 1024,
      });
      const outputLine = result.stdout.split('\n').find((line) => line.startsWith('LEXORA_IPC_RESULT '));
      expect(outputLine).toBeDefined();
      const output = JSON.parse(outputLine!.slice('LEXORA_IPC_RESULT '.length));

      expect(output.bridgeResults).toEqual([
        { canceled: false, name: 'lexora-backup.json', content: '{"version":1}' },
        { canceled: false },
      ]);
      expect(JSON.stringify(output.bridgeResults)).not.toContain('/tmp/private');
      expect(output.writtenFile).toEqual({ path: '/tmp/private/lexora-backup.json', content: '{"version":1}', encoding: 'utf8' });
    } finally {
      await rm(harnessRoot, { recursive: true, force: true });
    }
  }, 30_000);
});
