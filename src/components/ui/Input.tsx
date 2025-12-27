import React, { forwardRef } from 'react';
import { cn } from '../../utils/helpers';

/**
 * Input variant types
 */
export type InputVariant = 'default' | 'filled' | 'outlined';

/**
 * Input size types
 */
export type InputSize = 'sm' | 'md' | 'lg';

/**
 * Input validation state types
 */
export type InputState = 'default' | 'success' | 'warning' | 'error';

/**
 * Input component props
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input variant style */
  variant?: InputVariant;
  /** Input size */
  size?: InputSize;
  /** Input validation state */
  state?: InputState;
  /** Label text */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Whether the input is required */
  required?: boolean;
  /** Left icon element */
  leftIcon?: React.ReactNode;
  /** Right icon element */
  rightIcon?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Container CSS classes */
  containerClassName?: string;
  /** Label CSS classes */
  labelClassName?: string;
}

/**
 * Get input variant styles
 */
const getVariantStyles = (variant: InputVariant, state: InputState): string => {
  const baseStyles = 'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1';
  
  const variants = {
    default: {
      default: 'bg-white border border-slate-300 focus:border-blue-500 focus:ring-blue-500',
      success: 'bg-white border border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500',
      warning: 'bg-white border border-amber-300 focus:border-amber-500 focus:ring-amber-500',
      error: 'bg-white border border-red-300 focus:border-red-500 focus:ring-red-500'
    },
    filled: {
      default: 'bg-slate-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-blue-500',
      success: 'bg-emerald-50 border border-transparent focus:bg-white focus:border-emerald-500 focus:ring-emerald-500',
      warning: 'bg-amber-50 border border-transparent focus:bg-white focus:border-amber-500 focus:ring-amber-500',
      error: 'bg-red-50 border border-transparent focus:bg-white focus:border-red-500 focus:ring-red-500'
    },
    outlined: {
      default: 'bg-transparent border-2 border-slate-300 focus:border-blue-500 focus:ring-blue-500',
      success: 'bg-transparent border-2 border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500',
      warning: 'bg-transparent border-2 border-amber-300 focus:border-amber-500 focus:ring-amber-500',
      error: 'bg-transparent border-2 border-red-300 focus:border-red-500 focus:ring-red-500'
    }
  };

  return `${baseStyles} ${variants[variant][state]}`;
};

/**
 * Get input size styles
 */
const getSizeStyles = (size: InputSize): string => {
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  };
  return sizes[size];
};

/**
 * Get state text color
 */
const getStateTextColor = (state: InputState): string => {
  const colors = {
    default: 'text-slate-600',
    success: 'text-emerald-600',
    warning: 'text-amber-600',
    error: 'text-red-600'
  };
  return colors[state];
};

/**
 * Reusable Input component for forms
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      size = 'md',
      state = 'default',
      label,
      helperText,
      error,
      required = false,
      leftIcon,
      rightIcon,
      className,
      containerClassName,
      labelClassName,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    // Use error state if error prop is provided
    const currentState = error ? 'error' : state;
    const displayText = error || helperText;
    
    // Generate unique ID if not provided
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const baseInputStyles = 'w-full rounded-md placeholder-slate-400 disabled:opacity-50 disabled:cursor-not-allowed';
    const variantStyles = getVariantStyles(variant, currentState);
    const sizeStyles = getSizeStyles(size);
    
    // Adjust padding for icons
    const iconPadding = leftIcon && rightIcon 
      ? 'pl-10 pr-10' 
      : leftIcon 
        ? 'pl-10' 
        : rightIcon 
          ? 'pr-10' 
          : '';

    return (
      <div className={cn('w-full', containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'block text-sm font-medium text-slate-700 mb-1',
              labelClassName
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-slate-400">
                {leftIcon}
              </span>
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={cn(
              baseInputStyles,
              variantStyles,
              sizeStyles,
              iconPadding,
              className
            )}
            disabled={disabled}
            aria-invalid={currentState === 'error'}
            aria-describedby={displayText ? `${inputId}-text` : undefined}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-slate-400">
                {rightIcon}
              </span>
            </div>
          )}
        </div>
        
        {displayText && (
          <p
            id={`${inputId}-text`}
            className={cn(
              'mt-1 text-xs',
              getStateTextColor(currentState)
            )}
          >
            {displayText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

/**
 * Textarea component props
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Textarea variant style */
  variant?: InputVariant;
  /** Textarea validation state */
  state?: InputState;
  /** Label text */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Whether the textarea is required */
  required?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Container CSS classes */
  containerClassName?: string;
  /** Label CSS classes */
  labelClassName?: string;
}

/**
 * Textarea component for multi-line text input
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      variant = 'default',
      state = 'default',
      label,
      helperText,
      error,
      required = false,
      className,
      containerClassName,
      labelClassName,
      disabled,
      id,
      rows = 3,
      ...props
    },
    ref
  ) => {
    // Use error state if error prop is provided
    const currentState = error ? 'error' : state;
    const displayText = error || helperText;
    
    // Generate unique ID if not provided
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    const baseTextareaStyles = 'w-full rounded-md px-3 py-2 text-sm placeholder-slate-400 disabled:opacity-50 disabled:cursor-not-allowed resize-vertical';
    const variantStyles = getVariantStyles(variant, currentState);

    return (
      <div className={cn('w-full', containerClassName)}>
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              'block text-sm font-medium text-slate-700 mb-1',
              labelClassName
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            baseTextareaStyles,
            variantStyles,
            className
          )}
          disabled={disabled}
          aria-invalid={currentState === 'error'}
          aria-describedby={displayText ? `${textareaId}-text` : undefined}
          {...props}
        />
        
        {displayText && (
          <p
            id={`${textareaId}-text`}
            className={cn(
              'mt-1 text-xs',
              getStateTextColor(currentState)
            )}
          >
            {displayText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Input;