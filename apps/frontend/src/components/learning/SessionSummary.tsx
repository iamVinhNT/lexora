/**
 * @file SessionSummary.tsx
 * @description Truthful completion summary derived from the completed backend session in a Centered Focus Card.
 */
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import type { LearningSession } from '../../api/session.api';
import { formatNumber } from '../../i18n/formatters';

export function SessionSummary({
  session,
  onStartNext,
}: {
  session: LearningSession;
  onStartNext: () => void;
}) {
  const { t } = useTranslation('learning');
  const { t: tCommon } = useTranslation('common');
  const totalWords = session.summary?.totalWords ?? session.totalWords ?? session.items.length;
  const summary = session.summary;
  const detailedSummary =
    summary && ['recallSecondTry', 'recallFailed', 'outputInvalid', 'legacyUnknown'].every((key) => key in summary)
      ? summary
      : null;
  const recallCorrect =
    summary?.recallFirstTry !== undefined
      ? summary.recallFirstTry + (summary.recallSecondTry ?? 0)
      : session.items.filter((item) => item.recallResult === 'CORRECT' || item.recallResult === 'ALMOST_CORRECT').length;
  const productionSentences =
    summary?.outputValid ?? session.items.filter((item) => Boolean(item.outputSentence?.trim())).length;

  return (
    <section className="mx-auto w-full max-w-2xl space-y-6 sm:space-y-8 rounded-2xl border border-border bg-surface p-4 sm:p-6 md:p-8 shadow-sm">
      <div className="space-y-3">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
            {t('summaryBadge')}
          </span>
        </div>
        <h2
          tabIndex={-1}
          className="text-2xl font-semibold tracking-tight text-foreground focus:outline-none sm:text-3xl md:text-4xl"
        >
          {t('summaryTitle')}
        </h2>
        <p className="text-sm text-muted sm:text-base">{t('summaryDescription')}</p>
      </div>

      <dl className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 gap-3">
        <SummaryStat
          label={t('wordsReviewed')}
          value={t('wordsReviewedValue', { count: totalWords, formattedCount: formatNumber(totalWords) })}
        />
        {!detailedSummary && (
          <>
            <SummaryStat
              label={t('summaryRecall')}
              value={t('recallValue', {
                formattedCorrect: formatNumber(recallCorrect),
                formattedTotal: formatNumber(totalWords),
              })}
            />
            <SummaryStat
              label={t('production')}
              value={t('productionValue', {
                count: productionSentences,
                formattedCount: formatNumber(productionSentences),
              })}
            />
          </>
        )}
        {detailedSummary && (
          <>
            <SummaryStat label={t('recallFirstTry')} value={formatNumber(detailedSummary.recallFirstTry)} />
            <SummaryStat label={t('recallSecondTry')} value={formatNumber(detailedSummary.recallSecondTry)} />
            <SummaryStat label={t('recallFailed')} value={formatNumber(detailedSummary.recallFailed)} />
            <SummaryStat label={t('outputValid')} value={formatNumber(detailedSummary.outputValid)} />
            <SummaryStat label={t('outputInvalid')} value={formatNumber(detailedSummary.outputInvalid)} />
            <SummaryStat label={t('legacyUnknown')} value={formatNumber(detailedSummary.legacyUnknown)} />
          </>
        )}
      </dl>

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground shadow-xs transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-full sm:w-auto text-center"
        >
          {tCommon('actions.returnOverview')}
        </Link>
        <button
          type="button"
          onClick={onStartNext}
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-full sm:w-auto text-center"
        >
          {tCommon('actions.startNextSession')}
        </button>
      </div>
    </section>
  );
}

function SummaryStat({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-3.5 sm:p-4 shadow-xs">
      <dt className="text-xs sm:text-sm font-medium text-muted">{label}</dt>
      <dd className="mt-1.5 sm:mt-2 text-xl sm:text-2xl font-bold tracking-tight text-foreground">{value}</dd>
      {detail && <span className="mt-1 block text-xs text-muted">{detail}</span>}
    </div>
  );
}
