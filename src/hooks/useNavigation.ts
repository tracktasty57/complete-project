import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { NavigationState, UseNavigationReturn } from '../types/navigation';
import { isActivePath } from '../utils/helpers';

/**
 * Custom hook for navigation state management and utilities
 */
export const useNavigation = (): UseNavigationReturn => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [state, setState] = useState<NavigationState>({
    currentPath: location.pathname,
    isLoading: false,
    history: [location.pathname],
    isMobileMenuOpen: false
  });

  // Update current path when location changes
  useEffect(() => {
    setState(prev => ({
      ...prev,
      currentPath: location.pathname,
      history: prev.history.includes(location.pathname) 
        ? prev.history 
        : [...prev.history, location.pathname]
    }));
  }, [location.pathname]);

  // Navigate to a specific path
  const navigateTo = useCallback((path: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate navigation loading (remove in production)
    setTimeout(() => {
      navigate(path);
      setState(prev => ({ 
        ...prev, 
        isLoading: false,
        isMobileMenuOpen: false // Close mobile menu on navigation
      }));
    }, 100);
  }, [navigate]);

  // Go back in navigation history
  const goBack = useCallback(() => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    setTimeout(() => {
      navigate(-1);
      setState(prev => ({ ...prev, isLoading: false }));
    }, 100);
  }, [navigate]);

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