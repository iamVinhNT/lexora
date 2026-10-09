/**
 * @file grammar-practice-backup.test.ts
 * @description Guards v5 grammar practice evidence and legacy backup warnings without touching learner files.
 */
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getDb, type AppDatabase } from '../../src/db/client.js';
import { ImportExportService } from '../../src/services/import-export.service.js';
import { backupSchema } from '../../src/schemas/data.schema.js';

const time='2026-10-05T00:00:00.000Z';
const output={ id:'output-one',requestId:'request-output',lessonId:'grammar-v2-a1-be-forms-01',revisionId:'grammar-v2-a1-be-forms-01@1.0.0',revision:'1.0.0',kind:'output',exerciseId:null,promptId:'output-prompt',answer:null,text:'I am a student. She is a teacher.',rubric:{form:2,meaning:2,use:1},assessmentSource:'self',isCorrect:null,feedback:null,rating:null,state:null,createdAt:time };
let db:AppDatabase;
let service:ImportExportService;
beforeEach(()=>{db=getDb(':memory:');service=new ImportExportService(db);});
afterEach(()=>db.sqlite.close());
function backupWithOutput(){ const backup=service.getBackup(); const {reviewAttempts: _ra, reviewAttemptRequests: _rar, ...v5Base} = backup.data; return {...backup,version:5,data:{...v5Base,grammarPracticeAttempts:[output],grammarReviewStates:[]}}; }
function restore(backup:unknown){const preview=service.previewRestore(backup);service.restoreBackup({backup,confirm:true,previewToken:preview.previewToken});}
describe('grammar practice backup',()=>{
 it('preserves long authored feedback rather than applying learner-input limits to server evidence',()=>{
   const lessonId=output.lessonId,revisionId=output.revisionId;
   db.sqlite.prepare('INSERT INTO grammar_lesson_progress (lesson_id,revision_id,revision,last_position,is_complete,completed_at,created_at,updated_at) VALUES (?,?,?,12,1,?,?,?)').run(lessonId,revisionId,'1.0.0',time,time,time);
   const state={lessonId,revisionId,revision:'1.0.0',easeFactor:1.96,repetitions:0,interval:1,lapses:1,dueAt:'2026-10-06T00:00:00.000Z',lastReviewedAt:time,createdAt:time,updatedAt:time};
   const attempt={...output,id:'review-one',requestId:'review-one',kind:'review',exerciseId:'transfer',promptId:null,text:null,rubric:null,answer:{type:'text',text:'Incorrect'},assessmentSource:'deterministic',isCorrect:false,feedback:'Authored explanation. '.repeat(110),rating:'AGAIN',state};
   const backup=service.getBackup();restore({...backup,data:{...backup.data,grammarReviewStates:[state],grammarPracticeAttempts:[attempt]}});
   expect(service.getBackup().data.grammarPracticeAttempts).toEqual([attempt]);
 });
 it('roundtrips output-only self assessment and clears it only on confirmed reset',()=>{
   restore(backupWithOutput());
   expect(service.getBackup().data.grammarPracticeAttempts).toEqual([output]);
   expect(service.getBackup().data.grammarReviewStates).toEqual([]);
   service.resetData({scope:'progress',confirm:true});
   expect(service.getBackup().data.grammarPracticeAttempts).toEqual([]);
 });
 it('warns before v4 restore discards current practice but keeps the v4 calendar contract',()=>{
   restore(backupWithOutput());
  const now=service.getBackup(); const {grammarPracticeAttempts:_,grammarReviewStates:__,reviewAttempts:___,reviewAttemptRequests:____,...v4data}=now.data;
   const v4={...now,version:4,data:v4data};
   const preview=service.previewRestore(v4);
   expect(preview.practiceSummary.includedInBackup).toBe(false);
   expect(preview.practiceSummary.existingTableCounts.grammarPracticeAttempts).toBe(1);
   expect(preview.practiceSummary.warning).toMatch(/practice|review|output/i);
   expect(preview.calendarSummary.includedInBackup).toBe(true);
   expect(service.getBackup().data.grammarPracticeAttempts).toEqual([output]);
   restore(v4);
   expect(service.getBackup().data.grammarPracticeAttempts).toEqual([]);
 });
 it('rejects duplicate requests, forged verified outputs and mixed review/output evidence before restore',()=>{
   const backup=backupWithOutput();
   expect(backupSchema.safeParse({...backup,data:{...backup.data,grammarPracticeAttempts:[output,{...output,id:'another'}]}}).success).toBe(false);
   expect(backupSchema.safeParse({...backup,data:{...backup.data,grammarPracticeAttempts:[{...output,assessmentSource:'deterministic',isCorrect:true}]}}).success).toBe(false);
   expect(backupSchema.safeParse({...backup,data:{...backup.data,grammarPracticeAttempts:[{...output,rating:'GOOD'}]}}).success).toBe(false);
   expect(service.getBackup().data.grammarPracticeAttempts).toEqual([]);
 });
});
