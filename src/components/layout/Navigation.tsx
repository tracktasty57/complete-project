"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavigationProps, NavigationItem } from '../../types/navigation';
import { NAVIGATION_CONFIG, NAVIGATION_LABELS } from '../../constants/navigation';

/**
 * Navigation component with dynamic menu rendering and accessibility features
 */
export const Navigation: React.FC<NavigationProps> = ({
  items,
  currentPath,
  onNavigate,
  isMobile = false,
  isOpen = false,
  onToggle
}) => {
  const pathname = usePathname();
  const navigationRef = useRef<HTMLElement>(null);
  const firstItemRef = useRef<HTMLAnchorElement>(null);

  // Update current path from router if not provided
  const activePath = currentPath || pathname;

  // Focus management for mobile menu
  useEffect(() => {
    if (isMobile && isOpen && firstItemRef.current) {
      firstItemRef.current.focus();
    }
  }, [isMobile, isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, item: NavigationItem) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleNavigation(item.path);
    }

    if (event.key === 'Escape' && isMobile && onToggle) {
      onToggle();
    }
  };

  // Handle navigation with optional callback
  const handleNavigation = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    }

    // Close mobile menu after navigation
    if (isMobile && onToggle) {
      onToggle();
    }
  };

  // Check if a path is currently active
  const isActivePath = (path: string): boolean => {
    // Falls back to empty string if activePath is null
    const current = activePath || '';
    if (path === '/') {
      return current === '/';
    }
    return current.startsWith(path);
  };

  // Render individual navigation item
  const renderNavigationItem = (item: NavigationItem, isFirstMainItem = false) => {
    const Icon = item.icon;
    const isActive = isActivePath(item.path);

    const baseClasses = isMobile
      ? 'flex items-center space-x-3 px-4 py-3 text-base font-medium transition-all duration-200 rounded-lg mx-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
      : 'flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2';

    const activeClasses = isActive
      ? isMobile
        ? 'bg-primary-100 text-primary-800 shadow-sm'
        : 'bg-primary-50 text-primary-700 shadow-sm'
      : 'text-slate-700 hover:text-primary-600 hover:bg-slate-50';

    const ariaLabel = `${item.label}${isActive ? ' (current page)' : ''}`;

    return (
      <Link
        key={item.id}
        ref={isFirstMainItem ? firstItemRef : undefined}
        href={item.path}
        onClick={() => handleNavigation(item.path)}
        onKeyDown={(e) => handleKeyDown(e, item)}
        className={`${baseClasses} ${activeClasses}`}
        aria-current={isActive ? 'page' : undefined}
        aria-label={ariaLabel}
        role="menuitem"
        tabIndex={isMobile && !isOpen ? -1 : 0}
      >
        {Icon && (
          <Icon
            className={`${isMobile ? 'h-6 w-6' : 'h-5 w-5'} flex-shrink-0`}
            aria-hidden="true"
          />
        )}
        <span className="truncate">{item.label}</span>
        {isActive && (
          <span className="sr-only">(current page)</span>
        )}
      </Link>
    );
  };

  // Render child navigation items (for nested menus)
  const renderChildItems = (children: NavigationItem[]) => {
    return (
      <div className={`${isMobile ? 'ml-6 mt-2 space-y-1' : 'ml-4 mt-1 space-y-1'}`}>
        {children.map((child) => renderNavigationItem(child, false))}
      </div>
    );
  };

  // Mobile navigation wrapper
  if (isMobile) {
    return (
      <nav
        ref={navigationRef}
        className={`${isOpen ? 'block' : 'hidden'
          } md:hidden bg-white border-t border-slate-200 shadow-lg`}
        aria-label={NAVIGATION_LABELS.MAIN_NAVIGATION}
        role="menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {items.slice(0, NAVIGATION_CONFIG.MAX_MOBILE_ITEMS).map((item, index) => (
            <div key={item.id}>
              {renderNavigationItem(item, index === 0)}
              {item.children && item.children.length > 0 && renderChildItems(item.children)}
            </div>
          ))}
        </div>
      </nav>
    );
  }

  // Desktop navigation
  return (
    <nav
      ref={navigationRef}
      className="hidden md:flex items-center space-x-1"
      aria-label={NAVIGATION_LABELS.MAIN_NAVIGATION}
      role="menubar"
    >
      {items.map((item, index) => (
        <div key={item.id} className="relative">
          {renderNavigationItem(item, index === 0)}
          {item.children && item.children.length > 0 && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-slate-200 py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {renderChildItems(item.children)}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Navigation;