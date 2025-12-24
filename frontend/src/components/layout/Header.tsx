import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAVIGATION_ITEMS, AUTH_NAVIGATION_ITEMS, NAVIGATION_LABELS } from '../../constants/navigation';
import type { NavigationItem } from '../../types/navigation';
import { removeToken } from '../../utils/auth'; // ✅ add this import

export interface HeaderProps {
  brandText?: string;
  brandImageUrl?: string;
  showAuthLinks?: boolean;
  isAuthenticated?: boolean;
  onLogout?: () => void;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  brandText = 'Recipe Finder',
  brandImageUrl,
  showAuthLinks = true,
  isAuthenticated = false,
  onLogout,
  className = ''
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // ✅ for redirect

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const isActivePath = (path: string) => location.pathname === path;

  // ✅ handle logout here
  const handleLogout = () => {
    removeToken(); // clear JWT
    if (onLogout) onLogout();
    navigate('/login'); // redirect to login
  };

  const renderNavigationItem = (item: NavigationItem, isMobile = false) => {
    if (item.requiresAuth && !isAuthenticated) return null;

    const Icon = item.icon;
    const isActive = isActivePath(item.path);

    const baseClasses = isMobile
      ? 'flex items-center space-x-3 px-6 py-4 text-base font-medium transition-all duration-300 hover:bg-orange-50/80 hover:text-orange-600 rounded-xl group'
      : 'flex items-center space-x-2 px-4 py-3 text-sm font-semibold transition-all duration-300 hover:text-orange-600 hover:bg-orange-50/50 rounded-xl group relative';

    const activeClasses = isActive
      ? isMobile
        ? 'bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 border-r-4 border-orange-500 shadow-lg'
        : 'text-orange-600 bg-orange-50/50 shadow-md'
      : 'text-slate-700';

    return (
      <Link
        key={item.id}
        to={item.path}
        onClick={isMobile ? closeMobileMenu : undefined}
        className={`${baseClasses} ${activeClasses}`}
        aria-current={isActive ? 'page' : undefined}
      >
        {Icon && (
          <Icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
        )}
        <span className="group-hover:translate-x-1 transition-transform duration-300">{item.label}</span>
      </Link>
    );
  };

  // ✅ Updated logout handling
  const renderAuthLinks = (isMobile = false) => {
    if (!showAuthLinks) return null;

    if (isAuthenticated) {
      return (
        <button
          onClick={handleLogout} // ✅ updated
          className={`${isMobile
              ? 'flex items-center space-x-3 px-6 py-4 text-base font-medium text-red-600 hover:bg-red-50/80 rounded-xl transition-all duration-300 group'
              : 'px-4 py-2 text-sm font-semibold text-red-600 hover:text-red-700 hover:bg-red-50/50 rounded-xl transition-all duration-300 group'
            }`}
        >
          <span className="group-hover:translate-x-1 transition-transform duration-300">Logout</span>
        </button>
      );
    }

    return AUTH_NAVIGATION_ITEMS.map(item => renderNavigationItem(item, isMobile));
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-orange-200/30 shadow-lg shadow-orange-500/10 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-3 text-2xl font-bold text-slate-900 hover:text-orange-600 transition-all duration-300 group"
            >
              {brandImageUrl ? (
                <img src={brandImageUrl} alt={brandText} className="h-10 w-10 object-contain group-hover:scale-110 transition-transform duration-300" />
              ) : (
                <img
                  src="/favicon.png"
                  alt="Logo"
                  className="h-12 w-12 object-contain rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300"
                />
              )}
              <span className="hidden sm:block bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
                {brandText}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2 bg-white/50 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg border border-orange-200/30" aria-label={NAVIGATION_LABELS.MAIN_NAVIGATION}>
            {NAVIGATION_ITEMS.map(item => renderNavigationItem(item, false))}
          </nav>

          {/* Desktop Auth Links */}
          <div className="hidden md:flex items-center space-x-3">
            {renderAuthLinks(false)}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-3 rounded-2xl text-slate-700 hover:text-orange-600 hover:bg-orange-50/80 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 bg-white/80 backdrop-blur-sm border border-orange-200/30"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 rotate-90 transition-transform duration-300" />
              ) : (
                <Menu className="h-6 w-6 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden animate-fade-in-up">
          <div className="mx-4 mt-4 mb-6 p-6 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-orange-200/30">
            <nav aria-label={NAVIGATION_LABELS.MAIN_NAVIGATION}>
              <div className="space-y-2">
                {NAVIGATION_ITEMS.map(item => renderNavigationItem(item, true))}
              </div>
              <div className="border-t border-orange-200/50 pt-4 mt-4">
                <div className="space-y-2">{renderAuthLinks(true)}</div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;