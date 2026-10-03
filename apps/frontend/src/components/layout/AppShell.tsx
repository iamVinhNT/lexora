/**
 * @file AppShell.tsx
 * @description Responsive application frame with route-aware focus management and navigation.
 */
import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { useUiStore } from '../../stores/ui.store';
import { MoreNavigationSheet } from './MoreNavigationSheet';
import { MobileBottomNav } from './MobileBottomNav';
import { MobileTopBar } from './MobileTopBar';
import { Sidebar } from './Sidebar';
import { SkipLink } from '../ui/SkipLink';

export function AppShell() {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const moreTriggerRef = useRef<HTMLButtonElement>(null);
  const appBackgroundRef = useRef<HTMLDivElement>(null);
  const isSidebarOpen = useUiStore((state) => state.isSidebarOpen);
  const isMoreOpen = useUiStore((state) => state.isMoreOpen);

  useEffect(() => {
    const background = appBackgroundRef.current;
    if (!background) return;

    if (isMoreOpen) {
      background.setAttribute('aria-hidden', 'true');
      background.setAttribute('inert', '');
    } else {
      background.removeAttribute('aria-hidden');
      background.removeAttribute('inert');
    }
  }, [isMoreOpen]);

  const previousPathnameRef = useRef(location.pathname);

  useEffect(() => {
    const isRouteNavigation = previousPathnameRef.current !== location.pathname;
    previousPathnameRef.current = location.pathname;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    const main = mainRef.current;
    if (!main) return;
    const activeElement = document.activeElement;
    const focusHeading = () => {
      const heading = main.querySelector<HTMLElement>('h1');
      heading?.focus();
      return Boolean(heading);
    };
    if (focusHeading()) return;
    let hasFocusMoved = false;
    const handleFocusIn = (event: FocusEvent) => {
      hasFocusMoved ||= event.target !== activeElement;
    };
    document.addEventListener('focusin', handleFocusIn);
    const observer = new MutationObserver(() => {
      if (!isRouteNavigation && hasFocusMoved) {
        observer.disconnect();
        document.removeEventListener('focusin', handleFocusIn);
        return;
      }
      if (focusHeading()) {
        observer.disconnect();
        document.removeEventListener('focusin', handleFocusIn);
      }
    });
    observer.observe(main, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, [location.pathname]);

  return (
    <div data-sidebar-open={isSidebarOpen} className="lexora-app min-h-screen text-foreground">
      <div ref={appBackgroundRef} data-app-background>
        <SkipLink />
        <Sidebar />
        <div
          className={`min-h-screen transition-[padding] duration-200 ease-in-out ${
            isSidebarOpen ? 'lg:pl-64' : 'lg:pl-16'
          }`}
        >
          <MobileTopBar />
          <main
            ref={mainRef}
            id="main-content"
            className="mx-auto min-h-[calc(100vh-4rem)] max-w-[1400px] px-4 pb-28 pt-8 sm:px-6 lg:min-h-screen lg:px-10 lg:pb-12 lg:pt-12"
          >
            <Outlet />
          </main>
          <MobileBottomNav moreTriggerRef={moreTriggerRef} />
        </div>
      </div>
      <MoreNavigationSheet triggerRef={moreTriggerRef} />
    </div>
  );
}
