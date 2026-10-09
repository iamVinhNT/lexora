/**
 * @file useAiChatSend.ts
 * @description Hook managing AI send lifecycle, lazy thread creation, and epoch-safe streaming.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { streamAiChatMessage, type AiChatContext, type AiChatLocale, type AiChatScreen } from '../../api/ai.api';
import { createAiConversation, getAiConversation } from '../../api/ai-history.api';
import { ApiError } from '../../api/client';
import { aiHistoryKeys } from '../../hooks/useAiHistory';
import { aiSettingsQueryOptions } from '../../hooks/useAiSettings';
import { useAiAssistantStore } from '../../stores/ai-assistant.store';
import { getLocalizedErrorMessage } from '../../i18n/presentation';

interface UseAiChatSendOptions {
  screen: AiChatScreen;
  locale: AiChatLocale;
  revision: string;
}

export function useAiChatSend({ screen, locale, revision }: UseAiChatSendOptions) {
  const { t: tCommon } = useTranslation('common');
  const queryClient = useQueryClient();
  const state = useAiAssistantStore();

  const requestRef = useRef<{
    controller: AbortController;
    epoch: number;
    screen: AiChatScreen;
    locale: AiChatLocale;
  } | null>(null);

  const textRef = useRef('');
  const frameRef = useRef(0);
  const [streamingText, setStreamingText] = useState('');
  const [question, setQuestion] = useState('');

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
    if (request && useAiAssistantStore.getState().epoch === request.epoch) {
      useAiAssistantStore.getState().abortSend();
    }
    clearLiveTurn();
  }, [clearLiveTurn]);

  useEffect(() => {
    const req = requestRef.current;
    if (req && (req.screen !== screen || req.locale !== locale || req.epoch !== state.epoch)) {
      cancelRequest();
    }
  }, [screen, locale, state.epoch, cancelRequest]);

  useEffect(() => () => cancelRequest(), [cancelRequest]);

  const send = async (value = useAiAssistantStore.getState().draft, reuseRequestId = false) => {
    const message = value.trim();
    if (!message || message.length > 2000 || !revision) return;
    const store = useAiAssistantStore.getState();
    const epoch = store.beginSend({ reuseRequestId, message });
    if (epoch === null) return;

    const controller = new AbortController();
    const request = { controller, epoch, screen, locale };
    requestRef.current = request;
    clearLiveTurn();
    setQuestion(message);

    try {
      const fresh = await queryClient.fetchQuery(aiSettingsQueryOptions);
      if (controller.signal.aborted || useAiAssistantStore.getState().epoch !== epoch) return;

      store.syncConfiguration(fresh.revision);
      if (useAiAssistantStore.getState().epoch !== epoch) return;
      if (!fresh.isConfigured) throw new ApiError('AI is not configured.', 503, 'AI_NOT_CONFIGURED');

      let conversationId = store.activeConversationId;
      let expectedRevision = 1;
      let context: AiChatContext = { kind: 'screen', screen };

      if (!conversationId) {
        const created = await createAiConversation(
          {
            context: { kind: 'screen', screen },
            locale,
            includeContent: store.includeContent,
            includeProgress: store.includeProgress,
            configRevision: fresh.revision,
          },
          controller.signal,
        );

        if (controller.signal.aborted || useAiAssistantStore.getState().epoch !== epoch) return;

        const bound = store.bindCreatedConversation(created.id, epoch);
        if (!bound) return;

        conversationId = created.id;
        expectedRevision = created.revision;
      } else {
        const detail = await queryClient.fetchQuery({
          queryKey: [...aiHistoryKeys.detail(conversationId), {}],
          queryFn: () => getAiConversation(conversationId!, {}, controller.signal),
          staleTime: 0,
        });

        if (controller.signal.aborted || useAiAssistantStore.getState().epoch !== epoch) return;
        expectedRevision = detail.conversation.revision;
        if (detail.conversation.context.kind === 'general') context = { kind: 'general' };
      }

      const activeReqId =
        useAiAssistantStore.getState().currentRequestId ?? crypto.randomUUID();

      const response = await streamAiChatMessage(
        {
          conversationId,
          requestId: activeReqId,
          expectedConversationRevision: expectedRevision,
          allowProviderChange: store.allowProviderChange,
          configRevision: fresh.revision,
          message,
          locale,
          context,
          includeContent: store.includeContent,
          includeProgress: store.includeProgress,
        },
        {
          onDelta: (text) => {
            if (
              controller.signal.aborted ||
              useAiAssistantStore.getState().epoch !== epoch
            ) {
              return;
            }
            textRef.current += text;
            if (!frameRef.current) {
              frameRef.current = requestAnimationFrame(() => {
                frameRef.current = 0;
                setStreamingText(textRef.current);
              });
            }
          },
        },
        controller.signal,
      );

      if (!controller.signal.aborted && useAiAssistantStore.getState().epoch === epoch) {
        await queryClient.invalidateQueries({ queryKey: aiHistoryKeys.detail(conversationId) });
        if (controller.signal.aborted || useAiAssistantStore.getState().epoch !== epoch) return;
        store.recordSuccess({
          conversationId: response.conversationId,
          memoryMode: response.memoryMode,
          userContent: message,
          epoch,
        });
        void queryClient.invalidateQueries({ queryKey: aiHistoryKeys.lists() });
      }
    } catch (failure) {
      if (!controller.signal.aborted && useAiAssistantStore.getState().epoch === epoch) {
        const convId = useAiAssistantStore.getState().activeConversationId;
        const reqId = useAiAssistantStore.getState().currentRequestId;
        let shouldRetireRequestId = false;

        if (failure instanceof ApiError && failure.status < 500 && failure.code !== 'AI_REQUEST_IN_PROGRESS') {
          shouldRetireRequestId = true;
        }

        if (convId && reqId) {
          try {
            const recheck = await getAiConversation(convId, { limit: 5 }, controller.signal);
            if (controller.signal.aborted || useAiAssistantStore.getState().epoch !== epoch) return;
            const existingTurn = recheck.items.find((item) => item.requestId === reqId);
            if (existingTurn) {
              if (existingTurn.status === 'COMPLETED' && existingTurn.assistantReply) {
                await queryClient.invalidateQueries({ queryKey: aiHistoryKeys.detail(convId) });
                if (controller.signal.aborted || useAiAssistantStore.getState().epoch !== epoch) return;
                store.recordSuccess({
                  conversationId: convId,
                  userContent: message,
                  epoch,
                });
                void queryClient.invalidateQueries({ queryKey: aiHistoryKeys.lists() });
                return;
              }
              if (existingTurn.status === 'FAILED' || existingTurn.status === 'CANCELLED') {
                shouldRetireRequestId = true;
              }
              if (existingTurn.status === 'PENDING') shouldRetireRequestId = false;
            }
          } catch {
            // Ambiguous disconnect retains requestId for replay
          }
        }
        if (useAiAssistantStore.getState().epoch === epoch) {
          store.recordError(getLocalizedErrorMessage(failure, tCommon), epoch, shouldRetireRequestId);
        }
      }
    } finally {
      if (requestRef.current === request && useAiAssistantStore.getState().epoch === epoch) {
        requestRef.current = null;
        clearLiveTurn();
      }
    }
  };

  return {
    send,
    cancelRequest,
    streamingText,
    question,
  };
}
