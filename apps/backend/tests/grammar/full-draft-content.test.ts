/**
 * @file full-draft-content.test.ts
 * @description Validates the complete owner-approved 0–C2 inventory and practice coverage.
 */
import { describe, expect, it } from 'vitest';
import { a1Lessons } from '../../src/grammar/content/a1.js';
import { a2Lessons } from '../../src/grammar/content/a2.js';
import { b1Lessons } from '../../src/grammar/content/b1.js';
import { b2Lessons } from '../../src/grammar/content/b2.js';
import { c1Lessons } from '../../src/grammar/content/c1.js';
import { c2Lessons } from '../../src/grammar/content/c2.js';
import { getGrammarCurriculum } from '../../src/grammar/content/manifest.js';
import { validateGrammarCurriculum } from '../../src/grammar/content/validate.js';
import { zeroLessons } from '../../src/grammar/content/zero.js';
import type { GrammarLevel } from '../../src/grammar/content/types.js';

const levels: GrammarLevel[] = ['0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const lessonSets = [zeroLessons, a1Lessons, a2Lessons, b1Lessons, b2Lessons, c1Lessons, c2Lessons];
const requiredCoverage: Record<GrammarLevel, string[]> = {
  '0': ['parts-of-speech', 'word-order', 'verb-conjugation', 'be', 'affirmative', 'negative', 'questions'],
  A1: ['pronouns', 'noun-articles', 'present-simple', 'present-continuous', 'past-simple', 'tense-context-contrast'],
  A2: ['past-continuous', 'intro-present-perfect', 'future-forms', 'comparatives', 'quantifiers', 'basic-modals'],
  B1: ['tense-aspect-in-context', 'zero-first-second-conditionals', 'passive-voice', 'reported-speech', 'relative-clauses'],
  B2: ['third-mixed-conditionals', 'speculative-modals', 'perfect-aspect', 'advanced-clauses', 'cohesion'],
  C1: ['inversion', 'emphasis', 'cleft-sentences', 'ellipsis', 'hedging', 'register'],
  C2: ['modality-nuance', 'tense-aspect-discourse', 'information-structure', 'ellipsis-substitution', 'register-variation'],
};

function fullDraft() {
  const curriculum = structuredClone(getGrammarCurriculum());
  curriculum.stages.forEach((stage, index) => {
    stage.lessons = structuredClone(lessonSets[index]!);
  });
  return curriculum;
}

function hasVietnamese(text: string): boolean {
  return /[ăâđêôơưàáạảãèéẹẻẽìíịỉĩòóọỏõùúụủũỳýỵỷỹĂÂĐÊÔƠƯÀÁẠẢÃÈÉẸẺẼÌÍỊỈĨÒÓỌỎÕÙÚỤỦŨỲÝỴỶỸ]/i.test(text);
}

describe('complete grammar curriculum inventory', () => {
  it('validates all seven published stages and preserves approved owner metadata', () => {
    const curriculum = fullDraft();
    const runtimeCurriculum = getGrammarCurriculum();

    expect(curriculum.stages.map((stage) => stage.level)).toEqual(levels);
    expect(curriculum.stages.flatMap((stage) => stage.lessons)).toHaveLength(34);
    expect(validateGrammarCurriculum(curriculum)).toEqual([]);

    const lessons = curriculum.stages.flatMap((stage) => stage.lessons);
    const lessonIds = lessons.map((lesson) => lesson.id);
    const revisionIds = lessons.map((lesson) => lesson.revisionId);
    expect(new Set(lessonIds).size).toBe(lessons.length);
    expect(new Set(revisionIds).size).toBe(lessons.length);
    expect(curriculum.stages.every((stage) => stage.publicationStatus === 'published')).toBe(true);
    expect(lessons.every((lesson) => lesson.review.status === 'approved' && lesson.review.reviewer === 'Lexora project owner')).toBe(true);

    for (let stageIndex = 0; stageIndex < curriculum.stages.length; stageIndex += 1) {
      const stage = curriculum.stages[stageIndex]!;
      const stageLessons = stage.lessons;
      const previousStage = curriculum.stages[stageIndex - 1];
      expect(stage.prerequisiteIds).toEqual(previousStage ? [previousStage.id] : []);
      for (const tag of requiredCoverage[stage.level]) {
        expect(stageLessons.some((lesson) => lesson.coverage.includes(tag)), `${stage.level} missing ${tag}`).toBe(true);
      }
      for (let lessonIndex = 0; lessonIndex < stageLessons.length; lessonIndex += 1) {
        const expectedPrerequisite = lessonIndex > 0
          ? stageLessons[lessonIndex - 1]!.id
          : previousStage?.lessons.at(-1)?.id;
        if (expectedPrerequisite) expect(stageLessons[lessonIndex]!.prerequisiteIds).toContain(expectedPrerequisite);
      }
    }

    for (const lesson of lessons) {
      for (const exercise of lesson.exercises) {
        const acceptedTexts = new Set(exercise.acceptedAnswers.map((answer) => answer.text));
        expect(exercise.options.some((option) => !option.correct), `${exercise.id} needs an incorrect option`).toBe(true);
        const correctOptions = exercise.options.filter((option) => option.correct);
        expect(correctOptions.length).toBeGreaterThan(0);
        for (const option of correctOptions) expect(acceptedTexts.has(option.text), exercise.id).toBe(true);
        for (const answer of [...exercise.options, ...exercise.acceptedAnswers]) {
          expect(hasVietnamese(answer.rationale), `${exercise.id} feedback lacks Vietnamese text`).toBe(true);
        }
      }
    }

    expect(runtimeCurriculum.stages.every((stage) => stage.publicationStatus === 'published')).toBe(true);
    expect(runtimeCurriculum.stages.map((stage) => stage.lessons.length)).toEqual(lessonSets.map((lessons) => lessons.length));
  });
});
