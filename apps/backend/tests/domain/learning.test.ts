/**
 * @file learning.test.ts
 * @description Tests pure grouping, cursor, attempt evaluation, scoring, and state rules.
 */
import { describe, expect, it } from 'vitest';
import { groupSessionItems, type LearningWord } from '../../src/domain/learning/grouping.js';
import { deriveLearningCursor, type LearningCursorItem, type LearningAttempt } from '../../src/domain/learning/cursor.js';
import { evaluateOutput } from '../../src/domain/learning/output-evaluation.js';
import { advanceStateOneLevel, deriveEffectiveRating, scoreAttempt } from '../../src/domain/learning/scoring.js';
import { LangGraphOutputGrader, outputGradeSchema } from '../../src/domain/learning/ai-output-grader.js';

const words = (count: number, difficulty = 'B1'): LearningWord[] => Array.from({ length: count }, (_, index) => ({ id: `word-${index + 1}`, difficulty }));
function item(overrides: Partial<LearningCursorItem> = {}): LearningCursorItem {
  return { id: 'item-1', wordId: 'word-1', position: 0, groupIndex: 0, completedStep: null, reviewRating: null, ...overrides };
}

describe('learning domain', () => {
  it('groups six medium words into two groups of three', () => expect(groupSessionItems(words(6)).map((group) => group.length)).toEqual([3, 3]));
  it('uses target sizes 5, 4, and 3 by average difficulty', () => {
    expect(groupSessionItems(words(8, 'A1')).map((group) => group.length)).toEqual([4, 4]);
    expect(groupSessionItems(words(9, 'B1')).map((group) => group.length)).toEqual([3, 3, 3]);
    expect(groupSessionItems(words(7, 'C1')).map((group) => group.length)).toEqual([3, 2, 2]);
  });
  it('keeps fewer than three words in one group and preserves order', () => expect(groupSessionItems(words(2, 'A1')).map((group) => group.map((word) => word.id))).toEqual([['word-1', 'word-2']]));
  it('holds retrieval until current group is encoded and blocks later groups', () => {
    const items = [item(), item({ id: 'item-2', wordId: 'word-2', position: 1 }), item({ id: 'item-3', wordId: 'word-3', position: 2, groupIndex: 1 })];
    expect(deriveLearningCursor(items, [])).toMatchObject({ phase: 'ENCODE', groupIndex: 0, step: 'CONTEXT', itemId: 'item-1' });
    expect(deriveLearningCursor(items.map((value) => ({ ...value, completedStep: 'UNDERSTAND' })), [])).toMatchObject({ phase: 'RETRIEVE', groupIndex: 0, step: 'RECALL' });
  });
  it('advances to next group only after every current item is assessed', () => {
    const items = [item({ completedStep: 'ASSESS', reviewRating: 'GOOD' }), item({ id: 'item-2', wordId: 'word-2', position: 1, completedStep: 'ASSESS', reviewRating: 'GOOD' }), item({ id: 'item-3', wordId: 'word-3', position: 2, groupIndex: 1 })];
    expect(deriveLearningCursor(items, [])).toMatchObject({ phase: 'ENCODE', groupIndex: 1, step: 'CONTEXT', itemId: 'item-3' });
  });
  it('selects next encoding item before retrieval starts', () => {
    const items = [item({ completedStep: 'UNDERSTAND' }), item({ id: 'item-2', wordId: 'word-2', position: 1 })];
    expect(deriveLearningCursor(items, [])).toMatchObject({ phase: 'ENCODE', groupIndex: 0, step: 'CONTEXT', itemId: 'item-2' });
  });
  it('tracks pending second recall attempt from persisted attempts', () => {
    const attempts: LearningAttempt[] = [{ id: 'attempt-1', sessionItemId: 'item-1', type: 'RECALL', attemptNumber: 1, result: 'INCORRECT' }];
    expect(deriveLearningCursor([item({ completedStep: 'UNDERSTAND' })], attempts)).toMatchObject({ phase: 'RETRIEVE', step: 'RECALL', attemptNumber: 2 });
  });
  it('keeps invalid output on output attempt two before assessment', () => {
    const attempts: LearningAttempt[] = [
      { id: 'recall-1', sessionItemId: 'item-1', type: 'RECALL', attemptNumber: 1, result: 'CORRECT' },
      { id: 'output-1', sessionItemId: 'item-1', type: 'OUTPUT', attemptNumber: 1, result: 'INVALID' },
      { id: 'output-2', sessionItemId: 'item-1', type: 'OUTPUT', attemptNumber: 2, result: 'INVALID' },
    ];
    expect(deriveLearningCursor([item({ completedStep: 'RECALL' })], attempts.slice(0, 2))).toMatchObject({ step: 'OUTPUT', attemptNumber: 2 });
    expect(deriveLearningCursor([item({ completedStep: 'OUTPUT' })], attempts)).toMatchObject({ step: 'ASSESS', attemptNumber: null });
  });
  it('evaluates output with bounded token and target-boundary rules', () => {
    expect(evaluateOutput('', 'reliable')).toEqual({ valid: false, codes: ['EMPTY'] });
    expect(evaluateOutput('It works.', 'reliable')).toEqual({ valid: false, codes: ['TOO_SHORT'] });
    expect(evaluateOutput('This is a reliable system.', 'reliable')).toEqual({ valid: true, codes: [] });
    expect(evaluateOutput('This is a reliability system.', 'reliable')).toEqual({ valid: false, codes: ['TARGET_MISSING'] });
    expect(evaluateOutput('This is a high quality system.', 'high quality')).toEqual({ valid: true, codes: [] });
  });
  it('scores attempts and derives bounded effective ratings', () => {
    expect(scoreAttempt(1, true)).toBe(100);
    expect(scoreAttempt(2, true)).toBe(70);
    expect(scoreAttempt(2, false)).toBe(0);
    expect(deriveEffectiveRating(100, 100, 'AGAIN')).toBe('EASY');
    expect(deriveEffectiveRating(0, 0, 'EASY')).toBe('AGAIN');
  });
  it('advances knowledge by one level without regression', () => {
    expect(advanceStateOneLevel('NEW', 'MASTERED')).toBe('LEARNING');
    expect(advanceStateOneLevel('MASTERED', 'LEARNING')).toBe('MASTERED');
  });
  it('accepts only bounded structured AI grades', () => {
    expect(outputGradeSchema.parse({ score: 84, explanation: 'Correct use.', suggestion: 'She occupies the room.' }).score).toBe(84);
    expect(() => outputGradeSchema.parse({ score: 101, explanation: 'Invalid.', suggestion: 'Retry.' })).toThrow();
    expect(() => outputGradeSchema.parse({ score: 60.5, explanation: 'Invalid.', suggestion: 'Retry.' })).toThrow();
  });
  it('fails before any provider call when OpenAI is not configured', async () => {
    const previous = process.env.OPENAI_API_KEY;
    delete process.env.OPENAI_API_KEY;
    try {
      await expect(new LangGraphOutputGrader().grade({ word: 'occupy', definition: 'to fill a place', sentence: 'She occupies the room.' })).rejects.toThrow('AI grading is not configured');
    } finally {
      if (previous === undefined) delete process.env.OPENAI_API_KEY;
      else process.env.OPENAI_API_KEY = previous;
    }
  });
});
