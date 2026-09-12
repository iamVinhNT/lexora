/**
 * @file SessionStartForm.tsx
 * @description Focused form for selecting a learning-session mode and size.
 */
import { useState, type FormEvent } from 'react';

import { SESSION_MODES, type LearningSession, type SessionMode, type SessionStartPayload } from '../../api/session.api';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';

type SessionStartFormProps = {
  isPending: boolean;
  errorMessage?: string;
  latestSession?: LearningSession | null;
  onSubmit: (payload: SessionStartPayload) => void;
};

const modeLabels: Record<SessionMode, string> = {
  new_words: 'New words',
  context: 'Context',
  topic: 'Topic or tag',
  weak_words: 'Weak words',
  daily_plan: 'Daily plan',
};

export function SessionStartForm({ isPending, errorMessage, latestSession, onSubmit }: SessionStartFormProps) {
  const [mode, setMode] = useState<SessionMode>('new_words');
  const [count, setCount] = useState('10');
  const [contextId, setContextId] = useState('');
  const [topic, setTopic] = useState('');
  const [validationError, setValidationError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsedCount = Number(count);
    if (!Number.isInteger(parsedCount) || parsedCount < 1 || parsedCount > 50) {
      setValidationError('Choose a word count from 1 to 50.');
      return;
    }
    if (mode === 'context' && !contextId.trim()) {
      setValidationError('Context is required for context mode.');
      return;
    }
    if (mode === 'topic' && !topic.trim()) {
      setValidationError('Topic or tag is required for topic mode.');
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
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Start a learning session</h2>
        <p className="mt-2 text-sm text-muted">Five focused steps. One word at a time.</p>
        {latestSession && <p className="mt-3 text-sm text-muted">Latest session: {latestSession.totalWords} {latestSession.totalWords === 1 ? 'word' : 'words'} on {new Date(latestSession.startedAt).toLocaleDateString()}.</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="session-mode" className="text-sm font-semibold text-foreground">Session mode</label>
        <Select value={mode} onValueChange={(value) => { setMode(value as SessionMode); setValidationError(''); }} disabled={isPending}>
          <SelectTrigger id="session-mode" aria-label="Session mode" className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><SelectValue /></SelectTrigger>
          <SelectContent>{SESSION_MODES.map((option) => <SelectItem key={option} value={option}>{modeLabels[option]}</SelectItem>)}</SelectContent>
        </Select>
      </div>

      {mode === 'context' && <div className="space-y-2">
        <label htmlFor="context-id" className="text-sm font-semibold text-foreground">Context ID</label>
        <input id="context-id" value={contextId} onChange={(event) => setContextId(event.target.value)} disabled={isPending} className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" placeholder="Paste a context ID" />
      </div>}

      {mode === 'topic' && <div className="space-y-2">
        <label htmlFor="session-topic" className="text-sm font-semibold text-foreground">Topic or tag</label>
        <input id="session-topic" value={topic} onChange={(event) => setTopic(event.target.value)} disabled={isPending} className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
      </div>}

      <div className="space-y-2">
        <label htmlFor="word-count" className="text-sm font-semibold text-foreground">Word count</label>
        <input id="word-count" type="number" min={1} max={50} inputMode="numeric" value={count} onChange={(event) => setCount(event.target.value)} disabled={isPending} className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
        <p className="text-xs text-muted">Choose 1–50 words.</p>
      </div>

      {(validationError || errorMessage) && <p role="alert" className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200">{validationError || errorMessage}</p>}

      <button type="submit" disabled={isPending} className="min-h-11 w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
        {isPending ? 'Starting…' : 'Start session'}
      </button>
    </form>
  );
}
