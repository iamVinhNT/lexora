/**
 * @file desktop-files.ts
 * @description Adapts optional Electron native file operations while preserving browser behavior.
 */
export function hasDesktopFileApi(): boolean {
  return window.lexoraDesktop !== undefined;
}

export async function openDesktopImportFile() {
  return window.lexoraDesktop?.openImportFile() ?? null;
}

export async function openDesktopBackupFile() {
  return window.lexoraDesktop?.openBackupFile() ?? null;
}

export async function saveDesktopExport(input: { suggestedName: string; content: string; format: 'CSV' | 'JSON' }) {
  return window.lexoraDesktop?.saveExportFile(input) ?? null;
}

export async function saveDesktopBackup(input: { suggestedName: string; content: string }) {
  return window.lexoraDesktop?.saveBackupFile(input) ?? null;
}
