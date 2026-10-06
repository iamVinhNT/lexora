/**
 * @file grammar-practice-tables.test.ts
 * @description Unit tests verifying standalone additive DDL, triggers, and immutability for grammar practice.
 */
import Database from 'better-sqlite3';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createGrammarPracticeTables } from '../../src/db/grammar-practice-tables.js';

describe('grammar practice tables DDL', () => {
  let sqlite: Database.Database;

  beforeEach(() => {
    sqlite = new Database(':memory:');
  });

  afterEach(() => {
    sqlite.close();
  });

  it('preserves output evidence when schema initialization is repeated', () => {
    createGrammarPracticeTables(sqlite);
    sqlite.prepare("INSERT INTO grammar_practice_attempts (id,request_id,lesson_id,revision_id,revision,kind,prompt_id,text,rubric,assessment_source,created_at) VALUES ('kept','request','lesson','revision','1.0.0','output','prompt','Original sentence.','{\"form\":2,\"meaning\":1,\"use\":1}','self','2026-10-05T00:00:00.000Z')").run();
    createGrammarPracticeTables(sqlite);
    expect(sqlite.prepare('SELECT request_id, text, assessment_source FROM grammar_practice_attempts').all()).toEqual([{request_id:'request',text:'Original sentence.',assessment_source:'self'}]);
  });

  it('prevents updates on grammar_practice_attempts via immutable trigger', () => {
    createGrammarPracticeTables(sqlite);

    sqlite.prepare(`
      INSERT INTO grammar_practice_attempts (
        id, request_id, lesson_id, revision_id, revision, kind, exercise_id, prompt_id,
        answer, text, rubric, assessment_source, is_correct, feedback, rating, state, created_at
      ) VALUES (
        'att-1', 'req-1', 'lesson-1', 'lesson-1@1.0.0', '1.0.0', 'review', 'ex-1', NULL,
        '{"type":"choice","text":"A"}', NULL, NULL, 'deterministic', 1, 'Great', 'GOOD', NULL, '2026-10-05T00:00:00.000Z'
      )
    `).run();

    expect(() => {
      sqlite.prepare("UPDATE grammar_practice_attempts SET feedback = 'Changed' WHERE id = 'att-1'").run();
    }).toThrow(/grammar practice attempts are immutable/);
  });

  it('prevents re-inserting same id or request_id via immutable trigger', () => {
    createGrammarPracticeTables(sqlite);

    sqlite.prepare(`
      INSERT INTO grammar_practice_attempts (
        id, request_id, lesson_id, revision_id, revision, kind, exercise_id, prompt_id,
        answer, text, rubric, assessment_source, is_correct, feedback, rating, state, created_at
      ) VALUES (
        'att-1', 'req-1', 'lesson-1', 'lesson-1@1.0.0', '1.0.0', 'review', 'ex-1', NULL,
        '{"type":"choice","text":"A"}', NULL, NULL, 'deterministic', 1, 'Great', 'GOOD', NULL, '2026-10-05T00:00:00.000Z'
      )
    `).run();

    expect(() => {
      sqlite.prepare(`
        INSERT INTO grammar_practice_attempts (
          id, request_id, lesson_id, revision_id, revision, kind, exercise_id, prompt_id,
          answer, text, rubric, assessment_source, is_correct, feedback, rating, state, created_at
        ) VALUES (
          'att-2', 'req-1', 'lesson-1', 'lesson-1@1.0.0', '1.0.0', 'review', 'ex-1', NULL,
          '{"type":"choice","text":"B"}', NULL, NULL, 'deterministic', 0, 'Wrong', 'AGAIN', NULL, '2026-10-05T00:00:00.000Z'
        )
      `).run();
    }).toThrow(/grammar practice attempts are immutable/);
  });

  it('enforces uniqueness on (lesson_id, revision_id) for review states', () => {
    createGrammarPracticeTables(sqlite);

    sqlite.prepare(`
      INSERT INTO grammar_review_states (
        id, lesson_id, revision_id, revision, ease_factor, repetitions, interval, lapses,
        due_at, last_reviewed_at, created_at, updated_at
      ) VALUES (
        'state-1', 'lesson-1', 'lesson-1@1.0.0', '1.0.0', 2.5, 0, 0, 0,
        '2026-10-06T00:00:00.000Z', NULL, '2026-10-05T00:00:00.000Z', '2026-10-05T00:00:00.000Z'
      )
    `).run();

    expect(() => {
      sqlite.prepare(`
        INSERT INTO grammar_review_states (
          id, lesson_id, revision_id, revision, ease_factor, repetitions, interval, lapses,
          due_at, last_reviewed_at, created_at, updated_at
        ) VALUES (
          'state-2', 'lesson-1', 'lesson-1@1.0.0', '1.0.0', 2.6, 1, 1, 0,
          '2026-10-07T00:00:00.000Z', NULL, '2026-10-05T00:00:00.000Z', '2026-10-06T00:00:00.000Z'
        )
      `).run();
    }).toThrow(/UNIQUE constraint failed/);
  });
});
