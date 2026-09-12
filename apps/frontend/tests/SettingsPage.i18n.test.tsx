/**
 * @file SettingsPage.i18n.test.tsx
 * @description Verifies bilingual settings preferences and language-safe confirmations.
 */
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';

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
  beforeEach(async () => {
    await i18n.changeLanguage('vi');
  });

  it('renders settings preferences in Vietnamese', () => {
    renderSettings();

    expect(screen.getByRole('heading', { level: 1, name: 'Cài đặt' })).toBeTruthy();
    expect(screen.getByRole('heading', { level: 2, name: 'Giao diện' })).toBeTruthy();
    expect(screen.getByRole('heading', { level: 2, name: 'Quản lý dữ liệu' })).toBeTruthy();
    expect(screen.getByRole('heading', { level: 3, name: 'Ngôn ngữ' })).toBeTruthy();
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
