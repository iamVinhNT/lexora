/**
 * @file ReviewPage.tsx
 * @description Focused SM-2 due-review queue with accessible reveal and rating flow.
 */
import { useCallback, useEffect, useRef, useState } from 'react';

import type { ReviewRating } from '../api/review.api';
import { useReviewQueue, useSubmitReview } from '../hooks/useReviewQueue';
import { ReviewCard } from '../components/review/ReviewCard';
import { ReviewCompletion } from '../components/review/ReviewCompletion';
import { PageHeader } from '../components/layout/PageHeader';

const reviewLimit = 50;

export function ReviewPage() {
  const queue = useReviewQueue({ limit: reviewLimit });
  const submitMutation = useSubmitReview();
  const [isRevealed, setIsRevealed] = useState(false);
  const [lastReview, setLastReview] = useState<{ rating: ReviewRating; interval: number }>();
  const isSubmittingRef = useRef(false);
  const item = queue.data?.items[0];

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
      <PageHeader title="Review" subtitle="Recall due words, then rate how well you remembered them." />
      <div aria-live="polite" className="sr-only">
        {queue.isLoading ? 'Loading review queue.' : queue.isError ? 'Review queue failed to load.' : item ? `${queue.data?.total ?? 0} reviews due.` : 'Review complete. No reviews are due right now.'}
      </div>
      {lastReview && <p role="status" aria-live="polite" className="mx-auto w-full max-w-3xl rounded-xl border border-border bg-primary-subtle px-4 py-3 text-sm text-foreground">{lastReview.rating[0] + lastReview.rating.slice(1).toLowerCase()} saved. Next review in {lastReview.interval} {lastReview.interval === 1 ? 'day' : 'days'}.</p>}

      {queue.isLoading && <LoadingState />}
      {queue.isError && <ErrorState message={queue.error instanceof Error ? queue.error.message : 'Could not load review queue.'} onRetry={() => void queue.refetch()} />}
      {!queue.isLoading && !queue.isError && item && <>
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted">
          <span><strong className="text-foreground">{queue.data?.counts.total ?? queue.data?.total ?? 0}</strong> due today</span>
          <span>SM-2 recall</span>
        </div>
        <ReviewCard item={item} isRevealed={isRevealed} isPending={submitMutation.isPending} onReveal={() => setIsRevealed(true)} onRate={(rating) => void submitRating(rating)} />
        {submitMutation.isError && <p role="alert" className="mx-auto w-full max-w-3xl rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground">{submitMutation.error instanceof Error ? submitMutation.error.message : 'Could not save review.'}</p>}
        {submitMutation.isPending && <p className="mx-auto w-full max-w-3xl text-sm text-muted">Saving review…</p>}
      </>}
      {!queue.isLoading && !queue.isError && !item && <ReviewCompletion lastReview={lastReview} />}
    </div>
  );
}

function LoadingState() {
  return <div role="status" className="mx-auto w-full max-w-3xl rounded-2xl border border-border bg-surface p-8 text-center text-sm text-muted">Loading review queue…</div>;
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return <div role="alert" className="mx-auto w-full max-w-3xl space-y-4 rounded-2xl border border-border bg-secondary p-6 text-foreground"><p>{message}</p><button type="button" onClick={onRetry} className="min-h-11 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Retry</button></div>;
}
