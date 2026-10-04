/**
 * @file TodayStudyPlanCard.tsx
 * @description Server-backed today plan summary independent from vocabulary dashboard data.
 */
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { formatNumber } from '../../i18n/formatters';
import { StudyTaskCard } from './StudyTaskCard';
import { useStudyCalendar, useStudyPreferences } from '../../hooks/useStudyCalendar';
import { civilDateAt, isTimeZone } from '../../utils/calendar-date';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

function browserTimeZone(): string {
  const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return detected && isTimeZone(detected) ? detected : 'UTC';
}

export function TodayStudyPlanCard({ enabled = true, suppressErrors = false }: { enabled?: boolean; suppressErrors?: boolean }) {
  const { t } = useTranslation('calendar');
  const preferences = useStudyPreferences({ enabled });
  if (!enabled || (suppressErrors && preferences.isError)) return null;
  if (preferences.isLoading) {
    return <section aria-labelledby="today-study-plan-title" className="space-y-4"><h2 id="today-study-plan-title" className="text-xl font-semibold tracking-tight text-foreground">{t('navigation.todayPlan')}</h2><Card role="status" aria-busy="true" className="p-5 text-sm text-muted">{t('loading', { defaultValue: 'Loading…' })}</Card></section>;
  }
  const timeZone = preferences.data?.timeZone && isTimeZone(preferences.data.timeZone) ? preferences.data.timeZone : browserTimeZone();
  return <TodayStudyPlanContent timeZone={timeZone} />;
}

function TodayStudyPlanContent({ timeZone }: { timeZone: string }) {
  const { t } = useTranslation('calendar');
  const today = civilDateAt(new Date(), timeZone);
  const calendar = useStudyCalendar(today, today);
  const day = calendar.data?.days?.find((candidate) => candidate.date === calendar.data?.today) ?? calendar.data?.days?.[0];
  const isStale = Boolean(day && calendar.isRefetching);

  return (
    <section aria-labelledby="today-study-plan-title" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="today-study-plan-title" className="text-xl font-semibold tracking-tight text-foreground">{t('navigation.todayPlan')}</h2>
          <p className="mt-1 text-sm text-muted">{calendar.data?.timeZone ?? timeZone}</p>
        </div>
        <Link to="/calendar" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
          {t('navigation.openCalendar')}<ArrowRight aria-hidden="true" size={17} />
        </Link>
      </div>
      {calendar.isLoading && <Card role="status" aria-busy="true" className="p-5 text-sm text-muted">{t('loading', { defaultValue: 'Loading…' })}</Card>}
      {calendar.isError && !calendar.data && <Card role="alert" className="space-y-4 p-5"><p>{t('errors.load')}</p><Button type="button" variant="secondary" onClick={() => void calendar.refetch()}>{t('actions.retry')}</Button></Card>}
      {calendar.isError && calendar.data && <Card role="status" className="flex flex-wrap items-center justify-between gap-3 border-border p-5 text-sm text-muted"><span>{t('warnings.stale')}</span><Button type="button" variant="secondary" onClick={() => void calendar.refetch()}>{t('actions.reload')}</Button></Card>}
      {!calendar.isLoading && !calendar.isError && !day?.tasks.length && !(calendar.data?.backlogCount ?? 0) && <Card className="space-y-3 p-5"><p className="font-semibold text-foreground">{t('noPlan')}</p><p className="text-sm text-muted">{t('day.noPlan')}</p></Card>}
      {day && (day.tasks.length > 0 || (calendar.data?.backlogCount ?? 0) > 0) && (
        <Card className="space-y-4 p-4 sm:p-5">
          {isStale && <p role="status" className="text-sm text-muted">{t('warnings.stale')}</p>}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
            {day.dueNowCount !== null && <span>{t('day.upcomingDue')}: {formatNumber(day.dueNowCount)}</span>}
            {day.dueLaterTodayCount !== null && day.dueLaterTodayCount > 0 && <span>{t('day.dueLaterToday')}: {formatNumber(day.dueLaterTodayCount)}</span>}
          </div>
          <div className="grid min-w-0 gap-3 xl:grid-cols-2" aria-label={t('navigation.todayPlan')}>
            {day.tasks.map((task) => <StudyTaskCard key={task.id} task={task} />)}
          </div>
          {calendar.data && calendar.data.backlogCount > 0 && <p className="border-t border-border pt-3 text-sm text-muted">{t('backlog', { formattedCount: formatNumber(calendar.data.backlogCount), unit: t('progressUnit.word', { count: calendar.data.backlogCount }) })}</p>}
        </Card>
      )}
    </section>
  );
}
