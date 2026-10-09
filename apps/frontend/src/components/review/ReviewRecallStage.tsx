/**
 * @file ReviewRecallStage.tsx
 * @description Active recall stage with prompt, typed input, draft persistence, and Don't remember action.
 */
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle, HelpCircle, X } from 'lucide-react';

import type { ReviewAttemptView } from '../../api/review.api';
import { getReviewDraft, setReviewDraft } from '../../hooks/useAdaptiveReview';
import { getLocalizedErrorMessage } from '../../i18n/presentation';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface ReviewRecallStageProps {
  attempt: ReviewAttemptView;
  isPending: boolean;
  error: Error | null;
  onRecall: (answer: string) => void;
  onAbandon: () => void;
  onRetry: () => void;
}

export function ReviewRecallStage({
  attempt,
  isPending,
  error,
  onRecall,
  onAbandon,
  onRetry,
}: ReviewRecallStageProps) {
  const { t } = useTranslation('review');
  const { t: tCommon } = useTranslation('common');
  const inputRef = useRef<HTMLInputElement>(null);

  const [answer, setAnswer] = useState<string>(() =>
    getReviewDraft(attempt.id, 'recall'),
  );

  useEffect(() => {
    // Focus input on mount or attempt change
    inputRef.current?.focus();
  }, [attempt.id]);

  function handleAnswerChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setAnswer(val);
    setReviewDraft(attempt.id, 'recall', val);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = answer.trim();
    if (isPending || !trimmed) return;
    onRecall(trimmed);
  }

  function handleDontRemember() {
    if (isPending) return;
    setAnswer('');
    setReviewDraft(attempt.id, 'recall', '');
    onRecall('');
  }

  return (
    <Card className="mx-auto w-full max-w-3xl p-4 sm:p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-muted">
        <div className="flex items-center gap-2">
          <span>{t('recallReview')}</span>
          <span>·</span>
          <span>{attempt.prompt.type === 'CLOZE' ? t('cloze') : t('recallPrompt')}</span>
        </div>
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
        tabIndex={-1}
        className="mt-3 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground focus:outline-none"
      >
        {t('recallTheWord')}
      </h2>

      <div className="mt-4 rounded-xl border border-border bg-background p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
          {attempt.prompt.type === 'CLOZE' ? t('completeSentence') : t('recallPrompt')}
        </p>
        <p className="mt-2 text-base sm:text-lg md:text-xl font-medium leading-relaxed text-foreground">
          {attempt.prompt.text}
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="mt-4 flex flex-col gap-2 rounded-xl border border-border bg-secondary p-3.5 sm:p-4 text-sm text-foreground"
        >
          <div className="flex items-center gap-2 font-medium">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-500" aria-hidden="true" />
            <span>{getLocalizedErrorMessage(error, tCommon)}</span>
          </div>
          <div>
            <Button
              type="button"
              variant="secondary"
              onClick={onRetry}
              disabled={isPending}
            >
              {t('retry')}
            </Button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div>
          <label
            htmlFor="review-answer"
            className="block text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted"
          >
            {t('yourAnswer')}
          </label>
          <input
            ref={inputRef}
            id="review-answer"
            type="text"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false"
            value={answer}
            onChange={handleAnswerChange}
            placeholder={t('answerPlaceholder')}
            disabled={isPending}
            className="mt-2 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-base sm:text-lg text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60"
          />
        </div>

        <div className="mr-16 grid grid-cols-1 gap-2.5 pt-2 min-[360px]:grid-cols-2 md:mr-0 md:flex md:items-center md:justify-end">
          <Button
            type="button"
            variant="ghost"
            onClick={handleDontRemember}
            disabled={isPending}
            className="min-h-11 min-w-0 px-2 text-muted hover:text-foreground"
          >
            <HelpCircle className="hidden h-4 w-4 sm:block" aria-hidden="true" />
            {t('dontRemember')}
          </Button>

          <Button
            type="submit"
            disabled={isPending || !answer.trim()}
            className="min-h-11 min-w-0 whitespace-normal px-2 font-semibold sm:px-6"
          >
            {isPending ? t('checking') : t('check')}
          </Button>
        </div>
      </form>
    </Card>
  );
}
