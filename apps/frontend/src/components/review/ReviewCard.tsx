/**
 * @file ReviewCard.tsx
 * @description Focused recall card with reveal-first review flow.
 */
import { useEffect, useRef } from 'react';

import type { ReviewItem, ReviewRating } from '../../api/review.api';
import { Card } from '../ui/Card';
import { ReviewRatingControls } from './ReviewRatingControls';

type ReviewCardProps = {
  item: ReviewItem;
  isRevealed: boolean;
  isPending: boolean;
  onReveal: () => void;
  onRate: (rating: ReviewRating) => void;
};

export function ReviewCard({ item, isRevealed, isPending, onReveal, onRate }: ReviewCardProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const recallPrompt = item.exercisePrompts.RECALL;
  const clozePrompt = item.exercisePrompts.CLOZE;

  useEffect(() => {
    headingRef.current?.focus();
  }, [item.wordId]);

  function activateReveal(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== ' ' && event.key !== 'Enter') return;
    event.preventDefault();
    onReveal();
  }

  return (
    <Card className="mx-auto w-full max-w-3xl p-5 sm:p-8">
      <div className="flex items-center justify-between gap-4 text-sm text-muted">
        <span>Recall review</span>
        <span>{item.learningProgress?.status || 'NEW'}</span>
      </div>
      <h2 ref={headingRef} tabIndex={-1} className="mt-6 text-4xl font-bold tracking-tight text-foreground focus:outline-none sm:text-5xl">Recall the word</h2>

      <div className="mt-8 space-y-5">
        <Prompt label="Recall prompt" value={recallPrompt?.prompt || item.word.translation || item.word.definition} />
        <Prompt label="Cloze" value={clozePrompt?.prompt || 'Complete the sentence with the target word.'} />
      </div>

      <div className="mt-8 border-t border-border pt-6">
        {!isRevealed ? (
          <button
            type="button"
            onClick={onReveal}
            onKeyDown={activateReveal}
            className="min-h-11 w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            aria-expanded="false"
          >
            Reveal answer
          </button>
        ) : (
          <div className="space-y-5" aria-live="polite">
            <div className="rounded-xl bg-primary-subtle p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Answer</p>
              <p data-review-answer="true" className="mt-2 text-2xl font-semibold text-foreground">{recallPrompt?.answer || item.word.word}</p>
              <p className="mt-2 text-base leading-7 text-foreground">{item.word.definition}</p>
              {item.word.translation && <p className="mt-1 text-sm text-muted">{item.word.translation}</p>}
            </div>
          </div>
        )}
        <div className={isRevealed ? 'mt-5' : ''}>
          <ReviewRatingControls item={item} isRevealed={isRevealed} isPending={isPending} onRate={onRate} />
        </div>
      </div>
    </Card>
  );
}

function Prompt({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-2 text-base leading-7 text-foreground">{value}</p>
    </div>
  );
}
