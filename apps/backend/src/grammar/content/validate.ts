/**
 * @file validate.ts
 * @description Checks grammar curriculum identity, references, authored practice, and publication gates.
 */
import type { CurriculumIssue, GrammarCurriculum, GrammarExercise, GrammarLesson } from './types.js';
import { hasInvalidGrammarExerciseKeys } from '../grade-exercise.js';

const levels = ['0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const placeholder = /\b(?:todo|tbd|placeholder|to be authored|coming soon|lorem ipsum)\b/i;

const VALID_KINDS: Record<string, true> = {
  choice: true,
  gap: true,
  transform: true,
  correction: true,
};

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
      if (!lesson.revisionId?.trim() || !lesson.revision?.trim()) {
        add('MISSING_REVISION', `${lessonPath}.revisionId`, 'Lessons require a stable revision ID and version label.');
      } else {
        trackId(lesson.revisionId, `${lessonPath}.revisionId`);
      }
      checkPrerequisites(lesson.prerequisiteIds, earlierLessons, `${lessonPath}.prerequisiteIds`);
      validateLesson(lesson, lessonPath, stage.publicationStatus);
      earlierLessons.add(lesson.id);
    });
    earlierStages.add(stage.id);
  });

  return issues;

  function add(code: string, path: string, message: string): void {
    issues.push({ code, path, message });
  }

  function trackId(id: string, path: string): void {
    if (!id || !id.trim() || ids.has(id)) add('DUPLICATE_ID', path, 'IDs must be non-empty and unique across this curriculum.');
    ids.add(id);
  }

  function checkPrerequisites(idsToCheck: string[], available: Set<string>, path: string): void {
    for (const id of idsToCheck) {
      if (!available.has(id)) add('BROKEN_PREREQUISITE', path, `Prerequisite ${id} must refer to an earlier stage or lesson.`);
    }
  }

  function validateExercise(exercise: GrammarExercise, exercisePath: string): void {
    trackId(exercise.id, `${exercisePath}.id`);
    checkText(exercise.prompt, `${exercisePath}.prompt`);
    if (hasInvalidGrammarExerciseKeys(exercise)) {
      add('INCOMPLETE_EXERCISE', exercisePath, 'Exercise keys, options, and kind must form an unambiguous grading contract.');
    }

    if (!exercise.kind || !VALID_KINDS[exercise.kind]) {
      add('INCOMPLETE_EXERCISE', `${exercisePath}.kind`, 'Exercise kind must be choice, gap, transform, or correction.');
      return;
    }

    if (exercise.kind === 'choice') {
      if (!exercise.options || exercise.options.length < 3) {
        add('INCOMPLETE_EXERCISE', exercisePath, 'Choice exercises require at least 3 distinct options.');
      }
      if (!exercise.options || !exercise.options.some((option) => option.correct)) {
        add('INCOMPLETE_EXERCISE', exercisePath, 'Exercises need at least one correct option.');
      }
      if (exercise.options && exercise.options.filter((o) => o.correct).length !== 1) {
        add('INCOMPLETE_EXERCISE', exercisePath, 'Choice exercises require exactly 1 correct option.');
      }
      if (!exercise.acceptedAnswers || !exercise.acceptedAnswers.length) {
        add('INCOMPLETE_EXERCISE', exercisePath, 'Exercises need at least one accepted answer.');
      }

      const optTexts = (exercise.options ?? []).map((o) => o.text.trim().toLowerCase());
      if (new Set(optTexts).size !== optTexts.length) {
        add('INCOMPLETE_EXERCISE', exercisePath, 'Choice exercise options must be distinct.');
      }

      const accTexts = (exercise.acceptedAnswers ?? []).map((a) => a.text.trim().toLowerCase());
      if (exercise.options?.some((o) => !o.correct && accTexts.includes(o.text.trim().toLowerCase()))) {
        add('INCOMPLETE_EXERCISE', exercisePath, 'Incorrect option cannot match an accepted answer.');
      }
      if (exercise.options?.some((o) => o.correct && !accTexts.includes(o.text.trim().toLowerCase()))) {
        add('INCOMPLETE_EXERCISE', exercisePath, 'Correct option must be included in accepted answers.');
      }

      exercise.options?.forEach((option, optionIndex) => {
        checkText(option.text, `${exercisePath}.options[${optionIndex}].text`);
        checkText(option.rationale, `${exercisePath}.options[${optionIndex}].rationale`, 'MISSING_FEEDBACK');
      });
    } else {
      if (exercise.options && exercise.options.length > 0) {
        add('INCOMPLETE_EXERCISE', exercisePath, 'Typed exercises cannot have choices or options.');
      }
      if (!exercise.acceptedAnswers || exercise.acceptedAnswers.length === 0) {
        add('INCOMPLETE_EXERCISE', exercisePath, 'Typed exercises require at least one accepted answer.');
      }
    }

    exercise.acceptedAnswers?.forEach((answer, answerIndex) => {
      checkText(answer.text, `${exercisePath}.acceptedAnswers[${answerIndex}].text`);
      checkText(answer.rationale, `${exercisePath}.acceptedAnswers[${answerIndex}].rationale`, 'MISSING_FEEDBACK');
    });
  }

  function validateLesson(lesson: GrammarLesson, path: string, publicationStatus: string): void {
    const questionPrompts = new Set<string>();

    for (const [field, text] of Object.entries({ title: lesson.title, objective: lesson.objective, explanation: lesson.explanation, summary: lesson.summary })) {
      if (placeholder.test(text) || text.trim().length < 12) add('PLACEHOLDER_CONTENT', `${path}.${field}`, 'Required lesson prose must be authored, substantive text.');
    }

    if (!lesson.guide) {
      add('MISSING_TEACHING_GUIDE', `${path}.guide`, 'Every lesson needs an authored teaching guide.');
    } else {
      checkText(lesson.guide.pattern, `${path}.guide.pattern`);
      for (const field of ['whenToUse', 'signalWords', 'check'] as const) {
        lesson.guide[field]?.forEach((text, index) => checkText(text, `${path}.guide.${field}[${index}]`));
      }
      if (!Array.isArray(lesson.guide.whenToUse) || lesson.guide.whenToUse.length === 0) {
        add('MISSING_TEACHING_GUIDE', `${path}.guide.whenToUse`, 'Guide requires whenToUse list.');
      }
      if (!Array.isArray(lesson.guide.signalWords)) {
        add('MISSING_TEACHING_GUIDE', `${path}.guide.signalWords`, 'Guide requires signalWords list.');
      }
      if (!Array.isArray(lesson.guide.check) || lesson.guide.check.length === 0) {
        add('MISSING_TEACHING_GUIDE', `${path}.guide.check`, 'Guide requires check list.');
      }
    }

    if (!lesson.context) {
      add('INCOMPLETE_LESSON', `${path}.context`, 'Lesson requires bilingual context (english and vietnamese).');
    } else {
      checkText(lesson.context.english, `${path}.context.english`);
      checkText(lesson.context.vietnamese, `${path}.context.vietnamese`);
    }

    if (!lesson.coverage?.length || !lesson.examples?.length || !lesson.contrasts?.length || !lesson.commonMistakes?.length || !lesson.exercises?.length || !lesson.sources?.length) {
      add('INCOMPLETE_LESSON', path, 'Lessons require coverage, examples, contrasts, common mistakes, exercises, and sources.');
    }
    lesson.coverage?.forEach((tag, index) => checkText(tag, `${path}.coverage[${index}]`));

    lesson.examples?.forEach((example, index) => {
      if (!substantive(example.english) || !substantive(example.vietnamese) || placeholder.test(example.english) || placeholder.test(example.vietnamese)) {
        add('INCOMPLETE_LESSON', `${path}.examples[${index}]`, 'Examples need original English and Vietnamese teaching context.');
      }
    });

    lesson.contrasts?.forEach((contrast, index) => {
      if ([contrast.form, contrast.whyFits, contrast.whyNot].some((text) => !substantive(text) || placeholder.test(text))) {
        add('INCOMPLETE_LESSON', `${path}.contrasts[${index}]`, 'Contrasts need a form and why/why-not explanations.');
      }
    });

    lesson.commonMistakes?.forEach((mistake, index) => checkText(mistake, `${path}.commonMistakes[${index}]`));

    lesson.sources?.forEach((source, index) => {
      if (!source.id.trim() || !source.title.trim() || !isHttpUrl(source.url)) {
        add('MISSING_SOURCE', `${path}.sources[${index}]`, 'Sources need an ID, title, and HTTP(S) URL.');
      }
      if (source.provenance !== 'reference-only') {
        add('MISSING_SOURCE', `${path}.sources[${index}].provenance`, 'Provenance must be reference-only.');
      }
      if (!source.claims || !Array.isArray(source.claims) || source.claims.length === 0) {
        add('MISSING_SOURCE', `${path}.sources[${index}].claims`, 'Source requires claims list.');
      }
      source.claims?.forEach((claim, claimIndex) => checkText(claim, `${path}.sources[${index}].claims[${claimIndex}]`, 'MISSING_SOURCE'));
      if (!isGrammarIsoDate(source.checkedAt)) {
        add('MISSING_SOURCE', `${path}.sources[${index}].checkedAt`, 'Sources require a valid ISO lookup date.');
      }
    });

    if (!lesson.review || !['pending', 'approved'].includes(lesson.review.status)) {
      add('MISSING_REVIEW_STATUS', `${path}.review`, 'Editorial review status is required.');
    } else if (lesson.review.mode !== 'ai-internal') {
      add('INCOMPLETE_REVIEW_METADATA', `${path}.review`, 'Editorial review mode must be ai-internal.');
    } else if (lesson.review.status === 'approved' && !hasVerifiedGrammarReview(lesson)) {
      add('INCOMPLETE_REVIEW_METADATA', `${path}.review`, 'Approval claims require a named reviewer and valid review date.');
    }

    for (const [field, prefix] of [['exercises', 'q'], ['reviewExercises', 'r']] as const) {
      lesson[field]?.forEach((exercise, index) => {
        const exercisePath = `${path}.${field}[${index}]`;
        if (exercise.id !== `${lesson.id}-${prefix}${index + 1}`) add('INVALID_EXERCISE_ID', `${exercisePath}.id`, 'Exercise IDs must match lesson identity and authored sequence.');
        const normalizedPrompt = exercise.prompt.trim().toLowerCase().replace(/[‘’]/g, "'").replace(/\s+/g, ' ');
        if (questionPrompts.has(normalizedPrompt)) add('DUPLICATE_EXERCISE', `${exercisePath}.prompt`, 'Controlled and transfer questions must not repeat normalized prompts.');
        questionPrompts.add(normalizedPrompt);
        validateExercise(exercise, exercisePath);
      });
    }

    if (lesson.outputPrompts) {
      lesson.outputPrompts.forEach((prompt, promptIndex) => {
        const promptPath = `${path}.outputPrompts[${promptIndex}]`;
        trackId(prompt.id, `${promptPath}.id`);
        if (prompt.id !== `${lesson.id}-o${promptIndex + 1}`) add('INVALID_OUTPUT_ID', `${promptPath}.id`, 'Output IDs must match lesson identity and authored sequence.');
        checkText(prompt.prompt, `${promptPath}.prompt`);
        checkText(prompt.modelAnswer, `${promptPath}.modelAnswer`);
        if (!Array.isArray(prompt.checks) || prompt.checks.length === 0) {
          add('INCOMPLETE_LESSON', `${promptPath}.checks`, 'Output prompt requires checks list.');
        } else {
          prompt.checks.forEach((chk, chkIdx) => checkText(chk, `${promptPath}.checks[${chkIdx}]`));
        }
      });
    }

    {
      if (lesson.exercises?.length !== 12) {
        add('INCOMPLETE_LESSON', `${path}.exercises`, 'V2 lessons must have exactly 12 controlled exercises.');
      }
      const kindCounts: Record<string, number> = {};
      for (const ex of lesson.exercises ?? []) {
        kindCounts[ex.kind] = (kindCounts[ex.kind] ?? 0) + 1;
      }
      if (kindCounts.choice !== 4 || kindCounts.gap !== 4 || kindCounts.transform !== 2 || kindCounts.correction !== 2) {
        add('INCOMPLETE_LESSON', `${path}.exercises`, 'Controlled exercises must be exactly 4 choice, 4 gap, 2 transform, 2 correction.');
      }

      if (!lesson.reviewExercises || lesson.reviewExercises.length !== 4) {
        add('INCOMPLETE_LESSON', `${path}.reviewExercises`, 'V2 lessons must have exactly 4 review exercises.');
      } else {
        const reviewCounts: Record<string, number> = {};
        for (const ex of lesson.reviewExercises) {
          reviewCounts[ex.kind] = (reviewCounts[ex.kind] ?? 0) + 1;
        }
        if (reviewCounts.choice !== 1 || reviewCounts.gap !== 1 || reviewCounts.transform !== 1 || reviewCounts.correction !== 1) {
          add('INCOMPLETE_LESSON', `${path}.reviewExercises`, 'Review exercises must be exactly 1 choice, 1 gap, 1 transform, 1 correction.');
        }
      }

      if (!lesson.outputPrompts || lesson.outputPrompts.length !== 2) {
        add('INCOMPLETE_LESSON', `${path}.outputPrompts`, 'V2 lessons must have exactly 2 output prompts.');
      }

      if (!lesson.examples || lesson.examples.length < 6) {
        add('INCOMPLETE_LESSON', `${path}.examples`, 'V2 lessons must have at least 6 examples.');
      }
      if (!lesson.contrasts || lesson.contrasts.length < 2) {
        add('INCOMPLETE_LESSON', `${path}.contrasts`, 'V2 lessons must have at least 2 contrasts.');
      }
      if (!lesson.commonMistakes || lesson.commonMistakes.length < 3) {
        add('INCOMPLETE_LESSON', `${path}.commonMistakes`, 'V2 lessons must have at least 3 common mistakes.');
      }
    }

    if (publicationStatus === 'published' && !hasVerifiedGrammarReview(lesson)) {
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

export function hasVerifiedGrammarReview(lesson: GrammarLesson): boolean {
  const review = lesson.review;
  return Boolean(review
    && review.status === 'approved'
    && review.mode === 'ai-internal'
    && review.reviewer?.trim()
    && isGrammarIsoDate(review.reviewedAt, true));
}

function isGrammarIsoDate(value: unknown, requireTime = false): boolean {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z)?$/.test(value)) return false;
  if (requireTime && !value.includes('T')) return false;
  const date = new Date(value);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value.slice(0, 10);
}
