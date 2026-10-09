/**
 * @file ai-assistant.store.test.ts
 * @description Guards conversation selection, epoch concurrency, idempotent request retries, and scope matching.
 */
import { beforeEach, describe, expect, it } from 'vitest';
import {
  isConversationScopeMatching,
  useAiAssistantStore,
} from '../../src/stores/ai-assistant.store';

beforeEach(() => {
  useAiAssistantStore.getState().resetActiveConversation();
  useAiAssistantStore.getState().closeGuide();
});

describe('assistant store concurrency and lifecycle', () => {
  it('claims sends atomically and ignores stale response after resetting active conversation', () => {
    const oldEpoch = useAiAssistantStore.getState().beginSend();
    expect(oldEpoch).not.toBeNull();
    expect(useAiAssistantStore.getState().beginSend()).toBeNull();

    useAiAssistantStore.getState().resetActiveConversation();
    useAiAssistantStore.getState().setDraft('A new question');
    const newEpoch = useAiAssistantStore.getState().beginSend();
    expect(newEpoch).not.toBeNull();
    expect(newEpoch).not.toBe(oldEpoch);

    const oldSuccessRecorded = useAiAssistantStore.getState().recordSuccess({
      conversationId: 'conv-old',
      memoryMode: 'full',
      userContent: 'Old question',
      epoch: oldEpoch!,
    });
    expect(oldSuccessRecorded).toBe(false);
    expect(useAiAssistantStore.getState().activeConversationId).toBeNull();
    expect(useAiAssistantStore.getState().draft).toBe('A new question');
    expect(useAiAssistantStore.getState().isSending).toBe(true);

    const oldErrorRecorded = useAiAssistantStore.getState().recordError('Old failure', oldEpoch!);
    expect(oldErrorRecorded).toBe(false);
    expect(useAiAssistantStore.getState().error).toBeNull();
    expect(useAiAssistantStore.getState().isSending).toBe(true);
  });

  it('aborts sending and increments epoch on close or explicit abort without clearing draft', () => {
    useAiAssistantStore.getState().setDraft('My pending question');
    const epoch = useAiAssistantStore.getState().beginSend();
    expect(epoch).not.toBeNull();
    expect(useAiAssistantStore.getState().isSending).toBe(true);

    useAiAssistantStore.getState().closeGuide();
    expect(useAiAssistantStore.getState().isSending).toBe(false);
    expect(useAiAssistantStore.getState().epoch).toBe(epoch! + 1);
    expect(useAiAssistantStore.getState().draft).toBe('My pending question');

    const recorded = useAiAssistantStore.getState().recordSuccess({
      conversationId: 'conv-1',
      memoryMode: 'full',
      userContent: 'My pending question',
      epoch: epoch!,
    });
    expect(recorded).toBe(false);
  });

  it('retains requestId across retry on error and clears it on recordSuccess', () => {
    useAiAssistantStore.getState().setDraft('Translate this word');
    const epoch1 = useAiAssistantStore.getState().beginSend();
    expect(epoch1).not.toBeNull();
    const originalReqId = useAiAssistantStore.getState().currentRequestId;
    expect(originalReqId).toMatch(/^[0-9a-f-]{36}$/i);

    useAiAssistantStore.getState().recordError('Temporary network disconnection', epoch1!);
    expect(useAiAssistantStore.getState().isSending).toBe(false);
    expect(useAiAssistantStore.getState().error).toBe('Temporary network disconnection');
    expect(useAiAssistantStore.getState().currentRequestId).toBe(originalReqId);

    const epoch2 = useAiAssistantStore.getState().beginSend({ reuseRequestId: true });
    expect(epoch2).not.toBeNull();
    expect(useAiAssistantStore.getState().currentRequestId).toBe(originalReqId);
    expect(useAiAssistantStore.getState().error).toBeNull();

    const success = useAiAssistantStore.getState().recordSuccess({
      conversationId: 'conv-retry',
      memoryMode: 'compacted',
      userContent: 'Translate this word',
      epoch: epoch2!,
    });
    expect(success).toBe(true);
    expect(useAiAssistantStore.getState().activeConversationId).toBe('conv-retry');
    expect(useAiAssistantStore.getState().activeMemoryMode).toBe('compacted');
    expect(useAiAssistantStore.getState().currentRequestId).toBeNull();
    expect(useAiAssistantStore.getState().draft).toBe('');
  });

  it('binds created conversation during send without disrupting active epoch or request ID', () => {
    useAiAssistantStore.getState().setDraft('New thread query');
    const epoch = useAiAssistantStore.getState().beginSend();
    expect(epoch).not.toBeNull();
    const activeReqId = useAiAssistantStore.getState().currentRequestId;

    const boundStale = useAiAssistantStore
      .getState()
      .bindCreatedConversation('conv-late', epoch! - 1);
    expect(boundStale).toBe(false);
    expect(useAiAssistantStore.getState().activeConversationId).toBeNull();

    const bound = useAiAssistantStore
      .getState()
      .bindCreatedConversation('conv-new', epoch!);
    expect(bound).toBe(true);
    expect(useAiAssistantStore.getState().activeConversationId).toBe('conv-new');
    expect(useAiAssistantStore.getState().epoch).toBe(epoch);
    expect(useAiAssistantStore.getState().currentRequestId).toBe(activeReqId);
    expect(useAiAssistantStore.getState().isSending).toBe(true);
  });

  it('invalidates in-flight send on configuration revision change while preserving unsent draft', () => {
    const store = useAiAssistantStore.getState();
    store.syncConfiguration('rev-1');
    store.setDraft('My unsent question');

    const pendingEpoch = store.beginSend();
    expect(pendingEpoch).not.toBeNull();

    store.syncConfiguration('rev-1');
    expect(useAiAssistantStore.getState().epoch).toBe(pendingEpoch);
    expect(useAiAssistantStore.getState().isSending).toBe(true);

    store.syncConfiguration('rev-2');
    const stateAfterSync = useAiAssistantStore.getState();
    expect(stateAfterSync.epoch).toBe(pendingEpoch! + 1);
    expect(stateAfterSync.configurationRevision).toBe('rev-2');
    expect(stateAfterSync.isSending).toBe(false);
    expect(stateAfterSync.draft).toBe('My unsent question');

    const recorded = store.recordSuccess({
      conversationId: 'conv-stale',
      memoryMode: 'full',
      userContent: 'My unsent question',
      epoch: pendingEpoch!,
    });
    expect(recorded).toBe(false);
  });

  it('correctly matches and detects scope mismatches across screens, locales, and consents', () => {
    const conversation = {
      context: { kind: 'screen' as const, screen: 'vocabulary' as const },
      locale: 'en' as const,
      includeContent: true,
      includeProgress: false,
    };

    expect(
      isConversationScopeMatching(conversation, {
        context: { kind: 'screen', screen: 'vocabulary' },
        locale: 'en',
        includeContent: true,
        includeProgress: false,
      }),
    ).toBe(true);

    expect(
      isConversationScopeMatching(conversation, {
        context: { kind: 'screen', screen: 'grammar' },
        locale: 'en',
        includeContent: true,
        includeProgress: false,
      }),
    ).toBe(false);

    expect(
      isConversationScopeMatching(conversation, {
        context: { kind: 'screen', screen: 'vocabulary' },
        locale: 'vi',
        includeContent: true,
        includeProgress: false,
      }),
    ).toBe(false);

    expect(
      isConversationScopeMatching(conversation, {
        context: { kind: 'screen', screen: 'vocabulary' },
        locale: 'en',
        includeContent: false,
        includeProgress: false,
      }),
    ).toBe(false);

    expect(
      isConversationScopeMatching(conversation, {
        context: { kind: 'screen', screen: 'vocabulary' },
        locale: 'en',
        includeContent: true,
        includeProgress: true,
      }),
    ).toBe(false);
  });
});
