/**
 * @file VocabularyPage.tsx
 * @description Responsive vocabulary management route with desktop master-detail and mobile dialogs.
 */
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { VocabularyViews } from '../components/vocabulary/VocabularyViews';
import { VocabularyToolbar } from '../components/vocabulary/VocabularyToolbar';
import { VocabularyMasterPane } from '../components/vocabulary/VocabularyMasterPane';
import { VocabularyDetailPane } from '../components/vocabulary/VocabularyDetailPane';
import { WordDetailDialog } from '../components/vocabulary/WordDetailDialog';
import { WordFormDialog } from '../components/vocabulary/WordFormDialog';
import { useWords } from '../hooks/useVocabulary';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import type { Word } from '../api/vocabulary.api';
import { useAiAssistantStore } from '../stores/ai-assistant.store';

const totalLimit = 20;

export function VocabularyPage() {
  const { t } = useTranslation('vocabulary');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [status, setStatus] = useState('');
  const [tag, setTag] = useState('');
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedWordId, setSelectedWordId] = useState<string | null>();
  const [detailWord, setDetailWord] = useState<Word | null>(null);
  const [editingWord, setEditingWord] = useState<Word | null>(null);
  const debouncedSearch = useDebouncedValue(search);
  const debouncedTag = useDebouncedValue(tag);
  const query = { search: debouncedSearch, difficulty, status, tag: debouncedTag, page, limit: totalLimit };
  const wordsQuery = useWords(query);
  const words = wordsQuery.data?.items ?? [];
  const selectedWord = selectedWordId === null ? null : words.find((word) => word.id === selectedWordId) ?? words[0] ?? null;
  const [cachedTotal, setCachedTotal] = useState(0);
  useEffect(() => {
    if (wordsQuery.data?.total !== undefined) {
      setCachedTotal(wordsQuery.data.total);
    }
  }, [wordsQuery.data?.total]);
  const total = wordsQuery.data?.total ?? cachedTotal;
  const totalPages = total > 0 ? Math.max(1, Math.ceil(total / totalLimit)) : 1;

  const resetPage = (setter: (value: string) => void, value: string) => { setter(value); setPage(1); };
  const clearDeleted = () => { setSelectedWordId(null); setDetailWord(null); };
  const editSelected = () => setEditingWord(isDesktop ? selectedWord : detailWord);

  const registerAiContext = useAiAssistantStore((state) => state.registerContext);
  const activeWordForAi = isDesktop ? selectedWord : detailWord;

  useEffect(() => {
    if (!activeWordForAi?.id) return;
    return registerAiContext({
      kind: 'word',
      wordId: activeWordForAi.id,
    }, activeWordForAi.word);
  }, [activeWordForAi?.id, activeWordForAi?.word, registerAiContext]);
  return <div data-testid="vocabulary-page" className="flex min-h-0 flex-col gap-4 lg:h-[calc(100dvh-6rem)] lg:gap-4 lg:[&>header>div>p]:hidden">
    <PageHeader title={t('title')} subtitle={t('subtitle')} action={<Button type="button" onClick={() => setFormOpen(true)} className="min-h-11 min-w-11 gap-2 px-3"><Plus aria-hidden="true" size={17} /><span>{t('addWord')}</span></Button>} />
    <VocabularyToolbar search={search} difficulty={difficulty} status={status} tag={tag} onSearch={(value) => resetPage(setSearch, value)} onDifficulty={(value) => resetPage(setDifficulty, value)} onStatus={(value) => resetPage(setStatus, value)} onTag={(value) => resetPage(setTag, value)} />
    {isDesktop ? <div className="grid min-h-0 flex-1 grid-cols-[minmax(350px,38%)_minmax(0,1fr)] gap-4 overflow-hidden"><VocabularyMasterPane words={words} activeWordId={selectedWord?.id ?? null} isLoading={wordsQuery.isLoading} error={wordsQuery.error} page={page} totalPages={totalPages} total={total} onSelect={(word) => setSelectedWordId(word.id)} onRetry={() => void wordsQuery.refetch()} onPage={setPage} /><VocabularyDetailPane word={selectedWord} onEdit={editSelected} onDelete={() => setDetailWord(selectedWord)} /></div> : <><VocabularyViews isLoading={wordsQuery.isLoading} error={wordsQuery.error} words={words} onRetry={() => void wordsQuery.refetch()} onDetails={setDetailWord} /><div className="flex flex-wrap items-center justify-between gap-2"><span className="text-sm font-semibold text-foreground">{t('resultCount', { count: total })}</span>{total > 0 && <Pagination page={page} totalPages={totalPages} onPage={setPage} />}</div></>}
    {formOpen && <WordFormDialog onClose={() => setFormOpen(false)} />}
    {detailWord && !editingWord && <WordDetailDialog word={detailWord} onClose={() => setDetailWord(null)} onEdit={editSelected} onDeleted={clearDeleted} confirmOnOpen={isDesktop} />}
    {editingWord && <WordFormDialog word={editingWord} onClose={() => { setEditingWord(null); setDetailWord(null); setSelectedWordId(null); }} />}
  </div>;
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia?.(query).matches === true);
  useEffect(() => {
    const mediaQuery = window.matchMedia?.(query);
    if (!mediaQuery) return;
    const update = (event: MediaQueryListEvent) => setMatches(event.matches);
    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener?.('change', update);
    return () => mediaQuery.removeEventListener?.('change', update);
  }, [query]);
  return matches;
}

function Pagination({ page, totalPages, onPage }: { page: number; totalPages: number; onPage: (page: number) => void }) {
  const { t } = useTranslation('vocabulary');
  const { t: tCommon } = useTranslation('common');
  return <nav aria-label={t('pagination')} className="flex items-center justify-between"><Button type="button" variant="secondary" aria-label={tCommon('actions.previous')} className="min-w-11 px-2" disabled={page <= 1} onClick={() => onPage(page - 1)}><ChevronLeft aria-hidden="true" size={18} /></Button><Button type="button" variant="secondary" className="min-h-10 cursor-default px-3 text-xs font-semibold" tabIndex={-1}>{tCommon('pagination.pageOf', { page, totalPages })}</Button><Button type="button" variant="secondary" aria-label={tCommon('actions.next')} className="min-w-11 px-2" disabled={page >= totalPages} onClick={() => onPage(page + 1)}><ChevronRight aria-hidden="true" size={18} /></Button></nav>;
}
