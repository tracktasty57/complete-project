import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, BookOpen } from 'lucide-react';
import { FOOTER_NAVIGATION_ITEMS, NAVIGATION_LABELS } from '../../constants/navigation';

/**
 * Props for the Footer component
 */
export interface FooterProps {
  /** Project name to display in footer */
  projectName?: string;
  /** Copyright year */
  copyrightYear?: number;
  /** Copyright holder name */
  copyrightHolder?: string;
  /** Whether to show social media links */
  showSocialLinks?: boolean;
  /** Whether to show navigation links */
  showNavigationLinks?: boolean;
  /** Additional footer content */
  children?: React.ReactNode;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Footer component with copyright, social links, and navigation
 */
export const Footer: React.FC<FooterProps> = ({
  projectName = 'Recipe Finder',
  copyrightYear = new Date().getFullYear(),
  showSocialLinks = true,
  showNavigationLinks = true,
  children,
  className = ''
}) => {
  return (
    <footer className={`relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300 overflow-hidden ${className}`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Project info section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-10 w-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">
                    RF
                  </span>
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  {projectName}
                </h3>
              </div>
              <p className="text-slate-400 mb-6 max-w-md text-base leading-relaxed">
                Your complete culinary companion for discovering recipes, planning meals, and managing shopping lists.
                Developed at University of Gujrat, Pakistan with modern technology for the best cooking experience.
              </p>

              {/* Contact information */}
              {showSocialLinks && (
                <div className="space-y-3">
                  <a
                    href="mailto:tracktasty57@gmail.com"
                    className="flex items-center space-x-3 text-slate-400 hover:text-orange-400 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">tracktasty57@gmail.com</span>
                  </a>
                  <a
                    href="tel:+923001234567"
                    className="flex items-center space-x-3 text-slate-400 hover:text-orange-400 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">+92 300 1234567</span>
                  </a>
                  <div className="flex items-center space-x-3 text-slate-400">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">University of Gujrat, Pakistan</span>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation links */}
            {showNavigationLinks && (
              <div>
                <h4 className="text-base font-bold text-white mb-4 relative">
                  <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    Quick Links
                  </span>
                  <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                </h4>
                <nav aria-label={NAVIGATION_LABELS.FOOTER_NAVIGATION}>
                  <ul className="space-y-2">
                    {FOOTER_NAVIGATION_ITEMS.map((item) => (
                      <li key={item.id}>
                        <Link
                          to={item.path}
                          className="text-slate-400 hover:text-orange-400 transition-all duration-300 text-sm font-medium hover:translate-x-1 inline-block group"
                        >
                          <span className="group-hover:text-orange-400 transition-colors">→</span> {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}

            {/* Additional content */}
            {children && (
              <div>
                {children}
              </div>
            )}

            {/* Contact info or additional links */}
            <div>
              <h4 className="text-base font-bold text-white mb-4 relative">
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Support & Help
                </span>
                <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/contact"
                    className="text-slate-400 hover:text-green-400 transition-all duration-300 text-base font-medium hover:translate-x-2 inline-flex items-center space-x-2 group"
                  >
                    <Mail className="h-4 w-4 group-hover:text-green-400 transition-colors" />
                    <span>Contact Us</span>
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:tracktasty57@gmail.com"
                    className="text-slate-400 hover:text-green-400 transition-all duration-300 text-base font-medium hover:translate-x-2 inline-flex items-center space-x-2 group"
                  >
                    <Mail className="h-4 w-4 group-hover:text-green-400 transition-colors" />
                    <span>Email Support</span>
                  </a>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-slate-400 hover:text-green-400 transition-all duration-300 text-base font-medium hover:translate-x-2 inline-flex items-center space-x-2 group"
                  >
                    <BookOpen className="h-4 w-4 group-hover:text-green-400 transition-colors" />
                    <span>About Us</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright */}
        <div className="border-t border-slate-700 pt-6 pb-6 mt-6">
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="text-slate-400 text-center">
              <span className="text-sm font-medium">© {copyrightYear} Recipe Finder - University of Gujrat. All rights reserved.</span>
            </div>

            <div className="flex items-center space-x-2 text-slate-400">
              <span className="text-sm">Made with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" aria-hidden="true" />
              <span className="text-sm">for food lovers everywhere</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;