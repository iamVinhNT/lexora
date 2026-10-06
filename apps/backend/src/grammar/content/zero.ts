/**
 * @file zero.ts
 * @description Ordered 0 grammar v2 lessons; content and review live in individual modules.
 */
import type { GrammarLesson } from './types.js';
import lesson1 from './lessons/0/word-roles.js';
import lesson2 from './lessons/0/nouns-and-adjectives.js';
import lesson3 from './lessons/0/subjects-and-actions.js';
import lesson4 from './lessons/0/subject-verb-order.js';
import lesson5 from './lessons/0/be-positive.js';
import lesson6 from './lessons/0/be-negative.js';
import lesson7 from './lessons/0/be-questions.js';
import lesson8 from './lessons/0/plurals-and-punctuation.js';

export const zeroLessons: GrammarLesson[] = [
  lesson1,
  lesson2,
  lesson3,
  lesson4,
  lesson5,
  lesson6,
  lesson7,
  lesson8,
];
