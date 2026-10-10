/**
 * @file GrammarCatalogFilters.tsx
 * @description Search and dropdown filters for published grammar stages and topics.
 */
import { Search, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '../ui/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select';

export type GrammarCatalogFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  level: string;
  onLevelChange: (value: string) => void;
  levels: string[];
  topic: string;
  onTopicChange: (value: string) => void;
  topics: string[];
  onClear: () => void;
  hasActiveFilters: boolean;
};

export function GrammarCatalogFilters({
  search,
  onSearchChange,
  level,
  onLevelChange,
  levels,
  topic,
  onTopicChange,
  topics,
  onClear,
  hasActiveFilters,
}: GrammarCatalogFiltersProps) {
  const { t } = useTranslation('grammar');

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-3.5 sm:p-4 md:flex-row md:items-center">
      <div className="relative min-w-0 flex-1">
        <Search
          aria-hidden="true"
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t('searchPlaceholder')}
          aria-label={t('searchPlaceholder')}
          className="h-11 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
        <div className="min-w-[130px] flex-1 sm:flex-initial">
          <Select value={level} onValueChange={onLevelChange}>
            <SelectTrigger aria-label={t('filterLevel')} className="h-11">
              <SelectValue placeholder={t('filterLevel')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allLevels')}</SelectItem>
              {levels.map((lvl) => (
                <SelectItem key={lvl} value={lvl}>
                  {lvl}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {topics.length > 0 && (
          <div className="min-w-[150px] flex-1 sm:flex-initial">
            <Select value={topic} onValueChange={onTopicChange}>
              <SelectTrigger aria-label={t('filterTopic')} className="h-11">
                <SelectValue placeholder={t('filterTopic')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allTopics')}</SelectItem>
                {topics.map((top) => (
                  <SelectItem key={top} value={top}>
                    {top}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            onClick={onClear}
            className="h-11 px-3 text-xs sm:text-sm text-muted hover:text-foreground"
            icon={X}
          >
            {t('clearFilters')}
          </Button>
        )}
      </div>
    </div>
  );
}
