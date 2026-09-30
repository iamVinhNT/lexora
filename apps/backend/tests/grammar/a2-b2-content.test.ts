/**
 * @file a2-b2-content.test.ts
 * @description Checks substantive A2–B2 lessons, exercise feedback, prerequisite ordering, and draft validation.
 */
import { describe, expect, it } from 'vitest';
import { a2Lessons } from '../../src/grammar/content/a2.js';
import { b1Lessons } from '../../src/grammar/content/b1.js';
import { b2Lessons } from '../../src/grammar/content/b2.js';
import { getGrammarCurriculum } from '../../src/grammar/content/manifest.js';
import { validateGrammarCurriculum } from '../../src/grammar/content/validate.js';
import type { GrammarLesson, GrammarLevel } from '../../src/grammar/content/types.js';

const requiredCoverage: Record<'A2' | 'B1' | 'B2', string[]> = {
  A2: ['past-continuous', 'intro-present-perfect', 'future-forms', 'comparatives', 'quantifiers', 'basic-modals'],
  B1: ['tense-aspect-in-context', 'zero-first-second-conditionals', 'passive-voice', 'reported-speech', 'relative-clauses'],
  B2: ['third-mixed-conditionals', 'speculative-modals', 'perfect-aspect', 'advanced-clauses', 'cohesion'],
};
const lessonsByLevel: Record<'A2' | 'B1' | 'B2', GrammarLesson[]> = { A2: a2Lessons, B1: b1Lessons, B2: b2Lessons };

describe('authored A2–B2 grammar content', () => {
  it('gives every required topic its own teachable lesson and checked practice', () => {
    for (const level of Object.keys(requiredCoverage) as Array<'A2' | 'B1' | 'B2'>) {
      const lessons = lessonsByLevel[level];
      expect(lessons.length).toBeGreaterThanOrEqual(requiredCoverage[level].length);
      for (const coverage of requiredCoverage[level]) {
        const lesson = lessons.find((item) => item.coverage.includes(coverage));
        expect(lesson, `${level} is missing a lesson for ${coverage}`).toBeDefined();
        expect(lesson!.explanation.length).toBeGreaterThan(180);
        expect(lesson!.examples.length).toBeGreaterThanOrEqual(2);
        expect(lesson!.contrasts.length).toBeGreaterThanOrEqual(1);
        expect(lesson!.commonMistakes.length).toBeGreaterThanOrEqual(1);
        expect(lesson!.exercises.length).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it('gives every option and accepted answer an explanation while keeping contextual alternatives distinct', () => {
    const exercises = Object.values(lessonsByLevel).flatMap((lessons) => lessons.flatMap((lesson) => lesson.exercises));
    for (const exercise of exercises) {
      expect(exercise.options.some((option) => option.correct)).toBe(true);
      expect(exercise.options.some((option) => !option.correct)).toBe(true);
      for (const option of exercise.options.filter((candidate) => candidate.correct)) {
        expect(exercise.acceptedAnswers.map((answer) => answer.text)).toContain(option.text);
      }
      expect(exercise.options.every((option) => option.rationale.trim().length > 0)).toBe(true);
      expect(exercise.acceptedAnswers.length).toBeGreaterThan(0);
      expect(exercise.acceptedAnswers.every((answer) => answer.text.trim() && answer.rationale.trim())).toBe(true);
    }
    const futureContrast = a2Lessons.find((lesson) => lesson.coverage.includes('future-forms'))!.exercises[0]!;
    expect(futureContrast.acceptedAnswers.map((answer) => answer.text)).toContain('Don’t worry, I will share mine with you.');
    expect(futureContrast.acceptedAnswers.map((answer) => answer.text)).toContain('Don’t worry, I am going to share mine with you.');
    expect(futureContrast.options.filter((option) => option.correct).map((option) => option.text)).toEqual([
      'Don’t worry, I will share mine with you.',
      'Don’t worry, I am going to share mine with you.',
    ]);
  });

  it('validates lessons with unique IDs and ordered prerequisites in a cloned curriculum', () => {
    const curriculum = structuredClone(getGrammarCurriculum());
    const levels: Array<['A2' | 'B1' | 'B2', GrammarLevel]> = [['A2', 'A2'], ['B1', 'B1'], ['B2', 'B2']];
    for (const [key, level] of levels) {
      const stage = curriculum.stages.find((item) => item.level === level)!;
      stage.lessons = structuredClone(lessonsByLevel[key]);
    }
    expect(validateGrammarCurriculum(curriculum)).toEqual([]);

    for (let index = 0; index < levels.length; index += 1) {
      const [key, level] = levels[index]!;
      const stage = curriculum.stages.find((item) => item.level === level)!;
      const previousLessons = index === 0
        ? curriculum.stages.find((item) => item.level === 'A1')!.lessons
        : curriculum.stages.find((item) => item.level === levels[index - 1]![1])!.lessons;
      expect(stage.lessons[0]!.prerequisiteIds).toContain(previousLessons.at(-1)!.id);
      for (let lessonIndex = 1; lessonIndex < lessonsByLevel[key].length; lessonIndex += 1) {
        expect(stage.lessons[lessonIndex]!.prerequisiteIds).toContain(stage.lessons[lessonIndex - 1]!.id);
      }
    }
  });
});
