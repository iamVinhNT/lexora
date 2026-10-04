/**
 * @file study-tables.test.ts
 * @description Verifies calendar table creation and additive evidence-link migrations.
 */
import Database from 'better-sqlite3';
import { afterEach, describe, expect, it } from 'vitest';
import { mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { createTables } from '../../src/db/client.js';
import { createGrammarTables } from '../../src/db/grammar-tables.js';

const temporaryDirectories: string[] = [];

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) rmSync(directory, { recursive: true, force: true });
});

function legacyGrammarDatabase(filename?: string): Database.Database {
  const sqlite = new Database(filename ?? ':memory:');
  sqlite.pragma('foreign_keys = ON');
  sqlite.exec(`
    CREATE TABLE grammar_lesson_progress (
      lesson_id TEXT NOT NULL PRIMARY KEY CHECK (length(trim(lesson_id)) > 0),
      revision_id TEXT NOT NULL CHECK (length(trim(revision_id)) > 0),
      revision TEXT NOT NULL CHECK (length(trim(revision)) > 0),
      last_position INTEGER NOT NULL DEFAULT 0 CHECK (last_position >= 0),
      is_complete INTEGER NOT NULL DEFAULT 0 CHECK (is_complete IN (0, 1)),
      completed_at TEXT,
      created_at TEXT NOT NULL CHECK (length(trim(created_at)) > 0),
      updated_at TEXT NOT NULL CHECK (length(trim(updated_at)) > 0)
    );
    CREATE TABLE grammar_exercise_attempts (
      id TEXT NOT NULL PRIMARY KEY CHECK (length(trim(id)) > 0),
      lesson_id TEXT NOT NULL CHECK (length(trim(lesson_id)) > 0)
        REFERENCES grammar_lesson_progress(lesson_id) ON DELETE CASCADE,
      revision_id TEXT NOT NULL CHECK (length(trim(revision_id)) > 0),
      revision TEXT NOT NULL CHECK (length(trim(revision)) > 0),
      exercise_id TEXT NOT NULL CHECK (length(trim(exercise_id)) > 0),
      request_id TEXT NOT NULL UNIQUE CHECK (length(trim(request_id)) > 0),
      answer TEXT NOT NULL CHECK (length(trim(answer)) > 0),
      is_correct INTEGER NOT NULL CHECK (is_correct IN (0, 1)),
      feedback TEXT NOT NULL CHECK (length(trim(feedback)) > 0),
      created_at TEXT NOT NULL CHECK (length(trim(created_at)) > 0)
    );
    CREATE TABLE words (id TEXT PRIMARY KEY, word TEXT NOT NULL, definition TEXT NOT NULL, created_at TEXT NOT NULL);
    CREATE TABLE learning_sessions (
      id TEXT PRIMARY KEY, session_type TEXT NOT NULL, total_words INTEGER NOT NULL DEFAULT 0,
      started_at TEXT NOT NULL, completed_at TEXT
    );
    CREATE TABLE review_logs (
      id TEXT PRIMARY KEY, word_id TEXT NOT NULL REFERENCES words(id) ON DELETE CASCADE,
      review_type TEXT NOT NULL, rating TEXT NOT NULL, response_time INTEGER, answer TEXT, correct INTEGER, created_at TEXT NOT NULL
    );
    INSERT INTO words VALUES ('word', 'word', 'meaning', '2026-01-01');
    INSERT INTO learning_sessions VALUES ('session', 'LEARN_WORDS', 1, '2026-01-01', '2026-01-01');
    INSERT INTO grammar_lesson_progress VALUES ('lesson', 'lesson@1', '1', 1, 1, '2026-01-01', '2026-01-01', '2026-01-01');
    INSERT INTO grammar_exercise_attempts VALUES ('attempt', 'lesson', 'lesson@1', '1', 'exercise', 'request', 'answer', 1, 'ok', '2026-01-01');
    INSERT INTO review_logs VALUES ('review', 'word', 'RECALL', 'GOOD', NULL, NULL, NULL, '2026-01-01');
  `);
  return sqlite;
}

function installLegacyStudyTables(sqlite: Database.Database): void {
  sqlite.exec(`
    CREATE TABLE study_preferences (
      id TEXT NOT NULL PRIMARY KEY CHECK (id = 'local'), time_zone TEXT NOT NULL, study_days TEXT NOT NULL,
      learning_target INTEGER NOT NULL CHECK (learning_target >= 0),
      review_target INTEGER NOT NULL CHECK (review_target >= 0),
      grammar_target INTEGER NOT NULL CHECK (grammar_target IN (0, 1)), updated_at TEXT NOT NULL
    );
    CREATE TABLE study_tasks (
      id TEXT NOT NULL PRIMARY KEY, scheduled_date TEXT NOT NULL,
      kind TEXT NOT NULL CHECK (kind IN ('LEARN_WORDS', 'REVIEW_WORDS', 'GRAMMAR')),
      target_count INTEGER NOT NULL CHECK (target_count > 0),
      source TEXT NOT NULL CHECK (source IN ('AUTO', 'MANUAL')), mode TEXT, context_id TEXT, topic_id TEXT,
      lesson_id TEXT, revision_id TEXT, revision TEXT,
      version INTEGER NOT NULL CHECK (version > 0), created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
      cancelled_at TEXT, transferred_at TEXT,
      transferred_to_task_id TEXT REFERENCES study_tasks(id) ON DELETE CASCADE,
      transferred_count INTEGER NOT NULL DEFAULT 0 CHECK (transferred_count >= 0),
      creation_intent TEXT NOT NULL, transfer_intent TEXT,
      CHECK ((kind = 'LEARN_WORDS' AND mode IN ('new_words', 'context', 'topic', 'weak_words') AND lesson_id IS NULL AND revision_id IS NULL AND revision IS NULL)
        OR (kind = 'REVIEW_WORDS' AND mode IS NULL AND context_id IS NULL AND topic_id IS NULL AND lesson_id IS NULL AND revision_id IS NULL AND revision IS NULL)
        OR (kind = 'GRAMMAR' AND mode IS NULL AND context_id IS NULL AND topic_id IS NULL)),
      CHECK ((kind != 'GRAMMAR') OR ((lesson_id IS NULL AND revision_id IS NULL AND revision IS NULL) OR (lesson_id IS NOT NULL AND revision_id IS NOT NULL AND revision IS NOT NULL)))
    );
    INSERT INTO study_preferences VALUES ('local', 'Asia/Ho_Chi_Minh', '[1,3,5]', 10, 20, 1, '2026-10-03');
    INSERT INTO study_tasks (id, scheduled_date, kind, target_count, source, mode, version, created_at, updated_at, creation_intent)
      VALUES ('task', '2026-10-03', 'LEARN_WORDS', 10, 'MANUAL', 'new_words', 1, '2026-10-03', '2026-10-03', '{}');
  `);
}

describe('study calendar SQLite tables', () => {
  it('upgrades persisted calendar tables without deleting linked evidence or transfer history', () => {
    const sqlite = legacyGrammarDatabase();
    try {
      installLegacyStudyTables(sqlite);
      sqlite.exec(`
        ALTER TABLE learning_sessions ADD COLUMN study_task_id TEXT REFERENCES study_tasks(id) ON DELETE CASCADE;
        ALTER TABLE review_logs ADD COLUMN study_task_id TEXT REFERENCES study_tasks(id) ON DELETE CASCADE;
        ALTER TABLE grammar_exercise_attempts ADD COLUMN study_task_id TEXT REFERENCES study_tasks(id) ON DELETE CASCADE;
        ALTER TABLE grammar_exercise_attempts ADD COLUMN completed_lesson INTEGER NOT NULL DEFAULT 0 CHECK (completed_lesson IN (0, 1));
        UPDATE learning_sessions SET study_task_id = 'task';
        UPDATE review_logs SET study_task_id = 'task';
        UPDATE grammar_exercise_attempts SET study_task_id = 'task', completed_lesson = 1;
        INSERT INTO study_tasks (id, scheduled_date, kind, target_count, source, mode, version, created_at, updated_at, creation_intent)
          VALUES ('destination', '2026-10-04', 'LEARN_WORDS', 6, 'MANUAL', 'new_words', 1, '2026-10-03', '2026-10-03', '{}');
        UPDATE study_tasks SET transferred_to_task_id = 'destination', transferred_count = 6, transferred_at = '2026-10-03' WHERE id = 'task';
      `);
      createTables(sqlite);
      createTables(sqlite);
      expect(sqlite.prepare('SELECT time_zone, study_days, learning_target, review_target FROM study_preferences').get())
        .toEqual({ time_zone: 'Asia/Ho_Chi_Minh', study_days: '[1,3,5]', learning_target: 10, review_target: 20 });
      expect(sqlite.prepare("SELECT transferred_to_task_id, transferred_count FROM study_tasks WHERE id = 'task'").get())
        .toEqual({ transferred_to_task_id: 'destination', transferred_count: 6 });
      expect(sqlite.prepare('SELECT id, study_task_id FROM learning_sessions').get()).toEqual({ id: 'session', study_task_id: 'task' });
      expect(sqlite.prepare('SELECT id, study_task_id FROM review_logs').get()).toEqual({ id: 'review', study_task_id: 'task' });
      expect(sqlite.prepare('SELECT id, study_task_id, completed_lesson FROM grammar_exercise_attempts').get())
        .toEqual({ id: 'attempt', study_task_id: 'task', completed_lesson: 1 });
      expect(sqlite.pragma('foreign_keys', { simple: true })).toBe(1);
      expect(sqlite.prepare('PRAGMA foreign_key_check').all()).toEqual([]);
      expect(() => sqlite.exec("UPDATE study_preferences SET learning_target = 9007199254740992")).toThrow(/CHECK/);
      expect(() => sqlite.exec("UPDATE study_tasks SET target_count = 9007199254740992 WHERE id = 'destination'")).toThrow(/CHECK/);
      expect(() => sqlite.exec("UPDATE study_tasks SET mode = 'context', context_id = NULL WHERE id = 'destination'")).toThrow(/CHECK/);
    } finally {
      sqlite.close();
    }
  });

  it('rolls back a legacy upgrade when existing task data violates current constraints', () => {
    const sqlite = legacyGrammarDatabase();
    try {
      installLegacyStudyTables(sqlite);
      sqlite.exec("UPDATE study_tasks SET mode = 'context', context_id = NULL");
      const original = sqlite.prepare("SELECT sql FROM sqlite_master WHERE name = 'study_tasks'").get();
      expect(() => createTables(sqlite)).toThrow(/CHECK/);
      expect(sqlite.prepare("SELECT sql FROM sqlite_master WHERE name = 'study_tasks'").get()).toEqual(original);
      expect(sqlite.prepare('SELECT id, mode, context_id FROM study_tasks').get()).toEqual({ id: 'task', mode: 'context', context_id: null });
      expect(sqlite.prepare('SELECT id FROM grammar_exercise_attempts').get()).toEqual({ id: 'attempt' });
      expect(sqlite.pragma('foreign_keys', { simple: true })).toBe(1);
      expect(sqlite.prepare('PRAGMA foreign_key_check').all()).toEqual([]);
    } finally {
      sqlite.close();
    }
  });

  it('finishes a persisted grammar migration that already has study task links', () => {
    const sqlite = legacyGrammarDatabase();
    try {
      installLegacyStudyTables(sqlite);
      sqlite.exec(`
        ALTER TABLE grammar_exercise_attempts ADD COLUMN study_task_id TEXT REFERENCES study_tasks(id) ON DELETE CASCADE;
        UPDATE grammar_exercise_attempts SET study_task_id = 'task';
      `);
      createTables(sqlite);
      createTables(sqlite);
      expect(sqlite.prepare('SELECT id, study_task_id, completed_lesson FROM grammar_exercise_attempts').get())
        .toEqual({ id: 'attempt', study_task_id: 'task', completed_lesson: 0 });
      expect(() => sqlite.exec("UPDATE grammar_exercise_attempts SET completed_lesson = 1")).toThrow(/immutable/);
      expect(sqlite.prepare('PRAGMA foreign_key_check').all()).toEqual([]);
    } finally {
      sqlite.close();
    }
  });

  it('migrates existing v3 evidence without retroactive links and is safe to reopen', () => {
    const directory = mkdtempSync(join(tmpdir(), 'study-tables-'));
    temporaryDirectories.push(directory);
    const databasePath = join(directory, 'legacy.db');
    const sqlite = legacyGrammarDatabase(databasePath);
    createTables(sqlite);
    expect(sqlite.prepare('SELECT study_task_id FROM learning_sessions WHERE id = ?').get('session')).toEqual({ study_task_id: null });
    expect(sqlite.prepare('SELECT study_task_id FROM review_logs WHERE id = ?').get('review')).toEqual({ study_task_id: null });
    expect(sqlite.prepare('SELECT study_task_id, completed_lesson FROM grammar_exercise_attempts WHERE id = ?').get('attempt')).toEqual({ study_task_id: null, completed_lesson: 0 });
    expect(sqlite.prepare('PRAGMA foreign_key_check').all()).toEqual([]);
    sqlite.close();

    const reopened = new Database(databasePath);
    try {
      createTables(reopened);
      expect(reopened.prepare('SELECT count(*) AS count FROM review_logs').get()).toEqual({ count: 1 });
      expect(reopened.prepare('PRAGMA foreign_key_check').all()).toEqual([]);
    } finally {
      reopened.close();
    }
  });
  it('keeps migrated grammar attempts immutable and preserves task completion evidence fields', () => {
    const sqlite = legacyGrammarDatabase();
    try {
      createTables(sqlite);
      createGrammarTables(sqlite);
      expect(sqlite.prepare('SELECT id, study_task_id, completed_lesson FROM grammar_exercise_attempts').get()).toEqual({ id: 'attempt', study_task_id: null, completed_lesson: 0 });
      expect(() => sqlite.prepare("UPDATE grammar_exercise_attempts SET completed_lesson = 1 WHERE id = 'attempt'").run()).toThrow(/immutable/);
      expect(sqlite.prepare('PRAGMA foreign_key_check').all()).toEqual([]);
    } finally {
      sqlite.close();
    }
  });
  it('rejects unsupported grammar schema without partially applying migration', () => {
    const sqlite = legacyGrammarDatabase();
    try {
      sqlite.exec('DROP TABLE grammar_exercise_attempts; CREATE TABLE grammar_exercise_attempts (id TEXT PRIMARY KEY)');
      expect(() => createGrammarTables(sqlite)).toThrow(/Incompatible grammar schema/);
      expect(sqlite.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='study_tasks'").get()).toBeUndefined();
      expect(sqlite.prepare('PRAGMA table_info(grammar_exercise_attempts)').all()).toHaveLength(1);
    } finally {
      sqlite.close();
    }
  });

  it('enforces task kind uniqueness, transfer/evidence foreign keys, and soft-cancel reuse', () => {
    const sqlite = new Database(':memory:');
    try {
      createTables(sqlite);
      const task = (id: string, kind = 'LEARN_WORDS', date = '2026-01-01', cancelledAt: string | null = null) => sqlite.prepare(`
        INSERT INTO study_tasks (id, scheduled_date, kind, target_count, source, mode, version, created_at, updated_at, cancelled_at, creation_intent)
        VALUES (?, ?, ?, 1, 'MANUAL', ?, 1, '2026-01-01', '2026-01-01', ?, '{}')
      `).run(id, date, kind, kind === 'LEARN_WORDS' ? 'new_words' : null, cancelledAt);
      task('first');
      expect(() => task('duplicate')).toThrow(/UNIQUE/);
      task('cancelled', 'LEARN_WORDS', '2026-01-02', '2026-01-01');
      task('replacement', 'LEARN_WORDS', '2026-01-02');
      task('review-first', 'REVIEW_WORDS', '2026-01-03');
      expect(() => task('review-duplicate', 'REVIEW_WORDS', '2026-01-03')).toThrow(/UNIQUE/);
      expect(() => sqlite.prepare("INSERT INTO study_tasks (id, scheduled_date, kind, target_count, source, version, created_at, updated_at, creation_intent, transferred_to_task_id) VALUES ('bad', '2026-01-04', 'REVIEW_WORDS', 1, 'MANUAL', 1, 'now', 'now', '{}', 'missing')").run()).toThrow(/FOREIGN KEY/);
      sqlite.prepare("INSERT INTO learning_sessions (id, session_type, study_task_id, started_at) VALUES ('session', 'LEARN_WORDS', 'first', 'now')").run();
      sqlite.prepare("DELETE FROM study_tasks WHERE id = 'first'").run();
      expect(sqlite.prepare("SELECT id FROM learning_sessions WHERE id='session'").get()).toBeUndefined();
    } finally {
      sqlite.close();
    }
  });
});
