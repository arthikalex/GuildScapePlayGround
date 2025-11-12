import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react'
import clsx from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  illuminated?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, illuminated = false, className, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={props.id}
            className={clsx(
              'block text-sm font-medium text-guild-wood-dark',
              illuminated && 'text-lg font-serif'
            )}
          >
            {illuminated && <span className="text-3xl text-brand-purple mr-2" aria-hidden="true">{label[0]}</span>}
            {illuminated ? label.slice(1) : label}
          </label>
        )}
        <input
          ref={ref}
          className={clsx(
            'input',
            error && 'border-wax-red focus:border-wax-red focus:ring-wax-red/20',
            illuminated && 'text-lg py-3',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...props}
        />
        {error && (
          <p
            id={`${props.id}-error`}
            className="text-sm text-wax-red"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-guild-wood-dark"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={clsx(
            'input min-h-[100px] resize-y',
            error && 'border-wax-red focus:border-wax-red focus:ring-wax-red/20',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...props}
        />
        {error && (
          <p
            id={`${props.id}-error`}
            className="text-sm text-wax-red"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

TextArea.displayName = 'TextArea'

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-guild-wood-dark"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={clsx(
            'input',
            error && 'border-wax-red focus:border-wax-red focus:ring-wax-red/20',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p
            id={`${props.id}-error`}
            className="text-sm text-wax-red"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
