/**
 * @file update-check.test.ts
 * @description Verifies release parsing, semver comparison, asset selection, and failure handling for desktop update checks.
 */
import { describe, expect, it, vi } from 'vitest';

import {
  GITHUB_SOURCE,
  RELEASES_API_URL,
  UpdateCheckError,
  checkForUpdate,
  compareVersions,
  detectInstallKind,
  loopbackSource,
  parseRelease,
  selectAsset,
} from '../src/update-check.js';

const DIGEST = `sha256:${'a'.repeat(64)}`;

function releaseJson(version: string, overrides: Record<string, unknown> = {}) {
  const base = `https://github.com/iamVinhNT/lexora/releases/download/v${version}`;
  return {
    tag_name: `v${version}`,
    draft: false,
    prerelease: false,
    published_at: '2026-11-03T08:00:00Z',
    assets: [
      { name: `Lexora-${version}-x86_64.AppImage`, size: 158_297_065, digest: DIGEST, browser_download_url: `${base}/Lexora-${version}-x86_64.AppImage` },
      { name: `lexora_${version}_amd64.deb`, size: 119_091_588, digest: DIGEST, browser_download_url: `${base}/lexora_${version}_amd64.deb` },
    ],
    ...overrides,
  };
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
}

describe('compareVersions', () => {
  it('compares numerically, not as strings', () => {
    expect(compareVersions('0.10.0', '0.9.0')).toBeGreaterThan(0);
    expect(compareVersions('1.0.0', '0.99.99')).toBeGreaterThan(0);
    expect(compareVersions('0.3.0', '0.3.0')).toBe(0);
    expect(compareVersions('0.3.0', '0.3.1')).toBeLessThan(0);
  });
});

describe('parseRelease', () => {
  it('reads version, date, and assets from a stable release', () => {
    const release = parseRelease(releaseJson('0.4.0'));
    expect(release).toMatchObject({ version: '0.4.0', publishedAt: '2026-11-03T08:00:00Z' });
    expect(release?.assets).toHaveLength(2);
    expect(release?.assets[0]).toMatchObject({ name: 'Lexora-0.4.0-x86_64.AppImage', size: 158_297_065, sha256: 'a'.repeat(64) });
  });

  it.each([
    ['draft', { draft: true }],
    ['prerelease', { prerelease: true }],
    ['tag without v', { tag_name: '0.4.0' }],
    ['prerelease tag', { tag_name: 'v0.4.0-rc.1' }],
    ['tag with extra parts', { tag_name: 'v0.4.0.1' }],
    ['leading zero', { tag_name: 'v01.4.0' }],
  ])('rejects a %s', (_label, overrides) => {
    expect(parseRelease(releaseJson('0.4.0', overrides))).toBeNull();
  });

  it.each([null, 'x', 42, [], {}])('rejects a malformed payload %j', (payload) => {
    expect(parseRelease(payload)).toBeNull();
  });

  it('drops assets with bad shape and keeps a missing digest as undefined', () => {
    const json = releaseJson('0.4.0', {
      assets: [
        { name: 'a.deb', size: -1, browser_download_url: 'https://x' },
        { name: 'b.deb', size: 10, digest: 'md5:abc', browser_download_url: 'https://github.com/x' },
        'junk',
      ],
    });
    const release = parseRelease(json);
    expect(release?.assets).toHaveLength(1);
    expect(release?.assets[0]).toMatchObject({ name: 'b.deb', sha256: undefined });
  });
});

describe('selectAsset', () => {
  const release = parseRelease(releaseJson('0.4.0'))!;

  it('picks the AppImage for appimage and unknown installs, and the deb for deb installs', () => {
    expect(selectAsset(release, 'appimage')?.name).toBe('Lexora-0.4.0-x86_64.AppImage');
    expect(selectAsset(release, 'unknown')?.name).toBe('Lexora-0.4.0-x86_64.AppImage');
    expect(selectAsset(release, 'deb')?.name).toBe('lexora_0.4.0_amd64.deb');
  });

  it('returns undefined when the exact expected name is missing', () => {
    const other = parseRelease(releaseJson('0.4.0', { assets: [{ name: 'Lexora-0.4.0-arm64.AppImage', size: 1, digest: DIGEST, browser_download_url: 'https://github.com/iamVinhNT/lexora/releases/download/v0.4.0/Lexora-0.4.0-arm64.AppImage' }] }))!;
    expect(selectAsset(other, 'appimage')).toBeUndefined();
  });

  it('refuses an asset whose download URL is not the repo release path for that tag', () => {
    const json = releaseJson('0.4.0');
    (json.assets[0] as { browser_download_url: string }).browser_download_url = 'https://evil.example/Lexora-0.4.0-x86_64.AppImage';
    expect(selectAsset(parseRelease(json)!, 'appimage')).toBeUndefined();
  });
});

describe('detectInstallKind', () => {
  it('detects AppImage from the APPIMAGE variable', () => {
    expect(detectInstallKind({ APPIMAGE: '/home/u/Lexora.AppImage' }, '/tmp/.mount_x/lexora')).toBe('appimage');
  });
  it('detects the deb install from /opt/Lexora', () => {
    expect(detectInstallKind({}, '/opt/Lexora/lexora')).toBe('deb');
  });
  it('falls back to unknown', () => {
    expect(detectInstallKind({}, '/home/u/dev/node_modules/electron/dist/electron')).toBe('unknown');
  });
});

describe('checkForUpdate', () => {
  it('reports available when the latest stable release is newer', async () => {
    const fetchFn = vi.fn(async () => jsonResponse(releaseJson('0.4.0')));
    const result = await checkForUpdate({ currentVersion: '0.3.0', fetch: fetchFn });
    expect(result.kind).toBe('available');
    expect(fetchFn).toHaveBeenCalledWith(RELEASES_API_URL, expect.objectContaining({ headers: expect.objectContaining({ accept: 'application/vnd.github+json' }) }));
  });

  it.each(['0.3.0', '0.2.0'])('reports current when the latest release is %s', async (latest) => {
    const result = await checkForUpdate({ currentVersion: '0.3.0', fetch: async () => jsonResponse(releaseJson(latest)) });
    expect(result.kind).toBe('current');
  });

  it.each([
    [404, 'not-found'],
    [403, 'rate-limit'],
    [429, 'rate-limit'],
    [500, 'http'],
  ])('maps HTTP %i to %s', async (status, code) => {
    await expect(checkForUpdate({ currentVersion: '0.3.0', fetch: async () => jsonResponse({}, status) }))
      .rejects.toMatchObject({ name: 'UpdateCheckError', code });
  });

  it('maps a network failure and a malformed body to typed errors', async () => {
    await expect(checkForUpdate({ currentVersion: '0.3.0', fetch: async () => { throw new TypeError('fetch failed'); } }))
      .rejects.toMatchObject({ code: 'network' });
    await expect(checkForUpdate({ currentVersion: '0.3.0', fetch: async () => new Response('not json', { status: 200 }) }))
      .rejects.toMatchObject({ code: 'invalid-response' });
    await expect(checkForUpdate({ currentVersion: '0.3.0', fetch: async () => jsonResponse({ tag_name: 'nightly' }) }))
      .rejects.toBeInstanceOf(UpdateCheckError);
  });

  it('times out a hanging request', async () => {
    const hang = (_url: string, init?: { signal?: AbortSignal }) => new Promise<Response>((_resolve, reject) => {
      init?.signal?.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')));
    });
    await expect(checkForUpdate({ currentVersion: '0.3.0', fetch: hang as never, timeoutMs: 20 }))
      .rejects.toMatchObject({ code: 'network' });
  });

  it('rejects a current version that is not X.Y.Z', async () => {
    await expect(checkForUpdate({ currentVersion: 'dev', fetch: async () => jsonResponse(releaseJson('0.4.0')) }))
      .rejects.toMatchObject({ code: 'invalid-response' });
  });
});

describe('update sources', () => {
  it('GitHub source allows only https on the three release hosts, and the repo path on the first hop', () => {
    expect(GITHUB_SOURCE.apiUrl).toBe(RELEASES_API_URL);
    expect(GITHUB_SOURCE.allowsUrl(new URL('https://github.com/iamVinhNT/lexora/releases/download/v0.4.0/x'), true)).toBe(true);
    expect(GITHUB_SOURCE.allowsUrl(new URL('https://github.com/other/repo/releases/download/v0.4.0/x'), true)).toBe(false);
    expect(GITHUB_SOURCE.allowsUrl(new URL('https://objects.githubusercontent.com/x'), false)).toBe(true);
    expect(GITHUB_SOURCE.allowsUrl(new URL('https://objects.githubusercontent.com/x'), true)).toBe(false);
    expect(GITHUB_SOURCE.allowsUrl(new URL('http://objects.githubusercontent.com/x'), false)).toBe(false);
    expect(GITHUB_SOURCE.allowsUrl(new URL('https://github.com.evil.example/x'), false)).toBe(false);
  });

  it('loopback source (development only) allows only the given loopback origin', () => {
    const source = loopbackSource('http://127.0.0.1:4555');
    expect(source.apiUrl).toBe('http://127.0.0.1:4555/latest');
    expect(source.assetUrl('0.4.0', 'f.deb')).toBe('http://127.0.0.1:4555/download/v0.4.0/f.deb');
    expect(source.allowsUrl(new URL('http://127.0.0.1:4555/download/v0.4.0/f.deb'), true)).toBe(true);
    expect(source.allowsUrl(new URL('http://127.0.0.1:9999/x'), false)).toBe(false);
    expect(source.allowsUrl(new URL('https://github.com/x'), false)).toBe(false);
  });

  it('refuses a non-loopback origin for the loopback source', () => {
    expect(() => loopbackSource('https://example.com')).toThrow(/loopback/i);
  });

  it('selects assets against the given source', () => {
    const source = loopbackSource('http://127.0.0.1:4555');
    const json = releaseJson('0.4.0');
    json.assets = json.assets.map((a) => ({ ...a, browser_download_url: source.assetUrl('0.4.0', a.name) }));
    expect(selectAsset(parseRelease(json)!, 'deb', source)?.name).toBe('lexora_0.4.0_amd64.deb');
    expect(selectAsset(parseRelease(json)!, 'deb')).toBeUndefined();
  });

  it('checks the source API URL', async () => {
    const source = loopbackSource('http://127.0.0.1:4555');
    const fetchFn = vi.fn(async () => jsonResponse(releaseJson('0.3.0')));
    await checkForUpdate({ currentVersion: '0.3.0', fetch: fetchFn, source });
    expect(fetchFn).toHaveBeenCalledWith('http://127.0.0.1:4555/latest', expect.anything());
  });
});
