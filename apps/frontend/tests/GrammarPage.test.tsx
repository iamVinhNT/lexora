/**
 * @file GrammarPage.test.tsx
 * @description Verifies the grammar course communicates publication state without invented lessons.
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

function renderPage() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(<QueryClientProvider client={queryClient}><MemoryRouter><GrammarPage /></MemoryRouter></QueryClientProvider>);
}

describe('GrammarPage', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('explains that no lessons are available when the published course is empty', async () => {
    vi.stubGlobal('fetch', vi.fn(() => response({ isComplete: false, stages: [], nextLessonId: null })));
    renderPage();

    expect(await screen.findByRole('heading', { name: 'No published grammar lessons yet' })).toBeTruthy();
    expect(screen.getByText(/reviewed and approved for publication/i)).toBeTruthy();
    expect(screen.queryByRole('link', { name: /continue course/i })).toBeNull();
  });

  it('lets the learner retry a failed course request', async () => {
    const fetchMock = vi.fn()
      .mockRejectedValueOnce(new Error('offline'))
      .mockImplementationOnce(() => response({ isComplete: false, stages: [], nextLessonId: null }));
    vi.stubGlobal('fetch', fetchMock);
    renderPage();

    fireEvent.click(await screen.findByRole('button', { name: 'Retry' }));

    expect(await screen.findByRole('heading', { name: 'No published grammar lessons yet' })).toBeTruthy();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
