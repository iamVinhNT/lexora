/**
 * @file LearningStepView.tsx
 * @description Accessible presentation and submission controls for one session step.
 */
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';

import type { AssessmentRating, LearningSessionItem, SessionStep, SubmitStepPayload } from '../../api/session.api';

type LearningStepViewProps = {
  item: LearningSessionItem;
  step: SessionStep;
  isPending: boolean;
  errorMessage?: string;
  recallFeedback?: string | null;
  onSubmit: (payload: Omit<SubmitStepPayload, 'wordId' | 'step'>) => void;
};

const stepOrder: SessionStep[] = ['CONTEXT', 'UNDERSTAND', 'RECALL', 'OUTPUT', 'ASSESS'];
export function LearningStepView({ item, step, isPending, errorMessage, recallFeedback, onSubmit }: LearningStepViewProps) {
  const { t } = useTranslation('learning');
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [recallAnswer, setRecallAnswer] = useState('');
  const [recallError, setRecallError] = useState('');
  const [userSentence, setUserSentence] = useState('');
  const [outputError, setOutputError] = useState('');

  useEffect(() => {
    headingRef.current?.focus();
    setRecallAnswer('');
    setRecallError('');
    setUserSentence('');
    setOutputError('');
  }, [step, item.wordId]);

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
    if (step === 'RECALL') onSubmit({ recallAnswer: recallAnswer.trim() });
    if (step === 'OUTPUT') onSubmit({ userSentence: userSentence.trim() });
  }

  function handleAssessmentKey(event: KeyboardEvent<HTMLElement>) {
    if (step !== 'ASSESS' || isPending) return;
    const target = event.target as HTMLElement;
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable) return;
    const ratings: Record<string, AssessmentRating> = { '1': 'AGAIN', '2': 'HARD', '3': 'GOOD', '4': 'EASY' };
    const rating = ratings[event.key];
    if (rating) {
      event.preventDefault();
      onSubmit({ assessmentRating: rating });
    }
  }

  const word = item.word;
  const stepLabels: Record<SessionStep, string> = { CONTEXT: t('context'), UNDERSTAND: t('understand'), RECALL: t('recall'), OUTPUT: t('output'), ASSESS: t('assess') };
  const ratingLabels: Record<AssessmentRating, string> = { AGAIN: t('rating.AGAIN'), HARD: t('rating.HARD'), GOOD: t('rating.GOOD'), EASY: t('rating.EASY') };
  const nextStep = stepOrder[stepOrder.indexOf(step) + 1];
  const nextLabel = nextStep ? t('continueTo', { step: stepLabels[nextStep] }) : t('continue');
  const recallFeedbackLabel = recallFeedback === 'CORRECT' ? t('correct') : recallFeedback === 'ALMOST_CORRECT' ? t('almostCorrect') : recallFeedback === 'INCORRECT' ? t('incorrect') : recallFeedback;

  return (
    <section className="mx-auto w-full max-w-3xl space-y-6" onKeyDown={handleAssessmentKey} aria-labelledby="learning-step-heading">
       <div aria-live="polite" className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{t('step', { current: stepOrder.indexOf(step) + 1, total: 5 })}</div>
       <h2 id="learning-step-heading" ref={headingRef} tabIndex={-1} className="text-3xl font-semibold tracking-tight text-foreground focus:outline-none sm:text-4xl">{stepLabels[step]}</h2>
      {step === 'CONTEXT' && <form onSubmit={(event) => { event.preventDefault(); onSubmit({}); }} className="space-y-6">
         <div className="rounded-2xl border border-border bg-surface p-6 text-lg leading-8 shadow-sm">{word.contextSentence || t('contextReady')}</div>
         <p className="text-base text-muted">{t('contextPrompt')}</p>
        <SubmitButton disabled={isPending} label={nextLabel} />
      </form>}

      {step === 'UNDERSTAND' && <form onSubmit={(event) => { event.preventDefault(); onSubmit({}); }} className="space-y-6">
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <div className="text-4xl font-bold tracking-tight text-foreground">{word.headword || word.word}</div>
          {word.phonetic && <div className="mt-2 text-lg text-muted">{word.phonetic}</div>}
          {word.partOfSpeech && <div className="mt-4 text-sm font-semibold uppercase tracking-wide text-primary">{word.partOfSpeech}</div>}
          {word.definition && <p className="mt-3 text-lg leading-8 text-foreground">{word.definition}</p>}
          {word.translation && <p className="mt-2 text-base text-muted">{word.translation}</p>}
        </div>
         <InfoList title={t('collocations')} values={(word.collocations ?? []).map((entry) => entry.phrase || entry.collocation).filter(Boolean) as string[]} empty={t('noCollocations')} />
         <InfoList title={t('examples')} values={(word.examples ?? []).map((entry) => entry.sentence).filter(Boolean) as string[]} empty={t('noExamples')} />
        <SubmitButton disabled={isPending} label={nextLabel} />
      </form>}

      {step === 'RECALL' && <form onSubmit={submit} className="space-y-6">
         <div className="rounded-2xl border border-border bg-surface p-6 text-lg leading-8 shadow-sm">{item.clozeSentence || word.contextSentence || t('recallPrompt')}</div>
        <div className="space-y-2">
           <label htmlFor="recall-answer" className="text-sm font-semibold text-foreground">{t('recallAnswer')}</label>
          <input id="recall-answer" autoComplete="off" value={recallAnswer} onChange={(event) => { setRecallAnswer(event.target.value); setRecallError(''); }} disabled={isPending} className="min-h-12 w-full rounded-lg border border-border bg-background px-3 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
        </div>
        {recallError && <p role="alert" className="text-sm text-red-700 dark:text-red-200">{recallError}</p>}
        <SubmitButton disabled={isPending || !recallAnswer.trim()} label={nextLabel} />
      </form>}

      {step === 'OUTPUT' && <form onSubmit={submit} className="space-y-6">
         {recallFeedback && <p role="status" className="rounded-lg border border-primary/30 bg-primary-subtle px-4 py-3 text-sm text-foreground">{t('recallResult', { result: recallFeedbackLabel ?? '' })}</p>}
        <div className="space-y-2">
           <label htmlFor="user-sentence" className="text-sm font-semibold text-foreground">{t('outputSentence')}</label>
          <textarea id="user-sentence" rows={5} value={userSentence} onChange={(event) => { setUserSentence(event.target.value); setOutputError(''); }} onKeyDown={(event) => { if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} disabled={isPending} aria-describedby="user-sentence-help" className="w-full rounded-lg border border-border bg-background px-3 py-3 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
           <p id="user-sentence-help" className="text-sm text-muted">{t('outputHelp', { word: word.headword || word.word })}</p>
        </div>
        {outputError && <p role="alert" className="text-sm text-red-700 dark:text-red-200">{outputError}</p>}
        <SubmitButton disabled={isPending} label={nextLabel} />
      </form>}

       {step === 'ASSESS' && <div className="space-y-6" aria-label={t('assessmentControls')}>
         <p className="text-base text-muted">{t('assessmentPrompt')}</p>
         <input aria-label={t('assessmentShortcuts')} tabIndex={-1} className="sr-only" readOnly value="" onChange={() => undefined} />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(Object.entries(ratingLabels) as [AssessmentRating, string][]).map(([rating, label], index) => <button key={rating} type="button" aria-label={label} disabled={isPending} onClick={() => onSubmit({ assessmentRating: rating })} className="min-h-14 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary hover:bg-primary-subtle disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{label}<span aria-hidden="true" className="mt-1 block text-xs font-normal text-muted">{index + 1}</span></button>)}
        </div>
      </div>}

      {errorMessage && <p role="alert" className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200">{errorMessage}</p>}
    </section>
  );
}

function SubmitButton({ disabled, label }: { disabled: boolean; label: string }) {
  const { t } = useTranslation('learning');
  return <button type="submit" disabled={disabled} className="min-h-11 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">{disabled ? t('saving') : label}</button>;
}

function InfoList({ title, values, empty }: { title: string; values: string[]; empty: string }) {
  return <section aria-label={title} className="rounded-xl border border-border bg-surface p-5"><h3 className="font-semibold text-foreground">{title}</h3>{values.length > 0 ? <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">{values.map((value) => <li key={value}>{value}</li>)}</ul> : <p className="mt-2 text-sm text-muted">{empty}</p>}</section>;
}
