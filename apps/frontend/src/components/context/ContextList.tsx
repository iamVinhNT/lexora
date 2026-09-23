/**
 * @file ContextList.tsx
 * @description Responsive context cards and truthful list states.
 */
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { EmptyState } from '../ui/EmptyState';
import type { Context } from '../../api/context.api';
import { formatNumber } from '../../i18n/formatters';
import { getLocalizedEnumLabel, getLocalizedErrorMessage } from '../../i18n/presentation';
import { useTranslation } from 'react-i18next';

type Props = { isLoading: boolean; error: Error | null; contexts: Context[]; onRetry: () => void; onDetails: (context: Context) => void };
export function ContextList({ isLoading, error, contexts, onRetry, onDetails }: Props) {
  const { t } = useTranslation('contexts');
  const { t: tCommon } = useTranslation('common');
  if (isLoading) return <Card><p role="status" className="p-6 text-sm text-muted">{t('loading')}</p></Card>;
  if (error) return <Card><div className="space-y-4 p-6"><p role="alert" className="text-sm text-red-600">{getLocalizedErrorMessage(error, tCommon)}</p><Button type="button" variant="secondary" onClick={onRetry}>{t('retry')}</Button></div></Card>;
  if (!contexts.length) return <Card><EmptyState title={t('noMatch')} description={t('noMatchDescription')} /></Card>;
  return <Card><div className="divide-y divide-border">{contexts.map((context) => <article key={context.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h2 className="text-lg font-semibold text-foreground">{context.title}</h2>{context.sourceType && <span className="rounded-full bg-primary-subtle px-2 py-1 text-xs font-semibold text-primary">{getLocalizedEnumLabel(t, 'sourceTypes', context.sourceType)}</span>}</div><p className="mt-1 line-clamp-2 text-sm text-muted">{context.content}</p><p className="mt-3 text-xs text-muted">{t('wordCount', { count: context.wordCount, formattedCount: formatNumber(context.wordCount) })}</p></div><Button type="button" variant="secondary" aria-label={t('detailsFor', { title: context.title })} onClick={() => onDetails(context)}>{t('viewDetails')}</Button></article>)}</div></Card>;
}
