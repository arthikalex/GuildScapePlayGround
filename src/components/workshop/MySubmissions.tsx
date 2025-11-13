import React from 'react';
import { motion } from 'framer-motion';
import { PortfolioGrid } from '@components/profile/PortfolioGrid';
import { useArtworkStore } from '@store/artworkStore';
import { useUserStore } from '@store/userStore';
import { Palette, TrendingUp } from 'lucide-react';

interface MySubmissionsProps {
  onArtworkClick?: (artworkId: string) => void;
}

export const MySubmissions: React.FC<MySubmissionsProps> = ({ onArtworkClick }) => {
  const { getArtworksByArtist } = useArtworkStore();
  const { currentUser } = useUserStore();

  if (!currentUser) return null;

  const myArtworks = getArtworksByArtist(currentUser.id);

  // Calculate stats
  const needingReviews = myArtworks.filter(a => a.peerReviews.length < 3).length;
  const totalReviews = myArtworks.reduce((sum, a) => sum + a.peerReviews.length, 0);
  const avgScore = myArtworks.length > 0
    ? Math.round(myArtworks.reduce((sum, a) => {
        if (a.peerReviews.length === 0) return sum;
        const artworkAvg = a.peerReviews.reduce((rSum, r) => {
          return rSum + (r.technicalScore + r.creativityScore + r.craftsmanshipScore) / 3;
        }, 0) / a.peerReviews.length;
        return sum + artworkAvg;
      }, 0) / myArtworks.filter(a => a.peerReviews.length > 0).length)
    : 0;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-display font-bold text-burnt-umber mb-2">
          My Submissions
        </h2>
        <p className="text-burnt-umber/70">
          Track your artwork uploads and peer review feedback
        </p>
      </div>

      {/* Stats Banner */}
      {myArtworks.length > 0 && (
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <motion.div
            className="p-6 bg-gradient-to-br from-gold/20 to-gold/5 rounded-xl border-2 border-gold/30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Palette className="w-6 h-6 text-gold" />
              <span className="text-sm font-display font-semibold text-burnt-umber">
                Total Artworks
              </span>
            </div>
            <div className="text-4xl font-display font-bold text-gold">
              {myArtworks.length}
            </div>
          </motion.div>

          <motion.div
            className="p-6 bg-gradient-to-br from-council-blue/20 to-council-blue/5 rounded-xl border-2 border-council-blue/30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-council-blue" />
              <span className="text-sm font-display font-semibold text-burnt-umber">
                Avg Quality Score
              </span>
            </div>
            <div className="text-4xl font-display font-bold text-council-blue">
              {avgScore > 0 ? avgScore : '--'}
            </div>
            <div className="text-xs text-burnt-umber/60 mt-1">
              {avgScore === 0 ? 'No reviews yet' : `Based on ${totalReviews} reviews`}
            </div>
          </motion.div>

          <motion.div
            className="p-6 bg-gradient-to-br from-vote-pending/20 to-vote-pending/5 rounded-xl border-2 border-vote-pending/30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">⏳</span>
              <span className="text-sm font-display font-semibold text-burnt-umber">
                Awaiting Reviews
              </span>
            </div>
            <div className="text-4xl font-display font-bold text-vote-pending">
              {needingReviews}
            </div>
            <div className="text-xs text-burnt-umber/60 mt-1">
              {needingReviews === 0 ? 'All reviewed!' : 'Need more feedback'}
            </div>
          </motion.div>
        </div>
      )}

      {/* Artworks Grid */}
      {myArtworks.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <PortfolioGrid
            artworks={myArtworks}
            onArtworkClick={(artwork) => onArtworkClick?.(artwork.id)}
          />
        </motion.div>
      ) : (
        <div className="text-center py-20 bg-parchment-light rounded-xl border-2 border-burnt-umber/20">
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-xl font-display font-bold text-burnt-umber mb-2">
            No Artworks Yet
          </h3>
          <p className="text-burnt-umber/70 mb-6">
            Start your artistic journey by submitting your first artwork!
          </p>
          <button className="btn-primary">
            Submit Your First Artwork
          </button>
        </div>
      )}
    </div>
  );
};
