/**
 * @file AiStudyPlanPreviewDialog.test.tsx
 * @description Prevents React StrictMode from duplicating provider-backed preview requests.
 */
import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import i18n from '../src/i18n/config';
import { AiStudyPlanPreviewDialog } from '../src/components/calendar/AiStudyPlanPreviewDialog';

const fetchMock = vi.fn();

beforeEach(async () => {
  await i18n.changeLanguage('en');
  fetchMock.mockResolvedValue(new Response(JSON.stringify({ success: true, data: { suggestions: [] } }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  }));
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
  fetchMock.mockReset();
});

describe('AiStudyPlanPreviewDialog', () => {
  it('requests initial AI preview only once under React StrictMode', async () => {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    render(
      <QueryClientProvider client={queryClient}>
        <StrictMode><AiStudyPlanPreviewDialog onClose={() => undefined} /></StrictMode>
      </QueryClientProvider>,
    );

    await waitFor(() => expect(screen.getByRole('status').getAttribute('aria-busy')).toBeNull());
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(String(fetchMock.mock.calls[0][0])).toContain('/api/ai-study-plan-previews');
  });
});
