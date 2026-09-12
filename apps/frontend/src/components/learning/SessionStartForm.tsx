/**
 * @file SessionStartForm.tsx
 * @description Focused form for selecting a learning-session mode and size.
 */
import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { SESSION_MODES, type LearningSession, type SessionMode, type SessionStartPayload } from '../../api/session.api';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { formatDate, formatNumber } from '../../i18n/formatters';
import { getLocalizedEnumLabel } from '../../i18n/presentation';

type SessionStartFormProps = {
  isPending: boolean;
  errorMessage?: string;
  latestSession?: LearningSession | null;
  onSubmit: (payload: SessionStartPayload) => void;
};

export function SessionStartForm({ isPending, errorMessage, latestSession, onSubmit }: SessionStartFormProps) {
  const { t } = useTranslation('learning');
  const [mode, setMode] = useState<SessionMode>('new_words');
  const [count, setCount] = useState('10');
  const [contextId, setContextId] = useState('');
  const [topic, setTopic] = useState('');
  const [validationError, setValidationError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsedCount = Number(count);
    if (!Number.isInteger(parsedCount) || parsedCount < 1 || parsedCount > 50) {
      setValidationError(t('countError'));
      return;
    }
    if (mode === 'context' && !contextId.trim()) {
      setValidationError(t('contextRequired'));
      return;
    }
    if (mode === 'topic' && !topic.trim()) {
      setValidationError(t('topicRequired'));
      return;
    }

    setValidationError('');
    onSubmit({
      mode,
      count: parsedCount,
      ...(mode === 'context' ? { contextId: contextId.trim() } : {}),
      ...(mode === 'topic' ? { topic: topic.trim() } : {}),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-xl space-y-6 rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8" noValidate>
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">{t('startTitle')}</h2>
        <p className="mt-2 text-sm text-muted">{t('startDescription')}</p>
        {latestSession && <p className="mt-3 text-sm text-muted">{t('latestSession', { count: latestSession.totalWords, formattedCount: formatNumber(latestSession.totalWords), date: formatDate(latestSession.startedAt) })}</p>}
      </div>

      <div className="space-y-2">
         <label htmlFor="session-mode" className="text-sm font-semibold text-foreground">{t('sessionMode')}</label>
        <Select value={mode} onValueChange={(value) => { setMode(value as SessionMode); setValidationError(''); }} disabled={isPending}>
           <SelectTrigger id="session-mode" aria-label={t('sessionMode')} className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><SelectValue /></SelectTrigger>
           <SelectContent>{SESSION_MODES.map((option) => <SelectItem key={option} value={option}>{getLocalizedEnumLabel(t, 'mode', option)}</SelectItem>)}</SelectContent>
        </Select>
      </div>

      {mode === 'context' && <div className="space-y-2">
         <label htmlFor="context-id" className="text-sm font-semibold text-foreground">{t('contextId')}</label>
         <input id="context-id" value={contextId} onChange={(event) => setContextId(event.target.value)} disabled={isPending} className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" placeholder={t('contextIdPlaceholder')} />
      </div>}

      {mode === 'topic' && <div className="space-y-2">
         <label htmlFor="session-topic" className="text-sm font-semibold text-foreground">{t('topicOrTag')}</label>
         <input id="session-topic" value={topic} onChange={(event) => setTopic(event.target.value)} disabled={isPending} className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
      </div>}

      <div className="space-y-2">
         <label htmlFor="word-count" className="text-sm font-semibold text-foreground">{t('wordCount')}</label>
        <input id="word-count" type="number" min={1} max={50} inputMode="numeric" value={count} onChange={(event) => setCount(event.target.value)} disabled={isPending} className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
         <p className="text-xs text-muted">{t('wordCountHint')}</p>
      </div>

      {(validationError || errorMessage) && <p role="alert" className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200">{validationError || errorMessage}</p>}

      <button type="submit" disabled={isPending} className="min-h-11 w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
         {isPending ? t('starting') : t('start')}
      </button>
    </form>
  );
}
