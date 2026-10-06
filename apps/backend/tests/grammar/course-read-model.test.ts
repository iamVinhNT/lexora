/**
 * @file course-read-model.test.ts
 * @description Verifies publication gating and answer-safe grammar course projections.
 */
import { describe, expect, it } from 'vitest';
import {
  getGrammarCourse,
  getGrammarLesson,
  GrammarCurriculumChangedConflictError,
  GrammarLessonUnavailableError,
} from '../../src/grammar/course-read-model.js';
import { createTestCurriculum, createTestLesson } from './fixtures.js';

describe('grammar course read model', () => {
  it('hides a withdrawn draft stage without distinguishing it from unknown IDs publicly', () => {
    const curriculum = createTestCurriculum();
    curriculum.stages[0]!.publicationStatus = 'draft';

    expect(getGrammarCourse(curriculum)).toEqual({ isComplete: false, stages: [] });
    expect(() => getGrammarLesson(curriculum, 'grammar-v2-0-word-roles-01')).toThrow(GrammarLessonUnavailableError);
    expect(() => getGrammarLesson(curriculum, 'grammar-v2-0-word-roles-01')).toThrow(
      expect.objectContaining({ reason: 'unpublished' }),
    );
    expect(() => getGrammarLesson(curriculum, 'guessed-lesson')).toThrow(
      expect.objectContaining({ reason: 'not-found' }),
    );
  });

  it('throws GrammarCurriculumChangedConflictError for legacy lesson IDs', () => {
    const curriculum = createTestCurriculum();
    expect(() => getGrammarLesson(curriculum, 'grammar-0-word-roles')).toThrow(
      GrammarCurriculumChangedConflictError,
    );
    expect(() => getGrammarLesson(curriculum, 'grammar-0-word-roles')).toThrow(
      expect.objectContaining({ reason: 'CURRICULUM_CHANGED', lessonId: 'grammar-0-word-roles' }),
    );
  });

  it('returns reviewed published lesson text only without leaking hidden prerequisites or answers', () => {
    const curriculum = createTestCurriculum();
    (curriculum.stages[0]!.lessons[0]!.sources[0] as unknown as Record<string, unknown>).internalKey =
      'private-source-metadata';
    const course = getGrammarCourse(curriculum);
    const lesson = getGrammarLesson(curriculum, 'grammar-v2-0-word-roles-01');

    expect(course.isComplete).toBe(true);
    expect(course.stages[0]!.lessons[0]!.coverage).toEqual(['word-roles', 'parts-of-speech']);
    expect(JSON.stringify({ course, lesson })).not.toContain('private-source-metadata');

    expect(lesson).toMatchObject({
      id: 'grammar-v2-0-word-roles-01',
      title: 'Nhận diện vai trò từ trong câu chuẩn',
      coverage: ['word-roles', 'parts-of-speech'],
      context: {
        english: 'Tom has a dog. The dog barks.',
        vietnamese: 'Tom có một con chó. Con chó sủa.',
      },
      guide: {
        pattern: 'Noun + Verb + Adjective',
      },
    });

    expect(lesson.exercises.length).toBe(12);
    expect(lesson.exercises[0]).toEqual({
      id: 'grammar-v2-0-word-roles-01-q1',
      kind: 'choice',
      prompt: 'Từ nào là động từ?',
      options: [{ text: 'runs' }, { text: 'dog' }, { text: 'big' }],
    });

    // Typed exercise has empty options
    expect(lesson.exercises[4]).toEqual({
      id: 'grammar-v2-0-word-roles-01-q5',
      kind: 'gap',
      prompt: 'Điền từ loại: "bark" là một ___',
      options: [],
    });

    // Output prompt safe projection
    expect(lesson.outputPrompts.length).toBe(2);
    expect(lesson.outputPrompts[0]).toEqual({
      id: 'grammar-v2-0-word-roles-01-o1',
      prompt: 'Viết 2 câu ngắn mô tả con vật.',
      checks: ['Có danh từ và động từ', 'Đúng trật tự từ'],
    });

    // Strictly no answer leakage
    const json = JSON.stringify(lesson);
    expect(json).not.toMatch(/"(?:correct|rationale|acceptedAnswers|review|prerequisiteIds|modelAnswer|reviewExercises)"\s*:/);
  });

  it('requires valid reviewer metadata with mode ai-internal and returns detached copies', () => {
    const curriculum = createTestCurriculum();
    const sourceLesson = curriculum.stages[0]!.lessons[0]!;
    sourceLesson.review = { status: 'approved', mode: 'ai-internal', reviewer: '  ', reviewedAt: null };

    expect(getGrammarCourse(curriculum).stages).toEqual([]);
    expect(() => getGrammarLesson(curriculum, sourceLesson.id)).toThrow(
      expect.objectContaining({ reason: 'unpublished' }),
    );

    sourceLesson.review = {
      status: 'approved',
      mode: 'ai-internal',
      reviewer: 'Editorial Reviewer',
      reviewedAt: '2026-10-05T00:00:00.000Z',
    };
    const returnedLesson = getGrammarLesson(curriculum, sourceLesson.id);
    returnedLesson.exercises[0]!.options[0]!.text = 'mutated response';
    expect(sourceLesson.exercises[0]!.options[0]!.text).toBe('runs');
  });

  it('does not expose a later stage when an earlier prerequisite stage is unpublished', () => {
    const curriculum = createTestCurriculum();
    curriculum.stages[0]!.publicationStatus = 'draft';

    expect(getGrammarCourse(curriculum).stages).toEqual([]);
    expect(() => getGrammarLesson(curriculum, curriculum.stages[1]!.lessons[0]!.id)).toThrow(
      GrammarLessonUnavailableError,
    );
  });
});
