/**
 * @file SettingsPage.tsx
 * @description Localized appearance, language, and safe data-management preferences.
 */
import { useTranslation } from 'react-i18next';

import { DataManagementPanel } from '../components/data-management/DataManagementPanel';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { LanguageSelector } from '../components/ui/LanguageSelector';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { useUiStore } from '../stores/ui.store';

export function SettingsPage() {
  const { t } = useTranslation('settings');
  const { t: tCommon } = useTranslation('common');
  const theme = useUiStore((state) => state.theme);
  const themeLabel = tCommon(`theme.${theme}`);

  return <div className="space-y-8">
    <PageHeader title={t('title')} subtitle={t('subtitle')} />
    <section aria-labelledby="appearance-title" className="space-y-4">
      <h2 id="appearance-title" className="text-xl font-semibold text-foreground">{t('appearance')}</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div><h3 className="font-semibold text-foreground">{t('theme')}</h3><p className="mt-1 text-sm text-muted">{t('currentTheme', { theme: themeLabel })}</p></div>
          <ThemeToggle />
        </Card>
        <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div><h3 className="font-semibold text-foreground">{t('language')}</h3><p className="mt-1 text-sm text-muted">{t('languageDescription')}</p></div>
          <LanguageSelector />
        </Card>
      </div>
    </section>
    <DataManagementPanel />
  </div>;
}
