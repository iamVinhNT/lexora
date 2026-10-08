/**
 * @file grammar.routes.test.ts
 * @description Verifies safe v2 core reads, fixed answer protocols, first-attempt quality and legacy conflicts.
 */
import {afterEach,describe,expect,it,vi} from 'vitest';
import {buildApp} from '../../src/app.js';
import {createTestCurriculum} from '../grammar/fixtures.js';
import type {FastifyInstance} from 'fastify';
const apps:FastifyInstance[]=[];
afterEach(async()=>{for(const app of apps.splice(0))await app.close();vi.useRealTimers();});
async function open(){const c=createTestCurriculum();const app=await buildApp({logger:false,dbPath:':memory:',grammarCurriculum:c});apps.push(app);return {app,c,lesson:c.stages[0]!.lessons[0]!};}
describe('grammar core HTTP contract',()=>{
 it('keeps unpublished content hidden without revealing keys or storing progress',async()=>{
  const {app,c,lesson}=await open();c.stages[0]!.publicationStatus='draft';
  const course=await app.inject({method:'GET',url:'/api/grammar'});expect(course.statusCode).toBe(200);expect(course.json().data.stages).toEqual([]);
  expect((await app.inject({method:'GET',url:'/api/grammar/'+lesson.id})).statusCode).toBe(404);
  const write=await app.inject({method:'POST',url:'/api/grammar/'+lesson.id+'/answers',payload:{requestId:'withdrawn',exerciseId:lesson.exercises[0]!.id,answer:{type:'choice',text:'runs'}}});expect(write.statusCode).toBe(404);
  expect(app.db.sqlite.prepare('SELECT * FROM grammar_lesson_progress').all()).toEqual([]);
 });
 it('requires answer kind, rejects malformed requests, and never exposes canonical exercise/output keys on reads',async()=>{
  const {app,lesson}=await open();const detail=await app.inject({method:'GET',url:'/api/grammar/'+lesson.id});
  expect(detail.statusCode).toBe(200);expect(JSON.stringify(detail.json().data.lesson)).not.toMatch(/"(?:correct|acceptedAnswers|rationale|modelAnswer|reviewExercises)"\s*:/);
  const base={requestId:'invalid',exerciseId:lesson.exercises[0]!.id,answer:{type:'choice',text:'runs'}};
  expect((await app.inject({method:'POST',url:'/api/grammar/'+lesson.id+'/answers',payload:{...base,answer:{type:'text',text:'runs'}}})).statusCode).toBe(400);
  expect((await app.inject({method:'POST',url:'/api/grammar/'+lesson.id+'/answers',payload:{...base,isCorrect:true}})).statusCode).toBe(400);
  expect(app.db.sqlite.prepare('SELECT * FROM grammar_exercise_attempts').all()).toEqual([]);
 });
 it('retains first wrong quality while correction completes the lesson, preserving exact replay and completion time',async()=>{
  vi.useFakeTimers({toFake:['Date']});vi.setSystemTime(new Date('2026-10-05T12:00:00Z'));
  const {app,c,lesson}=await open();const endpoint='/api/grammar/'+lesson.id+'/answers';
  const first=lesson.exercises[0]!;const bad={requestId:'first',exerciseId:first.id,answer:{type:'choice',text:first.options.find(o=>!o.correct)!.text}};
  const wrong=await app.inject({method:'POST',url:endpoint,payload:bad});expect(wrong.statusCode).toBe(200);expect(wrong.json().data.attempt.isCorrect).toBe(false);
  vi.setSystemTime(new Date('2026-10-05T12:00:01Z'));
  for(const e of lesson.exercises){const response=await app.inject({method:'POST',url:endpoint,payload:{requestId:e.id,exerciseId:e.id,answer:{type:e.kind==='choice'?'choice':'text',text:e.acceptedAnswers[0]!.text}}});expect(response.statusCode).toBe(200);}
  const detail=(await app.inject({method:'GET',url:'/api/grammar/'+lesson.id})).json().data;
  expect(detail.progress.isComplete).toBe(true);expect(detail.firstAttemptAccuracy).toEqual({correct:11,total:12,percent:92});expect(detail.nextLessonId).toBe(c.stages[1]!.lessons[0]!.id);
  vi.setSystemTime(new Date('2026-10-10T12:00:00Z'));
  const repeated=await app.inject({method:'POST',url:endpoint,payload:{requestId:'repractice',exerciseId:first.id,answer:{type:'choice',text:first.acceptedAnswers[0]!.text}}});
  expect(repeated.statusCode).toBe(200);expect(repeated.json().data.progress.completedAt).toBe(detail.progress.completedAt);
  const replay=await app.inject({method:'POST',url:endpoint,payload:bad});expect(replay.json().data.attempt).toEqual(wrong.json().data.attempt);
  expect((await app.inject({method:'POST',url:endpoint,payload:{...bad,answer:{type:'choice',text:first.acceptedAnswers[0]!.text}}})).statusCode).toBe(409);
 });
 it('returns curriculum-change conflict for old lesson requests without persistence mutations',async()=>{
  const app=await buildApp({logger:false,grammarCurriculum:createTestCurriculum()});apps.push(app);
  const response=await app.inject({method:'GET',url:'/api/grammar/grammar-0-word-roles'});
  expect(response.statusCode).toBe(409);
  expect(response.json().error).toMatchObject({code:'CONFLICT',details:{reason:'CURRICULUM_CHANGED'}});
  expect(app.db.sqlite.prepare('SELECT * FROM grammar_exercise_attempts').all()).toEqual([]);
 });
});
