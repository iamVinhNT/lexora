/**
 * @file file-dialogs.ts
 * @description Registers narrow, sender-validated native open and save dialog IPC handlers.
 */
import { readFile as readFileAsync, writeFile as writeFileAsync } from 'node:fs/promises';
import { basename, extname } from 'node:path';

import { FILE_DIALOG_CHANNELS, type OpenFileRequest, type SaveFileRequest } from './contracts.js';
import { isTrustedSender } from './ipc-security.js';

interface IpcRegistrar {
  handle(channel: string, handler: (event: unknown, request: unknown) => Promise<unknown>): void;
}

interface DialogRegistrar {
  showOpenDialog(options: { properties: string[]; filters: Array<{ name: string; extensions: string[] }> }): Promise<{ canceled: boolean; filePaths: string[] }>;
  showSaveDialog(options: { defaultPath: string; filters: Array<{ name: string; extensions: string[] }> }): Promise<{ canceled: boolean; filePath?: string }>;
}

export class DesktopFileError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DesktopFileError';
  }
}

export interface RegisterFileDialogHandlersOptions {
  ipcMain: IpcRegistrar;
  dialog: DialogRegistrar;
  allowedOrigin: string;
  readFile?: (path: string, encoding: 'utf8') => Promise<string>;
  writeFile?: (path: string, content: string, encoding: 'utf8') => Promise<void>;
  logError?: (message: string, error: unknown) => void | Promise<void>;
}

const IMPORT_EXTENSIONS = ['.txt', '.csv', '.json'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function hasKeys(value: Record<string, unknown>, required: string[], optional: string[] = []): boolean {
  const allowed = new Set([...required, ...optional]);
  return required.every((key) => key in value) && Object.keys(value).every((key) => allowed.has(key));
}

function assertTrustedSender(event: unknown, allowedOrigin: string): void {
  if (!isTrustedSender(event, allowedOrigin)) throw new DesktopFileError('File operation is not allowed from this page.');
}

function parseOpenRequest(request: unknown): OpenFileRequest {
  if (!isRecord(request) || !hasKeys(request, ['kind']) || (request.kind !== 'import' && request.kind !== 'backup')) {
    throw new DesktopFileError('Invalid file-open request.');
  }
  return { kind: request.kind };
}

function parseSaveRequest(request: unknown): SaveFileRequest {
  if (!isRecord(request) || !hasKeys(request, ['kind', 'suggestedName', 'content'], ['format'])) {
    throw new DesktopFileError('Invalid file-save request.');
  }
  if ((request.kind !== 'export' && request.kind !== 'backup') || typeof request.suggestedName !== 'string' || typeof request.content !== 'string') {
    throw new DesktopFileError('Invalid file-save request.');
  }
  if (request.kind === 'export' && request.format !== 'CSV' && request.format !== 'JSON') {
    throw new DesktopFileError('Export requests require a file format.');
  }
  if (request.kind === 'backup' && request.format !== undefined) {
    throw new DesktopFileError('Backup requests cannot include an export format.');
  }
  if (request.format !== undefined && request.format !== 'CSV' && request.format !== 'JSON') {
    throw new DesktopFileError('Invalid file-save format.');
  }
  return {
    kind: request.kind,
    suggestedName: request.suggestedName,
    content: request.content,
    ...(request.format === undefined ? {} : { format: request.format }),
  };
}

function extensionAllowed(filePath: string, kind: OpenFileRequest['kind']): boolean {
  const extension = extname(filePath).toLowerCase();
  return kind === 'backup' ? extension === '.json' : IMPORT_EXTENSIONS.includes(extension);
}

function normalizeSuggestedName(request: SaveFileRequest): { name: string; extension: string } {
  const name = basename(request.suggestedName);
  if (!name || name === '.' || name === '..' || name.includes('\u0000')) {
    throw new DesktopFileError('Invalid suggested file name.');
  }

  const extension = request.kind === 'backup' ? '.json' : request.format === 'JSON' ? '.json' : '.csv';
  if (extname(name).toLowerCase() !== extension) {
    throw new DesktopFileError('Suggested file name does not match its format.');
  }
  return { name, extension };
}

function assertSelectedSavePath(filePath: unknown, extension: string): asserts filePath is string {
  if (typeof filePath !== 'string' || extname(filePath).toLowerCase() !== extension) {
    throw new DesktopFileError('Selected file type is not allowed.');
  }
}

function logAndThrow(logError: (message: string, error: unknown) => void | Promise<void>, message: string, error: unknown): never {
  try {
    const loggingResult = logError(message, error);
    if (loggingResult && typeof (loggingResult as Promise<void>).then === 'function') {
      void Promise.resolve(loggingResult).catch(() => undefined);
    }
  } catch {
    // Preserve sanitized user-facing error when technical logging fails.
  }
  throw new DesktopFileError(message);
}

export function registerFileDialogHandlers(options: RegisterFileDialogHandlersOptions): void {
  const readFile = options.readFile ?? ((path, encoding) => readFileAsync(path, encoding));
  const writeFile = options.writeFile ?? ((path, content, encoding) => writeFileAsync(path, content, encoding));
  const logError = options.logError ?? (() => undefined);

  options.ipcMain.handle(FILE_DIALOG_CHANNELS.open, async (event, request) => {
    assertTrustedSender(event, options.allowedOrigin);
    const input = parseOpenRequest(request);
    const filters = input.kind === 'backup'
      ? [{ name: 'Lexora backups', extensions: ['json'] }]
      : [{ name: 'Import files', extensions: ['txt', 'csv', 'json'] }];
    const selected = await options.dialog.showOpenDialog({ properties: ['openFile'], filters });
    const filePath = selected.filePaths[0];
    if (selected.canceled || !filePath) return { canceled: true } as const;
    if (!extensionAllowed(filePath, input.kind)) throw new DesktopFileError('Selected file type is not allowed.');

    try {
      const content = await readFile(filePath, 'utf8');
      return { canceled: false, name: basename(filePath), content } as const;
    } catch (error) {
      return logAndThrow(logError, 'Could not read selected file.', error);
    }
  });

  options.ipcMain.handle(FILE_DIALOG_CHANNELS.save, async (event, request) => {
    assertTrustedSender(event, options.allowedOrigin);
    const input = parseSaveRequest(request);
    const { name, extension } = normalizeSuggestedName(input);
    const filters = input.kind === 'backup'
      ? [{ name: 'Lexora backups', extensions: ['json'] }]
      : [{ name: `${input.format} exports`, extensions: [extension.slice(1)] }];
    const selected = await options.dialog.showSaveDialog({ defaultPath: name, filters });
    if (selected.canceled || !selected.filePath) return { canceled: true } as const;
    assertSelectedSavePath(selected.filePath, extension);

    try {
      await writeFile(selected.filePath, input.content, 'utf8');
      return { canceled: false } as const;
    } catch (error) {
      return logAndThrow(logError, 'Could not save selected file.', error);
    }
  });
}
