/**
 * @file config.ts
 * @description Initializes the bundled i18next singleton, locale detection, persistence, and root language synchronization.
 */
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { resources } from './resources';
import { SUPPORTED_LOCALES, type SupportedLocale } from './types';

export { SUPPORTED_LOCALES };
export type { SupportedLocale };

export const DEFAULT_LOCALE: SupportedLocale = 'en';
export const LANGUAGE_STORAGE_KEY = 'lexora-language';

export function normalizeLocale(value: string | null | undefined): SupportedLocale {
  const base = value?.trim().toLowerCase().replace('_', '-').split('-')[0];
  return base === 'vi' ? 'vi' : base === 'en' ? 'en' : DEFAULT_LOCALE;
}

function syncDocumentLanguage(language: string) {
  document.documentElement.lang = normalizeLocale(language);
}

const detectedI18n = i18next
  .use(LanguageDetector)
  .use(initReactI18next);

detectedI18n.init({
  resources,
  supportedLngs: [...SUPPORTED_LOCALES],
  fallbackLng: DEFAULT_LOCALE,
  load: 'languageOnly',
  defaultNS: 'common',
  ns: [...Object.keys(resources.en)],
  interpolation: { escapeValue: false },
  detection: {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage'],
    lookupLocalStorage: LANGUAGE_STORAGE_KEY,
  },
  react: { useSuspense: false },
  returnNull: false,
});

detectedI18n.on('languageChanged', syncDocumentLanguage);
syncDocumentLanguage(detectedI18n.resolvedLanguage ?? DEFAULT_LOCALE);

export const i18n = detectedI18n;
export default i18n;
