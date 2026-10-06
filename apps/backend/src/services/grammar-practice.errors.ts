/**
 * @file grammar-practice.errors.ts
 * @description Grammar practice business failures with the shared application error contract.
 */
import { AppError } from './vocabulary.service.js';
export class GrammarPracticeConflictError extends AppError {
 constructor(message:string){super(409,'CONFLICT',message);this.name='GrammarPracticeConflictError';}
}
export class GrammarPracticeInvalidExerciseError extends AppError {
 constructor(message:string){super(400,'BAD_REQUEST',message);this.name='GrammarPracticeInvalidExerciseError';}
}
export class GrammarPracticeInvalidPromptError extends AppError {
 constructor(message:string){super(400,'BAD_REQUEST',message);this.name='GrammarPracticeInvalidPromptError';}
}
export class GrammarPracticeInvalidAnswerError extends AppError {
 constructor(message:string){super(400,'BAD_REQUEST',message);this.name='GrammarPracticeInvalidAnswerError';}
}
export class GrammarPracticeInvalidContentError extends AppError {
 constructor(message:string){super(500,'INTERNAL_ERROR',message);this.name='GrammarPracticeInvalidContentError';}
}
