/**
 * @file grammar.service.test.ts
 * @description Exercises published grammar reads, deterministic grading, and SQLite-backed submission state.
 */
import Database from 'better-sqlite3';
import { afterEach, describe, expect, it } from 'vitest';
import { createGrammarTables } from '../../src/db/grammar-tables.js';
import { getGrammarCurriculum } from '../../src/grammar/content/manifest.js';
import { GrammarLessonUnavailableError } from '../../src/grammar/course-read-model.js';
import type { GrammarCurriculum } from '../../src/grammar/content/types.js';
import { GrammarRepository, GrammarRepositoryConflictError } from '../../src/repositories/grammar.repository.js';
import { GrammarService, GrammarServiceConflictError, GrammarServiceInvalidAnswerError, GrammarServiceInvalidContentError } from '../../src/services/grammar.service.js';

const databases: Database.Database[] = [];
const lessonId = 'grammar-0-word-roles';
const exerciseId = 'grammar-0-word-roles-q1';

function createService(curriculum = getGrammarCurriculum()): { service: GrammarService; sqlite: Database.Database } {
  const sqlite = new Database(':memory:');
  databases.push(sqlite);
  createGrammarTables(sqlite);
  return { service: new GrammarService(curriculum, new GrammarRepository(sqlite)), sqlite };
}

function reviewedCurriculum(): GrammarCurriculum {
  const curriculum = getGrammarCurriculum();
  for (const stage of curriculum.stages.slice(0, 2)) {
    stage.publicationStatus = 'published';
    for (const lesson of stage.lessons) {
      lesson.review = { status: 'approved', reviewer: 'Test-only reviewer', reviewedAt: '2026-09-26T10:00:00.000Z' };
    }
  }
  return curriculum;
}

function submission(overrides: Record<string, unknown> = {}) {
  return {
    requestId: 'request-1',
    exerciseId,
    answer: { type: 'choice', text: 'flies' },
    ...overrides,
  };
}

afterEach(() => {
  for (const sqlite of databases.splice(0)) sqlite.close();
});

describe('GrammarService', () => {
  it('returns only the published projection and hides withdrawn lessons behind the unavailable error', () => {
    const withdrawn = getGrammarCurriculum();
    withdrawn.stages[0]!.publicationStatus = 'draft';
    const liveDraft = createService(withdrawn);

    expect(liveDraft.service.getCourse()).toEqual({ isComplete: false, stages: [] });
    expect(() => liveDraft.service.getLesson(lessonId)).toThrow(GrammarLessonUnavailableError);
    expect(() => liveDraft.service.getLesson(lessonId)).toThrowError('Grammar lesson is unavailable.');
    expect(() => liveDraft.service.getLesson('grammar-0-missing')).toThrowError('Grammar lesson is unavailable.');

    const reviewed = createService(reviewedCurriculum()).service.getLesson(lessonId);
    expect(reviewed.exercises).toEqual([{
      id: exerciseId,
      prompt: 'Trong “The young bird flies”, từ nào nêu hành động?',
      options: [{ text: 'young' }, { text: 'bird' }, { text: 'flies' }],
    }]);
    expect(JSON.stringify(reviewed)).not.toMatch(/"(?:correct|rationale|acceptedAnswers|review)"\s*:/);
  });

  it('persists an authored incorrect choice as an incomplete-quality but completed single-exercise lesson', () => {
    const { service, sqlite } = createService(reviewedCurriculum());

    const result = service.submitAnswer(lessonId, submission({ answer: { type: 'choice', text: 'young' } }));

    expect(result).toMatchObject({
      attempt: { lessonId, exerciseId, requestId: 'request-1', answer: { type: 'choice', text: 'young' }, isCorrect: false, feedback: 'young mô tả bird, không nêu hành động.' },
      progress: { lessonId, lastPosition: 1, isComplete: true },
    });
    expect(sqlite.prepare('SELECT count(*) AS count FROM grammar_exercise_attempts').get()).toEqual({ count: 1 });
  });

  it('accepts authored typed variants and grades unknown typed answers without invented diagnosis', () => {
    const { service, sqlite } = createService(reviewedCurriculum());
    const variant = service.submitAnswer(lessonId, submission({
      answer: { type: 'text', text: '  FLIES  ' },
    }));
    const unknown = service.submitAnswer(lessonId, submission({
      requestId: 'request-2', answer: { type: 'text', text: 'flutters' },
    }));

    expect(variant.attempt).toMatchObject({ isCorrect: true, feedback: 'flies là động từ chỉ hành động trong câu.' });
    expect(unknown.attempt).toMatchObject({ isCorrect: false });
    expect(unknown.attempt.feedback).toContain('flies');
    expect(unknown.attempt.feedback).not.toContain('Your answer is wrong because');
    expect(sqlite.prepare('SELECT count(*) AS count FROM grammar_exercise_attempts').get()).toEqual({ count: 2 });
  });

  it('distinguishes invalid learner choice from broken authored answer keys without writing progress', () => {
    const { service, sqlite } = createService(reviewedCurriculum());

    expect(() => service.submitAnswer(lessonId, submission({ answer: { type: 'choice', text: 'FLIES' } })))
      .toThrow(GrammarServiceInvalidAnswerError);
    const curriculum = reviewedCurriculum();
    curriculum.stages[0]!.lessons[0]!.exercises[0]!.options[0]!.text = '  flies  ';
    const invalidExerciseService = new GrammarService(curriculum, new GrammarRepository(sqlite));
    expect(() => invalidExerciseService.submitAnswer(lessonId, submission())).toThrow(GrammarServiceInvalidContentError);
    expect(sqlite.prepare('SELECT count(*) AS count FROM grammar_exercise_attempts').get()).toEqual({ count: 0 });
    expect(sqlite.prepare('SELECT count(*) AS count FROM grammar_lesson_progress').get()).toEqual({ count: 0 });
  });
  it('classifies a published lesson with no practice as broken content, without storing an attempt', () => {
    const curriculum = reviewedCurriculum();
    curriculum.stages[0]!.lessons[0]!.exercises = [];
    const { service, sqlite } = createService(curriculum);

    expect(() => service.submitAnswer(lessonId, submission())).toThrow(GrammarServiceInvalidContentError);
    expect(sqlite.prepare('SELECT count(*) AS count FROM grammar_exercise_attempts').get()).toEqual({ count: 0 });
  });

  it('returns progress from the same transaction as its attempt despite another connection completing the lesson', () => {
    const curriculum = reviewedCurriculum();
    const a1 = 'grammar-a1-pronouns-and-articles';
    const { service, sqlite } = createService(curriculum);
    const repository = new GrammarRepository(sqlite);
    const originalRecord = repository.recordAttempt.bind(repository);
    repository.recordAttempt = (input) => {
      const result = originalRecord(input);
      service.submitAnswer(a1, submission({ requestId: 'request-2', exerciseId: 'grammar-a1-pronouns-and-articles-q2', answer: { type: 'choice', text: 'an apple' } }));
      return result;
    };
    const first = new GrammarService(curriculum, repository).submitAnswer(a1, submission({ exerciseId: 'grammar-a1-pronouns-and-articles-q1', answer: { type: 'choice', text: 'him' } }));

    expect(first.progress).toMatchObject({ isComplete: false, lastPosition: 1 });
    expect(repository.findProgressByLessonId(a1)).toMatchObject({ isComplete: true, lastPosition: 2 });
  });

  it('rejects an exercise ID owned by a different lesson before considering an idempotent retry', () => {
    const { service, sqlite } = createService(reviewedCurriculum());
    service.submitAnswer(lessonId, submission());

    expect(() => service.submitAnswer(lessonId, submission({
      requestId: 'request-2', exerciseId: 'grammar-0-subjects-and-verbs-q1',
    }))).toThrow(GrammarLessonUnavailableError);
    expect(sqlite.prepare('SELECT count(*) AS count FROM grammar_exercise_attempts').get()).toEqual({ count: 1 });
  });

  it('returns the original persisted grade for an identical request ID without regrading', () => {
    const { service, sqlite } = createService(reviewedCurriculum());
    const first = service.submitAnswer(lessonId, submission());
    const retry = service.submitAnswer(lessonId, submission());

    expect(retry).toEqual(first);
    expect(sqlite.prepare('SELECT count(*) AS count FROM grammar_exercise_attempts').get()).toEqual({ count: 1 });
  });

  it('conflicts on changed identity and returns the immutable original grade after a revision change', () => {
    const curriculum = reviewedCurriculum();
    const { service } = createService(curriculum);
    const original = service.submitAnswer(lessonId, submission());

    expect(() => service.submitAnswer(lessonId, submission({ answer: { type: 'choice', text: 'young' } })))
      .toThrow(GrammarServiceConflictError);
    const lesson = curriculum.stages[0]!.lessons[0]!;
    lesson.revision = '2.0.0';
    lesson.revisionId = `${lessonId}@2.0.0`;
    lesson.exercises[0]!.options[2]!.rationale = 'Updated authored answer key.';
    expect(service.submitAnswer(lessonId, submission())).toEqual(original);
    expect(() => service.submitAnswer(lessonId, submission({ requestId: 'request-2' })))
      .toThrow(GrammarRepositoryConflictError);
  });

  it('does not disclose an old idempotent result if the lesson is no longer published', () => {
    const curriculum = reviewedCurriculum();
    const { service, sqlite } = createService(curriculum);
    service.submitAnswer(lessonId, submission());
    curriculum.stages[0]!.publicationStatus = 'draft';

    expect(() => service.submitAnswer(lessonId, submission())).toThrow(GrammarLessonUnavailableError);
    expect(sqlite.prepare('SELECT count(*) AS count FROM grammar_exercise_attempts').get()).toEqual({ count: 1 });
  });

  it('completes an A1 practice set only after both exercises, even when submitted out of order', () => {
    const first = 'grammar-a1-pronouns-and-articles-q1';
    const second = 'grammar-a1-pronouns-and-articles-q2';
    const { service, sqlite } = createService(reviewedCurriculum());
    const a1 = 'grammar-a1-pronouns-and-articles';

    const later = service.submitAnswer(a1, submission({ exerciseId: second, answer: { type: 'choice', text: 'a apple' } }));
    expect(later.progress).toMatchObject({ lastPosition: 0, isComplete: false });
    expect(service.submitAnswer(a1, submission({ exerciseId: second, answer: { type: 'choice', text: 'a apple' } }))).toEqual(later);
    const done = service.submitAnswer(a1, submission({ requestId: 'request-2', exerciseId: first, answer: { type: 'choice', text: 'him' } }));
    expect(done.progress).toMatchObject({ lastPosition: 2, isComplete: true });
    expect(sqlite.prepare('SELECT count(*) AS count FROM grammar_exercise_attempts').get()).toEqual({ count: 2 });
  });

  it('rejects a withdrawn stage before storing any attempt', () => {
    const withdrawn = getGrammarCurriculum();
    withdrawn.stages[0]!.publicationStatus = 'draft';
    const { service, sqlite } = createService(withdrawn);

    expect(() => service.submitAnswer(lessonId, submission())).toThrow(GrammarLessonUnavailableError);
    expect(sqlite.prepare('SELECT count(*) AS count FROM grammar_exercise_attempts').get()).toEqual({ count: 0 });
    expect(sqlite.prepare('SELECT count(*) AS count FROM grammar_lesson_progress').get()).toEqual({ count: 0 });
  });
});
