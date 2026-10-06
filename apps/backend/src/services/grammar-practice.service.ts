/**
 * @file grammar-practice.service.ts
 * @description Orchestrates grammar practice reviews, self-assessed outputs, progress metrics, and due items.
 */
import type { GrammarCurriculum, GrammarExerciseKind, GrammarLesson } from '../grammar/content/types.js';
import { gradeExercise } from '../grammar/grade-exercise.js';
import { getGrammarCourse } from '../grammar/course-read-model.js';
import {
  calculateInitialDueAt,
  deriveInitialReviewState,
  evaluateLessonPracticeProgress,
  type FirstAttemptSample,
  type GrammarPracticeLessonProgress,
} from '../grammar/practice-progress.js';
import { calculateSM2 } from '../domain/spaced-repetition/sm2.js';
import type { GrammarPracticeAttempt, GrammarPracticeRepository, GrammarReviewState } from '../repositories/grammar-practice.repository.js';
import type { GrammarAttempt, GrammarLessonProgress } from '../repositories/grammar.repository.js';
import {
  grammarPracticeHistoryQuerySchema,
  submitGrammarOutputSchema,
  submitGrammarReviewSchema,
  type GrammarPracticeHistoryQuery,
} from '../schemas/grammar-practice.schema.js';
import { GrammarPracticeConflictError, GrammarPracticeInvalidExerciseError, GrammarPracticeInvalidPromptError, GrammarPracticeInvalidAnswerError, GrammarPracticeInvalidContentError } from './grammar-practice.errors.js';
export interface DuePracticeItem {
  lessonId: string;
  revisionId: string;
  lessonTitle: string;
  dueAt: string;
  exercise: {
    id: string;
    kind: GrammarExerciseKind;
    prompt: string;
    options: Array<{ text: string }>;
  };
}
export interface CoreGrammarRepository {
  findProgressByLessonId(lessonId: string): GrammarLessonProgress | null;
  findFirstAttempts(lessonId: string, revisionId: string): GrammarAttempt[];
}
export class GrammarPracticeService {
  constructor(
    private readonly curriculum: GrammarCurriculum,
    private readonly repository: GrammarPracticeRepository,
    private readonly coreRepository: CoreGrammarRepository,
  ) {}
  private publishedLessonIds(): Set<string> {
    return new Set(getGrammarCourse(this.curriculum).stages.flatMap(stage => stage.lessons.map(lesson => lesson.id)));
  }
  private getPublishedApprovedLesson(lessonId: string, revisionId?: string): GrammarLesson {
    const stage = this.curriculum.stages.find((s) => s.lessons.some((l) => l.id === lessonId));
    if (!stage || stage.publicationStatus !== 'published') {
      throw new GrammarPracticeConflictError(`Lesson "${lessonId}" is not published.`);
    }
    const lesson = stage.lessons.find((l) => l.id === lessonId);
    if (!lesson || !this.publishedLessonIds().has(lesson.id)) {
      throw new GrammarPracticeConflictError(`Lesson "${lessonId}" is not approved.`);
    }
    if (revisionId !== undefined && lesson.revisionId !== revisionId) {
      throw new GrammarPracticeConflictError(
        `Revision "${revisionId}" does not match current lesson "${lesson.revisionId}".`,
      );
    }
    return lesson;
  }
  getDueItems(now: Date = new Date()): { items: DuePracticeItem[] } {
    const nowIso = now.toISOString();
    const items: DuePracticeItem[] = [];
    const visible = this.publishedLessonIds();
    for (const stage of this.curriculum.stages) {
      if (stage.publicationStatus !== 'published') continue;
      for (const lesson of stage.lessons) {
        if (!visible.has(lesson.id)) continue;
        if (!lesson.reviewExercises || lesson.reviewExercises.length === 0) continue;
        const existingState = this.repository.findReviewState(lesson.id, lesson.revisionId);
        let dueAt: string;
        if (existingState) {
          dueAt = existingState.dueAt;
        } else {
          const progress = this.coreRepository.findProgressByLessonId(lesson.id);
          if (!progress || !progress.isComplete || !progress.completedAt || progress.revisionId !== lesson.revisionId || progress.revision !== lesson.revision) {
            continue;
          }
          dueAt = calculateInitialDueAt(progress.completedAt);
        }
        if (dueAt > nowIso) continue;
        const reviewCount = this.repository.countPracticeAttempts(lesson.id, lesson.revisionId, 'review');
        const exerciseIndex = reviewCount % lesson.reviewExercises.length;
        const exercise = lesson.reviewExercises[exerciseIndex];
        if (!exercise) continue;
        items.push({
          lessonId: lesson.id,
          revisionId: lesson.revisionId,
          lessonTitle: lesson.title,
          dueAt,
          exercise: {
            id: exercise.id,
            kind: exercise.kind,
            prompt: exercise.prompt,
            options: exercise.options.map((o) => ({ text: o.text })),
          },
        });
      }
    }
    items.sort((a, b) => a.dueAt.localeCompare(b.dueAt) || a.lessonId.localeCompare(b.lessonId));
    return { items };
  }
  submitReview(
    rawInput: unknown,
    now: Date = new Date(),
  ): { attempt: GrammarPracticeAttempt; state: GrammarReviewState } {
    const input = submitGrammarReviewSchema.parse(rawInput);
    const existing = this.repository.findAttemptByRequestId(input.requestId);
    if (existing) {
      const matches = existing.kind === 'review'
        && existing.lessonId === input.lessonId
        && existing.revisionId === input.revisionId
        && existing.exerciseId === input.exerciseId
        && existing.answer?.type === input.answer.type
        && existing.answer?.text === input.answer.text;
      if (!matches) {
        throw new GrammarPracticeConflictError('Request ID was already used for a different practice submission.');
      }
      return { attempt: existing, state: existing.state! };
    }
    const lesson = this.getPublishedApprovedLesson(input.lessonId, input.revisionId);
    const progress = this.coreRepository.findProgressByLessonId(lesson.id);
    if (!progress || !progress.isComplete || !progress.completedAt || progress.revisionId !== lesson.revisionId || progress.revision !== lesson.revision) {
      throw new GrammarPracticeConflictError('Lesson is not available for review: controlled lesson not completed.');
    }
    const existingState = this.repository.findReviewState(lesson.id, lesson.revisionId);
    const currentState: GrammarReviewState = existingState
      ?? deriveInitialReviewState(lesson.id, lesson.revisionId, lesson.revision, progress.completedAt);
    const nowIso = now.toISOString();
    if (currentState.dueAt > nowIso) {
      throw new GrammarPracticeConflictError('Lesson is not currently due for review.');
    }
    if (!lesson.reviewExercises || lesson.reviewExercises.length === 0) {
      throw new GrammarPracticeInvalidContentError('Lesson has no review exercises.');
    }
    const exerciseExists = lesson.reviewExercises.some((e) => e.id === input.exerciseId);
    if (!exerciseExists) {
      throw new GrammarPracticeInvalidExerciseError(`Unknown review exercise "${input.exerciseId}".`);
    }
    const reviewCount = this.repository.countPracticeAttempts(lesson.id, lesson.revisionId, 'review');
    const expectedExerciseIndex = reviewCount % lesson.reviewExercises.length;
    const currentDueExercise = lesson.reviewExercises[expectedExerciseIndex]!;
    if (currentDueExercise.id !== input.exerciseId) {
      throw new GrammarPracticeConflictError(
        `Submitted exercise "${input.exerciseId}" does not match currently due item "${currentDueExercise.id}".`,
      );
    }
    const grade = gradeExercise(currentDueExercise, input.answer);
    if (grade.status === 'invalid-exercise') {
      throw new GrammarPracticeInvalidContentError(grade.feedback);
    }
    if (grade.status === 'invalid-answer') {
      throw new GrammarPracticeInvalidAnswerError(grade.feedback);
    }
    const rating: 'GOOD' | 'AGAIN' = grade.isCorrect ? 'GOOD' : 'AGAIN';
    const sm2Result = calculateSM2(
      {
        easeFactor: currentState.easeFactor,
        repetitions: currentState.repetitions,
        interval: currentState.interval,
        lapses: currentState.lapses,
      },
      rating,
      now,
    );
    const updatedState: GrammarReviewState = {
      lessonId: lesson.id,
      revisionId: lesson.revisionId,
      revision: lesson.revision,
      easeFactor: sm2Result.easeFactor,
      repetitions: sm2Result.repetitions,
      interval: sm2Result.interval,
      lapses: sm2Result.lapses,
      dueAt: sm2Result.dueAt.toISOString(),
      lastReviewedAt: sm2Result.lastReviewedAt ? sm2Result.lastReviewedAt.toISOString() : nowIso,
      createdAt: currentState.createdAt,
      updatedAt: nowIso,
    };
    return this.repository.recordReviewAttempt({
      requestId: input.requestId,
      lessonId: lesson.id,
      revisionId: lesson.revisionId,
      revision: lesson.revision,
      exerciseId: currentDueExercise.id,
      answer: input.answer,
      isCorrect: grade.isCorrect,
      feedback: grade.feedback,
      expectedState: existingState,
      expectedReviewCount: reviewCount,
      expectedCompletedAt: progress.completedAt,
      rating,
      state: updatedState,
    });
  }
  submitOutput(
    rawInput: unknown,
    now: Date = new Date(),
  ): { attempt: GrammarPracticeAttempt; modelAnswer: string } {
    const input = submitGrammarOutputSchema.parse(rawInput);
    const existing = this.repository.findAttemptByRequestId(input.requestId);
    if (existing) {
      const matches = existing.kind === 'output'
        && existing.lessonId === input.lessonId
        && existing.revisionId === input.revisionId
        && existing.promptId === input.promptId
        && existing.text === input.text
        && existing.rubric?.form === input.rubric.form
        && existing.rubric?.meaning === input.rubric.meaning
        && existing.rubric?.use === input.rubric.use;
      if (!matches) {
        throw new GrammarPracticeConflictError('Request ID was already used for a different practice submission.');
      }
      const lesson = this.getPublishedApprovedLesson(input.lessonId, input.revisionId);
      const prompt = lesson.outputPrompts?.find((p) => p.id === input.promptId);
      if (!prompt) throw new GrammarPracticeInvalidPromptError('Stored output prompt is no longer available.');
      return { attempt: existing, modelAnswer: prompt.modelAnswer };
    }
    const lesson = this.getPublishedApprovedLesson(input.lessonId, input.revisionId);
    const prompt = lesson.outputPrompts?.find((p) => p.id === input.promptId);
    if (!prompt) {
      throw new GrammarPracticeInvalidPromptError(`Unknown output prompt "${input.promptId}".`);
    }
    const attempt = this.repository.recordOutputAttempt(
      {
        requestId: input.requestId,
        lessonId: lesson.id,
        revisionId: lesson.revisionId,
        revision: lesson.revision,
        promptId: prompt.id,
        text: input.text,
        rubric: input.rubric,
      },
      now.toISOString(),
    );
    return { attempt, modelAnswer: prompt.modelAnswer };
  }
  getProgress(): { lessons: GrammarPracticeLessonProgress[] } {
    const visible = this.publishedLessonIds();
    const lessons: GrammarPracticeLessonProgress[] = [];
    for (const stage of this.curriculum.stages) {
      if (stage.publicationStatus !== 'published') continue;
      for (const lesson of stage.lessons) {
        if (!visible.has(lesson.id)) continue;
        const controlledAttempts = this.coreRepository.findFirstAttempts(lesson.id, lesson.revisionId);
        const firstSamples: FirstAttemptSample[] = [];
        const seenExercises = new Set<string>();
        for (const attempt of controlledAttempts) {
          if (seenExercises.has(attempt.exerciseId)) continue;
          seenExercises.add(attempt.exerciseId);
          const ex = lesson.exercises.find((e) => e.id === attempt.exerciseId);
          if (ex) {
            firstSamples.push({
              exerciseId: attempt.exerciseId,
              kind: ex.kind,
              isCorrect: attempt.isCorrect,
            });
          }
        }
        // Transfer first attempts from practice repository
        const transferAttempts = this.repository.findFirstTransferAttempts(lesson.id, lesson.revisionId);
        for (const transfer of transferAttempts) {
          if (seenExercises.has(transfer.exerciseId)) continue;
          seenExercises.add(transfer.exerciseId);
          const ex = lesson.reviewExercises?.find((e) => e.id === transfer.exerciseId);
          if (ex) {
            firstSamples.push({
              exerciseId: transfer.exerciseId,
              kind: ex.kind,
              isCorrect: transfer.isCorrect,
            });
          }
        }
        const outputCount = this.repository.countPracticeAttempts(lesson.id, lesson.revisionId, 'output');
        const reviewCount = this.repository.countPracticeAttempts(lesson.id, lesson.revisionId, 'review');
        const successfulDays = this.repository.findSuccessfulReviewUtcDays(lesson.id, lesson.revisionId);
        const state = this.repository.findReviewState(lesson.id, lesson.revisionId);
        const progress = evaluateLessonPracticeProgress({
          lessonId: lesson.id,
          revisionId: lesson.revisionId,
          firstAttempts: firstSamples,
          outputCount,
          reviewCount,
          successfulReviewUtcDaysCount: successfulDays.length,
          state,
        });
        lessons.push(progress);
      }
    }
    return { lessons };
  }
  getHistory(rawQuery?: unknown): { items: GrammarPracticeAttempt[] } {
    const query: GrammarPracticeHistoryQuery = grammarPracticeHistoryQuerySchema.parse(rawQuery ?? {});
    const items = this.repository.findPracticeAttempts(query);
    return { items };
  }
}
