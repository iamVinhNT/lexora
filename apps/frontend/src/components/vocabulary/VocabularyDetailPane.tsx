/**
 * @file VocabularyDetailPane.tsx
 * @description Desktop inline vocabulary detail with localized loading and empty states.
 */
import { useTranslation } from 'react-i18next';

import type { Word } from '../../api/vocabulary.api';
import { WordDetailContent } from './WordDetailContent';

export function VocabularyDetailPane({ word, onEdit, onDelete }: { word: Word | null; onEdit: () => void; onDelete: () => void }) {
  const { t } = useTranslation('vocabulary');
  return <section role="region" aria-label={t('wordDetails')} className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
    {word ? <WordDetailContent word={word} onEdit={onEdit} onDelete={onDelete} fixedActions /> : <p className="p-5 text-sm text-muted">{t('selectWord')}</p>}
  </section>;
}
