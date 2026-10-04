/**
 * @file StudyPreferencesForm.tsx
 * @description Accessible study-day, target, and time-zone preferences form.
 */
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ApiError } from '../../api/client';
import type { StudyPreferencesInput } from '../../api/study.api';
import { getLocalizedErrorMessage } from '../../i18n/presentation';
import { isTimeZone } from '../../utils/calendar-date';
import { useStudyPreferences, useStudyPreferencesMutation } from '../../hooks/useStudyCalendar';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

const controlClass = 'mt-2 min-h-11 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary';
const weekdayDates = ['2026-09-28T12:00:00.000Z', '2026-09-29T12:00:00.000Z', '2026-09-30T12:00:00.000Z', '2026-10-01T12:00:00.000Z', '2026-10-02T12:00:00.000Z', '2026-10-03T12:00:00.000Z', '2026-10-04T12:00:00.000Z'];

type FormState = StudyPreferencesInput;

function browserTimeZone() {
  const value = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return value && isTimeZone(value) ? value : 'UTC';
}

function defaultForm(): FormState {
  return { timeZone: 'UTC', studyDays: [1, 2, 3, 4, 5], learningTarget: 0, reviewTarget: 0, grammarTarget: 0 };
}

function fromPreferences(preferences: StudyPreferencesInput | null | undefined): FormState {
  return preferences ? { ...preferences, studyDays: [...preferences.studyDays] } : defaultForm();
}

export function StudyPreferencesForm({ loadOnMount = true }: { loadOnMount?: boolean }) {
  const { t, i18n } = useTranslation('calendar');
  const { t: tCommon } = useTranslation('common');
  const detectedTimeZone = useMemo(browserTimeZone, []);
  const preferences = useStudyPreferences({ enabled: loadOnMount });
  const mutation = useStudyPreferencesMutation();
  const [form, setForm] = useState<FormState>(() => defaultForm());
  const [dirty, setDirty] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [confirmZoneChange, setConfirmZoneChange] = useState(false);

  useEffect(() => {
    if (!dirty && !preferences.isFetching) setForm(fromPreferences(preferences.data));
  }, [dirty, preferences.data, preferences.isFetching]);

  const weekdayLabels = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(i18n.language, { weekday: 'short', timeZone: 'UTC' });
    return weekdayDates.map((date) => formatter.format(new Date(date)));
  }, [i18n.language]);
  const setField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setDirty(true);
    setSaved(false);
    setForm((current) => ({ ...current, [field]: value }));
  };
  const validTargets = [form.learningTarget, form.reviewTarget].every((value) => Number.isSafeInteger(value) && value >= 0);
  const validForm = isTimeZone(form.timeZone.trim()) && validTargets && (form.grammarTarget === 0 || form.grammarTarget === 1) && form.studyDays.every((day) => Number.isInteger(day) && day >= 1 && day <= 7);

  const save = async () => {
    setConfirmZoneChange(false);
    setError(null);
    try {
      await mutation.mutateAsync({ ...form, timeZone: form.timeZone.trim() });
      setDirty(false);
      setSaved(true);
    } catch (nextError) {
      setError(nextError);
    }
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validForm || mutation.isPending) return;
    if (preferences.data?.timeZone !== form.timeZone.trim() && !confirmZoneChange) {
      setConfirmZoneChange(true);
      return;
    }
    await save();
  };

  if (preferences.isLoading && !preferences.data) return <Card role="status" aria-busy="true" className="p-5 text-sm text-muted">{tCommon('status.loading')}</Card>;
  if (preferences.isError && !preferences.data && !dirty) return <Card role="alert" className="space-y-3 p-5"><p>{t('errors.preferences')}</p><Button type="button" variant="secondary" onClick={() => void preferences.refetch()}>{t('actions.retry')}</Button></Card>;

  return (
    <Card className="min-w-0 p-4 sm:p-6">
      <form className="space-y-5" onSubmit={submit} noValidate>
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">{t('forms.preferencesTitle')}</h2>
          <p className="mt-1 text-sm text-muted">{t('forms.timeZoneHelp')}</p>
        </div>
        {Boolean(error) && <p role="alert" className="rounded-lg border border-danger/30 bg-danger/10 p-3 text-sm text-danger">{String(error instanceof ApiError && error.code === 'CONFLICT' ? t('forms.conflict') : getLocalizedErrorMessage(error, tCommon))}</p>}
        {saved && <p role="status" className="text-sm text-muted">{t('forms.saved')}</p>}
        {confirmZoneChange && <div role="alert" className="min-w-0 rounded-lg border border-primary/40 bg-primary-subtle p-3 text-sm text-foreground"><p>{t('timeZoneWarning')}</p><div className="mt-3 flex flex-wrap gap-2"><Button type="button" variant="secondary" onClick={() => { setForm(fromPreferences(preferences.data)); setDirty(false); setSaved(false); setConfirmZoneChange(false); }}>{tCommon('actions.cancel')}</Button><Button type="button" onClick={() => void save()}>{tCommon('actions.confirm')}</Button></div></div>}
        <label htmlFor="study-time-zone" className="block text-sm font-medium text-foreground">{t('forms.timeZone')}
          <input id="study-time-zone" className={controlClass} value={form.timeZone} onChange={(event) => setField('timeZone', event.target.value)} aria-describedby="study-time-zone-help" required />
        </label>
        <p id="study-time-zone-help" className="text-sm text-muted">{t('forms.timeZoneHelp')}</p>
        {detectedTimeZone !== form.timeZone && <Button type="button" variant="ghost" onClick={() => setField('timeZone', detectedTimeZone)}>{t('forms.suggestTimeZone', { timeZone: detectedTimeZone })}</Button>}
        <div className="grid min-w-0 gap-4 sm:grid-cols-3">
          <NumberField label={t('forms.learnTarget')} value={form.learningTarget} onChange={(value) => setField('learningTarget', value)} />
          <NumberField label={t('forms.reviewTarget')} value={form.reviewTarget} onChange={(value) => setField('reviewTarget', value)} />
          <NumberField label={t('forms.grammarTarget')} value={form.grammarTarget} max={1} onChange={(value) => setField('grammarTarget', value as 0 | 1)} />
        </div>
        <fieldset>
          <legend className="text-sm font-medium text-foreground">{t('forms.weekdays')}</legend>
          <div className="mt-3 grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-7">
            {weekdayLabels.map((label, index) => {
              const day = index + 1;
              return <label key={day} className="flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground"><input className="h-4 w-4 accent-primary" type="checkbox" checked={form.studyDays.includes(day)} onChange={(event) => setField('studyDays', event.target.checked ? [...form.studyDays, day].sort((left, right) => left - right) : form.studyDays.filter((current) => current !== day))} />{label}</label>;
            })}
          </div>
        </fieldset>
        <div className="flex justify-end border-t border-border pt-4">
          <Button type="submit" disabled={mutation.isPending || !validForm}>{mutation.isPending ? t('actions.saving') : tCommon('actions.save')}</Button>
        </div>
      </form>
    </Card>
  );
}

function NumberField({ label, value, max, onChange }: { label: string; value: number; max?: number; onChange: (value: number) => void }) {
  return <label className="block text-sm font-medium text-foreground">{label}<input className={controlClass} type="number" min={0} max={max} step={1} inputMode="numeric" value={value} onChange={(event) => onChange(Number(event.target.value))} /></label>;
}
