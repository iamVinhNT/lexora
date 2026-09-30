import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import Database from 'better-sqlite3';
import { eq } from 'drizzle-orm';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';

import {
  users,
  words,
  wordFamilies,
  collocations,
  examples,
  contexts,
  contextWords,
  learningProgress,
  reviewStates,
  reviewLogs,
  tags,
  wordTags,
  learningSessions,
  learningSessionItems,
  learningAttempts,
  grammarLessonProgress,
  grammarExerciseAttempts,
} from '../../src/db/schema.js';
import { getDb, createTables, assertLearningSchemaDowngradeSafe } from '../../src/db/client.js';

describe('Database Schema & Client', () => {
  describe('Schema Table Exports', () => {
    it('exports all 12 core tables and 2 learning session tables', () => {
      expect(users).toBeDefined();
      expect(words).toBeDefined();
      expect(wordFamilies).toBeDefined();
      expect(collocations).toBeDefined();
      expect(examples).toBeDefined();
      expect(contexts).toBeDefined();
      expect(contextWords).toBeDefined();
      expect(learningProgress).toBeDefined();
      expect(reviewStates).toBeDefined();
      expect(reviewLogs).toBeDefined();
      expect(tags).toBeDefined();
      expect(wordTags).toBeDefined();
      expect(learningSessions).toBeDefined();
      expect(learningSessionItems).toBeDefined();
    });
    it('maps both grammar learner tables to the existing SQLite schema', () => {
      const db = getDb(':memory:');
      try {
        expect(db.select().from(grammarLessonProgress).all()).toEqual([]);
        expect(db.select().from(grammarExerciseAttempts).all()).toEqual([]);
      } finally {
        db.sqlite.close();
      }
    });
  });

  describe('Database Client & Pragmas', () => {
    it('creates an in-memory database by default with foreign_keys enabled', () => {
      const db = getDb(':memory:');
      const sqlite = db.sqlite ?? db.session.client;
      const fkPragma = sqlite.pragma('foreign_keys', { simple: true });
      expect(fkPragma).toBe(1);
    });

    it('enables WAL mode on persistent file databases', () => {
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'lexora-test-'));
      const dbFile = path.join(tempDir, 'test.db');

      try {
        const db = getDb(dbFile);
        const sqlite = db.sqlite ?? db.session.client;
        const journalMode = sqlite.pragma('journal_mode', { simple: true });
        expect(journalMode).toBe('wal');
        sqlite.close();
      } finally {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    });

    it('allows passing an existing better-sqlite3 instance', () => {
      const sqlite = new Database(':memory:');
      const db = getDb(sqlite);
      const fkPragma = sqlite.pragma('foreign_keys', { simple: true });
      expect(fkPragma).toBe(1);

      // Tables should be created
      const tables = sqlite
        .prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
        .all() as { name: string }[];
      const tableNames = tables.map((t) => t.name);

      expect(tableNames).toContain('users');
      expect(tableNames).toContain('words');
      expect(tableNames).toContain('contexts');
      expect(tableNames).toContain('learning_sessions');
      sqlite.close();
    });

    it('enables WAL mode when an existing persistent better-sqlite3 instance is passed to getDb', () => {
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'lexora-existing-wal-'));
      const dbFile = path.join(tempDir, 'existing.db');

      try {
        const rawSqlite = new Database(dbFile);
        // Initially default journal_mode (usually delete)
        const db = getDb(rawSqlite);
        const sqlite = db.sqlite ?? db.session.client;
        const journalMode = sqlite.pragma('journal_mode', { simple: true });
        expect(journalMode).toBe('wal');
        sqlite.close();
      } finally {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    });

    it('throws clear startup error when legacy duplicate words exist in database', () => {
      const rawSqlite = new Database(':memory:');
      // Create words table without unique lower index and insert duplicate words
      rawSqlite.exec(`
        CREATE TABLE words (
          id TEXT PRIMARY KEY,
          word TEXT NOT NULL,
          definition TEXT NOT NULL,
          created_at TEXT NOT NULL
        );
        INSERT INTO words (id, word, definition, created_at) VALUES ('w1', 'ephemeral', 'def1', '2026-01-01T00:00:00.000Z');
        INSERT INTO words (id, word, definition, created_at) VALUES ('w2', 'Ephemeral', 'def2', '2026-01-01T00:00:00.000Z');
      `);

      expect(() => {
        getDb(rawSqlite);
      }).toThrow(/canonical case-insensitive uniqueness/i);

      rawSqlite.close();
    });

    it('enforces canonical case-insensitive uniqueness on words at DB level', () => {
      const db = getDb(':memory:');
      db.insert(words)
        .values({
          id: 'w-uniq-1',
          word: 'Serendipity',
          definition: 'def1',
          createdAt: new Date().toISOString(),
        })
        .run();

      expect(() => {
        db.insert(words)
          .values({
            id: 'w-uniq-2',
            word: 'serendipity',
            definition: 'def2',
            createdAt: new Date().toISOString(),
          })
          .run();
      }).toThrow(/UNIQUE constraint failed/);

      db.sqlite.close();
    });

    it('createTables is idempotent when called multiple times', () => {
      const sqlite = new Database(':memory:');
      expect(() => {
        createTables(sqlite);
        createTables(sqlite);
      }).not.toThrow();
      sqlite.close();
    });

    it.each([
      { missingColumn: 'position', itemColumns: 'group_index INTEGER NOT NULL', itemColumn: 'group_index', initialValues: [['item-1', 40, '2026-01-01T01:00:00.000Z'], ['item-2', 50, '2026-01-01T02:00:00.000Z'], ['item-3', 60, '2026-01-01T03:00:00.000Z'], ['item-4', 70, '2026-01-01T04:00:00.000Z'], ['item-5', 80, '2026-01-01T05:00:00.000Z']], expectedRows: [{ id: 'item-1', position: 0, group_index: 40 }, { id: 'item-2', position: 1, group_index: 50 }, { id: 'item-3', position: 2, group_index: 60 }, { id: 'item-4', position: 3, group_index: 70 }, { id: 'item-5', position: 4, group_index: 80 }] },
      { missingColumn: 'group_index', itemColumns: 'position INTEGER NOT NULL', itemColumn: 'position', initialValues: [['item-1', 4, '2026-01-01T01:00:00.000Z'], ['item-2', 2, '2026-01-01T02:00:00.000Z'], ['item-3', 0, '2026-01-01T03:00:00.000Z'], ['item-4', 3, '2026-01-01T04:00:00.000Z'], ['item-5', 1, '2026-01-01T05:00:00.000Z']], expectedRows: [{ id: 'item-1', position: 4, group_index: 1 }, { id: 'item-2', position: 2, group_index: 0 }, { id: 'item-3', position: 0, group_index: 0 }, { id: 'item-4', position: 3, group_index: 1 }, { id: 'item-5', position: 1, group_index: 0 }] },
    ])('migrates legacy items with only $missingColumn missing', ({ itemColumns, itemColumn, initialValues, expectedRows }) => {
      const sqlite = new Database(':memory:');
      try {
        sqlite.exec(`
          CREATE TABLE words (id TEXT PRIMARY KEY, word TEXT NOT NULL, definition TEXT NOT NULL, difficulty TEXT, created_at TEXT NOT NULL);
          CREATE TABLE learning_sessions (id TEXT PRIMARY KEY, session_type TEXT NOT NULL, total_words INTEGER NOT NULL, started_at TEXT NOT NULL, completed_at TEXT);
          CREATE TABLE learning_session_items (id TEXT PRIMARY KEY, session_id TEXT NOT NULL, word_id TEXT NOT NULL, ${itemColumns}, created_at TEXT);
          CREATE INDEX legacy_learning_items_created_at ON learning_session_items(created_at);
          INSERT INTO words (id, word, definition, difficulty, created_at) VALUES
            ('word-1', 'word1', 'definition', 'B1', '2026-01-01'),
            ('word-2', 'word2', 'definition', 'B1', '2026-01-01');
          INSERT INTO learning_sessions (id, session_type, total_words, started_at) VALUES ('session-1', 'NEW_WORDS', 2, '2026-01-01');
        `);
        const insertItem = sqlite.prepare(`INSERT INTO learning_session_items (id, session_id, word_id, ${itemColumn}, created_at) VALUES (?, ?, ?, ?, ?)`);
        initialValues.forEach(([id, value, createdAt], index) => insertItem.run(id, 'session-1', `word-${index + 1}`, value, createdAt));
        const originalIndexes = sqlite.prepare("SELECT name, sql FROM sqlite_master WHERE type = 'index' AND tbl_name = 'learning_session_items' ORDER BY name").all();

        createTables(sqlite);

        expect(sqlite.prepare('SELECT id, position, group_index FROM learning_session_items ORDER BY id').all()).toEqual(expectedRows);
        const migratedIndexes = sqlite.prepare("SELECT name, sql FROM sqlite_master WHERE type = 'index' AND tbl_name = 'learning_session_items' ORDER BY name").all();
        expect(migratedIndexes).toEqual(expect.arrayContaining(originalIndexes));
        expect(migratedIndexes.map((index: { name: string }) => index.name)).toEqual(expect.arrayContaining([
          'uq_learning_session_items_position',
          'uq_learning_session_items_word',
          'idx_learning_session_items_group_position',
        ]));
        createTables(sqlite);
        expect(sqlite.prepare("SELECT name, sql FROM sqlite_master WHERE type = 'index' AND tbl_name = 'learning_session_items' ORDER BY name").all()).toEqual(migratedIndexes);
      } finally {
        sqlite.close();
      }
    });

    it('adds feedback columns to legacy attempts without changing rows and remains idempotent', () => {
      const sqlite = new Database(':memory:');
      try {
        sqlite.exec(`
          CREATE TABLE learning_attempts (
            id TEXT PRIMARY KEY,
            session_item_id TEXT NOT NULL,
            request_id TEXT NOT NULL UNIQUE,
            type TEXT NOT NULL,
            attempt_number INTEGER NOT NULL,
            answer TEXT NOT NULL,
            result TEXT NOT NULL,
            performance_score INTEGER NOT NULL,
            feedback_codes TEXT,
            source TEXT NOT NULL DEFAULT 'LOCAL',
            created_at TEXT NOT NULL
          );
          INSERT INTO learning_attempts
            (id, session_item_id, request_id, type, attempt_number, answer, result, performance_score, feedback_codes, source, created_at)
            VALUES ('legacy-attempt', 'legacy-item', 'legacy-request', 'OUTPUT', 1, 'old answer', 'INCORRECT', 25, '["grammar"]', 'LOCAL', '2026-01-01');
        `);

        expect(() => createTables(sqlite)).not.toThrow();
        expect(sqlite.prepare('SELECT * FROM learning_attempts').get()).toEqual({
          id: 'legacy-attempt',
          session_item_id: 'legacy-item',
          request_id: 'legacy-request',
          type: 'OUTPUT',
          attempt_number: 1,
          answer: 'old answer',
          result: 'INCORRECT',
          performance_score: 25,
          feedback_codes: '["grammar"]',
          source: 'LOCAL',
          created_at: '2026-01-01',
          explanation: null,
          suggestion: null,
        });
        expect(sqlite.prepare("PRAGMA table_info('learning_attempts')").all().map((column: { name: string }) => column.name)).toEqual(expect.arrayContaining(['explanation', 'suggestion']));

        expect(() => createTables(sqlite)).not.toThrow();
        expect(sqlite.prepare('SELECT * FROM learning_attempts').get()).toMatchObject({
          id: 'legacy-attempt',
          explanation: null,
          suggestion: null,
        });
      } finally {
        sqlite.close();
      }
    });

    it('preserves existing learning item assignments and attempts when initialized again', () => {
      const sqlite = new Database(':memory:');
      try {
        createTables(sqlite);
        sqlite.exec(`
          INSERT INTO words (id, word, definition, created_at) VALUES
            ('word-1', 'word1', 'definition', '2026-01-01'),
            ('word-2', 'word2', 'definition', '2026-01-01'),
            ('word-3', 'word3', 'definition', '2026-01-01'),
            ('word-4', 'word4', 'definition', '2026-01-01');
          INSERT INTO learning_sessions (id, session_type, total_words, started_at)
            VALUES ('session-1', 'NEW_WORDS', 4, '2026-01-01');
          INSERT INTO learning_session_items (id, session_id, word_id, position, group_index, completed_step, recall_result, output_sentence, review_rating, created_at) VALUES
            ('item-1', 'session-1', 'word-1', 3, 4, 'OUTPUT', 'CORRECT', 'sentence 1', 'EASY', '2026-01-01T01:00:00.000Z'),
            ('item-2', 'session-1', 'word-2', 0, 5, 'RECALL', 'INCORRECT', 'sentence 2', 'AGAIN', '2026-01-01T02:00:00.000Z'),
            ('item-3', 'session-1', 'word-3', 2, 6, 'CONTEXT', 'CORRECT', 'sentence 3', 'GOOD', '2026-01-01T03:00:00.000Z'),
            ('item-4', 'session-1', 'word-4', 1, 7, 'UNDERSTAND', 'INCORRECT', 'sentence 4', 'HARD', '2026-01-01T04:00:00.000Z');
          INSERT INTO learning_attempts (id, session_item_id, request_id, type, attempt_number, answer, result, performance_score, feedback_codes, source, created_at)
            VALUES ('attempt-1', 'item-2', 'request-1', 'RECALL', 1, 'answer', 'INCORRECT', 25, '[]', 'LOCAL', '2026-01-01');
        `);
        const rowsBefore = sqlite.prepare('SELECT * FROM learning_session_items ORDER BY id').all();
        const attemptsBefore = sqlite.prepare('SELECT * FROM learning_attempts ORDER BY id').all();
        const indexesBefore = sqlite.prepare("SELECT name, sql FROM sqlite_master WHERE type = 'index' AND tbl_name IN ('learning_sessions', 'learning_session_items', 'learning_attempts') ORDER BY name").all();

        expect(() => createTables(sqlite)).not.toThrow();
        expect(() => getDb(sqlite)).not.toThrow();
        expect(sqlite.prepare('SELECT * FROM learning_session_items ORDER BY id').all()).toEqual(rowsBefore);
        expect(sqlite.prepare('SELECT * FROM learning_attempts ORDER BY id').all()).toEqual(attemptsBefore);
        expect(sqlite.prepare("SELECT name, sql FROM sqlite_master WHERE type = 'index' AND tbl_name IN ('learning_sessions', 'learning_session_items', 'learning_attempts') ORDER BY name").all()).toEqual(indexesBefore);
      } finally {
        sqlite.close();
      }
    });

    it('transactionally adds exposure columns to legacy context_words table with postcondition verification', () => {
      const rawSqlite = new Database(':memory:');
      // Create minimal tables with legacy context_words
      rawSqlite.exec(`
        CREATE TABLE contexts (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          created_at TEXT NOT NULL
        );
        CREATE TABLE words (
          id TEXT PRIMARY KEY,
          word TEXT NOT NULL,
          definition TEXT NOT NULL,
          created_at TEXT NOT NULL
        );
        CREATE TABLE context_words (
          context_id TEXT NOT NULL REFERENCES contexts(id) ON DELETE CASCADE,
          word_id TEXT NOT NULL REFERENCES words(id) ON DELETE CASCADE,
          PRIMARY KEY (context_id, word_id)
        );
      `);

      // Verify missing columns before migration
      const colsBefore = rawSqlite.prepare("PRAGMA table_info('context_words')").all() as Array<{ name: string }>;
      const namesBefore = new Set(colsBefore.map((c) => c.name));
      expect(namesBefore.has('exposure_count')).toBe(false);
      expect(namesBefore.has('first_seen_at')).toBe(false);
      expect(namesBefore.has('last_seen_at')).toBe(false);

      // Run createTables
      createTables(rawSqlite);

      // Verify postcondition
      const colsAfter = rawSqlite.prepare("PRAGMA table_info('context_words')").all() as Array<{ name: string }>;
      const namesAfter = new Set(colsAfter.map((c) => c.name));
      expect(namesAfter.has('exposure_count')).toBe(true);
      expect(namesAfter.has('first_seen_at')).toBe(true);
      expect(namesAfter.has('last_seen_at')).toBe(true);

      // Running createTables again is idempotent
      expect(() => createTables(rawSqlite)).not.toThrow();

      rawSqlite.close();
    });
  });

  describe('Learning schema migration', () => {
    it('refuses downgrade when version-2 evidence exists', () => {
      const db = getDb(':memory:');
      expect(() => assertLearningSchemaDowngradeSafe(db.sqlite)).not.toThrow();
      db.sqlite.prepare("INSERT INTO learning_sessions (id, session_type, total_words, status, started_at) VALUES ('session-v2', 'new_words', 1, 'COMPLETED', '2026-09-01T00:00:00.000Z')").run();
      expect(() => assertLearningSchemaDowngradeSafe(db.sqlite)).toThrow(/downgrade refused/i);
      db.sqlite.close();
    });

    it('allows downgrade check on a version-1 learning schema without v2 tables', () => {
      const sqlite = new Database(':memory:');
      sqlite.exec('CREATE TABLE learning_sessions (id TEXT PRIMARY KEY)');
      expect(() => assertLearningSchemaDowngradeSafe(sqlite)).not.toThrow();
      sqlite.close();
    });

    it('keeps redesign columns, checks, indexes, and cascade constraints aligned in SQLite', () => {
      const db = getDb(':memory:');
      const sqlite = db.sqlite;
      const columns = (table: string) => (sqlite.prepare(`PRAGMA table_info('${table}')`).all() as Array<{ name: string }>).map((column) => column.name);
      const indexNames = (table: string) => (sqlite.prepare(`PRAGMA index_list('${table}')`).all() as Array<{ name: string }>).map((index) => index.name);
      const attemptsSql = (sqlite.prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'learning_attempts'").get() as { sql: string }).sql;
      const sessionsSql = (sqlite.prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'learning_sessions'").get() as { sql: string }).sql;
      const itemsSql = (sqlite.prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'learning_session_items'").get() as { sql: string }).sql;

      expect(columns('learning_sessions')).toEqual(expect.arrayContaining(['status']));
      expect(columns('learning_session_items')).toEqual(expect.arrayContaining(['position', 'group_index']));
      expect(columns('learning_attempts')).toEqual(expect.arrayContaining(['request_id', 'type', 'attempt_number', 'performance_score', 'feedback_codes', 'source']));
      expect(columns('review_logs')).toContain('performance_score');
      expect(indexNames('learning_sessions')).toEqual(expect.arrayContaining(['uq_learning_sessions_one_active', 'idx_learning_sessions_status', 'idx_learning_sessions_started_at']));
      expect(indexNames('learning_session_items')).toEqual(expect.arrayContaining(['uq_learning_session_items_position', 'uq_learning_session_items_word', 'idx_learning_session_items_group_position']));
      expect(indexNames('learning_attempts')).toEqual(expect.arrayContaining(['sqlite_autoindex_learning_attempts_1', 'sqlite_autoindex_learning_attempts_2', 'idx_learning_attempts_session_item_id', 'idx_learning_attempts_item_type']));
      expect(sessionsSql).toContain("status TEXT NOT NULL DEFAULT 'IN_PROGRESS'");
      expect((sqlite.prepare("PRAGMA foreign_key_list('learning_session_items')").all() as Array<{ table: string; on_delete: string }>)).toEqual(expect.arrayContaining([
        expect.objectContaining({ table: 'learning_sessions', on_delete: 'CASCADE' }),
        expect.objectContaining({ table: 'words', on_delete: 'CASCADE' }),
      ]));
      expect(attemptsSql).toContain("CHECK (type IN ('RECALL', 'OUTPUT'))");
      expect(attemptsSql).toContain('CHECK (attempt_number IN (1, 2))');
      expect(attemptsSql).toContain('CHECK (performance_score BETWEEN 0 AND 100)');
      expect(attemptsSql).toContain('UNIQUE(session_item_id, type, attempt_number)');
      expect((sqlite.prepare("PRAGMA foreign_key_list('learning_attempts')").all() as Array<{ table: string; on_delete: string }>)).toEqual(expect.arrayContaining([expect.objectContaining({ table: 'learning_session_items', on_delete: 'CASCADE' })]));

      sqlite.exec("INSERT INTO words (id, word, definition, created_at) VALUES ('schema-word', 'schema', 'definition', '2026-01-01T00:00:00.000Z'); INSERT INTO learning_sessions (id, session_type, total_words, started_at) VALUES ('schema-session', 'new_words', 1, '2026-01-01T00:00:00.000Z'); INSERT INTO learning_session_items (id, session_id, word_id, position, group_index) VALUES ('schema-item', 'schema-session', 'schema-word', 0, 0);");
      expect(() => sqlite.exec("INSERT INTO learning_attempts (id, session_item_id, request_id, type, attempt_number, answer, result, performance_score, created_at) VALUES ('bad-score', 'schema-item', 'bad-score', 'RECALL', 1, 'schema', 'CORRECT', 101, '2026-01-01T00:00:00.000Z')")).toThrow(/CHECK constraint failed/);
      sqlite.prepare("DELETE FROM learning_sessions WHERE id = 'schema-session'").run();
      expect(sqlite.prepare("SELECT count(*) AS count FROM learning_session_items WHERE id = 'schema-item'").get()).toEqual({ count: 0 });
      sqlite.close();
    });

    it('keeps Drizzle active-session index aligned with manual DDL', () => {
      const db = getDb(':memory:');
      expect(db.sqlite.prepare("SELECT sql FROM sqlite_master WHERE type = 'index' AND name = 'uq_learning_sessions_one_active'").get()).toMatchObject({ sql: expect.stringContaining("status = 'IN_PROGRESS'") });
      db.sqlite.close();
    });

    it('rolls back legacy item columns and assignments when migration fails', () => {
      const sqlite = new Database(':memory:');
      sqlite.exec(`
        CREATE TABLE words (id TEXT PRIMARY KEY, word TEXT NOT NULL, definition TEXT NOT NULL, difficulty TEXT, created_at TEXT NOT NULL);
        CREATE TABLE learning_sessions (id TEXT PRIMARY KEY, session_type TEXT NOT NULL, total_words INTEGER NOT NULL, started_at TEXT NOT NULL, completed_at TEXT);
        CREATE TABLE learning_session_items (id TEXT PRIMARY KEY, session_id TEXT NOT NULL, word_id TEXT NOT NULL, completed_step TEXT, recall_result TEXT, output_sentence TEXT, review_rating TEXT, created_at TEXT);
        INSERT INTO words (id, word, definition, difficulty, created_at) VALUES ('legacy-word-1', 'word1', 'definition', 'B1', '2026-01-01'), ('legacy-word-2', 'word2', 'definition', 'B1', '2026-01-01');
        INSERT INTO learning_sessions (id, session_type, total_words, started_at) VALUES ('legacy-session', 'NEW_WORDS', 2, '2026-01-01');
        INSERT INTO learning_session_items (id, session_id, word_id, created_at) VALUES ('legacy-item-1', 'legacy-session', 'legacy-word-1', '2026-01-01T01:00:00.000Z'), ('legacy-item-2', 'legacy-session', 'legacy-word-2', '2026-01-01T02:00:00.000Z');
        CREATE TRIGGER fail_legacy_item_migration BEFORE UPDATE OF position ON learning_session_items WHEN OLD.id = 'legacy-item-2' BEGIN SELECT RAISE(ABORT, 'injected migration failure'); END;
      `);

      try {
        expect(() => createTables(sqlite)).toThrow(/injected migration failure/);
        expect((sqlite.prepare("PRAGMA table_info('learning_session_items')").all() as Array<{ name: string }>).map(({ name }) => name)).not.toContain('position');
        expect((sqlite.prepare("PRAGMA table_info('learning_session_items')").all() as Array<{ name: string }>).map(({ name }) => name)).not.toContain('group_index');
        expect(sqlite.prepare('SELECT id, completed_step, recall_result, output_sentence, review_rating FROM learning_session_items ORDER BY id').all()).toEqual([
          { id: 'legacy-item-1', completed_step: null, recall_result: null, output_sentence: null, review_rating: null },
          { id: 'legacy-item-2', completed_step: null, recall_result: null, output_sentence: null, review_rating: null },
        ]);
      } finally {
        sqlite.close();
      }
    });

    it('keeps newest legacy session active and deterministically groups all legacy items', () => {
      const rawSqlite = new Database(':memory:');
      rawSqlite.exec(`
        CREATE TABLE words (
          id TEXT PRIMARY KEY,
          word TEXT NOT NULL,
          definition TEXT NOT NULL,
          difficulty TEXT,
          created_at TEXT NOT NULL
        );
        CREATE TABLE learning_sessions (
          id TEXT PRIMARY KEY,
          session_type TEXT NOT NULL,
          total_words INTEGER NOT NULL,
          started_at TEXT NOT NULL,
          completed_at TEXT
        );
        CREATE TABLE learning_session_items (
          id TEXT PRIMARY KEY,
          session_id TEXT NOT NULL,
          word_id TEXT NOT NULL,
          completed_step TEXT,
          recall_result TEXT,
          output_sentence TEXT,
          review_rating TEXT,
          created_at TEXT
        );
      `);

      const wordsToInsert = Array.from({ length: 6 }, (_, index) => ({
        id: `legacy-word-${index}`,
        word: `legacy${index}`,
        definition: 'definition',
        difficulty: 'B1',
        created_at: `2026-09-01T00:0${index}:00.000Z`,
      }));
      rawSqlite.prepare('INSERT INTO words (id, word, definition, difficulty, created_at) VALUES (@id, @word, @definition, @difficulty, @created_at)').run(wordsToInsert[0]);
      for (const word of wordsToInsert.slice(1)) rawSqlite.prepare('INSERT INTO words (id, word, definition, difficulty, created_at) VALUES (@id, @word, @definition, @difficulty, @created_at)').run(word);
      rawSqlite.prepare('INSERT INTO learning_sessions (id, session_type, total_words, started_at, completed_at) VALUES (?, ?, ?, ?, NULL)').run('older', 'NEW_WORDS', 6, '2026-09-01T00:00:00.000Z');
      rawSqlite.prepare('INSERT INTO learning_sessions (id, session_type, total_words, started_at, completed_at) VALUES (?, ?, ?, ?, NULL)').run('newer', 'NEW_WORDS', 6, '2026-09-02T00:00:00.000Z');
      const insertItem = rawSqlite.prepare('INSERT INTO learning_session_items (id, session_id, word_id, created_at) VALUES (?, ?, ?, ?)');
      for (const [index, word] of wordsToInsert.entries()) {
        insertItem.run(`older-item-${index}`, 'older', word.id, `2026-09-01T01:0${index}:00.000Z`);
        insertItem.run(`newer-item-${index}`, 'newer', word.id, `2026-09-02T01:0${index}:00.000Z`);
      }

      createTables(rawSqlite);

      expect(rawSqlite.prepare('SELECT id, status FROM learning_sessions ORDER BY id').all()).toEqual([
        { id: 'newer', status: 'IN_PROGRESS' },
        { id: 'older', status: 'ABANDONED' },
      ]);
      expect(rawSqlite.prepare('SELECT count(*) AS count FROM learning_session_items').get()).toEqual({ count: 12 });
      expect(rawSqlite.prepare("SELECT position, group_index FROM learning_session_items WHERE session_id = 'newer' ORDER BY position").all()).toEqual([
        { position: 0, group_index: 0 },
        { position: 1, group_index: 0 },
        { position: 2, group_index: 0 },
        { position: 3, group_index: 1 },
        { position: 4, group_index: 1 },
        { position: 5, group_index: 1 },
      ]);
      expect(rawSqlite.prepare("SELECT name FROM sqlite_master WHERE type = 'index' AND name IN ('idx_learning_sessions_status', 'idx_learning_sessions_started_at', 'uq_learning_sessions_one_active') ORDER BY name").all()).toHaveLength(3);
      expect(rawSqlite.prepare("SELECT count(*) AS count FROM learning_attempts").get()).toEqual({ count: 0 });
      rawSqlite.close();
    });
  });

  describe('CRUD Operations & Relations', () => {
    let db: ReturnType<typeof getDb>;
    let sqlite: Database.Database;

    beforeEach(() => {
      db = getDb(':memory:');
      sqlite = db.sqlite ?? db.session.client;
    });

    afterEach(() => {
      sqlite.close();
    });

    it('inserts and selects a user', () => {
      db.insert(users)
        .values({
          id: 'user-1',
          name: 'Alice',
          email: 'alice@example.com',
          createdAt: new Date().toISOString(),
        })
        .run();

      const [user] = db.select().from(users).where(eq(users.id, 'user-1')).all();
      expect(user).toBeDefined();
      expect(user.name).toBe('Alice');
      expect(user.email).toBe('alice@example.com');
    });

    it('inserts and selects a word with collocations, examples, and families', () => {
      db.insert(words)
        .values({
          id: 'word-1',
          word: 'reliable',
          phonetic: '/rɪˈlaɪəbl/',
          partOfSpeech: 'adjective',
          definition: 'Able to be trusted or believed',
          translation: 'đáng tin cậy',
          difficulty: 'B2',
          createdAt: new Date().toISOString(),
        })
        .run();

      db.insert(words)
        .values({
          id: 'word-2',
          word: 'reliability',
          phonetic: '/rɪˌlaɪəˈbɪləti/',
          partOfSpeech: 'noun',
          definition: 'The quality of being trustworthy',
          translation: 'sự đáng tin cậy',
          difficulty: 'B2',
          createdAt: new Date().toISOString(),
        })
        .run();

      db.insert(wordFamilies)
        .values({
          id: 'wf-1',
          wordId: 'word-1',
          relatedWordId: 'word-2',
          relationship: 'noun',
        })
        .run();

      db.insert(collocations)
        .values({
          id: 'col-1',
          wordId: 'word-1',
          phrase: 'reliable source',
        })
        .run();

      db.insert(examples)
        .values({
          id: 'ex-1',
          wordId: 'word-1',
          sentence: 'We need a reliable partner for this project.',
          translation: 'Chúng tôi cần một đối tác đáng tin cậy cho dự án này.',
          source: 'PROFESSIONAL',
        })
        .run();

      const [w] = db.select().from(words).where(eq(words.id, 'word-1')).all();
      expect(w.word).toBe('reliable');
      expect(w.difficulty).toBe('B2');

      const [wf] = db.select().from(wordFamilies).where(eq(wordFamilies.wordId, 'word-1')).all();
      expect(wf.relatedWordId).toBe('word-2');
      expect(wf.relationship).toBe('noun');

      const [col] = db.select().from(collocations).where(eq(collocations.wordId, 'word-1')).all();
      expect(col.phrase).toBe('reliable source');

      const [ex] = db.select().from(examples).where(eq(examples.wordId, 'word-1')).all();
      expect(ex.sentence).toBe('We need a reliable partner for this project.');
    });

    it('inserts and queries contexts and context_words', () => {
      db.insert(words)
        .values({
          id: 'word-1',
          word: 'scalable',
          definition: 'Able to be changed in size or scale',
          createdAt: new Date().toISOString(),
        })
        .run();

      db.insert(contexts)
        .values({
          id: 'ctx-1',
          title: 'System Architecture',
          content: 'The architecture must be scalable and robust.',
          sourceType: 'ARTICLE',
          createdAt: new Date().toISOString(),
        })
        .run();

      db.insert(contextWords)
        .values({
          contextId: 'ctx-1',
          wordId: 'word-1',
        })
        .run();

      const [cw] = db
        .select()
        .from(contextWords)
        .where(eq(contextWords.contextId, 'ctx-1'))
        .all();
      expect(cw.wordId).toBe('word-1');
    });

    it('inserts and queries learning progress, review states, and review logs', () => {
      db.insert(words)
        .values({
          id: 'word-1',
          word: 'resilient',
          definition: 'Able to withstand or recover quickly from difficult conditions',
          createdAt: new Date().toISOString(),
        })
        .run();

      db.insert(learningProgress)
        .values({
          id: 'lp-1',
          wordId: 'word-1',
          status: 'LEARNING',
          recognitionScore: 80,
          recallScore: 60,
          productionScore: 40,
        })
        .run();

      db.insert(reviewStates)
        .values({
          id: 'rs-1',
          wordId: 'word-1',
          interval: 6,
          easeFactor: 2.5,
          repetitions: 2,
          lapses: 0,
          dueAt: new Date(Date.now() + 86400000 * 6).toISOString(),
        })
        .run();

      db.insert(reviewLogs)
        .values({
          id: 'rl-1',
          wordId: 'word-1',
          reviewType: 'RECALL',
          rating: 'GOOD',
          responseTime: 1450,
          answer: 'resilient',
          correct: true,
          createdAt: new Date().toISOString(),
        })
        .run();

      const [lp] = db.select().from(learningProgress).where(eq(learningProgress.wordId, 'word-1')).all();
      expect(lp.status).toBe('LEARNING');
      expect(lp.recognitionScore).toBe(80);

      const [rs] = db.select().from(reviewStates).where(eq(reviewStates.wordId, 'word-1')).all();
      expect(rs.interval).toBe(6);
      expect(rs.easeFactor).toBe(2.5);

      const [rl] = db.select().from(reviewLogs).where(eq(reviewLogs.wordId, 'word-1')).all();
      expect(rl.rating).toBe('GOOD');
      expect(rl.responseTime).toBe(1450);
      expect(rl.correct).toBe(true);
    });

    it('inserts and queries tags and word_tags join table', () => {
      db.insert(words)
        .values({
          id: 'word-1',
          word: 'concurrent',
          definition: 'Existing, happening, or done at the same time',
          createdAt: new Date().toISOString(),
        })
        .run();

      db.insert(tags)
        .values({
          id: 'tag-1',
          name: 'Computer Science',
        })
        .run();

      db.insert(wordTags)
        .values({
          wordId: 'word-1',
          tagId: 'tag-1',
        })
        .run();

      const [wt] = db.select().from(wordTags).where(eq(wordTags.wordId, 'word-1')).all();
      expect(wt.tagId).toBe('tag-1');
    });

    it('inserts and queries learning sessions and session items', () => {
      db.insert(words)
        .values({
          id: 'word-1',
          word: 'optimize',
          definition: 'Make the best or most effective use of',
          createdAt: new Date().toISOString(),
        })
        .run();

      db.insert(learningSessions)
        .values({
          id: 'sess-1',
          sessionType: 'NEW_WORDS',
          totalWords: 1,
          startedAt: new Date().toISOString(),
        })
        .run();

      db.insert(learningSessionItems)
        .values({
          id: 'item-1',
          sessionId: 'sess-1',
          wordId: 'word-1',
          completedStep: 'OUTPUT',
          recallResult: 'CORRECT',
          outputSentence: 'We must optimize database queries.',
          reviewRating: 'EASY',
        })
        .run();

      const [sess] = db.select().from(learningSessions).where(eq(learningSessions.id, 'sess-1')).all();
      expect(sess.sessionType).toBe('NEW_WORDS');
      expect(sess.totalWords).toBe(1);

      const [item] = db
        .select()
        .from(learningSessionItems)
        .where(eq(learningSessionItems.sessionId, 'sess-1'))
        .all();
      expect(item.wordId).toBe('word-1');
      expect(item.recallResult).toBe('CORRECT');
      expect(item.outputSentence).toBe('We must optimize database queries.');
    });

    it('enforces one active session and bounded attempt constraints', () => {
      db.insert(words).values({ id: 'word-attempt', word: 'attempt', definition: 'definition', createdAt: new Date().toISOString() }).run();
      db.insert(learningSessions).values({ id: 'session-attempt', sessionType: 'NEW_WORDS', totalWords: 1, startedAt: new Date().toISOString() }).run();
      db.insert(learningSessionItems).values({ id: 'item-attempt', sessionId: 'session-attempt', wordId: 'word-attempt' }).run();
      db.insert(learningAttempts).values({ id: 'attempt-1', sessionItemId: 'item-attempt', requestId: 'request-1', type: 'RECALL', attemptNumber: 1, answer: 'wrong', result: 'INCORRECT', performanceScore: 0, createdAt: new Date().toISOString() }).run();
      expect(() => db.insert(learningAttempts).values({ id: 'attempt-3', sessionItemId: 'item-attempt', requestId: 'request-3', type: 'RECALL', attemptNumber: 3, answer: 'wrong', result: 'INCORRECT', performanceScore: 0, createdAt: new Date().toISOString() }).run()).toThrow(/CHECK constraint failed/i);
      expect(() => db.insert(learningAttempts).values({ id: 'attempt-duplicate', sessionItemId: 'item-attempt', requestId: 'request-1', type: 'RECALL', attemptNumber: 2, answer: 'attempt', result: 'CORRECT', performanceScore: 100, createdAt: new Date().toISOString() }).run()).toThrow(/UNIQUE constraint failed/i);
      expect(() => db.insert(learningSessions).values({ id: 'session-active-2', sessionType: 'NEW_WORDS', totalWords: 1, startedAt: new Date().toISOString() }).run()).toThrow(/UNIQUE constraint failed/i);
    });
  });

  describe('Foreign Key Constraints Enforcement', () => {
    let db: ReturnType<typeof getDb>;
    let sqlite: Database.Database;

    beforeEach(() => {
      db = getDb(':memory:');
      sqlite = db.sqlite ?? db.session.client;
    });

    afterEach(() => {
      sqlite.close();
    });

    it('throws when inserting collocation with non-existent wordId', () => {
      expect(() => {
        db.insert(collocations)
          .values({
            id: 'col-orphan',
            wordId: 'non-existent-word',
            phrase: 'some phrase',
          })
          .run();
      }).toThrow(/FOREIGN KEY/i);
    });

    it('throws when inserting example with non-existent wordId', () => {
      expect(() => {
        db.insert(examples)
          .values({
            id: 'ex-orphan',
            wordId: 'non-existent-word',
            sentence: 'Non-existent sentence.',
          })
          .run();
      }).toThrow(/FOREIGN KEY/i);
    });

    it('throws when inserting context_words with non-existent contextId or wordId', () => {
      db.insert(words)
        .values({
          id: 'word-1',
          word: 'valid',
          definition: 'legally or officially acceptable',
          createdAt: new Date().toISOString(),
        })
        .run();

      expect(() => {
        db.insert(contextWords)
          .values({
            contextId: 'non-existent-context',
            wordId: 'word-1',
          })
          .run();
      }).toThrow(/FOREIGN KEY/i);
    });

    it('throws when inserting learning_progress with non-existent wordId', () => {
      expect(() => {
        db.insert(learningProgress)
          .values({
            id: 'lp-orphan',
            wordId: 'non-existent-word',
          })
          .run();
      }).toThrow(/FOREIGN KEY/i);
    });

    it('throws on duplicate word_id in learning_progress (unique constraint)', () => {
      db.insert(words)
        .values({
          id: 'word-1',
          word: 'unique-test',
          definition: 'testing unique constraint',
          createdAt: new Date().toISOString(),
        })
        .run();

      db.insert(learningProgress)
        .values({
          id: 'lp-1',
          wordId: 'word-1',
        })
        .run();

      expect(() => {
        db.insert(learningProgress)
          .values({
            id: 'lp-2',
            wordId: 'word-1',
          })
          .run();
      }).toThrow(/UNIQUE/i);
    });

    it('throws on duplicate word_id in review_states (unique constraint)', () => {
      db.insert(words)
        .values({
          id: 'word-1',
          word: 'unique-review-test',
          definition: 'testing unique constraint on review_states',
          createdAt: new Date().toISOString(),
        })
        .run();

      db.insert(reviewStates)
        .values({
          id: 'rs-1',
          wordId: 'word-1',
          dueAt: new Date().toISOString(),
        })
        .run();

      expect(() => {
        db.insert(reviewStates)
          .values({
            id: 'rs-2',
            wordId: 'word-1',
            dueAt: new Date().toISOString(),
          })
          .run();
      }).toThrow(/UNIQUE/i);
    });
  });

  describe('Cascading Deletions', () => {
    let db: ReturnType<typeof getDb>;
    let sqlite: Database.Database;

    beforeEach(() => {
      db = getDb(':memory:');
      sqlite = db.sqlite ?? db.session.client;
    });

    afterEach(() => {
      sqlite.close();
    });

    it('deleting a word cascades to collocations, examples, word_families, progress, review_states, review_logs, word_tags, context_words, and session_items', () => {
      // 1. Setup word and related entities
      db.insert(words)
        .values([
          {
            id: 'word-main',
            word: 'persist',
            definition: 'Continue firmly or obstinately',
            createdAt: new Date().toISOString(),
          },
          {
            id: 'word-related',
            word: 'persistence',
            definition: 'Firm or obstinate continuance',
            createdAt: new Date().toISOString(),
          },
        ])
        .run();

      db.insert(wordFamilies)
        .values({
          id: 'wf-1',
          wordId: 'word-main',
          relatedWordId: 'word-related',
          relationship: 'noun',
        })
        .run();

      db.insert(collocations)
        .values({
          id: 'col-1',
          wordId: 'word-main',
          phrase: 'persist in',
        })
        .run();

      db.insert(examples)
        .values({
          id: 'ex-1',
          wordId: 'word-main',
          sentence: 'He will persist despite obstacles.',
        })
        .run();

      db.insert(contexts)
        .values({
          id: 'ctx-1',
          title: 'Article on Persistence',
          content: 'You must persist to succeed.',
          createdAt: new Date().toISOString(),
        })
        .run();

      db.insert(contextWords)
        .values({
          contextId: 'ctx-1',
          wordId: 'word-main',
        })
        .run();

      db.insert(tags)
        .values({
          id: 'tag-1',
          name: 'Mindset',
        })
        .run();

      db.insert(wordTags)
        .values({
          wordId: 'word-main',
          tagId: 'tag-1',
        })
        .run();

      db.insert(learningProgress)
        .values({
          id: 'lp-1',
          wordId: 'word-main',
          status: 'LEARNING',
        })
        .run();

      db.insert(reviewStates)
        .values({
          id: 'rs-1',
          wordId: 'word-main',
          dueAt: new Date().toISOString(),
        })
        .run();

      db.insert(reviewLogs)
        .values({
          id: 'rl-1',
          wordId: 'word-main',
          reviewType: 'RECALL',
          rating: 'GOOD',
          createdAt: new Date().toISOString(),
        })
        .run();

      db.insert(learningSessions)
        .values({
          id: 'sess-1',
          sessionType: 'NEW_WORDS',
          startedAt: new Date().toISOString(),
        })
        .run();

      db.insert(learningSessionItems)
        .values({
          id: 'item-1',
          sessionId: 'sess-1',
          wordId: 'word-main',
        })
        .run();

      // 2. Delete word-main
      db.delete(words).where(eq(words.id, 'word-main')).run();

      // 3. Assert cascade deletions
      expect(db.select().from(collocations).where(eq(collocations.wordId, 'word-main')).all()).toHaveLength(0);
      expect(db.select().from(examples).where(eq(examples.wordId, 'word-main')).all()).toHaveLength(0);
      expect(db.select().from(wordFamilies).where(eq(wordFamilies.wordId, 'word-main')).all()).toHaveLength(0);
      expect(db.select().from(contextWords).where(eq(contextWords.wordId, 'word-main')).all()).toHaveLength(0);
      expect(db.select().from(wordTags).where(eq(wordTags.wordId, 'word-main')).all()).toHaveLength(0);
      expect(db.select().from(learningProgress).where(eq(learningProgress.wordId, 'word-main')).all()).toHaveLength(0);
      expect(db.select().from(reviewStates).where(eq(reviewStates.wordId, 'word-main')).all()).toHaveLength(0);
      expect(db.select().from(reviewLogs).where(eq(reviewLogs.wordId, 'word-main')).all()).toHaveLength(0);
      expect(db.select().from(learningSessionItems).where(eq(learningSessionItems.wordId, 'word-main')).all()).toHaveLength(0);

      // 4. Assert independent parent records are NOT deleted
      const relatedWord = db.select().from(words).where(eq(words.id, 'word-related')).all();
      expect(relatedWord).toHaveLength(1);

      const ctx = db.select().from(contexts).where(eq(contexts.id, 'ctx-1')).all();
      expect(ctx).toHaveLength(1);

      const tag = db.select().from(tags).where(eq(tags.id, 'tag-1')).all();
      expect(tag).toHaveLength(1);

      const sess = db.select().from(learningSessions).where(eq(learningSessions.id, 'sess-1')).all();
      expect(sess).toHaveLength(1);
    });

    it('deleting a context removes context_words but does NOT delete words', () => {
      db.insert(words)
        .values({
          id: 'word-keep',
          word: 'resilient',
          definition: 'recovers quickly',
          createdAt: new Date().toISOString(),
        })
        .run();

      db.insert(contexts)
        .values({
          id: 'ctx-delete',
          title: 'Context to delete',
          content: 'Some context content.',
          createdAt: new Date().toISOString(),
        })
        .run();

      db.insert(contextWords)
        .values({
          contextId: 'ctx-delete',
          wordId: 'word-keep',
        })
        .run();

      // Delete the context
      db.delete(contexts).where(eq(contexts.id, 'ctx-delete')).run();

      // Join entry should be gone
      const cw = db.select().from(contextWords).where(eq(contextWords.contextId, 'ctx-delete')).all();
      expect(cw).toHaveLength(0);

      // Word MUST still exist
      const remainingWord = db.select().from(words).where(eq(words.id, 'word-keep')).all();
      expect(remainingWord).toHaveLength(1);
      expect(remainingWord[0].word).toBe('resilient');
    });

    it('deleting a tag removes word_tags but does NOT delete words', () => {
      db.insert(words)
        .values({
          id: 'word-tag-keep',
          word: 'immutable',
          definition: 'unchanging over time',
          createdAt: new Date().toISOString(),
        })
        .run();

      db.insert(tags)
        .values({
          id: 'tag-delete',
          name: 'To Delete',
        })
        .run();

      db.insert(wordTags)
        .values({
          wordId: 'word-tag-keep',
          tagId: 'tag-delete',
        })
        .run();

      // Delete the tag
      db.delete(tags).where(eq(tags.id, 'tag-delete')).run();

      // Join entry should be gone
      const wt = db.select().from(wordTags).where(eq(wordTags.tagId, 'tag-delete')).all();
      expect(wt).toHaveLength(0);

      // Word MUST still exist
      const remainingWord = db.select().from(words).where(eq(words.id, 'word-tag-keep')).all();
      expect(remainingWord).toHaveLength(1);
      expect(remainingWord[0].word).toBe('immutable');
    });
  });
});
