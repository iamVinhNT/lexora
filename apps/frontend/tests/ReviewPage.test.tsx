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

function reviewItem(id = wordId, word = 'reliable', translation = 'đáng tin cậy') {
  return {
    id: `review-${id}`,
    wordId: id,
    word: {
      id,
      word,
      phonetic: '/rɪˈlaɪəbl/',
      partOfSpeech: 'adjective',
      definition: 'able to be trusted or depended on',
      translation,
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
      RECALL: { type: 'RECALL', prompt: translation, question: 'What word matches this meaning?', answer: word, phonetic: '/rɪˈlaɪəbl/' },
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

function renderPage(initialEntry = '/') {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
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

  it('advances the cached queue after rating without another due-queue request', async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock
      .mockResolvedValueOnce(json(queue([
        reviewItem(),
        reviewItem(secondWordId, 'precise', 'chính xác'),
      ])))
      .mockResolvedValueOnce(json({
        reviewState: { interval: 6, repetitions: 2, easeFactor: 2.5, lapses: 0 },
        reviewLog: { wordId, rating: 'GOOD', reviewType: 'RECALL' },
        learningProgress: { wordId, status: 'FAMILIAR' },
      }));
    renderPage();

    await screen.findByRole('heading', { name: 'Recall the word' });
    expect(screen.getAllByText('2 due today')).toHaveLength(2);
    expect(String(fetchMock.mock.calls[0]?.[0])).toContain('limit=50');
    const goodButton = screen.getByRole('button', { name: /Good/ });
    expect(goodButton).toHaveProperty('disabled', true);
    fireEvent.click(goodButton);
    expect(fetchMock.mock.calls.filter(([, init]) => init?.method === 'POST')).toHaveLength(0);

    fireEvent.click(screen.getByRole('button', { name: /Reveal answer/ }));
    expect(screen.getByText('reliable', { selector: '[data-review-answer="true"]' })).toBeTruthy();
    expect(goodButton).toHaveProperty('disabled', false);
    fireEvent.click(goodButton);

    await screen.findByText('chính xác');
    const post = fetchMock.mock.calls.find(([, init]) => init?.method === 'POST')?.[1];
    expect(JSON.parse(String(post?.body))).toEqual({ wordId, reviewType: 'RECALL', rating: 'GOOD' });
    expect(fetchMock.mock.calls.filter(([input, init]) => String(input).includes('/api/reviews/due') && init?.method !== 'POST')).toHaveLength(1);
    expect(screen.getAllByText('1 due today')).toHaveLength(2);
    expect(screen.getByRole('status').textContent).toContain('Next review in 6 days');
  });

  it('starts the next cached review unrevealed', async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(json(queue([
        reviewItem(),
        reviewItem(secondWordId, 'precise', 'chính xác'),
      ])))
      .mockResolvedValueOnce(json({ reviewState: { interval: 1 }, reviewLog: { rating: 'GOOD' }, learningProgress: {} }));
    renderPage();

    await screen.findByRole('heading', { name: 'Recall the word' });
    fireEvent.click(screen.getByRole('button', { name: /Reveal answer/ }));
    fireEvent.click(screen.getByRole('button', { name: /Good/ }));

    await screen.findByText('chính xác');
    expect(screen.queryByText('precise', { selector: '[data-review-answer="true"]' })).toBeNull();
    expect(screen.getByRole('button', { name: /Reveal answer/ })).toBeTruthy();
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

  it('supports click reveal and ignores rating shortcuts from text inputs', async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock
      .mockResolvedValueOnce(json(queue()))
      .mockResolvedValueOnce(json({ reviewState: { interval: 1 }, reviewLog: { rating: 'GOOD' }, learningProgress: {} }));
    renderPage();
    await screen.findByRole('heading', { name: 'Recall the word' });
    fireEvent.click(screen.getByRole('button', { name: /Reveal answer/ }));
    expect(screen.getByText('reliable', { selector: '[data-review-answer="true"]' })).toBeTruthy();

    const input = document.createElement('input');
    document.body.append(input);
    fireEvent.keyDown(input, { key: '3' });
    expect(fetchMock.mock.calls.filter(([, init]) => init?.method === 'POST')).toHaveLength(0);
    fireEvent.keyDown(document.body, { key: '3' });
    await waitFor(() => expect(fetchMock.mock.calls.filter(([, init]) => init?.method === 'POST')).toHaveLength(1));
  });
  it('links rating to task and reflects refetched server quota', async () => {
    const fetchMock = vi.mocked(fetch);
    let taskFetches = 0;
    fetchMock.mockImplementation((input, init) => {
      const url = String(input);
      if (url.includes('/api/study-tasks/task-1')) {
        taskFetches += 1;
        return json({
          id: 'task-1',
          kind: 'REVIEW_WORDS',
          targetCount: 1,
          completedCount: taskFetches > 1 ? 1 : 0,
          isComplete: taskFetches > 1,
          isLate: false,
        });
      }
      if (init?.method === 'POST') return json({ reviewState: { interval: 1 }, reviewLog: {}, learningProgress: {} });
      return json(queue());
    });

    renderPage('/review?taskId=task-1');
    await screen.findByText(/0 \/ 1/);
    fireEvent.click(screen.getByRole('button', { name: /Reveal answer/ }));
    fireEvent.click(screen.getByRole('button', { name: /Good/ }));

    await waitFor(() => expect(screen.getByText(/1 \/ 1/)).toBeTruthy());
    const post = fetchMock.mock.calls.find(([, init]) => init?.method === 'POST')?.[1];
    expect(JSON.parse(String(post?.body))).toMatchObject({ wordId, reviewType: 'RECALL', rating: 'GOOD', studyTaskId: 'task-1' });
    expect(taskFetches).toBeGreaterThan(1);
  });

  it('does not call empty linked queue complete before task reaches quota', async () => {
    vi.mocked(fetch).mockImplementation((input) => {
      const url = String(input);
      if (url.includes('/api/study-tasks/task-1')) {
        return json({ id: 'task-1', kind: 'REVIEW_WORDS', targetCount: 2, completedCount: 0, isComplete: false, isLate: false });
      }
      return json(queue([]));
    });

    renderPage('/review?taskId=task-1');

    expect(await screen.findByText(/0 \/ 2/)).toBeTruthy();
    expect(screen.queryByRole('heading', { name: 'Review complete' })).toBeNull();
    expect(screen.getByRole('heading', { name: 'Partially completed' })).toBeTruthy();
  });

  it('keeps linked quota unchanged when rating fails', async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockImplementation((input, init) => {
      const url = String(input);
      if (url.includes('/api/study-tasks/task-1')) {
        return json({ id: 'task-1', kind: 'REVIEW_WORDS', targetCount: 2, completedCount: 0, isComplete: false, isLate: false });
      }
      if (init?.method === 'POST') return errorJson('Review unavailable');
      return json(queue());
    });

    renderPage('/review?taskId=task-1');
    await screen.findByText(/0 \/ 2/);
    fireEvent.click(screen.getByRole('button', { name: /Reveal answer/ }));
    fireEvent.click(screen.getByRole('button', { name: /Good/ }));

    await screen.findByRole('alert');
    expect(screen.getByText('0 / 2 words')).toBeTruthy();
    expect(screen.getByText('reliable', { selector: '[data-review-answer="true"]' })).toBeTruthy();
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
