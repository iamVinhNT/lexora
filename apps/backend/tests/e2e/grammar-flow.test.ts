/**
 * @file grammar-flow.test.ts
 * @description Exercises real bundled grammar v2, first-attempt accuracy, output, delayed review and backup persistence.
 */
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { buildApp } from '../../src/app.js';
import { getGrammarCurriculum } from '../../src/grammar/content/manifest.js';
import type { GrammarExercise } from '../../src/grammar/content/types.js';
import type { FastifyInstance } from 'fastify';
import { StudyRepository } from '../../src/repositories/study.repository.js';

const roots:string[]=[];
afterEach(()=>{vi.useRealTimers();for(const root of roots.splice(0))rmSync(root,{recursive:true,force:true});});
function answer(exercise:GrammarExercise){return {type:exercise.kind==='choice'?'choice':'text',text:exercise.acceptedAnswers[0]!.text};}
async function request(app:FastifyInstance,method:'GET'|'POST',url:string,payload?:unknown){
 const response=await app.inject({method,url,payload:payload as object});
 expect(response.statusCode,response.payload).toBe(200);
 return response.json().data;
}
describe('bundled grammar expansion',()=>{
 it('keeps wrong-first accuracy, self output, delayed reviews and exact replay across restart and v5 restore',async()=>{
  vi.useFakeTimers({toFake:['Date']});vi.setSystemTime(new Date('2026-10-05T12:00:00Z'));
  const root=mkdtempSync(join(tmpdir(),'lexora-grammar-v2-'));roots.push(root);
  const dbPath=join(root,'grammar.db');
  const lesson=getGrammarCurriculum().stages[0]!.lessons[0]!;
  let app=await buildApp({dbPath,logger:false});
  try{
   const course=await request(app,'GET','/api/grammar');
   expect(course.stages.map((s:{lessons:unknown[]})=>s.lessons.length)).toEqual([8,24,28,30,30,24,16]);
   const detail=await request(app,'GET','/api/grammar/'+lesson.id);
   expect(JSON.stringify(detail.lesson)).not.toMatch(/"(?:correct|acceptedAnswers|rationale|modelAnswer)"\s*:/);
   expect(detail.lesson.exercises.map((e:{kind:string})=>e.kind)).toEqual(['choice','choice','choice','choice','gap','gap','gap','gap','transform','transform','correction','correction']);
   const outputPayload={requestId:'output-first',lessonId:lesson.id,revisionId:lesson.revisionId,promptId:lesson.outputPrompts[0]!.id,text:'A small dog sleeps.',rubric:{form:2,meaning:2,use:1}};
   const output=await request(app,'POST','/api/grammar-practice/outputs',outputPayload);
   expect(output.attempt.assessmentSource).toBe('self');expect(output.attempt.isCorrect).toBeNull();
   expect(output.modelAnswer).toBe(lesson.outputPrompts[0]!.modelAnswer);
   expect((await request(app,'GET','/api/grammar-practice/due')).items).toEqual([]);
   const first=lesson.exercises[0]!;
   const wrong=first.options.find(o=>!o.correct)!;
   await request(app,'POST','/api/grammar/'+lesson.id+'/answers',{requestId:'first-wrong',exerciseId:first.id,answer:{type:'choice',text:wrong.text}});
   vi.setSystemTime(new Date('2026-10-05T12:00:01Z'));
   for(const exercise of lesson.exercises)await request(app,'POST','/api/grammar/'+lesson.id+'/answers',{requestId:exercise.id,exerciseId:exercise.id,answer:answer(exercise)});
   const complete=await request(app,'GET','/api/grammar/'+lesson.id);
   expect(complete.progress.isComplete).toBe(true);
   expect(complete.firstAttemptAccuracy).toMatchObject({correct:11,total:12});
   expect((await request(app,'GET','/api/grammar-practice/due')).items).toEqual([]);
   vi.setSystemTime(new Date('2026-10-06T12:00:00Z'));
   const due=(await request(app,'GET','/api/grammar-practice/due')).items;
   expect(due.map((x:{lessonId:string})=>x.lessonId)).toEqual([lesson.id]);
   const transfer=lesson.reviewExercises.find(e=>e.id===due[0].exercise.id)!;
   const reviewPayload={requestId:'review-first',lessonId:lesson.id,revisionId:lesson.revisionId,exerciseId:transfer.id,answer:answer(transfer)};
   const reviewed=await request(app,'POST','/api/grammar-practice/reviews',reviewPayload);
   expect(reviewed.attempt.rating).toBe('GOOD');expect(reviewed.state.repetitions).toBe(1);expect(reviewed.state.interval).toBe(1);
   expect(await request(app,'POST','/api/grammar-practice/reviews',reviewPayload)).toEqual(reviewed);
   expect((await request(app,'GET','/api/grammar-practice/due')).items).toEqual([]);
   const changed=await app.inject({method:'POST',url:'/api/grammar-practice/reviews',payload:{...reviewPayload,answer:{type:'choice',text:'not the original payload'}}});expect(changed.statusCode).toBe(409);
   const before=await request(app,'GET','/api/backup');expect(before.version).toBe(6);
   expect(before.data.grammarPracticeAttempts.map((a:{kind:string})=>a.kind)).toEqual(['output','review']);
   await app.close();app=await buildApp({dbPath,logger:false});
   expect(await request(app,'POST','/api/grammar-practice/reviews',reviewPayload)).toEqual(reviewed);
   const restartBackup=await request(app,'GET','/api/backup');expect(restartBackup.data).toEqual(before.data);
   await request(app,'POST','/api/data/reset-progress',{confirm:true});
   expect((await request(app,'GET','/api/grammar-practice/history')).items).toEqual([]);
   const preview=await request(app,'POST','/api/restore/preview',{backup:before});
   expect(preview.practiceSummary.includedInBackup).toBe(true);
   await request(app,'POST','/api/restore',{backup:before,previewToken:preview.previewToken,confirm:true});
   expect((await request(app,'GET','/api/backup')).data).toEqual(before.data);
   expect(await request(app,'POST','/api/grammar-practice/reviews',reviewPayload)).toEqual(reviewed);
   expect(await request(app,'POST','/api/grammar-practice/outputs',outputPayload)).toEqual(output);
   vi.setSystemTime(new Date('2026-10-07T12:00:00Z'));
   const next=(await request(app,'GET','/api/grammar-practice/due')).items[0];
   expect(next.exercise.id).toBe(lesson.reviewExercises[1]!.id);
   const failed=await request(app,'POST','/api/grammar-practice/reviews',{requestId:'review-wrong',lessonId:lesson.id,revisionId:lesson.revisionId,exerciseId:next.exercise.id,answer:{type:'text',text:'a wrong answer'}});
   expect(failed.attempt.rating).toBe('AGAIN');expect(failed.state.lapses).toBe(1);expect(failed.state.repetitions).toBe(0);
   expect((await request(app,'GET','/api/grammar/'+lesson.id)).firstAttemptAccuracy).toEqual(complete.firstAttemptAccuracy);
  }finally{await app.close();}
 });
 it('preserves retired revision history and calendar evidence instead of rebinding it to the new course',async()=>{
  const app=await buildApp({logger:false});
  try{
   const id='grammar-0-word-roles',revisionId=id+'@1.0.0',time='2026-09-29T12:00:00.000Z';
   app.db.sqlite.prepare('INSERT INTO grammar_lesson_progress (lesson_id,revision_id,revision,last_position,is_complete,completed_at,created_at,updated_at) VALUES (?,?,?,1,1,?,?,?)').run(id,revisionId,'1.0.0',time,time,time);
   new StudyRepository(app.db).createTask({id:'legacy-task',kind:'GRAMMAR',lessonId:id,revisionId,revision:'1.0.0',scheduledDate:'2026-09-29',targetCount:1,source:'MANUAL'},time);
   app.db.sqlite.prepare('INSERT INTO grammar_exercise_attempts (id,lesson_id,revision_id,revision,exercise_id,request_id,answer,is_correct,feedback,created_at,study_task_id,completed_lesson) VALUES (?,?,?,?,?,?,?,0,?,?,?,1)').run('legacy-attempt',id,revisionId,'1.0.0',id+'-q1','legacy-request',JSON.stringify({type:'choice',text:'young'}),'Original feedback',time,'legacy-task');
   const before=(await request(app,'GET','/api/backup')).data;
   const response=await app.inject({method:'GET',url:'/api/grammar/'+id});
   expect(response.statusCode).toBe(409);expect(response.json().error.details.reason).toBe('CURRICULUM_CHANGED');
   const course=await request(app,'GET','/api/grammar');expect(course.legacyProgress.completedLessons).toBe(1);
   expect(app.db.sqlite.prepare('SELECT lesson_id FROM grammar_lesson_progress WHERE lesson_id != ?').all(id)).toEqual([]);
   const task=await request(app,'GET','/api/study-tasks/legacy-task');
   expect(task).toMatchObject({isUnavailable:true,completedCount:1});
   expect((await request(app,'GET','/api/backup')).data).toEqual(before);
  }finally{await app.close();}
 });
});
