/**
 * @file GrammarLessonPage.test.tsx
 * @description Verifies answer feedback, retry identity, repeat practice, and tutor privacy behavior.
 */
import { act, fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { GrammarLessonPage } from '../src/pages/GrammarLessonPage';

const lessonId = 'grammar-a1-present-simple';
const exerciseId = 'grammar-a1-present-simple-exercise';
const lesson = {
  id: lessonId,
  title: 'Present simple',
  objective: 'Use the present simple for routines.',
  explanation: 'We use it for regular actions.',
  guide: {
    pattern: 'I/you/we/they + base verb; he/she/it + V-s/es.',
    whenToUse: ['Routines and general truths.'],
    signalWords: ['every day', 'usually'],
    check: ['After does, use the base form.'],
  },
  examples: [{ english: 'She walks to school.', vietnamese: 'Cô ấy đi bộ đến trường.' }],
  contrasts: [],
  commonMistakes: [],
  summary: 'Use the base form with I/you/we/they.',
  sources: [],
  exercises: [{ id: exerciseId, prompt: 'Choose the correct form.', options: [{ text: 'walk' }, { text: 'walks' }] }],
};
const initialProgress = { lessonId, revisionId: 'rev-1', revision: '1', lastPosition: 0, isComplete: false, completedAt: null, createdAt: '2026-01-01', updatedAt: '2026-01-01' };

function json(data: unknown, status = 200) {
  return Promise.resolve(new Response(JSON.stringify({ success: true, data }), { status, headers: { 'Content-Type': 'application/json' } }));
}

function renderPage() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return render(<QueryClientProvider client={queryClient}><MemoryRouter initialEntries={[`/grammar/${lessonId}`]}><Routes><Route path="/grammar/:lessonId" element={<GrammarLessonPage />} /></Routes></MemoryRouter></QueryClientProvider>);
}

describe('GrammarLessonPage', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('shows answer feedback before advancing and lets the learner repeat without resetting saved completion', async () => {
    const fetchMock = vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
      if (init?.method === 'POST') return json({
        attempt: { id: 'attempt-1', lessonId, revisionId: 'rev-1', revision: '1', exerciseId, requestId: 'request-1', answer: { type: 'choice', text: 'walks' }, isCorrect: true, feedback: 'Correct: use walks with she.', createdAt: '2026-01-02' },
        progress: { ...initialProgress, lastPosition: 1, isComplete: true, completedAt: '2026-01-02', updatedAt: '2026-01-02' },
        nextLessonId: null,
      });
      return json({ lesson, progress: initialProgress, nextLessonId: lessonId });
    });
    vi.stubGlobal('fetch', fetchMock);
    renderPage();

    const option = await screen.findByLabelText('walks');
    expect(fetchMock.mock.calls.some(([, init]) => init?.method === 'POST')).toBe(false);
    fireEvent.click(option);
    fireEvent.click(screen.getByRole('button', { name: 'Check answer' }));

    expect(await screen.findByText('Correct: use walks with she.')).toBeTruthy();
    expect(screen.getByText('Correct')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Continue to next exercise' }));
    expect(await screen.findByRole('heading', { name: 'Lesson complete' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Practice again' }));
    expect(await screen.findByLabelText('walks')).toBeTruthy();
    expect(fetchMock.mock.calls.filter(([, init]) => init?.method === 'POST')).toHaveLength(1);
  });

  it('reuses the same request ID when the learner retries a failed submission', async () => {
    let posts = 0;
    const requestIds: string[] = [];
    vi.stubGlobal('fetch', vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
      if (init?.method === 'POST') {
        posts += 1;
        requestIds.push(JSON.parse(String(init.body)).requestId);
        if (posts === 1) return Promise.reject(new Error('offline'));
        return json({ attempt: { id: 'a', lessonId, revisionId: 'rev-1', revision: '1', exerciseId, requestId: requestIds[1], answer: { type: 'choice', text: 'walks' }, isCorrect: true, feedback: 'Correct.', createdAt: '2026-01-02' }, progress: { ...initialProgress, lastPosition: 1, isComplete: true }, nextLessonId: null });
      }
      return json({ lesson, progress: initialProgress, nextLessonId: lessonId });
    }));
    renderPage();

    fireEvent.click(await screen.findByLabelText('walks'));
    fireEvent.click(screen.getByRole('button', { name: 'Check answer' }));
    fireEvent.click(await screen.findByRole('button', { name: 'Retry answer' }));

    await screen.findByText('Correct.');
    expect(posts).toBe(2);
    expect(requestIds[0]).toBe(requestIds[1]);
  });

  it('sends tutor questions only after submit and renders external tutor explanations', async () => {
    const fetchMock = vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
      if (String(input).includes('/tutor')) return json({ explanation: 'The -s ending marks third person singular.', contrast: 'She walks; they walk.' });
      return json({ lesson, progress: initialProgress, nextLessonId: lessonId });
    });
    vi.stubGlobal('fetch', fetchMock);
    renderPage();

    const question = await screen.findByRole('textbox', { name: 'Your question' });
    fireEvent.change(question, { target: { value: 'Why does she take -s?' } });
    expect(fetchMock.mock.calls.some(([url]) => String(url).includes('/tutor'))).toBe(false);
    fireEvent.click(screen.getByRole('button', { name: 'Ask tutor' }));

    expect(await screen.findByText('The -s ending marks third person singular.')).toBeTruthy();
    const tutorCall = fetchMock.mock.calls.find(([url]) => String(url).includes('/tutor'));
    expect(String(tutorCall?.[0])).toContain(`/api/grammar/${lessonId}/tutor`);
    expect(JSON.parse(String(tutorCall?.[1]?.body))).toEqual({ question: 'Why does she take -s?' });
    expect(screen.getByText(/external AI provider/i)).toBeTruthy();
    expect(question).toHaveProperty('value', 'Why does she take -s?');
  });

  it('keeps a tutor question after the provider returns an error', async () => {
    const fetchMock = vi.fn((input: RequestInfo | URL) => {
      if (String(input).includes('/tutor')) return json({ code: 'SERVICE_UNAVAILABLE', message: 'Unavailable' }, 503);
      return json({ lesson, progress: initialProgress, nextLessonId: lessonId });
    });
    vi.stubGlobal('fetch', fetchMock);
    renderPage();

    const question = await screen.findByRole('textbox', { name: 'Your question' });
    fireEvent.change(question, { target: { value: 'Why does she take -s?' } });
    fireEvent.click(screen.getByRole('button', { name: 'Ask tutor' }));

    expect((await screen.findByRole('alert')).textContent).toMatch(/temporarily unavailable/i);
    expect(question).toHaveProperty('value', 'Why does she take -s?');
    expect(fetchMock.mock.calls.filter(([url]) => String(url).includes('/answers'))).toHaveLength(0);
  });

  it.each(['resolved', 'pending'])('clears %s tutor state when moving to the next lesson', async (state) => {
    const nextLessonId = 'grammar-a1-past-simple';
    let resolveTutor!: (response: Response) => void;
    const tutorResponse = new Promise<Response>((resolve) => { resolveTutor = resolve; });
    vi.stubGlobal('fetch', vi.fn((input: RequestInfo | URL) => {
      if (String(input).includes('/tutor')) return tutorResponse;
      if (String(input).endsWith(nextLessonId)) return json({
        lesson: { ...lesson, id: nextLessonId, title: 'Past simple', exercises: [{ ...lesson.exercises[0], id: `${nextLessonId}-exercise` }] },
        progress: null, nextLessonId: null,
      });
      return json({ lesson, progress: { ...initialProgress, lastPosition: 1, isComplete: true }, nextLessonId });
    }));
    renderPage();

    const question = await screen.findByRole('textbox', { name: 'Your question' });
    fireEvent.change(question, { target: { value: 'Why does she take -s?' } });
    fireEvent.click(screen.getByRole('button', { name: 'Ask tutor' }));
    const answer = await json({ explanation: 'Present-simple tutor answer.', contrast: 'She walks; they walk.' });
    if (state === 'resolved') {
      await act(async () => { resolveTutor(answer); });
      await screen.findByText('Present-simple tutor answer.');
    } else {
      await screen.findByRole('button', { name: 'Asking tutor…' });
    }
    fireEvent.click(screen.getByRole('link', { name: 'Continue to next lesson' }));

    await screen.findByRole('heading', { name: 'Past simple' });
    expect(screen.getByRole('textbox', { name: 'Your question' })).toHaveProperty('value', '');
    if (state === 'pending') await act(async () => { resolveTutor(answer); });
    expect(screen.queryByText('Present-simple tutor answer.')).toBeNull();
    expect(screen.getByRole('button', { name: 'Ask tutor' })).toHaveProperty('disabled', true);
  });
});
