import Database from 'better-sqlite3';
import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema.js';

export type AppDatabase = BetterSQLite3Database<typeof schema> & {
  sqlite: Database.Database;
};

/**
 * Creates all application tables, constraints, and indexes on the given SQLite database.
 * This operation is idempotent (IF NOT EXISTS).
 */
export function createTables(sqlite: Database.Database): void {
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS words (
      id TEXT PRIMARY KEY,
      word TEXT NOT NULL,
      phonetic TEXT,
      part_of_speech TEXT,
      definition TEXT NOT NULL,
      translation TEXT,
      difficulty TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_words_word ON words(word);

    CREATE TABLE IF NOT EXISTS word_families (
      id TEXT PRIMARY KEY,
      word_id TEXT NOT NULL REFERENCES words(id) ON DELETE CASCADE,
      related_word_id TEXT NOT NULL REFERENCES words(id) ON DELETE CASCADE,
      relationship TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_word_families_word_id ON word_families(word_id);
    CREATE INDEX IF NOT EXISTS idx_word_families_related_word_id ON word_families(related_word_id);

    CREATE TABLE IF NOT EXISTS collocations (
      id TEXT PRIMARY KEY,
      word_id TEXT NOT NULL REFERENCES words(id) ON DELETE CASCADE,
      phrase TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_collocations_word_id ON collocations(word_id);

    CREATE TABLE IF NOT EXISTS examples (
      id TEXT PRIMARY KEY,
      word_id TEXT NOT NULL REFERENCES words(id) ON DELETE CASCADE,
      sentence TEXT NOT NULL,
      translation TEXT,
      source TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_examples_word_id ON examples(word_id);

    CREATE TABLE IF NOT EXISTS contexts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      source_type TEXT,
      source_url TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT
    );

    CREATE TABLE IF NOT EXISTS context_words (
      context_id TEXT NOT NULL REFERENCES contexts(id) ON DELETE CASCADE,
      word_id TEXT NOT NULL REFERENCES words(id) ON DELETE CASCADE,
      exposure_count INTEGER NOT NULL DEFAULT 1,
      first_seen_at TEXT,
      last_seen_at TEXT,
      PRIMARY KEY (context_id, word_id)
    );

    CREATE INDEX IF NOT EXISTS idx_context_words_context_id ON context_words(context_id);
    CREATE INDEX IF NOT EXISTS idx_context_words_word_id ON context_words(word_id);

    CREATE TABLE IF NOT EXISTS learning_progress (
      id TEXT PRIMARY KEY,
      word_id TEXT NOT NULL UNIQUE REFERENCES words(id) ON DELETE CASCADE,
      status TEXT NOT NULL DEFAULT 'NEW',
      recognition_score INTEGER NOT NULL DEFAULT 0,
      recall_score INTEGER NOT NULL DEFAULT 0,
      production_score INTEGER NOT NULL DEFAULT 0,
      last_studied_at TEXT,
      updated_at TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_learning_progress_word_id ON learning_progress(word_id);

    CREATE TABLE IF NOT EXISTS review_states (
      id TEXT PRIMARY KEY,
      word_id TEXT NOT NULL UNIQUE REFERENCES words(id) ON DELETE CASCADE,
      interval INTEGER NOT NULL DEFAULT 0,
      ease_factor REAL NOT NULL DEFAULT 2.5,
      repetitions INTEGER NOT NULL DEFAULT 0,
      lapses INTEGER NOT NULL DEFAULT 0,
      due_at TEXT NOT NULL,
      last_reviewed_at TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_review_states_word_id ON review_states(word_id);
    CREATE INDEX IF NOT EXISTS idx_review_states_due_at ON review_states(due_at);

    CREATE TABLE IF NOT EXISTS review_logs (
      id TEXT PRIMARY KEY,
      word_id TEXT NOT NULL REFERENCES words(id) ON DELETE CASCADE,
      review_type TEXT NOT NULL,
      rating TEXT NOT NULL,
      response_time INTEGER,
      answer TEXT,
      correct INTEGER,
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_review_logs_word_id ON review_logs(word_id);
    CREATE INDEX IF NOT EXISTS idx_review_logs_created_at ON review_logs(created_at);

    CREATE TABLE IF NOT EXISTS tags (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      created_at TEXT
    );

    CREATE TABLE IF NOT EXISTS word_tags (
      word_id TEXT NOT NULL REFERENCES words(id) ON DELETE CASCADE,
      tag_id TEXT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
      PRIMARY KEY (word_id, tag_id)
    );

    CREATE INDEX IF NOT EXISTS idx_word_tags_word_id ON word_tags(word_id);
    CREATE INDEX IF NOT EXISTS idx_word_tags_tag_id ON word_tags(tag_id);

    CREATE TABLE IF NOT EXISTS learning_sessions (
      id TEXT PRIMARY KEY,
      session_type TEXT NOT NULL,
      total_words INTEGER NOT NULL DEFAULT 0,
      started_at TEXT NOT NULL,
      completed_at TEXT
    );

    CREATE TABLE IF NOT EXISTS learning_session_items (
      id TEXT PRIMARY KEY,
      session_id TEXT NOT NULL REFERENCES learning_sessions(id) ON DELETE CASCADE,
      word_id TEXT NOT NULL REFERENCES words(id) ON DELETE CASCADE,
      completed_step TEXT,
      recall_result TEXT,
      output_sentence TEXT,
      review_rating TEXT,
      created_at TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_learning_session_items_session_id ON learning_session_items(session_id);
    CREATE INDEX IF NOT EXISTS idx_learning_session_items_word_id ON learning_session_items(word_id);
  `);

  // Ensure exposure columns exist if context_words was created with older schema
  const contextWordsTable = sqlite
    .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='context_words'")
    .get();
  if (contextWordsTable) {
    const cols = sqlite.prepare("PRAGMA table_info('context_words')").all() as Array<{ name: string }>;
    const colNames = new Set(cols.map((c) => c.name));
    const missingStatements: string[] = [];

    if (!colNames.has('exposure_count')) {
      missingStatements.push('ALTER TABLE context_words ADD COLUMN exposure_count INTEGER NOT NULL DEFAULT 1');
    }
    if (!colNames.has('first_seen_at')) {
      missingStatements.push('ALTER TABLE context_words ADD COLUMN first_seen_at TEXT');
    }
    if (!colNames.has('last_seen_at')) {
      missingStatements.push('ALTER TABLE context_words ADD COLUMN last_seen_at TEXT');
    }

    if (missingStatements.length > 0) {
      sqlite.transaction(() => {
        for (const stmt of missingStatements) {
          sqlite.exec(stmt);
        }
      })();
    }

    // Postcondition verification: ensure all required columns exist
    const colsAfter = sqlite.prepare("PRAGMA table_info('context_words')").all() as Array<{ name: string }>;
    const colNamesAfter = new Set(colsAfter.map((c) => c.name));
    const requiredColumns = ['exposure_count', 'first_seen_at', 'last_seen_at'];
    for (const col of requiredColumns) {
      if (!colNamesAfter.has(col)) {
        throw new Error(`Migration verification failed: context_words is missing column "${col}"`);
      }
    }
  }

  // Ensure canonical case-insensitive uniqueness on words
  const wordsTable = sqlite
    .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='words'")
    .get();
  if (wordsTable) {
    const duplicates = sqlite
      .prepare(`
        SELECT lower(word) AS lower_word, count(*) AS count
        FROM words
        GROUP BY lower(word)
        HAVING count > 1
      `)
      .all() as Array<{ lower_word: string; count: number }>;

    if (duplicates.length > 0) {
      const dupList = duplicates.map((d) => `"${d.lower_word}" (${d.count} occurrences)`).join(', ');
      throw new Error(
        `Database migration failed: duplicate words found violating canonical case-insensitive uniqueness: ${dupList}`
      );
    }

    sqlite.exec('CREATE UNIQUE INDEX IF NOT EXISTS uq_words_lower_word ON words(lower(word));');
  }
}

/**
 * Initializes and returns a Drizzle database instance backed by better-sqlite3.
 * Supports file paths, :memory:, or an existing better-sqlite3 Database instance.
 * Automatically configures foreign_keys = ON, WAL mode (for file DBs), and creates tables.
 */
export function getDb(filePathOrInstance?: string | Database.Database): AppDatabase {
  let sqlite: Database.Database;

  if (filePathOrInstance && typeof filePathOrInstance === 'object') {
    sqlite = filePathOrInstance;
    const isMemory = sqlite.memory || sqlite.name === ':memory:' || sqlite.name === '';
    if (!isMemory) {
      sqlite.pragma('journal_mode = WAL');
    }
  } else {
    const dbPath = filePathOrInstance ?? ':memory:';
    sqlite = new Database(dbPath);

    if (dbPath !== ':memory:') {
      sqlite.pragma('journal_mode = WAL');
    }
  }

  // Always enable foreign key constraints
  sqlite.pragma('foreign_keys = ON');

  // Ensure tables and indexes exist
  createTables(sqlite);

  return Object.assign(drizzle(sqlite, { schema }), { sqlite });
}
