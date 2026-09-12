/**
 * @file setup.ts
 * @description Shared browser-like setup for frontend tests.
 */
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

import i18n, { LANGUAGE_STORAGE_KEY } from '../src/i18n/config';

afterEach(async () => {
  cleanup();
  await i18n.changeLanguage('en');
  localStorage.removeItem(LANGUAGE_STORAGE_KEY);
  document.documentElement.lang = 'en';
});

Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true });

class TestPointerEvent extends MouseEvent {
  pointerId = 1;
  pointerType = 'mouse';
}

window.PointerEvent = TestPointerEvent as typeof PointerEvent;

HTMLElement.prototype.hasPointerCapture = vi.fn();
HTMLElement.prototype.releasePointerCapture = vi.fn();
HTMLElement.prototype.setPointerCapture = vi.fn();
HTMLElement.prototype.scrollIntoView = vi.fn();

class TestResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = TestResizeObserver as unknown as typeof ResizeObserver;
