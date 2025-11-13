import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useNavigationStore } from '@store/navigationStore';

export const Breadcrumbs: React.FC = () => {
  const { breadcrumbs } = useNavigationStore();

  if (breadcrumbs.length === 0) return null;

  return (
    <nav className="flex items-center gap-2 text-sm text-burnt-umber/70 mb-6">
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <React.Fragment key={crumb.path}>
            {index > 0 && <ChevronRight className="w-4 h-4" />}
            {isLast ? (
              <span className="font-display font-semibold text-burnt-umber">{crumb.label}</span>
            ) : (
              <Link
                to={crumb.path}
                className="font-display hover:text-gold transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
