/**
 * @file ReviewPage.tsx
 * @description Focused SM-2 due-review queue with accessible reveal and rating flow.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { ReviewRating } from '../api/review.api';
import { useReviewQueue, useSubmitReview } from '../hooks/useReviewQueue';
import { ReviewCard } from '../components/review/ReviewCard';
import { ReviewCompletion } from '../components/review/ReviewCompletion';
import { PageHeader } from '../components/layout/PageHeader';
import { formatIntervalDays, formatNumber } from '../i18n/formatters';
import { getLocalizedErrorMessage } from '../i18n/presentation';

const reviewLimit = 50;

export function ReviewPage() {
  const { t } = useTranslation('review');
  const { t: tCommon } = useTranslation('common');
  const queue = useReviewQueue({ limit: reviewLimit });
  const submitMutation = useSubmitReview();
  const [isRevealed, setIsRevealed] = useState(false);
  const [lastReview, setLastReview] = useState<{ rating: ReviewRating; interval: number }>();
  const isSubmittingRef = useRef(false);
  const item = queue.data?.items[0];
  const dueCount = queue.data?.counts.total ?? queue.data?.total ?? 0;

  useEffect(() => {
    setIsRevealed(false);
  }, [item?.wordId]);

  const submitRating = useCallback(async (rating: ReviewRating) => {
    if (!item || !isRevealed || submitMutation.isPending || isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    try {
      const result = await submitMutation.mutateAsync({ wordId: item.wordId, reviewType: 'RECALL', rating });
      setLastReview({ rating, interval: result.reviewState.interval });
      setIsRevealed(false);
    } finally {
      isSubmittingRef.current = false;
    }
  }, [isRevealed, item, submitMutation]);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (!item || !isRevealed || submitMutation.isPending || (target && (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable))) return;
      const rating = ({ '1': 'AGAIN', '2': 'HARD', '3': 'GOOD', '4': 'EASY' } as Record<string, ReviewRating>)[event.key];
      if (!rating) return;
      event.preventDefault();
      void submitRating(rating);
    }
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, [isRevealed, item, submitMutation.isPending, submitRating]);

  return (
    <div className="space-y-8">
       <PageHeader title={t('title')} subtitle={t('subtitle')} />
       <div aria-live="polite" className="sr-only">
         {queue.isLoading ? t('loadingAnnouncement') : queue.isError ? getLocalizedErrorMessage(queue.error, tCommon) : item ? t('dueToday', { count: dueCount, formattedCount: formatNumber(dueCount) }) : t('completeAnnouncement')}
       </div>
       {lastReview && <p role="status" aria-live="polite" className="mx-auto w-full max-w-3xl rounded-xl border border-border bg-primary-subtle px-4 py-3 text-sm text-foreground">{t('saved', { rating: t(`rating.${lastReview.rating}`), interval: formatIntervalDays(lastReview.interval) })}</p>}

      {queue.isLoading && <LoadingState />}
       {queue.isError && <ErrorState message={getLocalizedErrorMessage(queue.error, tCommon)} onRetry={() => void queue.refetch()} />}
      {!queue.isLoading && !queue.isError && item && <>
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted">
           <span>{t('dueToday', { count: dueCount, formattedCount: formatNumber(dueCount) })}</span>
           <span>{t('recallMode')}</span>
        </div>
        <ReviewCard item={item} isRevealed={isRevealed} isPending={submitMutation.isPending} onReveal={() => setIsRevealed(true)} onRate={(rating) => void submitRating(rating)} />
         {submitMutation.isError && <p role="alert" className="mx-auto w-full max-w-3xl rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground">{getLocalizedErrorMessage(submitMutation.error, tCommon)}</p>}
         {submitMutation.isPending && <p className="mx-auto w-full max-w-3xl text-sm text-muted">{t('saving')}</p>}
      </>}
      {!queue.isLoading && !queue.isError && !item && <ReviewCompletion lastReview={lastReview} />}
    </div>
  );
}

function LoadingState() {
  const { t } = useTranslation('review');
  return <div role="status" className="mx-auto w-full max-w-3xl rounded-2xl border border-border bg-surface p-8 text-center text-sm text-muted">{t('loading')}</div>;
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  const { t } = useTranslation('review');
  return <div role="alert" className="mx-auto w-full max-w-3xl space-y-4 rounded-2xl border border-border bg-secondary p-6 text-foreground"><p>{message}</p><button type="button" onClick={onRetry} className="min-h-11 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t('retry')}</button></div>;
}
