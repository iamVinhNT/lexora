/**
 * @file grammar-practice.test.ts
 * @description Checks UTC schedule and separate recall/recognition evidence thresholds.
 */
import {describe,expect,it} from 'vitest';
import {calculateInitialDueAt,computeCategoryStats,checkIsStable,evaluateLessonPracticeProgress} from '../../src/grammar/practice-progress.js';
describe('grammar retention evidence',()=>{
 it('schedules the next UTC day across a month boundary',()=>{expect(calculateInitialDueAt('2026-10-31T23:59:59.000Z')).toBe('2026-11-01T00:00:00.000Z');});
 it('hides percentage below five independent first-attempt samples',()=>{expect(computeCategoryStats(3,4)).toEqual({correct:3,total:4,percent:null});expect(computeCategoryStats(4,5)).toEqual({correct:4,total:5,percent:80});});
 it('requires ten items, eighty percent and two successful review dates for stability',()=>{
  expect(checkIsStable(computeCategoryStats(4,5),computeCategoryStats(4,5),1)).toBe(false);
  expect(checkIsStable(computeCategoryStats(4,5),computeCategoryStats(4,5),2)).toBe(true);
  expect(checkIsStable(computeCategoryStats(4,5),computeCategoryStats(3,5),2)).toBe(false);
  expect(checkIsStable(computeCategoryStats(4,4),computeCategoryStats(5,5),2)).toBe(false);
 });
 it('does not turn self-assessed output into verified recognition or recall',()=>{
  const p=evaluateLessonPracticeProgress({lessonId:'lesson',revisionId:'revision',firstAttempts:[{exerciseId:'choice',kind:'choice',isCorrect:true},{exerciseId:'typed',kind:'gap',isCorrect:false}],outputCount:99,reviewCount:0,successfulReviewUtcDaysCount:0,state:null});
  expect(p.recognition).toEqual({correct:1,total:1,percent:null});expect(p.recall).toEqual({correct:0,total:1,percent:null});expect(p.isStable).toBe(false);
 });
});
