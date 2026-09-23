/**
 * @file SidebarTrigger.tsx
 * @description Collapse and expand toggle button for desktop sidebar navigation.
 */
import { PanelLeft, PanelLeftClose } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useUiStore } from '../../stores/ui.store';

export type SidebarTriggerProps = {
  className?: string;
};

export function SidebarTrigger({ className = '' }: SidebarTriggerProps) {
  const { t } = useTranslation('navigation');
  const isSidebarOpen = useUiStore((state) => state.isSidebarOpen);
  const setSidebarOpen = useUiStore((state) => state.setSidebarOpen);

  const label = t(isSidebarOpen ? 'collapseSidebar' : 'expandSidebar');

  return (
    <button
      type="button"
      data-sidebar="trigger"
      aria-label={label}
      title={label}
      aria-expanded={isSidebarOpen}
      onClick={() => setSidebarOpen(!isSidebarOpen)}
      className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${className}`}
    >
      {isSidebarOpen ? (
        <PanelLeftClose aria-hidden="true" size={18} />
      ) : (
        <PanelLeft aria-hidden="true" size={18} />
      )}
      <span className="sr-only">{label}</span>
    </button>
  );
}
