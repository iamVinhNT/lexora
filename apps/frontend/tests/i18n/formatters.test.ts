/**
 * @file formatters.test.ts
 * @description Verifies locale-aware date, number, percentage, and duration formatting helpers.
 */
import { describe, expect, it } from 'vitest';

import { formatDate, formatDurationMs, formatNumber, formatPercent } from '../../src/i18n/formatters';

describe('locale formatters', () => {
  it('uses explicit locale for numbers and percentages', () => {
    expect(formatNumber(1234.5, 'vi')).toBe(new Intl.NumberFormat('vi-VN').format(1234.5));
    expect(formatNumber(1234.5, 'en')).toBe(new Intl.NumberFormat('en-US').format(1234.5));
    expect(formatPercent(72.5, 'vi')).toBe(new Intl.NumberFormat('vi-VN', { style: 'percent', maximumFractionDigits: 1 }).format(0.725));
  });

  it('uses explicit locale and options for dates', () => {
    const value = '2026-09-11T00:00:00.000Z';
    expect(formatDate(value, { locale: 'vi', dateStyle: 'medium', timeZone: 'UTC' }))
      .toBe(new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(value)));
  });

  it('formats durations without relying on host locale', () => {
    expect(formatDurationMs(1250, 'en')).toBe('1.25 seconds');
    expect(formatDurationMs(1250, 'vi')).toBe('1,25 giây');
    expect(formatDurationMs(0, 'en')).toBe('0 milliseconds');
  });
});
