/**
 * @file types.ts
 * @description Versioned data contract for the bundled grammar curriculum and editorial state.
 */
export type GrammarLevel = '0' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type PublicationStatus = 'draft' | 'published' | 'unpublished';
export type ReviewStatus = 'pending' | 'approved';

export interface GrammarSource {
  id: string;
  title: string;
  url: string;
}

export interface EditorialReview {
  status: ReviewStatus;
  reviewer: string | null;
  reviewedAt: string | null;
}
/** Project-owner release approval; not an independent subject-matter or copyright review. */
export const ownerApproval: EditorialReview = {
  status: 'approved', reviewer: 'Lexora project owner', reviewedAt: '2026-09-28T23:41:45Z',
};

export interface GrammarExample {
  english: string;
  vietnamese: string;
}

export interface GrammarContrast {
  form: string;
  whyFits: string;
  whyNot: string;
}
export interface GrammarTeachingGuide {
  pattern: string;
  whenToUse: string[];
  signalWords: string[];
  check: string[];
}


export interface GrammarAnswer {
  text: string;
  rationale: string;
}

export interface GrammarOption extends GrammarAnswer {
  correct: boolean;
}

export interface GrammarExercise {
  id: string;
  prompt: string;
  options: GrammarOption[];
  acceptedAnswers: GrammarAnswer[];
}

export interface GrammarLesson {
  id: string;
  revisionId: string;
  revision: string;
  title: string;
  objective: string;
  prerequisiteIds: string[];
  coverage: string[];
  explanation: string;
  examples: GrammarExample[];
  contrasts: GrammarContrast[];
  commonMistakes: string[];
  summary: string;
  exercises: GrammarExercise[];
  sources: GrammarSource[];
  review: EditorialReview;
}

export interface GrammarStage {
  id: string;
  level: GrammarLevel;
  title: string;
  publicationStatus: PublicationStatus;
  prerequisiteIds: string[];
  plannedCoverage: string[];
  lessons: GrammarLesson[];
}

export interface GrammarCurriculum {
  version: string;
  stages: GrammarStage[];
}

export interface CurriculumIssue {
  code: string;
  path: string;
  message: string;
}
