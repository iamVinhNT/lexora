/**
 * @file calendar-date.test.ts
 * @description Civil-day boundaries and study input validation regressions.
 */
import { describe, expect, it } from 'vitest';
import { addCivilDays, civilDateAt, dayRangeUtc, isTimeZone } from '../../src/domain/study/calendar-date.js';
import { studyCalendarQuerySchema, studyPreferencesInputSchema, studyTaskInputSchema, taskPatchSchema } from '../../src/schemas/study.schema.js';

describe('calendar civil dates', () => {
  it('groups Vietnam evidence at local midnight without changing instants', () => {
    expect(civilDateAt('2026-10-03T16:59:59Z', 'Asia/Ho_Chi_Minh')).toBe('2026-10-03');
    expect(civilDateAt('2026-10-03T17:00:00Z', 'Asia/Ho_Chi_Minh')).toBe('2026-10-04');
    expect(dayRangeUtc('2026-10-04', 'Asia/Ho_Chi_Minh')).toEqual({ start: '2026-10-03T17:00:00.000Z', end: '2026-10-04T17:00:00.000Z' });
  });
  it.each([
    ['2026-03-08', '2026-03-08T05:00:00.000Z', '2026-03-09T04:00:00.000Z'],
    ['2026-11-01', '2026-11-01T04:00:00.000Z', '2026-11-02T05:00:00.000Z'],
  ])('uses actual New York boundaries on %s', (date, start, end) => {
    expect(dayRangeUtc(date, 'America/New_York')).toEqual({ start, end });
  });
  it('handles a skipped midnight in São Paulo', () => {
    expect(dayRangeUtc('2018-11-04', 'America/Sao_Paulo')).toEqual({ start: '2018-11-04T03:00:00.000Z', end: '2018-11-05T02:00:00.000Z' });
  });
  it('adds civil days across leap years and rejects invalid dates', () => {
    expect(addCivilDays('2024-02-28', 1)).toBe('2024-02-29');
    expect(addCivilDays('2024-02-29', 1)).toBe('2024-03-01');
    expect(addCivilDays('2026-01-01', -1)).toBe('2025-12-31');
    expect(() => dayRangeUtc('2026-02-29', 'UTC')).toThrow();
    expect(() => dayRangeUtc('2026-10-04', 'Not/AZone')).toThrow();
    expect(() => civilDateAt('not-an-instant', 'UTC')).toThrow();
    expect(() => dayRangeUtc('2011-12-30', 'Pacific/Apia')).toThrow();
  });
});

  it('accepts only named IANA zones, not numeric offsets', () => {
    expect(isTimeZone('Asia/Ho_Chi_Minh')).toBe(true);
    expect(isTimeZone('UTC')).toBe(true);
    expect(isTimeZone('+07:00')).toBe(false);
  });

describe('study boundary inputs', () => {
  const preferences = { timeZone: 'UTC', studyDays: [1, 3, 5], learningTarget: 200, reviewTarget: 500, grammarTarget: 1 };
  it('keeps daily quotas distinct from session and queue limits', () => {
    expect(studyPreferencesInputSchema.parse(preferences)).toEqual(preferences);
    expect(studyTaskInputSchema.parse({ id: 'task', kind: 'LEARN_WORDS', mode: 'new_words', scheduledDate: '2026-10-04', targetCount: 200, source: 'MANUAL' }).targetCount).toBe(200);
    expect(studyTaskInputSchema.safeParse({ id: 'task', kind: 'GRAMMAR', lessonId: null, revisionId: null, revision: null, scheduledDate: '2026-10-04', targetCount: 2, source: 'AUTO' }).success).toBe(false);
  });
  it('rejects impossible dates, unsafe quotas, duplicate weekdays and client evidence', () => {
    for (const changes of [{ timeZone: 'Wrong/Zone' }, { studyDays: [1, 1] }, { reviewTarget: Number.MAX_SAFE_INTEGER + 1 }, { learningTarget: -1 }]) {
      expect(studyPreferencesInputSchema.safeParse({ ...preferences, ...changes }).success).toBe(false);
    }
    const task = { id: 'task', kind: 'REVIEW_WORDS', scheduledDate: '2026-02-29', targetCount: 1, source: 'MANUAL' };
    expect(studyTaskInputSchema.safeParse(task).success).toBe(false);
    expect(studyTaskInputSchema.safeParse({ ...task, scheduledDate: '2026-10-04', completedCount: 1 }).success).toBe(false);
    expect(taskPatchSchema.safeParse({ action: 'CANCEL', version: 0 }).success).toBe(false);
    expect(studyTaskInputSchema.safeParse({ ...task, scheduledDate: '2026-10-04', kind: 'LEARN_WORDS', mode: 'context' }).success).toBe(false);
  });
  it('accepts 42 inclusive days but rejects 43 or reversed ranges', () => {
    expect(studyCalendarQuerySchema.safeParse({ from: '2026-10-01', to: '2026-11-11' }).success).toBe(true);
    expect(studyCalendarQuerySchema.safeParse({ from: '2026-10-01', to: '2026-11-12' }).success).toBe(false);
    expect(studyCalendarQuerySchema.safeParse({ from: '2026-10-02', to: '2026-10-01' }).success).toBe(false);
  });
});
