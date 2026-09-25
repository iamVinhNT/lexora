/**
 * @file ThemeToggle.tsx
 * @description Accessible light and dark theme toggle backed by UI-only state.
 */
import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useThemeStore } from '../../stores/theme.store';

export function ThemeToggle() {
  const { t } = useTranslation('common');
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      aria-label={isDark ? t('theme.switchToLight') : t('theme.switchToDark')}
      title={isDark ? t('theme.switchToLight') : t('theme.switchToDark')}
      aria-pressed={isDark}
      onClick={toggleTheme}
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {isDark ? <Sun aria-hidden="true" size={18} /> : <Moon aria-hidden="true" size={18} />}
      <span className="sr-only">{isDark ? t('theme.switchToLight') : t('theme.switchToDark')}</span>
    </button>
  );
}
