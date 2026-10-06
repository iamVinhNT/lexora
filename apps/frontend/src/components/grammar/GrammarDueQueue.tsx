/**
 * @file GrammarDueQueue.tsx
 * @description Spaced repetition review queue with server-graded transfer items and SM-2 feedback.
 */
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type {
  GrammarPracticeDueItem,
  SubmitGrammarReviewInput,
  SubmitGrammarReviewResponse,
} from '../../api/grammar-practice.api';
import {
  useGrammarPracticeDue,
  useSubmitGrammarReview,
} from '../../hooks/useGrammarPractice';
import { GrammarReviewFeedback } from './GrammarReviewFeedback';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

function createRequestId(): string {
  return (
    globalThis.crypto?.randomUUID?.() ??
    `${Date.now()}-${Math.random().toString(36).slice(2)}`
  );
}

export function GrammarDueQueue() {
  const { t } = useTranslation('grammar');
  const dueQuery = useGrammarPracticeDue();
  const submitReview = useSubmitGrammarReview();

  const [isReviewing, setIsReviewing] = useState(false);
  const [sessionItems, setSessionItems] = useState<GrammarPracticeDueItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [reviewResult, setReviewResult] = useState<SubmitGrammarReviewResponse | null>(null);

  const pendingReviewRef = useRef<SubmitGrammarReviewInput | null>(null);
  const promptRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (isReviewing) promptRef.current?.focus();
  }, [currentIndex, isReviewing]);


  const items = isReviewing ? sessionItems : dueQuery.data?.items ?? [];
  const currentItem: GrammarPracticeDueItem | undefined = items[currentIndex];

  function startSession() {
    const dueList = dueQuery.data?.items ?? [];
    setSessionItems(dueList);
    setCurrentIndex(0);
    setAnswer('');
    setReviewResult(null);
    pendingReviewRef.current = null;
    setIsReviewing(true);
  }

  function closeSession() {
    if (submitReview.isPending) return;
    setIsReviewing(false);
    setSessionItems([]);
    setCurrentIndex(0);
    setAnswer('');
    setReviewResult(null);
    pendingReviewRef.current = null;
    submitReview.reset();
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!currentItem || submitReview.isPending || !answer.trim()) return;

    const isChoice = currentItem.exercise.kind === 'choice';
    const existing = pendingReviewRef.current;
    const input: SubmitGrammarReviewInput =
      existing &&
      existing.lessonId === currentItem.lessonId &&
      existing.revisionId === currentItem.revisionId &&
      existing.exerciseId === currentItem.exercise.id &&
      existing.answer.text === answer.trim()
        ? existing
        : {
            requestId: createRequestId(),
            lessonId: currentItem.lessonId,
            revisionId: currentItem.revisionId,
            exerciseId: currentItem.exercise.id,
            answer: {
              type: isChoice ? 'choice' : 'text',
              text: answer.trim(),
            },
          };

    pendingReviewRef.current = input;

    try {
      const res = await submitReview.mutateAsync(input);
      pendingReviewRef.current = null;
      setReviewResult(res);
    } catch {
      // Retain pendingReviewRef for idempotent retry
    }
  }

  function handleNext() {
    setReviewResult(null);
    setAnswer('');
    pendingReviewRef.current = null;
    submitReview.reset();
    if (currentIndex + 1 < items.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      closeSession();
    }
  }

  if (dueQuery.isLoading) {
    return (
      <Card className="p-4 sm:p-5">
        <p role="status" aria-busy="true" className="text-sm text-muted">
          {t('loadingDue')}
        </p>
      </Card>
    );
  }
  if (dueQuery.isError) {
    return (
      <Card className="space-y-3 p-4 sm:p-5">
        <p role="alert" className="text-sm text-foreground">{t('dueLoadError')}</p>
        <Button type="button" variant="secondary" onClick={() => void dueQuery.refetch()}>{t('retry')}</Button>
      </Card>
    );
  }
  if (!Array.isArray(dueQuery.data?.items)) {
    return (
      <Card className="space-y-3 p-4 sm:p-5">
        <p role="alert" className="text-sm text-foreground">{t('dueLoadError')}</p>
        <Button type="button" variant="secondary" onClick={() => void dueQuery.refetch()}>{t('retry')}</Button>
      </Card>
    );
  }
  if (!isReviewing) {
    if (items.length === 0) {
      return (
        <Card className="flex flex-col gap-2 p-4 sm:p-5">
          <div className="flex items-center gap-2 text-foreground font-semibold">
            <BookOpen aria-hidden="true" size={18} className="text-primary" />
            <h3>{t('dueQueueTitle')}</h3>
          </div>
          <p className="text-sm text-muted">{t('noDueDescription')}</p>
        </Card>
      );
    }

    return (
      <Card className="flex flex-col gap-3 p-4 sm:p-5 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground">{t('dueQueueTitle')}</h3>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              {t('dueItemsCount', { count: items.length })}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted">{t('dueQueueSubtitle')}</p>
        </div>
        <Button
          type="button"
          onClick={startSession}
          className="min-h-11 w-full shrink-0 sm:w-auto"
        >
          {t('startReview')}
        </Button>
      </Card>
    );
  }

  if (!currentItem) {
    return null;
  }

  const isChoice = currentItem.exercise.kind === 'choice';
  const hasResult = Boolean(reviewResult);

  return (
    <Card className="space-y-4 p-4 sm:p-6">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div>
          <h3 className="font-semibold text-foreground">{t('reviewModalTitle')}</h3>
          <p className="text-xs text-muted">
            {currentItem.lessonTitle} · ({currentIndex + 1}/{items.length})
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          onClick={closeSession}
          disabled={submitReview.isPending}
          className="text-xs"
        >
          {t('finishReview')}
        </Button>
      </div>

      <div className="rounded-xl border border-primary/20 bg-primary-subtle p-3 text-xs sm:text-sm text-foreground">
        {t('transferNotice')}
      </div>

      <div className="space-y-2">
        <p ref={promptRef} tabIndex={-1} className="text-sm sm:text-base font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
          {currentItem.exercise.prompt}
        </p>

        <form onSubmit={handleSubmit} aria-busy={submitReview.isPending} className="space-y-4">
          {isChoice ? (
            <fieldset disabled={submitReview.isPending || hasResult} className="space-y-2.5">
              <legend className="sr-only">{t('answerChoice')}</legend>
              {currentItem.exercise.options.map((opt, idx) => (
                <label
                  key={`${idx}-${opt.text}`}
                  className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-border bg-background p-3 text-sm text-foreground has-[:checked]:border-primary has-[:checked]:bg-primary-subtle has-[:disabled]:cursor-not-allowed focus-within:ring-2 focus-within:ring-primary"
                >
                  <input
                    type="radio"
                    required
                    name={`review-opt-${currentItem.exercise.id}`}
                    value={opt.text}
                    checked={answer === opt.text}
                    onChange={() => {
                      setAnswer(opt.text);
                      pendingReviewRef.current = null;
                      submitReview.reset();
                    }}
                    className="h-4 w-4 accent-primary"
                  />
                  <span>{opt.text}</span>
                </label>
              ))}
            </fieldset>
          ) : (
            <div className="space-y-1">
              <label htmlFor="review-text-answer" className="sr-only">
                {t('answerText')}
              </label>
              <textarea
                id="review-text-answer"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  if (e.target.value.trim() !== answer.trim()) pendingReviewRef.current = null;
                  submitReview.reset();
                }}
                disabled={submitReview.isPending || hasResult}
                rows={3}
                placeholder={t('answerPlaceholder')}
                className="w-full rounded-xl border border-border bg-background p-3 text-base text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60"
              />
            </div>
          )}

          {!hasResult && (
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <Button
                type="submit"
                disabled={submitReview.isPending || !answer.trim()}
                className="min-h-11 w-full sm:w-auto"
              >
                {submitReview.isPending ? t('submittingReview') : t('submitAnswer')}
              </Button>
              {submitReview.isPending && (
                <span role="status" aria-live="polite" className="text-xs text-muted">{t('reviewSavingDisabled')}</span>
              )}
            </div>
          )}
        </form>
      </div>

      {submitReview.isError && (
        <div role="alert" className="rounded-xl border border-border bg-secondary p-3 text-sm text-foreground">
          <p>{t('outputSaveError')}</p>
        </div>
      )}

      {reviewResult && (
        <GrammarReviewFeedback
          result={reviewResult}
          hasNext={currentIndex + 1 < items.length}
          onContinue={handleNext}
        />
      )}
    </Card>
  );
}
