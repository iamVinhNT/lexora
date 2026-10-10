/**
 * @file ReviewFeedbackStage.tsx
 * @description Feedback stage displaying accuracy badge, word details, pronunciation, examples, and adaptive next steps.
 */
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, ArrowRight, CheckCircle2, LogOut, PenTool, RotateCw, Volume2, XCircle } from 'lucide-react';
import type { ReviewAttemptView } from '../../api/review.api';
import { getLocalizedErrorMessage } from '../../i18n/presentation';
import { speakEnglishWord } from '../vocabulary/speech';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface ReviewFeedbackStageProps {
  attempt: ReviewAttemptView;
  isPending: boolean;
  error: Error | null;
  onContinue: (practice?: boolean) => void;
  onAbandon: () => void;
  onRetry: () => void;
}

export function ReviewFeedbackStage({
  attempt,
  isPending,
  error,
  onContinue,
  onAbandon,
  onRetry,
}: ReviewFeedbackStageProps) {
  const { t } = useTranslation('review');
  const { t: tCommon } = useTranslation('common');
  const recallResult = attempt.recall?.result || 'INCORRECT';
  const targetWord = attempt.word?.word || '';
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    headerRef.current?.scrollIntoView({ block: 'start', inline: 'nearest' });
    headingRef.current?.focus({ preventScroll: true });
  }, [attempt.id]);

  const resultBadgeConfig = {
    EXACT: {
      icon: CheckCircle2,
      label: t('recallExact'),
      classes: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    },
    TYPO: {
      icon: AlertTriangle,
      label: t('recallTypo'),
      classes: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    },
    INCORRECT: {
      icon: XCircle,
      label: t('recallIncorrect'),
      classes: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
    },
  }[recallResult];

  const BadgeIcon = resultBadgeConfig.icon;

  return (
    <Card className="mx-auto w-full max-w-3xl p-4 sm:p-6 md:p-8">
      {/* Accuracy Header */}
      <div ref={headerRef} className="flex flex-wrap items-center justify-between gap-3">
        <div
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs sm:text-sm font-semibold ${resultBadgeConfig.classes}`}
          role="status"
        >
          <BadgeIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{resultBadgeConfig.label}</span>
        </div>

        <button
          type="button"
          onClick={onAbandon}
          disabled={isPending}
          aria-label={t('abandon')}
          title={t('abandon')}
          className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 px-2.5 text-xs text-muted transition-colors hover:text-foreground"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">{t('abandon')}</span>
        </button>
      </div>

      {/* Target Word & Pronunciation */}
      <div className="mt-4 rounded-xl bg-primary-subtle p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-baseline gap-2">
              <h2
                ref={headingRef}
                tabIndex={-1}
                data-review-answer="true"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground break-words"
              >
                {targetWord}
              </h2>
              {attempt.word?.phonetic && (
                <span className="text-sm font-normal text-foreground">
                  {attempt.word.phonetic}
                </span>
              )}
              {attempt.word?.partOfSpeech && (
                <span className="rounded bg-surface px-1.5 py-0.5 text-xs text-muted">
                  {attempt.word.partOfSpeech}
                </span>
              )}
            </div>

            <p className="mt-2 text-base font-medium text-foreground">
              {attempt.word?.definition}
            </p>
            {attempt.word?.translation && (
              <p className="mt-1 text-sm text-foreground">{attempt.word.translation}</p>
            )}
          </div>

          {targetWord && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => speakEnglishWord(targetWord)}
              aria-label={t('pronounce')}
              className="min-h-11 min-w-11 shrink-0 rounded-full"
              icon={Volume2}
              iconOnly
            >
            </Button>
          )}
        </div>

        {/* User Answer Comparison */}
        <div className="mt-3 border-t border-border/50 pt-2.5 text-xs sm:text-sm text-foreground">
          <span>{t('yourAnswer')}: </span>
          <span className="font-semibold text-foreground">
            {attempt.recall?.answer ? attempt.recall.answer : t('dontRemember')}
          </span>
        </div>
      </div>

      {/* Real Examples */}
      {attempt.examples && attempt.examples.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            {t('examples')}
          </p>
          <div className="space-y-2">
            {attempt.examples.map((ex, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-border bg-background p-3 text-xs sm:text-sm"
              >
                <p className="font-medium text-foreground">{ex.sentence}</p>
                {ex.translation && (
                  <p className="mt-1 text-muted">{ex.translation}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Real Contexts */}
      {attempt.contexts && attempt.contexts.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            {t('contexts')}
          </p>
          <div className="space-y-2">
            {attempt.contexts.map((ctx, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-border bg-background p-3 text-xs sm:text-sm"
              >
                <p className="font-semibold text-foreground">{ctx.title}</p>
                <p className="mt-1 text-muted leading-relaxed">{ctx.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Adaptive Route Notice */}
      {attempt.needsOutput && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-primary/20 bg-primary-subtle p-3.5 text-xs sm:text-sm text-foreground">
          <PenTool className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <span>{t('needsOutputNotice')}</span>
        </div>
      )}

      {/* Error Retry */}
      {error && (
        <div
          role="alert"
          className="mt-4 flex items-center justify-between rounded-xl border border-border bg-secondary p-3.5 text-xs sm:text-sm text-foreground"
        >
          <span>{getLocalizedErrorMessage(error, tCommon)}</span>
          <Button type="button" variant="secondary" onClick={onRetry} disabled={isPending} icon={RotateCw} iconOnly>
            {t('retry')}
          </Button>
        </div>
      )}

      {/* Action Controls */}
      <div className="mr-16 mt-6 flex flex-col-reverse items-stretch justify-end gap-2.5 border-t border-border pt-4 md:mr-0 md:flex-row md:items-center">
        {!attempt.needsOutput && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => onContinue(true)}
            disabled={isPending}
            className="min-h-11 whitespace-normal px-2 text-muted hover:text-foreground sm:px-4"
            icon={PenTool}
          >
            {t('practiceSentence')}
          </Button>
        )}

        <Button
          type="button"
          onClick={() => onContinue(attempt.needsOutput ? true : false)}
          disabled={isPending}
          className="min-h-11 whitespace-normal px-2 font-semibold sm:px-6"
          icon={ArrowRight}
        >
          <span>{attempt.needsOutput ? t('practiceSentence') : t('continueToAssess')}</span>
        </Button>
      </div>
    </Card>
  );
}
