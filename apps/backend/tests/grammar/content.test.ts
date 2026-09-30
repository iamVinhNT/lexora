/**
 * @file content.test.ts
 * @description Verifies the authored grammar inventory and publication safeguards.
 */
import { describe, expect, it } from 'vitest';
import { getGrammarCurriculum } from '../../src/grammar/content/manifest.js';
import { validateGrammarCurriculum } from '../../src/grammar/content/validate.js';
import type { GrammarCurriculum } from '../../src/grammar/content/types.js';

function curriculumWith(change: (curriculum: GrammarCurriculum) => void): GrammarCurriculum {
  const curriculum = structuredClone(getGrammarCurriculum());
  change(curriculum);
  return curriculum;
}

describe('grammar curriculum content contract', () => {
  it('keeps seven stable ordered stages and publishes only authored, reviewed stages', () => {
    const curriculum = getGrammarCurriculum();
    expect(curriculum.version).toBeTruthy();
    const revisions = curriculum.stages.flatMap((stage) => stage.lessons.map((lesson) => lesson.revisionId));
    expect(new Set(revisions).size).toBe(revisions.length);
    expect(revisions.every(Boolean)).toBe(true);
    expect(curriculum.stages.map((stage) => stage.level)).toEqual(['0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2']);
    expect(curriculum.stages.every((stage) => stage.lessons.length > 0)).toBe(true);
    expect(curriculum.stages.every((stage) => stage.publicationStatus === 'published')).toBe(true);
    expect(curriculum.stages.every((stage) => stage.lessons.every((lesson) => lesson.review.status === 'approved' && lesson.review.reviewer === 'Lexora project owner'))).toBe(true);
  });

  it('covers the required zero-to-A1 grammar inventory with authored lessons', () => {
    const coverage = getGrammarCurriculum().stages.slice(0, 2).flatMap((stage) => stage.lessons.flatMap((lesson) => lesson.coverage));
    expect(new Set(coverage)).toEqual(new Set([
      'parts-of-speech', 'pronouns', 'be', 'word-order', 'affirmative', 'negative', 'questions',
      'verb-conjugation', 'noun-articles', 'present-simple', 'present-continuous', 'past-simple', 'tense-context-contrast',
    ]));
    expect(validateGrammarCurriculum(getGrammarCurriculum())).toEqual([]);
  });

  it('rejects duplicate stage, lesson, exercise, and revision IDs', () => {
    const duplicateStage = curriculumWith((value) => {
      value.stages[1]!.id = value.stages[0]!.id;
    });
    const duplicateLesson = curriculumWith((value) => {
      value.stages[1]!.lessons.push(structuredClone(value.stages[0]!.lessons[0]!));
    });
    const duplicateExercise = curriculumWith((value) => {
      value.stages[0]!.lessons[1]!.exercises[0]!.id = value.stages[0]!.lessons[0]!.exercises[0]!.id;
    });
    const duplicateRevision = curriculumWith((value) => {
      value.stages[0]!.lessons[1]!.revisionId = value.stages[0]!.lessons[0]!.revisionId;
    });
    for (const curriculum of [duplicateStage, duplicateLesson, duplicateExercise, duplicateRevision]) {
      expect(validateGrammarCurriculum(curriculum).map((issue) => issue.code)).toContain('DUPLICATE_ID');
    }
  });

  it('rejects a revision without its stable ID or version label', () => {
    const curriculum = curriculumWith((value) => {
      value.stages[0]!.lessons[0]!.revisionId = '';
      value.stages[0]!.lessons[0]!.revision = '';
    });
    expect(validateGrammarCurriculum(curriculum).map((issue) => issue.code)).toContain('MISSING_REVISION');
  });

  it('rejects broken prerequisites', () => {
    const curriculum = curriculumWith((value) => {
      value.stages[1]!.prerequisiteIds = ['missing-stage'];
    });
    expect(validateGrammarCurriculum(curriculum).map((issue) => issue.code)).toContain('BROKEN_PREREQUISITE');
  });

  it('rejects exercises without feedback for every choice and accepted answer', () => {
    const curriculum = curriculumWith((value) => {
      const exercise = value.stages[0]!.lessons[0]!.exercises[0]!;
      exercise.options[0]!.rationale = '';
    });
    expect(validateGrammarCurriculum(curriculum).map((issue) => issue.code)).toContain('MISSING_FEEDBACK');
  });

  it('rejects publication without verified human editorial review', () => {
    const curriculum = curriculumWith((value) => {
      value.stages[0]!.lessons[0]!.review = { status: 'pending', reviewer: null, reviewedAt: null };
      value.stages[0]!.publicationStatus = 'published';
    });
    expect(validateGrammarCurriculum(curriculum).map((issue) => issue.code)).toContain('UNREVIEWED_PUBLICATION');
  });

  it('reports a published lesson with missing review metadata without throwing', () => {
    const curriculum = curriculumWith((value) => {
      value.stages[0]!.publicationStatus = 'published';
      (value.stages[0]!.lessons[0] as unknown as { review?: unknown }).review = undefined;
    });
    expect(validateGrammarCurriculum(curriculum).map((issue) => issue.code)).toContain('MISSING_REVIEW_STATUS');
  });

  it('rejects an empty stage marked published', () => {
    const curriculum = curriculumWith((value) => {
      value.stages[1]!.publicationStatus = 'published';
      value.stages[1]!.lessons = [];
    });
    expect(validateGrammarCurriculum(curriculum).map((issue) => issue.code)).toContain('EMPTY_PUBLISHED_STAGE');
  });

  it('rejects placeholder prose rather than treating titles as lessons', () => {
    const curriculum = curriculumWith((value) => {
      value.stages[0]!.lessons[0]!.explanation = 'TODO: lesson to be authored.';
    });
    expect(validateGrammarCurriculum(curriculum).map((issue) => issue.code)).toContain('PLACEHOLDER_CONTENT');
  });

  it('gives every exercise explicit correct and incorrect rationales and accepted variants', () => {
    for (const stage of getGrammarCurriculum().stages.slice(0, 2)) {
      for (const lesson of stage.lessons) {
        expect(lesson.exercises.length).toBeGreaterThan(0);
        for (const exercise of lesson.exercises) {
          expect(exercise.options.filter((option) => option.correct).length).toBeGreaterThan(0);
          expect(exercise.options.every((option) => option.rationale.trim().length > 0)).toBe(true);
          expect(exercise.acceptedAnswers.every((answer) => answer.text.trim() && answer.rationale.trim())).toBe(true);
        }
      }
    }
  });
});
