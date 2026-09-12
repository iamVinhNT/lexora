/**
 * @file resources.ts
 * @description Bundled English and Vietnamese translation resources for every Lexora UI namespace.
 */
import enCommon from './locales/en/common';
import enNavigation from './locales/en/navigation';
import enDashboard from './locales/en/dashboard';
import enVocabulary from './locales/en/vocabulary';
import enContexts from './locales/en/contexts';
import enLearning from './locales/en/learning';
import enReview from './locales/en/review';
import enAnalytics from './locales/en/analytics';
import enSettings from './locales/en/settings';
import viCommon from './locales/vi/common';
import viNavigation from './locales/vi/navigation';
import viDashboard from './locales/vi/dashboard';
import viVocabulary from './locales/vi/vocabulary';
import viContexts from './locales/vi/contexts';
import viLearning from './locales/vi/learning';
import viReview from './locales/vi/review';
import viAnalytics from './locales/vi/analytics';
import viSettings from './locales/vi/settings';

export const resources = {
  en: {
    common: enCommon,
    navigation: enNavigation,
    dashboard: enDashboard,
    vocabulary: enVocabulary,
    contexts: enContexts,
    learning: enLearning,
    review: enReview,
    analytics: enAnalytics,
    settings: enSettings,
  },
  vi: {
    common: viCommon,
    navigation: viNavigation,
    dashboard: viDashboard,
    vocabulary: viVocabulary,
    contexts: viContexts,
    learning: viLearning,
    review: viReview,
    analytics: viAnalytics,
    settings: viSettings,
  },
} as const;

export type TranslationNamespace = keyof typeof resources.en;
