/**
 * @file AnalyticsPage.tsx
 * @description Localized analytics page with independent server-query states.
 */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import type { ProgressOverview } from '../api/analytics.api';
import { getLocalizedErrorMessage, getLocalizedInsight } from '../i18n/presentation';
import { formatNumber, formatPercent } from '../i18n/formatters';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/Select';
import { TrendChart, StateChart } from '../components/analytics/AnalyticsCharts';
import { useDashboardStatistics, useInsights, useProgressOverview, useReviewTrends } from '../hooks/useAnalytics';
import { i18n } from '../i18n/config';
import { ArrowRight, RotateCw } from 'lucide-react';

type QueryKey = 'vocabularyStatistics' | 'dashboardStatistics' | 'retentionTrend' | 'learningInsights';

export function AnalyticsPage() {
  const { t } = useTranslation('analytics');
  const [days, setDays] = useState(30);
  const progress = useProgressOverview();
  const dashboard = useDashboardStatistics();
  const trends = useReviewTrends(days);
  const insights = useInsights();

  return <div className="min-w-0 space-y-8">
    <PageHeader title={t('title')} subtitle={t('subtitle')} action={<div className="flex min-w-0 flex-col gap-2 text-sm font-semibold text-foreground sm:flex-row sm:items-center"><label htmlFor="trend-range">{t('trendRange')}</label><Select value={String(days)} onValueChange={(value) => setDays(Number(value))}><SelectTrigger id="trend-range" aria-label={t('trendRange')} className="min-h-11 w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground sm:w-auto"><SelectValue /></SelectTrigger><SelectContent>{[7, 14, 30, 90].map((value) => <SelectItem key={value} value={String(value)}>{t('days', { count: value })}</SelectItem>)}</SelectContent></Select></div>} />
    <section aria-labelledby="kpi-title" className="min-w-0 space-y-4"><h2 id="kpi-title" className="text-xl font-semibold text-foreground">{t('keyMeasures')}</h2><div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-4"><KpiCard label={t('vocabulary')} value={progress.data ? formatNumber(progress.data.totalWords) : undefined} loading={progress.isLoading} error={progress.isError} loadingLabel={t('loading', { label: t('vocabulary') })} unavailableLabel={t('unavailable')} /><KpiCard label={t('reviewsToday')} value={dashboard.data ? formatNumber(dashboard.data.todayReviews) : undefined} loading={dashboard.isLoading} error={dashboard.isError} loadingLabel={t('loading', { label: t('reviewsToday') })} unavailableLabel={t('unavailable')} /><KpiCard label={t('accuracy')} value={dashboard.data ? dashboard.data.overallAccuracy === null ? t('accuracyUnavailable') : formatPercent(dashboard.data.overallAccuracy) : undefined} loading={dashboard.isLoading} error={dashboard.isError} loadingLabel={t('loading', { label: t('accuracy') })} unavailableLabel={t('unavailable')} /><KpiCard label={t('currentStreak')} value={dashboard.data ? t('days', { count: dashboard.data.currentStreak }) : undefined} loading={dashboard.isLoading} error={dashboard.isError} loadingLabel={t('loading', { label: t('currentStreak') })} unavailableLabel={t('unavailable')} /></div></section>
    {progress.data && <DimensionSummary progress={progress.data} />}
    {progress.data ? <StateChart progress={progress.data} /> : progress.isLoading ? <LoadingCard label={t('states')} /> : null}
    {trends.data ? <TrendChart trends={trends.data.trends} /> : trends.isLoading ? <LoadingCard label={t('retentionTrend')} /> : trends.isError ? <QueryError queryKey="retentionTrend" error={trends.error} onRetry={() => void trends.refetch()} /> : null}
    <InsightsSection query={insights} />
  </div>;
}

function normalizeInsightLink(link: string) {
  return link.replace(/^\/vocabulary(?=$|[?#])/, '/words');
}

function DimensionSummary({ progress }: { progress: ProgressOverview }) {
  const { t } = useTranslation('analytics');
  const dimensions = [['recognition', progress.averageDimensions.recognition], ['recall', progress.averageDimensions.recall], ['production', progress.averageDimensions.production]] as const;
  return <section aria-labelledby="dimensions-title" className="min-w-0 space-y-4"><div><h2 id="dimensions-title" className="text-xl font-semibold text-foreground">{t('dimensions')}</h2><p className="mt-1 text-sm text-muted">{t('dimensionsDescription')}</p></div><div className="grid min-w-0 gap-4 sm:grid-cols-3">{dimensions.map(([key, value]) => <Card key={key} className="min-w-0 p-4 sm:p-5"><p className="text-sm font-medium text-muted">{t(key)}</p><p className="mt-3 text-2xl font-bold text-foreground">{value === null ? t('noData') : formatPercent(value)}</p></Card>)}</div></section>;
}

function KpiCard({ label, value, loading, error, loadingLabel, unavailableLabel }: { label: string; value?: string; loading: boolean; error: boolean; loadingLabel: string; unavailableLabel: string }) {
  return <Card className="min-w-0 p-4 sm:p-5"><p className="break-words text-sm font-medium text-muted">{label}</p>{loading ? <div role="status" aria-label={loadingLabel} className="mt-3 h-8 w-20 animate-pulse rounded bg-secondary" /> : error ? <p className="mt-3 text-sm text-muted">{unavailableLabel}</p> : <p className="mt-3 break-words text-2xl font-bold text-foreground">{value}</p>}</Card>;
}

function LoadingCard({ label }: { label: string }) {
  const { t } = useTranslation('analytics');
  return <Card role="status" aria-label={t('loading', { label })} className="h-64 animate-pulse bg-secondary" />;
}

function QueryError({ queryKey, error, onRetry }: { queryKey: QueryKey; error: unknown; onRetry: () => void }) {
  const { t } = useTranslation('analytics');
  const { t: tCommon } = useTranslation('common');
  const query = t(`query.${queryKey}`);
  const message = getLocalizedErrorMessage(error, tCommon);
  return <div role="alert" className="flex flex-col gap-3 rounded-xl border border-border bg-secondary p-4 text-sm text-foreground sm:flex-row sm:items-center sm:justify-between"><span>{message}</span><Button type="button" variant="secondary" onClick={onRetry} icon={RotateCw} iconOnly>{t('retry', { query })}</Button></div>;
}

function InsightsSection({ query }: { query: ReturnType<typeof useInsights> }) {
  const { t } = useTranslation('analytics');
  return <section aria-labelledby="insights-title" className="space-y-4"><div><h2 id="insights-title" className="text-xl font-semibold text-foreground">{t('insights')}</h2><p className="mt-1 text-sm text-muted">{t('insightsDescription')}</p></div>{query.isLoading && <LoadingCard label={t('insights')} />}{query.isError && <QueryError queryKey="learningInsights" error={query.error} onRetry={() => void query.refetch()} />}{query.data && <div className="grid gap-4 md:grid-cols-2">{query.data.insights.length === 0 ? <Card className="p-5 text-sm text-muted">{t('noInsight')}</Card> : query.data.insights.map((insight) => { const localized = getLocalizedInsight(insight, i18n.t.bind(i18n)); return <Card key={insight.id} className="p-5"><p className="text-xs font-semibold uppercase tracking-wide text-primary">{t(`insightTypes.${insight.type}`)}</p><h3 className="mt-2 font-semibold text-foreground">{localized.title}</h3><p className="mt-2 text-sm leading-6 text-muted">{localized.message}</p>{localized.action && <Link className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" to={normalizeInsightLink(localized.action.link)}><ArrowRight size={16} aria-hidden="true" className="shrink-0" />{localized.action.label}</Link>}</Card>; })}</div>}</section>;
}
