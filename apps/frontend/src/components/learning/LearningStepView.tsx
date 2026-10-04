/**
 * @file LearningStepView.tsx
 * @description Accessible presentation and submission controls for one session step in a Centered Focus Card.
 */
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

import type { AssessmentRating, LearningCursor, LearningSessionItem, SessionStep, SubmitStepPayload } from '../../api/session.api';
import { LearningStepper } from './LearningStepper';

type LearningStepViewProps = {
  item: LearningSessionItem;
  step: SessionStep;
  cursor?: LearningCursor | null;
  isPending: boolean;
  errorMessage?: string;
  recallFeedback?: string | null;
  recallAttemptNumber?: 1 | 2 | null;
  recallHint?: { firstLetter: string; letterCount: number };
  recallRevealedAnswer?: string;
  outputFeedback?: { outcome: string; attemptNumber: 1 | 2 | null; canRetry: boolean; score?: number; explanation?: string; suggestion?: string; codes?: string[] } | null;
  onSubmit: (payload: Omit<SubmitStepPayload, 'wordId' | 'step' | 'requestId'>) => void;
};

const stepOrder: SessionStep[] = ['CONTEXT', 'UNDERSTAND', 'RECALL', 'OUTPUT', 'ASSESS'];

const ratingStyles: Record<AssessmentRating, string> = {
  AGAIN: 'hover:border-red-500 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 focus-visible:ring-red-500',
  HARD: 'hover:border-amber-500 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 focus-visible:ring-amber-500',
  GOOD: 'hover:border-primary hover:bg-primary/10 hover:text-primary dark:hover:text-primary focus-visible:ring-primary',
  EASY: 'hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 focus-visible:ring-emerald-500',
};

export function LearningStepView({
  item,
  step,
  cursor,
  isPending,
  errorMessage,
  recallFeedback,
  recallAttemptNumber,
  recallHint,
  recallRevealedAnswer,
  outputFeedback,
  onSubmit,
}: LearningStepViewProps) {
  const { t } = useTranslation('learning');
  const { t: tCommon } = useTranslation('common');
  const headingRef = useRef<HTMLHeadingElement>(null);
  const recallInputRef = useRef<HTMLInputElement>(null);
  const outputInputRef = useRef<HTMLTextAreaElement>(null);
  const previousCursorAttempt = useRef<1 | 2 | null>(recallAttemptNumber ?? (step === 'RECALL' ? 1 : null));
  const [recallAnswer, setRecallAnswer] = useState('');
  const [recallError, setRecallError] = useState('');
  const [userSentence, setUserSentence] = useState('');
  const [outputError, setOutputError] = useState('');

  useEffect(() => {
    if (step === 'OUTPUT') {
      outputInputRef.current?.focus();
      outputInputRef.current?.scrollIntoView({ block: 'start', inline: 'nearest' });
    } else headingRef.current?.focus();
    setRecallAnswer('');
    setRecallError('');
    setUserSentence('');
    setOutputError('');
    previousCursorAttempt.current = recallAttemptNumber ?? (step === 'RECALL' ? 1 : null);
  }, [step, item.wordId]);

  useEffect(() => {
    const movedToRecallRetry = step === 'RECALL' && previousCursorAttempt.current === 1 && recallAttemptNumber === 2;
    if (movedToRecallRetry) recallInputRef.current?.focus();
    previousCursorAttempt.current = recallAttemptNumber ?? (step === 'RECALL' ? 1 : null);
  }, [recallAttemptNumber, step]);

  useEffect(() => {
    if (step !== 'ASSESS') return undefined;
    const handleWindowKey = (event: globalThis.KeyboardEvent) => {
      if (isPending) return;
      const target = event.target as HTMLElement | null;
      if (target && (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable)) return;
      const ratings: Record<string, AssessmentRating> = { '1': 'AGAIN', '2': 'HARD', '3': 'GOOD', '4': 'EASY' };
      const rating = ratings[event.key];
      if (!rating) return;
      event.preventDefault();
      onSubmit({ assessmentRating: rating });
    };
    window.addEventListener('keydown', handleWindowKey);
    return () => window.removeEventListener('keydown', handleWindowKey);
  }, [isPending, onSubmit, step]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 'RECALL' && !recallAnswer.trim()) {
      setRecallError(t('recallRequired'));
      return;
    }
    if (step === 'OUTPUT' && !userSentence.trim()) {
      setOutputError(t('outputRequired'));
      return;
    }
    setOutputError('');
    if (step === 'RECALL') onSubmit({ answer: recallAnswer.trim() });
    if (step === 'OUTPUT') onSubmit({ answer: userSentence.trim() });
  }

  const word = item.word;
  const stepLabels: Record<SessionStep, string> = {
    CONTEXT: t('context'),
    UNDERSTAND: t('understand'),
    RECALL: t('recall'),
    OUTPUT: t('output'),
    ASSESS: t('assess'),
  };
  const ratingLabels: Record<AssessmentRating, string> = {
    AGAIN: t('rating.AGAIN'),
    HARD: t('rating.HARD'),
    GOOD: t('rating.GOOD'),
    EASY: t('rating.EASY'),
  };
  const nextStep = stepOrder[stepOrder.indexOf(step) + 1];
  let nextLabel: string = nextStep ? t('continueTo', { step: stepLabels[nextStep] }) : t('continue');
  if (
    step === 'UNDERSTAND' &&
    cursor?.phase === 'ENCODE' &&
    cursor.groupSize > 1 &&
    cursor.itemIndex < cursor.groupSize - 1
  ) {
    nextLabel = t('nextWordInGroup');
  }

  const recallFeedbackLabel =
    recallFeedback === 'CORRECT'
      ? t('correct')
      : recallFeedback === 'ALMOST_CORRECT' || recallFeedback === 'CORRECT_AFTER_HINT'
      ? t('almostCorrect')
      : recallFeedback === 'INCORRECT'
      ? t('incorrect')
      : recallFeedback;

  return (
    <section
      className="mx-auto w-full max-w-2xl rounded-2xl border border-border bg-surface p-4 sm:p-6 md:p-8 shadow-sm space-y-6"
      aria-labelledby="learning-step-heading"
    >
      <LearningStepper currentStep={step} cursor={cursor} />

      <div>
        <h2
          id="learning-step-heading"
          ref={headingRef}
          tabIndex={-1}
          className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground focus:outline-none"
        >
          {stepLabels[step]}
        </h2>
      </div>

      {outputFeedback && (
        <div role="status" className="space-y-2 rounded-lg border border-primary/30 bg-primary-subtle px-4 py-3 text-sm text-foreground">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p>{t('outputResult', { result: outputFeedback.outcome })} {outputFeedback.attemptNumber ? t('attempt', { current: outputFeedback.attemptNumber }) : ''}</p>
            {outputFeedback.score !== undefined && <strong className="text-base text-primary">{t('outputScore', { score: outputFeedback.score })}</strong>}
          </div>
          {outputFeedback.explanation && <p>{outputFeedback.explanation}</p>}
          {outputFeedback.suggestion && <p><strong>{t('outputSuggestion')}:</strong> {outputFeedback.suggestion}</p>}
          {outputFeedback.codes?.map((code) => (
            <p key={code}>{t(`outputCode.${code}` as 'outputCode.EMPTY')}</p>
          ))}
        </div>
      )}

      {step === 'CONTEXT' && (
        <form onSubmit={(event) => { event.preventDefault(); onSubmit({}); }} className="space-y-6">
          <div className="rounded-xl border border-border border-l-4 border-l-primary bg-secondary/30 p-4 sm:p-6 text-base sm:text-lg md:text-xl leading-relaxed text-foreground shadow-none break-words">
            {word.contextSentence || t('contextReady')}
          </div>
          <p className="text-sm sm:text-base text-muted">{t('contextPrompt')}</p>
          <SubmitButton isPending={isPending} disabled={false} label={nextLabel} />
        </form>
      )}

      {step === 'UNDERSTAND' && (
        <form onSubmit={(event) => { event.preventDefault(); onSubmit({}); }} className="space-y-6">
          <div className="rounded-xl border border-border bg-secondary/30 p-4 sm:p-6 space-y-3">
            <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground break-words">
                {word.headword || word.word}
              </span>
              {word.phonetic && (
                <span className="font-mono text-base sm:text-lg text-muted">
                  {word.phonetic}
                </span>
              )}
              {word.partOfSpeech && (
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary border border-primary/20">
                  {word.partOfSpeech}
                </span>
              )}
            </div>
            {word.definition && (
              <p className="text-lg leading-relaxed text-foreground font-medium pt-1">
                {word.definition}
              </p>
            )}
            {word.translation && (
              <p className="text-base text-muted">
                {word.translation}
              </p>
            )}
          </div>
          <InfoList
            title={t('collocations')}
            values={(word.collocations ?? []).map((entry) => entry.phrase || entry.collocation).filter(Boolean) as string[]}
            empty={t('noCollocations')}
          />
          <InfoList
            title={t('examples')}
            values={(word.examples ?? []).map((entry) => entry.sentence).filter(Boolean) as string[]}
            empty={t('noExamples')}
          />
          <SubmitButton isPending={isPending} disabled={false} label={nextLabel} />
        </form>
      )}

      {step === 'RECALL' && (
        <form onSubmit={submit} className="space-y-6">
          {recallHint && (
            <p role="status" className="rounded-lg border border-primary/30 bg-primary-subtle px-4 py-3 text-sm text-foreground">
              {t('recallHint', recallHint)}
            </p>
          )}
          {recallRevealedAnswer && (
            <p role="status" className="rounded-lg border border-primary/30 bg-primary-subtle px-4 py-3 text-sm text-foreground">
              {t('recallRevealed', { answer: recallRevealedAnswer })}
            </p>
          )}
          <div className="rounded-xl border border-border bg-secondary/30 p-4 sm:p-6 text-base sm:text-lg md:text-xl leading-relaxed text-foreground break-words">
            {item.clozeSentence || word.contextSentence || t('recallPrompt')}
          </div>
          <div className="space-y-2">
            <label htmlFor="recall-answer" className="text-sm font-semibold text-foreground">
              {t('recallAnswer')} {recallAttemptNumber ? t('attempt', { current: recallAttemptNumber }) : ''}
            </label>
            <input
              ref={recallInputRef}
              id="recall-answer"
              autoComplete="off"
              value={recallAnswer}
              onChange={(event) => { setRecallAnswer(event.target.value); setRecallError(''); }}
              disabled={isPending}
              className="min-h-12 w-full rounded-xl border border-border bg-background px-3.5 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>
          {recallError && <p role="alert" className="text-sm text-red-700 dark:text-red-200">{recallError}</p>}
          <SubmitButton isPending={isPending} disabled={!recallAnswer.trim()} label={nextLabel} />
        </form>
      )}

      {step === 'OUTPUT' && (
        <form onSubmit={submit} className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-1.5 text-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">{tCommon('labels.word')}:</span>
            <span className="font-semibold text-foreground">{word.headword || word.word}</span>
          </div>

          {recallFeedback && (
            <p role="status" className="rounded-lg border border-primary/30 bg-primary-subtle px-4 py-3 text-sm text-foreground">
              {t('recallResult', { result: recallFeedbackLabel ?? '' })}
            </p>
          )}
          <div className="space-y-2">
            <label htmlFor="user-sentence" className="text-sm font-semibold text-foreground">
              {t('outputSentence')}
            </label>
            <textarea
              ref={outputInputRef}
              id="user-sentence"
              rows={5}
              value={userSentence}
              onChange={(event) => { setUserSentence(event.target.value); setOutputError(''); }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
                  event.preventDefault();
                  event.currentTarget.form?.requestSubmit();
                }
              }}
              disabled={isPending}
              aria-describedby="user-sentence-help"
              className="w-full rounded-xl border border-border bg-background px-3.5 py-3 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
            <p id="user-sentence-help" className="text-sm text-muted">
              {t('outputHelp', { word: word.headword || word.word })}
            </p>
          </div>
          {outputError && <p role="alert" className="text-sm text-red-700 dark:text-red-200">{outputError}</p>}
          <div>
            <SubmitButton isPending={isPending} disabled={!userSentence.trim()} label={nextLabel} pendingLabel={t('grading')} />
          </div>
        </form>
      )}

      {step === 'ASSESS' && (
        <div className="space-y-6" aria-label={t('assessmentControls')}>
          <p className="text-base text-muted">{t('assessmentPrompt')}</p>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 sm:grid-cols-4">
            {(Object.entries(ratingLabels) as [AssessmentRating, string][]).map(([rating, label], index) => (
              <button
                key={rating}
                type="button"
                aria-label={`${index + 1}. ${label}`}
                disabled={isPending}
                onClick={() => onSubmit({ assessmentRating: rating })}
                className={`min-h-14 rounded-xl border border-border bg-surface p-2.5 sm:px-4 sm:py-3 text-sm font-semibold text-foreground shadow-sm transition-colors ${ratingStyles[rating]} disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 flex flex-col items-center justify-center`}
              >
                <span>{label}</span>
                <kbd
                  aria-hidden="true"
                  className="mt-1 inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-secondary/80 px-1 text-[11px] font-mono text-muted"
                >
                  {index + 1}
                </kbd>
              </button>
            ))}
          </div>
        </div>
      )}

      {errorMessage && (
        <p role="alert" className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200">
          {errorMessage}
        </p>
      )}
    </section>
  );
}

function SubmitButton({ isPending, disabled, label, pendingLabel }: { isPending: boolean; disabled: boolean; label: string; pendingLabel?: string }) {
  const { t } = useTranslation('learning');
  return (
    <button
      type="submit"
      disabled={isPending || disabled}
      className="min-h-11 w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-primary px-6 py-2.5 text-sm sm:text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {isPending ? pendingLabel ?? t('saving') : label}
    </button>
  );
}

function InfoList({ title, values, empty }: { title: string; values: string[]; empty: string }) {
  return (
    <section aria-label={title} className="rounded-xl border border-border bg-secondary/20 p-3.5 sm:p-5">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">{title}</h3>
      {values.length > 0 ? (
        <ul className="mt-2.5 list-disc space-y-1.5 pl-5 text-sm text-foreground">
          {values.map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-muted">{empty}</p>
      )}
    </section>
  );
}
