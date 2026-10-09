/**
 * @file ai-assistant.store.ts
 * @description Session state for Lexi, active conversation selection, and configuration/send race guards.
 */
import { create } from 'zustand';

import type {
  AiChatContext,
  AiChatLocale,
  MemoryMode,
} from '../api/ai.api';

export type ChatViewMode = 'chat' | 'history';

export function isConversationScopeMatching(
  conversation: {
    context: AiChatContext;
    locale: AiChatLocale;
    includeContent: boolean;
    includeProgress: boolean;
  },
  current: {
    context: AiChatContext;
    locale: AiChatLocale;
    includeContent: boolean;
    includeProgress: boolean;
  },
): boolean {
  if (conversation.locale !== current.locale) return false;
  if (conversation.includeContent !== current.includeContent) return false;
  if (conversation.includeProgress !== current.includeProgress) return false;
  if (conversation.context.kind !== current.context.kind) return false;
  if (conversation.context.kind === 'screen' && current.context.kind === 'screen') {
    return current.context.screen === conversation.context.screen;
  }
  return true;
}

export type AiAssistantState = {
  isOpen: boolean;
  view: ChatViewMode;
  activeConversationId: string | null;
  configurationRevision: string | null;
  includeContent: boolean;
  includeProgress: boolean;
  draft: string;
  isSending: boolean;
  error: string | null;
  epoch: number;
  currentRequestId: string | null;
  lastSentDraft: string | null;
  activeMemoryMode: MemoryMode | null;
  allowProviderChange: boolean;

  openGuide: () => void;
  closeGuide: () => void;
  setView: (view: ChatViewMode) => void;
  selectConversation: (id: string | null) => void;
  bindCreatedConversation: (id: string, epoch: number) => boolean;
  syncConfiguration: (revision: string) => void;
  setIncludeContent: (include: boolean) => void;
  setIncludeProgress: (include: boolean) => void;
  setDraft: (draft: string) => void;
  setError: (error: string | null) => void;
  setAllowProviderChange: (allow: boolean) => void;
  beginSend: (opts?: { reuseRequestId?: boolean; message?: string }) => number | null;
  abortSend: () => void;
  recordSuccess: (opts: {
    conversationId: string;
    memoryMode?: MemoryMode;
    userContent: string;
    epoch: number;
  }) => boolean;
  recordError: (errorMessage: string, epoch: number, retireRequestId?: boolean) => boolean;
  retireCurrentRequestId: (epoch: number) => boolean;
  resetActiveConversation: () => void;
};

export const useAiAssistantStore = create<AiAssistantState>()((set, get) => ({
  isOpen: false,
  view: 'chat',
  activeConversationId: null,
  configurationRevision: null,
  includeContent: true,
  includeProgress: false,
  draft: '',
  isSending: false,
  error: null,
  epoch: 0,
  currentRequestId: null,
  lastSentDraft: null,
  activeMemoryMode: null,
  allowProviderChange: false,

  openGuide: () => set({ isOpen: true }),

  closeGuide: () =>
    set((state) => ({
      isOpen: false,
      isSending: false,
      epoch: state.isSending ? state.epoch + 1 : state.epoch,
      error: state.isSending ? null : state.error,
    })),

  setView: (view) => set({ view, error: null }),

  selectConversation: (id) =>
    set((state) => ({
      activeConversationId: id,
      view: 'chat',
      error: null,
      activeMemoryMode: null,
      allowProviderChange: false,
      currentRequestId: null,
      lastSentDraft: null,
      isSending: false,
      epoch: state.epoch + 1,
    })),

  bindCreatedConversation: (id, epoch) => {
    if (get().epoch !== epoch) return false;
    set({ activeConversationId: id });
    return true;
  },

  syncConfiguration: (revision) => {
    if (get().configurationRevision === revision) return;
    set((state) => ({
      configurationRevision: revision,
      epoch: state.isSending ? state.epoch + 1 : state.epoch,
      error: null,
      isSending: false,
      allowProviderChange: false,
    }));
  },

  setIncludeContent: (includeContent) => {
    if (get().includeContent !== includeContent) {
      set((state) => ({
        includeContent,
        epoch: state.epoch + 1,
        isSending: false,
        error: null,
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
      }));
    }
  },

  setDraft: (draft) => set({ draft }),

  setError: (error) => set({ error }),

  setAllowProviderChange: (allowProviderChange) => set({ allowProviderChange }),

  beginSend: (opts) => {
    if (get().isSending) return null;
    const epoch = get().epoch;
    const currentMsg = opts?.message ?? get().draft;
    let requestId = get().currentRequestId;
    const sameIntent = Boolean(
      opts?.reuseRequestId && requestId && get().lastSentDraft === currentMsg,
    );
    if (!sameIntent) {
      requestId = crypto.randomUUID();
    }
    set({
      isSending: true,
      error: null,
      currentRequestId: requestId,
      lastSentDraft: currentMsg,
    });
    return epoch;
  },

  abortSend: () => {
    set((state) => ({
      isSending: false,
      epoch: state.epoch + 1,
    }));
  },

  recordSuccess: ({ conversationId, memoryMode, userContent, epoch }) => {
    if (get().epoch !== epoch) {
      return false;
    }
    set((state) => ({
      activeConversationId: conversationId,
      activeMemoryMode: memoryMode ?? null,
      currentRequestId: null,
      lastSentDraft: null,
      draft: state.draft.trim() === userContent.trim() ? '' : state.draft,
      error: null,
      isSending: false,
    }));
    return true;
  },

  recordError: (errorMessage, epoch, retireRequestId = false) => {
    if (get().epoch !== epoch) {
      return false;
    }
    set((state) => ({
      error: errorMessage,
      isSending: false,
      currentRequestId: retireRequestId ? null : state.currentRequestId,
      lastSentDraft: retireRequestId ? null : state.lastSentDraft,
    }));
    return true;
  },

  retireCurrentRequestId: (epoch) => {
    if (get().epoch !== epoch) return false;
    set({ currentRequestId: null, lastSentDraft: null });
    return true;
  },
  resetActiveConversation: () =>
    set((state) => ({
      activeConversationId: null,
      draft: '',
      error: null,
      isSending: false,
      view: 'chat',
      activeMemoryMode: null,
      currentRequestId: null,
      lastSentDraft: null,
      allowProviderChange: false,
      epoch: state.isSending ? state.epoch + 1 : state.epoch,
    })),
}));
