/**
 * @file ReviewSessionSummary.tsx
 * @description Truthful session completion screen showing actual completed evidence without artificial mastery claims.
 */
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, AlertTriangle, XCircle, ArrowRight } from 'lucide-react';

import type { CompleteReviewResult } from '../../api/review.api';
import type { StudyTaskView } from '../../api/study.api';
import { Card } from '../ui/Card';

interface ReviewSessionSummaryProps {
  completedItems: CompleteReviewResult[];
  studyTask?: StudyTaskView | null;
  taskId?: string;
  hasRemainingDue?: boolean;
}

export function ReviewSessionSummary({
  completedItems,
  studyTask,
  taskId,
}: ReviewSessionSummaryProps) {
  const { t } = useTranslation('review');
  const { t: tCalendar } = useTranslation('calendar');
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.scrollIntoView({ block: 'start', inline: 'nearest' });
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  const linkedTaskIncomplete = Boolean(taskId && studyTask && !studyTask.isComplete);

  if (linkedTaskIncomplete) {
    return (
      <Card className="mx-auto w-full max-w-2xl space-y-4 p-4 sm:p-6 md:p-8">
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground focus:outline-none"
        >
          {tCalendar('statuses.PARTIAL')}
        </h2>
        <p className="text-base text-muted leading-relaxed">
          {t('taskIncompleteNoDue')}
        </p>

        {studyTask && (
          <div className="rounded-xl border border-border bg-background p-3.5 text-sm text-muted">
            <span>{tCalendar('taskKinds.review')}: </span>
            <strong className="text-foreground">
              {studyTask.completedCount} / {studyTask.targetCount}
            </strong>
          </div>
        )}

        <div className="mr-16 flex flex-col-reverse sm:flex-row gap-3 pt-3 md:mr-0">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-full sm:w-auto text-center"
          >
            {t('returnOverview')}
          </Link>
          <Link
            to="/calendar"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-full sm:w-auto text-center"
          >
            {tCalendar('title')}
          </Link>
        </div>
      </Card>
    );
  }

  const exactCount = completedItems.filter(
    (item) => item.attempt.recall?.result === 'EXACT',
  ).length;
  const typoCount = completedItems.filter(
    (item) => item.attempt.recall?.result === 'TYPO',
  ).length;
  const incorrectCount = completedItems.filter(
    (item) => item.attempt.recall?.result === 'INCORRECT',
  ).length;

  const practicedWords = completedItems.filter(
    (item) => Boolean(item.attempt.output) || item.attempt.needsOutput,
  );

  return (
    <Card className="mx-auto w-full max-w-2xl space-y-6 p-4 sm:p-6 md:p-8">
      <div>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground focus:outline-none"
        >
          {studyTask?.isComplete && taskId ? t('taskCompleted') : t(completedItems.length > 0 ? 'reviewComplete' : 'noDueTitle')}
        </h2>
        <p className="mt-1 text-sm sm:text-base text-muted leading-relaxed">
          {studyTask?.isComplete && taskId
            ? tCalendar('warnings.backlogSeparate')
            : completedItems.length > 0
              ? t('sessionSummaryDesc')
              : t('noDue')}
        </p>
      </div>

      {completedItems.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-background p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                <span className="text-lg font-bold">{exactCount}</span>
              </div>
              <p className="mt-1 text-xs text-muted">{t('exactCount')}</p>
            </div>

            <div className="rounded-xl border border-border bg-background p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-amber-600 dark:text-amber-400">
                <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                <span className="text-lg font-bold">{typoCount}</span>
              </div>
              <p className="mt-1 text-xs text-muted">{t('typoCount')}</p>
            </div>

            <div className="rounded-xl border border-border bg-background p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-red-600 dark:text-red-400">
                <XCircle className="h-4 w-4" aria-hidden="true" />
                <span className="text-lg font-bold">{incorrectCount}</span>
              </div>
              <p className="mt-1 text-xs text-muted">{t('incorrectCount')}</p>
            </div>
          </div>

          {practicedWords.length > 0 && (
            <div className="rounded-xl border border-border bg-background p-3.5 text-xs sm:text-sm">
              <p className="font-semibold text-foreground">{t('wordsNeedingPractice')}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {practicedWords.map((item) => (
                  <span
                    key={item.attempt.wordId}
                    className="rounded-lg bg-surface px-2.5 py-1 font-medium text-foreground border border-border text-xs"
                  >
                    {item.attempt.word?.word || item.attempt.wordId}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {studyTask?.isComplete && taskId && (
        <div className="rounded-xl border border-border bg-background p-3.5 text-xs sm:text-sm text-muted">
          <span className="font-semibold text-foreground">{tCalendar('taskKinds.review')}: </span>
          <span>
            {tCalendar('statuses.COMPLETED')} ({studyTask.completedCount} / {studyTask.targetCount})
          </span>
        </div>
      )}

      <div className="mr-16 flex flex-col-reverse sm:flex-row gap-3 pt-2 md:mr-0">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-full sm:w-auto text-center"
        >
          {t('returnOverview')}
        </Link>
        <Link
          to="/learn"
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-full sm:w-auto text-center"
        >
          <span>{t('learnNewWords')}</span>
          <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}
