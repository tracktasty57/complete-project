import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import type { HeaderProps } from './Header';
import type { FooterProps } from './Footer';
import type { LayoutProps } from '../../types/navigation';

/**
 * Extended props for the Layout component
 */
export interface LayoutComponentProps extends LayoutProps {
  /** Additional CSS classes for the layout wrapper */
  className?: string;
  /** Props to pass to the Header component */
  headerProps?: Partial<HeaderProps>;
  /** Props to pass to the Footer component */
  footerProps?: Partial<FooterProps>;
  /** Whether to show the header */
  showHeader?: boolean;
  /** Whether to show the footer */
  showFooter?: boolean;
  /** Additional CSS classes for the main content area */
  mainClassName?: string;
  /** Whether to apply container styling to main content */
  containerized?: boolean;
  /** Whether to apply padding to main content */
  padded?: boolean;
  /** Minimum height for the main content area */
  minHeight?: 'screen' | 'auto' | string;
}

/**
 * Main Layout component that provides consistent page structure
 */
export const Layout: React.FC<LayoutComponentProps> = ({
  children,
  title,
  description,
  headerProps = {},
  footerProps = {},
  showHeader = true,
  showFooter = true,
  mainClassName = '',
  containerized = true,
  padded = true,
  minHeight = 'screen',
  className = ''
}) => {
  // Set document title if provided
  React.useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  // Set meta description if provided
  React.useEffect(() => {
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
    }
  }, [description]);

  // Calculate main content classes
  const getMainClasses = () => {
    const baseClasses = 'flex-1';
    const heightClasses = minHeight === 'screen' 
      ? 'min-h-screen' 
      : minHeight === 'auto' 
        ? 'min-h-0' 
        : `min-h-[${minHeight}]`;
    
    const containerClasses = containerized 
      ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' 
      : '';
    
    // Add top padding for fixed header (20 = h-20 from header)
    const paddingClasses = padded 
      ? 'pt-24 pb-6 sm:pb-8 lg:pb-12' 
      : 'pt-20';

    return `${baseClasses} ${heightClasses} ${containerClasses} ${paddingClasses} ${mainClassName}`.trim();
  };

  // Calculate layout wrapper classes
  const getLayoutClasses = () => {
    const baseClasses = 'flex flex-col';
    const heightClasses = minHeight === 'screen' ? 'min-h-screen' : '';
    
    return `${baseClasses} ${heightClasses} ${className}`.trim();
  };

  return (
    <div className={getLayoutClasses()}>
      {/* Header */}
      {showHeader && (
        <Header
          {...headerProps}
        />
      )}

      {/* Main content area */}
      <main 
        className={getMainClasses()}
        role="main"
        aria-label="Main content"
      >
        {children}
      </main>

      {/* Footer */}
      {showFooter && (
        <Footer
          {...footerProps}
        />
      )}
    </div>
  );
};

export default Layout;