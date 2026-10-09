/**
 * @file review-test-helpers.tsx
 * @description Shared test fixtures and harness helpers for ReviewPage tests.
 */
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

import type { ReviewAttemptView } from '../src/api/review.api';
import { ReviewPage } from '../src/pages/ReviewPage';
import { useDashboardStatistics } from '../src/hooks/useAnalytics';

export const wordId = '11111111-1111-4111-8111-111111111111';
export const secondWordId = '22222222-2222-4222-8222-222222222222';

export function reviewItem(id = wordId, word = 'reliable', translation = 'đáng tin cậy') {
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
    intervalPreviews: { AGAIN: '1d', HARD: '1d', GOOD: '6d', EASY: '10d' },
  };
}

export function queue(items = [reviewItem()]) {
  return {
    items,
    counts: { new: items.length, learning: 0, familiar: 0, mastered: 0, maintenance: 0, total: items.length },
    countsByState: { new: items.length, learning: 0, familiar: 0, mastered: 0, maintenance: 0, total: items.length },
    total: items.length,
  };
}

export function mockAttempt(overrides: Partial<ReviewAttemptView> = {}): ReviewAttemptView {
  return {
    id: 'attempt-1',
    wordId,
    studyTaskId: null,
    status: 'ACTIVE',
    stage: 'RECALL',
    version: 1,
    prompt: {
      type: 'RECALL',
      text: 'able to be trusted or depended on',
    },
    needsOutput: false,
    weakReasons: [],
    recall: null,
    output: null,
    word: {
      id: wordId,
      word: 'reliable',
      phonetic: '/rɪˈlaɪəbl/',
      partOfSpeech: 'adjective',
      definition: 'able to be trusted or depended on',
      translation: 'đáng tin cậy',
    },
    examples: overrides.stage && overrides.stage !== 'RECALL' ? [{ sentence: 'The reliable system works.' }] : [],
    contexts: overrides.stage && overrides.stage !== 'RECALL' ? [{ title: 'Work notes', content: 'A reliable system earns trust.' }] : [],
    intervalPreviews: { AGAIN: '1d', HARD: '1d', GOOD: '6d', EASY: '10d' },
    effectiveRatings: { AGAIN: 'AGAIN', HARD: 'HARD', GOOD: 'GOOD', EASY: 'EASY' },
    createdAt: '2026-10-09T00:00:00.000Z',
    updatedAt: '2026-10-09T00:00:00.000Z',
    ...overrides,
    ...(overrides.stage === undefined || overrides.stage === 'RECALL' ? { word: null, examples: [], contexts: [] } : {}),
  };
}

export function json(data: unknown, status = 200) {
  return Promise.resolve(new Response(JSON.stringify({ success: true, data }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  }));
}

export function errorJson(message: string, status = 500) {
  return Promise.resolve(new Response(JSON.stringify({ success: false, error: { code: 'FAILED', message } }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  }));
}

const activeQueryClients: QueryClient[] = [];

export function createTestQueryClient(): QueryClient {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  activeQueryClients.push(client);
  return client;
}

export function cleanupTestQueryClients(): void {
  for (const client of activeQueryClients) {
    client.clear();
  }
  activeQueryClients.length = 0;
}

export function renderPage(initialEntry = '/', client?: QueryClient) {
  const queryClient = client ?? createTestQueryClient();
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <QueryClientProvider client={queryClient}>
        <ReviewPage />
      </QueryClientProvider>
    </MemoryRouter>,
  );
}

export function ReviewMutationConsumer() {
  const dashboard = useDashboardStatistics();
  return <output data-testid="review-analytics">{dashboard.data?.todayReviews ?? ''}</output>;
}
