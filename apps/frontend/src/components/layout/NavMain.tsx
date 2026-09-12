/**
 * @file NavMain.tsx
 * @description Main navigation section for the desktop sidebar with collapsible support.
 */
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { primaryNavigation } from './navigation';

export type NavMainProps = {
  isSidebarOpen: boolean;
};

export function NavMain({ isSidebarOpen }: NavMainProps) {
  const { t } = useTranslation('navigation');

  return (
    <nav
      aria-label={t('desktop')}
      className={`flex-1 space-y-1 overflow-y-auto py-4 ${isSidebarOpen ? 'px-3' : 'px-2'}`}
    >
      {primaryNavigation.map(({ labelKey, path, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          end={path === '/'}
          title={t(labelKey)}
          aria-label={!isSidebarOpen ? t(labelKey) : undefined}
          className={({ isActive }) =>
            `group flex min-h-11 items-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
              isSidebarOpen ? 'w-full gap-3 px-3' : 'min-w-11 justify-center px-0'
            } ${
              isActive
                ? 'bg-primary-subtle text-primary font-semibold'
                : 'text-muted hover:bg-secondary hover:text-foreground'
            }`
          }
        >
          <Icon aria-hidden="true" size={18} strokeWidth={1.8} className="shrink-0" />
          <span className={isSidebarOpen ? 'truncate' : 'sr-only'}>
            {t(labelKey)}
          </span>
        </NavLink>
      ))}
    </nav>
  );
}
