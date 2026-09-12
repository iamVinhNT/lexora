/**
 * @file SessionSummary.tsx
 * @description Truthful completion summary derived from the completed backend session.
 */
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import type { LearningSession } from '../../api/session.api';
import { formatNumber } from '../../i18n/formatters';

export function SessionSummary({ session, onStartNext }: { session: LearningSession; onStartNext: () => void }) {
  const { t } = useTranslation('learning');
  const { t: tCommon } = useTranslation('common');
  const totalWords = session.summary?.totalWords ?? session.totalWords ?? session.items.length;
  const recallCorrect = session.summary?.recallCorrect ?? session.items.filter((item) => item.recallResult === 'CORRECT' || item.recallResult === 'ALMOST_CORRECT').length;
  const productionSentences = session.summary?.productionSentences ?? session.items.filter((item) => Boolean(item.outputSentence?.trim())).length;
  const newWords = session.summary?.newWords ?? session.newWords;
  const weakWords = session.summary?.weakWords ?? session.weakWords;

  return <section className="mx-auto w-full max-w-2xl space-y-8">
    <div>
       <h2 tabIndex={-1} className="text-3xl font-semibold tracking-tight text-foreground focus:outline-none sm:text-4xl">{t('summaryTitle')}</h2>
       <p className="mt-2 text-muted">{t('summaryDescription')}</p>
    </div>
    <dl className="grid gap-3 sm:grid-cols-3">
       <SummaryStat label={t('wordsReviewed')} value={t('wordsReviewedValue', { count: totalWords, formattedCount: formatNumber(totalWords) })} />
       <SummaryStat label={t('summaryRecall')} value={t('recallValue', { formattedCorrect: formatNumber(recallCorrect), formattedTotal: formatNumber(totalWords) })} />
       <SummaryStat label={t('production')} value={t('productionValue', { count: productionSentences, formattedCount: formatNumber(productionSentences) })} />
       {newWords !== undefined && <SummaryStat label={t('newWords')} value={formatNumber(newWords)} />}
       {weakWords !== undefined && <SummaryStat label={t('weakWords')} value={formatNumber(weakWords)} />}
    </dl>
    <div className="flex flex-wrap gap-3">
       <Link to="/" className="inline-flex min-h-11 items-center rounded-lg border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{tCommon('actions.returnOverview')}</Link>
       <button type="button" onClick={onStartNext} className="min-h-11 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{tCommon('actions.startNextSession')}</button>
    </div>
  </section>;
}

function SummaryStat({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return <div className="rounded-xl border border-border bg-surface p-4"><dt className="text-sm text-muted">{label}</dt><dd className="mt-2 text-xl font-semibold text-foreground">{value}</dd>{detail && <span className="text-sm text-muted">{detail}</span>}</div>;
}
