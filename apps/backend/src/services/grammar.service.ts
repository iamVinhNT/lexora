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
import { LEGACY_GRAMMAR_LESSON_IDS } from '../grammar/content/legacy-lesson-ids.js';

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

  getProgressSummary() {
    const course = this.getCourse();
    const lessonIds: string[] = [];
    for (const stage of course.stages) {
      for (const lesson of stage.lessons) lessonIds.push(lesson.id);
    }
    const progress = new Map<string, GrammarLessonProgress>();
    for (const stored of this.repository.findProgressByLessonIds(lessonIds)) progress.set(stored.lessonId, stored);
    let completedLessons = 0;
    let nextLessonId: string | null = null;
    for (const stage of course.stages) {
      for (const lesson of stage.lessons) {
        const stored = progress.get(lesson.id);
        const complete = stored?.isComplete && stored.revisionId === lesson.revisionId && stored.revision === lesson.revision;
        if (complete) completedLessons += 1;
        else if (nextLessonId === null) nextLessonId = lesson.id;
      }
    }
    return { totalLessons: lessonIds.length, completedLessons, nextLessonId };
  }

  getCourseWithProgress() {
    const course = this.getCourse();
    const progress = new Map<string, GrammarLessonProgress | null>();
    for (const stage of course.stages) {
      for (const lesson of stage.lessons) {
        const stored = this.repository.findProgressByLessonId(lesson.id);
        progress.set(lesson.id, stored?.revisionId === lesson.revisionId && stored.revision === lesson.revision ? stored : null);
      }
    }
    const nextLessonId = course.stages.flatMap(({ lessons }) => lessons)
      .find((lesson) => !progress.get(lesson.id)?.isComplete)?.id ?? null;
    const stages = course.stages.map((stage) => ({
      ...stage,
      lessons: stage.lessons.map((lesson) => ({
        ...lesson,
        progress: progress.get(lesson.id) ?? null,
        firstAttemptAccuracy: this.getFirstAttemptAccuracy(lesson.id, lesson.revisionId),
      })),
    }));
    const lessons = stages.flatMap(({ lessons: stageLessons }) => stageLessons);
    const accuracy = lessons.reduce((result, lesson) => ({
      correct: result.correct + lesson.firstAttemptAccuracy.correct,
      total: result.total + lesson.firstAttemptAccuracy.total,
    }), { correct: 0, total: 0 });
    return {
      ...course,
      stages,
      nextLessonId,
      coverage: [...new Set(lessons.flatMap(({ coverage }) => coverage))],
      firstAttemptAccuracy: {
        ...accuracy,
        percent: accuracy.total < 5 ? null : Math.round(accuracy.correct / accuracy.total * 100),
      },
      legacyProgress: {
        completedLessons: this.repository.countCompletedLessons(LEGACY_GRAMMAR_LESSON_IDS),
        totalLessons: 34 as const,
        attemptsPreserved: true as const,
      },
    };
  }

  getLesson(lessonId: string) {
    return getGrammarLesson(this.curriculum, lessonId);
  }

  getLessonWithProgress(lessonId: string) {
    const lesson = this.getLesson(lessonId);
    const course = this.getCourseWithProgress();
    const progress = this.repository.findProgressByLessonId(lessonId);
    return {
      lesson,
      progress: progress?.revisionId === lesson.revisionId && progress.revision === lesson.revision ? progress : null,
      nextLessonId: course.nextLessonId,
      firstAttemptAccuracy: this.getFirstAttemptAccuracy(lesson.id, lesson.revisionId),
    };
  }

  private getFirstAttemptAccuracy(lessonId: string, revisionId: string) {
    const lesson = this.curriculum.stages.flatMap(({ lessons }) => lessons).find(({ id }) => id === lessonId)!;
    return this.repository.getFirstAttemptAccuracy(lessonId, revisionId, lesson.exercises.map(({ id }) => id));
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
      return { ...existing, firstAttemptAccuracy: this.getFirstAttemptAccuracy(lessonId, existing.attempt.revisionId) };
    }

    if (!visibleLesson.exercises.some(({ id }) => id === input.exerciseId)) {
      throw new GrammarLessonUnavailableError('not-found');
    }
    const exercise = authoredLesson.exercises.find(({ id }) => id === input.exerciseId)!;
    const grade = gradeExercise(exercise, answer);
    if (grade.status === 'invalid-exercise') throw new GrammarServiceInvalidContentError(grade.feedback);
    if (grade.status === 'invalid-answer') throw new GrammarServiceInvalidAnswerError(grade.feedback);

    const result = this.repository.recordAttempt({
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
    return { ...result, firstAttemptAccuracy: this.getFirstAttemptAccuracy(lessonId, authoredLesson.revisionId) };
  }
}
