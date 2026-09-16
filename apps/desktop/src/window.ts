/**
 * @file window.ts
 * @description Creates the secure Lexora BrowserWindow and enforces loopback navigation.
 */
import { BrowserWindow, type BrowserWindowConstructorOptions } from 'electron';

interface WindowWebContents {
  setWindowOpenHandler(handler: (details: { url: string }) => { action: 'deny' }): void;
  on(event: 'will-navigate' | 'will-redirect', listener: (event: { preventDefault: () => void }, url: string) => void): void;
  executeJavaScript(code: string): Promise<unknown>;
  session: {
    setPermissionRequestHandler(handler: (webContents: unknown, permission: string, callback: (allowed: boolean) => void) => void): void;
  };
}

export interface WindowLike {
  webContents: WindowWebContents;
  once(event: 'ready-to-show' | 'closed', listener: () => void): void;
  show(): void;
  loadURL(url: string): Promise<unknown>;
  close?: () => void;
  destroy?: () => void;
}

export interface CreateMainWindowOptions {
  origin: string;
  preloadPath: string;
  iconPath: string;
  showWindow?: boolean;
  BrowserWindowCtor?: new (options: BrowserWindowConstructorOptions) => WindowLike;
}

function shouldBlockNavigation(url: string, allowedOrigin: string): boolean {
  try {
    return new URL(url).origin !== allowedOrigin;
  } catch {
    return true;
  }
}

export async function createMainWindow(options: CreateMainWindowOptions): Promise<WindowLike> {
  const BrowserWindowCtor = options.BrowserWindowCtor ?? BrowserWindow;
  const mainWindow = new BrowserWindowCtor({
    width: 1280,
    height: 800,
    minWidth: 960,
    minHeight: 640,
    show: false,
    icon: options.iconPath,
    webPreferences: {
      preload: options.preloadPath,
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true,
    },
  });

  mainWindow.once('ready-to-show', () => {
    if (options.showWindow !== false) mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  const blockUnapprovedNavigation = (event: { preventDefault: () => void }, url: string) => {
    if (shouldBlockNavigation(url, options.origin)) event.preventDefault();
  };
  mainWindow.webContents.on('will-navigate', blockUnapprovedNavigation);
  mainWindow.webContents.on('will-redirect', blockUnapprovedNavigation);
  mainWindow.webContents.session.setPermissionRequestHandler((_webContents, _permission, callback) => {
    callback(false);
  });
  await mainWindow.loadURL(options.origin);
  return mainWindow;
}
