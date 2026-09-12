/**
 * @file server.test.ts
 * @description Lifecycle and configuration coverage for the Lexora server entry point.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';
import { createServer as createTcpServer } from 'node:net';
import { EventEmitter } from 'node:events';
import type { FastifyInstance } from 'fastify';
import { parseDatabasePath, parsePort, startServer } from '../src/server.js';

async function getFreePort(): Promise<number> {
  const tcpServer = createTcpServer();
  await new Promise<void>((resolve, reject) => {
    tcpServer.once('error', reject);
    tcpServer.listen(0, '127.0.0.1', () => resolve());
  });
  const address = tcpServer.address();
  if (!address || typeof address === 'string') {
    tcpServer.close();
    throw new Error('Failed to determine free test port');
  }
  const port = address.port;
  await new Promise<void>((resolve, reject) => tcpServer.close((error) => (error ? reject(error) : resolve())));
  return port;
}

describe('server lifecycle', () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    for (const key of Object.keys(process.env)) {
      if (!(key in originalEnv)) delete process.env[key];
    }
    Object.assign(process.env, originalEnv);
  });

  it('rejects ports outside exactly 1 through 65535', () => {
    expect(() => parsePort('0')).toThrow(/1 and 65535/);
    expect(() => parsePort('')).toThrow(/1 and 65535/);
    expect(() => parsePort('65536')).toThrow(/1 and 65535/);
    expect(() => parsePort('3000.5')).toThrow(/1 and 65535/);
    expect(parsePort(undefined)).toBe(3001);
  });

  it('validates database path instead of silently accepting an empty path', () => {
    expect(parseDatabasePath(undefined)).toBe('./data/lexora.db');
    expect(parseDatabasePath(':memory:')).toBe(':memory:');
    expect(() => parseDatabasePath('')).toThrow(/DATABASE_PATH/);
    expect(() => parseDatabasePath('   ')).toThrow(/DATABASE_PATH/);
    expect(() => parseDatabasePath('bad\u0000path')).toThrow(/DATABASE_PATH/);
  });

  it('starts on a safe test port and removes signal listeners after close', async () => {
    const port = await getFreePort();
    const beforeInt = process.listenerCount('SIGINT');
    const beforeTerm = process.listenerCount('SIGTERM');

    const app = await startServer({
      env: { PORT: String(port), DATABASE_PATH: ':memory:' },
      logger: false,
    });

    expect(process.listenerCount('SIGINT')).toBe(beforeInt + 1);
    expect(process.listenerCount('SIGTERM')).toBe(beforeTerm + 1);
    expect((await app.inject({ method: 'GET', url: '/api/health' })).statusCode).toBe(200);

    await app.close();
    expect(process.listenerCount('SIGINT')).toBe(beforeInt);
    expect(process.listenerCount('SIGTERM')).toBe(beforeTerm);
  });

  it('closes the app and removes signal listeners when listen fails', async () => {
    const port = await getFreePort();
    const occupied = createTcpServer();
    await new Promise<void>((resolve, reject) => {
      occupied.once('error', reject);
      occupied.listen(port, '0.0.0.0', () => resolve());
    });

    const beforeInt = process.listenerCount('SIGINT');
    const beforeTerm = process.listenerCount('SIGTERM');
    await expect(
      startServer({
        env: { PORT: String(port), DATABASE_PATH: ':memory:' },
        logger: false,
      })
    ).rejects.toThrow();

    expect(process.listenerCount('SIGINT')).toBe(beforeInt);
    expect(process.listenerCount('SIGTERM')).toBe(beforeTerm);
    await new Promise<void>((resolve, reject) => occupied.close((error) => (error ? reject(error) : resolve())));
  });

  it('runs the controlled SIGTERM shutdown handler and removes injected listeners', async () => {
    const signals = new EventEmitter();
    const close = vi.fn().mockResolvedValue(undefined);
    const fakeApp = {
      log: { info: vi.fn(), error: vi.fn() },
      addHook: vi.fn(),
      listen: vi.fn().mockResolvedValue('http://127.0.0.1:1'),
      close,
    } as unknown as FastifyInstance;

    await startServer({
      env: { PORT: '3001', DATABASE_PATH: ':memory:' },
      logger: false,
      signalEmitter: signals,
      appFactory: async () => fakeApp,
    });

    expect(signals.listenerCount('SIGTERM')).toBe(1);
    signals.emit('SIGTERM');
    await new Promise<void>((resolve) => setImmediate(resolve));

    expect(close).toHaveBeenCalledTimes(1);
    expect(signals.listenerCount('SIGINT')).toBe(0);
    expect(signals.listenerCount('SIGTERM')).toBe(0);
  });

  it('catches shutdown errors, logs them, and removes injected SIGINT listener', async () => {
    const signals = new EventEmitter();
    const closeError = new Error('shutdown secret');
    const logError = vi.fn();
    const fakeApp = {
      log: { info: vi.fn(), error: logError },
      addHook: vi.fn(),
      listen: vi.fn().mockResolvedValue('http://127.0.0.1:1'),
      close: vi.fn().mockRejectedValue(closeError),
    } as unknown as FastifyInstance;

    await startServer({
      env: { PORT: '3001', DATABASE_PATH: ':memory:' },
      logger: false,
      signalEmitter: signals,
      appFactory: async () => fakeApp,
    });

    signals.emit('SIGINT');
    await new Promise<void>((resolve) => setImmediate(resolve));

    expect(logError).toHaveBeenCalledWith(
      expect.objectContaining({ err: closeError, signal: 'SIGINT' }),
      'Failed to shut down Lexora API cleanly'
    );
    expect(signals.listenerCount('SIGINT')).toBe(0);
    expect(signals.listenerCount('SIGTERM')).toBe(0);
  });
});
