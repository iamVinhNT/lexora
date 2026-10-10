/**
 * @file CalendarPage.tsx
 * @description Study calendar page with week/month views, period navigation, and day details.
 */
import { useMemo, useState } from 'react';
import { CalendarCheck, CalendarDays, CalendarRange, ChevronLeft, ChevronRight, Plus, RotateCcw, RotateCw, Sparkles, Wand2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { StudyTaskView } from '../api/study.api';
import { useStudyCalendar, useStudyPreferences } from '../hooks/useStudyCalendar';
import { useLearningSessionOverview } from '../hooks/useLearningSession';
import { formatDate, formatNumber } from '../i18n/formatters';
import { addCivilDays, civilDateAt } from '../utils/calendar-date';
import { CalendarGrid } from '../components/calendar/CalendarGrid';
import { DayDetailPanel } from '../components/calendar/DayDetailPanel';
import { StudyPlanPreviewDialog } from '../components/calendar/StudyPlanPreviewDialog';
import { AiStudyPlanPreviewDialog } from '../components/calendar/AiStudyPlanPreviewDialog';
import { StudyMoveDialog } from '../components/calendar/StudyMoveDialog';
import { StudyTaskDialog } from '../components/calendar/StudyTaskDialog';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

type CalendarView = 'week' | 'month';

function computeCalendarRange(anchorDate: string, view: CalendarView): { from: string; to: string } {
  if (view === 'week') {
    const dayOfWeek = (new Date(`${anchorDate}T00:00:00.000Z`).getUTCDay() + 6) % 7;
    const from = addCivilDays(anchorDate, -dayOfWeek);
    const to = addCivilDays(from, 6);
    return { from, to };
  }

  const [yearStr, monthStr] = anchorDate.slice(0, 7).split('-');
  const year = Number(yearStr);
  const month = Number(monthStr);

  const firstDay = `${anchorDate.slice(0, 7)}-01`;
  const firstDayOfWeek = (new Date(`${firstDay}T00:00:00.000Z`).getUTCDay() + 6) % 7;
  const from = addCivilDays(firstDay, -firstDayOfWeek);

  const nextMonthFirst = month === 12 ? `${year + 1}-01-01` : `${year}-${String(month + 1).padStart(2, '0')}-01`;
  const lastDayOfMonth = addCivilDays(nextMonthFirst, -1);

  const day35 = addCivilDays(from, 34);
  const totalDays = day35 >= lastDayOfMonth ? 35 : 42;
  const to = addCivilDays(from, totalDays - 1);

  return { from, to };
}

export function CalendarPage() {
  const { t } = useTranslation('calendar');
  const { t: tCommon } = useTranslation('common');

  const [view, setView] = useState<CalendarView>('month');
  const [navigatedAnchor, setNavigatedAnchor] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<StudyTaskView | null>(null);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [movingTask, setMovingTask] = useState<StudyTaskView | null>(null);
  const [showPlanPreview, setShowPlanPreview] = useState(false);
  const [showAiPlanPreview, setShowAiPlanPreview] = useState(false);

  const preferencesQuery = useStudyPreferences();
  const timeZone = preferencesQuery.data?.timeZone;
  const initialCivilDate = useMemo(() => {
    return civilDateAt(new Date(), timeZone ?? 'UTC');
  }, [timeZone]);

  const anchorDate = navigatedAnchor ?? initialCivilDate;
  const { from, to } = useMemo(() => computeCalendarRange(anchorDate, view), [anchorDate, view]);

  const calendarQuery = useStudyCalendar(from, to);
  const calendar = calendarQuery.data;

  const sessionOverview = useLearningSessionOverview();
  const activeSession = sessionOverview.data?.activeSession;

  const effectiveSelectedDate = selectedDate ?? calendar?.today ?? anchorDate;

  const selectedDay = useMemo(() => {
    if (!calendar?.days || calendar.days.length === 0) return null;
    return calendar.days.find((d) => d.date === effectiveSelectedDate) ?? calendar.days[0];
  }, [calendar, effectiveSelectedDate]);

  const handleToday = () => {
    const today = calendar?.today ?? initialCivilDate;
    setNavigatedAnchor(today);
    setSelectedDate(today);
  };

  const handlePrevious = () => {
    if (view === 'week') {
      setNavigatedAnchor(addCivilDays(anchorDate, -7));
    } else {
      const [yStr, mStr] = anchorDate.slice(0, 7).split('-');
      const y = Number(yStr);
      const m = Number(mStr);
      const prevY = m === 1 ? y - 1 : y;
      const prevM = m === 1 ? 12 : m - 1;
      setNavigatedAnchor(`${prevY}-${String(prevM).padStart(2, '0')}-01`);
    }
  };

  const handleNext = () => {
    if (view === 'week') {
      setNavigatedAnchor(addCivilDays(anchorDate, 7));
    } else {
      const [yStr, mStr] = anchorDate.slice(0, 7).split('-');
      const y = Number(yStr);
      const m = Number(mStr);
      const nextY = m === 12 ? y + 1 : y;
      const nextM = m === 12 ? 1 : m + 1;
      setNavigatedAnchor(`${nextY}-${String(nextM).padStart(2, '0')}-01`);
    }
  };

  const handleToggleView = (newView: CalendarView) => {
    if (newView !== view) {
      setView(newView);
      setNavigatedAnchor(effectiveSelectedDate);
    }
  };
  const openCreateTask = () => {
    setEditingTask(null);
    setTaskDialogOpen(true);
  };

  const openEditTask = (task: StudyTaskView) => {
    setEditingTask(task);
    setTaskDialogOpen(true);
  };

  const closeTaskDialog = () => {
    setTaskDialogOpen(false);
    setEditingTask(null);
    void calendarQuery.refetch();
  };


  const periodLabel =
    view === 'month'
      ? formatDate(`${anchorDate.slice(0, 7)}-01T12:00:00.000Z`, { month: 'long', year: 'numeric', timeZone: 'UTC' })
      : `${formatDate(`${from}T12:00:00.000Z`, { day: '2-digit', month: '2-digit', timeZone: 'UTC' })} – ${formatDate(`${to}T12:00:00.000Z`, { day: '2-digit', month: '2-digit', timeZone: 'UTC' })}`;

  return (
    <div className="min-w-0 space-y-6">
      <PageHeader
        title={t('title')}
        subtitle={
          calendar
            ? `${t('backlog', { formattedCount: formatNumber(calendar.backlogCount), unit: t('progressUnit.word_other') })} ${t('futureDueNotice')}`
            : t('futureDueNotice')
        }
        action={
          <div className="grid w-full min-w-0 grid-cols-2 items-stretch gap-2 sm:flex sm:w-auto sm:items-center">
            <Button type="button" variant="secondary" onClick={() => setShowPlanPreview(true)} icon={Wand2}>
              {t('generate')}
            </Button>
            <Button type="button" variant="secondary" onClick={() => setShowAiPlanPreview(true)} icon={Sparkles}>
              {t('generateAi')}
            </Button>
            <Button type="button" onClick={openCreateTask} icon={Plus}>
              {t('actions.create')}
            </Button>
            <div className="inline-flex rounded-lg border border-border bg-secondary p-1" role="group">
              <button
                type="button"
                title={t('week')}
                onClick={() => handleToggleView('week')}
                aria-pressed={view === 'week'}
                className={`inline-flex min-h-11 min-w-11 items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  view === 'week'
                    ? 'bg-surface text-foreground shadow-sm'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                <CalendarRange size={16} aria-hidden="true" />
                <span>{t('week')}</span>
              </button>
              <button
                type="button"
                title={t('month')}
                onClick={() => handleToggleView('month')}
                aria-pressed={view === 'month'}
                className={`inline-flex min-h-11 min-w-11 items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  view === 'month'
                    ? 'bg-surface text-foreground shadow-sm'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                <CalendarDays size={16} aria-hidden="true" />
                <span>{t('month')}</span>
              </button>
            </div>
            <Button type="button" variant="secondary" onClick={handleToday} icon={CalendarCheck}>
              {t('today')}
            </Button>
          </div>
        }
      />

      {calendar && (
        <div className="flex min-w-0 flex-col gap-3 rounded-xl border border-border bg-surface px-3 py-3 text-sm text-foreground shadow-sm sm:px-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex min-w-0 items-center justify-between gap-3 sm:justify-start">
            <Button
              type="button"
              variant="secondary"
              aria-label={t('actions.previous')}
              onClick={handlePrevious}
              className="min-h-11 min-w-11 shrink-0 px-2.5 py-1"
              icon={ChevronLeft}
              iconOnly
            >
            </Button>
            <span className="min-w-0 break-words font-semibold">{periodLabel}</span>
            <Button
              type="button"
              variant="secondary"
              aria-label={t('actions.next')}
              onClick={handleNext}
              className="min-h-11 min-w-11 shrink-0 px-2.5 py-1"
              icon={ChevronRight}
              iconOnly
            >
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
            <span>
              {formatDate(calendar.generatedAt, {
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: '2-digit',
              })}
            </span>
            {calendarQuery.isStale && (
              <span className="flex min-w-0 items-center gap-2 text-amber-600 dark:text-amber-400">
                <span className="min-w-0 break-words">{t('warnings.stale')}</span>
                <button
                  type="button"
                  onClick={() => void calendarQuery.refetch()}
                  title={t('actions.reload')}
                  className="min-h-11 min-w-11 shrink-0 rounded-lg px-2 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <RotateCcw size={16} className="mx-auto" aria-hidden="true" />
                  <span className="sr-only">{t('actions.reload')}</span>
                </button>
              </span>
            )}
          </div>
        </div>
      )}

      {calendarQuery.isLoading && (
        <div role="status" aria-label={tCommon('status.loading')} className="grid min-w-0 gap-6">
          <Card className="h-96 animate-pulse bg-secondary" />
          <Card className="h-96 animate-pulse bg-secondary" />
        </div>
      )}

      {calendarQuery.isError && (
        <div role="alert" className="space-y-4 rounded-2xl border border-border bg-secondary p-6 text-foreground">
          <h2 className="text-xl font-semibold text-danger">{t('errors.load')}</h2>
          <p className="text-sm text-muted">{t('errors.keepSelection')}</p>
          <Button type="button" variant="secondary" onClick={() => void calendarQuery.refetch()} icon={RotateCw} iconOnly>
            {t('actions.retry')}
          </Button>
        </div>
      )}

      {calendar && (
        <div className="grid min-w-0 gap-6 min-[1400px]:grid-cols-12">
          <section
            aria-label={t('title')}
            className="min-w-0 min-[1400px]:col-span-7"
          >
            <CalendarGrid
              days={calendar.days}
              selectedDate={effectiveSelectedDate}
              onSelect={setSelectedDate}
              view={view}
            />
          </section>

          <aside
            aria-label={t('day.detail')}
            className="min-w-0 min-[1400px]:col-span-5"
          >
            <DayDetailPanel
              day={selectedDay}
              activeSession={activeSession}
              onEdit={openEditTask}
              onMove={setMovingTask}
              onCancel={openEditTask}
            />
          </aside>
        </div>
      )}
      {taskDialogOpen && (
        <StudyTaskDialog
          task={editingTask}
          date={effectiveSelectedDate}
          onClose={closeTaskDialog}
        />
      )}
      {movingTask && (
        <StudyMoveDialog
          task={movingTask}
          onClose={() => {
            setMovingTask(null);
            void calendarQuery.refetch();
          }}
        />
      )}
      {showPlanPreview && (
        <StudyPlanPreviewDialog
          onClose={() => {
            setShowPlanPreview(false);
            void calendarQuery.refetch();
          }}
        />
      )}
      {showAiPlanPreview && (
        <AiStudyPlanPreviewDialog
          onClose={() => {
            setShowAiPlanPreview(false);
            void calendarQuery.refetch();
          }}
        />
      )}
    </div>
  );
}
