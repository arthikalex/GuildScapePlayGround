import { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'parchment' | 'wax-seal'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  isLoading?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = 'font-medium transition-all duration-200 focus-visible-ring disabled:opacity-50 disabled:cursor-not-allowed'

  const variantClasses = {
    primary: 'btn-primary',
    parchment: 'btn-parchment',
    'wax-seal': 'btn-wax-seal',
  }

  const sizeClasses = {
    sm: variant === 'wax-seal' ? 'w-8 h-8 text-sm' : 'px-3 py-1.5 text-sm',
    md: variant === 'wax-seal' ? 'w-12 h-12 text-base' : 'px-4 py-2 text-base',
    lg: variant === 'wax-seal' ? 'w-16 h-16 text-lg' : 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        isLoading && 'opacity-70 cursor-wait',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5"
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
        </span>
      ) : (
        children
      )}
    </button>
  )
}
