/**
 * @file calendar-date.ts
 * @description Civil-date arithmetic and timezone conversion independent of host timezone.
 */
const DAY_MS = 86_400_000;

export function isCivilDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const instant = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(instant.getTime()) && instant.toISOString().slice(0, 10) === value;
}

export function isTimeZone(value: string): boolean {
  try {
    new Intl.DateTimeFormat('en', { timeZone: value }).format(0);
    return true;
  } catch {
    return false;
  }
}

function dateFormatter(zone: string): Intl.DateTimeFormat {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: zone,
    calendar: 'iso8601',
    numberingSystem: 'latn',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    era: 'short',
  });
}

function formattedDate(instant: number | Date, formatter: Intl.DateTimeFormat): string {
  let year = '';
  let month = '';
  let day = '';
  let era = '';
  for (const part of formatter.formatToParts(instant)) {
    if (part.type === 'year') year = part.value;
    else if (part.type === 'month') month = part.value;
    else if (part.type === 'day') day = part.value;
    else if (part.type === 'era') era = part.value;
  }
  if (era === 'BC') year = String(1 - Number(year));
  return `${year.padStart(4, '0')}-${month}-${day}`;
}

export function civilDateAt(instant: string | Date, zone: string): string {
  const date = typeof instant === 'string' ? new Date(instant) : instant;
  if (!Number.isFinite(date.getTime())) throw new RangeError('Invalid instant');
  return formattedDate(date, dateFormatter(zone));
}

export function addCivilDays(date: string, count: number): string {
  if (!isCivilDate(date) || !Number.isSafeInteger(count)) throw new RangeError('Invalid civil date or day count');
  const result = new Date(new Date(`${date}T00:00:00.000Z`).getTime() + count * DAY_MS);
  if (!Number.isFinite(result.getTime())) throw new RangeError('Civil date out of range');
  const value = result.toISOString().slice(0, 10);
  if (!isCivilDate(value)) throw new RangeError('Civil date out of range');
  return value;
}

function dayStart(date: string, formatter: Intl.DateTimeFormat): number {
  const midnightUtc = new Date(`${date}T00:00:00.000Z`).getTime();
  let low = midnightUtc - 2 * DAY_MS;
  let high = midnightUtc + 2 * DAY_MS;
  while (low < high) {
    const middle = low + Math.floor((high - low) / 2);
    if (formattedDate(middle, formatter) < date) low = middle + 1;
    else high = middle;
  }
  return low;
}

export function dayRangeUtc(date: string, zone: string): { start: string; end: string } {
  if (!isCivilDate(date)) throw new RangeError('Invalid civil date');
  const formatter = dateFormatter(zone);
  const start = dayStart(date, formatter);
  if (formattedDate(start, formatter) !== date) throw new RangeError('Civil date does not exist in timezone');
  const end = dayStart(addCivilDays(date, 1), formatter);
  return { start: new Date(start).toISOString(), end: new Date(end).toISOString() };
}
