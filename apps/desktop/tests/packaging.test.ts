/**
 * @file packaging.test.ts
 * @description Verifies Linux packaging uses a filesystem-safe executable name.
 */
import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

describe('Linux packaging configuration', () => {
  it('uses a safe executable name for Debian and AppImage output', async () => {
    const config = await readFile(new URL('../electron-builder.yml', import.meta.url), 'utf8');

    expect(config).toMatch(/^executableName: lexora$/m);
  });

  it('disables update metadata generation for every Linux target', async () => {
    const config = await readFile(new URL('../electron-builder.yml', import.meta.url), 'utf8');

    expect(config).toMatch(/^linux:\n(?:  (?!publish:).+\n)*  publish: null$/m);
    expect(config).not.toMatch(/^  publish: \[\]$/m);
  });

  it('provides Debian metadata and matching desktop-window identity', async () => {
    const config = await readFile(new URL('../electron-builder.yml', import.meta.url), 'utf8');
    const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));

    expect(packageJson).toMatchObject({
      description: expect.any(String),
      homepage: expect.stringMatching(/^https:\/\//),
      author: {
        name: expect.any(String),
        email: expect.stringMatching(/@/),
      },
      desktopName: 'lexora',
    });
    expect(config).toMatch(/^linux:[\s\S]*^  syncDesktopName: true$/m);
  });

  it('exposes focused assertions for packaged ASAR metadata and runtime arguments', async () => {
    const artifactSmoke = await import('../scripts/artifact-smoke.mjs');
    const assertPackagedMetadata = artifactSmoke.assertPackagedMetadata as (input: {
      entries: string[];
      packageJsonText: string;
      runtimeSources: Record<string, string>;
    }, label: string) => void;

    expect(assertPackagedMetadata).toBeTypeOf('function');
    const safePackage = JSON.stringify({ name: '@lexora/desktop', version: '0.1.0' });
    expect(() => assertPackagedMetadata({
      entries: ['package.json', 'dist/main.js'],
      packageJsonText: safePackage,
      runtimeSources: { 'dist/main.js': 'app.exit(1);' },
    }, 'fixture')).not.toThrow();
    expect(() => assertPackagedMetadata({
      entries: ['package.json', 'app-update.yml'],
      packageJsonText: safePackage,
      runtimeSources: {},
    }, 'fixture')).toThrow(/forbidden updater artifact/i);
    expect(() => assertPackagedMetadata({
      entries: ['package.json'],
      packageJsonText: '{"name":"@lexora/desktop","build":{"publish":{"provider":"github","token":"GH_TOKEN"}}}',
      runtimeSources: {},
    }, 'fixture')).toThrow(/forbidden updater configuration/i);
    expect(() => assertPackagedMetadata({
      entries: ['package.json', 'dist/main.js'],
      packageJsonText: safePackage,
      runtimeSources: { 'dist/main.js': 'electron --no-sandbox' },
    }, 'fixture')).toThrow(/forbidden runtime argument/i);
  });

  it('packages the runtime BrowserWindow icon at the stable resources path', async () => {
    const config = await readFile(new URL('../electron-builder.yml', import.meta.url), 'utf8');

    expect(config).toMatch(/from: build\/icons\/512x512\.png\n\s+to: icon\.png/);
  });

  it('keeps static artifact smoke separate from packaged Electron launch smoke', async () => {
    const rootPackage = JSON.parse(await readFile(new URL('../../../package.json', import.meta.url), 'utf8'));
    const desktopPackage = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));

    expect(rootPackage.scripts['desktop:smoke']).toBe('node apps/desktop/scripts/artifact-smoke.mjs');
    expect(rootPackage.scripts['desktop:packaged-smoke']).toBe('pnpm --filter @lexora/desktop packaged-smoke');
    expect(desktopPackage.scripts['packaged-smoke']).toBe('node scripts/packaged-smoke.mjs');
  });

  it('detects AppRun sandbox fallback capability without weakening runtime policy', async () => {
    const artifactSmoke = await import('../scripts/artifact-smoke.mjs');
    const inspectAppRun = artifactSmoke.inspectAppRun as (source: string) => { injectsNoSandbox: boolean };

    expect(inspectAppRun).toBeTypeOf('function');
    expect(inspectAppRun('NO_SANDBOX=(--no-sandbox)')).toEqual({ injectsNoSandbox: true });
    expect(inspectAppRun('exec "$BIN" "$@"')).toEqual({ injectsNoSandbox: false });
  });

  it('keeps packaged acceptance routes and API plan explicit', async () => {
    const acceptance = await import('../scripts/packaged-acceptance.mjs');
    expect(acceptance.SPA_ROUTES).toEqual(['/', '/learn', '/review', '/words', '/contexts', '/analytics', '/settings']);
    expect(acceptance.API_READ_CHECKS).toEqual(expect.arrayContaining([
      '/api/health',
      '/api/learning/session',
      '/api/reviews/due',
      '/api/reviews/history',
      '/api/progress',
      '/api/statistics/dashboard',
      '/api/statistics/trends',
      '/api/statistics/insights',
    ]));
  });
});
