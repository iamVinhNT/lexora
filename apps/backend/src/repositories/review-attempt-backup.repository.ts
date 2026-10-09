/**
 * @file review-attempt-backup.repository.ts
 * @description Serializes adaptive review attempts and receipts for transactional backup, restore, and reset.
 */
import type Database from 'better-sqlite3';
import {
  reviewAttemptRowSchema,
  reviewAttemptRequestRowSchema,
} from '../schemas/review-attempt.schema.js';
import type { ReviewAttemptBackupData } from '../schemas/review-attempt-backup.schema.js';

function tableExists(sqlite: Database.Database, name: string): boolean {
  const row = sqlite.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?").get(name);
  return Boolean(row);
}

const attemptSelect = `
  id,
  word_id AS wordId,
  study_task_id AS studyTaskId,
  status,
  stage,
  version,
  prompt_type AS promptType,
  prompt_text AS promptText,
  expected_due_at AS expectedDueAt,
  expected_last_reviewed_at AS expectedLastReviewedAt,
  expected_repetitions AS expectedRepetitions,
  expected_interval AS expectedInterval,
  expected_ease_factor AS expectedEaseFactor,
  expected_lapses AS expectedLapses,
  expected_word_updated_at AS expectedWordUpdatedAt,
  needs_output AS needsOutput,
  weak_reasons AS weakReasons,
  recall_answer AS recallAnswer,
  recall_result AS recallResult,
  recall_score AS recallScore,
  response_time AS responseTime,
  output_answer AS outputAnswer,
  output_method AS outputMethod,
  output_score AS outputScore,
  output_explanation AS outputExplanation,
  output_suggestion AS outputSuggestion,
  output_config_revision AS outputConfigRevision,
  self_rating AS selfRating,
  effective_rating AS effectiveRating,
  completed_at AS completedAt,
  created_at AS createdAt,
  updated_at AS updatedAt
`;

const requestSelect = `
  request_id AS requestId,
  attempt_id AS attemptId,
  action,
  request_body AS requestBody,
  response,
  created_at AS createdAt
`;

export function exportReviewAttempts(sqlite: Database.Database): ReviewAttemptBackupData {
  if (!tableExists(sqlite, 'review_attempts')) {
    return { reviewAttempts: [], reviewAttemptRequests: [] };
  }

  const rawAttempts = sqlite.prepare(`SELECT ${attemptSelect} FROM review_attempts ORDER BY created_at, id`).all() as Array<Record<string, unknown>>;
  const rawRequests = tableExists(sqlite, 'review_attempt_requests')
    ? (sqlite.prepare(`SELECT ${requestSelect} FROM review_attempt_requests ORDER BY created_at, request_id`).all() as Array<Record<string, unknown>>)
    : [];

  const reviewAttempts = rawAttempts.map((row) =>
    reviewAttemptRowSchema.parse({
      ...row,
      needsOutput: Boolean(row.needsOutput),
      weakReasons: typeof row.weakReasons === 'string' ? JSON.parse(row.weakReasons) : row.weakReasons,
    })
  );

  const reviewAttemptRequests = rawRequests.map((row) =>
    reviewAttemptRequestRowSchema.parse(row)
  );

  return { reviewAttempts, reviewAttemptRequests };
}

export function countReviewAttempts(sqlite: Database.Database): { reviewAttempts: number; reviewAttemptRequests: number } {
  if (!tableExists(sqlite, 'review_attempts')) {
    return { reviewAttempts: 0, reviewAttemptRequests: 0 };
  }
  const attemptRow = sqlite.prepare('SELECT count(*) AS count FROM review_attempts').get();
  const attempts = attemptRow && typeof attemptRow === 'object' && 'count' in attemptRow ? Number(attemptRow.count) : 0;
  let requests = 0;
  if (tableExists(sqlite, 'review_attempt_requests')) {
    const requestRow = sqlite.prepare('SELECT count(*) AS count FROM review_attempt_requests').get();
    requests = requestRow && typeof requestRow === 'object' && 'count' in requestRow ? Number(requestRow.count) : 0;
  }
  return { reviewAttempts: attempts, reviewAttemptRequests: requests };
}

export function clearReviewAttempts(sqlite: Database.Database): void {
  if (tableExists(sqlite, 'review_attempt_requests')) {
    sqlite.exec('DELETE FROM review_attempt_requests;');
  }
  if (tableExists(sqlite, 'review_attempts')) {
    sqlite.exec('DELETE FROM review_attempts;');
  }
}

export function restoreReviewAttempts(sqlite: Database.Database, data: ReviewAttemptBackupData): void {
  if (!tableExists(sqlite, 'review_attempts')) return;

  const insertAttempt = sqlite.prepare(`
    INSERT INTO review_attempts (
      id, word_id, study_task_id, status, stage, version,
      prompt_type, prompt_text, expected_due_at, expected_last_reviewed_at,
      expected_repetitions, expected_interval, expected_ease_factor, expected_lapses, expected_word_updated_at,
      needs_output, weak_reasons,
      recall_answer, recall_result, recall_score, response_time,
      output_answer, output_method, output_score, output_explanation, output_suggestion, output_config_revision,
      self_rating, effective_rating, completed_at, created_at, updated_at
    ) VALUES (
      @id, @wordId, @studyTaskId, @status, @stage, @version,
      @promptType, @promptText, @expectedDueAt, @expectedLastReviewedAt,
      @expectedRepetitions, @expectedInterval, @expectedEaseFactor, @expectedLapses, @expectedWordUpdatedAt,
      @needsOutput, @weakReasons,
      @recallAnswer, @recallResult, @recallScore, @responseTime,
      @outputAnswer, @outputMethod, @outputScore, @outputExplanation, @outputSuggestion, @outputConfigRevision,
      @selfRating, @effectiveRating, @completedAt, @createdAt, @updatedAt
    )
  `);

  for (const attempt of data.reviewAttempts) {
    insertAttempt.run({
      ...attempt,
      needsOutput: attempt.needsOutput ? 1 : 0,
      weakReasons: JSON.stringify(attempt.weakReasons),
    });
  }

  if (tableExists(sqlite, 'review_attempt_requests') && data.reviewAttemptRequests.length > 0) {
    const insertRequest = sqlite.prepare(`
      INSERT INTO review_attempt_requests (
        request_id, attempt_id, action, request_body, response, created_at
      ) VALUES (
        @requestId, @attemptId, @action, @requestBody, @response, @createdAt
      )
    `);

    for (const request of data.reviewAttemptRequests) {
      insertRequest.run(request);
    }
  }
}
