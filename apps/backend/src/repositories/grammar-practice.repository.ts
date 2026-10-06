/**
 * @file grammar-practice.repository.ts
 * @description Internal persistence boundary for grammar review states and practice attempts.
 */
import { randomUUID } from 'node:crypto';
import type Database from 'better-sqlite3';
import type { GrammarExerciseResponse } from '../grammar/grade-exercise.js';

export interface GrammarReviewState {
  lessonId: string;
  revisionId: string;
  revision: string;
  easeFactor: number;
  repetitions: number;
  interval: number;
  lapses: number;
  dueAt: string;
  lastReviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GrammarPracticeRubric {
  form: number;
  meaning: number;
  use: number;
}

export interface GrammarPracticeAttempt {
  id: string;
  requestId: string;
  lessonId: string;
  revisionId: string;
  revision: string;
  kind: 'review' | 'output';
  exerciseId: string | null;
  promptId: string | null;
  answer: GrammarExerciseResponse | null;
  text: string | null;
  rubric: GrammarPracticeRubric | null;
  assessmentSource: 'deterministic' | 'self';
  isCorrect: boolean | null;
  feedback: string | null;
  rating: 'AGAIN' | 'GOOD' | null;
  createdAt: string;
  state: GrammarReviewState | null;
}

export interface RecordReviewAttemptInput {
  requestId: string;
  lessonId: string;
  revisionId: string;
  revision: string;
  exerciseId: string;
  answer: GrammarExerciseResponse;
  isCorrect: boolean;
  feedback: string;
  rating: 'AGAIN' | 'GOOD';
  state: GrammarReviewState;
  expectedState: GrammarReviewState | null;
  expectedReviewCount: number;
  expectedCompletedAt: string;
}

export interface RecordOutputAttemptInput {
  requestId: string;
  lessonId: string;
  revisionId: string;
  revision: string;
  promptId: string;
  text: string;
  rubric: GrammarPracticeRubric;
}

export class GrammarPracticeRepositoryConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GrammarPracticeRepositoryConflictError';
  }
}

interface AttemptRow {
  id: string;
  request_id: string;
  lesson_id: string;
  revision_id: string;
  revision: string;
  kind: 'review' | 'output';
  exercise_id: string | null;
  prompt_id: string | null;
  answer: string | null;
  text: string | null;
  rubric: string | null;
  assessment_source: 'deterministic' | 'self';
  is_correct: number | null;
  feedback: string | null;
  rating: 'AGAIN' | 'GOOD' | null;
  state: string | null;
  created_at: string;
}

interface ReviewStateRow {
  id: string;
  lesson_id: string;
  revision_id: string;
  revision: string;
  ease_factor: number;
  repetitions: number;
  interval: number;
  lapses: number;
  due_at: string;
  last_reviewed_at: string | null;
  created_at: string;
  updated_at: string;
}

function mapReviewState(row: ReviewStateRow | undefined): GrammarReviewState | null {
  if (!row) return null;
  return {
    lessonId: row.lesson_id,
    revisionId: row.revision_id,
    revision: row.revision,
    easeFactor: row.ease_factor,
    repetitions: row.repetitions,
    interval: row.interval,
    lapses: row.lapses,
    dueAt: row.due_at,
    lastReviewedAt: row.last_reviewed_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapAttempt(row: AttemptRow): GrammarPracticeAttempt {
  return {
    id: row.id,
    requestId: row.request_id,
    lessonId: row.lesson_id,
    revisionId: row.revision_id,
    revision: row.revision,
    kind: row.kind,
    exerciseId: row.exercise_id,
    promptId: row.prompt_id,
    answer: row.answer ? (JSON.parse(row.answer) as GrammarExerciseResponse) : null,
    text: row.text,
    rubric: row.rubric ? (JSON.parse(row.rubric) as GrammarPracticeRubric) : null,
    assessmentSource: row.assessment_source,
    isCorrect: row.is_correct === null ? null : row.is_correct === 1,
    feedback: row.feedback,
    rating: row.rating,
    createdAt: row.created_at,
    state: row.state ? (JSON.parse(row.state) as GrammarReviewState) : null,
  };
}

export class GrammarPracticeRepository {
  constructor(private readonly sqlite: Database.Database) {}

  findAttemptByRequestId(requestId: string): GrammarPracticeAttempt | null {
    const row = this.sqlite.prepare(`SELECT * FROM grammar_practice_attempts WHERE request_id = ?`).get(requestId) as AttemptRow | undefined;
    return row ? mapAttempt(row) : null;
  }

  findReviewState(lessonId: string, revisionId: string): GrammarReviewState | null {
    const row = this.sqlite.prepare(`SELECT * FROM grammar_review_states WHERE lesson_id = ? AND revision_id = ?`).get(lessonId, revisionId) as ReviewStateRow | undefined;
    return mapReviewState(row);
  }

  recordReviewAttempt(input: RecordReviewAttemptInput): { attempt: GrammarPracticeAttempt; state: GrammarReviewState } {
    const transaction = this.sqlite.transaction(() => {
      const existing = this.findAttemptByRequestId(input.requestId);
      if (existing) {
        const matches = existing.kind === 'review'
          && existing.lessonId === input.lessonId
          && existing.revisionId === input.revisionId
          && existing.exerciseId === input.exerciseId
          && existing.answer?.type === input.answer.type
          && existing.answer?.text === input.answer.text;
        if (!matches) {
          throw new GrammarPracticeRepositoryConflictError('Request ID was already used for a different practice submission.');
        }
        if (!existing.state) throw new GrammarPracticeRepositoryConflictError('Stored review has no schedule snapshot.');
        return { attempt: existing, state: existing.state };
      }
      const liveState = this.findReviewState(input.lessonId, input.revisionId);
      const liveCount = this.countPracticeAttempts(input.lessonId, input.revisionId, 'review');
      const completed = this.sqlite.prepare('SELECT revision_id, revision, is_complete, completed_at FROM grammar_lesson_progress WHERE lesson_id = ?').get(input.lessonId) as { revision_id: string; revision: string; is_complete: number; completed_at: string | null } | undefined;
      if (!completed || completed.is_complete !== 1 || completed.revision_id !== input.revisionId || completed.revision !== input.revision || completed.completed_at !== input.expectedCompletedAt
        || liveCount !== input.expectedReviewCount || JSON.stringify(liveState) !== JSON.stringify(input.expectedState)) {
        throw new GrammarPracticeRepositoryConflictError('The due review changed before commit; refresh the queue.');
      }

      const stateId = `${input.lessonId}@${input.revisionId}`;
      this.sqlite.prepare(`
        INSERT INTO grammar_review_states (
          id, lesson_id, revision_id, revision, ease_factor, repetitions, interval, lapses,
          due_at, last_reviewed_at, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(lesson_id, revision_id) DO UPDATE SET
          ease_factor = excluded.ease_factor,
          repetitions = excluded.repetitions,
          interval = excluded.interval,
          lapses = excluded.lapses,
          due_at = excluded.due_at,
          last_reviewed_at = excluded.last_reviewed_at,
          updated_at = excluded.updated_at
      `).run(
        stateId, input.lessonId, input.revisionId, input.revision, input.state.easeFactor,
        input.state.repetitions, input.state.interval, input.state.lapses, input.state.dueAt,
        input.state.lastReviewedAt, input.state.createdAt, input.state.updatedAt,
      );

      const attemptId = randomUUID();
      const stateSnapshotJson = JSON.stringify(input.state);
      const answerJson = JSON.stringify(input.answer);

      this.sqlite.prepare(`
        INSERT INTO grammar_practice_attempts (
          id, request_id, lesson_id, revision_id, revision, kind, exercise_id, prompt_id,
          answer, text, rubric, assessment_source, is_correct, feedback, rating, state, created_at
        ) VALUES (?, ?, ?, ?, ?, 'review', ?, NULL, ?, NULL, NULL, 'deterministic', ?, ?, ?, ?, ?)
      `).run(
        attemptId, input.requestId, input.lessonId, input.revisionId, input.revision,
        input.exerciseId, answerJson, input.isCorrect ? 1 : 0, input.feedback, input.rating,
        stateSnapshotJson, input.state.updatedAt,
      );

      const created = this.findAttemptByRequestId(input.requestId);
      if (!created) throw new Error('Failed to retrieve created review attempt.');
      return { attempt: created, state: input.state };
    });

    return transaction.immediate();
  }

  recordOutputAttempt(input: RecordOutputAttemptInput, now = new Date().toISOString()): GrammarPracticeAttempt {
    const transaction = this.sqlite.transaction(() => {
      const existing = this.findAttemptByRequestId(input.requestId);
      if (existing) {
        const matches = existing.kind === 'output'
          && existing.lessonId === input.lessonId
          && existing.revisionId === input.revisionId
          && existing.promptId === input.promptId
          && existing.text === input.text
          && existing.rubric?.form === input.rubric.form
          && existing.rubric?.meaning === input.rubric.meaning
          && existing.rubric?.use === input.rubric.use;
        if (!matches) {
          throw new GrammarPracticeRepositoryConflictError('Request ID was already used for a different practice submission.');
        }
        return existing;
      }

      const attemptId = randomUUID();
      const rubricJson = JSON.stringify(input.rubric);

      this.sqlite.prepare(`
        INSERT INTO grammar_practice_attempts (
          id, request_id, lesson_id, revision_id, revision, kind, exercise_id, prompt_id,
          answer, text, rubric, assessment_source, is_correct, feedback, rating, state, created_at
        ) VALUES (?, ?, ?, ?, ?, 'output', NULL, ?, NULL, ?, ?, 'self', NULL, NULL, NULL, NULL, ?)
      `).run(
        attemptId, input.requestId, input.lessonId, input.revisionId, input.revision,
        input.promptId, input.text, rubricJson, now,
      );

      const created = this.findAttemptByRequestId(input.requestId);
      if (!created) throw new Error('Failed to retrieve created output attempt.');
      return created;
    });

    return transaction.immediate();
  }

  findPracticeAttempts(options: {
    lessonId?: string;
    revisionId?: string;
    kind?: 'review' | 'output';
    limit?: number;
    offset?: number;
  }): GrammarPracticeAttempt[] {
    const clauses: string[] = [];
    const params: unknown[] = [];
    if (options.lessonId) {
      clauses.push('lesson_id = ?');
      params.push(options.lessonId);
    }
    if (options.revisionId) {
      clauses.push('revision_id = ?');
      params.push(options.revisionId);
    }
    if (options.kind) {
      clauses.push('kind = ?');
      params.push(options.kind);
    }

    const where = clauses.length > 0 ? `WHERE ${clauses.join(' AND ')}` : '';
    const limit = Math.min(Math.max(options.limit ?? 50, 1), 100);
    const offset = Math.max(options.offset ?? 0, 0);
    params.push(limit, offset);

    const rows = this.sqlite.prepare(`
      SELECT * FROM grammar_practice_attempts
      ${where}
      ORDER BY created_at DESC, id DESC
      LIMIT ? OFFSET ?
    `).all(...params) as AttemptRow[];

    return rows.map(mapAttempt);
  }

  countPracticeAttempts(lessonId: string, revisionId: string, kind?: 'review' | 'output'): number {
    if (kind) {
      const row = this.sqlite.prepare(
        `SELECT COUNT(*) AS total FROM grammar_practice_attempts WHERE lesson_id = ? AND revision_id = ? AND kind = ?`,
      ).get(lessonId, revisionId, kind) as { total: number };
      return row.total;
    }
    const row = this.sqlite.prepare(
      `SELECT COUNT(*) AS total FROM grammar_practice_attempts WHERE lesson_id = ? AND revision_id = ?`,
    ).get(lessonId, revisionId) as { total: number };
    return row.total;
  }

  findFirstTransferAttempts(lessonId: string, revisionId: string): Array<{ exerciseId: string; isCorrect: boolean; createdAt: string; id: string }> {
    const rows = this.sqlite.prepare(`
      SELECT id, exercise_id, is_correct, created_at
      FROM grammar_practice_attempts
      WHERE lesson_id = ? AND revision_id = ? AND kind = 'review' AND exercise_id IS NOT NULL
      ORDER BY created_at ASC, id ASC
    `).all(lessonId, revisionId) as Array<{ id: string; exercise_id: string; is_correct: number; created_at: string }>;

    const seenExercises = new Set<string>();
    const firstAttempts: Array<{ exerciseId: string; isCorrect: boolean; createdAt: string; id: string }> = [];

    for (const row of rows) {
      if (seenExercises.has(row.exercise_id)) continue;
      seenExercises.add(row.exercise_id);
      firstAttempts.push({
        id: row.id,
        exerciseId: row.exercise_id,
        isCorrect: row.is_correct === 1,
        createdAt: row.created_at,
      });
    }

    return firstAttempts;
  }

  findSuccessfulReviewUtcDays(lessonId: string, revisionId: string): string[] {
    const rows = this.sqlite.prepare(`
      SELECT DISTINCT substr(created_at, 1, 10) AS utc_day
      FROM grammar_practice_attempts
      WHERE lesson_id = ? AND revision_id = ? AND kind = 'review' AND is_correct = 1
      ORDER BY utc_day ASC
    `).all(lessonId, revisionId) as Array<{ utc_day: string }>;

    return rows.map((r) => r.utc_day);
  }
}
