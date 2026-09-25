/**
 * @file i18n.store.ts
 * @description Dedicated Zustand store managing active locale, two-way synchronization with i18next, and persistence.
 */
import { create } from 'zustand';

import { i18n, normalizeLocale } from '../i18n/config';
import type { SupportedLocale } from '../i18n/types';

export type { SupportedLocale };

export type I18nState = {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => Promise<void>;
  toggleLocale: () => Promise<void>;
};

const initialLocale = normalizeLocale(i18n.resolvedLanguage ?? i18n.language);

export const useI18nStore = create<I18nState>()((set, get) => ({
  locale: initialLocale,
  setLocale: async (nextLocale: SupportedLocale) => {
    const normalized = normalizeLocale(nextLocale);
    if (get().locale === normalized && i18n.resolvedLanguage === normalized) {
      return;
    }
    set({ locale: normalized });
    await i18n.changeLanguage(normalized);
  },
  toggleLocale: async () => {
    const current = get().locale;
    const next: SupportedLocale = current === 'vi' ? 'en' : 'vi';
    await get().setLocale(next);
  },
}));

i18n.on('languageChanged', (lng: string) => {
  const normalized = normalizeLocale(lng);
  if (useI18nStore.getState().locale !== normalized) {
    useI18nStore.setState({ locale: normalized });
  }
});
