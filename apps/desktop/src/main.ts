/**
 * @file main.ts
 * @description Bootstraps the secure Electron desktop, embedded server, and single-instance lifecycle.
 */
import { mkdir, rename, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, isAbsolute, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { app, dialog, ipcMain, shell } from 'electron';

import { UPDATE_CHANNELS, type UpdateState } from './contracts.js';
import { createShutdownController, focusMainWindow } from './lifecycle.js';
import { writeDesktopError } from './logging.js';
import { resolveDesktopIconPath, resolveDesktopPaths, resolveDevelopmentRendererRoot, type DesktopPaths } from './paths.js';
import { registerFileDialogHandlers } from './file-dialogs.js';
import { startDesktopServer, type DesktopServerHandle } from './desktop-server.js';
import { createUpdateService } from './update-service.js';
import { createMainWindow, type CreateMainWindowOptions, type WindowLike } from './window.js';

export type DesktopTestMode =
  | { kind: 'normal' }
  | { kind: 'smoke' }
  | { kind: 'acceptance'; controlFile: string };

interface DesktopApp {
  isPackaged: boolean;
  requestSingleInstanceLock(): boolean;
  quit(): void;
  exit(code: number): void;
  whenReady(): Promise<void>;
  getPath(name: 'userData'): string;
  on(event: 'second-instance' | 'before-quit' | 'window-all-closed', listener: (...args: unknown[]) => unknown): unknown;
}

interface ProcessSignalEmitter {
  once(event: 'SIGINT' | 'SIGTERM', listener: () => void): unknown;
  removeListener(event: 'SIGINT' | 'SIGTERM', listener: () => void): unknown;
}

interface RegisterFileDialogsInput {
  ipcMain: unknown;
  dialog: unknown;
  allowedOrigin: string;
  logError: (message: string, error: unknown) => void | Promise<void>;
}

interface SetupUpdatesInput {
  ipcMain: unknown;
  allowedOrigin: string;
  sendState: (state: UpdateState) => void;
  logError: (message: string, error: unknown) => void;
}

export interface UpdatesHandle {
  start(): Promise<void>;
  dispose(): void;
}

export interface BootstrapDependencies {
  app: DesktopApp;
  dialog: { showErrorBox(title: string, content: string): void };
  ipcMain: unknown;
  processResourcesPath: string;
  preloadPath: string;
  iconPath: string;
  args?: string[];
  resolvePaths: (userDataPath: string, resourcesPath: string) => DesktopPaths;
  startServer: (options: { databasePath: string; rendererRoot: string; logger?: boolean }) => Promise<DesktopServerHandle>;
  registerFileDialogs: (options: RegisterFileDialogsInput) => void;
  setupUpdates?: (options: SetupUpdatesInput) => UpdatesHandle;
  createWindow: (options: CreateMainWindowOptions) => Promise<WindowLike>;
  focusWindow: (mainWindow: WindowLike | null) => void;
  writeError: (logPath: string, message: string, error: unknown) => Promise<void>;
  signalEmitter?: ProcessSignalEmitter;
  exit?: (code: number) => void;
}

const STARTUP_TIMEOUT_MS = 20_000;
const FORBIDDEN_LAUNCH_ARGUMENTS = new Set([
  `--${'no-sandbox'}`,
  `--disable-${'setuid-sandbox'}`,
]);

export function findForbiddenLaunchArgument(args: string[] = process.argv): string | undefined {
  return args.find((argument) => FORBIDDEN_LAUNCH_ARGUMENTS.has(argument));
}

const DESKTOP_BRIDGE_SMOKE_SCRIPT = `
  (async () => {
    const bridge = window.lexoraDesktop;
    const methods = ['openImportFile', 'openBackupFile', 'saveExportFile', 'saveBackupFile'];
    if (!bridge || methods.some((method) => typeof bridge[method] !== 'function')) {
      throw new Error('Lexora desktop bridge is incomplete.');
    }
    const updateMethods = ['getState', 'download', 'cancelDownload', 'revealDownload', 'dismiss', 'onState'];
    if (!bridge.updates || updateMethods.some((method) => typeof bridge.updates[method] !== 'function')) {
      throw new Error('Lexora desktop update bridge is incomplete.');
    }
    const malformedRequests = [
      [bridge.openImportFile({}), 'Invalid file-open request.'],
      [bridge.openBackupFile({}), 'Invalid file-open request.'],
      [bridge.saveExportFile({ suggestedName: 'bridge-invalid.txt', content: 'smoke', format: 'CSV' }), 'Suggested file name does not match its format.'],
      [bridge.saveBackupFile({ suggestedName: 'bridge-invalid.txt', content: 'smoke' }), 'Suggested file name does not match its format.'],
    ];
    const errors = await Promise.all(malformedRequests.map(async ([request, expectedMessage]) => {
      try {
        await request;
        return { message: '', expectedMessage };
      } catch (error) {
        return {
          message: error && typeof error.message === 'string' ? error.message : String(error),
          expectedMessage,
        };
      }
    }));
    if (errors.some(({ message, expectedMessage }) => !message.includes(expectedMessage))) {
      throw new Error('Lexora desktop bridge rejected with an unexpected error.');
    }
    return 'ok';
  })();
`;

function withStartupTimeout<T>(operation: Promise<T>, phase: string): Promise<T> {
  let timeout: ReturnType<typeof setTimeout>;
  const timeoutPromise = new Promise<never>((_resolve, reject) => {
    timeout = setTimeout(() => reject(new Error(`Desktop startup timed out after ${STARTUP_TIMEOUT_MS}ms ${phase}.`)), STARTUP_TIMEOUT_MS);
  });
  return Promise.race([operation, timeoutPromise]).finally(() => clearTimeout(timeout));
}

export function parseDesktopTestMode(args: string[] = process.argv): DesktopTestMode {
  if (args.includes('--smoke-test')) return { kind: 'smoke' };
  const acceptanceArgument = args.find((argument) => argument.startsWith('--acceptance-test='));
  if (!acceptanceArgument) return { kind: 'normal' };
  const controlFile = acceptanceArgument.slice('--acceptance-test='.length);
  if (!isAbsolute(controlFile)) throw new Error('--acceptance-test requires an absolute control-file path.');
  return { kind: 'acceptance', controlFile };
}

function getExit(dependencies: BootstrapDependencies): (code: number) => void {
  return dependencies.exit ?? ((code) => dependencies.app.exit(code));
}

async function writeAcceptanceControlFile(controlFile: string, origin: string, userDataPath: string): Promise<void> {
  await mkdir(dirname(controlFile), { recursive: true });
  const temporaryPath = `${controlFile}.${process.pid}.tmp`;
  await writeFile(temporaryPath, `${JSON.stringify({ pid: process.pid, origin, userDataPath })}\n`, 'utf8');
  await rename(temporaryPath, controlFile);
}

async function assertHealth(origin: string): Promise<void> {
  const response = await fetch(`${origin}/api/health`);
  if (!response.ok) throw new Error(`Desktop health check returned HTTP ${response.status}.`);
  const payload = await response.json() as { success?: boolean; data?: { status?: string } };
  if (payload.success !== true || payload.data?.status !== 'ok') throw new Error('Desktop health check returned an invalid response.');
}

export async function bootstrapDesktop(dependencies: BootstrapDependencies): Promise<void> {
  const forbiddenLaunchArgument = findForbiddenLaunchArgument(dependencies.args);
  if (forbiddenLaunchArgument) {
    try {
      dependencies.dialog.showErrorBox('Lexora cannot start securely', `Launch argument ${forbiddenLaunchArgument} is not permitted.`);
    } catch {
      // Electron may not be ready to display an error dialog.
    }
    getExit(dependencies)(1);
    return;
  }

  if (!dependencies.app.requestSingleInstanceLock()) {
    dependencies.app.quit();
    return;
  }


  let mainWindow: WindowLike | null = null;
  let pendingWindow: WindowLike | undefined;
  let windowPromise: Promise<WindowLike> | undefined;
  let server: DesktopServerHandle | undefined;
  let serverPromise: Promise<DesktopServerHandle> | undefined;
  let desktopPaths: DesktopPaths | undefined;
  let updates: UpdatesHandle | undefined;
  let startupFailure = false;
  let quitStarted = false;
  let exitRequested = false;
  let signalQuitRequested = false;
  let signalHandlersRemoved = false;
  let focusRequestedBeforeWindow = false;
  const exit = getExit(dependencies);
  const exitOnce = (code: number) => {
    if (exitRequested) return;
    exitRequested = true;
    exit(code);
  };
  const removeSignalHandlers = () => {
    if (signalHandlersRemoved || !dependencies.signalEmitter) return;
    signalHandlersRemoved = true;
    dependencies.signalEmitter.removeListener('SIGINT', handleSignal);
    dependencies.signalEmitter.removeListener('SIGTERM', handleSignal);
  };
  const handleSignal = () => {
    if (signalQuitRequested) return;
    signalQuitRequested = true;
    dependencies.app.quit();
  };
  const closeWindow = (window: WindowLike | undefined) => {
    if (!window) return;
    if (typeof window.close === 'function') window.close();
    else window.destroy?.();
  };
  const shutdown = createShutdownController(async () => {
    updates?.dispose();
    if (!server && serverPromise) server = await serverPromise;
    if (!startupFailure && windowPromise && !pendingWindow) pendingWindow = await windowPromise;
    closeWindow(pendingWindow ?? mainWindow ?? undefined);
    await server?.close();
  });
  const reportLoggingFailure = (message: string, error: unknown) => {
    try {
      console.error(message, error);
    } catch {
      // Logging fallback must never create another shutdown failure.
    }
  };
  const logBestEffort = async (message: string, error: unknown, failureMessage: string) => {
    if (!desktopPaths) return;
    try {
      await dependencies.writeError(desktopPaths.logPath, message, error);
    } catch (loggingError) {
      reportLoggingFailure(failureMessage, loggingError);
    }
  };
  const shutdownAfterStartupFailure = async () => {
    try {
      await shutdown();
    } catch (cleanupError) {
      reportLoggingFailure('Desktop startup cleanup failed.', cleanupError);
      await logBestEffort('Desktop startup cleanup failed.', cleanupError, 'Desktop startup cleanup logging failed.');
    }
  };
  const focusWindowWhenReady = () => {
    if (!mainWindow) {
      focusRequestedBeforeWindow = true;
      return;
    }
    dependencies.focusWindow(mainWindow);
  };

  dependencies.signalEmitter?.once('SIGINT', handleSignal);
  dependencies.signalEmitter?.once('SIGTERM', handleSignal);

  dependencies.app.on('second-instance', focusWindowWhenReady);
  dependencies.app.on('before-quit', (event) => {
    (event as { preventDefault: () => void }).preventDefault();
    removeSignalHandlers();
    if (quitStarted) return;
    quitStarted = true;
    void shutdown().then(() => {
      if (!startupFailure) exitOnce(0);
    }).catch(async (error) => {
      await logBestEffort('Desktop shutdown failed.', error, 'Desktop shutdown failure logging failed.');
      exitOnce(1);
    });
  });
  dependencies.app.on('window-all-closed', () => dependencies.app.quit());

  try {
    await dependencies.app.whenReady();
    if (quitStarted) return;
    const userDataPath = dependencies.app.getPath('userData');
    desktopPaths = dependencies.resolvePaths(userDataPath, dependencies.processResourcesPath);
    const mode = parseDesktopTestMode(dependencies.args);
    serverPromise = dependencies.startServer({ databasePath: desktopPaths.databasePath, rendererRoot: desktopPaths.rendererRoot, logger: false });
    server = await serverPromise;
    if (quitStarted) {
      await shutdown();
      return;
    }
    windowPromise = dependencies.createWindow({
      origin: server.origin,
      preloadPath: dependencies.preloadPath,
      iconPath: dependencies.iconPath,
      showWindow: mode.kind === 'normal',
    });
    pendingWindow = await (mode.kind === 'normal' ? windowPromise : withStartupTimeout(windowPromise, 'while loading renderer'));
    if (quitStarted) {
      mainWindow = pendingWindow;
      pendingWindow = undefined;
      await shutdown();
      return;
    }
    mainWindow = pendingWindow;
    pendingWindow = undefined;
    if (quitStarted) {
      await shutdown();
      return;
    }
    dependencies.registerFileDialogs({
      ipcMain: dependencies.ipcMain,
      dialog: dependencies.dialog,
      allowedOrigin: server.origin,
      logError: (message, error) => {
        void logBestEffort(message, error, 'Desktop file-operation logging failed.');
      },
    });
    mainWindow.once('closed', () => { mainWindow = null; });
    if (mode.kind === 'normal' && dependencies.setupUpdates) {
      updates = dependencies.setupUpdates({
        ipcMain: dependencies.ipcMain,
        allowedOrigin: server.origin,
        sendState: (state) => {
          try {
            mainWindow?.webContents.send?.(UPDATE_CHANNELS.state, state);
          } catch {
            // The window may be closing; the next state push or launch recovers.
          }
        },
        logError: (message, error) => { void logBestEffort(message, error, 'Desktop update logging failed.'); },
      });
      void updates.start().catch((error) => logBestEffort('Desktop update service failed to start.', error, 'Desktop update logging failed.'));
    }
    if (focusRequestedBeforeWindow) {
      focusRequestedBeforeWindow = false;
      dependencies.focusWindow(mainWindow);
    }

    if (mode.kind === 'smoke') {
      await withStartupTimeout(assertHealth(server.origin), 'during health check');
      await withStartupTimeout(mainWindow.webContents.executeJavaScript(DESKTOP_BRIDGE_SMOKE_SCRIPT), 'during desktop bridge check');
      await shutdown();
      exitOnce(0);
    } else if (mode.kind === 'acceptance') {
      await writeAcceptanceControlFile(mode.controlFile, server.origin, userDataPath);
    }
  } catch (error) {
    startupFailure = true;
    removeSignalHandlers();
    await shutdownAfterStartupFailure();
    await logBestEffort('Desktop startup failed.', error, 'Desktop startup failure logging failed.');
    try {
      dependencies.dialog.showErrorBox('Lexora failed to start', 'Lexora could not start. See desktop.log for technical details.');
    } catch (dialogError) {
      reportLoggingFailure('Desktop startup failure dialog failed.', dialogError);
    }
    exitOnce(1);
    throw error;
  }
}

function createProductionDependencies(): BootstrapDependencies {
  // Chromium disables Linux system voices unless Speech Dispatcher is explicitly enabled before ready.
  if (process.platform === 'linux') app.commandLine.appendSwitch('enable-speech-dispatcher');
  const desktopRoot = dirname(fileURLToPath(import.meta.url));
  const packagedResourcesPath = app.isPackaged ? process.resourcesPath : resolve(desktopRoot, '../../');
  const iconPath = resolveDesktopIconPath(desktopRoot, packagedResourcesPath, app.isPackaged);
  const exit = (code: number) => app.exit(code);

  return {
    app,
    dialog,
    ipcMain,
    processResourcesPath: packagedResourcesPath,
    preloadPath: join(desktopRoot, 'preload.cjs'),
    iconPath,
    args: [...process.argv, ...(process.env.LEXORA_INJECTED_ELECTRON_ARGS?.split(' ').filter(Boolean) ?? [])],
    resolvePaths: (userDataPath, resourcesPath) => {
      const paths = resolveDesktopPaths(userDataPath, resourcesPath);
      return app.isPackaged ? paths : { ...paths, rendererRoot: resolveDevelopmentRendererRoot(desktopRoot) };
    },
    startServer: startDesktopServer,
    registerFileDialogs: (options) => registerFileDialogHandlers(options as Parameters<typeof registerFileDialogHandlers>[0]),
    setupUpdates: (options) => createUpdateService({
      ...options,
      ipcMain: options.ipcMain as Parameters<typeof createUpdateService>[0]['ipcMain'],
      app,
      shell,
      homeDir: homedir(),
      execPath: process.execPath,
      env: process.env,
      fetch,
    }),
    createWindow: createMainWindow,
    focusWindow: (mainWindow) => focusMainWindow(mainWindow as never),
    writeError: writeDesktopError,
    signalEmitter: process,
    exit,
  };
}

if (process.versions.electron) {
  void bootstrapDesktop(createProductionDependencies()).catch(() => undefined);
}
