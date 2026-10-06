/**
 * @file GrammarPracticeHistory.tsx
 * @description Practice and review history log with badges for spaced review and self-rated output.
 */
import { Clock, FileText, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../i18n/formatters';

import { useGrammarPracticeHistory } from '../../hooks/useGrammarPractice';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export function GrammarPracticeHistory({
  lessonId,
  revisionId,
}: {
  lessonId?: string;
  revisionId?: string;
}) {
  const { t } = useTranslation('grammar');
  const historyQuery = useGrammarPracticeHistory({ lessonId, revisionId });
  const items = historyQuery.data?.items ?? [];

  if (historyQuery.isLoading) {
    return (
      <Card className="p-4 sm:p-5">
        <p role="status" aria-busy="true" className="text-sm text-muted">
          {t('loading')}
        </p>
      </Card>
    );
  }
  if (historyQuery.isError) {
    return (
      <Card className="space-y-3 p-4 sm:p-5">
        <p role="alert" className="text-sm text-foreground">{t('historyLoadError')}</p>
        <Button type="button" variant="secondary" onClick={() => void historyQuery.refetch()}>{t('retry')}</Button>
      </Card>
    );
  }
  if (!Array.isArray(historyQuery.data?.items)) {
    return (
      <Card className="space-y-3 p-4 sm:p-5">
        <p role="alert" className="text-sm text-foreground">{t('historyLoadError')}</p>
        <Button type="button" variant="secondary" onClick={() => void historyQuery.refetch()}>{t('retry')}</Button>
      </Card>
    );
  }
  return (
    <section aria-labelledby="grammar-history-heading" className="space-y-3">
      <div className="flex items-center gap-2">
        <Clock aria-hidden="true" size={18} className="text-muted" />
        <h3 id="grammar-history-heading" className="text-lg font-semibold text-foreground">
          {t('historyTitle')}
        </h3>
      </div>

      {items.length === 0 ? (
        <Card className="p-4 sm:p-5">
          <p className="text-sm text-muted">{t('historyEmpty')}</p>
        </Card>
      ) : (
        <div className="space-y-2.5">
          {items.map((item) => {
            const isOutput = item.kind === 'output';
            return (
              <Card
                key={item.id}
                className="flex flex-col gap-2 p-3.5 sm:p-4 text-xs sm:text-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold ${
                        isOutput
                          ? 'bg-secondary text-foreground'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      {isOutput ? (
                        <FileText aria-hidden="true" size={13} />
                      ) : (
                        <RotateCcw aria-hidden="true" size={13} />
                      )}
                      {isOutput ? t('historyOutputBadge') : t('historyReviewBadge')}
                    </span>
                    {isOutput && (
                      <span className="rounded-md border border-border px-1.5 py-0.5 text-[11px] text-muted">
                        {t('historySelfRated')}
                      </span>
                    )}
                    {item.rating && (
                      <span
                        className={`rounded-md px-1.5 py-0.5 text-[11px] font-medium ${
                          item.rating === 'GOOD'
                            ? 'bg-primary-subtle text-primary'
                            : 'bg-secondary text-muted'
                        }`}
                      >
                        {item.rating}
                      </span>
                    )}
                  </div>
                  <time
                    dateTime={item.createdAt}
                    className="text-[11px] text-muted sm:text-xs"
                  >
                    {formatDate(item.createdAt, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </time>
                </div>

                {isOutput && item.text && (
                  <p className="line-clamp-2 rounded-lg bg-background/50 p-2 text-foreground font-mono text-xs">
                    {item.text}
                  </p>
                )}

                {isOutput && item.rubric && (
                  <div className="flex flex-wrap gap-3 text-xs text-muted">
                    <span>
                      {t('rubricForm')}: {item.rubric.form}/2
                    </span>
                    <span>
                      {t('rubricMeaning')}: {item.rubric.meaning}/2
                    </span>
                    <span>
                      {t('rubricUse')}: {item.rubric.use}/2
                    </span>
                  </div>
                )}

                {!isOutput && item.feedback && (
                  <p className="text-xs text-muted leading-relaxed">
                    {item.feedback}
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}
