/**
 * @file ai-history-budget.test.ts
 * @description Checks complete-pair retention, summary priority, and serialized context bounds.
 */
import { describe, expect, it } from 'vitest';
import { assembleHistoryPrompt, measureSerializedPrompt } from '../../src/services/ai-history-budget.js';
import { parseAndValidateSummary } from '../../src/services/ai-history-summary.js';

describe('AI history prompt budget', () => {
  it('preserves summary and latest complete turn when older escaped turns exhaust input budget', () => {
    const turns = Array.from({ length: 4 }, (_, sequence) => ({
      id: String(sequence), sequence,
      userContent: '\\'.repeat(2000), assistantReply: 'x'.repeat(4000),
    }));
    const memory = { goal: 'g'.repeat(400), userConstraints: ['c'.repeat(300), 'd'.repeat(300), 'e'.repeat(300)] };
    const evidence = Array.from({ length: 8 }, (_, sequence) => ({
      turnId: `source-${sequence}`, sequence,
      userContent: '界'.repeat(400), assistantReply: '界'.repeat(400),
    }));
    const systemPrompt = 'trusted instructions'.repeat(10);
    const basePrompt = { message: 'question'.repeat(40), context: { text: 'q'.repeat(7000) } };
    const result = assembleHistoryPrompt({ systemPrompt, basePrompt, turns, memory, evidence });
    expect(result.selectedTurns.map(turn => turn.id)).toEqual(['3']);
    expect(result.prompt.memory).toEqual(memory);
    expect(result.prompt.history).toEqual([
      { role: 'user', content: turns[3].userContent },
      { role: 'assistant', content: turns[3].assistantReply },
    ]);
    expect(result.prompt.message).toBe(basePrompt.message);
    expect(result.clipped).toBe(true);
    expect(result.prompt.evidence?.length).toBeLessThan(evidence.length);
    const measured = measureSerializedPrompt(systemPrompt, result.prompt);
    expect(measured.tokens).toBeLessThanOrEqual(12000);
    expect(measured.bytes).toBeLessThanOrEqual(36000);
  });

  it('rejects oversized provider text even when whitespace would otherwise hide its size', () => {
    const summary = {
      goal: 'Learn serendipity', userConstraints: [],
      englishContent: { examples: [], errorsAndCorrections: [] },
      keyTakeaways: [], openQuestions: [], recentCorrections: [], sourceTurnIds: ['source-turn'],
    };
    const ids = new Set(summary.sourceTurnIds);
    const raw = JSON.stringify(summary);
    expect(parseAndValidateSummary(raw, ids)?.goal).toBe('Learn serendipity');
    expect(parseAndValidateSummary(' '.repeat(5000) + raw, ids)).toBeNull();
  });
});
