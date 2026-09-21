/**
 * @file LearningSessionPage.tsx
 * @description Strict, distraction-light five-stage learning session experience.
 */
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { LearningSession, SessionStep, SubmitStepPayload } from '../api/session.api';
import { useAbandonLearningSession, useCompleteLearningSession, useLearningOptions, useLearningSession, useLearningSessionOverview, useStartLearningSession, useSubmitLearningStep } from '../hooks/useLearningSession';
import { LearningStepView } from '../components/learning/LearningStepView';
import { SessionStartForm } from '../components/learning/SessionStartForm';
import { SessionSummary } from '../components/learning/SessionSummary';
import { getLocalizedErrorMessage } from '../i18n/presentation';

export function LearningSessionPage() {
  const { t } = useTranslation('learning');
  const { t: tCommon } = useTranslation('common');
  const overview = useLearningSessionOverview();
  const options = useLearningOptions();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [completedSession, setCompletedSession] = useState<LearningSession | null>(null);
  const [recallResult, setRecallResult] = useState<string | null>(null);
  const requestIds = useRef(new Map<string, string>());
  const submitLock = useRef(false);
  const startMutation = useStartLearningSession();
  const submitMutation = useSubmitLearningStep();
  const completeMutation = useCompleteLearningSession();
  const abandonMutation = useAbandonLearningSession();
  const handleAbandon = () => { if (activeSession) { abandonMutation.mutate(activeSession.id); setSessionId(null); } };
  const detail = useLearningSession(sessionId);
  const activeSession = sessionId ? detail.data ?? overview.data?.activeSession : overview.data?.activeSession;
  const safeActiveSession = activeSession ? { ...activeSession, items: activeSession.items ?? [] } : null;
  const initialCompletedSession = overview.data?.activeSession?.status === 'COMPLETED' ? overview.data.activeSession : null;
  const shownCompletedSession = completedSession ?? initialCompletedSession;

  function handleStart(payload: Parameters<typeof startMutation.mutate>[0]) {
    startMutation.mutate(payload, { onSuccess: (session) => setSessionId(session.id) });
  }

  async function handleStepSubmit(payload: Omit<SubmitStepPayload, 'wordId' | 'step' | 'requestId'>, step: SessionStep) {
    if (!safeActiveSession || submitMutation.isPending || completeMutation.isPending || submitLock.current) return;
    const item = safeActiveSession.items.find((candidate) => candidate.id === safeActiveSession.cursor?.itemId);
    if (!item) return;
    submitLock.current = true;
    try {
       const requestKey = `${safeActiveSession.id}:${item.id}:${step}:${safeActiveSession.cursor?.attemptNumber ?? ''}`;

      const requestId = requestIds.current.get(requestKey) ?? `${safeActiveSession.id}-${item.id}-${step}-${Date.now()}`;
      requestIds.current.set(requestKey, requestId);
      const actionResult = await submitMutation.mutateAsync({
        id: safeActiveSession.id,
        payload: { ...payload, requestId: requestId, wordId: item.wordId, step },
      });

      if (step === 'RECALL') {
        setRecallResult(actionResult.feedback?.outcome ?? null);
      }

      if (step === 'ASSESS') {
        const updatedSession = { ...safeActiveSession, items: safeActiveSession.items.map((candidate) => candidate.wordId === actionResult.item.wordId ? actionResult.item : candidate) };
        if (updatedSession.items.every((candidate) => candidate.completedStep === 'ASSESS' && Boolean(candidate.reviewRating))) {
          await handleComplete(safeActiveSession.id);
        }
      }
    } catch {
      // Mutation error remains exposed by React Query; current step intentionally stays unchanged.
    } finally {
      submitLock.current = false;
    }
  }

  async function handleComplete(id: string) {
    try {
      const completed = await completeMutation.mutateAsync(id);
      setCompletedSession(completed);
    } catch {
      // Mutation error remains visible; completion can be retried without changing step state.
    }
  }

  function resetForNextSession() {
    setCompletedSession(null);
    setSessionId(null);
    setRecallResult(null);
    void overview.refetch();
  }

  return <div className="space-y-8">
    <header className="mx-auto w-full max-w-3xl">
       <h1 tabIndex={-1} className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{t('title')}</h1>
       <p className="mt-2 text-muted">{t('subtitle')}</p>
    </header>

    <div aria-live="polite" className="sr-only">
       {overview.isLoading ? t('loadingAnnouncement') : activeSession ? t('activeAnnouncement') : t('readyAnnouncement')}
    </div>

    {shownCompletedSession && <SessionSummary session={shownCompletedSession} onStartNext={resetForNextSession} />}
    {!shownCompletedSession && overview.isLoading && <LoadingState />}
     {!shownCompletedSession && overview.isError && <ErrorState message={getLocalizedErrorMessage(overview.error, tCommon)} onRetry={() => void overview.refetch()} />}
     {!shownCompletedSession && !overview.isLoading && !overview.isError && !activeSession && <SessionStartForm isPending={startMutation.isPending} errorMessage={startMutation.error ? getLocalizedErrorMessage(startMutation.error, tCommon) : undefined} latestSession={overview.data?.latestSession} options={options.data} optionsLoading={options.isLoading} optionsError={options.isError ? t('optionsError') : undefined} onRetryOptions={() => void options.refetch()} onSubmit={handleStart} />}
     {!shownCompletedSession && !overview.isLoading && !overview.isError && safeActiveSession && <ActiveSession session={safeActiveSession} detailError={detail.error} isPending={submitMutation.isPending || completeMutation.isPending || abandonMutation.isPending} submitError={submitMutation.error ? getLocalizedErrorMessage(submitMutation.error, tCommon) : completeMutation.error ? getLocalizedErrorMessage(completeMutation.error, tCommon) : undefined} recallFeedback={recallResult} onSubmit={handleStepSubmit} onComplete={handleComplete} onAbandon={handleAbandon} />}
  </div>;
}

function ActiveSession({ session, detailError, isPending, submitError, recallFeedback, recallAttemptNumber, recallHint, recallRevealedAnswer, onSubmit, onComplete, onAbandon }: { session: LearningSession; detailError: Error | null; isPending: boolean; submitError?: string; recallFeedback?: string | null; recallAttemptNumber?: 1 | 2 | null; recallHint?: { firstLetter: string; letterCount: number }; recallRevealedAnswer?: string; onSubmit: (payload: Omit<SubmitStepPayload, 'wordId' | 'step' | 'requestId'>, step: SessionStep) => Promise<void>; onComplete: (id: string) => Promise<void>; onAbandon: () => void }) {
  const { t } = useTranslation('learning');
  const { t: tCommon } = useTranslation('common');
  const cursor = session.cursor;
  const currentItem = cursor?.itemId ? session.items.find((item) => item.id === cursor.itemId) : undefined;
  if (!currentItem || !cursor?.step) return <div className="mx-auto max-w-xl space-y-4 rounded-2xl border border-border bg-surface p-6"><h2 className="text-2xl font-semibold text-foreground">{t('sessionReady')}</h2><p className="text-muted">{t('allAssessmentsRecorded')}</p>{submitError && <p role="alert" className="text-sm text-red-700 dark:text-red-200">{submitError}</p>}<button type="button" disabled={isPending} onClick={() => void onComplete(session.id)} className="min-h-11 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">{tCommon('actions.completeSession')}</button></div>;
  const step = cursor.step;
  const persistedRecallFeedback = currentItem.feedback ?? (currentItem.attempts?.find((attempt) => attempt.type === 'RECALL')?.result ? { outcome: currentItem.attempts.find((attempt) => attempt.type === 'RECALL')?.result ?? '', attemptNumber: session.cursor?.attemptNumber ?? null, canRetry: session.cursor?.attemptNumber === 2 } : recallFeedback ? { outcome: recallFeedback, attemptNumber: null, canRetry: false } : null);
  return <>
    {detailError && <p role="alert" className="mx-auto max-w-3xl rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200">{getLocalizedErrorMessage(detailError, tCommon)}</p>}
      <div className="space-y-4"><button type="button" onClick={onAbandon} disabled={isPending} className="min-h-11 rounded-lg border border-border px-4 py-2 text-sm font-semibold">{tCommon('actions.abandonSession')}</button><LearningStepView item={currentItem} step={step} isPending={isPending} errorMessage={submitError} recallFeedback={persistedRecallFeedback?.outcome} recallAttemptNumber={cursor.attemptNumber ?? persistedRecallFeedback?.attemptNumber} recallHint={persistedRecallFeedback?.hint} recallRevealedAnswer={persistedRecallFeedback?.revealedAnswer} outputFeedback={currentItem.feedback?.codes || currentItem.feedback?.outcome === 'INVALID' ? { ...currentItem.feedback, attemptNumber: cursor.attemptNumber ?? currentItem.feedback.attemptNumber } : null} onSubmit={(payload) => void onSubmit(payload, step)} /></div>


  </>;
}

function LoadingState() {
  const { t } = useTranslation('learning');
  return <div role="status" className="mx-auto max-w-xl rounded-2xl border border-border bg-surface p-8 text-center text-sm text-muted">{t('loading')}</div>;
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  const { t } = useTranslation('learning');
  return <div role="alert" className="mx-auto max-w-xl space-y-4 rounded-2xl border border-red-300 bg-red-50 p-6 text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200"><p>{message}</p><button type="button" onClick={onRetry} className="min-h-11 rounded-lg border border-current px-4 py-2 text-sm font-semibold">{t('retry')}</button></div>;
}
