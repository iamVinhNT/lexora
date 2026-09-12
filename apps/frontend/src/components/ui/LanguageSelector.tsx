/**
 * @file LanguageSelector.tsx
 * @description Reusable native-name locale selector that changes Lexora language without navigation or reload.
 */
import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { i18n, normalizeLocale } from '../../i18n/config';
import type { SupportedLocale } from '../../i18n/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './Select';

const localeOptions: Array<{ value: SupportedLocale; key: 'vietnamese' | 'english' }> = [
  { value: 'vi', key: 'vietnamese' },
  { value: 'en', key: 'english' },
];

export type LanguageSelectorProps = {
  compact?: boolean;
  className?: string;
};

export function LanguageSelector({ compact = false, className = '' }: LanguageSelectorProps) {
  const { t } = useTranslation('common');
  const locale = normalizeLocale(i18n.resolvedLanguage ?? i18n.language);

  return (
    <Select value={locale} onValueChange={(value) => void i18n.changeLanguage(normalizeLocale(value))}>
      <SelectTrigger
        aria-label={t('language.label')}
        title={t('language.label')}
        hideChevron={compact}
        className={`min-h-11 ${
          compact
            ? 'min-w-11 w-11 justify-center px-0 text-muted hover:bg-secondary hover:text-foreground'
            : 'min-w-32 w-full'
        } ${className}`}
      >
        {compact ? (
          <Languages aria-hidden="true" size={18} className="shrink-0" />
        ) : (
          <SelectValue />
        )}
      </SelectTrigger>
      <SelectContent>
        {localeOptions.map((option) => (
          <SelectItem key={option.value} value={option.value} lang={option.value}>
            {t(`language.${option.key}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
