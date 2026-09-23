/**
 * @file vocabulary.api.ts
 * @description Typed vocabulary endpoint functions and response contracts.
 */
import { apiFetch } from './client';

export type WordFamily = { id: string; relationship: string; word: Pick<Word, 'id' | 'word' | 'definition' | 'phonetic' | 'partOfSpeech'> };
export type Collocation = { id: string; phrase: string };
export type Example = { id: string; sentence: string; translation?: string | null; source?: string | null };
export type WordTag = { id: string; name: string; createdAt: string };
export type LearningProgress = { status: string; recognitionScore: number; recallScore: number; productionScore: number; lastStudiedAt?: string | null; updatedAt?: string | null };
export type ReviewState = { interval: number; easeFactor: number; repetitions: number; lapses: number; dueAt: string; lastReviewedAt?: string | null };

export type Word = {
  id: string;
  word: string;
  phonetic?: string | null;
  partOfSpeech?: string | null;
  definition: string;
  translation?: string | null;
  difficulty?: string | null;
  createdAt?: string;
  updatedAt?: string | null;
  tags: WordTag[];
  collocations: Collocation[];
  examples: Example[];
  wordFamilies: WordFamily[];
  contexts: Array<{ id: string; title: string; content?: string }>;
  learningProgress?: LearningProgress | null;
  reviewState?: ReviewState | null;
};

export type WordList = { total: number; page: number; limit: number; items: Word[] };
export type WordQuery = { search?: string; difficulty?: string; status?: string; tag?: string; page?: number; limit?: number };
export type CollocationInput = string | { phrase: string };
export type ExampleInput = string | { sentence: string; translation?: string | null; source?: string | null };
export type WordPayload = {
  word: string;
  definition: string;
  phonetic?: string | null;
  partOfSpeech?: string | null;
  translation?: string | null;
  difficulty?: string | null;
  tags?: string[];
  collocations?: CollocationInput[];
  examples?: ExampleInput[];
  wordFamilies?: Array<{ relatedWordId: string; relationship: string }>;
};

export function listWords(query: WordQuery = {}, signal?: AbortSignal) {
  return apiFetch<WordList>('/api/words', { query, signal });
}

export function getWord(id: string, signal?: AbortSignal) {
  return apiFetch<Word>(`/api/words/${id}`, { signal });
}

export function createWord(payload: WordPayload) {
  return apiFetch<Word>('/api/words', { method: 'POST', body: payload });
}

export function updateWord(id: string, payload: Partial<WordPayload>) {
  return apiFetch<Word>(`/api/words/${id}`, { method: 'PATCH', body: payload });
}

export function deleteWord(id: string) {
  return apiFetch<{ id: string; deleted: true }>(`/api/words/${id}`, { method: 'DELETE' });
}
