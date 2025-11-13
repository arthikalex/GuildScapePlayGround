import React from 'react';
import clsx from 'clsx';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string;
  height?: string;
  lines?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className,
  variant = 'rectangular',
  width,
  height,
  lines = 1,
}) => {
  const baseClasses = 'animate-pulse bg-burnt-umber/10';

  if (variant === 'text' && lines > 1) {
    return (
      <div className={className}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={clsx(baseClasses, 'h-4 rounded mb-2')}
            style={{ width: i === lines - 1 ? '60%' : '100%' }}
          />
        ))}
      </div>
    );
  }

  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  return (
    <div
      className={clsx(baseClasses, variantClasses[variant], className)}
      style={{ width, height }}
    />
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-parchment-light rounded-xl border-2 border-burnt-umber/20 p-6">
      <div className="flex items-center gap-4 mb-4">
        <LoadingSkeleton variant="circular" width="48px" height="48px" />
        <div className="flex-1">
          <LoadingSkeleton variant="text" width="40%" height="20px" className="mb-2" />
          <LoadingSkeleton variant="text" width="60%" height="16px" />
        </div>
      </div>
      <LoadingSkeleton variant="text" lines={3} />
    </div>
  );
};

export const ArtworkCardSkeleton: React.FC = () => {
  return (
    <div className="bg-parchment-light rounded-xl border-2 border-burnt-umber/20 overflow-hidden">
      <LoadingSkeleton variant="rectangular" width="100%" height="200px" />
      <div className="p-4">
        <LoadingSkeleton variant="text" width="80%" height="20px" className="mb-2" />
        <LoadingSkeleton variant="text" width="50%" height="16px" className="mb-3" />
        <LoadingSkeleton variant="text" width="30%" height="24px" />
      </div>
    </div>
  );
};

export const ListItemSkeleton: React.FC = () => {
  return (
    <div className="flex items-center gap-3 p-4 bg-parchment-light rounded-lg border border-burnt-umber/10">
      <LoadingSkeleton variant="circular" width="40px" height="40px" />
      <div className="flex-1">
        <LoadingSkeleton variant="text" width="60%" height="16px" className="mb-2" />
        <LoadingSkeleton variant="text" width="40%" height="14px" />
      </div>
    </div>
  );
};

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <LoadingSkeleton variant="text" width="300px" height="40px" className="mb-2" />
        <LoadingSkeleton variant="text" width="200px" height="20px" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <div className="space-y-6">
          <CardSkeleton />
        </div>
      </div>
    </div>
  );
};
