/**
 * @file cursor.ts
 * @description Server-owned learning cursor derivation from persisted item and attempt state.
 */

export type LearningStep = 'CONTEXT' | 'UNDERSTAND' | 'RECALL' | 'OUTPUT' | 'ASSESS';
export type LearningCursor = {
  phase: 'ENCODE' | 'RETRIEVE' | 'COMPLETE'; groupIndex: number; groupCount: number; groupSize: number;
  itemIndex: number; sessionPosition: number; step: LearningStep | null; itemId: string | null; wordId: string | null;
  attemptNumber: 1 | 2 | null;
};
export type LearningCursorItem = {
  id: string; wordId: string; position: number; groupIndex: number; completedStep: LearningStep | null; reviewRating: string | null;
};
export type LearningAttempt = { id: string; sessionItemId: string; type: 'RECALL' | 'OUTPUT'; attemptNumber: 1 | 2; result: string };

const steps: LearningStep[] = ['CONTEXT', 'UNDERSTAND', 'RECALL', 'OUTPUT', 'ASSESS'];

export function deriveLearningCursor(items: LearningCursorItem[], attempts: LearningAttempt[]): LearningCursor {
  const sorted = [...items].sort((a, b) => a.position - b.position);
  const groupIndexes = [...new Set(sorted.map((item) => item.groupIndex))];
  const groupCount = groupIndexes.length;
  for (const groupIndex of groupIndexes) {
    const group = sorted.filter((item) => item.groupIndex === groupIndex);
    if (group.every((item) => item.completedStep === 'ASSESS' && item.reviewRating)) continue;
    const allEncoded = group.every((item) => ['UNDERSTAND', 'RECALL', 'OUTPUT', 'ASSESS'].includes(item.completedStep ?? ''));
    const phase = allEncoded ? 'RETRIEVE' : 'ENCODE';
    const current = phase === 'ENCODE'
      ? group.find((item) => !['UNDERSTAND', 'RECALL', 'OUTPUT', 'ASSESS'].includes(item.completedStep ?? ''))
      : group.find((item) => item.completedStep !== 'ASSESS' || !item.reviewRating);
    if (!current) continue;
    const step = phase === 'ENCODE' ? (current.completedStep === 'CONTEXT' ? 'UNDERSTAND' : 'CONTEXT') : nextRetrieveStep(current, attempts);
    return {
      phase, groupIndex, groupCount, groupSize: group.length, itemIndex: group.indexOf(current), sessionPosition: current.position,
      step, itemId: current.id, wordId: current.wordId, attemptNumber: step === 'RECALL' || step === 'OUTPUT' ? nextAttempt(current.id, step, attempts) : null,
    };
  }
  return { phase: 'COMPLETE', groupIndex: groupCount ? groupCount - 1 : 0, groupCount, groupSize: 0, itemIndex: 0, sessionPosition: -1, step: null, itemId: null, wordId: null, attemptNumber: null };
}

function nextRetrieveStep(item: LearningCursorItem, attempts: LearningAttempt[]): LearningStep {
  const itemAttempts = attempts.filter((attempt) => attempt.sessionItemId === item.id);
  const recallAttempts = itemAttempts.filter((attempt) => attempt.type === 'RECALL');
  if (!recallAttempts.length || (recallAttempts.length === 1 && recallAttempts[0].result === 'INCORRECT')) return 'RECALL';
  const outputAttempts = itemAttempts.filter((attempt) => attempt.type === 'OUTPUT');
  if (!outputAttempts.length || (outputAttempts.length === 1 && outputAttempts[0].result === 'INVALID')) return 'OUTPUT';
  return 'ASSESS';
}

function nextAttempt(itemId: string, step: LearningStep, attempts: LearningAttempt[]): 1 | 2 {
  const type = step as 'RECALL' | 'OUTPUT';
  return attempts.some((attempt) => attempt.sessionItemId === itemId && attempt.type === type && attempt.attemptNumber === 1) ? 2 : 1;
}

export { steps as LEARNING_STEPS };
