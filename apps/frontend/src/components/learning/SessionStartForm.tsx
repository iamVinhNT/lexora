/**
 * @file SessionStartForm.tsx
 * @description Selector-driven form for starting a learning session in a Centered Focus Card.
 */
import { useEffect, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import {
  SESSION_MODES,
  type LearningOptions,
  type LearningSession,
  type SessionMode,
  type SessionStartPayload,
} from '../../api/session.api';
import type { StudyTaskView } from '../../api/study.api';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { formatDate, formatNumber } from '../../i18n/formatters';
import { getLocalizedEnumLabel } from '../../i18n/presentation';
import { Play, RotateCw } from 'lucide-react';

type Props = {
  isPending: boolean;
  errorMessage?: string;
  latestSession?: LearningSession | null;
  options?: LearningOptions;
  optionsLoading?: boolean;
  optionsError?: string;
  onRetryOptions?: () => void;
  task?: StudyTaskView | null;
  taskId?: string;
  taskLoading?: boolean;
  taskError?: string;
  onSubmit: (payload: SessionStartPayload) => void;
};

const COUNT_PRESETS = [5, 10, 15, 20] as const;

function getAvailabilityCount(option: SessionMode, options?: LearningOptions): number | undefined {
  if (!options) return undefined;
  if (option === 'new_words') return options.availability?.newWords;
  if (option === 'weak_words') return options.availability?.weakWords;
  if (option === 'daily_plan') return options.availability?.dueWords;
  if (option === 'context') return options.contexts?.length;
  if (option === 'topic') return options.topics?.length;
  return undefined;
}

function getTaskAvailability(task: StudyTaskView, options?: LearningOptions): number | undefined {
  if (task.kind !== 'LEARN_WORDS' || !options) return undefined;
  if (task.mode === 'context') return options.contexts.find((context) => context.id === task.contextId)?.wordCount;
  if (task.mode === 'topic') return options.topics.find((topic) => topic.id === task.topicId)?.wordCount;
  return getAvailabilityCount(task.mode, options);
}

export function SessionStartForm({
  isPending,
  errorMessage,
  latestSession,
  options,
  optionsLoading = false,
  optionsError,
  onRetryOptions,
  task,
  taskId,
  taskLoading = false,
  taskError,
  onSubmit,
}: Props) {
  const { t } = useTranslation('learning');
  const { t: tCalendar } = useTranslation('calendar');
  const [mode, setMode] = useState<SessionMode>('new_words');
  const [count, setCount] = useState('10');
  const [contextId, setContextId] = useState('');
  const [topicId, setTopicId] = useState('');
  const [validationError, setValidationError] = useState('');
  const [confirmReducedCount, setConfirmReducedCount] = useState(false);

  useEffect(() => {
    if (!task || task.kind !== 'LEARN_WORDS') return;
    setMode(task.mode);
    setCount(String(Math.min(50, Math.max(0, task.targetCount - task.completedCount))));
    setContextId(task.contextId ?? '');
    setTopicId(task.topicId ?? '');
    setConfirmReducedCount(false);
    setValidationError('');
  }, [task?.id, task?.completedCount, task?.targetCount]);
  const isLinkedTask = Boolean(taskId);
  const remaining = task ? Math.max(0, task.targetCount - task.completedCount) : undefined;
  const taskAvailability = task ? getTaskAvailability(task, options) : undefined;
  const requestedCount = Number(count);
  const availabilityShort = typeof taskAvailability === 'number' && Number.isInteger(requestedCount) && requestedCount > taskAvailability;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (task && task.kind !== 'LEARN_WORDS') return;
    const parsedCount = Number(count);
    if (!Number.isInteger(parsedCount) || parsedCount < 1 || parsedCount > 50) {
      return setValidationError(t('countError'));
    }
    if (mode === 'context' && !contextId) {
      return setValidationError(t('contextRequired'));
    }
    if (mode === 'topic' && !topicId) {
      return setValidationError(t('topicRequired'));
    }
    if (availabilityShort && !confirmReducedCount) {
      return setValidationError(tCalendar('warnings.noAvailableContent'));
    }
    const effectiveCount = Math.min(50, parsedCount, remaining ?? Number.POSITIVE_INFINITY, taskAvailability ?? Number.POSITIVE_INFINITY);
    if (effectiveCount < 1) return setValidationError(tCalendar('forms.selectedContentUnavailable'));
    setValidationError('');
    onSubmit({
      mode,
      count: effectiveCount,
      ...(mode === 'context' ? { contextId } : {}),
      ...(mode === 'topic' ? { topicId } : {}),
      ...(task ? { studyTaskId: task.id } : {}),
    });
  }

  if (taskLoading) {
    return (
      <div role="status" className="mx-auto max-w-2xl rounded-2xl border border-border bg-surface p-8 text-center text-sm text-muted shadow-sm">
        {t('optionsLoading')}
      </div>
    );
  }

  if (taskError) {
    return (
      <div role="alert" className="mx-auto max-w-2xl rounded-2xl border border-red-300 bg-red-50 p-6 text-sm text-red-800 shadow-sm dark:border-red-800 dark:bg-red-950/40 dark:text-red-200">
        {taskError}
      </div>
    );
  }

  if (optionsLoading) {
    return (
      <div
        role="status"
        className="mx-auto max-w-2xl rounded-2xl border border-border bg-surface p-8 text-center text-sm text-muted shadow-sm"
      >
        {t('optionsLoading')}
      </div>
    );
  }

  if (optionsError) {
    return (
      <div
        role="alert"
        className="mx-auto max-w-2xl space-y-4 rounded-2xl border border-red-300 bg-red-50 p-6 text-red-800 shadow-sm dark:border-red-800 dark:bg-red-950/40 dark:text-red-200"
      >
        <p>{optionsError}</p>
        <button
          type="button"
          onClick={onRetryOptions}
          title={t('retryOptions')}
          className="min-h-11 min-w-11 rounded-lg border border-current px-4 py-2 text-sm font-semibold"
        >
          <RotateCw size={16} aria-hidden="true" className="mx-auto" />
          <span className="sr-only">{t('retryOptions')}</span>
        </button>
      </div>
    );
  }

  if (
    !isLinkedTask &&
    (!options ||
      (options.contexts.length === 0 &&
        options.topics.length === 0 &&
        options.availability.newWords + options.availability.weakWords + options.availability.dueWords === 0))
  ) {
    return (
      <div
        role="status"
        className="mx-auto max-w-2xl space-y-2 rounded-2xl border border-border bg-surface p-8 text-center text-sm text-muted shadow-sm"
      >
        <p>{t('noOptions')}</p>
        <p>{t('noOptionsGuidance')}</p>
      </div>
    );
  }

  const contexts = options?.contexts ?? [];
  const topics = options?.topics ?? [];
  const taskStartDisabled = isPending || Boolean(task && (task.kind !== 'LEARN_WORDS' || task.isUnavailable || task.cancelledAt || remaining === 0));
  const taskModeLabel = task?.kind === 'LEARN_WORDS' ? getLocalizedEnumLabel(t, 'mode', task.mode) : tCalendar('taskKinds.learn');

  return (
    <form
      onSubmit={submit}
      className="mx-auto w-full max-w-2xl space-y-5 sm:space-y-6 rounded-2xl border border-border bg-surface p-4 sm:p-6 md:p-8 shadow-sm"
      noValidate
    >
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {t('startTitle')}
        </h2>
        <p className="mt-2 text-sm text-muted sm:text-base">
          {t('startDescription')}
        </p>
        {latestSession && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-border/70 bg-background/50 px-4 py-2.5 text-xs text-muted sm:text-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            <span>
              {t('latestSession', {
                count: latestSession.totalWords,
                formattedCount: formatNumber(latestSession.totalWords),
                date: formatDate(latestSession.startedAt),
              })}
            </span>
          </div>
        )}
        {task && (
          <div className="mt-4 space-y-1 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-foreground" role="status">
            <p className="font-semibold">{tCalendar('forms.taskTitle')}: {taskModeLabel}</p>
            <p className="text-muted">
              {tCalendar('progress', {
                formattedCompleted: formatNumber(task.completedCount),
                formattedTarget: formatNumber(task.targetCount),
              })}{' '}
              {tCalendar('progressUnit.word_other')}
            </p>
            {task.isUnavailable && <p className="font-medium text-danger">{task.unavailableReason ?? tCalendar('forms.selectedContentUnavailable')}</p>}
            {remaining === 0 && <p className="font-medium text-emerald-600 dark:text-emerald-400">{tCalendar('statuses.COMPLETED')}</p>}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <label htmlFor="session-mode" className="text-sm font-semibold text-foreground">
          {t('sessionMode')}
        </label>

        {/* Visual Mode Chips */}
        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 gap-2">
          {SESSION_MODES.map((option) => {
            const isSelected = mode === option;
            const badgeCount = getAvailabilityCount(option, options);
            return (
              <button
                key={option}
                type="button"
                aria-pressed={isSelected}
                disabled={taskStartDisabled || isLinkedTask}
                onClick={() => {
                  setMode(option);
                  setValidationError('');
                }}
                className={`flex min-h-11 items-center justify-between rounded-xl border p-2.5 sm:p-3 text-left text-xs sm:text-sm font-medium transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-primary shadow-xs ring-1 ring-primary'
                    : 'border-border bg-background hover:border-primary/40 text-foreground'
                } disabled:opacity-50`}
              >
                <span className="truncate min-[360px]:whitespace-normal">{getLocalizedEnumLabel(t, 'mode', option)}</span>
                {typeof badgeCount === 'number' && (
                  <span
                    className={`ml-1.5 inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                      isSelected
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/20 text-muted'
                    }`}
                  >
                    {formatNumber(badgeCount)}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <Select
          value={mode}
          onValueChange={(value) => {
            setMode(value as SessionMode);
            setValidationError('');
          }}
          disabled={taskStartDisabled || isLinkedTask}
        >
          <SelectTrigger id="session-mode" aria-label={t('sessionMode')} className="min-h-11 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SESSION_MODES.map((option) => (
              <SelectItem key={option} value={option}>
                {getLocalizedEnumLabel(t, 'mode', option)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {mode === 'context' && (
        <div className="space-y-2">
          <label htmlFor="context-id" className="text-sm font-semibold text-foreground">
            {t('context')}
          </label>
          <Select value={contextId} onValueChange={setContextId} disabled={taskStartDisabled || isLinkedTask}>
            <SelectTrigger id="context-id" aria-label={t('context')} disabled={taskStartDisabled || isLinkedTask} className="min-h-11 w-full">
              <SelectValue placeholder={t('chooseContext')} />
            </SelectTrigger>
            <SelectContent>
              {contexts.map((context) => (
                <SelectItem key={context.id} value={context.id}>
                  {context.title} · {context.wordCount}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {mode === 'topic' && (
        <div className="space-y-2">
          <label htmlFor="session-topic" className="text-sm font-semibold text-foreground">
            {t('topic')}
          </label>
          <Select value={topicId} onValueChange={setTopicId} disabled={taskStartDisabled || isLinkedTask}>
            <SelectTrigger id="session-topic" aria-label={t('topic')} disabled={taskStartDisabled || isLinkedTask} className="min-h-11 w-full">
              <SelectValue placeholder={t('chooseTopic')} />
            </SelectTrigger>
            <SelectContent>
              {topics.map((topic) => (
                <SelectItem key={topic.id} value={topic.id}>
                  {topic.name} · {topic.wordCount}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label htmlFor="word-count" className="text-sm font-semibold text-foreground">
            {t('wordCount')}
          </label>
          <div className="flex items-center gap-2">
            {COUNT_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                aria-pressed={count === String(preset)}
                disabled={taskStartDisabled}
                onClick={() => setCount(String(preset))}
                className={`min-h-11 min-w-11 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                  count === String(preset)
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'border border-border bg-background text-muted hover:border-primary/40 hover:text-foreground'
                } disabled:opacity-50`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
        <input
          id="word-count"
          type="number"
          min={1}
          max={task ? Math.min(50, remaining ?? 50) : 50}
          inputMode="numeric"
          value={count}
          onChange={(event) => setCount(event.target.value)}
          disabled={taskStartDisabled}
          className="min-h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-60"
        />
        {task && availabilityShort && (
          <div className="space-y-2 text-sm">
            <p role="status">{tCalendar('warnings.noAvailableContent')}</p>
            <label className="flex min-h-11 items-center gap-2">
              <input
                type="checkbox"
                checked={confirmReducedCount}
                onChange={(event) => setConfirmReducedCount(event.target.checked)}
                disabled={taskStartDisabled}
              />
              <span>{tCalendar('forms.availableCount', { count: taskAvailability })}</span>
            </label>
          </div>
        )}
      </div>

      {(validationError || errorMessage) && (
        <p
          role="alert"
          className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200"
        >
          {validationError || errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={taskStartDisabled}
        className="min-h-12 w-full rounded-xl bg-primary px-4 py-3 text-sm sm:text-base font-semibold text-primary-foreground shadow-sm transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60"
      >
        <Play size={16} aria-hidden="true" className="mr-2 inline" />
        {isPending ? t('starting') : t('start')}
      </button>
    </form>
  );
}
