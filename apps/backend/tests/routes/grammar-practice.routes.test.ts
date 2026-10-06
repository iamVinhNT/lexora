/**
 * @file grammar-practice.routes.test.ts
 * @description Exercises real grammar practice routes with valid content and isolated persistence.
 */
import {afterEach,beforeEach,describe,expect,it,vi} from 'vitest';
import {buildApp} from '../../src/app.js';
import type {FastifyInstance} from 'fastify';
import {createTestCurriculum} from '../grammar/fixtures.js';
const curriculum=createTestCurriculum(),lesson=curriculum.stages[0]!.lessons[0]!;
let app:FastifyInstance;
beforeEach(async()=>{vi.useFakeTimers({toFake:['Date']});vi.setSystemTime(new Date('2026-10-06T12:00:00Z'));app=await buildApp({logger:false,dbPath:':memory:',grammarCurriculum:createTestCurriculum()});});
afterEach(async()=>{await app.close();vi.useRealTimers();});
function complete(){app.db.sqlite.prepare('INSERT INTO grammar_lesson_progress (lesson_id,revision_id,revision,last_position,is_complete,completed_at,created_at,updated_at) VALUES (?,?,?,12,1,?,?,?)').run(lesson.id,lesson.revisionId,lesson.revision,'2026-10-05T12:00:00.000Z','2026-10-05T12:00:00.000Z','2026-10-05T12:00:00.000Z');}
function review(requestId='review'){const e=lesson.reviewExercises[0]!;return {requestId,lessonId:lesson.id,revisionId:lesson.revisionId,exerciseId:e.id,answer:{type:'choice',text:e.options.find(o=>o.correct)!.text}};}
function output(requestId='output'){return {requestId,lessonId:lesson.id,revisionId:lesson.revisionId,promptId:lesson.outputPrompts[0]!.id,text:'A small bird sleeps.',rubric:{form:2,meaning:1,use:1}};}
async function post(kind:string,payload:object){return app.inject({method:'POST',url:'/api/grammar-practice/'+kind,payload});}
describe('grammar practice API',()=>{
 it('keeps due reads answer-safe and read-only, and requires completion before review',async()=>{
  expect((await post('reviews',review())).statusCode).toBe(409);
  complete();const before=app.db.sqlite.prepare('SELECT total_changes() AS n').get();
  const due=await app.inject({method:'GET',url:'/api/grammar-practice/due'});
  expect(due.statusCode).toBe(200);expect(due.json().data.items.map((x:{lessonId:string})=>x.lessonId)).toEqual([lesson.id]);
  expect(due.payload).not.toMatch(/acceptedAnswers|rationale|modelAnswer|"correct"/);
  expect(app.db.sqlite.prepare('SELECT total_changes() AS n').get()).toEqual(before);
 });
 it('does not let a later transfer or incorrect response type consume the selected item',async()=>{
  complete();expect((await post('reviews',{...review(),exerciseId:lesson.reviewExercises[1]!.id,answer:{type:'text',text:'verb'}})).statusCode).toBe(409);
  expect((await post('reviews',{...review(),answer:{type:'text',text:'Tính từ'}})).statusCode).toBe(400);
  expect((await post('reviews',{...review(),exerciseId:'unknown'})).statusCode).toBe(400);
  expect(app.db.sqlite.prepare('SELECT * FROM grammar_practice_attempts').all()).toEqual([]);
 });
 it('keeps original replay snapshot after live schedule advances and rejects changed payloads',async()=>{
  complete();const first=await post('reviews',review());expect(first.statusCode).toBe(200);
  expect(first.json().data.state.interval).toBe(1);
  vi.setSystemTime(new Date('2026-10-07T12:00:00Z'));
  const e=lesson.reviewExercises[1]!;const second=await post('reviews',{...review('next'),exerciseId:e.id,answer:{type:'text',text:e.acceptedAnswers[0]!.text}});expect(second.statusCode).toBe(200);
  expect(second.json().data.state.interval).toBe(6);
  expect((await post('reviews',review())).json().data).toEqual(first.json().data);
  expect((await post('reviews',{...review(),answer:{type:'choice',text:'changed'}})).statusCode).toBe(409);
  expect(app.db.sqlite.prepare('SELECT count(*) AS n FROM grammar_practice_attempts').get()).toEqual({n:2});
 });
 it('stores output before completion as self evidence only and rejects injected grade/task fields',async()=>{
  const first=await post('outputs',output());expect(first.statusCode).toBe(200);
  expect(first.json().data.attempt).toMatchObject({assessmentSource:'self',isCorrect:null,rating:null,state:null});
  expect(first.json().data.modelAnswer).toBe(lesson.outputPrompts[0]!.modelAnswer);
  expect((await post('outputs',output())).json().data).toEqual(first.json().data);
  expect((await post('outputs',{...output(),text:'changed'})).statusCode).toBe(409);
  expect((await post('outputs',{...output('injected'),isCorrect:true,studyTaskId:'task'})).statusCode).toBe(400);
  expect(app.db.sqlite.prepare('SELECT * FROM grammar_review_states').all()).toEqual([]);
 });
 it('uses strict bounded offset pagination and returns no phantom metrics from output alone',async()=>{
  await post('outputs',output('one'));vi.setSystemTime(new Date('2026-10-06T13:00:00Z'));await post('outputs',output('two'));
  const h=await app.inject({method:'GET',url:'/api/grammar-practice/history?limit=1&offset=1'});expect(h.statusCode).toBe(200);expect(h.json().data.items.map((x:{requestId:string})=>x.requestId)).toEqual(['one']);
  expect((await app.inject({method:'GET',url:'/api/grammar-practice/history?cursor=two'})).statusCode).toBe(400);
  const p=(await app.inject({method:'GET',url:'/api/grammar-practice/progress'})).json().data.lessons.find((x:{lessonId:string})=>x.lessonId===lesson.id);
  expect(p).toMatchObject({outputCount:2,reviewCount:0,isStable:false,recognition:{total:0,percent:null},recall:{total:0,percent:null}});
 });
});
