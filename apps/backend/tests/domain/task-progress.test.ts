/**
 * @file task-progress.test.ts
 * @description Verifies plan outcome transitions independently from database projection.
 */
import { describe, expect, it } from 'vitest';
import { deriveDayStatus } from '../../src/domain/study/task-progress.js';
import type { DayStatusInput } from '../../src/schemas/study.schema.js';

const input = (overrides: Partial<DayStatusInput> = {}): DayStatusInput => ({ isPast: false, taskCount: 1,
  effectiveTaskCount: 1, completedOnTimeTaskCount: 0, hasActivity: false, hasQualifyingEvidence: false,
  hasTransferredRemainder: false, ...overrides });

describe('deriveDayStatus', () => {
  it('shows no plan when date lies outside activity range', () => {
    expect(deriveDayStatus(input({ taskCount: 0 }))).toBe('NO_PLAN');
  });
  it('does not credit late work as on-time completion', () => {
    expect(deriveDayStatus(input({ isPast: true, hasActivity: true }))).toBe('MISSED');
  });
  it('marks past partial completion even when remaining task was cancelled', () => {
    expect(deriveDayStatus(input({ isPast: true, effectiveTaskCount: 0, hasQualifyingEvidence: true }))).toBe('PARTIAL');
  });
  it('keeps a transferred remainder incomplete despite another goal being complete', () => {
    expect(deriveDayStatus(input({ isPast: true, taskCount: 2, effectiveTaskCount: 1,
      completedOnTimeTaskCount: 1, hasQualifyingEvidence: true, hasTransferredRemainder: true }))).toBe('PARTIAL');
    expect(deriveDayStatus(input({ completedOnTimeTaskCount: 1, hasTransferredRemainder: true }))).toBe('PLANNED');
  });
  it('requires linked evidence for in-progress status', () => {
    expect(deriveDayStatus(input({ isPast: true, hasActivity: true }))).toBe('MISSED');
    expect(deriveDayStatus(input({ hasQualifyingEvidence: true }))).toBe('IN_PROGRESS');
  });
  it('completes only when every effective goal is met without transferred remainder', () => {
    expect(deriveDayStatus(input({ completedOnTimeTaskCount: 1 }))).toBe('COMPLETED');
    expect(deriveDayStatus(input({ completedOnTimeTaskCount: 1, hasTransferredRemainder: true }))).toBe('PLANNED');
  });
});
