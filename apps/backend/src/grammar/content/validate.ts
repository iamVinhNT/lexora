/**
 * @file validate.ts
 * @description Checks grammar curriculum identity, references, authored practice, and publication gates.
 */
import { hasGrammarTeachingGuide } from './teaching-guide.js';
import type { CurriculumIssue, GrammarCurriculum, GrammarLesson } from './types.js';

const levels = ['0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const placeholder = /\b(?:todo|tbd|placeholder|to be authored|coming soon|lorem ipsum)\b/i;

export function validateGrammarCurriculum(curriculum: GrammarCurriculum): CurriculumIssue[] {
  const issues: CurriculumIssue[] = [];
  const ids = new Set<string>();
  const earlierStages = new Set<string>();
  const earlierLessons = new Set<string>();

  if (!curriculum.version.trim()) add('MISSING_VERSION', 'version', 'Curriculum version is required.');
  if (curriculum.stages.length !== levels.length || curriculum.stages.some((stage, index) => stage.level !== levels[index])) {
    add('INVALID_STAGE_ORDER', 'stages', 'Curriculum must contain all seven levels in order.');
  }

  curriculum.stages.forEach((stage, stageIndex) => {
    const stagePath = `stages[${stageIndex}]`;
    trackId(stage.id, stagePath);
    checkPrerequisites(stage.prerequisiteIds, earlierStages, `${stagePath}.prerequisiteIds`);
    if (stage.publicationStatus !== 'published' && stage.lessons.length === 0 && stage.plannedCoverage.length === 0) {
      add('MISSING_STAGE_INVENTORY', `${stagePath}.plannedCoverage`, 'An unpublished stage still needs an explicit editorial coverage inventory.');
    }
    if (stage.publicationStatus === 'published' && stage.lessons.length === 0) {
      add('EMPTY_PUBLISHED_STAGE', `${stagePath}.lessons`, 'A published stage must contain authored lessons.');
    }
    stage.lessons.forEach((lesson, lessonIndex) => {
      const lessonPath = `${stagePath}.lessons[${lessonIndex}]`;
      trackId(lesson.id, `${lessonPath}.id`);
      if (!lesson.revisionId.trim() || !lesson.revision.trim()) {
        add('MISSING_REVISION', `${lessonPath}.revisionId`, 'Lessons require a stable revision ID and version label.');
      } else {
        trackId(lesson.revisionId, `${lessonPath}.revisionId`);
      }
      checkPrerequisites(lesson.prerequisiteIds, earlierLessons, `${lessonPath}.prerequisiteIds`);
      validateLesson(lesson, lessonPath, stage.publicationStatus);
      if (stage.publicationStatus === 'published' && !hasVerifiedReview(lesson)) {
        add('UNREVIEWED_PUBLICATION', `${lessonPath}.review`, 'Published lessons require named, dated editorial approval.');
      }
      earlierLessons.add(lesson.id);
    });
    earlierStages.add(stage.id);
  });

  return issues;

  function add(code: string, path: string, message: string): void {
    issues.push({ code, path, message });
  }

  function trackId(id: string, path: string): void {
    if (!id.trim() || ids.has(id)) add('DUPLICATE_ID', path, 'IDs must be non-empty and unique across this curriculum.');
    ids.add(id);
  }

  function checkPrerequisites(ids: string[], available: Set<string>, path: string): void {
    for (const id of ids) {
      if (!available.has(id)) add('BROKEN_PREREQUISITE', path, `Prerequisite ${id} must refer to an earlier stage or lesson.`);
    }
  }

  function validateLesson(lesson: GrammarLesson, path: string, publicationStatus: string): void {
    for (const [field, text] of Object.entries({ title: lesson.title, objective: lesson.objective, explanation: lesson.explanation, summary: lesson.summary })) {
      if (placeholder.test(text) || text.trim().length < 12) add('PLACEHOLDER_CONTENT', `${path}.${field}`, 'Required lesson prose must be authored, substantive text.');
    }
    if (!lesson.coverage[0] || !hasGrammarTeachingGuide(lesson.coverage[0])) {
      add('MISSING_TEACHING_GUIDE', `${path}.coverage`, 'Every lesson needs a structured guide for its primary topic.');
    }
    if (!lesson.coverage.length || !lesson.examples.length || !lesson.contrasts.length || !lesson.commonMistakes.length || !lesson.exercises.length || !lesson.sources.length) {
      add('INCOMPLETE_LESSON', path, 'Lessons require coverage, examples, contrasts, common mistakes, exercises, and sources.');
    }
    lesson.examples.forEach((example, index) => {
      if (!substantive(example.english) || !substantive(example.vietnamese) || placeholder.test(example.english) || placeholder.test(example.vietnamese)) {
        add('INCOMPLETE_LESSON', `${path}.examples[${index}]`, 'Examples need original English and Vietnamese teaching context.');
      }
    });
    lesson.contrasts.forEach((contrast, index) => {
      if ([contrast.form, contrast.whyFits, contrast.whyNot].some((text) => !substantive(text) || placeholder.test(text))) {
        add('INCOMPLETE_LESSON', `${path}.contrasts[${index}]`, 'Contrasts need a form and why/why-not explanations.');
      }
    });
    lesson.commonMistakes.forEach((mistake, index) => checkText(mistake, `${path}.commonMistakes[${index}]`));
    lesson.sources.forEach((source, index) => {
      if (!source.id.trim() || !source.title.trim() || !isHttpUrl(source.url)) add('MISSING_SOURCE', `${path}.sources[${index}]`, 'Sources need an ID, title, and HTTP(S) URL.');
    });
    if (!lesson.review || !['pending', 'approved'].includes(lesson.review.status)) {
      add('MISSING_REVIEW_STATUS', `${path}.review`, 'Editorial review status is required.');
    } else if (lesson.review.status === 'approved' && !hasVerifiedReview(lesson)) {
      add('INCOMPLETE_REVIEW_METADATA', `${path}.review`, 'Approval claims require a named reviewer and valid review date.');
    }
    lesson.exercises.forEach((exercise, exerciseIndex) => {
      const exercisePath = `${path}.exercises[${exerciseIndex}]`;
      trackId(exercise.id, `${exercisePath}.id`);
      checkText(exercise.prompt, `${exercisePath}.prompt`);
      if (!exercise.options.length || !exercise.options.some((option) => option.correct) || !exercise.acceptedAnswers.length) {
        add('INCOMPLETE_EXERCISE', exercisePath, 'Exercises need a correct option and at least one accepted answer.');
      }
      exercise.options.forEach((option, optionIndex) => {
        checkText(option.text, `${exercisePath}.options[${optionIndex}].text`);
        checkText(option.rationale, `${exercisePath}.options[${optionIndex}].rationale`, 'MISSING_FEEDBACK');
      });
      exercise.acceptedAnswers.forEach((answer, answerIndex) => {
        checkText(answer.text, `${exercisePath}.acceptedAnswers[${answerIndex}].text`);
        checkText(answer.rationale, `${exercisePath}.acceptedAnswers[${answerIndex}].rationale`, 'MISSING_FEEDBACK');
      });
    });
    if (publicationStatus === 'published' && !hasVerifiedReview(lesson)) {
      add('UNREVIEWED_PUBLICATION', `${path}.review`, 'A published lesson requires named, dated editorial approval.');
    }
  }

  function checkText(value: string, path: string, code = 'PLACEHOLDER_CONTENT'): void {
    if (!substantive(value) || placeholder.test(value)) add(code, path, 'Content must be present, substantive, and not a placeholder.');
  }
}

function substantive(value: string): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

function isHttpUrl(value: string): boolean {
  try {
    return ['http:', 'https:'].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

function hasVerifiedReview(lesson: GrammarLesson): boolean {
  const review = lesson.review;
  return Boolean(review && review.status === 'approved' && review.reviewer?.trim() && review.reviewedAt && !Number.isNaN(Date.parse(review.reviewedAt)));
}
