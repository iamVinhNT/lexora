/**
 * @file navigation.ts
 * @description Shared navigation definitions for desktop, mobile, and More navigation.
 */
import type { LucideIcon } from 'lucide-react';
import { BarChart3, BookOpen, BookText, GraduationCap, LayoutDashboard, Network, RotateCcw, Settings } from 'lucide-react';

export type NavigationItem = {
  labelKey: 'overview' | 'learn' | 'review' | 'vocabulary' | 'grammar' | 'contexts' | 'statistics' | 'settings';
  path: string;
  icon: LucideIcon;
};

export const primaryNavigation: NavigationItem[] = [
  { labelKey: 'overview', path: '/', icon: LayoutDashboard },
  { labelKey: 'learn', path: '/learn', icon: BookOpen },
  { labelKey: 'review', path: '/review', icon: RotateCcw },
  { labelKey: 'vocabulary', path: '/words', icon: BookText },
  { labelKey: 'grammar', path: '/grammar', icon: GraduationCap },
  { labelKey: 'contexts', path: '/contexts', icon: Network },
  { labelKey: 'statistics', path: '/analytics', icon: BarChart3 },
  { labelKey: 'settings', path: '/settings', icon: Settings },
];

export const mobileNavigation = primaryNavigation.slice(0, 4);

export const moreNavigation = primaryNavigation.slice(4);
