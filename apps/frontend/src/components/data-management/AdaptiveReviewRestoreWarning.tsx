/**
 * @file AdaptiveReviewRestoreWarning.tsx
 * @description Localized warning component for adaptive review restore preview and overwrite states.
 */
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';

import type { AdaptiveReviewSummary } from '../../api/data.api';
import { formatNumber } from '../../i18n/formatters';

export type AdaptiveReviewRestoreWarningProps = {
  adaptiveReviewSummary: AdaptiveReviewSummary;
  className?: string;
};

export function getAdaptiveReviewRestoreMessage(
  adaptiveReviewSummary: AdaptiveReviewSummary,
  t: TFunction<'settings'>,
): string {
  const absentText = t('adaptiveReviewAbsent');

  if (!adaptiveReviewSummary.includedInBackup) {
    if (
      adaptiveReviewSummary.willOverwrite &&
      (adaptiveReviewSummary.existingTableCounts.reviewAttempts > 0 ||
        adaptiveReviewSummary.existingTableCounts.reviewAttemptRequests > 0)
    ) {
      const overwriteText = t('adaptiveReviewOverwrite', {
        attempts: formatNumber(adaptiveReviewSummary.existingTableCounts.reviewAttempts),
        requests: formatNumber(adaptiveReviewSummary.existingTableCounts.reviewAttemptRequests),
      });
      return `${overwriteText} ${absentText}`;
    }
    return absentText;
  }

  const backupText = t('adaptiveReviewBackup', {
    attempts: formatNumber(adaptiveReviewSummary.backupTableCounts.reviewAttempts),
    requests: formatNumber(adaptiveReviewSummary.backupTableCounts.reviewAttemptRequests),
  });

  if (adaptiveReviewSummary.willOverwrite) {
    const overwriteText = t('adaptiveReviewOverwrite', {
      attempts: formatNumber(adaptiveReviewSummary.existingTableCounts.reviewAttempts),
      requests: formatNumber(adaptiveReviewSummary.existingTableCounts.reviewAttemptRequests),
    });
    return `${overwriteText} ${backupText}`;
  }

  return backupText;
}

export function AdaptiveReviewRestoreWarning({
  adaptiveReviewSummary,
  className = 'text-sm text-foreground',
}: AdaptiveReviewRestoreWarningProps) {
  const { t } = useTranslation('settings');
  const isAlert = !adaptiveReviewSummary.includedInBackup || adaptiveReviewSummary.willOverwrite;
  const message = getAdaptiveReviewRestoreMessage(adaptiveReviewSummary, t);

  return (
    <p className={className} role={isAlert ? 'alert' : undefined}>
      {message}
    </p>
  );
}
