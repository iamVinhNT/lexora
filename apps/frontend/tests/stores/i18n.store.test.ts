/**
 * @file i18n.store.test.ts
 * @description Verifies Zustand i18n store state, actions, and bidirectional synchronization with i18next singleton.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { i18n } from '../../src/i18n/config';
import { useI18nStore } from '../../src/stores/i18n.store';

describe('i18n.store', () => {
  beforeEach(async () => {
    localStorage.clear();
    await i18n.changeLanguage('en');
    useI18nStore.setState({ locale: 'en' });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes with current i18n locale', () => {
    expect(useI18nStore.getState().locale).toBe('en');
  });

  it('updates locale and syncs with i18next on setLocale', async () => {
    await useI18nStore.getState().setLocale('vi');

    expect(useI18nStore.getState().locale).toBe('vi');
    expect(i18n.resolvedLanguage).toBe('vi');
    expect(document.documentElement.lang).toBe('vi');
    expect(localStorage.getItem('lexora-language')).toContain('vi');
  });

  it('toggles locale between vi and en', async () => {
    expect(useI18nStore.getState().locale).toBe('en');

    await useI18nStore.getState().toggleLocale();
    expect(useI18nStore.getState().locale).toBe('vi');
    expect(i18n.resolvedLanguage).toBe('vi');

    await useI18nStore.getState().toggleLocale();
    expect(useI18nStore.getState().locale).toBe('en');
    expect(i18n.resolvedLanguage).toBe('en');
  });

  it('synchronizes store when i18next language changes externally', async () => {
    expect(useI18nStore.getState().locale).toBe('en');

    await i18n.changeLanguage('vi');
    expect(useI18nStore.getState().locale).toBe('vi');

    await i18n.changeLanguage('en');
    expect(useI18nStore.getState().locale).toBe('en');
  });

  it('guards against redundant calls and prevents recursion', async () => {
    const changeSpy = vi.spyOn(i18n, 'changeLanguage');

    await useI18nStore.getState().setLocale('en');
    expect(changeSpy).not.toHaveBeenCalled();

    await useI18nStore.getState().setLocale('vi');
    expect(changeSpy).toHaveBeenCalledTimes(1);

    await useI18nStore.getState().setLocale('vi');
    expect(changeSpy).toHaveBeenCalledTimes(1);
  });
});
