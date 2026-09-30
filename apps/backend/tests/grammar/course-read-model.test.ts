/**
 * @file course-read-model.test.ts
 * @description Verifies publication gating and answer-safe grammar course projections.
 */
import { describe, expect, it } from 'vitest';
import { getGrammarCurriculum } from '../../src/grammar/content/manifest.js';
import type { GrammarCurriculum } from '../../src/grammar/content/types.js';
import { getGrammarCourse, getGrammarLesson, GrammarLessonUnavailableError } from '../../src/grammar/course-read-model.js';

function reviewedCurriculum(): GrammarCurriculum {
  const curriculum = getGrammarCurriculum();
  for (const lesson of curriculum.stages[0]!.lessons) {
    lesson.review = { status: 'approved', reviewer: 'Editorial reviewer', reviewedAt: '2026-09-26T10:00:00.000Z' };
  }
  curriculum.stages[1]!.publicationStatus = 'draft';
  return curriculum;
}

describe('grammar course read model', () => {
  it('hides a withdrawn draft stage without distinguishing it from unknown IDs publicly', () => {
    const curriculum = getGrammarCurriculum();
    curriculum.stages[0]!.publicationStatus = 'draft';

    expect(getGrammarCourse(curriculum)).toEqual({ isComplete: false, stages: [] });
    expect(() => getGrammarLesson(curriculum, 'grammar-0-be')).toThrow(GrammarLessonUnavailableError);
    expect(() => getGrammarLesson(curriculum, 'grammar-0-be')).toThrow(expect.objectContaining({ reason: 'unpublished' }));
    expect(() => getGrammarLesson(curriculum, 'guessed-lesson')).toThrow(expect.objectContaining({ reason: 'not-found' }));
  });

  it('returns reviewed published lesson text only without leaking hidden prerequisites or answers', () => {
    const curriculum = reviewedCurriculum();
    (curriculum.stages[0]!.lessons[0]!.sources[0] as unknown as Record<string, unknown>).internalKey = 'private-source-metadata';
    const course = getGrammarCourse(curriculum);
    const lesson = getGrammarLesson(curriculum, 'grammar-0-word-roles');

    expect(course.isComplete).toBe(false);
    expect(course.stages.map(({ id, level }) => ({ id, level }))).toEqual([{ id: 'grammar-stage-0', level: '0' }]);
    expect(JSON.stringify({ course, lesson })).not.toContain('grammar-stage-a1');
    expect(JSON.stringify({ course, lesson })).not.toContain('grammar-a1-pronouns-and-articles');
    expect(JSON.stringify({ course, lesson })).not.toContain('private-source-metadata');
    expect(lesson).toMatchObject({ id: 'grammar-0-word-roles', title: 'Nhận ra vai trò của từ' });
    expect(lesson.exercises.map(({ id, prompt }) => ({ id, prompt }))).toEqual([
      { id: 'grammar-0-word-roles-q1', prompt: 'Trong “The young bird flies”, từ nào nêu hành động?' },
    ]);
    expect(lesson.exercises[0]!.options).toEqual([{ text: 'young' }, { text: 'bird' }, { text: 'flies' }]);
    expect(lesson.sources.map(({ id }) => id)).toEqual(['bc-nouns', 'bc-verbs', 'bc-adjectives']);
    expect(lesson.sources[0]).toEqual({ id: 'bc-nouns', title: 'British Council LearnEnglish: Nouns', url: 'https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/nouns' });
    expect(JSON.stringify(lesson)).not.toMatch(/\"(?:correct|rationale|acceptedAnswers|review|prerequisiteIds)\"\s*:/);
  });

  it('requires valid reviewer metadata for every lesson and returns detached copies', () => {
    const curriculum = reviewedCurriculum();
    const sourceLesson = curriculum.stages[0]!.lessons[0]!;
    sourceLesson.review = { status: 'approved', reviewer: '  ', reviewedAt: null };

    expect(getGrammarCourse(curriculum).stages).toEqual([]);
    expect(() => getGrammarLesson(curriculum, sourceLesson.id)).toThrow(expect.objectContaining({ reason: 'unpublished' }));

    sourceLesson.review = { status: 'approved', reviewer: 'Editorial reviewer', reviewedAt: '2026-09-26T10:00:00.000Z' };
    const returnedLesson = getGrammarLesson(curriculum, sourceLesson.id);
    returnedLesson.exercises[0]!.options[0]!.text = 'mutated response';
    expect(sourceLesson.exercises[0]!.options[0]!.text).toBe('young');
  });
  it('does not expose a later stage when an earlier prerequisite stage is unpublished', () => {
    const curriculum = getGrammarCurriculum();
    curriculum.stages[0]!.publicationStatus = 'draft';
    const a1 = curriculum.stages[1]!;
    a1.publicationStatus = 'published';
    for (const lesson of a1.lessons) {
      lesson.review = { status: 'approved', reviewer: 'Test reviewer', reviewedAt: '2026-09-26T10:00:00.000Z' };
    }

    expect(getGrammarCourse(curriculum).stages).toEqual([]);
    expect(() => getGrammarLesson(curriculum, a1.lessons[0]!.id)).toThrow(GrammarLessonUnavailableError);
  });

  it.each(['new-unwritten-topic', 'toString', ''])('withholds a stage with unsupported teaching topic %s', (topic) => {
    const curriculum = reviewedCurriculum();
    curriculum.stages[0]!.lessons[0]!.coverage = [topic];
    expect(getGrammarCourse(curriculum)).toEqual({ isComplete: false, stages: [] });
    expect(() => getGrammarLesson(curriculum, 'grammar-0-word-roles')).toThrow(GrammarLessonUnavailableError);
  });
});
