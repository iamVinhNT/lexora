/**
 * @file WordDetailContent.tsx
 * @description Shared presentation for vocabulary detail fields, progress, review metadata, and actions.
 */
import { Pencil, Trash2, Volume2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { Word } from '../../api/vocabulary.api';
import { formatDate, formatPercent } from '../../i18n/formatters';
import { Button } from '../ui/Button';
import { speakEnglishWord } from './speech';

type WordDetailContentProps = {
  word: Word;
  onEdit: () => void;
  onDelete: () => void;
  fixedActions?: boolean;
  hideHeading?: boolean;
};

export function WordDetailContent({ word, onEdit, onDelete, fixedActions = true, hideHeading = false }: WordDetailContentProps) {
  const { t } = useTranslation('vocabulary');
  const { t: tCommon } = useTranslation('common');
  const progress = word.learningProgress;

  return (
    <div className={`min-w-0 ${fixedActions ? 'flex min-h-0 flex-1 flex-col overflow-hidden' : 'space-y-6'}`}>
      <div className={fixedActions ? 'shrink-0 border-b border-border px-5 py-4 sm:px-7' : undefined}>
        <div className={`flex items-center ${hideHeading ? 'justify-end' : 'gap-3'}`}>
          {!hideHeading && <h2 className="min-w-0 break-words text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{word.word}</h2>}
          <Button
            type="button"
            variant="ghost"
            aria-label={t('speakWord', { word: word.word })}
            className="min-h-11 min-w-11 px-3"
            onClick={() => speakEnglishWord(word.word)}
          >
            <Volume2 aria-hidden="true" size={20} />
          </Button>
        </div>
        <p className="mt-2 break-words text-lg text-foreground">{word.definition}</p>
        {word.translation && <p className="mt-1 break-words text-sm text-muted">{word.translation}</p>}
        <p className="mt-2 break-words text-sm text-muted">{[word.partOfSpeech, word.phonetic, word.difficulty].filter(Boolean).join(' · ')}</p>
      </div>
      <div data-testid={fixedActions ? 'word-detail-scroll-area' : undefined} className={fixedActions ? 'min-h-0 flex-1 overflow-y-auto space-y-6 px-5 py-5 sm:px-7 pr-1' : 'space-y-6'}>
        <DetailList title={t('wordFamilies')} items={word.wordFamilies.map((item) => `${item.word.word} (${item.relationship})`)} empty={t('noWordFamilies')} />
      <DetailList title={tCommon('labels.collocations')} items={word.collocations.map((item) => item.phrase)} empty={t('noCollocations')} />
      <DetailList title={tCommon('labels.examples')} items={word.examples.map((item) => item.sentence)} empty={t('noExamples')} />
      <DetailList title={tCommon('labels.contexts')} items={word.contexts.map((item) => item.title)} empty={t('noContexts')} />
      <section aria-labelledby="progress-title">
        <h3 id="progress-title" className="font-semibold text-foreground">{t('progress3d')}</h3>
        {progress ? (
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
            <Score label={t('scores.recognition')} value={progress.recognitionScore} />
            <Score label={t('scores.recall')} value={progress.recallScore} />
            <Score label={t('scores.production')} value={progress.productionScore} emphasized />
          </div>
        ) : <p className="mt-2 text-sm text-muted">{t('noProgress')}</p>}
      </section>
      <section>
        <h3 className="font-semibold text-foreground">{t('reviewState')}</h3>
        {word.reviewState ? <p className="mt-2 text-sm text-muted">{t('due', { date: formatDate(word.reviewState.dueAt), repetitions: word.reviewState.repetitions, lapses: word.reviewState.lapses })}</p> : <p className="mt-2 text-sm text-muted">{t('noReviewState')}</p>}
      </section>
      </div>
      <div className={`${fixedActions ? 'shrink-0 border-t border-border bg-surface p-3 pt-4 sm:px-7' : ''} flex flex-row justify-end gap-3`}>
        <Button type="button" variant="secondary" aria-label={tCommon('actions.editWord')} className="min-h-11 min-w-11 px-3" onClick={onEdit}><Pencil aria-hidden="true" size={18} /></Button>
        <Button type="button" variant="ghost" aria-label={`${tCommon('actions.deleteWord')} ${word.word}`} className="min-h-11 min-w-11 px-3" onClick={onDelete}><Trash2 aria-hidden="true" size={18} /></Button>
      </div>
    </div>
  );
}

function DetailList({ title, items, empty }: { title: string; items: string[]; empty: string }) {
  return <section><h3 className="font-semibold text-foreground">{title}</h3>{items.length ? <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">{items.map((item) => <li className="break-words" key={item}>{item}</li>)}</ul> : <p className="mt-2 text-sm text-muted">{empty}</p>}</section>;
}

function Score({ label, value, emphasized = false }: { label: string; value: number; emphasized?: boolean }) {
  return <div className={`rounded-lg border p-3 ${emphasized ? 'border-accent bg-accent/10' : 'border-transparent bg-secondary'}`}><div className="font-semibold text-foreground">{formatPercent(value)}</div><div className={`mt-1 text-xs ${emphasized ? 'text-foreground' : 'text-muted'}`}>{label}</div></div>;
}
