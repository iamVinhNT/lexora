/**
 * @file StudyTaskDatePicker.tsx
 * @description Shadcn date picker preserving civil dates across browser and study timezones.
 */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { enUS, vi } from 'date-fns/locale';
import { CalendarDays } from 'lucide-react';
import { formatDate, getIntlLocale } from '../../i18n/formatters';
import { civilDateAt, isCivilDate } from '../../utils/calendar-date';
import { Button } from '../ui/Button';
import { Calendar } from '../ui/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/Popover';

type Props = { id: string; value: string; onChange: (date: string) => void };

export function StudyTaskDatePicker({ id, value, onChange }: Props) {
  const { t } = useTranslation('calendar');
  const [open, setOpen] = useState(false);
  const selected = isCivilDate(value) ? new Date(`${value}T12:00:00`) : undefined;
  const dateLabel = selected ? formatDate(selected, { year: 'numeric', month: 'long', day: 'numeric' }) : t('forms.scheduledDate');

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button id={id} type="button" variant="secondary" aria-label={`${t('forms.scheduledDate')}: ${dateLabel}`} className="w-full !justify-start border border-border !bg-background text-left !font-normal hover:!bg-secondary">
          <CalendarDays aria-hidden="true" className="h-4 w-4 shrink-0" />
          <span className="min-w-0 truncate">{dateLabel}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="max-h-[var(--radix-popover-content-available-height)] overflow-y-auto !p-0"
        onOpenAutoFocus={(event) => {
          // DayPicker owns initial focus; Radix would focus month navigation.
          event.preventDefault();
        }}
      >
        <Calendar
          mode="single"
          required
          selected={selected}
          defaultMonth={selected}
          locale={getIntlLocale() === 'vi-VN' ? vi : enUS}
          weekStartsOn={1}
          labels={{ labelPrevious: () => t('actions.previous'), labelNext: () => t('actions.next') }}
          onSelect={(date) => {
            if (!date) return;
            onChange(civilDateAt(date, Intl.DateTimeFormat().resolvedOptions().timeZone));
            setOpen(false);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
