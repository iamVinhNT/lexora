/**
 * @file ContextPage.tsx
 * @description Context management route with search, filters, pagination, and relationship dialogs.
 */
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/Select';
import { ContextList } from '../components/context/ContextList';
import { ContextFormDialog } from '../components/context/ContextFormDialog';
import { ContextDetailDialog } from '../components/context/ContextDetailDialog';
import { useContexts } from '../hooks/useContexts';
import { useWords } from '../hooks/useVocabulary';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { CONTEXT_SOURCE_TYPES, type Context } from '../api/context.api';
import { formatNumber } from '../i18n/formatters';

const controlClass = 'min-h-11 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary';
const allSourceTypesValue = '__all_source_types__';

export function ContextPage() {
  const { t } = useTranslation('contexts');
  const [search, setSearch] = useState('');
  const [sourceType, setSourceType] = useState('');
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [selected, setSelected] = useState<Context | null>(null);
  const [editing, setEditing] = useState<Context | null>(null);
  const debouncedSearch = useDebouncedValue(search);
  const contextsQuery = useContexts({ search: debouncedSearch, sourceType: sourceType as '' | (typeof CONTEXT_SOURCE_TYPES)[number], page, limit: 20 });
  const wordsQuery = useWords({ page: 1, limit: 100 }, formOpen || Boolean(selected) || Boolean(editing));
  const total = contextsQuery.data?.total ?? 0;
  const totalPages = contextsQuery.data ? Math.max(1, Math.ceil(total / contextsQuery.data.limit)) : 1;
    const wordsOnPage = contextsQuery.data?.items.reduce((sum, item) => sum + item.wordCount, 0) ?? 0;
    return <div className="space-y-8"><PageHeader title={t('title')} subtitle={t('subtitle')} action={<Button type="button" onClick={() => setFormOpen(true)}><Plus aria-hidden="true" size={17} />{t('addContext')}</Button>} /><Filters search={search} sourceType={sourceType} onSearch={(value) => { setSearch(value); setPage(1); }} onSourceType={(value) => { setSourceType(value); setPage(1); }} /><div className="flex flex-wrap gap-3 text-sm text-muted"><span>{t('count', { count: total, formattedCount: formatNumber(total) })}</span><span aria-hidden="true">·</span><span>{t('wordsOnPage', { count: wordsOnPage, formattedCount: formatNumber(wordsOnPage) })}</span></div><ContextList isLoading={contextsQuery.isLoading} error={contextsQuery.error} contexts={contextsQuery.data?.items ?? []} onRetry={() => contextsQuery.refetch()} onDetails={setSelected} />{contextsQuery.data && total > 0 && <Pagination page={page} totalPages={totalPages} onPage={setPage} />}{formOpen && <ContextFormDialog words={wordsQuery.data?.items ?? []} onClose={() => setFormOpen(false)} />}{selected && !editing && <ContextDetailDialog context={selected} words={wordsQuery.data?.items ?? []} onClose={() => setSelected(null)} onEdit={() => setEditing(selected)} onDeleted={() => setSelected(null)} />}{editing && <ContextFormDialog context={editing} words={wordsQuery.data?.items ?? []} onClose={() => { setEditing(null); setSelected(null); }} />}</div>;
}

function Filters({ search, sourceType, onSearch, onSourceType }: { search: string; sourceType: string; onSearch: (value: string) => void; onSourceType: (value: string) => void }) { const { t } = useTranslation('contexts'); return <section aria-label={t('filters')} className="grid gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-2"><div><label htmlFor="context-search" className="text-sm font-semibold text-foreground">{t('search')}</label><input id="context-search" value={search} onChange={(event) => onSearch(event.target.value)} placeholder={t('searchPlaceholder')} className={`${controlClass} mt-2`} /></div><div><label htmlFor="context-source" className="text-sm font-semibold text-foreground">{t('sourceType')}</label><Select value={sourceType || allSourceTypesValue} onValueChange={(value) => onSourceType(value === allSourceTypesValue ? '' : value)}><SelectTrigger id="context-source" aria-label={t('sourceType')} className={`${controlClass} mt-2`}><SelectValue /></SelectTrigger><SelectContent><SelectItem value={allSourceTypesValue}>{t('allSourceTypes')}</SelectItem>{CONTEXT_SOURCE_TYPES.map((type) => <SelectItem key={type} value={type}>{t(`sourceTypes.${type}`)}</SelectItem>)}</SelectContent></Select></div></section>; }
function Pagination({ page, totalPages, onPage }: { page: number; totalPages: number; onPage: (page: number) => void }) { const { t } = useTranslation('contexts'); const { t: tCommon } = useTranslation('common'); return <nav aria-label={t('pagination')} className="flex items-center justify-between"><Button type="button" variant="secondary" disabled={page <= 1} onClick={() => onPage(page - 1)}>{tCommon('actions.previous')}</Button><span className="text-sm text-muted">{tCommon('pagination.pageOf', { page, totalPages })}</span><Button type="button" variant="secondary" disabled={page >= totalPages} onClick={() => onPage(page + 1)}>{tCommon('actions.next')}</Button></nav>; }
