/**
 * @file GrammarPracticeProgress.tsx
 * @description Per-lesson recognition, recall, output, review, and stability metrics.
 */
import type { TFunction } from 'i18next';
import { formatNumber } from '../../i18n/formatters';
import { useTranslation } from 'react-i18next';

import type { GrammarPracticeProgressLesson } from '../../api/grammar-practice.api';
import { useGrammarPracticeProgress } from '../../hooks/useGrammarPractice';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export function GrammarPracticeProgress({ lessonId, revisionId }: { lessonId: string; revisionId: string }) {
  const { t } = useTranslation('grammar');
  const progress = useGrammarPracticeProgress();
  if (progress.isPending) {
    return <p role="status" aria-busy="true" className="text-sm text-muted">{t('loadingPracticeProgress')}</p>;
  }
  if (progress.isError) {
    return (
      <Card className="space-y-3 p-4">
        <p role="alert" className="text-sm text-foreground">{t('practiceProgressError')}</p>
        <Button type="button" variant="secondary" onClick={() => void progress.refetch()}>{t('retry')}</Button>
      </Card>
    );
  }
  if (!progress.data?.lessons) {
    return (
      <Card className="space-y-3 p-4 sm:p-5">
        <p role="alert" className="text-sm text-foreground">{t('practiceProgressError')}</p>
        <Button type="button" variant="secondary" onClick={() => void progress.refetch()}>{t('retry')}</Button>
      </Card>
    );
  }
  const stats = progress.data.lessons.find((item) => item.lessonId === lessonId && item.revisionId === revisionId);
  if (!stats) {
    return (
      <Card className="space-y-3 p-4 sm:p-5">
        <h2 className="text-base font-semibold text-foreground">{t('practiceProgressTitle')}</h2>
        <p className="text-sm text-muted">{t('noPracticeProgressYet')}</p>
      </Card>
    );
  }

  return (
    <Card className="space-y-3 p-4 sm:p-5">
      <h2 className="text-base font-semibold text-foreground">{t('practiceProgressTitle')}</h2>
      <dl className="grid gap-3 sm:grid-cols-2">
        <Metric label={t('recognitionMetric')} value={formatAccuracy(stats.recognition, t)} />
        <Metric label={t('recallMetric')} value={formatAccuracy(stats.recall, t)} />
        <Metric label={t('outputCountMetric')} value={t('selfRatedCount', { count: stats.outputCount })} />
        <Metric label={t('reviewCountMetric')} value={t('countValue', { count: stats.reviewCount })} />
        <Metric label={t('stableMetric')} value={stats.isStable ? t('stableYes') : t('stableNo')} />
      </dl>
      <p className="text-xs leading-5 text-muted">{t('practiceMetricsNotice')}</p>
    </Card>
  );
}

function formatAccuracy(stat: GrammarPracticeProgressLesson['recognition'], t: TFunction<'grammar'>) {
  return stat.percent === null
    ? t('insufficientSamplesWithCount', { count: stat.total })
    : t('firstAttemptAccuracyValue', { percent: formatNumber(stat.percent), correct: stat.correct, total: stat.total });
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-lg border border-border bg-surface p-3">
      <dt className="text-xs font-medium text-muted">{label}</dt>
      <dd className="mt-1 break-words text-sm font-semibold text-foreground">{value}</dd>
    </div>
  );
}
