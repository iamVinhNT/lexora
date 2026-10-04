/**
 * @file ReviewRatingControls.tsx
 * @description Accessible SM-2 rating buttons using intervals returned by backend.
 */
import type { ReviewItem, ReviewRating } from '../../api/review.api';
import { useTranslation } from 'react-i18next';
import { formatIntervalPreview } from '../../i18n/formatters';
import { getLocalizedEnumLabel } from '../../i18n/presentation';

type ReviewRatingControlsProps = {
  item: ReviewItem;
  isRevealed: boolean;
  isPending: boolean;
  onRate: (rating: ReviewRating) => void;
};

const ratings: Array<{ value: ReviewRating; shortcut: string }> = [
  { value: 'AGAIN', shortcut: '1' },
  { value: 'HARD', shortcut: '2' },
  { value: 'GOOD', shortcut: '3' },
  { value: 'EASY', shortcut: '4' },
];

export function ReviewRatingControls({ item, isRevealed, isPending, onRate }: ReviewRatingControlsProps) {
  const { t } = useTranslation('review');
  return (
    <section aria-labelledby="review-rating-heading" className="space-y-3">
      <div>
         <h3 id="review-rating-heading" className="text-sm font-semibold text-foreground">{t('rateRecall')}</h3>
         <p className="mt-1 text-sm text-muted">{isRevealed ? t('chooseRating') : t('revealBeforeRating')}</p>
      </div>
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 sm:grid-cols-4">
        {ratings.map(({ value, shortcut }) => {
          const label = getLocalizedEnumLabel(t, 'rating', value);
          const interval = formatIntervalPreview(item.intervalPreviews[value]);
          return (
            <button
              key={value}
              type="button"
              disabled={!isRevealed || isPending}
              onClick={() => onRate(value)}
              className="flex min-h-14 flex-col justify-center rounded-xl border border-border bg-surface p-2.5 text-left text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary hover:bg-primary-subtle disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:px-3 sm:py-3"
              aria-label={t('ratingButton', { label, interval })}
            >
              <span className="block leading-snug">{label}</span>
              <span className="mt-1 block text-xs font-normal text-muted leading-tight break-words">{interval} · {shortcut}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
