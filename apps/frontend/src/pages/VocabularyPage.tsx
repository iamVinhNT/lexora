/**
 * @file VocabularyPage.tsx
 * @description Vocabulary management route with search, filters, pagination, and CRUD dialogs.
 */
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/Select';
import { VocabularyList } from '../components/vocabulary/VocabularyList';
import { WordDetailDialog } from '../components/vocabulary/WordDetailDialog';
import { WordFormDialog } from '../components/vocabulary/WordFormDialog';
import { useWords } from '../hooks/useVocabulary';
import type { Word } from '../api/vocabulary.api';
import { getLocalizedEnumLabel } from '../i18n/presentation';

const controlClass = 'min-h-11 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary';
const allFilterValue = '__all_filter__';

export function VocabularyPage() {
  const { t } = useTranslation('vocabulary');
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [status, setStatus] = useState('');
  const [tag, setTag] = useState('');
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [editingWord, setEditingWord] = useState<Word | null>(null);
  const query = { search, difficulty, status, tag, page, limit: 20 };
  const wordsQuery = useWords(query);
  const totalPages = wordsQuery.data ? Math.max(1, Math.ceil(wordsQuery.data.total / wordsQuery.data.limit)) : 1;

  return <div className="space-y-8">
     <PageHeader title={t('title')} subtitle={t('subtitle')} action={<Button type="button" onClick={() => setFormOpen(true)}><Plus aria-hidden="true" size={17} />{t('addWord')}</Button>} />
     <CardFilters search={search} difficulty={difficulty} status={status} tag={tag} onSearch={(value) => { setSearch(value); setPage(1); }} onDifficulty={(value) => { setDifficulty(value); setPage(1); }} onStatus={(value) => { setStatus(value); setPage(1); }} onTag={(value) => { setTag(value); setPage(1); }} />
    <VocabularyList isLoading={wordsQuery.isLoading} error={wordsQuery.error} words={wordsQuery.data?.items ?? []} onRetry={() => wordsQuery.refetch()} onDetails={setSelectedWord} />
    {wordsQuery.data && wordsQuery.data.total > 0 && <Pagination page={page} totalPages={totalPages} onPage={setPage} />}
    {formOpen && <WordFormDialog onClose={() => setFormOpen(false)} />}
    {selectedWord && !editingWord && <WordDetailDialog word={selectedWord} onClose={() => setSelectedWord(null)} onEdit={() => setEditingWord(selectedWord)} onDeleted={() => { setSelectedWord(null); }} />}
    {editingWord && <WordFormDialog word={editingWord} onClose={() => { setEditingWord(null); setSelectedWord(null); }} />}
  </div>;
}

function CardFilters({ search, difficulty, status, tag, onSearch, onDifficulty, onStatus, onTag }: { search: string; difficulty: string; status: string; tag: string; onSearch: (value: string) => void; onDifficulty: (value: string) => void; onStatus: (value: string) => void; onTag: (value: string) => void }) {
  const { t } = useTranslation('vocabulary');
  return <section aria-label={t('filters')} className="grid gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-2 lg:grid-cols-4"><div><label htmlFor="word-search" className="text-sm font-semibold text-foreground">{t('search')}</label><input id="word-search" value={search} onChange={(event) => onSearch(event.target.value)} placeholder={t('searchPlaceholder')} className={`${controlClass} mt-2`} /></div><div><label htmlFor="word-difficulty" className="text-sm font-semibold text-foreground">{t('cefrDifficulty')}</label><Select value={difficulty || allFilterValue} onValueChange={(value) => onDifficulty(value === allFilterValue ? '' : value)}><SelectTrigger id="word-difficulty" aria-label={t('cefrDifficulty')} className={`${controlClass} mt-2`}><SelectValue /></SelectTrigger><SelectContent><SelectItem value={allFilterValue}>{t('allLevels')}</SelectItem>{['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((level) => <SelectItem key={level} value={level}>{level}</SelectItem>)}</SelectContent></Select></div><div><label htmlFor="word-status" className="text-sm font-semibold text-foreground">{t('status')}</label><Select value={status || allFilterValue} onValueChange={(value) => onStatus(value === allFilterValue ? '' : value)}><SelectTrigger id="word-status" aria-label={t('status')} className={`${controlClass} mt-2`}><SelectValue /></SelectTrigger><SelectContent><SelectItem value={allFilterValue}>{t('allStatuses')}</SelectItem>{['NEW', 'LEARNING', 'FAMILIAR', 'MASTERED', 'MAINTENANCE'].map((value) => <SelectItem key={value} value={value}>{getLocalizedEnumLabel(t, 'states', value)}</SelectItem>)}</SelectContent></Select></div><div><label htmlFor="word-tag" className="text-sm font-semibold text-foreground">{t('tagFilter')}</label><input id="word-tag" aria-label={t('tagFilter')} value={tag} onChange={(event) => onTag(event.target.value)} placeholder={t('tagPlaceholder')} className={`${controlClass} mt-2`} /></div></section>;
}

function Pagination({ page, totalPages, onPage }: { page: number; totalPages: number; onPage: (page: number) => void }) { const { t } = useTranslation('vocabulary'); const { t: tCommon } = useTranslation('common'); return <nav aria-label={t('pagination')} className="flex items-center justify-between"><Button type="button" variant="secondary" disabled={page <= 1} onClick={() => onPage(page - 1)}>{tCommon('actions.previous')}</Button><span className="text-sm text-muted">{tCommon('pagination.pageOf', { page, totalPages })}</span><Button type="button" variant="secondary" disabled={page >= totalPages} onClick={() => onPage(page + 1)}>{tCommon('actions.next')}</Button></nav>; }
