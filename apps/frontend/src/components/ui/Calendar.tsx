/**
 * @file Calendar.tsx
 * @description Shadcn React DayPicker calendar with responsive Lexora control styles.
 */
import type { ComponentProps } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

export function Calendar({ className = '', classNames, showOutsideDays = true, ...props }: ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={`p-2 sm:p-3 ${className}`}
      classNames={{
        months: 'flex flex-col gap-4 sm:flex-row',
        month: 'space-y-3',
        caption: 'relative flex min-h-11 items-center justify-center',
        caption_label: 'text-sm font-medium',
        nav: 'flex items-center gap-1',
        nav_button: 'inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border bg-background text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50',
        nav_button_previous: 'absolute left-0',
        nav_button_next: 'absolute right-0',
        table: 'w-full border-collapse',
        head_row: 'flex',
        head_cell: 'w-10 rounded-md text-xs font-normal text-muted sm:w-11',
        row: 'mt-1 flex w-full',
        cell: 'relative h-10 w-10 p-0 text-center text-sm focus-within:z-20 sm:h-11 sm:w-11',
        day: 'inline-flex h-10 w-10 items-center justify-center rounded-lg p-0 text-sm font-normal text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:h-11 sm:w-11',
        day_selected: 'bg-primary !text-primary-foreground hover:!bg-primary focus:!bg-primary',
        day_today: 'border border-primary',
        day_outside: 'opacity-50',
        day_disabled: 'text-muted opacity-40',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ className: iconClassName = '' }) => <ChevronLeft aria-hidden="true" className={`h-4 w-4 ${iconClassName}`} />,
        IconRight: ({ className: iconClassName = '' }) => <ChevronRight aria-hidden="true" className={`h-4 w-4 ${iconClassName}`} />,
      }}
      {...props}
    />
  );
}
