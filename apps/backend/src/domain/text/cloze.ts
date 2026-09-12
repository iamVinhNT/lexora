import { normalizeWord } from './normalization.js';

export { normalizeWord, checkAnswer, type CheckAnswerResult } from './normalization.js';

/**
 * Creates a cloze deletion for a given sentence by replacing whole-word
 * occurrences of targetWord with a blank placeholder (default '______').
 * Matching is case-insensitive and respects word boundaries so surrounding
 * punctuation is preserved and substring matches in unrelated words are avoided.
 */
export function createCloze(
  sentence: string,
  targetWord: string,
  blank: string = '______'
): string {
  if (!sentence || typeof sentence !== 'string') return '';
  if (!targetWord || typeof targetWord !== 'string') return sentence;

  const cleanTarget = normalizeWord(targetWord);
  if (!cleanTarget) return sentence;

  // Escape special regex characters in the target word
  const escaped = cleanTarget.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Support both straight and curly apostrophes in sentence matching
  const pattern = escaped.replace(/'/g, "['\\u2019]");
  // Use unicode lookaround word boundaries so contractions (with apostrophes) are matched as complete words
  const regex = new RegExp(`(?<![\\p{L}\\p{N}'\\u2019])${pattern}(?![\\p{L}\\p{N}'\\u2019])`, 'gui');

  // Use replacer function to prevent special replacement patterns ($&, $', etc.) in blank from expanding
  return sentence.replace(regex, () => blank);
}
