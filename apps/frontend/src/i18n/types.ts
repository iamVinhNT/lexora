/**
 * @file types.ts
 * @description Shared locale types and i18next resource typing for Lexora.
 */
import 'i18next';

import type { resources } from './resources';

export const SUPPORTED_LOCALES = ['vi', 'en'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export type TranslationResources = typeof resources.en;

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: TranslationResources;
    returnNull: false;
  }
}
