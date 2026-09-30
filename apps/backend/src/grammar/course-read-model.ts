/**
 * @file course-read-model.ts
 * @description Projects only reviewed, published grammar content for learner reads.
 */
import { validateGrammarCurriculum } from './content/validate.js';
import { getGrammarTeachingGuide } from './content/teaching-guide.js';
import type { GrammarCurriculum, GrammarLesson, GrammarStage, GrammarTeachingGuide } from './content/types.js';

const courseLevels = ['0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;

type LessonSummary = Pick<GrammarLesson, 'id' | 'title' | 'objective'>;
type PublicGrammarSource = Pick<GrammarLesson['sources'][number], 'id' | 'title' | 'url'>;

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

export interface GrammarLessonDetail extends Omit<GrammarLesson, 'revisionId' | 'revision' | 'prerequisiteIds' | 'coverage' | 'exercises' | 'sources' | 'review'> {
  guide: GrammarTeachingGuide;
  sources: PublicGrammarSource[];
  exercises: Array<{
    id: string;
    prompt: string;
    options: Array<{ text: string }>;
  }>;
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

export function getGrammarCourse(curriculum: GrammarCurriculum): GrammarCourse {
  const issues = validateGrammarCurriculum(curriculum);
  const stages: GrammarCourseStage[] = [];
  for (const [index, stage] of curriculum.stages.entries()) {
    if (stage.publicationStatus !== 'published' || stage.lessons.length === 0) break;
    const stagePath = `stages[${index}]`;
    const hasInvalidPublishedContent = issues.some((issue) => issue.path === 'version'
      || issue.path === 'stages'
      || issue.path.startsWith(stagePath));
    if (hasInvalidPublishedContent || !stage.lessons.every(hasVerifiedReview)) break;

    stages.push({
      id: stage.id,
      level: stage.level,
      title: stage.title,
      lessons: stage.lessons.map(({ id, title, objective }) => ({ id, title, objective })),
    });
  }

  return {
    isComplete: stages.length === courseLevels.length
      && stages.every((stage, index) => stage.level === courseLevels[index]),
    stages,
  };
}

export function getGrammarLesson(curriculum: GrammarCurriculum, lessonId: string): GrammarLessonDetail {
  const stageIndex = curriculum.stages.findIndex((stage) => stage.lessons.some((lesson) => lesson.id === lessonId));
  if (stageIndex < 0) throw new GrammarLessonUnavailableError('not-found');

  const stage = curriculum.stages[stageIndex]!;
  if (!getGrammarCourse(curriculum).stages.some(({ id }) => id === stage.id)) {
    throw new GrammarLessonUnavailableError('unpublished');
  }
  const lesson = stage.lessons.find(({ id }) => id === lessonId)!;

  return {
    id: lesson.id,
    title: lesson.title,
    objective: lesson.objective,
    explanation: lesson.explanation,
    guide: getGrammarTeachingGuide(lesson.coverage),
    examples: lesson.examples.map(({ english, vietnamese }) => ({ english, vietnamese })),
    contrasts: lesson.contrasts.map(({ form, whyFits, whyNot }) => ({ form, whyFits, whyNot })),
    commonMistakes: [...lesson.commonMistakes],
    summary: lesson.summary,
    sources: lesson.sources.map(({ id, title, url }) => ({ id, title, url })),
    exercises: lesson.exercises.map((exercise) => ({
      id: exercise.id,
      prompt: exercise.prompt,
      options: exercise.options.map(({ text }) => ({ text })),
    })),
  };
}

function hasVerifiedReview(lesson: GrammarLesson): boolean {
  const review = lesson.review;
  return Boolean(review?.status === 'approved'
    && review.reviewer?.trim()
    && review.reviewedAt
    && !Number.isNaN(Date.parse(review.reviewedAt)));
}
