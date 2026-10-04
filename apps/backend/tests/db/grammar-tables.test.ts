/**
 * @file grammar-tables.test.ts
 * @description Verifies isolated grammar learner DDL, integrity constraints, idempotency, and rollback.
 */
import Database from 'better-sqlite3';
import { afterEach, describe, expect, it } from 'vitest';
import { mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { createGrammarTables } from '../../src/db/grammar-tables.js';

const temporaryDirectories: string[] = [];

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) rmSync(directory, { recursive: true, force: true });
});

describe('standalone grammar learner tables', () => {
  it('creates grammar and study tables idempotently without changing vocabulary rows', () => {
    const sqlite = new Database(':memory:');
    try {
      sqlite.exec("CREATE TABLE words (id TEXT PRIMARY KEY, word TEXT NOT NULL); INSERT INTO words VALUES ('word-1', 'existing');");
      const vocabularyBefore = sqlite.prepare('SELECT * FROM words').all();

      createGrammarTables(sqlite);
      createGrammarTables(sqlite);

      expect(sqlite.prepare('SELECT * FROM words').all()).toEqual(vocabularyBefore);
      expect(sqlite.pragma('foreign_keys', { simple: true })).toBe(1);
    } finally {
      sqlite.close();
    }
  });

  it('persists progress and attempts across a file database reopen', () => {
    const directory = mkdtempSync(join(tmpdir(), 'grammar-tables-'));
    temporaryDirectories.push(directory);
    const databasePath = join(directory, 'grammar.db');
    const first = new Database(databasePath);
    createGrammarTables(first);
    first.prepare(`INSERT INTO grammar_lesson_progress (lesson_id, revision_id, revision, last_position, created_at, updated_at)
      VALUES ('grammar-0-be', 'grammar-0-be@1.0.0', '1.0.0', 2, '2026-09-27T00:00:00.000Z', '2026-09-27T00:00:00.000Z')`).run();
    first.prepare(`INSERT INTO grammar_exercise_attempts
      (id, lesson_id, revision_id, revision, exercise_id, request_id, answer, is_correct, feedback, created_at)
      VALUES ('attempt-1', 'grammar-0-be', 'grammar-0-be@1.0.0', '1.0.0', 'exercise-1', 'request-1', 'am', 1, 'Correct', '2026-09-27T00:00:00.000Z')`).run();
    expect(first.prepare('SELECT lesson_id, revision_id, revision, last_position FROM grammar_lesson_progress').get())
      .toEqual({ lesson_id: 'grammar-0-be', revision_id: 'grammar-0-be@1.0.0', revision: '1.0.0', last_position: 2 });
    expect(first.prepare('SELECT request_id, exercise_id, revision_id, revision, answer FROM grammar_exercise_attempts').get())
      .toEqual({ request_id: 'request-1', exercise_id: 'exercise-1', revision_id: 'grammar-0-be@1.0.0', revision: '1.0.0', answer: 'am' });
    first.close();

    const reopened = new Database(databasePath);
    try {
      createGrammarTables(reopened);
      expect(reopened.prepare('SELECT lesson_id, revision_id, last_position FROM grammar_lesson_progress').get())
        .toEqual({ lesson_id: 'grammar-0-be', revision_id: 'grammar-0-be@1.0.0', last_position: 2 });
      expect(reopened.prepare('SELECT request_id, exercise_id, answer FROM grammar_exercise_attempts').get())
        .toEqual({ request_id: 'request-1', exercise_id: 'exercise-1', answer: 'am' });
    } finally {
      reopened.close();
    }
  });

  it('enforces unique request IDs, non-empty values, and immutable attempt rows', () => {
    const sqlite = new Database(':memory:');
    try {
      createGrammarTables(sqlite);
      sqlite.exec("INSERT INTO grammar_lesson_progress (lesson_id, revision_id, revision, created_at, updated_at) VALUES ('lesson-1', 'lesson-1@1', '1', '2026-09-27T00:00:00.000Z', '2026-09-27T00:00:00.000Z')");
      const insertAttempt = sqlite.prepare(`INSERT INTO grammar_exercise_attempts
        (id, lesson_id, revision_id, revision, exercise_id, request_id, answer, is_correct, feedback, created_at)
        VALUES (?, 'lesson-1', 'lesson-1@1', '1', 'exercise-1', ?, 'answer', 1, 'feedback', '2026-09-27T00:00:00.000Z')`);
      insertAttempt.run('attempt-1', 'request-1');
      expect(() => sqlite.prepare(`INSERT INTO grammar_exercise_attempts
        (id, lesson_id, revision_id, revision, exercise_id, request_id, answer, is_correct, feedback, created_at)
        VALUES (NULL, 'lesson-1', 'lesson-1@1', '1', 'exercise-1', 'null-id-request', 'answer', 1, 'feedback', '2026-09-27T00:00:00.000Z')`).run())
        .toThrow(/NOT NULL constraint failed/i);

      expect(() => insertAttempt.run('attempt-2', 'request-1')).toThrow(/UNIQUE constraint failed|immutable/i);
      expect(() => sqlite.prepare(`INSERT OR REPLACE INTO grammar_exercise_attempts
        (id, lesson_id, revision_id, revision, exercise_id, request_id, answer, is_correct, feedback, created_at)
        VALUES ('attempt-replaced', 'lesson-1', 'lesson-1@1', '1', 'exercise-1', 'request-1', 'changed', 1, 'feedback', '2026-09-27T00:00:00.000Z')`).run())
        .toThrow(/immutable/i);
      expect(sqlite.prepare("SELECT id, answer FROM grammar_exercise_attempts WHERE request_id = 'request-1'").get())
        .toEqual({ id: 'attempt-1', answer: 'answer' });
      expect(() => sqlite.prepare(`INSERT OR REPLACE INTO grammar_exercise_attempts
        (id, lesson_id, revision_id, revision, exercise_id, request_id, answer, is_correct, feedback, created_at)
        VALUES ('attempt-1', 'lesson-1', 'lesson-1@1', '1', 'exercise-1', 'request-2', 'changed', 1, 'feedback', '2026-09-27T00:00:00.000Z')`).run())
        .toThrow(/immutable/i);
      expect(sqlite.prepare('SELECT id, answer FROM grammar_exercise_attempts').get())
        .toEqual({ id: 'attempt-1', answer: 'answer' });
      expect(() => sqlite.prepare(`INSERT INTO grammar_exercise_attempts
        (id, lesson_id, revision_id, revision, exercise_id, request_id, answer, is_correct, feedback, created_at)
        VALUES ('attempt-orphan', 'missing-lesson', 'missing@1', '1', 'exercise-1', 'orphan-request', 'answer', 1, 'feedback', '2026-09-27T00:00:00.000Z')`).run())
        .toThrow(/FOREIGN KEY constraint failed/);
      expect(() => sqlite.exec("UPDATE grammar_exercise_attempts SET answer = 'changed' WHERE id = 'attempt-1'")).toThrow(/immutable/i);
      expect(() => sqlite.exec("INSERT INTO grammar_lesson_progress (lesson_id, revision_id, revision, created_at, updated_at) VALUES ('', 'lesson-2@1', '1', '2026-09-27T00:00:00.000Z', '2026-09-27T00:00:00.000Z')")).toThrow(/CHECK constraint failed/);
      expect(() => sqlite.exec("UPDATE grammar_lesson_progress SET last_position = -1 WHERE lesson_id = 'lesson-1'")).toThrow(/CHECK constraint failed/);
      expect(() => sqlite.prepare(`INSERT INTO grammar_exercise_attempts
        (id, lesson_id, revision_id, revision, exercise_id, request_id, answer, is_correct, feedback, created_at)
        VALUES ('attempt-invalid-result', 'lesson-1', 'lesson-1@1', '1', 'exercise-1', 'invalid-result', 'answer', 2, 'feedback', '2026-09-27T00:00:00.000Z')`).run())
        .toThrow(/CHECK constraint failed/);
    } finally {
      sqlite.close();
    }
  });

  it('cascades attempt deletion when its lesson progress is removed', () => {
    const sqlite = new Database(':memory:');
    try {
      createGrammarTables(sqlite);
      sqlite.exec(`
        INSERT INTO grammar_lesson_progress (lesson_id, revision_id, revision, created_at, updated_at) VALUES ('lesson-1', 'lesson-1@1', '1', '2026-09-27T00:00:00.000Z', '2026-09-27T00:00:00.000Z');
        INSERT INTO grammar_exercise_attempts (id, lesson_id, revision_id, revision, exercise_id, request_id, answer, is_correct, feedback, created_at)
          VALUES ('attempt-1', 'lesson-1', 'lesson-1@1', '1', 'exercise-1', 'request-1', 'answer', 1, 'feedback', '2026-09-27T00:00:00.000Z');
        DELETE FROM grammar_lesson_progress WHERE lesson_id = 'lesson-1';
      `);
      expect(sqlite.prepare('SELECT count(*) AS count FROM grammar_exercise_attempts').get()).toEqual({ count: 0 });
    } finally {
      sqlite.close();
    }
  });

  it.each([
    {
      table: 'grammar_lesson_progress',
      missingColumn: 'completed_at',
      ddl: `CREATE TABLE grammar_lesson_progress (
        lesson_id TEXT PRIMARY KEY,
        revision_id TEXT NOT NULL,
        revision TEXT NOT NULL,
        last_position INTEGER NOT NULL,
        is_complete INTEGER NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )`,
      message: /grammar_lesson_progress.*completed_at/i,
    },
    {
      table: 'grammar_exercise_attempts',
      missingColumn: 'answer',
      ddl: `CREATE TABLE grammar_exercise_attempts (
        id TEXT PRIMARY KEY,
        lesson_id TEXT NOT NULL,
        revision_id TEXT NOT NULL,
        revision TEXT NOT NULL,
        exercise_id TEXT NOT NULL,
        request_id TEXT NOT NULL UNIQUE,
        is_correct INTEGER NOT NULL,
        feedback TEXT NOT NULL,
        created_at TEXT NOT NULL
      )`,
    },
    {
      table: 'grammar_exercise_attempts',
      missingColumn: 'is_correct',
      ddl: `CREATE TABLE grammar_exercise_attempts (
        id TEXT PRIMARY KEY,
        lesson_id TEXT NOT NULL,
        revision_id TEXT NOT NULL,
        revision TEXT NOT NULL,
        exercise_id TEXT NOT NULL,
        request_id TEXT NOT NULL UNIQUE,
        answer TEXT NOT NULL,
        feedback TEXT NOT NULL,
        created_at TEXT NOT NULL
      )`,
    },
  ])('rejects an existing $table table missing $missingColumn and rolls back new DDL', ({ ddl, table, missingColumn }) => {
    const sqlite = new Database(':memory:');
    try {
      sqlite.exec(ddl);
      const originalDdl = (sqlite.prepare('SELECT sql FROM sqlite_master WHERE type = \'table\' AND name = ?').get(table) as { sql: string }).sql;
      expect(() => createGrammarTables(sqlite)).toThrow(new RegExp(`${table}.*${missingColumn}`, 'i'));
      if (table === 'grammar_lesson_progress') {
        expect(sqlite.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'grammar_lesson_progress'").get()).toMatchObject({ name: table });
      } else {
        expect(sqlite.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'grammar_lesson_progress'").get()).toBeUndefined();
      }
      expect((sqlite.prepare('SELECT sql FROM sqlite_master WHERE type = \'table\' AND name = ?').get(table) as { sql: string }).sql).toBe(originalDdl);
      expect(sqlite.prepare("SELECT name FROM sqlite_master WHERE type = 'index' AND name LIKE 'idx_grammar_%'").all()).toEqual([]);
    } finally {
      sqlite.close();
    }
  });

  it('rolls back earlier DDL when an existing incompatible table makes index creation fail', () => {
    const sqlite = new Database(':memory:');
    try {
      sqlite.exec('CREATE TABLE grammar_exercise_attempts (id TEXT PRIMARY KEY)');

      expect(() => createGrammarTables(sqlite)).toThrow(/no such column: lesson_id/i);
      expect(sqlite.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'grammar_lesson_progress'").get()).toBeUndefined();
    } finally {
      sqlite.close();
    }
  });
});
