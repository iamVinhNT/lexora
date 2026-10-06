/**
 * @file grade-exercise.ts
 * @description Grades one grammar choice or typed answer against authored keys and feedback.
 */
import type { GrammarExercise } from './content/types.js';

export type GrammarExerciseResponse =
  | { type: 'choice'; text: string }
  | { type: 'text'; text: string };

export type GrammarExerciseGrade =
  | { status: 'graded'; isCorrect: boolean; feedback: string }
  | { status: 'invalid-exercise'; isCorrect: false; feedback: string }
  | { status: 'invalid-answer'; isCorrect: false; feedback: string };

function normalizeAnswer(text: string): string {
  return text.trim().toLowerCase().replace(/[‘’]/g, "'").replace(/\s+/g, ' ');
}

function stripTrailingPeriod(text: string): string {
  const norm = normalizeAnswer(text);
  return norm.endsWith('.') && !norm.endsWith('..') ? norm.slice(0, -1).trimEnd() : norm;
}
const VALID_KINDS: Record<string, true> = {
  choice: true,
  gap: true,
  transform: true,
  correction: true,
};

export function hasInvalidGrammarExerciseKeys(exercise: GrammarExercise): boolean {
  if (!Array.isArray(exercise.options) || !Array.isArray(exercise.acceptedAnswers)) return true;
  const options = exercise.options;
  const answers = exercise.acceptedAnswers;

  if (!exercise.kind || !VALID_KINDS[exercise.kind]) {
    return true;
  }
  if (answers.length === 0) return true;
  if (answers.some((answer) => !answer.text.trim() || !answer.rationale.trim())) return true;

  const normalizedAnswers = answers.map((answer) => normalizeAnswer(answer.text));
  if (new Set(normalizedAnswers).size !== normalizedAnswers.length) return true;

  if (exercise.kind === 'choice') {
    if (options.length < 3) return true;
    if (options.filter((option) => option.correct).length !== 1) return true;
    if (options.some((option) => !option.text.trim() || !option.rationale.trim())) return true;

    const normalizedOptions = options.map((option) => normalizeAnswer(option.text));
    if (new Set(normalizedOptions).size !== normalizedOptions.length) return true;

    if (normalizedAnswers.some((answer) => !options.some((option) => option.correct && normalizeAnswer(option.text) === answer))) return true;
    if (options.some((option, index) => !option.correct && normalizedAnswers.includes(normalizedOptions[index]!))) {
      return true;
    }
    if (options.some((option) => option.correct && !normalizedAnswers.includes(normalizeAnswer(option.text)))) {
      return true;
    }
  } else {
    // Typed exercises ('gap', 'transform', 'correction') cannot have multiple-choice options
    if (options.length > 0) return true;
  }

  return false;
}

function invalidExercise(): GrammarExerciseGrade {
  return {
    status: 'invalid-exercise',
    isCorrect: false,
    feedback: 'Bài tập có dữ liệu đáp án không hợp lệ hoặc mơ hồ.',
  };
}

export function gradeExercise(
  exercise: GrammarExercise,
  response: GrammarExerciseResponse,
): GrammarExerciseGrade {
  if (hasInvalidGrammarExerciseKeys(exercise)) return invalidExercise();
  if (!response.text.trim()) return { status: 'invalid-answer', isCorrect: false, feedback: 'Câu trả lời không được để trống.' };

  if (exercise.kind === 'choice' && response.type !== 'choice') {
    return {
      status: 'invalid-answer',
      isCorrect: false,
      feedback: 'Bài tập trắc nghiệm yêu cầu câu trả lời dạng choice.',
    };
  }

  if (exercise.kind !== 'choice' && response.type !== 'text') {
    return {
      status: 'invalid-answer',
      isCorrect: false,
      feedback: 'Bài tập điền từ/viết lại/sửa lỗi yêu cầu câu trả lời dạng text.',
    };
  }

  if (response.type === 'choice') {
    const option = exercise.options.find((candidate) => candidate.text === response.text);
    if (!option) {
      return { status: 'invalid-answer', isCorrect: false, feedback: 'Lựa chọn không thuộc bài tập này.' };
    }
    return { status: 'graded', isCorrect: option.correct, feedback: option.rationale };
  }

  const normalizedResponse = normalizeAnswer(response.text);
  let acceptedAnswer = exercise.acceptedAnswers.find(
    (answer) => normalizeAnswer(answer.text) === normalizedResponse,
  );

  if (!acceptedAnswer) {
    const responseNoDot = stripTrailingPeriod(response.text);
    acceptedAnswer = exercise.acceptedAnswers.find(
      (answer) => stripTrailingPeriod(answer.text) === responseNoDot,
    );
  }

  if (acceptedAnswer) return { status: 'graded', isCorrect: true, feedback: acceptedAnswer.rationale };


  const expectedAnswers = exercise.acceptedAnswers
    .map((answer) => `“${answer.text}” — ${answer.rationale}`)
    .join('\n');
  return {
    status: 'graded',
    isCorrect: false,
    feedback: `Đáp án được chấp nhận:\n${expectedAnswers}`,
  };
}
