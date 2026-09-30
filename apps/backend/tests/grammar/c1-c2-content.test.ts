/**
 * @file c1-c2-content.test.ts
 * @description Checks authored C1–C2 topic coverage, contextual answer feedback, and draft curriculum links.
 */
import { describe, expect, it } from 'vitest';
import { a2Lessons } from '../../src/grammar/content/a2.js';
import { b1Lessons } from '../../src/grammar/content/b1.js';
import { b2Lessons } from '../../src/grammar/content/b2.js';
import { c1Lessons } from '../../src/grammar/content/c1.js';
import { c2Lessons } from '../../src/grammar/content/c2.js';
import { getGrammarCurriculum } from '../../src/grammar/content/manifest.js';
import { validateGrammarCurriculum } from '../../src/grammar/content/validate.js';
import type { GrammarLesson, GrammarLevel } from '../../src/grammar/content/types.js';

const requiredCoverage: Record<'C1' | 'C2', string[]> = {
  C1: ['inversion', 'emphasis', 'cleft-sentences', 'ellipsis', 'hedging', 'register'],
  C2: ['modality-nuance', 'tense-aspect-discourse', 'information-structure', 'ellipsis-substitution', 'register-variation'],
};
const lessonsByLevel: Record<'C1' | 'C2', GrammarLesson[]> = { C1: c1Lessons, C2: c2Lessons };

describe('authored C1–C2 grammar content', () => {
  it('teaches every required advanced topic in substantive lessons', () => {
    for (const level of Object.keys(requiredCoverage) as Array<'C1' | 'C2'>) {
      const lessons = lessonsByLevel[level];
      expect(lessons.length).toBeGreaterThanOrEqual(requiredCoverage[level].length);
      for (const coverage of requiredCoverage[level]) {
        const lesson = lessons.find((item) => item.coverage.includes(coverage));
        expect(lesson, `${level} is missing a lesson for ${coverage}`).toBeDefined();
        expect(lesson!.revisionId).toBe(`${lesson!.id}@${lesson!.revision}`);
        expect(lesson!.explanation.length).toBeGreaterThan(220);
        expect(lesson!.examples.length).toBeGreaterThanOrEqual(2);
        expect(lesson!.contrasts.length).toBeGreaterThanOrEqual(1);
        expect(lesson!.commonMistakes.length).toBeGreaterThanOrEqual(1);
        expect(lesson!.exercises.length).toBeGreaterThanOrEqual(1);
        expect(lesson!.sources.length).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it('explains correct and incorrect choices and accepts each correct option', () => {
    for (const lesson of Object.values(lessonsByLevel).flat()) {
      for (const exercise of lesson.exercises) {
        expect(exercise.options.some((option) => option.correct)).toBe(true);
        expect(exercise.options.some((option) => !option.correct)).toBe(true);
        for (const option of exercise.options.filter((item) => item.correct)) {
          expect(exercise.acceptedAnswers.map((answer) => answer.text)).toContain(option.text);
        }
        expect(exercise.options.every((option) => option.rationale.trim().length > 0)).toBe(true);
        expect(exercise.acceptedAnswers.every((answer) => answer.text.trim() && answer.rationale.trim())).toBe(true);
      }
    }
  });

  it('validates C1–C2 lessons and their ordered prerequisites in a cloned curriculum', () => {
    const curriculum = structuredClone(getGrammarCurriculum());
    const priorStages: Array<[GrammarLevel, GrammarLesson[]]> = [
      ['A2', a2Lessons],
      ['B1', b1Lessons],
      ['B2', b2Lessons],
      ['C1', c1Lessons],
      ['C2', c2Lessons],
    ];
    for (const [level, lessons] of priorStages) {
      const stage = curriculum.stages.find((item) => item.level === level)!;
      stage.lessons = structuredClone(lessons);
    }
    expect(validateGrammarCurriculum(curriculum)).toEqual([]);

    const b2Stage = curriculum.stages.find((item) => item.level === 'B2')!;
    const c1Stage = curriculum.stages.find((item) => item.level === 'C1')!;
    const c2Stage = curriculum.stages.find((item) => item.level === 'C2')!;
    expect(c1Stage.lessons[0]!.prerequisiteIds).toContain(b2Stage.lessons.at(-1)!.id);
    expect(c2Stage.lessons[0]!.prerequisiteIds).toContain(c1Stage.lessons.at(-1)!.id);
    for (const stage of [c1Stage, c2Stage]) {
      for (let index = 1; index < stage.lessons.length; index += 1) {
        expect(stage.lessons[index]!.prerequisiteIds).toContain(stage.lessons[index - 1]!.id);
      }
    }
  });
});
