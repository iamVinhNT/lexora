/**
 * @file ReviewCompletion.tsx
 * @description Truthful completion state for an empty due-review queue.
 */
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import type { ReviewRating } from '../../api/review.api';
import { formatIntervalDays } from '../../i18n/formatters';
import { getLocalizedEnumLabel } from '../../i18n/presentation';

type ReviewCompletionProps = {
  lastReview?: { rating: ReviewRating; interval: number };
};

export function ReviewCompletion({ lastReview }: ReviewCompletionProps) {
  const { t } = useTranslation('review');
  return (
    <section className="mx-auto w-full max-w-2xl space-y-6 rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <div>
         <h2 tabIndex={-1} className="text-3xl font-semibold tracking-tight text-foreground focus:outline-none sm:text-4xl">{t('reviewComplete')}</h2>
         <p className="mt-2 text-base leading-7 text-muted">{t('noDue')}</p>
       </div>
       {lastReview && <p aria-live="polite" className="rounded-xl bg-primary-subtle px-4 py-3 text-sm text-foreground">{t('saved', { rating: getLocalizedEnumLabel(t, 'rating', lastReview.rating), interval: formatIntervalDays(lastReview.interval) })}</p>}
      <div className="flex flex-wrap gap-3">
         <Link to="/" className="inline-flex min-h-11 items-center rounded-lg border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t('returnOverview')}</Link>
         <Link to="/learn" className="inline-flex min-h-11 items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t('learnNewWords')}</Link>
      </div>
    </section>
  );
}
