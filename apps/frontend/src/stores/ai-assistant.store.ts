/**
 * @file ai-assistant.store.ts
 * @description Session state for Lexi, menu-scoped history, and configuration/reset race guards.
 */
import { create } from 'zustand';

import type {
  AiChatContext,
  AiChatMessage,
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
  configurationRevision: string | null;
  includeContent: boolean;
  includeProgress: boolean;
  draft: string;
  messages: StoredChatMessage[];
  isSending: boolean;
  error: string | null;
  errorScopeKey: string | null;
  prunedNotice: boolean;
  epoch: number;

  openGuide: () => void;
  closeGuide: () => void;
  syncConfiguration: (revision: string) => void;
  setIncludeContent: (include: boolean) => void;
  setIncludeProgress: (include: boolean) => void;
  setDraft: (draft: string) => void;
  setError: (error: string | null) => void;
  beginSend: () => number | null;
  abortSend: () => void;
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
  configurationRevision: null,
  includeContent: true,
  includeProgress: false,
  draft: '',
  messages: [],
  isSending: false,
  error: null,
  errorScopeKey: null,
  prunedNotice: false,
  epoch: 0,

  openGuide: () => set({ isOpen: true }),

  closeGuide: () =>
    set((state) => ({
      isOpen: false,
      isSending: false,
      epoch: state.isSending ? state.epoch + 1 : state.epoch,
      error: state.isSending ? null : state.error,
    })),

  syncConfiguration: (revision) => {
    if (get().configurationRevision === revision) return;
    set((state) => ({
      configurationRevision: revision,
      epoch: state.epoch + 1,
      messages: [],
      error: null,
      errorScopeKey: null,
      isSending: false,
      prunedNotice: false,
    }));
  },

  setIncludeContent: (includeContent) => {
    if (get().includeContent !== includeContent) {
      set((state) => ({
        includeContent,
        epoch: state.epoch + 1,
        isSending: false,
        error: null,
        errorScopeKey: null,
      }));
    }
  },

  setIncludeProgress: (includeProgress) => {
    if (get().includeProgress !== includeProgress) {
      set((state) => ({
        includeProgress,
        epoch: state.epoch + 1,
        isSending: false,
        error: null,
        errorScopeKey: null,
      }));
    }
  },

  setDraft: (draft) => set({ draft }),

  setError: (error) => set({ error }),

  beginSend: () => {
    if (get().isSending) return null;
    const epoch = get().epoch;
    set({ isSending: true, error: null, errorScopeKey: null });
    return epoch;
  },

  abortSend: () => {
    set((state) => ({
      isSending: false,
      epoch: state.epoch + 1,
    }));
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
