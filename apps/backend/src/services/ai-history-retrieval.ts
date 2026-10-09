/**
 * @file ai-history-retrieval.ts
 * @description Lexical evidence retrieval across conversation turns with Unicode NFC/NFD normalization,
 * hit-verified scoring, and bounded excerpt extraction.
 */
import type Database from 'better-sqlite3';

export const EVIDENCE_MAX_TOKENS = 1500;
export const EVIDENCE_MAX_BYTES = 4500;

export interface AiRetrievedEvidenceItem {
  turnId: string;
  sequence: number;
  userContent: string;
  assistantReply: string;
}

const STOP_WORDS: Record<string, true> = {
  a: true, an: true, the: true, is: true, are: true, was: true, were: true,
  in: true, on: true, at: true, to: true, for: true, of: true, with: true,
  by: true, from: true,
  và: true, là: true, của: true, trong: true, với: true, cho: true, về: true,
  ở: true, được: true, có: true, khi: true, các: true, những: true, một: true,
  này: true, đó: true,
};

export function extractSearchTerms(query: string): string[] {
  if (!query) return [];
  const normalized = query.normalize('NFC').toLowerCase();
  const tokens = normalized.split(/[\s,.;:!?()[\]{}"'\\/<>+=*&^%$#@~`_|-]+/);
  const terms = new Set<string>();
  for (const token of tokens) {
    if (token.length >= 2 && !STOP_WORDS[token]) {
      terms.add(token);
    }
  }
  return Array.from(terms).slice(0, 10);
}

function countTermHits(target: string, terms: string[]): number {
  let hits = 0;
  for (const term of terms) {
    let pos = 0;
    while ((pos = target.indexOf(term, pos)) !== -1) {
      hits += 1;
      pos += term.length;
    }
  }
  return hits;
}

function createExcerpt(text: string, term: string, maxChars = 400): string {
  if (text.length <= maxChars) return text;
  const lower = text.normalize('NFC').toLowerCase();
  const idx = lower.indexOf(term.toLowerCase());
  if (idx === -1) {
    return `${text.slice(0, maxChars)} ... [truncated]`;
  }
  const start = Math.max(0, idx - Math.floor(maxChars / 3));
  const end = Math.min(text.length, start + maxChars);
  const prefix = start > 0 ? '[truncated] ... ' : '';
  const suffix = end < text.length ? ' ... [truncated]' : '';
  return `${prefix}${text.slice(start, end)}${suffix}`;
}

interface DbTurnRow {
  id: string;
  sequence: number;
  user_content: string;
  assistant_reply: string;
}

/**
 * Searches completed older turns across the selected thread for lexical query matches.
 */
export function searchThreadEvidence(params: {
  sqlite: Database.Database;
  conversationId: string;
  maxSequenceExclusive: number;
  query: string;
}): AiRetrievedEvidenceItem[] {
  const terms = extractSearchTerms(params.query);
  if (terms.length === 0) return [];

  // Construct parameterized LIKE query supporting both NFC and NFD byte representations in SQLite
  const conditions: string[] = [];
  const bindings: Array<string | number> = [params.conversationId, params.maxSequenceExclusive];

  for (const term of terms) {
    const nfc = term.normalize('NFC');
    const nfd = term.normalize('NFD');
    conditions.push('(user_content LIKE ? OR assistant_reply LIKE ?)');
    bindings.push(`%${nfc}%`, `%${nfc}%`);
    if (nfc !== nfd) {
      conditions.push('(user_content LIKE ? OR assistant_reply LIKE ?)');
      bindings.push(`%${nfd}%`, `%${nfd}%`);
    }
  }

  const sql = `
    SELECT id, sequence, user_content, assistant_reply
    FROM ai_conversation_turns
    WHERE conversation_id = ? AND status = 'COMPLETED' AND assistant_reply IS NOT NULL
      AND sequence < ? AND (${conditions.join(' OR ')})
    ORDER BY sequence DESC
    LIMIT 40
  `;

  const candidateTurns = params.sqlite.prepare(sql).all(...bindings) as DbTurnRow[];
  const nfcTerms = terms.map((t) => t.normalize('NFC'));

  const scoredTurns = candidateTurns
    .map((turn) => {
      const normalizedUser = turn.user_content.normalize('NFC').toLowerCase();
      const normalizedAssistant = turn.assistant_reply.normalize('NFC').toLowerCase();
      const hits = countTermHits(normalizedUser, nfcTerms) + countTermHits(normalizedAssistant, nfcTerms);
      return {
        turn,
        hits,
        // Tie-breaker sequence ONLY applies when actual hits > 0
        score: hits > 0 ? hits * 10 + (turn.sequence / 1000) : 0,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  let currentTokens = 0;
  let currentBytes = 0;
  const results: AiRetrievedEvidenceItem[] = [];

  for (const item of scoredTurns) {
    let userContent = item.turn.user_content;
    let assistantReply = item.turn.assistant_reply;

    // If turn is oversized, extract bounded excerpt around the first matching term
    const rawBytes = Buffer.byteLength(userContent, 'utf8') + Buffer.byteLength(assistantReply, 'utf8');
    if (rawBytes > EVIDENCE_MAX_BYTES / 2) {
      userContent = createExcerpt(userContent, nfcTerms[0], 350);
      assistantReply = createExcerpt(assistantReply, nfcTerms[0], 350);
    }

    const itemBytes = Buffer.byteLength(userContent, 'utf8') + Buffer.byteLength(assistantReply, 'utf8');
    const itemTokens = Math.ceil(itemBytes / 2);

    if (currentTokens + itemTokens <= EVIDENCE_MAX_TOKENS && currentBytes + itemBytes <= EVIDENCE_MAX_BYTES) {
      results.push({
        turnId: item.turn.id,
        sequence: item.turn.sequence,
        userContent,
        assistantReply,
      });
      currentTokens += itemTokens;
      currentBytes += itemBytes;
    }
    if (results.length >= 4) break;
  }

  return results;
}
