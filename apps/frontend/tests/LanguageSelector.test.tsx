/**
 * @file LanguageSelector.test.tsx
 * @description Verifies reusable language selection button, persistence, and runtime shell-safe switching.
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
    useUiStore.setState({ isSidebarOpen: true, isMoreOpen: false });
    useUiStore.getState().setTheme('dark');
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
    await screen.findByRole('heading', { level: 1, name: 'Settings' });

    const toggleButton = screen.getAllByRole('button', { name: 'Language' })[0];
    fireEvent.click(toggleButton);

    await waitFor(() => expect(screen.getByRole('heading', { level: 1, name: 'Cài đặt' })).toBeTruthy());
    expect(document.documentElement.lang).toBe('vi');
    expect(localStorage.getItem('lexora-language')).toContain('vi');
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(screen.getByRole('heading', { level: 1, name: 'Cài đặt' })).toBeTruthy();
  });

  it('exposes language toggle button and stays synchronized when rendered twice', async () => {
    render(<><LanguageSelector /><LanguageSelector /></>);
    expect(screen.getAllByRole('button', { name: 'Language' })).toHaveLength(2);

    fireEvent.click(screen.getAllByRole('button', { name: 'Language' })[0]);

    await waitFor(() => expect(screen.getAllByRole('button', { name: 'Ngôn ngữ' })).toHaveLength(2));
  });
});
