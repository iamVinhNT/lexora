/**
 * @file GrammarReviewFeedback.tsx
 * @description Review grading, schedule, and continue action.
 */
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { SubmitGrammarReviewResponse } from '../../api/grammar-practice.api';
import { Button } from '../ui/Button';

export function GrammarReviewFeedback({
  result,
  hasNext,
  onContinue,
}: {
  result: SubmitGrammarReviewResponse;
  hasNext: boolean;
  onContinue: () => void;
}) {
  const { t } = useTranslation('grammar');

  return (
    <div role="status" aria-live="polite" className={`space-y-3 rounded-xl border p-4 text-sm ${result.attempt.isCorrect ? 'border-primary/30 bg-primary-subtle text-foreground' : 'border-border bg-secondary text-foreground'}`}>
      <div className="flex items-center gap-2 font-semibold">
        {result.attempt.isCorrect ? <CheckCircle2 aria-hidden="true" size={18} className="text-primary" /> : <XCircle aria-hidden="true" size={18} className="text-muted" />}
        <span>{result.attempt.isCorrect ? t('correct') : t('incorrect')}</span>
      </div>
      {result.attempt.feedback && <p className="whitespace-pre-line leading-relaxed">{result.attempt.feedback}</p>}
      <p className="text-xs text-muted">{result.attempt.rating === 'GOOD' ? t('reviewSavedGood') : t('reviewSavedAgain')}</p>
      <Button type="button" onClick={onContinue} className="min-h-11 w-full sm:w-auto" icon={ArrowRight}>
        {hasNext ? t('nextReviewItem') : t('finishReview')}
      </Button>
    </div>
  );
}
