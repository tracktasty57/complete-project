"use client";

import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import type { HeaderProps } from './Header';
import type { FooterProps } from './Footer';
import type { LayoutProps } from '../../types/navigation';

export interface LayoutComponentProps extends LayoutProps {
  className?: string;
  headerProps?: Partial<HeaderProps>;
  footerProps?: Partial<FooterProps>;
  showHeader?: boolean;
  showFooter?: boolean;
  mainClassName?: string;
  containerized?: boolean;
  padded?: boolean;
  minHeight?: 'screen' | 'auto' | string;
}

export const Layout: React.FC<LayoutComponentProps> = ({
  children,
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

    const paddingClasses = padded
      ? 'pt-24 pb-6 sm:pb-8 lg:pb-12'
      : 'pt-20';

    return `${baseClasses} ${heightClasses} ${containerClasses} ${paddingClasses} ${mainClassName}`.trim();
  };

  const getLayoutClasses = () => {
    const baseClasses = 'flex flex-col';
    const heightClasses = minHeight === 'screen' ? 'min-h-screen' : '';

    return `${baseClasses} ${heightClasses} ${className}`.trim();
  };

  return (
    <div className={getLayoutClasses()}>
      {showHeader && (
        <Header
          {...headerProps}
        />
      )}

      <main
        className={getMainClasses()}
        role="main"
        aria-label="Main content"
      >
        {children}
      </main>

      {showFooter && (
        <Footer
          {...footerProps}
        />
      )}
    </div>
  );
};

export default Layout;