/**
 * @file VocabularyViews.tsx
 * @description Accessible mode controls and alternate vocabulary result presentations.
 */
import { useState } from 'react';
import { Grid2X2, List, Table2, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { Word } from '../../api/vocabulary.api';
import { formatPercent } from '../../i18n/formatters';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { VocabularyList } from './VocabularyList';

type ViewMode = 'list' | 'card' | 'table';
type VocabularyViewProps = {
  isLoading: boolean;
  error: Error | null;
  words: Word[];
  onRetry: () => void;
  onDetails: (word: Word) => void;
};

const modes: Array<{ value: ViewMode; icon: typeof List; labelKey: 'listView' | 'cardView' | 'tableView' }> = [
  { value: 'list', icon: List, labelKey: 'listView' },
  { value: 'card', icon: Grid2X2, labelKey: 'cardView' },
  { value: 'table', icon: Table2, labelKey: 'tableView' },
];

export function VocabularyViews({ isLoading, error, words, onRetry, onDetails }: VocabularyViewProps) {
  const { t } = useTranslation('vocabulary');
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  return (
    <>
      <div role="group" aria-label={t('viewModes')} className="flex flex-wrap gap-2">
        {modes.map(({ value, icon: Icon, labelKey }) => (
          <Button
            key={value}
            type="button"
            variant={viewMode === value ? 'primary' : 'secondary'}
            aria-pressed={viewMode === value}
            aria-label={t(labelKey)}
            onClick={() => setViewMode(value)}
            className="min-w-11 px-3"
            icon={Icon}
            iconOnly
          >
          </Button>
        ))}
      </div>
      <div data-testid="vocabulary-results" className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto pr-1">
        {viewMode === 'list' && <VocabularyList isLoading={isLoading} error={error} words={words} onRetry={onRetry} onDetails={onDetails} />}
        {viewMode === 'card' && <CardView isLoading={isLoading} error={error} words={words} onRetry={onRetry} onDetails={onDetails} />}
        {viewMode === 'table' && <TableView isLoading={isLoading} error={error} words={words} onRetry={onRetry} onDetails={onDetails} />}
      </div>
    </>
  );
}

type ResultViewProps = VocabularyViewProps;

function CardView({ isLoading, error, words, onRetry, onDetails }: ResultViewProps) {
  const { t } = useTranslation('vocabulary');
  if (isLoading || error || words.length === 0) return <VocabularyList isLoading={isLoading} error={error} words={words} onRetry={onRetry} onDetails={onDetails} />;

  return (
    <section aria-label={t('cardView')} className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {words.map((word) => (
        <Card key={word.id} className="flex h-full flex-col gap-3 p-4">
          <article aria-label={word.word} className="flex h-full flex-col gap-3">
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="truncate text-lg font-semibold text-foreground">{word.word}</h2>
                  <p className="mt-1 break-words text-xs text-muted">{[word.partOfSpeech, word.difficulty].filter(Boolean).join(' · ')}</p>
                </div>
                <Button type="button" variant="ghost" aria-label={t('detailsFor', { word: word.word })} className="min-h-11 min-w-11 shrink-0 px-3" onClick={() => onDetails(word)} icon={Eye} iconOnly />
              </div>
              <p className="mt-2 text-sm leading-6 text-foreground">{word.definition}</p>
            </div>
            {word.learningProgress ? (
              <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                <div className="rounded-lg bg-secondary px-1.5 py-2"><div className="font-semibold text-foreground">{formatPercent(word.learningProgress.recognitionScore)}</div><div className="mt-0.5 text-muted">{t('scores.recognition')}</div></div>
                <div className="rounded-lg bg-secondary px-1.5 py-2"><div className="font-semibold text-foreground">{formatPercent(word.learningProgress.recallScore)}</div><div className="mt-0.5 text-muted">{t('scores.recall')}</div></div>
                <div className="rounded-lg border border-accent bg-accent/10 px-1.5 py-2"><div className="font-semibold text-foreground">{formatPercent(word.learningProgress.productionScore)}</div><div className="mt-0.5 text-foreground">{t('scores.production')}</div></div>
              </div>
            ) : <p className="text-xs text-muted">{t('noProgress')}</p>}
          </article>
        </Card>
      ))}
    </section>
  );
}

function TableView({ isLoading, error, words, onRetry, onDetails }: ResultViewProps) {
  const { t } = useTranslation('vocabulary');
  if (isLoading || error || words.length === 0) return <VocabularyList isLoading={isLoading} error={error} words={words} onRetry={onRetry} onDetails={onDetails} />;

  return (
    <Card className="overflow-hidden" aria-label={t('tableView')}>
      <div role="region" aria-label={t('vocabularyTable')} tabIndex={0} className="overflow-x-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary">
        <table className="w-full min-w-[40rem] text-left text-sm" aria-label={t('vocabularyTable')}>
          <caption className="sr-only">{t('vocabularyTable')}</caption>
          <thead className="border-b border-border text-muted">
            <tr>
              <th scope="col" className="px-4 py-3">{t('tableWord')}</th>
              <th scope="col" className="px-4 py-3">{t('tableDefinition')}</th>
              <th scope="col" className="px-4 py-3">{t('tablePartOfSpeech')}</th>
              <th scope="col" className="px-4 py-3">{t('tableDifficulty')}</th>
              <th scope="col" className="px-4 py-3">{t('tableActions')}</th>
            </tr>
          </thead>
          <tbody>
            {words.map((word) => (
              <tr key={word.id} className="border-b border-border last:border-0">
                <th scope="row" className="px-4 py-4 font-semibold text-foreground">{word.word}</th>
                <td className="max-w-[18rem] px-4 py-4 text-muted">{word.definition}</td>
                <td className="px-4 py-4 text-muted">{word.partOfSpeech || '—'}</td>
                <td className="px-4 py-4 text-muted">{word.difficulty || '—'}</td>
                <td className="px-4 py-4"><Button type="button" variant="secondary" aria-label={t('detailsFor', { word: word.word })} className="min-w-11 px-3" onClick={() => onDetails(word)} icon={Eye} iconOnly /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
