/**
 * @file validate.test.ts
 * @description Exercises structural publication gates without depending on bundled wording.
 */
import { describe, expect, it } from 'vitest';
import { validateGrammarCurriculum } from '../../src/grammar/content/validate.js';
import { createTestCurriculum } from './fixtures.js';
import type { GrammarLesson } from '../../src/grammar/content/types.js';

function issuesAfter(change: (lesson: GrammarLesson) => void) {
  const curriculum = createTestCurriculum();
  change(curriculum.stages[0]!.lessons[0]!);
  return validateGrammarCurriculum(curriculum);
}

describe('grammar content validation', () => {
  it('accepts complete contract fixtures', () => {
    expect(validateGrammarCurriculum(createTestCurriculum())).toEqual([]);
  });

  it.each(['context', 'guide', 'reviewExercises', 'outputPrompts'] as const)('rejects absent required %s without throwing', (field) => {
    expect(issuesAfter((lesson) => { delete (lesson as unknown as Record<string, unknown>)[field]; }).length).toBeGreaterThan(0);
  });

  it('rejects missing choice/text contract and multiple correct choices', () => {
    expect(issuesAfter((lesson) => { lesson.exercises[0]!.options[1]!.correct = true; }).map(({ code }) => code)).toContain('INCOMPLETE_EXERCISE');
    expect(issuesAfter((lesson) => { delete (lesson.exercises[4] as unknown as Record<string, unknown>).options; }).length).toBeGreaterThan(0);
    expect(issuesAfter((lesson) => { lesson.exercises[0]!.acceptedAnswers.push({ text: 'unlisted', rationale: 'Not an option.' }); }).length).toBeGreaterThan(0);
  });

  it('rejects normalized option/key collisions and copied question prompts', () => {
    expect(issuesAfter((lesson) => { lesson.exercises[0]!.options[1]!.text = '  RUNS\t'; }).length).toBeGreaterThan(0);
    expect(issuesAfter((lesson) => { lesson.exercises[4]!.acceptedAnswers.push({ text: '  VERB ', rationale: 'Duplicate.' }); }).length).toBeGreaterThan(0);
    expect(issuesAfter((lesson) => { lesson.reviewExercises[0]!.prompt = `  ${lesson.exercises[0]!.prompt.toUpperCase()}  `; }).map(({ code }) => code)).toContain('DUPLICATE_EXERCISE');
  });

  it('validates every guide, coverage and source claim string', () => {
    for (const change of [
      (lesson: GrammarLesson) => { lesson.guide.whenToUse[0] = ' '; },
      (lesson: GrammarLesson) => { lesson.guide.signalWords = ['TODO']; },
      (lesson: GrammarLesson) => { lesson.coverage[0] = ''; },
      (lesson: GrammarLesson) => { lesson.sources[0]!.claims = [' ']; },
      (lesson: GrammarLesson) => { lesson.outputPrompts[0]!.checks = ['']; },
    ]) expect(issuesAfter(change).length).toBeGreaterThan(0);
  });

  it('requires real ISO source/review dates and named AI-internal review', () => {
    for (const checkedAt of ['', 'not-a-date', '2026-02-30', 'October 5 2026']) {
      expect(issuesAfter((lesson) => { lesson.sources[0]!.checkedAt = checkedAt; }).length).toBeGreaterThan(0);
    }
    expect(issuesAfter((lesson) => { lesson.review.reviewedAt = '2026-02-30T00:00:00Z'; }).length).toBeGreaterThan(0);
    expect(issuesAfter((lesson) => { lesson.review.reviewer = ' '; }).map(({ code }) => code)).toContain('UNREVIEWED_PUBLICATION');
    expect(issuesAfter((lesson) => { (lesson.review as unknown as Record<string, unknown>).mode = 'human'; }).length).toBeGreaterThan(0);
    expect(issuesAfter((lesson) => { delete (lesson.review as unknown as Record<string, unknown>).mode; }).map(({ code }) => code)).toContain('INCOMPLETE_REVIEW_METADATA');
  });

  it('requires exact controlled/transfer/output mix regardless of lesson ID prefix', () => {
    const curriculum = createTestCurriculum({ id: 'grammar-0-new-contract', reviewExercises: [] });
    expect(validateGrammarCurriculum(curriculum).map(({ path }) => path)).toContain('stages[0].lessons[0].reviewExercises');
    expect(issuesAfter((lesson) => { lesson.exercises[4]!.kind = 'transform'; }).length).toBeGreaterThan(0);
    expect(issuesAfter((lesson) => { lesson.exercises[0]!.id = `${lesson.id}-q99`; }).length).toBeGreaterThan(0);
  });
});
