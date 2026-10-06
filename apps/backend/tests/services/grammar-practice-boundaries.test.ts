/**
 * @file grammar-practice-boundaries.test.ts
 * @description Guards publication parity and stale first-review commits across independent SQLite connections.
 */
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {describe,expect,it} from 'vitest';
import {getDb} from '../../src/db/client.js';
import {GrammarRepository} from '../../src/repositories/grammar.repository.js';
import {GrammarPracticeRepository} from '../../src/repositories/grammar-practice.repository.js';
import {GrammarPracticeService} from '../../src/services/grammar-practice.service.js';
import {createTestCurriculum} from '../grammar/fixtures.js';
import {grammarPracticeHistoryQuerySchema} from '../../src/schemas/grammar-practice.schema.js';

const now='2026-10-06T12:00:00.000Z';
describe('grammar practice commit boundaries',()=>{
 it('uses the same publication gate for output as the public course',()=>{
  const db=getDb(':memory:');const c=createTestCurriculum();const lesson=c.stages[1]!.lessons[0]!;
  const service=new GrammarPracticeService(c,new GrammarPracticeRepository(db.sqlite),new GrammarRepository(db.sqlite));
  const input={requestId:'output',lessonId:lesson.id,revisionId:lesson.revisionId,promptId:lesson.outputPrompts[0]!.id,text:'Original sentence.',rubric:{form:2,meaning:1,use:1}};
  try{
   c.stages[0]!.publicationStatus='draft';
   expect(()=>service.submitOutput(input)).toThrow();
   expect(db.sqlite.prepare('SELECT * FROM grammar_practice_attempts').all()).toEqual([]);
   c.stages[0]!.publicationStatus='published';
   const first=c.stages[0]!.lessons[0]!; (first.review as unknown as {mode?:string}).mode=undefined;
   expect(()=>service.submitOutput(input)).toThrow();
   expect(db.sqlite.prepare('SELECT * FROM grammar_practice_attempts').all()).toEqual([]);
  }finally{db.sqlite.close();}
 });
 it('rejects an already consumed transfer item at commit without skipping the next item or overwriting schedule',()=>{
  const root=mkdtempSync(join(tmpdir(),'grammar-review-cas-')),path=join(root,'test.db');
  const a=getDb(path),b=getDb(path);const c=createTestCurriculum(),lesson=c.stages[0]!.lessons[0]!;
  try{
   a.sqlite.prepare('INSERT INTO grammar_lesson_progress (lesson_id,revision_id,revision,last_position,is_complete,completed_at,created_at,updated_at) VALUES (?,?,?,12,1,?,?,?)').run(lesson.id,lesson.revisionId,lesson.revision,'2026-10-05T12:00:00.000Z','2026-10-05T12:00:00.000Z','2026-10-05T12:00:00.000Z');
   const ar=new GrammarPracticeRepository(a.sqlite),br=new GrammarPracticeRepository(b.sqlite);
   const bs=new GrammarPracticeService(c,br,new GrammarRepository(b.sqlite));
   const e=lesson.reviewExercises[0]!;
   const result=bs.submitReview({requestId:'winner',lessonId:lesson.id,revisionId:lesson.revisionId,exerciseId:e.id,answer:{type:'choice',text:e.options.find(o=>o.correct)!.text}},new Date(now));
   expect(()=>ar.recordReviewAttempt({requestId:'stale',lessonId:lesson.id,revisionId:lesson.revisionId,revision:lesson.revision,exerciseId:e.id,answer:result.attempt.answer!,isCorrect:true,feedback:result.attempt.feedback!,rating:'GOOD',state:result.state,expectedState:null,expectedReviewCount:0,expectedCompletedAt:'2026-10-05T12:00:00.000Z'})).toThrow();
   expect(ar.countPracticeAttempts(lesson.id,lesson.revisionId,'review')).toBe(1);
   expect(ar.findReviewState(lesson.id,lesson.revisionId)).toEqual(result.state);
   expect(ar.findAttemptByRequestId('stale')).toBeNull();
  }finally{a.sqlite.close();b.sqlite.close();rmSync(root,{recursive:true,force:true});}
 });
 it('rejects unsupported cursor and oversized query/submission identities rather than silently stripping them',()=>{
  expect(grammarPracticeHistoryQuerySchema.safeParse({cursor:'old-item'}).success).toBe(false);
  expect(grammarPracticeHistoryQuerySchema.safeParse({lessonId:'x'.repeat(201)}).success).toBe(false);
 });
});
