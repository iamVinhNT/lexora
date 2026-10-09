/**
 * @file ReviewAssessStage.tsx
 * @description Accessible SM-2 assessment stage with server-returned effective ratings, interval previews, and shortcuts.
 */
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle, ArrowRight, X } from 'lucide-react';

import type { ReviewAttemptView, ReviewRating } from '../../api/review.api';
import { formatIntervalPreview } from '../../i18n/formatters';
import { getLocalizedEnumLabel, getLocalizedErrorMessage } from '../../i18n/presentation';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface ReviewAssessStageProps {
  attempt: ReviewAttemptView;
  isPending: boolean;
  error: Error | null;
  onRate: (rating: ReviewRating) => void;
  onAbandon: () => void;
  onRetry: () => void;
}

const ratingsList: Array<{ value: ReviewRating; shortcut: string }> = [
  { value: 'AGAIN', shortcut: '1' },
  { value: 'HARD', shortcut: '2' },
  { value: 'GOOD', shortcut: '3' },
  { value: 'EASY', shortcut: '4' },
];

export function ReviewAssessStage({
  attempt,
  isPending,
  error,
  onRate,
  onAbandon,
  onRetry,
}: ReviewAssessStageProps) {
  const { t } = useTranslation('review');
  const { t: tCommon } = useTranslation('common');
  const { t: tLearning } = useTranslation('learning');
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const recallResult = attempt.recall?.result;
  const isIncorrect = recallResult === 'INCORRECT';
  const isTypo = recallResult === 'TYPO';

  useEffect(() => {
    headerRef.current?.scrollIntoView({ block: 'start', inline: 'nearest' });
    headingRef.current?.focus({ preventScroll: true });
  }, [attempt.id]);

  useEffect(() => {

    function handleKeyDown(event: KeyboardEvent) {
      if (isPending) return;
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) ||
          target.isContentEditable ||
          Boolean(target.closest('[role="dialog"]') || target.closest('[data-ai-guide]')))
      ) {
        return;
      }
      const ratingMap: Record<string, ReviewRating> = {
        '1': 'AGAIN',
        '2': 'HARD',
        '3': 'GOOD',
        '4': 'EASY',
      };
      const rating = ratingMap[event.key];
      if (rating) {
        event.preventDefault();
        onRate(rating);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [attempt.id, isPending, onRate]);
  return (
    <Card className="mx-auto w-full max-w-3xl p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div ref={headerRef} className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted">
          {t('rateRecall')}
        </span>
        <button
          type="button"
          onClick={onAbandon}
          disabled={isPending}
          aria-label={t('abandon')}
          title={t('abandon')}
          className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 px-2.5 text-xs text-muted transition-colors hover:text-foreground"
        >
          <X className="h-4 w-4 md:hidden" aria-hidden="true" />
          <span className="hidden md:inline">{t('abandon')}</span>
        </button>
      </div>

      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-foreground focus:outline-none"
      >
        {t('rateRecall')}
      </h2>

      <p className="mt-1 text-xs sm:text-sm text-muted">
        {t('rateRecallSubtitle')}
      </p>

      {/* Target Word Summary */}
      <div className="mt-4 rounded-xl bg-primary-subtle p-3.5 sm:p-4 text-xs sm:text-sm">
        <span className="font-semibold text-foreground">{t('targetWord')}: </span>
        <strong className="text-foreground font-bold text-base sm:text-lg">
          {attempt.word?.word}
        </strong>
        {attempt.word?.definition && (
          <p className="mt-1 text-foreground">{attempt.word.definition}</p>
        )}
      </div>

      {attempt.output && (
        <section aria-label={t('practiceSentence')} className="mt-4 space-y-2 rounded-xl border border-border bg-background p-3.5 text-sm text-foreground">
          <h3 className="font-semibold">{attempt.output.method === 'AI' ? t('aiAssessment') : t('selfCheck')}</h3>
          <p className="whitespace-pre-wrap break-words">{attempt.output.answer}</p>
          {attempt.output.method === 'AI' && attempt.output.score !== null ? (
            <>
              <strong>{tLearning('outputScore', { score: attempt.output.score })}</strong>
              {attempt.output.explanation && <p className="break-words">{attempt.output.explanation}</p>}
              {attempt.output.suggestion && <p className="break-words"><strong>{tLearning('outputSuggestion')}:</strong> {attempt.output.suggestion}</p>}
            </>
          ) : <p className="text-xs text-muted">{t('selfCheckNotice')}</p>}
        </section>
      )}

      {/* Constraint Notice if evidence limits rating */}
      {(isIncorrect || isTypo) && (
        <div className="mt-3 rounded-xl border border-border bg-background p-3 text-xs text-muted">
          {isIncorrect ? t('recallConstraintIncorrect') : t('recallConstraintTypo')}
        </div>
      )}

      {/* Error alert with retry */}
      {error && (
        <div
          role="alert"
          className="mt-4 flex items-center justify-between rounded-xl border border-border bg-secondary p-3.5 text-xs sm:text-sm text-foreground"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-500" aria-hidden="true" />
            <span>{getLocalizedErrorMessage(error, tCommon)}</span>
          </div>
          <Button type="button" variant="secondary" onClick={onRetry} disabled={isPending}>
            {t('retry')}
          </Button>
        </div>
      )}

      {/* Rating Cards Grid */}
      <div className="mr-16 mt-6 grid grid-cols-1 gap-2.5 min-[360px]:grid-cols-2 md:mr-0 md:grid-cols-4 md:gap-3">
        {ratingsList.map(({ value, shortcut }) => {
          const selfLabel = getLocalizedEnumLabel(t, 'rating', value);
          const effectiveRating = attempt.effectiveRatings?.[value] || value;
          const effectiveLabel = getLocalizedEnumLabel(t, 'rating', effectiveRating);
          const previewInterval = formatIntervalPreview(attempt.intervalPreviews?.[value]);
          const isConstrained = effectiveRating !== value;

          return (
            <button
              key={value}
              type="button"
              disabled={isPending}
              onClick={() => onRate(value)}
              className="flex min-h-20 flex-col justify-between rounded-xl border border-border bg-surface p-3 text-left transition-colors hover:border-primary hover:bg-primary-subtle disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={t(isConstrained ? 'ratingButtonConstrained' : 'ratingButton', {
                label: selfLabel,
                effectiveLabel,
                interval: previewInterval,
              })}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm sm:text-base text-foreground">
                    {selfLabel}
                  </span>
                  <span className="rounded bg-background px-1.5 py-0.5 text-2xs font-mono text-muted border border-border">
                    {shortcut}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-foreground">{t(`ratingDescriptions.${value}`)}</p>

                {isConstrained && (
                  <span className="mt-1 inline-flex items-center gap-0.5 text-2xs font-medium text-foreground">
                    <ArrowRight className="h-2.5 w-2.5" aria-hidden="true" />
                    {t('appliedEffective', { rating: effectiveLabel })}
                  </span>
                )}
              </div>

              <div className="mt-2 text-xs text-foreground">
                {previewInterval}
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
