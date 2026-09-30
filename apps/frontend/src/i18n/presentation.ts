/**
 * @file presentation.ts
 * @description Maps stable API values, errors, and analytics insight identifiers to localized UI presentation.
 */
import type { TFunction } from 'i18next';

import { ApiError } from '../api/client';
import type { Insight } from '../api/analytics.api';

type PresentationTFunction = TFunction<any>;

const insightKeys: Record<string, { key: string; actionKey?: string }> = {
  'recommend-output-practice': { key: 'recommendOutputPractice', actionKey: 'recommendOutputPractice' },
  'reinforce-weak-words': { key: 'reinforceWeakWords', actionKey: 'reinforceWeakWords' },
  'pending-due-reviews': { key: 'pendingDueReviews', actionKey: 'pendingDueReviews' },
  'streak-achievement': { key: 'streakAchievement' },
  'explore-new-words': { key: 'exploreNewWords', actionKey: 'exploreNewWords' },
  'welcome-start': { key: 'welcomeStart', actionKey: 'welcomeStart' },
};

const errorCodes = new Set(['VALIDATION_ERROR', 'BAD_REQUEST', 'NOT_FOUND', 'CONFLICT', 'SERVICE_UNAVAILABLE', 'INTERNAL_ERROR', 'INVALID_RESPONSE', 'HTTP_ERROR']);

export function getLocalizedErrorMessage(error: unknown, t: PresentationTFunction): string {
  if (error instanceof ApiError && errorCodes.has(error.code)) return String(t(`common:errors.${error.code}`));
  return String(t('common:errors.generic'));
}

export function getLocalizedEnumLabel(t: PresentationTFunction, namespace: string, value: string): string {
  const translation = t(`${namespace}.${value}`, { defaultValue: value });
  return translation || value;
}

export function getLocalizedInsight(insight: Insight, t: PresentationTFunction): Insight {
  const definition = insightKeys[insight.id];
  if (!definition) {
    return {
      ...insight,
      type: insight.type,
       title: String(t('analytics:insightFallback.title')),
       message: String(t('analytics:insightFallback.message')),
       action: insight.action ? { ...insight.action, label: String(t('analytics:insightFallback.action')) } : undefined,
    };
  }

  const params = insight.params ?? {};
  const resourcePrefix = `analytics:insight.${definition.key}`;
  return {
    ...insight,
     title: String(t(`${resourcePrefix}.title`)),
     message: String(t(`${resourcePrefix}.message`, params)),
     action: insight.action && definition.actionKey
       ? { ...insight.action, label: String(t(`analytics:insight.${definition.actionKey}.action`)) }
       : undefined,
  };
}
