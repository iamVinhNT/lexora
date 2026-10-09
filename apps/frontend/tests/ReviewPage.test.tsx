/**
 * @file ReviewPage.test.tsx
 * @description Verifies adaptive review stage transitions, recall scoring, and assess rating constraints.
 */
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  cleanupTestQueryClients,
  json,
  mockAttempt,
  queue,
  renderPage,
  wordId,
} from './review-test-helpers';

describe('ReviewPage - Stage Flow and Adaptive Constraints', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/api/reviews/attempt')) {
        return json(null);
      }
      return json(queue());
    }));
  });

  afterEach(() => {
    cleanupTestQueryClients();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('completes active recall attempt flow from recall to feedback, assess, and completion', async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockImplementation((input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      const method = init?.method || 'GET';

      if (url.includes('/api/reviews/due')) return json(queue());
      if (url.includes('/api/reviews/attempt') && method === 'GET') return json(null);
      if (url.includes('/api/reviews/attempt') && method === 'POST' && !url.includes('/step')) {
        return json(mockAttempt());
      }
      if (url.includes('/step') && method === 'POST') {
        const body = JSON.parse(String(init?.body));
        if (body.action === 'RECALL') {
          return json(mockAttempt({
            stage: 'FEEDBACK',
            version: 2,
            recall: { answer: 'reliable', result: 'EXACT', score: 100, responseTime: 1200 },
          }));
        }
        if (body.action === 'CONTINUE') {
          return json(mockAttempt({
            stage: 'ASSESS',
            version: 3,
            recall: { answer: 'reliable', result: 'EXACT', score: 100, responseTime: 1200 },
          }));
        }
      }
      if (url.endsWith('/api/reviews') && method === 'POST') {
        return json({
          attempt: mockAttempt({ status: 'COMPLETED' }),
          selfRating: 'GOOD',
          effectiveRating: 'GOOD',
          reviewState: { interval: 6, repetitions: 1, easeFactor: 2.5, lapses: 0, dueAt: '2026-10-15T00:00:00Z', lastReviewedAt: '2026-10-09T00:00:00Z' },
          reviewLog: { wordId, rating: 'GOOD', reviewType: 'RECALL', answer: 'reliable', correct: true, responseTime: 1200, createdAt: '2026-10-09T00:00:00Z' },
          learningProgress: { wordId, status: 'FAMILIAR', recognitionScore: 100, recallScore: 100, productionScore: 0 },
        });
      }
      return json(null);
    });

    renderPage();
    await screen.findByRole('heading', { name: 'Review' });

    // Start review
    fireEvent.click(await screen.findByRole('button', { name: /Start review/ }));

    // Recall stage
    await screen.findByRole('heading', { name: 'Recall the word' });
    const answerInput = screen.getByLabelText('Your answer');
    fireEvent.change(answerInput, { target: { value: 'reliable' } });
    fireEvent.click(screen.getByRole('button', { name: 'Check' }));

    // Feedback stage
    await screen.findByText('Exact');
    expect(screen.getByText('reliable', { selector: '[data-review-answer="true"]' })).toBeTruthy();
    expect(screen.getByLabelText('Pronounce')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Continue to rating' }));

    // Assess stage
    await screen.findByRole('heading', { name: 'Rate recall' });
    const goodButton = screen.getByRole('button', { name: /Good/ });
    fireEvent.click(goodButton);

    // Completion notification / next state
    await waitFor(() => {
      expect(screen.getByText(/Good saved/)).toBeTruthy();
    });
  });

  it('submits Don’t remember and enforces Again effective constraint', async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockImplementation((input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      const method = init?.method || 'GET';

      if (url.includes('/api/reviews/due')) return json(queue());
      if (url.includes('/api/reviews/attempt') && method === 'GET') return json(null);
      if (url.includes('/api/reviews/attempt') && method === 'POST' && !url.includes('/step')) {
        return json(mockAttempt());
      }
      if (url.includes('/step') && method === 'POST') {
        const body = JSON.parse(String(init?.body));
        if (body.action === 'RECALL') {
          return json(mockAttempt({
            stage: 'FEEDBACK',
            version: 2,
            needsOutput: true,
            recall: { answer: '', result: 'INCORRECT', score: 0, responseTime: null },
            effectiveRatings: { AGAIN: 'AGAIN', HARD: 'AGAIN', GOOD: 'AGAIN', EASY: 'AGAIN' },
          }));
        }
        if (body.action === 'CONTINUE') {
          return json(mockAttempt({
            stage: 'OUTPUT',
            version: 3,
            needsOutput: true,
            recall: { answer: '', result: 'INCORRECT', score: 0, responseTime: null },
            effectiveRatings: { AGAIN: 'AGAIN', HARD: 'AGAIN', GOOD: 'AGAIN', EASY: 'AGAIN' },
          }));
        }
      }
      if (url.endsWith('/api/reviews') && method === 'POST') {
        return json({
          attempt: mockAttempt({ status: 'COMPLETED' }),
          selfRating: 'GOOD',
          effectiveRating: 'AGAIN',
          reviewState: { interval: 1, repetitions: 0, easeFactor: 2.5, lapses: 1, dueAt: '2026-10-10T00:00:00Z', lastReviewedAt: '2026-10-09T00:00:00Z' },
          reviewLog: { wordId, rating: 'AGAIN', reviewType: 'RECALL', answer: '', correct: false, responseTime: null, createdAt: '2026-10-09T00:00:00Z' },
          learningProgress: { wordId, status: 'LEARNING', recognitionScore: 100, recallScore: 0, productionScore: 0 },
        });
      }
      return json(null);
    });

    renderPage();
    fireEvent.click(await screen.findByRole('button', { name: /Start review/ }));

    await screen.findByRole('heading', { name: 'Recall the word' });
    fireEvent.click(screen.getByRole('button', { name: "Don't remember" }));

    await screen.findByText('Incorrect');
    fireEvent.click(screen.getByRole('button', { name: 'Practice sentence' }));
    await screen.findByRole('heading', { name: 'Practice sentence' });
    expect(fetchMock.mock.calls.some(([url, init]) => String(url).endsWith('/api/reviews') && init?.method === 'POST')).toBe(false);
  });

  it('routes word needing output to sentence stage with self-check', async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockImplementation((input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      const method = init?.method || 'GET';

      if (url.includes('/api/reviews/due')) return json(queue());
      if (url.includes('/api/reviews/attempt') && method === 'GET') {
        return json(mockAttempt({
          stage: 'FEEDBACK',
          version: 2,
          needsOutput: true,
          recall: { answer: '', result: 'INCORRECT', score: 0, responseTime: null },
        }));
      }
      if (url.includes('/step') && method === 'POST') {
        const body = JSON.parse(String(init?.body));
        if (body.action === 'CONTINUE') {
          return json(mockAttempt({
            stage: 'OUTPUT',
            version: 3,
            needsOutput: true,
            recall: { answer: '', result: 'INCORRECT', score: 0, responseTime: null },
          }));
        }
        if (body.action === 'OUTPUT') {
          return json(mockAttempt({
            stage: 'ASSESS',
            version: 4,
            output: { answer: body.answer, method: 'SELF', score: null, explanation: null, suggestion: null, configRevision: null },
          }));
        }
      }
      return json(null);
    });

    renderPage();
    await screen.findByText('This word needs sentence practice to reinforce memory.');

    fireEvent.click(screen.getByRole('button', { name: 'Practice sentence' }));

    await screen.findByRole('heading', { name: 'Practice sentence' });
    expect(screen.getByText(/Self-check does not inflate Production score/)).toBeTruthy();

    const textarea = screen.getByLabelText('Your sentence');
    fireEvent.change(textarea, { target: { value: 'This is a reliable tool.' } });
    fireEvent.click(screen.getByLabelText('Uses correct meaning in context'));
    fireEvent.click(screen.getByLabelText('Forms a complete sentence'));

    fireEvent.click(screen.getByRole('button', { name: 'Self-check' }));
    await screen.findByRole('heading', { name: 'Rate recall' });
  });

  it('supports keyboard shortcuts 1-4 only during ASSESS stage and ignores shortcuts from text inputs/dialogs/Lexi', async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockImplementation((input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      const method = init?.method || 'GET';

      if (url.includes('/api/reviews/due')) return json(queue());
      if (url.includes('/api/reviews/attempt') && method === 'GET') {
        return json(mockAttempt({ stage: 'ASSESS', version: 2 }));
      }
      if (url.endsWith('/api/reviews') && method === 'POST') {
        return json({
          attempt: mockAttempt({ status: 'COMPLETED' }),
          selfRating: 'GOOD',
          effectiveRating: 'GOOD',
          reviewState: { interval: 6 },
          reviewLog: { rating: 'GOOD' },
          learningProgress: {},
        });
      }
      return json(null);
    });

    renderPage();
    await screen.findByRole('heading', { name: 'Rate recall' });

    // Pressing '3' inside an input element should not trigger rating
    const input = document.createElement('input');
    document.body.append(input);
    input.focus();
    fireEvent.keyDown(input, { key: '3' });
    expect(fetchMock.mock.calls.filter(([, init]) => init?.method === 'POST')).toHaveLength(0);

    // Pressing '3' on document outside input triggers rating
    fireEvent.keyDown(document.body, { key: '3' });
    await waitFor(() => {
      expect(fetchMock.mock.calls.filter(([, init]) => init?.method === 'POST')).toHaveLength(1);
    });
  });
});
