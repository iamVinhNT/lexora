/**
 * @file AnalyticsCharts.tsx
 * @description Localized Recharts visualizations with readable summaries and tables.
 */
import { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts';

import type { DailyTrend, ProgressOverview, VocabularyState } from '../../api/analytics.api';
import { formatDate, formatNumber, formatPercent } from '../../i18n/formatters';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

const vocabularyStates: readonly VocabularyState[] = ['NEW', 'LEARNING', 'FAMILIAR', 'MASTERED', 'MAINTENANCE'];
const stateColors: Record<VocabularyState, string> = { NEW: 'var(--color-primary)', LEARNING: 'var(--color-accent)', FAMILIAR: 'var(--color-foreground)', MASTERED: 'var(--color-danger)', MAINTENANCE: 'var(--color-muted)' };
const stateTranslationKeys: Record<VocabularyState, 'new' | 'learning' | 'familiar' | 'mastered' | 'maintenance'> = { NEW: 'new', LEARNING: 'learning', FAMILIAR: 'familiar', MASTERED: 'mastered', MAINTENANCE: 'maintenance' };

const supportsResponsiveChart = () => typeof ResizeObserver !== 'undefined';

export function TrendChart({ trends }: { trends: DailyTrend[] }) {
  const { t } = useTranslation('analytics');
  const [showTable, setShowTable] = useState(false);
  const activeTrends = trends.filter((item) => item.reviewsCount > 0);
  const chartData = trends.map((item) => ({ ...item, shortDate: item.date.slice(5) }));
  const hasMeaningfulTrend = activeTrends.length >= 4;
  const latest = activeTrends.at(-1);
  const maxReviews = Math.max(0, ...trends.map((item) => item.reviewsCount));
  const latestAccuracy = latest?.accuracy === null || latest?.accuracy === undefined ? t('noData') : formatPercent(latest.accuracy);

  return <Card className="min-w-0 p-4 sm:p-5" aria-labelledby="retention-title">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><h2 id="retention-title" className="text-xl font-semibold text-foreground">{t('retentionTrend')}</h2><p className="mt-1 text-sm text-muted">{t('retentionDescription')}</p></div><Button type="button" variant="secondary" aria-expanded={showTable} aria-controls="retention-table" onClick={() => setShowTable((value) => !value)}>{showTable ? t('hideRetentionTable') : t('showRetentionTable')}</Button></div>
    <p className="mt-4 text-sm text-foreground" aria-label={t('retentionTrend')}>{hasMeaningfulTrend ? t('retentionSummary', { count: activeTrends.length, accuracy: latestAccuracy, reviews: formatNumber(latest?.reviewsCount ?? 0), max: formatNumber(maxReviews) }) : t('retentionMinimum')}</p>
    {hasMeaningfulTrend && !showTable && supportsResponsiveChart() && <div role="img" className="mt-4 h-72 w-full min-w-0" aria-label={t('retentionTrend')}><ResponsiveContainer width="100%" height="100%"><LineChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 8 }}><XAxis dataKey="shortDate" tick={{ fontSize: 12 }} /><YAxis yAxisId="accuracy" domain={[0, 100]} tickFormatter={(value) => formatPercent(Number(value))} tick={{ fontSize: 12 }} /><YAxis yAxisId="reviews" orientation="right" domain={['auto', 'auto']} tickFormatter={(value) => formatNumber(Number(value))} tick={{ fontSize: 12 }} /><Tooltip /><Line yAxisId="accuracy" type="monotone" dataKey="accuracy" stroke="var(--color-primary)" strokeWidth={3} dot={{ r: 3 }} name={t('accuracy')} /><Line yAxisId="reviews" type="monotone" dataKey="reviewsCount" stroke="var(--color-accent)" strokeWidth={2} dot={false} name={t('reviews')} /></LineChart></ResponsiveContainer></div>}
    {hasMeaningfulTrend && !showTable && !supportsResponsiveChart() && <p className="mt-4 text-sm text-muted">{t('chartUnavailable')}</p>}
    {showTable && <TrendTable trends={trends} />}
  </Card>;
}

function TrendTable({ trends }: { trends: DailyTrend[] }) {
  const { t } = useTranslation('analytics');
  return <div id="retention-table" className="mt-4 overflow-x-auto"><table className="w-full min-w-[32rem] text-left text-sm" aria-label={t('retentionTable')}><caption className="sr-only">{t('dailyRetention')}</caption><thead className="border-b border-border text-muted"><tr><th scope="col" className="px-3 py-2">{t('date')}</th><th scope="col" className="px-3 py-2">{t('reviews')}</th><th scope="col" className="px-3 py-2">{t('correct')}</th><th scope="col" className="px-3 py-2">{t('accuracy')}</th><th scope="col" className="px-3 py-2">{t('averageResponse')}</th></tr></thead><tbody>{trends.map((item) => <tr key={item.date} className="border-b border-border"><th scope="row" className="px-3 py-2 font-medium text-foreground"><time dateTime={item.date}>{formatDate(item.date, { year: 'numeric', month: 'short', day: 'numeric' })}</time><span className="sr-only"> {item.date}</span></th><td className="px-3 py-2">{formatNumber(item.reviewsCount)}</td><td className="px-3 py-2">{formatNumber(item.correctCount)}</td><td className="px-3 py-2">{item.accuracy === null ? item.reviewsCount === 0 ? t('noReviews') : t('accuracyUnavailable') : formatPercent(item.accuracy)}</td><td className="px-3 py-2">{item.averageResponseTime === null ? t('noTimingData') : `${formatNumber(item.averageResponseTime)} ${t('milliseconds')}`}</td></tr>)}</tbody></table></div>;
}

export function StateChart({ progress }: { progress: ProgressOverview }) {
  const { t } = useTranslation('analytics');
  const [showTable, setShowTable] = useState(false);
  const states = vocabularyStates.map((state) => ({ name: t(stateTranslationKeys[state]), state, value: progress.countsPerState[state] }));
  const total = states.reduce((sum, item) => sum + item.value, 0);

  return <Card className="min-w-0 p-4 sm:p-5" aria-labelledby="states-title">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><h2 id="states-title" className="text-xl font-semibold text-foreground">{t('states')}</h2><p className="mt-1 text-sm text-muted">{t('statesDescription')}</p></div><Button type="button" variant="secondary" aria-expanded={showTable} aria-controls="states-table" onClick={() => setShowTable((value) => !value)}>{showTable ? t('hideStateTable') : t('showStateTable')}</Button></div>
     {!showTable && total > 0 && supportsResponsiveChart() && <div className="mt-4 grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"><div role="img" className="h-56 min-w-0 sm:h-64" aria-label={t('stateDistribution')}><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={states} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={54} outerRadius={88} paddingAngle={2}>{states.map((item) => <Cell key={item.state} fill={stateColors[item.state]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div><StateList states={states} total={total} /></div>}
    {!showTable && total > 0 && !supportsResponsiveChart() && <StateList states={states} total={total} />}
    {showTable && <div id="states-table" className="mt-4 overflow-x-auto"><table className="w-full text-left text-sm" aria-label={t('stateTable')}><caption className="sr-only">{t('stateDistribution')}</caption><thead className="border-b border-border text-muted"><tr><th scope="col" className="px-3 py-2">{t('stateTable')}</th><th scope="col" className="px-3 py-2">{t('count')}</th><th scope="col" className="px-3 py-2">{t('percentage')}</th></tr></thead><tbody>{states.map((item) => <tr key={item.state} className="border-b border-border"><th scope="row" className="px-3 py-2 font-medium text-foreground">{item.name}</th><td className="px-3 py-2">{formatNumber(item.value)}</td><td className="px-3 py-2">{formatPercent(total ? (item.value / total) * 100 : 0)}</td></tr>)}</tbody></table></div>}
    {total === 0 && <div className="mt-4 flex items-center gap-2 text-sm text-muted"><BarChart3 aria-hidden="true" size={17} />{t('noStates')}</div>}
  </Card>;
}

function StateList({ states, total }: { states: Array<{ name: string; state: VocabularyState; value: number }>; total: number }) {
  const { t } = useTranslation('analytics');
  return <ul className="min-w-0 space-y-3" aria-label={t('stateLabels')}>{states.map((item) => <li key={item.state} className="flex min-w-0 items-start justify-between gap-3 text-sm"><span className="flex min-w-0 items-start gap-2 break-words text-foreground"><span aria-hidden="true" className="mt-1 h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: stateColors[item.state] }} /><span className="break-words">{item.name}</span></span><span className="shrink-0 text-right font-semibold text-foreground">{t('words', { count: item.value })} ({formatPercent(total ? (item.value / total) * 100 : 0)})</span></li>)}</ul>;
}
