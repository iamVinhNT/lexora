/**
 * @file review-attempt-tables.ts
 * @description Idempotent SQLite DDL for adaptive active review attempts and requests.
 */
import type Database from 'better-sqlite3';

const tables = {
  review_attempts: `CREATE TABLE IF NOT EXISTS review_attempts (
    id TEXT PRIMARY KEY,
    word_id TEXT NOT NULL REFERENCES words(id) ON DELETE CASCADE,
    study_task_id TEXT REFERENCES study_tasks(id) ON DELETE CASCADE,
    status TEXT NOT NULL CHECK(status IN ('ACTIVE', 'COMPLETED', 'ABANDONED')),
    stage TEXT NOT NULL CHECK(stage IN ('RECALL', 'FEEDBACK', 'OUTPUT', 'ASSESS')),
    version INTEGER NOT NULL CHECK(version >= 1),
    prompt_type TEXT NOT NULL CHECK(prompt_type IN ('RECALL', 'CLOZE')),
    prompt_text TEXT NOT NULL,
    expected_due_at TEXT NOT NULL,
    expected_last_reviewed_at TEXT,
    expected_repetitions INTEGER NOT NULL CHECK(expected_repetitions >= 0),
    expected_interval INTEGER NOT NULL CHECK(expected_interval >= 0),
    expected_ease_factor REAL NOT NULL CHECK(expected_ease_factor > 0),
    expected_lapses INTEGER NOT NULL CHECK(expected_lapses >= 0),
    expected_word_updated_at TEXT,
    needs_output INTEGER NOT NULL CHECK(needs_output IN (0, 1)),
    weak_reasons TEXT NOT NULL,
    recall_answer TEXT,
    recall_result TEXT CHECK(recall_result IS NULL OR recall_result IN ('EXACT', 'TYPO', 'INCORRECT')),
    recall_score REAL CHECK(recall_score IS NULL OR (recall_score >= 0 AND recall_score <= 100)),
    response_time INTEGER CHECK(response_time IS NULL OR response_time >= 0),
    output_answer TEXT,
    output_method TEXT CHECK(output_method IS NULL OR output_method IN ('SELF', 'AI')),
    output_score REAL CHECK(output_score IS NULL OR (output_score >= 0 AND output_score <= 100)),
    output_explanation TEXT,
    output_suggestion TEXT,
    output_config_revision TEXT,
    self_rating TEXT CHECK(self_rating IS NULL OR self_rating IN ('AGAIN', 'HARD', 'GOOD', 'EASY')),
    effective_rating TEXT CHECK(effective_rating IS NULL OR effective_rating IN ('AGAIN', 'HARD', 'GOOD', 'EASY')),
    completed_at TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,
  review_attempt_requests: `CREATE TABLE IF NOT EXISTS review_attempt_requests (
    request_id TEXT PRIMARY KEY,
    attempt_id TEXT NOT NULL REFERENCES review_attempts(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    request_body TEXT NOT NULL,
    response TEXT,
    created_at TEXT NOT NULL
  )`,
} as const;

const indexes = [
  `CREATE INDEX IF NOT EXISTS idx_review_attempts_word_id ON review_attempts(word_id)`,
  `CREATE INDEX IF NOT EXISTS idx_review_attempts_study_task_id ON review_attempts(study_task_id)`,
  `CREATE INDEX IF NOT EXISTS idx_review_attempts_status ON review_attempts(status)`,
  `CREATE INDEX IF NOT EXISTS idx_review_attempts_created_at ON review_attempts(created_at)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS uq_review_attempts_active ON review_attempts(status) WHERE status = 'ACTIVE'`,
  `CREATE INDEX IF NOT EXISTS idx_review_attempt_requests_attempt_id ON review_attempt_requests(attempt_id)`,
  `CREATE INDEX IF NOT EXISTS idx_review_attempt_requests_created_at ON review_attempt_requests(created_at)`,
] as const;

export function createReviewAttemptTables(sqlite: Database.Database): void {
  sqlite.exec(tables.review_attempts);
  sqlite.exec(tables.review_attempt_requests);
  for (const indexSql of indexes) {
    sqlite.exec(indexSql);
  }
}
