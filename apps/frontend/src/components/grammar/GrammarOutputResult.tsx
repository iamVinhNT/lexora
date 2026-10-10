/**
 * @file GrammarOutputResult.tsx
 * @description Saved output, self-assessment disclosure, and reference answer.
 */
import { CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { SubmitGrammarOutputResponse } from '../../api/grammar-practice.api';
import { Button } from '../ui/Button';

export function GrammarOutputResult({
  result,
  onPracticeAgain,
}: {
  result: SubmitGrammarOutputResponse;
  onPracticeAgain: () => void;
}) {
  const { t } = useTranslation('grammar');

  return (
    <div className="space-y-4 pt-2">
      <div role="status" className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary-subtle p-4 text-sm text-foreground">
        <CheckCircle2 aria-hidden="true" size={18} className="shrink-0 text-primary" />
        <div className="space-y-0.5">
          <p className="font-semibold">{t('outputSaved')}</p>
          <p className="text-xs text-muted">{t('outputDisclaimer')}</p>
        </div>
      </div>
      <div className="space-y-2 rounded-xl border border-border bg-secondary/50 p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <Sparkles aria-hidden="true" size={17} className="text-primary" />
          <h4 className="text-sm font-semibold text-foreground">{t('modelAnswerTitle')}</h4>
        </div>
        <p className="whitespace-pre-line text-sm sm:text-base leading-relaxed text-foreground">{result.modelAnswer}</p>
      </div>
      <Button type="button" variant="secondary" onClick={onPracticeAgain} className="min-h-11" icon={RotateCcw}>
        {t('practiceAgain')}
      </Button>
    </div>
  );
}
