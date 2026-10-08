/**
 * @file GrammarLessonPage.tsx
 * @description Offline-capable lesson reading with server-backed exercise feedback and tutor.
 */
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useParams, useSearchParams } from 'react-router-dom';

import type { GrammarAnswerSubmission, GrammarExerciseKind } from '../api/grammar.api';
import { useGrammarLesson, useSubmitGrammarAnswer } from '../hooks/useGrammar';
import { useAiAssistantStore } from '../stores/ai-assistant.store';
import { useStudyTask } from '../hooks/useStudyCalendar';
import { getLocalizedErrorMessage } from '../i18n/presentation';
import { GrammarLessonContent } from '../components/grammar/GrammarLessonContent';
import { GrammarOutputPractice } from '../components/grammar/GrammarOutputPractice';
import { GrammarPracticeProgress } from '../components/grammar/GrammarPracticeProgress';
import { GrammarPracticeHistory } from '../components/grammar/GrammarPracticeHistory';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
function createRequestId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function GrammarLessonPage() {
  const { lessonId = '' } = useParams();
  const [searchParams] = useSearchParams();
  const taskId = searchParams.get('taskId') ?? '';
  return <GrammarLessonView key={`${lessonId}:${taskId}`} lessonId={lessonId} studyTaskId={taskId || undefined} />;
}

function GrammarLessonView({ lessonId, studyTaskId }: { lessonId: string; studyTaskId?: string }) {
  const { t } = useTranslation('grammar');
  const { t: tCommon } = useTranslation('common');
  const { t: tCalendar } = useTranslation('calendar');
  const lessonQuery = useGrammarLesson(lessonId);
  const taskQuery = useStudyTask(studyTaskId ?? '');
  const submitMutation = useSubmitGrammarAnswer(lessonId);
  const pendingSubmission = useRef<GrammarAnswerSubmission | null>(null);
  const registerAiContext = useAiAssistantStore((state) => state.registerContext);
  const [viewingAttempt, setViewingAttempt] = useState<GrammarAnswerSubmission | null>(null);
  const [viewingFeedback, setViewingFeedback] = useState<{ isCorrect: boolean; feedback: string } | null>(null);
  const [practiceIndex, setPracticeIndex] = useState<number | null>(null);
  const [focusExerciseAfterContinue, setFocusExerciseAfterContinue] = useState(false);
  const lessonData = lessonQuery.data;
  const lesson = lessonData?.lesson;
  const exercises = lesson?.exercises ?? [];

  useEffect(() => {
    if (!lesson?.id || !lesson?.revisionId) return;
    return registerAiContext({
      kind: 'grammar',
      lessonId: lesson.id,
      revisionId: lesson.revisionId,
    }, lesson.title);
  }, [lesson?.id, lesson?.revisionId, lesson?.title, registerAiContext]);
  const taskLoading = Boolean(studyTaskId && taskQuery.isPending);
  const taskMismatch = Boolean(studyTaskId && lesson && taskQuery.data && (
    taskQuery.data.kind !== 'GRAMMAR'
    || taskQuery.data.lessonId !== lesson.id
    || taskQuery.data.revisionId !== lesson.revisionId
    || taskQuery.data.revision !== lesson.revision
  ));
  const taskUnavailable = Boolean(studyTaskId && (taskQuery.isError || taskQuery.data?.isUnavailable || taskQuery.data?.isComplete));
  const taskIssue = taskMismatch
    ? tCalendar('forms.selectedContentUnavailable')
    : taskUnavailable
      ? tCalendar('errors.UNAVAILABLE')
      : null;
  const linkedTaskId = studyTaskId && !taskLoading && !taskIssue && !taskQuery.data?.isComplete ? studyTaskId : undefined;
  const savedIndex = Math.min(lessonData?.progress?.lastPosition ?? 0, exercises.length);
  const serverProgress = submitMutation.data?.progress ?? lessonData?.progress;
  const serverAttempt = submitMutation.data?.attempt;
  const submittedIndex = viewingAttempt
    ? exercises.findIndex(({ id }) => id === viewingAttempt.exerciseId)
    : submitMutation.isSuccess && serverAttempt
      ? exercises.findIndex(({ id }) => id === serverAttempt.exerciseId)
      : -1;
  const exerciseIndex = submittedIndex >= 0 ? submittedIndex : practiceIndex ?? savedIndex;
  const exercise = exercises[exerciseIndex];
  const isComplete = practiceIndex === null && !viewingAttempt && Boolean(serverProgress?.isComplete);
  const showCompletion = isComplete || Boolean(submitMutation.isSuccess && viewingAttempt && serverProgress?.isComplete);
  const currentResult = viewingAttempt?.exerciseId === exercise?.id
    ? viewingFeedback
    : submitMutation.isSuccess && serverAttempt?.exerciseId === exercise?.id
      ? serverAttempt
      : null;

  async function submitAnswer(answer: string, type: 'choice' | 'text') {
    if (!lesson || !exercise || submitMutation.isPending || taskLoading || taskIssue || !answer.trim()) return;
    const canonicalAnswer = answer.trim();
    const existing = pendingSubmission.current;
    const submission: GrammarAnswerSubmission = existing?.exerciseId === exercise.id
      && existing.answer.text === canonicalAnswer
      && existing.studyTaskId === linkedTaskId
      ? existing
      : { requestId: createRequestId(), exerciseId: exercise.id, answer: { type, text: canonicalAnswer }, studyTaskId: linkedTaskId };
    pendingSubmission.current = submission;
    try {
      const result = await submitMutation.mutateAsync(submission);
      pendingSubmission.current = null;
      setViewingAttempt(submission);
      setViewingFeedback(result.attempt);
    } catch {
      // Retain exact payload and request ID for idempotent user-initiated retry.
    }
  }

  function continueAfterFeedback() {
    if (viewingAttempt && practiceIndex !== null && exerciseIndex + 1 < exercises.length) {
      setPracticeIndex(exerciseIndex + 1);
    } else {
      setPracticeIndex(null);
    }
    setFocusExerciseAfterContinue(true);
    setViewingAttempt(null);
    setViewingFeedback(null);
    submitMutation.reset();
  }

  function answerChanged() {
    pendingSubmission.current = null;
    submitMutation.reset();
  }


  return (
    <div className="mx-auto max-w-4xl space-y-5 sm:space-y-6">
      <Link to="/grammar" className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-muted hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><ArrowLeft aria-hidden="true" size={17} />{t('backToCourse')}</Link>
      {lessonQuery.isLoading && <p role="status" aria-busy="true" className="rounded-xl border border-border bg-surface p-5 text-sm text-muted">{t('loadingLesson')}</p>}
      {lessonQuery.isError && <div role="alert" className="space-y-4 rounded-xl border border-border bg-secondary p-5"><p className="text-sm text-foreground">{getLocalizedErrorMessage(lessonQuery.error, tCommon)}</p><Button type="button" variant="secondary" onClick={() => void lessonQuery.refetch()}>{t('retry')}</Button></div>}
      {lesson && <>
        <header className="space-y-3">
          <h1 tabIndex={-1} className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground focus:outline-none">{lesson.title}</h1>
          <div className="rounded-xl border border-primary/30 bg-primary-subtle p-3.5 sm:p-5"><h2 className="text-sm font-semibold text-foreground">{t('objective')}</h2><p className="mt-1 text-sm leading-6 text-foreground">{lesson.objective}</p></div>
          {studyTaskId && (taskLoading || taskIssue) && <p role={taskIssue ? 'alert' : 'status'} className="rounded-xl border border-border bg-secondary p-4 text-sm text-foreground">{taskLoading ? tCommon('status.loading') : taskIssue}</p>}
          {(() => {
            const acc = submitMutation.data?.firstAttemptAccuracy ?? lessonData?.firstAttemptAccuracy;
            if (!acc) return null;
            return (
              <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs sm:text-sm">
                <span className="font-semibold text-foreground">{t('firstAttemptAccuracy')}:</span>
                {acc.percent !== null ? (
                  <span className="font-medium text-primary">
                    {t('firstAttemptAccuracyValue', {
                      percent: acc.percent,
                      correct: acc.correct,
                      total: acc.total,
                    })}
                  </span>
                ) : (
                  <span className="text-muted">{t('insufficientSamples')}</span>
                )}
                <span className="text-muted">· {t('accuracyNotice')}</span>
              </div>
            );
          })()}
        </header>

        <GrammarLessonContent lesson={lesson} />

        {exercises.length > 0 && <section aria-labelledby="grammar-practice-heading" className="space-y-4">
          <div><h2 id="grammar-practice-heading" className="text-2xl font-bold tracking-tight text-foreground">{t('exercises')}</h2><p className="mt-1 text-sm text-muted">{isComplete ? t('lessonComplete') : t('exerciseProgress', { current: exerciseIndex + 1, total: exercises.length })}</p></div>
          {submitMutation.isError && <p role="alert" className="rounded-xl border border-border bg-secondary p-4 text-sm text-foreground">{getLocalizedErrorMessage(submitMutation.error, tCommon)}</p>}
          {!isComplete && exercise && <ExerciseCard key={exercise.id} exercise={exercise} focusOnMount={focusExerciseAfterContinue} disabled={submitMutation.isPending || taskLoading || Boolean(taskIssue)} blocked={Boolean(taskIssue)} hasError={submitMutation.isError} result={currentResult ?? undefined} onAnswerChange={answerChanged} onContinue={continueAfterFeedback} onSubmit={submitAnswer} />}
          {submitMutation.isPending && <p role="status" className="text-sm text-muted">{t('submitting')}</p>}
          {showCompletion && <Card className="flex flex-col sm:flex-row items-start gap-3 border-primary/30 bg-primary-subtle p-4 sm:p-5"><CheckCircle2 aria-hidden="true" className="mt-0.5 shrink-0 text-primary" size={20} /><div className="w-full"><h3 className="font-semibold text-foreground">{t('lessonComplete')}</h3><p className="mt-1 text-sm text-muted">{t('answerSaved')}</p><div className="mt-4 flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full sm:w-auto"><Button type="button" variant="secondary" className="w-full sm:w-auto" onClick={() => { submitMutation.reset(); setPracticeIndex(0); }}>{t('practiceAgain')}</Button>{lessonData?.nextLessonId && <Link to={`/grammar/${encodeURIComponent(lessonData.nextLessonId)}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-full sm:w-auto text-center">{t('nextLesson')}<ArrowRight aria-hidden="true" size={17} /></Link>}</div></div></Card>}
        </section>}
        {!exercises.length && <Card><p className="p-5 text-sm text-muted">{t('noExercises')}</p></Card>}
        {lesson.outputPrompts.length > 0 && (
          <GrammarOutputPractice
            lessonId={lesson.id}
            revisionId={lesson.revisionId}
            prompts={lesson.outputPrompts}
          />
        )}

        <GrammarPracticeProgress lessonId={lesson.id} revisionId={lesson.revisionId} />

        <GrammarPracticeHistory
          lessonId={lesson.id}
          revisionId={lesson.revisionId}
        />

      </>}
    </div>
  );
}

function ExerciseCard({
  exercise,
  focusOnMount,
  disabled,
  blocked,
  hasError,
  result,
  onAnswerChange,
  onContinue,
  onSubmit,
}: {
  focusOnMount: boolean;
  exercise: {
    id: string;
    kind: GrammarExerciseKind;
    prompt: string;
    options: Array<{ text: string }>;
  };
  disabled: boolean;
  blocked: boolean;
  hasError: boolean;
  result?: { isCorrect: boolean; feedback: string };
  onAnswerChange: () => void;
  onContinue: () => void;
  onSubmit: (answer: string, type: 'choice' | 'text') => void;
}) {
  const { t } = useTranslation('grammar');
  const [answer, setAnswer] = useState('');
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (focusOnMount) headingRef.current?.focus();
  }, [focusOnMount]);
  const isChoice = exercise.kind === 'choice';
  const hasResult = Boolean(result);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!answer.trim()) return;
    onSubmit(answer, isChoice ? 'choice' : 'text');
  }

  function changeAnswer(value: string) {
    setAnswer(value);
    onAnswerChange();
  }

  return <Card className="space-y-4 sm:space-y-5 p-4 sm:p-6 md:p-7">
    <h3 ref={headingRef} tabIndex={-1} className="text-base sm:text-lg font-semibold leading-relaxed text-foreground focus:outline-none focus:ring-2 focus:ring-primary">{exercise.prompt}</h3>
    <form onSubmit={submit} className="space-y-4 sm:space-y-5">
      {isChoice ? <fieldset disabled={disabled || hasResult} className="space-y-3">
        <legend className="mb-3 text-sm font-medium text-muted">{t('answerChoice')}</legend>
        {exercise.options.map((option, index) => <label key={`${index}-${option.text}`} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-border bg-background p-3 text-sm sm:text-base text-foreground has-[:checked]:border-primary has-[:checked]:bg-primary-subtle has-[:disabled]:cursor-not-allowed focus-within:ring-2 focus-within:ring-primary">
          <input type="radio" required name={`grammar-answer-${exercise.id}`} value={option.text} checked={answer === option.text} onChange={() => changeAnswer(option.text)} className="h-4 w-4 accent-primary" />
          <span>{option.text}</span>
        </label>)}
      </fieldset> : <div className="space-y-2"><label htmlFor={`grammar-answer-${exercise.id}`} className="text-sm font-medium text-foreground">{t('answerText')}</label><textarea id={`grammar-answer-${exercise.id}`} value={answer} onChange={(event) => changeAnswer(event.target.value)} disabled={disabled || hasResult} required rows={3} placeholder={t('answerPlaceholder')} className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-base text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-70" /></div>}
      {!hasResult && <Button type="submit" disabled={disabled || !answer.trim()} className="w-full sm:w-auto min-h-11">{hasError ? t('retryAnswer') : blocked ? t('submitAnswer') : disabled ? t('submitting') : t('submitAnswer')}</Button>}
    </form>
    {result && <div role="status" aria-live="polite" className={`space-y-2 rounded-xl border p-4 text-sm ${result.isCorrect ? 'border-primary/30 bg-primary-subtle text-foreground' : 'border-border bg-secondary text-foreground'}`}>
      <p className="font-semibold">{result.isCorrect ? t('correct') : t('incorrect')}</p>
      <p className="whitespace-pre-line leading-6">{result.feedback}</p>
      <p className="text-muted">{t('answerSaved')}</p>
      <Button type="button" onClick={onContinue} className="w-full sm:w-auto min-h-11">{t('continueLesson')}</Button>
    </div>}
  </Card>;
}
