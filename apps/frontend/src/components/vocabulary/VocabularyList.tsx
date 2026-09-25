/**
 * @file VocabularyList.tsx
 * @description Localized vocabulary result cards and truthful list states.
 */
import { Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { Word } from '../../api/vocabulary.api';
import { formatPercent } from '../../i18n/formatters';
import { getLocalizedErrorMessage } from '../../i18n/presentation';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { EmptyState } from '../ui/EmptyState';

type Props = { isLoading: boolean; error: Error | null; words: Word[]; onRetry: () => void; onDetails: (word: Word) => void };

export function VocabularyList({ isLoading, error, words, onRetry, onDetails }: Props) {
  const { t } = useTranslation('vocabulary');
  const { t: tCommon } = useTranslation('common');
  if (isLoading) return <Card><p role="status" className="p-6 text-sm text-muted">{t('loading')}</p></Card>;
  if (error) return <Card><div className="space-y-4 p-6"><p role="alert" className="text-sm text-foreground">{getLocalizedErrorMessage(error, tCommon)}</p><Button type="button" variant="secondary" onClick={onRetry}>{t('retry')}</Button></div></Card>;
  if (words.length === 0) return <Card><EmptyState title={t('noMatch')} description={t('noMatchDescription')} /></Card>;
  return <Card><div className="divide-y divide-border">{words.map((word) => <article key={word.id} aria-label={word.word} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h2 className="text-lg font-semibold text-foreground">{word.word}</h2>{word.partOfSpeech && <span className="text-sm text-muted">{word.partOfSpeech}</span>}{word.difficulty && <span className="rounded-full bg-primary-subtle px-2 py-1 text-xs font-semibold text-primary">{word.difficulty}</span>}</div><p className="mt-1 text-sm text-muted">{word.definition}</p><div className="mt-3 flex flex-wrap gap-2 text-xs text-muted">{word.tags.map((tag) => <span key={tag.id} className="rounded-full bg-secondary px-2 py-1">{tag.name}</span>)}{word.learningProgress && <span className="rounded-full bg-secondary px-2 py-1">{t(`states.${word.learningProgress.status}`, { defaultValue: word.learningProgress.status })}</span>}{word.learningProgress && <span className="rounded-full bg-secondary px-2 py-1">{t('scoreSummary', { recognition: formatPercent(word.learningProgress.recognitionScore), recall: formatPercent(word.learningProgress.recallScore), production: formatPercent(word.learningProgress.productionScore) })}</span>}</div></div><Button type="button" variant="secondary" aria-label={t('detailsFor', { word: word.word })} className="min-w-11 px-3" onClick={() => onDetails(word)}><Eye aria-hidden="true" size={18} /></Button></article>)}</div></Card>;
}
