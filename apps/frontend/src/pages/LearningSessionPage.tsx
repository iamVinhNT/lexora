/**
 * @file LearningSessionPage.tsx
 * @description Strict, distraction-light five-stage learning session experience.
 */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { LearningSession, SessionStep, SubmitStepPayload } from '../api/session.api';
import { useCompleteLearningSession, useLearningSession, useLearningSessionOverview, useStartLearningSession, useSubmitLearningStep } from '../hooks/useLearningSession';
import { LearningStepView } from '../components/learning/LearningStepView';
import { SessionStartForm } from '../components/learning/SessionStartForm';
import { SessionSummary } from '../components/learning/SessionSummary';
import { getLocalizedErrorMessage } from '../i18n/presentation';

const stepOrder: SessionStep[] = ['CONTEXT', 'UNDERSTAND', 'RECALL', 'OUTPUT', 'ASSESS'];

export function LearningSessionPage() {
  const { t } = useTranslation('learning');
  const { t: tCommon } = useTranslation('common');
  const overview = useLearningSessionOverview();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [completedSession, setCompletedSession] = useState<LearningSession | null>(null);
  const [recallResult, setRecallResult] = useState<string | null>(null);
  const startMutation = useStartLearningSession();
  const submitMutation = useSubmitLearningStep();
  const completeMutation = useCompleteLearningSession();
  const detail = useLearningSession(sessionId);
  const activeSession = sessionId ? detail.data ?? overview.data?.activeSession : overview.data?.activeSession;
  const initialCompletedSession = overview.data?.activeSession?.status === 'COMPLETED' ? overview.data.activeSession : null;
  const shownCompletedSession = completedSession ?? initialCompletedSession;

  function handleStart(payload: Parameters<typeof startMutation.mutate>[0]) {
    startMutation.mutate(payload, { onSuccess: (session) => setSessionId(session.id) });
  }

  async function handleStepSubmit(payload: Omit<SubmitStepPayload, 'wordId' | 'step'>, step: SessionStep) {
    if (!activeSession || submitMutation.isPending || completeMutation.isPending) return;
    const item = activeSession.items.find((candidate) => candidate.completedStep !== 'ASSESS');
    if (!item) return;
    try {
      const updatedItem = await submitMutation.mutateAsync({
        id: activeSession.id,
        payload: { wordId: item.wordId, step, ...payload },
      });

      if (step === 'RECALL') {
        setRecallResult(updatedItem.recallResult ?? null);
      }

      if (step === 'ASSESS') {
        const updatedSession = { ...activeSession, items: activeSession.items.map((candidate) => candidate.wordId === updatedItem.wordId ? updatedItem : candidate) };
        if (updatedSession.items.every((candidate) => candidate.completedStep === 'ASSESS' && Boolean(candidate.reviewRating))) {
          await handleComplete(activeSession.id);
        }
      }
    } catch {
      // Mutation error remains exposed by React Query; current step intentionally stays unchanged.
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
     {!shownCompletedSession && !overview.isLoading && !overview.isError && !activeSession && <SessionStartForm isPending={startMutation.isPending} errorMessage={startMutation.error ? getLocalizedErrorMessage(startMutation.error, tCommon) : undefined} latestSession={overview.data?.latestSession} onSubmit={handleStart} />}
     {!shownCompletedSession && !overview.isLoading && !overview.isError && activeSession && <ActiveSession session={activeSession} detailError={detail.error} isPending={submitMutation.isPending || completeMutation.isPending} submitError={submitMutation.error ? getLocalizedErrorMessage(submitMutation.error, tCommon) : completeMutation.error ? getLocalizedErrorMessage(completeMutation.error, tCommon) : undefined} recallFeedback={recallResult} onSubmit={handleStepSubmit} onComplete={handleComplete} />}
  </div>;
}

function ActiveSession({ session, detailError, isPending, submitError, recallFeedback, onSubmit, onComplete }: { session: LearningSession; detailError: Error | null; isPending: boolean; submitError?: string; recallFeedback?: string | null; onSubmit: (payload: Omit<SubmitStepPayload, 'wordId' | 'step'>, step: SessionStep) => Promise<void>; onComplete: (id: string) => Promise<void> }) {
  const { t } = useTranslation('learning');
  const { t: tCommon } = useTranslation('common');
  const currentItem = session.items.find((item) => item.completedStep !== 'ASSESS');
  if (!currentItem) return <div className="mx-auto max-w-xl space-y-4 rounded-2xl border border-border bg-surface p-6"><h2 className="text-2xl font-semibold text-foreground">{t('sessionReady')}</h2><p className="text-muted">{t('allAssessmentsRecorded')}</p>{submitError && <p role="alert" className="text-sm text-red-700 dark:text-red-200">{submitError}</p>}<button type="button" disabled={isPending} onClick={() => void onComplete(session.id)} className="min-h-11 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">{tCommon('actions.completeSession')}</button></div>;
  const step = currentItem.completedStep ? stepOrder[stepOrder.indexOf(currentItem.completedStep) + 1] : 'CONTEXT';
  if (!step) return null;
  const persistedRecallFeedback = currentItem.recallResult ?? recallFeedback;
  return <>
    {detailError && <p role="alert" className="mx-auto max-w-3xl rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200">{getLocalizedErrorMessage(detailError, tCommon)}</p>}
    <LearningStepView item={currentItem} step={step} isPending={isPending} errorMessage={submitError} recallFeedback={persistedRecallFeedback} onSubmit={(payload) => void onSubmit(payload, step)} />
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
