/**
 * @file ReviewCard.tsx
 * @description Focused recall card with reveal-first review flow.
 */
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import type { ReviewItem, ReviewRating } from '../../api/review.api';
import { Card } from '../ui/Card';
import { ReviewRatingControls } from './ReviewRatingControls';
import { getLocalizedEnumLabel } from '../../i18n/presentation';

type ReviewCardProps = {
  item: ReviewItem;
  isRevealed: boolean;
  isPending: boolean;
  onReveal: () => void;
  onRate: (rating: ReviewRating) => void;
};

export function ReviewCard({ item, isRevealed, isPending, onReveal, onRate }: ReviewCardProps) {
  const { t } = useTranslation('review');
  const headingRef = useRef<HTMLHeadingElement>(null);
  const recallPrompt = item.exercisePrompts.RECALL;
  const clozePrompt = item.exercisePrompts.CLOZE;

  useEffect(() => {
    headingRef.current?.focus();
  }, [item.wordId]);

  return (
    <Card className="mx-auto w-full max-w-3xl p-4 sm:p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-muted">
        <span>{t('recallReview')}</span>
        <span>{getLocalizedEnumLabel(t, 'states', item.learningProgress?.status || 'NEW')}</span>
      </div>
      <h2 ref={headingRef} tabIndex={-1} className="mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground focus:outline-none">
        {t('recallTheWord')}
      </h2>

      <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
        <Prompt label={t('recallPrompt')} value={recallPrompt?.prompt || item.word.translation || item.word.definition} />
        <Prompt label={t('cloze')} value={clozePrompt?.prompt || t('completeSentence')} />
      </div>

      <div className="mt-6 sm:mt-8 border-t border-border pt-5 sm:pt-6">
        {!isRevealed ? (
          <button
            type="button"
            onClick={onReveal}
            className="min-h-12 w-full rounded-xl bg-primary px-5 py-3 text-sm sm:text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            aria-expanded={isRevealed}
          >
            {t('revealAnswer')}
          </button>
        ) : (
          <div className="space-y-4 sm:space-y-5" aria-live="polite">
            <div className="rounded-xl bg-primary-subtle p-4 sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">{t('answer')}</p>
              <p data-review-answer="true" className="mt-2 text-xl sm:text-2xl font-semibold text-foreground break-words">{recallPrompt?.answer || item.word.word}</p>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-foreground">{item.word.definition}</p>
              {item.word.translation && <p className="mt-1 text-xs sm:text-sm text-muted">{item.word.translation}</p>}
            </div>
          </div>
        )}
        <div className={isRevealed ? 'mt-4 sm:mt-5' : ''}>
          <ReviewRatingControls item={item} isRevealed={isRevealed} isPending={isPending} onRate={onRate} />
        </div>
      </div>
    </Card>
  );
}

function Prompt({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-3.5 sm:p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-2 text-sm sm:text-base leading-relaxed text-foreground">{value}</p>
    </div>
  );
}
