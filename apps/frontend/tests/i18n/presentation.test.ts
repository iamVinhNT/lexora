/**
 * @file presentation.test.ts
 * @description Verifies stable API enum, error, and analytics insight presentation mappings.
 */
import { beforeEach, describe, expect, it } from 'vitest';

import { ApiError } from '../../src/api/client';
import { i18n } from '../../src/i18n/config';
import { getLocalizedErrorMessage, getLocalizedInsight } from '../../src/i18n/presentation';

describe('localized presentation helpers', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('maps stable API error codes and unknown failures to localized copy', async () => {
    const error = new ApiError('server copy', 404, 'NOT_FOUND');
    expect(getLocalizedErrorMessage(error, i18n.t.bind(i18n))).toBe('The requested item could not be found.');

    await i18n.changeLanguage('vi');
    expect(getLocalizedErrorMessage(error, i18n.t.bind(i18n))).toBe('Không tìm thấy dữ liệu yêu cầu.');
    expect(getLocalizedErrorMessage(new Error('technical detail'), i18n.t.bind(i18n))).toBe('Đã xảy ra lỗi. Vui lòng thử lại.');
  });

  it('maps insight IDs and structured params without parsing backend text', async () => {
    const insight = getLocalizedInsight({
      id: 'reinforce-weak-words',
      type: 'WARNING',
      title: 'backend title',
      message: 'You have 3 words',
      params: { count: 3 },
      action: { label: 'backend action', link: '/learn?mode=weak_words' },
    }, i18n.t.bind(i18n));
    expect(insight.title).toBe('Reinforce weak vocabulary');
    expect(insight.message).toContain('3');
    expect(insight.action?.label).toBe('Review weak words');

    await i18n.changeLanguage('vi');
    expect(getLocalizedInsight({ id: 'future-id', type: 'INFO', title: 'server', message: 'server' }, i18n.t.bind(i18n)).title).toBe('Thông tin học tập');
  });
});
