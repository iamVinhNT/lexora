/**
 * @file grammar.service.test.ts
 * @description Exercises revision-safe core reads, deterministic submissions, and immutable first-attempt quality.
 */
import Database from 'better-sqlite3';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createGrammarTables } from '../../src/db/grammar-tables.js';
import { GrammarLessonUnavailableError, GrammarCurriculumChangedConflictError } from '../../src/grammar/course-read-model.js';
import { GrammarRepository, GrammarRepositoryConflictError } from '../../src/repositories/grammar.repository.js';
import { GrammarService, GrammarServiceConflictError, GrammarServiceInvalidAnswerError, GrammarServiceInvalidContentError } from '../../src/services/grammar.service.js';
import { createTestCurriculum } from '../grammar/fixtures.js';
import type { GrammarExercise } from '../../src/grammar/content/types.js';

const databases: Database.Database[] = [];
const lessonId = 'grammar-v2-0-word-roles-01';
const exerciseId = `${lessonId}-q1`;

function createService(curriculum = createTestCurriculum()) {
  const sqlite = new Database(':memory:');
  databases.push(sqlite);
  createGrammarTables(sqlite);
  const repository = new GrammarRepository(sqlite);
  return { service: new GrammarService(curriculum, repository), repository, sqlite, curriculum };
}

function submission(overrides: Record<string, unknown> = {}) {
  return { requestId: 'request-1', exerciseId, answer: { type: 'choice', text: 'runs' }, ...overrides };
}

function responseFor(exercise: GrammarExercise) {
  return { type: exercise.kind === 'choice' ? 'choice' as const : 'text' as const, text: exercise.acceptedAnswers[0]!.text };
}

afterEach(() => {
  for (const sqlite of databases.splice(0)) sqlite.close();
  vi.useRealTimers();
});

describe('GrammarService', () => {
  it('hides withdrawn content and keeps safe projections detached from authored keys', () => {
    const { service, curriculum } = createService();
    const lesson = service.getLesson(lessonId);
    expect(lesson.exercises.map(({ kind }) => kind)).toEqual(['choice', 'choice', 'choice', 'choice', 'gap', 'gap', 'gap', 'gap', 'transform', 'transform', 'correction', 'correction']);
    expect(JSON.stringify(lesson)).not.toMatch(/"(?:correct|rationale|acceptedAnswers|review|reviewExercises|modelAnswer)"\s*:/);
    curriculum.stages[0]!.publicationStatus = 'draft';
    expect(service.getCourse()).toEqual({ isComplete: false, stages: [] });
    expect(() => service.getLesson(lessonId)).toThrow(GrammarLessonUnavailableError);
    expect(() => service.getLesson('grammar-v2-0-missing-99')).toThrow(GrammarLessonUnavailableError);
  });

  it('keeps completion submission-based and first quality immutable after correction', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-05T12:00:00Z'));
    const { service, curriculum, sqlite } = createService();
    const wrong = service.submitAnswer(lessonId, submission({ answer: { type: 'choice', text: 'dog' } }));
    expect(wrong.attempt.isCorrect).toBe(false);
    expect(wrong.progress.isComplete).toBe(false);
    expect(wrong.firstAttemptAccuracy).toEqual({ correct: 0, total: 1, percent: null });
    vi.advanceTimersByTime(1000);
    service.submitAnswer(lessonId, submission({ requestId: 'correction' }));
    for (const exercise of curriculum.stages[0]!.lessons[0]!.exercises.slice(1)) {
      vi.advanceTimersByTime(1000);
      service.submitAnswer(lessonId, submission({ requestId: exercise.id, exerciseId: exercise.id, answer: responseFor(exercise) }));
    }
    const detail = service.getLessonWithProgress(lessonId);
    expect(detail.progress).toMatchObject({ lastPosition: 12, isComplete: true });
    expect(detail.firstAttemptAccuracy).toEqual({ correct: 11, total: 12, percent: 92 });
    expect(detail.nextLessonId).toBe(curriculum.stages[1]!.lessons[0]!.id);
    const course = service.getCourseWithProgress();
    expect(course.stages[0]!.lessons[0]!.firstAttemptAccuracy).toEqual(detail.firstAttemptAccuracy);
    expect(course.coverage).toContain('word-roles');
    expect(course.firstAttemptAccuracy).toEqual(detail.firstAttemptAccuracy);
    expect(sqlite.prepare('SELECT count(*) AS count FROM grammar_exercise_attempts').get()).toEqual({ count: 13 });
  });

  it('accepts normalized typed variants but requires correct response kind and exact choices', () => {
    const { service, sqlite } = createService();
    expect(() => service.submitAnswer(lessonId, submission({ answer: { type: 'text', text: 'runs' } }))).toThrow(GrammarServiceInvalidAnswerError);
    expect(() => service.submitAnswer(lessonId, submission({ answer: { type: 'choice', text: 'RUNS' } }))).toThrow(GrammarServiceInvalidAnswerError);
    const typedId = `${lessonId}-q5`;
    const typed = service.submitAnswer(lessonId, submission({ exerciseId: typedId, answer: { type: 'text', text: '  VERB\t' } }));
    expect(typed.attempt.isCorrect).toBe(true);
    const unknown = service.submitAnswer(lessonId, submission({ requestId: 'unknown', exerciseId: typedId, answer: { type: 'text', text: 'noun' } }));
    expect(unknown.attempt.isCorrect).toBe(false);
    expect(unknown.attempt.feedback).toContain('verb');
    expect(sqlite.prepare('SELECT count(*) AS count FROM grammar_exercise_attempts').get()).toEqual({ count: 2 });
  });

  it('rejects malformed authored choices and missing exercises without storing attempts', () => {
    const { service, curriculum, sqlite } = createService();
    curriculum.stages[0]!.lessons[0]!.exercises[0]!.options[1]!.text = 'RUNS';
    expect(() => service.submitAnswer(lessonId, submission())).toThrow(GrammarLessonUnavailableError);
    curriculum.stages[0]!.lessons[0]!.exercises = [];
    expect(() => service.submitAnswer(lessonId, submission())).toThrow(GrammarServiceInvalidContentError);
    expect(sqlite.prepare('SELECT count(*) AS count FROM grammar_exercise_attempts').get()).toEqual({ count: 0 });
    expect(sqlite.prepare('SELECT count(*) AS count FROM grammar_lesson_progress').get()).toEqual({ count: 0 });
  });

  it('returns original grade on replay, conflicts on changed identity, preserves old revision evidence', () => {
    const { service, curriculum, sqlite } = createService();
    const first = service.submitAnswer(lessonId, submission());
    expect(service.submitAnswer(lessonId, submission())).toEqual(first);
    expect(() => service.submitAnswer(lessonId, submission({ answer: { type: 'choice', text: 'dog' } }))).toThrow(GrammarServiceConflictError);
    expect(() => service.submitAnswer(lessonId, submission({ requestId: 'foreign', exerciseId: `${curriculum.stages[1]!.lessons[0]!.id}-q1` }))).toThrow(GrammarLessonUnavailableError);
    const authored = curriculum.stages[0]!.lessons[0]!;
    authored.revision = '2.0.0';
    authored.revisionId = `${lessonId}@2.0.0`;
    authored.exercises[0]!.options[0]!.rationale = 'Changed feedback.';
    expect(service.submitAnswer(lessonId, submission())).toEqual(first);
    expect(service.getLessonWithProgress(lessonId)).toMatchObject({ progress: null, firstAttemptAccuracy: { correct: 0, total: 0, percent: null } });
    expect(() => service.submitAnswer(lessonId, submission({ requestId: 'new-revision' }))).toThrow(GrammarRepositoryConflictError);
    expect(sqlite.prepare('SELECT count(*) AS count FROM grammar_exercise_attempts').get()).toEqual({ count: 1 });
  });

  it('does not disclose existing replay when publication is withdrawn', () => {
    const { service, curriculum, sqlite } = createService();
    service.submitAnswer(lessonId, submission());
    curriculum.stages[0]!.publicationStatus = 'draft';
    expect(() => service.submitAnswer(lessonId, submission())).toThrow(GrammarLessonUnavailableError);
    expect(sqlite.prepare('SELECT count(*) AS count FROM grammar_exercise_attempts').get()).toEqual({ count: 1 });
  });

  it('keeps transaction-returned progress instead of rereading a later completion', () => {
    const { service, repository, curriculum } = createService();
    const exercises = curriculum.stages[0]!.lessons[0]!.exercises;
    const original = repository.recordAttempt.bind(repository);
    let nested = false;
    repository.recordAttempt = (input) => {
      const result = original(input);
      if (!nested) {
        nested = true;
        for (const exercise of exercises.slice(1)) service.submitAnswer(lessonId, submission({ requestId: exercise.id, exerciseId: exercise.id, answer: responseFor(exercise) }));
      }
      return result;
    };
    expect(service.submitAnswer(lessonId, submission()).progress.isComplete).toBe(false);
    expect(repository.findProgressByLessonId(lessonId)?.isComplete).toBe(true);
  });

  it('summarizes only known legacy completions and refuses legacy submissions without mutations', () => {
    const { service, repository, sqlite } = createService();
    repository.recordAttempt({ lessonId: 'grammar-0-word-roles', revisionId: 'grammar-0-word-roles@1.0.0', revision: '1.0.0', exerciseId: 'legacy-q1', requestId: 'legacy', answer: { type: 'choice', text: 'yes' }, isCorrect: false, feedback: 'Preserved.', exerciseIds: ['legacy-q1'] });
    const before = sqlite.prepare('SELECT * FROM grammar_lesson_progress').all();
    expect(service.getCourseWithProgress().legacyProgress).toEqual({ completedLessons: 1, totalLessons: 34, attemptsPreserved: true });
    expect(() => service.submitAnswer('grammar-0-word-roles', submission())).toThrow(GrammarCurriculumChangedConflictError);
    expect(sqlite.prepare('SELECT * FROM grammar_lesson_progress').all()).toEqual(before);
  });
});
