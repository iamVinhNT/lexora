/**
 * @file WordDetailDialog.tsx
 * @description Localized vocabulary detail, progress, review, and delete dialogs.
 */
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import type { Word } from '../../api/vocabulary.api';
import { formatDate, formatPercent } from '../../i18n/formatters';
import { getLocalizedErrorMessage } from '../../i18n/presentation';
import { useDeleteWord, useWord } from '../../hooks/useVocabulary';
import { Button } from '../ui/Button';
import { Dialog } from '../ui/Dialog';

type DetailProps = { word: Word; onClose: () => void; onEdit: () => void; onDeleted: () => void };

export function WordDetailDialog({ word, onClose, onEdit, onDeleted }: DetailProps) {
  const { t } = useTranslation('vocabulary');
  const { t: tCommon } = useTranslation('common');
  const detailQuery = useWord(word.id);
  const activeWord = detailQuery.data ?? word;
  const deleteMutation = useDeleteWord();
  const [confirming, setConfirming] = React.useState(false);
  if (confirming) return <DeleteWordDialog word={activeWord} onClose={() => setConfirming(false)} onDeleted={onDeleted} mutation={deleteMutation} />;
  const progress = activeWord.learningProgress;
  return <Dialog title={activeWord.word} onClose={onClose} wide><div className="space-y-6">
    <div><p className="text-lg text-foreground">{activeWord.definition}</p>{activeWord.translation && <p className="mt-1 text-sm text-muted">{activeWord.translation}</p>}<p className="mt-2 text-sm text-muted">{[activeWord.partOfSpeech, activeWord.phonetic, activeWord.difficulty].filter(Boolean).join(' · ')}</p></div>
    <DetailList title={t('wordFamilies')} items={activeWord.wordFamilies.map((item) => `${item.word.word} (${item.relationship})`)} empty={t('noWordFamilies')} />
    <DetailList title={tCommon('labels.collocations')} items={activeWord.collocations.map((item) => item.phrase)} empty={t('noCollocations')} />
    <DetailList title={tCommon('labels.examples')} items={activeWord.examples.map((item) => item.sentence)} empty={t('noExamples')} />
    <DetailList title={tCommon('labels.contexts')} items={activeWord.contexts.map((item) => item.title)} empty={t('noContexts')} />
    <section aria-labelledby="progress-title"><h3 id="progress-title" className="font-semibold text-foreground">{t('progress3d')}</h3>{progress ? <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm"><Score label={t('scores.recognition')} value={progress.recognitionScore} /><Score label={t('scores.recall')} value={progress.recallScore} /><Score label={t('scores.production')} value={progress.productionScore} /></div> : <p className="mt-2 text-sm text-muted">{t('noProgress')}</p>}</section>
    <section><h3 className="font-semibold text-foreground">{t('reviewState')}</h3>{activeWord.reviewState ? <p className="mt-2 text-sm text-muted">{t('due', { date: formatDate(activeWord.reviewState.dueAt), repetitions: activeWord.reviewState.repetitions, lapses: activeWord.reviewState.lapses })}</p> : <p className="mt-2 text-sm text-muted">{t('noReviewState')}</p>}</section>
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Button type="button" variant="secondary" onClick={onEdit}>{tCommon('actions.editWord')}</Button><Button type="button" variant="ghost" onClick={() => setConfirming(true)}>{tCommon('actions.deleteWord')} {activeWord.word}</Button></div>
  </div></Dialog>;
}

function DeleteWordDialog({ word, onClose, onDeleted, mutation }: { word: Word; onClose: () => void; onDeleted: () => void; mutation: ReturnType<typeof useDeleteWord> }) {
  const { t } = useTranslation('vocabulary');
  const { t: tCommon } = useTranslation('common');
  const confirm = () => mutation.mutateAsync(word.id).then(onDeleted).catch(() => undefined);
  const error = mutation.error;
  return <Dialog title={t('deleteTitle')} onClose={onClose}><div className="space-y-5"><p className="text-sm leading-6 text-muted">{t('deleteDescription', { word: word.word })}</p>{error && <p role="alert" className="text-sm text-foreground">{getLocalizedErrorMessage(error, tCommon)}</p>}<div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Button type="button" variant="secondary" onClick={onClose}>{t('cancel')}</Button><Button type="button" onClick={confirm} disabled={mutation.isPending}>{mutation.isPending ? t('deleting') : t('confirmDelete')}</Button></div></div></Dialog>;
}

function DetailList({ title, items, empty }: { title: string; items: string[]; empty: string }) {
  return <section><h3 className="font-semibold text-foreground">{title}</h3>{items.length ? <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">{items.map((item) => <li key={item}>{item}</li>)}</ul> : <p className="mt-2 text-sm text-muted">{empty}</p>}</section>;
}

function Score({ label, value }: { label: string; value: number }) {
  return <div className="rounded-lg bg-secondary p-3"><div className="font-semibold text-foreground">{formatPercent(value)}</div><div className="mt-1 text-xs text-muted">{label}</div></div>;
}
