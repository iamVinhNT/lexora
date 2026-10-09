/**
 * @file ai-history-budget.ts
 * @description Conservative UTF-8 token estimation, serialized payload measurement,
 * summarizer input budgeting, and complete turn pair assembly.
 */
export const PROMPT_MAX_INPUT_TOKENS = 12000;
export const PROMPT_MAX_INPUT_BYTES = 36000;
export const OUTPUT_RESERVE_TOKENS = 2000;
export const OUTPUT_RESERVE_BYTES = 6000;
export const COMPACTION_THRESHOLD_TOKENS = 6000;
const EMPTY_PAIR = [{ role: 'user', content: '' }, { role: 'assistant', content: '' }];
export const HISTORY_PAIR_FRAMING_BYTES = Buffer.byteLength(JSON.stringify(EMPTY_PAIR), 'utf8') - 5;

export interface TurnCandidate {
  id: string;
  sequence: number;
  userContent: string;
  assistantReply: string;
}

/**
 * Honest conservative token estimator using UTF-8 byte length.
 * Uses ~2 bytes/token as a practical heuristic for unknown multilingual tokenizers.
 * Does not assume an invented chars/4 guarantee.
 */
export function estimateTokens(text: string): number {
  if (!text) return 0;
  return Math.ceil(Buffer.byteLength(text, 'utf8') / 2);
}

/**
 * Measures the exact serialized JSON payload and system prompt overhead.
 * Accounts for JSON escaping, field names, and structural framing.
 */
export function measureSerializedPrompt(systemPrompt: string, promptPayload: unknown): { tokens: number; bytes: number } {
  const json = JSON.stringify(promptPayload ?? null);
  const totalBytes = Buffer.byteLength(systemPrompt, 'utf8') + Buffer.byteLength(json, 'utf8');
  return {
    tokens: Math.ceil(totalBytes / 2),
    bytes: totalBytes,
  };
}

/**
 * Selects as many whole turns from oldest forward as fit within the summarizer input budget.
 * Budgets the entire serialized request payload plus system prompt and output reserve.
 */
export function budgetSummarizerBatch(params: {
  previousSummary: unknown;
  turns: TurnCandidate[];
  systemPrompt: string;
  maxBatchCount?: number;
}): TurnCandidate[] {
  const maxAllowedTokens = PROMPT_MAX_INPUT_TOKENS - OUTPUT_RESERVE_TOKENS;
  const maxAllowedBytes = PROMPT_MAX_INPUT_BYTES - OUTPUT_RESERVE_BYTES;
  const maxCount = params.maxBatchCount ?? 20;
  const batch: TurnCandidate[] = [];

  for (const turn of params.turns) {
    if (batch.length >= maxCount) break;

    const candidateBatch = [...batch, turn];
    const testPayload = JSON.stringify({
      previousSummary: params.previousSummary,
      turns: candidateBatch.map((t) => ({
        id: t.id,
        sequence: t.sequence,
        user: t.userContent,
        assistant: t.assistantReply,
      })),
    });

    const totalBytes = Buffer.byteLength(params.systemPrompt, 'utf8') + Buffer.byteLength(testPayload, 'utf8');
    if (Math.ceil(totalBytes / 2) > maxAllowedTokens || totalBytes > maxAllowedBytes) {
      break;
    }
    batch.push(turn);
  }

  return batch;
}

/**
 * Budgets complete turns from newest to oldest.
 * Ensures turns are never split between user and assistant.
 */
export function selectCompleteTurnsUnderBudget(params: {
  turns: TurnCandidate[];
  systemPrompt: string;
  basePromptTemplate: Record<string, unknown>;
  maxInputTokens?: number;
  maxInputBytes?: number;
}): {
  selectedTurns: TurnCandidate[];
  clipped: boolean;
} {
  const maxTokens = params.maxInputTokens ?? PROMPT_MAX_INPUT_TOKENS;
  const maxBytes = params.maxInputBytes ?? PROMPT_MAX_INPUT_BYTES;

  let totalBytes = measureSerializedPrompt(params.systemPrompt, { ...params.basePromptTemplate, history: [] }).bytes;
  const included: TurnCandidate[] = [];
  let clipped = false;

  // Add from newest backwards as complete pairs
  for (let i = params.turns.length - 1; i >= 0; i--) {
    const turn = params.turns[i];
    const pairBytes = Buffer.byteLength(JSON.stringify([
      { role: 'user', content: turn.userContent },
      { role: 'assistant', content: turn.assistantReply },
    ]), 'utf8') - 2 + (included.length > 0 ? 1 : 0);
    const candidateBytes = totalBytes + pairBytes;
    if (Math.ceil(candidateBytes / 2) <= maxTokens && candidateBytes <= maxBytes) {
      totalBytes = candidateBytes;
      included.unshift(turn);
    } else {
      clipped = true;
    }
  }

  return { selectedTurns: included, clipped };
}

export function assembleHistoryPrompt<T extends Record<string, unknown>>(params: {
  systemPrompt: string;
  basePrompt: T;
  turns: TurnCandidate[];
  memory?: unknown;
  evidence: unknown[];
}) {
  const history: Array<{ role: 'user' | 'assistant'; content: string }> = [];
  const prompt: T & { history: typeof history; memory?: unknown; evidence?: unknown[] } = { ...params.basePrompt, history };
  let limited = false;
  const fits = (candidate: unknown) => {
    const measured = measureSerializedPrompt(params.systemPrompt, candidate);
    return measured.tokens <= PROMPT_MAX_INPUT_TOKENS && measured.bytes <= PROMPT_MAX_INPUT_BYTES;
  };
  if (params.memory !== undefined) {
    if (fits({ ...prompt, memory: params.memory })) prompt.memory = params.memory;
    else limited = true;
  }
  const { selectedTurns, clipped } = selectCompleteTurnsUnderBudget({
    turns: params.turns,
    systemPrompt: params.systemPrompt,
    basePromptTemplate: prompt,
  });
  limited ||= clipped;
  for (const turn of selectedTurns) {
    history.push({ role: 'user', content: turn.userContent }, { role: 'assistant', content: turn.assistantReply });
  }
  const evidence: unknown[] = [];
  for (const item of params.evidence) {
    if (fits({ ...prompt, evidence: [...evidence, item] })) evidence.push(item);
    else limited = true;
  }
  if (evidence.length > 0) prompt.evidence = evidence;
  return { prompt, clipped: limited, selectedTurns };
}
