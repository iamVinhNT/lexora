/**
 * @file VocabularyDetailPane.tsx
 * @description Desktop inline vocabulary detail with localized loading and empty states.
 */
import { useTranslation } from 'react-i18next';

import type { Word } from '../../api/vocabulary.api';
import { WordDetailContent } from './WordDetailContent';

export function VocabularyDetailPane({ word, onEdit, onDelete }: { word: Word | null; onEdit: () => void; onDelete: () => void }) {
  const { t } = useTranslation('vocabulary');
  return <section role="region" aria-label={t('wordDetails')} className="min-h-0 overflow-y-auto rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-7">
    {word ? <WordDetailContent word={word} onEdit={onEdit} onDelete={onDelete} /> : <p className="text-sm text-muted">{t('selectWord')}</p>}
  </section>;
}
