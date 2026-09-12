export interface CheckAnswerResult {
  correct: boolean;
  exact: boolean;
  almostCorrect: boolean;
  distance: number;
  normalizedInput: string;
  normalizedTarget: string;
}

/**
 * Canonicalizes words:
 * - Trims leading/trailing whitespace
 * - Converts to lowercase
 * - Normalizes curly apostrophes (\u2019, \u2018) to straight apostrophe (')
 * - Preserves internal apostrophes in contractions and possessives (e.g. don't, user's)
 * - Strips punctuation marks (preserving internal letters/numbers/spaces/hyphens/apostrophes)
 * - Removes leading/trailing hyphens, quotes, and apostrophes
 */
export function normalizeWord(word: string): string {
  if (typeof word !== 'string') return '';
  return word
    .trim()
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")    // Normalize curly single quotes/apostrophes
    .replace(/[^\p{L}\p{N}\s'-]/gu, '') // Strip punctuation except letters, numbers, whitespace, apostrophes, hyphens
    .replace(/^['\-]+|['\-]+$/g, '')    // Strip leading and trailing hyphens and quotes/apostrophes
    .replace(/\s+/g, ' ')               // Collapse multiple spaces
    .trim();
}

/**
 * Calculates Damerau-Levenshtein distance between two strings,
 * accounting for insertions, deletions, substitutions, and adjacent transpositions.
 */
export function damerauLevenshteinDistance(source: string, target: string): number {
  const m = source.length;
  const n = target.length;
  if (m === 0) return n;
  if (n === 0) return m;

  const d: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) d[i][0] = i;
  for (let j = 0; j <= n; j++) d[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = source[i - 1] === target[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1,       // deletion
        d[i][j - 1] + 1,       // insertion
        d[i - 1][j - 1] + cost // substitution
      );

      // Transposition check
      if (
        i > 1 &&
        j > 1 &&
        source[i - 1] === target[j - 2] &&
        source[i - 2] === target[j - 1]
      ) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }

  return d[m][n];
}

/**
 * Compares user input against the target word.
 * Detects exact match or single-error typo (almostCorrect).
 */
export function checkAnswer(userInput: string, targetWord: string): CheckAnswerResult {
  const normalizedInput = normalizeWord(userInput);
  const normalizedTarget = normalizeWord(targetWord);

  if (!normalizedInput || !normalizedTarget) {
    const distance = Math.max(normalizedInput.length, normalizedTarget.length);
    return {
      correct: false,
      exact: false,
      almostCorrect: false,
      distance,
      normalizedInput,
      normalizedTarget,
    };
  }

  if (normalizedInput === normalizedTarget) {
    return {
      correct: true,
      exact: true,
      almostCorrect: false,
      distance: 0,
      normalizedInput,
      normalizedTarget,
    };
  }

  const distance = damerauLevenshteinDistance(normalizedInput, normalizedTarget);

  // For words with at least 4 characters, a distance of 1 is treated as a typo (almostCorrect)
  const isTypo = normalizedTarget.length >= 4 && distance === 1;

  return {
    correct: false,
    exact: false,
    almostCorrect: isTypo,
    distance,
    normalizedInput,
    normalizedTarget,
  };
}
