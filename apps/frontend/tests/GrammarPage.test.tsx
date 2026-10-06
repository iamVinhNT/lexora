/**
 * @file GrammarPage.test.tsx
 * @description Verifies published course summaries, filtering, and due-review recovery.
 */
import { fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { GrammarPage } from '../src/pages/GrammarPage';

function response(data: unknown, status = 200) {
  return Promise.resolve(new Response(JSON.stringify({ success: true, data }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  }));
}

function courseData() {
  return {
    isComplete: false,
    stages: [{
      id: 'stage-0',
      level: '0',
      title: 'Foundation',
      lessons: [{
        id: 'grammar-v2-0-word-roles-01',
        revisionId: 'rev-0-1',
        revision: '1.0.0',
        title: 'Word roles',
        objective: 'Identify parts of speech',
        coverage: ['word-roles'],
        progress: null,
        firstAttemptAccuracy: { correct: 4, total: 6, percent: 67 },
      }],
    }],
    nextLessonId: 'grammar-v2-0-word-roles-01',
    coverage: ['word-roles'],
  };
}

function renderPage() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  const request = globalThis.fetch;
  vi.stubGlobal('fetch', vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    const result = await request(input, init);
    if (!result.ok) return result;
    if (url.includes('/api/grammar-practice/due')) {
      const body = await result.clone().json() as { data?: { items?: unknown } };
      return Array.isArray(body.data?.items) ? result : response({ items: [] });
    }
    if (url.includes('/api/grammar-practice/history')) {
      const body = await result.clone().json() as { data?: { items?: unknown } };
      return Array.isArray(body.data?.items) ? result : response({ items: [] });
    }
    return result;
  }));
  return render(<QueryClientProvider client={queryClient}><MemoryRouter><GrammarPage /></MemoryRouter></QueryClientProvider>);
}

describe('GrammarPage', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('explains when no published lessons are available', async () => {
    vi.stubGlobal('fetch', vi.fn(() => response({
      isComplete: false, stages: [], nextLessonId: null, coverage: [],
    })));
    renderPage();

    expect(await screen.findByRole('heading', { name: 'No published grammar lessons yet' })).toBeTruthy();
    expect(screen.getByText(/reviewed and approved for publication/i)).toBeTruthy();
    expect(screen.queryByRole('link', { name: /continue course/i })).toBeNull();
  });

  it('lets the learner retry a failed course request', async () => {
    const fetchMock = vi.fn()
      .mockRejectedValueOnce(new Error('offline'))
      .mockImplementation(() => response({ isComplete: false, stages: [], nextLessonId: null, coverage: [] }));
    vi.stubGlobal('fetch', fetchMock);
    renderPage();

    fireEvent.click(await screen.findByRole('button', { name: 'Retry' }));
    expect(await screen.findByRole('heading', { name: 'No published grammar lessons yet' })).toBeTruthy();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('aggregates accuracy only from lesson summaries and filters on required coverage', async () => {
    vi.stubGlobal('fetch', vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith('/due')) return response({ items: [] });
      if (url.endsWith('/history')) return response({ items: [] });
      return response({
        ...courseData(),
        legacyProgress: { completedLessons: 34, totalLessons: 34, attemptsPreserved: true },
      });
    }));
    renderPage();

    expect(await screen.findByText(/Accuracy: 67% \(4\/6\)/)).toBeTruthy();
    await screen.findByText('Word roles');
    fireEvent.change(screen.getByPlaceholderText('Search topics or lessons…'), {
      target: { value: 'unmatched topic' },
    });
    expect(await screen.findByText('No matching lessons found')).toBeTruthy();
    expect(screen.queryByText('Word roles')).toBeNull();
  });

  it('shows due-queue errors with retry instead of an empty state', async () => {
    let dueRequests = 0;
    vi.stubGlobal('fetch', vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith('/due')) {
        dueRequests += 1;
        return dueRequests === 1 ? response({ message: 'offline' }, 503) : response({ items: [] });
      }
      if (url.endsWith('/history')) return response({ items: [] });
      return response(courseData());
    }));
    renderPage();

    expect(await screen.findByText('Could not load review items. Retry to try again.')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(await screen.findByText('You can continue the grammar course.')).toBeTruthy();
    expect(dueRequests).toBe(2);
  });
});
