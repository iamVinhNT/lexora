/**
 * @file grammar-practice-backup.ts
 * @description Serializes grammar practice evidence for transactional backup, restore and reset.
 */
import type Database from 'better-sqlite3';
import { grammarPracticeAttemptRowSchema, grammarReviewStateRowSchema, type GrammarPracticeBackupData } from '../schemas/grammar-practice-backup.schema.js';

const stateSelect = 'lesson_id AS lessonId, revision_id AS revisionId, revision, ease_factor AS easeFactor, repetitions, interval, lapses, due_at AS dueAt, last_reviewed_at AS lastReviewedAt, created_at AS createdAt, updated_at AS updatedAt';
export function exportGrammarPractice(sqlite:Database.Database):GrammarPracticeBackupData {
  const states=sqlite.prepare('SELECT '+stateSelect+' FROM grammar_review_states ORDER BY lesson_id,revision_id').all();
  const attempts=sqlite.prepare(
    'SELECT id, request_id AS requestId, lesson_id AS lessonId, revision_id AS revisionId, revision, kind, exercise_id AS exerciseId, prompt_id AS promptId, answer, text, rubric, assessment_source AS assessmentSource, is_correct AS isCorrect, feedback, rating, state, created_at AS createdAt FROM grammar_practice_attempts ORDER BY created_at,id'
  ).all() as Array<Record<string,unknown>>;
  return {grammarReviewStates:states.map(row=>grammarReviewStateRowSchema.parse(row)),grammarPracticeAttempts:attempts.map(row=>grammarPracticeAttemptRowSchema.parse({
    ...row,answer:decode(row.answer),rubric:decode(row.rubric),state:decode(row.state),isCorrect:row.isCorrect===null?null:row.isCorrect===1,
  }))};
}
function decode(value:unknown):unknown {return value===null?null:JSON.parse(String(value));}
export function countGrammarPractice(sqlite:Database.Database):{grammarPracticeAttempts:number;grammarReviewStates:number} {
  return {grammarPracticeAttempts:Number((sqlite.prepare('SELECT count(*) AS count FROM grammar_practice_attempts').get() as {count:number}).count),
    grammarReviewStates:Number((sqlite.prepare('SELECT count(*) AS count FROM grammar_review_states').get() as {count:number}).count)};
}
export function clearGrammarPractice(sqlite:Database.Database):void {
  sqlite.exec('DELETE FROM grammar_practice_attempts; DELETE FROM grammar_review_states;');
}
export function restoreGrammarPractice(sqlite:Database.Database,data:GrammarPracticeBackupData):void {
  const state=sqlite.prepare('INSERT INTO grammar_review_states (id,lesson_id,revision_id,revision,ease_factor,repetitions,interval,lapses,due_at,last_reviewed_at,created_at,updated_at) VALUES (@id,@lessonId,@revisionId,@revision,@easeFactor,@repetitions,@interval,@lapses,@dueAt,@lastReviewedAt,@createdAt,@updatedAt)');
  for(const row of data.grammarReviewStates)state.run({...row,id:row.lessonId+'@'+row.revisionId});
  const attempt=sqlite.prepare('INSERT INTO grammar_practice_attempts (id,request_id,lesson_id,revision_id,revision,kind,exercise_id,prompt_id,answer,text,rubric,assessment_source,is_correct,feedback,rating,state,created_at) VALUES (@id,@requestId,@lessonId,@revisionId,@revision,@kind,@exerciseId,@promptId,@answer,@text,@rubric,@assessmentSource,@isCorrect,@feedback,@rating,@state,@createdAt)');
  for(const row of data.grammarPracticeAttempts)attempt.run({...row,answer:encode(row.answer),rubric:encode(row.rubric),state:encode(row.state),isCorrect:row.isCorrect===null?null:Number(row.isCorrect)});
}
function encode(value:unknown):string|null{return value===null?null:JSON.stringify(value);}
