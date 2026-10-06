/**
 * @file grade-exercise.test.ts
 * @description Verifies deterministic grading and feedback against authored grammar exercises.
 */
import { describe, expect, it } from 'vitest';
import { gradeExercise } from '../../src/grammar/grade-exercise.js';
import type { GrammarExercise } from '../../src/grammar/content/types.js';
import { createTestLesson } from './fixtures.js';

describe('gradeExercise', () => {
  const lesson = createTestLesson();

  it('uses the selected choice rationale for both correct and known incorrect choices', () => {
    const item = lesson.exercises[0]!; // choice: runs (correct), dog (false), big (false)
    expect(gradeExercise(item, { type: 'choice', text: 'runs' })).toMatchObject({
      status: 'graded',
      isCorrect: true,
      feedback: 'runs là động từ chỉ hành động.',
    });
    expect(gradeExercise(item, { type: 'choice', text: 'dog' })).toMatchObject({
      status: 'graded',
      isCorrect: false,
      feedback: 'dog là danh từ.',
    });
  });

  it('uses matched accepted-answer rationale and trims, folds case, and whitespace', () => {
    const item: GrammarExercise = {
      id: 'test-text-1',
      kind: 'gap',
      prompt: 'Fill in the blank with pronoun',
      options: [],
      acceptedAnswers: [{ text: 'him', rationale: 'him là dạng tân ngữ ngôi thứ ba số ít nam.' }],
    };
    expect(gradeExercise(item, { type: 'text', text: '  HIM\t' })).toMatchObject({
      status: 'graded',
      isCorrect: true,
      feedback: 'him là dạng tân ngữ ngôi thứ ba số ít nam.',
    });
  });

  it('accepts each authored variant and returns its own rationale', () => {
    const item: GrammarExercise = {
      id: 'test-variants',
      kind: 'transform',
      prompt: 'Express future intention',
      options: [],
      acceptedAnswers: [
        {
          text: "Don't worry, I will share mine with you.",
          rationale: 'Will thường hợp với quyết định tức thời.',
        },
        {
          text: "Don't worry, I am going to share mine with you.",
          rationale: 'Going to cũng dùng được khi người nói hình thành ý định giúp.',
        },
      ],
    };

    expect(gradeExercise(item, { type: 'text', text: "  DON'T   WORRY, I WILL SHARE MINE WITH YOU. " })).toMatchObject({
      status: 'graded',
      isCorrect: true,
      feedback: 'Will thường hợp với quyết định tức thời.',
    });
    expect(gradeExercise(item, { type: 'text', text: "Don't worry, I am going to share mine with you." })).toMatchObject({
      status: 'graded',
      isCorrect: true,
      feedback: 'Going to cũng dùng được khi người nói hình thành ý định giúp.',
    });
  });

  it('accepts straight and curly apostrophes in authored contractions', () => {
    const item: GrammarExercise = {
      id: 'test-apostrophes',
      kind: 'transform',
      prompt: 'Express future intention',
      options: [],
      acceptedAnswers: [
        {
          text: "Don't worry, I'll share mine with you.",
          rationale: 'Dạng rút gọn đúng.',
        },
      ],
    };
    expect(gradeExercise(item, { type: 'text', text: "Don't worry, I'll share mine with you." })).toMatchObject({
      status: 'graded',
      isCorrect: true,
    });
    expect(gradeExercise(item, { type: 'text', text: "Don’t worry, I’ll share mine with you." })).toMatchObject({
      status: 'graded',
      isCorrect: true,
    });
    expect(gradeExercise(item, { type: 'text', text: "Dont worry, I will share mine with you." })).toMatchObject({
      status: 'graded',
      isCorrect: false,
    });
  });

  it('tolerates optional trailing period for typed answers without stripping necessary punctuation', () => {
    const item: GrammarExercise = {
      id: 'test-trailing-dot',
      kind: 'transform',
      prompt: 'Report speech',
      options: [],
      acceptedAnswers: [
        {
          text: 'Minh said he was working that day.',
          rationale: 'Lùi thì đúng sang quá khứ tiếp diễn.',
        },
      ],
    };
    expect(gradeExercise(item, { type: 'text', text: 'Minh said he was working that day' })).toMatchObject({
      status: 'graded',
      isCorrect: true,
      feedback: 'Lùi thì đúng sang quá khứ tiếp diễn.',
    });
    expect(gradeExercise(item, { type: 'text', text: 'Minh said he was working that day.' })).toMatchObject({
      status: 'graded',
      isCorrect: true,
      feedback: 'Lùi thì đúng sang quá khứ tiếp diễn.',
    });
  });

  it('does not reveal correct answers for a known wrong choice', () => {
    const item: GrammarExercise = {
      id: 'test-choice-rationales',
      kind: 'choice',
      prompt: 'Select appropriate modal',
      options: [
        { text: 'must not', correct: true, rationale: 'Must not đặt lệnh cấm rõ.' },
        { text: 'do not have to', correct: false, rationale: 'Chỉ nói không cần, không cấm.' },
        { text: 'should', correct: false, rationale: 'Chỉ là lời khuyên.' },
      ],
      acceptedAnswers: [{ text: 'must not', rationale: 'Must not đặt lệnh cấm rõ.' }],
    };
    const result = gradeExercise(item, { type: 'choice', text: 'do not have to' });
    expect(result).toMatchObject({
      status: 'graded',
      isCorrect: false,
      feedback: 'Chỉ nói không cần, không cấm.',
    });
    expect(result.feedback).not.toContain('must not');
  });

  it('gives unknown typed answers expected variants and authored explanations without diagnosing', () => {
    const item: GrammarExercise = {
      id: 'test-unknown-typed',
      kind: 'transform',
      prompt: 'Transform sentence',
      options: [],
      acceptedAnswers: [
        { text: 'I will share mine with you.', rationale: 'Quyết định tức thời' },
        { text: 'I am going to share mine with you.', rationale: 'Ý định sẵn có' },
      ],
    };
    const result = gradeExercise(item, { type: 'text', text: 'I lend you my umbrella.' });
    expect(result).toMatchObject({ status: 'graded', isCorrect: false });
    expect(result.feedback).toContain('I will share mine with you.');
    expect(result.feedback).toContain('Quyết định tức thời');
    expect(result.feedback).toContain('I am going to share mine with you.');
    expect(result.feedback).not.toContain('Your answer is wrong because');
  });

  it('requires exact text for constrained choices', () => {
    const item = lesson.exercises[0]!;
    expect(gradeExercise(item, { type: 'choice', text: 'RUNS' })).toMatchObject({
      status: 'invalid-answer',
      isCorrect: false,
    });
  });

  it('fails closed for duplicate option text and case/whitespace normalization collisions', () => {
    const item = structuredClone(lesson.exercises[0]!);
    item.options[1]!.text = item.options[0]!.text;
    const duplicate = gradeExercise(item, { type: 'choice', text: item.options[0]!.text });
    expect(duplicate).toMatchObject({ status: 'invalid-exercise', isCorrect: false });

    const collision = structuredClone(lesson.exercises[0]!);
    collision.options[1]!.text = `  ${collision.options[0]!.text.toUpperCase()}  `;
    expect(gradeExercise(collision, { type: 'choice', text: collision.options[0]!.text })).toMatchObject({
      status: 'invalid-exercise',
      isCorrect: false,
    });
  });

  it('fails closed for a blank accepted-answer key and an empty typed response', () => {
    const item = structuredClone(lesson.exercises[4]!); // gap
    item.acceptedAnswers[0]!.text = '   ';
    expect(gradeExercise(item, { type: 'text', text: 'verb' })).toMatchObject({
      status: 'invalid-exercise',
      isCorrect: false,
    });
  });

  it('fails closed for blank accepted-answer rationale', () => {
    const item = structuredClone(lesson.exercises[4]!);
    item.acceptedAnswers[0]!.rationale = '  ';
    expect(gradeExercise(item, { type: 'text', text: 'verb' })).toMatchObject({
      status: 'invalid-exercise',
      isCorrect: false,
    });
  });

  it('fails closed when an option has blank text', () => {
    const item = structuredClone(lesson.exercises[0]!);
    item.options[0]!.text = ' \t ';
    expect(gradeExercise(item, { type: 'choice', text: 'dog' })).toMatchObject({
      status: 'invalid-exercise',
      isCorrect: false,
    });
  });

  it('fails closed when an option has blank rationale', () => {
    const item = structuredClone(lesson.exercises[0]!);
    item.options[0]!.rationale = '';
    expect(gradeExercise(item, { type: 'choice', text: 'runs' })).toMatchObject({
      status: 'invalid-exercise',
      isCorrect: false,
    });
  });

  it('does not mutate the authored exercise while grading', () => {
    const item = structuredClone(lesson.exercises[0]!);
    const before = structuredClone(item);
    gradeExercise(item, { type: 'choice', text: item.options[0]!.text });
    expect(item).toEqual(before);
  });

  it('grades typed gap exercise with zero choices and accepts valid text answer', () => {
    const item: GrammarExercise = {
      id: 'test-gap-1',
      kind: 'gap',
      prompt: 'Điền từ: She ___ a book.',
      options: [],
      acceptedAnswers: [{ text: 'reads', rationale: 'reads là động từ số ít thì hiện tại đơn.' }],
    };
    expect(gradeExercise(item, { type: 'text', text: 'reads' })).toMatchObject({
      status: 'graded',
      isCorrect: true,
      feedback: 'reads là động từ số ít thì hiện tại đơn.',
    });
    expect(gradeExercise(item, { type: 'text', text: 'reads.' })).toMatchObject({
      status: 'graded',
      isCorrect: true,
      feedback: 'reads là động từ số ít thì hiện tại đơn.',
    });
    expect(gradeExercise(item, { type: 'text', text: 'writes' })).toMatchObject({
      status: 'graded',
      isCorrect: false,
    });
  });

  it('rejects wrong response kind for choice and typed exercises', () => {
    const choiceItem = lesson.exercises[0]!;
    expect(gradeExercise(choiceItem, { type: 'text', text: 'runs' })).toMatchObject({
      status: 'invalid-answer',
      isCorrect: false,
    });

    const typedItem = lesson.exercises[4]!;
    expect(gradeExercise(typedItem, { type: 'choice', text: 'verb' })).toMatchObject({
      status: 'invalid-answer',
      isCorrect: false,
    });
  });

  it('fails closed when typed exercise has options or invalid kind', () => {
    const contradictoryItem: GrammarExercise = {
      id: 'test-contradictory',
      kind: 'correction',
      prompt: 'Sửa câu',
      options: [{ text: 'Wrong', correct: false, rationale: 'Không được có option' }],
      acceptedAnswers: [{ text: 'Right', rationale: 'Đúng' }],
    };
    expect(gradeExercise(contradictoryItem, { type: 'text', text: 'Right' })).toMatchObject({
      status: 'invalid-exercise',
      isCorrect: false,
    });

    const invalidKindItem = {
      id: 'test-invalid-kind',
      kind: 'unknown' as unknown as GrammarExercise['kind'],
      prompt: 'Prompt',
      options: [],
      acceptedAnswers: [{ text: 'Answer', rationale: 'Rationale' }],
    };
    expect(gradeExercise(invalidKindItem, { type: 'text', text: 'Answer' })).toMatchObject({
      status: 'invalid-exercise',
      isCorrect: false,
    });
  });
});
