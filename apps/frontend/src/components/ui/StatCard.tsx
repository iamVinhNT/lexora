/**
 * @file StatCard.tsx
 * @description Non-numeric dashboard stat placeholder that avoids invented metrics.
 */
import { Card } from './Card';
import { useTranslation } from 'react-i18next';

type StatCardProps = {
  label: string;
};

export function StatCard({ label }: StatCardProps) {
  const { t } = useTranslation('common');
  return (
    <Card className="p-5">
      <p className="text-sm font-medium text-muted">{label}</p>
      <p className="mt-3 text-lg font-semibold text-foreground">{t('status.noData')}</p>
    </Card>
  );
}
