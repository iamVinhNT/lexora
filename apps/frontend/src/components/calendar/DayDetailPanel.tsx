/**
 * @file DayDetailPanel.tsx
 * @description Detail panel displaying tasks, due counts, and activities for a selected study day.
 */
import { Calendar as CalendarIcon, Clock, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { StudyCalendarDay, StudyTaskView } from '../../api/study.api';
import { formatDate, formatNumber } from '../../i18n/formatters';
import { Card } from '../ui/Card';
import { EmptyState } from '../ui/EmptyState';
import { StudyTaskCard } from './StudyTaskCard';

export type DayDetailPanelProps = {
  day: StudyCalendarDay | null | undefined;
  activeSession?: { id: string } | null;
  onEdit?: (task: StudyTaskView) => void;
  onMove?: (task: StudyTaskView) => void;
  onCancel?: (task: StudyTaskView) => void;
};

const statusClasses: Record<string, string> = {
  COMPLETED: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  IN_PROGRESS: 'bg-primary-subtle text-primary border-primary/20',
  PLANNED: 'bg-secondary text-foreground border-border',
  PARTIAL: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  MISSED: 'bg-danger/10 text-danger border-danger/20',
  CANCELLED: 'bg-secondary text-muted border-border line-through',
  NO_PLAN: 'bg-transparent text-muted border-dashed border-border',
};

export function DayDetailPanel({ day, activeSession, onEdit, onMove, onCancel }: DayDetailPanelProps) {
  const { t } = useTranslation('calendar');

  if (!day) {
    return (
      <Card className="min-w-0 p-4 sm:p-6">
        <EmptyState title={t('day.selected')} description={t('day.noPlan')} />
      </Card>
    );
  }

  const formattedDate = formatDate(`${day.date}T12:00:00.000Z`, {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    timeZone: 'UTC',
  });

  const statusLabel = t(`statuses.${day.status}`);
  const statusClass = statusClasses[day.status] ?? statusClasses.PLANNED;

  return (
    <Card className="min-w-0 space-y-5 p-4 sm:p-6" data-testid={`day-detail-panel-${day.date}`}>
      <header className="space-y-2 border-b border-border pb-4">
        <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="min-w-0 break-words text-xl font-bold tracking-tight text-foreground">{formattedDate}</h2>
          <div className="flex flex-wrap items-center gap-2">
            {!day.isStudyDay && (
              <span className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs font-semibold text-muted">
                {t('day.restDay')}
              </span>
            )}
            <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusClass}`}>
              {statusLabel}
            </span>
          </div>
        </div>
      </header>

      <section aria-labelledby="tasks-heading" className="space-y-3">
        <h3 id="tasks-heading" className="text-sm font-semibold uppercase tracking-wider text-muted">
          {t('forms.taskTitle')}
        </h3>

        {day.tasks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted">
            <p>{t('day.noPlan')}</p>
          </div>
        ) : (
          <div className="space-y-3" role="list" aria-label={t('forms.taskTitle')}>
            {day.tasks.map((task) => (
              <StudyTaskCard
                key={task.id}
                task={task}
                activeSession={activeSession}
                onEdit={onEdit}
                onMove={onMove}
                onCancel={onCancel}
              />
            ))}
          </div>
        )}
      </section>

      {(day.dueLaterTodayCount !== null || day.scheduledDueCount !== null) && (
        <section aria-labelledby="due-heading" className="min-w-0 space-y-2 rounded-xl border border-border bg-secondary/30 p-3 sm:p-4">
          <h3 id="due-heading" className="text-xs font-semibold uppercase tracking-wider text-muted">
            {t('day.upcomingDue')}
          </h3>
          {day.dueLaterTodayCount !== null && day.dueLaterTodayCount > 0 && (
            <div className="flex min-w-0 items-start gap-2 text-sm text-foreground">
              <Clock size={15} className="shrink-0 text-muted" aria-hidden="true" />
              <span className="min-w-0 break-words">
                {t('day.dueLaterToday')}: <strong>{formatNumber(day.dueLaterTodayCount)}</strong>{' '}
                {t('progressUnit.word_other')}
              </span>
            </div>
          )}
          {day.scheduledDueCount !== null && (
            <div className="space-y-1">
              <div className="flex min-w-0 items-start gap-2 text-sm text-foreground">
                <CalendarIcon size={15} className="shrink-0 text-muted" aria-hidden="true" />
                <span className="min-w-0 break-words">
                  {t('day.upcomingDue')}: <strong>{formatNumber(day.scheduledDueCount)}</strong>{' '}
                  {t('progressUnit.word_other')}
                </span>
              </div>
              <p className="text-xs text-muted">{t('futureDueNotice')}</p>
            </div>
          )}
        </section>
      )}

      {day.activities && day.activities.length > 0 && (
        <section aria-labelledby="activities-heading" className="space-y-3 border-t border-border pt-4">
          <h3 id="activities-heading" className="text-sm font-semibold uppercase tracking-wider text-muted">
            {t('day.activityOutsidePlan')}
          </h3>
          <ul className="space-y-2" role="list">
            {day.activities.map((activity, index) => {
              const kindName =
                activity.kind === 'LEARN_WORDS'
                  ? t('taskKinds.learn')
                  : activity.kind === 'REVIEW_WORDS'
                    ? t('taskKinds.review')
                    : t('taskKinds.grammar');

              return (
                <li
                  key={`${activity.referenceId}-${index}`}
                  className="flex min-w-0 flex-col justify-between gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground sm:flex-row sm:items-center"
                >
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <Sparkles size={14} className="shrink-0 text-primary" aria-hidden="true" />
                    <span className="font-medium">{kindName}</span>
                    {activity.wordCount !== null && (
                      <span className="text-xs text-muted">
                        ({formatNumber(activity.wordCount)} {t('progressUnit.word_other')})
                      </span>
                    )}
                    {activity.lessonId && (
                      <span className="text-xs text-muted">({activity.lessonId})</span>
                    )}
                    {activity.isOutsidePlan && (
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-muted">
                        {t('day.outsidePlan')}
                      </span>
                    )}
                    {activity.isLate && (
                      <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
                        {t('day.completedLate')}
                      </span>
                    )}
                  </div>
                  <time dateTime={activity.occurredAt} className="text-xs text-muted">
                    {formatDate(activity.occurredAt, { hour: '2-digit', minute: '2-digit' })}
                  </time>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </Card>
  );
}
