/**
 * @file LearningSessionPage.tsx
 * @description Strict, distraction-light five-stage learning session experience with Focus Mode.
 */
import { useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import type { LearningSession, SessionStep, SubmitStepPayload } from '../api/session.api';
import { useAbandonLearningSession, useCompleteLearningSession, useLearningOptions, useLearningSession, useLearningSessionOverview, useStartLearningSession, useSubmitLearningStep } from '../hooks/useLearningSession';
import { LearningSessionBar } from '../components/learning/LearningSessionBar';
import { LearningStepView } from '../components/learning/LearningStepView';
import { SessionStartForm } from '../components/learning/SessionStartForm';
import { SessionSummary } from '../components/learning/SessionSummary';
import { getLocalizedErrorMessage } from '../i18n/presentation';
import { useStudyTask } from '../hooks/useStudyCalendar';

export function LearningSessionPage() {
  const { t } = useTranslation('learning');
  const { t: tCommon } = useTranslation('common');
  const { t: tCalendar } = useTranslation('calendar');
  const [searchParams] = useSearchParams();
  const requestedTaskId = searchParams.get('taskId') ?? '';
  const overview = useLearningSessionOverview();
  const options = useLearningOptions();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [completedSession, setCompletedSession] = useState<LearningSession | null>(null);
  const requestIds = useRef(new Map<string, string>());
  const submitLock = useRef(false);
  const startMutation = useStartLearningSession();
  const submitMutation = useSubmitLearningStep();
  const completeMutation = useCompleteLearningSession();
  const abandonMutation = useAbandonLearningSession();
  const detail = useLearningSession(sessionId);
  const activeSession = sessionId
    ? detail.data ?? overview.data?.activeSession
    : overview.data?.activeSession;
  const taskId = activeSession?.studyTaskId ?? requestedTaskId;
  const studyTask = useStudyTask(taskId);
  const calendarTask = studyTask.data;
  const safeActiveSession = activeSession ? { ...activeSession, items: activeSession.items ?? [] } : null;
  const initialCompletedSession = overview.data?.activeSession?.status === 'COMPLETED' ? overview.data.activeSession : null;
  const shownCompletedSession = completedSession ?? initialCompletedSession;
  const taskMismatch = Boolean(activeSession && requestedTaskId && activeSession.studyTaskId !== requestedTaskId);
  const handleAbandon = () => { if (activeSession) { abandonMutation.mutate(activeSession.id); setSessionId(null); } };

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
    void overview.refetch();
  }

  const isFocusMode = Boolean(safeActiveSession && !shownCompletedSession);

  return (
    <div className="space-y-6 sm:space-y-8">
      {isFocusMode ? (
        <h1 tabIndex={-1} className="sr-only">
          {t('title')}
        </h1>
      ) : (
        <header className="mx-auto w-full max-w-3xl">
          <h1 tabIndex={-1} className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {t('title')}
          </h1>
          <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-muted">{t('subtitle')}</p>
        </header>
      )}

      <div aria-live="polite" className="sr-only">
        {overview.isLoading ? t('loadingAnnouncement') : activeSession ? t('activeAnnouncement') : t('readyAnnouncement')}
      </div>

      {shownCompletedSession && (
        <div className="space-y-3">
          <SessionSummary session={shownCompletedSession} onStartNext={resetForNextSession} />
          {calendarTask && (
            <div className="mx-auto flex w-full max-w-2xl flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-xl border border-border bg-surface p-3.5 sm:p-4 text-sm">
              <p role="status" className="text-foreground">
                {tCalendar(`statuses.${calendarTask.isComplete ? 'COMPLETED' : 'PARTIAL'}`)} · {tCalendar('progress', {
                  formattedCompleted: calendarTask.completedCount,
                  formattedTarget: calendarTask.targetCount,
                })}{' '}
                {tCalendar('progressUnit.word_other')}
              </p>
              <Link
                to={`/calendar?date=${encodeURIComponent(calendarTask.scheduledDate)}`}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border px-4 py-2 font-semibold text-foreground hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-full sm:w-auto text-center"
              >
                {tCalendar('navigation.openCalendar')}
              </Link>
            </div>
          )}
        </div>
      )}
      {!shownCompletedSession && overview.isLoading && <LoadingState />}
      {!shownCompletedSession && overview.isError && <ErrorState message={getLocalizedErrorMessage(overview.error, tCommon)} onRetry={() => void overview.refetch()} />}
      {!shownCompletedSession && !overview.isLoading && !overview.isError && !activeSession && (
        <SessionStartForm
          isPending={startMutation.isPending}
          errorMessage={startMutation.error ? getLocalizedErrorMessage(startMutation.error, tCommon) : undefined}
          latestSession={overview.data?.latestSession}
          options={options.data}
          optionsLoading={options.isLoading}
          optionsError={options.isError ? t('optionsError') : undefined}
          onRetryOptions={() => void options.refetch()}
          taskId={taskId || undefined}
          task={calendarTask}
          taskLoading={Boolean(taskId) && studyTask.isLoading}
          taskError={studyTask.isError ? getLocalizedErrorMessage(studyTask.error, tCommon) : undefined}
          onSubmit={handleStart}
        />
      )}
      {!shownCompletedSession && taskMismatch && (
        <p role="alert" className="mx-auto max-w-2xl rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
          {tCalendar('forms.activeSession')}
        </p>
      )}
      {!shownCompletedSession && !overview.isLoading && !overview.isError && safeActiveSession && (
        <ActiveSession
          session={safeActiveSession}
          detailError={detail.error}
          isPending={submitMutation.isPending || completeMutation.isPending || abandonMutation.isPending}
          submitError={submitMutation.error ? getLocalizedErrorMessage(submitMutation.error, tCommon) : completeMutation.error ? getLocalizedErrorMessage(completeMutation.error, tCommon) : undefined}
          onSubmit={handleStepSubmit}
          onComplete={handleComplete}
          onAbandon={handleAbandon}
        />
      )}
    </div>
  );
}

function ActiveSession({
  session,
  detailError,
  isPending,
  submitError,
  onSubmit,
  onComplete,
  onAbandon,
}: {
  session: LearningSession;
  detailError: Error | null;
  isPending: boolean;
  submitError?: string;
  onSubmit: (payload: Omit<SubmitStepPayload, 'wordId' | 'step' | 'requestId'>, step: SessionStep) => Promise<void>;
  onComplete: (id: string) => Promise<void>;
  onAbandon: () => void;
}) {
  const { t } = useTranslation('learning');
  const { t: tCommon } = useTranslation('common');
  const cursor = session.cursor;
  const currentItem = cursor?.itemId ? session.items.find((item) => item.id === cursor.itemId) : undefined;

  if (!currentItem || !cursor?.step) {
    return (
      <div className="mx-auto max-w-xl space-y-4 rounded-2xl border border-border bg-surface p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground">{t('sessionReady')}</h2>
        <p className="text-muted text-sm sm:text-base">{t('allAssessmentsRecorded')}</p>
        {submitError && <p role="alert" className="text-sm text-red-700 dark:text-red-200">{submitError}</p>}
        <button
          type="button"
          disabled={isPending}
          onClick={() => void onComplete(session.id)}
          className="min-h-11 w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          {tCommon('actions.completeSession')}
        </button>
      </div>
    );
  }

  const step = cursor.step;
  const currentWord = (cursor.sessionPosition ?? session.items.findIndex((candidate) => candidate.id === cursor.itemId) ?? 0) + 1;
  const totalWords = session.totalWords || session.items.length || 1;

  const outputFeedback = currentItem.feedback && (currentItem.feedback.score !== undefined || Boolean(currentItem.feedback.codes) || currentItem.feedback.outcome === 'INVALID')
    ? currentItem.feedback
    : null;
  const latestRecallAttempt = currentItem.attempts
    ?.filter((attempt) => attempt.type === 'RECALL')
    .sort((left, right) => right.attemptNumber - left.attemptNumber)[0];
  const persistedRecallFeedback = !outputFeedback && currentItem.feedback
    ? currentItem.feedback
    : latestRecallAttempt
      ? { outcome: latestRecallAttempt.result, attemptNumber: latestRecallAttempt.attemptNumber, canRetry: false }
      : null;

  return (
    <>
      {detailError && (
        <p role="alert" className="mx-auto max-w-2xl rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200">
          {getLocalizedErrorMessage(detailError, tCommon)}
        </p>
      )}
      <div className="space-y-4">
        <LearningSessionBar
          currentWord={currentWord}
          totalWords={totalWords}
          onAbandon={onAbandon}
          isPending={isPending}
        />
        <LearningStepView
          item={currentItem}
          step={step}
          cursor={cursor}
          isPending={isPending}
          errorMessage={submitError}
          recallFeedback={persistedRecallFeedback?.outcome}
          recallAttemptNumber={cursor.attemptNumber ?? persistedRecallFeedback?.attemptNumber}
          recallHint={persistedRecallFeedback?.hint}
          recallRevealedAnswer={persistedRecallFeedback?.revealedAnswer}
          outputFeedback={outputFeedback ? { ...outputFeedback, attemptNumber: cursor.attemptNumber ?? outputFeedback.attemptNumber } : null}
          onSubmit={(payload) => void onSubmit(payload, step)}
        />
      </div>
    </>
  );
}

function LoadingState() {
  const { t } = useTranslation('learning');
  return <div role="status" className="mx-auto max-w-xl rounded-2xl border border-border bg-surface p-6 sm:p-8 text-center text-sm text-muted">{t('loading')}</div>;
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  const { t } = useTranslation('learning');
  return (
    <div role="alert" className="mx-auto max-w-xl space-y-4 rounded-2xl border border-red-300 bg-red-50 p-4 sm:p-6 text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200">
      <p>{message}</p>
      <button type="button" onClick={onRetry} className="min-h-11 w-full sm:w-auto rounded-lg border border-current px-4 py-2 text-sm font-semibold">
        {t('retry')}
      </button>
    </div>
  );
}
