import React, { useEffect } from 'react';
import { PageContainer } from '@components/layout/PageContainer';
import { Card } from '@components/common/Card';
import { useNavigationStore } from '@store/navigationStore';
import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
  breadcrumbs?: { label: string; path: string }[];
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  description,
  breadcrumbs,
}) => {
  const { setBreadcrumbs } = useNavigationStore();

  useEffect(() => {
    if (breadcrumbs) {
      setBreadcrumbs(breadcrumbs);
    }
  }, [breadcrumbs, setBreadcrumbs]);

  return (
    <PageContainer title={title} subtitle={description}>
      <Card className="text-center py-16">
        <Construction className="w-16 h-16 text-gold mx-auto mb-4" />
        <h3 className="text-2xl font-display font-bold text-burnt-umber mb-2">
          Under Construction
        </h3>
        <p className="text-burnt-umber/70">
          This room is currently being built by our finest craftsmen. Check back soon!
        </p>
      </Card>
    </PageContainer>
  );
};
