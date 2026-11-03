/**
 * @file preload.cjs
 * @description Exposes narrow native file-dialog and update operations to the sandboxed Lexora renderer.
 */
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('lexoraDesktop', {
  openImportFile: (input) => ipcRenderer.invoke('lexora:file-dialog:open', input ?? { kind: 'import' }),
  openBackupFile: (input) => ipcRenderer.invoke('lexora:file-dialog:open', input ?? { kind: 'backup' }),
  saveExportFile: (input) => ipcRenderer.invoke('lexora:file-dialog:save', { kind: 'export', ...input }),
  saveBackupFile: (input) => ipcRenderer.invoke('lexora:file-dialog:save', { kind: 'backup', ...input }),
  updates: {
    getState: () => ipcRenderer.invoke('lexora:update:get-state'),
    download: () => ipcRenderer.invoke('lexora:update:download'),
    cancelDownload: () => ipcRenderer.invoke('lexora:update:cancel-download'),
    revealDownload: () => ipcRenderer.invoke('lexora:update:reveal-download'),
    dismiss: (version) => ipcRenderer.invoke('lexora:update:dismiss', { version }),
    onState: (listener) => {
      if (typeof listener !== 'function') throw new TypeError('onState requires a listener function.');
      const handler = (_event, state) => listener(state);
      ipcRenderer.on('lexora:update:state', handler);
      return () => ipcRenderer.removeListener('lexora:update:state', handler);
    },
  },
});
