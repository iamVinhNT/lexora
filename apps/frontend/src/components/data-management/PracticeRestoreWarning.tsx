/**
 * @file PracticeRestoreWarning.tsx
 * @description Localized warning component for grammar practice restore preview and overwrite states.
 */
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';

import type { PracticeSummary } from '../../api/data.api';
import { formatNumber } from '../../i18n/formatters';

export type PracticeRestoreWarningProps = {
  practiceSummary: PracticeSummary;
  className?: string;
};

export function getPracticeRestoreMessage(
  practiceSummary: PracticeSummary,
  t: TFunction<'settings'>,
): string {
  const absentText = t('practiceAbsent');

  if (!practiceSummary.includedInBackup) {
    if (
      practiceSummary.willOverwrite &&
      (practiceSummary.existingTableCounts.grammarPracticeAttempts > 0 ||
        practiceSummary.existingTableCounts.grammarReviewStates > 0)
    ) {
      const overwriteText = t('practiceOverwrite', {
        attempts: formatNumber(practiceSummary.existingTableCounts.grammarPracticeAttempts),
        reviews: formatNumber(practiceSummary.existingTableCounts.grammarReviewStates),
      });
      return `${overwriteText} ${absentText}`;
    }
    return absentText;
  }

  const backupText = t('practiceBackup', {
    attempts: formatNumber(practiceSummary.backupTableCounts.grammarPracticeAttempts),
    reviews: formatNumber(practiceSummary.backupTableCounts.grammarReviewStates),
  });

  if (practiceSummary.willOverwrite) {
    const overwriteText = t('practiceOverwrite', {
      attempts: formatNumber(practiceSummary.existingTableCounts.grammarPracticeAttempts),
      reviews: formatNumber(practiceSummary.existingTableCounts.grammarReviewStates),
    });
    return `${overwriteText} ${backupText}`;
  }

  return backupText;
}

export function PracticeRestoreWarning({
  practiceSummary,
  className = 'text-sm text-foreground',
}: PracticeRestoreWarningProps) {
  const { t } = useTranslation('settings');
  const isAlert = !practiceSummary.includedInBackup || practiceSummary.willOverwrite;
  const message = getPracticeRestoreMessage(practiceSummary, t);

  return (
    <p className={className} role={isAlert ? 'alert' : undefined}>
      {message}
    </p>
  );
}
