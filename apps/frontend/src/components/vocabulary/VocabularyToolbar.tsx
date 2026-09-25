/**
 * @file VocabularyToolbar.tsx
 * @description Compact vocabulary search and filter controls shared by responsive layouts.
 */
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { getLocalizedEnumLabel } from '../../i18n/presentation';

const allFilterValue = '__all_filter__';
const controlClass = 'min-h-11 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary';

type VocabularyToolbarProps = {
  search: string;
  difficulty: string;
  status: string;
  tag: string;
  onSearch: (value: string) => void;
  onDifficulty: (value: string) => void;
  onStatus: (value: string) => void;
  onTag: (value: string) => void;
};

export function VocabularyToolbar({ search, difficulty, status, tag, onSearch, onDifficulty, onStatus, onTag }: VocabularyToolbarProps) {
  const { t } = useTranslation('vocabulary');
  return (
    <section aria-label={t('filters')} className="grid gap-3 rounded-2xl bg-transparent p-0 sm:grid-cols-2 lg:grid-cols-[minmax(14rem,1fr)_10rem_10rem_10rem] lg:items-center lg:gap-2 lg:p-0">
      <div>
        <label htmlFor="word-search" className="text-sm font-semibold text-foreground lg:sr-only">{t('search')}</label>
        <input id="word-search" value={search} onChange={(event) => onSearch(event.target.value)} placeholder={t('searchPlaceholder')} className={`${controlClass} mt-1 lg:mt-0`} />
      </div>
      <FilterSelect id="word-difficulty" label={t('cefrDifficulty')} value={difficulty} placeholder={t('allLevels')} options={['A1', 'A2', 'B1', 'B2', 'C1', 'C2']} onChange={onDifficulty} />
      <FilterSelect id="word-status" label={t('status')} value={status} placeholder={t('allStatuses')} options={['NEW', 'LEARNING', 'FAMILIAR', 'MASTERED', 'MAINTENANCE']} formatOption={(value) => getLocalizedEnumLabel(t, 'states', value)} onChange={onStatus} />
      <div>
        <label htmlFor="word-tag" className="text-sm font-semibold text-foreground lg:sr-only">{t('tagFilter')}</label>
        <input id="word-tag" aria-label={t('tagFilter')} value={tag} onChange={(event) => onTag(event.target.value)} placeholder={t('tagPlaceholder')} className={`${controlClass} mt-1 lg:mt-0`} />
      </div>
    </section>
  );
}

function FilterSelect({ id, label, value, placeholder, options, formatOption = (option) => option, onChange }: { id: string; label: string; value: string; placeholder: string; options: string[]; formatOption?: (value: string) => string; onChange: (value: string) => void }) {
  return <div><label htmlFor={id} className="text-sm font-semibold text-foreground lg:sr-only">{label}</label><Select value={value || allFilterValue} onValueChange={(next) => onChange(next === allFilterValue ? '' : next)}><SelectTrigger id={id} aria-label={label} className={`${controlClass} mt-1 lg:mt-0`}><SelectValue placeholder={placeholder} /></SelectTrigger><SelectContent><SelectItem value={allFilterValue}>{placeholder}</SelectItem>{options.map((option) => <SelectItem key={option} value={option}>{formatOption(option)}</SelectItem>)}</SelectContent></Select></div>;
}
