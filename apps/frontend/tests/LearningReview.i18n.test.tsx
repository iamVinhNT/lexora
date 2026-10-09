/**
 * @file LearningReview.i18n.test.tsx
 * @description Verifies Vietnamese learning-session presentation and plural API counts.
 */
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { LearningSessionPage } from '../src/pages/LearningSessionPage';
import { i18n } from '../src/i18n/config';
import { resources } from '../src/i18n/resources';
import { SessionStartForm } from '../src/components/learning/SessionStartForm';
import { SessionSummary } from '../src/components/learning/SessionSummary';


function envelope(data: unknown) {
  return new Response(JSON.stringify({ success: true, data }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}

function renderPage() {
  return render(<QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}><MemoryRouter><LearningSessionPage /></MemoryRouter></QueryClientProvider>);
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
    renderPage();

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

});
