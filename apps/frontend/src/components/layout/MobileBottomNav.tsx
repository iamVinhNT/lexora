/**
 * @file MobileBottomNav.tsx
 * @description Fixed mobile navigation with four primary routes and More access.
 */
import type { RefObject } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { mobileNavigation } from './navigation';
import { useUiStore } from '../../stores/ui.store';

type MobileBottomNavProps = {
  moreTriggerRef: RefObject<HTMLButtonElement>;
};

export function MobileBottomNav({ moreTriggerRef }: MobileBottomNavProps) {
  const { t } = useTranslation('navigation');
  const openMore = useUiStore((state) => state.openMore);

  return (
    <nav
      aria-label={t('mobile')}
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-surface px-1 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
    >
      {mobileNavigation.map(({ labelKey, path, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          end={path === '/'}
          className={({ isActive }) =>
            `flex min-h-16 flex-col items-center justify-center gap-1 rounded-lg text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset ${
              isActive ? 'text-primary' : 'text-muted hover:text-foreground'
            }`
          }
        >
          <Icon aria-hidden="true" size={19} strokeWidth={1.8} />
          {t(labelKey)}
        </NavLink>
      ))}
      <button
        ref={moreTriggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={useUiStore((state) => state.isMoreOpen)}
        aria-controls="more-navigation"
        onClick={openMore}
        className="flex min-h-16 flex-col items-center justify-center gap-1 rounded-lg text-[11px] font-medium text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
      >
        <MoreHorizontal aria-hidden="true" size={19} strokeWidth={1.8} />
        {t('more')}
      </button>
    </nav>
  );
}
