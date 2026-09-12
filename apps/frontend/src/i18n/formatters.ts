/**
 * @file formatters.ts
 * @description Locale-aware formatting helpers for dates, numbers, percentages, and response durations.
 */
import { i18n } from './config';
import { normalizeLocale, type SupportedLocale } from './config';

export function getIntlLocale(locale?: SupportedLocale): 'vi-VN' | 'en-US' {
  return normalizeLocale(locale ?? i18n.resolvedLanguage ?? i18n.language) === 'vi' ? 'vi-VN' : 'en-US';
}

type DateOptions = Intl.DateTimeFormatOptions & { locale?: SupportedLocale };

export function formatDate(value: string | number | Date | null | undefined, options: DateOptions = {}): string {
  if (value === null || value === undefined || value === '') return '—';
  const { locale, ...intlOptions } = options;
  return new Intl.DateTimeFormat(getIntlLocale(locale), intlOptions).format(new Date(value));
}

export function formatNumber(value: number, locale?: SupportedLocale, options: Intl.NumberFormatOptions = {}): string {
  return new Intl.NumberFormat(getIntlLocale(locale), options).format(value);
}

export function formatPercent(value: number, locale?: SupportedLocale, options: Intl.NumberFormatOptions = {}): string {
  return new Intl.NumberFormat(getIntlLocale(locale), {
    style: 'percent',
    maximumFractionDigits: 1,
    ...options,
  }).format(value / 100);
}

export function formatDurationMs(value: number, locale?: SupportedLocale): string {
  const intlLocale = getIntlLocale(locale);
  if (Math.abs(value) < 1000) {
    return new Intl.NumberFormat(intlLocale, { style: 'unit', unit: 'millisecond', unitDisplay: 'long', maximumFractionDigits: 2 }).format(value);
  }
  return new Intl.NumberFormat(intlLocale, { style: 'unit', unit: 'second', unitDisplay: 'long', maximumFractionDigits: 2 }).format(value / 1000);
}

export function formatIntervalDays(days: number, locale?: SupportedLocale): string {
  if (days <= 1) return new Intl.NumberFormat(getIntlLocale(locale), { style: 'unit', unit: 'day', unitDisplay: 'long' }).format(1);
  if (days < 30) return new Intl.NumberFormat(getIntlLocale(locale), { style: 'unit', unit: 'day', unitDisplay: 'long' }).format(days);
  if (days < 365) return new Intl.NumberFormat(getIntlLocale(locale), { style: 'unit', unit: 'month', unitDisplay: 'long' }).format(Math.round(days / 30));
  return new Intl.NumberFormat(getIntlLocale(locale), { style: 'unit', unit: 'year', unitDisplay: 'long', maximumFractionDigits: 1 }).format(days / 365);
}
