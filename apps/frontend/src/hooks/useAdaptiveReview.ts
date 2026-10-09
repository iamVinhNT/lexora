/**
 * @file useAdaptiveReview.ts
 * @description State orchestration hook for the evidence-backed adaptive review workspace.
 */
import { useCallback, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import type {
  CompleteReviewResult,
  ReviewAttemptView,
  ReviewRating,
  ReviewStepAction,
} from '../api/review.api';
import { useAiSettings } from './useAiSettings';
import {
  useAbandonReviewAttempt,
  useActiveReviewAttempt,
  useBeginReviewAttempt,
  useCompleteReview,
  useReviewQueue,
  useSubmitReviewStep,
} from './useReviewQueue';
import { useStudyTask } from './useStudyCalendar';

function generateRequestId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'req-' + Math.random().toString(36).substring(2, 15) + '-' + Date.now().toString(36);
}

function safeSessionStorage() {
  if (typeof window === 'undefined') return null;
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

function getOrSetIntentRequestId(fingerprint: string): string {
  const storage = safeSessionStorage();
  const storedFingerprint = storage?.getItem('lexora_review_intent_fp');
  const storedRequestId = storage?.getItem('lexora_review_intent_id');
  if (storedFingerprint === fingerprint && storedRequestId) {
    return storedRequestId;
  }
  const newId = generateRequestId();
  try {
    storage?.setItem('lexora_review_intent_fp', fingerprint);
    storage?.setItem('lexora_review_intent_id', newId);
  } catch {
    // Ignore storage quota
  }
  return newId;
}

function clearIntentRecord() {
  const storage = safeSessionStorage();
  try {
    storage?.removeItem('lexora_review_intent_fp');
    storage?.removeItem('lexora_review_intent_id');
  } catch {
    // Ignore storage quota
  }
}

export function getReviewDraft(attemptId: string, stage: string): string {
  const storage = safeSessionStorage();
  if (!storage) return '';
  return storage.getItem(`lexora_review_draft_${attemptId}_${stage}`) || '';
}

export function setReviewDraft(attemptId: string, stage: string, value: string): void {
  const storage = safeSessionStorage();
  if (!storage) return;
  try {
    if (value) {
      storage.setItem(`lexora_review_draft_${attemptId}_${stage}`, value);
    } else {
      storage.removeItem(`lexora_review_draft_${attemptId}_${stage}`);
    }
  } catch {
    // Ignore storage quota errors
  }
}

export function clearReviewDraft(attemptId: string, stage: string): void {
  const storage = safeSessionStorage();
  if (!storage) return;
  try {
    storage.removeItem(`lexora_review_draft_${attemptId}_${stage}`);
  } catch {
    // Ignore storage errors
  }
}

export function useAdaptiveReview() {
  const [searchParams] = useSearchParams();
  const urlTaskId = searchParams.get('taskId')?.trim() || '';

  const queueQuery = useReviewQueue({ limit: 50 });
  const activeAttemptQuery = useActiveReviewAttempt();
  const aiSettings = useAiSettings();

  const activeAttempt = activeAttemptQuery.data ?? null;
  const currentDueItem = queueQuery.data?.items[0] ?? null;

  const effectiveTaskId = activeAttempt ? activeAttempt.studyTaskId ?? '' : urlTaskId;
  const isTaskMismatch = Boolean(
    activeAttempt &&
    urlTaskId &&
    activeAttempt.studyTaskId !== urlTaskId,
  );
  const studyTask = useStudyTask(effectiveTaskId);
  const beginMutation = useBeginReviewAttempt();
  const stepMutation = useSubmitReviewStep();
  const completeMutation = useCompleteReview();
  const abandonMutation = useAbandonReviewAttempt();

  const [completedItems, setCompletedItems] = useState<CompleteReviewResult[]>([]);
  const isSubmittingRef = useRef(false);
  const lastFailedActionRef = useRef<(() => Promise<unknown>) | null>(null);

  const startReview = useCallback(
    async (wordId?: string) => {
      const targetWordId = wordId || currentDueItem?.wordId;
      if (!targetWordId || isSubmittingRef.current || beginMutation.isPending) return null;
      isSubmittingRef.current = true;
      const fingerprint = JSON.stringify({ wordId: targetWordId, studyTaskId: urlTaskId || null, type: 'BEGIN' });
      const requestId = getOrSetIntentRequestId(fingerprint);
      try {
        const attempt = await beginMutation.mutateAsync({
          requestId,
          wordId: targetWordId,
          studyTaskId: urlTaskId || undefined,
        });
        clearIntentRecord();
        lastFailedActionRef.current = null;
        return attempt;
      } catch (err) {
        lastFailedActionRef.current = () => startReview(wordId);
        return null;
      } finally {
        isSubmittingRef.current = false;
      }
    },
    [beginMutation, currentDueItem?.wordId, urlTaskId],
  );

  const submitStep = useCallback(
    async (action: ReviewStepAction) => {
      if (!activeAttempt || isSubmittingRef.current || stepMutation.isPending) return null;
      isSubmittingRef.current = true;
      const fingerprint = JSON.stringify({
        attemptId: activeAttempt.id,
        version: activeAttempt.version,
        action,
      });
      const requestId = getOrSetIntentRequestId(fingerprint);
      try {
        const updated = await stepMutation.mutateAsync({
          attemptId: activeAttempt.id,
          input: {
            requestId,
            expectedVersion: activeAttempt.version,
            ...action,
          },
        });
        clearIntentRecord();
        lastFailedActionRef.current = null;
        if (action.action === 'RECALL') {
          clearReviewDraft(activeAttempt.id, 'recall');
        } else if (action.action === 'OUTPUT') {
          clearReviewDraft(activeAttempt.id, 'output');
        }
        return updated;
      } catch (err) {
        lastFailedActionRef.current = () => submitStep(action);
        return null;
      } finally {
        isSubmittingRef.current = false;
      }
    },
    [activeAttempt, stepMutation],
  );

  const completeRating = useCallback(
    async (rating: ReviewRating): Promise<CompleteReviewResult | null> => {
      if (!activeAttempt || isSubmittingRef.current || completeMutation.isPending) return null;
      isSubmittingRef.current = true;
      const fingerprint = JSON.stringify({
        attemptId: activeAttempt.id,
        version: activeAttempt.version,
        rating,
      });
      const requestId = getOrSetIntentRequestId(fingerprint);
      try {
        const result = await completeMutation.mutateAsync({
          requestId,
          attemptId: activeAttempt.id,
          expectedVersion: activeAttempt.version,
          rating,
        });
        clearIntentRecord();
        lastFailedActionRef.current = null;
        clearReviewDraft(activeAttempt.id, 'recall');
        clearReviewDraft(activeAttempt.id, 'output');
        setCompletedItems((prev) => [...prev, result]);
        return result;
      } catch (err) {
        lastFailedActionRef.current = () => completeRating(rating);
        return null;
      } finally {
        isSubmittingRef.current = false;
      }
    },
    [activeAttempt, completeMutation],
  );

  const abandonAttempt = useCallback(async () => {
    if (!activeAttempt || isSubmittingRef.current || abandonMutation.isPending) return null;
    isSubmittingRef.current = true;
    const fingerprint = JSON.stringify({
      attemptId: activeAttempt.id,
      version: activeAttempt.version,
      type: 'ABANDON',
    });
    const requestId = getOrSetIntentRequestId(fingerprint);
    try {
      const abandoned = await abandonMutation.mutateAsync({
        attemptId: activeAttempt.id,
        input: {
          requestId,
          expectedVersion: activeAttempt.version,
        },
      });
      clearIntentRecord();
      lastFailedActionRef.current = null;
      clearReviewDraft(activeAttempt.id, 'recall');
      clearReviewDraft(activeAttempt.id, 'output');
      return abandoned;
    } catch (err) {
      lastFailedActionRef.current = () => abandonAttempt();
      return null;
    } finally {
      isSubmittingRef.current = false;
    }
  }, [abandonMutation, activeAttempt]);

  const isPending =
    beginMutation.isPending ||
    stepMutation.isPending ||
    completeMutation.isPending ||
    abandonMutation.isPending;

  const currentError =
    (activeAttemptQuery.error as Error | null) ||
    (stepMutation.error as Error | null) ||
    (completeMutation.error as Error | null) ||
    (beginMutation.error as Error | null) ||
    (abandonMutation.error as Error | null);

  const clearError = useCallback(() => {
    if (isSubmittingRef.current) return;
    stepMutation.reset();
    completeMutation.reset();
    beginMutation.reset();
    abandonMutation.reset();
  }, [beginMutation, completeMutation, stepMutation, abandonMutation]);

  const retryLastAction = useCallback(async () => {
    clearError();
    if (queueQuery.isError) {
      await queueQuery.refetch();
      return;
    }
    if (activeAttemptQuery.isError) {
      await activeAttemptQuery.refetch();
      return;
    }
    if (lastFailedActionRef.current) {
      await lastFailedActionRef.current();
    }
  }, [queueQuery, activeAttemptQuery, clearError]);

  return {
    taskId: effectiveTaskId,
    urlTaskId,
    isTaskMismatch,
    studyTask,
    queueQuery,
    activeAttemptQuery,
    activeAttempt,
    currentDueItem,
    completedItems,
    aiSettings: aiSettings.data,
    isPending,
    error: currentError,
    clearError,
    retryLastAction,
    startReview,
    submitStep,
    completeRating,
    abandonAttempt,
  };
}
