/**
 * @file LearningReview.i18n.test.tsx
 * @description Verifies Vietnamese learning-session and review presentation while preserving API values.
 */
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { LearningSessionPage } from '../src/pages/LearningSessionPage';
import { ReviewPage } from '../src/pages/ReviewPage';
import { i18n } from '../src/i18n/config';
import { resources } from '../src/i18n/resources';
import { SessionStartForm } from '../src/components/learning/SessionStartForm';
import { SessionSummary } from '../src/components/learning/SessionSummary';

const wordId = '11111111-1111-4111-8111-111111111111';

function envelope(data: unknown) {
  return new Response(JSON.stringify({ success: true, data }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}

function renderPage(page: 'learning' | 'review') {
  return render(<QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}><MemoryRouter>{page === 'learning' ? <LearningSessionPage /> : <ReviewPage />}</MemoryRouter></QueryClientProvider>);
}

function reviewQueue() {
  return {
    items: [{
      id: 'review-1', wordId, word: { id: wordId, word: 'reliable', definition: 'Able to be trusted.', translation: 'đáng tin cậy' },
      reviewState: { interval: 0, repetitions: 0, lapses: 0 }, learningProgress: { status: 'NEW' },
      examples: [], contexts: [], contextSentence: 'A reliable system earns trust.',
      exercisePrompts: { RECALL: { prompt: 'đáng tin cậy', answer: 'reliable' }, CLOZE: { prompt: 'A ______ system earns trust.' } },
      intervalPreviews: { AGAIN: '1d', HARD: '1d', GOOD: '1d', EASY: '4d' },
    }],
    counts: { new: 1, learning: 0, familiar: 0, mastered: 0, maintenance: 0, total: 1 }, total: 1,
  };
}

function latestSession(totalWords: number) {
  return { id: `session-${totalWords}`, totalWords, startedAt: '2026-09-12T00:00:00.000Z', items: [] };
}

function summarySession(totalWords: number, productionSentences: number) {
  return { ...latestSession(totalWords), summary: { totalWords, recallFirstTry: totalWords, outputValid: productionSentences } };
}

describe('Learning and review i18n', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('vi');
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('localizes learning-session start controls', async () => {
    vi.stubGlobal('fetch', vi.fn((input: RequestInfo | URL) => Promise.resolve(input.toString().includes('/api/learning/options') ? envelope({ contexts: [{ id: 'context-1', title: 'Hệ thống', wordCount: 1 }], topics: [], availability: { newWords: 1, weakWords: 0, dueWords: 0 } }) : envelope({ activeSession: null, latestSession: null, sessions: [] }))));
    renderPage('learning');

    await waitFor(() => expect(screen.getByRole('heading', { name: 'Bắt đầu phiên học' })).toBeTruthy());
    expect(screen.getByLabelText('Chế độ học')).toBeTruthy();
    expect(screen.getByLabelText('Số từ')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Bắt đầu phiên' })).toBeTruthy();
  });

  it('routes latest-session plural copy through i18next count', async () => {
    expect(resources.en.learning).toHaveProperty('latestSession_one');
    expect(resources.en.learning).toHaveProperty('latestSession_other');
    expect(resources.en.learning).not.toHaveProperty('latestSession');

    await i18n.changeLanguage('en');
    const { rerender } = render(<SessionStartForm isPending={false} onSubmit={vi.fn()} latestSession={latestSession(1)} options={{ contexts: [], topics: [], availability: { newWords: 1, weakWords: 0, dueWords: 0 } }} />);
    expect(screen.getByText(/Latest session: 1 word on/)).toBeTruthy();

    rerender(<SessionStartForm isPending={false} onSubmit={vi.fn()} latestSession={latestSession(2)} options={{ contexts: [], topics: [], availability: { newWords: 1, weakWords: 0, dueWords: 0 } }} />);
    expect(screen.getByText(/Latest session: 2 words on/)).toBeTruthy();
  });

  it('routes session-summary plural copy through i18next count', async () => {
    expect(resources.en.learning).toHaveProperty('wordsReviewedValue_one');
    expect(resources.en.learning).toHaveProperty('wordsReviewedValue_other');
    expect(resources.en.learning).toHaveProperty('productionValue_one');
    expect(resources.en.learning).toHaveProperty('productionValue_other');

    await i18n.changeLanguage('en');
    const { rerender } = render(<MemoryRouter><SessionSummary session={summarySession(1, 1)} onStartNext={vi.fn()} /></MemoryRouter>);
    expect(screen.getByText('1 word reviewed')).toBeTruthy();
    expect(screen.getByText('1 production sentence')).toBeTruthy();

    rerender(<MemoryRouter><SessionSummary session={summarySession(2, 2)} onStartNext={vi.fn()} /></MemoryRouter>);
    expect(screen.getByText('2 words reviewed')).toBeTruthy();
    expect(screen.getByText('2 production sentences')).toBeTruthy();
  });

  it('localizes review card controls while preserving target word content', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(envelope(reviewQueue())));
    renderPage('review');

    await screen.findByRole('heading', { name: 'Ôn tập' });
    expect(await screen.findByRole('heading', { name: 'Gợi nhớ từ' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Hiện đáp án' })).toBeTruthy();
    expect(screen.queryByText('SM-2 recall')).toBeNull();
    expect(screen.getByText('đáng tin cậy')).toBeTruthy();
  });
});
