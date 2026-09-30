/**
 * @file grade-exercise.ts
 * @description Grades one grammar choice or typed answer against authored keys and feedback.
 */
import type { GrammarAnswer, GrammarExercise, GrammarOption } from './content/types.js';

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

function hasAmbiguousAnswers(exercise: GrammarExercise): boolean {
  const options = exercise.options ?? [];
  const answers = exercise.acceptedAnswers ?? [];
  const normalizedOptions = options.map((option) => normalizeAnswer(option.text));
  const normalizedAnswers = answers.map((answer) => normalizeAnswer(answer.text));

  return options.filter((option) => option.correct).length === 0
    || answers.length === 0
    || options.some((option) => !option.text.trim() || !option.rationale.trim())
    || answers.some((answer) => !answer.text.trim() || !answer.rationale.trim())
    || new Set(normalizedOptions).size !== normalizedOptions.length
    || new Set(normalizedAnswers).size !== normalizedAnswers.length
    || options.some((option, index) => !option.correct
      && normalizedAnswers.includes(normalizedOptions[index]!))
    || options.some((option) => option.correct
      && !normalizedAnswers.includes(normalizeAnswer(option.text)));
}

function correctOptionFeedback(option: GrammarOption): GrammarExerciseGrade {
  return { status: 'graded', isCorrect: true, feedback: option.rationale };
}

function acceptedAnswerFeedback(answer: GrammarAnswer): GrammarExerciseGrade {
  return { status: 'graded', isCorrect: true, feedback: answer.rationale };
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
  if (hasAmbiguousAnswers(exercise)) return invalidExercise();

  if (response.type === 'choice') {
    const option = exercise.options.find((candidate) => candidate.text === response.text);
    if (!option) {
      return { status: 'invalid-answer', isCorrect: false, feedback: 'Lựa chọn không thuộc bài tập này.' };
    }
    return option.correct
      ? correctOptionFeedback(option)
      : { status: 'graded', isCorrect: false, feedback: option.rationale };
  }

  const normalizedResponse = normalizeAnswer(response.text);
  const acceptedAnswer = exercise.acceptedAnswers.find(
    (answer) => normalizeAnswer(answer.text) === normalizedResponse,
  );
  if (acceptedAnswer) return acceptedAnswerFeedback(acceptedAnswer);

  const knownWrongOption = exercise.options.find(
    (option) => !option.correct && normalizeAnswer(option.text) === normalizedResponse,
  );
  if (knownWrongOption) {
    return { status: 'graded', isCorrect: false, feedback: knownWrongOption.rationale };
  }

  const expectedAnswers = exercise.acceptedAnswers
    .map((answer) => `“${answer.text}” — ${answer.rationale}`)
    .join('\n');
  return {
    status: 'graded',
    isCorrect: false,
    feedback: `Đáp án được chấp nhận:\n${expectedAnswers}`,
  };
}
