/**
 * @file types.ts
 * @description Versioned data contract for the bundled grammar curriculum and editorial state.
 */
export type GrammarLevel = '0' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type PublicationStatus = 'draft' | 'published' | 'unpublished';
export type ReviewStatus = 'pending' | 'approved';
export type GrammarExerciseKind = 'choice' | 'gap' | 'transform' | 'correction';

export interface GrammarSource {
  id: string;
  title: string;
  url: string;
  claims: string[];
  checkedAt: string;
  provenance: 'reference-only';
}

export interface EditorialChecks {
  originalProse?: boolean;
  factualExplanation?: boolean;
  clearContrasts?: boolean;
  singleCorrectChoice?: boolean;
  validTransferExercises?: boolean;
  soundOutputPrompts?: boolean;
  referenceOnlySources?: boolean;
  [key: string]: boolean | undefined;
}

export interface EditorialReview {
  status: ReviewStatus;
  mode: 'ai-internal';
  reviewer: string | null;
  reviewedAt: string | null;
  summary?: string | null;
  checks?: EditorialChecks;
}


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
  kind: GrammarExerciseKind;
  prompt: string;
  options: GrammarOption[];
  acceptedAnswers: GrammarAnswer[];
}

export interface GrammarOutputPrompt {
  id: string;
  prompt: string;
  modelAnswer: string;
  checks: string[];
}

export interface GrammarContext {
  english: string;
  vietnamese: string;
}

export interface GrammarLesson {
  id: string;
  revisionId: string;
  revision: string;
  title: string;
  objective: string;
  prerequisiteIds: string[];
  coverage: string[];
  context: GrammarContext;
  guide: GrammarTeachingGuide;
  explanation: string;
  examples: GrammarExample[];
  contrasts: GrammarContrast[];
  commonMistakes: string[];
  summary: string;
  exercises: GrammarExercise[];
  reviewExercises: GrammarExercise[];
  outputPrompts: GrammarOutputPrompt[];
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
