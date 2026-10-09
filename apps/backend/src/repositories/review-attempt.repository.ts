/**
 * @file review-attempt.repository.ts
 * @description SQLite repository for adaptive review attempts, step transitions, and request receipts.
 */
import type Database from 'better-sqlite3';
import type { AppDatabase } from '../db/client.js';
import type {
  ReviewAttemptRow,
  ReviewAttemptRequestRow,
} from '../schemas/review-attempt.schema.js';

interface RawReviewAttemptDbRow {
  id: string;
  word_id: string;
  study_task_id: string | null;
  status: ReviewAttemptRow['status'];
  stage: ReviewAttemptRow['stage'];
  version: number;
  prompt_type: ReviewAttemptRow['promptType'];
  prompt_text: string;
  expected_due_at: string;
  expected_last_reviewed_at: string | null;
  expected_repetitions: number;
  expected_interval: number;
  expected_ease_factor: number;
  expected_lapses: number;
  expected_word_updated_at: string | null;
  needs_output: number;
  weak_reasons: string;
  recall_answer: string | null;
  recall_result: ReviewAttemptRow['recallResult'];
  recall_score: number | null;
  response_time: number | null;
  output_answer: string | null;
  output_method: ReviewAttemptRow['outputMethod'];
  output_score: number | null;
  output_explanation: string | null;
  output_suggestion: string | null;
  output_config_revision: string | null;
  self_rating: ReviewAttemptRow['selfRating'];
  effective_rating: ReviewAttemptRow['effectiveRating'];
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

interface RawReviewAttemptRequestDbRow {
  request_id: string;
  attempt_id: string;
  action: string;
  request_body: string;
  response: string | null;
  created_at: string;
}

function rowFromDb(raw: RawReviewAttemptDbRow): ReviewAttemptRow {
  return {
    id: raw.id,
    wordId: raw.word_id,
    studyTaskId: raw.study_task_id ?? null,
    status: raw.status,
    stage: raw.stage,
    version: raw.version,
    promptType: raw.prompt_type,
    promptText: raw.prompt_text,
    expectedDueAt: raw.expected_due_at,
    expectedLastReviewedAt: raw.expected_last_reviewed_at ?? null,
    expectedRepetitions: raw.expected_repetitions,
    expectedInterval: raw.expected_interval,
    expectedEaseFactor: raw.expected_ease_factor,
    expectedLapses: raw.expected_lapses,
    expectedWordUpdatedAt: raw.expected_word_updated_at ?? null,
    needsOutput: Boolean(raw.needs_output),
    weakReasons: typeof raw.weak_reasons === 'string' ? JSON.parse(raw.weak_reasons || '[]') : raw.weak_reasons ?? [],
    recallAnswer: raw.recall_answer ?? null,
    recallResult: raw.recall_result ?? null,
    recallScore: raw.recall_score !== null && raw.recall_score !== undefined ? Number(raw.recall_score) : null,
    responseTime: raw.response_time !== null && raw.response_time !== undefined ? Number(raw.response_time) : null,
    outputAnswer: raw.output_answer ?? null,
    outputMethod: raw.output_method ?? null,
    outputScore: raw.output_score !== null && raw.output_score !== undefined ? Number(raw.output_score) : null,
    outputExplanation: raw.output_explanation ?? null,
    outputSuggestion: raw.output_suggestion ?? null,
    outputConfigRevision: raw.output_config_revision ?? null,
    selfRating: raw.self_rating ?? null,
    effectiveRating: raw.effective_rating ?? null,
    completedAt: raw.completed_at ?? null,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}

function requestRowFromDb(raw: RawReviewAttemptRequestDbRow): ReviewAttemptRequestRow {
  return {
    requestId: raw.request_id,
    attemptId: raw.attempt_id,
    action: raw.action,
    requestBody: raw.request_body,
    response: raw.response ?? null,
    createdAt: raw.created_at,
  };
}

export class ReviewAttemptRepository {
  private readonly sqliteDb: Database.Database;

  constructor(db: Database.Database | AppDatabase) {
    this.sqliteDb = 'sqlite' in db ? db.sqlite : db;
  }

  get sqlite(): Database.Database {
    return this.sqliteDb;
  }

  getActiveAttempt(): ReviewAttemptRow | null {
    const raw = this.sqliteDb
      .prepare(`SELECT * FROM review_attempts WHERE status = 'ACTIVE' LIMIT 1`)
      .get() as RawReviewAttemptDbRow | undefined;
    return raw ? rowFromDb(raw) : null;
  }

  getAttemptById(id: string): ReviewAttemptRow | null {
    const raw = this.sqliteDb
      .prepare(`SELECT * FROM review_attempts WHERE id = ? LIMIT 1`)
      .get(id) as RawReviewAttemptDbRow | undefined;
    return raw ? rowFromDb(raw) : null;
  }

  insertAttempt(attempt: ReviewAttemptRow): void {
    const stmt = this.sqliteDb.prepare(`
      INSERT INTO review_attempts (
        id, word_id, study_task_id, status, stage, version,
        prompt_type, prompt_text, expected_due_at, expected_last_reviewed_at,
        expected_repetitions, expected_interval, expected_ease_factor, expected_lapses,
        expected_word_updated_at, needs_output, weak_reasons,
        recall_answer, recall_result, recall_score, response_time,
        output_answer, output_method, output_score, output_explanation,
        output_suggestion, output_config_revision,
        self_rating, effective_rating, completed_at, created_at, updated_at
      ) VALUES (
        @id, @word_id, @study_task_id, @status, @stage, @version,
        @prompt_type, @prompt_text, @expected_due_at, @expected_last_reviewed_at,
        @expected_repetitions, @expected_interval, @expected_ease_factor, @expected_lapses,
        @expected_word_updated_at, @needs_output, @weak_reasons,
        @recall_answer, @recall_result, @recall_score, @response_time,
        @output_answer, @output_method, @output_score, @output_explanation,
        @output_suggestion, @output_config_revision,
        @self_rating, @effective_rating, @completed_at, @created_at, @updated_at
      )
    `);

    stmt.run({
      id: attempt.id,
      word_id: attempt.wordId,
      study_task_id: attempt.studyTaskId ?? null,
      status: attempt.status,
      stage: attempt.stage,
      version: attempt.version,
      prompt_type: attempt.promptType,
      prompt_text: attempt.promptText,
      expected_due_at: attempt.expectedDueAt,
      expected_last_reviewed_at: attempt.expectedLastReviewedAt ?? null,
      expected_repetitions: attempt.expectedRepetitions,
      expected_interval: attempt.expectedInterval,
      expectedEase_factor: attempt.expectedEaseFactor,
      expected_ease_factor: attempt.expectedEaseFactor,
      expected_lapses: attempt.expectedLapses,
      expected_word_updated_at: attempt.expectedWordUpdatedAt ?? null,
      needs_output: attempt.needsOutput ? 1 : 0,
      weak_reasons: JSON.stringify(attempt.weakReasons),
      recall_answer: attempt.recallAnswer ?? null,
      recall_result: attempt.recallResult ?? null,
      recall_score: attempt.recallScore ?? null,
      response_time: attempt.responseTime ?? null,
      output_answer: attempt.outputAnswer ?? null,
      output_method: attempt.outputMethod ?? null,
      output_score: attempt.outputScore ?? null,
      output_explanation: attempt.outputExplanation ?? null,
      output_suggestion: attempt.outputSuggestion ?? null,
      output_config_revision: attempt.outputConfigRevision ?? null,
      self_rating: attempt.selfRating ?? null,
      effective_rating: attempt.effectiveRating ?? null,
      completed_at: attempt.completedAt ?? null,
      created_at: attempt.createdAt,
      updated_at: attempt.updatedAt,
    });
  }

  updateAttempt(attempt: ReviewAttemptRow, expectedVersion: number): boolean {
    const stmt = this.sqliteDb.prepare(`
      UPDATE review_attempts SET
        word_id = @word_id,
        study_task_id = @study_task_id,
        status = @status,
        stage = @stage,
        version = @new_version,
        prompt_type = @prompt_type,
        prompt_text = @prompt_text,
        expected_due_at = @expected_due_at,
        expected_last_reviewed_at = @expected_last_reviewed_at,
        expected_repetitions = @expected_repetitions,
        expected_interval = @expected_interval,
        expected_ease_factor = @expected_ease_factor,
        expected_lapses = @expected_lapses,
        expected_word_updated_at = @expected_word_updated_at,
        needs_output = @needs_output,
        weak_reasons = @weak_reasons,
        recall_answer = @recall_answer,
        recall_result = @recall_result,
        recall_score = @recall_score,
        response_time = @response_time,
        output_answer = @output_answer,
        output_method = @output_method,
        output_score = @output_score,
        output_explanation = @output_explanation,
        output_suggestion = @output_suggestion,
        output_config_revision = @output_config_revision,
        self_rating = @self_rating,
        effective_rating = @effective_rating,
        completed_at = @completed_at,
        updated_at = @updated_at
      WHERE id = @id AND version = @expected_version
    `);

    const result = stmt.run({
      id: attempt.id,
      expected_version: expectedVersion,
      new_version: attempt.version,
      word_id: attempt.wordId,
      study_task_id: attempt.studyTaskId ?? null,
      status: attempt.status,
      stage: attempt.stage,
      prompt_type: attempt.promptType,
      prompt_text: attempt.promptText,
      expected_due_at: attempt.expectedDueAt,
      expected_last_reviewed_at: attempt.expectedLastReviewedAt ?? null,
      expected_repetitions: attempt.expectedRepetitions,
      expected_interval: attempt.expectedInterval,
      expected_ease_factor: attempt.expectedEaseFactor,
      expected_lapses: attempt.expectedLapses,
      expected_word_updated_at: attempt.expectedWordUpdatedAt ?? null,
      needs_output: attempt.needsOutput ? 1 : 0,
      weak_reasons: JSON.stringify(attempt.weakReasons),
      recall_answer: attempt.recallAnswer ?? null,
      recall_result: attempt.recallResult ?? null,
      recall_score: attempt.recallScore ?? null,
      response_time: attempt.responseTime ?? null,
      output_answer: attempt.outputAnswer ?? null,
      output_method: attempt.outputMethod ?? null,
      output_score: attempt.outputScore ?? null,
      output_explanation: attempt.outputExplanation ?? null,
      output_suggestion: attempt.outputSuggestion ?? null,
      output_config_revision: attempt.outputConfigRevision ?? null,
      self_rating: attempt.selfRating ?? null,
      effective_rating: attempt.effectiveRating ?? null,
      completed_at: attempt.completedAt ?? null,
      updated_at: attempt.updatedAt,
    });

    return Number(result.changes) === 1;
  }

  findRequest(requestId: string): ReviewAttemptRequestRow | null {
    const raw = this.sqliteDb
      .prepare(`SELECT * FROM review_attempt_requests WHERE request_id = ? LIMIT 1`)
      .get(requestId) as RawReviewAttemptRequestDbRow | undefined;
    return raw ? requestRowFromDb(raw) : null;
  }

  deleteRequest(requestId: string): void {
    this.sqliteDb
      .prepare(`DELETE FROM review_attempt_requests WHERE request_id = ?`)
      .run(requestId);
  }

  insertRequest(request: ReviewAttemptRequestRow): void {
    const stmt = this.sqliteDb.prepare(`
      INSERT INTO review_attempt_requests (
        request_id, attempt_id, action, request_body, response, created_at
      ) VALUES (?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      request.requestId,
      request.attemptId,
      request.action,
      request.requestBody,
      request.response ?? null,
      request.createdAt
    );
  }

  updateRequestResponse(requestId: string, response: string): void {
    const stmt = this.sqliteDb.prepare(`
      UPDATE review_attempt_requests SET response = ? WHERE request_id = ?
    `);
    stmt.run(response, requestId);
  }
}
