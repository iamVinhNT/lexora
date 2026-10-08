/**
 * @file ai-assistant.store.ts
 * @description Session state for Lexi, scoped history, and configuration/reset race guards.
 */
import { create } from 'zustand';

import type {
  AiChatContext,
  AiChatMessage,
  AiChatScreen,
} from '../api/ai.api';

export const MAX_STORED_MESSAGES = 40;
export const MAX_PROMPT_HISTORY = 8;
export const MAX_HISTORY_CHARS = 16000;

export type StoredChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  scopeKey: string;
  contextLabel?: string;
};

export function getContextDescriptorKey(context: AiChatContext): string {
  switch (context.kind) {
    case 'general':
      return 'general';
    case 'screen':
      return `screen:${context.screen}`;
    case 'grammar':
      return `grammar:${context.lessonId}:${context.revisionId}`;
    case 'word':
      return `word:${context.wordId}`;
    case 'context':
      return `context:${context.contextId}`;
    case 'learning':
      return `learning:${context.sessionId}:${context.wordId}:${context.step}`;
    case 'review':
      return `review:${context.wordId}`;
  }
}

export function buildScopeKey(
  descriptorKey: string,
  locale: string,
  includeProgress: boolean,
  configurationRevision: string,
  includeContent: boolean,
): string {
  return JSON.stringify([descriptorKey, locale, includeProgress, configurationRevision, includeContent]);
}

export function filterHistoryForScope(
  messages: StoredChatMessage[],
  scopeKey: string,
): AiChatMessage[] {
  const matching = messages.filter((msg) => msg.scopeKey === scopeKey);
  const sliced = matching.slice(-MAX_PROMPT_HISTORY);

  let totalChars = sliced.reduce((sum, msg) => sum + msg.content.length, 0);
  while (sliced.length > 0 && totalChars > MAX_HISTORY_CHARS) {
    const dropped = sliced.shift();
    if (dropped) {
      totalChars -= dropped.content.length;
    }
  }

  return sliced.map((msg) => ({
    role: msg.role,
    content: msg.content.slice(0, 4000),
  }));
}

type AiAssistantState = {
  isOpen: boolean;
  isHidden: boolean;
  configurationRevision: string | null;
  activeContext: AiChatContext | null;
  overrideContext: AiChatContext | null;
  includeContent: boolean;
  activeContextLabel: string | null;
  overrideContextLabel: string | null;
  includeProgress: boolean;
  draft: string;
  messages: StoredChatMessage[];
  isSending: boolean;
  error: string | null;
  errorScopeKey: string | null;
  prunedNotice: boolean;
  epoch: number;

  openGuide: (contextOverride?: AiChatContext, label?: string) => void;
  closeGuide: () => void;
  hideGuide: () => void;
  showGuide: () => void;
  syncConfiguration: (revision: string) => void;
  registerContext: (context: AiChatContext, label?: string) => () => void;
  clearOverrideContext: () => void;
  setIncludeContent: (include: boolean) => void;
  setIncludeProgress: (include: boolean) => void;
  setDraft: (draft: string) => void;
  setError: (error: string | null) => void;
  beginSend: () => number | null;
  recordSuccess: (
    userContent: string,
    assistantReply: string,
    scopeKey: string,
    contextLabel: string,
    epoch: number,
  ) => boolean;
  recordError: (errorMessage: string, epoch: number, scopeKey?: string) => boolean;
  resetConversation: () => void;
};

let messageCounter = 0;
function nextMessageId() {
  messageCounter += 1;
  return `msg-${Date.now()}-${messageCounter}`;
}

export const useAiAssistantStore = create<AiAssistantState>()((set, get) => ({
  isOpen: false,
  isHidden: false,
  configurationRevision: null,
  activeContext: null,
  overrideContext: null,
  includeContent: true,
  includeProgress: false,
  activeContextLabel: null,
  overrideContextLabel: null,
  draft: '',
  messages: [],
  isSending: false,
  error: null,
  errorScopeKey: null,
  prunedNotice: false,
  epoch: 0,

  openGuide: (contextOverride, label) => set({
    isOpen: true,
    isHidden: false,
    ...(contextOverride ? { overrideContext: contextOverride, overrideContextLabel: label ?? null } : {}),
  }),

  closeGuide: () => set({ isOpen: false }),
  hideGuide: () => set({ isHidden: true, isOpen: false }),
  showGuide: () => set({ isHidden: false }),
  syncConfiguration: (revision) => {
    if (get().configurationRevision === revision) return;
    set(state => ({
      configurationRevision: revision,
      epoch: state.epoch + 1,
      messages: [],
      error: null,
      errorScopeKey: null,
      isSending: false,
      prunedNotice: false,
    }));
  },


  registerContext: (context, label) => {
    set({ activeContext: context, activeContextLabel: label ?? null, overrideContext: null, overrideContextLabel: null });
    return () => {
      if (get().activeContext === context) {
        set({ activeContext: null, activeContextLabel: null });
      }
    };
  },

  clearOverrideContext: () => set({ overrideContext: null, overrideContextLabel: null }),

  setIncludeContent: (includeContent) => {
    if (get().includeContent !== includeContent) set(state => ({ includeContent, epoch: state.epoch + 1, isSending: false, error: null, errorScopeKey: null }));
  },

  setIncludeProgress: (includeProgress) => {
    if (get().includeProgress !== includeProgress) set(state => ({ includeProgress, epoch: state.epoch + 1, isSending: false, error: null, errorScopeKey: null }));
  },

  setDraft: (draft) => set({ draft }),

  setError: (error) => set({ error }),

  beginSend: () => {
    if (get().isSending) return null;
    const epoch = get().epoch;
    set({ isSending: true, error: null, errorScopeKey: null });
    return epoch;
  },

  recordSuccess: (userContent, assistantReply, scopeKey, contextLabel, epoch) => {
    if (get().epoch !== epoch) {
      return false;
    }

    const now = Date.now();
    const userMsg: StoredChatMessage = {
      id: nextMessageId(),
      role: 'user',
      content: userContent,
      timestamp: now,
      scopeKey,
      contextLabel,
    };
    const assistantMsg: StoredChatMessage = {
      id: nextMessageId(),
      role: 'assistant',
      content: assistantReply,
      timestamp: now + 1,
      scopeKey,
      contextLabel,
    };

    const combined = [...get().messages, userMsg, assistantMsg];
    let prunedNotice = get().prunedNotice;
    let nextMessages = combined;
    if (combined.length > MAX_STORED_MESSAGES) {
      nextMessages = combined.slice(-MAX_STORED_MESSAGES);
      prunedNotice = true;
    }

    set({
      messages: nextMessages,
      draft: get().draft.trim() === userContent ? '' : get().draft,
      error: null,
      errorScopeKey: null,
      isSending: false,
      prunedNotice,
    });
    return true;
  },

  recordError: (errorMessage, epoch, scopeKey) => {
    if (get().epoch !== epoch) {
      return false;
    }
    set({
      error: errorMessage,
      errorScopeKey: scopeKey ?? null,
      isSending: false,
    });
    return true;
  },

  resetConversation: () =>
    set((state) => ({
      messages: [],
      draft: '',
      error: null,
      errorScopeKey: null,
      isSending: false,
      prunedNotice: false,
      epoch: state.epoch + 1,
    })),
}));

export function getEffectiveContext(
  state: {
    activeContext: AiChatContext | null;
    overrideContext: AiChatContext | null;
    includeContent: boolean;
  },
  fallbackScreen: AiChatScreen,
): AiChatContext {
  if (!state.includeContent) {
    return { kind: 'screen', screen: fallbackScreen };
  }
  return state.overrideContext ?? state.activeContext ?? { kind: 'screen', screen: fallbackScreen };
}
