/**
 * @file runtime-smoke.test.mjs
 * @description Focused regression coverage for the production-runtime smoke harness.
 */

import { createServer } from 'node:http';
import { EventEmitter } from 'node:events';
import { once } from 'node:events';
import { dirname, resolve } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  PortCollisionError,
  createChildRuntime,
  createEarlyExitError,
  fetchHealthPayload,
  installParentSignalHandlers,
  isPortCollision,
  runWithStartupRetries,
  spawnBackend,
  stopChild,
  validateHealthResponse,
  waitForHealth,
} from '../../scripts/runtime-smoke.mjs';

const openServers = new Set();
const FIXTURE_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../fixtures/runtime-smoke');
const FIXTURES = {
  earlyExit: resolve(FIXTURE_ROOT, 'early-exit.mjs'),
  ignoreTerm: resolve(FIXTURE_ROOT, 'ignore-term.mjs'),
  phraseExit: resolve(FIXTURE_ROOT, 'phrase-exit.mjs'),
  portServer: resolve(FIXTURE_ROOT, 'port-server.mjs'),
};

afterEach(async () => {
  vi.unstubAllGlobals();
  await Promise.all([...openServers].map((server) => new Promise((resolve, reject) => {
    openServers.delete(server);
    if (!server.listening) {
      resolve();
      return;
    }
    server.close((error) => (error ? reject(error) : resolve()));
  })));
  openServers.clear();
});

async function waitForRuntimeOutput(runtime, marker, timeoutMs = 1_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (`${runtime.stdout}\n${runtime.stderr}`.includes(marker)) return;
    await delay(5);
  }
  throw new Error(`Timed out waiting for child output: ${marker}`);
}

async function waitForProcessGone(pid, timeoutMs = 1_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      process.kill(pid, 0);
    } catch (error) {
      if (error?.code === 'ESRCH') return;
      throw error;
    }
    await delay(5);
  }
  throw new Error(`Process ${pid} remained alive after cleanup`);
}

async function waitForCondition(condition, description, timeoutMs = 1_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (condition()) return;
    await delay(5);
  }
  throw new Error(`Timed out waiting for ${description}`);
}

async function openEphemeralServer() {
  const server = createServer();
  openServers.add(server);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('Missing ephemeral port');
  return { server, port: address.port };
}

async function closeTrackedServer(server) {
  openServers.delete(server);
  if (!server.listening) return;
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
}

async function getEphemeralPort() {
  const { server, port } = await openEphemeralServer();
  await closeTrackedServer(server);
  return port;
}

describe('runtime smoke health contract', () => {
  it('accepts only the exact health response envelope', () => {
    expect(() => validateHealthResponse(200, JSON.stringify({
      success: true,
      data: { status: 'ok', app: 'Lexora API' },
    }))).not.toThrow();

    for (const payload of [
      JSON.stringify({ success: true, data: { status: 'ok', app: 'Lexora API', extra: true } }),
      JSON.stringify({ success: true, data: { status: 'ok' } }),
      JSON.stringify({ success: true, data: { status: 'ready', app: 'Lexora API' } }),
      JSON.stringify({ success: true, data: { status: 'ok', app: 'Lexora API' }, extra: true }),
      JSON.stringify([]),
      JSON.stringify({ success: 'true', data: { status: 'ok', app: 'Lexora API' } }),
    ]) {
      expect(() => validateHealthResponse(200, payload)).toThrow(/invalid success envelope/);
    }

    expect(() => validateHealthResponse(200, '{')).toThrow(/invalid JSON/);
    expect(() => validateHealthResponse(503, '{}')).toThrow(/HTTP 503/);
  });
});

describe('runtime smoke HTTP deadline', () => {
  it('aborts when response body consumption stalls after headers', async () => {
    const server = createServer((_request, response) => {
      response.writeHead(200, { 'content-type': 'application/json' });
      response.write('{"success":true');
    });
    openServers.add(server);
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    const address = server.address();

    await expect(fetchHealthPayload(`http://127.0.0.1:${address.port}/api/health`, 30))
      .rejects.toThrow(/abort|timed out/i);
  });

  it('cancels the stalled body and reports an explicit body timeout', async () => {
    let requestSignal;
    const cancel = vi.fn(() => Promise.resolve());
    vi.stubGlobal('fetch', vi.fn(async (_url, options) => {
      requestSignal = options.signal;
      return {
        status: 200,
        body: { cancel },
        text: () => new Promise(() => {}),
      };
    }));

    await expect(fetchHealthPayload('http://127.0.0.1:1/api/health', 20))
      .rejects.toThrow('HTTP response body timed out after 20 ms');

    expect(cancel).toHaveBeenCalledTimes(1);
    expect(requestSignal.aborted).toBe(true);
  });
});

describe('runtime smoke parent signal cleanup', () => {
  it('waits for child cleanup once and exits with conventional SIGTERM status', async () => {
    const signals = new EventEmitter();
    let releaseCleanup;
    const cleanup = vi.fn(() => new Promise((resolve) => {
      releaseCleanup = resolve;
    }));
    const exit = vi.fn();
    const handlers = installParentSignalHandlers({ signalEmitter: signals, cleanup, exit });

    signals.emit('SIGTERM');
    signals.emit('SIGINT');
    await Promise.resolve();
    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(exit).not.toHaveBeenCalled();

    releaseCleanup();
    await handlers.shutdownPromise;

    expect(exit).toHaveBeenCalledWith(143);
    expect(signals.listenerCount('SIGINT')).toBe(0);
    expect(signals.listenerCount('SIGTERM')).toBe(0);
  });

  it('exits with conventional SIGINT status after cleanup', async () => {
    const signals = new EventEmitter();
    const exit = vi.fn();
    const handlers = installParentSignalHandlers({ signalEmitter: signals, cleanup: vi.fn(), exit });

    signals.emit('SIGINT');
    await handlers.shutdownPromise;

    expect(exit).toHaveBeenCalledWith(130);
  });

  it('reports cleanup failure and exits with a regular failure status', async () => {
    const signals = new EventEmitter();
    const exit = vi.fn();
    const error = new Error('child did not terminate');
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const handlers = installParentSignalHandlers({
      signalEmitter: signals,
      cleanup: vi.fn(() => Promise.reject(error)),
      exit,
    });

    signals.emit('SIGTERM');
    await handlers.shutdownPromise;

    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('child did not terminate'));
    expect(exit).toHaveBeenCalledWith(1);
    errorSpy.mockRestore();
  });
});

describe('runtime smoke child lifecycle', () => {
  it('tracks spawned child close state through one persistent promise', async () => {
    const child = new EventEmitter();
    child.exitCode = null;
    child.signalCode = null;
    const childOutput = new EventEmitter();
    childOutput.setEncoding = vi.fn();
    child.stdout = childOutput;
    child.stderr = childOutput;
    const spawnProcess = vi.fn(() => child);
    const { runtime } = spawnBackend(41001, { spawnProcess, serverPath: '/tmp/emitted-server.js' });
    const closePromise = runtime.closePromise;

    child.emit('close', 0, null);

    await expect(closePromise).resolves.toEqual({ code: 0, signal: null });
    expect(runtime.closed).toBe(true);
    expect(runtime.closePromise).toBe(closePromise);
    expect(spawnProcess).toHaveBeenCalledWith(
      process.execPath,
      ['/tmp/emitted-server.js'],
      expect.objectContaining({ env: expect.objectContaining({ PORT: '41001' }) })
    );
  });

  it('keeps one persistent close promise and does not signal an already closed child', async () => {
    const child = new EventEmitter();
    child.exitCode = 0;
    child.signalCode = null;
    child.kill = vi.fn();
    const runtime = createChildRuntime(child);
    const closePromise = runtime.closePromise;

    await stopChild(child, runtime, 20);

    expect(runtime.closed).toBe(true);
    expect(runtime.closePromise).toBe(closePromise);
    await expect(closePromise).resolves.toEqual({ code: 0, signal: null });
    expect(child.kill).not.toHaveBeenCalled();
  });

  it('uses SIGTERM and confirms termination before cleanup resolves', async () => {
    const child = new EventEmitter();
    child.exitCode = null;
    child.signalCode = null;
    child.kill = vi.fn((signal) => {
      setImmediate(() => {
        child.signalCode = signal;
        child.emit('close', null, signal);
      });
      return true;
    });
    const runtime = createChildRuntime(child);

    await stopChild(child, runtime, 50);

    expect(child.kill).toHaveBeenCalledWith('SIGTERM');
    expect(runtime.closed).toBe(true);
    expect(runtime.closeSignal).toBe('SIGTERM');
  });

  it('escalates from SIGTERM to SIGKILL when graceful cleanup stalls', async () => {
    const child = new EventEmitter();
    child.exitCode = null;
    child.signalCode = null;
    child.kill = vi.fn((signal) => {
      if (signal === 'SIGKILL') {
        setImmediate(() => {
          child.signalCode = signal;
          child.emit('close', null, signal);
        });
      }
      return true;
    });
    const runtime = createChildRuntime(child);

    await stopChild(child, runtime, 10);

    expect(child.kill).toHaveBeenNthCalledWith(1, 'SIGTERM');
    expect(child.kill).toHaveBeenNthCalledWith(2, 'SIGKILL');
    expect(runtime.closed).toBe(true);
    expect(runtime.closeSignal).toBe('SIGKILL');
  });
});

describe('runtime smoke startup diagnostics', () => {
  it('preserves spawn errors and includes child diagnostics', async () => {
    const child = new EventEmitter();
    child.exitCode = null;
    child.signalCode = null;
    const runtime = createChildRuntime(child);
    child.emit('error', new Error('ENOENT: missing executable'));

    await expect(waitForHealth(child, runtime, 41001, {
      readinessTimeoutMs: 30,
      requestTimeoutMs: 10,
      pollIntervalMs: 1,
    })).rejects.toThrow(/failed to spawn[\s\S]*ENOENT[\s\S]*child status: still running/);

    child.emit('close', 1, null);
  });

  it('classifies only exact EADDRINUSE diagnostics as port collisions', () => {
    const collisionChild = new EventEmitter();
    collisionChild.exitCode = 1;
    collisionChild.signalCode = null;
    const collisionRuntime = createChildRuntime(collisionChild);
    collisionRuntime.stderr = 'Error: listen EADDRINUSE: address already in use';

    const phraseChild = new EventEmitter();
    phraseChild.exitCode = 1;
    phraseChild.signalCode = null;
    const phraseRuntime = createChildRuntime(phraseChild);
    phraseRuntime.stderr = 'Error: address already in use';

    expect(isPortCollision(collisionChild, collisionRuntime)).toBe(true);
    expect(isPortCollision(phraseChild, phraseRuntime)).toBe(false);
    expect(createEarlyExitError(collisionChild, collisionRuntime)).toBeInstanceOf(PortCollisionError);
    expect(createEarlyExitError(phraseChild, phraseRuntime)).not.toBeInstanceOf(PortCollisionError);
  });

  it('does not retry a phrase-only address collision diagnostic', async () => {
    const attemptedPorts = [];
    const child = new EventEmitter();
    child.exitCode = 1;
    child.signalCode = null;
    const runtime = createChildRuntime(child);
    runtime.stderr = 'Error: address already in use';
    child.emit('close', 1, null);
    const startupError = createEarlyExitError(child, runtime);

    await expect(runWithStartupRetries({
      getPort: async () => 41001 + attemptedPorts.length,
      runAttempt: async (port) => {
        attemptedPorts.push(port);
        throw startupError;
      },
      maxAttempts: 3,
    })).rejects.toBe(startupError);

    expect(attemptedPorts).toEqual([41001]);
  });
});

describe('runtime smoke startup retry', () => {
  it('retries a port collision with a fresh port and preserves success', async () => {
    const ports = [41001, 41002];
    const attemptedPorts = [];
    const result = await runWithStartupRetries({
      getPort: async () => ports.shift(),
      runAttempt: async (port) => {
        attemptedPorts.push(port);
        if (port === 41001) throw new PortCollisionError('first port is occupied');
        return `http://127.0.0.1:${port}/api/health`;
      },
      maxAttempts: 2,
      logRetry: vi.fn(),
    });

    expect(result).toBe('http://127.0.0.1:41002/api/health');
    expect(attemptedPorts).toEqual([41001, 41002]);
  });
});

describe('runtime smoke real subprocess lifecycle', () => {
  it('preserves diagnostics when a real Node child fails during startup', async () => {
    const spawned = spawnBackend(0, {
      serverPath: resolve(FIXTURE_ROOT, 'missing-entrypoint.mjs'),
    });

    try {
      const error = await waitForHealth(spawned.child, spawned.runtime, 0, {
        readinessTimeoutMs: 1_000,
        requestTimeoutMs: 20,
        pollIntervalMs: 1,
      }).catch((failure) => failure);

      expect(error).toBeInstanceOf(Error);
      expect(error.message).toMatch(/Backend process exited before health readiness/);
      expect(error.message).toMatch(/Cannot find module|MODULE_NOT_FOUND/);
      expect(error.message).toMatch(/child status: exit code 1/);
      expect(spawned.runtime.closed).toBe(true);
    } finally {
      await stopChild(spawned.child, spawned.runtime, 100);
    }
  });

  it('waits for real stdout and stderr closure before resolving child cleanup', async () => {
    const spawned = spawnBackend(0, { serverPath: FIXTURES.earlyExit });
    const events = [];
    let closePromiseResolved = false;
    let closeResult;
    spawned.child.stdout.once('close', () => events.push('stdout-close'));
    spawned.child.stderr.once('close', () => events.push('stderr-close'));
    spawned.child.once('close', () => events.push('process-close'));
    spawned.runtime.closePromise.then((result) => {
      closeResult = result;
      events.push('runtime-close-resolved');
      closePromiseResolved = true;
    });

    try {
      await waitForCondition(() => closePromiseResolved, 'runtime close promise', 1_000);
      expect(closeResult).toEqual({ code: 23, signal: null });
      expect(spawned.runtime.stdout).toContain('early child stdout');
      expect(spawned.runtime.stderr).toContain('early child stderr');
      const stdoutCloseIndex = events.indexOf('stdout-close');
      const stderrCloseIndex = events.indexOf('stderr-close');
      const processCloseIndex = events.indexOf('process-close');
      const runtimeCloseResolvedIndex = events.indexOf('runtime-close-resolved');
      expect(stdoutCloseIndex).toBeGreaterThanOrEqual(0);
      expect(stderrCloseIndex).toBeGreaterThanOrEqual(0);
      expect(processCloseIndex).toBeGreaterThanOrEqual(0);
      expect(runtimeCloseResolvedIndex).toBeGreaterThanOrEqual(0);
      expect(stdoutCloseIndex).toBeLessThan(runtimeCloseResolvedIndex);
      expect(stderrCloseIndex).toBeLessThan(runtimeCloseResolvedIndex);
      expect(processCloseIndex).toBeLessThan(runtimeCloseResolvedIndex);
      expect(spawned.child.stdout.closed).toBe(true);
      expect(spawned.child.stderr.closed).toBe(true);
    } finally {
      await stopChild(spawned.child, spawned.runtime, 100);
    }
  });

  it('escalates a real SIGTERM-ignoring child to SIGKILL and leaves no process', async () => {
    const spawned = spawnBackend(0, { serverPath: FIXTURES.ignoreTerm });

    try {
      await waitForRuntimeOutput(spawned.runtime, 'ignore-term child ready');
      expect(spawned.child.pid).toEqual(expect.any(Number));

      await stopChild(spawned.child, spawned.runtime, 30);

      expect(spawned.runtime.closeSignal).toBe('SIGKILL');
      expect(spawned.child.signalCode).toBe('SIGKILL');
      await waitForProcessGone(spawned.child.pid);
    } finally {
      if (!spawned.runtime.closed) await stopChild(spawned.child, spawned.runtime, 100);
    }
  });

  it('classifies a real EADDRINUSE child, retries a fresh port, and reaches health', async () => {
    const occupied = await openEphemeralServer();
    const reservedSecond = await openEphemeralServer();
    const freshPort = reservedSecond.port;
    const attemptedPorts = [];
    let firstCollision;
    let firstCollisionConfirmed = false;
    let active;

    try {
      const healthUrl = await runWithStartupRetries({
        getPort: async () => {
          if (attemptedPorts.length === 0) return occupied.port;
          expect(firstCollisionConfirmed).toBe(true);
          return freshPort;
        },
        runAttempt: async (port) => {
          attemptedPorts.push(port);
          if (port === freshPort) {
            expect(reservedSecond.server.listening).toBe(true);
            await closeTrackedServer(reservedSecond.server);
            expect(reservedSecond.server.listening).toBe(false);
          }
          active = spawnBackend(port, { serverPath: FIXTURES.portServer });
          try {
            return await waitForHealth(active.child, active.runtime, port, {
              readinessTimeoutMs: 1_000,
              requestTimeoutMs: 50,
              pollIntervalMs: 1,
            });
          } catch (error) {
            if (!firstCollision) {
              expect(reservedSecond.server.listening).toBe(true);
              firstCollision = error;
              firstCollisionConfirmed = true;
            }
            throw error;
          } finally {
            await stopChild(active.child, active.runtime, 100);
            active = undefined;
          }
        },
        maxAttempts: 2,
        logRetry: vi.fn(),
      });

      expect(firstCollision).toBeInstanceOf(PortCollisionError);
      expect(firstCollision.message).toContain('EADDRINUSE');
      expect(attemptedPorts).toEqual([occupied.port, freshPort]);
      expect(attemptedPorts[0]).not.toBe(attemptedPorts[1]);
      expect(healthUrl).toBe(`http://127.0.0.1:${freshPort}/api/health`);
    } finally {
      if (active) await stopChild(active.child, active.runtime, 100);
      await closeTrackedServer(occupied.server);
      await closeTrackedServer(reservedSecond.server);
    }
  });

  it('does not retry a real child that emits only an address phrase', async () => {
    const port = await getEphemeralPort();
    const attemptedPorts = [];
    let spawned;

    try {
      let error;
      try {
        await runWithStartupRetries({
          getPort: async () => port,
          runAttempt: async (attemptedPort) => {
            attemptedPorts.push(attemptedPort);
            spawned = spawnBackend(attemptedPort, { serverPath: FIXTURES.phraseExit });
            try {
              return await waitForHealth(spawned.child, spawned.runtime, attemptedPort, {
                readinessTimeoutMs: 1_000,
                requestTimeoutMs: 50,
                pollIntervalMs: 1,
              });
            } finally {
              await stopChild(spawned.child, spawned.runtime, 100);
            }
          },
          maxAttempts: 3,
        });
      } catch (failure) {
        error = failure;
      }

      expect(error).not.toBeInstanceOf(PortCollisionError);
      expect(error.message).toContain('address already in use');
      expect(attemptedPorts).toEqual([port]);
    } finally {
      if (spawned && !spawned.runtime.closed) await stopChild(spawned.child, spawned.runtime, 100);
    }
  });

  it('keeps primary operation failure when real child cleanup escalates', async () => {
    const spawned = spawnBackend(0, { serverPath: FIXTURES.ignoreTerm });
    const primaryError = new Error('primary readiness failure');
    const realKill = spawned.child.kill.bind(spawned.child);

    try {
      await waitForRuntimeOutput(spawned.runtime, 'ignore-term child ready');
      spawned.child.kill = (signal) => signal === 'SIGTERM' || realKill(signal);
      let result;
      try {
        await runWithStartupRetries({
          getPort: async () => 1,
          maxAttempts: 1,
          runAttempt: async () => {
            try {
              throw primaryError;
            } finally {
              await stopChild(spawned.child, spawned.runtime, 20);
            }
          },
        });
      } catch (error) {
        result = error;
      }

      expect(result).toBe(primaryError);
      expect(result.message).toBe('primary readiness failure');
      expect(spawned.runtime.closeSignal).toBe('SIGKILL');
    } finally {
      spawned.child.kill = realKill;
      if (!spawned.runtime.closed) await stopChild(spawned.child, spawned.runtime, 100);
    }
  });

  it('preserves exact primary startup error when real cleanup rejects and blocks retry', async () => {
    const { runWithCleanup } = await import('../../scripts/runtime-smoke.mjs');
    expect(runWithCleanup).toBeTypeOf('function');

    const spawned = spawnBackend(0, { serverPath: FIXTURES.ignoreTerm });
    const primaryError = new PortCollisionError('primary startup failure: EADDRINUSE');
    const killError = new Error('forced cleanup kill failure');
    const attemptedPorts = [];
    let cleanupError;
    const realKill = spawned.child.kill.bind(spawned.child);
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    try {
      await waitForRuntimeOutput(spawned.runtime, 'ignore-term child ready');
      spawned.child.kill = () => {
        throw killError;
      };

      let result;
      try {
        await runWithStartupRetries({
          getPort: async () => 41001 + attemptedPorts.length,
          maxAttempts: 3,
          runAttempt: async (port) => {
            attemptedPorts.push(port);
            return runWithCleanup(
              async () => {
                throw primaryError;
              },
              async () => {
                try {
                  await stopChild(spawned.child, spawned.runtime, 10);
                } catch (error) {
                  cleanupError = error;
                  throw error;
                }
              }
            );
          },
        });
      } catch (error) {
        result = error;
      }

      expect(result).toBe(primaryError);
      expect(result.message).toBe('primary startup failure: EADDRINUSE');
      expect(result.cleanupError).toBe(cleanupError);
      expect(result.cleanupError.message).toContain('did not terminate after SIGTERM and SIGKILL');
      expect(result.cleanupError.message).toContain(killError.message);
      expect(attemptedPorts).toEqual([41001]);
      expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining(result.cleanupError.message));
    } finally {
      errorSpy.mockRestore();
      spawned.child.kill = realKill;
      if (!spawned.runtime.closed) await stopChild(spawned.child, spawned.runtime, 100);
    }
  });
});
