import { describe, it, expect } from 'vitest';
import { normalizeWord, checkAnswer } from '../../src/domain/text/normalization.js';
import { createCloze } from '../../src/domain/text/cloze.js';

describe('Text Normalization and Cloze Utilities', () => {
  describe('normalizeWord', () => {
    it('canonicalizes words by trimming, lowercasing, and stripping punctuation', () => {
      expect(normalizeWord('  Reliable  ')).toBe('reliable');
      expect(normalizeWord('SCALABLE')).toBe('scalable');
      expect(normalizeWord('word.')).toBe('word');
      expect(normalizeWord('!Reliable?')).toBe('reliable');
      expect(normalizeWord('"efficient"')).toBe('efficient');
      expect(normalizeWord('...maintain...')).toBe('maintain');
    });

    it('handles words embedded with quotes or parentheses', () => {
      expect(normalizeWord('"(significant)"')).toBe('significant');
      expect(normalizeWord('architecture,')).toBe('architecture');
      expect(normalizeWord('state-of-the-art')).toBe('state-of-the-art');
    });

    it('preserves internal apostrophes in contractions and possessives while trimming leading/trailing quotes', () => {
      expect(normalizeWord("don't")).toBe("don't");
      expect(normalizeWord("can't")).toBe("can't");
      expect(normalizeWord("won't")).toBe("won't");
      expect(normalizeWord("it's")).toBe("it's");
      expect(normalizeWord("user's")).toBe("user's");
      expect(normalizeWord("don\u2019t")).toBe("don't"); // curly apostrophe
      expect(normalizeWord("'don't'")).toBe("don't"); // leading/trailing single quotes
      expect(normalizeWord('"don\'t"')).toBe("don't"); // leading/trailing double quotes
    });

    it('returns empty string for empty input, spaces, or non-string input', () => {
      expect(normalizeWord('')).toBe('');
      expect(normalizeWord('   ')).toBe('');
      expect(normalizeWord(undefined as unknown as string)).toBe('');
      expect(normalizeWord(null as unknown as string)).toBe('');
    });
  });

  describe('createCloze', () => {
    it('replaces target word with ______ (case-insensitive)', () => {
      const sentence = 'The system needs to be reliable.';
      const cloze = createCloze(sentence, 'reliable');
      expect(cloze).toBe('The system needs to be ______.');
    });

    it('handles case-insensitive target word matching', () => {
      const sentence = 'Reliable systems are essential for business.';
      const cloze = createCloze(sentence, 'reliable');
      expect(cloze).toBe('______ systems are essential for business.');
    });

    it('preserves surrounding punctuation like commas, periods, quotes', () => {
      const sentence = 'A fast, reliable, and scalable backend.';
      const cloze = createCloze(sentence, 'reliable');
      expect(cloze).toBe('A fast, ______, and scalable backend.');
    });

    it('replaces multiple occurrences of the target word', () => {
      const sentence = 'A reliable worker produces reliable results.';
      const cloze = createCloze(sentence, 'reliable');
      expect(cloze).toBe('A ______ worker produces ______ results.');
    });

    it('only replaces exact word matches, not substrings inside other words', () => {
      const sentence = 'We relied on an unreliable source.';
      const cloze = createCloze(sentence, 'reliable');
      // "unreliable" should NOT be partially replaced
      expect(cloze).toBe('We relied on an unreliable source.');
    });

    it('handles punctuation attached to the targetWord argument cleanly', () => {
      const sentence = 'The solution must be robust.';
      const cloze = createCloze(sentence, 'robust.');
      expect(cloze).toBe('The solution must be ______.');
    });

    it('preserves quotes and exclamation marks surrounding the cloze', () => {
      const sentence = 'He shouted: "Reliable!" to the team.';
      const cloze = createCloze(sentence, 'reliable');
      expect(cloze).toBe('He shouted: "______!" to the team.');
    });

    it('supports custom blank placeholder', () => {
      const sentence = 'The word is test.';
      const cloze = createCloze(sentence, 'test', '[blank]');
      expect(cloze).toBe('The word is [blank].');
    });

    it('cloze-replaces words with contractions and possessives', () => {
      const sentence1 = "I don't know.";
      const cloze1 = createCloze(sentence1, "don't");
      expect(cloze1).toBe('I ______ know.');

      const sentence2 = "It's the user's computer.";
      const cloze2 = createCloze(sentence2, "user's");
      expect(cloze2).toBe("It's the ______ computer.");

      const sentence3 = 'I won’t give up.';
      const cloze3 = createCloze(sentence3, "won't");
      expect(cloze3).toBe('I ______ give up.');
    });

    it('handles custom blanks containing special replacement patterns like $& without expanding them', () => {
      const sentence = 'The system needs to be reliable.';
      const cloze1 = createCloze(sentence, 'reliable', '$blank$');
      expect(cloze1).toBe('The system needs to be $blank$.');

      const cloze2 = createCloze(sentence, 'reliable', '[___$&___]');
      expect(cloze2).toBe('The system needs to be [___$&___].');
    });

    it('returns original sentence if empty target or sentence', () => {
      expect(createCloze('', 'word')).toBe('');
      expect(createCloze('Hello world', '')).toBe('Hello world');
    });
  });

  describe('checkAnswer', () => {
    it('detects exact match irrespective of casing, leading/trailing whitespace and punctuation', () => {
      const result1 = checkAnswer('reliable', 'reliable');
      expect(result1.exact).toBe(true);
      expect(result1.correct).toBe(true);
      expect(result1.almostCorrect).toBe(false);
      expect(result1.distance).toBe(0);

      const result2 = checkAnswer('  Reliable!  ', 'reliable');
      expect(result2.exact).toBe(true);
      expect(result2.correct).toBe(true);
      expect(result2.almostCorrect).toBe(false);
    });

    it('detects typos as almostCorrect when distance is 1 (edit distance)', () => {
      // 1 transposition / deletion / insertion / substitution
      const result1 = checkAnswer('reliabel', 'reliable');
      expect(result1.exact).toBe(false);
      expect(result1.almostCorrect).toBe(true);
      expect(result1.correct).toBe(false);

      const result2 = checkAnswer('scalabel', 'scalable');
      expect(result2.exact).toBe(false);
      expect(result2.almostCorrect).toBe(true);

      const result3 = checkAnswer('relible', 'reliable'); // deletion
      expect(result3.exact).toBe(false);
      expect(result3.almostCorrect).toBe(true);

      const result4 = checkAnswer('reliabel!', 'reliable'); // typo with punctuation
      expect(result4.exact).toBe(false);
      expect(result4.almostCorrect).toBe(true);
    });

    it('does not flag completely wrong answers as almostCorrect', () => {
      const result = checkAnswer('completelywrong', 'reliable');
      expect(result.exact).toBe(false);
      expect(result.almostCorrect).toBe(false);
      expect(result.correct).toBe(false);
      expect(result.distance).toBeGreaterThan(2);
    });

    it('does not treat single letter differences in very short words (<=3 chars) as typos', () => {
      // In short words like "cat" vs "cot", a single letter change is a different word, not a typo
      const result = checkAnswer('cot', 'cat');
      expect(result.exact).toBe(false);
      expect(result.almostCorrect).toBe(false);
      expect(result.correct).toBe(false);
    });

    it('handles empty input gracefully', () => {
      const result = checkAnswer('', 'word');
      expect(result.exact).toBe(false);
      expect(result.almostCorrect).toBe(false);
      expect(result.correct).toBe(false);
    });
  });
});
