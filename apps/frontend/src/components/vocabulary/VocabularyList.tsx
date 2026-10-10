/**
 * @file VocabularyList.tsx
 * @description Localized vocabulary result cards and truthful list states.
 */
import { Eye, RotateCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { Word } from '../../api/vocabulary.api';
import { getLocalizedErrorMessage } from '../../i18n/presentation';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { EmptyState } from '../ui/EmptyState';

type Props = { isLoading: boolean; error: Error | null; words: Word[]; onRetry: () => void; onDetails: (word: Word) => void };

export function VocabularyList({ isLoading, error, words, onRetry, onDetails }: Props) {
  const { t } = useTranslation('vocabulary');
  const { t: tCommon } = useTranslation('common');
  if (isLoading) return <Card><p role="status" className="p-6 text-sm text-muted">{t('loading')}</p></Card>;
  if (error) return <Card><div className="space-y-4 p-6"><p role="alert" className="text-sm text-foreground">{getLocalizedErrorMessage(error, tCommon)}</p><Button type="button" variant="secondary" onClick={onRetry} icon={RotateCw} iconOnly>{t('retry')}</Button></div></Card>;
  if (words.length === 0) return <Card><EmptyState title={t('noMatch')} description={t('noMatchDescription')} /></Card>;
  return <Card><div className="divide-y divide-border">{words.map((word) => <article key={word.id} aria-label={word.word} className="flex items-center gap-3 px-4 py-3 sm:px-5"><div className="min-w-0 flex-1"><div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1"><h2 className="min-w-0 break-words text-base font-semibold text-foreground">{word.word}</h2>{word.partOfSpeech && <span className="max-w-full whitespace-normal break-words text-xs text-muted">{word.partOfSpeech}</span>}{word.difficulty && <span className="shrink-0 rounded-full bg-primary-subtle px-2 py-0.5 text-xs font-semibold text-primary">{word.difficulty}</span>}</div><p className="mt-0.5 break-words text-sm text-muted">{word.definition}</p><div className="mt-1 flex min-w-0 flex-wrap gap-1 text-xs text-muted">{word.tags.map((tag) => <span key={tag.id} className="max-w-full whitespace-normal break-words rounded-full bg-secondary px-2 py-0.5">{tag.name}</span>)}{word.learningProgress && <span className="max-w-full whitespace-normal break-words rounded-full bg-secondary px-2 py-0.5">{t(`states.${word.learningProgress.status}`, { defaultValue: word.learningProgress.status })}</span>}</div></div><Button type="button" variant="ghost" aria-label={t('detailsFor', { word: word.word })} className="min-h-11 min-w-11 shrink-0 px-3" onClick={() => onDetails(word)} icon={Eye} iconOnly /></article>)}</div></Card>;
}
