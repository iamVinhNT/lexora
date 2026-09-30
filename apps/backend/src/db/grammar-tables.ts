/**
 * @file grammar-tables.ts
 * @description Standalone additive DDL for grammar lesson progress and immutable exercise attempts.
 *
 * This is not wired into getDb() or createTables(); startup, routes, and learner writes do not use these tables yet.
 */
import type Database from 'better-sqlite3';

const tables = {
  grammar_lesson_progress: `CREATE TABLE IF NOT EXISTS grammar_lesson_progress (
    lesson_id TEXT NOT NULL PRIMARY KEY CHECK (length(trim(lesson_id)) > 0),
    revision_id TEXT NOT NULL CHECK (length(trim(revision_id)) > 0),
    revision TEXT NOT NULL CHECK (length(trim(revision)) > 0),
    last_position INTEGER NOT NULL DEFAULT 0 CHECK (last_position >= 0),
    is_complete INTEGER NOT NULL DEFAULT 0 CHECK (is_complete IN (0, 1)),
    completed_at TEXT,
    created_at TEXT NOT NULL CHECK (length(trim(created_at)) > 0),
    updated_at TEXT NOT NULL CHECK (length(trim(updated_at)) > 0)
  )`,
  grammar_exercise_attempts: `CREATE TABLE IF NOT EXISTS grammar_exercise_attempts (
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
  )`,
} as const;

const indexes = [
  `CREATE INDEX IF NOT EXISTS idx_grammar_lesson_progress_updated_at ON grammar_lesson_progress(updated_at)`,
  `CREATE INDEX IF NOT EXISTS idx_grammar_exercise_attempts_lesson_id ON grammar_exercise_attempts(lesson_id)`,
  `CREATE INDEX IF NOT EXISTS idx_grammar_exercise_attempts_exercise_id ON grammar_exercise_attempts(exercise_id)`,
  `CREATE INDEX IF NOT EXISTS idx_grammar_exercise_attempts_created_at ON grammar_exercise_attempts(created_at)`,
] as const;

const immutableAttemptsTriggers = [
  `CREATE TRIGGER IF NOT EXISTS grammar_exercise_attempts_immutable_update
    BEFORE UPDATE ON grammar_exercise_attempts
    BEGIN
      SELECT RAISE(ABORT, 'grammar exercise attempts are immutable');
    END`,
  `CREATE TRIGGER IF NOT EXISTS grammar_exercise_attempts_immutable_insert
    BEFORE INSERT ON grammar_exercise_attempts
    WHEN EXISTS (SELECT 1 FROM grammar_exercise_attempts WHERE id = NEW.id OR request_id = NEW.request_id)
    BEGIN
      SELECT RAISE(ABORT, 'grammar exercise attempts are immutable');
    END`,
] as const;

function normalizeSql(sql: string): string {
  return sql.replace(/\bIF\s+NOT\s+EXISTS\b/gi, '')
    .replace(/[\s"`\[\]]+/g, '')
    .toLowerCase();
}

function verifyTable(sqlite: Database.Database, name: keyof typeof tables): void {
  const actual = sqlite.prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = ?").get(name) as { sql: string } | undefined;
  const columns = sqlite.prepare(`PRAGMA table_info('${name}')`).all() as Array<{ name: string }>;
  const actualColumnNames = new Set(columns.map(({ name: column }) => column));
  const expectedColumns = name === 'grammar_lesson_progress'
    ? ['lesson_id', 'revision_id', 'revision', 'last_position', 'is_complete', 'completed_at', 'created_at', 'updated_at']
    : ['id', 'lesson_id', 'revision_id', 'revision', 'exercise_id', 'request_id', 'answer', 'is_correct', 'feedback', 'created_at'];
  const missingColumn = expectedColumns.find((column) => !actualColumnNames.has(column));

  if (missingColumn) throw new Error(`Incompatible grammar schema: ${name} is missing required column ${missingColumn}.`);
  if (!actual || normalizeSql(actual.sql) !== normalizeSql(tables[name])) {
    throw new Error(`Incompatible grammar schema: ${name} has a different column or constraint definition.`);
  }
}

function verifyIndex(sqlite: Database.Database, statement: string): void {
  const name = statement.match(/CREATE INDEX IF NOT EXISTS (\w+)/i)?.[1];
  const actual = name
    ? sqlite.prepare("SELECT sql FROM sqlite_master WHERE type = 'index' AND name = ?").get(name) as { sql: string } | undefined
    : undefined;
  if (!actual || normalizeSql(actual.sql) !== normalizeSql(statement)) {
    throw new Error(`Incompatible grammar schema: index ${name ?? '<unknown>'} has a different definition.`);
  }
}

function verifyImmutableTriggers(sqlite: Database.Database): void {
  for (const statement of immutableAttemptsTriggers) {
    const name = statement.match(/CREATE TRIGGER IF NOT EXISTS (\w+)/i)?.[1];
    const actual = name
      ? sqlite.prepare("SELECT sql FROM sqlite_master WHERE type = 'trigger' AND name = ?").get(name) as { sql: string } | undefined
      : undefined;
    if (!actual || normalizeSql(actual.sql) !== normalizeSql(statement)) {
      throw new Error(`Incompatible grammar schema: immutable-attempt trigger ${name ?? '<unknown>'} has a different definition.`);
    }
  }
}

export function createGrammarTables(sqlite: Database.Database): void {
  sqlite.pragma('foreign_keys = ON');
  if (sqlite.pragma('foreign_keys', { simple: true }) !== 1) {
    throw new Error('Grammar tables require SQLite foreign key enforcement.');
  }

  sqlite.transaction(() => {
    for (const statement of Object.values(tables)) sqlite.exec(statement);
    for (const statement of indexes) sqlite.exec(statement);
    for (const statement of immutableAttemptsTriggers) sqlite.exec(statement);

    for (const name of Object.keys(tables) as Array<keyof typeof tables>) verifyTable(sqlite, name);
    for (const statement of indexes) verifyIndex(sqlite, statement);
    verifyImmutableTriggers(sqlite);
  })();
}
