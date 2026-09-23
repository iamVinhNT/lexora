/**
 * @file window.test.ts
 * @description Verifies secure BrowserWindow defaults and loopback navigation policy.
 */
import { describe, expect, it, vi } from 'vitest';

import { createMainWindow } from '../src/window.js';

describe('createMainWindow', () => {
  it('maximizes visible windows before showing them and leaves hidden windows untouched', async () => {
    const calls: string[] = [];
    const browserWindow = {
      webContents: {
        setWindowOpenHandler: vi.fn(),
        on: vi.fn(),
        session: { setPermissionRequestHandler: vi.fn() },
      },
      once: vi.fn((_event: string, listener: () => void) => listener()),
      maximize: vi.fn(() => calls.push('maximize')),
      show: vi.fn(() => calls.push('show')),
      loadURL: vi.fn(async () => undefined),
    };
    const BrowserWindowCtor = vi.fn(() => browserWindow);

    await createMainWindow({ BrowserWindowCtor: BrowserWindowCtor as never, origin: 'http://127.0.0.1:45678', preloadPath: '/opt/preload.cjs', iconPath: '/opt/icon.png' });
    expect(calls).toEqual(['maximize', 'show']);

    calls.length = 0;
    await createMainWindow({ BrowserWindowCtor: BrowserWindowCtor as never, origin: 'http://127.0.0.1:45678', preloadPath: '/opt/preload.cjs', iconPath: '/opt/icon.png', showWindow: false });
    expect(calls).toEqual([]);
  });

  it('creates a sandboxed window with restricted navigation and permissions', async () => {
    const handlers = new Map<string, (...args: unknown[]) => unknown>();
    const loadURL = vi.fn(async () => undefined);
    const browserWindow = {
      webContents: {
        setWindowOpenHandler: vi.fn((handler: (...args: unknown[]) => unknown) => handlers.set('window-open', handler)),
        on: vi.fn((event: string, handler: (...args: unknown[]) => unknown) => handlers.set(event, handler)),
        session: {
          setPermissionRequestHandler: vi.fn((handler: (...args: unknown[]) => unknown) => handlers.set('permission', handler)),
        },
      },
      once: vi.fn(),
      maximize: vi.fn(),
      show: vi.fn(),
      loadURL,
    };
    const BrowserWindowCtor = vi.fn(() => browserWindow);

    await createMainWindow({
      BrowserWindowCtor: BrowserWindowCtor as never,
      origin: 'http://127.0.0.1:45678',
      preloadPath: '/opt/Lexora/preload.cjs',
      iconPath: '/opt/Lexora/icon.png',
    });

    const options = BrowserWindowCtor.mock.calls[0][0] as { webPreferences: Record<string, unknown> };
    expect(options.webPreferences).toMatchObject({
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true,
    });
    expect(options.icon).toBe('/opt/Lexora/icon.png');
    expect(loadURL).toHaveBeenCalledWith('http://127.0.0.1:45678');
    expect(handlers.get('window-open')?.({ url: 'https://example.com' })).toEqual({ action: 'deny' });

    const navigation = { preventDefault: vi.fn() };
    handlers.get('will-navigate')?.(navigation, 'https://example.com');
    expect(navigation.preventDefault).toHaveBeenCalledTimes(1);
    handlers.get('will-redirect')?.(navigation, 'https://example.com');
    expect(navigation.preventDefault).toHaveBeenCalledTimes(2);
    expect(() => handlers.get('will-navigate')?.(navigation, 'not a valid URL')).not.toThrow();
    expect(navigation.preventDefault).toHaveBeenCalledTimes(3);
    expect(handlers.get('permission')?.({}, 'clipboard-read', vi.fn())).toBeUndefined();
  });
});
