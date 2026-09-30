/**
 * @file grammar.repository.test.ts
 * @description Exercises isolated grammar progress and idempotent attempt persistence with real SQLite.
 */
import Database from 'better-sqlite3';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { createGrammarTables } from '../../src/db/grammar-tables.js';
import { GrammarRepository, GrammarRepositoryConflictError } from '../../src/repositories/grammar.repository.js';
import type { RecordGrammarAttemptInput } from '../../src/repositories/grammar.repository.js';

const temporaryDirectories: string[] = [];

function createRepository(sqlite: Database.Database): GrammarRepository {
  createGrammarTables(sqlite);
  return new GrammarRepository(sqlite);
}

function submission(overrides: Partial<RecordGrammarAttemptInput> = {}): RecordGrammarAttemptInput {
  return {
    lessonId: 'grammar-0-be',
    revisionId: 'grammar-0-be@1.0.0',
    revision: '1.0.0',
    exerciseId: 'grammar-0-be-exercise-1',
    requestId: 'request-1',
    answer: { type: 'choice', text: 'am' },
    isCorrect: true,
    feedback: 'Am agrees with I.',
    exerciseIds: ['grammar-0-be-exercise-1', 'grammar-0-be-exercise-2'],
    ...overrides,
  };
}

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) rmSync(directory, { recursive: true, force: true });
});

describe('standalone grammar repository', () => {
  it('appends a graded attempt and atomically creates progress without touching vocabulary', () => {
    const sqlite = new Database(':memory:');
    try {
      sqlite.exec("CREATE TABLE words (id TEXT PRIMARY KEY, word TEXT NOT NULL); INSERT INTO words VALUES ('word-1', 'existing');");
      const repository = createRepository(sqlite);
      const result = repository.recordAttempt(submission());

      expect(result.attempt).toMatchObject({
        lessonId: 'grammar-0-be',
        revisionId: 'grammar-0-be@1.0.0',
        revision: '1.0.0',
        exerciseId: 'grammar-0-be-exercise-1',
        requestId: 'request-1',
        answer: { type: 'choice', text: 'am' },
        isCorrect: true,
        feedback: 'Am agrees with I.',
      });
      expect(repository.findProgressByLessonId('grammar-0-be')).toMatchObject({
        lessonId: 'grammar-0-be',
        revisionId: 'grammar-0-be@1.0.0',
        revision: '1.0.0',
        lastPosition: 1,
        isComplete: false,
      });
      expect(repository.findAttemptByRequestId('request-1')).toEqual(result.attempt);
      expect(sqlite.prepare('SELECT * FROM words').all()).toEqual([{ id: 'word-1', word: 'existing' }]);
      expect(sqlite.pragma('foreign_keys', { simple: true })).toBe(1);
    } finally {
      sqlite.close();
    }
  });

  it('returns the original grade for a repeated request ID on the same synchronous connection', () => {
    const sqlite = new Database(':memory:');
    try {
      const repository = createRepository(sqlite);
      const first = repository.recordAttempt(submission());
      const retry = repository.recordAttempt(submission({ isCorrect: false, feedback: 'Changed grader output' }));

      expect(retry).toEqual(first);
      expect(sqlite.prepare('SELECT count(*) AS count FROM grammar_exercise_attempts').get()).toEqual({ count: 1 });
      expect(repository.findProgressByLessonId('grammar-0-be')).toMatchObject({ lastPosition: 1, isComplete: false });
    } finally {
      sqlite.close();
    }
  });

  it.each([
    { lessonId: 'grammar-0-other' },
    { exerciseId: 'grammar-0-be-exercise-2' },
    { answer: { type: 'choice' as const, text: 'are' } },
    { answer: { type: 'text' as const, text: 'am' } },
  ])('rejects request ID reuse with changed recorded identity fields: %o', (changed) => {
    const sqlite = new Database(':memory:');
    try {
      const repository = createRepository(sqlite);
      repository.recordAttempt(submission());

      expect(() => repository.recordAttempt(submission(changed))).toThrow(GrammarRepositoryConflictError);
      expect(sqlite.prepare('SELECT count(*) AS count FROM grammar_exercise_attempts').get()).toEqual({ count: 1 });
    } finally {
      sqlite.close();
    }
  });

  it('advances only after every exercise has an attempt, without regressing after repeats', () => {
    const sqlite = new Database(':memory:');
    try {
      const repository = createRepository(sqlite);
      const first = repository.recordAttempt(submission({ exerciseId: 'grammar-0-be-exercise-2' }));
      expect(repository.findProgressByLessonId('grammar-0-be')).toMatchObject({ lastPosition: 0, isComplete: false });
      const second = repository.recordAttempt(submission({ requestId: 'request-2', exerciseId: 'grammar-0-be-exercise-1', answer: { type: 'choice', text: 'are' }, isCorrect: false, feedback: 'Are does not agree with I.' }));

      expect(second.attempt.requestId).toBe('request-2');
      expect(repository.findAttemptByRequestId('request-1')).toEqual(first.attempt);
      expect(repository.findSubmittedExerciseIds('grammar-0-be', 'grammar-0-be@1.0.0')).toEqual(['grammar-0-be-exercise-1', 'grammar-0-be-exercise-2']);
      expect(repository.findProgressByLessonId('grammar-0-be')).toMatchObject({ lastPosition: 2, isComplete: true });
      repository.recordAttempt(submission({ requestId: 'request-3', exerciseId: 'grammar-0-be-exercise-2' }));
      expect(repository.findProgressByLessonId('grammar-0-be')).toMatchObject({ lastPosition: 2, isComplete: true });
    } finally {
      sqlite.close();
    }
  });

  it('rejects a lesson revision change without regrading or replacing historical attempts', () => {
    const sqlite = new Database(':memory:');
    try {
      const repository = createRepository(sqlite);
      const original = repository.recordAttempt(submission());

      expect(() => repository.recordAttempt(submission({
        requestId: 'request-2', revisionId: 'grammar-0-be@2.0.0', revision: '2.0.0', answer: { type: 'text', text: 'was' },
      }))).toThrow(GrammarRepositoryConflictError);
      expect(sqlite.prepare('SELECT count(*) AS count FROM grammar_exercise_attempts').get()).toEqual({ count: 1 });
      expect(repository.findAttemptByRequestId('request-1')).toEqual(original.attempt);
      expect(repository.findProgressByLessonId('grammar-0-be')).toMatchObject({ revision: '1.0.0', lastPosition: 1 });
    } finally {
      sqlite.close();
    }
  });

  it('rolls back a new progress row and attempt when the progress update fails midway', () => {
    const sqlite = new Database(':memory:');
    try {
      const repository = createRepository(sqlite);
      sqlite.exec(`CREATE TRIGGER reject_progress_update BEFORE UPDATE ON grammar_lesson_progress
        BEGIN SELECT RAISE(ABORT, 'injected progress update failure'); END`);

      expect(() => repository.recordAttempt(submission())).toThrow(/injected progress update failure/);
      expect(repository.findProgressByLessonId('grammar-0-be')).toBeNull();
      expect(repository.findAttemptByRequestId('request-1')).toBeNull();
    } finally {
      sqlite.close();
    }
  });

  it('persists progress and the immutable grade after reopening a temporary database', () => {
    const directory = mkdtempSync(join(tmpdir(), 'grammar-repository-'));
    temporaryDirectories.push(directory);
    const databasePath = join(directory, 'grammar.db');
    const first = new Database(databasePath);
    first.pragma('journal_mode = WAL');
    try {
      createRepository(first).recordAttempt(submission());
    } finally {
      first.close();
    }

    const reopened = new Database(databasePath);
    try {
      const repository = createRepository(reopened);
      expect(repository.findProgressByLessonId('grammar-0-be')).toMatchObject({ lastPosition: 1, isComplete: false });
      expect(repository.findAttemptByRequestId('request-1')).toMatchObject({ answer: { type: 'choice', text: 'am' }, isCorrect: true, feedback: 'Am agrees with I.' });
    } finally {
      reopened.close();
    }
  });

  it('rejects invalid grade flags and positions before writing anything', () => {
    const sqlite = new Database(':memory:');
    try {
      const repository = createRepository(sqlite);
      expect(() => repository.recordAttempt(submission({ isCorrect: 1 as unknown as boolean }))).toThrow(/isCorrect/);
      expect(() => repository.recordAttempt(submission({ exerciseIds: [] }))).toThrow(/exerciseIds/);
      expect(sqlite.prepare('SELECT count(*) AS count FROM grammar_lesson_progress').get()).toEqual({ count: 0 });
      expect(sqlite.prepare('SELECT count(*) AS count FROM grammar_exercise_attempts').get()).toEqual({ count: 0 });
    } finally {
      sqlite.close();
    }
  });
});
