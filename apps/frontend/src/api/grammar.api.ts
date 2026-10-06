/**
 * @file grammar.api.ts
 * @description Typed read and exercise-submission contracts for the published grammar course.
 */
import { apiFetch } from './client';

export type GrammarLessonProgress = {
  lessonId: string;
  revisionId: string;
  revision: string;
  lastPosition: number;
  isComplete: boolean;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type GrammarExerciseKind = 'choice' | 'gap' | 'transform' | 'correction';

export type GrammarFirstAttemptAccuracy = {
  correct: number;
  total: number;
  percent: number | null;
};

export type GrammarLegacyProgress = {
  completedLessons: number;
  totalLessons: number;
  attemptsPreserved: boolean;
};

export type GrammarLessonSummary = {
  id: string;
  revisionId: string;
  revision: string;
  title: string;
  objective: string;
  coverage: string[];
  progress: GrammarLessonProgress | null;
  firstAttemptAccuracy: GrammarFirstAttemptAccuracy;
};

export type GrammarStage = {
  id: string;
  level: string;
  title: string;
  lessons: GrammarLessonSummary[];
};

export type GrammarCourse = {
  isComplete: boolean;
  stages: GrammarStage[];
  nextLessonId: string | null;
  coverage: string[];
  legacyProgress?: GrammarLegacyProgress | null;
};

export type GrammarLessonDetail = {
  id: string;
  revisionId: string;
  revision: string;
  title: string;
  objective: string;
  coverage: string[];
  context: {
    english: string;
    vietnamese: string;
  };
  explanation: string;
  guide: {
    pattern: string;
    whenToUse: string[];
    signalWords: string[];
    check: string[];
  };
  examples: Array<{ english: string; vietnamese: string }>;
  contrasts: Array<{ form: string; whyFits: string; whyNot: string }>;
  commonMistakes: string[];
  summary: string;
  sources: Array<{ id: string; title: string; url: string }>;
  exercises: Array<{
    id: string;
    kind: GrammarExerciseKind;
    prompt: string;
    options: Array<{ text: string }>;
  }>;
  outputPrompts: Array<{
    id: string;
    prompt: string;
    checks: string[];
  }>;
};

export type GrammarLesson = {
  lesson: GrammarLessonDetail;
  progress: GrammarLessonProgress | null;
  nextLessonId: string | null;
  firstAttemptAccuracy: GrammarFirstAttemptAccuracy;
};

export type GrammarAnswer = { type: 'choice' | 'text'; text: string };

export type GrammarAnswerSubmission = {
  requestId: string;
  exerciseId: string;
  answer: GrammarAnswer;
  studyTaskId?: string;
};

export type GrammarAnswerResult = {
  attempt: {
    id: string;
    lessonId: string;
    revisionId: string;
    revision: string;
    exerciseId: string;
    requestId: string;
    answer: GrammarAnswer;
    isCorrect: boolean;
    feedback: string;
    createdAt: string;
    studyTaskId: string | null;
    completedLesson: boolean;
  };
  progress: GrammarLessonProgress;
  nextLessonId: string | null;
  firstAttemptAccuracy?: GrammarFirstAttemptAccuracy | null;
};

export type GrammarTutorAnswer = { explanation: string; contrast: string };

export function askGrammarTutor(lessonId: string, question: string) {
  return apiFetch<GrammarTutorAnswer>(`/api/grammar/${encodeURIComponent(lessonId)}/tutor`, {
    method: 'POST',
    body: { question },
  });
}

export function getGrammarCourse(signal?: AbortSignal) {
  return apiFetch<GrammarCourse>('/api/grammar', { signal });
}

export function getGrammarLesson(lessonId: string, signal?: AbortSignal) {
  return apiFetch<GrammarLesson>(`/api/grammar/${encodeURIComponent(lessonId)}`, { signal });
}

export function submitGrammarAnswer(lessonId: string, submission: GrammarAnswerSubmission) {
  return apiFetch<GrammarAnswerResult>(`/api/grammar/${encodeURIComponent(lessonId)}/answers`, {
    method: 'POST',
    body: submission,
  });
}
