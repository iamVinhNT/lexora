/**
 * @file Sidebar.tsx
 * @description Compact tablet navigation rail and collapsible desktop sidebar.
 */
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useUiStore } from '../../stores/ui.store';
import { NavMain } from './NavMain';
import { SidebarTrigger } from './SidebarTrigger';
import { UpdateBell } from './UpdateBell';
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
      className={`glass-nav fixed inset-y-0 left-0 z-30 hidden w-20 flex-col border-r transition-[width] duration-200 ease-in-out md:flex ${
        isSidebarOpen ? 'lg:w-64' : 'lg:w-16'
      }`}
    >
      <div data-sidebar-header className={`flex shrink-0 flex-col items-center justify-center gap-2 border-b border-border px-2 py-3 ${isSidebarOpen ? 'lg:h-16 lg:flex-row lg:justify-between lg:gap-0 lg:px-4' : ''}`}>
        <Link
          to="/"
          title="Lexora"
          aria-label="Lexora"
          className="flex min-h-11 min-w-11 items-center justify-center gap-2.5 rounded-lg text-xl font-bold tracking-tight text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          <img
            src={`${import.meta.env.BASE_URL}favicon.svg`}
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 shrink-0"
          />
          <span className={isSidebarOpen ? 'hidden lg:inline' : 'sr-only'}>Lexora</span>
        </Link>
        <div className={`contents ${isSidebarOpen ? 'lg:flex lg:items-center' : ''}`}>
          <UpdateBell />
          <SidebarTrigger className="hidden lg:inline-flex" />
        </div>
      </div>

      <NavMain isSidebarOpen={isSidebarOpen} />

      <div className="shrink-0 border-t border-border px-2 py-4 lg:px-3">
        <div className={isSidebarOpen ? 'mb-2 hidden px-1 text-xs font-semibold uppercase tracking-wider text-muted lg:block' : 'sr-only'}>
          {t('appearance')}
        </div>
        <div className={`flex flex-col items-center gap-2 ${isSidebarOpen ? 'lg:flex-row' : ''}`}>
          <LanguageSelector
            compact={!isSidebarOpen}
            className={isSidebarOpen ? 'w-11 px-1 lg:w-auto lg:flex-1 lg:px-3 [&>span]:hidden lg:[&>span]:inline' : ''}
          />
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
