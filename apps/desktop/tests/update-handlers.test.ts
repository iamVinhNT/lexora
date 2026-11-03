/**
 * @file update-handlers.test.ts
 * @description Verifies sender validation, payload validation, and delegation for desktop update IPC handlers.
 */
import { describe, expect, it, vi } from 'vitest';

import { UPDATE_CHANNELS, type UpdateState } from '../src/contracts.js';
import { registerUpdateHandlers } from '../src/update-handlers.js';

const ORIGIN = 'http://127.0.0.1:45678';
const STATE: UpdateState = { available: true, currentVersion: '0.3.0', latestVersion: '0.4.0', install: 'appimage', downloadDir: '~/Downloads', download: { status: 'idle', receivedBytes: 0 } };

function setup() {
  const handlers = new Map<string, (event: unknown, request?: unknown) => Promise<unknown>>();
  const ipcMain = { handle: vi.fn((channel: string, handler: (event: unknown, request?: unknown) => Promise<unknown>) => handlers.set(channel, handler)) };
  const controller = {
    getState: vi.fn(() => STATE),
    startDownload: vi.fn(() => STATE),
    cancelDownload: vi.fn(() => STATE),
    revealDownload: vi.fn(() => ({ shown: true })),
    dismiss: vi.fn(async () => STATE),
  };
  registerUpdateHandlers({ ipcMain, allowedOrigin: ORIGIN, controller });
  return { handlers, controller };
}
const trusted = { senderFrame: { url: `${ORIGIN}/` } };
const untrusted = { senderFrame: { url: 'https://evil.example/' } };

describe('registerUpdateHandlers', () => {
  it('registers exactly the five invoke channels', () => {
    const { handlers } = setup();
    expect([...handlers.keys()].sort()).toEqual([UPDATE_CHANNELS.cancelDownload, UPDATE_CHANNELS.dismiss, UPDATE_CHANNELS.download, UPDATE_CHANNELS.getState, UPDATE_CHANNELS.revealDownload].sort());
  });

  it.each([UPDATE_CHANNELS.getState, UPDATE_CHANNELS.download, UPDATE_CHANNELS.cancelDownload, UPDATE_CHANNELS.revealDownload, UPDATE_CHANNELS.dismiss])('rejects an untrusted sender on %s', async (channel) => {
    const { handlers, controller } = setup();
    await expect(handlers.get(channel)!(untrusted, { version: '0.4.0' })).rejects.toThrow('Update operation is not allowed from this page.');
    for (const fn of Object.values(controller)) expect(fn).not.toHaveBeenCalled();
  });

  it('delegates the trusted channels to the controller', async () => {
    const { handlers, controller } = setup();
    expect(await handlers.get(UPDATE_CHANNELS.getState)!(trusted)).toEqual(STATE);
    expect(await handlers.get(UPDATE_CHANNELS.download)!(trusted)).toEqual(STATE);
    expect(await handlers.get(UPDATE_CHANNELS.cancelDownload)!(trusted)).toEqual(STATE);
    expect(await handlers.get(UPDATE_CHANNELS.revealDownload)!(trusted)).toEqual({ shown: true });
    expect(controller.startDownload).toHaveBeenCalledTimes(1);
    expect(controller.cancelDownload).toHaveBeenCalledTimes(1);
    expect(controller.revealDownload).toHaveBeenCalledTimes(1);
  });

  it('ignores any payload sent to channels that take none', async () => {
    const { handlers, controller } = setup();
    await handlers.get(UPDATE_CHANNELS.download)!(trusted, { url: 'https://evil.example/x', path: '/etc/passwd' });
    await handlers.get(UPDATE_CHANNELS.revealDownload)!(trusted, { path: '/etc/passwd' });
    expect(controller.startDownload).toHaveBeenCalledWith();
    expect(controller.revealDownload).toHaveBeenCalledWith();
  });

  it('accepts a dismiss payload with a version string only', async () => {
    const { handlers, controller } = setup();
    await handlers.get(UPDATE_CHANNELS.dismiss)!(trusted, { version: '0.4.0' });
    expect(controller.dismiss).toHaveBeenCalledWith('0.4.0');
  });

  it.each([undefined, null, 'x', { version: 4 }, { version: '0.4.0', extra: 1 }, {}])('rejects the dismiss payload %j', async (payload) => {
    const { handlers, controller } = setup();
    await expect(handlers.get(UPDATE_CHANNELS.dismiss)!(trusted, payload)).rejects.toThrow('Invalid update request.');
    expect(controller.dismiss).not.toHaveBeenCalled();
  });
});
