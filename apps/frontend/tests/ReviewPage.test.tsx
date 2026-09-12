/**
 * @file ReviewPage.test.tsx
 * @description Verifies the review queue workflow at the fetch boundary.
 */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ReviewPage } from '../src/pages/ReviewPage';
import { useDashboardStatistics } from '../src/hooks/useAnalytics';

const wordId = '11111111-1111-4111-8111-111111111111';
const secondWordId = '22222222-2222-4222-8222-222222222222';

function reviewItem(id = wordId, word = 'reliable') {
  return {
    id: `review-${id}`,
    wordId: id,
    word: {
      id,
      word,
      phonetic: '/rɪˈlaɪəbl/',
      partOfSpeech: 'adjective',
      definition: 'able to be trusted or depended on',
      translation: 'đáng tin cậy',
    },
    reviewState: {
      id: `state-${id}`,
      wordId: id,
      interval: 0,
      easeFactor: 2.5,
      repetitions: 0,
      lapses: 0,
      dueAt: '2026-09-07T09:00:00.000Z',
      lastReviewedAt: null,
    },
    learningProgress: { status: 'NEW' },
    examples: [{ id: `example-${id}`, wordId: id, sentence: `The ${word} system works.` }],
    contexts: [{ id: `context-${id}`, title: 'Work notes', content: `A ${word} system earns trust.` }],
    contextSentence: `A ${word} system earns trust.`,
    exercisePrompts: {
      RECOGNITION: { type: 'RECOGNITION', prompt: word, question: 'What is the definition?', answer: 'able to be trusted or depended on' },
      RECALL: { type: 'RECALL', prompt: 'đáng tin cậy', question: 'What word matches this meaning?', answer: word, phonetic: '/rɪˈlaɪəbl/' },
      CLOZE: { type: 'CLOZE', prompt: `A ______ system earns trust.`, question: 'Fill in the missing word.', answer: word },
      PRODUCTION: { type: 'PRODUCTION', prompt: `Create a sentence with "${word}".`, question: 'Write a sentence.', targetWord: word, definition: 'able to be trusted or depended on' },
      CONTEXTUAL: { type: 'CONTEXTUAL', prompt: `A ${word} system earns trust.`, instructions: 'Identify or apply the vocabulary in this context', targetWord: word, definition: 'able to be trusted or depended on' },
    },
    intervalPreviews: { AGAIN: '1d', HARD: '1d', GOOD: '1d', EASY: '4d' },
  };
}

function queue(items = [reviewItem()]) {
  return {
    items,
    counts: { new: items.length, learning: 0, familiar: 0, mastered: 0, maintenance: 0, total: items.length },
    countsByState: { new: items.length, learning: 0, familiar: 0, mastered: 0, maintenance: 0, total: items.length },
    total: items.length,
  };
}

function json(data: unknown, status = 200) {
  return Promise.resolve(new Response(JSON.stringify({ success: true, data }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  }));
}

function errorJson(message: string, status = 500) {
  return Promise.resolve(new Response(JSON.stringify({ success: false, error: { code: 'FAILED', message } }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  }));
}

function renderPage() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <ReviewPage />
      </QueryClientProvider>
    </MemoryRouter>,
  );
}

function ReviewMutationConsumer() {
  const dashboard = useDashboardStatistics();
  return <output data-testid="review-analytics">{dashboard.data?.todayReviews ?? ''}</output>;
}

describe('ReviewPage', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(json(queue())));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('shows loading, then a retryable error, and retries the queue request', async () => {
    const fetchMock = vi.mocked(fetch);
    let resolveInitial: ((response: Response) => void) | undefined;
    fetchMock.mockReset();
    fetchMock.mockImplementationOnce(() => new Promise((resolve) => { resolveInitial = resolve; }));
    renderPage();
    expect(screen.getByText('Loading review queue…')).toBeTruthy();

    resolveInitial?.(await errorJson('Queue unavailable'));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByRole('alert').textContent).toContain('Something went wrong. Please try again.'));
    fetchMock.mockResolvedValueOnce(json(queue()));
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(await screen.findByRole('heading', { name: 'Review' })).toBeTruthy();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('renders truthful completion when no reviews are due', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(json(queue([])));
    renderPage();

    expect(await screen.findByRole('heading', { name: 'Review complete' })).toBeTruthy();
    expect(screen.getByText('No reviews are due right now.')).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Return to overview' }).getAttribute('href')).toBe('/');
    expect(screen.getByRole('link', { name: 'Learn new words' }).getAttribute('href')).toBe('/learn');
  });

  it('requires reveal, submits actual grade payload, and progresses with backend interval data', async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock
      .mockResolvedValueOnce(json(queue()))
      .mockResolvedValueOnce(json({
        reviewState: { interval: 6, repetitions: 2, easeFactor: 2.5, lapses: 0 },
        reviewLog: { wordId, rating: 'GOOD', reviewType: 'RECALL' },
        learningProgress: { wordId, status: 'FAMILIAR' },
      }))
      .mockResolvedValueOnce(json(queue([reviewItem(secondWordId, 'precise')])));
    renderPage();

    await screen.findByRole('heading', { name: 'Recall the word' });
    expect(screen.queryByText('reliable')).toBeNull();
    expect(String(fetchMock.mock.calls[0]?.[0])).toContain('limit=50');
    const goodButton = screen.getByRole('button', { name: /Good/ });
    expect(goodButton).toHaveProperty('disabled', true);
    fireEvent.click(goodButton);
    expect(fetchMock.mock.calls.filter(([, init]) => init?.method === 'POST')).toHaveLength(0);

    fireEvent.click(screen.getByRole('button', { name: /Reveal answer/ }));
    expect(screen.getByText('reliable', { selector: '[data-review-answer="true"]' })).toBeTruthy();
    expect(goodButton).toHaveProperty('disabled', false);
    fireEvent.click(goodButton);

    await waitFor(() => expect(fetchMock.mock.calls.filter(([, init]) => init?.method === 'POST')).toHaveLength(1));
    const post = fetchMock.mock.calls.find(([, init]) => init?.method === 'POST')?.[1];
    expect(JSON.parse(String(post?.body))).toEqual({ wordId, reviewType: 'RECALL', rating: 'GOOD' });
    expect(screen.queryByText('precise')).toBeNull();
    expect(screen.getByRole('status').textContent).toContain('Next review in 6 days');
  });

  it('prevents duplicate rating requests while submission is pending', async () => {
    const fetchMock = vi.mocked(fetch);
    let resolveReview: ((response: Response) => void) | undefined;
    fetchMock
      .mockResolvedValueOnce(json(queue()))
      .mockImplementationOnce(() => new Promise((resolve) => { resolveReview = resolve; }));
    renderPage();
    await screen.findByRole('heading', { name: 'Recall the word' });
    fireEvent.click(screen.getByRole('button', { name: /Reveal answer/ }));
    const easyButton = screen.getByRole('button', { name: /Easy/ });
    fireEvent.click(easyButton);
    fireEvent.click(easyButton);
    await waitFor(() => expect(fetchMock.mock.calls.filter(([, init]) => init?.method === 'POST')).toHaveLength(1));
    expect(easyButton).toHaveProperty('disabled', true);
    resolveReview?.(json({ reviewState: { interval: 4 }, reviewLog: { rating: 'EASY' }, learningProgress: {} }));
  });

  it('supports reveal keyboard activation and ignores rating shortcuts from text inputs', async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock
      .mockResolvedValueOnce(json(queue()))
      .mockResolvedValueOnce(json({ reviewState: { interval: 1 }, reviewLog: { rating: 'GOOD' }, learningProgress: {} }));
    renderPage();
    await screen.findByRole('heading', { name: 'Recall the word' });
    const revealButton = screen.getByRole('button', { name: /Reveal answer/ });
    fireEvent.keyDown(revealButton, { key: ' ' });
    expect(screen.getByText('reliable', { selector: '[data-review-answer="true"]' })).toBeTruthy();

    const input = document.createElement('input');
    document.body.append(input);
    fireEvent.keyDown(input, { key: '3' });
    expect(fetchMock.mock.calls.filter(([, init]) => init?.method === 'POST')).toHaveLength(0);
    fireEvent.keyDown(document.body, { key: '3' });
    await waitFor(() => expect(fetchMock.mock.calls.filter(([, init]) => init?.method === 'POST')).toHaveLength(1));
  });

  it('refetches active analytics after review submission', async () => {
    const fetchMock = vi.mocked(fetch);
    let dashboardCalls = 0;
    fetchMock.mockImplementation((input, init) => {
      const url = String(input);
      if (url.includes('/api/statistics/dashboard')) {
        dashboardCalls += 1;
        return json({ todayReviews: dashboardCalls });
      }
      if (init?.method === 'POST') return json({ reviewState: { interval: 1 }, reviewLog: {}, learningProgress: {} });
      return json(queue());
    });

    render(
      <MemoryRouter>
        <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
          <ReviewPage />
          <ReviewMutationConsumer />
        </QueryClientProvider>
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByTestId('review-analytics').textContent).toBe('1'));
    fireEvent.click(screen.getByRole('button', { name: /Reveal answer/ }));
    fireEvent.click(screen.getByRole('button', { name: /Good/ }));
    await waitFor(() => expect(screen.getByTestId('review-analytics').textContent).toBe('2'));
    expect(dashboardCalls).toBe(2);
  });
});
