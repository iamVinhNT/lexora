/**
 * @file DashboardPage.test.tsx
 * @description Verifies truthful empty dashboard content and learning path presentation.
 */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import App from '../src/App';
import { useUiStore } from '../src/stores/ui.store';

describe('DashboardPage', () => {
  beforeEach(() => {
    localStorage.clear();
    useUiStore.setState({ theme: 'light', isSidebarOpen: true, isMoreOpen: false });
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
  });

  afterEach(() => vi.restoreAllMocks());

  function renderDashboard() {
    return render(
      <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
        <MemoryRouter initialEntries={['/']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <App />
        </MemoryRouter>
      </QueryClientProvider>,
    );
  }

  it('shows a truthful empty state from empty dashboard data', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({
      success: true,
      data: {
        todayReviews: 0,
        todayLearned: 0,
        overallAccuracy: 0,
        currentStreak: 0,
        longestStreak: 0,
        stateBreakdown: { NEW: 0, LEARNING: 0, FAMILIAR: 0, MASTERED: 0, MAINTENANCE: 0 },
        dueCount: 0,
      },
    }), { status: 200, headers: { 'Content-Type': 'application/json' } })));

    renderDashboard();

    await waitFor(() => expect(screen.getByText('No learning data yet')).toBeTruthy());
    expect(screen.getByRole('link', { name: 'Add your first word' })).toBeTruthy();
    expect(screen.queryByText('No data yet')).toBeNull();
  });

  it('renders loaded KPIs and the real next-review action without fabricated metrics', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({
      success: true,
      data: {
        todayReviews: 4,
        todayLearned: 2,
        overallAccuracy: 75,
        currentStreak: 3,
        longestStreak: 5,
        stateBreakdown: { NEW: 2, LEARNING: 3, FAMILIAR: 1, MASTERED: 4, MAINTENANCE: 0 },
        dueCount: 1,
      },
    }), { status: 200, headers: { 'Content-Type': 'application/json' } })));

    renderDashboard();

    await waitFor(() => expect(screen.getByText('Reviews today')).toBeTruthy());
    expect(screen.getByText('Reviews today')).toBeTruthy();
    expect(screen.getByText('75%')).toBeTruthy();
    expect(screen.getByRole('link', { name: /start review/i }).getAttribute('href')).toBe('/review');
    expect(screen.queryByText(/words learned/i)).toBeNull();
  });

  it('renders unavailable accuracy instead of claiming no reviews when the denominator is unknown', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({
      success: true,
      data: {
        todayReviews: 0,
        todayLearned: 0,
        overallAccuracy: null,
        currentStreak: 0,
        longestStreak: 0,
        stateBreakdown: { NEW: 1, LEARNING: 0, FAMILIAR: 0, MASTERED: 0, MAINTENANCE: 0 },
        dueCount: 0,
      },
    }), { status: 200, headers: { 'Content-Type': 'application/json' } })));

    renderDashboard();

    await waitFor(() => expect(screen.getByText('Overall accuracy')).toBeTruthy());
    expect(screen.getByText('Accuracy unavailable')).toBeTruthy();
    expect(screen.queryByText('No reviews')).toBeNull();
    expect(screen.queryByText('null%')).toBeNull();
  });

  it('renders zero percent for reviewed vocabulary with no correct answers', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({
      success: true,
      data: {
        todayReviews: 1,
        todayLearned: 1,
        overallAccuracy: 0,
        currentStreak: 1,
        longestStreak: 1,
        stateBreakdown: { NEW: 0, LEARNING: 1, FAMILIAR: 0, MASTERED: 0, MAINTENANCE: 0 },
        dueCount: 0,
      },
    }), { status: 200, headers: { 'Content-Type': 'application/json' } })));

    renderDashboard();

    await waitFor(() => expect(screen.getByText('Overall accuracy')).toBeTruthy());
    expect(screen.getByText('0%')).toBeTruthy();
    expect(screen.queryByText('No reviews')).toBeNull();
  });

  it('shows a visible retry action when dashboard request fails', async () => {
    const fetchMock = vi.fn()
      .mockRejectedValueOnce(new Error('Dashboard unavailable'))
      .mockResolvedValueOnce(new Response(JSON.stringify({
        success: true,
        data: {
          todayReviews: 0, todayLearned: 0, overallAccuracy: 0, currentStreak: 0, longestStreak: 0,
          stateBreakdown: { NEW: 0, LEARNING: 0, FAMILIAR: 0, MASTERED: 0, MAINTENANCE: 0 }, dueCount: 0,
        },
      }), { status: 200, headers: { 'Content-Type': 'application/json' } }));
    vi.stubGlobal('fetch', fetchMock);

    renderDashboard();

    await waitFor(() => expect(screen.getByRole('alert').textContent).toContain('Something went wrong. Please try again.'));
    fireEvent.click(screen.getByRole('button', { name: 'Retry dashboard' }));
    await waitFor(() => expect(screen.getByText('No learning data yet')).toBeTruthy());
    expect(fetchMock.mock.calls.filter(([input]) => String(input).includes('/api/statistics/dashboard'))).toHaveLength(2);
  });

  it('shows the learning path without claiming progress', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({
      success: true,
      data: {
        todayReviews: 0, todayLearned: 0, overallAccuracy: 0, currentStreak: 0, longestStreak: 0,
        stateBreakdown: { NEW: 0, LEARNING: 0, FAMILIAR: 0, MASTERED: 0, MAINTENANCE: 0 }, dueCount: 0,
      },
    }), { status: 200, headers: { 'Content-Type': 'application/json' } })));

    renderDashboard();

    await waitFor(() => expect(screen.getByText('No learning data yet')).toBeTruthy());

    expect(screen.getByRole('heading', { level: 1, name: 'Overview' })).toBeTruthy();
    expect(screen.getByText('Learn in context. Remember for life.')).toBeTruthy();
    for (const step of ['Context', 'Understand', 'Recall', 'Output', 'Review']) {
      expect(screen.getAllByText(step)).not.toHaveLength(0);
    }

    expect(screen.queryByText(/\d+%/)).toBeNull();
    expect(screen.queryByText(/words learned/i)).toBeNull();
  });
  it('shows grammar plan today even when vocabulary is empty', async () => {
    const fetchMock = vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/api/statistics/dashboard')) {
        return Promise.resolve(new Response(JSON.stringify({ success: true, data: {
          todayReviews: 0, todayLearned: 0, overallAccuracy: 0, currentStreak: 0, longestStreak: 0,
          stateBreakdown: { NEW: 0, LEARNING: 0, FAMILIAR: 0, MASTERED: 0, MAINTENANCE: 0 }, dueCount: 0,
        } }), { status: 200, headers: { 'Content-Type': 'application/json' } }));
      }
      if (url.includes('/api/study-preferences')) {
        return Promise.resolve(new Response(JSON.stringify({ success: true, data: { timeZone: 'UTC', studyDays: [1], learningTarget: 0, reviewTarget: 0, grammarTarget: 1, updatedAt: '2026-10-03T00:00:00.000Z' } }), { status: 200, headers: { 'Content-Type': 'application/json' } }));
      }
      return Promise.resolve(new Response(JSON.stringify({ success: true, data: { timeZone: 'UTC', today: '2026-10-03', generatedAt: '2026-10-03T00:00:00.000Z', backlogCount: 0, days: [{ date: '2026-10-03', status: 'PLANNED', isStudyDay: true, scheduledDueCount: 0, dueNowCount: 0, dueLaterTodayCount: 0, activities: [], tasks: [{
        id: 'grammar-task', kind: 'GRAMMAR', lessonId: 'lesson-1', revisionId: 'revision-1', revision: '1', scheduledDate: '2026-10-03', targetCount: 1, source: 'AUTO', version: 1, createdAt: '2026-10-03T00:00:00.000Z', updatedAt: '2026-10-03T00:00:00.000Z', cancelledAt: null, transferredAt: null, transferredToTaskId: null, transferredCount: 0, completedCount: 0, onTimeCount: 0, isComplete: false, isLate: false, isUnavailable: false, unavailableReason: null, activeSessionId: null,
      }] }] } }), { status: 200, headers: { 'Content-Type': 'application/json' } }));
    });
    vi.stubGlobal('fetch', fetchMock);

    renderDashboard();

    const link = await screen.findByRole('link', { name: 'Start' });
    expect(link.getAttribute('href')).toBe('/grammar/lesson-1?taskId=grammar-task');
    expect(screen.getByText('No learning data yet')).toBeTruthy();
  });
});
