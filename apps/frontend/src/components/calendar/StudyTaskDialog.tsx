/**
 * @file StudyTaskDialog.tsx
 * @description Shadcn create, edit, and cancel form for calendar study tasks.
 */
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ApiError } from '../../api/client';
import type { CivilDate, StudyTaskInput, StudyTaskView, TaskParams } from '../../api/study.api';
import { isCivilDate } from '../../utils/calendar-date';
import { getLocalizedErrorMessage } from '../../i18n/presentation';
import { useContexts } from '../../hooks/useContexts';
import { useGrammarCourse } from '../../hooks/useGrammar';
import { useStudyTaskMutations } from '../../hooks/useStudyCalendar';
import { Alert, AlertDescription } from '../ui/Alert';
import { Button } from '../ui/Button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/DialogPrimitives';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { StudyTaskDatePicker } from './StudyTaskDatePicker';
import { Ban, Save, X } from 'lucide-react';

type Props = { task?: StudyTaskView | null; date: CivilDate; onClose: () => void };
type FormState = { scheduledDate: string; kind: StudyTaskInput['kind']; mode: 'new_words' | 'context' | 'topic' | 'weak_words'; contextId: string; topicId: string; lessonId: string; revisionId: string; revision: string; target: string };

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
  const formId = useId();
  const emptySelection = `${formId}-empty`;
  const returnFocusRef = useRef<HTMLElement | null>(typeof document === 'undefined' ? null : document.activeElement as HTMLElement);
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

  const title = isEditing ? t('actions.edit') : t('actions.create');

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent
        closeLabel={tCommon('dialog.close', { title })}
        aria-modal="true"
        aria-describedby={undefined}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          returnFocusRef.current?.focus();
        }}
      >
        <DialogHeader><DialogTitle>{title}</DialogTitle></DialogHeader>
        <form className="min-w-0 space-y-5" onSubmit={submit} noValidate>
          {Boolean(error) && <Alert variant="destructive"><AlertDescription>{String(error instanceof ApiError && error.code === 'CONFLICT' ? t('forms.conflict') : getLocalizedErrorMessage(error, tCommon))}</AlertDescription></Alert>}
          {saved && <Alert role="status"><AlertDescription>{t('forms.saved')}</AlertDescription></Alert>}
          {task?.isUnavailable && <Alert variant="destructive"><AlertDescription>{t('forms.selectedContentUnavailable')}</AlertDescription></Alert>}
          {activeSession && <Alert><AlertDescription>{t('forms.activeSession')}</AlertDescription></Alert>}
          <div className="space-y-2">
            <Label htmlFor={`${formId}-date`}>{t('forms.scheduledDate')}</Label>
            <StudyTaskDatePicker id={`${formId}-date`} value={form.scheduledDate} onChange={(value) => setField('scheduledDate', value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${formId}-kind`}>{t('forms.kind')}</Label>
            <Select value={form.kind} onValueChange={(value) => setField('kind', value as FormState['kind'])}>
              <SelectTrigger id={`${formId}-kind`}><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="LEARN_WORDS">{t('taskKinds.learn')}</SelectItem>
                <SelectItem value="REVIEW_WORDS">{t('taskKinds.review')}</SelectItem>
                <SelectItem value="GRAMMAR">{t('taskKinds.grammar')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {form.kind === 'LEARN_WORDS' && <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`${formId}-mode`}>{t('forms.mode')}</Label>
              <Select value={form.mode} onValueChange={(value) => setField('mode', value as FormState['mode'])}>
                <SelectTrigger id={`${formId}-mode`}><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="new_words">{tCommon('actions.learnNewWords')}</SelectItem>
                  <SelectItem value="context">{t('forms.context')}</SelectItem>
                  <SelectItem value="topic">{t('forms.topic')}</SelectItem>
                  <SelectItem value="weak_words">{t('taskKinds.learn')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {form.mode === 'context' && <div className="min-w-0 space-y-2">
              <Label htmlFor={`${formId}-context`}>{t('forms.context')}</Label>
              <Select value={form.contextId || emptySelection} onValueChange={(value) => setField('contextId', value === emptySelection ? '' : value)}>
                <SelectTrigger id={`${formId}-context`} className="min-w-0 [&>span]:min-w-0 [&>span]:truncate"><SelectValue /></SelectTrigger>
                <SelectContent className="max-w-[calc(100vw-1rem)]">
                  <SelectItem value={emptySelection}>{t('forms.context')}</SelectItem>
                  {contexts.data?.items.map((context) => <SelectItem key={context.id} value={context.id}>{context.title}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>}
            {form.mode === 'topic' && <div className="space-y-2">
              <Label htmlFor={`${formId}-topic`}>{t('forms.topic')}</Label>
              <Input id={`${formId}-topic`} value={form.topicId} onChange={(event) => setField('topicId', event.target.value)} />
            </div>}
          </div>}
          {form.kind === 'GRAMMAR' && <div className="min-w-0 space-y-2">
            <Label htmlFor={`${formId}-lesson`}>{t('forms.lesson')}</Label>
            <Select value={form.lessonId || emptySelection} onValueChange={(value) => {
              const lessonId = value === emptySelection ? '' : value;
              const next = lessons.find((lesson) => lesson.id === lessonId);
              setForm((current) => ({ ...current, lessonId, revisionId: next?.revisionId ?? '', revision: next?.revision ?? '' }));
            }}>
              <SelectTrigger id={`${formId}-lesson`} className="min-w-0 [&>span]:min-w-0 [&>span]:truncate"><SelectValue /></SelectTrigger>
              <SelectContent className="max-w-[calc(100vw-1rem)]">
                <SelectItem value={emptySelection}>{t('forms.lesson')}</SelectItem>
                {lessons.map((lesson) => <SelectItem key={lesson.id} value={lesson.id}>{lesson.title}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>}
          <div className="space-y-2">
            <Label htmlFor={`${formId}-target`}>{t('forms.target')}</Label>
            <Input id={`${formId}-target`} type="number" min={1} step={1} inputMode="numeric" value={form.kind === 'GRAMMAR' ? '1' : form.target} onChange={(event) => setField('target', event.target.value)} disabled={form.kind === 'GRAMMAR'} required />
          </div>
          <DialogFooter>
            {task && <Button type="button" variant="danger" onClick={() => void cancelTask()} disabled={isPending || activeSession} icon={Ban} iconOnly>{t('actions.cancel')}</Button>}
            <Button type="button" variant="secondary" onClick={onClose} disabled={isPending} icon={X} iconOnly>{tCommon('actions.cancel')}</Button>
            <Button type="submit" disabled={isPending || activeSession || !validDate || !validTarget || !validParams} icon={Save}>{isPending ? t('actions.saving') : t('actions.save')}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
