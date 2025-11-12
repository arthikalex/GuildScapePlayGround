'use client'

import { ReactNode, useEffect } from 'react'
import { Button } from './Button'
import clsx from 'clsx'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
  ceremonial?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  ceremonial = false,
  size = 'md',
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
    }
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  }

  return (
    <div
      className="modal-backdrop p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={clsx(
          'bg-parchment rounded-lg shadow-candlelight-lg w-full animate-scale-in',
          sizeClasses[size],
          ceremonial && 'ceremonial-border border-2 border-medieval-gold p-1'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {ceremonial && (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-4xl" aria-hidden="true">
            ✨
          </div>
        )}

        {/* Header */}
        <div className={clsx(
          'flex items-center justify-between p-6 border-b border-guild-wood/20',
          ceremonial && 'bg-gradient-to-r from-parchment via-parchment-dark to-parchment'
        )}>
          <h2
            id="modal-title"
            className={clsx(
              'text-2xl font-bold text-guild-wood-dark',
              ceremonial && 'text-3xl'
            )}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-guild-wood transition-colors p-2 hover:bg-parchment-dark rounded focus-visible-ring"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className={clsx(
          'p-6 scroll-container max-h-[60vh] overflow-y-auto',
          ceremonial && 'parchment-texture'
        )}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex justify-end gap-3 p-6 border-t border-guild-wood/20 bg-parchment-dark">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

interface CeremonialModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  icon?: string
}

export function CeremonialModal({ isOpen, onClose, title, children, icon = '👑' }: CeremonialModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} ceremonial size="md">
      <div className="text-center space-y-6">
        <div className="text-6xl animate-pulse-slow" aria-hidden="true">
          {icon}
        </div>
        <div className="text-lg">{children}</div>
        <Button variant="primary" onClick={onClose} className="mx-auto">
          Acknowledged
        </Button>
      </div>
    </Modal>
  )
}

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'info',
}: ConfirmModalProps) {
  const icons = {
    danger: '⚠️',
    warning: '⚡',
    info: 'ℹ️',
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="parchment" onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            {confirmText}
          </Button>
        </>
      }
    >
      <div className="flex items-start gap-4">
        <div className="text-3xl flex-shrink-0" aria-hidden="true">
          {icons[variant]}
        </div>
        <p className="text-gray-700">{message}</p>
      </div>
    </Modal>
  )
}
