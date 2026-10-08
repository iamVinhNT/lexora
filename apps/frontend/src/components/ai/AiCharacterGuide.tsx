/**
 * @file AiCharacterGuide.tsx
 * @description Nonmodal Lexi speech bubble with scoped replies, manual AI requests, and configuration race guards.
 */
import { useEffect, useRef, useState, type FormEvent } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { EyeOff, RotateCcw, Send, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { sendAiChatMessage, type AiChatContext, type AiChatScreen } from '../../api/ai.api';
import { ApiError } from '../../api/client';
import { aiSettingsQueryOptions, useAiSettings } from '../../hooks/useAiSettings';
import { buildScopeKey, filterHistoryForScope, getContextDescriptorKey, getEffectiveContext, useAiAssistantStore, type StoredChatMessage } from '../../stores/ai-assistant.store';
import { useUiStore } from '../../stores/ui.store';
import { getLocalizedErrorMessage } from '../../i18n/presentation';
import { Button } from '../ui/Button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/Popover';
import { LexiCharacter, type LexiPose } from './LexiCharacter';

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
  const { t: tCommon } = useTranslation('common');
  const location = useLocation();
  const queryClient = useQueryClient();
  const state = useAiAssistantStore();
  const isMoreOpen = useUiStore(value => value.isMoreOpen);
  const [hasModal, setHasModal] = useState(false);
  const showRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const settings = useAiSettings(state.isOpen && !isMoreOpen && !hasModal);
  const metadata = settings.data;
  const screen = getScreenFromPathname(location.pathname);
  const locale = i18n.language.startsWith('vi') ? 'vi' : 'en';
  const context = getEffectiveContext(state, screen);
  const revision = metadata?.revision ?? state.configurationRevision ?? '';
  const scopeKey = buildScopeKey(getContextDescriptorKey(context), locale, state.includeProgress, revision, state.includeContent);
  let reply: StoredChatMessage | undefined;
  for (let index = state.messages.length - 1; index >= 0; index--) {
    const candidate = state.messages[index];
    if (candidate.role === 'assistant' && candidate.scopeKey === scopeKey) { reply = candidate; break; }
  }
  const error = state.errorScopeKey === scopeKey ? state.error : null;
  const unavailable = metadata?.isConfigured === false;
  const pose: LexiPose = state.isSending ? 'thinking' : error || unavailable || settings.isError ? 'error' : reply ? 'speaking' : 'idle';

  useEffect(() => {
    const checkModal = () => {
      const modal = Boolean(document.querySelector('[role="dialog"][aria-modal="true"], [role="alertdialog"][aria-modal="true"]'));
      setHasModal(modal);
      if (modal) useAiAssistantStore.getState().closeGuide();
    };
    checkModal();
    const observer = new MutationObserver(checkModal);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['aria-modal'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isMoreOpen) state.closeGuide();
  }, [isMoreOpen, state.closeGuide]);

  useEffect(() => {
    if (state.isHidden) showRef.current?.focus();
  }, [state.isHidden]);

  useEffect(() => {
    if (state.isOpen && metadata && !settings.isFetching && !state.isSending) {
      state.syncConfiguration(metadata.revision);
    }
  }, [state.isOpen, metadata, settings.isFetching, state.isSending, state.syncConfiguration]);

  const contextLabel = () => {
    const registeredLabel = state.includeContent ? (state.overrideContext ? state.overrideContextLabel : state.activeContextLabel) : null;
    if (registeredLabel) return registeredLabel;
    switch (context.kind) {
      case 'general': return t('contextBadges.general');
      case 'screen': return t('contextBadges.screen', { screen: t(`screens.${context.screen}`) });
      case 'grammar': return t('contextBadges.grammar', { id: context.lessonId });
      case 'word': return t('screens.vocabulary');
      case 'context': return t('screens.contexts');
      case 'learning': return t('contextBadges.learning', { step: context.step });
      case 'review': return t('screens.review');
    }
  };

  const send = async (question = useAiAssistantStore.getState().draft) => {
    const message = question.trim();
    if (!message || message.length > 2000) return;
    let epoch = useAiAssistantStore.getState().beginSend();
    if (epoch === null) return;
    const requestContext: AiChatContext = context;
    const includeProgress = state.includeProgress;
    let requestScope = scopeKey;
    try {
      const fresh = await queryClient.fetchQuery(aiSettingsQueryOptions);
      if (useAiAssistantStore.getState().epoch !== epoch) return;
      const current = useAiAssistantStore.getState();
      // No await between configuration reset and reclaim: another send cannot enter this gap.
      current.syncConfiguration(fresh.revision);
      if (useAiAssistantStore.getState().epoch !== epoch) {
        const freshEpoch = useAiAssistantStore.getState().beginSend();
        if (freshEpoch === null) return;
        epoch = freshEpoch;
      }
      requestScope = buildScopeKey(getContextDescriptorKey(requestContext), locale, includeProgress, fresh.revision, state.includeContent);
      if (!fresh.isConfigured) throw new ApiError('AI is not configured.', 503, 'AI_NOT_CONFIGURED');
      const history = filterHistoryForScope(useAiAssistantStore.getState().messages, requestScope);
      const response = await sendAiChatMessage({ message, locale, context: requestContext, includeProgress, configRevision: fresh.revision, ...(history.length ? { history } : {}) });
      if (response.configRevision !== fresh.revision) throw new ApiError('AI configuration changed.', 409, 'AI_CONFIG_CHANGED');
      useAiAssistantStore.getState().recordSuccess(message, response.reply, requestScope, response.context.label, epoch);
    } catch (failure) {
      if (epoch !== null) useAiAssistantStore.getState().recordError(getLocalizedErrorMessage(failure, tCommon), epoch, requestScope);
    }
  };

  const submit = (event: FormEvent) => { event.preventDefault(); void send(); };
  const position = 'fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] right-3 z-30 md:bottom-5 md:right-5';
  if (isMoreOpen || hasModal) return null;
  if (state.isHidden) return <button ref={showRef} data-ai-guide="true" type="button" onClick={state.showGuide} className={`${position} min-h-11 rounded-full border border-border bg-surface px-3 text-xs font-semibold text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`} aria-label={t('showGuide')}>{t('showGuide')}</button>;

  return <Popover open={state.isOpen} onOpenChange={open => open ? state.openGuide() : state.closeGuide()} modal={false}>
    <PopoverTrigger asChild>
      <button ref={triggerRef} data-ai-guide="true" type="button" aria-label={state.isOpen ? t('closeAssistant') : t('openAssistant')} className={`${position} flex ${state.isOpen ? 'min-h-16 min-w-14 [&>span]:h-16 [&>span]:w-14 md:min-h-28 md:min-w-24 md:[&>span]:h-28 md:[&>span]:w-24' : 'min-h-28 min-w-24'} items-center justify-center rounded-2xl bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}>
        <LexiCharacter pose={pose} />
      </button>
    </PopoverTrigger>
    <PopoverContent side="top" align="end" sideOffset={8} aria-labelledby="lexi-title" aria-describedby="lexi-description" data-ai-guide="true"
      onOpenAutoFocus={event => { event.preventDefault(); inputRef.current?.focus(); }}
      onCloseAutoFocus={event => {
        if (document.querySelector('[aria-modal="true"]')) event.preventDefault();
        else if (useAiAssistantStore.getState().isHidden) { event.preventDefault(); showRef.current?.focus(); }
      }}
      style={{ width: 'min(352px, calc(100vw - 16px))', maxHeight: 'min(460px, var(--radix-popover-content-available-height))' }}
      className="flex min-h-0 flex-col !rounded-2xl !p-0">
      <PopoverPrimitive.Arrow width={20} height={10} className="fill-surface" />
      <div className="flex shrink-0 items-center justify-between gap-1 border-b border-border px-3 py-1">
        <h2 id="lexi-title" className="text-sm font-semibold">{t('title')}</h2>
        <div className="flex items-center">
          <Button type="button" variant="ghost" onClick={state.resetConversation} aria-label={t('newConversation')} title={t('newConversation')} className="min-h-11 min-w-11 px-2"><RotateCcw size={16} aria-hidden="true" /></Button>
          <Button type="button" variant="ghost" onClick={state.hideGuide} aria-label={t('hideGuide')} title={t('hideGuide')} className="min-h-11 min-w-11 px-2"><EyeOff size={16} aria-hidden="true" /></Button>
          <Button type="button" variant="ghost" onClick={state.closeGuide} aria-label={t('closeAssistant')} className="min-h-11 min-w-11 px-2"><X size={18} aria-hidden="true" /></Button>
        </div>
      </div>
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-3 py-2">
        <p className="break-words text-xs text-muted">{contextLabel()}{metadata?.activeModel ? ` · ${metadata.activeModel}` : ''}</p>
        <div aria-live="polite" aria-atomic="true" className="whitespace-pre-wrap break-words text-sm leading-relaxed">
          {state.isSending ? <p role="status">{t('sending')}</p> : error ? <p role="alert">{error}</p> : settings.isError ? <p role="alert">{getLocalizedErrorMessage(settings.error, tCommon)}</p> : unavailable ? <p>{t('notConfigured')}</p> : reply ? <p>{reply.content}</p> : <p>{t('emptyDescription')}</p>}
        </div>
        {(unavailable || settings.isError) && <Link to="/settings" onClick={state.closeGuide} className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline">{t('openSettings')}</Link>}
        {!reply && !unavailable && !settings.isError && <Button type="button" variant="secondary" disabled={state.isSending || !metadata} onClick={() => { const question = t('tipQuestion'); state.setDraft(question); void send(question); }} className="min-h-11 w-full whitespace-normal text-left text-xs">{t('tipQuestion')}</Button>}
        <p id="lexi-description" className="text-xs leading-relaxed text-muted">{t('privacyNotice')}</p>
        <details className="text-xs">
          <summary className="flex min-h-11 cursor-pointer items-center font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t('privacyControls')}</summary>
          <div className="space-y-1 pb-1">
            <label className="flex min-h-11 cursor-pointer items-center gap-2"><input type="checkbox" checked={state.includeContent} onChange={event => state.setIncludeContent(event.target.checked)} />{t('includeContent')}</label>
            <label className="flex min-h-11 cursor-pointer items-center gap-2"><input type="checkbox" checked={state.includeProgress} onChange={event => state.setIncludeProgress(event.target.checked)} />{t('includeProgress')}</label>
          </div>
        </details>
      </div>
      <form onSubmit={submit} className="shrink-0 border-t border-border p-3">
        <label htmlFor="lexi-question" className="sr-only">{t('inputLabel')}</label>
        <div className="flex items-end gap-2">
          <textarea ref={inputRef} id="lexi-question" value={state.draft} onChange={event => state.setDraft(event.target.value)} onKeyDown={event => {
            if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); void send(); }
          }} placeholder={reply ? t('followUpPlaceholder') : t('inputPlaceholder')} maxLength={2000} rows={1} disabled={state.isSending}
            className="min-h-11 min-w-0 flex-1 resize-none rounded-lg border border-border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50" />
          <Button type="submit" disabled={!state.draft.trim() || state.isSending} aria-label={error ? t('retry') : t('send')} title={error ? t('retry') : t('send')} className="min-h-11 min-w-11 px-3"><Send aria-hidden="true" size={18} /></Button>
        </div>
      </form>
    </PopoverContent>
  </Popover>;
}
