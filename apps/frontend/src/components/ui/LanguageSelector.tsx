/**
 * @file LanguageSelector.tsx
 * @description Accessible language toggle button backed by Zustand i18n store and shadcn Button.
 */
import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useI18nStore } from '../../stores/i18n.store';
import { Button } from './Button';

export type LanguageSelectorProps = {
  compact?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
};

export function LanguageSelector({
  compact = false,
  className = '',
  variant = 'ghost',
}: LanguageSelectorProps) {
  const { t } = useTranslation('common');
  const locale = useI18nStore((state) => state.locale);
  const toggleLocale = useI18nStore((state) => state.toggleLocale);

  const label = t('language.label');
  const currentLanguageName = locale === 'vi' ? t('language.vietnamese') : t('language.english');

  return (
    <Button
      type="button"
      variant={variant}
      aria-label={label}
      title={label}
      icon={Languages}
      onClick={() => void toggleLocale()}
      className={`min-h-11 min-w-11 ${
        compact ? 'w-11 px-1 gap-1' : 'px-3 py-2 gap-2'
      } ${className}`}
    >
      {compact ? (
        <span className="text-[11px] font-bold uppercase tracking-tight leading-none">
          {locale}
        </span>
      ) : (
        <span className="text-sm font-medium">{currentLanguageName}</span>
      )}
    </Button>
  );
}
