/**
 * @file MoreNavigationSheet.tsx
 * @description Keyboard-accessible mobile sheet for secondary navigation routes.
 */
import type { RefObject } from 'react';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { moreNavigation } from './navigation';
import { useUiStore } from '../../stores/ui.store';

type MoreNavigationSheetProps = {
  triggerRef: RefObject<HTMLButtonElement>;
};

function defer(callback: () => void) {
  if (typeof queueMicrotask === 'function') {
    queueMicrotask(callback);
    return;
  }

  Promise.resolve().then(callback);
}

export function MoreNavigationSheet({ triggerRef }: MoreNavigationSheetProps) {
  const { t } = useTranslation('navigation');
  const isMoreOpen = useUiStore((state) => state.isMoreOpen);
  const closeMore = useUiStore((state) => state.closeMore);
  const location = useLocation();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const restoreFocusRef = useRef(true);
  const wasOpenRef = useRef(false);
  const openedLocationRef = useRef('');
  const currentLocationRef = useRef('');
  const previousLocationRef = useRef('');
  const locationSignature = `${location.pathname}${location.search}${location.hash}`;
  currentLocationRef.current = locationSignature;

  const closeAndReturnFocus = () => {
    closeMore();
  };

  useEffect(() => {
    if (!isMoreOpen) return;

    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeAndReturnFocus();
      if (event.key !== 'Tab') return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement;
      const activeIsFocusable = focusable.includes(activeElement as HTMLElement);
      if (event.shiftKey && (activeElement === first || !activeIsFocusable)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (activeElement === last || !activeIsFocusable)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMoreOpen]);

  useEffect(() => {
    const locationChanged = previousLocationRef.current !== locationSignature;
    previousLocationRef.current = locationSignature;
    if (!locationChanged || !wasOpenRef.current) return;

    restoreFocusRef.current = false;
    if (useUiStore.getState().isMoreOpen) closeMore();
  }, [closeMore, locationSignature]);

  useEffect(() => {
    if (isMoreOpen) {
      wasOpenRef.current = true;
      restoreFocusRef.current = true;
      openedLocationRef.current = locationSignature;
      return;
    }

    if (!wasOpenRef.current) return;

    wasOpenRef.current = false;
    const openedLocation = openedLocationRef.current;
    const shouldRestoreFocus = restoreFocusRef.current && openedLocation === currentLocationRef.current;
    restoreFocusRef.current = false;
    openedLocationRef.current = '';
    if (!shouldRestoreFocus) return;

    defer(() => {
      if (useUiStore.getState().isMoreOpen) return;
      if (currentLocationRef.current !== openedLocation) return;
      triggerRef.current?.focus();
    });
  }, [isMoreOpen, locationSignature, triggerRef]);

  useEffect(() => {
    const mediaQuery = window.matchMedia?.('(min-width: 1024px)');
    if (!mediaQuery) return;

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        restoreFocusRef.current = false;
        closeMore();
      }
    };

    if (mediaQuery.matches) {
      restoreFocusRef.current = false;
      closeMore();
    }

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [closeMore]);

  if (!isMoreOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
         aria-label={t('closeBackdrop')}
        tabIndex={-1}
        onClick={closeAndReturnFocus}
        className="absolute inset-0 bg-overlay"
      />
      <section
        ref={dialogRef}
        id="more-navigation"
        role="dialog"
        aria-modal="true"
        aria-labelledby="more-navigation-title"
        tabIndex={-1}
        className="absolute inset-x-0 bottom-0 rounded-t-2xl border border-border bg-surface p-5 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <h2 id="more-navigation-title" className="text-lg font-semibold text-foreground">
             {t('moreTitle')}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
             aria-label={t('closeMore')}
            onClick={closeAndReturnFocus}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X aria-hidden="true" size={20} />
          </button>
        </div>
        <nav aria-label={t('moreLinks')} className="mt-4 grid gap-1">
          {moreNavigation.map(({ labelKey, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => {
                restoreFocusRef.current = false;
                closeMore();
              }}
              className={({ isActive }) =>
                `flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive ? 'bg-primary-subtle text-primary' : 'text-muted hover:bg-secondary hover:text-foreground'
                }`
              }
            >
              <Icon aria-hidden="true" size={18} />
              {t(labelKey)}
            </NavLink>
          ))}
        </nav>
      </section>
    </div>
  );
}
