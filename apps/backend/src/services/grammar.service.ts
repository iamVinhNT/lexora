/**
 * @file grammar.service.ts
 * @description Provides published grammar projections and deterministic, isolated lesson submissions.
 */
import { getGrammarLesson, getGrammarCourse, GrammarLessonUnavailableError } from '../grammar/course-read-model.js';
import { gradeExercise } from '../grammar/grade-exercise.js';
import type { GrammarCurriculum } from '../grammar/content/types.js';
import type { GrammarExerciseResponse } from '../grammar/grade-exercise.js';
import { submitGrammarAnswerSchema } from '../schemas/grammar.schema.js';
import type { GrammarRepository } from '../repositories/grammar.repository.js';
import type { GrammarLessonProgress } from '../repositories/grammar.repository.js';

export class GrammarServiceConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GrammarServiceConflictError';
  }
}

export class GrammarServiceInvalidAnswerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GrammarServiceInvalidAnswerError';
  }
}

export class GrammarServiceInvalidContentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GrammarServiceInvalidContentError';
  }
}

export class GrammarService {
  constructor(
    private readonly curriculum: GrammarCurriculum,
    private readonly repository: GrammarRepository,
  ) {}

  getCourse() {
    return getGrammarCourse(this.curriculum);
  }

  getCourseWithProgress() {
    const course = this.getCourse();
    const progress = new Map<string, GrammarLessonProgress | null>();
    for (const stage of course.stages) {
      for (const lesson of stage.lessons) progress.set(lesson.id, this.repository.findProgressByLessonId(lesson.id));
    }
    const nextLessonId = course.stages.flatMap(({ lessons }) => lessons)
      .find((lesson) => !progress.get(lesson.id)?.isComplete)?.id ?? null;
    return {
      ...course,
      stages: course.stages.map((stage) => ({
        ...stage,
        lessons: stage.lessons.map((lesson) => ({ ...lesson, progress: progress.get(lesson.id) ?? null })),
      })),
      nextLessonId,
    };
  }

  getLesson(lessonId: string) {
    return getGrammarLesson(this.curriculum, lessonId);
  }

  getLessonWithProgress(lessonId: string) {
    const lesson = this.getLesson(lessonId);
    const course = this.getCourseWithProgress();
    const progress = this.repository.findProgressByLessonId(lessonId);
    return { lesson, progress, nextLessonId: course.nextLessonId };
  }

  submitAnswer(lessonId: string, rawInput: unknown) {
    const input = submitGrammarAnswerSchema.parse(rawInput);
    const stage = this.curriculum.stages.find(({ lessons }) => lessons.some(({ id }) => id === lessonId));
    const lesson = stage?.lessons.find(({ id }) => id === lessonId);
    if (stage?.publicationStatus === 'published' && lesson?.review.status === 'approved' && lesson.exercises.length === 0) {
      throw new GrammarServiceInvalidContentError('Grammar lesson has no exercises.');
    }
    const visibleLesson = getGrammarLesson(this.curriculum, lessonId);
    const authoredLesson = lesson!;
    const answer: GrammarExerciseResponse = input.answer;
    const existing = this.repository.findSubmissionByRequestId(input.requestId);
    if (existing) {
      if (existing.attempt.lessonId !== lessonId
        || existing.attempt.exerciseId !== input.exerciseId
        || existing.attempt.answer.type !== answer.type
        || existing.attempt.answer.text !== answer.text
        || existing.attempt.studyTaskId !== (input.studyTaskId ?? null)) {
        throw new GrammarServiceConflictError('Request ID was already used for a different grammar submission.');
      }
      return existing;
    }

    if (!visibleLesson.exercises.some(({ id }) => id === input.exerciseId)) {
      throw new GrammarLessonUnavailableError('not-found');
    }
    const exercise = authoredLesson.exercises.find(({ id }) => id === input.exerciseId)!;
    const grade = gradeExercise(exercise, answer);
    if (grade.status === 'invalid-exercise') throw new GrammarServiceInvalidContentError(grade.feedback);
    if (grade.status === 'invalid-answer') throw new GrammarServiceInvalidAnswerError(grade.feedback);

    return this.repository.recordAttempt({
      lessonId,
      revisionId: authoredLesson.revisionId,
      revision: authoredLesson.revision,
      exerciseId: exercise.id,
      requestId: input.requestId,
      answer,
      isCorrect: grade.isCorrect,
      feedback: grade.feedback,
      exerciseIds: authoredLesson.exercises.map(({ id }) => id),
      studyTaskId: input.studyTaskId,
    });
  }
}
