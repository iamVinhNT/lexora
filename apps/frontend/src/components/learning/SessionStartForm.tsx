/**
 * @file SessionStartForm.tsx
 * @description Selector-driven form for starting a learning session.
 */
import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { SESSION_MODES, type LearningOptions, type LearningSession, type SessionMode, type SessionStartPayload } from '../../api/session.api';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { formatDate, formatNumber } from '../../i18n/formatters';
import { getLocalizedEnumLabel } from '../../i18n/presentation';

type Props = { isPending: boolean; errorMessage?: string; latestSession?: LearningSession | null; options?: LearningOptions; optionsLoading?: boolean; optionsError?: string; onRetryOptions?: () => void; onSubmit: (payload: SessionStartPayload) => void };
export function SessionStartForm({ isPending, errorMessage, latestSession, options, optionsLoading = false, optionsError, onRetryOptions, onSubmit }: Props) {
  const { t } = useTranslation('learning'); const [mode, setMode] = useState<SessionMode>('new_words'); const [count, setCount] = useState('10'); const [contextId, setContextId] = useState(''); const [topicId, setTopicId] = useState(''); const [validationError, setValidationError] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const parsedCount = Number(count); if (!Number.isInteger(parsedCount) || parsedCount < 1 || parsedCount > 50) return setValidationError(t('countError')); if (mode === 'context' && !contextId) return setValidationError(t('contextRequired')); if (mode === 'topic' && !topicId) return setValidationError(t('topicRequired')); setValidationError(''); onSubmit({ mode, count: parsedCount, ...(mode === 'context' ? { contextId } : {}), ...(mode === 'topic' ? { topicId } : {}) }); }
  if (optionsLoading) return <div role="status" className="mx-auto max-w-xl rounded-2xl border border-border bg-surface p-8 text-center text-sm text-muted">{t('optionsLoading')}</div>;
  if (optionsError) return <div role="alert" className="mx-auto max-w-xl space-y-4 rounded-2xl border border-red-300 bg-red-50 p-6 text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200"><p>{optionsError}</p><button type="button" onClick={onRetryOptions} className="min-h-11 rounded-lg border border-current px-4 py-2 text-sm font-semibold">{t('retryOptions')}</button></div>;
  if (!options || (options.contexts.length === 0 && options.topics.length === 0 && options.availability.newWords + options.availability.weakWords + options.availability.dueWords === 0)) return <div role="status" className="mx-auto max-w-xl space-y-2 rounded-2xl border border-border bg-surface p-8 text-center text-sm text-muted"><p>{t('noOptions')}</p><p>{t('noOptionsGuidance')}</p></div>;
  const contexts = options.contexts;
  const topics = options.topics;
  return <form onSubmit={submit} className="mx-auto w-full max-w-xl space-y-6 rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8" noValidate>
    <div><h2 className="text-2xl font-semibold tracking-tight text-foreground">{t('startTitle')}</h2><p className="mt-2 text-sm text-muted">{t('startDescription')}</p>{latestSession && <p className="mt-3 text-sm text-muted">{t('latestSession', { count: latestSession.totalWords, formattedCount: formatNumber(latestSession.totalWords), date: formatDate(latestSession.startedAt) })}</p>}</div>
    <div className="space-y-2"><label htmlFor="session-mode" className="text-sm font-semibold text-foreground">{t('sessionMode')}</label><Select value={mode} onValueChange={(value) => { setMode(value as SessionMode); setValidationError(''); }} disabled={isPending}><SelectTrigger id="session-mode" aria-label={t('sessionMode')} className="min-h-11 w-full"><SelectValue /></SelectTrigger><SelectContent>{SESSION_MODES.map((option) => <SelectItem key={option} value={option}>{getLocalizedEnumLabel(t, 'mode', option)}</SelectItem>)}</SelectContent></Select></div>
    {mode === 'context' && <div className="space-y-2"><label htmlFor="context-id" className="text-sm font-semibold text-foreground">{t('context')}</label><select id="context-id" value={contextId} onChange={(event) => setContextId(event.target.value)} disabled={isPending} className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm"><option value="">{t('chooseContext')}</option>{contexts.map((context) => <option key={context.id} value={context.id}>{context.title} · {context.wordCount}</option>)}</select></div>}
    {mode === 'topic' && <div className="space-y-2"><label htmlFor="session-topic" className="text-sm font-semibold text-foreground">{t('topic')}</label><select id="session-topic" value={topicId} onChange={(event) => setTopicId(event.target.value)} disabled={isPending} className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm"><option value="">{t('chooseTopic')}</option>{topics.map((topic) => <option key={topic.id} value={topic.id}>{topic.name} · {topic.wordCount}</option>)}</select></div>}
    <div className="space-y-2"><label htmlFor="word-count" className="text-sm font-semibold text-foreground">{t('wordCount')}</label><input id="word-count" type="number" min={1} max={50} inputMode="numeric" value={count} onChange={(event) => setCount(event.target.value)} disabled={isPending} className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm" /><p className="text-xs text-muted">{t('wordCountHint')}</p></div>
    {(validationError || errorMessage) && <p role="alert" className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200">{validationError || errorMessage}</p>}
    <button type="submit" disabled={isPending} className="min-h-11 w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60">{isPending ? t('starting') : t('start')}</button>
  </form>;
}
