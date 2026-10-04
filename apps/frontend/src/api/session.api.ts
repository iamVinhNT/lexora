/**
 * @file session.api.ts
 * @description Typed API contracts and endpoint functions for server-owned learning sessions.
 */
import { apiFetch } from './client';

export const SESSION_MODES = ['new_words', 'context', 'topic', 'weak_words', 'daily_plan'] as const;
export type SessionMode = (typeof SESSION_MODES)[number];
export const SESSION_STEPS = ['CONTEXT', 'UNDERSTAND', 'RECALL', 'OUTPUT', 'ASSESS'] as const;
export type SessionStep = (typeof SESSION_STEPS)[number];
export const ASSESSMENT_RATINGS = ['AGAIN', 'HARD', 'GOOD', 'EASY'] as const;
export type AssessmentRating = (typeof ASSESSMENT_RATINGS)[number];

export type LearningCursor = {
  phase: 'ENCODE' | 'RETRIEVE' | 'COMPLETE'; groupIndex: number; groupCount: number; groupSize: number;
  itemIndex: number; sessionPosition: number; step: SessionStep | null; itemId: string | null; wordId: string | null; attemptNumber: 1 | 2 | null;
};
export type LearningAttempt = { id: string; sessionItemId: string; type: 'RECALL' | 'OUTPUT'; attemptNumber: 1 | 2; answer: string; result: string; performanceScore: number; feedbackCodes?: string[] | null; explanation?: string | null; suggestion?: string | null; source?: string };
export type LearningFeedback = { outcome: string; attemptNumber: 1 | 2 | null; canRetry: boolean; score?: number; explanation?: string; suggestion?: string; hint?: { firstLetter: string; letterCount: number }; revealedAnswer?: string; codes?: string[] };
export type SessionStartPayload = { mode: SessionMode; count: number; contextId?: string; topicId?: string; studyTaskId?: string };
export type LearningOptions = { contexts: Array<{ id: string; title: string; wordCount: number }>; topics: Array<{ id: string; name: string; wordCount: number }>; availability: { newWords: number; weakWords: number; dueWords: number } };
export type SessionExample = { sentence?: string | null; translation?: string | null } & Record<string, unknown>;
export type SessionCollocation = { phrase?: string | null; collocation?: string | null } & Record<string, unknown>;
export type SessionWord = { id: string; word: string; headword?: string | null; definition?: string | null; phonetic?: string | null; pronunciation?: string | null; partOfSpeech?: string | null; translation?: string | null; contextSentence?: string | null; examples?: SessionExample[]; collocations?: SessionCollocation[] };
export type LearningSessionItem = { id: string; sessionId: string; wordId: string; position?: number; groupIndex?: number; completedStep: SessionStep | null; recallResult?: string | null; outputSentence?: string | null; reviewRating?: AssessmentRating | null; clozeSentence?: string | null; attempts?: LearningAttempt[]; feedback?: LearningFeedback | null; word: SessionWord };
export type LearningSummary = { totalWords: number; recallFirstTry: number; recallSecondTry: number; recallFailed: number; outputValid: number; outputInvalid: number; legacyUnknown: number };
export type LearningSession = { id: string; sessionType?: SessionMode; mode?: SessionMode; totalWords: number; startedAt: string; completedAt?: string | null; status?: 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED' | string; studyTaskId: string | null; cursor?: LearningCursor; items: LearningSessionItem[]; summary?: LearningSummary };
export type LearningSessionOverview = { activeSession: LearningSession | null; latestSession: LearningSession | null; sessions: LearningSession[] };
export type SubmitStepPayload = { requestId: string; wordId: string; step: SessionStep; answer?: string; assessmentRating?: AssessmentRating };
export type LearningActionResult = { item: LearningSessionItem; cursor: LearningCursor; feedback: LearningFeedback | null };

export function getLearningOptions() { return apiFetch<LearningOptions>('/api/learning/options'); }
export function getLearningSession() { return apiFetch<LearningSessionOverview>('/api/learning/session'); }
export function startLearningSession(payload: SessionStartPayload) { return apiFetch<LearningSession>('/api/learning/session', { method: 'POST', body: payload }); }
export function getLearningSessionById(id: string) { return apiFetch<LearningSession>(`/api/learning/session/${id}`); }
export function submitLearningSessionStep(id: string, payload: SubmitStepPayload) { return apiFetch<LearningActionResult>(`/api/learning/session/${id}/step`, { method: 'POST', body: payload }); }
export function completeLearningSession(id: string) { return apiFetch<LearningSession>(`/api/learning/session/${id}/complete`, { method: 'POST' }); }
export function abandonLearningSession(id: string) { return apiFetch<LearningSession>(`/api/learning/session/${id}/abandon`, { method: 'POST' }); }
