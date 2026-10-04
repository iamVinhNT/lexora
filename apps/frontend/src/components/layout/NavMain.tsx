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
      className={`min-h-0 flex-1 space-y-2 overflow-y-auto px-3 py-4 ${isSidebarOpen ? '' : 'lg:px-2'}`}
    >
      {primaryNavigation.map(({ labelKey, path, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          end={path === '/'}
          title={t(labelKey)}
          aria-label={t(labelKey)}
          className={({ isActive }) =>
            `group flex min-h-14 min-w-11 flex-col items-center justify-center gap-1 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
              isSidebarOpen ? 'lg:min-h-11 lg:w-full lg:flex-row lg:justify-start lg:gap-3 lg:px-3' : 'lg:min-h-11 lg:flex-row'
            } ${
              isActive
                ? 'bg-primary-subtle text-primary font-semibold'
                : 'text-muted hover:bg-secondary hover:text-foreground'
            }`
          }
        >
          <Icon aria-hidden="true" size={18} strokeWidth={1.8} className="shrink-0" />
          <span className={isSidebarOpen ? 'max-w-full break-words text-center text-[10px] leading-3 lg:truncate lg:text-left lg:text-sm lg:leading-5' : 'max-w-full break-words text-center text-[10px] leading-3 lg:sr-only'}>
            {t(labelKey)}
          </span>
        </NavLink>
      ))}
    </nav>
  );
}
