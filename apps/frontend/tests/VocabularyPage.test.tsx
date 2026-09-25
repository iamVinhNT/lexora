/**
 * @file VocabularyPage.test.tsx
 * @description Verifies vocabulary list, filters, CRUD dialogs, and API-backed state.
 */
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { VocabularyPage } from '../src/pages/VocabularyPage';
import { useDashboardStatistics } from '../src/hooks/useAnalytics';
import { useCreateWord, useDeleteWord, useUpdateWord } from '../src/hooks/useVocabulary';

const word = {
  id: 'word-1',
  word: 'reliable',
  phonetic: '/rɪˈlaɪəbl/',
  partOfSpeech: 'adjective',
  definition: 'Able to be trusted.',
  translation: 'đáng tin cậy',
  difficulty: 'B2',
  tags: [
    { id: 'tag-work', name: 'work', createdAt: '2026-09-08T00:00:00.000Z' },
    { id: 'tag-priority', name: 'priority', createdAt: '2026-09-08T00:00:00.000Z' },
  ],
  collocations: [{ id: 'col-1', phrase: 'reliable source' }],
  examples: [{ id: 'example-1', sentence: 'A reliable system scales.', translation: null, source: null }],
  contexts: [],
  wordFamilies: [],
  learningProgress: { status: 'LEARNING', recognitionScore: 70, recallScore: 50, productionScore: 30 },
  reviewState: { interval: 1, easeFactor: 2.5, repetitions: 1, lapses: 0, dueAt: '2026-09-08T00:00:00.000Z', lastReviewedAt: null },
};

function response(data: unknown, status = 200) {
  return Promise.resolve({ ok: status >= 200 && status < 300, status, json: async () => status >= 400 ? { success: false, error: data } : { success: true, data } });
}

function mockDesktopViewport(matches = true) {
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  const mediaQuery = {
    matches,
    media: '(min-width: 1024px)',
    onchange: null,
    addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => listeners.add(listener),
    removeEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => listeners.delete(listener),
    addListener: (listener: (event: MediaQueryListEvent) => void) => listeners.add(listener),
    removeListener: (listener: (event: MediaQueryListEvent) => void) => listeners.delete(listener),
    dispatchEvent: () => true,
  } as unknown as MediaQueryList;
  vi.stubGlobal('matchMedia', vi.fn(() => mediaQuery));
}

function renderPage() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <VocabularyPage />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

function VocabularyMutationConsumer() {
  const dashboard = useDashboardStatistics();
  const create = useCreateWord();
  const update = useUpdateWord();
  const remove = useDeleteWord();
  return <>
    <output data-testid="vocabulary-analytics">{dashboard.data?.todayReviews ?? ''}</output>
    <button type="button" onClick={() => void create.mutateAsync({ word: 'scalable', definition: 'able to grow' })}>create mutation</button>
    <button type="button" onClick={() => void update.mutateAsync({ id: 'word-1', payload: { definition: 'updated' } })}>update mutation</button>
    <button type="button" onClick={() => void remove.mutateAsync('word-1')}>delete mutation</button>
  </>;
}

describe('VocabularyPage', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (init?.method === 'POST') return response(word, 201);
      if (init?.method === 'DELETE') return response({ id: 'word-1', deleted: true });
      if (url.endsWith('/word-1')) return response(word);
      return response({ total: 1, page: 1, limit: 20, items: [word] });
    }));
  });

  afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });

  it('auto-selects first result and updates inline details from keyboard selection', async () => {
    mockDesktopViewport();
    const secondWord = { ...word, id: 'word-2', word: 'resilient', definition: 'Able to recover.' };
    vi.mocked(fetch).mockImplementation((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith('/word-1')) return response(word);
      if (url.endsWith('/word-2')) return response(secondWord);
      return response({ total: 2, page: 1, limit: 20, items: [word, secondWord] });
    });

    renderPage();
    const page = screen.getByTestId('vocabulary-page');
    expect(page.className).not.toContain('lg:-mt-4');
    expect(page.className).toContain('lg:h-[calc(100dvh-6rem)]');
    expect(page.className).toContain('lg:gap-1');
    expect(screen.getByRole('region', { name: /vocabulary filters/i }).className).toContain('lg:p-0');
    const results = await screen.findByRole('listbox', { name: /vocabulary/i });
    const firstRow = await within(results).findByRole('option', { name: /reliable/i });
    expect(firstRow.getAttribute('aria-selected')).toBe('true');
    expect(within(screen.getByRole('region', { name: /word details/i })).getByRole('heading', { name: 'reliable' })).toBeTruthy();

    fireEvent.keyDown(firstRow, { key: 'ArrowDown' });

    const detail = screen.getByRole('region', { name: /word details/i });
    expect(within(detail).getByRole('heading', { name: 'resilient' })).toBeTruthy();
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('closes desktop delete confirmation back to inline detail on cancel', async () => {
    mockDesktopViewport();
    renderPage();
    await screen.findByRole('option', { name: /reliable/i });

    const detail = screen.getByRole('region', { name: /word details/i });
    fireEvent.click(within(detail).getByRole('button', { name: /delete word reliable/i }));
    const confirmation = await screen.findByRole('dialog', { name: /delete word/i });

    fireEvent.click(within(confirmation).getByRole('button', { name: /^cancel$/i }));

    expect(screen.queryByRole('dialog')).toBeNull();
    expect(within(screen.getByRole('region', { name: /word details/i })).getByRole('heading', { name: 'reliable' })).toBeTruthy();
  });

  it('returns mobile delete confirmation to the detail dialog on cancel', async () => {
    mockDesktopViewport(false);
    renderPage();
    await screen.findByText('reliable');

    fireEvent.click(screen.getByRole('button', { name: /details for reliable/i }));
    const detailDialog = await screen.findByRole('dialog', { name: /reliable/i });
    fireEvent.click(within(detailDialog).getByRole('button', { name: /delete word reliable/i }));
    const confirmation = await screen.findByRole('dialog', { name: /delete word/i });

    fireEvent.click(within(confirmation).getByRole('button', { name: /^cancel$/i }));

    expect(await screen.findByRole('dialog', { name: /reliable/i })).toBeTruthy();
  });

  it('does not request a detail endpoint when desktop opens direct delete confirmation', async () => {
    mockDesktopViewport();
    vi.mocked(fetch).mockImplementation((input: RequestInfo | URL) => response({ total: 1, page: 1, limit: 20, items: [word] }));

    renderPage();
    await screen.findByRole('option', { name: /reliable/i });
    fireEvent.click(within(screen.getByRole('region', { name: /word details/i })).getByRole('button', { name: /delete word reliable/i }));
    await screen.findByRole('dialog', { name: /delete word/i });

    expect(vi.mocked(fetch).mock.calls.some(([input]) => String(input).includes('/api/words/word-1'))).toBe(false);
  });

  it('does not restore a deleted desktop word from the stale list cache', async () => {
    mockDesktopViewport();
    vi.mocked(fetch).mockImplementation((input: RequestInfo | URL, init?: RequestInit) => {
      if (init?.method === 'DELETE') return response({ id: 'word-1', deleted: true });
      if (String(input).includes('/api/words')) {
        return response({ total: 1, page: 1, limit: 20, items: [word] });
      }
      return response(word);
    });

    renderPage();
    await screen.findByRole('option', { name: /reliable/i });
    fireEvent.click(within(screen.getByRole('region', { name: /word details/i })).getByRole('button', { name: /delete word reliable/i }));
    fireEvent.click(within(screen.getByRole('dialog', { name: /delete word/i })).getByRole('button', { name: /confirm delete/i }));

    await waitFor(() => expect(screen.queryByRole('dialog', { name: /delete word/i })).toBeNull());
    expect(within(screen.getByRole('region', { name: /word details/i })).queryByRole('heading', { name: 'reliable' })).toBeNull();
  });

  it('emphasizes Production in word details while preserving edit actions', async () => {
    renderPage();
    await screen.findByText('reliable');

    fireEvent.click(screen.getByRole('button', { name: /details for reliable/i }));
    const dialog = await screen.findByRole('dialog', { name: /reliable/i });
    const production = within(dialog).getByText('30%');

    expect(production.parentElement?.className).toContain('border-accent');
    expect(within(dialog).getByRole('button', { name: /edit word/i })).toBeTruthy();
  });

  it('renders the initial list view inside a local results viewport', async () => {
    renderPage();

    const results = screen.getByTestId('vocabulary-results');
    expect(results.className).toContain('min-h-0');
    expect(results.className).toContain('overflow-y-auto');
    expect(await within(results).findByRole('article', { name: /reliable/i })).toBeTruthy();
    expect(within(results).getByRole('button', { name: /details for reliable/i })).toBeTruthy();
  });

  it('switches between accessible list, card, and table modes', async () => {
    renderPage();
    await screen.findByText('reliable');

    const modeSelector = screen.getByRole('group', { name: /vocabulary view/i });
    const listMode = within(modeSelector).getByRole('button', { name: /list view/i });
    const cardMode = within(modeSelector).getByRole('button', { name: /card view/i });
    const tableMode = within(modeSelector).getByRole('button', { name: /table view/i });
    expect(listMode.getAttribute('aria-pressed')).toBe('true');

    fireEvent.click(cardMode);
    expect(cardMode.getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByRole('region', { name: /card view/i })).toBeTruthy();
    expect(screen.getByRole('article', { name: /reliable/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /details for reliable/i })).toBeTruthy();

    fireEvent.click(tableMode);
    expect(tableMode.getAttribute('aria-pressed')).toBe('true');
    const table = screen.getByRole('table', { name: /vocabulary table/i });
    expect(table).toBeTruthy();
    expect(screen.getByRole('columnheader', { name: /word/i })).toBeTruthy();
    expect(screen.getByRole('row', { name: /reliable/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /details for reliable/i })).toBeTruthy();

    fireEvent.click(listMode);
    expect(listMode.getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByRole('article', { name: /reliable/i })).toBeTruthy();
  });

  it('debounces text filters without lagging their controlled inputs', async () => {
    vi.useFakeTimers();
    renderPage();
    await act(() => vi.advanceTimersByTimeAsync(0));
    const search = screen.getByRole('textbox', { name: /search vocabulary/i }) as HTMLInputElement;
    const tag = screen.getByRole('textbox', { name: /tag filter/i }) as HTMLInputElement;
    const initialCalls = vi.mocked(fetch).mock.calls.length;

    fireEvent.change(search, { target: { value: 's' } });
    fireEvent.change(search, { target: { value: 'system' } });
    fireEvent.change(tag, { target: { value: 'w' } });
    fireEvent.change(tag, { target: { value: 'work' } });

    expect(search.value).toBe('system');
    expect(tag.value).toBe('work');
    expect(vi.mocked(fetch).mock.calls).toHaveLength(initialCalls);
    await act(() => vi.advanceTimersByTimeAsync(300));
    expect(vi.mocked(fetch).mock.calls.filter(([input]) => String(input).includes('search=system') && String(input).includes('tag=work'))).toHaveLength(1);
  });

  it('shows loading, renders word rows, and applies categorical filters', async () => {
    renderPage();

    expect(screen.getByText('Loading vocabulary…')).toBeTruthy();
    expect(await screen.findByText('reliable')).toBeTruthy();
    expect(screen.getByText('work')).toBeTruthy();
    expect(screen.getByText('priority')).toBeTruthy();

    fireEvent.pointerDown(screen.getByRole('combobox', { name: /cefr difficulty/i }), { button: 0, ctrlKey: false, pointerType: 'mouse' });
    fireEvent.click(screen.getByRole('option', { name: 'B2' }));
    fireEvent.pointerDown(screen.getByRole('combobox', { name: /vocabulary status/i }), { button: 0, ctrlKey: false, pointerType: 'mouse' });
    fireEvent.click(screen.getByRole('option', { name: 'Learning' }));

    await waitFor(() => {
      const calls = vi.mocked(fetch).mock.calls.map(([url]) => String(url));
      expect(calls.some((url) => url.includes('difficulty=B2') && url.includes('status=LEARNING'))).toBe(true);
    });
  });

  it('initializes edit tags as comma-separated tag names', async () => {
    renderPage();
    await screen.findByText('reliable');

    fireEvent.click(screen.getByRole('button', { name: /details for reliable/i }));
    fireEvent.click(screen.getByRole('button', { name: /edit word/i }));

    const tags = screen.getByLabelText('Tags') as HTMLTextAreaElement;
    expect(tags.value).toBe('work, priority');
  });

  it('shows API error with retry action', async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockImplementationOnce(() => response({ code: 'FAIL', message: 'Network unavailable' }, 500));
    renderPage();

    expect(await screen.findByText('Something went wrong. Please try again.')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /retry/i }));
    expect(await screen.findByText('reliable')).toBeTruthy();
  });

  it('validates create form and invalidates list after successful create', async () => {
    const createdWord = {
      ...word,
      id: 'word-2',
      word: 'scalable',
      definition: 'Able to grow.',
      tags: [
        { id: 'tag-work', name: 'work', createdAt: '2026-09-08T00:00:00.000Z' },
        { id: 'tag-growth', name: 'growth', createdAt: '2026-09-10T00:00:00.000Z' },
      ],
    };
    let listCalls = 0;
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockImplementation((input, init) => {
      const url = String(input);
      if (init?.method === 'POST') return response(createdWord, 201);
      if (url.includes('/api/words') && !init?.method) {
        listCalls += 1;
        return response({ total: listCalls > 1 ? 2 : 1, page: 1, limit: 20, items: listCalls > 1 ? [word, createdWord] : [word] });
      }
      return response(word);
    });

    renderPage();
    await screen.findByText('reliable');
    fireEvent.click(screen.getByRole('button', { name: /add word/i }));
    const dialog = screen.getByRole('dialog', { name: /add word/i });

    fireEvent.click(within(dialog).getByRole('button', { name: /save word/i }));
    expect(await within(dialog).findByText('Word is required')).toBeTruthy();
    expect(within(dialog).getByText('Definition is required')).toBeTruthy();

    fireEvent.change(within(dialog).getByRole('textbox', { name: /^word$/i }), { target: { value: 'scalable' } });
    fireEvent.change(within(dialog).getByRole('textbox', { name: /^definition$/i }), { target: { value: 'Able to grow.' } });
    fireEvent.change(within(dialog).getByRole('textbox', { name: /^tags$/i }), { target: { value: 'work, growth' } });
    fireEvent.pointerDown(within(dialog).getByRole('combobox', { name: /difficulty/i }), { button: 0, ctrlKey: false, pointerType: 'mouse' });
    fireEvent.click(screen.getByRole('option', { name: 'B2' }));
    await Promise.resolve();
    const saveButton = within(dialog).getByRole('button', { name: /save word/i });
    fireEvent.submit(saveButton.closest('form')!);

    await waitFor(() => expect(screen.queryByRole('dialog', { name: /add word/i })).toBeNull());
    expect(screen.queryByRole('dialog', { name: /add word/i })).toBeNull();
    expect(screen.getByText('scalable')).toBeTruthy();
    expect(screen.getByText('growth')).toBeTruthy();
    expect(listCalls).toBeGreaterThan(1);

    const postCall = fetchMock.mock.calls.find(([, init]) => init?.method === 'POST');
    expect(postCall).toBeTruthy();
    const postBody = JSON.parse(String(postCall?.[1]?.body)) as { tags: unknown };
    expect(postBody.tags).toEqual(['work', 'growth']);
    expect(postBody.difficulty).toBe('B2');
  });

  it('requires explicit confirmation before deleting a word', async () => {
    renderPage();
    await screen.findByText('reliable');
    fireEvent.click(screen.getByRole('button', { name: /details for reliable/i }));
    fireEvent.click(screen.getByRole('button', { name: /delete word reliable/i }));

    const confirmation = screen.getByRole('dialog', { name: /delete word/i });
    expect(within(confirmation).getByText(/reliable/i)).toBeTruthy();
    fireEvent.click(within(confirmation).getByRole('button', { name: /confirm delete/i }));
    await waitFor(() => expect(vi.mocked(fetch).mock.calls.some(([, init]) => init?.method === 'DELETE')).toBe(true));
  });

  it('places desktop vocabulary count below results', async () => {
    mockDesktopViewport();
    renderPage();
    await screen.findByRole('option', { name: /reliable/i });
    const results = screen.getByTestId('vocabulary-results');
    const count = screen.getByText('1 word');
    expect(results.compareDocumentPosition(count) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('places mobile vocabulary count below results', async () => {
    mockDesktopViewport(false);
    renderPage();
    await screen.findByRole('article', { name: /reliable/i });
    const results = screen.getByTestId('vocabulary-results');
    const count = screen.getByText('1 word');
    expect(results.compareDocumentPosition(count) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('refetches active analytics after each vocabulary mutation', async () => {
    const fetchMock = vi.mocked(fetch);
    let dashboardCalls = 0;
    fetchMock.mockImplementation((input, init) => {
      const url = String(input);
      if (url.includes('/api/statistics/dashboard')) {
        dashboardCalls += 1;
        return response({ todayReviews: dashboardCalls });
      }
      if (init?.method === 'POST') return response(word, 201);
      if (init?.method === 'PATCH') return response(word);
      if (init?.method === 'DELETE') return response({ id: 'word-1', deleted: true });
      return response({ total: 1, page: 1, limit: 20, items: [word] });
    });

    render(
      <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
        <VocabularyMutationConsumer />
      </QueryClientProvider>,
    );

    await waitFor(() => expect(screen.getByTestId('vocabulary-analytics').textContent).toBe('1'));
    fireEvent.click(screen.getByRole('button', { name: 'create mutation' }));
    await waitFor(() => expect(screen.getByTestId('vocabulary-analytics').textContent).toBe('2'));
    fireEvent.click(screen.getByRole('button', { name: 'update mutation' }));
    await waitFor(() => expect(screen.getByTestId('vocabulary-analytics').textContent).toBe('3'));
    fireEvent.click(screen.getByRole('button', { name: 'delete mutation' }));
    await waitFor(() => expect(screen.getByTestId('vocabulary-analytics').textContent).toBe('4'));
    expect(dashboardCalls).toBe(4);
  });
});
