/**
 * @file UpdateBell.test.tsx
 * @description Verifies the desktop update bell: visibility, popover states, download actions, accessibility, and locale.
 */
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Sidebar } from '../src/components/layout/Sidebar';
import { UpdateBell } from '../src/components/layout/UpdateBell';
import type { DesktopUpdateState } from '../src/desktop/desktop-updates';
import { i18n } from '../src/i18n/config';
import { useUiStore } from '../src/stores/ui.store';

const BASE: DesktopUpdateState = {
  available: true,
  currentVersion: '0.3.0',
  latestVersion: '0.4.0',
  publishedAt: '2026-11-03T08:00:00Z',
  install: 'appimage',
  downloadDir: '~/Downloads',
  asset: { name: 'Lexora-0.4.0-x86_64.AppImage', sizeBytes: 158_297_065 },
  download: { status: 'idle', receivedBytes: 0 },
};
const DEB: DesktopUpdateState = { ...BASE, install: 'deb', asset: { name: 'lexora_0.4.0_amd64.deb', sizeBytes: 119_091_588 } };
const withDownload = (state: DesktopUpdateState, download: DesktopUpdateState['download']): DesktopUpdateState => ({ ...state, download });

function installBridge(initial: DesktopUpdateState) {
  let listener: ((state: DesktopUpdateState) => void) | undefined;
  const updates = {
    getState: vi.fn(async () => initial),
    download: vi.fn(async () => initial),
    cancelDownload: vi.fn(async () => initial),
    revealDownload: vi.fn(async () => ({ shown: true })),
    dismiss: vi.fn(async () => initial),
    onState: vi.fn((callback: (state: DesktopUpdateState) => void) => { listener = callback; return () => { listener = undefined; }; }),
  };
  window.lexoraDesktop = { updates } as never;
  return { updates, push: (state: DesktopUpdateState) => act(() => listener?.(state)) };
}

async function openPopover() {
  const bell = await screen.findByRole('button', { name: 'New version 0.4.0 available. Show details' });
  fireEvent.click(bell);
  return { bell, dialog: screen.getByRole('dialog') };
}

beforeEach(() => { useUiStore.setState({ isSidebarOpen: true }); });
afterEach(() => { delete window.lexoraDesktop; });

describe('UpdateBell visibility', () => {
  it('renders nothing in the browser build', () => {
    const { container } = render(<UpdateBell />);
    expect(container.innerHTML).toBe('');
  });

  it('renders nothing when no update is available', async () => {
    const { updates } = installBridge({ ...BASE, available: false });
    const { container } = render(<UpdateBell />);
    await waitFor(() => expect(updates.getState).toHaveBeenCalled());
    expect(container.innerHTML).toBe('');
  });

  it('shows an accessible 44px bell with a dot when an update is available', async () => {
    installBridge(BASE);
    render(<UpdateBell />);
    const bell = await screen.findByRole('button', { name: 'New version 0.4.0 available. Show details' });
    expect(bell.title).toBe('Version 0.4.0 available');
    expect(bell.classList.contains('min-h-11')).toBe(true);
    expect(bell.classList.contains('min-w-11')).toBe(true);
    expect(bell.getAttribute('aria-haspopup')).toBe('dialog');
    expect(bell.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
    expect(bell.querySelector('[data-update-dot]')).not.toBeNull();
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('appears and disappears as the main process pushes state', async () => {
    const { push } = installBridge({ ...BASE, available: false });
    render(<UpdateBell />);
    expect(screen.queryByRole('button', { name: /New version/ })).toBeNull();
    push(BASE);
    expect(await screen.findByRole('button', { name: /New version 0.4.0/ })).toBeTruthy();
    push({ ...BASE, available: false });
    await waitFor(() => expect(screen.queryByRole('button', { name: /New version/ })).toBeNull());
  });

  it('unsubscribes when unmounted', async () => {
    const { updates } = installBridge(BASE);
    const off = vi.fn();
    updates.onState.mockImplementation(() => off);
    const { unmount } = render(<UpdateBell />);
    await screen.findByRole('button', { name: /New version/ });
    expect(off).not.toHaveBeenCalled();
    unmount();
    expect(off).toHaveBeenCalledTimes(1);
  });
});

describe('UpdateBell popover', () => {
  it('shows version, date, file, size, and where it saves, before download', async () => {
    installBridge(BASE);
    render(<UpdateBell />);
    const { dialog } = await openPopover();
    expect(within(dialog).getByRole('heading', { name: 'Lexora 0.4.0 is available' })).toBeTruthy();
    expect(dialog.textContent).toContain('You are on 0.3.0. Released Nov 3, 2026.');
    expect(within(dialog).getByText('Lexora-0.4.0-x86_64.AppImage')).toBeTruthy();
    expect(dialog.textContent).toContain('151 MB');
    expect(dialog.textContent).toContain('Nothing is installed or run.');
    const download = within(dialog).getByRole('button', { name: 'Download Lexora-0.4.0-x86_64.AppImage (151 MB)' });
    expect(download.title).toBe('Download Lexora-0.4.0-x86_64.AppImage (151 MB)');
    expect(download.classList.contains('min-h-11')).toBe(true);
  });

  it('starts the download from the icon button', async () => {
    const { updates } = installBridge(BASE);
    render(<UpdateBell />);
    const { dialog } = await openPopover();
    fireEvent.click(within(dialog).getByRole('button', { name: /^Download Lexora/ }));
    expect(updates.download).toHaveBeenCalledTimes(1);
  });

  it('shows a progress bar with the percentage and cancels the download', async () => {
    const { updates, push } = installBridge(BASE);
    render(<UpdateBell />);
    const { dialog } = await openPopover();
    push(withDownload(BASE, { status: 'downloading', receivedBytes: 79_148_532 }));
    const bar = await within(dialog).findByRole('progressbar');
    expect(bar.getAttribute('aria-valuenow')).toBe('50');
    expect(bar.getAttribute('aria-valuemin')).toBe('0');
    expect(bar.getAttribute('aria-valuemax')).toBe('100');
    expect(bar.getAttribute('aria-label')).toBe('Downloading… 75 MB of 151 MB');
    expect(within(dialog).queryByRole('button', { name: /^Download Lexora/ })).toBeNull();
    fireEvent.click(within(dialog).getByRole('button', { name: 'Cancel download' }));
    expect(updates.cancelDownload).toHaveBeenCalledTimes(1);
  });

  it('after an AppImage download explains the next step and reveals the file', async () => {
    const { updates, push } = installBridge(BASE);
    render(<UpdateBell />);
    const { dialog } = await openPopover();
    push(withDownload(BASE, { status: 'done', receivedBytes: 158_297_065, savedTo: '~/Downloads/Lexora-0.4.0-x86_64.AppImage' }));
    await within(dialog).findByText(/Downloaded to ~\/Downloads\/Lexora-0\.4\.0-x86_64\.AppImage/);
    expect(dialog.textContent).toContain('Close Lexora, then run the new file. It is already executable.');
    expect(dialog.textContent).toContain('~/.lexora');
    fireEvent.click(within(dialog).getByRole('button', { name: 'Show in folder' }));
    expect(updates.revealDownload).toHaveBeenCalledTimes(1);
  });

  it('after a deb download shows the install command', async () => {
    const { push } = installBridge(DEB);
    render(<UpdateBell />);
    const { dialog } = await openPopover();
    push(withDownload(DEB, { status: 'done', receivedBytes: 119_091_588, savedTo: '~/Downloads/lexora_0.4.0_amd64.deb' }));
    const command = await within(dialog).findByText('sudo apt install ~/Downloads/lexora_0.4.0_amd64.deb');
    expect(command.tagName).toBe('CODE');
  });

  it('never builds a shell command from a path with unusual characters', async () => {
    const { push } = installBridge(DEB);
    render(<UpdateBell />);
    const { dialog } = await openPopover();
    push(withDownload(DEB, { status: 'done', receivedBytes: 1, savedTo: "~/My Downloads/lexora_0.4.0_amd64.deb; rm -rf ~" }));
    await within(dialog).findByText(/Downloaded to/);
    expect(dialog.querySelector('code')).toBeNull();
    expect(dialog.textContent).not.toContain('sudo apt install');
  });

  it.each([
    ['network', 'Download interrupted. Check your connection and retry.'],
    ['verify', 'The file did not match its checksum and was deleted. Retry.'],
    ['disk', 'Could not save to ~/Downloads. Free some space or check permissions.'],
  ] as const)('explains the %s error and offers a retry', async (error, message) => {
    const { updates, push } = installBridge(BASE);
    render(<UpdateBell />);
    const { dialog } = await openPopover();
    push(withDownload(BASE, { status: 'error', receivedBytes: 0, error }));
    expect(await within(dialog).findByText(message)).toBeTruthy();
    fireEvent.click(within(dialog).getByRole('button', { name: 'Retry download' }));
    expect(updates.download).toHaveBeenCalledTimes(1);
  });

  it('explains a missing release file without offering a pointless retry, and still allows skipping', async () => {
    const { push } = installBridge(BASE);
    render(<UpdateBell />);
    const { dialog } = await openPopover();
    push(withDownload(BASE, { status: 'error', receivedBytes: 0, error: 'no-asset' }));
    expect(await within(dialog).findByText('This release has no file for your install type.')).toBeTruthy();
    expect(within(dialog).queryByRole('button', { name: 'Retry download' })).toBeNull();
    expect(within(dialog).getByRole('button', { name: 'Skip version 0.4.0' })).toBeTruthy();
  });

  it('skips the version and the bell goes away when the state is pushed', async () => {
    const { updates, push } = installBridge(BASE);
    render(<UpdateBell />);
    const { dialog } = await openPopover();
    fireEvent.click(within(dialog).getByRole('button', { name: 'Skip version 0.4.0' }));
    expect(updates.dismiss).toHaveBeenCalledWith('0.4.0');
    push({ ...BASE, available: false });
    await waitFor(() => expect(screen.queryByRole('button', { name: /New version/ })).toBeNull());
  });

  it('moves keyboard focus to the page heading before the bell disappears after skipping', async () => {
    installBridge(BASE);
    render(<><main><h1 tabIndex={-1}>Overview</h1></main><UpdateBell /></>);
    const { dialog } = await openPopover();
    fireEvent.click(within(dialog).getByRole('button', { name: 'Skip version 0.4.0' }));
    expect(document.activeElement).toBe(screen.getByRole('heading', { name: 'Overview' }));
  });

  it('closes with Escape and returns focus to the bell', async () => {
    installBridge(BASE);
    render(<UpdateBell />);
    const { bell, dialog } = await openPopover();
    fireEvent.keyDown(dialog, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    expect(document.activeElement).toBe(bell);
  });

  it('closes with the close button', async () => {
    installBridge(BASE);
    render(<UpdateBell />);
    const { dialog } = await openPopover();
    const close = within(dialog).getByRole('button', { name: 'Close' });
    expect(close.title).toBe('Close');
    fireEvent.click(close);
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  });
});

describe('UpdateBell locale', () => {
  it('renders Vietnamese copy and date', async () => {
    await i18n.changeLanguage('vi');
    installBridge(BASE);
    render(<UpdateBell />);
    const bell = await screen.findByRole('button', { name: 'Có bản mới 0.4.0. Xem chi tiết' });
    fireEvent.click(bell);
    const dialog = await screen.findByRole('dialog');
    expect(within(dialog).getByRole('heading', { name: 'Lexora 0.4.0 đã có' })).toBeTruthy();
    expect(dialog.textContent).toContain('Bạn đang dùng 0.3.0. Phát hành');
    expect(within(dialog).getByRole('button', { name: 'Tải Lexora-0.4.0-x86_64.AppImage (151 MB)' })).toBeTruthy();
    expect(within(dialog).getByRole('button', { name: 'Bỏ qua bản 0.4.0' })).toBeTruthy();
  });
});

describe('Sidebar placement', () => {
  function renderSidebar() {
    return render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Sidebar /></MemoryRouter>);
  }

  it('puts the bell in the sidebar header before the collapse button', async () => {
    installBridge(BASE);
    renderSidebar();
    const sidebar = screen.getByRole('complementary');
    const bell = await within(sidebar).findByRole('button', { name: /New version 0.4.0/ });
    const collapse = within(sidebar).getByRole('button', { name: 'Collapse sidebar' });
    expect(bell.compareDocumentPosition(collapse) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(bell.closest('[data-sidebar-header]')).toBe(collapse.closest('[data-sidebar-header]'));
  });

  it('moves focus to the collapse button when the version is skipped from the sidebar', async () => {
    installBridge(BASE);
    renderSidebar();
    const sidebar = screen.getByRole('complementary');
    fireEvent.click(await within(sidebar).findByRole('button', { name: /New version 0.4.0/ }));
    fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Skip version 0.4.0' }));
    expect(document.activeElement).toBe(within(sidebar).getByRole('button', { name: 'Collapse sidebar' }));
  });

  it('adds nothing to the sidebar in the browser build', () => {
    renderSidebar();
    expect(screen.queryByRole('button', { name: /New version/ })).toBeNull();
    expect(screen.getByRole('button', { name: 'Collapse sidebar' })).toBeTruthy();
  });
});
