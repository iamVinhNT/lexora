/**
 * @file ReviewRatingControls.tsx
 * @description Accessible SM-2 rating buttons using intervals returned by backend.
 */
import type { ReviewItem, ReviewRating } from '../../api/review.api';

type ReviewRatingControlsProps = {
  item: ReviewItem;
  isRevealed: boolean;
  isPending: boolean;
  onRate: (rating: ReviewRating) => void;
};

const ratings: Array<{ value: ReviewRating; label: string; shortcut: string }> = [
  { value: 'AGAIN', label: 'Again', shortcut: '1' },
  { value: 'HARD', label: 'Hard', shortcut: '2' },
  { value: 'GOOD', label: 'Good', shortcut: '3' },
  { value: 'EASY', label: 'Easy', shortcut: '4' },
];

export function ReviewRatingControls({ item, isRevealed, isPending, onRate }: ReviewRatingControlsProps) {
  return (
    <section aria-labelledby="review-rating-heading" className="space-y-3">
      <div>
        <h3 id="review-rating-heading" className="text-sm font-semibold text-foreground">Rate recall</h3>
        <p className="mt-1 text-sm text-muted">{isRevealed ? 'Choose how well you recalled this word.' : 'Reveal answer before rating.'}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {ratings.map(({ value, label, shortcut }) => (
          <button
            key={value}
            type="button"
            disabled={!isRevealed || isPending}
            onClick={() => onRate(value)}
            className="min-h-14 rounded-xl border border-border bg-surface px-3 py-3 text-left text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary hover:bg-primary-subtle disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={`${label}, next review ${item.intervalPreviews[value]}`}
          >
            <span className="block">{label}</span>
            <span className="mt-1 block text-xs font-normal text-muted">{item.intervalPreviews[value]} · {shortcut}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
