/**
 * @file SkipLink.tsx
 * @description Keyboard shortcut link that moves focus to primary page content.
 */
import { useTranslation } from 'react-i18next';

export function SkipLink() {
  const { t } = useTranslation('navigation');
  return (
    <a
      href="#main-content"
      className="fixed left-4 top-4 z-50 -translate-y-24 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-transform focus:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {t('skipToMain')}
    </a>
  );
}
