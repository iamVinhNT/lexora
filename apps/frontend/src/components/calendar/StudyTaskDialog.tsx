/**
 * @file StudyTaskDialog.tsx
 * @description Localized create, edit, and cancel form for calendar study tasks.
 */
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ApiError } from '../../api/client';
import type { CivilDate, StudyTaskInput, StudyTaskView, TaskParams } from '../../api/study.api';
import { isCivilDate } from '../../utils/calendar-date';
import { getLocalizedErrorMessage } from '../../i18n/presentation';
import { useContexts } from '../../hooks/useContexts';
import { useGrammarCourse } from '../../hooks/useGrammar';
import { useStudyTaskMutations } from '../../hooks/useStudyCalendar';
import { Button } from '../ui/Button';
import { Dialog } from '../ui/Dialog';

type Props = { task?: StudyTaskView | null; date: CivilDate; onClose: () => void };
type FormState = { scheduledDate: string; kind: StudyTaskInput['kind']; mode: 'new_words' | 'context' | 'topic' | 'weak_words'; contextId: string; topicId: string; lessonId: string; revisionId: string; revision: string; target: string };

const controlClass = 'mt-2 min-h-11 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary';

function makeId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function initialForm(task: StudyTaskView | null | undefined, date: CivilDate): FormState {
  return {
    scheduledDate: task?.scheduledDate ?? date,
    kind: task?.kind ?? 'LEARN_WORDS',
    mode: task?.kind === 'LEARN_WORDS' ? task.mode : 'new_words',
    contextId: task?.kind === 'LEARN_WORDS' ? task.contextId ?? '' : '',
    topicId: task?.kind === 'LEARN_WORDS' ? task.topicId ?? '' : '',
    lessonId: task?.kind === 'GRAMMAR' ? task.lessonId ?? '' : '',
    revisionId: task?.kind === 'GRAMMAR' ? task.revisionId ?? '' : '',
    revision: task?.kind === 'GRAMMAR' ? task.revision ?? '' : '',
    target: String(task?.targetCount ?? 1),
  };
}


export function StudyTaskDialog({ task, date, onClose }: Props) {
  const { t } = useTranslation('calendar');
  const { t: tCommon } = useTranslation('common');
  const [createdId] = useState(makeId);
  const [form, setForm] = useState<FormState>(() => initialForm(task, date));
  const [error, setError] = useState<unknown>(null);
  const [saved, setSaved] = useState(false);
  const contexts = useContexts({ limit: 100 });
  const grammar = useGrammarCourse();
  const mutations = useStudyTaskMutations();
  const isEditing = Boolean(task);
  const mutation = mutations.createTask;
  const isPending = mutation.isPending || mutations.patchTask.isPending;

  useEffect(() => {
    setForm(initialForm(task, date));
  }, [date, task]);

  const lessons = useMemo(() => grammar.data?.stages.flatMap((stage) => stage.lessons) ?? [], [grammar.data]);
  const setField = <K extends keyof FormState>(field: K, value: FormState[K]) => setForm((current) => ({ ...current, [field]: value }));
  const selectedLesson = lessons.find((lesson) => lesson.id === form.lessonId);
  const target = Number(form.target);
  const validTarget = Number.isSafeInteger(target) && target > 0;
  const validDate = isCivilDate(form.scheduledDate);
  const activeSession = Boolean(task?.activeSessionId);
  const validParams = form.kind !== 'LEARN_WORDS' || ((form.mode !== 'context' || Boolean(form.contextId)) && (form.mode !== 'topic' || Boolean(form.topicId.trim())));

  const buildParams = (): TaskParams => {
    if (form.kind === 'REVIEW_WORDS') return { kind: 'REVIEW_WORDS' };
    if (form.kind === 'GRAMMAR') return { kind: 'GRAMMAR', lessonId: form.lessonId || null, revisionId: form.revisionId || selectedLesson?.revisionId || null, revision: form.revision || selectedLesson?.revision || null };
    return { kind: 'LEARN_WORDS', mode: form.mode, ...(form.mode === 'context' && form.contextId ? { contextId: form.contextId } : {}), ...(form.mode === 'topic' && form.topicId.trim() ? { topicId: form.topicId.trim() } : {}) };
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validDate || !validTarget || !validParams || isPending || activeSession) return;
    setError(null);
    setSaved(false);
    try {
      if (task) {
        await mutations.patchTask.mutateAsync({ id: task.id, patch: { action: 'EDIT', version: task.version, scheduledDate: form.scheduledDate, targetCount: form.kind === 'GRAMMAR' ? 1 : target, params: buildParams() } });
      } else {
        await mutation.mutateAsync({ id: createdId, scheduledDate: form.scheduledDate, targetCount: form.kind === 'GRAMMAR' ? 1 : target, source: 'MANUAL', ...buildParams() });
      }
      setSaved(true);
      onClose();
    } catch (nextError) {
      setError(nextError);
    }
  };

  const cancelTask = async () => {
    if (!task || isPending || activeSession) return;
    setError(null);
    try {
      await mutations.patchTask.mutateAsync({ id: task.id, patch: { action: 'CANCEL', version: task.version } });
      onClose();
    } catch (nextError) {
      setError(nextError);
    }
  };

  return (
    <Dialog title={isEditing ? t('actions.edit') : t('actions.create')} onClose={onClose} wide>
      <form className="min-w-0 space-y-5" onSubmit={submit} noValidate>
        {Boolean(error) && <p role="alert" className="rounded-lg border border-danger/30 bg-danger/10 p-3 text-sm text-danger">{String(error instanceof ApiError && error.code === 'CONFLICT' ? t('forms.conflict') : getLocalizedErrorMessage(error, tCommon))}</p>}
        {saved && <p role="status" className="text-sm text-muted">{t('forms.saved')}</p>}
        {task?.isUnavailable && <p role="alert" className="rounded-lg border border-danger/30 bg-danger/10 p-3 text-sm text-danger">{t('forms.selectedContentUnavailable')}</p>}
        {activeSession && <p role="alert" className="rounded-lg border border-border bg-secondary p-3 text-sm text-muted">{t('forms.activeSession')}</p>}
        <Field label={t('forms.scheduledDate')}>
          <input aria-label={t('forms.scheduledDate')} className={controlClass} type="date" value={form.scheduledDate} onChange={(event) => setField('scheduledDate', event.target.value)} required />
        </Field>
        <Field label={t('forms.kind')}>
          <select className={controlClass} value={form.kind} onChange={(event) => setField('kind', event.target.value as FormState['kind'])}>
            <option value="LEARN_WORDS">{t('taskKinds.learn')}</option>
            <option value="REVIEW_WORDS">{t('taskKinds.review')}</option>
            <option value="GRAMMAR">{t('taskKinds.grammar')}</option>
          </select>
        </Field>
        {form.kind === 'LEARN_WORDS' && <div className="grid min-w-0 gap-4 sm:grid-cols-2">
          <Field label={t('forms.mode')}>
            <select className={controlClass} value={form.mode} onChange={(event) => setField('mode', event.target.value as FormState['mode'])}>
              <option value="new_words">{tCommon('actions.learnNewWords')}</option>
              <option value="context">{t('forms.context')}</option>
              <option value="topic">{t('forms.topic')}</option>
              <option value="weak_words">{t('taskKinds.learn')}</option>
            </select>
          </Field>
          {form.mode === 'context' && <Field label={t('forms.context')}>
            <select className={controlClass} value={form.contextId} onChange={(event) => setField('contextId', event.target.value)}>
              <option value="">{t('forms.context')}</option>
              {contexts.data?.items.map((context) => <option key={context.id} value={context.id}>{context.title}</option>)}
            </select>
          </Field>}
          {form.mode === 'topic' && <Field label={t('forms.topic')}>
            <input className={controlClass} value={form.topicId} onChange={(event) => setField('topicId', event.target.value)} />
          </Field>}
        </div>}
        {form.kind === 'GRAMMAR' && <Field label={t('forms.lesson')}>
          <select className={controlClass} value={form.lessonId} onChange={(event) => {
            const next = lessons.find((lesson) => lesson.id === event.target.value);
            setForm((current) => ({ ...current, lessonId: event.target.value, revisionId: next?.revisionId ?? '', revision: next?.revision ?? '' }));
          }}>
            <option value="">{t('forms.lesson')}</option>
            {lessons.map((lesson) => <option key={lesson.id} value={lesson.id}>{lesson.title}</option>)}
          </select>
        </Field>}
        <Field label={t('forms.target')}>
          <input className={controlClass} type="number" min={1} step={1} inputMode="numeric" value={form.kind === 'GRAMMAR' ? '1' : form.target} onChange={(event) => setField('target', event.target.value)} disabled={form.kind === 'GRAMMAR'} required />
        </Field>
        <div className="flex flex-col-reverse gap-3 border-t border-border pt-4 sm:flex-row sm:flex-wrap sm:justify-end">
          {task && <Button type="button" variant="danger" onClick={() => void cancelTask()} disabled={isPending || activeSession}>{t('actions.cancel')}</Button>}
          <Button type="button" variant="secondary" onClick={onClose} disabled={isPending}>{tCommon('actions.cancel')}</Button>
          <Button type="submit" disabled={isPending || activeSession || !validDate || !validTarget || !validParams}>{isPending ? t('actions.saving') : t('actions.save')}</Button>
        </div>
      </form>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-foreground">{label}{children}</label>;
}
