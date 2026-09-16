/**
 * @file lifecycle.test.ts
 * @description Verifies idempotent desktop shutdown and existing-window focus behavior.
 */
import { describe, expect, it, vi } from 'vitest';

import { createShutdownController, focusMainWindow } from '../src/lifecycle.js';

describe('desktop lifecycle helpers', () => {
  it('closes resources once when shutdown is requested concurrently', async () => {
    const closeResources = vi.fn(async () => undefined);
    const shutdown = createShutdownController(closeResources);

    await Promise.all([shutdown(), shutdown(), shutdown()]);

    expect(closeResources).toHaveBeenCalledTimes(1);
  });

  it('restores, shows, and focuses an existing window', () => {
    const mainWindow = {
      isMinimized: vi.fn(() => true),
      restore: vi.fn(),
      show: vi.fn(),
      focus: vi.fn(),
    };

    focusMainWindow(mainWindow as never);

    expect(mainWindow.restore).toHaveBeenCalledTimes(1);
    expect(mainWindow.show).toHaveBeenCalledTimes(1);
    expect(mainWindow.focus).toHaveBeenCalledTimes(1);
  });
});
