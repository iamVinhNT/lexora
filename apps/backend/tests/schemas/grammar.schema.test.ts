/**
 * @file grammar.schema.test.ts
 * @description Validates bounded, strict grammar lesson route and answer submission inputs.
 */
import { describe, expect, it } from 'vitest';
import {
  grammarLessonParamsSchema,
  submitGrammarAnswerSchema,
} from '../../src/schemas/grammar.schema.js';

describe('grammar request schemas', () => {
  it('accepts current lesson slugs and rejects malformed route IDs', () => {
    expect(grammarLessonParamsSchema.parse({ lessonId: 'grammar-0-word-roles' })).toEqual({
      lessonId: 'grammar-0-word-roles',
    });
    expect(grammarLessonParamsSchema.parse({ lessonId: 'grammar-c2-modality-nuance' })).toEqual({
      lessonId: 'grammar-c2-modality-nuance',
    });

    for (const lessonId of ['', '   ', 'grammar-a3-topic', 'grammar-c2-', '../grammar-a1-topic']) {
      expect(grammarLessonParamsSchema.safeParse({ lessonId }).success).toBe(false);
    }
    expect(grammarLessonParamsSchema.safeParse({ lessonId: 'grammar-a1-topic', extra: true }).success).toBe(false);
  });

  it('accepts choice and typed answers without changing authored punctuation or Unicode', () => {
    const choiceText = 'Don’t worry — I’ll share mine with you!';
    const typedText = '¿Qué tal? “I’ll be there at 8:30.”';
    const choice = {
      requestId: 'submission-01',
      exerciseId: 'grammar-a2-future-forms-q1',
      answer: { type: 'choice', text: choiceText },
    };
    const typed = {
      requestId: 'submission-02',
      exerciseId: 'grammar-a1-past-simple-q1',
      answer: { type: 'text', text: typedText },
    };

    expect(submitGrammarAnswerSchema.parse(choice)).toEqual(choice);
    expect(submitGrammarAnswerSchema.parse(typed)).toEqual(typed);
  });

  it('requires a nonblank bounded request ID and bounded nonblank exercise ID', () => {
    const base = {
      requestId: 'submission-01',
      exerciseId: 'grammar-a2-future-forms-q1',
      answer: { type: 'choice', text: 'Don’t worry, I will share mine with you.' },
    };
    for (const requestId of ['', '   ', 'x'.repeat(101)]) {
      expect(submitGrammarAnswerSchema.safeParse({ ...base, requestId }).success).toBe(false);
    }
    for (const exerciseId of ['', ' \t ', 'x'.repeat(121)]) {
      expect(submitGrammarAnswerSchema.safeParse({ ...base, exerciseId }).success).toBe(false);
    }
    expect(submitGrammarAnswerSchema.safeParse({ ...base, extra: 'ignored?' }).success).toBe(false);
  });

  it('rejects blank answer text, unsupported answer types, missing fields, and oversized text', () => {
    const base = {
      requestId: 'submission-01',
      exerciseId: 'grammar-a2-future-forms-q1',
      answer: { type: 'text', text: 'Don’t worry, I will share mine with you.' },
    };
    expect(submitGrammarAnswerSchema.safeParse({ ...base, answer: { type: 'text', text: ' \t\n ' } }).success).toBe(false);
    expect(submitGrammarAnswerSchema.safeParse({ ...base, answer: { type: 'choice', text: '' } }).success).toBe(false);
    expect(submitGrammarAnswerSchema.safeParse({ ...base, answer: { type: 'rating', text: 'good' } }).success).toBe(false);
    expect(submitGrammarAnswerSchema.safeParse({ ...base, answer: { type: 'text' } }).success).toBe(false);
    expect(submitGrammarAnswerSchema.safeParse({ ...base, answer: { type: 'text', text: 'x'.repeat(2001) } }).success).toBe(false);
    expect(submitGrammarAnswerSchema.safeParse({ ...base, answer: { ...base.answer, extra: true } }).success).toBe(false);
  });
});
