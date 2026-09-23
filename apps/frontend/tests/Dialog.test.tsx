/**
 * @file Dialog.test.tsx
 * @description Verifies Dialog portal rendering, full-screen blur backdrop, scroll locking, keyboard dismiss, focus management, and accessibility.
 */
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Dialog } from '../src/components/ui/Dialog';

describe('Dialog', () => {
  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('renders into document.body via createPortal', () => {
    const { container } = render(
      <Dialog title="Portal Dialog" onClose={vi.fn()}>
        <div>Dialog Content</div>
      </Dialog>,
    );

    expect(container.firstChild).toBeNull();
    const dialog = screen.getByRole('dialog', { name: 'Portal Dialog' });
    expect(document.body.contains(dialog)).toBe(true);
  });

  it('renders full-screen backdrop overlay with backdrop-blur-sm without sidebar offsets', () => {
    render(
      <Dialog title="Backdrop Dialog" onClose={vi.fn()}>
        <div>Dialog Content</div>
      </Dialog>,
    );

    const backdrop = screen.getByTestId('dialog-backdrop');
    expect(backdrop.className).toContain('fixed');
    expect(backdrop.className).toContain('inset-0');
    expect(backdrop.className).toContain('z-50');
    expect(backdrop.className).toContain('bg-overlay');
    expect(backdrop.className).toContain('backdrop-blur-sm');
    expect(backdrop.className).not.toContain('lg:left-64');
    expect(backdrop.className).not.toContain('lg:left-16');
  });

  it('locks body scroll on mount and restores previous overflow value on unmount', () => {
    document.body.style.overflow = 'auto';

    const { unmount } = render(
      <Dialog title="Scroll Lock Dialog" onClose={vi.fn()}>
        <div>Dialog Content</div>
      </Dialog>,
    );

    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.style.overflow).toBe('auto');

    // Test when original overflow was empty string
    document.body.style.overflow = '';
    const { unmount: unmountEmpty } = render(
      <Dialog title="Scroll Lock Dialog 2" onClose={vi.fn()}>
        <div>Dialog Content</div>
      </Dialog>,
    );
    expect(document.body.style.overflow).toBe('hidden');
    unmountEmpty();
    expect(document.body.style.overflow).toBe('');
  });

  it('makes background content inert and aria-hidden only while mounted', () => {
    const background = document.createElement('main');
    const preHidden = document.createElement('aside');
    preHidden.setAttribute('aria-hidden', 'false');
    preHidden.setAttribute('inert', 'preserved');
    document.body.append(background, preHidden);

    const { unmount } = render(
      <Dialog title="Inert Background Dialog" onClose={vi.fn()}>
        <div>Dialog Content</div>
      </Dialog>,
    );

    expect(background.getAttribute('aria-hidden')).toBe('true');
    expect(background.hasAttribute('inert')).toBe(true);
    expect(preHidden.getAttribute('aria-hidden')).toBe('true');
    expect(preHidden.getAttribute('inert')).toBe('');

    unmount();
    expect(background.hasAttribute('aria-hidden')).toBe(false);
    expect(background.hasAttribute('inert')).toBe(false);
    expect(preHidden.getAttribute('aria-hidden')).toBe('false');
    expect(preHidden.getAttribute('inert')).toBe('preserved');
    background.remove();
    preHidden.remove();
  });

  it('calls onClose when backdrop is clicked', () => {
    const handleClose = vi.fn();
    render(
      <Dialog title="Click Backdrop Dialog" onClose={handleClose}>
        <div>Dialog Content</div>
      </Dialog>,
    );

    const backdrop = screen.getByTestId('dialog-backdrop');
    fireEvent.click(backdrop);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when outer container padding is clicked but not when card is clicked', () => {
    const handleClose = vi.fn();
    render(
      <Dialog title="Container Click Dialog" onClose={handleClose}>
        <div data-testid="dialog-inner">Dialog Content</div>
      </Dialog>,
    );

    const backdrop = screen.getByTestId('dialog-backdrop');
    const container = backdrop.parentElement as HTMLElement;

    // Click inside dialog content does not close
    fireEvent.click(screen.getByTestId('dialog-inner'));
    expect(handleClose).not.toHaveBeenCalled();

    // Click outer container padding closes
    fireEvent.click(container);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <Dialog title="Close Button Dialog" onClose={handleClose}>
        <div>Dialog Content</div>
      </Dialog>,
    );

    const closeBtn = screen.getByRole('button', { name: /close close button dialog/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    const handleClose = vi.fn();
    render(
      <Dialog title="Escape Dialog" onClose={handleClose}>
        <div>Dialog Content</div>
      </Dialog>,
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('focuses the first eligible form field in DOM order', () => {
    render(
      <Dialog title="Initial Focus Dialog" onClose={vi.fn()}>
        <input data-testid="first-input" placeholder="First" />
        <select data-testid="second-select" aria-label="Second" />
        <textarea data-testid="third-textarea" aria-label="Third" />
      </Dialog>,
    );

    expect(document.activeElement).toBe(screen.getByTestId('first-input'));
  });

  it('skips hidden and disabled fields when choosing initial focus', () => {
    render(
      <Dialog title="Eligible Field Dialog" onClose={vi.fn()}>
        <input data-testid="hidden-input" type="hidden" />
        <input data-testid="hidden-attribute-input" hidden />
        <input data-testid="hidden-style-input" style={{ display: 'none' }} />
        <input data-testid="disabled-input" disabled />
        <select data-testid="eligible-select" aria-label="Eligible" />
      </Dialog>,
    );

    expect(document.activeElement).toBe(screen.getByTestId('eligible-select'));
  });

  it('traps focus with Tab and Shift+Tab within the dialog', () => {
    render(
      <Dialog title="Focus Trap Dialog" onClose={vi.fn()}>
        <input data-testid="first-input" placeholder="First" />
        <button type="button" data-testid="last-button">Last</button>
      </Dialog>,
    );

    const closeBtn = screen.getByRole('button', { name: /close focus trap dialog/i });
    const firstInput = screen.getByTestId('first-input');
    const lastBtn = screen.getByTestId('last-button');

    // Initially focused on first eligible form field
    expect(document.activeElement).toBe(firstInput);

    // Shift+Tab from first focusable wraps to last focusable
    closeBtn.focus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(lastBtn);

    // Tab from last focusable wraps to first focusable
    lastBtn.focus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: false });
    expect(document.activeElement).toBe(closeBtn);
  });

  it('returns focus to the dialog when Tab is pressed after focus escapes', () => {
    const outsideButton = document.createElement('button');
    document.body.appendChild(outsideButton);
    render(
      <Dialog title="Escaped Focus Dialog" onClose={vi.fn()}>
        <input aria-label="Dialog field" />
      </Dialog>,
    );

    outsideButton.focus();
    fireEvent.keyDown(document, { key: 'Tab' });

    expect(document.activeElement).toBe(screen.getByRole('button', { name: /close escaped focus dialog/i }));
    outsideButton.remove();
  });

  it('restores previous focus on unmount', () => {
    const trigger = document.createElement('button');
    trigger.textContent = 'Trigger';
    document.body.appendChild(trigger);
    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    const { unmount } = render(
      <Dialog title="Focus Restore Dialog" onClose={vi.fn()}>
        <div>Content</div>
      </Dialog>,
    );

    expect(document.activeElement).toBe(screen.getByRole('button', { name: /close focus restore dialog/i }));

    unmount();
    expect(document.activeElement).toBe(trigger);
    document.body.removeChild(trigger);
  });

  it('preserves accessible dialog role, title, wide layout, and modal semantics', () => {
    const { unmount } = render(
      <Dialog title="Accessible Modal" onClose={vi.fn()} wide>
        <p>Modal body copy</p>
      </Dialog>,
    );

    const dialog = screen.getByRole('dialog', { name: 'Accessible Modal' });
    expect(dialog).toBeTruthy();
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(screen.getByRole('heading', { level: 2, name: 'Accessible Modal' })).toBeTruthy();
    expect(screen.getByText('Modal body copy')).toBeTruthy();
    expect(dialog.className).toContain('max-w-3xl');
    expect(dialog.className).toContain('rounded-2xl');
    expect(dialog.className).toContain('shadow-xl');

    unmount();

    // Default non-wide modal
    render(
      <Dialog title="Default Modal" onClose={vi.fn()}>
        <p>Default copy</p>
      </Dialog>,
    );
    const defaultDialog = screen.getByRole('dialog', { name: 'Default Modal' });
    expect(defaultDialog.className).toContain('max-w-xl');
  });
});
