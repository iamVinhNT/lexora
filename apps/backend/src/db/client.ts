import Database from 'better-sqlite3';
import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema.js';
import { createStudyTables } from './study-tables.js';
import { createGrammarTables } from './grammar-tables.js';
import { createGrammarPracticeTables } from './grammar-practice-tables.js';
import { groupSessionItems } from '../domain/learning/grouping.js';

export type AppDatabase = BetterSQLite3Database<typeof schema> & {
  sqlite: Database.Database;
};

/**
 * Upgrades the pre-redesign learning tables without deleting historical rows.
 */
export function assertLearningSchemaDowngradeSafe(sqlite: Database.Database): void {
  const tableExists = (name: string) => Boolean(sqlite.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?").get(name));
  const attempts = tableExists('learning_attempts')
    ? Number((sqlite.prepare('SELECT count(*) AS count FROM learning_attempts').get() as { count: number }).count ?? 0)
    : 0;
  const sessionHasStatus = tableExists('learning_sessions') && Boolean(sqlite.prepare("SELECT 1 FROM pragma_table_info('learning_sessions') WHERE name = 'status'").get());
  const v2Status = sessionHasStatus
    ? Number((sqlite.prepare("SELECT count(*) AS count FROM learning_sessions WHERE status != 'IN_PROGRESS'").get() as { count: number }).count ?? 0)
    : 0;
  if (attempts > 0 || v2Status > 0) throw new Error('Learning schema downgrade refused: version-2 evidence would be lost');
}

function migrateLearningSchema(sqlite: Database.Database): void {
  const tableExists = (name: string) => Boolean(sqlite.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=?").get(name));
  const columns = (name: string) => new Set((sqlite.prepare(`PRAGMA table_info('${name}')`).all() as Array<{ name: string }>).map((column) => column.name));
  const migration = sqlite.transaction(() => {
    if (tableExists('review_logs') && !columns('review_logs').has('performance_score')) sqlite.exec('ALTER TABLE review_logs ADD COLUMN performance_score INTEGER');
    if (tableExists('learning_attempts') && !columns('learning_attempts').has('explanation')) sqlite.exec('ALTER TABLE learning_attempts ADD COLUMN explanation TEXT');
    if (tableExists('learning_attempts') && !columns('learning_attempts').has('suggestion')) sqlite.exec('ALTER TABLE learning_attempts ADD COLUMN suggestion TEXT');
    if (tableExists('learning_sessions') && !columns('learning_sessions').has('status')) sqlite.exec("ALTER TABLE learning_sessions ADD COLUMN status TEXT NOT NULL DEFAULT 'IN_PROGRESS'");
    if (tableExists('learning_session_items') && tableExists('learning_sessions')) {
      const itemColumns = columns('learning_session_items');
      const needsPositionMigration = !itemColumns.has('position');
      const needsGroupMigration = !itemColumns.has('group_index');
      if (needsPositionMigration) sqlite.exec('ALTER TABLE learning_session_items ADD COLUMN position INTEGER NOT NULL DEFAULT 0');
      if (needsGroupMigration) sqlite.exec('ALTER TABLE learning_session_items ADD COLUMN group_index INTEGER NOT NULL DEFAULT 0');
      if (needsPositionMigration || needsGroupMigration) {
        const sessions = sqlite.prepare('SELECT id FROM learning_sessions ORDER BY started_at DESC, id DESC').all() as Array<{ id: string }>;
        const hasDifficulty = tableExists('words') && columns('words').has('difficulty');
        const findDifficulty = hasDifficulty ? sqlite.prepare('SELECT difficulty FROM words WHERE id = ?') : null;
        const ordering = needsPositionMigration ? 'created_at, id' : 'position, id';
        const updates = [
          ...(needsPositionMigration ? ['position = @position'] : []),
          ...(needsGroupMigration ? ['group_index = @groupIndex'] : []),
        ];
        const updateItem = sqlite.prepare(`UPDATE learning_session_items SET ${updates.join(', ')} WHERE id = @id`);
        for (const session of sessions) {
          const items = sqlite.prepare(`SELECT id, word_id FROM learning_session_items WHERE session_id = ? ORDER BY ${ordering}`).all(session.id) as Array<{ id: string; word_id: string }>;
          const assignments = groupSessionItems(items.map((item) => ({ id: item.id, difficulty: findDifficulty ? (findDifficulty.get(item.word_id) as { difficulty?: string | null } | undefined)?.difficulty : null })));
          for (const group of assignments) for (const assignment of group) {
            updateItem.run({
              id: assignment.id,
              ...(needsPositionMigration ? { position: assignment.position } : {}),
              ...(needsGroupMigration ? { groupIndex: assignment.groupIndex } : {}),
            });
          }
        }
      }
    }
    if (tableExists('learning_sessions')) {
      sqlite.exec("UPDATE learning_sessions SET status = CASE WHEN completed_at IS NOT NULL THEN 'COMPLETED' ELSE status END");
      const active = sqlite.prepare("SELECT id FROM learning_sessions WHERE status = 'IN_PROGRESS' ORDER BY started_at DESC, id DESC").all() as Array<{ id: string }>;
      active.slice(1).forEach((session) => sqlite.prepare("UPDATE learning_sessions SET status = 'ABANDONED' WHERE id = ?").run(session.id));
      sqlite.exec("CREATE INDEX IF NOT EXISTS idx_learning_sessions_status ON learning_sessions(status)");
      sqlite.exec("CREATE INDEX IF NOT EXISTS idx_learning_sessions_started_at ON learning_sessions(started_at)");
      sqlite.exec("CREATE UNIQUE INDEX IF NOT EXISTS uq_learning_sessions_one_active ON learning_sessions(status) WHERE status = 'IN_PROGRESS'");
    }
  });
  migration();
}

/**
 * Creates all application tables, constraints, and indexes on the given SQLite database.
 * This operation is idempotent (IF NOT EXISTS).
 */
export function createTables(sqlite: Database.Database): void {
  sqlite.pragma('foreign_keys = ON');
  migrateLearningSchema(sqlite);
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
       performance_score INTEGER,
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
       status TEXT NOT NULL DEFAULT 'IN_PROGRESS',
       started_at TEXT NOT NULL,
       completed_at TEXT
     );

    CREATE TABLE IF NOT EXISTS learning_session_items (
      id TEXT PRIMARY KEY,
       session_id TEXT NOT NULL REFERENCES learning_sessions(id) ON DELETE CASCADE,
       word_id TEXT NOT NULL REFERENCES words(id) ON DELETE CASCADE,
       position INTEGER NOT NULL DEFAULT 0,
       group_index INTEGER NOT NULL DEFAULT 0,
       completed_step TEXT,
      recall_result TEXT,
      output_sentence TEXT,
      review_rating TEXT,
      created_at TEXT
    );

     CREATE INDEX IF NOT EXISTS idx_learning_session_items_session_id ON learning_session_items(session_id);
     CREATE INDEX IF NOT EXISTS idx_learning_session_items_word_id ON learning_session_items(word_id);
     CREATE INDEX IF NOT EXISTS idx_learning_session_items_group_position ON learning_session_items(session_id, group_index, position);
     CREATE UNIQUE INDEX IF NOT EXISTS uq_learning_session_items_position ON learning_session_items(session_id, position);
     CREATE UNIQUE INDEX IF NOT EXISTS uq_learning_session_items_word ON learning_session_items(session_id, word_id);
     CREATE TABLE IF NOT EXISTS learning_attempts (
       id TEXT PRIMARY KEY,
       session_item_id TEXT NOT NULL REFERENCES learning_session_items(id) ON DELETE CASCADE,
       request_id TEXT NOT NULL UNIQUE,
       type TEXT NOT NULL CHECK (type IN ('RECALL', 'OUTPUT')),
       attempt_number INTEGER NOT NULL CHECK (attempt_number IN (1, 2)),
       answer TEXT NOT NULL,
       result TEXT NOT NULL,
        performance_score INTEGER NOT NULL CHECK (performance_score BETWEEN 0 AND 100),
        feedback_codes TEXT,
        explanation TEXT,
        suggestion TEXT,
        source TEXT NOT NULL DEFAULT 'LOCAL',
       created_at TEXT NOT NULL,
       UNIQUE(session_item_id, type, attempt_number)
     );
     CREATE INDEX IF NOT EXISTS idx_learning_attempts_session_item_id ON learning_attempts(session_item_id);
     CREATE INDEX IF NOT EXISTS idx_learning_attempts_item_type ON learning_attempts(session_item_id, type);
     CREATE UNIQUE INDEX IF NOT EXISTS uq_learning_sessions_one_active ON learning_sessions(status) WHERE status = 'IN_PROGRESS';
     CREATE INDEX IF NOT EXISTS idx_learning_sessions_status ON learning_sessions(status);
     CREATE INDEX IF NOT EXISTS idx_learning_sessions_started_at ON learning_sessions(started_at);
   `);
  createStudyTables(sqlite);
  createGrammarTables(sqlite);
  createGrammarPracticeTables(sqlite);

  const attemptColumns = new Set((sqlite.prepare("PRAGMA table_info('learning_attempts')").all() as Array<{ name: string }>).map((column) => column.name));
  if (!attemptColumns.has('explanation')) sqlite.exec('ALTER TABLE learning_attempts ADD COLUMN explanation TEXT');
  if (!attemptColumns.has('suggestion')) sqlite.exec('ALTER TABLE learning_attempts ADD COLUMN suggestion TEXT');

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
