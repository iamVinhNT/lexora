/**
 * @file LearningSessionPage.test.tsx
 * @description Covers the strict five-stage learning session workflow at the fetch boundary.
 */
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { LearningSessionPage } from '../src/pages/LearningSessionPage';
import { useDashboardStatistics } from '../src/hooks/useAnalytics';
import { useCompleteLearningSession, useStartLearningSession, useSubmitLearningStep } from '../src/hooks/useLearningSession';

const wordId = '11111111-1111-4111-8111-111111111111';

function item(completedStep: string | null = null) {
  return {
    id: 'item-1',
    sessionId: 'session-1',
    wordId,
    completedStep,
    recallResult: null,
    outputSentence: null,
    reviewRating: null,
    clozeSentence: 'The system needs to be ______.',
    word: {
      id: wordId,
      word: 'reliable',
      headword: 'reliable',
      definition: 'able to be trusted or depended on',
      phonetic: '/rɪˈlaɪəbl/',
      partOfSpeech: 'adjective',
      translation: 'đáng tin cậy',
      contextSentence: 'The system needs to be reliable and scalable.',
      examples: [{ sentence: 'I need a reliable laptop.' }],
      collocations: [{ phrase: 'reliable source' }],
    },
  };
}

function session(completedStep: string | null = null) {
  return {
    id: 'session-1',
    mode: 'new_words',
    sessionType: 'new_words',
    totalWords: 1,
    startedAt: '2026-09-07T10:00:00.000Z',
    completedAt: null,
    status: 'IN_PROGRESS',
    items: [item(completedStep)],
  };
}

function json(data: unknown, status = 200) {
  return Promise.resolve(new Response(JSON.stringify({ success: true, data }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  }));
}

function renderPage() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <LearningSessionPage />
      </QueryClientProvider>
    </MemoryRouter>,
  );
}

function SessionMutationConsumer() {
  const dashboard = useDashboardStatistics();
  const start = useStartLearningSession();
  const submit = useSubmitLearningStep();
  const complete = useCompleteLearningSession();
  return <>
    <output data-testid="session-analytics">{dashboard.data?.todayReviews ?? ''}</output>
    <button type="button" onClick={() => void start.mutateAsync({ mode: 'new_words', count: 1 })}>start mutation</button>
    <button type="button" onClick={() => void submit.mutateAsync({ id: 'session-1', payload: { wordId, step: 'CONTEXT' } })}>submit mutation</button>
    <button type="button" onClick={() => void complete.mutateAsync('session-1')}>complete mutation</button>
  </>;
}

describe('LearningSessionPage', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(json({ activeSession: null, latestSession: null, sessions: [] })));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('validates start form and starts a selected session', async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValueOnce(json({ activeSession: null, latestSession: null, sessions: [] }));
    fetchMock.mockResolvedValueOnce(json(session()));
    fetchMock.mockResolvedValueOnce(json(session()));
    renderPage();

    await screen.findByRole('heading', { name: 'Start a learning session' });
    const modeTrigger = screen.getByRole('combobox', { name: 'Session mode' });
    fireEvent.pointerDown(modeTrigger, { button: 0, ctrlKey: false, pointerType: 'mouse' });
    const contextOption = screen.getByRole('option', { name: 'Context' });
    fireEvent.click(contextOption);
    const startButton = screen.getByRole('button', { name: 'Start session' });
    fireEvent.submit(startButton.closest('form')!);

    expect(screen.getByText('Context is required for context mode.')).toBeTruthy();
    expect(fetchMock).toHaveBeenCalledTimes(1);

    fireEvent.change(screen.getByLabelText('Context ID'), { target: { value: 'context-1' } });
    fireEvent.change(screen.getByLabelText('Word count'), { target: { value: '3' } });
    const secondStartButton = screen.getByRole('button', { name: 'Start session' });
    fireEvent.submit(secondStartButton.closest('form')!);

    await screen.findByRole('heading', { name: 'Context' });
    expect(String(fetchMock.mock.calls.at(-1)?.[0])).toContain('/api/learning/session');
    expect(fetchMock.mock.calls.some(([, init]) => init?.method === 'POST' && String(init.body).includes('context-1'))).toBe(true);
    expect(JSON.parse(String(fetchMock.mock.calls.at(-1)?.[1]?.body))).toEqual({ mode: 'context', count: 3, contextId: 'context-1' });
  });

  it('renders and submits all five steps in order before completing', async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock
      .mockResolvedValueOnce(json({ activeSession: null, latestSession: null, sessions: [] }))
      .mockResolvedValueOnce(json(session()))
      .mockResolvedValueOnce(json(item('CONTEXT')))
      .mockResolvedValueOnce(json(item('UNDERSTAND')))
      .mockResolvedValueOnce(json({ ...item('RECALL'), recallResult: 'CORRECT' }))
      .mockResolvedValueOnce(json({ ...item('OUTPUT'), outputSentence: 'This laptop is reliable.' }))
      .mockResolvedValueOnce(json({ ...item('ASSESS'), reviewRating: 'GOOD' }))
      .mockResolvedValueOnce(json({ ...session('ASSESS'), completedAt: '2026-09-07T10:10:00.000Z', status: 'COMPLETED', items: [{ ...item('ASSESS'), reviewRating: 'GOOD', recallResult: 'CORRECT', outputSentence: 'This laptop is reliable.' }] }));
    renderPage();

    await screen.findByRole('heading', { name: 'Start a learning session' });
    fireEvent.click(screen.getByRole('button', { name: 'Start session' }));
    await screen.findByRole('heading', { name: 'Context' });
    expect(screen.queryByText((_content, element) => element?.textContent === 'Learning reliable')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Continue to Understand' }));
    await screen.findByRole('heading', { name: 'Understand' });
    fireEvent.click(screen.getByRole('button', { name: 'Continue to Recall' }));
    await screen.findByRole('heading', { name: 'Recall' });
    fireEvent.change(screen.getByLabelText('Recall answer'), { target: { value: 'reliable' } });
    fireEvent.click(screen.getByRole('button', { name: 'Continue to Output' }));
    await screen.findByRole('heading', { name: 'Output' });
    fireEvent.change(screen.getByLabelText('Your sentence'), { target: { value: 'This laptop is reliable.' } });
    fireEvent.click(screen.getByRole('button', { name: 'Continue to Assess' }));
    await screen.findByRole('heading', { name: 'Assess' });
    fireEvent.click(screen.getByRole('button', { name: 'Good' }));
    await screen.findByRole('heading', { name: 'Session complete' });

    const stepRequests = fetchMock.mock.calls.filter(([, init]) => init?.method === 'POST' && String(init.body).includes('wordId'));
    expect(stepRequests.map(([, init]) => JSON.parse(String(init?.body)).step)).toEqual(['CONTEXT', 'UNDERSTAND', 'RECALL', 'OUTPUT', 'ASSESS']);
    expect(fetchMock.mock.calls.some(([url]) => String(url).endsWith('/api/learning/session/session-1/complete'))).toBe(true);
  });

  it('keeps current step visible while submit is pending or fails', async () => {
    const fetchMock = vi.mocked(fetch);
    let resolveStep: ((value: Response) => void) | undefined;
    fetchMock
      .mockResolvedValueOnce(json({ activeSession: null, latestSession: null, sessions: [] }))
      .mockResolvedValueOnce(json(session()))
      .mockImplementationOnce(() => new Promise((resolve) => { resolveStep = resolve; }));
    renderPage();
    await screen.findByRole('heading', { name: 'Start a learning session' });
    fireEvent.click(screen.getByRole('button', { name: 'Start session' }));
    await screen.findByRole('heading', { name: 'Context' });
    const continueButton = screen.getByRole('button', { name: 'Continue to Understand' });
    fireEvent.click(continueButton);
    await waitFor(() => expect(continueButton.hasAttribute('disabled')).toBe(true));
    expect(screen.getByRole('heading', { name: 'Context' })).toBeTruthy();
    resolveStep?.(new Response(JSON.stringify({ success: false, error: { code: 'FAILED', message: 'Step failed' } }), { status: 400 }));
    expect(await screen.findByText('Step failed')).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Context' })).toBeTruthy();
  });

  it('requires output text and guards assessment keyboard shortcuts while typing', async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock
      .mockResolvedValueOnce(json({ activeSession: null, latestSession: null, sessions: [] }))
      .mockResolvedValueOnce(json(session()))
      .mockResolvedValueOnce(json(item('CONTEXT')))
      .mockResolvedValueOnce(json(item('UNDERSTAND')))
      .mockResolvedValueOnce(json({ ...item('RECALL'), recallResult: 'CORRECT' }))
      .mockResolvedValueOnce(json(item('OUTPUT')));
    renderPage();
    await screen.findByRole('heading', { name: 'Start a learning session' });
    fireEvent.click(screen.getByRole('button', { name: 'Start session' }));
    await screen.findByRole('heading', { name: 'Context' });
    fireEvent.click(screen.getByRole('button', { name: 'Continue to Understand' }));
    await screen.findByRole('heading', { name: 'Understand' });
    fireEvent.click(screen.getByRole('button', { name: 'Continue to Recall' }));
    await screen.findByRole('heading', { name: 'Recall' });
    fireEvent.change(screen.getByLabelText('Recall answer'), { target: { value: 'reliable' } });
    fireEvent.click(screen.getByRole('button', { name: 'Continue to Output' }));
    await screen.findByRole('heading', { name: 'Output' });
    fireEvent.click(screen.getByRole('button', { name: 'Continue to Assess' }));
    expect(screen.getByText('Write a sentence before continuing.')).toBeTruthy();
    fireEvent.change(screen.getByLabelText('Your sentence'), { target: { value: 'A reliable result.' } });
    fireEvent.click(screen.getByRole('button', { name: 'Continue to Assess' }));
    await screen.findByRole('heading', { name: 'Assess' });
    const answerInput = screen.getByLabelText('Assessment keyboard shortcuts');
    fireEvent.keyDown(answerInput, { key: '1' });
    expect(fetchMock.mock.calls.filter(([, init]) => init?.method === 'POST')).toHaveLength(5);
    fireEvent.keyDown(document.body, { key: '1' });
    await waitFor(() => expect(fetchMock.mock.calls.filter(([, init]) => init?.method === 'POST')).toHaveLength(6));
  });

  it('resumes active session at server-backed current item step', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(json({ activeSession: session('RECALL'), latestSession: session('RECALL'), sessions: [session('RECALL')] }));
    renderPage();

    expect(await screen.findByRole('heading', { name: 'Output' })).toBeTruthy();
    expect(screen.queryByRole('heading', { name: 'Context' })).toBeNull();
  });

  it('renders truthful completion summary', async () => {
    const complete = { ...session('ASSESS'), completedAt: '2026-09-07T10:10:00.000Z', status: 'COMPLETED', items: [{ ...item('ASSESS'), recallResult: 'CORRECT', outputSentence: 'A reliable result.', reviewRating: 'GOOD' }] };
    const fetchMock = vi.mocked(fetch);
    fetchMock
      .mockResolvedValueOnce(json({ activeSession: complete, latestSession: complete, sessions: [complete] }));
    renderPage();

    await screen.findByRole('heading', { name: 'Session complete' });
    expect(screen.getByText('1 word reviewed')).toBeTruthy();
    expect(screen.getByText('1/1 recall correct')).toBeTruthy();
    expect(screen.getByText('1 production sentence')).toBeTruthy();
  });

  it('refetches active analytics after each session mutation', async () => {
    const fetchMock = vi.mocked(fetch);
    let dashboardCalls = 0;
    fetchMock.mockImplementation((input, init) => {
      const url = String(input);
      if (url.includes('/api/statistics/dashboard')) {
        dashboardCalls += 1;
        return json({ todayReviews: dashboardCalls });
      }
      if (url.endsWith('/api/learning/session') && init?.method === 'POST') return json(session());
      if (url.includes('/steps')) return json(item('CONTEXT'));
      if (url.includes('/complete')) return json({ ...session('ASSESS'), completedAt: '2026-09-07T10:10:00.000Z' });
      return json({ activeSession: null, latestSession: null, sessions: [] });
    });

    render(
      <MemoryRouter>
        <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
          <SessionMutationConsumer />
        </QueryClientProvider>
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByTestId('session-analytics').textContent).toBe('1'));
    fireEvent.click(screen.getByRole('button', { name: 'start mutation' }));
    await waitFor(() => expect(screen.getByTestId('session-analytics').textContent).toBe('2'));
    fireEvent.click(screen.getByRole('button', { name: 'submit mutation' }));
    await waitFor(() => expect(screen.getByTestId('session-analytics').textContent).toBe('3'));
    fireEvent.click(screen.getByRole('button', { name: 'complete mutation' }));
    await waitFor(() => expect(screen.getByTestId('session-analytics').textContent).toBe('4'));
    expect(dashboardCalls).toBe(4);
  });
});
