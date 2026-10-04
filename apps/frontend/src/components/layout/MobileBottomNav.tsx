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
  const isMoreOpen = useUiStore((state) => state.isMoreOpen);

  return (
    <nav
      aria-label={t('mobile')}
      className="glass-nav fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 gap-1 border-t border-border px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden"
    >
      {mobileNavigation.map(({ labelKey, path, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          end={path === '/'}
          className={({ isActive }) =>
            `flex min-h-14 min-w-0 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-medium leading-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset sm:text-[11px] ${
              isActive ? 'bg-primary-subtle text-primary' : 'text-muted hover:bg-secondary hover:text-foreground'
            }`
          }
        >
          <Icon aria-hidden="true" size={20} strokeWidth={1.8} className="shrink-0" />
          <span className="w-full whitespace-nowrap text-center">{t(labelKey)}</span>
        </NavLink>
      ))}
      <button
        ref={moreTriggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isMoreOpen}
        aria-controls="more-navigation"
        onClick={openMore}
        className={`flex min-h-14 min-w-0 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-medium leading-4 transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset sm:text-[11px] ${isMoreOpen ? 'bg-primary-subtle text-primary' : 'text-muted'}`}
      >
        <MoreHorizontal aria-hidden="true" size={19} strokeWidth={1.8} />
        {t('more')}
      </button>
    </nav>
  );
}
