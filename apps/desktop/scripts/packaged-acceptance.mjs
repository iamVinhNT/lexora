/**
 * @file packaged-acceptance.mjs
 * @description Runs data, SPA, restore, and persistence acceptance flows against the packaged Linux executable.
 */
import { mkdtemp, readFile, rm, stat } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const desktopRoot = resolve(new URL('..', import.meta.url).pathname);
const packageJson = JSON.parse(await readFile(join(desktopRoot, 'package.json'), 'utf8'));
const binaryPath = join(desktopRoot, 'release', 'linux-unpacked', 'lexora');
export const SPA_ROUTES = ['/', '/learn', '/review', '/words', '/contexts', '/analytics', '/settings'];
export const API_READ_CHECKS = [
  '/api/health',
  '/api/learning/session',
  '/api/reviews/due',
  '/api/reviews/history',
  '/api/progress',
  '/api/statistics/dashboard',
  '/api/statistics/trends',
  '/api/statistics/insights',
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function assertExecutable(path) {
  const file = await stat(path);
  assert(file.isFile() && (file.mode & 0o111) !== 0, `Packaged executable is not executable: ${path}`);
}

function wait(milliseconds) {
  return new Promise((resolvePromise) => setTimeout(resolvePromise, milliseconds));
}

function launch(userDataPath, controlFile) {
  const child = spawn(binaryPath, [
    `--user-data-dir=${userDataPath}`,
    `--acceptance-test=${controlFile}`,
  ], {
    cwd: desktopRoot,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, ELECTRON_IS_DEV: '0' },
  });
  const output = [];
  child.stdout.on('data', (chunk) => output.push(String(chunk)));
  child.stderr.on('data', (chunk) => output.push(String(chunk)));
  const exit = new Promise((resolveExit) => {
    child.once('exit', (code, signal) => resolveExit({ code, signal }));
  });
  return { child, exit, output };
}

async function waitForControl(processHandle, controlFile, timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const exited = await Promise.race([
      processHandle.exit.then((result) => result),
      wait(100).then(() => undefined),
    ]);
    if (exited) {
      throw new Error(`Packaged acceptance process exited before readiness: ${JSON.stringify(exited)}\n${processHandle.output.join('')}`);
    }
    try {
      return JSON.parse(await readFile(controlFile, 'utf8'));
    } catch {
      // Control file is written atomically after server and renderer startup.
    }
  }
  throw new Error(`Timed out waiting for packaged acceptance control file: ${controlFile}\n${processHandle.output.join('')}`);
}

async function stop(processHandle) {
  if (processHandle.child.exitCode === null && !processHandle.child.killed) {
    processHandle.child.kill('SIGTERM');
  }
  const result = await Promise.race([
    processHandle.exit,
    wait(10_000).then(() => { throw new Error(`Packaged acceptance process did not exit.\n${processHandle.output.join('')}`); }),
  ]);
  assert(result.code === 0, `Packaged acceptance process exited with ${JSON.stringify(result)}\n${processHandle.output.join('')}`);
}

async function requestJson(origin, path, options = {}, expectedStatus = 200) {
  const response = await fetch(new URL(path, origin), {
    ...options,
    headers: { 'content-type': 'application/json', ...(options.headers ?? {}) },
  });
  let payload;
  try {
    payload = await response.json();
  } catch (error) {
    throw new Error(`Expected JSON response from ${path}.`, { cause: error });
  }
  assert(response.status === expectedStatus, `${path} returned HTTP ${response.status}: ${JSON.stringify(payload)}`);
  assert(payload.success === true, `${path} returned an error envelope: ${JSON.stringify(payload)}`);
  return payload.data;
}

async function runDataFlow(origin) {
  const health = await requestJson(origin, '/api/health');
  assert(health.status === 'ok', 'Packaged health response was not ok.');

  const apiResults = {};
  for (const path of API_READ_CHECKS) {
    apiResults[path] = await requestJson(origin, path);
  }

  for (const route of SPA_ROUTES) {
    const page = await fetch(new URL(route, origin));
    const html = await page.text();
    assert(page.status === 200 && html.includes('<div id="root">'), `Packaged SPA route ${route} did not serve index.html.`);
    assert(String(page.headers.get('content-security-policy')).includes("script-src 'self'"), `Packaged SPA route ${route} omitted CSP.`);
  }

  const word = `acceptance-${Date.now()}`;
  const created = await requestJson(origin, '/api/words', {
    method: 'POST',
    body: JSON.stringify({ word, definition: 'A packaged acceptance word.' }),
  }, 201);
  assert(created.word === word, 'Packaged vocabulary creation returned the wrong word.');

  const listed = await requestJson(origin, `/api/words?search=${encodeURIComponent(word)}`);
  assert(listed.total === 1 && listed.items[0]?.word === word, 'Packaged vocabulary query did not return created word.');

  const context = await requestJson(origin, '/api/contexts', {
    method: 'POST',
    body: JSON.stringify({
      title: 'Packaged acceptance context',
      content: `Context containing ${word}.`,
      sourceType: 'MANUAL',
      wordIds: [created.id],
    }),
  }, 201);
  assert(context.words?.some((item) => item.wordId === created.id || item.word?.id === created.id), 'Packaged context creation did not link created word.');
  const contextRead = await requestJson(origin, `/api/contexts/${context.id}`);
  assert(contextRead.id === context.id, 'Packaged context read returned the wrong context.');
  const contextLink = await requestJson(origin, `/api/contexts/${context.id}/words`, {
    method: 'POST',
    body: JSON.stringify({ wordIds: [created.id] }),
  });
  assert(contextLink, 'Packaged context link request returned no data.');

  const backup = await requestJson(origin, '/api/backup', { method: 'POST' });
  assert(backup.data.words.some((item) => item.word === word), 'Packaged backup omitted created word.');

  const preview = await requestJson(origin, '/api/restore/preview', {
    method: 'POST',
    body: JSON.stringify({ backup }),
  });
  assert(preview.valid === true && preview.previewToken, 'Packaged restore preview did not issue token.');

  await requestJson(origin, '/api/reset-all', { method: 'POST', body: JSON.stringify({ confirm: true }) });
  const empty = await requestJson(origin, `/api/words?search=${encodeURIComponent(word)}`);
  assert(empty.total === 0, 'Packaged reset-all did not remove created word.');

  await requestJson(origin, '/api/restore', {
    method: 'POST',
    body: JSON.stringify({ backup, confirm: true, previewToken: preview.previewToken }),
  });
  const restored = await requestJson(origin, `/api/words?search=${encodeURIComponent(word)}`);
  assert(restored.total === 1 && restored.items[0]?.word === word, 'Packaged restore did not restore created word.');
}

async function runAcceptance() {
  await assertExecutable(binaryPath);
  const root = await mkdtemp('/tmp/lexora-packaged-acceptance-');
  const userDataPath = join(root, 'user-data');
  const firstControlFile = join(root, 'first-control.json');
  const secondControlFile = join(root, 'second-control.json');
  let firstProcess;
  let secondProcess;

  try {
    firstProcess = launch(userDataPath, firstControlFile);
    const firstControl = await waitForControl(firstProcess, firstControlFile);
    await runDataFlow(firstControl.origin);
    await stop(firstProcess);
    firstProcess = undefined;

    secondProcess = launch(userDataPath, secondControlFile);
    const secondControl = await waitForControl(secondProcess, secondControlFile);
    const persisted = await requestJson(secondControl.origin, '/api/words?search=acceptance-');
    assert(persisted.total === 1, 'Packaged data did not persist across restart.');
    await stop(secondProcess);
    secondProcess = undefined;

    console.log(JSON.stringify({ package: packageJson.name, version: packageJson.version, binaryPath, persisted: true }, null, 2));
  } finally {
    if (firstProcess) await stop(firstProcess).catch(() => firstProcess.child.kill('SIGKILL'));
    if (secondProcess) await stop(secondProcess).catch(() => secondProcess.child.kill('SIGKILL'));
    await rm(root, { recursive: true, force: true });
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  await runAcceptance();
}
