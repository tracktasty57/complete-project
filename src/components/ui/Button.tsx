import React, { forwardRef, type ReactNode } from 'react';
import { cn } from '../../utils/helpers';

/**
 * Button variant types
 */
export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'destructive';

/**
 * Button size types
 */
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Button component props
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant style */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Whether the button is in loading state */
  loading?: boolean;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Optional icon to display before text */
  leftIcon?: ReactNode;
  /** Optional icon to display after text */
  rightIcon?: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Button content */
  children?: ReactNode;
}

/**
 * Get button variant styles with modern gradients and animations
 */
const getVariantStyles = (variant: ButtonVariant): string => {
  const variants = {
    primary: 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 focus:ring-orange-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95',
    secondary: 'bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 focus:ring-slate-500 text-slate-900 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95',
    accent: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 focus:ring-green-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95',
    outline: 'border-2 border-orange-300 hover:border-orange-500 hover:bg-orange-50 focus:ring-orange-500 text-orange-700 hover:text-orange-800 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 backdrop-blur-sm',
    ghost: 'hover:bg-orange-100/80 focus:ring-orange-500 text-slate-700 hover:text-orange-800 backdrop-blur-sm transform hover:scale-105 active:scale-95',
    destructive: 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 focus:ring-red-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95'
  };
  return variants[variant];
};

/**
 * Get button size styles
 */
const getSizeStyles = (size: ButtonSize): string => {
  const sizes = {
    sm: 'px-3 py-1.5 text-sm font-medium',
    md: 'px-4 py-2 text-sm font-medium',
    lg: 'px-6 py-3 text-base font-medium',
    xl: 'px-8 py-4 text-lg font-semibold'
  };
  return sizes[size];
};

/**
 * Reusable Button component with multiple variants and sizes
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden';

    const variantStyles = getVariantStyles(variant);
    const sizeStyles = getSizeStyles(size);

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles,
          sizeStyles,
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {leftIcon && !loading && (
          <span className="mr-2 flex-shrink-0">
            {leftIcon}
          </span>
        )}

        {children}

        {rightIcon && (
          <span className="ml-2 flex-shrink-0">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;