/**
 * @file paths.test.ts
 * @description Verifies stable Linux desktop data, log, and renderer path resolution.
 */
import { describe, expect, it } from 'vitest';

import { resolveDesktopIconPath, resolveDesktopPaths, resolveDevelopmentRendererRoot } from '../src/paths.js';

describe('resolveDesktopPaths', () => {
  it('keeps mutable data below Electron userData', () => {
    expect(resolveDesktopPaths('/home/test/.config/Lexora', '/opt/Lexora/resources')).toEqual({
      databasePath: '/home/test/.config/Lexora/data/lexora.db',
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
