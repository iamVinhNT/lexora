/**
 * @file AnalyticsPage.i18n.test.tsx
 * @description Verifies analytics labels and stable insight presentation in Vietnamese.
 */
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { AnalyticsPage } from '../src/pages/AnalyticsPage';
import { i18n } from '../src/i18n/config';

function envelope(data: unknown) {
  return new Response(JSON.stringify({ success: true, data }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('AnalyticsPage i18n', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('vi');
    vi.stubGlobal('fetch', vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/statistics/dashboard')) return Promise.resolve(envelope({ todayReviews: 2, todayLearned: 1, overallAccuracy: 75, currentStreak: 2, longestStreak: 2, stateBreakdown: { NEW: 2, LEARNING: 1, FAMILIAR: 0, MASTERED: 0, MAINTENANCE: 0 }, dueCount: 1 }));
      if (url.includes('/statistics/trends')) return Promise.resolve(envelope({ days: 30, trends: [] }));
      if (url.includes('/statistics/insights')) return Promise.resolve(envelope({ insights: [{ id: 'pending-due-reviews', type: 'WARNING', title: 'backend title', message: 'backend message', params: { count: 1 }, action: { label: 'backend action', link: '/review' } }], summary: { weakWordsCount: 0, dueCount: 1, passiveWords: 0, activeWords: 1, strengths: [], weaknesses: [] } }));
      return Promise.resolve(envelope({ totalWords: 3, countsPerState: { NEW: 2, LEARNING: 1, FAMILIAR: 0, MASTERED: 0, MAINTENANCE: 0 }, byState: { new: 2, learning: 1, familiar: 0, mastered: 0, maintenance: 0 }, averageDimensions: { recognition: 70, recall: 60, production: 50 }, passiveVsActive: { passive: 1, active: 1 }, passiveWords: 1, activeWords: 1, weakWordsCount: 0 }));
    }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders Vietnamese analytics copy and translates stable insight IDs', async () => {
    render(
      <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
        <MemoryRouter initialEntries={['/analytics']}>
          <AnalyticsPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => expect(screen.getByText('Các chiều kiến thức')).toBeTruthy());
    expect(screen.getByRole('heading', { level: 1, name: 'Thống kê' })).toBeTruthy();
    expect(screen.getByText('Khoảng xu hướng')).toBeTruthy();
    expect(screen.getByText('Các chiều kiến thức')).toBeTruthy();
    expect(screen.getByText('Nhận diện')).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Có lượt ôn đang chờ' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Bắt đầu ôn' })).toBeTruthy();
  });

  it('uses Vietnamese loading names without English fragments', async () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise<Response>(() => undefined)));

    render(
      <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
        <MemoryRouter initialEntries={['/analytics']}>
          <AnalyticsPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const loadingNames = screen.getAllByRole('status').map((element) => element.getAttribute('aria-label') ?? '');
    expect(loadingNames).toEqual(expect.arrayContaining(['Đang tải Từ vựng', 'Đang tải Trạng thái từ vựng', 'Đang tải Xu hướng ghi nhớ', 'Đang tải Insight học tập']));
    expect(loadingNames.every((name) => !/\bloading\b/i.test(name))).toBe(true);
  });
});
