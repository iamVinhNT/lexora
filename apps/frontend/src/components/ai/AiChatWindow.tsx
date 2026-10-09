/**
 * @file AiChatWindow.tsx
 * @description Resizable menu-scoped chat window coordinating send orchestration, history, and scroll anchoring.
 */
import { useEffect, useMemo, useRef, type FormEvent } from 'react';
import { Clock, Maximize2, RotateCcw, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { AiChatLocale, AiChatScreen } from '../../api/ai.api';
import { useAiConversationTurns } from '../../hooks/useAiHistory';
import { useAiSettings } from '../../hooks/useAiSettings';
import { isConversationScopeMatching, useAiAssistantStore } from '../../stores/ai-assistant.store';
import { getLocalizedErrorMessage } from '../../i18n/presentation';
import { Button } from '../ui/Button';
import { AiChatInput } from './AiChatInput';
import { AiChatScopeNotice } from './AiChatScopeNotice';
import { AiChatTranscript } from './AiChatTranscript';
import { AiHistoryList } from './AiHistoryList';
import { useChatResize } from './useChatResize';
import { useAiChatSend } from './useAiChatSend';

interface AiChatWindowProps {
  onClose: () => void;
  screen: AiChatScreen;
  locale: AiChatLocale;
  revision: string;
  activeModel?: string;
  isConfigured?: boolean;
  settingsError?: unknown;
}

export function AiChatWindow({
  onClose,
  screen,
  locale,
  revision,
  activeModel,
  isConfigured,
  settingsError,
}: AiChatWindowProps) {
  const { t } = useTranslation('assistant');
  const { t: tCommon } = useTranslation('common');
  const state = useAiAssistantStore();
  const settings = useAiSettings(true);
  const { containerRef, size, cyclePreset, handlePointerDown, handleKeyDown } = useChatResize();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const prevTurnsCountRef = useRef(0);
  const prevFirstTurnIdRef = useRef<string | undefined>(undefined);
  const prevScrollHeightRef = useRef(0);
  const prevScrollTopRef = useRef(0);
  const prevConversationIdRef = useRef<string | null>(null);
  const prevClientHeightRef = useRef(0);
  const prevScrollerRef = useRef<HTMLDivElement | null>(null);
  const prevBlockingRef = useRef(false);

  const unavailable = isConfigured === false;
  const currentBaseURL = settings.data?.baseURL;
  const currentActiveModel = settings.data?.activeModel ?? activeModel;

  const turnsQuery = useAiConversationTurns(state.activeConversationId, 40, state.view === 'chat');
  const turns = useMemo(
    () => turnsQuery.data?.pages ? turnsQuery.data.pages.slice().reverse().flatMap(page => page.items) : [],
    [turnsQuery.data?.pages],
  );
  const activeConversation = turnsQuery.data?.pages?.[0]?.conversation;

  const isScopeMatching = activeConversation
    ? isConversationScopeMatching(activeConversation, {
        context: activeConversation.context.kind === 'general' ? { kind: 'general' } : { kind: 'screen', screen },
        locale,
        includeContent: state.includeContent,
        includeProgress: state.includeProgress,
      })
    : true;

  const isProviderMismatch = Boolean(
    activeConversation &&
      ((currentBaseURL && activeConversation.baseURL !== currentBaseURL) ||
        (currentActiveModel && activeConversation.model !== currentActiveModel)) &&
      !state.allowProviderChange,
  );

  const { send, cancelRequest, streamingText, question } = useAiChatSend({ screen, locale, revision });

  useEffect(() => {
    if (state.view === 'chat' && !state.isSending) textareaRef.current?.focus();
  }, [state.view, state.isSending]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const firstTurnId = turns[0]?.id;
    const changedThread = prevConversationIdRef.current !== state.activeConversationId;
    const blocking = !isScopeMatching || isProviderMismatch;
    const isPrependingOlder =
      !changedThread &&
      turns.length > prevTurnsCountRef.current &&
      firstTurnId !== prevFirstTurnIdRef.current &&
      prevFirstTurnIdRef.current !== undefined;

    if (blocking && (changedThread || !prevBlockingRef.current)) {
      scroller.scrollTop = 0;
    } else if (isPrependingOlder) {
      const heightDelta = scroller.scrollHeight - prevScrollHeightRef.current;
      scroller.scrollTop = prevScrollTopRef.current + heightDelta;
    } else {
      const wasNearBottom = prevScrollHeightRef.current - prevScrollTopRef.current - prevClientHeightRef.current < 120;
      if (!blocking && (changedThread || prevTurnsCountRef.current === 0 || wasNearBottom)) scroller.scrollTop = scroller.scrollHeight;
      else if (prevScrollerRef.current !== scroller) scroller.scrollTop = prevScrollTopRef.current;
    }

    prevConversationIdRef.current = state.activeConversationId;
    prevTurnsCountRef.current = turns.length;
    prevFirstTurnIdRef.current = firstTurnId;
    prevScrollHeightRef.current = scroller.scrollHeight;
    prevScrollTopRef.current = scroller.scrollTop;
    prevClientHeightRef.current = scroller.clientHeight;
    prevScrollerRef.current = scroller;
    prevBlockingRef.current = blocking;
  }, [turns, streamingText, question, state.activeConversationId, state.view, size.width, size.height, isScopeMatching, isProviderMismatch]);

  const close = () => {
    cancelRequest();
    onClose();
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    void send(undefined, Boolean(state.error));
  };

  const canSend =
    Boolean(state.draft.trim()) &&
    !state.isSending &&
    Boolean(revision) &&
    isConfigured === true &&
    isScopeMatching &&
    !isProviderMismatch;

  const contextLabel = activeConversation?.context.kind === 'general'
    ? t('contextBadges.general')
    : t('contextBadges.screen', { screen: t(`screens.${screen}`) });

  return (
    <div
      ref={containerRef}
      data-ai-guide="true"
      role="region"
      aria-label={t('title')}
      aria-describedby="lexi-description"
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          event.stopPropagation();
          close();
        }
      }}
      className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] right-3 z-30 flex min-h-0 flex-col rounded-2xl border border-border bg-surface shadow-lg md:bottom-5 md:right-5"
      style={{
        width: size.width,
        height: size.height,
        maxWidth: 'calc(100vw - 1.5rem)',
        maxHeight: 'calc(100dvh - 5.5rem - env(safe-area-inset-bottom))',
      }}
    >
      <div
        role="separator"
        tabIndex={0}
        aria-label={t('resizeHandle')}
        aria-orientation="horizontal"
        aria-valuenow={size.width}
        aria-valuemin={Math.min(280, window.innerWidth - 24)}
        aria-valuemax={Math.min(720, window.innerWidth - 24)}
        onPointerDown={handlePointerDown}
        onKeyDown={handleKeyDown}
        className="absolute -left-2 -top-2 z-10 flex h-8 w-8 cursor-nwse-resize touch-none items-center justify-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <span className="h-3 w-3 rounded-tl border-l-2 border-t-2 border-muted" />
      </div>

      <div className="flex shrink-0 items-center justify-between gap-1 border-b border-border px-3 py-1">
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-semibold">{t('title')}</h2>
          <p className="truncate text-xs text-muted">
            {contextLabel}{currentActiveModel ? ` · ${currentActiveModel}` : ''}
          </p>
        </div>
        <Button variant="ghost" onClick={() => { cancelRequest(); state.setView(state.view === 'history' ? 'chat' : 'history'); }} aria-label={t('historyButton')} title={t('historyButton')} className="min-h-11 min-w-11 px-2"><Clock size={16} aria-hidden="true" /></Button>
        <Button variant="ghost" onClick={cyclePreset} aria-label={t('resizeToggle')} title={t('resizeToggle')} className="hidden min-h-11 min-w-11 px-2 md:inline-flex"><Maximize2 size={16} aria-hidden="true" /></Button>
        <Button variant="ghost" onClick={() => { cancelRequest(); state.resetActiveConversation(); }} aria-label={t('newConversation')} title={t('newConversation')} className="min-h-11 min-w-11 px-2"><RotateCcw size={16} aria-hidden="true" /></Button>
        <Button variant="ghost" onClick={close} aria-label={t('closeAssistant')} className="min-h-11 min-w-11 px-2"><X size={18} aria-hidden="true" /></Button>
      </div>

      {state.view === 'history' ? (
        <AiHistoryList onBack={() => state.setView('chat')} onSelect={(id) => { cancelRequest(); state.selectConversation(id); }} activeId={state.activeConversationId} />
      ) : (
        <>
          <div ref={scrollerRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-3 py-2"
            onScroll={() => {
              if (scrollerRef.current) {
                prevScrollTopRef.current = scrollerRef.current.scrollTop;
                prevScrollHeightRef.current = scrollerRef.current.scrollHeight;
                prevClientHeightRef.current = scrollerRef.current.clientHeight;
              }
            }}>
            <AiChatScopeNotice
              activeConversation={activeConversation}
              currentScreen={screen}
              currentLocale={locale}
              isScopeMatching={isScopeMatching}
              isProviderMismatch={isProviderMismatch}
              currentProvider={currentActiveModel && currentBaseURL ? `${currentActiveModel} (${currentBaseURL})` : ''}
              onAllowProviderChange={() => state.setAllowProviderChange(true)}
              onConsentMatch={() => {
                if (activeConversation) {
                  state.setIncludeContent(activeConversation.includeContent);
                  state.setIncludeProgress(activeConversation.includeProgress);
                }
              }}
            />

            <AiChatTranscript
              turns={state.isSending ? turns.filter(turn => turn.requestId !== state.currentRequestId) : turns}
              hasOlderTurns={Boolean(turnsQuery.hasNextPage)}
              isLoadingOlderTurns={Boolean(turnsQuery.isFetchingNextPage)}
              onLoadOlderTurns={() => {
                if (scrollerRef.current) {
                  prevScrollTopRef.current = scrollerRef.current.scrollTop;
                  prevScrollHeightRef.current = scrollerRef.current.scrollHeight;
                }
                void turnsQuery.fetchNextPage();
              }}
              isSending={state.isSending}
              streamingText={streamingText}
              question={question}
              onSendTipQuestion={() => { const tip = t('tipQuestion'); state.setDraft(tip); void send(tip); }}
              canSendTipQuestion={Boolean(revision && isConfigured === true)}
              onIncludeContentChange={(checked) => { cancelRequest(); state.setIncludeContent(checked); }}
              onIncludeProgressChange={(checked) => { cancelRequest(); state.setIncludeProgress(checked); }}
              includeContent={state.includeContent}
              includeProgress={state.includeProgress}
            />

            {turnsQuery.isError && (
              <div role="alert" className="text-sm text-danger">
                <p>{t('errorHistory')}</p>
                <Button variant="ghost" onClick={() => void turnsQuery.refetch()}>{t('retry')}</Button>
              </div>
            )}
            {state.error && <p role="alert" className="text-sm text-danger">{state.error}</p>}
            {settingsError ? <p role="alert" className="text-sm text-danger">{getLocalizedErrorMessage(settingsError, tCommon)}</p> : null}
            {(unavailable || Boolean(settingsError)) && (
              <div className="space-y-1 text-sm">
                <p>{t('notConfigured')}</p>
                <Link to="/settings" onClick={close} className="inline-flex min-h-11 items-center font-semibold text-primary underline">{t('openSettings')}</Link>
              </div>
            )}
          </div>

          <AiChatInput
            textareaRef={textareaRef}
            draft={state.draft}
            onDraftChange={(val) => state.setDraft(val)}
            onSubmit={submit}
            disabled={state.isSending || !isScopeMatching || isProviderMismatch}
            canSend={canSend}
            hasTurns={turns.length > 0}
            isError={Boolean(state.error)}
          />
        </>
      )}
    </div>
  );
}
