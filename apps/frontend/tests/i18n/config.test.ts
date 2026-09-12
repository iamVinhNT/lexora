/**
 * @file config.test.ts
 * @description Verifies locale normalization, detection precedence, persistence, and document language synchronization.
 */
import { beforeEach, describe, expect, it } from 'vitest';

import { DEFAULT_LOCALE, SUPPORTED_LOCALES, i18n, normalizeLocale } from '../../src/i18n/config';

describe('i18n configuration', () => {
  beforeEach(async () => {
    localStorage.clear();
    await i18n.changeLanguage(DEFAULT_LOCALE);
  });

  it('supports exactly Vietnamese and English', () => {
    expect(SUPPORTED_LOCALES).toEqual(['vi', 'en']);
  });

  it('normalizes regional and unsupported locales', () => {
    expect(normalizeLocale('vi-VN')).toBe('vi');
    expect(normalizeLocale('en-US')).toBe('en');
    expect(normalizeLocale('EN_gb')).toBe('en');
    expect(normalizeLocale('fr-FR')).toBe('en');
    expect(normalizeLocale(undefined)).toBe('en');
  });

  it('gives persisted locale precedence over browser locale and persists changes', async () => {
    localStorage.setItem('lexora-language', 'vi-VN');
    expect(normalizeLocale(localStorage.getItem('lexora-language'))).toBe('vi');

    await i18n.changeLanguage('vi');

    expect(i18n.resolvedLanguage).toBe('vi');
    expect(localStorage.getItem('lexora-language')).toContain('vi');
    expect(document.documentElement.lang).toBe('vi');
  });

  it('changes translations and root language without a reload', async () => {
    await i18n.changeLanguage('en');
    expect(i18n.t('navigation:overview')).toBe('Overview');

    await i18n.changeLanguage('vi');

    expect(i18n.t('navigation:overview')).toBe('Tổng quan');
    expect(document.documentElement.lang).toBe('vi');
  });
});
