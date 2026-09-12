/**
 * @file ContextFormDialog.tsx
 * @description Native-control create and edit form for learning contexts.
 */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { useCreateContext, useUpdateContext } from '../../hooks/useContexts';
import { CONTEXT_SOURCE_TYPES, type Context, type ContextPayload } from '../../api/context.api';
import type { Word } from '../../api/vocabulary.api';
import { getLocalizedErrorMessage, getLocalizedEnumLabel } from '../../i18n/presentation';

type Props = { context?: Context | null; words: Word[]; onClose: () => void };
type FormState = { title: string; content: string; sourceType: string; sourceUrl: string; wordIds: string[] };
type Errors = Partial<Record<'title' | 'content' | 'sourceType', string>>;
const controlClass = 'mt-2 min-h-11 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary';

function initialState(context?: Context | null): FormState { return { title: context?.title ?? '', content: context?.content ?? '', sourceType: context?.sourceType ?? 'MANUAL', sourceUrl: context?.sourceUrl ?? '', wordIds: context?.words?.map((item) => item.wordId) ?? [] }; }

export function ContextFormDialog({ context, words, onClose }: Props) {
  const { t } = useTranslation('contexts');
  const { t: tCommon } = useTranslation('common');
  const [form, setForm] = useState(() => initialState(context));
  const [errors, setErrors] = useState<Errors>({});
  const createMutation = useCreateContext();
  const updateMutation = useUpdateContext();
  const mutation = context ? updateMutation : createMutation;
  const setField = (field: keyof FormState, value: string | string[]) => setForm((current) => ({ ...current, [field]: value }));
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: Errors = {};
    if (!form.title.trim()) next.title = t('titleRequired');
    if (!form.content.trim()) next.content = t('contentRequired');
    if (!form.sourceType) next.sourceType = t('sourceTypeRequired');
    setErrors(next);
    if (Object.keys(next).length) return;
    const payload: ContextPayload = { title: form.title.trim(), content: form.content.trim(), sourceType: form.sourceType as ContextPayload['sourceType'], sourceUrl: form.sourceUrl.trim() || null, wordIds: form.wordIds };
    const request = context ? updateMutation.mutateAsync({ id: context.id, payload }) : createMutation.mutateAsync(payload);
    request.then(onClose).catch(() => undefined);
  };
  return <Dialog title={context ? t('editTitle', { title: context.title }) : t('addTitle')} onClose={onClose} wide><form onSubmit={submit} className="space-y-5" noValidate>
    <Field id="context-title" label={t('fields.title')} value={form.title} error={errors.title} onChange={(value) => setField('title', value)} />
    <div><label htmlFor="context-content" className="text-sm font-semibold text-foreground">{t('fields.content')}</label><textarea id="context-content" value={form.content} onChange={(event) => setField('content', event.target.value)} rows={7} className={`${controlClass} resize-y`} aria-invalid={Boolean(errors.content)} />{errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}</div>
     <div className="grid gap-4 sm:grid-cols-2"><div><label htmlFor="source-type" className="text-sm font-semibold text-foreground">{t('sourceType')}</label><Select value={form.sourceType} onValueChange={(value) => setField('sourceType', value)}><SelectTrigger id="source-type" aria-label={t('sourceType')} className={controlClass}><SelectValue /></SelectTrigger><SelectContent>{CONTEXT_SOURCE_TYPES.map((type) => <SelectItem key={type} value={type}>{getLocalizedEnumLabel(t, 'sourceTypes', type)}</SelectItem>)}</SelectContent></Select>{errors.sourceType && <p className="mt-1 text-sm text-red-600">{errors.sourceType}</p>}</div><Field id="context-source-url" label={t('fields.sourceUrl')} value={form.sourceUrl} onChange={(value) => setField('sourceUrl', value)} /></div>
    <fieldset><legend className="text-sm font-semibold text-foreground">{t('linkExistingWords')}</legend><div className="mt-2 grid gap-2 sm:grid-cols-2">{words.length ? words.map((word) => <label key={word.id} className="flex min-h-11 items-center gap-3 rounded-lg border border-border px-3 text-sm text-foreground"><input type="checkbox" aria-label={word.word} checked={form.wordIds.includes(word.id)} onChange={(event) => setField('wordIds', event.target.checked ? [...form.wordIds, word.id] : form.wordIds.filter((id) => id !== word.id))} />{word.word}</label>) : <p className="text-sm text-muted">{t('addVocabularyFirst')}</p>}</div></fieldset>
    {mutation.error && <p role="alert" className="text-sm text-red-600">{getLocalizedErrorMessage(mutation.error, tCommon)}</p>}<div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Button type="button" variant="secondary" onClick={onClose}>{t('cancel')}</Button><Button type="submit" disabled={mutation.isPending}>{mutation.isPending ? t('saving') : t('save')}</Button></div>
  </form></Dialog>;
}

function Field({ id, label, value, error, onChange }: { id: string; label: string; value: string; error?: string; onChange: (value: string) => void }) { return <div><label htmlFor={id} className="text-sm font-semibold text-foreground">{label}</label><input id={id} value={value} onChange={(event) => onChange(event.target.value)} className={controlClass} aria-invalid={Boolean(error)} />{error && <p className="mt-1 text-sm text-red-600">{error}</p>}</div>; }
