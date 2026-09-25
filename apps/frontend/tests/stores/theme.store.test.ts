/**
 * @file theme.store.test.ts
 * @description Verifies theme store behavior, DOM synchronization, and persistence.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { applyTheme, useThemeStore } from '../../src/stores/theme.store';

describe('theme.store', () => {
  beforeEach(() => {
    localStorage.clear();
    useThemeStore.setState({ theme: 'light' });
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes with default light theme and sets dataset.theme', () => {
    expect(useThemeStore.getState().theme).toBe('light');
    applyTheme('light');
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('updates theme state and DOM attribute on setTheme', () => {
    useThemeStore.getState().setTheme('dark');
    expect(useThemeStore.getState().theme).toBe('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');

    useThemeStore.getState().setTheme('light');
    expect(useThemeStore.getState().theme).toBe('light');
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('toggles theme between light and dark', () => {
    expect(useThemeStore.getState().theme).toBe('light');

    useThemeStore.getState().toggleTheme();
    expect(useThemeStore.getState().theme).toBe('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');

    useThemeStore.getState().toggleTheme();
    expect(useThemeStore.getState().theme).toBe('light');
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('persists theme into localStorage with key lexora-ui', () => {
    useThemeStore.getState().setTheme('dark');
    const stored = localStorage.getItem('lexora-ui');
    expect(stored).toBeTruthy();
    expect(JSON.parse(stored!).state.theme).toBe('dark');
  });

  it('rehydrates persisted theme on fresh initialization', async () => {
    localStorage.setItem('lexora-ui', JSON.stringify({ state: { theme: 'dark' }, version: 0 }));
    vi.resetModules();

    const { useThemeStore: freshStore } = await import('../../src/stores/theme.store');
    expect(freshStore.getState().theme).toBe('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
  });
});
