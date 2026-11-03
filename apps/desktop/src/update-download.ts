/**
 * @file update-download.ts
 * @description Streams a release asset to disk with host allowlisting, size limits, and SHA-256 verification.
 */
import { createHash, randomBytes } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { mkdir, open, readdir, rename, rm, stat } from 'node:fs/promises';
import { join } from 'node:path';

import type { UpdateDownloadErrorCode } from './contracts.js';
import { GITHUB_SOURCE, type ReleaseAsset, type UpdateSource } from './update-check.js';

const ASSET_NAME = /^(?:Lexora-\d+\.\d+\.\d+-x86_64\.AppImage|lexora_\d+\.\d+\.\d+_amd64\.deb)$/;
const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);
const MAX_REDIRECTS = 5;
const DEFAULT_STALL_TIMEOUT_MS = 30_000;

export class UpdateDownloadError extends Error {
  constructor(readonly code: UpdateDownloadErrorCode, message: string) {
    super(message);
    this.name = 'UpdateDownloadError';
  }
}

type FetchLike = (url: string, init: { redirect: 'manual'; signal: AbortSignal; headers: Record<string, string> }) => Promise<Response>;

export interface DownloadUpdateOptions {
  asset: ReleaseAsset;
  directory: string;
  fetch: FetchLike;
  signal: AbortSignal;
  source?: UpdateSource;
  onProgress: (receivedBytes: number) => void;
  stallTimeoutMs?: number;
}

function parseUrl(value: string, firstHop: boolean, source: UpdateSource): URL {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new UpdateDownloadError('network', 'Download URL is not valid.');
  }
  if (!source.allowsUrl(url, firstHop)) throw new UpdateDownloadError('network', 'Download URL is not on an allowed host.');
  return url;
}

function abortError(signal: AbortSignal): Error {
  return signal.reason instanceof Error ? signal.reason : new DOMException('The download was cancelled.', 'AbortError');
}

/** Removes partial files left by earlier attempts at the same release file, never anything else. */
async function removeStalePartials(directory: string, assetName: string): Promise<void> {
  const stale = new RegExp(`^${assetName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\.[0-9a-f]{12}\\.part$`);
  try {
    const entries = await readdir(directory);
    await Promise.all(entries.filter((entry) => stale.test(entry)).map((entry) => rm(join(directory, entry), { force: true })));
  } catch {
    // Best effort: a stale partial file only wastes disk space.
  }
}

async function fileMatches(path: string, asset: ReleaseAsset): Promise<boolean> {
  try {
    if ((await stat(path)).size !== asset.size) return false;
    const hash = createHash('sha256');
    for await (const chunk of createReadStream(path)) hash.update(chunk as Buffer);
    return hash.digest('hex') === asset.sha256;
  } catch {
    return false;
  }
}

export async function downloadUpdate(options: DownloadUpdateOptions): Promise<{ path: string }> {
  const { asset, directory, signal } = options;
  if (!asset.sha256) throw new UpdateDownloadError('verify', 'The release does not publish a checksum for this file.');
  if (!ASSET_NAME.test(asset.name)) throw new UpdateDownloadError('verify', 'The release file name is not allowed.');
  const source = options.source ?? GITHUB_SOURCE;
  parseUrl(asset.url, true, source);

  const finalPath = join(directory, asset.name);
  // Each attempt owns a unique partial path, so a cancelled attempt can never delete or write through another one's file.
  const partPath = `${finalPath}.${randomBytes(6).toString('hex')}.part`;
  try {
    await mkdir(directory, { recursive: true });
  } catch {
    throw new UpdateDownloadError('disk', 'Could not create the download folder.');
  }
  if (await fileMatches(finalPath, asset)) return { path: finalPath };
  await removeStalePartials(directory, asset.name);

  const inner = new AbortController();
  const forwardAbort = () => inner.abort(signal.reason);
  if (signal.aborted) throw abortError(signal);
  signal.addEventListener('abort', forwardAbort, { once: true });
  const stallMs = options.stallTimeoutMs ?? DEFAULT_STALL_TIMEOUT_MS;
  let stalled = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const armStallTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(() => { stalled = true; inner.abort(); }, stallMs);
  };

  try {
    armStallTimer();
    const response = await fetchWithRedirects(options, inner.signal, asset.url, source);
    if (!response.body) throw new UpdateDownloadError('network', 'The download response had no body.');
    const reader = response.body.getReader();
    const aborted = new Promise<never>((_resolve, reject) => {
      inner.signal.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')), { once: true });
    });
    aborted.catch(() => undefined);
    const hash = createHash('sha256');
    let received = 0;
    const handle = await open(partPath, 'wx', 0o600).catch(() => { throw new UpdateDownloadError('disk', 'Could not write the download.'); });
    try {
      for (;;) {
        armStallTimer();
        const { done, value } = await Promise.race([reader.read(), aborted]);
        if (done) break;
        received += value.byteLength;
        if (received > asset.size) {
          await reader.cancel().catch(() => undefined);
          throw new UpdateDownloadError('verify', 'The download is larger than the release declares.');
        }
        hash.update(value);
        await handle.write(value).catch(() => { throw new UpdateDownloadError('disk', 'Could not write the download.'); });
        options.onProgress(received);
      }
      if (received !== asset.size || hash.digest('hex') !== asset.sha256) {
        throw new UpdateDownloadError('verify', 'The download did not match its checksum.');
      }
      await handle.chmod(asset.name.endsWith('.AppImage') ? 0o755 : 0o644).catch(() => { throw new UpdateDownloadError('disk', 'Could not set file permissions.'); });
    } finally {
      await handle.close().catch(() => undefined);
    }
    await rename(partPath, finalPath).catch(() => { throw new UpdateDownloadError('disk', 'Could not save the download.'); });
    return { path: finalPath };
  } catch (error) {
    await rm(partPath, { force: true }).catch(() => undefined);
    if (error instanceof UpdateDownloadError && !stalled) throw error;
    if (signal.aborted) throw abortError(signal);
    throw new UpdateDownloadError('network', stalled ? 'The download stalled.' : 'The download was interrupted.');
  } finally {
    clearTimeout(timer);
    signal.removeEventListener('abort', forwardAbort);
  }
}

async function fetchWithRedirects(options: DownloadUpdateOptions, signal: AbortSignal, firstUrl: string, source: UpdateSource): Promise<Response> {
  let target = firstUrl;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
    const url = parseUrl(target, hop === 0, source);
    const response = await options.fetch(url.href, { redirect: 'manual', signal, headers: { 'user-agent': 'lexora-desktop' } });
    if (REDIRECT_STATUSES.has(response.status)) {
      const location = response.headers.get('location');
      await response.body?.cancel().catch(() => undefined);
      if (!location || hop === MAX_REDIRECTS) throw new UpdateDownloadError('network', 'Too many redirects.');
      target = new URL(location, url).href;
      continue;
    }
    if (response.status !== 200) {
      await response.body?.cancel().catch(() => undefined);
      throw new UpdateDownloadError('network', `The download server returned HTTP ${response.status}.`);
    }
    return response;
  }
  throw new UpdateDownloadError('network', 'Too many redirects.');
}
