/**
 * @file grade-exercise.test.ts
 * @description Verifies deterministic grading and feedback against authored grammar exercises.
 */
import { describe, expect, it } from 'vitest';
import { a1Lessons } from '../../src/grammar/content/a1.js';
import { a2Lessons } from '../../src/grammar/content/a2.js';
import { b1Lessons } from '../../src/grammar/content/b1.js';
import { c2Lessons } from '../../src/grammar/content/c2.js';
import { zeroLessons } from '../../src/grammar/content/zero.js';
import { gradeExercise } from '../../src/grammar/grade-exercise.js';
import type { GrammarExercise } from '../../src/grammar/content/types.js';

const exercise = (lessons: typeof zeroLessons, lessonId: string, index = 0): GrammarExercise =>
  lessons.find((lesson) => lesson.id === lessonId)!.exercises[index]!;

describe('gradeExercise', () => {
  it('uses the selected zero-level choice rationale for both correct and known incorrect choices', () => {
    const item = exercise(zeroLessons, 'grammar-0-word-roles');
    expect(gradeExercise(item, { type: 'choice', text: 'flies' })).toMatchObject({
      status: 'graded', isCorrect: true, feedback: 'flies cho biết con chim làm gì.',
    });
    expect(gradeExercise(item, { type: 'choice', text: 'young' })).toMatchObject({
      status: 'graded', isCorrect: false, feedback: 'young mô tả bird, không nêu hành động.',
    });
  });

  it('uses the matched A1 accepted-answer rationale and only trims, folds case, and whitespace', () => {
    const item = exercise(a1Lessons, 'grammar-a1-pronouns-and-articles');
    expect(gradeExercise(item, { type: 'text', text: '  HIM\t' })).toMatchObject({
      status: 'graded', isCorrect: true, feedback: 'him là dạng tân ngữ ngôi thứ ba số ít nam.',
    });
    expect(gradeExercise(item, { type: 'choice', text: 'he' })).toMatchObject({
      status: 'graded', isCorrect: false, feedback: 'he là đại từ chủ ngữ; chỗ trống là người được nhìn thấy, cần dạng tân ngữ.',
    });
  });

  it('accepts each authored A2 future variant and returns its own rationale', () => {
    const item = exercise(a2Lessons, 'grammar-a2-future-forms');
    expect(gradeExercise(item, { type: 'text', text: '  DON’T   WORRY, I WILL SHARE MINE WITH YOU. ' })).toMatchObject({
      status: 'graded', isCorrect: true, feedback: 'Will thường hợp với quyết định tức thời; dạng rút gọn “I’ll share mine with you” cũng đúng.',
    });
    expect(gradeExercise(item, { type: 'text', text: 'Don’t worry, I am going to share mine with you.' })).toMatchObject({
      status: 'graded', isCorrect: true, feedback: 'Going to cũng dùng được khi người nói hình thành ý định giúp ngay trong cuộc trò chuyện.',
    });
    expect(gradeExercise(item, { type: 'choice', text: 'Don’t worry, I am sharing mine with you.' })).toMatchObject({
      status: 'graded', isCorrect: false, feedback: 'Hiện tại tiếp diễn tương lai thường gợi một sắp xếp đã chốt; ngữ cảnh không nêu cuộc hẹn hay kế hoạch có trước.',
    });
  });
  it('accepts straight and curly apostrophes in authored contractions without dropping punctuation', () => {
    const item = exercise(a2Lessons, 'grammar-a2-future-forms');
    expect(gradeExercise(item, { type: 'text', text: "Don't worry, I'll share mine with you." })).toMatchObject({
      status: 'graded', isCorrect: true,
    });
    expect(gradeExercise(item, { type: 'text', text: "Don't worry, I am sharing mine with you." })).toMatchObject({
      status: 'graded', isCorrect: false,
    });
  });
  it('accepts reported speech with optional that in typed answers', () => {
    const item = exercise(b1Lessons, 'grammar-b1-reported-speech');
    expect(gradeExercise(item, { type: 'text', text: 'Minh said he was working that day.' })).toMatchObject({
      status: 'graded', isCorrect: true,
    });
  });

  it('uses the C2 choice rationale and does not reveal correct answers for a known wrong choice', () => {
    const item = exercise(c2Lessons, 'grammar-c2-modality-nuance');
    expect(gradeExercise(item, { type: 'choice', text: 'Visitors must not enter the archive alone.' })).toMatchObject({
      status: 'graded', isCorrect: true, feedback: 'Trong quy định, must not đặt lệnh cấm rõ với nguồn là chính sách của tòa nhà.',
    });
    const result = gradeExercise(item, { type: 'choice', text: 'Visitors do not have to enter the archive alone.' });
    expect(result).toMatchObject({
      status: 'graded', isCorrect: false, feedback: 'Câu này chỉ nói không cần vào một mình; nó không cấm việc đó.',
    });
    expect(result.feedback).not.toContain('must not enter');
  });

  it('gives unknown typed answers expected variants and authored explanations without diagnosing the answer', () => {
    const item = exercise(a2Lessons, 'grammar-a2-future-forms');
    const result = gradeExercise(item, { type: 'text', text: 'I will lend you my umbrella.' });
    expect(result).toMatchObject({ status: 'graded', isCorrect: false });
    expect(result.feedback).toContain('Don’t worry, I will share mine with you.');
    expect(result.feedback).toContain('Will thường hợp với quyết định tức thời');
    expect(result.feedback).toContain('Don’t worry, I am going to share mine with you.');
    expect(result.feedback).toContain('Going to cũng dùng được');
    expect(result.feedback).not.toContain('Your answer is wrong because');
  });

  it('does not normalize punctuation that can change the authored answer', () => {
    const item = exercise(a2Lessons, 'grammar-a2-future-forms');
    const result = gradeExercise(item, { type: 'text', text: 'Dont worry, I will share mine with you.' });
    expect(result).toMatchObject({ status: 'graded', isCorrect: false });
    expect(result.feedback).toContain('Don’t worry, I will share mine with you.');
    expect(result.feedback).not.toBe('Will thường hợp với quyết định tức thời; dạng rút gọn “I’ll share mine with you” cũng đúng.');
  });

  it('requires exact text for constrained choices', () => {
    const item = exercise(zeroLessons, 'grammar-0-word-roles');
    expect(gradeExercise(item, { type: 'choice', text: 'FLIES' })).toMatchObject({
      status: 'invalid-answer', isCorrect: false,
    });
  });

  it('fails closed for duplicate option text and case/whitespace normalization collisions', () => {
    const item = structuredClone(exercise(zeroLessons, 'grammar-0-word-roles'));
    item.options[1]!.text = item.options[0]!.text;
    const duplicate = gradeExercise(item, { type: 'choice', text: item.options[0]!.text });
    expect(duplicate).toMatchObject({ status: 'invalid-exercise', isCorrect: false });

    const collision = structuredClone(exercise(zeroLessons, 'grammar-0-word-roles'));
    collision.options[1]!.text = `  ${collision.options[0]!.text!.toUpperCase()}  `;
    expect(gradeExercise(collision, { type: 'text', text: collision.options[0]!.text })).toMatchObject({
      status: 'invalid-exercise', isCorrect: false,
    });
  });

  it('fails closed for a blank accepted-answer key and an empty typed response', () => {
    const item = structuredClone(exercise(zeroLessons, 'grammar-0-word-roles'));
    item.options[2]!.text = '   ';
    item.acceptedAnswers[0]!.text = '   ';
    expect(gradeExercise(item, { type: 'text', text: '' })).toMatchObject({
      status: 'invalid-exercise', isCorrect: false,
    });
  });

  it('fails closed for blank accepted-answer rationale', () => {
    const item = structuredClone(exercise(zeroLessons, 'grammar-0-word-roles'));
    item.acceptedAnswers[0]!.rationale = '  ';
    expect(gradeExercise(item, { type: 'text', text: 'flies' })).toMatchObject({
      status: 'invalid-exercise', isCorrect: false,
    });
  });

  it('fails closed when an option has blank text', () => {
    const item = structuredClone(exercise(zeroLessons, 'grammar-0-word-roles'));
    item.options[0]!.text = ' \t ';
    expect(gradeExercise(item, { type: 'choice', text: 'young' })).toMatchObject({
      status: 'invalid-exercise', isCorrect: false,
    });
  });

  it('fails closed when an option has blank rationale', () => {
    const item = structuredClone(exercise(zeroLessons, 'grammar-0-word-roles'));
    item.options[0]!.rationale = '';
    expect(gradeExercise(item, { type: 'choice', text: 'flies' })).toMatchObject({
      status: 'invalid-exercise', isCorrect: false,
    });
  });

  it('does not mutate the authored exercise while grading', () => {
    const item = exercise(c2Lessons, 'grammar-c2-modality-nuance');
    const before = structuredClone(item);
    gradeExercise(item, { type: 'choice', text: item.options[0]!.text });
    expect(item).toEqual(before);
  });
});
