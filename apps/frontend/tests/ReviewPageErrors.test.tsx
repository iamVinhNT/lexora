/**
 * @file ReviewPageErrors.test.tsx
 * @description Verifies error handling, retry workflows, sentence draft preservation, and duplicate submission guards in adaptive review.
 */
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  cleanupTestQueryClients,
  errorJson,
  json,
  mockAttempt,
  queue,
  renderPage,
} from './review-test-helpers';

describe('ReviewPage - Errors and Submission Guards', () => {
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

  it('shows loading, then a retryable error, and retries the queue request', async () => {
    const fetchMock = vi.mocked(fetch);
    const { promise, resolve: resolveInitial } = Promise.withResolvers<Response>();
    fetchMock.mockReset();
    let failed = false;
    fetchMock.mockImplementation((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/api/reviews/due')) {
        if (!failed) { failed = true; return promise; }
        return json(queue());
      }
      return json(null);
    });
    renderPage();
    expect(screen.getByText('Loading review queue…')).toBeTruthy();

    resolveInitial?.(await errorJson('Queue unavailable'));
    await waitFor(() => expect(screen.getByRole('alert').textContent).toContain('Something went wrong. Please try again.'));
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(await screen.findByRole('button', { name: /Start review/ })).toBeTruthy();
  });

  it('shows error and retry when active attempt query fails', async () => {
    vi.mocked(fetch).mockImplementation((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/api/reviews/attempt')) return errorJson('Attempt fetch failed', 500);
      return json(queue());
    });

    renderPage();
    expect(await screen.findByRole('alert')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Retry' })).toBeTruthy();
  });

  it('preserves sentence draft when AI grading fails and allows retry or self-check', async () => {
    const fetchMock = vi.mocked(fetch);
    let attemptCount = 0;
    fetchMock.mockImplementation((input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      const method = init?.method || 'GET';

      if (url.includes('/api/ai/settings')) {
        return json({ isConfigured: true, revision: 'rev-1', baseURL: '', models: ['gpt-4o'], activeModel: 'gpt-4o', hasApiKey: true, source: 'saved', updatedAt: null });
      }
      if (url.includes('/api/reviews/due')) return json(queue());
      if (url.includes('/api/reviews/attempt') && method === 'GET') {
        return json(mockAttempt({ stage: 'OUTPUT', version: 2 }));
      }
      if (url.includes('/step') && method === 'POST') {
        attemptCount += 1;
        if (attemptCount === 1) {
          return errorJson('AI grading failed', 503);
        }
        return json(mockAttempt({ stage: 'ASSESS', version: 3 }));
      }
      return json(null);
    });

    renderPage();
    await screen.findByRole('heading', { name: 'Practice sentence' });

    const textarea = screen.getByLabelText('Your sentence') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'A reliable method is essential.' } });

    fireEvent.click(await screen.findByRole('button', { name: 'Grade with AI' }));

    const alert = await screen.findByRole('alert');
    expect(document.activeElement).toBe(alert);
    expect(textarea.value).toBe('A reliable method is essential.');

    // Switch to self check
    fireEvent.click(screen.getByLabelText('Uses correct meaning in context'));
    fireEvent.click(screen.getByLabelText('Forms a complete sentence'));
    fireEvent.click(screen.getByRole('button', { name: 'Self-check' }));
  });

  it('prevents duplicate requests while submission is pending', async () => {
    const fetchMock = vi.mocked(fetch);
    const { promise: stepPromise, resolve: resolveStep } = Promise.withResolvers<Response>();
    fetchMock.mockImplementation((input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      const method = init?.method || 'GET';

      if (url.includes('/api/reviews/due')) return json(queue());
      if (url.includes('/api/reviews/attempt') && method === 'GET') {
        return json(mockAttempt({ stage: 'RECALL', version: 1 }));
      }
      if (url.includes('/step') && method === 'POST') {
        return stepPromise;
      }
      return json(null);
    });

    renderPage();
    await screen.findByRole('heading', { name: 'Recall the word' });
    const answerInput = screen.getByLabelText('Your answer');
    fireEvent.change(answerInput, { target: { value: 'reliable' } });

    const checkButton = screen.getByRole('button', { name: 'Check' });
    fireEvent.click(checkButton);
    fireEvent.click(checkButton);

    await waitFor(() => {
      const postCalls = fetchMock.mock.calls.filter(([, init]) => init?.method === 'POST');
      expect(postCalls).toHaveLength(1);
    });
    await waitFor(() => expect(checkButton).toHaveProperty('disabled', true));
    resolveStep?.(await json(mockAttempt({
      stage: 'FEEDBACK', version: 2,
      recall: { answer: 'reliable', result: 'EXACT', score: 100, responseTime: null },
    })));
    await screen.findByRole('heading', { name: 'reliable' });
    expect(checkButton.isConnected).toBe(false);
  });
});
