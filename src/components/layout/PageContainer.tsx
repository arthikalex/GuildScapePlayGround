import React from 'react';
import clsx from 'clsx';
import { Breadcrumbs } from '@components/navigation/Breadcrumbs';

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
  showBreadcrumbs?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  title,
  subtitle,
  action,
  className,
  showBreadcrumbs = true,
}) => {
  return (
    <div className={clsx('min-h-screen p-6 md:p-8', className)}>
      {showBreadcrumbs && <Breadcrumbs />}

      {(title || action) && (
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              {title && (
                <h1 className="text-4xl md:text-5xl font-display font-bold text-burnt-umber mb-2">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-lg text-burnt-umber/70 font-body">{subtitle}</p>
              )}
            </div>
            {action && <div className="flex-shrink-0">{action}</div>}
          </div>

          <div className="ornamental-divider mt-6">
            <div className="w-16 h-2 bg-gold rounded" />
          </div>
        </div>
      )}

      {children}
    </div>
  );
};
