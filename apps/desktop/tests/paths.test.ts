/**
 * @file paths.test.ts
 * @description Verifies stable Linux desktop data, log, and renderer path resolution.
 */
import { describe, expect, it } from 'vitest';
import { sharedDatabasePath } from '@lexora/backend/shared-database';

import { resolveDesktopIconPath, resolveDesktopPaths, resolveDevelopmentRendererRoot } from '../src/paths.js';

describe('resolveDesktopPaths', () => {
  it('resolves databasePath to sharedDatabasePath under user home while logs stay below userData', () => {
    expect(resolveDesktopPaths('/home/test/.config/Lexora', '/opt/Lexora/resources', { home: '/home/test' })).toEqual({
      databasePath: '/home/test/.lexora/data/lexora.db',
      logPath: '/home/test/.config/Lexora/logs/desktop.log',
      rendererRoot: '/opt/Lexora/resources/frontend',
    });
  });

  it('defaults to sharedDatabasePath without explicit home or override', () => {
    const paths = resolveDesktopPaths('/home/test/.config/Lexora', '/opt/Lexora/resources');
    expect(paths.databasePath).toBe(sharedDatabasePath());
    expect(paths.logPath).toBe('/home/test/.config/Lexora/logs/desktop.log');
  });

  it('allows overriding databasePath via explicit option for test isolation', () => {
    expect(
      resolveDesktopPaths('/home/test/.config/Lexora', '/opt/Lexora/resources', { databasePath: ':memory:' })
    ).toEqual({
      databasePath: ':memory:',
      logPath: '/home/test/.config/Lexora/logs/desktop.log',
      rendererRoot: '/opt/Lexora/resources/frontend',
    });
  });

  it('allows overriding databasePath via DATABASE_PATH environment variable', () => {
    expect(
      resolveDesktopPaths('/home/test/.config/Lexora', '/opt/Lexora/resources', {
        env: { DATABASE_PATH: ':memory:' },
      })
    ).toEqual({
      databasePath: ':memory:',
      logPath: '/home/test/.config/Lexora/logs/desktop.log',
      rendererRoot: '/opt/Lexora/resources/frontend',
    });
  });

  it('supports passing home as a string parameter', () => {
    expect(
      resolveDesktopPaths('/home/test/.config/Lexora', '/opt/Lexora/resources', '/home/test')
    ).toEqual({
      databasePath: '/home/test/.lexora/data/lexora.db',
      logPath: '/home/test/.config/Lexora/logs/desktop.log',
      rendererRoot: '/opt/Lexora/resources/frontend',
    });
  });

  it('resolves the development renderer from the compiled frontend bundle', () => {
    expect(resolveDevelopmentRendererRoot('/home/test/apps/desktop/dist')).toBe('/home/test/apps/frontend/dist');
  });

  it('resolves a stable packaged icon and a development icon', () => {
    expect(resolveDesktopIconPath('/home/test/apps/desktop/dist', '/opt/Lexora/resources', true)).toBe('/opt/Lexora/resources/icon.png');
    expect(resolveDesktopIconPath('/home/test/apps/desktop/dist', '/opt/Lexora/resources', false)).toBe('/home/test/apps/desktop/build/icons/512x512.png');
  });
});
