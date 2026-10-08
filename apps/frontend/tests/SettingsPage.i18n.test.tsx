/**
 * @file SettingsPage.i18n.test.tsx
 * @description Verifies bilingual settings preferences and language-safe confirmations.
 */
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { SettingsPage } from '../src/pages/SettingsPage';
import i18n from '../src/i18n/config';

function renderSettings() {
  return render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <MemoryRouter initialEntries={['/settings']}>
        <SettingsPage />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('SettingsPage i18n', () => {
  afterEach(() => vi.unstubAllGlobals());
  beforeEach(async () => {
    await i18n.changeLanguage('vi');
    vi.stubGlobal('fetch', vi.fn((input: RequestInfo | URL) => {
      if (new URL(String(input)).pathname !== '/api/ai/settings') throw new Error('Unexpected request');
      return Promise.resolve(new Response(JSON.stringify({ success: true, data: { baseURL: 'https://provider.example/v1', models: ['model-a'], activeModel: 'model-a', hasApiKey: true, isConfigured: true, source: 'saved', revision: 'revision-a', updatedAt: null } }), { status: 200 }));
    }));
  });

  it('renders settings preferences and AI credential status in Vietnamese', async () => {
    renderSettings();

    expect(screen.getByRole('heading', { level: 1, name: 'Cài đặt' })).toBeTruthy();
    expect(screen.getByRole('heading', { level: 2, name: 'Giao diện' })).toBeTruthy();
    expect(screen.getByRole('heading', { level: 2, name: 'Quản lý dữ liệu' })).toBeTruthy();
    expect(screen.getByRole('heading', { level: 3, name: 'Ngôn ngữ' })).toBeTruthy();
    expect(await screen.findByLabelText('API_KEY')).toBeTruthy();
    expect((screen.getByLabelText('API_KEY') as HTMLInputElement).value).toBe('');
    expect(screen.getByRole('combobox', { name: 'Model đang dùng' }).textContent).toContain('model-a');
    fireEvent.click(screen.getByRole('button', { name: 'Xóa cấu hình AI đã lưu' }));
    expect(screen.getByRole('dialog', { name: 'Xóa cấu hình AI đã lưu?' }).textContent).toContain('environment');
  });

  it('clears typed destructive confirmation when language changes', async () => {
    renderSettings();

    fireEvent.click(screen.getByRole('button', { name: 'Đặt lại tiến độ học tập' }));
    const dialog = screen.getByRole('dialog', { name: 'Đặt lại tiến độ học tập' });
    const input = within(dialog).getByLabelText(/Nhập ĐẶT LẠI TIẾN ĐỘ/i);
    fireEvent.change(input, { target: { value: 'ĐẶT LẠI TIẾN ĐỘ' } });
    expect((input as HTMLInputElement).value).toBe('ĐẶT LẠI TIẾN ĐỘ');

    await i18n.changeLanguage('en');

    await waitFor(() => expect(screen.getByRole('dialog', { name: 'Reset learning progress' })).toBeTruthy());
    expect((screen.getByLabelText('Type RESET PROGRESS to confirm') as HTMLInputElement).value).toBe('');
    expect((screen.getByRole('button', { name: 'Confirm reset' }) as HTMLButtonElement).disabled).toBe(true);
  });
});
