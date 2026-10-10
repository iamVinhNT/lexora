/**
 * @file ReviewOutputStage.tsx
 * @description Adaptive sentence output stage with optional explicit AI grading and self-check criteria.
 */
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle, Check, CheckCheck, LogOut, RotateCw, Sparkles } from 'lucide-react';

import type { AiSettingsMetadata } from '../../api/ai-settings.api';
import type { ReviewAttemptView } from '../../api/review.api';
import { getReviewDraft, setReviewDraft } from '../../hooks/useAdaptiveReview';
import { getLocalizedErrorMessage } from '../../i18n/presentation';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
interface ReviewOutputStageProps {
  attempt: ReviewAttemptView;
  aiSettings?: AiSettingsMetadata | null;
  isPending: boolean;
  error: Error | null;
  onOutput: (answer: string, method: 'SELF' | 'AI', configRevision?: string) => void;
  onAbandon: () => void;
  onRetry: () => void;
}

export function ReviewOutputStage({
  attempt,
  aiSettings,
  isPending,
  error,
  onOutput,
  onAbandon,
  onRetry,
}: ReviewOutputStageProps) {
  const { t } = useTranslation('review');
  const { t: tCommon } = useTranslation('common');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const targetWord = attempt.word?.word || '';
  const [sentence, setSentence] = useState<string>(() =>
    getReviewDraft(attempt.id, 'output'),
  );

  const [checkMeaning, setCheckMeaning] = useState(false);
  const [checkGrammar, setCheckGrammar] = useState(false);

  useEffect(() => {
    textareaRef.current?.scrollIntoView({ block: 'start', inline: 'nearest' });
    textareaRef.current?.focus({ preventScroll: true });
  }, [attempt.id]);

  useEffect(() => {
    if (!error) return;
    errorRef.current?.scrollIntoView({ block: 'start', inline: 'nearest' });
    errorRef.current?.focus({ preventScroll: true });
  }, [error]);

  function handleSentenceChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const val = e.target.value;
    setSentence(val);
    setReviewDraft(attempt.id, 'output', val);
  }

  const trimmed = sentence.trim();
  const containsWord = Boolean(targetWord) && (function() {
    const escaped = targetWord.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(?:^|[^a-zA-Z0-9_-])${escaped}(?:$|[^a-zA-Z0-9_-])`, 'i');
    return regex.test(trimmed);
  })();
  function handleSelfCheck() {
    if (!trimmed || isPending) return;
    onOutput(trimmed, 'SELF');
  }

  function handleAiGrading() {
    if (!trimmed || isPending || !aiSettings?.isConfigured) return;
    onOutput(trimmed, 'AI', aiSettings.revision);
  }

  return (
    <Card className="mx-auto w-full max-w-3xl p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted">
          {t('practiceSentence')}
        </span>
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

      <h2
        tabIndex={-1}
        className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-foreground focus:outline-none"
      >
        {t('practiceSentence')}
      </h2>

      <p className="mt-1 text-xs sm:text-sm text-muted leading-relaxed">
        {t('outputPrompt')}
      </p>

      {/* Target Word Reminder */}
      <div className="mt-4 rounded-xl border border-border bg-background p-3.5 sm:p-4 text-xs sm:text-sm">
        <span className="font-semibold text-foreground">{t('targetWord')}: </span>
        <strong className="text-primary font-bold text-base sm:text-lg">{targetWord}</strong>
        {attempt.word?.definition && (
          <p className="mt-1 text-muted">{attempt.word.definition}</p>
        )}
      </div>

      {/* Error alert with retry/switch */}
      {error && (
        <div
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          className="mt-4 scroll-mt-6 flex flex-col gap-2 rounded-xl border border-border bg-secondary p-3.5 text-xs sm:text-sm text-foreground focus:outline-none"
        >
          <div className="flex items-center gap-2 font-medium">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-500" aria-hidden="true" />
            <span>{getLocalizedErrorMessage(error, tCommon)}</span>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={onRetry}
              disabled={isPending}
              icon={RotateCw}
              iconOnly
            >
              {t('retry')}
            </Button>
          </div>
        </div>
      )}

      {/* Sentence input */}
      <div className="mt-4">
        <label
          htmlFor="review-output-sentence"
          className="block text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted"
        >
          {t('yourSentence')}
        </label>
        <textarea
          ref={textareaRef}
          id="review-output-sentence"
          value={sentence}
          onChange={handleSentenceChange}
          placeholder={t('sentencePlaceholder')}
          rows={3}
          disabled={isPending}
          className="mt-2 w-full scroll-mt-6 rounded-xl border border-border bg-background p-3.5 text-base sm:text-lg text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60"
        />
      </div>

      {/* Self-check checklist */}
      <div className="mt-4 rounded-xl border border-border bg-background p-3.5 sm:p-4 text-xs sm:text-sm space-y-2.5">
        <p className="font-semibold text-foreground">{t('selfCheckTitle')}</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            {containsWord ? (
              <Check className="h-4 w-4 text-emerald-500 shrink-0" aria-hidden="true" />
            ) : (
              <span className="h-4 w-4 rounded border border-muted shrink-0 inline-block" aria-hidden="true" />
            )}
            <span className={containsWord ? 'text-foreground font-medium' : 'text-muted'}>
              {t('selfCheckContainsWord')} ({targetWord})
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <input
              type="checkbox"
              id="check-meaning"
              checked={checkMeaning}
              onChange={(e) => setCheckMeaning(e.target.checked)}
              className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 accent-primary cursor-pointer"
            />
            <label htmlFor="check-meaning" className="text-foreground cursor-pointer select-none">
              {t('selfCheckCorrectMeaning')}
            </label>
          </div>

          <div className="flex items-center gap-2.5">
            <input
              type="checkbox"
              id="check-grammar"
              checked={checkGrammar}
              onChange={(e) => setCheckGrammar(e.target.checked)}
              className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 accent-primary cursor-pointer"
            />
            <label htmlFor="check-grammar" className="text-foreground cursor-pointer select-none">
              {t('selfCheckCompleteSentence')}
            </label>
          </div>
        </div>
        <p className="pt-1 text-2xs sm:text-xs text-muted">{t('selfCheckNotice')}</p>
      </div>
      {/* Submission actions */}
      <div className="mr-16 mt-6 flex flex-col-reverse items-stretch justify-end gap-2.5 border-t border-border pt-4 md:mr-0 md:flex-row md:items-center">
        {/* Optional AI grading if configured */}
        {aiSettings?.isConfigured && (
          <Button
            type="button"
            variant="secondary"
            onClick={handleAiGrading}
            disabled={!trimmed || isPending}
            className="min-h-11 whitespace-normal px-2 font-semibold sm:px-4"
            icon={Sparkles}
          >
            <span>{isPending ? t('gradingWithAi') : t('gradeWithAi')}</span>
          </Button>
        )}

        {/* Self check action */}
        {/* Self check action */}
        <Button
          type="button"
          onClick={handleSelfCheck}
          disabled={!trimmed || !containsWord || !checkMeaning || !checkGrammar || isPending}
          className="min-h-11 whitespace-normal px-2 font-semibold sm:px-6"
          icon={CheckCheck}
        >
          {t('selfCheck')}
        </Button>
      </div>
    </Card>
  );
}
