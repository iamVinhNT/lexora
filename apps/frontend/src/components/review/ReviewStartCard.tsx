/**
 * @file ReviewStartCard.tsx
 * @description Idle review start card showing current due backlog and explicit action to begin.
 */
import { useTranslation } from 'react-i18next';
import { Play } from 'lucide-react';

import type { StudyTaskView } from '../../api/study.api';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { ReviewQueueStatus } from './ReviewQueueStatus';

interface ReviewStartCardProps {
  reviewedCount: number;
  dueCount: number;
  studyTask?: StudyTaskView | null;
  isPending: boolean;
  onStart: () => void;
}

export function ReviewStartCard({
  reviewedCount,
  dueCount,
  studyTask,
  isPending,
  onStart,
}: ReviewStartCardProps) {
  const { t } = useTranslation('review');

  return (
    <Card className="mx-auto w-full max-w-3xl space-y-6 p-4 sm:p-6 md:p-8">
      <ReviewQueueStatus
        reviewedCount={reviewedCount}
        dueCount={dueCount}
        studyTask={studyTask}
      />

      <div className="text-center py-6 sm:py-8 space-y-3">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground">
          {reviewedCount > 0 ? t('nextWord') : t('startReview')}
        </h3>
        <p className="text-sm text-muted max-w-md mx-auto">
          {t('startReviewDesc')}
        </p>

        <div className="pt-4">
          <Button
            type="button"
            disabled={isPending}
            onClick={onStart}
            className="min-h-12 px-8 font-semibold text-base"
            icon={Play}
          >
            <span>{reviewedCount > 0 ? t('nextWord') : t('startReview')}</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
