/**
 * @file CalendarGrid.tsx
 * @description Accessible 7-day week and month grid with keyboard date selection and mobile list view.
 */
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import type { CivilDate, StudyCalendarDay } from '../../api/study.api';
import { formatDate } from '../../i18n/formatters';
import { Card } from '../ui/Card';

export type CalendarGridProps = {
  days: StudyCalendarDay[];
  selectedDate: CivilDate;
  onSelect: (date: CivilDate) => void;
  view: 'week' | 'month';
};

const statusDotClasses: Record<string, string> = {
  COMPLETED: 'bg-emerald-500',
  IN_PROGRESS: 'bg-primary',
  PLANNED: 'bg-muted',
  PARTIAL: 'bg-amber-500',
  MISSED: 'bg-danger',
  CANCELLED: 'bg-muted/50',
  NO_PLAN: 'bg-transparent',
};

const statusBadgeClasses: Record<string, string> = {
  COMPLETED: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  IN_PROGRESS: 'bg-primary-subtle text-primary border-primary/20',
  PLANNED: 'bg-secondary text-foreground border-border',
  PARTIAL: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  MISSED: 'bg-danger/10 text-danger border-danger/20',
  CANCELLED: 'bg-secondary text-muted border-border line-through',
  NO_PLAN: 'bg-transparent text-muted border-dashed border-border',
};

// Monday to Sunday reference dates for localized weekday headers
const weekdayReferenceDays = [
  '2026-09-28T12:00:00.000Z', // Monday
  '2026-09-29T12:00:00.000Z', // Tuesday
  '2026-09-30T12:00:00.000Z', // Wednesday
  '2026-10-01T12:00:00.000Z', // Thursday
  '2026-10-02T12:00:00.000Z', // Friday
  '2026-10-03T12:00:00.000Z', // Saturday
  '2026-10-04T12:00:00.000Z', // Sunday
];

export function CalendarGrid({ days, selectedDate, onSelect, view }: CalendarGridProps) {
  const { t } = useTranslation('calendar');
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let targetIndex: number | null = null;

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      targetIndex = Math.max(0, index - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      targetIndex = Math.min(days.length - 1, index + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      targetIndex = Math.max(0, index - 7);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      targetIndex = Math.min(days.length - 1, index + 7);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(days[index].date);
      return;
    }

    if (targetIndex !== null && targetIndex !== index) {
      const targetDay = days[targetIndex];
      onSelect(targetDay.date);
      buttonRefs.current.get(targetDay.date)?.focus();
    }
  };

  const handleMobileKeyDown = (e: React.KeyboardEvent, index: number) => {
    let targetIndex: number | null = null;

    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      targetIndex = Math.max(0, index - 1);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      targetIndex = Math.min(days.length - 1, index + 1);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(days[index].date);
      return;
    }

    if (targetIndex !== null && targetIndex !== index) {
      const targetDay = days[targetIndex];
      onSelect(targetDay.date);
      buttonRefs.current.get(`m-${targetDay.date}`)?.focus();
    }
  };

  return (
    <Card className="min-w-0 p-3 sm:p-4 xl:p-6" data-testid="calendar-grid">
      {/* Mobile list view (< 640px) */}
      <div className="flex flex-col gap-2 sm:hidden" role="list" aria-label={t('title')}>
        {days.map((day, index) => {
          const isSelected = day.date === selectedDate;
          const statusText = t(`statuses.${day.status}`);
          const formattedMobileDate = formatDate(`${day.date}T12:00:00.000Z`, {
            weekday: 'short',
            day: '2-digit',
            month: '2-digit',
            timeZone: 'UTC',
          });

          return (
            <button
              key={`m-${day.date}`}
              ref={(el) => {
                if (el) buttonRefs.current.set(`m-${day.date}`, el);
                else buttonRefs.current.delete(`m-${day.date}`);
              }}
              type="button"
              aria-pressed={isSelected}
              aria-label={`${day.date} · ${statusText}${!day.isStudyDay ? ` · ${t('day.restDay')}` : ''}`}
              onClick={() => onSelect(day.date)}
              onKeyDown={(e) => handleMobileKeyDown(e, index)}
              className={`flex min-h-16 w-full min-w-0 flex-col justify-center gap-2 rounded-xl border px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                isSelected
                  ? 'border-primary bg-primary-subtle text-foreground shadow-sm'
                  : 'border-border bg-surface text-foreground hover:bg-secondary'
              }`}
            >
              <div className="flex min-w-0 items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${statusDotClasses[day.status] ?? 'bg-muted'}`}
                    aria-hidden="true"
                  />
                  <span className="min-w-0 break-words font-semibold">{formattedMobileDate}</span>
                </div>
                {!day.isStudyDay && (
                  <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-muted">
                    {t('day.restDay')}
                  </span>
                )}
              </div>
              <div className="flex min-w-0 items-center justify-between gap-2 pl-[22px]">
                <span className="min-w-0 break-words text-xs text-muted">{statusText}</span>
                {day.tasks.length > 0 && (
                  <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                    {day.tasks.length} {t('forms.taskTitle')}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Desktop / Tablet 7-column grid (>= 640px) */}
      <div className="hidden sm:block">
        <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-muted sm:gap-1.5 sm:text-xs">
          {weekdayReferenceDays.map((refDate, i) => (
            <div key={i} className="py-1">
              {formatDate(refDate, { weekday: 'short', timeZone: 'UTC' })}
            </div>
          ))}
        </div>

        <div
          className="grid min-w-0 grid-cols-7 gap-1 sm:gap-1.5"
          role="grid"
          aria-label={view === 'week' ? t('week') : t('month')}
        >
          {days.map((day, index) => {
            const isSelected = day.date === selectedDate;
            const statusText = t(`statuses.${day.status}`);
            const dayNumber = day.date.slice(8);

            return (
              <button
                key={day.date}
                ref={(el) => {
                  if (el) buttonRefs.current.set(day.date, el);
                  else buttonRefs.current.delete(day.date);
                }}
                type="button"
                aria-pressed={isSelected}
                aria-label={`${day.date} · ${statusText}${!day.isStudyDay ? ` · ${t('day.restDay')}` : ''}`}
                onClick={() => onSelect(day.date)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`relative flex min-h-[72px] min-w-0 flex-col justify-between rounded-lg border p-1.5 text-left transition-all focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:min-h-[84px] sm:rounded-xl sm:p-2 ${
                  isSelected
                    ? 'border-primary bg-primary-subtle text-foreground shadow-sm ring-2 ring-primary ring-offset-1'
                    : day.isStudyDay
                      ? 'border-border bg-surface text-foreground hover:border-primary/40 hover:bg-secondary/40'
                      : 'border-dashed border-border bg-secondary/30 text-muted hover:border-primary/30'
                }`}
              >
                <div className="flex min-w-0 items-center justify-between gap-1">
                  <span className={`text-sm font-bold ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                    {dayNumber}
                  </span>
                  <span
                    className={`h-2 w-2 rounded-full ${statusDotClasses[day.status] ?? 'bg-muted'}`}
                    aria-hidden="true"
                  />
                </div>

                <div className="min-w-0 space-y-1">
                  <span
                    className={`block min-w-0 break-words rounded px-1 py-0.5 text-[9px] font-semibold leading-tight sm:text-[10px] ${
                      statusBadgeClasses[day.status] ?? 'bg-secondary text-muted'
                    }`}
                  >
                    {statusText}
                  </span>
                  {day.tasks.length > 0 && (
                    <div className="text-[10px] text-muted">
                      {day.tasks.length} {t('forms.taskTitle')}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
