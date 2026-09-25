/**
 * @file AppShell.test.tsx
 * @description Verifies foundational navigation, accessibility, responsive shell, and theme behavior.
 */
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import App from '../src/App';
import { useUiStore } from '../src/stores/ui.store';
import { i18n } from '../src/i18n/config';

function renderApp(initialEntry = '/') {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter
        initialEntries={[initialEntry]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <App />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

function mockViewport(matches = false) {
  let currentMatches = matches;
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  const mediaQuery = {
    get matches() {
      return currentMatches;
    },
    media: '(min-width: 1024px)',
    onchange: null,
    addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => listeners.add(listener),
    removeEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => listeners.delete(listener),
    addListener: (listener: (event: MediaQueryListEvent) => void) => listeners.add(listener),
    removeListener: (listener: (event: MediaQueryListEvent) => void) => listeners.delete(listener),
    dispatchEvent: () => true,
  } as unknown as MediaQueryList;

  vi.stubGlobal('matchMedia', vi.fn(() => mediaQuery));

  return {
    setMatches(nextMatches: boolean) {
      currentMatches = nextMatches;
      const event = { matches: nextMatches, media: mediaQuery.media } as MediaQueryListEvent;
      listeners.forEach((listener) => listener(event));
    },
  };
}

describe('AppShell', () => {
  beforeEach(() => {
    localStorage.clear();
    useUiStore.setState({ theme: 'light', isSidebarOpen: true, isMoreOpen: false });
    document.documentElement.removeAttribute('data-theme');
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('renders Lexora, skip link, navigation, and active route semantics', () => {
    renderApp('/learn');

    expect(screen.getAllByText('Lexora')).not.toHaveLength(0);
    expect(screen.getByRole('link', { name: /skip to main content/i })).toBeTruthy();
    expect(screen.getAllByRole('link', { name: 'Learn' }).some((link) => link.getAttribute('aria-current') === 'page')).toBe(true);
    expect(screen.getAllByRole('link', { name: 'Vocabulary' })).not.toHaveLength(0);
    expect(screen.queryByRole('link', { name: 'More' })).toBeNull();
  });

  it('keeps desktop sidebar and mobile navigation available in the DOM', () => {
    renderApp();

    expect(screen.getAllByRole('complementary')[0].className).toContain('lg:flex');
    expect(screen.getByRole('navigation', { name: /mobile/i }).className).toContain('lg:hidden');
    expect(screen.getAllByRole('link', { name: 'Overview' })).not.toHaveLength(0);
    expect(screen.getByRole('button', { name: 'More' })).toBeTruthy();
  });

  it('opens More navigation and closes it with Escape while returning focus after inert removal', async () => {
    renderApp();
    const trigger = screen.getAllByRole('button', { name: 'More' })[0];

    fireEvent.click(trigger);
    const dialog = screen.getByRole('dialog', { name: /more navigation/i });
    expect(dialog).toBeTruthy();
    expect(document.activeElement).toBe(within(dialog).getByRole('button', { name: 'Close more navigation' }));
    const background = document.querySelector('[data-app-background]');
    const focusSpy = vi.spyOn(trigger, 'focus').mockImplementation(() => {
      expect(background?.getAttribute('aria-hidden')).toBeNull();
      expect(background?.hasAttribute('inert')).toBe(false);
      HTMLElement.prototype.focus.call(trigger);
    });

    fireEvent.keyDown(dialog, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: /more navigation/i })).toBeNull();
      expect(document.activeElement).toBe(trigger);
      expect(focusSpy).toHaveBeenCalled();
    });

    expect(background?.getAttribute('aria-hidden')).toBeNull();
    expect(background?.hasAttribute('inert')).toBe(false);
  });

  it('traps Tab focus from the last control to the first control', () => {
    renderApp();
    fireEvent.click(screen.getByRole('button', { name: 'More' }));

    const dialog = screen.getByRole('dialog', { name: /more navigation/i });
    const dialogCloseButton = within(dialog).getByRole('button', { name: 'Close more navigation' });
    const controls = [
      dialogCloseButton,
      ...within(dialog).getAllByRole('link'),
    ];
    const lastControl = controls.at(-1);
    expect(lastControl).toBeTruthy();
    (lastControl as HTMLElement).focus();

    fireEvent.keyDown(dialog, { key: 'Tab' });

    expect(document.activeElement).toBe(controls[0]);
  });

  it('traps Shift+Tab focus from the first control to the last control', () => {
    renderApp();
    fireEvent.click(screen.getByRole('button', { name: 'More' }));

    const dialog = screen.getByRole('dialog', { name: /more navigation/i });
    const closeButton = within(dialog).getByRole('button', { name: 'Close more navigation' });
    const lastLink = within(dialog).getByRole('link', { name: 'Settings' });
    closeButton.focus();

    fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: true });

    expect(document.activeElement).toBe(lastLink);
  });

  it('closes More navigation from backdrop and returns focus after inert removal', async () => {
    renderApp();
    const trigger = screen.getByRole('button', { name: 'More' });
    fireEvent.click(trigger);

    fireEvent.click(screen.getByRole('button', { name: 'Close more navigation backdrop' }));

    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: /more navigation/i })).toBeNull();
      expect(document.activeElement).toBe(trigger);
    });

    const background = document.querySelector('[data-app-background]');
    expect(background?.getAttribute('aria-hidden')).toBeNull();
    expect(background?.hasAttribute('inert')).toBe(false);
  });

  it('makes background content inert and hidden while More navigation is open', () => {
    renderApp();
    fireEvent.click(screen.getByRole('button', { name: 'More' }));

    const background = document.querySelector('[data-app-background]');
    expect(background?.getAttribute('aria-hidden')).toBe('true');
    expect(background?.hasAttribute('inert')).toBe(true);
  });

  it('closes More navigation after a navigation action without restoring More focus', async () => {
    renderApp();
    const trigger = screen.getByRole('button', { name: 'More' });
    fireEvent.click(trigger);

    fireEvent.click(within(screen.getByRole('dialog', { name: /more navigation/i })).getByRole('link', { name: 'Settings' }));

    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: /more navigation/i })).toBeNull();
      expect(document.activeElement).toBe(screen.getByRole('heading', { level: 1, name: 'Settings' }));
    });
    expect(document.activeElement).not.toBe(trigger);

    const background = document.querySelector('[data-app-background]');
    expect(background?.getAttribute('aria-hidden')).toBeNull();
    expect(background?.hasAttribute('inert')).toBe(false);
  });

  it('closes More navigation when viewport changes to desktop', async () => {
    const viewport = mockViewport();
    renderApp();
    fireEvent.click(screen.getByRole('button', { name: 'More' }));

    expect(screen.getByRole('dialog', { name: /more navigation/i })).toBeTruthy();
    viewport.setMatches(true);

    await waitFor(() => expect(screen.queryByRole('dialog', { name: /more navigation/i })).toBeNull());

    const background = document.querySelector('[data-app-background]');
    expect(background?.getAttribute('aria-hidden')).toBeNull();
    expect(background?.hasAttribute('inert')).toBe(false);
  });

  it('applies persisted theme during fresh store initialization before first render', async () => {
    localStorage.setItem('lexora-ui', JSON.stringify({ state: { theme: 'dark' }, version: 0 }));
    vi.resetModules();

    const { useUiStore: freshUiStore } = await import('../src/stores/ui.store');

    expect(freshUiStore.getState().theme).toBe('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('falls back to light for malformed persisted theme state during fresh initialization', async () => {
    localStorage.setItem('lexora-ui', '{malformed');
    vi.resetModules();

    const { useUiStore: freshUiStore } = await import('../src/stores/ui.store');

    expect(freshUiStore.getState().theme).toBe('light');
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('exposes theme toggle state and applies the selected theme', () => {
    renderApp();
    const toggle = screen.getAllByRole('button', { name: /switch to dark theme/i })[0];

    expect(toggle.getAttribute('aria-pressed')).toBe('false');
    fireEvent.click(toggle);

    expect(toggle.getAttribute('aria-label')).toMatch(/switch to light theme/i);
    expect(toggle.getAttribute('aria-pressed')).toBe('true');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('moves focus to the current route heading without a visible focus indicator', async () => {
    renderApp('/review');

    const heading = await screen.findByRole('heading', { level: 1, name: 'Review' });
    expect(document.activeElement).toBe(heading);

    const { readFile } = await import('node:fs/promises');
    const css = await readFile('src/index.css', 'utf8');
    expect(css).toMatch(/h1\[tabindex=['"]-1['"]\]:focus\s*\{[^}]*outline:\s*none;[^}]*box-shadow:\s*none;/i);
  });

  it('resets scroll before focusing the new route heading', () => {
    const scrollTo = vi.mocked(window.scrollTo);
    renderApp('/');
    scrollTo.mockClear();

    fireEvent.click(screen.getAllByRole('link', { name: 'Learn' })[0]);

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'auto' });
    expect(document.activeElement).toBe(screen.getByRole('heading', { level: 1, name: 'Learn' }));
  });

  it('keeps dark muted text token at a high-contrast value and supports reduced motion', async () => {
    const { readFile } = await import('node:fs/promises');
    const css = await readFile('src/index.css', 'utf8');

    expect(css).toMatch(/\[data-theme='dark'\][\s\S]*--color-muted:\s*#cbd5e1/i);
    expect(css).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/);
    expect(css).toMatch(/transition-duration:\s*0\.01ms\s*!important/);
  });

  it('configures Tailwind dark utilities with the supported data-theme selector strategy', async () => {
    const { readFile } = await import('node:fs/promises');
    const config = await readFile('tailwind.config.js', 'utf8');

    expect(config).toContain("darkMode: ['variant', '&:where([data-theme=\"dark\"], [data-theme=\"dark\"] *)']");
  });

  it('toggles sidebar collapse state and synchronizes desktop padding following sidebar-07 architecture', () => {
    renderApp();

    const sidebar = screen.getAllByRole('complementary')[0];
    const trigger = within(sidebar).getByRole('button', { name: /collapse sidebar/i });
    const contentContainer = sidebar.parentElement?.querySelector('div.min-h-screen');

    // Initial expanded state
    expect(sidebar.getAttribute('data-state')).toBe('expanded');
    expect(sidebar.className).toContain('w-64');
    expect(sidebar.className).toContain('lg:flex');
    expect(contentContainer?.className).toContain('lg:pl-64');
    expect(within(sidebar).getByRole('link', { name: 'Overview' })).toBeTruthy();
    expect(within(sidebar).getByText('Appearance')).toBeTruthy();

    // Collapse sidebar
    fireEvent.click(trigger);

    expect(useUiStore.getState().isSidebarOpen).toBe(false);
    expect(sidebar.getAttribute('data-state')).toBe('collapsed');
    expect(sidebar.className).toContain('w-16');
    expect(contentContainer?.className).toContain('lg:pl-16');

    // NavMain links still accessible with title tooltips
    const overviewLink = within(sidebar).getByRole('link', { name: 'Overview' });
    expect(overviewLink.getAttribute('title')).toBe('Overview');
    expect(within(overviewLink).getByText('Overview').className).toContain('sr-only');

    // Expand sidebar back
    const expandTrigger = within(sidebar).getByRole('button', { name: /expand sidebar/i });
    fireEvent.click(expandTrigger);

    expect(useUiStore.getState().isSidebarOpen).toBe(true);
    expect(sidebar.getAttribute('data-state')).toBe('expanded');
    expect(sidebar.className).toContain('w-64');
    expect(contentContainer?.className).toContain('lg:pl-64');
  });

  it('localizes the sidebar trigger accessible name in Vietnamese', async () => {
    await i18n.changeLanguage('vi');
    renderApp();

    const sidebar = screen.getAllByRole('complementary')[0];
    const trigger = within(sidebar).getByRole('button', { name: 'Thu gọn thanh bên' });
    fireEvent.click(trigger);

    expect(within(sidebar).getByRole('button', { name: 'Mở rộng thanh bên' })).toBeTruthy();
  });

  it('renders accessible touch targets and controls in sidebar footer', () => {
    renderApp();

    const sidebar = screen.getAllByRole('complementary')[0];
    const trigger = within(sidebar).getByRole('button', { name: /collapse sidebar/i });
    const languageButton = within(sidebar).getByRole('button', { name: 'Language' });
    const themeButton = within(sidebar).getByRole('button', { name: /switch to dark theme/i });

    expect(languageButton.className).toContain('min-h-11');
    expect(themeButton.className).toContain('min-h-11');
    expect(themeButton.className).toContain('min-w-11');

    // Collapse sidebar and verify compact controls
    fireEvent.click(trigger);

    const compactLanguage = within(sidebar).getByRole('button', { name: 'Language' });
    expect(compactLanguage.className).toContain('w-11');
    expect(compactLanguage.className).toContain('min-w-11');
  });
});
