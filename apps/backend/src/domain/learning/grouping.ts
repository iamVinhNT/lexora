/**
 * @file grouping.ts
 * @description Deterministic learning-session group assignment rules.
 */

export type LearningWord = { id: string; difficulty?: string | null };
export type GroupAssignment = LearningWord & { position: number; groupIndex: number };

function difficultyWeight(difficulty?: string | null): number {
  if (difficulty === 'A1' || difficulty === 'A2') return 1;
  if (difficulty === 'C1' || difficulty === 'C2') return 3;
  return 2;
}

function targetSize(words: LearningWord[]): number {
  if (words.length < 3) return words.length;
  const average = words.reduce((sum, word) => sum + difficultyWeight(word.difficulty), 0) / words.length;
  return average < 1.5 ? 5 : average < 2.5 ? 4 : 3;
}

export function groupSessionItems(words: LearningWord[]): GroupAssignment[][] {
  if (words.length === 0) return [];
  const size = targetSize(words);
  const groupCount = Math.ceil(words.length / size);
  const baseSize = Math.floor(words.length / groupCount);
  const remainder = words.length % groupCount;
  const groups: GroupAssignment[][] = [];
  let position = 0;
  for (let groupIndex = 0; groupIndex < groupCount; groupIndex++) {
    const currentSize = baseSize + (groupIndex < remainder ? 1 : 0);
    groups.push(words.slice(position, position + currentSize).map((word) => ({ ...word, position: position++, groupIndex })));
  }
  return groups;
}
