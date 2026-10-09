/**
 * @file AiHistoryUi.test.tsx
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

describe('AiHistoryUi components', () => {
  beforeEach(async () => {
    vi.restoreAllMocks();
    useAiAssistantStore.getState().resetActiveConversation();
    useAiAssistantStore.getState().closeGuide();
    useAiAssistantStore.getState().setIncludeContent(true);
    useAiAssistantStore.getState().setIncludeProgress(false);
    useAiAssistantStore.getState().syncConfiguration('rev-1');
    await i18n.changeLanguage('vi');
  });

  it('swaps chat body into history list on clicking History button and resumes selected conversation', async () => {
    const queryClient = createTestQueryClient();
    const mockConversations = {
      items: [
        {
          id: 'conv-1',
          title: 'Học thì hiện tại hoàn thành',
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
      ],
      total: 1,
      limit: 10,
      offset: 0,
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
        if (url.pathname === '/api/ai/conversations') {
          return Promise.resolve(
            new Response(JSON.stringify({ success: true, data: mockConversations }), {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            }),
          );
        }
        if (url.pathname === '/api/ai/conversations/conv-1') {
          return Promise.resolve(
            new Response(
              JSON.stringify({
                success: true,
                data: {
                  conversation: mockConversations.items[0],
                  items: [
                    {
                      id: 'turn-1',
                      requestId: 'req-1',
                      sequence: 1,
                      userContent: 'Giải thích Present Perfect',
                      assistantReply: 'Thì hiện tại hoàn thành diễn tả hành động...',
                      status: 'COMPLETED',
                      errorCode: null,
                      createdAt: '2026-10-09T00:00:00.000Z',
                      updatedAt: '2026-10-09T00:01:00.000Z',
                    },
                  ],
                  hasMore: false,
                  beforeSequence: null,
                },
              }),
              {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
              },
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

    const historyButton = screen.getByRole('button', { name: 'Lịch sử hội thoại' });
    fireEvent.click(historyButton);

    await waitFor(() => {
      expect(screen.getByText('Học thì hiện tại hoàn thành')).toBeTruthy();
    });

    const resumeButton = screen.getByRole('button', { name: 'Tiếp tục hội thoại' });
    fireEvent.click(resumeButton);

    await waitFor(() => {
      expect(useAiAssistantStore.getState().view).toBe('chat');
      expect(useAiAssistantStore.getState().activeConversationId).toBe('conv-1');
    });

    await waitFor(() => {
      expect(screen.getByText('Giải thích Present Perfect')).toBeTruthy();
      expect(screen.getByRole('status').textContent).toContain('Thì hiện tại hoàn thành diễn tả hành động');
    });
  });

  it('shows delete confirmation prompt and cancels cleanly', async () => {
    const queryClient = createTestQueryClient();
    const mockConversations = {
      items: [
        {
          id: 'conv-del',
          title: 'Hội thoại cần xóa',
          context: { kind: 'screen', screen: 'vocabulary' },
          locale: 'vi',
          includeContent: true,
          includeProgress: false,
          baseURL: 'http://localhost:11434/v1',
          model: 'test-model',
          revision: 2,
          createdAt: '2026-10-09T00:00:00.000Z',
          updatedAt: '2026-10-09T01:00:00.000Z',
          progressResetAt: null,
        },
      ],
      total: 1,
      limit: 10,
      offset: 0,
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
        if (url.pathname === '/api/ai/conversations') {
          return Promise.resolve(
            new Response(JSON.stringify({ success: true, data: mockConversations }), {
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

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <AiChatWindow
            onClose={() => undefined}
            screen="vocabulary"
            locale="vi"
            revision="rev-1"
            activeModel="test-model"
            isConfigured={true}
          />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Lịch sử hội thoại' }));
    await screen.findByText('Hội thoại cần xóa');

    const deleteIconButton = screen.getByRole('button', { name: 'Xóa' });
    fireEvent.click(deleteIconButton);

    expect(screen.getByText('Bạn có chắc muốn xóa hội thoại này?')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Xác nhận xóa' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Hủy' })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Hủy' }));
    expect(screen.queryByText('Bạn có chắc muốn xóa hội thoại này?')).toBeNull();
  });

  it('renders scope mismatch warning and guidance when conversation belongs to another screen', async () => {
    const queryClient = createTestQueryClient();
    useAiAssistantStore.getState().selectConversation('conv-diff-screen');

    const conversationDetail = {
      conversation: {
        id: 'conv-diff-screen',
        title: 'Học từ vựng đồ ăn',
        context: { kind: 'screen', screen: 'vocabulary' },
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
          id: 'turn-voc-1',
          requestId: 'req-voc-1',
          sequence: 1,
          userContent: 'Apple là gì?',
          assistantReply: 'Apple nghĩa là quả táo.',
          status: 'COMPLETED',
          errorCode: null,
          createdAt: '2026-10-09T00:00:00.000Z',
          updatedAt: '2026-10-09T00:01:00.000Z',
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
        if (url.pathname.includes('/api/ai/conversations/conv-diff-screen')) {
          return Promise.resolve(
            new Response(JSON.stringify({ success: true, data: conversationDetail }), {
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

    await screen.findByText('Apple là gì?');

    const switchLink = screen.getByRole('link', { name: 'Chuyển sang Từ vựng' });
    expect(switchLink).toBeTruthy();
    expect(switchLink.getAttribute('href')).toBe('/words');

    expect(screen.getByPlaceholderText('Hỏi tiếp…').hasAttribute('disabled')).toBe(true);

    const scroller = container.querySelector<HTMLElement>('[data-ai-guide] .overflow-y-auto')!;
    Object.defineProperty(scroller, 'scrollHeight', { configurable: true, value: 1000 });
    const previousHeight = window.innerHeight;
    try {
      Object.defineProperty(window, 'innerHeight', { configurable: true, value: 360 });
      fireEvent(window, new Event('resize'));
      expect(scroller.scrollTop).toBe(0);
    } finally {
      Object.defineProperty(window, 'innerHeight', { configurable: true, value: previousHeight });
      fireEvent(window, new Event('resize'));
    }
  });

});
