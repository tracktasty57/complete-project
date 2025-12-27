import React, { forwardRef } from 'react';
import { cn } from '../../utils/helpers';

/**
 * Card variant types
 */
export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';

/**
 * Card padding types
 */
export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Base Card component props
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card variant style */
  variant?: CardVariant;
  /** Card padding size */
  padding?: CardPadding;
  /** Whether the card is hoverable */
  hoverable?: boolean;
  /** Whether the card is clickable */
  clickable?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Card content */
  children?: React.ReactNode;
}

/**
 * Card Header component props
 */
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional CSS classes */
  className?: string;
  /** Header content */
  children?: React.ReactNode;
}

/**
 * Card Body component props
 */
export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional CSS classes */
  className?: string;
  /** Body content */
  children?: React.ReactNode;
}

/**
 * Card Footer component props
 */
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional CSS classes */
  className?: string;
  /** Footer content */
  children?: React.ReactNode;
}

/**
 * Get card variant styles with modern glassmorphism effects
 */
const getVariantStyles = (variant: CardVariant): string => {
  const variants = {
    default: 'bg-white/80 backdrop-blur-md border border-white/20 shadow-lg shadow-orange-500/10',
    elevated: 'bg-white/90 backdrop-blur-lg shadow-2xl shadow-orange-500/20 border border-white/30',
    outlined: 'bg-white/70 backdrop-blur-sm border-2 border-orange-200/50 shadow-md shadow-orange-500/5',
    filled: 'bg-gradient-to-br from-orange-50/80 to-red-50/80 backdrop-blur-sm border border-orange-200/30 shadow-lg shadow-orange-500/10'
  };
  return variants[variant];
};

/**
 * Get card padding styles
 */
const getPaddingStyles = (padding: CardPadding): string => {
  const paddings = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };
  return paddings[padding];
};

/**
 * Main Card component for content sections
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      hoverable = false,
      clickable = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'rounded-2xl transition-all duration-500 ease-out relative overflow-hidden';
    const variantStyles = getVariantStyles(variant);
    const paddingStyles = getPaddingStyles(padding);
    
    const hoverStyles = hoverable || clickable 
      ? 'hover:shadow-2xl hover:shadow-orange-500/25 hover:-translate-y-2 hover:scale-105' 
      : '';
    
    const clickableStyles = clickable 
      ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2 active:scale-95' 
      : '';

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles,
          paddingStyles,
          hoverStyles,
          clickableStyles,
          className
        )}
        tabIndex={clickable ? 0 : undefined}
        role={clickable ? 'button' : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * Card Header component
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5 pb-4', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

/**
 * Card Title component
 */
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Title level (h1-h6) */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Additional CSS classes */
  className?: string;
  /** Title content */
  children?: React.ReactNode;
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ as: Component = 'h3', className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn('text-lg font-semibold leading-none tracking-tight text-slate-900', className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

CardTitle.displayName = 'CardTitle';

/**
 * Card Description component
 */
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Additional CSS classes */
  className?: string;
  /** Description content */
  children?: React.ReactNode;
}

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-sm text-slate-600 leading-relaxed', className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);

CardDescription.displayName = 'CardDescription';

/**
 * Card Body component
 */
export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex-1', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

/**
 * Card Footer component
 */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center pt-4', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

export default Card;