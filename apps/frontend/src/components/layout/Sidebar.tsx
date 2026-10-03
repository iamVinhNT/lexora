/**
 * @file Sidebar.tsx
 * @description Persistent desktop navigation for the Lexora application shell following ShadCN sidebar-07 architecture.
 */
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useUiStore } from '../../stores/ui.store';
import { NavMain } from './NavMain';
import { SidebarTrigger } from './SidebarTrigger';
import { ThemeToggle } from '../ui/ThemeToggle';
import { LanguageSelector } from '../ui/LanguageSelector';

export function Sidebar() {
  const { t } = useTranslation('navigation');
  const isSidebarOpen = useUiStore((state) => state.isSidebarOpen);

  return (
    <aside
      role="complementary"
      aria-label={t('primary')}
      data-state={isSidebarOpen ? 'expanded' : 'collapsed'}
      data-collapsible="icon"
      className={`glass-nav fixed inset-y-0 left-0 z-30 hidden flex-col border-r transition-[width] duration-200 ease-in-out lg:flex ${
        isSidebarOpen ? 'w-64' : 'w-16'
      }`}
    >
      {isSidebarOpen ? (
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary font-bold text-white shadow-sm">
              L
            </span>
            <span className="truncate">Lexora</span>
          </Link>
          <SidebarTrigger />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 border-b border-border px-2 py-3">
          <Link
            to="/"
            title="Lexora"
            aria-label="Lexora"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary font-bold text-white shadow-sm">
              L
            </span>
            <span className="sr-only">Lexora</span>
          </Link>
          <SidebarTrigger />
        </div>
      )}

      <NavMain isSidebarOpen={isSidebarOpen} />

      {isSidebarOpen ? (
        <div className="border-t border-border px-3 py-4">
          <div className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted">
            {t('appearance')}
          </div>
          <div className="flex items-center gap-2">
            <div className="min-w-0 flex-1">
              <LanguageSelector />
            </div>
            <ThemeToggle />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 border-t border-border px-2 py-4">
          <span className="sr-only">{t('appearance')}</span>
          <LanguageSelector compact />
          <ThemeToggle />
        </div>
      )}
    </aside>
  );
}
