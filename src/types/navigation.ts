import type { ComponentType, ReactNode } from 'react';

/**
 * Represents a single navigation item in the application
 */
export interface NavigationItem {
  /** Unique identifier for the navigation item */
  id: string;
  /** Display label for the navigation item */
  label: string;
  /** URL path for the navigation item */
  path: string;
  /** Optional icon component to display with the navigation item */
  icon?: ComponentType<{ className?: string; size?: number }>;
  /** Whether this navigation item requires authentication */
  requiresAuth?: boolean;
  /** Optional child navigation items for nested menus */
  children?: NavigationItem[];
}

/**
 * Props for the Navigation component
 */
export interface NavigationProps {
  /** Array of navigation items to render */
  items: NavigationItem[];
  /** Current active path */
  currentPath: string;
  /** Optional callback when navigation occurs */
  onNavigate?: (path: string) => void;
  /** Whether the navigation is in mobile mode */
  isMobile?: boolean;
  /** Whether the mobile menu is open */
  isOpen?: boolean;
  /** Callback to toggle mobile menu */
  onToggle?: () => void;
}

/**
 * Props for layout components
 */
export interface LayoutProps {
  /** Child components to render */
  children: ReactNode;
  /** Optional page title */
  title?: string;
  /** Optional page description */
  description?: string;
}

/**
 * Props for page components
 */
export interface PageProps {
  /** Page title */
  title: string;
  /** Optional page description */
  description?: string;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Navigation state for custom hooks
 */
export interface NavigationState {
  /** Current active path */
  currentPath: string;
  /** Whether navigation is loading */
  isLoading: boolean;
  /** Navigation history */
  history: string[];
  /** Whether mobile menu is open */
  isMobileMenuOpen: boolean;
}

/**
 * Return type for useNavigation hook
 */
export interface UseNavigationReturn {
  /** Current navigation state */
  state: NavigationState;
  /** Navigate to a specific path */
  navigateTo: (path: string) => void;
  /** Go back in navigation history */
  goBack: () => void;
  /** Toggle mobile menu */
  toggleMobileMenu: () => void;
  /** Check if a path is currently active */
  isActive: (path: string) => boolean;
}