/**
 * @file prompt.ts
 * @description Safe prompt masking, leak prevention, and effective review ratings calculation.
 */
import { normalizeWord } from '../text/normalization.js';
import { createCloze } from '../text/cloze.js';
import { deriveEffectiveRating } from '../learning/scoring.js';
import type { ReviewRating } from '../../schemas/review.schema.js';
import type { ReviewAttemptRow } from '../../schemas/review-attempt.schema.js';

export function textLeaksWord(text: string, targetWord: string): boolean {
  if (!text || !targetWord) return false;
  const cleanTarget = normalizeWord(targetWord);
  if (!cleanTarget) return false;
  const escaped = cleanTarget.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = escaped.replace(/'/g, "['\\u2019]");
  const regex = new RegExp(`(?<![\\p{L}\\p{N}'\\u2019])${pattern}(?![\\p{L}\\p{N}'\\u2019])`, 'gui');
  return regex.test(text);
}

export interface BuildPromptParams {
  word: {
    word: string;
    definition: string;
    translation?: string | null;
  };
  examples?: Array<{ sentence: string }> | null;
  contexts?: Array<{ content: string; title?: string }> | null;
}

export interface PromptResult {
  type: ReviewAttemptRow['promptType'];
  text: string;
}

export function buildAdaptiveReviewPrompt(params: BuildPromptParams): PromptResult {
  const targetWord = params.word.word;

  // 1. Try example sentences or context content for a cloze
  const candidateSentences: string[] = [];
  if (params.examples) {
    for (const ex of params.examples) {
      if (ex.sentence?.trim()) candidateSentences.push(ex.sentence.trim());
    }
  }
  if (params.contexts) {
    for (const ctx of params.contexts) {
      if (ctx.content?.trim()) candidateSentences.push(ctx.content.trim());
    }
  }

  for (const sentence of candidateSentences) {
    const cloze = createCloze(sentence, targetWord);
    // Safe cloze must replace at least one occurrence and not leak remaining target
    if (cloze !== sentence && !textLeaksWord(cloze, targetWord)) {
      return { type: 'CLOZE', text: cloze };
    }
  }

  // 2. Try translation if it does not leak target
  const translation = params.word.translation?.trim();
  if (translation && !textLeaksWord(translation, targetWord)) {
    return { type: 'RECALL', text: translation };
  }

  // 3. Try definition if it does not leak target
  const definition = params.word.definition?.trim();
  if (definition && !textLeaksWord(definition, targetWord)) {
    return { type: 'RECALL', text: definition };
  }

  // 4. Safe neutral prompt without target or fabricated vocabulary
  return { type: 'RECALL', text: 'What word matches this meaning?' };
}

export interface CalculateEffectiveRatingsParams {
  recallResult: ReviewAttemptRow['recallResult'];
  recallScore: number | null;
  outputMethod: ReviewAttemptRow['outputMethod'];
  outputScore: number | null;
}

const ALL_RATINGS: readonly ReviewRating[] = ['AGAIN', 'HARD', 'GOOD', 'EASY'];

export function calculateEffectiveRatings(
  params: CalculateEffectiveRatingsParams
): Record<ReviewRating, ReviewRating> {
  const result = {} as Record<ReviewRating, ReviewRating>;

  if (!params.recallResult) {
    // Before recall evaluation: identity
    for (const r of ALL_RATINGS) result[r] = r;
    return result;
  }

  if (params.recallResult === 'INCORRECT') {
    // Wrong initial recall -> always AGAIN
    for (const r of ALL_RATINGS) result[r] = 'AGAIN';
    return result;
  }

  const hasScoredAiOutput = params.outputMethod === 'AI' && params.outputScore !== null;

  if (params.recallResult === 'TYPO') {
    // Typo -> maximum HARD
    for (const r of ALL_RATINGS) {
      if (hasScoredAiOutput) {
        const raw = deriveEffectiveRating(params.recallScore ?? 70, params.outputScore!, r);
        result[r] = raw === 'GOOD' || raw === 'EASY' ? 'HARD' : raw;
      } else {
        result[r] = r === 'GOOD' || r === 'EASY' ? 'HARD' : r;
      }
    }
    return result;
  }

  // EXACT recall
  for (const r of ALL_RATINGS) {
    if (hasScoredAiOutput) {
      result[r] = deriveEffectiveRating(params.recallScore ?? 100, params.outputScore!, r);
    } else {
      result[r] = r;
    }
  }

  return result;
}
