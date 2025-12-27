import { useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { NavigationState, UseNavigationReturn } from '../types/navigation';
import { isActivePath } from '../utils/helpers';

/**
 * Custom hook for navigation state management and utilities
 */
export const useNavigation = (): UseNavigationReturn => {
  const pathname = usePathname();
  const router = useRouter();

  const [state, setState] = useState<NavigationState>({
    currentPath: pathname || '',
    isLoading: false,
    history: [pathname || ''],
    isMobileMenuOpen: false
  });

  // Update current path when location changes
  useEffect(() => {
    if (!pathname) return;
    setState(prev => ({
      ...prev,
      currentPath: pathname,
      history: prev.history.includes(pathname)
        ? prev.history
        : [...prev.history, pathname]
    }));
  }, [pathname]);

  // Navigate to a specific path
  const navigateTo = useCallback((path: string) => {
    setState(prev => ({ ...prev, isLoading: true }));

    // Simulate navigation loading (remove in production)
    setTimeout(() => {
      router.push(path);
      setState(prev => ({
        ...prev,
        isLoading: false,
        isMobileMenuOpen: false // Close mobile menu on navigation
      }));
    }, 100);
  }, [router]);

  // Go back in navigation history
  const goBack = useCallback(() => {
    setState(prev => ({ ...prev, isLoading: true }));

    setTimeout(() => {
      router.back();
      setState(prev => ({ ...prev, isLoading: false }));
    }, 100);
  }, [router]);

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setState(prev => ({
      ...prev,
      isMobileMenuOpen: !prev.isMobileMenuOpen
    }));
  }, []);

  // Check if a path is currently active
  const isActive = useCallback((path: string): boolean => {
    return isActivePath(state.currentPath, path);
  }, [state.currentPath]);

  return {
    state,
    navigateTo,
    goBack,
    toggleMobileMenu,
    isActive
  };
};
