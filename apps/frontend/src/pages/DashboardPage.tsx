/**
 * @file DashboardPage.tsx
 * @description Localized server-backed overview with truthful learning states.
 */
import { ArrowRight, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { getLocalizedErrorMessage } from '../i18n/presentation';
import { formatNumber, formatPercent } from '../i18n/formatters';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { EmptyState } from '../components/ui/EmptyState';
import { useDashboardStatistics } from '../hooks/useAnalytics';

const learningPath = ['context', 'understand', 'recall', 'output', 'review'] as const;
const vocabularyStates = ['NEW', 'LEARNING', 'FAMILIAR', 'MASTERED', 'MAINTENANCE'] as const;

export function DashboardPage() {
  const { t } = useTranslation('dashboard');
  const dashboard = useDashboardStatistics();
  const data = dashboard.data;
  const totalWords = data ? Object.values(data.stateBreakdown).reduce((sum, count) => sum + count, 0) : 0;
  const hasData = totalWords > 0 || Boolean(data?.todayReviews || data?.todayLearned || data?.dueCount);

  return <div className="space-y-10">
    <PageHeader title={t('title')} subtitle={t('subtitle')} />
    {dashboard.isLoading && <DashboardSkeleton />}
    {dashboard.isError && <ErrorState error={dashboard.error} onRetry={() => void dashboard.refetch()} />}
    {data && !hasData && <Card><EmptyState title={t('noLearningData')} description={t('noLearningDataDescription')} action={<Link to="/words" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-surface">{t('addFirstWord')}<ArrowRight aria-hidden="true" size={17} /></Link>} /></Card>}
    {data && hasData && <DashboardData data={data} totalWords={totalWords} />}
    <section aria-labelledby="learning-path-title" className="space-y-4">
      <div><h2 id="learning-path-title" className="text-xl font-semibold tracking-tight text-foreground">{t('learningPath')}</h2><p className="mt-1 text-sm text-muted">{t('learningPathDescription')}</p></div>
      <ol className="grid gap-3 sm:grid-cols-5">{learningPath.map((step, index) => <li key={step} className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 sm:block"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-primary sm:mb-3">{index + 1}</span><span className="text-sm font-semibold text-foreground">{t(`steps.${step}`)}</span></li>)}</ol>
    </section>
  </div>;
}

function DashboardData({ data, totalWords }: { data: NonNullable<ReturnType<typeof useDashboardStatistics>['data']>; totalWords: number }) {
  const { t } = useTranslation('dashboard');
  const nextAction = data.dueCount > 0
    ? { label: t('startReview', { count: data.dueCount }), href: '/review', icon: <RotateCcw aria-hidden="true" size={17} /> }
    : { label: t('learnNewWords'), href: '/learn', icon: <ArrowRight aria-hidden="true" size={17} /> };

  return <>
    <section aria-labelledby="today-title" className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><h2 id="today-title" className="text-xl font-semibold tracking-tight text-foreground">{t('today')}</h2><p className="mt-1 text-sm text-muted">{t('todayDescription')}</p></div><Link to={nextAction.href} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">{nextAction.icon}{nextAction.label}</Link></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label={t('reviewsToday')} value={formatNumber(data.todayReviews)} />
        <MetricCard label={t('wordsPracticedToday')} value={formatNumber(data.todayLearned)} />
        <MetricCard label={t('overallAccuracy')} value={data.overallAccuracy === null ? t('accuracyUnavailable') : formatPercent(data.overallAccuracy)} />
        <MetricCard label={t('currentStreak')} value={t('day', { count: data.currentStreak })} />
      </div>
    </section>
    <section aria-labelledby="workspace-title" className="space-y-4">
      <div><h2 id="workspace-title" className="text-xl font-semibold tracking-tight text-foreground">{t('workspace')}</h2><p className="mt-1 text-sm text-muted">{t('workspaceDescription', { count: totalWords })}</p></div>
      <Card className="grid gap-3 p-5 sm:grid-cols-5">{vocabularyStates.map((state) => <div key={state}><p className="text-sm text-muted">{t(`states.${state}`)}</p><p className="mt-1 text-2xl font-bold text-foreground">{formatNumber(data.stateBreakdown[state])}</p></div>)}</Card>
    </section>
  </>;
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return <Card className="p-5"><p className="text-sm font-medium text-muted">{label}</p><p className="mt-3 text-2xl font-bold text-foreground">{value}</p></Card>;
}

function DashboardSkeleton() {
  const { t } = useTranslation('dashboard');
  return <div role="status" aria-label={t('loading')} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{Array.from({ length: 4 }, (_, index) => <Card key={index} className="h-28 animate-pulse bg-secondary" />)}</div>;
}

function ErrorState({ error, onRetry }: { error: unknown; onRetry: () => void }) {
  const { t } = useTranslation('dashboard');
  const { t: tCommon } = useTranslation('common');
  const message = getLocalizedErrorMessage(error, tCommon);
  return <div role="alert" className="space-y-4 rounded-2xl border border-border bg-secondary p-6 text-foreground"><p>{message}</p><Button type="button" variant="secondary" aria-label={t('retry')} onClick={onRetry}>{t('retry')}</Button></div>;
}
