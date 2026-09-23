/**
 * @file LearningSessionPage.test.tsx
 * @description Tests server-cursor Learn flow, selector start, feedback, resume, and summary.
 */
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LearningSessionPage } from '../src/pages/LearningSessionPage';

const wordId = '11111111-1111-4111-8111-111111111111';
const baseItem = { id: 'item-1', sessionId: 'session-1', wordId, position: 0, groupIndex: 0, completedStep: null, recallResult: null, outputSentence: null, reviewRating: null, attempts: [], clozeSentence: 'The system needs to be ______.', word: { id: wordId, word: 'reliable', headword: 'reliable', definition: 'trusted', phonetic: '/r/', partOfSpeech: 'adjective', translation: 'đáng tin', contextSentence: 'A reliable system works.', examples: [], collocations: [] } };
function cursor(step: any, attemptNumber: 1 | 2 | null = null) { return { phase: step === 'CONTEXT' || step === 'UNDERSTAND' ? 'ENCODE' : 'RETRIEVE', groupIndex: 0, groupCount: 1, groupSize: 1, itemIndex: 0, sessionPosition: 0, step, itemId: 'item-1', wordId, attemptNumber }; }
function session(item = baseItem, step: any = 'CONTEXT') { return { id: 'session-1', mode: 'new_words', sessionType: 'new_words', totalWords: 1, startedAt: '2026-09-07T10:00:00.000Z', completedAt: null, status: 'IN_PROGRESS', cursor: cursor(step), items: [item] }; }
function envelope(data: unknown, success = true) { return new Response(JSON.stringify(success ? { success: true, data } : { success: false, error: { code: 'FAILED', message: 'Step failed' } }), { status: success ? 200 : 400, headers: { 'Content-Type': 'application/json' } }); }
const emptyOverview = { activeSession: null, latestSession: null, sessions: [] };
const emptyOptions = { contexts: [{ id: 'context-1', title: 'System Architecture', wordCount: 8 }], topics: [{ id: 'topic-1', name: 'Engineering', wordCount: 4 }], availability: { newWords: 0, weakWords: 0, dueWords: 0 } };
const backendSummary = { totalWords: 5, recallFirstTry: 1, recallSecondTry: 1, recallFailed: 1, outputValid: 2, outputInvalid: 2, legacyUnknown: 1 };
function renderPage() { return render(<MemoryRouter><QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } })}><LearningSessionPage /></QueryClientProvider></MemoryRouter>); }

function routeFetch(overrides: (url: URL, init: RequestInit) => Response | undefined = () => undefined) {
  return vi.fn((input: RequestInfo | URL, init: RequestInit = {}) => {
    const response = overrides(new URL(String(input)), init);
    if (response) return Promise.resolve(response);
    if (new URL(String(input)).pathname === '/api/learning/options') return Promise.resolve(envelope(emptyOptions));
    return Promise.resolve(envelope(emptyOverview));
  });
}

describe('LearningSessionPage', () => {
  beforeEach(() => vi.stubGlobal('fetch', routeFetch()));
  afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

  it('uses human-readable selectors and sends canonical start payload', async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockImplementation(routeFetch((url, init) => url.pathname === '/api/learning/session' && !init.method ? envelope(emptyOverview) : undefined));
    renderPage();
    await screen.findByRole('heading', { name: 'Start a learning session' });
    fireEvent.pointerDown(screen.getByRole('combobox', { name: 'Session mode' }), { button: 0, ctrlKey: false, pointerType: 'mouse' });
    fireEvent.click(screen.getByRole('option', { name: 'Context' }));
    expect(screen.getByText(/System Architecture/)).toBeTruthy();
    fireEvent.submit(screen.getByRole('button', { name: 'Start session' }).closest('form')!);
    expect(screen.getByText('Context is required for context mode.')).toBeTruthy();
    const contextSelect = screen.getByLabelText('Context');
    fireEvent.change(contextSelect, { target: { value: 'context-1' } });
    expect((contextSelect as HTMLSelectElement).value).toBe('context-1');
    fireEvent.submit(screen.getByRole('button', { name: 'Start session' }).closest('form')!);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(fetchMock.mock.calls.map(([, init]) => init?.method)).toContain('POST');
    const request = fetchMock.mock.calls.find(([, init]) => init?.method === 'POST' && String(init?.body).includes('contextId'));
    expect(JSON.parse(String(request?.[1]?.body))).toEqual({ mode: 'context', count: 10, contextId: 'context-1' });
  });

  it('disables start controls and preserves selections while start is pending', async () => {
    let resolveStart!: (response: Response) => void;
    vi.mocked(fetch).mockImplementation(routeFetch((url, init) => {
      if (url.pathname === '/api/learning/session' && init.method === 'POST') return new Promise<Response>((resolve) => { resolveStart = resolve; }) as never;
      return undefined;
    }));
    renderPage();
    await screen.findByRole('heading', { name: 'Start a learning session' });
    const count = screen.getByLabelText('Word count') as HTMLInputElement;
    fireEvent.change(count, { target: { value: '3' } });
    fireEvent.click(screen.getByRole('button', { name: 'Start session' }));
    await waitFor(() => expect((screen.getByRole('button', { name: 'Starting…' }) as HTMLButtonElement).disabled).toBe(true));
    expect(count.value).toBe('3');
    expect(count.disabled).toBe(true);
    resolveStart(envelope(session()));
  });

  it('renders the server cursor rather than deriving step from item fields', async () => {
    vi.mocked(fetch).mockImplementation(routeFetch((url, init) => url.pathname === '/api/learning/session' && !init.method ? envelope({ activeSession: session({ ...baseItem, completedStep: 'UNDERSTAND' }, 'OUTPUT'), latestSession: null, sessions: [] }) : undefined));
    renderPage();
    expect(await screen.findByRole('heading', { name: 'Output' })).toBeTruthy();
  });

  it('focuses the Recall answer when server cursor moves to attempt two', async () => {
    const fetchMock = vi.mocked(fetch);
    let attempt = 1;
    fetchMock.mockImplementation(routeFetch((url, init) => {
      if (url.pathname === '/api/learning/session' && !init.method) return envelope({ activeSession: session({ ...baseItem, completedStep: 'UNDERSTAND' }, 'RECALL'), latestSession: null, sessions: [] });
      if (url.pathname.endsWith('/step')) {
        attempt = 2;
        return envelope({ item: { ...baseItem, completedStep: null, word: baseItem.word }, cursor: cursor('RECALL', 2), feedback: { outcome: 'INCORRECT', attemptNumber: 1, canRetry: true, hint: { firstLetter: 'r', letterCount: 8 } } });
      }
      return undefined;
    }));
    renderPage();
    await screen.findByRole('heading', { name: 'Recall' });
    fireEvent.change(screen.getByLabelText('Recall answer'), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: 'Continue to Output' }));
    await waitFor(() => expect(attempt).toBe(2));
    await waitFor(() => expect(document.activeElement).toBe(screen.getByLabelText(/Recall answer/)));
  });

  it('shows options loading, error retry, and empty guidance without fake selectors', async () => {
    const fetchMock = vi.mocked(fetch);
    let optionsCalls = 0;
    fetchMock.mockImplementation(routeFetch((url, init) => {
      if (url.pathname === '/api/learning/options') {
        optionsCalls += 1;
        return optionsCalls === 1 ? Promise.reject(new Error('options unavailable')) as never : envelope({ contexts: [], topics: [], availability: { newWords: 0, weakWords: 0, dueWords: 0 } });
      }
      if (url.pathname === '/api/learning/session' && !init.method) return envelope(emptyOverview);
      return undefined;
    }));
    renderPage();
    expect(await screen.findByText('Could not load learning options.')).toBeTruthy();
    expect(screen.queryByText('System Architecture')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Retry options' }));
    expect(await screen.findByText('No words are available for this session yet.')).toBeTruthy();
    expect(optionsCalls).toBe(2);
  });

  it('sends request ID and answer, then renders server feedback without advancing twice', async () => {
    const fetchMock = vi.mocked(fetch);
    let postCount = 0;
    fetchMock.mockImplementation(routeFetch((url, init) => {
      if (url.pathname === '/api/learning/session' && !init.method) return envelope({ activeSession: session({ ...baseItem, completedStep: 'UNDERSTAND' }, 'RECALL'), latestSession: null, sessions: [] });
      if (init.method === 'POST') {
        postCount += 1;
        return envelope({ item: { ...baseItem, completedStep: null, attempts: [{ id: 'a1', sessionItemId: 'item-1', type: 'RECALL', attemptNumber: 1, answer: 'wrong', result: 'INCORRECT', performanceScore: 0 }], feedback: { outcome: 'INCORRECT', attemptNumber: 1, canRetry: true, hint: { firstLetter: 'r', letterCount: 8 } }, word: baseItem.word }, cursor: cursor('RECALL', 2), feedback: { outcome: 'INCORRECT', attemptNumber: 1, canRetry: true, hint: { firstLetter: 'r', letterCount: 8 } } });
      }
      return undefined;
    }));
    renderPage();
    await screen.findByRole('heading', { name: 'Recall' });
    fireEvent.change(screen.getByLabelText('Recall answer'), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: 'Continue to Output' }));
    await waitFor(() => expect(postCount).toBe(1));
    const request = fetchMock.mock.calls.find(([input, init]) => new URL(String(input)).pathname.endsWith('/step') && init?.method === 'POST');
    expect(JSON.parse(String(request?.[1]?.body))).toMatchObject({ wordId, step: 'RECALL', answer: 'wrong', requestId: expect.any(String) });
    expect(screen.getByText(/First letter: r/)).toBeTruthy();
    expect(screen.getByText(/Attempt 2 of 2/)).toBeTruthy();
  });

  it('does not carry recall feedback into another item', async () => {
    const secondWordId = '22222222-2222-4222-8222-222222222222';
    const secondItem = { ...baseItem, id: 'item-2', wordId: secondWordId, position: 1, word: { ...baseItem.word, id: secondWordId, word: 'durable', headword: 'durable' } };
    vi.mocked(fetch).mockImplementation(routeFetch((url, init) => {
      if (url.pathname === '/api/learning/session' && !init.method) return envelope({ activeSession: { ...session({ ...baseItem, completedStep: 'UNDERSTAND' }, 'RECALL'), totalWords: 2, items: [baseItem, secondItem] }, latestSession: null, sessions: [] });
      if (url.pathname.endsWith('/step')) return envelope({
        item: { ...baseItem, completedStep: 'RECALL', word: baseItem.word },
        cursor: { ...cursor('OUTPUT'), itemId: secondItem.id, wordId: secondWordId, itemIndex: 1, sessionPosition: 1 },
        feedback: { outcome: 'CORRECT', attemptNumber: 1, canRetry: false },
      });
      return undefined;
    }));
    renderPage();
    await screen.findByRole('heading', { name: 'Recall' });
    fireEvent.change(screen.getByLabelText('Recall answer'), { target: { value: 'reliable' } });
    fireEvent.click(screen.getByRole('button', { name: 'Continue to Output' }));
    await screen.findByRole('heading', { name: 'Output' });
    expect(screen.queryByText('Recall result: Correct')).toBeNull();
  });

  it('uses distinct request IDs for recall attempts while reusing retry ID', async () => {
    const fetchMock = vi.mocked(fetch);
    let recallPosts = 0;
    fetchMock.mockImplementation(routeFetch((url, init) => {
      if (url.pathname === '/api/learning/session' && !init.method) return envelope({ activeSession: session({ ...baseItem, completedStep: 'UNDERSTAND' }, 'RECALL'), latestSession: null, sessions: [] });
      if (url.pathname.endsWith('/step')) {
        recallPosts += 1;
        const body = JSON.parse(String(init.body));
        return envelope({ item: { ...baseItem, completedStep: recallPosts > 1 ? 'RECALL' : 'UNDERSTAND', attempts: [{ id: `a${recallPosts}`, sessionItemId: 'item-1', type: 'RECALL', attemptNumber: recallPosts as 1 | 2, answer: body.answer, result: recallPosts > 1 ? 'CORRECT_AFTER_HINT' : 'INCORRECT', performanceScore: recallPosts > 1 ? 70 : 0 }], word: baseItem.word }, cursor: cursor(recallPosts > 1 ? 'OUTPUT' : 'RECALL', recallPosts > 1 ? 1 : 2), feedback: { outcome: recallPosts > 1 ? 'CORRECT_AFTER_HINT' : 'INCORRECT', attemptNumber: recallPosts as 1 | 2, canRetry: recallPosts === 1, hint: recallPosts === 1 ? { firstLetter: 'r', letterCount: 8 } : undefined } });
      }
      return undefined;
    }));
    renderPage();
    await screen.findByRole('heading', { name: 'Recall' });
    fireEvent.change(screen.getByLabelText('Recall answer'), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: 'Continue to Output' }));
    await waitFor(() => expect(recallPosts).toBe(1));
    fireEvent.change(screen.getByLabelText(/Recall answer/), { target: { value: 'reliable' } });
    fireEvent.click(screen.getByRole('button', { name: 'Continue to Output' }));
    await waitFor(() => expect(recallPosts).toBe(2));
    const requests = fetchMock.mock.calls.filter(([input, init]) => new URL(String(input)).pathname.endsWith('/step')).map(([, init]) => JSON.parse(String(init?.body)).requestId);
    expect(requests[0]).not.toBe(requests[1]);
  });

  it('retries a failed action with the same request ID and preserves the answer', async () => {
    const fetchMock = vi.mocked(fetch);
    let actionCalls = 0;
    fetchMock.mockImplementation(routeFetch((url, init) => {
      if (url.pathname === '/api/learning/session' && !init.method) return envelope({ activeSession: session({ ...baseItem, completedStep: 'UNDERSTAND' }, 'RECALL'), latestSession: null, sessions: [] });
      if (url.pathname.endsWith('/step')) {
        actionCalls += 1;
        return actionCalls === 1 ? Promise.reject(new Error('network unavailable')) as never : envelope({ item: { ...baseItem, completedStep: 'RECALL', word: baseItem.word }, cursor: cursor('OUTPUT', 1), feedback: { outcome: 'CORRECT', attemptNumber: 1, canRetry: false } });
      }
      return undefined;
    }));
    renderPage();
    await screen.findByRole('heading', { name: 'Recall' });
    fireEvent.change(screen.getByLabelText(/Recall answer/), { target: { value: 'reliable' } });
    fireEvent.click(screen.getByRole('button', { name: 'Continue to Output' }));
    await waitFor(() => expect(screen.getByRole('alert').textContent).toContain('Something went wrong'));
    expect((screen.getByLabelText(/Recall answer/) as HTMLInputElement).value).toBe('reliable');
    fireEvent.click(screen.getByRole('button', { name: 'Continue to Output' }));
    await waitFor(() => expect(actionCalls).toBe(2));
    const requestIds = fetchMock.mock.calls.filter(([input, init]) => new URL(String(input)).pathname.endsWith('/step')).map(([, init]) => JSON.parse(String(init?.body)).requestId);
    expect(requestIds[0]).toBe(requestIds[1]);
  });

  it('renders localized output feedback codes and attempt two after invalid output', async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockImplementation(routeFetch((url, init) => {
      if (url.pathname === '/api/learning/session' && !init.method) return envelope({ activeSession: session({ ...baseItem, completedStep: 'RECALL' }, 'OUTPUT'), latestSession: null, sessions: [] });
      if (url.pathname.endsWith('/step')) return envelope({ item: { ...baseItem, completedStep: 'RECALL', word: baseItem.word }, cursor: cursor('OUTPUT', 2), feedback: { outcome: 'INVALID', attemptNumber: 1, canRetry: true, codes: ['EMPTY', 'TOO_SHORT', 'TARGET_MISSING'] } });
      return undefined;
    }));
    renderPage();
    await screen.findByRole('heading', { name: 'Output' });
    fireEvent.change(screen.getByLabelText('Your sentence'), { target: { value: 'not enough' } });
    fireEvent.click(screen.getByRole('button', { name: 'Continue to Assess' }));
    await waitFor(() => expect(fetchMock.mock.calls.some(([, init]) => init?.method === 'POST')).toBe(true));
    expect(screen.getByText(/Empty/)).toBeTruthy();
    expect(screen.getByText(/Attempt 2 of 2/)).toBeTruthy();
  });

  it('submits one assessment when a rating shortcut is pressed', async () => {
    const fetchMock = vi.mocked(fetch);
    let postCount = 0;
    fetchMock.mockImplementation(routeFetch((url, init) => {
      if (url.pathname === '/api/learning/session' && !init.method) return envelope({ activeSession: session({ ...baseItem, completedStep: 'OUTPUT' }, 'ASSESS'), latestSession: null, sessions: [] });
      if (init.method === 'POST') {
        postCount += 1;
        return envelope({ item: { ...baseItem, completedStep: 'OUTPUT', reviewRating: null, word: baseItem.word }, cursor: cursor('ASSESS'), feedback: null });
      }
      return undefined;
    }));
    renderPage();
    await screen.findByRole('heading', { name: 'Assess' });
    expect(screen.queryByRole('textbox')).toBeNull();
    expect(screen.getByRole('button', { name: '1. Again' })).toBeTruthy();
    expect(screen.getByRole('button', { name: '4. Easy' })).toBeTruthy();
    fireEvent.keyDown(screen.getByLabelText('Assessment controls'), { key: '1' });
    await waitFor(() => expect(postCount).toBe(1));
  });

  it('renders each backend summary category separately', async () => {
    const completed = { ...session(baseItem, 'COMPLETE'), status: 'COMPLETED', completedAt: '2026-09-07T10:10:00.000Z', summary: backendSummary };
    vi.mocked(fetch).mockResolvedValueOnce(envelope({ activeSession: completed, latestSession: completed, sessions: [completed] }));
    renderPage();
    await screen.findByRole('heading', { name: 'Session complete' });
    expect(screen.getByText('Recall first try')).toBeTruthy();
    expect(screen.getAllByText('1').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Recall second try')).toBeTruthy();
    expect(screen.getByText('Recall failed')).toBeTruthy();
    expect(screen.getByText('Output valid')).toBeTruthy();
    expect(screen.getByText('Output invalid')).toBeTruthy();
    expect(screen.getByText('Legacy detail unavailable')).toBeTruthy();
    expect(screen.getAllByText('2')).toHaveLength(2);
  });

  it('focuses the Output textarea when the server cursor transitions from Recall', async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockImplementation(routeFetch((url, init) => {
      if (url.pathname === '/api/learning/session' && !init.method) return envelope({ activeSession: session({ ...baseItem, completedStep: 'UNDERSTAND' }, 'RECALL'), latestSession: null, sessions: [] });
      if (url.pathname.endsWith('/step')) return envelope({ item: { ...baseItem, completedStep: 'RECALL', word: baseItem.word }, cursor: cursor('OUTPUT'), feedback: { outcome: 'CORRECT', attemptNumber: 1, canRetry: false } });
      return undefined;
    }));
    renderPage();
    await screen.findByRole('heading', { name: 'Recall' });
    fireEvent.change(screen.getByLabelText('Recall answer'), { target: { value: 'reliable' } });
    fireEvent.click(screen.getByRole('button', { name: 'Continue to Output' }));
    expect(await screen.findByText('Recall result: Correct')).toBeTruthy();
    await waitFor(() => expect(document.activeElement).toBe(screen.getByLabelText('Your sentence')));
  });

  it('scrolls focused Output textarea above mobile action', async () => {
    const originalScrollIntoView = HTMLElement.prototype.scrollIntoView;
    const scrollIntoView = vi.fn();
    HTMLElement.prototype.scrollIntoView = scrollIntoView;
    try {
      vi.mocked(fetch).mockImplementation(routeFetch((url, init) => url.pathname === '/api/learning/session' && !init.method ? envelope({ activeSession: session({ ...baseItem, completedStep: 'RECALL' }, 'OUTPUT'), latestSession: null, sessions: [] }) : undefined));
      renderPage();
      await screen.findByRole('heading', { name: 'Output' });
      await waitFor(() => expect(scrollIntoView).toHaveBeenCalledWith({ block: 'start', inline: 'nearest' }));
    } finally {
      HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
    }
  });

  it('keeps the Output action sticky with mobile-safe form spacing', async () => {
    vi.mocked(fetch).mockImplementation(routeFetch((url, init) => url.pathname === '/api/learning/session' && !init.method ? envelope({ activeSession: session({ ...baseItem, completedStep: 'RECALL' }, 'OUTPUT'), latestSession: null, sessions: [] }) : undefined));
    renderPage();
    await screen.findByRole('heading', { name: 'Output' });
    const textarea = screen.getByLabelText('Your sentence');
    const form = textarea.closest('form');
    const action = screen.getByRole('button', { name: 'Continue to Assess' }).parentElement;
    expect(form?.className).toContain('pb-24');
    expect(action?.className).toContain('sticky');
    expect(action?.className).toContain('bottom-[65px]');
    expect(action?.className).toContain('env(safe-area-inset-bottom)');
  });

  it('submits Output once for Ctrl+Enter and Meta+Enter', async () => {
    const fetchMock = vi.mocked(fetch);
    let postCount = 0;
    fetchMock.mockImplementation(routeFetch((url, init) => {
      if (url.pathname === '/api/learning/session' && !init.method) return envelope({ activeSession: session({ ...baseItem, completedStep: 'RECALL' }, 'OUTPUT'), latestSession: null, sessions: [] });
      if (init.method === 'POST') {
        postCount += 1;
        return envelope({ item: { ...baseItem, completedStep: 'OUTPUT', outputSentence: 'A reliable system works.', word: baseItem.word }, cursor: cursor('OUTPUT'), feedback: { outcome: 'VALID', attemptNumber: 1, canRetry: false } });
      }
      return undefined;
    }));
    renderPage();
    await screen.findByRole('heading', { name: 'Output' });
    const textarea = screen.getByLabelText('Your sentence');
    fireEvent.change(textarea, { target: { value: 'A reliable system works.' } });
    fireEvent.keyDown(textarea, { key: 'Enter', ctrlKey: true });
    await waitFor(() => expect(postCount).toBe(1));
    fireEvent.keyDown(textarea, { key: 'Enter', metaKey: true });
    await waitFor(() => expect(postCount).toBe(2));
  });

  it('focuses the heading on ordinary non-input steps', async () => {
    vi.mocked(fetch).mockImplementation(routeFetch((url, init) => url.pathname === '/api/learning/session' && !init.method ? envelope({ activeSession: session(), latestSession: null, sessions: [] }) : undefined));
    renderPage();
    const heading = await screen.findByRole('heading', { name: 'Context' });
    await waitFor(() => expect(document.activeElement).toBe(heading));
  });

  it('renders the complete backend summary after the Assess action completes the session', async () => {
    const fetchMock = vi.mocked(fetch);
    let completeCalls = 0;
    const completed = { ...session(baseItem, 'COMPLETE'), status: 'COMPLETED', completedAt: '2026-09-07T10:10:00.000Z', summary: backendSummary };
    fetchMock.mockImplementation(routeFetch((url, init) => {
      if (url.pathname === '/api/learning/session' && !init.method) return envelope({ activeSession: session({ ...baseItem, completedStep: 'OUTPUT' }, 'ASSESS'), latestSession: null, sessions: [] });
      if (url.pathname.endsWith('/step')) return envelope({ item: { ...baseItem, completedStep: 'ASSESS', reviewRating: 'GOOD', word: baseItem.word }, cursor: cursor('COMPLETE'), feedback: null });
      if (url.pathname.endsWith('/complete')) {
        completeCalls += 1;
        return envelope(completed);
      }
      return undefined;
    }));
    renderPage();
    await screen.findByRole('heading', { name: 'Assess' });
    fireEvent.click(screen.getByRole('button', { name: '3. Good' }));
    await waitFor(() => expect(completeCalls).toBe(1));
    expect(await screen.findByRole('heading', { name: 'Session complete' })).toBeTruthy();
    const summarySection = screen.getByRole('heading', { name: 'Session complete' }).closest('section');
    expect(summarySection).toBeTruthy();
    const summary = within(summarySection!);
    for (const [label, count] of [['Recall first try', '1'], ['Recall second try', '1'], ['Recall failed', '1'], ['Output valid', '2'], ['Output invalid', '2'], ['Legacy detail unavailable', '1']]) {
      const stat = summary.getByText(label).closest('div');
      expect(stat).toBeTruthy();
      expect(within(stat!).getByText(count)).toBeTruthy();
    }
  });

  it('keeps the current answer and disables step controls while action is pending', async () => {
    let resolveAction!: (response: Response) => void;
    vi.mocked(fetch).mockImplementation(routeFetch((url, init) => {
      if (url.pathname === '/api/learning/session' && !init.method) return envelope({ activeSession: session({ ...baseItem, completedStep: 'UNDERSTAND' }, 'RECALL'), latestSession: null, sessions: [] });
      if (url.pathname.endsWith('/step')) return new Promise<Response>((resolve) => { resolveAction = resolve; }) as never;
      return undefined;
    }));
    renderPage();
    await screen.findByRole('heading', { name: 'Recall' });
    const answer = screen.getByLabelText('Recall answer');
    fireEvent.change(answer, { target: { value: 'reliable' } });
    fireEvent.click(screen.getByRole('button', { name: 'Continue to Output' }));
    await waitFor(() => expect((answer as HTMLInputElement).disabled).toBe(true));
    expect((answer as HTMLInputElement).value).toBe('reliable');
    expect((screen.getByRole('button', { name: 'Saving…' }) as HTMLButtonElement).disabled).toBe(true);
    expect(screen.getByRole('heading', { name: 'Recall' })).toBeTruthy();
    resolveAction(envelope({ item: baseItem, cursor: cursor('OUTPUT'), feedback: null }));
  });

  it('shows normal enabled actions after Context and Understand mutations resolve', async () => {
    let step: 'CONTEXT' | 'UNDERSTAND' = 'CONTEXT';
    vi.mocked(fetch).mockImplementation(routeFetch((url, init) => {
      if (url.pathname === '/api/learning/session' && !init.method) return envelope({ activeSession: session(baseItem, step), latestSession: null, sessions: [] });
      if (url.pathname.endsWith('/step')) {
        if (step === 'CONTEXT') {
          step = 'UNDERSTAND';
          return envelope({ item: { ...baseItem, completedStep: 'CONTEXT' }, cursor: cursor('UNDERSTAND'), feedback: null });
        }
        return envelope({ item: { ...baseItem, completedStep: 'UNDERSTAND' }, cursor: cursor('RECALL', 1), feedback: null });
      }
      return undefined;
    }));
    renderPage();
    await screen.findByRole('heading', { name: 'Context' });
    fireEvent.click(screen.getByRole('button', { name: 'Continue to Understand' }));
    const understandButton = await screen.findByRole('button', { name: 'Continue to Recall' });
    expect((understandButton as HTMLButtonElement).disabled).toBe(false);
    expect(screen.queryByRole('button', { name: 'Saving…' })).toBeNull();
    fireEvent.click(understandButton);
    const recallButton = await screen.findByRole('button', { name: 'Continue to Output' });
    expect((recallButton as HTMLButtonElement).disabled).toBe(true);
    expect(screen.queryByRole('button', { name: 'Saving…' })).toBeNull();
  });

  it('keeps Recall validation disabled without mislabeling it as pending', async () => {
    vi.mocked(fetch).mockImplementation(routeFetch((url, init) => url.pathname === '/api/learning/session' && !init.method ? envelope({ activeSession: session({ ...baseItem, completedStep: 'UNDERSTAND' }, 'RECALL'), latestSession: null, sessions: [] }) : undefined));
    renderPage();
    await screen.findByRole('heading', { name: 'Recall' });
    const button = screen.getByRole('button', { name: 'Continue to Output' });
    expect((button as HTMLButtonElement).disabled).toBe(true);
    expect(screen.queryByRole('button', { name: 'Saving…' })).toBeNull();
  });

  it('shows pending only during Recall request and normal Output validation state after resolve', async () => {
    let resolveAction!: (response: Response) => void;
    vi.mocked(fetch).mockImplementation(routeFetch((url, init) => {
      if (url.pathname === '/api/learning/session' && !init.method) return envelope({ activeSession: session({ ...baseItem, completedStep: 'UNDERSTAND' }, 'RECALL'), latestSession: null, sessions: [] });
      if (url.pathname.endsWith('/step')) return new Promise<Response>((resolve) => { resolveAction = resolve; }) as never;
      return undefined;
    }));
    renderPage();
    await screen.findByRole('heading', { name: 'Recall' });
    fireEvent.change(screen.getByLabelText('Recall answer'), { target: { value: 'reliable' } });
    fireEvent.click(screen.getByRole('button', { name: 'Continue to Output' }));
    expect(await screen.findByRole('button', { name: 'Saving…' })).toBeTruthy();
    resolveAction(envelope({ item: { ...baseItem, completedStep: 'RECALL' }, cursor: cursor('OUTPUT'), feedback: null }));
    await screen.findByRole('heading', { name: 'Output' });
    const outputButton = screen.getByRole('button', { name: 'Continue to Assess' });
    expect((outputButton as HTMLButtonElement).disabled).toBe(true);
    expect(screen.queryByRole('button', { name: 'Saving…' })).toBeNull();
    fireEvent.change(screen.getByLabelText('Your sentence'), { target: { value: 'A reliable system works.' } });
    fireEvent.click(screen.getByRole('button', { name: 'Continue to Assess' }));
    expect(await screen.findByRole('button', { name: 'Saving…' })).toBeTruthy();
    resolveAction(envelope({ item: { ...baseItem, completedStep: 'OUTPUT', outputSentence: 'A reliable system works.' }, cursor: cursor('ASSESS'), feedback: null }));
    expect(await screen.findByRole('heading', { name: 'Assess' })).toBeTruthy();
  });
});
