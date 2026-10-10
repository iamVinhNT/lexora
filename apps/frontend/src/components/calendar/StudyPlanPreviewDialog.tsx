/**
 * @file StudyPlanPreviewDialog.tsx
 * @description Read-only preview request and stable-ID partial-save flow for suggested tasks.
 */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { StudyPlanPreview, StudyTaskInput } from '../../api/study.api';
import { isCivilDate } from '../../utils/calendar-date';
import { getLocalizedErrorMessage } from '../../i18n/presentation';
import { useStudyPlanPreview, useStudyTaskMutations } from '../../hooks/useStudyCalendar';
import { Button } from '../ui/Button';
import { Dialog } from '../ui/Dialog';
import { RotateCw, Save, X } from 'lucide-react';

type Props = { onClose: () => void };
type PreviewTask = StudyTaskInput & { selected: boolean };

const controlClass = 'min-h-11 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary';

function taskLabel(task: StudyTaskInput, t: (key: string) => string) {
  if (task.kind === 'LEARN_WORDS') return t('taskKinds.learn');
  if (task.kind === 'REVIEW_WORDS') return t('taskKinds.review');
  return t('taskKinds.grammar');
}

export function StudyPlanPreviewDialog({ onClose }: Props) {
  const { t } = useTranslation('calendar');
  const { t: tCommon } = useTranslation('common');
  const previewMutation = useStudyPlanPreview();
  const { createTask } = useStudyTaskMutations();
  const [preview, setPreview] = useState<StudyPlanPreview | null>(null);
  const [tasks, setTasks] = useState<PreviewTask[]>([]);
  const [error, setError] = useState<unknown>(null);
  const [itemErrors, setItemErrors] = useState<Record<string, unknown>>({});
  const [savedCount, setSavedCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    void previewMutation.mutateAsync().then((result) => {
      setPreview(result);
      setTasks(result.tasks.map((task) => ({ ...task, selected: true })));
    }).catch(setError);
  }, []);

  const updateTask = (id: string, update: Partial<PreviewTask>) => setTasks((current) => current.map((task) => task.id === id ? ({ ...task, ...update } as PreviewTask) : task));
  const saveSelected = async () => {
    const selected = tasks.filter((task) => task.selected);
    if (!selected.length || isSaving) return;
    setError(null);
    setIsSaving(true);
    const failures: Record<string, unknown> = {};
    const succeeded = new Set<string>();
    for (const task of selected) {
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
  const canSave = tasks.some((task) => task.selected) && tasks.filter((task) => task.selected).every((task) => isCivilDate(task.scheduledDate) && Number.isSafeInteger(task.targetCount) && task.targetCount > 0);
  const loading = previewMutation.isPending && !preview && !error;
  return (
    <Dialog title={t('forms.previewTitle')} onClose={onClose} wide>
      <div className="min-w-0 space-y-5">
        <p className="text-sm text-muted">{t('forms.previewDescription')}</p>
        {loading && <p role="status" aria-busy="true" className="rounded-lg border border-border bg-secondary p-4 text-sm text-muted">{tCommon('status.loading')}</p>}
        {Boolean(error) && <div role="alert" className="space-y-3 rounded-lg border border-danger/30 bg-danger/10 p-4 text-sm text-danger"><p>{String(getLocalizedErrorMessage(error, tCommon))}</p><Button type="button" variant="secondary" onClick={() => { setError(null); void previewMutation.mutateAsync().then((result) => { setPreview(result); setTasks(result.tasks.map((task) => ({ ...task, selected: true }))); }).catch(setError); }} icon={RotateCw} iconOnly>{t('actions.retry')}</Button></div>}
        {preview && preview.warnings.length > 0 && <div role="status" className="space-y-2 rounded-lg border border-border bg-secondary p-4 text-sm text-muted">{preview.warnings.map((warning, index) => <p key={`${warning.code}-${index}`}>{t(`warnings.preview.${warning.code}`)}</p>)}</div>}
        {preview && tasks.length === 0 && savedCount === 0 && <p role="status" className="rounded-lg border border-border bg-secondary p-4 text-sm text-muted">{t('forms.emptyPreview')}</p>}
        {preview && tasks.length === 0 && savedCount > 0 && Object.keys(itemErrors).length === 0 && <p role="status" className="rounded-lg border border-primary/30 bg-primary-subtle p-4 text-sm text-foreground">{t('forms.saved')}</p>}
        {Object.keys(itemErrors).length > 0 && <p role="alert" className="rounded-lg border border-danger/30 bg-danger/10 p-4 text-sm text-danger">{t('warnings.partialSave')}</p>}
        {tasks.length > 0 && <div className="min-w-0 space-y-3" aria-label={t('forms.previewTitle')}>
          {tasks.map((task) => <div key={task.id} className="min-w-0 rounded-xl border border-border p-3 sm:p-4">
            <div className="flex items-start gap-3">
              <input className="mt-1 h-5 w-5 accent-primary" type="checkbox" checked={task.selected} onChange={(event) => updateTask(task.id, { selected: event.target.checked })} aria-label={taskLabel(task, (key) => t(key as never))} />
              <div className="min-w-0 flex-1 space-y-3">
                <p className="font-semibold text-foreground">{taskLabel(task, (key) => t(key as never))}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="text-sm font-medium text-foreground">{t('forms.scheduledDate')}<input className={`${controlClass} mt-2`} type="date" value={task.scheduledDate} onChange={(event) => updateTask(task.id, { scheduledDate: event.target.value })} /></label>
                  <label className="text-sm font-medium text-foreground">{t('forms.target')}<input className={`${controlClass} mt-2`} type="number" min={1} step={1} value={task.targetCount} disabled={task.kind === 'GRAMMAR'} onChange={(event) => { const next = Number(event.target.value); updateTask(task.id, { targetCount: Number.isSafeInteger(next) && next > 0 ? next : 1 }); }} /></label>
                </div>
                {Boolean(itemErrors[task.id]) && <p role="alert" className="text-sm text-danger">{String(getLocalizedErrorMessage(itemErrors[task.id], tCommon))}</p>}
              </div>
            </div>
          </div>)}
        </div>}
        <div className="flex flex-col-reverse gap-3 border-t border-border pt-4 sm:flex-row sm:justify-end">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isSaving} icon={X} iconOnly>{tCommon('actions.cancel')}</Button>
          <Button type="button" onClick={() => void saveSelected()} disabled={isSaving || !canSave} icon={Save}>{isSaving ? t('actions.saving') : t('forms.saveSelected')}</Button>
        </div>
      </div>
    </Dialog>
  );
}
