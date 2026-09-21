/**
 * @file LanguageSelector.test.tsx
 * @description Verifies reusable language selection, persistence, and runtime shell-safe switching.
 */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import App from '../src/App';
import { LanguageSelector } from '../src/components/ui/LanguageSelector';
import { i18n } from '../src/i18n/config';
import { useUiStore } from '../src/stores/ui.store';

describe('LanguageSelector', () => {
  beforeEach(async () => {
    localStorage.clear();
    useUiStore.setState({ theme: 'dark', isSidebarOpen: true, isMoreOpen: false });
    await i18n.changeLanguage('en');
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
  });

  it('switches native language without reload and keeps theme and route state intact', async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter initialEntries={['/settings']}>
          <App />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const selector = screen.getAllByRole('combobox', { name: 'Language' })[0];
    fireEvent.change(selector, { target: { value: 'vi' } });

    await waitFor(() => expect(screen.getByRole('heading', { level: 1, name: 'Cài đặt' })).toBeTruthy());
    expect(document.documentElement.lang).toBe('vi');
    expect(localStorage.getItem('lexora-language')).toContain('vi');
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(screen.getByRole('heading', { level: 1, name: 'Cài đặt' })).toBeTruthy();
  });

  it('exposes native names and stays synchronized when rendered twice', async () => {
    render(<><LanguageSelector /><LanguageSelector /></>);
    expect(screen.getAllByRole('combobox', { name: 'Language' })).toHaveLength(2);

    fireEvent.change(screen.getAllByRole('combobox', { name: 'Language' })[0], { target: { value: 'vi' } });

    await waitFor(() => expect(screen.getAllByRole('combobox', { name: 'Ngôn ngữ' })).toHaveLength(2));
  });
});
