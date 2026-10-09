/**
 * @file ReviewQueueStatus.tsx
 * @description Compact progress indicator and task status header for adaptive review.
 */
import { useTranslation } from 'react-i18next';
import type { StudyTaskView } from '../../api/study.api';
import { formatNumber } from '../../i18n/formatters';

interface ReviewQueueStatusProps {
  reviewedCount: number;
  dueCount: number;
  studyTask?: StudyTaskView | null;
}

export function ReviewQueueStatus({ reviewedCount, dueCount, studyTask }: ReviewQueueStatusProps) {
  const { t } = useTranslation('review');
  const { t: tCalendar } = useTranslation('calendar');
  const total = reviewedCount + dueCount;

  return (
    <div className="mx-auto w-full max-w-3xl space-y-2 rounded-xl border border-border bg-surface p-3.5 sm:p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
        <span className="font-medium text-foreground">
          {t('reviewedCount', { count: reviewedCount, due: dueCount })}
        </span>
        {studyTask ? (
          <span className="text-muted">
            {tCalendar('taskKinds.review')}:{' '}
            <strong className="text-foreground">
              {formatNumber(studyTask.completedCount)} / {formatNumber(studyTask.targetCount)}
            </strong>
          </span>
        ) : (
          <span className="text-muted">{t('recallMode')}</span>
        )}
      </div>

      <div className="w-full">
        <progress
          value={reviewedCount}
          max={Math.max(1, total)}
          className="h-2 w-full overflow-hidden rounded-full accent-primary"
          aria-label={t('reviewedCount', { count: reviewedCount, due: dueCount })}
        />
      </div>
    </div>
  );
}
