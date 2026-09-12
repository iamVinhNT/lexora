/**
 * @file LanguageSelector.tsx
 * @description Reusable native-name locale selector that changes Lexora language without navigation or reload.
 */
import { useTranslation } from 'react-i18next';

import { i18n, normalizeLocale } from '../../i18n/config';
import type { SupportedLocale } from '../../i18n/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './Select';

const localeOptions: Array<{ value: SupportedLocale; key: 'vietnamese' | 'english' }> = [
  { value: 'vi', key: 'vietnamese' },
  { value: 'en', key: 'english' },
];

export function LanguageSelector() {
  const { t } = useTranslation('common');
  const locale = normalizeLocale(i18n.resolvedLanguage ?? i18n.language);

  return (
    <Select value={locale} onValueChange={(value) => void i18n.changeLanguage(normalizeLocale(value))}>
      <SelectTrigger aria-label={t('language.label')} className="min-h-11 min-w-32">
        <SelectValue />
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
