import { describe, it, expect } from 'vitest';
import { SM2Scheduler, calculateSM2 } from '../../src/domain/spaced-repetition/sm2.js';
import type { ReviewItemState, ReviewRating } from '../../src/domain/spaced-repetition/types.js';

describe('SM-2 Spaced Repetition Algorithm', () => {
  const scheduler = new SM2Scheduler();
  const baseDate = new Date('2026-09-06T12:00:00.000Z');

  describe('Rating mappings and initial schedule', () => {
    const initialState: ReviewItemState = {
      repetitions: 0,
      interval: 0,
      easeFactor: 2.5,
      lapses: 0,
    };

    it('schedules interval = 1 and rep = 1 on first GOOD rating', () => {
      const result = scheduler.schedule(initialState, 'GOOD', baseDate);

      expect(result.repetitions).toBe(1);
      expect(result.interval).toBe(1);
      expect(result.easeFactor).toBe(2.5); // Grade 4 has 0 EF delta
      expect(result.lapses).toBe(0);
      expect(result.lastReviewedAt).toEqual(baseDate);
      // Next due date should be 1 day ahead
      expect(result.dueAt).toEqual(new Date('2026-09-07T00:00:00.000Z'));
    });

    it('schedules interval = 1 and rep = 1 on first EASY rating, increasing ease factor', () => {
      const result = scheduler.schedule(initialState, 'EASY', baseDate);

      expect(result.repetitions).toBe(1);
      expect(result.interval).toBe(1);
      expect(result.easeFactor).toBe(2.6); // Grade 5 adds 0.10
      expect(result.lapses).toBe(0);
      expect(result.dueAt).toEqual(new Date('2026-09-07T00:00:00.000Z'));
    });

    it('schedules interval = 1 and rep = 1 on first HARD rating, decreasing ease factor', () => {
      const result = scheduler.schedule(initialState, 'HARD', baseDate);

      expect(result.repetitions).toBe(1);
      expect(result.interval).toBe(1);
      expect(result.easeFactor).toBe(2.36); // Grade 3 subtracts 0.14
      expect(result.lapses).toBe(0);
      expect(result.dueAt).toEqual(new Date('2026-09-07T00:00:00.000Z'));
    });

    it('resets repetitions to 0, interval = 1, and increments lapses on AGAIN rating', () => {
      const result = scheduler.schedule(initialState, 'AGAIN', baseDate);

      expect(result.repetitions).toBe(0);
      expect(result.interval).toBe(1);
      expect(result.easeFactor).toBe(1.96); // Grade 1 subtracts 0.54
      expect(result.lapses).toBe(1);
      expect(result.dueAt).toEqual(new Date('2026-09-07T00:00:00.000Z'));
    });
  });

  describe('Interval progression for repetitions', () => {
    it('sets interval = 6 on second successful repetition (rep 2)', () => {
      const stateRep1: ReviewItemState = {
        repetitions: 1,
        interval: 1,
        easeFactor: 2.5,
        lapses: 0,
      };

      const result = scheduler.schedule(stateRep1, 'GOOD', baseDate);

      expect(result.repetitions).toBe(2);
      expect(result.interval).toBe(6);
      expect(result.easeFactor).toBe(2.5);
      expect(result.dueAt).toEqual(new Date('2026-09-12T00:00:00.000Z'));
    });

    it('sets interval = round(interval * EF) on subsequent repetitions (rep > 2)', () => {
      const stateRep2: ReviewItemState = {
        repetitions: 2,
        interval: 6,
        easeFactor: 2.5,
        lapses: 0,
      };

      // 6 * 2.5 = 15
      const result = scheduler.schedule(stateRep2, 'GOOD', baseDate);

      expect(result.repetitions).toBe(3);
      expect(result.interval).toBe(15);
      expect(result.easeFactor).toBe(2.5);
      expect(result.dueAt).toEqual(new Date('2026-09-21T00:00:00.000Z'));
    });

    it('calculates 4th repetition using updated ease factor', () => {
      const stateRep3: ReviewItemState = {
        repetitions: 3,
        interval: 15,
        easeFactor: 2.5,
        lapses: 0,
      };

      // Rating EASY increases EF to 2.6, interval = round(15 * 2.6) = round(39) = 39
      const result = scheduler.schedule(stateRep3, 'EASY', baseDate);

      expect(result.repetitions).toBe(4);
      expect(result.easeFactor).toBe(2.6);
      expect(result.interval).toBe(39);
    });
  });

  describe('Lapses and AGAIN penalty', () => {
    it('resets interval to 1 and increments lapses on advanced cards', () => {
      const stateAdvanced: ReviewItemState = {
        repetitions: 5,
        interval: 60,
        easeFactor: 2.5,
        lapses: 1,
      };

      const result = scheduler.schedule(stateAdvanced, 'AGAIN', baseDate);

      expect(result.repetitions).toBe(0);
      expect(result.interval).toBe(1);
      expect(result.lapses).toBe(2);
      expect(result.easeFactor).toBe(1.96);
    });
  });

  describe('Boundary ease factor constraints', () => {
    it('enforces minimum ease factor of 1.3 after multiple failures', () => {
      let state: ReviewItemState = {
        repetitions: 2,
        interval: 6,
        easeFactor: 1.5,
        lapses: 0,
      };

      // 1.5 - 0.54 = 0.96 -> must be clamped to 1.3
      const result = scheduler.schedule(state, 'AGAIN', baseDate);
      expect(result.easeFactor).toBe(1.3);

      // Another failure stays at 1.3
      const secondResult = scheduler.schedule(result, 'AGAIN', baseDate);
      expect(secondResult.easeFactor).toBe(1.3);
    });

    it('starts at boundary 1.3 and remains at 1.3 when AGAIN is chosen', () => {
      const state: ReviewItemState = {
        repetitions: 1,
        interval: 1,
        easeFactor: 1.3,
        lapses: 3,
      };
      const result = scheduler.schedule(state, 'AGAIN', baseDate);
      expect(result.easeFactor).toBe(1.3);
      expect(result.lapses).toBe(4);
    });

    it('accumulates ease factor increments across successive EASY reviews', () => {
      let state: ReviewItemState = {
        repetitions: 0,
        interval: 0,
        easeFactor: 2.5,
        lapses: 0,
      };
      // 2.5 + 0.10 = 2.6
      state = scheduler.schedule(state, 'EASY', baseDate);
      expect(state.easeFactor).toBe(2.6);

      // 2.6 + 0.10 = 2.7
      state = scheduler.schedule(state, 'EASY', baseDate);
      expect(state.easeFactor).toBe(2.7);

      // 2.7 + 0.10 = 2.8
      state = scheduler.schedule(state, 'EASY', baseDate);
      expect(state.easeFactor).toBe(2.8);
    });
  });

  describe('Due date calculation', () => {
    it('calculates correct due date from timestamp using getNextDueDate', () => {
      const fromDate = new Date('2026-01-01T00:00:00.000Z');
      const dueDate = scheduler.getNextDueDate(fromDate, 10);

      expect(dueDate).toEqual(new Date('2026-01-11T00:00:00.000Z'));
    });

    it('accepts ISO string for reviewDate', () => {
      const result = scheduler.schedule(
        { repetitions: 0, interval: 0, easeFactor: 2.5, lapses: 0 },
        'GOOD',
        '2026-09-06T12:00:00.000Z'
      );
      expect(result.dueAt).toEqual(new Date('2026-09-07T00:00:00.000Z'));
    });

    it('defaults reviewDate to current time if omitted', () => {
      const before = Date.now();
      const result = scheduler.schedule(
        { repetitions: 0, interval: 0, easeFactor: 2.5, lapses: 0 },
        'GOOD'
      );
      const after = Date.now();
      expect(result.lastReviewedAt.getTime()).toBeGreaterThanOrEqual(before);
      expect(result.lastReviewedAt.getTime()).toBeLessThanOrEqual(after);
    });

    it('handles leap years or month boundaries correctly', () => {
      const fromDate = new Date('2024-02-28T10:00:00.000Z'); // 2024 is leap year
      const dueDate = scheduler.getNextDueDate(fromDate, 2);

      expect(dueDate).toEqual(new Date('2024-03-01T00:00:00.000Z'));
    });

    it('schedules the next review at the start of the due UTC day', () => {
      const dueDate = scheduler.getNextDueDate('2026-09-06T22:30:00.000Z', 1);

      expect(dueDate).toEqual(new Date('2026-09-07T00:00:00.000Z'));
    });
  });

  describe('Standalone calculateSM2 function', () => {
    it('provides the pure functional SM2 calculation directly', () => {
      const item: ReviewItemState = {
        repetitions: 1,
        interval: 1,
        easeFactor: 2.5,
        lapses: 0,
      };
      const result = calculateSM2(item, 'GOOD', baseDate);
      expect(result.repetitions).toBe(2);
      expect(result.interval).toBe(6);
    });
  });

  describe('Input validation guards', () => {
    const initialState: ReviewItemState = {
      repetitions: 0,
      interval: 0,
      easeFactor: 2.5,
      lapses: 0,
    };

    it('throws descriptive error when invalid rating is provided', () => {
      expect(() => {
        calculateSM2(initialState, 'INVALID_RATING' as ReviewRating, baseDate);
      }).toThrow(/Invalid rating/i);

      expect(() => {
        scheduler.schedule(initialState, 'UNKNOWN' as ReviewRating, baseDate);
      }).toThrow(/Invalid rating/i);
    });

    it('throws descriptive error when invalid reviewDate is provided', () => {
      expect(() => {
        calculateSM2(initialState, 'GOOD', 'invalid-date-string');
      }).toThrow(/Invalid reviewDate/i);

      expect(() => {
        calculateSM2(initialState, 'GOOD', new Date('invalid'));
      }).toThrow(/Invalid reviewDate/i);

      expect(() => {
        scheduler.getNextDueDate('invalid-date-string', 5);
      }).toThrow(/Invalid reviewDate/i);
    });
  });
});
