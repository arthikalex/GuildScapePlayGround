import React, { useState, useEffect } from 'react';
import { PageContainer } from '@components/layout/PageContainer';
import { WorkshopDashboard } from '@components/workshop/WorkshopDashboard';
import { ArtworkUploadForm } from '@components/workshop/ArtworkUploadForm';
import { ArtworkReviewQueue } from '@components/workshop/ArtworkReviewQueue';
import { PeerReviewForm } from '@components/workshop/PeerReviewForm';
import { MySubmissions } from '@components/workshop/MySubmissions';
import { ArtworkModal } from '@components/profile/ArtworkModal';
import { useNavigationStore } from '@store/navigationStore';
import { useArtworkStore } from '@store/artworkStore';
import type { Artwork } from '@/types/artwork';
import {
  Home,
  Upload,
  Star,
  Palette,
  ChevronLeft,
} from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export const Workshop: React.FC = () => {
  const { setBreadcrumbs } = useNavigationStore();
  const { getArtworkById } = useArtworkStore();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [artworkToReview, setArtworkToReview] = useState<Artwork | null>(null);

  useEffect(() => {
    setBreadcrumbs([{ label: 'Workshop', path: '/workshop' }]);
  }, [setBreadcrumbs]);

  const tabs = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
    },
    {
      id: 'submit',
      label: 'Submit Artwork',
      icon: Upload,
    },
    {
      id: 'review',
      label: 'Review Queue',
      icon: Star,
    },
    {
      id: 'submissions',
      label: 'My Submissions',
      icon: Palette,
    },
  ];

  const handleArtworkSubmitted = () => {
    setActiveTab('submissions');
  };

  const handleReviewSubmitted = () => {
    setArtworkToReview(null);
    setActiveTab('dashboard');
  };

  const handleSelectArtworkToReview = (artwork: Artwork) => {
    setArtworkToReview(artwork);
  };

  const handleArtworkClick = (artworkId: string) => {
    const artwork = getArtworkById(artworkId);
    if (artwork) {
      setSelectedArtwork(artwork);
    }
  };

  return (
    <PageContainer showBreadcrumbs={false}>
      {/* Header with Tab Navigation */}
      {!artworkToReview && (
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex gap-2 border-b-2 border-burnt-umber/20">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    'relative px-6 py-3 font-display font-semibold transition-all flex items-center gap-2',
                    activeTab === tab.id
                      ? 'text-burnt-umber'
                      : 'text-burnt-umber/60 hover:text-burnt-umber'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gold"
                      layoutId="activeWorkshopTab"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Back Button when reviewing */}
      {artworkToReview && (
        <button
          onClick={() => setArtworkToReview(null)}
          className="mb-6 flex items-center gap-2 px-4 py-2 bg-parchment-light hover:bg-parchment rounded-lg border-2 border-burnt-umber/20 hover:border-burnt-umber/40 transition-all font-display font-semibold text-burnt-umber"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Queue
        </button>
      )}

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {/* Dashboard */}
        {activeTab === 'dashboard' && !artworkToReview && (
          <WorkshopDashboard onNavigate={setActiveTab} />
        )}

        {/* Submit Artwork */}
        {activeTab === 'submit' && !artworkToReview && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-display font-bold text-burnt-umber mb-2">
                Submit Artwork
              </h2>
              <p className="text-burnt-umber/70">
                Share your latest creation with the community
              </p>
            </div>
            <ArtworkUploadForm
              onSuccess={handleArtworkSubmitted}
              onCancel={() => setActiveTab('dashboard')}
            />
          </div>
        )}

        {/* Review Queue */}
        {activeTab === 'review' && !artworkToReview && (
          <ArtworkReviewQueue onSelectArtwork={handleSelectArtworkToReview} />
        )}

        {/* Review Form (when artwork selected) */}
        {artworkToReview && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Artwork Preview */}
            <div className="sticky top-4 self-start">
              <motion.div
                className="bg-parchment-light rounded-2xl border-4 border-burnt-umber overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <img
                  src={artworkToReview.image}
                  alt={artworkToReview.title}
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-display font-bold text-burnt-umber mb-2">
                    {artworkToReview.title}
                  </h3>
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={artworkToReview.artistAvatar}
                      alt={artworkToReview.artistName}
                      className="w-10 h-10 rounded-full border-2 border-burnt-umber"
                    />
                    <div>
                      <div className="font-display font-semibold text-burnt-umber">
                        {artworkToReview.artistName}
                      </div>
                      <div className="text-sm text-burnt-umber/60">
                        {artworkToReview.medium}
                      </div>
                    </div>
                  </div>
                  {artworkToReview.description && (
                    <p className="text-burnt-umber/80 text-sm leading-relaxed">
                      {artworkToReview.description}
                    </p>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Review Form */}
            <div>
              <PeerReviewForm
                artwork={artworkToReview}
                onSuccess={handleReviewSubmitted}
                onCancel={() => setArtworkToReview(null)}
              />
            </div>
          </div>
        )}

        {/* My Submissions */}
        {activeTab === 'submissions' && !artworkToReview && (
          <MySubmissions onArtworkClick={handleArtworkClick} />
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
