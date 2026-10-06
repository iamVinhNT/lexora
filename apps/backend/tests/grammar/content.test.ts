/**
 * @file content.test.ts
 * @description Guards consumer-visible publication, identity and grading validation boundaries.
 */
import {describe,expect,it} from 'vitest';
import {validateGrammarCurriculum} from '../../src/grammar/content/validate.js';
import {getGrammarCourse} from '../../src/grammar/course-read-model.js';
import {createTestCurriculum} from './fixtures.js';

describe('grammar publication boundaries',()=>{
 it('does not publish reviewed content with contradictory answer keys',()=>{
  const c=createTestCurriculum();const lesson=c.stages[0]!.lessons[0]!;
  const exercise=lesson.exercises[0]!;
  exercise.acceptedAnswers.push({text:exercise.options.find(o=>!o.correct)!.text,rationale:'Conflicting authored key.'});
  expect(validateGrammarCurriculum(c).some(x=>x.code==='INCOMPLETE_EXERCISE')).toBe(true);
  expect(getGrammarCourse(c).stages).toEqual([]);
 });
 it('rejects duplicate identity across controlled and transfer questions',()=>{
  const c=createTestCurriculum();const lesson=c.stages[0]!.lessons[0]!;
  lesson.reviewExercises[0]!.id=lesson.exercises[0]!.id;
  expect(validateGrammarCurriculum(c).some(x=>x.code==='DUPLICATE_ID')).toBe(true);
  expect(getGrammarCourse(c).stages).toEqual([]);
 });
 it('requires actual AI-internal review metadata before publication',()=>{
  const c=createTestCurriculum();const l=c.stages[0]!.lessons[0]!;
  l.review={status:'pending',mode:'ai-internal',reviewer:null,reviewedAt:null};
  expect(getGrammarCourse(c).stages).toEqual([]);
  l.review={status:'approved',mode:'ai-internal',reviewer:'Test fixture reviewer',reviewedAt:'2026-10-05T00:00:00.000Z'};
  expect(getGrammarCourse(c).stages.some(s=>s.lessons.some(lesson=>lesson.id===l.id))).toBe(true);
 });
});
