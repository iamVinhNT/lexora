/**
 * @file VocabularyContext.i18n.test.tsx
 * @description Verifies Vietnamese vocabulary/context presentation while preserving user content.
 */
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { VocabularyPage } from '../src/pages/VocabularyPage';
import { ContextPage } from '../src/pages/ContextPage';
import { i18n } from '../src/i18n/config';
import { resources } from '../src/i18n/resources';

const word = { id: 'word-1', word: 'reliable', phonetic: '/rɪˈlaɪəbl/', partOfSpeech: 'adjective', definition: 'Able to be trusted.', translation: 'đáng tin cậy', difficulty: 'B2', tags: [{ id: 'tag-1', name: 'work', createdAt: '2026-09-08T00:00:00.000Z' }], collocations: [], examples: [], contexts: [], wordFamilies: [], learningProgress: { status: 'LEARNING', recognitionScore: 70, recallScore: 50, productionScore: 30 }, reviewState: null };
const context = { id: 'context-1', title: 'Building a scalable API', content: 'The system needs to be reliable.', sourceType: 'ARTICLE', sourceUrl: 'https://example.test/article', wordCount: 1, words: [{ wordId: 'word-1', exposureCount: 1234, firstSeenAt: '2026-09-01T00:00:00.000Z', lastSeenAt: '2026-09-12T00:00:00.000Z', word: { id: 'word-1', word: 'reliable', definition: 'Able to be trusted.' } }] };

function envelope(data: unknown) {
  return new Response(JSON.stringify({ success: true, data }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}

function renderPage(page: 'vocabulary' | 'contexts') {
  return render(<QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}><MemoryRouter initialEntries={[`/${page === 'vocabulary' ? 'words' : 'contexts'}`]}>{page === 'vocabulary' ? <VocabularyPage /> : <ContextPage />}</MemoryRouter></QueryClientProvider>);
}

describe('Vocabulary and context i18n', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('vi');
    vi.stubGlobal('fetch', vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith('/contexts/context-1')) return Promise.resolve(envelope(context));
      if (url.includes('/contexts')) return Promise.resolve(envelope({ total: 1, page: 1, limit: 20, items: [context] }));
      return Promise.resolve(envelope({ total: 1, page: 1, limit: 20, items: [word] }));
    }));
  });

  it('localizes vocabulary controls and state labels without translating user content', async () => {
    renderPage('vocabulary');

    await waitFor(() => expect(screen.getByText('reliable')).toBeTruthy());
    expect(screen.getByRole('heading', { level: 1, name: 'Từ vựng' })).toBeTruthy();
    expect(screen.getByRole('textbox', { name: 'Tìm kiếm từ vựng' })).toBeTruthy();
    expect(screen.getByText('Đang học')).toBeTruthy();
    expect(screen.getByText('Able to be trusted.')).toBeTruthy();
  });

  it('localizes compact vocabulary icon actions and pagination names', async () => {
    renderPage('vocabulary');

    await screen.findByText('reliable');
    expect(screen.getByRole('button', { name: 'Thêm từ' }).textContent).toBe('');
    expect(screen.getByRole('button', { name: 'Trước' }).textContent).toBe('');
    expect(screen.getByRole('button', { name: 'Sau' }).textContent).toBe('');

    fireEvent.click(screen.getByRole('button', { name: 'Chi tiết reliable' }));
    const dialog = await screen.findByRole('dialog', { name: 'reliable' });
    expect(within(dialog).getByRole('button', { name: 'Sửa từ' }).textContent).toBe('');
    expect(within(dialog).getByRole('button', { name: 'Xóa từ reliable' }).textContent).toBe('');
  });

  it('localizes context controls and source labels without translating user content', async () => {
    expect(resources.vi.contexts).toHaveProperty('count_one');
    expect(resources.vi.contexts).toHaveProperty('count_other');
    expect(resources.vi.contexts).toHaveProperty('wordCount_one');
    expect(resources.vi.contexts).toHaveProperty('wordCount_other');
    expect(resources.vi.contexts).not.toHaveProperty('count');

    renderPage('contexts');

    await waitFor(() => expect(screen.getByText('Building a scalable API')).toBeTruthy());
    expect(screen.getByRole('heading', { level: 1, name: 'Ngữ cảnh' })).toBeTruthy();
    expect(screen.getByRole('textbox', { name: 'Tìm kiếm ngữ cảnh' })).toBeTruthy();
    expect(screen.getByText('Bài viết')).toBeTruthy();
    expect(screen.getByText('The system needs to be reliable.')).toBeTruthy();
    expect(screen.getByText('1 ngữ cảnh')).toBeTruthy();
    expect(screen.getByText('1 từ trên trang')).toBeTruthy();
  });

  it('localizes context create and detail dialogs', async () => {
    renderPage('contexts');

    await waitFor(() => expect(screen.getByText('Building a scalable API')).toBeTruthy());
    fireEvent.click(screen.getByRole('button', { name: /Chi tiết Building a scalable API/ }));
    const dialog = await screen.findByRole('dialog');
    expect(within(dialog).getByRole('heading', { name: 'Building a scalable API' })).toBeTruthy();
    expect(within(dialog).getByText('Bài viết')).toBeTruthy();
    expect(within(dialog).getByText('Mở nguồn')).toBeTruthy();
    expect(within(dialog).getByText('Từ đã liên kết')).toBeTruthy();
    expect(await within(dialog).findByText(/Số lần gặp: 1\.234/)).toBeTruthy();
    expect(within(dialog).getByRole('button', { name: /Xóa ngữ cảnh/ })).toBeTruthy();

    fireEvent.click(within(dialog).getByRole('button', { name: /Đóng Building a scalable API/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Thêm ngữ cảnh' }));
    expect(screen.getByRole('heading', { name: 'Thêm ngữ cảnh' })).toBeTruthy();
    const titleInput = screen.getByRole('textbox', { name: 'Tiêu đề' }) as HTMLInputElement;
    const contentInput = screen.getByRole('textbox', { name: 'Nội dung' }) as HTMLTextAreaElement;
    expect(titleInput.required).toBe(true);
    expect(contentInput.required).toBe(true);
    expect(screen.getByRole('button', { name: 'Lưu ngữ cảnh' })).toBeTruthy();
  });
});
