/**
 * @file output-evaluation.ts
 * @description Local, presentation-neutral evaluation for learner output sentences.
 */

import { normalizeWord } from '../text/normalization.js';

export type OutputCode = 'EMPTY' | 'TOO_SHORT' | 'TARGET_MISSING';
export type OutputEvaluation = { valid: boolean; codes: OutputCode[] };

export function evaluateOutput(answer: string, target: string): OutputEvaluation {
  if (!answer.trim()) return { valid: false, codes: ['EMPTY'] };
  const tokens = answer.trim().split(/\s+/);
  const normalizedTarget = normalizeWord(target);
  const normalizedTokens = tokens.map(normalizeWord);
  const targetTokens = normalizedTarget.split(' ');
  const targetPresent = targetTokens.length === 1
    ? normalizedTokens.includes(normalizedTarget)
    : normalizedTokens.some((_, index) => targetTokens.every((token, offset) => normalizedTokens[index + offset] === token));
  const codes: OutputCode[] = [];
  if (tokens.length < 4) codes.push('TOO_SHORT');
  if (tokens.length >= 4 && !targetPresent) codes.push('TARGET_MISSING');
  return { valid: codes.length === 0, codes };
}
