/**
 * @file task-progress.ts
 * @description Pure daily plan status projection.
 */
import type { DayStatus, DayStatusInput } from '../../schemas/study.schema.js';

export function deriveDayStatus(input: DayStatusInput): DayStatus {
  if (input.taskCount === 0) return 'NO_PLAN';
  if (input.effectiveTaskCount === 0 && !input.hasQualifyingEvidence) return 'CANCELLED';
  if (input.effectiveTaskCount > 0
    && input.completedOnTimeTaskCount >= input.effectiveTaskCount
    && !input.hasTransferredRemainder) return 'COMPLETED';
  if (input.isPast) return input.hasQualifyingEvidence ? 'PARTIAL' : 'MISSED';
  return input.hasActivity || input.hasQualifyingEvidence ? 'IN_PROGRESS' : 'PLANNED';
}
