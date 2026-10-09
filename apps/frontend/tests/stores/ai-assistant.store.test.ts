/**
 * @file ai-assistant.store.test.ts
 * @description Guards conversation reset races, privacy scopes, and bounded session/history state.
 */
import { beforeEach, describe, expect, it } from 'vitest';
import { buildScopeKey, filterHistoryForScope, getContextDescriptorKey, useAiAssistantStore } from '../../src/stores/ai-assistant.store';

beforeEach(() => {
  useAiAssistantStore.getState().resetConversation();
  useAiAssistantStore.getState().closeGuide();
});

describe('assistant conversation boundaries', () => {
  it('claims sends atomically and ignores stale response after resetting during an in-flight request', () => {
    const oldEpoch = useAiAssistantStore.getState().beginSend()!;
    expect(useAiAssistantStore.getState().beginSend()).toBeNull();
    useAiAssistantStore.getState().resetConversation();
    useAiAssistantStore.getState().setDraft('A new question');
    const newEpoch = useAiAssistantStore.getState().beginSend()!;
    expect(newEpoch).not.toBe(oldEpoch);
    useAiAssistantStore.getState().recordSuccess('Old question', 'Old reply', 'old-scope', 'Old lesson', oldEpoch);
    expect(useAiAssistantStore.getState().messages).toEqual([]);
    expect(useAiAssistantStore.getState().draft).toBe('A new question');
    expect(useAiAssistantStore.getState().isSending).toBe(true);
    useAiAssistantStore.getState().recordError('Old failure', oldEpoch);
    expect(useAiAssistantStore.getState().error).toBeNull();
    expect(useAiAssistantStore.getState().isSending).toBe(true);
  });

  it('excludes previously shared progress and another screen menu from next prompt history', () => {
    const state = useAiAssistantStore.getState();
    const learnScreen = getContextDescriptorKey({ kind: 'screen', screen: 'learn' });
    const reviewScreen = getContextDescriptorKey({ kind: 'screen', screen: 'review' });
    const privateScope = buildScopeKey(learnScreen, 'en', true, 'provider-a', true);
    state.recordSuccess('How is my progress?', 'Private progress and target spelling', privateScope, 'Learn', state.epoch);
    const messages = useAiAssistantStore.getState().messages;
    expect(filterHistoryForScope(messages, buildScopeKey(learnScreen, 'en', false, 'provider-a', true))).toEqual([]);
    expect(filterHistoryForScope(messages, buildScopeKey(reviewScreen, 'en', true, 'provider-a', true))).toEqual([]);
    expect(filterHistoryForScope(messages, buildScopeKey(learnScreen, 'vi', true, 'provider-a', true))).toEqual([]);
    expect(filterHistoryForScope(messages, buildScopeKey(learnScreen, 'en', true, 'provider-b', true))).toEqual([]);
    expect(filterHistoryForScope(messages, buildScopeKey(learnScreen, 'en', true, 'provider-a', false))).toEqual([]);
  });

  it('aborts sending and increments epoch on close or explicit abort without clearing draft', () => {
    useAiAssistantStore.getState().setDraft('My pending question');
    const epoch = useAiAssistantStore.getState().beginSend()!;
    expect(useAiAssistantStore.getState().isSending).toBe(true);
    useAiAssistantStore.getState().closeGuide();
    expect(useAiAssistantStore.getState().isSending).toBe(false);
    expect(useAiAssistantStore.getState().epoch).toBe(epoch + 1);
    expect(useAiAssistantStore.getState().draft).toBe('My pending question');
    expect(useAiAssistantStore.getState().recordSuccess('My pending question', 'Late reply', 'scope', 'Label', epoch)).toBe(false);
  });

  it('bounds stored conversation and prompt history while preserving unsent draft', () => {
    const scope = buildScopeKey('general', 'en', false, 'provider-a', true);
    useAiAssistantStore.getState().setDraft('Unsent draft');
    for (let index = 0; index < 24; index++) {
      const state = useAiAssistantStore.getState();
      state.recordSuccess(`question-${index} ${'q'.repeat(1980)}`, `reply-${index} ${'r'.repeat(3980)}`, scope, 'General', state.epoch);
    }
    const state = useAiAssistantStore.getState();
    expect(state.messages).toHaveLength(40);
    expect(state.prunedNotice).toBe(true);
    expect(state.messages.some(message => message.content.startsWith('question-0 '))).toBe(false);
    expect(state.draft).toBe('Unsent draft');
    const history = filterHistoryForScope(state.messages, scope);
    expect(history.length).toBeLessThanOrEqual(8);
    expect(history.reduce((sum, message) => sum + message.content.length, 0)).toBeLessThanOrEqual(16000);
    expect(history.at(-1)?.content).toContain('reply-23 ');
  });

  it('invalidates pending requests on provider changes while preserving draft and ignores repeated metadata', () => {
    const store = useAiAssistantStore.getState();
    store.syncConfiguration('provider-a');
    const oldEpoch = useAiAssistantStore.getState().beginSend()!;
    store.recordSuccess('Question', 'Reply', 'old-scope', 'Lesson', oldEpoch);
    store.setDraft('Unsent question');
    const pendingEpoch = store.beginSend()!;
    store.syncConfiguration('provider-a');
    expect(useAiAssistantStore.getState().epoch).toBe(pendingEpoch);
    expect(useAiAssistantStore.getState().isSending).toBe(true);
    store.syncConfiguration('provider-b');
    const current = useAiAssistantStore.getState();
    expect(current.epoch).toBe(pendingEpoch + 1);
    expect(current.configurationRevision).toBe('provider-b');
    expect(current.messages).toEqual([]);
    expect(current.error).toBeNull();
    expect(current.isSending).toBe(false);
    expect(current.draft).toBe('Unsent question');
    const freshEpoch = current.beginSend()!;
    expect(store.recordSuccess('Old question', 'Old reply', 'old-scope', 'Lesson', pendingEpoch)).toBe(false);
    expect(store.recordError('Old provider failed', pendingEpoch)).toBe(false);
    expect(useAiAssistantStore.getState().isSending).toBe(true);
    expect(useAiAssistantStore.getState().epoch).toBe(freshEpoch);
    expect(useAiAssistantStore.getState().messages).toEqual([]);
  });

  it('discards a pending send after consent changes without losing an unsent question', () => {
    const store = useAiAssistantStore.getState();
    store.setIncludeProgress(true);
    store.setDraft('Please explain');
    const pendingEpoch = store.beginSend()!;
    store.setIncludeProgress(false);
    expect(useAiAssistantStore.getState().epoch).not.toBe(pendingEpoch);
    expect(store.recordSuccess('Please explain', 'Private progress reply', 'old-scope', 'Lesson', pendingEpoch)).toBe(false);
    expect(useAiAssistantStore.getState().draft).toBe('Please explain');
    expect(useAiAssistantStore.getState().messages).toEqual([]);
    expect(useAiAssistantStore.getState().isSending).toBe(false);
    const nextEpoch = store.beginSend()!;
    store.setIncludeContent(false);
    expect(store.recordError('Old failure', nextEpoch)).toBe(false);
    expect(useAiAssistantStore.getState().draft).toBe('Please explain');
    store.setIncludeContent(true);
  });
});
