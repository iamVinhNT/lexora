/**
 * @file ContextPage.test.tsx
 * @description Verifies context list, CRUD dialogs, and word relationship actions.
 */
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ContextPage } from '../src/pages/ContextPage';

const context = {
  id: 'context-1',
  title: 'Building a scalable API',
  content: 'The system needs to be reliable.',
  sourceType: 'ARTICLE',
  sourceUrl: 'https://example.test/article',
  wordCount: 1,
  words: [{ wordId: 'word-1', exposureCount: 3, firstSeenAt: '2026-09-01T00:00:00.000Z', lastSeenAt: '2026-09-07T00:00:00.000Z', word: { id: 'word-1', word: 'reliable', definition: 'Able to be trusted.' } }],
};

const words = [{ id: 'word-1', word: 'reliable', definition: 'Able to be trusted.', difficulty: 'B2', tags: [] }];

function response(data: unknown, status = 200) {
  return Promise.resolve({ ok: status >= 200 && status < 300, status, json: async () => ({ success: true, data }) });
}

function renderPage() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <ContextPage />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('ContextPage', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (init?.method === 'POST' && url.includes('/words')) return response(context);
      if (init?.method === 'DELETE') return response({ deleted: true });
      if (url.endsWith('/context-1')) return response(context);
      if (url.includes('/words')) return response({ total: 1, page: 1, limit: 100, items: words });
      return response({ total: 1, page: 1, limit: 20, items: [context] });
    }));
  });

  afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });

  it('loads linked-word options only after a context dialog opens', async () => {
    renderPage();
    await screen.findByText('Building a scalable API');

    expect(vi.mocked(fetch).mock.calls.some(([input]) => String(input).includes('/api/words'))).toBe(false);

    fireEvent.click(screen.getByRole('button', { name: /add context/i }));

    await waitFor(() => expect(vi.mocked(fetch).mock.calls.some(([input]) => String(input).includes('/api/words'))).toBe(true));
  });

  it('debounces context search while keeping the input responsive', async () => {
    vi.useFakeTimers();
    renderPage();
    await act(() => vi.advanceTimersByTimeAsync(0));
    const search = screen.getByRole('textbox', { name: /search contexts/i }) as HTMLInputElement;
    const initialCalls = vi.mocked(fetch).mock.calls.length;

    fireEvent.change(search, { target: { value: 's' } });
    fireEvent.change(search, { target: { value: 'sc' } });
    fireEvent.change(search, { target: { value: 'scale' } });

    expect(search.value).toBe('scale');
    expect(vi.mocked(fetch).mock.calls).toHaveLength(initialCalls);
    await act(() => vi.advanceTimersByTimeAsync(300));
    expect(vi.mocked(fetch).mock.calls.filter(([input]) => String(input).includes('search=scale'))).toHaveLength(1);
  });

  it('renders context count and applies the source filter', async () => {
    renderPage();
    await screen.findByText('Building a scalable API');
    expect(screen.getByText('1 context')).toBeTruthy();
    expect(screen.getByText('1 word')).toBeTruthy();

    const sourceTrigger = screen.getByRole('combobox', { name: /source type/i });
    fireEvent.pointerDown(sourceTrigger, { button: 0, ctrlKey: false, pointerType: 'mouse' });
    fireEvent.click(screen.getByRole('option', { name: 'Article' }));
    await waitFor(() => expect(vi.mocked(fetch).mock.calls.some(([url]) => String(url).includes('sourceType=ARTICLE'))).toBe(true));
  });

  it('submits the selected source type from the context form', async () => {
    const fetchMock = vi.mocked(fetch);
    renderPage();
    await screen.findByText('Building a scalable API');
    fireEvent.click(screen.getByRole('button', { name: /add context/i }));
    const dialog = screen.getByRole('dialog', { name: /add context/i });

    fireEvent.change(within(dialog).getByRole('textbox', { name: 'Title' }), { target: { value: 'Reliable systems' } });
    fireEvent.change(within(dialog).getByRole('textbox', { name: 'Content' }), { target: { value: 'Reliable systems scale.' } });
    fireEvent.pointerDown(within(dialog).getByRole('combobox', { name: /source type/i }), { button: 0, ctrlKey: false, pointerType: 'mouse' });
    const sourceOption = screen.getByRole('option', { name: 'Article' });
    fireEvent.click(sourceOption);
    const saveButton = within(dialog).getByRole('button', { name: /save context/i });
    fireEvent.submit(saveButton.closest('form')!);

    await waitFor(() => expect(fetchMock.mock.calls.some(([, init]) => init?.method === 'POST')).toBe(true));
    const postCall = fetchMock.mock.calls.find(([, init]) => init?.method === 'POST');
    expect(JSON.parse(String(postCall?.[1]?.body)).sourceType).toBe('ARTICLE');
  });

  it('opens detail, exposes exposure data, and links then unlinks words', async () => {
    renderPage();
    await screen.findByText('Building a scalable API');
    fireEvent.click(screen.getByRole('button', { name: /details for building a scalable api/i }));

    const dialog = await screen.findByRole('dialog', { name: /building a scalable api/i });
    expect(within(dialog).getByText(/exposure count: 3/i)).toBeTruthy();
    expect(within(dialog).getByText(/first seen/i)).toBeTruthy();

    fireEvent.click(within(dialog).getByRole('button', { name: /link words/i }));
    const linkDialog = screen.getByRole('dialog', { name: /link words/i });
    fireEvent.click(await within(linkDialog).findByRole('checkbox', { name: /reliable/i }));
    fireEvent.click(within(linkDialog).getByRole('button', { name: /save links/i }));
    await waitFor(() => expect(vi.mocked(fetch).mock.calls.some(([, init]) => init?.method === 'POST')).toBe(true));

    const refreshedDialog = screen.getByRole('dialog', { name: /building a scalable api/i });
    fireEvent.click(within(refreshedDialog).getByRole('button', { name: /unlink reliable/i }));
    await waitFor(() => expect(vi.mocked(fetch).mock.calls.some(([, init]) => init?.method === 'DELETE')).toBe(true));
  });

  it('validates context creation and confirms vocabulary-preserving deletion', async () => {
    renderPage();
    await screen.findByText('Building a scalable API');
    fireEvent.click(screen.getByRole('button', { name: /add context/i }));
    const dialog = screen.getByRole('dialog', { name: /add context/i });
    fireEvent.click(within(dialog).getByRole('button', { name: /save context/i }));
    expect(await within(dialog).findByText('Title is required')).toBeTruthy();
    expect(within(dialog).getByText('Content is required')).toBeTruthy();

    fireEvent.click(within(dialog).getByRole('button', { name: /cancel/i }));
    fireEvent.click(screen.getByRole('button', { name: /details for building a scalable api/i }));
    const detail = await screen.findByRole('dialog', { name: /building a scalable api/i });
    fireEvent.click(within(detail).getByRole('button', { name: /delete context building a scalable api/i }));
    const confirmation = screen.getByRole('dialog', { name: /delete context/i });
    expect(within(confirmation).getByText(/vocabulary words will be kept/i)).toBeTruthy();
  });
});
