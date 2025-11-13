import React, { forwardRef } from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-display font-semibold text-burnt-umber mb-2">
            {label}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-burnt-umber/50">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            className={clsx(
              'input-medieval',
              icon && 'pl-12',
              error && 'border-council-red focus:ring-council-red focus:border-council-red',
              className
            )}
            {...props}
          />
        </div>

        {(error || helperText) && (
          <p
            className={clsx(
              'mt-2 text-sm',
              error ? 'text-council-red' : 'text-burnt-umber/60'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-display font-semibold text-burnt-umber mb-2">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          className={clsx(
            'textarea-medieval',
            error && 'border-council-red focus:ring-council-red focus:border-council-red',
            className
          )}
          {...props}
        />

        {(error || helperText) && (
          <p
            className={clsx(
              'mt-2 text-sm',
              error ? 'text-council-red' : 'text-burnt-umber/60'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-display font-semibold text-burnt-umber mb-2">
            {label}
          </label>
        )}

        <select
          ref={ref}
          className={clsx(
            'input-medieval cursor-pointer',
            error && 'border-council-red focus:ring-council-red focus:border-council-red',
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {(error || helperText) && (
          <p
            className={clsx(
              'mt-2 text-sm',
              error ? 'text-council-red' : 'text-burnt-umber/60'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
