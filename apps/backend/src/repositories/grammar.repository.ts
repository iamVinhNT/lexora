/**
 * @file grammar.repository.ts
 * @description Internal persistence boundary for standalone grammar learner tables.
 *
 * It is not connected to application startup or routes. Do not enable production writes until backup/restore supports these tables.
 */
import { randomUUID } from 'node:crypto';
import type Database from 'better-sqlite3';
import type { GrammarExerciseResponse } from '../grammar/grade-exercise.js';

/** Trusted service output only: this repository persists the supplied grade and does not inspect or grade curriculum content. */
export interface RecordGrammarAttemptInput {
  lessonId: string;
  revisionId: string;
  revision: string;
  exerciseId: string;
  requestId: string;
  answer: GrammarExerciseResponse;
  isCorrect: boolean;
  feedback: string;
  exerciseIds: string[];
}

export interface GrammarAttempt {
  id: string;
  lessonId: string;
  revisionId: string;
  revision: string;
  exerciseId: string;
  requestId: string;
  answer: GrammarExerciseResponse;
  isCorrect: boolean;
  feedback: string;
  createdAt: string;
}

export interface GrammarLessonProgress {
  lessonId: string;
  revisionId: string;
  revision: string;
  lastPosition: number;
  isComplete: boolean;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
export interface GrammarSubmissionResult {
  attempt: GrammarAttempt;
  progress: GrammarLessonProgress;
}

export class GrammarRepositoryConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GrammarRepositoryConflictError';
  }
}

interface GrammarAttemptRow {
  id: string;
  lesson_id: string;
  revision_id: string;
  revision: string;
  exercise_id: string;
  request_id: string;
  answer: string;
  is_correct: number;
  feedback: string;
  created_at: string;
}

interface GrammarProgressRow {
  lesson_id: string;
  revision_id: string;
  revision: string;
  last_position: number;
  is_complete: number;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function encodeAnswer(answer: GrammarExerciseResponse): string {
  return JSON.stringify({ type: answer.type, text: answer.text });
}

function decodeAnswer(value: string): GrammarExerciseResponse {
  const parsed: unknown = JSON.parse(value);
  if (typeof parsed !== 'object' || parsed === null || !('type' in parsed) || !('text' in parsed)
    || (parsed.type !== 'choice' && parsed.type !== 'text') || typeof parsed.text !== 'string') {
    throw new Error('Stored grammar attempt has an unsupported answer format.');
  }
  return { type: parsed.type, text: parsed.text };
}

function mapAttempt(row: GrammarAttemptRow): GrammarAttempt {
  return {
    id: row.id,
    lessonId: row.lesson_id,
    revisionId: row.revision_id,
    revision: row.revision,
    exerciseId: row.exercise_id,
    requestId: row.request_id,
    answer: decodeAnswer(row.answer),
    isCorrect: row.is_correct === 1,
    feedback: row.feedback,
    createdAt: row.created_at,
  };
}

function mapProgress(row: GrammarProgressRow | undefined): GrammarLessonProgress | null {
  if (!row) return null;
  return {
    lessonId: row.lesson_id,
    revisionId: row.revision_id,
    revision: row.revision,
    lastPosition: row.last_position,
    isComplete: row.is_complete === 1,
    completedAt: row.completed_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export class GrammarRepository {
  constructor(private readonly sqlite: Database.Database) {}

  findAttemptByRequestId(requestId: string): GrammarAttempt | null {
    const row = this.sqlite.prepare(`SELECT id, lesson_id, revision_id, revision, exercise_id, request_id,
      answer, is_correct, feedback, created_at FROM grammar_exercise_attempts WHERE request_id = ?`).get(requestId) as GrammarAttemptRow | undefined;
    return row ? mapAttempt(row) : null;
  }
  findSubmissionByRequestId(requestId: string): GrammarSubmissionResult | null {
    return this.sqlite.transaction(() => {
      const attempt = this.findAttemptByRequestId(requestId);
      if (!attempt) return null;
      const progress = this.findProgressByLessonId(attempt.lessonId);
      if (!progress) throw new Error('Stored grammar attempt has no lesson progress.');
      return { attempt, progress };
    })();
  }

  findProgressByLessonId(lessonId: string): GrammarLessonProgress | null {
    const row = this.sqlite.prepare(`SELECT lesson_id, revision_id, revision, last_position, is_complete,
      completed_at, created_at, updated_at FROM grammar_lesson_progress WHERE lesson_id = ?`).get(lessonId) as GrammarProgressRow | undefined;
    return mapProgress(row);
  }
  findSubmittedExerciseIds(lessonId: string, revisionId: string): string[] {
    const rows = this.sqlite.prepare(`SELECT DISTINCT exercise_id FROM grammar_exercise_attempts
      WHERE lesson_id = ? AND revision_id = ? ORDER BY exercise_id`).all(lessonId, revisionId) as Array<{ exercise_id: string }>;
    return rows.map(({ exercise_id }) => exercise_id);
  }

  recordAttempt(input: RecordGrammarAttemptInput): GrammarSubmissionResult {
    this.validateInput(input);
    const transaction = this.sqlite.transaction((submission: RecordGrammarAttemptInput) => {
      const existingAttempt = this.findAttemptByRequestId(submission.requestId);
      if (existingAttempt) {
        if (!this.matchesRetry(existingAttempt, submission)) {
          throw new GrammarRepositoryConflictError('Request ID was already used for a different grammar submission.');
        }
        const progress = this.findProgressByLessonId(existingAttempt.lessonId);
        if (!progress) throw new Error('Stored grammar attempt has no lesson progress.');
        return { attempt: existingAttempt, progress };
      }

      const progress = this.findProgressByLessonId(submission.lessonId);
      if (progress && (progress.revisionId !== submission.revisionId || progress.revision !== submission.revision)) {
        throw new GrammarRepositoryConflictError('Grammar lesson revision changed; existing progress and attempts were preserved.');
      }

      const now = new Date().toISOString();
      if (!progress) {
        this.sqlite.prepare(`INSERT INTO grammar_lesson_progress
          (lesson_id, revision_id, revision, last_position, is_complete, completed_at, created_at, updated_at)
          VALUES (?, ?, ?, 0, 0, NULL, ?, ?)`).run(
          submission.lessonId, submission.revisionId, submission.revision, now, now,
        );
      }

      const attempt: GrammarAttempt = {
        id: randomUUID(),
        lessonId: submission.lessonId,
        revisionId: submission.revisionId,
        revision: submission.revision,
        exerciseId: submission.exerciseId,
        requestId: submission.requestId,
        answer: submission.answer,
        isCorrect: submission.isCorrect,
        feedback: submission.feedback,
        createdAt: now,
      };
      this.sqlite.prepare(`INSERT INTO grammar_exercise_attempts
        (id, lesson_id, revision_id, revision, exercise_id, request_id, answer, is_correct, feedback, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(
        attempt.id, attempt.lessonId, attempt.revisionId, attempt.revision, attempt.exerciseId, attempt.requestId,
        encodeAnswer(attempt.answer), attempt.isCorrect ? 1 : 0, attempt.feedback, attempt.createdAt,
      );

      const submitted = new Set(this.findSubmittedExerciseIds(submission.lessonId, submission.revisionId));
      const next = submission.exerciseIds.findIndex((id) => !submitted.has(id));
      const position = next === -1 ? submission.exerciseIds.length : next;
      const isComplete = next === -1;
      this.sqlite.prepare(`UPDATE grammar_lesson_progress SET last_position = MAX(last_position, ?),
        is_complete = MAX(is_complete, ?),
        completed_at = COALESCE(completed_at, ?),
        updated_at = ? WHERE lesson_id = ?`).run(
        position,
        isComplete ? 1 : 0,
        isComplete ? now : null,
        now,
        submission.lessonId,
      );
      const updatedProgress = this.findProgressByLessonId(submission.lessonId);
      if (!updatedProgress) throw new Error('Grammar repository did not create lesson progress.');
      return { attempt, progress: updatedProgress };
    });

    // BEGIN IMMEDIATE reserves the SQLite writer before reading idempotency state.
    return transaction.immediate(input);
  }

  private matchesRetry(existing: GrammarAttempt, input: RecordGrammarAttemptInput): boolean {
    return existing.lessonId === input.lessonId
      && existing.revisionId === input.revisionId
      && existing.revision === input.revision
      && existing.exerciseId === input.exerciseId
      && existing.answer.type === input.answer.type
      && existing.answer.text === input.answer.text;
  }

  private validateInput(input: RecordGrammarAttemptInput): void {
    if (!input || typeof input !== 'object') throw new TypeError('submission must be an object.');
    for (const [name, value] of Object.entries({
      lessonId: input.lessonId,
      revisionId: input.revisionId,
      revision: input.revision,
      exerciseId: input.exerciseId,
      requestId: input.requestId,
      answerText: input.answer?.text,
      feedback: input.feedback,
    })) {
      if (!isNonEmptyString(value)) throw new TypeError(`${name} must be a non-empty string.`);
    }
    if (input.answer.type !== 'choice' && input.answer.type !== 'text') throw new TypeError('answer.type must be choice or text.');
    if (typeof input.isCorrect !== 'boolean') throw new TypeError('isCorrect must be boolean.');
    if (!Array.isArray(input.exerciseIds) || input.exerciseIds.length === 0
      || input.exerciseIds.some((id) => !isNonEmptyString(id))
      || new Set(input.exerciseIds).size !== input.exerciseIds.length
      || !input.exerciseIds.includes(input.exerciseId)) {
      throw new TypeError('exerciseIds must contain distinct lesson exercises including exerciseId.');
    }
  }
}
