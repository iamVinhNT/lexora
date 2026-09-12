/**
 * @file SettingsPage.test.tsx
 * @description Verifies safe import/export, restore previews, and typed destructive confirmations.
 */
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { SettingsPage } from '../src/pages/SettingsPage';
import { wordKeys } from '../src/hooks/useVocabulary';
import { contextKeys } from '../src/hooks/useContexts';
import { reviewKeys } from '../src/hooks/useReviewQueue';
import { sessionKeys } from '../src/hooks/useLearningSession';
import { analyticsKeys } from '../src/hooks/useAnalytics';
import { useWords } from '../src/hooks/useVocabulary';
import { useContexts } from '../src/hooks/useContexts';
import { useReviewQueue } from '../src/hooks/useReviewQueue';
import { useLearningSessionOverview } from '../src/hooks/useLearningSession';
import { useDashboardStatistics, useInsights, useProgressOverview, useReviewTrends } from '../src/hooks/useAnalytics';

const now = '2026-09-08T00:00:00.000Z';
const emptyBackup = {
  version: 1,
  application: 'Lexora',
  exportedAt: now,
  data: {
    users: [], words: [], wordFamilies: [], collocations: [], examples: [], contexts: [], contextWords: [],
    learningProgress: [], reviewStates: [], reviewLogs: [], tags: [], wordTags: [], learningSessions: [], learningSessionItems: [],
  },
};

function response(data: unknown) {
  return new Response(JSON.stringify({ success: true, data }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}

function renderSettings(queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })) {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/settings']}>
        <SettingsPage />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

function LiveDataConsumers() {
  const words = useWords({ page: 1, limit: 20 });
  const contexts = useContexts({ page: 1, limit: 20 });
  const reviews = useReviewQueue({ limit: 20 });
  const sessions = useLearningSessionOverview();
  const progress = useProgressOverview();
  const dashboard = useDashboardStatistics();
  const trends = useReviewTrends(30);
  const insights = useInsights();

  return <output data-testid="live-data">{[words.data?.items[0]?.word, contexts.data?.items[0]?.title, reviews.data?.total, sessions.data?.latestSession?.id, progress.data?.totalWords, dashboard.data?.todayReviews, trends.data?.trends[0]?.date, insights.data?.insights[0]?.title].join('|')}</output>;
}

function renderSettingsWithLiveConsumers(queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })) {
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/settings']}>
        <SettingsPage />
        <LiveDataConsumers />
      </MemoryRouter>
    </QueryClientProvider>,
  );
  return queryClient;
}

function createLiveFetchMock(mutationPath: string, mutationResult: unknown) {
  const getCounts = new Map<string, number>();
  return vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    const method = init?.method ?? 'GET';
    if (method !== 'GET') {
       if (url.includes('/api/import/preview')) return Promise.resolve(response({ validItems: [{ index: 0, word: 'lucid', definition: '' }], duplicates: [], invalidItems: [], validCount: 1, duplicateCount: 0, invalidCount: 0, previewToken: 'import-token' }));
       if (url.includes('/api/restore/preview')) return Promise.resolve(response({ valid: true, version: 1, application: 'Lexora', exportedAt: now, tableCounts: { words: 1 }, totalRecords: 1, previewToken: 'restore-token', conflictSummary: { existingRecordsCount: 0, willOverwrite: false, existingTableCounts: {} } }));
      if (url.includes(mutationPath)) return Promise.resolve(response(mutationResult));
      return Promise.resolve(response({}));
    }

    const path = new URL(url).pathname;
    const callNumber = (getCounts.get(path) ?? 0) + 1;
    getCounts.set(path, callNumber);
    const marker = callNumber === 1 ? 'before' : 'after';
    if (path === '/api/words') return Promise.resolve(response({ total: 1, page: 1, limit: 20, items: [{ word: `${marker}-word` }] }));
    if (path === '/api/contexts') return Promise.resolve(response({ total: 1, page: 1, limit: 20, items: [{ title: `${marker}-context` }] }));
    if (path === '/api/reviews/due') return Promise.resolve(response({ items: [], counts: {}, total: marker === 'before' ? 1 : 2 }));
    if (path === '/api/learning/session') return Promise.resolve(response({ activeSession: null, latestSession: marker === 'before' ? null : { id: 'after-session' }, sessions: [] }));
    if (path === '/api/progress') return Promise.resolve(response({ totalWords: marker === 'before' ? 1 : 2 }));
    if (path === '/api/statistics/dashboard') return Promise.resolve(response({ todayReviews: marker === 'before' ? 1 : 2 }));
    if (path === '/api/statistics/trends') return Promise.resolve(response({ days: 30, trends: [{ date: marker === 'before' ? '2026-09-07' : '2026-09-08' }] }));
    if (path === '/api/statistics/insights') return Promise.resolve(response({ insights: [{ id: marker, title: `${marker}-insight` }] }));
    return Promise.resolve(response({}));
  });
}

function getQueryCalls(fetchMock: ReturnType<typeof vi.fn>, path: string) {
  return fetchMock.mock.calls.filter(([input, init]) => String(input).includes(path) && (init?.method ?? 'GET') === 'GET');
}

function seedRelevantQueries(queryClient: QueryClient) {
  const keys = [
    wordKeys.list({ page: 1, limit: 20 }),
    contextKeys.list({ page: 1, limit: 20 }),
    reviewKeys.due({ limit: 20 }),
    sessionKeys.overview(),
    analyticsKeys.dashboard(),
  ];
  keys.forEach((key) => queryClient.setQueryData(key, { seeded: true }));
  return keys;
}

function fileWithText(name: string, content: string) {
  const file = new File([content], name, { type: 'text/plain' });
  Object.defineProperty(file, 'text', { value: () => Promise.resolve(content) });
  return file;
}

describe('SettingsPage', () => {
  beforeEach(() => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    Object.defineProperty(URL, 'createObjectURL', { configurable: true, value: vi.fn(() => 'blob:download') });
    Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: vi.fn() });
  });
  afterEach(() => vi.restoreAllMocks());

  it('previews import before enabling commit and displays API counts', async () => {
    const fetchMock = vi.fn()
       .mockResolvedValueOnce(response({ validItems: [{ index: 0, word: 'lucid', definition: '' }], duplicates: [], invalidItems: [], validCount: 1, duplicateCount: 0, invalidCount: 0, previewToken: 'import-token' }))
      .mockResolvedValueOnce(response({ importedCount: 1, wordIds: ['w1'] }));
    vi.stubGlobal('fetch', fetchMock);

    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const relevantKeys = seedRelevantQueries(queryClient);
    renderSettings(queryClient);
    const input = screen.getByLabelText('Import file');
    fireEvent.change(input, { target: { files: [fileWithText('words.txt', 'lucid')] } });

    await waitFor(() => expect(screen.getByText('Valid: 1')).toBeTruthy());
    expect(screen.getByText('Skipped: not reported by API')).toBeTruthy();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect((screen.getByRole('button', { name: 'Import 1 item' }) as HTMLButtonElement).disabled).toBe(true);

    fireEvent.click(screen.getByLabelText('Confirm import')); 
    expect((screen.getByRole('button', { name: 'Import 1 item' }) as HTMLButtonElement).disabled).toBe(false);
    fireEvent.click(screen.getByRole('button', { name: 'Import 1 item' }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    expect(String(fetchMock.mock.calls[1][0])).toContain('/api/import/commit');
    expect(JSON.parse(String(fetchMock.mock.calls[1][1].body)).previewToken).toBe('import-token');
    expect(relevantKeys.every((key) => queryClient.getQueryState(key)?.isInvalidated)).toBe(true);
  });

  it('refetches active consumers and updates cache after import', async () => {
    const fetchMock = createLiveFetchMock('/api/import/commit', { importedCount: 1, wordIds: ['w1'] });
    vi.stubGlobal('fetch', fetchMock);
    const queryClient = renderSettingsWithLiveConsumers();

    await waitFor(() => expect(screen.getByTestId('live-data').textContent).toBe('before-word|before-context|1||1|1|2026-09-07|before-insight'));
    fireEvent.change(screen.getByLabelText('Import file'), { target: { files: [fileWithText('words.txt', 'lucid')] } });
    await waitFor(() => expect(screen.getByText('Valid: 1')).toBeTruthy());
    fireEvent.click(screen.getByLabelText('Confirm import'));
    fireEvent.click(screen.getByRole('button', { name: 'Import 1 item' }));

    await waitFor(() => expect(screen.getByTestId('live-data').textContent).toBe('after-word|after-context|2|after-session|2|2|2026-09-08|after-insight'));
    expect(getQueryCalls(fetchMock, '/api/words')).toHaveLength(2);
    expect(queryClient.getQueryData(wordKeys.list({ page: 1, limit: 20 }))).toMatchObject({ items: [{ word: 'after-word' }] });
  });

  it('requests vocabulary export and starts a safe browser download', async () => {
    const fetchMock = vi.fn().mockResolvedValue(response({ format: 'CSV', scope: 'words', content: 'word,definition\nlucid,clear' }));
    vi.stubGlobal('fetch', fetchMock);
    const anchorClick = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined);

    renderSettings();
    fireEvent.click(screen.getByRole('button', { name: 'Export vocabulary' }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(String(fetchMock.mock.calls[0][0])).toContain('/api/export/vocabulary');
    expect(String(fetchMock.mock.calls[0][0])).toContain('format=CSV');
    expect(anchorClick).toHaveBeenCalled();
    expect(screen.getByRole('status').textContent).toContain('Vocabulary export downloaded.');
  });

  it('previews restore, locks confirmation until typed phrase, then restores with confirm true', async () => {
    const fetchMock = vi.fn()
       .mockResolvedValueOnce(response({ valid: true, version: 1, application: 'Lexora', exportedAt: now, tableCounts: { words: 2 }, totalRecords: 2, previewToken: 'restore-token', conflictSummary: { existingRecordsCount: 1, willOverwrite: true, existingTableCounts: { words: 1 } } }))
      .mockResolvedValueOnce(response({ restored: true }));
    vi.stubGlobal('fetch', fetchMock);

    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const relevantKeys = seedRelevantQueries(queryClient);
    renderSettings(queryClient);
    fireEvent.change(screen.getByLabelText('Restore backup file'), { target: { files: [fileWithText('backup.json', JSON.stringify(emptyBackup))] } });
    await waitFor(() => expect(screen.getByText('This restore will overwrite 1 existing record.')).toBeTruthy());
    expect((screen.getByRole('button', { name: 'Restore backup' }) as HTMLButtonElement).disabled).toBe(true);

    fireEvent.change(screen.getByLabelText('Type RESTORE to confirm'), { target: { value: 'RESTORE' } });
    expect((screen.getByRole('button', { name: 'Restore backup' }) as HTMLButtonElement).disabled).toBe(false);
    fireEvent.click(screen.getByRole('button', { name: 'Restore backup' }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    expect(String(fetchMock.mock.calls[1][0])).toContain('/api/restore');
    expect(JSON.parse(String(fetchMock.mock.calls[1][1].body)).confirm).toBe(true);
    expect(JSON.parse(String(fetchMock.mock.calls[1][1].body)).previewToken).toBe('restore-token');
    expect(screen.getByRole('status').textContent).toContain('Restore completed.');
    expect(relevantKeys.every((key) => queryClient.getQueryState(key)?.isInvalidated)).toBe(true);
  });

  it('refetches active consumers and updates cache after restore', async () => {
    const fetchMock = createLiveFetchMock('/api/restore', { restored: true });
    vi.stubGlobal('fetch', fetchMock);
    const queryClient = renderSettingsWithLiveConsumers();

    await waitFor(() => expect(screen.getByTestId('live-data').textContent).toBe('before-word|before-context|1||1|1|2026-09-07|before-insight'));
    fireEvent.change(screen.getByLabelText('Restore backup file'), { target: { files: [fileWithText('backup.json', JSON.stringify(emptyBackup))] } });
    await waitFor(() => expect(screen.getByText('No existing records will be overwritten.')).toBeTruthy());
    fireEvent.click(screen.getByRole('button', { name: 'Open restore confirmation' }));
    fireEvent.change(screen.getByLabelText('Type RESTORE to confirm'), { target: { value: 'RESTORE' } });
    fireEvent.click(screen.getByRole('button', { name: 'Restore backup' }));

    await waitFor(() => expect(screen.getByTestId('live-data').textContent).toBe('after-word|after-context|2|after-session|2|2|2026-09-08|after-insight'));
    expect(getQueryCalls(fetchMock, '/api/contexts')).toHaveLength(2);
    expect(queryClient.getQueryData(contextKeys.list({ page: 1, limit: 20 }))).toMatchObject({ items: [{ title: 'after-context' }] });
  });

  it('does not claim restore success when API returns restored false', async () => {
    const fetchMock = vi.fn()
       .mockResolvedValueOnce(response({ valid: true, version: 1, application: 'Lexora', exportedAt: now, tableCounts: {}, totalRecords: 0, previewToken: 'restore-token', conflictSummary: { existingRecordsCount: 0, willOverwrite: false, existingTableCounts: {} } }))
      .mockResolvedValueOnce(response({ restored: false }));
    vi.stubGlobal('fetch', fetchMock);

    renderSettings();
    fireEvent.change(screen.getByLabelText('Restore backup file'), { target: { files: [fileWithText('backup.json', JSON.stringify(emptyBackup))] } });
    await waitFor(() => expect(screen.getByRole('button', { name: 'Open restore confirmation' })).toBeTruthy());
    fireEvent.click(screen.getByRole('button', { name: 'Open restore confirmation' }));
    fireEvent.change(screen.getByLabelText('Type RESTORE to confirm'), { target: { value: 'RESTORE' } });
    fireEvent.click(screen.getByRole('button', { name: 'Restore backup' }));

    await waitFor(() => expect(screen.getByRole('alert').textContent).toContain('did not confirm completion'));
    expect(screen.queryByText('Restore completed.')).toBeNull();
    expect(screen.getByRole('dialog', { name: 'Restore backup' })).toBeTruthy();
  });

  it('keeps reset actions separate and requires exact typed phrases before mutation', async () => {
    const fetchMock = vi.fn().mockResolvedValue(response({ reset: true, scope: 'progress' }));
    vi.stubGlobal('fetch', fetchMock);

    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const relevantKeys = seedRelevantQueries(queryClient);
    renderSettings(queryClient);
    fireEvent.click(screen.getByRole('button', { name: 'Reset learning progress' }));
    const progressDialog = screen.getByRole('dialog', { name: 'Reset learning progress' });
    expect(within(progressDialog).getByText(/keeps vocabulary and contexts/i)).toBeTruthy();
    expect((within(progressDialog).getByRole('button', { name: 'Confirm reset' }) as HTMLButtonElement).disabled).toBe(true);
    fireEvent.change(within(progressDialog).getByLabelText('Type RESET PROGRESS to confirm'), { target: { value: 'RESET PROGRESS' } });
    expect((within(progressDialog).getByRole('button', { name: 'Confirm reset' }) as HTMLButtonElement).disabled).toBe(false);
    fireEvent.click(within(progressDialog).getByRole('button', { name: 'Confirm reset' }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(String(fetchMock.mock.calls[0][0])).toContain('/api/data/reset-progress');
    expect(screen.getByRole('status').textContent).toContain('Learning progress reset.');
    expect(relevantKeys.every((key) => queryClient.getQueryState(key)?.isInvalidated)).toBe(true);

    fireEvent.click(screen.getByRole('button', { name: 'Delete all data' }));
    const allDialog = screen.getByRole('dialog', { name: 'Delete all data' });
    expect(within(allDialog).getByText(/deletes vocabulary, contexts, and all learning data/i)).toBeTruthy();
    expect((within(allDialog).getByRole('button', { name: 'Confirm deletion' }) as HTMLButtonElement).disabled).toBe(true);
  });

  it('refetches active consumers and updates cache after resetting progress', async () => {
    const fetchMock = createLiveFetchMock('/api/data/reset-progress', { reset: true, scope: 'progress' });
    vi.stubGlobal('fetch', fetchMock);
    const queryClient = renderSettingsWithLiveConsumers();

    await waitFor(() => expect(screen.getByTestId('live-data').textContent).toBe('before-word|before-context|1||1|1|2026-09-07|before-insight'));
    fireEvent.click(screen.getByRole('button', { name: 'Reset learning progress' }));
    const dialog = screen.getByRole('dialog', { name: 'Reset learning progress' });
    fireEvent.change(within(dialog).getByLabelText('Type RESET PROGRESS to confirm'), { target: { value: 'RESET PROGRESS' } });
    fireEvent.click(within(dialog).getByRole('button', { name: 'Confirm reset' }));

    await waitFor(() => expect(screen.getByTestId('live-data').textContent).toBe('after-word|after-context|2|after-session|2|2|2026-09-08|after-insight'));
    expect(getQueryCalls(fetchMock, '/api/statistics/dashboard')).toHaveLength(2);
    expect(queryClient.getQueryData(analyticsKeys.dashboard())).toMatchObject({ todayReviews: 2 });
  });

  it('refetches active consumers and updates cache after deleting all data', async () => {
    const fetchMock = createLiveFetchMock('/api/data/reset-all', { reset: true, scope: 'all' });
    vi.stubGlobal('fetch', fetchMock);
    const queryClient = renderSettingsWithLiveConsumers();

    await waitFor(() => expect(screen.getByTestId('live-data').textContent).toBe('before-word|before-context|1||1|1|2026-09-07|before-insight'));
    fireEvent.click(screen.getByRole('button', { name: 'Delete all data' }));
    const dialog = screen.getByRole('dialog', { name: 'Delete all data' });
    fireEvent.change(within(dialog).getByLabelText('Type DELETE ALL DATA to confirm'), { target: { value: 'DELETE ALL DATA' } });
    fireEvent.click(within(dialog).getByRole('button', { name: 'Confirm deletion' }));

    await waitFor(() => expect(screen.getByTestId('live-data').textContent).toBe('after-word|after-context|2|after-session|2|2|2026-09-08|after-insight'));
    expect(getQueryCalls(fetchMock, '/api/reviews/due')).toHaveLength(2);
    expect(queryClient.getQueryData(reviewKeys.due({ limit: 20 }))).toMatchObject({ total: 2 });
  });

  it('does not claim reset success when API returns a mismatched scope and clears prior status', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(response({ reset: true, scope: 'progress' }))
      .mockResolvedValueOnce(response({ reset: true, scope: 'progress' }));
    vi.stubGlobal('fetch', fetchMock);

    renderSettings();
    fireEvent.click(screen.getByRole('button', { name: 'Reset learning progress' }));
    const progressDialog = screen.getByRole('dialog', { name: 'Reset learning progress' });
    fireEvent.change(within(progressDialog).getByLabelText('Type RESET PROGRESS to confirm'), { target: { value: 'RESET PROGRESS' } });
    fireEvent.click(within(progressDialog).getByRole('button', { name: 'Confirm reset' }));
    await waitFor(() => expect(screen.getByRole('status').textContent).toContain('Learning progress reset.'));

    fireEvent.click(screen.getByRole('button', { name: 'Delete all data' }));
    const allDialog = screen.getByRole('dialog', { name: 'Delete all data' });
    fireEvent.change(within(allDialog).getByLabelText('Type DELETE ALL DATA to confirm'), { target: { value: 'DELETE ALL DATA' } });
    fireEvent.click(within(allDialog).getByRole('button', { name: 'Confirm deletion' }));

    await waitFor(() => expect(within(allDialog).getByRole('alert').textContent).toContain('did not confirm all reset'));
    expect(screen.queryByText('All data deleted.')).toBeNull();
    expect(screen.queryByText('Learning progress reset.')).toBeNull();
    expect(screen.getByRole('dialog', { name: 'Delete all data' })).toBeTruthy();
  });

  it('shows mutation failure visibly without closing destructive dialog', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Reset failed')));
    renderSettings();
    fireEvent.click(screen.getByRole('button', { name: 'Reset learning progress' }));
    const dialog = screen.getByRole('dialog', { name: 'Reset learning progress' });
    fireEvent.change(within(dialog).getByLabelText('Type RESET PROGRESS to confirm'), { target: { value: 'RESET PROGRESS' } });
    fireEvent.click(within(dialog).getByRole('button', { name: 'Confirm reset' }));
    await waitFor(() => expect(within(dialog).getByRole('alert').textContent).toContain('Reset failed'));
    expect(screen.getByRole('dialog', { name: 'Reset learning progress' })).toBeTruthy();
  });

  it('revokes import preview and disables commit when selected format changes', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(response({ validItems: [{ index: 0, word: 'lucid', definition: '' }], duplicates: [], invalidItems: [], validCount: 1, duplicateCount: 0, invalidCount: 0, previewToken: 'import-token' }))
      .mockResolvedValueOnce(response({ importedCount: 1, wordIds: ['w1'] }));
    vi.stubGlobal('fetch', fetchMock);
    renderSettings();

    fireEvent.change(screen.getByLabelText('Import file'), { target: { files: [fileWithText('words.txt', 'lucid')] } });
    await waitFor(() => expect(screen.getByText('Valid: 1')).toBeTruthy());
    fireEvent.click(screen.getByLabelText('Confirm import'));
    fireEvent.pointerDown(screen.getByRole('combobox', { name: 'Import format' }), { button: 0, ctrlKey: false, pointerType: 'mouse' });
    fireEvent.click(screen.getByRole('option', { name: 'CSV' }));

    await waitFor(() => {
      expect(screen.queryByText('Valid: 1')).toBeNull();
      expect(screen.queryByRole('button', { name: 'Import 1 item' })).toBeNull();
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
  });

  it('suppresses stale import preview responses after a newer file selection', async () => {
    let resolveFirst!: (value: Response) => void;
    let resolveSecond!: (value: Response) => void;
    const firstPreview = new Promise<Response>((resolve) => { resolveFirst = resolve; });
    const secondPreview = new Promise<Response>((resolve) => { resolveSecond = resolve; });
    let previewCall = 0;
    const fetchMock = vi.fn((input: RequestInfo | URL) => {
      if (String(input).includes('/api/import/preview')) {
        previewCall += 1;
        return previewCall === 1 ? firstPreview : secondPreview;
      }
      return Promise.resolve(response({ importedCount: 1, wordIds: ['w2'] }));
    });
    vi.stubGlobal('fetch', fetchMock);
    renderSettings();

    fireEvent.change(screen.getByLabelText('Import file'), { target: { files: [fileWithText('first.txt', 'first')] } });
    await waitFor(() => expect(previewCall).toBe(1));
    fireEvent.change(screen.getByLabelText('Import file'), { target: { files: [fileWithText('second.txt', 'second')] } });
    await waitFor(() => expect(previewCall).toBe(2));
    resolveSecond(response({ validItems: [{ index: 0, word: 'second', definition: '' }], duplicates: [], invalidItems: [], validCount: 1, duplicateCount: 0, previewToken: 'second-token' }));
    await waitFor(() => expect(screen.getByText('Valid: 1')).toBeTruthy());
    expect(screen.getByText('Selected: second.txt')).toBeTruthy();

    resolveFirst(response({ validItems: [{ index: 0, word: 'first', definition: '' }], duplicates: [], invalidItems: [], validCount: 1, duplicateCount: 0, previewToken: 'first-token' }));
    await waitFor(() => expect(screen.getByText('Selected: second.txt')).toBeTruthy());
    expect(screen.getByText('Selected: second.txt')).toBeTruthy();
    fireEvent.click(screen.getByLabelText('Confirm import'));
    fireEvent.click(screen.getByRole('button', { name: 'Import 1 item' }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    const commitCall = fetchMock.mock.calls.find(([input]) => String(input).includes('/api/import/commit'));
    expect(JSON.parse(String(commitCall?.[1]?.body)).previewToken).toBe('second-token');
  });

  it('does not let a stale import commit response clear a newer preview', async () => {
    let resolveCommit!: (value: Response) => void;
    const pendingCommit = new Promise<Response>((resolve) => { resolveCommit = resolve; });
    const fetchMock = vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/api/import/preview')) {
        const body = JSON.parse(String(fetchMock.mock.calls.at(-1)?.[1]?.body));
        const token = body.content === 'first' ? 'first-token' : 'second-token';
        return Promise.resolve(response({ validItems: [{ index: 0, word: body.content, definition: '' }], duplicates: [], invalidItems: [], validCount: 1, duplicateCount: 0, invalidCount: 0, previewToken: token }));
      }
      if (url.includes('/api/import/commit')) return pendingCommit;
      return Promise.resolve(response({}));
    });
    vi.stubGlobal('fetch', fetchMock);
    renderSettings();

    fireEvent.change(screen.getByLabelText('Import file'), { target: { files: [fileWithText('first.txt', 'first')] } });
    await waitFor(() => expect(screen.getByText('Selected: first.txt')).toBeTruthy());
    fireEvent.click(screen.getByLabelText('Confirm import'));
    fireEvent.click(screen.getByRole('button', { name: 'Import 1 item' }));
    await waitFor(() => expect(fetchMock.mock.calls.some(([input]) => String(input).includes('/api/import/commit'))).toBe(true));

    fireEvent.change(screen.getByLabelText('Import file'), { target: { files: [fileWithText('second.txt', 'second')] } });
    await waitFor(() => expect(screen.getByText('Selected: second.txt')).toBeTruthy());
    expect(screen.getByText('Valid: 1')).toBeTruthy();

    resolveCommit(response({ importedCount: 1, wordIds: ['w1'] }));
    await waitFor(() => expect(screen.getByText('Selected: second.txt')).toBeTruthy());
    expect(screen.getByText('Valid: 1')).toBeTruthy();
    expect(screen.queryByText('Imported 1 item.')).toBeNull();
    const commitCall = fetchMock.mock.calls.find(([input]) => String(input).includes('/api/import/commit'));
    expect(JSON.parse(String(commitCall?.[1]?.body)).previewToken).toBe('first-token');
  });

  it('does not show a stale import failure against a newer preview', async () => {
    let rejectCommit!: (reason?: unknown) => void;
    const pendingCommit = new Promise<Response>((_resolve, reject) => { rejectCommit = reject; });
    const fetchMock = vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/api/import/preview')) {
        const body = JSON.parse(String(fetchMock.mock.calls.at(-1)?.[1]?.body));
        return Promise.resolve(response({ validItems: [{ index: 0, word: body.content, definition: '' }], duplicates: [], invalidItems: [], validCount: 1, duplicateCount: 0, invalidCount: 0, previewToken: `${body.content}-token` }));
      }
      if (url.includes('/api/import/commit')) return pendingCommit;
      return Promise.resolve(response({}));
    });
    vi.stubGlobal('fetch', fetchMock);
    renderSettings();

    fireEvent.change(screen.getByLabelText('Import file'), { target: { files: [fileWithText('first.txt', 'first')] } });
    await waitFor(() => expect(screen.getByText('Selected: first.txt')).toBeTruthy());
    fireEvent.click(screen.getByLabelText('Confirm import'));
    fireEvent.click(screen.getByRole('button', { name: 'Import 1 item' }));

    fireEvent.change(screen.getByLabelText('Import file'), { target: { files: [fileWithText('second.txt', 'second')] } });
    await waitFor(() => expect(screen.getByText('Selected: second.txt')).toBeTruthy());
    rejectCommit(new Error('Old import failed'));

    await waitFor(() => expect(screen.getByText('Valid: 1')).toBeTruthy());
    expect(screen.queryByText('Old import failed')).toBeNull();
    expect(screen.getByText('Selected: second.txt')).toBeTruthy();
  });

  it('uses the newer restore payload when an older restore resolves late', async () => {
    let resolveFirstRestore!: (value: Response) => void;
    let resolveSecondRestore!: (value: Response) => void;
    const firstRestore = new Promise<Response>((resolve) => { resolveFirstRestore = resolve; });
    const secondRestore = new Promise<Response>((resolve) => { resolveSecondRestore = resolve; });
    const firstBackup = { ...emptyBackup, exportedAt: '2026-09-08T00:00:00.000Z' };
    const secondBackup = { ...emptyBackup, exportedAt: '2026-09-09T00:00:00.000Z' };
    let restoreCall = 0;
    const fetchMock = vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/api/restore/preview')) {
        const body = JSON.parse(String(fetchMock.mock.calls.at(-1)?.[1]?.body));
        const token = body.backup.exportedAt === firstBackup.exportedAt ? 'first-restore-token' : 'second-restore-token';
        return Promise.resolve(response({ valid: true, version: 1, application: 'Lexora', exportedAt: body.backup.exportedAt, tableCounts: {}, totalRecords: 0, previewToken: token, conflictSummary: { existingRecordsCount: 0, willOverwrite: false, existingTableCounts: {} } }));
      }
      if (url.endsWith('/api/restore')) {
        restoreCall += 1;
        return restoreCall === 1 ? firstRestore : secondRestore;
      }
      return Promise.resolve(response({}));
    });
    vi.stubGlobal('fetch', fetchMock);
    renderSettings();

    fireEvent.change(screen.getByLabelText('Restore backup file'), { target: { files: [fileWithText('first.json', JSON.stringify(firstBackup))] } });
    await waitFor(() => expect(screen.getByText('No existing records will be overwritten.')).toBeTruthy());
    fireEvent.click(screen.getByRole('button', { name: 'Open restore confirmation' }));
    fireEvent.change(screen.getByLabelText('Type RESTORE to confirm'), { target: { value: 'RESTORE' } });
    fireEvent.click(screen.getByRole('button', { name: 'Restore backup' }));
    await waitFor(() => expect(restoreCall).toBe(1));

    fireEvent.change(screen.getByLabelText('Restore backup file'), { target: { files: [fileWithText('second.json', JSON.stringify(secondBackup))] } });
    await waitFor(() => expect(screen.getByText('No existing records will be overwritten.')).toBeTruthy());
    fireEvent.click(screen.getByRole('button', { name: 'Open restore confirmation' }));
    fireEvent.change(screen.getByLabelText('Type RESTORE to confirm'), { target: { value: 'RESTORE' } });
    const secondRestoreButton = screen.getByRole('button', { name: 'Restore backup' }) as HTMLButtonElement;
    expect(secondRestoreButton.disabled).toBe(false);

    resolveFirstRestore(response({ restored: true }));
    await waitFor(() => expect(screen.getByRole('dialog', { name: 'Restore backup' })).toBeTruthy());
    expect(screen.queryByText('Restore completed.')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Restore backup' }));
    await waitFor(() => expect(restoreCall).toBe(2));
    const restoreCalls = fetchMock.mock.calls.filter(([input, init]) => String(input).endsWith('/api/restore') && init?.method === 'POST');
    expect(restoreCalls).toHaveLength(2);
    expect(JSON.parse(String(restoreCalls[1][1]?.body))).toEqual({
      backup: secondBackup,
      confirm: true,
      previewToken: 'second-restore-token',
    });
    expect((screen.getByRole('button', { name: 'Working…' }) as HTMLButtonElement).disabled).toBe(true);

    resolveSecondRestore(response({ restored: true }));
    await waitFor(() => expect(screen.getByRole('status').textContent).toContain('Restore completed.'));
  });

  it('keeps a newer restore usable when an older restore rejects late', async () => {
    let rejectFirstRestore!: (reason?: unknown) => void;
    let resolveSecondRestore!: (value: Response) => void;
    const firstRestore = new Promise<Response>((_resolve, reject) => { rejectFirstRestore = reject; });
    const secondRestore = new Promise<Response>((resolve) => { resolveSecondRestore = resolve; });
    const firstBackup = { ...emptyBackup, exportedAt: '2026-09-08T00:00:00.000Z' };
    const secondBackup = { ...emptyBackup, exportedAt: '2026-09-09T00:00:00.000Z' };
    let restoreCall = 0;
    const fetchMock = vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/api/restore/preview')) {
        const body = JSON.parse(String(fetchMock.mock.calls.at(-1)?.[1]?.body));
        const token = body.backup.exportedAt === firstBackup.exportedAt ? 'first-restore-token' : 'second-restore-token';
        return Promise.resolve(response({ valid: true, version: 1, application: 'Lexora', exportedAt: body.backup.exportedAt, tableCounts: {}, totalRecords: 0, previewToken: token, conflictSummary: { existingRecordsCount: 0, willOverwrite: false, existingTableCounts: {} } }));
      }
      if (url.endsWith('/api/restore')) {
        restoreCall += 1;
        return restoreCall === 1 ? firstRestore : secondRestore;
      }
      return Promise.resolve(response({}));
    });
    vi.stubGlobal('fetch', fetchMock);
    renderSettings();

    fireEvent.change(screen.getByLabelText('Restore backup file'), { target: { files: [fileWithText('first.json', JSON.stringify(firstBackup))] } });
    await waitFor(() => expect(screen.getByText('No existing records will be overwritten.')).toBeTruthy());
    fireEvent.click(screen.getByRole('button', { name: 'Open restore confirmation' }));
    fireEvent.change(screen.getByLabelText('Type RESTORE to confirm'), { target: { value: 'RESTORE' } });
    fireEvent.click(screen.getByRole('button', { name: 'Restore backup' }));
    await waitFor(() => expect(restoreCall).toBe(1));

    fireEvent.change(screen.getByLabelText('Restore backup file'), { target: { files: [fileWithText('second.json', JSON.stringify(secondBackup))] } });
    await waitFor(() => expect(screen.getByText('No existing records will be overwritten.')).toBeTruthy());
    fireEvent.click(screen.getByRole('button', { name: 'Open restore confirmation' }));
    fireEvent.change(screen.getByLabelText('Type RESTORE to confirm'), { target: { value: 'RESTORE' } });

    await act(async () => {
      rejectFirstRestore(new Error('Old restore failed'));
      await expect(firstRestore).rejects.toThrow('Old restore failed');
    });
    expect(screen.queryByText('Old restore failed')).toBeNull();
    expect(screen.getByRole('dialog', { name: 'Restore backup' })).toBeTruthy();
    const secondRestoreButton = screen.getByRole('button', { name: 'Restore backup' }) as HTMLButtonElement;
    expect(secondRestoreButton.disabled).toBe(false);

    fireEvent.click(secondRestoreButton);
    await waitFor(() => expect(restoreCall).toBe(2));
    expect((screen.getByRole('button', { name: 'Working…' }) as HTMLButtonElement).disabled).toBe(true);

    resolveSecondRestore(response({ restored: true }));
    await waitFor(() => expect(screen.getByRole('status').textContent).toContain('Restore completed.'));
  });
});
