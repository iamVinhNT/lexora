/**
 * @file SessionStartForm.tsx
 * @description Selector-driven form for starting a learning session in a Centered Focus Card.
 */
import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import {
  SESSION_MODES,
  type LearningOptions,
  type LearningSession,
  type SessionMode,
  type SessionStartPayload,
} from '../../api/session.api';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { formatDate, formatNumber } from '../../i18n/formatters';
import { getLocalizedEnumLabel } from '../../i18n/presentation';

type Props = {
  isPending: boolean;
  errorMessage?: string;
  latestSession?: LearningSession | null;
  options?: LearningOptions;
  optionsLoading?: boolean;
  optionsError?: string;
  onRetryOptions?: () => void;
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

export function SessionStartForm({
  isPending,
  errorMessage,
  latestSession,
  options,
  optionsLoading = false,
  optionsError,
  onRetryOptions,
  onSubmit,
}: Props) {
  const { t } = useTranslation('learning');
  const [mode, setMode] = useState<SessionMode>('new_words');
  const [count, setCount] = useState('10');
  const [contextId, setContextId] = useState('');
  const [topicId, setTopicId] = useState('');
  const [validationError, setValidationError] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
    setValidationError('');
    onSubmit({
      mode,
      count: parsedCount,
      ...(mode === 'context' ? { contextId } : {}),
      ...(mode === 'topic' ? { topicId } : {}),
    });
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
          className="min-h-11 rounded-lg border border-current px-4 py-2 text-sm font-semibold"
        >
          {t('retryOptions')}
        </button>
      </div>
    );
  }

  if (
    !options ||
    (options.contexts.length === 0 &&
      options.topics.length === 0 &&
      options.availability.newWords + options.availability.weakWords + options.availability.dueWords === 0)
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

  const contexts = options.contexts;
  const topics = options.topics;

  return (
    <form
      onSubmit={submit}
      className="mx-auto w-full max-w-2xl space-y-6 rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8"
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
      </div>

      <div className="space-y-3">
        <label htmlFor="session-mode" className="text-sm font-semibold text-foreground">
          {t('sessionMode')}
        </label>

        {/* Visual Mode Chips */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {SESSION_MODES.map((option) => {
            const isSelected = mode === option;
            const badgeCount = getAvailabilityCount(option, options);
            return (
              <button
                key={option}
                type="button"
                aria-pressed={isSelected}
                disabled={isPending}
                onClick={() => {
                  setMode(option);
                  setValidationError('');
                }}
                className={`flex items-center justify-between rounded-xl border p-2.5 text-left text-xs sm:text-sm font-medium transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-primary shadow-xs ring-1 ring-primary'
                    : 'border-border bg-background hover:border-primary/40 text-foreground'
                } disabled:opacity-50`}
              >
                <span className="truncate">{getLocalizedEnumLabel(t, 'mode', option)}</span>
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
          disabled={isPending}
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
          <Select value={contextId} onValueChange={setContextId} disabled={isPending}>
            <SelectTrigger id="context-id" aria-label={t('context')} disabled={isPending} className="min-h-11 w-full">
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
          <Select value={topicId} onValueChange={setTopicId} disabled={isPending}>
            <SelectTrigger id="session-topic" aria-label={t('topic')} disabled={isPending} className="min-h-11 w-full">
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
        <div className="flex items-center justify-between">
          <label htmlFor="word-count" className="text-sm font-semibold text-foreground">
            {t('wordCount')}
          </label>
          <div className="flex items-center gap-1.5">
            {COUNT_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                aria-pressed={count === String(preset)}
                disabled={isPending}
                onClick={() => setCount(String(preset))}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
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
          max={50}
          inputMode="numeric"
          value={count}
          onChange={(event) => setCount(event.target.value)}
          disabled={isPending}
          className="min-h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-60"
        />
        <p className="text-xs text-muted">{t('wordCountHint')}</p>
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
        disabled={isPending}
        className="min-h-11 w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60"
      >
        {isPending ? t('starting') : t('start')}
      </button>
    </form>
  );
}
