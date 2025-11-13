import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export type CardVariant = 'medieval' | 'chamber' | 'flat';

interface CardProps {
  variant?: CardVariant;
  hoverable?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const variantClasses = {
  medieval: 'card-medieval',
  chamber: 'card-chamber',
  flat: 'bg-parchment border-2 border-burnt-umber rounded-xl p-6',
};

export const Card: React.FC<CardProps> = ({
  variant = 'medieval',
  hoverable = true,
  className,
  children,
  onClick,
}) => {
  const cardClasses = clsx(variantClasses[variant], className, {
    'cursor-pointer': onClick || hoverable,
  });

  const motionProps = hoverable
    ? {
        whileHover: { y: -4, transition: { duration: 0.2 } },
        whileTap: onClick ? { scale: 0.98 } : {},
      }
    : {};

  return (
    <motion.div
      className={cardClasses}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title, subtitle, action, icon }) => {
  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        {icon && <div className="text-gold">{icon}</div>}
        <div>
          <h3 className="text-xl font-display font-semibold text-burnt-umber">{title}</h3>
          {subtitle && <p className="text-sm text-burnt-umber/70 mt-1">{subtitle}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export const CardBody: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <div className={clsx('text-burnt-umber', className)}>{children}</div>;
};

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={clsx('mt-4 pt-4 border-t-2 border-burnt-umber/20 flex items-center justify-between', className)}>
      {children}
    </div>
  );
};
