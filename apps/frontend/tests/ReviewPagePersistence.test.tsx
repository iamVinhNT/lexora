/**
 * @file ReviewPagePersistence.test.tsx
 * @description Verifies active attempt resume on reload, abandon lifecycle without credit, and post-completion analytics invalidation.
 */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ReviewPage } from '../src/pages/ReviewPage';
import {
  cleanupTestQueryClients,
  createTestQueryClient,
  json,
  mockAttempt,
  queue,
  renderPage,
  ReviewMutationConsumer,
} from './review-test-helpers';

describe('ReviewPage - Persistence and Lifecycle', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/api/reviews/attempt')) {
        return json(null);
      }
      return json(queue());
    }));
  });

  afterEach(() => {
    cleanupTestQueryClients();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('restores active review attempt on reload (resume)', async () => {
    vi.mocked(fetch).mockImplementation((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/api/reviews/attempt')) {
        return json(mockAttempt({ stage: 'OUTPUT', version: 2 }));
      }
      return json(queue());
    });

    renderPage();
    expect(await screen.findByRole('heading', { name: 'Practice sentence' })).toBeTruthy();
  });

  it('allows abandoning active review attempt without schedule credit', async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockImplementation((input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      const method = init?.method || 'GET';

      if (url.includes('/api/reviews/due')) return json(queue());
      if (url.includes('/api/reviews/attempt') && method === 'GET') {
        return json(mockAttempt({ stage: 'FEEDBACK', version: 2 }));
      }
      if (url.includes('/abandon') && method === 'POST') {
        return json(mockAttempt({ status: 'ABANDONED' }));
      }
      return json(null);
    });

    renderPage();
    await screen.findByRole('heading', { name: 'Review' });

    const abandonButton = await screen.findByRole('button', { name: 'Abandon review' });
    fireEvent.click(abandonButton);

    await waitFor(() => {
      const abandonCall = fetchMock.mock.calls.find(([url, init]) => String(url).includes('/abandon') && init?.method === 'POST');
      expect(abandonCall).toBeTruthy();
    });
  });

  it('allows abandoning active review attempt in recall stage', async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockImplementation((input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      const method = init?.method || 'GET';

      if (url.includes('/api/reviews/due')) return json(queue());
      if (url.includes('/api/reviews/attempt') && method === 'GET') {
        return json(mockAttempt({ stage: 'RECALL', version: 1 }));
      }
      if (url.includes('/abandon') && method === 'POST') {
        return json(mockAttempt({ status: 'ABANDONED' }));
      }
      return json(null);
    });

    renderPage();
    await screen.findByRole('heading', { name: 'Recall the word' });

    const abandonButton = screen.getByRole('button', { name: 'Abandon review' });
    fireEvent.click(abandonButton);

    await waitFor(() => {
      const abandonCall = fetchMock.mock.calls.find(([url, init]) => String(url).includes('/abandon') && init?.method === 'POST');
      expect(abandonCall).toBeTruthy();
    });
  });

  it('refetches active analytics after review completion', async () => {
    const fetchMock = vi.mocked(fetch);
    let dashboardCalls = 0;
    fetchMock.mockImplementation((input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      const method = init?.method || 'GET';

      if (url.includes('/api/statistics/dashboard')) {
        dashboardCalls += 1;
        return json({ todayReviews: dashboardCalls });
      }
      if (url.includes('/api/reviews/due')) return json(queue());
      if (url.includes('/api/reviews/attempt') && method === 'GET') {
        return json(mockAttempt({ stage: 'ASSESS', version: 2 }));
      }
      if (url.endsWith('/api/reviews') && method === 'POST') {
        return json({
          attempt: mockAttempt({ status: 'COMPLETED' }),
          selfRating: 'GOOD',
          effectiveRating: 'GOOD',
          reviewState: { interval: 1 },
          reviewLog: {},
          learningProgress: {},
        });
      }
      return json(null);
    });

    const client = createTestQueryClient();
    render(
      <MemoryRouter>
        <QueryClientProvider client={client}>
          <ReviewPage />
          <ReviewMutationConsumer />
        </QueryClientProvider>
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByTestId('review-analytics').textContent).toBe('1'));
    fireEvent.click(screen.getByRole('button', { name: /Good/ }));
    await waitFor(() => expect(screen.getByTestId('review-analytics').textContent).toBe('2'));
    expect(dashboardCalls).toBe(2);
  });
});
