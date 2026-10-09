/**
 * @file AiHistoryList.tsx
 * @description Paginated conversation history listing with resume, accessible controls, and resilient deletion.
 */
import { useEffect, useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAiConversations, useDeleteAiConversation } from '../../hooks/useAiHistory';
import { formatDate } from '../../i18n/formatters';
import { getLocalizedErrorMessage } from '../../i18n/presentation';
import { Button } from '../ui/Button';

interface AiHistoryListProps {
  onBack: () => void;
  onSelect: (id: string) => void;
  activeId: string | null;
}

const PAGE_SIZE = 10;

export function AiHistoryList({ onBack, onSelect, activeId }: AiHistoryListProps) {
  const { t } = useTranslation('assistant');
  const { t: tCommon } = useTranslation('common');
  const [page, setPage] = useState(0);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const { data, isLoading, isError, refetch } = useAiConversations({
    limit: PAGE_SIZE,
    offset: page * PAGE_SIZE,
  });

  const deleteMutation = useDeleteAiConversation();

  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 0;
  const lastPage = Math.max(0, totalPages - 1);
  useEffect(() => {
    if (data && page > lastPage) setPage(lastPage);
  }, [data, page, lastPage]);

  const handleDelete = async (id: string, revision: number, currentItemCount: number) => {
    setDeleteError(null);
    try {
      await deleteMutation.mutateAsync({ id, expectedConversationRevision: revision });
      setDeletingId(null);
      if (currentItemCount === 1 && page > 0) {
        setPage((p) => Math.max(0, p - 1));
      }
    } catch (failure) {
      setDeleteError(getLocalizedErrorMessage(failure, tCommon));
      void refetch();
    }
  };

  const handleStartDelete = (id: string) => {
    setDeleteError(null);
    setDeletingId(id);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col space-y-3 overflow-y-auto overscroll-contain px-3 py-2 text-sm">
      <div className="flex items-center justify-between gap-2 border-b border-border pb-2">
        <Button
          variant="ghost"
          onClick={onBack}
          aria-label={t('backToChat')}
          className="min-h-11 px-2 text-xs font-semibold"
        >
          <ArrowLeft size={16} className="mr-1 inline" aria-hidden="true" />
          {t('backToChat')}
        </Button>
        <span className="text-xs font-semibold text-muted">{t('historyTitle')}</span>
      </div>

      {isLoading && (
        <div className="py-6 text-center text-xs text-muted" aria-busy="true">
          {t('loadingHistory')}
        </div>
      )}

      {isError && (
        <div className="space-y-2 py-4 text-center">
          <p className="text-xs text-danger">{t('errorHistory')}</p>
          <Button variant="secondary" onClick={() => void refetch()} className="min-h-11 px-4 text-xs">
            {t('retry')}
          </Button>
        </div>
      )}

      {!isLoading && !isError && (!data?.items || data.items.length === 0) && (
        <div className="py-8 text-center text-xs text-muted">{t('emptyHistory')}</div>
      )}

      {!isLoading && !isError && data?.items && data.items.length > 0 && (
        <div className="space-y-2">
          {data.items.map((item) => {
            const isActive = item.id === activeId;
            const isDeleting = deletingId === item.id;
            const contextBadgeLabel =
              item.context.kind === 'screen'
                ? t(`screens.${item.context.screen}`)
                : t('contextBadges.general');

            return (
              <div
                key={item.id}
                className={`rounded-xl border p-2.5 transition-colors ${
                  isActive ? 'border-primary bg-primary/5' : 'border-border bg-background'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-foreground">
                      {item.title || t('newConversation')}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-muted">
                      {contextBadgeLabel} ·{' '}
                      {formatDate(item.updatedAt, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  {isActive && (
                    <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                      ✓
                    </span>
                  )}
                </div>

                {isDeleting ? (
                  <div className="mt-2 space-y-2 rounded-lg border border-danger/30 bg-danger/5 p-2 text-xs">
                    <p className="text-danger">{t('deleteConfirm')}</p>
                    {deleteError && (
                      <p role="alert" className="text-[11px] font-medium text-danger">
                        {deleteError}
                      </p>
                    )}
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        disabled={deleteMutation.isPending}
                        onClick={() => void handleDelete(item.id, item.revision, data.items.length)}
                        className="min-h-11 flex-1 text-xs font-semibold text-danger"
                      >
                        {deleteMutation.isPending ? t('deleting') : t('confirmDelete')}
                      </Button>
                      <Button
                        variant="ghost"
                        disabled={deleteMutation.isPending}
                        onClick={() => {
                          setDeletingId(null);
                          setDeleteError(null);
                        }}
                        className="min-h-11 flex-1 text-xs"
                      >
                        {t('cancelDelete')}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2 flex items-center justify-between gap-2 border-t border-border/50 pt-2">
                    <Button
                      variant="ghost"
                      onClick={() => onSelect(item.id)}
                      className="min-h-11 flex-1 justify-start px-2 text-xs font-semibold text-primary"
                    >
                      {t('resumeConversation')}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleStartDelete(item.id)}
                      aria-label={t('deleteConversation')}
                      className="min-h-11 min-w-11 px-2 text-muted hover:text-danger"
                    >
                      <Trash2 size={14} aria-hidden="true" />
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border pt-2 text-xs text-muted">
          <Button
            variant="ghost"
            disabled={page <= 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            aria-label={t('previousPage')}
            title={t('previousPage')}
            className="min-h-11 px-2"
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </Button>
          <span>
            {page + 1} / {totalPages}
          </span>
          <Button
            variant="ghost"
            disabled={page + 1 >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            aria-label={t('nextPage')}
            title={t('nextPage')}
            className="min-h-11 px-2"
          >
            <ChevronRight size={16} aria-hidden="true" />
          </Button>
        </div>
      )}

      <p className="pt-2 text-center text-[11px] leading-relaxed text-muted">
        {t('historyNotice')}
      </p>
    </div>
  );
}
