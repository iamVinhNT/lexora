/**
 * @file Sidebar.tsx
 * @description Persistent desktop navigation for the Lexora application shell.
 */
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { primaryNavigation } from './navigation';
import { ThemeToggle } from '../ui/ThemeToggle';
import { LanguageSelector } from '../ui/LanguageSelector';

export function Sidebar() {
  const { t } = useTranslation('navigation');
  return (
    <aside
      aria-label={t('primary')}
      className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-border bg-surface lg:flex"
    >
      <div className="flex h-20 items-center border-b border-border px-6">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          Lexora
        </Link>
      </div>

      <nav aria-label={t('desktop')} className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
        {primaryNavigation.map(({ labelKey, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              `flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
                isActive ? 'bg-primary-subtle text-primary' : 'text-muted hover:bg-secondary hover:text-foreground'
              }`
            }
          >
            <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
            {t(labelKey)}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center justify-between gap-2 border-t border-border px-4 py-4">
        <span className="text-sm font-medium text-muted">{t('appearance')}</span>
        <div className="flex items-center gap-1"><LanguageSelector /><ThemeToggle /></div>
      </div>
    </aside>
  );
}
