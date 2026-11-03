/**
 * @file bootstrap.test.ts
 * @description Verifies Electron single-instance startup, failure cleanup, focus, and shutdown coordination.
 */
import { afterEach, describe, expect, it, vi } from 'vitest';

import { bootstrapDesktop, findForbiddenLaunchArgument, type BootstrapDependencies } from '../src/main.js';
import type { DesktopServerHandle } from '../src/desktop-server.js';

function createApp(lock = true) {
  const listeners = new Map<string, (...args: any[]) => unknown>();
  const app = {
    isPackaged: true,
    requestSingleInstanceLock: vi.fn(() => lock),
    quit: vi.fn(),
    exit: vi.fn(),
    whenReady: vi.fn(async () => undefined),
    getPath: vi.fn(() => '/tmp/lexora-user-data'),
    on: vi.fn((event: string, listener: (...args: any[]) => unknown) => listeners.set(event, listener)),
  };
  return { app, listeners };
}

function createDependencies(app: ReturnType<typeof createApp>['app'], overrides: Partial<BootstrapDependencies> = {}): BootstrapDependencies {
  const server = {
    app: {} as never,
    origin: 'http://127.0.0.1:45678',
    close: vi.fn(async () => undefined),
  };
  return {
    app,
    dialog: { showErrorBox: vi.fn() },
    ipcMain: { handle: vi.fn() },
    processResourcesPath: '/opt/Lexora/resources',
    preloadPath: '/opt/Lexora/preload.cjs',
    iconPath: '/opt/Lexora/icon.png',
    resolvePaths: vi.fn(() => ({
      databasePath: '/tmp/lexora-user-data/data/lexora.db',
      logPath: '/tmp/lexora-user-data/logs/desktop.log',
      rendererRoot: '/opt/Lexora/resources/frontend',
    })),
    startServer: vi.fn(async () => server),
    registerFileDialogs: vi.fn(),
    createWindow: vi.fn(async () => ({ once: vi.fn() })),
    focusWindow: vi.fn(),
    writeError: vi.fn(async () => undefined),
    ...overrides,
  };
}

async function flushMicrotasks() {
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
}

describe('bootstrapDesktop', () => {
  it('rejects sandbox bypass launch arguments before acquiring app resources', async () => {
    expect(findForbiddenLaunchArgument(['electron', '--no-sandbox'])).toBe('--no-sandbox');
    expect(findForbiddenLaunchArgument(['electron', '--disable-setuid-sandbox'])).toBe('--disable-setuid-sandbox');
    expect(findForbiddenLaunchArgument(['electron', '--smoke-test'])).toBeUndefined();

    const { app } = createApp(true);
    const dependencies = createDependencies(app, { args: ['electron', '--no-sandbox'] });
    await bootstrapDesktop(dependencies);

    expect(app.requestSingleInstanceLock).not.toHaveBeenCalled();
    expect(dependencies.startServer).not.toHaveBeenCalled();
    expect(dependencies.resolvePaths).not.toHaveBeenCalled();
    expect(dependencies.createWindow).not.toHaveBeenCalled();
    expect(app.exit).toHaveBeenCalledWith(1);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('quits a second instance before starting the server', async () => {
    const { app } = createApp(false);
    const dependencies = createDependencies(app);

    await bootstrapDesktop(dependencies);

    expect(app.quit).toHaveBeenCalledTimes(1);
    expect(dependencies.startServer).not.toHaveBeenCalled();
    expect(app.whenReady).not.toHaveBeenCalled();
  });

  it('starts resources only after Electron is ready', async () => {
    const { app } = createApp(true);
    let resolveReady!: () => void;
    app.whenReady.mockReturnValue(new Promise<void>((resolve) => { resolveReady = resolve; }));
    const dependencies = createDependencies(app);
    const startup = bootstrapDesktop(dependencies);

    expect(dependencies.startServer).not.toHaveBeenCalled();
    resolveReady();
    await startup;

    expect(dependencies.startServer).toHaveBeenCalledWith(expect.objectContaining({
      databasePath: '/tmp/lexora-user-data/data/lexora.db',
      rendererRoot: '/opt/Lexora/resources/frontend',
    }));
  });

  it('focuses the existing window after a second-instance event', async () => {
    const { app, listeners } = createApp(true);
    const mainWindow = { once: vi.fn() };
    const dependencies = createDependencies(app, { createWindow: vi.fn(async () => mainWindow) });

    await bootstrapDesktop(dependencies);
    listeners.get('second-instance')?.();

    expect(dependencies.focusWindow).toHaveBeenCalledWith(mainWindow);
  });

  it('queues a second-instance focus request until the main window exists', async () => {
    const { app, listeners } = createApp(true);
    const mainWindow = { once: vi.fn() };
    const server = {
      app: {} as never,
      origin: 'http://127.0.0.1:45678',
      close: vi.fn(async () => undefined),
    };
    let resolveWindow!: (window: typeof mainWindow) => void;
    const createWindow = vi.fn(() => new Promise<typeof mainWindow>((resolve) => { resolveWindow = resolve; }));
    const startServer = vi.fn(async () => {
      listeners.get('second-instance')?.();
      return server;
    });
    const dependencies = createDependencies(app, { createWindow, startServer });

    const startup = bootstrapDesktop(dependencies);
    await new Promise<void>((resolve) => setImmediate(resolve));
    resolveWindow(mainWindow);
    await startup;

    expect(dependencies.focusWindow).toHaveBeenCalledTimes(1);
    expect(dependencies.focusWindow).toHaveBeenCalledWith(mainWindow);
  });

  it('routes termination signals through Electron quit handling', async () => {
    const { app } = createApp(true);
    const listeners = new Map<string, () => void>();
    const signalEmitter = {
      once: vi.fn((event: string, listener: () => void) => listeners.set(event, listener)),
      removeListener: vi.fn(),
    };
    const dependencies = createDependencies(app, { signalEmitter });

    await bootstrapDesktop(dependencies);
    listeners.get('SIGTERM')?.();

    expect(app.quit).toHaveBeenCalledTimes(1);
  });

  it('logs startup failure, shows an error, closes partial resources, and exits non-zero', async () => {
    const { app } = createApp(true);
    const startupError = new Error('dialog registration failed');
    const dependencies = createDependencies(app, { registerFileDialogs: vi.fn(() => { throw startupError; }) });

    await expect(bootstrapDesktop(dependencies)).rejects.toThrow(startupError);

    const server = await (dependencies.startServer as ReturnType<typeof vi.fn>).mock.results[0].value;
    expect(server.close).toHaveBeenCalledTimes(1);
    expect(dependencies.writeError).toHaveBeenCalledWith('/tmp/lexora-user-data/logs/desktop.log', 'Desktop startup failed.', startupError);
    expect(dependencies.dialog.showErrorBox).toHaveBeenCalled();
    expect(app.exit).toHaveBeenCalledWith(1);
  });

  it('keeps startup failure handling when partial-resource cleanup rejects', async () => {
    const { app } = createApp(true);
    const startupError = new Error('dialog registration failed');
    const cleanupError = new Error('server close failed');
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const server = {
      app: {} as never,
      origin: 'http://127.0.0.1:45678',
      close: vi.fn(async () => { throw cleanupError; }),
    };
    const dependencies = createDependencies(app, {
      startServer: vi.fn(async () => server),
      registerFileDialogs: vi.fn(() => { throw startupError; }),
    });

    await expect(bootstrapDesktop(dependencies)).rejects.toThrow(startupError);

    expect(dependencies.writeError).toHaveBeenCalledWith('/tmp/lexora-user-data/logs/desktop.log', 'Desktop startup failed.', startupError);
    expect(dependencies.dialog.showErrorBox).toHaveBeenCalled();
    expect(app.exit).toHaveBeenCalledWith(1);
    expect(consoleError).toHaveBeenCalledWith('Desktop startup cleanup failed.', cleanupError);
  });

  it('keeps startup failure handling when technical-error logging rejects', async () => {
    const { app } = createApp(true);
    const startupError = new Error('window creation failed');
    const loggingError = new Error('log directory unavailable');
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const dependencies = createDependencies(app, {
      createWindow: vi.fn(async () => { throw startupError; }),
      writeError: vi.fn(async () => { throw loggingError; }),
    });

    await expect(bootstrapDesktop(dependencies)).rejects.toThrow(startupError);

    expect(dependencies.dialog.showErrorBox).toHaveBeenCalled();
    expect(app.exit).toHaveBeenCalledWith(1);
    expect(consoleError).toHaveBeenCalledWith('Desktop startup failure logging failed.', loggingError);
  });

  it('exits non-zero when shutdown and shutdown-failure logging both reject', async () => {
    const { app, listeners } = createApp(true);
    const shutdownError = new Error('server close failed');
    const loggingError = new Error('shutdown log failed');
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const dependencies = createDependencies(app, {
      startServer: vi.fn(async () => ({
        app: {} as never,
        origin: 'http://127.0.0.1:45678',
        close: vi.fn(async () => { throw shutdownError; }),
      })),
      writeError: vi.fn(async () => { throw loggingError; }),
    });

    await bootstrapDesktop(dependencies);
    listeners.get('before-quit')?.({ preventDefault: vi.fn() });
    await new Promise<void>((resolve) => setImmediate(resolve));

    expect(app.exit).toHaveBeenCalledWith(1);
    expect(consoleError).toHaveBeenCalledWith('Desktop shutdown failure logging failed.', loggingError);
  });

  it('does not create an unhandled rejection when IPC logging rejects', async () => {
    const { app } = createApp(true);
    const loggingError = new Error('file-operation log failed');
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    let logError!: (message: string, error: unknown) => void;
    const dependencies = createDependencies(app, {
      registerFileDialogs: vi.fn((options) => { logError = options.logError; }),
      writeError: vi.fn(async () => { throw loggingError; }),
    });

    await bootstrapDesktop(dependencies);
    logError('Could not save selected file.', new Error('disk full'));
    await new Promise<void>((resolve) => setImmediate(resolve));

    expect(consoleError).toHaveBeenCalledWith('Desktop file-operation logging failed.', loggingError);
    expect(app.exit).not.toHaveBeenCalled();
  });

  it('waits for pending server startup before shutdown and prevents startup continuation', async () => {
    const { app, listeners } = createApp(true);
    const serverClose = vi.fn(async () => undefined);
    const server = { app: {} as never, origin: 'http://127.0.0.1:45678', close: serverClose };
    let resolveServer!: (value: typeof server) => void;
    const startServer = vi.fn(() => new Promise<typeof server>((resolve) => { resolveServer = resolve; }));
    const dependencies = createDependencies(app, { startServer });

    const startup = bootstrapDesktop(dependencies);
    await new Promise<void>((resolve) => setImmediate(resolve));
    listeners.get('before-quit')?.({ preventDefault: vi.fn() });

    expect(app.exit).not.toHaveBeenCalled();
    resolveServer(server);
    await startup;
    await new Promise<void>((resolve) => setImmediate(resolve));

    expect(serverClose).toHaveBeenCalledTimes(1);
    expect(dependencies.registerFileDialogs).not.toHaveBeenCalled();
    expect(dependencies.createWindow).not.toHaveBeenCalled();
    expect(app.exit).toHaveBeenCalledWith(0);
  });

  it('does not continue pending window startup after quit', async () => {
    const { app, listeners } = createApp(true);
    const serverClose = vi.fn(async () => undefined);
    const server = { app: {} as never, origin: 'http://127.0.0.1:45678', close: serverClose };
    const mainWindow = { once: vi.fn(), close: vi.fn(), destroy: vi.fn() };
    let resolveWindow!: (window: typeof mainWindow) => void;
    const createWindow = vi.fn(() => new Promise<typeof mainWindow>((resolve) => { resolveWindow = resolve; }));
    const dependencies = createDependencies(app, {
      startServer: vi.fn(async () => server),
      createWindow,
    });

    const startup = bootstrapDesktop(dependencies);
    await new Promise<void>((resolve) => setImmediate(resolve));
    listeners.get('before-quit')?.({ preventDefault: vi.fn() });
    resolveWindow(mainWindow);
    await startup;
    await new Promise<void>((resolve) => setImmediate(resolve));

    expect(dependencies.registerFileDialogs).not.toHaveBeenCalled();
    expect(mainWindow.once).not.toHaveBeenCalled();
    expect(mainWindow.close).toHaveBeenCalledTimes(1);
    expect(serverClose).toHaveBeenCalledTimes(1);
    expect(app.exit).toHaveBeenCalledWith(0);
  });

  it('keeps rejected pending server startup non-zero during concurrent quit', async () => {
    const { app, listeners } = createApp(true);
    const startupError = new Error('server startup failed');
    let rejectServer!: (error: Error) => void;
    const startServer = vi.fn(() => new Promise<DesktopServerHandle>((_resolve, reject) => { rejectServer = reject; }));
    const dependencies = createDependencies(app, { startServer });

    const startup = bootstrapDesktop(dependencies);
    await new Promise<void>((resolve) => setImmediate(resolve));
    listeners.get('before-quit')?.({ preventDefault: vi.fn() });
    rejectServer(startupError);

    await expect(startup).rejects.toThrow(startupError);
    await new Promise<void>((resolve) => setImmediate(resolve));

    expect(app.exit).toHaveBeenCalledWith(1);
    expect(app.exit).not.toHaveBeenCalledWith(0);
  });

  it('times out a hung smoke renderer readiness operation', async () => {
    vi.useFakeTimers();
    const { app } = createApp(true);
    const dependencies = createDependencies(app, {
      args: ['electron', '--smoke-test'],
      createWindow: vi.fn(async () => new Promise<never>(() => {})),
    });

    const startup = bootstrapDesktop(dependencies);
    const startupFailure = startup.then(() => undefined, (error: unknown) => error);
    await flushMicrotasks();
    await vi.advanceTimersByTimeAsync(20_000);

    expect(app.exit).toHaveBeenCalledWith(1);
    expect(dependencies.dialog.showErrorBox).toHaveBeenCalled();
    await expect(startupFailure).resolves.toMatchObject({ message: 'Desktop startup timed out after 20000ms while loading renderer.' });
  });

  it('times out a hung smoke health readiness operation', async () => {
    vi.useFakeTimers();
    const { app } = createApp(true);
    vi.stubGlobal('fetch', vi.fn(() => new Promise<Response>(() => {})));
    const close = vi.fn(async () => undefined);
    const dependencies = createDependencies(app, {
      args: ['electron', '--smoke-test'],
      startServer: vi.fn(async () => ({ app: {} as never, origin: 'http://127.0.0.1:45678', close })),
    });

    const startup = bootstrapDesktop(dependencies);
    const startupFailure = startup.then(() => undefined, (error: unknown) => error);
    await flushMicrotasks();
    await vi.advanceTimersByTimeAsync(20_000);

    expect(app.exit).toHaveBeenCalledWith(1);
    expect(close).toHaveBeenCalledTimes(1);
    expect(dependencies.dialog.showErrorBox).toHaveBeenCalled();
    await expect(startupFailure).resolves.toMatchObject({ message: 'Desktop startup timed out after 20000ms during health check.' });
  });

  it('asserts the native bridge from the actual smoke renderer', async () => {
    const { app } = createApp(true);
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ success: true, data: { status: 'ok' } }), { status: 200 })));
    const executeJavaScript = vi.fn(async () => 'ok');
    const dependencies = createDependencies(app, {
      args: ['electron', '--smoke-test'],
      createWindow: vi.fn(async () => ({
        webContents: { executeJavaScript },
        once: vi.fn(),
      })),
    });

    await bootstrapDesktop(dependencies);

    expect(executeJavaScript).toHaveBeenCalledWith(expect.stringContaining('window.lexoraDesktop'));
    expect(executeJavaScript.mock.calls[0][0]).toContain('bridge-invalid.txt');
    expect(executeJavaScript.mock.calls[0][0]).toContain('expectedMessage');
    expect(app.exit).toHaveBeenCalledWith(0);
  });

  it('fails smoke mode when the native bridge assertion rejects', async () => {
    const { app } = createApp(true);
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ success: true, data: { status: 'ok' } }), { status: 200 })));
    const bridgeError = new Error('bridge unavailable');
    const dependencies = createDependencies(app, {
      args: ['electron', '--smoke-test'],
      createWindow: vi.fn(async () => ({
        webContents: { executeJavaScript: vi.fn(async () => { throw bridgeError; }) },
        once: vi.fn(),
      })),
    });

    await expect(bootstrapDesktop(dependencies)).rejects.toThrow(bridgeError);
    expect(app.exit).toHaveBeenCalledWith(1);
  });

  describe('desktop updates', () => {
    function updatesHandle() {
      return { start: vi.fn(async () => undefined), dispose: vi.fn() };
    }

    it('starts the update service for a normal launch with the server origin and the IPC registrar', async () => {
      const { app } = createApp(true);
      const handle = updatesHandle();
      const setupUpdates = vi.fn(() => handle);
      const dependencies = createDependencies(app, { setupUpdates });

      await bootstrapDesktop(dependencies);

      expect(setupUpdates).toHaveBeenCalledWith(expect.objectContaining({ ipcMain: dependencies.ipcMain, allowedOrigin: 'http://127.0.0.1:45678' }));
      expect(handle.start).toHaveBeenCalledTimes(1);
    });

    it('never starts updates in smoke or acceptance mode, so packaged checks stay offline', async () => {
      vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ success: true, data: { status: 'ok' } }), { status: 200 })));
      const smokeApp = createApp(true).app;
      const smokeSetup = vi.fn(() => updatesHandle());
      await bootstrapDesktop(createDependencies(smokeApp, {
        args: ['electron', '--smoke-test'],
        setupUpdates: smokeSetup,
        createWindow: vi.fn(async () => ({ webContents: { executeJavaScript: vi.fn(async () => 'ok') }, once: vi.fn() })),
      }));
      expect(smokeSetup).not.toHaveBeenCalled();

      const acceptanceSetup = vi.fn(() => updatesHandle());
      await bootstrapDesktop(createDependencies(createApp(true).app, { args: ['electron', '--acceptance-test=/tmp/lexora-accept/control.json'], setupUpdates: acceptanceSetup }));
      expect(acceptanceSetup).not.toHaveBeenCalled();
    });

    it('forwards update state to the main window renderer', async () => {
      const { app } = createApp(true);
      const send = vi.fn();
      const setupUpdates = vi.fn((_options: { sendState: (state: unknown) => void }) => updatesHandle());
      const dependencies = createDependencies(app, {
        setupUpdates: setupUpdates as never,
        createWindow: vi.fn(async () => ({ once: vi.fn(), webContents: { send } })),
      });

      await bootstrapDesktop(dependencies);
      const state = { available: true };
      setupUpdates.mock.calls[0]![0].sendState(state);

      expect(send).toHaveBeenCalledWith('lexora:update:state', state);
    });

    it('does not throw when the window is gone while sending state', async () => {
      const { app } = createApp(true);
      const send = vi.fn(() => { throw new Error('Object has been destroyed'); });
      const setupUpdates = vi.fn((_options: { sendState: (state: unknown) => void }) => updatesHandle());
      await bootstrapDesktop(createDependencies(app, {
        setupUpdates: setupUpdates as never,
        createWindow: vi.fn(async () => ({ once: vi.fn(), webContents: { send } })),
      }));

      expect(() => setupUpdates.mock.calls[0]![0].sendState({})).not.toThrow();
    });

    it('disposes the update service during shutdown', async () => {
      const { app, listeners } = createApp(true);
      const handle = updatesHandle();
      await bootstrapDesktop(createDependencies(app, { setupUpdates: vi.fn(() => handle) }));

      listeners.get('before-quit')?.({ preventDefault: vi.fn() });
      await new Promise((resolve) => setImmediate(resolve));

      expect(handle.dispose).toHaveBeenCalledTimes(1);
      expect(app.exit).toHaveBeenCalledWith(0);
    });

    it('keeps the app running and logs when the update service fails to start', async () => {
      const { app } = createApp(true);
      const writeError = vi.fn(async () => undefined);
      const handle = { start: vi.fn(async () => { throw new Error('state file unreadable'); }), dispose: vi.fn() };
      await bootstrapDesktop(createDependencies(app, { setupUpdates: vi.fn(() => handle), writeError }));
      await flushMicrotasks();

      expect(app.exit).not.toHaveBeenCalled();
      expect(writeError).toHaveBeenCalledWith('/tmp/lexora-user-data/logs/desktop.log', 'Desktop update service failed to start.', expect.any(Error));
    });

    it('checks the update bridge from the smoke renderer', async () => {
      vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ success: true, data: { status: 'ok' } }), { status: 200 })));
      const executeJavaScript = vi.fn(async () => 'ok');
      await bootstrapDesktop(createDependencies(createApp(true).app, {
        args: ['electron', '--smoke-test'],
        createWindow: vi.fn(async () => ({ webContents: { executeJavaScript }, once: vi.fn() })),
      }));

      const script = (executeJavaScript.mock.calls[0] as unknown as [string])[0];
      for (const method of ['getState', 'download', 'cancelDownload', 'revealDownload', 'dismiss', 'onState']) {
        expect(script).toContain(method);
      }
    });
  });

  it('awaits one shared server close for overlapping quit events', async () => {
    const { app, listeners } = createApp(true);
    const close = vi.fn(async () => undefined);
    const dependencies = createDependencies(app, { startServer: vi.fn(async () => ({ app: {} as never, origin: 'http://127.0.0.1:45678', close })) });

    await bootstrapDesktop(dependencies);
    const firstEvent = { preventDefault: vi.fn() };
    const secondEvent = { preventDefault: vi.fn() };
    listeners.get('before-quit')?.(firstEvent);
    listeners.get('before-quit')?.(secondEvent);
    await new Promise((resolve) => setImmediate(resolve));

    expect(firstEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(secondEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(close).toHaveBeenCalledTimes(1);
    expect(app.exit).toHaveBeenCalledWith(0);
  });
});
