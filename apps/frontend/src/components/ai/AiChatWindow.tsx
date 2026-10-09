/**
 * @file AiChatWindow.tsx
 * @description Resizable menu-scoped chat with frame-buffered replies and cancelable request ownership.
 */
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { Maximize2, RotateCcw, Send, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { streamAiChatMessage, type AiChatLocale, type AiChatScreen } from '../../api/ai.api';
import { ApiError } from '../../api/client';
import { aiSettingsQueryOptions } from '../../hooks/useAiSettings';
import { buildScopeKey, filterHistoryForScope, useAiAssistantStore } from '../../stores/ai-assistant.store';
import { getLocalizedErrorMessage } from '../../i18n/presentation';
import { Button } from '../ui/Button';
import { useChatResize } from './useChatResize';

interface AiChatWindowProps {
  onClose: () => void;
  screen: AiChatScreen;
  locale: AiChatLocale;
  revision: string;
  activeModel?: string;
  isConfigured?: boolean;
  settingsError?: unknown;
}

export function AiChatWindow({ onClose, screen, locale, revision, activeModel, isConfigured, settingsError }: AiChatWindowProps) {
  const { t } = useTranslation('assistant');
  const { t: tCommon } = useTranslation('common');
  const queryClient = useQueryClient();
  const state = useAiAssistantStore();
  const { containerRef, size, cyclePreset, handlePointerDown, handleKeyDown } = useChatResize();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<{ controller: AbortController; epoch: number; scope: string } | null>(null);
  const textRef = useRef('');
  const frameRef = useRef(0);
  const [streamingText, setStreamingText] = useState('');
  const [question, setQuestion] = useState('');
  const scopeKey = buildScopeKey(`screen:${screen}`, locale, state.includeProgress, revision, state.includeContent);
  const messages = state.messages.filter(message => message.scopeKey === scopeKey);
  const error = state.errorScopeKey === scopeKey ? state.error : null;
  const unavailable = isConfigured === false;

  const clearLiveTurn = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = 0;
    textRef.current = '';
    setStreamingText('');
    setQuestion('');
  }, []);
  const cancelRequest = useCallback(() => {
    const request = requestRef.current;
    requestRef.current = null;
    request?.controller.abort();
    if (request && useAiAssistantStore.getState().epoch === request.epoch) useAiAssistantStore.getState().abortSend();
    clearLiveTurn();
  }, [clearLiveTurn]);

  useEffect(() => {
    textareaRef.current?.focus();
    return () => cancelRequest();
  }, [cancelRequest]);
  useEffect(() => {
    const request = requestRef.current;
    if (request && (request.scope !== scopeKey || request.epoch !== state.epoch)) cancelRequest();
  }, [scopeKey, state.epoch, cancelRequest]);
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (scroller && (messages.length || streamingText || question)) scroller.scrollTop = scroller.scrollHeight;
  }, [messages.length, streamingText, question]);

  const send = async (value = useAiAssistantStore.getState().draft) => {
    const message = value.trim();
    if (!message || message.length > 2000 || !revision) return;
    const store = useAiAssistantStore.getState();
    let epoch = store.beginSend();
    if (epoch === null) return;
    const controller = new AbortController();
    const request = { controller, epoch, scope: scopeKey };
    requestRef.current = request;
    clearLiveTurn();
    setQuestion(message);
    try {
      const fresh = await queryClient.fetchQuery(aiSettingsQueryOptions);
      if (controller.signal.aborted || useAiAssistantStore.getState().epoch !== epoch) return;
      request.scope = buildScopeKey(`screen:${screen}`, locale, store.includeProgress, fresh.revision, store.includeContent);
      store.syncConfiguration(fresh.revision);
      if (useAiAssistantStore.getState().epoch !== epoch) {
        epoch = useAiAssistantStore.getState().beginSend();
        if (epoch === null) return;
        request.epoch = epoch;
      }
      if (!fresh.isConfigured) throw new ApiError('AI is not configured.', 503, 'AI_NOT_CONFIGURED');
      const history = filterHistoryForScope(useAiAssistantStore.getState().messages, request.scope);
      const response = await streamAiChatMessage({
        message, locale, context: { kind: 'screen', screen }, includeContent: store.includeContent,
        includeProgress: store.includeProgress, configRevision: fresh.revision, ...(history.length ? { history } : {}),
      }, { onDelta: text => {
        if (controller.signal.aborted || useAiAssistantStore.getState().epoch !== request.epoch) return;
        textRef.current += text;
        if (!frameRef.current) frameRef.current = requestAnimationFrame(() => {
          frameRef.current = 0;
          setStreamingText(textRef.current);
        });
      } }, controller.signal);
      if (!controller.signal.aborted) store.recordSuccess(message, response.reply, request.scope, response.context.label, request.epoch);
    } catch (failure) {
      if (!controller.signal.aborted) store.recordError(getLocalizedErrorMessage(failure, tCommon), request.epoch, request.scope);
    } finally {
      if (requestRef.current === request) {
        requestRef.current = null;
        clearLiveTurn();
      }
    }
  };
  const close = () => { cancelRequest(); onClose(); };
  const submit = (event: FormEvent) => { event.preventDefault(); void send(); };
  const bubble = 'max-w-[88%] whitespace-pre-wrap break-words rounded-xl px-3 py-2 text-sm leading-relaxed';
  const assistantBubble = `${bubble} border border-border bg-background text-foreground`;
  const userBubble = `${bubble} bg-primary text-primary-foreground`;

  return <div ref={containerRef} data-ai-guide="true" role="region" aria-label={t('title')} aria-describedby="lexi-description"
    onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close(); } }}
    className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] right-3 z-30 flex min-h-0 flex-col rounded-2xl border border-border bg-surface shadow-lg md:bottom-5 md:right-5"
    style={{ width: size.width, height: size.height, maxWidth: 'calc(100vw - 1.5rem)', maxHeight: 'calc(100dvh - 5.5rem - env(safe-area-inset-bottom))' }}>
    <div role="separator" tabIndex={0} aria-label={t('resizeHandle')} aria-orientation="horizontal"
      aria-valuenow={size.width} aria-valuemin={Math.min(280, window.innerWidth - 24)} aria-valuemax={Math.min(720, window.innerWidth - 24)}
      onPointerDown={handlePointerDown} onKeyDown={handleKeyDown}
      className="absolute -left-2 -top-2 z-10 flex h-8 w-8 cursor-nwse-resize touch-none items-center justify-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
      <span className="h-3 w-3 rounded-tl border-l-2 border-t-2 border-muted" />
    </div>
    <div className="flex shrink-0 items-center justify-between gap-1 border-b border-border px-3 py-1">
      <div className="min-w-0 flex-1"><h2 className="truncate text-sm font-semibold">{t('title')}</h2>
        <p className="truncate text-xs text-muted">{t('contextBadges.screen', { screen: t(`screens.${screen}`) })}{activeModel ? ` · ${activeModel}` : ''}</p>
      </div>
      <Button variant="ghost" onClick={cyclePreset} aria-label={t('resizeToggle')} title={t('resizeToggle')} className="min-h-11 min-w-11 px-2"><Maximize2 size={16} aria-hidden="true" /></Button>
      <Button variant="ghost" onClick={() => { cancelRequest(); state.resetConversation(); }} aria-label={t('newConversation')} title={t('newConversation')} className="min-h-11 min-w-11 px-2"><RotateCcw size={16} aria-hidden="true" /></Button>
      <Button variant="ghost" onClick={close} aria-label={t('closeAssistant')} className="min-h-11 min-w-11 px-2"><X size={18} aria-hidden="true" /></Button>
    </div>
    <div ref={scrollerRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-3 py-2">
      {!messages.length && !state.isSending && !error && !unavailable && !settingsError && <>
        <p className="text-sm leading-relaxed text-muted">{t('emptyDescription')}</p>
        <Button variant="secondary" disabled={!revision || isConfigured !== true} onClick={() => { const tip = t('tipQuestion'); state.setDraft(tip); void send(tip); }} className="min-h-11 w-full whitespace-normal text-left text-xs">{t('tipQuestion')}</Button>
      </>}
      <p id="lexi-description" className="text-xs leading-relaxed text-muted">{t('privacyNotice')}</p>
      <details className="text-xs"><summary className="flex min-h-11 cursor-pointer items-center font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t('privacyControls')}</summary>
        <label className="flex min-h-11 items-center gap-2"><input type="checkbox" checked={state.includeContent} onChange={event => { cancelRequest(); state.setIncludeContent(event.target.checked); }} />{t('includeContent')}</label>
        <label className="flex min-h-11 items-center gap-2"><input type="checkbox" checked={state.includeProgress} onChange={event => { cancelRequest(); state.setIncludeProgress(event.target.checked); }} />{t('includeProgress')}</label>
      </details>
      {messages.map(message => <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
        <p className={message.role === 'user' ? userBubble : assistantBubble}>{message.content}</p>
      </div>)}
      {state.isSending && question && <div className="flex justify-end"><p className={userBubble}>{question}</p></div>}
      {state.isSending && <div className="flex justify-start"><p className={assistantBubble} aria-busy="true">{streamingText || t('sending')}</p></div>}
      <p role="status" className="sr-only">{state.isSending ? t('sending') : messages.at(-1)?.content}</p>
      {error && <p role="alert" className="text-sm text-danger">{error}</p>}
      {settingsError ? <p role="alert" className="text-sm text-danger">{getLocalizedErrorMessage(settingsError, tCommon)}</p> : null}
      {(unavailable || Boolean(settingsError)) && <div className="space-y-1 text-sm"><p>{t('notConfigured')}</p>
        <Link to="/settings" onClick={close} className="inline-flex min-h-11 items-center font-semibold text-primary underline">{t('openSettings')}</Link>
      </div>}
    </div>
    <form onSubmit={submit} className="shrink-0 border-t border-border p-3">
      <label htmlFor="lexi-question" className="sr-only">{t('inputLabel')}</label>
      <div className="flex items-end gap-2"><textarea ref={textareaRef} id="lexi-question" value={state.draft} onChange={event => state.setDraft(event.target.value)}
        onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); void send(); } }}
        placeholder={messages.length ? t('followUpPlaceholder') : t('inputPlaceholder')} maxLength={2000} rows={1} disabled={state.isSending}
        className="min-h-11 min-w-0 flex-1 resize-none rounded-lg border border-border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50" />
        <Button type="submit" disabled={!state.draft.trim() || state.isSending || !revision || isConfigured !== true} aria-label={error ? t('retry') : t('send')} className="min-h-11 min-w-11 px-3"><Send size={18} aria-hidden="true" /></Button>
      </div>
    </form>
  </div>;
}
