/**
 * @file preload.cjs
 * @description Exposes narrow native file-dialog operations to the sandboxed Lexora renderer.
 */
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('lexoraDesktop', {
  openImportFile: (input) => ipcRenderer.invoke('lexora:file-dialog:open', input ?? { kind: 'import' }),
  openBackupFile: (input) => ipcRenderer.invoke('lexora:file-dialog:open', input ?? { kind: 'backup' }),
  saveExportFile: (input) => ipcRenderer.invoke('lexora:file-dialog:save', { kind: 'export', ...input }),
  saveBackupFile: (input) => ipcRenderer.invoke('lexora:file-dialog:save', { kind: 'backup', ...input }),
});
