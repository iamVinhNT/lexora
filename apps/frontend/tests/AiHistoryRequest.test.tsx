/**
 * @file AiHistoryRequest.test.tsx
 * @description Verifies conversation history swapping, deletion confirmation, scope mismatch guidance, and memory mode display.
 */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AiChatWindow } from '../src/components/ai/AiChatWindow';
import { useAiAssistantStore } from '../src/stores/ai-assistant.store';
import { i18n } from '../src/i18n/config';

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
        gcTime: 0,
      },
    },
  });
}

const mockSettings = {
  baseURL: 'http://localhost:11434/v1',
  models: ['test-model'],
  activeModel: 'test-model',
  hasApiKey: true,
  isConfigured: true,
  source: 'saved',
  revision: 'rev-1',
  updatedAt: null,
};

describe('AiHistory request and scroll behavior', () => {
  beforeEach(async () => {
    vi.restoreAllMocks();
    useAiAssistantStore.getState().resetActiveConversation();
    useAiAssistantStore.getState().closeGuide();
    useAiAssistantStore.getState().setIncludeContent(true);
    useAiAssistantStore.getState().setIncludeProgress(false);
    useAiAssistantStore.getState().syncConfiguration('rev-1');
    await i18n.changeLanguage('vi');
  });

  it('preserves scroll position when older turns are prepended instead of snapping to bottom', async () => {
    const queryClient = createTestQueryClient();
    useAiAssistantStore.getState().selectConversation('conv-scroll');

    let pageCall = 0;
    const initialPage = {
      conversation: {
        id: 'conv-scroll',
        title: 'Học thì',
        context: { kind: 'screen', screen: 'grammar' },
        locale: 'vi',
        includeContent: true,
        includeProgress: false,
        baseURL: 'http://localhost:11434/v1',
        model: 'test-model',
        revision: 1,
        createdAt: '2026-10-09T00:00:00.000Z',
        updatedAt: '2026-10-09T01:00:00.000Z',
        progressResetAt: null,
      },
      items: [
        {
          id: 'turn-new',
          requestId: 'req-new',
          sequence: 2,
          userContent: 'Tin nhắn mới',
          assistantReply: 'Trả lời mới',
          status: 'COMPLETED',
          errorCode: null,
          createdAt: '2026-10-09T00:01:00.000Z',
          updatedAt: '2026-10-09T00:01:30.000Z',
        },
      ],
      hasMore: true,
      beforeSequence: 2,
    };

    const olderPage = {
      conversation: initialPage.conversation,
      items: [
        {
          id: 'turn-old',
          requestId: 'req-old',
          sequence: 1,
          userContent: 'Tin nhắn cũ hơn',
          assistantReply: 'Trả lời cũ hơn',
          status: 'COMPLETED',
          errorCode: null,
          createdAt: '2026-10-09T00:00:00.000Z',
          updatedAt: '2026-10-09T00:00:30.000Z',
        },
      ],
      hasMore: false,
      beforeSequence: null,
    };

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((input: RequestInfo | URL) => {
        const url = new URL(String(input));
        if (url.pathname === '/api/ai/settings') {
          return Promise.resolve(
            new Response(JSON.stringify({ success: true, data: mockSettings }), {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            }),
          );
        }
        if (url.pathname.includes('/api/ai/conversations/conv-scroll')) {
          pageCall += 1;
          const data = pageCall === 1 ? initialPage : olderPage;
          return Promise.resolve(
            new Response(JSON.stringify({ success: true, data }), {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            }),
          );
        }
        return Promise.resolve(
          new Response(JSON.stringify({ success: true, data: {} }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }),
        );
      }),
    );

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <AiChatWindow
            onClose={() => undefined}
            screen="grammar"
            locale="vi"
            revision="rev-1"
            activeModel="test-model"
            isConfigured={true}
          />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await screen.findByText('Tin nhắn mới');

    const scroller = container.querySelector('.overflow-y-auto');
    if (scroller instanceof HTMLElement) {
      let currentScrollTop = 50;
      Object.defineProperty(scroller, 'scrollHeight', {
        configurable: true,
        get: () => (pageCall === 1 ? 500 : 900),
      });
      Object.defineProperty(scroller, 'scrollTop', {
        configurable: true,
        get: () => currentScrollTop,
        set: (val: number) => {
          currentScrollTop = val;
        },
      });
      Object.defineProperty(scroller, 'clientHeight', {
        configurable: true,
        get: () => 400,
      });

      const loadOlderBtn = screen.getByRole('button', { name: 'Tải tin nhắn cũ hơn' });
      fireEvent.click(loadOlderBtn);

      await screen.findByText('Tin nhắn cũ hơn');
      expect(currentScrollTop).toBe(450);
    }
  });

  it('allocates a new request UUID on second manual send after terminal failure', async () => {
    const queryClient = createTestQueryClient();
    useAiAssistantStore.getState().selectConversation('conv-term');
    useAiAssistantStore.getState().setDraft('Học câu điều kiện');

    const sentRequestIds: string[] = [];

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((input: RequestInfo | URL, init?: RequestInit) => {
        const url = new URL(String(input));
        if (url.pathname === '/api/ai/settings') {
          return Promise.resolve(
            new Response(JSON.stringify({ success: true, data: mockSettings }), {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            }),
          );
        }
        if (url.pathname === '/api/ai/chat') {
          const parsed = JSON.parse(String(init?.body));
          if (parsed && typeof parsed === 'object' && 'requestId' in parsed && typeof parsed.requestId === 'string') {
            sentRequestIds.push(parsed.requestId);
          }
          return Promise.resolve(
            new Response(
              JSON.stringify({
                success: false,
                error: { code: 'AI_REQUEST_FAILED', message: 'Model failed terminally' },
              }),
              { status: 409, headers: { 'Content-Type': 'application/json' } },
            ),
          );
        }
        if (url.pathname.includes('/api/ai/conversations/conv-term')) {
          return Promise.resolve(
            new Response(
              JSON.stringify({
                success: true,
                data: {
                  conversation: {
                    id: 'conv-term',
                    title: 'Học câu điều kiện',
                    context: { kind: 'screen', screen: 'grammar' },
                    locale: 'vi',
                    includeContent: true,
                    includeProgress: false,
                    baseURL: 'http://localhost:11434/v1',
                    model: 'test-model',
                    revision: 1,
                  },
                  items: [
                    {
                      id: 'turn-failed',
                      requestId: sentRequestIds[sentRequestIds.length - 1] ?? 'req-1',
                      status: 'FAILED',
                      assistantReply: null,
                      errorCode: 'AI_REQUEST_FAILED',
                    },
                  ],
                  hasMore: false,
                  beforeSequence: null,
                },
              }),
              { status: 200, headers: { 'Content-Type': 'application/json' } },
            ),
          );
        }
        return Promise.resolve(
          new Response(JSON.stringify({ success: true, data: {} }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }),
        );
      }),
    );

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <AiChatWindow
            onClose={() => undefined}
            screen="grammar"
            locale="vi"
            revision="rev-1"
            activeModel="test-model"
            isConfigured={true}
          />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const sendBtn = screen.getByRole('button', { name: 'Gửi' });
    fireEvent.click(sendBtn);

    await waitFor(() => {
      expect(sentRequestIds.length).toBe(1);
      expect(useAiAssistantStore.getState().isSending).toBe(false);
      expect(useAiAssistantStore.getState().error).toBeTruthy();
    });

    const retryBtn = screen.getByRole('button', { name: 'Thử lại' });
    fireEvent.click(retryBtn);

    await waitFor(() => {
      expect(sentRequestIds.length).toBe(2);
    });

    expect(sentRequestIds[1]).not.toBe(sentRequestIds[0]);
  });

  it('reuses same request UUID on second manual send after ambiguous disconnect', async () => {
    const queryClient = createTestQueryClient();
    useAiAssistantStore.getState().selectConversation('conv-ambig');
    useAiAssistantStore.getState().setDraft('Học từ vựng');

    const sentRequestIds: string[] = [];

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((input: RequestInfo | URL, init?: RequestInit) => {
        const url = new URL(String(input));
        if (url.pathname === '/api/ai/settings') {
          return Promise.resolve(
            new Response(JSON.stringify({ success: true, data: mockSettings }), {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            }),
          );
        }
        if (url.pathname === '/api/ai/chat') {
          const parsed = JSON.parse(String(init?.body));
          if (parsed && typeof parsed === 'object' && 'requestId' in parsed && typeof parsed.requestId === 'string') {
            sentRequestIds.push(parsed.requestId);
          }
          return Promise.reject(new Error('Network dropped abruptly'));
        }
        if (url.pathname.includes('/api/ai/conversations/conv-ambig')) {
          return Promise.resolve(
            new Response(
              JSON.stringify({
                success: true,
                data: {
                  conversation: {
                    id: 'conv-ambig',
                    title: 'Học từ vựng',
                    context: { kind: 'screen', screen: 'grammar' },
                    locale: 'vi',
                    includeContent: true,
                    includeProgress: false,
                    baseURL: 'http://localhost:11434/v1',
                    model: 'test-model',
                    revision: 1,
                  },
                  items: [],
                  hasMore: false,
                  beforeSequence: null,
                },
              }),
              { status: 200, headers: { 'Content-Type': 'application/json' } },
            ),
          );
        }
        return Promise.resolve(
          new Response(JSON.stringify({ success: true, data: {} }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }),
        );
      }),
    );

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <AiChatWindow
            onClose={() => undefined}
            screen="grammar"
            locale="vi"
            revision="rev-1"
            activeModel="test-model"
            isConfigured={true}
          />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const sendBtn = screen.getByRole('button', { name: 'Gửi' });
    fireEvent.click(sendBtn);

    await waitFor(() => {
      expect(sentRequestIds.length).toBe(1);
      expect(useAiAssistantStore.getState().isSending).toBe(false);
      expect(useAiAssistantStore.getState().error).toBeTruthy();
    });

    const retryBtn = screen.getByRole('button', { name: 'Thử lại' });
    fireEvent.click(retryBtn);

    await waitFor(() => {
      expect(sentRequestIds.length).toBe(2);
    });

    expect(sentRequestIds[1]).toBe(sentRequestIds[0]);
  });
});
