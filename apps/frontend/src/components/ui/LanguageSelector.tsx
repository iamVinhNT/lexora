/**
 * @file LanguageSelector.tsx
 * @description Reusable native-name locale selector that changes Lexora language without navigation or reload.
 */
import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { i18n, normalizeLocale } from '../../i18n/config';
import type { SupportedLocale } from '../../i18n/types';

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

  const select = (
    <select
      aria-label={t('language.label')}
      title={t('language.label')}
      value={locale}
      onChange={(event) => void i18n.changeLanguage(normalizeLocale(event.target.value))}
      className={`min-h-11 rounded-lg border border-border bg-surface text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        compact ? 'min-w-11 w-11 appearance-none px-0 text-transparent' : 'min-w-32 w-full px-3 py-2'
      } ${className}`}
    >
      {localeOptions.map((option) => (
        <option key={option.value} value={option.value} lang={option.value} className="text-foreground">
          {t(`language.${option.key}`)}
        </option>
      ))}
    </select>
  );

  return compact ? (
    <span className="relative inline-flex min-h-11 min-w-11 w-11">
      {select}
      <Languages aria-hidden="true" size={18} className="pointer-events-none absolute inset-0 m-auto text-muted" />
    </span>
  ) : (
    select
  );
}
