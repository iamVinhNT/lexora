/**
 * @file global.d.ts
 * @description Declares optional APIs exposed by the Lexora Electron preload bridge.
 */
export {};

type DesktopOpenResult =
  | { canceled: true }
  | { canceled: false; name: string; content: string };

type DesktopSaveResult = { canceled: boolean };

declare global {
  interface Window {
    lexoraDesktop?: {
      openImportFile: () => Promise<DesktopOpenResult>;
      openBackupFile: () => Promise<DesktopOpenResult>;
      saveExportFile: (input: { suggestedName: string; content: string; format: 'CSV' | 'JSON' }) => Promise<DesktopSaveResult>;
      saveBackupFile: (input: { suggestedName: string; content: string }) => Promise<DesktopSaveResult>;
    };
  }
}
