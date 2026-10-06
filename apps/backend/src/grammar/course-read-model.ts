/**
 * @file course-read-model.ts
 * @description Projects only reviewed, published grammar content for learner reads.
 */
import { validateGrammarCurriculum, hasVerifiedGrammarReview } from './content/validate.js';
import { LEGACY_GRAMMAR_LESSON_IDS } from './content/legacy-lesson-ids.js';
import type {
  GrammarContext,
  GrammarCurriculum,
  GrammarExerciseKind,
  GrammarLesson,
  GrammarStage,
  GrammarTeachingGuide,
} from './content/types.js';

const courseLevels = ['0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;

export type LessonSummary = Pick<
  GrammarLesson,
  'id' | 'title' | 'objective' | 'revisionId' | 'revision' | 'coverage'
>;

export type PublicGrammarSource = Pick<GrammarLesson['sources'][number], 'id' | 'title' | 'url'>;

export interface PublicGrammarExercise {
  id: string;
  kind: GrammarExerciseKind;
  prompt: string;
  options: Array<{ text: string }>;
}

export interface PublicGrammarOutputPrompt {
  id: string;
  prompt: string;
  checks: string[];
}

export interface GrammarCourseStage {
  id: string;
  level: GrammarStage['level'];
  title: string;
  lessons: LessonSummary[];
}

export interface GrammarCourse {
  isComplete: boolean;
  stages: GrammarCourseStage[];
}

export interface GrammarLessonDetail {
  id: string;
  revisionId: string;
  revision: string;
  title: string;
  objective: string;
  coverage: string[];
  context: GrammarContext;
  guide: GrammarTeachingGuide;
  explanation: string;
  examples: Array<{ english: string; vietnamese: string }>;
  contrasts: Array<{ form: string; whyFits: string; whyNot: string }>;
  commonMistakes: string[];
  summary: string;
  sources: PublicGrammarSource[];
  exercises: PublicGrammarExercise[];
  outputPrompts: PublicGrammarOutputPrompt[];
}

export class GrammarLessonUnavailableError extends Error {
  readonly #reason: 'not-found' | 'unpublished';

  constructor(reason: 'not-found' | 'unpublished') {
    super('Grammar lesson is unavailable.');
    this.name = 'GrammarLessonUnavailableError';
    this.#reason = reason;
  }

  get reason(): 'not-found' | 'unpublished' {
    return this.#reason;
  }
}

export class GrammarCurriculumChangedConflictError extends Error {
  readonly reason = 'CURRICULUM_CHANGED' as const;
  readonly lessonId: string;

  constructor(lessonId: string) {
    super(`Grammar lesson "${lessonId}" is from a previous curriculum revision and is no longer available.`);
    this.name = 'GrammarCurriculumChangedConflictError';
    this.lessonId = lessonId;
  }
}

export function getGrammarCourse(curriculum: GrammarCurriculum): GrammarCourse {
  const issues = validateGrammarCurriculum(curriculum);
  const stages: GrammarCourseStage[] = [];
  for (const [index, stage] of curriculum.stages.entries()) {
    if (stage.publicationStatus !== 'published' || stage.lessons.length === 0) break;
    const stagePath = `stages[${index}]`;
    const hasInvalidPublishedContent = issues.some((issue) => issue.path === 'version'
      || issue.path === 'stages'
      || issue.path.startsWith(stagePath));
    if (hasInvalidPublishedContent || !stage.lessons.every(hasVerifiedGrammarReview)) break;

    stages.push({
      id: stage.id,
      level: stage.level,
      title: stage.title,
      lessons: stage.lessons.map(({ id, title, objective, revisionId, revision, coverage }) => ({
        id,
        title,
        objective,
        revisionId,
        revision,
        coverage: [...coverage],
      })),
    });
  }

  return {
    isComplete: stages.length === courseLevels.length
      && stages.every((stage, index) => stage.level === courseLevels[index]),
    stages,
  };
}

export function getGrammarLesson(curriculum: GrammarCurriculum, lessonId: string): GrammarLessonDetail {
  if (LEGACY_GRAMMAR_LESSON_IDS.includes(lessonId)) {
    throw new GrammarCurriculumChangedConflictError(lessonId);
  }

  const stageIndex = curriculum.stages.findIndex((stage) => stage.lessons.some((lesson) => lesson.id === lessonId));
  if (stageIndex < 0) throw new GrammarLessonUnavailableError('not-found');

  const stage = curriculum.stages[stageIndex]!;
  if (!getGrammarCourse(curriculum).stages.some(({ id }) => id === stage.id)) {
    throw new GrammarLessonUnavailableError('unpublished');
  }
  const lesson = stage.lessons.find(({ id }) => id === lessonId)!;

  const guide: GrammarTeachingGuide = {
    pattern: lesson.guide.pattern,
    whenToUse: [...lesson.guide.whenToUse],
    signalWords: [...lesson.guide.signalWords],
    check: [...lesson.guide.check],
  };

  const context: GrammarContext = {
    english: lesson.context.english,
    vietnamese: lesson.context.vietnamese,
  };

  return {
    id: lesson.id,
    revisionId: lesson.revisionId,
    revision: lesson.revision,
    title: lesson.title,
    objective: lesson.objective,
    coverage: [...lesson.coverage],
    context,
    guide,
    explanation: lesson.explanation,
    examples: lesson.examples.map(({ english, vietnamese }) => ({ english, vietnamese })),
    contrasts: lesson.contrasts.map(({ form, whyFits, whyNot }) => ({ form, whyFits, whyNot })),
    commonMistakes: [...lesson.commonMistakes],
    summary: lesson.summary,
    sources: lesson.sources.map(({ id, title, url }) => ({ id, title, url })),
    exercises: lesson.exercises.map((exercise) => ({
      id: exercise.id,
      kind: exercise.kind,
      prompt: exercise.prompt,
      options: exercise.options.map(({ text }) => ({ text })),
    })),
    outputPrompts: lesson.outputPrompts.map((prompt) => ({
      id: prompt.id,
      prompt: prompt.prompt,
      checks: [...prompt.checks],
    })),
  };
}
