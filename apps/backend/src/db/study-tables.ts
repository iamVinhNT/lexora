/**
 * @file study-tables.ts
 * @description Idempotent SQLite DDL and additive evidence-link migration for study calendar storage.
 */
import type Database from 'better-sqlite3';

const tables = {
  study_preferences: `CREATE TABLE IF NOT EXISTS study_preferences (
    id TEXT NOT NULL PRIMARY KEY CHECK (id = 'local'),
    time_zone TEXT NOT NULL,
    study_days TEXT NOT NULL,
    learning_target INTEGER NOT NULL CHECK (learning_target BETWEEN 0 AND 9007199254740991),
    review_target INTEGER NOT NULL CHECK (review_target BETWEEN 0 AND 9007199254740991),
    grammar_target INTEGER NOT NULL CHECK (grammar_target IN (0, 1)),
    updated_at TEXT NOT NULL
  )`,
  study_tasks: `CREATE TABLE IF NOT EXISTS study_tasks (
    id TEXT NOT NULL PRIMARY KEY,
    scheduled_date TEXT NOT NULL,
    kind TEXT NOT NULL CHECK (kind IN ('LEARN_WORDS', 'REVIEW_WORDS', 'GRAMMAR')),
    target_count INTEGER NOT NULL CHECK (target_count BETWEEN 1 AND 9007199254740991),
    source TEXT NOT NULL CHECK (source IN ('AUTO', 'MANUAL')),
    mode TEXT,
    context_id TEXT,
    topic_id TEXT,
    lesson_id TEXT,
    revision_id TEXT,
    revision TEXT,
    version INTEGER NOT NULL CHECK (version BETWEEN 1 AND 9007199254740991),
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    cancelled_at TEXT,
    transferred_at TEXT,
    transferred_to_task_id TEXT REFERENCES study_tasks(id) ON DELETE CASCADE,
    transferred_count INTEGER NOT NULL DEFAULT 0 CHECK (transferred_count BETWEEN 0 AND 9007199254740991),
    creation_intent TEXT NOT NULL,
    transfer_intent TEXT,
    CHECK ((kind != 'LEARN_WORDS') OR (mode IS NOT NULL AND (
      (mode = 'context' AND context_id IS NOT NULL AND topic_id IS NULL) OR
      (mode = 'topic' AND topic_id IS NOT NULL AND context_id IS NULL) OR
      (mode IN ('new_words', 'weak_words') AND context_id IS NULL AND topic_id IS NULL)))),
    CHECK ((kind = 'LEARN_WORDS' AND mode IN ('new_words', 'context', 'topic', 'weak_words') AND lesson_id IS NULL AND revision_id IS NULL AND revision IS NULL)
      OR (kind = 'REVIEW_WORDS' AND mode IS NULL AND context_id IS NULL AND topic_id IS NULL AND lesson_id IS NULL AND revision_id IS NULL AND revision IS NULL)
      OR (kind = 'GRAMMAR' AND mode IS NULL AND context_id IS NULL AND topic_id IS NULL)),
    CHECK ((kind != 'GRAMMAR') OR ((lesson_id IS NULL AND revision_id IS NULL AND revision IS NULL) OR (lesson_id IS NOT NULL AND revision_id IS NOT NULL AND revision IS NOT NULL)))
  )`,
} as const;

const indexes = [
  `CREATE INDEX IF NOT EXISTS idx_study_tasks_scheduled_date ON study_tasks(scheduled_date)`,
  `CREATE INDEX IF NOT EXISTS idx_study_tasks_transferred_to_task_id ON study_tasks(transferred_to_task_id)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS uq_study_tasks_active_kind_date ON study_tasks(scheduled_date, kind) WHERE kind IN ('LEARN_WORDS', 'REVIEW_WORDS') AND cancelled_at IS NULL AND transferred_at IS NULL`,
  `CREATE UNIQUE INDEX IF NOT EXISTS uq_study_tasks_active_grammar ON study_tasks(scheduled_date, lesson_id, revision_id) WHERE kind = 'GRAMMAR' AND lesson_id IS NOT NULL AND cancelled_at IS NULL AND transferred_at IS NULL`,
] as const;

function normalizeSql(sql: string): string {
  return sql.replace(/\bIF\s+NOT\s+EXISTS\b/gi, '').replace(/[\s"`\[\]]+/g, '').toLowerCase();
}

const legacyTables = {
  study_preferences: normalizeSql(tables.study_preferences)
    .replace('learning_targetbetween0and9007199254740991', 'learning_target>=0')
    .replace('review_targetbetween0and9007199254740991', 'review_target>=0'),
  study_tasks: normalizeSql(tables.study_tasks)
    .replace('target_countbetween1and9007199254740991', 'target_count>0')
    .replace('versionbetween1and9007199254740991', 'version>0')
    .replace('transferred_countbetween0and9007199254740991', 'transferred_count>=0')
    .replace(normalizeSql(`CHECK ((kind != 'LEARN_WORDS') OR (mode IS NOT NULL AND (
      (mode = 'context' AND context_id IS NOT NULL AND topic_id IS NULL) OR
      (mode = 'topic' AND topic_id IS NOT NULL AND context_id IS NULL) OR
      (mode IN ('new_words', 'weak_words') AND context_id IS NULL AND topic_id IS NULL)))),`), ''),
};

function rebuildLegacyTable(sqlite: Database.Database, name: keyof typeof tables): void {
  const dependentDefinitions = sqlite.prepare(`
    SELECT sql FROM sqlite_master WHERE tbl_name = ? AND type IN ('index', 'trigger') AND sql IS NOT NULL
  `).all(name) as Array<{ sql: string }>;
  const replacement = `${name}_migration`;
  sqlite.exec(tables[name].replace(`IF NOT EXISTS ${name}`, replacement));
  sqlite.exec(`INSERT INTO ${replacement} SELECT * FROM ${name}`);
  // FK enforcement is disabled outside the transaction: dropping the old parent must not cascade evidence.
  sqlite.exec(`DROP TABLE ${name}`);
  sqlite.exec(`ALTER TABLE ${replacement} RENAME TO ${name}`);
  for (const { sql } of dependentDefinitions) sqlite.exec(sql);
}
function verifyTable(sqlite: Database.Database, name: keyof typeof tables): void {
  const actual = sqlite.prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = ?").get(name) as { sql: string } | undefined;
  const expected = normalizeSql(tables[name]);
  const definition = actual && normalizeSql(actual.sql);
  if (!definition || definition !== expected) throw new Error(`Incompatible study schema: ${name} has a different definition.`);
}

function verifyIndexes(sqlite: Database.Database): void {
  for (const statement of indexes) {
    const name = statement.match(/CREATE (?:UNIQUE )?INDEX IF NOT EXISTS (\w+)/i)?.[1];
    const actual = name
      ? sqlite.prepare("SELECT sql FROM sqlite_master WHERE type = 'index' AND name = ?").get(name) as { sql: string } | undefined
      : undefined;
    const expected = statement.replace(/\bIF\s+NOT\s+EXISTS\b/gi, '').replace(/[\s"`\[\]]+/g, '').toLowerCase();
    const definition = actual?.sql.replace(/[\s"`\[\]]+/g, '').toLowerCase();
    if (!definition || definition !== expected) throw new Error(`Incompatible study schema: index ${name ?? '<unknown>'} has a different definition.`);
  }
}

function migrateEvidenceLink(sqlite: Database.Database, table: string): void {
  const exists = sqlite.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?").get(table);
  if (!exists) return;
  const columns = sqlite.prepare(`PRAGMA table_info('${table}')`).all() as Array<{ name: string; type: string; notnull: number }>;
  const linkColumn = columns.find(({ name }) => name === 'study_task_id');
  if (!linkColumn) sqlite.exec(`ALTER TABLE ${table} ADD COLUMN study_task_id TEXT REFERENCES study_tasks(id) ON DELETE CASCADE`);
  else if (linkColumn.type.toUpperCase() !== 'TEXT' || linkColumn.notnull !== 0) {
    throw new Error(`Incompatible study schema: ${table}.study_task_id must be nullable TEXT.`);
  }

  const foreignKey = (sqlite.prepare(`PRAGMA foreign_key_list('${table}')`).all() as Array<{ table: string; from: string; to: string; on_delete: string }>)
    .find((key) => key.from === 'study_task_id');
  if (!foreignKey || foreignKey.table !== 'study_tasks' || foreignKey.to !== 'id' || foreignKey.on_delete.toUpperCase() !== 'CASCADE') {
    throw new Error(`Incompatible study schema: ${table}.study_task_id must reference study_tasks(id) ON DELETE CASCADE.`);
  }
  sqlite.exec(`CREATE INDEX IF NOT EXISTS idx_${table}_study_task_id ON ${table}(study_task_id)`);
  const index = sqlite.prepare("SELECT sql FROM sqlite_master WHERE type = 'index' AND name = ?").get(`idx_${table}_study_task_id`) as { sql: string } | undefined;
  const expected = `CREATE INDEX idx_${table}_study_task_id ON ${table}(study_task_id)`.replace(/[\s"`\[\]]+/g, '').toLowerCase();
  if (!index || index.sql.replace(/[\s"`\[\]]+/g, '').toLowerCase() !== expected) {
    throw new Error(`Incompatible study schema: index idx_${table}_study_task_id has a different definition.`);
  }
}

export function createStudyTables(sqlite: Database.Database): void {
  sqlite.pragma('foreign_keys = ON');
  if (sqlite.pragma('foreign_keys', { simple: true }) !== 1) {
    throw new Error('Study tables require SQLite foreign key enforcement.');
  }

  const legacyNames = (Object.keys(tables) as Array<keyof typeof tables>).filter((name) => {
    const actual = sqlite.prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = ?").get(name) as { sql: string } | undefined;
    if (!actual || normalizeSql(actual.sql) === normalizeSql(tables[name])) return false;
    if (normalizeSql(actual.sql) === legacyTables[name]) return true;
    throw new Error(`Incompatible study schema: ${name} has a different definition.`);
  });
  if (legacyNames.length && sqlite.inTransaction) {
    throw new Error('Legacy study schema must be upgraded before starting a transaction.');
  }
  if (legacyNames.length) sqlite.pragma('foreign_keys = OFF');
  try {
    sqlite.transaction(() => {
      for (const name of legacyNames) rebuildLegacyTable(sqlite, name);
      for (const statement of Object.values(tables)) sqlite.exec(statement);
      for (const name of Object.keys(tables) as Array<keyof typeof tables>) verifyTable(sqlite, name);
      migrateEvidenceLink(sqlite, 'learning_sessions');
      migrateEvidenceLink(sqlite, 'review_logs');
      for (const statement of indexes) sqlite.exec(statement);
      verifyIndexes(sqlite);
      if (legacyNames.length && sqlite.prepare('PRAGMA foreign_key_check').all().length) {
        throw new Error('Study schema migration would leave invalid foreign keys.');
      }
    })();
  } finally {
    if (legacyNames.length) sqlite.pragma('foreign_keys = ON');
  }
}
