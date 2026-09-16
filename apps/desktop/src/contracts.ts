/**
 * @file contracts.ts
 * @description Defines narrow desktop file-dialog IPC channels and payload contracts.
 */
export const FILE_DIALOG_CHANNELS = {
  open: 'lexora:file-dialog:open',
  save: 'lexora:file-dialog:save',
} as const;

export type OpenFileRequest = { kind: 'import' | 'backup' };
export type OpenFileResult = { canceled: true } | { canceled: false; name: string; content: string };
export type SaveFileRequest = {
  kind: 'export' | 'backup';
  suggestedName: string;
  content: string;
  format?: 'CSV' | 'JSON';
};
export type SaveFileResult = { canceled: boolean };
