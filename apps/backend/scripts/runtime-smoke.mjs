/**
 * @file runtime-smoke.mjs
 * @description Verifies the built backend can start under native Node.js and serve health checks.
 */

import { access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';

const BACKEND_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SERVER_PATH = resolve(BACKEND_ROOT, 'dist/server.js');
const HOST = '127.0.0.1';
const READINESS_TIMEOUT_MS = 10_000;
const REQUEST_TIMEOUT_MS = 1_000;
const POLL_INTERVAL_MS = 100;
const SHUTDOWN_TIMEOUT_MS = 3_000;
const MAX_OUTPUT_CHARS = 8_000;
const MAX_STARTUP_ATTEMPTS = 3;
const SIGNAL_EXIT_CODES = { SIGINT: 130, SIGTERM: 143 };

class HealthCheckError extends Error {
  constructor(message) {
    super(message);
    this.name = 'HealthCheckError';
  }
}

class RequestTimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RequestTimeoutError';
  }
}

class ResponseBodyTimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ResponseBodyTimeoutError';
  }
}

export class PortCollisionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PortCollisionError';
  }
}

function formatError(error) {
  return error instanceof Error ? `${error.name}: ${error.message}` : String(error);
}

function appendOutput(current, chunk) {
  const output = current + String(chunk);
  return output.length > MAX_OUTPUT_CHARS ? `[truncated]\n${output.slice(-MAX_OUTPUT_CHARS)}` : output;
}

function formatChildDiagnostics(child, runtime) {
  const signalCode = child.signalCode ?? runtime.closeSignal;
  const exitCode = child.exitCode ?? runtime.closeCode;
  const status = signalCode
    ? `signal ${signalCode}`
    : exitCode === null
      ? 'still running'
      : `exit code ${exitCode}`;
  const output = [
    runtime.stdout ? `stdout:\n${runtime.stdout}` : '',
    runtime.stderr ? `stderr:\n${runtime.stderr}` : '',
  ].filter(Boolean);

  return [
    `server: ${SERVER_PATH}`,
    `child status: ${status}`,
    output.length > 0 ? `child output:\n${output.join('\n')}` : 'child output: <none>',
  ].join('\n');
}

function hasChildTerminated(child, runtime) {
  return runtime.closed || child.exitCode != null || child.signalCode != null;
}

function hasClosedStdio(child) {
  const streams = [child.stdout, child.stderr].filter(Boolean);
  return streams.length === 0 || streams.every((stream) => stream.destroyed === true || stream.closed === true);
}

export function createChildRuntime(child) {
  const runtime = {
    stdout: '',
    stderr: '',
    spawnError: undefined,
    closed: false,
    closeCode: null,
    closeSignal: null,
  };

  let resolveClose;
  const markClosed = (code, signal) => {
    if (runtime.closed) return;
    runtime.closed = true;
    runtime.closeCode = code;
    runtime.closeSignal = signal;
    resolveClose({ code, signal });
  };

  runtime.closePromise = new Promise((resolveClosed) => {
    resolveClose = resolveClosed;
    child.once('close', (code, signal) => {
      markClosed(code, signal);
    });
  });
  child.once('error', (error) => {
    runtime.spawnError = error;
  });

  if ((child.exitCode != null || child.signalCode != null) && hasClosedStdio(child)) {
    markClosed(child.exitCode ?? null, child.signalCode ?? null);
  }

  return runtime;
}

async function getFreePort() {
  const probe = createServer();

  try {
    await new Promise((resolveListening, reject) => {
      probe.once('error', reject);
      probe.listen({ host: HOST, port: 0 }, resolveListening);
    });

    const address = probe.address();
    if (!address || typeof address === 'string') {
      throw new Error('Operating system did not provide an ephemeral port');
    }

    return address.port;
  } finally {
    if (probe.listening) {
      await new Promise((resolveClosed, reject) => {
        probe.close((error) => (error ? reject(error) : resolveClosed()));
      });
    }
  }
}

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function hasExactKeys(value, keys) {
  const actualKeys = Object.keys(value).sort();
  return actualKeys.length === keys.length && keys.every((key) => actualKeys.includes(key));
}

export function validateHealthResponse(statusCode, payload) {
  if (statusCode !== 200) {
    throw new HealthCheckError(`Health check returned HTTP ${statusCode}: ${payload || '<empty body>'}`);
  }

  let body;
  try {
    body = JSON.parse(payload);
  } catch (error) {
    throw new HealthCheckError(`Health check returned invalid JSON: ${formatError(error)}; body: ${payload}`);
  }

  if (
    !isRecord(body)
    || !hasExactKeys(body, ['data', 'success'])
    || body.success !== true
    || !isRecord(body.data)
    || !hasExactKeys(body.data, ['app', 'status'])
    || body.data.status !== 'ok'
    || body.data.app !== 'Lexora API'
  ) {
    throw new HealthCheckError(`Health check returned invalid success envelope: ${payload}`);
  }
}

export async function fetchHealthPayload(url, timeoutMs) {
  const controller = new AbortController();
  let requestTimeout;

  try {
    requestTimeout = setTimeout(() => {
      controller.abort(new RequestTimeoutError(`HTTP request timed out after ${timeoutMs} ms`));
    }, timeoutMs);

    let response;
    try {
      response = await fetch(url, { signal: controller.signal });
    } catch (error) {
      if (controller.signal.reason instanceof RequestTimeoutError) throw controller.signal.reason;
      throw error;
    }

    clearTimeout(requestTimeout);
    requestTimeout = undefined;

    let bodyTimeout;
    try {
      const bodyPromise = response.text();
      const timeoutPromise = new Promise((_resolve, reject) => {
        bodyTimeout = setTimeout(() => {
          const timeoutError = new ResponseBodyTimeoutError(
            `HTTP response body timed out after ${timeoutMs} ms`
          );
          try {
            const cancellation = response.body?.cancel(timeoutError);
            cancellation?.catch(() => {});
          } catch {
            // Body may already be locked by response.text(). Abort still cancels the fetch.
          }
          controller.abort(timeoutError);
          reject(timeoutError);
        }, timeoutMs);
      });

      return { statusCode: response.status, payload: await Promise.race([bodyPromise, timeoutPromise]) };
    } finally {
      clearTimeout(bodyTimeout);
    }
  } finally {
    clearTimeout(requestTimeout);
  }
}

function waitForChildClose(runtime, timeoutMs) {
  if (runtime.closed) return Promise.resolve(true);

  return new Promise((resolveClosed) => {
    let timer;
    const finish = (closed) => {
      clearTimeout(timer);
      resolveClosed(closed);
    };

    runtime.closePromise.then(() => finish(true));
    timer = setTimeout(() => finish(false), timeoutMs);
  });
}

export async function stopChild(child, runtime, timeoutMs = SHUTDOWN_TIMEOUT_MS) {
  if (runtime.closed) return;

  let sigtermError;
  try {
    child.kill('SIGTERM');
  } catch (error) {
    sigtermError = error;
  }
  if (await waitForChildClose(runtime, timeoutMs)) return;

  let sigkillError;
  try {
    child.kill('SIGKILL');
  } catch (error) {
    sigkillError = error;
  }
  if (!(await waitForChildClose(runtime, timeoutMs))) {
    const signalErrors = [
      sigtermError ? `SIGTERM: ${formatError(sigtermError)}` : '',
      sigkillError ? `SIGKILL: ${formatError(sigkillError)}` : '',
    ].filter(Boolean);
    const details = signalErrors.length > 0 ? ` ${signalErrors.join('; ')}` : '';
    throw new Error(`Backend child process did not terminate after SIGTERM and SIGKILL.${details}`);
  }
}

export function installParentSignalHandlers({
  signalEmitter = process,
  cleanup,
  exit = (code) => process.exit(code),
  onSignal = () => {},
}) {
  let removed = false;
  let shutdownPromise;

  const remove = () => {
    if (removed) return;
    removed = true;
    signalEmitter.removeListener('SIGINT', handleSigint);
    signalEmitter.removeListener('SIGTERM', handleSigterm);
  };

  const handleSignal = (signal) => {
    onSignal(signal);
    if (shutdownPromise) return;

    shutdownPromise = (async () => {
      try {
        await cleanup();
        remove();
        exit(SIGNAL_EXIT_CODES[signal]);
      } catch (error) {
        console.error(`Runtime smoke cleanup failed: ${formatError(error)}`);
        remove();
        exit(1);
      }
    })();
  };

  const handleSigint = () => handleSignal('SIGINT');
  const handleSigterm = () => handleSignal('SIGTERM');
  signalEmitter.once('SIGINT', handleSigint);
  signalEmitter.once('SIGTERM', handleSigterm);

  return {
    remove,
    get shutdownPromise() {
      return shutdownPromise ?? Promise.resolve();
    },
  };
}

export async function runWithStartupRetries({
  getPort,
  runAttempt,
  maxAttempts = MAX_STARTUP_ATTEMPTS,
  logRetry = (message) => console.warn(message),
}) {
  let lastCollision;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const port = await getPort();

    try {
      return await runAttempt(port);
    } catch (error) {
      if (!(error instanceof PortCollisionError) || error.cleanupError) throw error;
      lastCollision = error;
      if (attempt === maxAttempts) break;
      logRetry(`Port ${port} collided during startup; retrying with a fresh port (${attempt + 1}/${maxAttempts}).`);
    }
  }

  throw new PortCollisionError(
    `Backend startup encountered port collisions across ${maxAttempts} attempts.\n${lastCollision?.message ?? 'No collision details available.'}`
  );
}

export async function waitForHealth(
  child,
  runtime,
  port,
  {
    readinessTimeoutMs = READINESS_TIMEOUT_MS,
    requestTimeoutMs = REQUEST_TIMEOUT_MS,
    pollIntervalMs = POLL_INTERVAL_MS,
  } = {}
) {
  const healthUrl = `http://${HOST}:${port}/api/health`;
  const deadline = Date.now() + readinessTimeoutMs;
  let lastConnectionError;

  while (Date.now() < deadline) {
    if (runtime.spawnError) {
      throw new Error(`Backend process failed to spawn: ${formatError(runtime.spawnError)}\n${formatChildDiagnostics(child, runtime)}`);
    }
    if (hasChildTerminated(child, runtime)) {
      await waitForChildClose(runtime, Math.min(requestTimeoutMs, Math.max(1, deadline - Date.now())));
      throw createEarlyExitError(child, runtime);
    }

    try {
      const remainingMs = Math.max(1, deadline - Date.now());
      const response = await fetchHealthPayload(healthUrl, Math.min(requestTimeoutMs, remainingMs));
      validateHealthResponse(response.statusCode, response.payload);
      return healthUrl;
    } catch (error) {
      if (error instanceof HealthCheckError || error instanceof ResponseBodyTimeoutError) {
        throw new Error(`${error.message}\n${formatChildDiagnostics(child, runtime)}`);
      }
      lastConnectionError = error;
    }

    const remainingMs = deadline - Date.now();
    if (remainingMs > 0) await delay(Math.min(POLL_INTERVAL_MS, remainingMs));
  }

  const lastError = lastConnectionError ? `\nlast connection error: ${formatError(lastConnectionError)}` : '';
  throw new Error(`Timed out after ${readinessTimeoutMs} ms waiting for ${healthUrl}.${lastError}\n${formatChildDiagnostics(child, runtime)}`);
}

export function spawnBackend(port, { serverPath = SERVER_PATH, spawnProcess = spawn } = {}) {
  const child = spawnProcess(process.execPath, [serverPath], {
    cwd: BACKEND_ROOT,
    env: { ...process.env, DATABASE_PATH: ':memory:', PORT: String(port) },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const runtime = createChildRuntime(child);

  child.stdout?.setEncoding('utf8');
  child.stderr?.setEncoding('utf8');
  child.stdout?.on('data', (chunk) => {
    runtime.stdout = appendOutput(runtime.stdout, chunk);
  });
  child.stderr?.on('data', (chunk) => {
    runtime.stderr = appendOutput(runtime.stderr, chunk);
  });

  return { child, runtime };
}

export function isPortCollisionDiagnostic(value) {
  return /(?:^|[^A-Z0-9_])EADDRINUSE(?:$|[^A-Z0-9_])/.test(String(value));
}

export function isPortCollision(child, runtime) {
  const exitCode = child.exitCode ?? runtime.closeCode;
  const signalCode = child.signalCode ?? runtime.closeSignal;
  if (exitCode === null || signalCode !== null) return false;
  return isPortCollisionDiagnostic(`${runtime.stdout}\n${runtime.stderr}`);
}

export function createEarlyExitError(child, runtime) {
  const message = `Backend process exited before health readiness.\n${formatChildDiagnostics(child, runtime)}`;
  return isPortCollision(child, runtime) ? new PortCollisionError(message) : new Error(message);
}

function reportCleanupFailure(error) {
  console.error(`Runtime smoke cleanup failed: ${formatError(error)}`);
}

function preservePrimaryError(primaryError, cleanupError) {
  if (primaryError && typeof primaryError === 'object') {
    Object.defineProperty(primaryError, 'cleanupError', {
      configurable: true,
      enumerable: false,
      value: cleanupError,
      writable: false,
    });
  }
  return primaryError;
}

export async function runWithCleanup(operation, cleanup) {
  let primaryError;

  try {
    return await operation();
  } catch (error) {
    primaryError = error;
    throw error;
  } finally {
    try {
      await cleanup();
    } catch (cleanupError) {
      reportCleanupFailure(cleanupError);
      if (primaryError) {
        preservePrimaryError(primaryError, cleanupError);
      } else {
        throw cleanupError;
      }
    }
  }
}

async function runSmoke() {
  let activeProcess;
  let activeCleanupPromise;
  let signalRequested = false;
  const stopActiveChild = () => {
    if (!activeProcess) return Promise.resolve();
    if (!activeCleanupPromise) {
      const processToStop = activeProcess;
      activeCleanupPromise = stopChild(processToStop.child, processToStop.runtime).then(() => {
        if (activeProcess === processToStop) activeProcess = undefined;
      });
    }
    return activeCleanupPromise;
  };
  const signalHandlers = installParentSignalHandlers({
    cleanup: stopActiveChild,
    onSignal: () => {
      signalRequested = true;
    },
  });

  let primaryError;
  try {
    try {
      await access(SERVER_PATH);
    } catch {
      throw new Error(`Built server not found at ${SERVER_PATH}. Run "npm run build" first.`);
    }

    const healthUrl = await runWithStartupRetries({
      getPort: getFreePort,
      runAttempt: async (port) => {
        if (signalRequested) return undefined;
        const spawned = spawnBackend(port);
        activeProcess = spawned;
        activeCleanupPromise = undefined;
        return runWithCleanup(
          () => waitForHealth(spawned.child, spawned.runtime, port),
          stopActiveChild,
        );
      },
    });
    if (!signalRequested && healthUrl) {
      console.log(`Runtime smoke passed: GET ${healthUrl} returned the exact health contract.`);
    }
  } catch (error) {
    if (!signalRequested) primaryError = error;
  } finally {
    if (signalRequested) {
      await signalHandlers.shutdownPromise;
    } else {
      try {
        await stopActiveChild();
      } catch (cleanupError) {
        reportCleanupFailure(cleanupError);
        if (primaryError) {
          preservePrimaryError(primaryError, cleanupError);
        } else {
          primaryError = cleanupError;
        }
      }
      signalHandlers.remove();
    }
  }

  if (primaryError) throw primaryError;
}

const isMainModule = process.argv[1]
  ? fileURLToPath(import.meta.url) === resolve(process.argv[1])
  : false;

if (isMainModule) {
  runSmoke().catch((error) => {
    console.error(`Runtime smoke failed: ${formatError(error)}`);
    process.exitCode = 1;
  });
}
