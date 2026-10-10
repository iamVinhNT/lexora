/**
 * @file AdaptiveReviewWorkspace.tsx
 * @description Main adaptive review workspace managing active recall, sentence practice, and truthful assessment.
 */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import type { ReviewRating } from '../../api/review.api';
import { formatIntervalDays, formatNumber } from '../../i18n/formatters';
import { getLocalizedErrorMessage } from '../../i18n/presentation';
import { useAdaptiveReview } from '../../hooks/useAdaptiveReview';
import { PageHeader } from '../layout/PageHeader';
import { Button } from '../ui/Button';
import { ReviewAssessStage } from './ReviewAssessStage';
import { ReviewFeedbackStage } from './ReviewFeedbackStage';
import { ReviewOutputStage } from './ReviewOutputStage';
import { ReviewQueueStatus } from './ReviewQueueStatus';
import { ReviewRecallStage } from './ReviewRecallStage';
import { ReviewSessionSummary } from './ReviewSessionSummary';
import { ReviewStartCard } from './ReviewStartCard';
import { Calendar, RotateCw } from 'lucide-react';

export function AdaptiveReviewWorkspace() {
  const { t } = useTranslation('review');
  const { t: tCommon } = useTranslation('common');
  const { t: tCalendar } = useTranslation('calendar');

  const {
    taskId,
    urlTaskId,
    isTaskMismatch,
    studyTask,
    queueQuery,
    activeAttemptQuery,
    activeAttempt,
    currentDueItem,
    completedItems,
    aiSettings,
    isPending,
    error,
    clearError,
    retryLastAction,
    startReview,
    submitStep,
    completeRating,
    abandonAttempt,
  } = useAdaptiveReview();

  const [lastReviewNotice, setLastReviewNotice] = useState<{
    rating: ReviewRating;
    interval: number;
  }>();

  async function handleCompleteRating(rating: ReviewRating) {
    clearError();
    const result = await completeRating(rating);
    if (result) {
      setLastReviewNotice({
        rating: result.effectiveRating,
        interval: result.reviewState.interval,
      });
    }
  }

  const queue = queueQuery.data;
  const dueCount = queue?.total ?? queue?.counts?.total ?? 0;
  const reviewedCount = completedItems.length;
  const linkedTaskIncomplete = Boolean(taskId && studyTask.data && !studyTask.data.isComplete);
  const isQueryError = queueQuery.isError || activeAttemptQuery.isError;
  const queryErrorMessage = getLocalizedErrorMessage(
    queueQuery.error || activeAttemptQuery.error,
    tCommon,
  );

  return (
    <div className="space-y-4 sm:space-y-6 pb-32 md:pb-16 max-w-4xl mx-auto px-2 sm:px-4 [&_input]:scroll-mb-40 [&_textarea]:scroll-mb-40 [&_button]:scroll-mb-24">
      <PageHeader title={t('title')} subtitle={activeAttempt ? '' : t('subtitle')} />

      {/* Screen Reader Announcement */}
      <div aria-live="polite" className="sr-only">
        {queueQuery.isLoading || activeAttemptQuery.isLoading
          ? t('loadingAnnouncement')
          : isQueryError
            ? queryErrorMessage
            : activeAttempt
              ? t('recallTheWord')
              : linkedTaskIncomplete
                ? tCalendar('statuses.PARTIAL')
                : dueCount > 0
                  ? t('dueToday', { count: dueCount, formattedCount: formatNumber(dueCount) })
                  : t(completedItems.length > 0 ? 'completeAnnouncement' : 'noDue')}
      </div>

      {/* Saved rating notification */}
      {lastReviewNotice && !activeAttempt && (
        <p
          role="status"
          aria-live="polite"
          className="mx-auto w-full max-w-3xl rounded-xl border border-border bg-primary-subtle px-4 py-3 text-sm text-foreground"
        >
          {t('saved', {
            rating: t(`rating.${lastReviewNotice.rating}`),
            interval: formatIntervalDays(lastReviewNotice.interval),
          })}
        </p>
      )}

      {/* Loading state */}
      {(queueQuery.isLoading || activeAttemptQuery.isLoading) && (
        <div
          role="status"
          className="mx-auto w-full max-w-3xl rounded-2xl border border-border bg-surface p-6 sm:p-8 text-center text-sm text-muted"
        >
          {t('loading')}
        </div>
      )}

      {/* Error state */}
      {isQueryError && (
        <div
          role="alert"
          className="mx-auto w-full max-w-3xl space-y-4 rounded-2xl border border-border bg-secondary p-4 sm:p-6 text-foreground"
        >
          <p>{queryErrorMessage}</p>
          <Button
            type="button"
            variant="secondary"
            onClick={() => void retryLastAction()}
            className="min-h-11"
            icon={RotateCw}
            iconOnly
          >
            {t('retry')}
          </Button>
        </div>
      )}

      {/* Main Content Area */}
      {!queueQuery.isLoading && !queueQuery.isError && !activeAttemptQuery.isLoading && !activeAttemptQuery.isError && (
        <>
          {activeAttempt ? (
            <div className="space-y-4 sm:space-y-6">
              {isTaskMismatch && (
                <div
                  role="status"
                  className="mx-auto w-full max-w-3xl rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs sm:text-sm text-foreground flex items-center justify-between gap-2"
                >
                  <span>{t('taskMismatchNotice')}</span>
                  <Link to="/calendar" className="inline-flex items-center gap-1.5 text-primary font-medium hover:underline text-xs shrink-0">
                    <Calendar size={14} aria-hidden="true" className="shrink-0" />
                    {tCalendar('title')}
                  </Link>
                </div>
              )}

              <ReviewQueueStatus
                reviewedCount={reviewedCount}
                dueCount={dueCount}
                studyTask={studyTask.data}
              />

              {activeAttempt.stage === 'RECALL' && (
                <ReviewRecallStage
                  attempt={activeAttempt}
                  isPending={isPending}
                  error={error}
                  onRecall={async (ans) => {
                    clearError();
                    await submitStep({ action: 'RECALL', answer: ans });
                  }}
                  onAbandon={async () => {
                    clearError();
                    await abandonAttempt();
                  }}
                  onRetry={() => {
                    void retryLastAction();
                  }}
                />
              )}

              {activeAttempt.stage === 'FEEDBACK' && (
                <ReviewFeedbackStage
                  attempt={activeAttempt}
                  isPending={isPending}
                  error={error}
                  onContinue={async (practice) => {
                    clearError();
                    await submitStep({ action: 'CONTINUE', practice });
                  }}
                  onAbandon={async () => {
                    clearError();
                    await abandonAttempt();
                  }}
                  onRetry={() => {
                    void retryLastAction();
                  }}
                />
              )}

              {activeAttempt.stage === 'OUTPUT' && (
                <ReviewOutputStage
                  attempt={activeAttempt}
                  aiSettings={aiSettings}
                  isPending={isPending}
                  error={error}
                  onOutput={async (ans, method, revision) => {
                    clearError();
                    await submitStep({
                      action: 'OUTPUT',
                      answer: ans,
                      method,
                      configRevision: revision,
                    });
                  }}
                  onAbandon={async () => {
                    clearError();
                    await abandonAttempt();
                  }}
                  onRetry={() => {
                    void retryLastAction();
                  }}
                />
              )}

              {activeAttempt.stage === 'ASSESS' && (
                <ReviewAssessStage
                  attempt={activeAttempt}
                  isPending={isPending}
                  error={error}
                  onRate={async (rating) => {
                    await handleCompleteRating(rating);
                  }}
                  onAbandon={async () => {
                    clearError();
                    await abandonAttempt();
                  }}
                  onRetry={() => {
                    void retryLastAction();
                  }}
                />
              )}
            </div>
          ) : studyTask.isLoading ? (
            <div
              role="status"
              className="mx-auto w-full max-w-3xl rounded-2xl border border-border bg-surface p-6 sm:p-8 text-center text-sm text-muted"
            >
              {tCalendar('statuses.IN_PROGRESS')}
            </div>
          ) : studyTask.isError ? (
            <div
              role="alert"
              className="mx-auto w-full max-w-3xl space-y-4 rounded-2xl border border-border bg-secondary p-4 sm:p-6 text-foreground"
            >
              <p>{getLocalizedErrorMessage(studyTask.error, tCommon)}</p>
              <Button
                type="button"
                variant="secondary"
                onClick={() => void studyTask.refetch()}
                className="min-h-11"
                icon={RotateCw}
                iconOnly
              >
                {t('retry')}
              </Button>
            </div>
          ) : dueCount > 0 && currentDueItem && (!taskId || !studyTask.data?.isComplete) ? (
            /* Idle due state: start review */
            <ReviewStartCard
              reviewedCount={reviewedCount}
              dueCount={dueCount}
              studyTask={studyTask.data}
              isPending={isPending}
              onStart={async () => {
                clearError();
                await startReview();
              }}
            />
          ) : (
            /* Session completion summary or completed task */
            <ReviewSessionSummary
              completedItems={completedItems}
              studyTask={studyTask.data}
              taskId={taskId}
              hasRemainingDue={dueCount > 0}
            />
          )}
        </>
      )}
    </div>
  );
}
