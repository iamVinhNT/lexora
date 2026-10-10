/**
 * @file StudyMoveDialog.tsx
 * @description Native-date flow for moving remaining task work with idempotent retry.
 */
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ApiError } from '../../api/client';
import type { StudyTaskView } from '../../api/study.api';
import { formatNumber } from '../../i18n/formatters';
import { getLocalizedErrorMessage } from '../../i18n/presentation';
import { isCivilDate } from '../../utils/calendar-date';
import { useStudyCalendar, useStudyTaskMutations } from '../../hooks/useStudyCalendar';
import { Button } from '../ui/Button';
import { Dialog } from '../ui/Dialog';
import { Check, Play, X } from 'lucide-react';

type Props = { task: StudyTaskView; onClose: () => void };
const controlClass = 'mt-2 min-h-11 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary';

function localToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function makeId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function StudyMoveDialog({ task, onClose }: Props) {
  const { t } = useTranslation('calendar');
  const { t: tCommon } = useTranslation('common');
  const today = useMemo(localToday, []);
  const [destinationDate, setDestinationDate] = useState(task.scheduledDate < today ? today : task.scheduledDate);
  const [destinationId] = useState(makeId);
  const [error, setError] = useState<unknown>(null);
  const [success, setSuccess] = useState(false);
  const mutation = useStudyTaskMutations().patchTask;
  const destinationCalendarDate = isCivilDate(destinationDate) ? destinationDate : today;
  const destinationCalendar = useStudyCalendar(destinationCalendarDate, destinationCalendarDate);
  const remaining = Math.max(0, task.targetCount - task.completedCount);
  const destinationTask = destinationCalendar.data?.days[0]?.tasks.find((candidate) => candidate.kind === task.kind && !candidate.cancelledAt);
  const destinationVersion = destinationTask?.version ?? null;
  const unit = task.kind === 'GRAMMAR' ? (remaining === 1 ? t('progressUnit.lesson_one') : t('progressUnit.lesson_other')) : (remaining === 1 ? t('progressUnit.word_one') : t('progressUnit.word_other'));
  const activeSession = Boolean(task.activeSessionId);
  const validDestinationDate = isCivilDate(destinationDate) && destinationDate >= today;
  const move = async (event: React.FormEvent) => {
    event.preventDefault();
    if (activeSession || mutation.isPending || remaining <= 0 || !validDestinationDate) return;
    setError(null);
    setSuccess(false);
    try {
      await mutation.mutateAsync({ id: task.id, patch: { action: 'MOVE', version: task.version, scheduledDate: destinationDate, destinationId, destinationVersion } });
      setSuccess(true);
    } catch (nextError) {
      setError(nextError);
    }
  };

  const errorMessage = error instanceof ApiError && error.code in { CONFLICT: true, ACTIVE_SESSION: true, UNAVAILABLE: true, NOT_FOUND: true, INVALID_INPUT: true }
    ? t(`errors.${error.code}`, { defaultValue: getLocalizedErrorMessage(error, tCommon) })
    : error ? getLocalizedErrorMessage(error, tCommon) : '';

  return (
    <Dialog title={t('forms.moveTitle')} onClose={onClose}>
      <form className="min-w-0 space-y-5" onSubmit={move} noValidate>
        <p className="text-sm text-foreground">{t('forms.moveProgress', { completed: formatNumber(task.completedCount), target: formatNumber(task.targetCount), remaining: formatNumber(remaining), unit })}</p>
        <p className="text-sm text-muted">{t('forms.moveDueUnaffected')}</p>
        {activeSession && <div role="alert" className="space-y-2 rounded-lg border border-border bg-secondary p-3 text-sm text-muted"><p>{t('forms.activeSession')}</p><Link className="inline-flex items-center gap-1.5 font-semibold text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" to={task.kind === 'LEARN_WORDS' ? `/learn?taskId=${encodeURIComponent(task.id)}` : task.kind === 'REVIEW_WORDS' ? `/review?taskId=${encodeURIComponent(task.id)}` : task.lessonId ? `/grammar/${encodeURIComponent(task.lessonId)}?taskId=${encodeURIComponent(task.id)}` : '/calendar'}><Play size={14} aria-hidden="true" className="shrink-0" />{t('actions.resume')}</Link></div>}
        {Boolean(error) && <div role="alert" className="space-y-2 rounded-lg border border-danger/30 bg-danger/10 p-3 text-sm text-danger"><p>{String(errorMessage)}</p><p>{t('forms.notSaved')}</p></div>}
        {success && <p role="status" className="rounded-lg border border-primary/30 bg-primary-subtle p-3 text-sm text-foreground">{t('forms.moveSuccess')}</p>}
        <label className="block text-sm font-medium text-foreground">{t('forms.moveDate')}
          <input className={controlClass} type="date" min={today} value={destinationDate} onChange={(event) => { setDestinationDate(event.target.value); setError(null); setSuccess(false); }} required />
        </label>
        {destinationCalendar.isFetching && <p role="status" className="text-sm text-muted">{tCommon('status.loading')}</p>}
        <div className="flex flex-col-reverse gap-3 border-t border-border pt-4 sm:flex-row sm:justify-end">
          <Button type="button" variant="secondary" onClick={onClose} disabled={mutation.isPending} icon={X} iconOnly>{tCommon('actions.cancel')}</Button>
          <Button type="submit" disabled={mutation.isPending || destinationCalendar.isFetching || activeSession || remaining <= 0 || !validDestinationDate} icon={Check}>{mutation.isPending ? t('actions.saving') : t('actions.confirm')}</Button>
        </div>
      </form>
    </Dialog>
  );
}
