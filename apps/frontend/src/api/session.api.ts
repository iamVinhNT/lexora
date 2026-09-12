/**
 * @file session.api.ts
 * @description Typed learning-session API contracts and endpoint functions.
 */
import { apiFetch } from './client';

export const SESSION_MODES = ['new_words', 'context', 'topic', 'weak_words', 'daily_plan'] as const;
export type SessionMode = (typeof SESSION_MODES)[number];

export const SESSION_STEPS = ['CONTEXT', 'UNDERSTAND', 'RECALL', 'OUTPUT', 'ASSESS'] as const;
export type SessionStep = (typeof SESSION_STEPS)[number];

export const ASSESSMENT_RATINGS = ['AGAIN', 'HARD', 'GOOD', 'EASY'] as const;
export type AssessmentRating = (typeof ASSESSMENT_RATINGS)[number];

export type SessionStartPayload = {
  mode: SessionMode;
  count: number;
  contextId?: string;
  topic?: string;
  tag?: string;
};

export type SessionExample = { sentence?: string | null; translation?: string | null } & Record<string, unknown>;
export type SessionCollocation = { phrase?: string | null; collocation?: string | null } & Record<string, unknown>;

export type SessionWord = {
  id: string;
  word: string;
  headword?: string | null;
  definition?: string | null;
  phonetic?: string | null;
  pronunciation?: string | null;
  partOfSpeech?: string | null;
  translation?: string | null;
  contextSentence?: string | null;
  examples?: SessionExample[];
  collocations?: SessionCollocation[];
};

export type LearningSessionItem = {
  id: string;
  sessionId: string;
  wordId: string;
  completedStep: SessionStep | null;
  recallResult?: string | null;
  outputSentence?: string | null;
  reviewRating?: AssessmentRating | null;
  clozeSentence?: string | null;
  word: SessionWord;
};

export type LearningSession = {
  id: string;
  sessionType?: SessionMode;
  mode?: SessionMode;
  totalWords: number;
  startedAt: string;
  completedAt?: string | null;
  status?: 'IN_PROGRESS' | 'COMPLETED' | string;
  items: LearningSessionItem[];
  newWords?: number;
  weakWords?: number;
  summary?: { totalWords?: number; recallCorrect?: number; productionSentences?: number; newWords?: number; weakWords?: number };
};

export type LearningSessionOverview = {
  activeSession: LearningSession | null;
  latestSession: LearningSession | null;
  sessions: LearningSession[];
};

export type SubmitStepPayload = {
  wordId: string;
  step: SessionStep;
  recallAnswer?: string;
  recallCorrect?: boolean;
  userSentence?: string;
  assessmentRating?: AssessmentRating;
};

export function getLearningSession() {
  return apiFetch<LearningSessionOverview>('/api/learning/session');
}

export function startLearningSession(payload: SessionStartPayload) {
  return apiFetch<LearningSession>('/api/learning/session', { method: 'POST', body: payload });
}

export function getLearningSessionById(id: string) {
  return apiFetch<LearningSession>(`/api/learning/session/${id}`);
}

export function submitLearningSessionStep(id: string, payload: SubmitStepPayload) {
  return apiFetch<LearningSessionItem>(`/api/learning/session/${id}/step`, { method: 'POST', body: payload });
}

export function completeLearningSession(id: string) {
  return apiFetch<LearningSession>(`/api/learning/session/${id}/complete`, { method: 'POST' });
}
