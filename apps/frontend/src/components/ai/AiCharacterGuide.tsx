/**
 * @file AiCharacterGuide.tsx
 * @description Root controller for Lexi robot guide and nonmodal streaming assistant chat window.
 */
import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import type { AiChatLocale, AiChatScreen } from '../../api/ai.api';
import { useAiSettings } from '../../hooks/useAiSettings';
import { useAiAssistantStore } from '../../stores/ai-assistant.store';
import { useUiStore } from '../../stores/ui.store';
import { LexiCharacter, type LexiPose } from './LexiCharacter';
import { AiChatWindow } from './AiChatWindow';

function getScreenFromPathname(pathname: string): AiChatScreen {
  if (pathname.startsWith('/learn')) return 'learn';
  if (pathname.startsWith('/review')) return 'review';
  if (pathname.startsWith('/words')) return 'vocabulary';
  if (pathname.startsWith('/contexts')) return 'contexts';
  if (pathname.startsWith('/analytics')) return 'statistics';
  if (pathname.startsWith('/grammar')) return 'grammar';
  if (pathname.startsWith('/calendar')) return 'calendar';
  if (pathname.startsWith('/settings')) return 'settings';
  return 'overview';
}

export function AiCharacterGuide() {
  const { t, i18n } = useTranslation('assistant');
  const location = useLocation();
  const state = useAiAssistantStore();
  const isMoreOpen = useUiStore((val) => val.isMoreOpen);

  const [hasModal, setHasModal] = useState(false);
  const robotButtonRef = useRef<HTMLButtonElement | null>(null);
  const wasOpenRef = useRef(state.isOpen);

  const screen = getScreenFromPathname(location.pathname);
  const locale: AiChatLocale = i18n.language.startsWith('vi') ? 'vi' : 'en';

  const settings = useAiSettings(state.isOpen && !isMoreOpen && !hasModal);
  const metadata = settings.data;
  const revision = metadata?.revision ?? state.configurationRevision ?? '';
  const unavailable = metadata?.isConfigured === false;

  // Restore focus to robot trigger button on chat close
  useEffect(() => {
    if (wasOpenRef.current && !state.isOpen) {
      robotButtonRef.current?.focus();
    }
    wasOpenRef.current = state.isOpen;
  }, [state.isOpen]);

  useEffect(() => {
    if (state.isOpen && metadata && !settings.isFetching) {
      state.syncConfiguration(metadata.revision);
    }
  }, [state.isOpen, metadata, settings.isFetching, state.syncConfiguration]);

  // Close chat and abort when More navigation sheet opens
  useEffect(() => {
    if (isMoreOpen && state.isOpen) {
      state.abortSend();
      state.closeGuide();
    }
  }, [isMoreOpen, state.isOpen, state.abortSend, state.closeGuide]);


  // Scope-filtered modal observer: ignores all mutations within AI guide to avoid text streaming jank
  useEffect(() => {
    const checkModal = () => {
      const modal = Boolean(
        document.querySelector(
          '[role="dialog"][aria-modal="true"]:not([data-ai-guide] *):not([data-ai-guide]), [role="alertdialog"][aria-modal="true"]:not([data-ai-guide] *):not([data-ai-guide])'
        )
      );
      setHasModal(modal);
      if (modal) {
        useAiAssistantStore.getState().abortSend();
        useAiAssistantStore.getState().closeGuide();
      }
    };

    checkModal();

    const observer = new MutationObserver((mutations) => {
      let relevant = false;
      for (const mutation of mutations) {
        const target = mutation.target as HTMLElement | null;
        // Ignore mutations occurring inside the guide container
        if (target?.closest?.('[data-ai-guide="true"]')) {
          continue;
        }

        if (mutation.type === 'attributes' && mutation.attributeName === 'aria-modal') {
          relevant = true;
          break;
        }

        if (mutation.type === 'childList') {
          for (const node of mutation.addedNodes) {
            if (node instanceof HTMLElement) {
              if (
                (node.getAttribute('role') === 'dialog' || node.getAttribute('role') === 'alertdialog') &&
                node.getAttribute('aria-modal') === 'true'
              ) {
                relevant = true;
                break;
              }
              if (node.querySelector?.('[role="dialog"][aria-modal="true"], [role="alertdialog"][aria-modal="true"]')) {
                relevant = true;
                break;
              }
            }
          }
          if (relevant) break;

          for (const node of mutation.removedNodes) {
            if (node instanceof HTMLElement) {
              if (
                node.getAttribute('aria-modal') === 'true' ||
                node.querySelector?.('[role="dialog"][aria-modal="true"], [role="alertdialog"][aria-modal="true"]')
              ) {
                relevant = true;
                break;
              }
            }
          }
          if (relevant) break;
        }
      }

      if (relevant) {
        checkModal();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['aria-modal'],
    });

    return () => observer.disconnect();
  }, []);

  const handleOpen = useCallback(() => {
    state.openGuide();
  }, [state]);

  const handleClose = useCallback(() => {
    state.closeGuide();
  }, [state]);

  if (isMoreOpen || hasModal) {
    return null;
  }

  const position = 'fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] right-3 z-30 md:bottom-5 md:right-5';

  // When chat is open: robot is completely unmounted to release WebGL / GPU resources
  if (state.isOpen) {
    return (
      <AiChatWindow
        onClose={handleClose}
        screen={screen}
        locale={locale}
        revision={revision}
        activeModel={metadata?.activeModel}
        isConfigured={metadata?.isConfigured}
        settingsError={settings.error}
      />
    );
  }

  // When chat is closed: robot is mounted and focusable
  const pose: LexiPose = unavailable || settings.isError ? 'error' : 'idle';
  const size = screen === 'review' ? 'h-16 w-14 md:h-28 md:w-24 [&>span]:h-full [&>span]:w-full' : 'min-h-28 min-w-24';

  return (
    <button
      ref={robotButtonRef}
      data-ai-guide="true"
      type="button"
      onClick={handleOpen}
      aria-label={t('openAssistant')}
      title={t('openAssistant')}
      className={`${position} flex ${size} items-center justify-center rounded-2xl bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
    >
      <LexiCharacter pose={pose} />
    </button>
  );
}
