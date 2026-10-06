/**
 * @file grammar-practice-tables.ts
 * @description Standalone additive DDL for grammar review states and practice attempts.
 */
import type Database from 'better-sqlite3';

const tables = {
  grammar_review_states: `CREATE TABLE IF NOT EXISTS grammar_review_states (
    id TEXT NOT NULL PRIMARY KEY CHECK (length(trim(id)) > 0),
    lesson_id TEXT NOT NULL CHECK (length(trim(lesson_id)) > 0),
    revision_id TEXT NOT NULL CHECK (length(trim(revision_id)) > 0),
    revision TEXT NOT NULL CHECK (length(trim(revision)) > 0),
    ease_factor REAL NOT NULL CHECK (ease_factor >= 1.3),
    repetitions INTEGER NOT NULL CHECK (repetitions >= 0),
    interval INTEGER NOT NULL CHECK (interval >= 0),
    lapses INTEGER NOT NULL CHECK (lapses >= 0),
    due_at TEXT NOT NULL CHECK (length(trim(due_at)) > 0),
    last_reviewed_at TEXT,
    created_at TEXT NOT NULL CHECK (length(trim(created_at)) > 0),
    updated_at TEXT NOT NULL CHECK (length(trim(updated_at)) > 0),
    UNIQUE(lesson_id, revision_id)
  )`,
  grammar_practice_attempts: `CREATE TABLE IF NOT EXISTS grammar_practice_attempts (
    id TEXT NOT NULL PRIMARY KEY CHECK (length(trim(id)) > 0),
    request_id TEXT NOT NULL UNIQUE CHECK (length(trim(request_id)) > 0),
    lesson_id TEXT NOT NULL CHECK (length(trim(lesson_id)) > 0),
    revision_id TEXT NOT NULL CHECK (length(trim(revision_id)) > 0),
    revision TEXT NOT NULL CHECK (length(trim(revision)) > 0),
    kind TEXT NOT NULL CHECK (kind IN ('review', 'output')),
    exercise_id TEXT CHECK (exercise_id IS NULL OR length(trim(exercise_id)) > 0),
    prompt_id TEXT CHECK (prompt_id IS NULL OR length(trim(prompt_id)) > 0),
    answer TEXT,
    text TEXT,
    rubric TEXT,
    assessment_source TEXT NOT NULL CHECK (assessment_source IN ('deterministic', 'self')),
    is_correct INTEGER CHECK (is_correct IS NULL OR is_correct IN (0, 1)),
    feedback TEXT,
    rating TEXT CHECK (rating IS NULL OR rating IN ('AGAIN', 'GOOD')),
    state TEXT,
    created_at TEXT NOT NULL CHECK (length(trim(created_at)) > 0)
  )`,
} as const;

const indexes = [
  `CREATE INDEX IF NOT EXISTS idx_grammar_review_states_due_at ON grammar_review_states(due_at)`,
  `CREATE INDEX IF NOT EXISTS idx_grammar_review_states_lesson_revision ON grammar_review_states(lesson_id, revision_id)`,
  `CREATE INDEX IF NOT EXISTS idx_grammar_practice_attempts_lesson_revision ON grammar_practice_attempts(lesson_id, revision_id)`,
  `CREATE INDEX IF NOT EXISTS idx_grammar_practice_attempts_created_at ON grammar_practice_attempts(created_at)`,
  `CREATE INDEX IF NOT EXISTS idx_grammar_practice_attempts_request_id ON grammar_practice_attempts(request_id)`,
  `CREATE INDEX IF NOT EXISTS idx_grammar_practice_attempts_kind ON grammar_practice_attempts(kind)`,
] as const;

const immutablePracticeAttemptsTriggers = [
  `CREATE TRIGGER IF NOT EXISTS grammar_practice_attempts_immutable_update
    BEFORE UPDATE ON grammar_practice_attempts
    BEGIN
      SELECT RAISE(ABORT, 'grammar practice attempts are immutable');
    END`,
  `CREATE TRIGGER IF NOT EXISTS grammar_practice_attempts_immutable_insert
    BEFORE INSERT ON grammar_practice_attempts
    WHEN EXISTS (SELECT 1 FROM grammar_practice_attempts WHERE id = NEW.id OR request_id = NEW.request_id)
    BEGIN
      SELECT RAISE(ABORT, 'grammar practice attempts are immutable');
    END`,
] as const;

function normalizeSql(sql: string): string {
  return sql
    .replace(/\bIF\s+NOT\s+EXISTS\b/gi, '')
    .replace(/[\s"`\[\]]+/g, '')
    .toLowerCase();
}

function verifyTable(sqlite: Database.Database, name: keyof typeof tables): void {
  const actual = sqlite.prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = ?").get(name) as { sql: string } | undefined;
  const columns = sqlite.prepare(`PRAGMA table_info('${name}')`).all() as Array<{ name: string }>;
  const actualColumnNames = new Set(columns.map(({ name: column }) => column));
  const expectedColumns = name === 'grammar_review_states'
    ? ['id', 'lesson_id', 'revision_id', 'revision', 'ease_factor', 'repetitions', 'interval', 'lapses', 'due_at', 'last_reviewed_at', 'created_at', 'updated_at']
    : ['id', 'request_id', 'lesson_id', 'revision_id', 'revision', 'kind', 'exercise_id', 'prompt_id', 'answer', 'text', 'rubric', 'assessment_source', 'is_correct', 'feedback', 'rating', 'state', 'created_at'];
  const missingColumn = expectedColumns.find((column) => !actualColumnNames.has(column));

  if (missingColumn) {
    throw new Error(`Incompatible grammar practice schema: ${name} is missing required column ${missingColumn}.`);
  }
  if (!actual || normalizeSql(actual.sql) !== normalizeSql(tables[name])) {
    throw new Error(`Incompatible grammar practice schema: ${name} has a different column or constraint definition.`);
  }
}

function verifyIndex(sqlite: Database.Database, statement: string): void {
  const name = statement.match(/CREATE INDEX IF NOT EXISTS (\w+)/i)?.[1];
  const actual = name
    ? sqlite.prepare("SELECT sql FROM sqlite_master WHERE type = 'index' AND name = ?").get(name) as { sql: string } | undefined
    : undefined;
  if (!actual || normalizeSql(actual.sql) !== normalizeSql(statement)) {
    throw new Error(`Incompatible grammar practice schema: index ${name ?? '<unknown>'} has a different definition.`);
  }
}

function verifyImmutableTriggers(sqlite: Database.Database): void {
  for (const statement of immutablePracticeAttemptsTriggers) {
    const name = statement.match(/CREATE TRIGGER IF NOT EXISTS (\w+)/i)?.[1];
    const actual = name
      ? sqlite.prepare("SELECT sql FROM sqlite_master WHERE type = 'trigger' AND name = ?").get(name) as { sql: string } | undefined
      : undefined;
    if (!actual || normalizeSql(actual.sql) !== normalizeSql(statement)) {
      throw new Error(`Incompatible grammar practice schema: immutable trigger ${name ?? '<unknown>'} has a different definition.`);
    }
  }
}

export function createGrammarPracticeTables(sqlite: Database.Database): void {
  sqlite.pragma('foreign_keys = ON');
  if (sqlite.pragma('foreign_keys', { simple: true }) !== 1) {
    throw new Error('Grammar practice tables require SQLite foreign key enforcement.');
  }

  sqlite.transaction(() => {
    for (const statement of Object.values(tables)) sqlite.exec(statement);
    for (const statement of indexes) sqlite.exec(statement);
    for (const statement of immutablePracticeAttemptsTriggers) sqlite.exec(statement);

    for (const name of Object.keys(tables) as Array<keyof typeof tables>) verifyTable(sqlite, name);
    for (const statement of indexes) verifyIndex(sqlite, statement);
    verifyImmutableTriggers(sqlite);
  })();
}
