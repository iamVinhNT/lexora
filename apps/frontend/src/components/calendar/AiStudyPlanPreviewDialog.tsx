/**
 * @file AiStudyPlanPreviewDialog.tsx
 * @description Editable AI suggestions with server-bounded choices and stable partial-save IDs.
 */
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { AiStudyPlanPreview, StudyTaskInput } from '../../api/study.api';
import { isCivilDate } from '../../utils/calendar-date';
import { getLocalizedErrorMessage } from '../../i18n/presentation';
import { useAiStudyPlanPreview, useStudyTaskMutations } from '../../hooks/useStudyCalendar';
import { Button } from '../ui/Button';
import { Dialog } from '../ui/Dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { RotateCw, Save, X } from 'lucide-react';

type Props = { onClose: () => void };
type DraftTask = StudyTaskInput & { selected: boolean };
type LearningMode = Extract<StudyTaskInput, { kind: 'LEARN_WORDS' }>['mode'];
const controlClass = 'min-h-11 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary';

function makeId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : Date.now() + '-' + Math.random().toString(36).slice(2);
}

function draftFromSuggestion(task: AiStudyPlanPreview['suggestions'][number]): DraftTask {
  const common = { id: makeId(), scheduledDate: task.scheduledDate, source: 'AUTO' as const, selected: true };
  if (task.kind === 'LEARN_WORDS') return { ...task, ...common };
  if (task.kind === 'REVIEW_WORDS') return { ...task, ...common };
  return { ...task, ...common };
}

function maxQuantity(task: DraftTask, preview: AiStudyPlanPreview): number {
  if (task.kind === 'REVIEW_WORDS') return preview.choices.dueCounts.find((item) => item.date === task.scheduledDate)?.maxQuantity ?? 0;
  if (task.kind === 'GRAMMAR') return preview.choices.grammar.some((item) => item.lessonId === task.lessonId && item.revisionId === task.revisionId) ? 1 : 0;
  if (task.mode === 'new_words' || task.mode === 'weak_words') return preview.choices.learningModes.find((item) => item.mode === task.mode)?.maxQuantity ?? 0;
  if (task.mode === 'context') return preview.choices.contexts.find((item) => item.id === task.contextId)?.maxQuantity ?? 0;
  return preview.choices.topics.find((item) => item.id === task.topicId)?.maxQuantity ?? 0;
}

function canSaveTasks(tasks: DraftTask[], preview: AiStudyPlanPreview | null): boolean {
  if (!preview) return false;
  const selected = tasks.filter((task) => task.selected);
  if (selected.length === 0) return false;
  const occupied = new Set(preview.choices.occupiedSlots.map((slot) => JSON.stringify([slot.date, slot.kind, slot.lessonId])));
  const proposed = new Set<string>();
  for (const task of selected) {
    const day = preview.choices.days.find((item) => item.date === task.scheduledDate);
    if (!isCivilDate(task.scheduledDate) || task.scheduledDate < preview.from || task.scheduledDate > preview.to || !day?.isStudyDay) return false;
    if (!Number.isSafeInteger(task.targetCount) || task.targetCount < 1 || task.targetCount > maxQuantity(task, preview)) return false;
    const lessonId = task.kind === 'GRAMMAR' ? task.lessonId : null;
    const key = JSON.stringify([task.scheduledDate, task.kind, lessonId]);
    if (occupied.has(key) || proposed.has(key)) return false;
    proposed.add(key);
  }
  return true;
}

export function AiStudyPlanPreviewDialog({ onClose }: Props) {
  const { t, i18n } = useTranslation('calendar');
  const { t: tCommon } = useTranslation('common');
  const previewMutation = useAiStudyPlanPreview();
  const { createTask } = useStudyTaskMutations();
  const locale = i18n.resolvedLanguage?.startsWith('vi') ? 'vi' : 'en';
  const [preview, setPreview] = useState<AiStudyPlanPreview | null>(null);
  const [tasks, setTasks] = useState<DraftTask[]>([]);
  const [error, setError] = useState<unknown>(null);
  const [itemErrors, setItemErrors] = useState<Record<string, unknown>>({});
  const [savedCount, setSavedCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const initialPreviewRequested = useRef(false);

  const applyPreview = (result: AiStudyPlanPreview) => {
    setPreview(result);
    setTasks(result.suggestions.map(draftFromSuggestion));
    setItemErrors({});
    setSavedCount(0);
  };
  const generatePreview = () => {
    setError(null);
    void previewMutation.mutateAsync(locale).then(applyPreview).catch(setError);
  };
  useEffect(() => {
    if (initialPreviewRequested.current) return;
    initialPreviewRequested.current = true;
    generatePreview();
  }, []);

  const updateTask = (id: string, updater: (task: DraftTask) => DraftTask) => {
    setTasks((current) => current.map((task) => task.id === id ? updater(task) : task));
  };
  const changeMode = (task: Extract<DraftTask, { kind: 'LEARN_WORDS' }>, mode: LearningMode) => {
    if (!preview) return task;
    const contextId = mode === 'context'
      ? preview.choices.contexts.some((candidate) => candidate.id === task.contextId) ? task.contextId : preview.choices.contexts[0]?.id
      : undefined;
    const topicId = mode === 'topic'
      ? preview.choices.topics.some((candidate) => candidate.id === task.topicId) ? task.topicId : preview.choices.topics[0]?.id
      : undefined;
    const { contextId: _contextId, topicId: _topicId, ...base } = task;
    return { ...base, mode, ...(contextId ? { contextId } : {}), ...(topicId ? { topicId } : {}) };
  };
  const saveSelected = async () => {
    if (!canSaveTasks(tasks, preview) || isSaving) return;
    setError(null);
    setIsSaving(true);
    const failures: Record<string, unknown> = {};
    const succeeded = new Set<string>();
    for (const task of tasks.filter((item) => item.selected)) {
      try {
        const { selected: _selected, ...input } = task;
        await createTask.mutateAsync(input);
        succeeded.add(task.id);
      } catch (nextError) {
        failures[task.id] = nextError;
      }
    }
    setTasks((current) => current.filter((task) => !succeeded.has(task.id)));
    setItemErrors(failures);
    setSavedCount((count) => count + succeeded.size);
    setIsSaving(false);
  };

  const loading = previewMutation.isPending && !preview && !error;
  const valid = canSaveTasks(tasks, preview);
  return (
    <Dialog title={t('forms.aiPreviewTitle')} onClose={onClose} wide>
      <div className="min-w-0 space-y-5">
        <p className="text-sm text-muted">{t('forms.aiPreviewDescription')}</p>
        <p className="rounded-lg border border-border bg-secondary p-3 text-xs text-muted">{t('forms.aiPrivacyNotice')}</p>
        {loading && <p role="status" aria-busy="true" className="rounded-lg border border-border bg-secondary p-4 text-sm text-muted">{tCommon('status.loading')}</p>}
        {Boolean(error) && <div role="alert" className="space-y-3 rounded-lg border border-danger/30 bg-danger/10 p-4 text-sm text-danger"><p>{String(getLocalizedErrorMessage(error, tCommon))}</p><Button type="button" variant="secondary" onClick={generatePreview} icon={RotateCw} iconOnly>{t('actions.retry')}</Button></div>}
        {preview && tasks.length === 0 && savedCount === 0 && <p role="status" className="rounded-lg border border-border bg-secondary p-4 text-sm text-muted">{t('forms.aiEmptyPreview')}</p>}
        {preview && savedCount > 0 && Object.keys(itemErrors).length === 0 && <p role="status" className="rounded-lg border border-primary/30 bg-primary-subtle p-4 text-sm text-foreground">{t('forms.saved')}</p>}
        {Object.keys(itemErrors).length > 0 && <p role="alert" className="rounded-lg border border-danger/30 bg-danger/10 p-4 text-sm text-danger">{t('warnings.partialSave')}</p>}
        {tasks.length > 0 && <div className="min-w-0 space-y-3" aria-label={t('forms.aiPreviewTitle')}>
          {tasks.map((task) => {
            const taskTypeLabel = task.kind === 'LEARN_WORDS' ? t('taskKinds.learn') : task.kind === 'REVIEW_WORDS' ? t('taskKinds.review') : t('taskKinds.grammar');
            const limit = preview ? maxQuantity(task, preview) : 0;
            return <div key={task.id} className="min-w-0 rounded-xl border border-border p-3 sm:p-4">
              <div className="flex items-start gap-3">
                <input className="mt-1 h-5 w-5 accent-primary" type="checkbox" checked={task.selected} onChange={(event) => updateTask(task.id, (current) => ({ ...current, selected: event.target.checked }))} aria-label={t('forms.aiSelectTask', { task: taskTypeLabel, date: task.scheduledDate })} />
                <div className="min-w-0 flex-1 space-y-3">
                  <h3 className="font-semibold text-foreground">{taskTypeLabel}</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="text-sm font-medium text-foreground">{t('forms.scheduledDate')}<input className={controlClass + ' mt-2'} type="date" min={preview?.from} max={preview?.to} value={task.scheduledDate} onChange={(event) => updateTask(task.id, (current) => ({ ...current, scheduledDate: event.target.value }))} /></label>
                    {task.kind === 'LEARN_WORDS' && (
                      <label className="text-sm font-medium text-foreground">
                        {t('forms.mode')}
                        <Select value={task.mode} onValueChange={(mode) => updateTask(task.id, (current) => current.kind === 'LEARN_WORDS' ? changeMode(current, mode as LearningMode) : current)}>
                          <SelectTrigger className="mt-2" aria-label={t('forms.mode')}><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {(['new_words', 'weak_words', 'context', 'topic'] as const).map((mode) => (
                              <SelectItem
                                key={mode}
                                value={mode}
                                disabled={mode === 'context' ? !preview?.choices.contexts.length : mode === 'topic' ? !preview?.choices.topics.length : !preview?.choices.learningModes.some((candidate) => candidate.mode === mode)}
                              >
                                {t(('forms.learningModes.' + mode) as never)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </label>
                    )}
                    {task.kind === 'LEARN_WORDS' && task.mode === 'context' && (
                      <label className="text-sm font-medium text-foreground">
                        {t('forms.context')}
                        <Select value={task.contextId ?? undefined} onValueChange={(contextId) => updateTask(task.id, (current) => current.kind === 'LEARN_WORDS' ? { ...current, contextId } : current)}>
                          <SelectTrigger className="mt-2" aria-label={t('forms.context')}><SelectValue placeholder={t('forms.context')} /></SelectTrigger>
                          <SelectContent>
                            {preview?.choices.contexts.map((candidate) => <SelectItem key={candidate.id} value={candidate.id}>{candidate.title}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </label>
                    )}
                    {task.kind === 'LEARN_WORDS' && task.mode === 'topic' && (
                      <label className="text-sm font-medium text-foreground">
                        {t('forms.topic')}
                        <Select value={task.topicId ?? undefined} onValueChange={(topicId) => updateTask(task.id, (current) => current.kind === 'LEARN_WORDS' ? { ...current, topicId } : current)}>
                          <SelectTrigger className="mt-2" aria-label={t('forms.topic')}><SelectValue placeholder={t('forms.topic')} /></SelectTrigger>
                          <SelectContent>
                            {preview?.choices.topics.map((candidate) => <SelectItem key={candidate.id} value={candidate.id}>{candidate.title}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </label>
                    )}
                    {task.kind === 'GRAMMAR' && (
                      <label className="text-sm font-medium text-foreground">
                        {t('forms.lesson')}
                        <Select value={task.lessonId ?? undefined} onValueChange={(lessonId) => updateTask(task.id, (current) => {
                          if (current.kind !== 'GRAMMAR') return current;
                          const candidate = preview?.choices.grammar.find((item) => item.lessonId === lessonId);
                          return candidate ? { ...current, lessonId: candidate.lessonId, revisionId: candidate.revisionId, revision: candidate.revision } : current;
                        })}>
                          <SelectTrigger className="mt-2" aria-label={t('forms.lesson')}><SelectValue placeholder={t('forms.lesson')} /></SelectTrigger>
                          <SelectContent>
                            {preview?.choices.grammar.map((candidate) => <SelectItem key={candidate.lessonId} value={candidate.lessonId}>{candidate.title}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </label>
                    )}
                    <label className="text-sm font-medium text-foreground">{t('forms.target')}<input className={controlClass + ' mt-2'} type="number" min={1} max={limit || undefined} step={1} value={task.targetCount} disabled={task.kind === 'GRAMMAR'} onChange={(event) => { const next = Number(event.target.value); updateTask(task.id, (current) => ({ ...current, targetCount: Number.isSafeInteger(next) && next > 0 ? Math.min(next, limit || next) : 1 })); }} /></label>
                  </div>
                  {preview && limit > 0 && <p className="text-xs text-muted">{t('forms.aiMaximum', { count: limit })}</p>}
                  {preview && limit === 0 && <p role="alert" className="text-xs text-danger">{t('forms.aiNoAvailability')}</p>}
                  {Boolean(itemErrors[task.id]) && <p role="alert" className="text-sm text-danger">{String(getLocalizedErrorMessage(itemErrors[task.id], tCommon))}</p>}
                </div>
              </div>
            </div>;
          })}
        </div>}
        {tasks.some((task) => task.selected) && preview && !valid && <p role="alert" className="text-sm text-danger">{t('forms.aiInvalidSelection')}</p>}
        <div className="flex flex-col-reverse gap-3 border-t border-border pt-4 sm:flex-row sm:justify-end">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isSaving} icon={X} iconOnly>{tCommon('actions.cancel')}</Button>
          <Button type="button" onClick={() => void saveSelected()} disabled={isSaving || !valid} icon={Save}>{isSaving ? t('actions.saving') : t('forms.saveSelected')}</Button>
        </div>
      </div>
    </Dialog>
  );
}
