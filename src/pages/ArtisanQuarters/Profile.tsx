import React, { useState, useEffect } from 'react';
import { PageContainer } from '@components/layout/PageContainer';
import { ProfileHeader } from '@components/profile/ProfileHeader';
import { BadgeCabinet } from '@components/profile/BadgeCabinet';
import { SixVirtuesChart } from '@components/profile/SixVirtuesChart';
import { PortfolioGrid } from '@components/profile/PortfolioGrid';
import { ArtworkModal } from '@components/profile/ArtworkModal';
import { useNavigationStore } from '@store/navigationStore';
import { useUserStore } from '@store/userStore';
import { mockArtworks } from '@utils/mockData';
import type { Artwork } from '@/types/artwork';

export const Profile: React.FC = () => {
  const { setBreadcrumbs } = useNavigationStore();
  const { currentUser } = useUserStore();
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [activeTab, setActiveTab] = useState('portfolio');

  useEffect(() => {
    setBreadcrumbs([{ label: "Artisan's Quarters", path: '/profile' }]);
  }, [setBreadcrumbs]);

  if (!currentUser) {
    return (
      <PageContainer title="Profile">
        <div className="text-center py-20">
          <p className="text-burnt-umber/70">Loading profile...</p>
        </div>
      </PageContainer>
    );
  }

  // Filter artworks by current user (in real app, this would be from API)
  const userArtworks = mockArtworks.filter((a) => a.artistId === currentUser.id);

  return (
    <PageContainer showBreadcrumbs={false}>
      {/* Profile Header */}
      <ProfileHeader user={currentUser} isOwnProfile className="mb-8" />

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex gap-2 border-b-2 border-burnt-umber/20">
          {[
            { id: 'portfolio', label: 'Portfolio', count: userArtworks.length },
            { id: 'badges', label: 'Badge Cabinet', count: currentUser.badges.length },
            { id: 'virtues', label: 'Six Virtues', count: null },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative px-6 py-3 font-display font-semibold transition-all
                ${
                  activeTab === tab.id
                    ? 'text-burnt-umber'
                    : 'text-burnt-umber/60 hover:text-burnt-umber'
                }
              `}
            >
              {tab.label}
              {tab.count !== null && (
                <span className="ml-2 px-2 py-0.5 bg-gold/20 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {activeTab === 'portfolio' && (
          <PortfolioGrid
            artworks={userArtworks}
            onArtworkClick={setSelectedArtwork}
          />
        )}

        {activeTab === 'badges' && (
          <BadgeCabinet badges={currentUser.badges} />
        )}

        {activeTab === 'virtues' && (
          <SixVirtuesChart dimensions={currentUser.reputation.dimensions} />
        )}
      </div>

      {/* Artwork Detail Modal */}
      <ArtworkModal
        artwork={selectedArtwork}
        isOpen={!!selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
      />
    </PageContainer>
  );
};
