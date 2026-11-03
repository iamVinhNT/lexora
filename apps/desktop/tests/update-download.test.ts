/**
 * @file update-download.test.ts
 * @description Verifies integrity, redirect, size, cancellation, and filesystem safety of desktop update downloads.
 */
import { createHash } from 'node:crypto';
import { mkdtemp, readdir, readFile, rm, stat, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { loopbackSource, type ReleaseAsset } from '../src/update-check.js';
import { UpdateDownloadError, downloadUpdate } from '../src/update-download.js';

const VERSION = '0.4.0';
const REPO_URL = `https://github.com/iamVinhNT/lexora/releases/download/v${VERSION}`;
const CONTENT = Buffer.from('lexora-release-bytes-'.repeat(500));
const sha = (buffer: Buffer) => createHash('sha256').update(buffer).digest('hex');

function asset(name = `Lexora-${VERSION}-x86_64.AppImage`, overrides: Partial<ReleaseAsset> = {}): ReleaseAsset {
  return { name, size: CONTENT.length, sha256: sha(CONTENT), url: `${REPO_URL}/${name}`, ...overrides };
}

function bodyOf(buffer: Buffer, chunkSize = 1000): ReadableStream<Uint8Array> {
  let offset = 0;
  return new ReadableStream({
    pull(controller) {
      if (offset >= buffer.length) return controller.close();
      controller.enqueue(new Uint8Array(buffer.subarray(offset, offset + chunkSize)));
      offset += chunkSize;
    },
  });
}

function ok(buffer: Buffer = CONTENT) {
  return new Response(bodyOf(buffer), { status: 200 });
}

function redirect(location: string, status = 302) {
  return new Response(null, { status, headers: { location } });
}

let directory: string;
beforeEach(async () => { directory = await mkdtemp(join(tmpdir(), 'lexora-update-')); });
afterEach(async () => { await rm(directory, { recursive: true, force: true }); });

function run(overrides: Record<string, unknown> = {}) {
  const controller = new AbortController();
  const fetchFn = vi.fn(async () => ok());
  const onProgress = vi.fn();
  const options = { asset: asset(), directory, fetch: fetchFn, signal: controller.signal, onProgress, ...overrides };
  return { controller, fetchFn, onProgress, promise: downloadUpdate(options as never) };
}

describe('downloadUpdate success', () => {
  it('writes the verified AppImage as executable and leaves no partial file', async () => {
    const { promise, onProgress } = run();
    const result = await promise;
    expect(result.path).toBe(join(directory, `Lexora-${VERSION}-x86_64.AppImage`));
    expect(await readFile(result.path)).toEqual(CONTENT);
    expect((await stat(result.path)).mode & 0o777).toBe(0o755);
    expect(await readdir(directory)).toEqual([`Lexora-${VERSION}-x86_64.AppImage`]);
    expect(onProgress).toHaveBeenLastCalledWith(CONTENT.length);
  });

  it('writes the deb without the executable bit', async () => {
    const name = `lexora_${VERSION}_amd64.deb`;
    const result = await run({ asset: asset(name) }).promise;
    expect((await stat(result.path)).mode & 0o777).toBe(0o644);
  });

  it('follows allowed redirects to the GitHub object host', async () => {
    const fetchFn = vi.fn()
      .mockResolvedValueOnce(redirect('https://objects.githubusercontent.com/abc?sig=1'))
      .mockResolvedValueOnce(ok());
    const result = await run({ fetch: fetchFn }).promise;
    expect(fetchFn).toHaveBeenCalledTimes(2);
    expect(await readFile(result.path)).toEqual(CONTENT);
  });

  it('skips the network when the finished file already matches the checksum', async () => {
    const existing = join(directory, `Lexora-${VERSION}-x86_64.AppImage`);
    await writeFile(existing, CONTENT);
    const { promise, fetchFn } = run();
    expect((await promise).path).toBe(existing);
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it('replaces an existing file whose checksum differs', async () => {
    const existing = join(directory, `Lexora-${VERSION}-x86_64.AppImage`);
    await writeFile(existing, 'stale');
    await run().promise;
    expect(await readFile(existing)).toEqual(CONTENT);
  });
});

describe('downloadUpdate integrity', () => {
  it('rejects a wrong checksum and deletes the partial file', async () => {
    const promise = run({ asset: asset(undefined, { sha256: 'b'.repeat(64) }) }).promise;
    await expect(promise).rejects.toMatchObject({ name: 'UpdateDownloadError', code: 'verify' });
    expect(await readdir(directory)).toEqual([]);
  });

  it('rejects a body shorter than the declared size', async () => {
    const promise = run({ fetch: vi.fn(async () => ok(CONTENT.subarray(0, 100))) }).promise;
    await expect(promise).rejects.toMatchObject({ code: 'verify' });
    expect(await readdir(directory)).toEqual([]);
  });

  it('stops a body longer than the declared size', async () => {
    const longer = Buffer.concat([CONTENT, Buffer.from('extra')]);
    const promise = run({ fetch: vi.fn(async () => ok(longer)) }).promise;
    await expect(promise).rejects.toMatchObject({ code: 'verify' });
    expect(await readdir(directory)).toEqual([]);
  });

  it('refuses to download without a published checksum', async () => {
    const { promise, fetchFn } = run({ asset: asset(undefined, { sha256: undefined }) });
    await expect(promise).rejects.toMatchObject({ code: 'verify' });
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it.each(['../evil.AppImage', 'Lexora-0.4.0-x86_64.AppImage.sh', 'notes.txt', 'Lexora-0.4.0-arm64.AppImage'])('refuses the file name %s', async (name) => {
    const { promise, fetchFn } = run({ asset: asset(name) });
    await expect(promise).rejects.toMatchObject({ code: 'verify' });
    expect(fetchFn).not.toHaveBeenCalled();
    expect(await readdir(directory)).toEqual([]);
  });
});

describe('downloadUpdate network rules', () => {
  it.each([
    ['a non-https first URL', { url: `http://github.com/iamVinhNT/lexora/releases/download/v${VERSION}/Lexora-${VERSION}-x86_64.AppImage` }],
    ['a first URL outside the repo release path', { url: `https://github.com/other/repo/releases/download/v${VERSION}/Lexora-${VERSION}-x86_64.AppImage` }],
    ['a first URL on another host', { url: `https://evil.example/Lexora-${VERSION}-x86_64.AppImage` }],
  ])('rejects %s without fetching', async (_label, overrides) => {
    const { promise, fetchFn } = run({ asset: asset(undefined, overrides) });
    await expect(promise).rejects.toMatchObject({ code: 'network' });
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it.each([
    'https://evil.example/file',
    'http://objects.githubusercontent.com/file',
    'https://github.com.evil.example/file',
    'https://objects.githubusercontent.com.evil.example/file',
  ])('rejects a redirect to %s', async (target) => {
    const fetchFn = vi.fn().mockResolvedValueOnce(redirect(target));
    await expect(run({ fetch: fetchFn }).promise).rejects.toMatchObject({ code: 'network' });
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });

  it('gives up after five redirects', async () => {
    const fetchFn = vi.fn(async () => redirect('https://objects.githubusercontent.com/loop'));
    await expect(run({ fetch: fetchFn }).promise).rejects.toMatchObject({ code: 'network' });
    expect(fetchFn).toHaveBeenCalledTimes(6);
  });

  it('requests redirects manually so every hop is checked', async () => {
    const { fetchFn, promise } = run();
    await promise;
    expect(fetchFn).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ redirect: 'manual' }));
  });

  it('maps a non-200 response and a thrown fetch to a network error', async () => {
    await expect(run({ fetch: vi.fn(async () => new Response('x', { status: 500 })) }).promise).rejects.toMatchObject({ code: 'network' });
    await expect(run({ fetch: vi.fn(async () => { throw new TypeError('fetch failed'); }) }).promise).rejects.toMatchObject({ code: 'network' });
  });

  it('aborts a stream that stalls', async () => {
    const stalled = new Response(new ReadableStream({ start() { /* never yields */ } }), { status: 200 });
    await expect(run({ fetch: vi.fn(async () => stalled), stallTimeoutMs: 30 }).promise).rejects.toMatchObject({ code: 'network' });
    expect(await readdir(directory)).toEqual([]);
  });
});

describe('downloadUpdate partial files', () => {
  it('never writes through a symlink planted at the old fixed partial path', async () => {
    const victim = join(directory, 'victim.txt');
    await writeFile(victim, 'precious');
    await symlink(victim, join(directory, `Lexora-${VERSION}-x86_64.AppImage.part`));
    await run().promise;
    expect(await readFile(victim, 'utf8')).toBe('precious');
  });

  it('removes stale partial files left by an earlier crashed attempt of the same file', async () => {
    const stale = join(directory, `Lexora-${VERSION}-x86_64.AppImage.0123456789ab.part`);
    await writeFile(stale, 'half');
    await run().promise;
    expect((await readdir(directory)).sort()).toEqual([`Lexora-${VERSION}-x86_64.AppImage`]);
  });

  it('leaves unrelated files alone', async () => {
    await writeFile(join(directory, 'notes.part'), 'keep');
    await run().promise;
    expect(await readFile(join(directory, 'notes.part'), 'utf8')).toBe('keep');
  });

  it('lets a retry finish even while a cancelled attempt is still cleaning up', async () => {
    const blocked = new Response(new ReadableStream({ start() { /* never yields */ } }), { status: 200 });
    const first = run({ fetch: vi.fn(async () => blocked) });
    const firstOutcome = first.promise.then(() => 'resolved' as const, (error: Error) => error.name);
    await new Promise((resolve) => setTimeout(resolve, 20));
    first.controller.abort();
    const second = run();
    await expect(second.promise).resolves.toMatchObject({ path: join(directory, `Lexora-${VERSION}-x86_64.AppImage`) });
    expect(await firstOutcome).toBe('AbortError');
    expect(await readFile(join(directory, `Lexora-${VERSION}-x86_64.AppImage`))).toEqual(CONTENT);
    expect(await readdir(directory)).toEqual([`Lexora-${VERSION}-x86_64.AppImage`]);
  });
});

describe('downloadUpdate custom source', () => {
  it('downloads from a loopback source and still rejects other hosts', async () => {
    const source = loopbackSource('http://127.0.0.1:4555');
    const name = `Lexora-${VERSION}-x86_64.AppImage`;
    const good = asset(name, { url: source.assetUrl(VERSION, name) });
    expect((await run({ asset: good, source }).promise).path).toBe(join(directory, name));
    await rm(join(directory, name));
    const fetchFn = vi.fn().mockResolvedValueOnce(redirect('https://evil.example/x'));
    await expect(run({ asset: good, source, fetch: fetchFn }).promise).rejects.toMatchObject({ code: 'network' });
  });
});

describe('downloadUpdate cancellation and disk errors', () => {
  it('stops on cancel, deletes the partial file, and rethrows the abort', async () => {
    let controllerRef!: ReadableStreamDefaultController<Uint8Array>;
    const response = new Response(new ReadableStream({ start(controller) { controllerRef = controller; controller.enqueue(new Uint8Array(100)); } }), { status: 200 });
    const { controller, promise } = run({ fetch: vi.fn(async () => response) });
    await vi.waitFor(() => expect(controllerRef).toBeDefined());
    await new Promise((resolve) => setTimeout(resolve, 20));
    controller.abort();
    await expect(promise).rejects.toMatchObject({ name: 'AbortError' });
    expect(await readdir(directory)).toEqual([]);
  });

  it('reports a disk error when the directory cannot be created', async () => {
    const blocker = join(directory, 'blocker');
    await writeFile(blocker, 'file');
    const promise = run({ directory: join(blocker, 'nested') }).promise;
    await expect(promise).rejects.toMatchObject({ code: 'disk' });
    await expect(promise).rejects.toBeInstanceOf(UpdateDownloadError);
  });
});
