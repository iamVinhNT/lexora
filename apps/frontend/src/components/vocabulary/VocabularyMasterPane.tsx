/**
 * @file VocabularyMasterPane.tsx
 * @description Accessible desktop vocabulary result list with keyboard selection and pagination.
 */
import { useTranslation } from 'react-i18next';

import type { Word } from '../../api/vocabulary.api';
import { formatPercent } from '../../i18n/formatters';
import { getLocalizedErrorMessage } from '../../i18n/presentation';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { EmptyState } from '../ui/EmptyState';

type VocabularyMasterPaneProps = {
  words: Word[];
  activeWordId: string | null;
  isLoading: boolean;
  error: Error | null;
  page: number;
  totalPages: number;
  total: number;
  onSelect: (word: Word) => void;
  onRetry: () => void;
  onPage: (page: number) => void;
};

export function VocabularyMasterPane({ words, activeWordId, isLoading, error, page, totalPages, total, onSelect, onRetry, onPage }: VocabularyMasterPaneProps) {
  const { t } = useTranslation('vocabulary');
  const { t: tCommon } = useTranslation('common');
  return <Card data-testid="vocabulary-master-pane" className="flex min-h-0 flex-col overflow-hidden">
    <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-0"><h2 className="text-sm font-semibold leading-5 text-foreground">{t('resultCount', { count: total })}</h2><span className="text-xs text-muted">{t('pageMeta', { page })}</span></div>
    <div role={!isLoading && !error && words.length > 0 ? 'listbox' : undefined} aria-label={!isLoading && !error && words.length > 0 ? t('title') : undefined} data-testid="vocabulary-results" className="min-h-0 flex-1 overflow-y-auto">
      {isLoading && <p className="p-5 text-sm text-muted">{t('loading')}</p>}
      {error && <div className="space-y-4 p-5"><p role="alert" className="text-sm text-foreground">{getLocalizedErrorMessage(error, tCommon)}</p><Button type="button" variant="secondary" onClick={onRetry}>{t('retry')}</Button></div>}
      {!isLoading && !error && words.length === 0 && <EmptyState title={t('noMatch')} description={t('noMatchDescription')} />}
      {!isLoading && !error && words.map((word, index) => <MasterRow key={word.id} word={word} index={index} selected={word.id === activeWordId} words={words} onSelect={onSelect} />)}
    </div>
    {total > 0 && <nav aria-label={t('pagination')} className="flex items-center justify-between border-t border-border p-0.5"><Button type="button" variant="secondary" className="min-h-10" disabled={page <= 1} onClick={() => onPage(page - 1)}>{tCommon('actions.previous')}</Button><span className="text-sm text-muted">{tCommon('pagination.pageOf', { page, totalPages })}</span><Button type="button" variant="secondary" className="min-h-10" disabled={page >= totalPages} onClick={() => onPage(page + 1)}>{tCommon('actions.next')}</Button></nav>}
  </Card>;
}

function MasterRow({ word, index, selected, words, onSelect }: { word: Word; index: number; selected: boolean; words: Word[]; onSelect: (word: Word) => void }) {
  const { t } = useTranslation('vocabulary');
  const move = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const nextIndex = event.key === 'ArrowDown' ? Math.min(index + 1, words.length - 1) : Math.max(index - 1, 0);
      onSelect(words[nextIndex]);
      document.querySelector<HTMLButtonElement>(`[data-word-id="${words[nextIndex].id}"]`)?.focus();
    }
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect(word); }
  };
  return <button type="button" role="option" aria-selected={selected} data-word-id={word.id} onClick={() => onSelect(word)} onKeyDown={move} className={`flex min-h-16 w-full flex-col justify-center border-b border-border px-4 py-2 text-left transition-colors focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${selected ? 'bg-primary-subtle text-foreground' : 'hover:bg-secondary'}`}>
    <span className="flex items-center justify-between gap-3"><span className="truncate font-semibold">{word.word}</span>{word.difficulty && <span className="shrink-0 rounded-full bg-secondary px-2 py-1 text-xs font-semibold text-primary">{word.difficulty}</span>}</span>
    <span className="mt-1 flex min-w-0 items-center justify-between gap-3 text-sm text-muted"><span className="truncate">{[word.partOfSpeech, word.phonetic, word.translation].filter(Boolean).join(' · ') || word.definition}</span>{word.learningProgress && <span className="shrink-0 text-xs">{t(`states.${word.learningProgress.status}`, { defaultValue: word.learningProgress.status })} · {formatPercent(word.learningProgress.recognitionScore)}</span>}</span>
  </button>;
}
