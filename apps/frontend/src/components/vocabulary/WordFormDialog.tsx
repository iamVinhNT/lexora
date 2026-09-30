/**
 * @file WordFormDialog.tsx
 * @description Localized native-control create and edit form for vocabulary items.
 */
import { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { useCreateWord, useUpdateWord } from '../../hooks/useVocabulary';
import type { Word, WordPayload } from '../../api/vocabulary.api';
import { getLocalizedErrorMessage } from '../../i18n/presentation';
import { speakEnglishWord } from './speech';

type Props = { word?: Word | null; onClose: () => void };
type FormState = { word: string; definition: string; translation: string; phonetic: string; partOfSpeech: string; difficulty: string; tags: string; collocations: string; examples: string };
type Errors = Partial<Record<keyof FormState, string>>;

function initialState(word?: Word | null): FormState {
  return { word: word?.word ?? '', definition: word?.definition ?? '', translation: word?.translation ?? '', phonetic: word?.phonetic ?? '', partOfSpeech: word?.partOfSpeech ?? '', difficulty: word?.difficulty ?? '', tags: word?.tags.map((tag) => tag.name).join(', ') ?? '', collocations: word?.collocations.map((item) => item.phrase).join('\n') ?? '', examples: word?.examples.map((item) => item.sentence).join('\n') ?? '' };
}

function toPayload(form: FormState): WordPayload {
  return { word: form.word.trim(), definition: form.definition.trim(), translation: form.translation.trim() || null, phonetic: form.phonetic.trim() || null, partOfSpeech: form.partOfSpeech.trim() || null, difficulty: form.difficulty.trim() || null, tags: form.tags.split(',').map((item) => item.trim()).filter(Boolean), collocations: form.collocations.split('\n').map((phrase) => phrase.trim()).filter(Boolean), examples: form.examples.split('\n').map((sentence) => sentence.trim()).filter(Boolean) };
}

export function WordFormDialog({ word, onClose }: Props) {
  const { t } = useTranslation('vocabulary');
  const { t: tCommon } = useTranslation('common');
  const [form, setForm] = useState(() => initialState(word));
  const [errors, setErrors] = useState<Errors>({});
  const createMutation = useCreateWord();
  const updateMutation = useUpdateWord();
  const mutation = word ? updateMutation : createMutation;
  const isCreate = !word;
  const canSpeak = Boolean(form.word.trim());
  const setField = (field: keyof FormState, value: string) => setForm((current) => ({ ...current, [field]: value }));

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: Errors = {};
    if (!form.word.trim()) nextErrors.word = t('required', { field: t('fields.word') });
    if (!form.definition.trim()) nextErrors.definition = t('required', { field: t('fields.definition') });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    const payload = toPayload(form);
    const request = word ? updateMutation.mutateAsync({ id: word.id, payload }) : createMutation.mutateAsync(payload);
    request.then(onClose).catch(() => undefined);
  };

  return <Dialog title={word ? t('editTitle', { word: word.word }) : t('addTitle')} onClose={onClose} wide><form onSubmit={submit} className="space-y-5" noValidate>
    <div className="grid gap-4 sm:grid-cols-2">
      <Field
        label={t('fields.word')}
        value={form.word}
        error={errors.word}
        onChange={(value) => setField('word', value)}
        required
        action={isCreate ? (
          <Button
            type="button"
            variant="secondary"
            disabled={!canSpeak}
            aria-label={canSpeak ? t('speakWord', { word: form.word.trim() }) : t('speak')}
            className="min-h-11 min-w-11 shrink-0 px-3 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => speakEnglishWord(form.word)}
          >
            <Volume2 aria-hidden="true" size={18} />
          </Button>
        ) : undefined}
      />
      <Field label={t('fields.definition')} value={form.definition} error={errors.definition} onChange={(value) => setField('definition', value)} required />
      <Field label={t('fields.translation')} value={form.translation} onChange={(value) => setField('translation', value)} />
      <Field label={t('fields.phonetic')} value={form.phonetic} onChange={(value) => setField('phonetic', value)} />
      <Field label={t('fields.partOfSpeech')} value={form.partOfSpeech} onChange={(value) => setField('partOfSpeech', value)} />
      <div><label htmlFor="difficulty" className="text-sm font-semibold text-foreground">{t('fields.difficulty')}</label><Select value={form.difficulty || noDifficultyValue} onValueChange={(value) => setField('difficulty', value === noDifficultyValue ? '' : value)}><SelectTrigger id="difficulty" aria-label={t('fields.difficulty')} className={controlClass}><SelectValue /></SelectTrigger><SelectContent><SelectItem value={noDifficultyValue}>{t('chooseCefr')}</SelectItem>{['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((level) => <SelectItem key={level} value={level}>{level}</SelectItem>)}</SelectContent></Select></div>
    </div>
    <TextAreaField label={t('fields.tags')} hint={tCommon('hints.commaSeparated')} value={form.tags} onChange={(value) => setField('tags', value)} /><TextAreaField label={t('fields.collocations')} hint={tCommon('hints.onePhrasePerLine')} value={form.collocations} onChange={(value) => setField('collocations', value)} /><TextAreaField label={t('fields.examples')} hint={tCommon('hints.oneSentencePerLine')} value={form.examples} onChange={(value) => setField('examples', value)} />
     {mutation.error && <p role="alert" className="text-sm text-danger">{getLocalizedErrorMessage(mutation.error, tCommon)}</p>}<div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Button type="button" variant="secondary" onClick={onClose}>{t('cancel')}</Button><Button type="submit" disabled={mutation.isPending}>{mutation.isPending ? t('saving') : t('save')}</Button></div>
  </form></Dialog>;
}

const controlClass = 'mt-2 min-h-11 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary';
const noDifficultyValue = '__no_difficulty__';

function Field({ label, value, error, onChange, required = false, action }: { label: string; value: string; error?: string; onChange: (value: string) => void; required?: boolean; action?: React.ReactNode }) {
  const id = label.toLowerCase().replaceAll(' ', '-');
  const inputEl = <input id={id} value={value} onChange={(event) => onChange(event.target.value)} className={action ? controlClass.replace('mt-2 ', '') : controlClass} required={required} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} />;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-foreground">{label}{required && <span aria-hidden="true"> *</span>}</label>
      {action ? <div className="mt-2 flex items-center gap-2">{inputEl}{action}</div> : inputEl}
      {error && <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-danger">{error}</p>}
    </div>
  );
}

function TextAreaField({ label, hint, value, onChange }: { label: string; hint: string; value: string; onChange: (value: string) => void }) {
  const id = label.toLowerCase().replaceAll(' ', '-');
  const hintId = `${id}-hint`;
  return <div><label htmlFor={id} className="text-sm font-semibold text-foreground">{label}</label><span id={hintId} className="ml-2 text-xs text-muted">({hint})</span><textarea id={id} value={value} onChange={(event) => onChange(event.target.value)} rows={3} className={`${controlClass} resize-y`} aria-describedby={hintId} /></div>;
}
