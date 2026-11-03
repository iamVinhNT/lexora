/**
 * @file update-check.ts
 * @description Pure GitHub release lookup, semver comparison, and download-asset selection for desktop updates.
 */
import type { UpdateInstallKind } from './contracts.js';

export const RELEASE_REPO = 'iamVinhNT/lexora';
export const RELEASES_API_URL = `https://api.github.com/repos/${RELEASE_REPO}/releases/latest`;

const GITHUB_HOSTS = new Set(['github.com', 'objects.githubusercontent.com', 'release-assets.githubusercontent.com']);
const GITHUB_FIRST_PATH = `/${RELEASE_REPO}/releases/download/`;
const SEMVER = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;
const SHA256_DIGEST = /^sha256:([0-9a-f]{64})$/;
const DEFAULT_TIMEOUT_MS = 10_000;

export type UpdateCheckErrorCode = 'network' | 'not-found' | 'rate-limit' | 'http' | 'invalid-response';

export class UpdateCheckError extends Error {
  constructor(readonly code: UpdateCheckErrorCode, message: string) {
    super(message);
    this.name = 'UpdateCheckError';
  }
}

export interface UpdateSource {
  apiUrl: string;
  assetUrl(version: string, name: string): string;
  allowsUrl(url: URL, firstHop: boolean): boolean;
}

export const GITHUB_SOURCE: UpdateSource = {
  apiUrl: RELEASES_API_URL,
  assetUrl: (version, name) => `https://github.com/${RELEASE_REPO}/releases/download/v${version}/${name}`,
  allowsUrl: (url, firstHop) => url.protocol === 'https:'
    && GITHUB_HOSTS.has(url.hostname)
    && (!firstHop || (url.hostname === 'github.com' && url.pathname.startsWith(GITHUB_FIRST_PATH))),
};

/** Development-only source that talks to a local fake release server. */
export function loopbackSource(origin: string): UpdateSource {
  const parsed = new URL(origin);
  if (parsed.protocol !== 'http:' || (parsed.hostname !== '127.0.0.1' && parsed.hostname !== 'localhost')) {
    throw new Error('The development update source must be a loopback http origin.');
  }
  return {
    apiUrl: `${parsed.origin}/latest`,
    assetUrl: (version, name) => `${parsed.origin}/download/v${version}/${name}`,
    allowsUrl: (url) => url.origin === parsed.origin,
  };
}

export interface ReleaseAsset {
  name: string;
  size: number;
  sha256: string | undefined;
  url: string;
}

export interface ReleaseInfo {
  version: string;
  publishedAt?: string;
  assets: ReleaseAsset[];
}

export type UpdateCheckResult = { kind: 'current' } | { kind: 'available'; release: ReleaseInfo };

type FetchLike = (url: string, init?: { headers?: Record<string, string>; signal?: AbortSignal }) => Promise<Response>;

export interface CheckForUpdateOptions {
  currentVersion: string;
  fetch: FetchLike;
  source?: UpdateSource;
  timeoutMs?: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function parts(version: string): [number, number, number] {
  const match = SEMVER.exec(version);
  if (!match) throw new UpdateCheckError('invalid-response', `Not an X.Y.Z version: ${version}`);
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

export function compareVersions(a: string, b: string): number {
  const left = parts(a);
  const right = parts(b);
  for (let index = 0; index < 3; index += 1) {
    const difference = left[index]! - right[index]!;
    if (difference !== 0) return difference;
  }
  return 0;
}

function parseAsset(value: unknown): ReleaseAsset | undefined {
  if (!isRecord(value)) return undefined;
  const { name, size, digest, browser_download_url: url } = value;
  if (typeof name !== 'string' || typeof url !== 'string') return undefined;
  if (typeof size !== 'number' || !Number.isInteger(size) || size <= 0) return undefined;
  const sha256 = typeof digest === 'string' ? SHA256_DIGEST.exec(digest)?.[1] : undefined;
  return { name, size, sha256, url };
}

export function parseRelease(payload: unknown): ReleaseInfo | null {
  if (!isRecord(payload) || payload.draft !== false || payload.prerelease !== false) return null;
  const tag = payload.tag_name;
  if (typeof tag !== 'string' || !tag.startsWith('v')) return null;
  const version = tag.slice(1);
  if (!SEMVER.test(version)) return null;
  const rawAssets = Array.isArray(payload.assets) ? payload.assets : [];
  const assets = rawAssets.map(parseAsset).filter((asset): asset is ReleaseAsset => asset !== undefined);
  const publishedAt = typeof payload.published_at === 'string' ? payload.published_at : undefined;
  return { version, assets, ...(publishedAt === undefined ? {} : { publishedAt }) };
}

export function expectedAssetName(version: string, install: UpdateInstallKind): string {
  return install === 'deb' ? `lexora_${version}_amd64.deb` : `Lexora-${version}-x86_64.AppImage`;
}

export function selectAsset(release: ReleaseInfo, install: UpdateInstallKind, source: UpdateSource = GITHUB_SOURCE): ReleaseAsset | undefined {
  const name = expectedAssetName(release.version, install);
  const expectedUrl = source.assetUrl(release.version, name);
  return release.assets.find((asset) => asset.name === name && asset.url === expectedUrl);
}

export function detectInstallKind(env: Record<string, string | undefined>, execPath: string): UpdateInstallKind {
  if (env.APPIMAGE) return 'appimage';
  if (execPath.startsWith('/opt/Lexora/')) return 'deb';
  return 'unknown';
}

export async function checkForUpdate(options: CheckForUpdateOptions): Promise<UpdateCheckResult> {
  parts(options.currentVersion);
  let response: Response;
  try {
    response = await options.fetch((options.source ?? GITHUB_SOURCE).apiUrl, {
      headers: { accept: 'application/vnd.github+json', 'user-agent': 'lexora-desktop' },
      signal: AbortSignal.timeout(options.timeoutMs ?? DEFAULT_TIMEOUT_MS),
    });
  } catch {
    throw new UpdateCheckError('network', 'Could not reach the release server.');
  }
  if (response.status === 404) throw new UpdateCheckError('not-found', 'No release found.');
  if (response.status === 403 || response.status === 429) throw new UpdateCheckError('rate-limit', 'Release server rate limit reached.');
  if (!response.ok) throw new UpdateCheckError('http', `Release server returned HTTP ${response.status}.`);
  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new UpdateCheckError('invalid-response', 'Release response was not valid JSON.');
  }
  const release = parseRelease(payload);
  if (!release) throw new UpdateCheckError('invalid-response', 'Release response was not a stable vX.Y.Z release.');
  return compareVersions(release.version, options.currentVersion) > 0 ? { kind: 'available', release } : { kind: 'current' };
}
