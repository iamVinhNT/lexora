/**
 * @file pending-output.ts
 * @description Pure rule for output sentences that were saved during a session but not graded yet.
 */

export type PendingOutputItem = { id: string; completedStep: string | null; outputSentence: string | null };
export type PendingOutputAttempt = { sessionItemId: string; type: string; answer: string };

export function needsOutputGrade(item: PendingOutputItem, attempts: PendingOutputAttempt[]): boolean {
  if (!item.outputSentence?.trim()) return false;
  if (item.completedStep !== 'OUTPUT' && item.completedStep !== 'ASSESS') return false;
  return !attempts.some((attempt) => attempt.sessionItemId === item.id && attempt.type === 'OUTPUT' && attempt.answer === item.outputSentence);
}
