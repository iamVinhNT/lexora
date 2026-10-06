/**
 * @file GrammarOutputPractice.tsx
 * @description Free-form writing output practice with self-assessment rubric (0-2) and revealed model answers.
 */
import { useRef, useState, type FormEvent } from 'react';
import { Check, PenTool } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { SubmitGrammarOutputInput, SubmitGrammarOutputResponse } from '../../api/grammar-practice.api';
import { useSubmitGrammarOutput } from '../../hooks/useGrammarPractice';
import { GrammarOutputResult } from './GrammarOutputResult';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export type GrammarOutputPrompt = {
  id: string;
  prompt: string;
  checks: string[];
};

export function GrammarOutputPractice({
  lessonId,
  revisionId,
  prompts,
}: {
  lessonId: string;
  revisionId: string;
  prompts: GrammarOutputPrompt[];
}) {
  const { t } = useTranslation('grammar');
  const submitOutput = useSubmitGrammarOutput();

  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [drafts, setDrafts] = useState<
    Record<string, { text: string; form: number; meaning: number; use: number }>
  >({});
  const [submittedResults, setSubmittedResults] = useState<
    Record<string, SubmitGrammarOutputResponse>
  >({});

  const pendingRef = useRef<Record<string, SubmitGrammarOutputInput>>({});

  const activePrompt = prompts[activePromptIndex];
  if (!activePrompt) return null;

  const currentDraft = drafts[activePrompt.id] ?? {
    text: '',
    form: 2,
    meaning: 2,
    use: 2,
  };
  const currentResult = submittedResults[activePrompt.id];

  function updateDraft(
    field: 'text' | 'form' | 'meaning' | 'use',
    value: string | number,
  ) {
    delete pendingRef.current[activePrompt.id];
    submitOutput.reset();
    setDrafts((prev) => ({
      ...prev,
      [activePrompt.id]: {
        ...(prev[activePrompt.id] ?? { text: '', form: 2, meaning: 2, use: 2 }),
        [field]: value,
      },
    }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const text = currentDraft.text.trim();
    if (!text || text.length > 2000 || submitOutput.isPending) return;

    const existing = pendingRef.current[activePrompt.id];
    const input: SubmitGrammarOutputInput = existing
      && existing.lessonId === lessonId
      && existing.revisionId === revisionId
      && existing.promptId === activePrompt.id
      && existing.text === text
      && existing.rubric.form === currentDraft.form
      && existing.rubric.meaning === currentDraft.meaning
      && existing.rubric.use === currentDraft.use
      ? existing
      : {
            requestId:
              globalThis.crypto?.randomUUID?.() ??
              `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            lessonId,
            revisionId,
            promptId: activePrompt.id,
            text,
            rubric: {
              form: currentDraft.form,
              meaning: currentDraft.meaning,
              use: currentDraft.use,
            },
          };

    pendingRef.current[activePrompt.id] = input;

    try {
      const res = await submitOutput.mutateAsync(input);
      delete pendingRef.current[activePrompt.id];
      setSubmittedResults((prev) => ({ ...prev, [activePrompt.id]: res }));
    } catch {
      // Draft preserved in state
    }
  }

  const rubricDimensions: Array<{
    key: 'form' | 'meaning' | 'use';
    label: string;
  }> = [
    { key: 'form', label: t('rubricForm') },
    { key: 'meaning', label: t('rubricMeaning') },
    { key: 'use', label: t('rubricUse') },
  ];

  return (
    <section aria-labelledby="grammar-output-heading" className="space-y-4">
      <div>
        <div className="flex items-center gap-2">
          <PenTool aria-hidden="true" size={20} className="text-primary" />
          <h2
            id="grammar-output-heading"
            tabIndex={-1}
            className="scroll-mt-20 sm:scroll-mt-24 text-xl sm:text-2xl font-bold tracking-tight text-foreground focus:outline-none"
          >
            {t('outputSectionTitle')}
          </h2>
        </div>
        <p className="mt-1 text-sm text-muted">{t('outputSectionSubtitle')}</p>
      </div>

      {prompts.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {prompts.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={activePromptIndex === idx}
              aria-label={t('outputPromptTab', { index: idx + 1 })}
              onClick={() => setActivePromptIndex(idx)}
              className={`min-h-11 rounded-lg px-3.5 py-1.5 text-sm font-semibold transition-colors ${activePromptIndex === idx ? 'bg-primary text-primary-foreground' : 'border border-border bg-surface text-muted hover:text-foreground'}`}
            >
              {t('outputPromptTab', { index: idx + 1 })}{submittedResults[p.id] ? ' ✓' : ''}
            </button>
          ))}
        </div>
      )}
      <Card className="space-y-5 p-4 sm:p-6 md:p-7">
        <div className="space-y-2">
          <h3 className="text-base sm:text-lg font-semibold text-foreground">
            {activePrompt.prompt}
          </h3>

          {activePrompt.checks.length > 0 && (
            <div className="rounded-xl border border-border bg-secondary/40 p-3.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                {t('criteriaChecklist')}
              </p>
              <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-foreground">
                {activePrompt.checks.map((chk, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check
                      aria-hidden="true"
                      size={14}
                      className="mt-0.5 shrink-0 text-primary"
                    />
                    <span>{chk}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label
              htmlFor={`output-text-${activePrompt.id}`}
              className="text-sm font-medium text-foreground"
            >
              {t('answerText')}
            </label>
            <textarea
              id={`output-text-${activePrompt.id}`}
              value={currentDraft.text}
              onChange={(e) => updateDraft('text', e.target.value)}
              disabled={submitOutput.isPending || Boolean(currentResult)}
              rows={4}
              maxLength={2000}
              placeholder={t('outputPlaceholder')}
              className="w-full rounded-xl border border-border bg-background p-3.5 text-base text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-75"
            />
            <div className="flex justify-end text-xs text-muted">
              {currentDraft.text.length}/2000
            </div>
          </div>

          <fieldset disabled={submitOutput.isPending || Boolean(currentResult)} className="space-y-3 rounded-xl border border-border bg-surface p-4">
            <legend className="text-sm font-semibold text-foreground">{t('outputRubricTitle')}</legend>

            <div className="space-y-3">
              {rubricDimensions.map(({ key, label }) => (
                <fieldset key={key} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <legend className="text-sm font-medium text-foreground">{label}</legend>
                  <div className="flex items-center gap-2">
                    {[0, 1, 2].map((score) => {
                      const scoreLabel = score === 0 ? t('rubricScore0') : score === 1 ? t('rubricScore1') : t('rubricScore2');
                      return (
                        <label key={score} className={`relative flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-lg px-2.5 py-1 text-xs font-semibold focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 ${currentDraft[key] === score ? 'bg-primary text-primary-foreground' : 'border border-border bg-background text-muted hover:text-foreground'}`}>
                          <input type="radio" name={`rubric-${activePrompt.id}-${key}`} value={score} checked={currentDraft[key] === score} onChange={() => updateDraft(key, score)} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
                          <span aria-hidden="true">{score}</span>
                          <span className="sr-only">{t('rubricOptionLabel', { dimension: label, score, description: scoreLabel })}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </div>
          </fieldset>

          {!currentResult && (
            <div className="space-y-2">
              <Button
                type="submit"
                disabled={
                  submitOutput.isPending ||
                  !currentDraft.text.trim() ||
                  currentDraft.text.length > 2000
                }
                className="min-h-11 w-full sm:w-auto"
              >
                {submitOutput.isPending ? t('savingOutput') : t('saveSelfAssessment')}
              </Button>
              <p className="text-xs text-muted">{t('outputDisclaimer')}</p>
            </div>
          )}
        </form>

        {submitOutput.isError && (
          <div
            role="alert"
            className="rounded-xl border border-border bg-secondary p-4 text-sm text-foreground"
          >
            <p>{t('outputSaveError')}</p>
          </div>
        )}

        {currentResult && (
          <GrammarOutputResult
            result={currentResult}
            onPracticeAgain={() => {
              setSubmittedResults((prev) => {
                const next = { ...prev };
                delete next[activePrompt.id];
                return next;
              });
              submitOutput.reset();
            }}
          />
        )}
      </Card>
    </section>
  );
}
