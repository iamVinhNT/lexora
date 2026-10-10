/**
 * @file StudyTaskCard.tsx
 * @description Task item card with task progress, status badges, and action CTAs.
 */
import { AlertCircle, ArrowRight, Ban, MoveRight, Pencil, Play, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import type { StudyTaskView } from '../../api/study.api';
import { formatNumber } from '../../i18n/formatters';
import { Button } from '../ui/Button';

export type StudyTaskCardProps = {
  task: StudyTaskView;
  activeSession?: { id: string } | null;
  onEdit?: (task: StudyTaskView) => void;
  onMove?: (task: StudyTaskView) => void;
  onCancel?: (task: StudyTaskView) => void;
};

export function StudyTaskCard({ task, activeSession, onEdit, onMove, onCancel }: StudyTaskCardProps) {
  const { t } = useTranslation('calendar');

  const kindLabel =
    task.kind === 'LEARN_WORDS'
      ? t('taskKinds.learn')
      : task.kind === 'REVIEW_WORDS'
        ? t('taskKinds.review')
        : t('taskKinds.grammar');

  const isGrammar = task.kind === 'GRAMMAR';
  const unit = isGrammar
    ? task.targetCount === 1
      ? t('progressUnit.lesson_one')
      : t('progressUnit.lesson_other')
    : task.targetCount === 1
      ? t('progressUnit.word_one')
      : t('progressUnit.word_other');

  const progressPercent = Math.min(100, Math.round((task.completedCount / Math.max(1, task.targetCount)) * 100));

  const isTaskActiveSession = Boolean(
    task.activeSessionId && (!activeSession || activeSession.id === task.activeSessionId),
  );
  const hasOtherActiveSession = Boolean(activeSession && activeSession.id !== task.activeSessionId);

  const getStartHref = (): string | null => {
    if (task.kind === 'LEARN_WORDS') return `/learn?taskId=${encodeURIComponent(task.id)}`;
    if (task.kind === 'REVIEW_WORDS') return `/review?taskId=${encodeURIComponent(task.id)}`;
    if (task.kind === 'GRAMMAR' && task.lessonId) {
      return `/grammar/${encodeURIComponent(task.lessonId)}?taskId=${encodeURIComponent(task.id)}`;
    }
    return null;
  };

  const startHref = getStartHref();

  return (
    <article
      data-testid={`study-task-card-${task.id}`}
      className="min-w-0 space-y-3 rounded-xl border border-border bg-surface p-3 text-foreground shadow-sm transition-colors sm:p-4"
    >
      <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <h3 className="text-base font-semibold tracking-tight text-foreground">{kindLabel}</h3>
          {task.isLate && (
            <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
              {t('completedLate')}
            </span>
          )}
          {task.cancelledAt && (
            <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-muted line-through">
              {t('statuses.CANCELLED')}
            </span>
          )}
          {task.isComplete && !task.cancelledAt && (
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {t('statuses.COMPLETED')}
            </span>
          )}
          {task.isUnavailable && (
            <span className="rounded-full bg-danger/10 px-2 py-0.5 text-xs font-semibold text-danger">
              {t('forms.unavailable')}
            </span>
          )}
        </div>
        <span className="text-xs font-medium text-muted sm:text-right">
          {t('progress', {
            formattedCompleted: formatNumber(task.completedCount),
            formattedTarget: formatNumber(task.targetCount),
          })}{' '}
          {unit}
        </span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary" aria-hidden="true">
        <div
          className={`h-full transition-all duration-300 ${
            task.isComplete ? 'bg-emerald-500' : task.isLate ? 'bg-amber-500' : 'bg-primary'
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {task.isUnavailable && (
        <div role="alert" className="flex min-w-0 items-start gap-2 break-words text-xs font-medium text-danger">
          <AlertCircle size={14} aria-hidden="true" />
          <span>{task.unavailableReason ?? t('forms.selectedContentUnavailable')}</span>
        </div>
      )}

      {isGrammar && !task.lessonId && !task.cancelledAt && (
        <p className="text-xs text-muted">{t('forms.selectedContentUnavailable')}</p>
      )}

      {hasOtherActiveSession && !task.isComplete && !task.cancelledAt && (
        <p className="text-xs text-amber-600 dark:text-amber-400">{t('forms.activeSession')}</p>
      )}

      <div className="flex flex-wrap items-center gap-2 pt-1">
        {!task.cancelledAt && !task.transferredAt && !task.isComplete && (
          <>
            {task.isUnavailable ? (
              <Button type="button" variant="secondary" disabled aria-disabled="true" className="opacity-50" icon={Play}>
                {t('actions.start')}
              </Button>
            ) : isGrammar && !task.lessonId ? (
              onEdit ? (
                <Button type="button" variant="secondary" onClick={() => onEdit(task)} icon={Pencil} iconOnly>
                  {t('actions.edit')}
                </Button>
              ) : (
                <Button type="button" variant="secondary" disabled aria-disabled="true" className="opacity-50" icon={Play}>
                  {t('actions.start')}
                </Button>
              )
            ) : isTaskActiveSession ? (
              <Link
                to={startHref ?? '/learn'}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <RotateCcw size={15} aria-hidden="true" />
                {t('actions.resume')}
              </Link>
            ) : startHref ? (
              <Link
                to={startHref}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <Play size={15} aria-hidden="true" />
                {t('actions.start')}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            ) : null}
          </>
        )}

        {onEdit && !task.cancelledAt && (
          <Button type="button" variant="secondary" onClick={() => onEdit(task)} icon={Pencil} iconOnly>
            {t('actions.edit')}
          </Button>
        )}

        {onMove && !task.cancelledAt && !task.isComplete && (
          <Button type="button" variant="secondary" onClick={() => onMove(task)} icon={MoveRight} iconOnly>
            {t('actions.move')}
          </Button>
        )}

        {onCancel && !task.cancelledAt && !task.isComplete && (
          <Button type="button" variant="danger" onClick={() => onCancel(task)} icon={Ban} iconOnly>
            {t('actions.cancel')}
          </Button>
        )}
      </div>
    </article>
  );
}
