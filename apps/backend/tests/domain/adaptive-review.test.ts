/**
 * @file adaptive-review.test.ts
 * @description Regression coverage for safe recall prompts and evidence-constrained review ratings.
 */
import { describe, it, expect } from 'vitest';
import {
  textLeaksWord,
  buildAdaptiveReviewPrompt,
  calculateEffectiveRatings,
} from '../../src/domain/review/prompt.js';

describe('Adaptive review prompts and ratings', () => {
  describe('Prompt Generation & Leak Prevention (AC-01)', () => {
    it('detects whole-word occurrences of target word in text', () => {
      expect(textLeaksWord('The ephemeral beauty of dawn', 'ephemeral')).toBe(true);
      expect(textLeaksWord('An Ephemeral moment', 'ephemeral')).toBe(true);
      expect(textLeaksWord('She has an ephemeral idea', 'Ephemeral')).toBe(true);
      // Substrings inside unrelated words do NOT leak
      expect(textLeaksWord('We relied on an unreliable source', 'reliable')).toBe(false);
      expect(textLeaksWord('A completely different sentence', 'ephemeral')).toBe(false);
    });

    it('creates safe cloze deletion from examples without leaking target word', () => {
      const prompt = buildAdaptiveReviewPrompt({
        word: { word: 'serendipity', definition: 'finding good things without looking' },
        examples: [{ sentence: 'We found the place by pure serendipity yesterday.' }],
      });
      expect(prompt.type).toBe('CLOZE');
      expect(prompt.text).toBe('We found the place by pure ______ yesterday.');
      expect(prompt.text).not.toContain('serendipity');
    });

    it('falls back to translation when example cloze still leaks or is absent', () => {
      const prompt = buildAdaptiveReviewPrompt({
        word: {
          word: 'resilient',
          definition: 'able to recover quickly',
          translation: 'kiên cường, bền bỉ',
        },
        examples: [],
      });
      expect(prompt.type).toBe('RECALL');
      expect(prompt.text).toBe('kiên cường, bền bỉ');
    });

    it('falls back to definition when translation leaks target word', () => {
      const prompt = buildAdaptiveReviewPrompt({
        word: {
          word: 'facade',
          definition: 'an outward appearance that conceals reality',
          translation: 'facade bên ngoài', // leaks target word!
        },
      });
      expect(prompt.type).toBe('RECALL');
      expect(prompt.text).toBe('an outward appearance that conceals reality');
    });

    it('falls back to neutral prompt when both translation and definition leak target word', () => {
      const prompt = buildAdaptiveReviewPrompt({
        word: {
          word: 'loophole',
          definition: 'a loophole in the regulations', // leaks target!
          translation: 'loophole luật', // leaks target!
        },
      });
      expect(prompt.type).toBe('RECALL');
      expect(prompt.text).toBe('What word matches this meaning?');
    });
  });

  describe('Effective Ratings Calculation (AC-02)', () => {
    it('forces AGAIN on INCORRECT recall regardless of self-rating', () => {
      const ratings = calculateEffectiveRatings({
        recallResult: 'INCORRECT',
        recallScore: 0,
        outputMethod: null,
        outputScore: null,
      });
      expect(ratings.AGAIN).toBe('AGAIN');
      expect(ratings.HARD).toBe('AGAIN');
      expect(ratings.GOOD).toBe('AGAIN');
      expect(ratings.EASY).toBe('AGAIN');
    });

    it('caps effective rating at HARD on TYPO recall without scored output', () => {
      const ratings = calculateEffectiveRatings({
        recallResult: 'TYPO',
        recallScore: 70,
        outputMethod: null,
        outputScore: null,
      });
      expect(ratings.AGAIN).toBe('AGAIN');
      expect(ratings.HARD).toBe('HARD');
      expect(ratings.GOOD).toBe('HARD');
      expect(ratings.EASY).toBe('HARD');
    });

    it('allows selected rating on EXACT recall without scored output', () => {
      const ratings = calculateEffectiveRatings({
        recallResult: 'EXACT',
        recallScore: 100,
        outputMethod: null,
        outputScore: null,
      });
      expect(ratings.AGAIN).toBe('AGAIN');
      expect(ratings.HARD).toBe('HARD');
      expect(ratings.GOOD).toBe('GOOD');
      expect(ratings.EASY).toBe('EASY');
    });

    it('blends recall and output scores when scored AI output is present', () => {
      const ratings = calculateEffectiveRatings({
        recallResult: 'EXACT',
        recallScore: 100,
        outputMethod: 'AI',
        outputScore: 30, // low output score
      });
      // 100 * 0.5 + 30 * 0.5 = 65. With GOOD modifier 0 -> score 65 -> GOOD. With AGAIN modifier -10 -> score 55 -> HARD.
      expect(ratings.AGAIN).toBe('HARD');
      expect(ratings.GOOD).toBe('GOOD');
    });
  });
});
