/**
 * @file AnalyticsPage.test.tsx
 * @description Verifies server-backed analytics, meaningful chart fallbacks, and isolated failures.
 */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { AnalyticsPage } from '../src/pages/AnalyticsPage';

const progress = {
  totalWords: 10,
  countsPerState: { NEW: 2, LEARNING: 3, FAMILIAR: 1, MASTERED: 3, MAINTENANCE: 1 },
  byState: { new: 2, learning: 3, familiar: 1, mastered: 3, maintenance: 1 },
  averageDimensions: { recognition: 72, recall: 61, production: 48 },
  passiveVsActive: { passive: 4, active: 3 },
  passiveWords: 4,
  activeWords: 3,
  weakWordsCount: 2,
};

const dashboard = {
  todayReviews: 5,
  todayLearned: 2,
  overallAccuracy: 80,
  currentStreak: 4,
  longestStreak: 8,
  stateBreakdown: progress.countsPerState,
  dueCount: 2,
};

function envelope(data: unknown) {
  return new Response(JSON.stringify({ success: true, data }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

function renderAnalytics() {
  return render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <MemoryRouter initialEntries={['/analytics']}>
        <AnalyticsPage />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

function LocationProbe() {
  return <output data-testid="location">{useLocation().pathname}</output>;
}

describe('AnalyticsPage', () => {
  beforeEach(() => vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined));
  afterEach(() => vi.restoreAllMocks());

  it('shows server KPIs, state labels, a text fallback for fewer than four active trend points, and table toggle', async () => {
    const trends = {
      days: 7,
      trends: [
        { date: '2026-09-02', reviewsCount: 1, reviewCount: 1, correctCount: 1, accuracy: 100, averageResponseTime: 900 },
       { date: '2026-09-03', reviewsCount: 0, reviewCount: 0, correctCount: 0, accuracy: null, averageResponseTime: null },
        { date: '2026-09-04', reviewsCount: 1, reviewCount: 1, correctCount: 0, accuracy: 0, averageResponseTime: 1300 },
        { date: '2026-09-05', reviewsCount: 1, reviewCount: 1, correctCount: 1, accuracy: 100, averageResponseTime: 1100 },
       { date: '2026-09-06', reviewsCount: 0, reviewCount: 0, correctCount: 0, accuracy: null, averageResponseTime: null },
       { date: '2026-09-07', reviewsCount: 0, reviewCount: 0, correctCount: 0, accuracy: null, averageResponseTime: null },
       { date: '2026-09-08', reviewsCount: 0, reviewCount: 0, correctCount: 0, accuracy: null, averageResponseTime: null },
      ],
    };
    vi.stubGlobal('fetch', vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/statistics/dashboard')) return Promise.resolve(envelope(dashboard));
      if (url.includes('/statistics/trends')) return Promise.resolve(envelope(trends));
      if (url.includes('/statistics/insights')) return Promise.resolve(envelope({ insights: [], summary: { weakWordsCount: 2, dueCount: 2, passiveWords: 4, activeWords: 3, strengths: [], weaknesses: [] } }));
      return Promise.resolve(envelope(progress));
    }));

    renderAnalytics();

    await waitFor(() => expect(screen.getByText('10')).toBeTruthy());
    expect(screen.getByText('80%')).toBeTruthy();
    expect(screen.getByText('Retention trend needs at least four active review days.')).toBeTruthy();
    expect(screen.getByText('New')).toBeTruthy();
    expect(screen.getByText('2 words (20%)')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Show retention data table' })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Show retention data table' }));
    expect(screen.getByRole('table', { name: 'Retention trend data' })).toBeTruthy();
  });


  it('keeps successful analytics sections visible when one query fails', async () => {
    vi.stubGlobal('fetch', vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/statistics/trends')) return Promise.reject(new Error('Trend service down'));
      if (url.includes('/statistics/dashboard')) return Promise.resolve(envelope(dashboard));
      if (url.includes('/statistics/insights')) return Promise.resolve(envelope({ insights: [{ id: 'one', type: 'INFO', title: 'Keep practicing', message: 'Review again soon.' }], summary: { weakWordsCount: 0, dueCount: 2, passiveWords: 1, activeWords: 2, strengths: [], weaknesses: [] } }));
      return Promise.resolve(envelope(progress));
    }));

    renderAnalytics();

    await waitFor(() => expect(screen.getByText('Something went wrong. Please try again.')).toBeTruthy());
    expect(screen.getByText('Vocabulary states')).toBeTruthy();
    expect(screen.getByText('Keep practicing to build more learning data.')).toBeTruthy();
    expect(screen.getByText('80%')).toBeTruthy();
  });

  it('maps days control to supported trends query parameter', async () => {
    const fetchMock = vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/statistics/dashboard')) return Promise.resolve(envelope(dashboard));
      if (url.includes('/statistics/insights')) return Promise.resolve(envelope({ insights: [], summary: { weakWordsCount: 0, dueCount: 0, passiveWords: 0, activeWords: 0, strengths: [], weaknesses: [] } }));
      if (url.includes('/statistics/trends')) return Promise.resolve(envelope({ days: 14, trends: [] }));
      return Promise.resolve(envelope(progress));
    });
    vi.stubGlobal('fetch', fetchMock);

    renderAnalytics();
    await waitFor(() => expect(screen.getByText('10')).toBeTruthy());
    fireEvent.pointerDown(screen.getByRole('combobox', { name: 'Trend range' }), { button: 0, ctrlKey: false, pointerType: 'mouse' });
    fireEvent.click(screen.getByRole('option', { name: '14 days' }));
    await waitFor(() => expect(fetchMock.mock.calls.some(([input]) => String(input).includes('days=14'))).toBe(true));
  });

  it('keeps review volume above 100 visible on an independent chart scale', async () => {
    const trends = {
      days: 7,
      trends: [1, 2, 3, 4].map((day) => ({
        date: `2026-09-0${day}`,
        reviewsCount: 150,
        reviewCount: 150,
        correctCount: 120,
        accuracy: 80,
        averageResponseTime: 900,
      })),
    };
    vi.stubGlobal('fetch', vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/statistics/dashboard')) return Promise.resolve(envelope(dashboard));
      if (url.includes('/statistics/trends')) return Promise.resolve(envelope(trends));
      if (url.includes('/statistics/insights')) return Promise.resolve(envelope({ insights: [], summary: { weakWordsCount: 0, dueCount: 0, passiveWords: 0, activeWords: 0, strengths: [], weaknesses: [] } }));
      return Promise.resolve(envelope(progress));
    }));

    const resizeObservers: Array<(entries: Array<{ contentRect: { width: number; height: number } }>) => void> = [];
    vi.stubGlobal('ResizeObserver', class {
      constructor(callback: (entries: Array<{ contentRect: { width: number; height: number } }>) => void) {
        resizeObservers.push(callback);
      }
      observe() {
        resizeObservers.at(-1)?.([{ contentRect: { width: 640, height: 288 } }]);
      }
      unobserve() {}
      disconnect() {}
    });
    const rendered = renderAnalytics();

    await waitFor(() => expect(screen.getByText(/Review volume axis scales independently up to 150 reviews/)).toBeTruthy());
    await waitFor(() => expect(rendered.container.querySelectorAll('.recharts-yAxis')).toHaveLength(2));
    expect(screen.getByRole('img', { name: 'Retention trend' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Show retention data table' }));
    expect(screen.getAllByText('150').length).toBeGreaterThan(0);
  });

  it('maps legacy vocabulary insight actions to the canonical words route', async () => {
    vi.stubGlobal('fetch', vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/statistics/dashboard')) return Promise.resolve(envelope(dashboard));
      if (url.includes('/statistics/insights')) return Promise.resolve(envelope({ insights: [{ id: 'legacy', type: 'INFO', title: 'Review vocabulary', message: 'Strengthen your vocabulary.', action: { label: 'Open vocabulary', link: '/vocabulary' } }], summary: { weakWordsCount: 0, dueCount: 0, passiveWords: 0, activeWords: 0, strengths: [], weaknesses: [] } }));
      if (url.includes('/statistics/trends')) return Promise.resolve(envelope({ days: 30, trends: [] }));
      return Promise.resolve(envelope(progress));
    }));

    render(
      <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
        <MemoryRouter initialEntries={['/analytics']}>
          <AnalyticsPage />
          <LocationProbe />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const action = await screen.findByRole('link', { name: 'View details' });
    fireEvent.click(action);

    expect(screen.getByTestId('location').textContent).toBe('/words');
  });

  it('shows no-review days as null accuracy without hiding actual zero accuracy', async () => {
    const trends = {
      days: 7,
      trends: [
        { date: '2026-09-04', reviewsCount: 1, reviewCount: 1, correctCount: 1, accuracy: 100, averageResponseTime: 900 },
          { date: '2026-09-05', reviewsCount: 0, reviewCount: 0, correctCount: 0, accuracy: null, averageResponseTime: null },
        { date: '2026-09-06', reviewsCount: 1, reviewCount: 1, correctCount: 0, accuracy: 0, averageResponseTime: 1300 },
        { date: '2026-09-07', reviewsCount: 1, reviewCount: 1, correctCount: 1, accuracy: 100, averageResponseTime: 1100 },
        { date: '2026-09-08', reviewsCount: 1, reviewCount: 1, correctCount: 1, accuracy: 100, averageResponseTime: 1000 },
      ],
    };
    vi.stubGlobal('fetch', vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/statistics/dashboard')) return Promise.resolve(envelope(dashboard));
      if (url.includes('/statistics/trends')) return Promise.resolve(envelope(trends));
      if (url.includes('/statistics/insights')) return Promise.resolve(envelope({ insights: [], summary: { weakWordsCount: 0, dueCount: 0, passiveWords: 0, activeWords: 0, strengths: [], weaknesses: [] } }));
      return Promise.resolve(envelope(progress));
    }));

    renderAnalytics();

    await waitFor(() => expect(screen.getByText(/Latest accuracy 100%/)).toBeTruthy());
    fireEvent.click(screen.getByRole('button', { name: 'Show retention data table' }));

     const row = screen.getByRole('row', { name: /2026-09-05/ });
     expect(row.textContent).toContain('No reviews');
     expect(row.textContent).not.toContain('0%');

     const incorrectRow = screen.getByRole('row', { name: /2026-09-06/ });
      expect(incorrectRow.textContent).toContain('0%');
     });

  it('shows unavailable accuracy when a reviewed trend has no known correctness denominator', async () => {
    const trends = {
      days: 3,
      trends: [
        { date: '2026-09-06', reviewsCount: 1, reviewCount: 1, correctCount: 0, accuracy: null, averageResponseTime: null },
        { date: '2026-09-07', reviewsCount: 0, reviewCount: 0, correctCount: 0, accuracy: null, averageResponseTime: null },
        { date: '2026-09-08', reviewsCount: 1, reviewCount: 1, correctCount: 1, accuracy: 100, averageResponseTime: 900 },
      ],
    };
    vi.stubGlobal('fetch', vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/statistics/dashboard')) return Promise.resolve(envelope(dashboard));
      if (url.includes('/statistics/trends')) return Promise.resolve(envelope(trends));
      if (url.includes('/statistics/insights')) return Promise.resolve(envelope({ insights: [], summary: { weakWordsCount: 0, dueCount: 0, passiveWords: 0, activeWords: 0, strengths: [], weaknesses: [] } }));
      return Promise.resolve(envelope(progress));
    }));

    renderAnalytics();

    await waitFor(() => expect(screen.getByText('10')).toBeTruthy());
    fireEvent.click(screen.getByRole('button', { name: 'Show retention data table' }));
    expect(screen.getByRole('row', { name: /2026-09-06/ }).textContent).toContain('Accuracy unavailable');
    expect(screen.getByRole('row', { name: /2026-09-07/ }).textContent).toContain('No reviews');
  });

  it('shows no timing data for missing samples and keeps actual zero milliseconds', async () => {
    const trends = {
      days: 3,
      trends: [
        { date: '2026-09-06', reviewsCount: 1, reviewCount: 1, correctCount: 1, accuracy: 100, averageResponseTime: null },
        { date: '2026-09-07', reviewsCount: 1, reviewCount: 1, correctCount: 1, accuracy: 100, averageResponseTime: 0 },
        { date: '2026-09-08', reviewsCount: 1, reviewCount: 1, correctCount: 1, accuracy: 100, averageResponseTime: 900 },
      ],
    };
    vi.stubGlobal('fetch', vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/statistics/dashboard')) return Promise.resolve(envelope(dashboard));
      if (url.includes('/statistics/trends')) return Promise.resolve(envelope(trends));
      if (url.includes('/statistics/insights')) return Promise.resolve(envelope({ insights: [], summary: { weakWordsCount: 0, dueCount: 0, passiveWords: 0, activeWords: 0, strengths: [], weaknesses: [] } }));
      return Promise.resolve(envelope(progress));
    }));

    renderAnalytics();

    await waitFor(() => expect(screen.getByText('10')).toBeTruthy());
    fireEvent.click(screen.getByRole('button', { name: 'Show retention data table' }));

    const noTimingRow = screen.getByRole('row', { name: /2026-09-06/ });
    expect(noTimingRow.textContent).toContain('No timing data');
    expect(noTimingRow.textContent).not.toContain('0 ms');
    expect(screen.getByRole('row', { name: /2026-09-07/ }).textContent).toContain('0 ms');
    expect(screen.queryByText('null ms')).toBeNull();
  });

  it('renders unavailable accuracy instead of claiming no reviews when the denominator is unknown', async () => {
    const noReviewDashboard = { ...dashboard, overallAccuracy: null };
    vi.stubGlobal('fetch', vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/statistics/dashboard')) return Promise.resolve(envelope(noReviewDashboard));
      if (url.includes('/statistics/trends')) return Promise.resolve(envelope({ days: 30, trends: [] }));
      if (url.includes('/statistics/insights')) return Promise.resolve(envelope({ insights: [], summary: { weakWordsCount: 0, dueCount: 0, passiveWords: 0, activeWords: 0, strengths: [], weaknesses: [] } }));
      return Promise.resolve(envelope(progress));
    }));

    renderAnalytics();

    await waitFor(() => expect(screen.getByText('10')).toBeTruthy());
    expect(screen.getByText('Accuracy unavailable')).toBeTruthy();
    expect(screen.queryByText('No reviews')).toBeNull();
    expect(screen.queryByText('null%')).toBeNull();
  });

  it('renders zero percent in the KPI when reviews are all incorrect', async () => {
    const zeroAccuracyDashboard = { ...dashboard, overallAccuracy: 0 };
    vi.stubGlobal('fetch', vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/statistics/dashboard')) return Promise.resolve(envelope(zeroAccuracyDashboard));
      if (url.includes('/statistics/trends')) return Promise.resolve(envelope({ days: 30, trends: [] }));
      if (url.includes('/statistics/insights')) return Promise.resolve(envelope({ insights: [], summary: { weakWordsCount: 0, dueCount: 0, passiveWords: 0, activeWords: 0, strengths: [], weaknesses: [] } }));
      return Promise.resolve(envelope(progress));
    }));

    renderAnalytics();

    await waitFor(() => expect(screen.getByText('10')).toBeTruthy());
    expect(screen.getByText('0%')).toBeTruthy();
    expect(screen.queryByText('No reviews')).toBeNull();
  });

  it('renders unavailable dimension averages without fabricating zero values', async () => {
    const unavailableProgress = {
      ...progress,
      averageDimensions: { recognition: null, recall: null, production: 0 },
    };
    vi.stubGlobal('fetch', vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/statistics/dashboard')) return Promise.resolve(envelope(dashboard));
      if (url.includes('/statistics/trends')) return Promise.resolve(envelope({ days: 30, trends: [] }));
      if (url.includes('/statistics/insights')) return Promise.resolve(envelope({ insights: [], summary: { weakWordsCount: 0, dueCount: 0, passiveWords: 0, activeWords: 0, strengths: [], weaknesses: [] } }));
      return Promise.resolve(envelope(unavailableProgress));
    }));

    renderAnalytics();

    await waitFor(() => expect(screen.getByText('Recognition')).toBeTruthy());
    expect(screen.getAllByText('No data')).toHaveLength(2);
    expect(screen.getByText('Production')).toBeTruthy();
    expect(screen.getByText('0%')).toBeTruthy();
    expect(screen.queryByText('null%')).toBeNull();
  });
});
