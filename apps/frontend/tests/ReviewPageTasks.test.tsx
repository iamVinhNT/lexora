/**
 * @file ReviewPageTasks.test.tsx
 * @description Verifies study task quota linking, refetched server counts, and partial queue completion states.
 */
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  cleanupTestQueryClients,
  json,
  mockAttempt,
  queue,
  renderPage,
} from './review-test-helpers';

describe('ReviewPage - Study Tasks Integration', () => {
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

  it('links rating to task and reflects refetched server quota', async () => {
    const fetchMock = vi.mocked(fetch);
    let taskFetches = 0;
    fetchMock.mockImplementation((input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      const method = init?.method || 'GET';

      if (url.includes('/api/study-tasks/task-1')) {
        taskFetches += 1;
        return json({
          id: 'task-1',
          kind: 'REVIEW_WORDS',
          targetCount: 1,
          completedCount: taskFetches > 1 ? 1 : 0,
          isComplete: taskFetches > 1,
          isLate: false,
        });
      }
      if (url.includes('/api/reviews/due')) return json(queue());
      if (url.includes('/api/reviews/attempt') && method === 'GET') {
        return json(mockAttempt({ stage: 'ASSESS', version: 2, studyTaskId: 'task-1' }));
      }
      if (url.endsWith('/api/reviews') && method === 'POST') {
        return json({
          attempt: mockAttempt({ status: 'COMPLETED' }),
          selfRating: 'GOOD',
          effectiveRating: 'GOOD',
          reviewState: { interval: 1 },
          reviewLog: {},
          learningProgress: {},
        });
      }
      return json(null);
    });

    renderPage('/review?taskId=task-1');
    await screen.findByText(/0 \/ 1/);

    const goodButton = screen.getByRole('button', { name: /Good/ });
    fireEvent.click(goodButton);

    await waitFor(() => expect(screen.getByText(/1 \/ 1/)).toBeTruthy());
    const post = fetchMock.mock.calls.find(([input, init]) => String(input).endsWith('/api/reviews') && init?.method === 'POST')?.[1];
    expect(JSON.parse(String(post?.body))).toMatchObject({
      attemptId: 'attempt-1',
      rating: 'GOOD',
    });
    expect(taskFetches).toBeGreaterThan(1);
  });

  it('does not call empty linked queue complete before task reaches quota', async () => {
    vi.mocked(fetch).mockImplementation((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/api/study-tasks/task-1')) {
        return json({ id: 'task-1', kind: 'REVIEW_WORDS', targetCount: 2, completedCount: 0, isComplete: false, isLate: false });
      }
      if (url.includes('/api/reviews/attempt')) return json(null);
      return json(queue([]));
    });

    renderPage('/review?taskId=task-1');

    expect(await screen.findByText(/0 \/ 2/)).toBeTruthy();
    expect(screen.queryByRole('heading', { name: 'Review complete' })).toBeNull();
    expect(screen.getByRole('heading', { name: 'Partially completed' })).toBeTruthy();
  });
});
