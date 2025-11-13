import React from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  Eye,
  Heart,
  Star,
  TrendingUp,
  Award,
  MessageSquare,
  Palette,
} from 'lucide-react';
import { useArtworkStore } from '@store/artworkStore';
import { useUserStore } from '@store/userStore';
import clsx from 'clsx';

interface WorkshopDashboardProps {
  onNavigate?: (tab: string) => void;
}

export const WorkshopDashboard: React.FC<WorkshopDashboardProps> = ({ onNavigate }) => {
  const { artworks, getArtworksByArtist, getReviewQueue } = useArtworkStore();
  const { currentUser } = useUserStore();

  if (!currentUser) return null;

  const myArtworks = getArtworksByArtist(currentUser.id);
  const reviewQueue = getReviewQueue(currentUser.id);

  // Calculate stats
  const totalViews = myArtworks.reduce((sum, a) => sum + a.views, 0);
  const totalAppreciations = myArtworks.reduce((sum, a) => sum + a.appreciations, 0);
  const totalReviews = myArtworks.reduce((sum, a) => sum + a.peerReviews.length, 0);
  const avgQualityScore = myArtworks.length > 0
    ? myArtworks.reduce((sum, a) => {
        if (a.peerReviews.length === 0) return sum;
        const artworkAvg = a.peerReviews.reduce((rSum, r) => {
          return rSum + (r.technicalScore + r.creativityScore + r.craftsmanshipScore) / 3;
        }, 0) / a.peerReviews.length;
        return sum + artworkAvg;
      }, 0) / myArtworks.filter(a => a.peerReviews.length > 0).length
    : 0;

  // Reviews I've given
  const reviewsGiven = artworks.reduce((sum, artwork) => {
    return sum + artwork.peerReviews.filter(r => r.reviewer === currentUser.name).length;
  }, 0);

  return (
    <div>
      {/* Welcome Section */}
      <motion.div
        className="mb-8 p-8 bg-gradient-to-r from-council-purple/20 to-council-blue/20 rounded-2xl border-2 border-council-purple/30"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-display font-bold text-burnt-umber mb-2">
          Welcome to the Workshop, {currentUser.name}
        </h2>
        <p className="text-burnt-umber/70 text-lg">
          Create, share, and receive feedback on your artistic journey
        </p>
      </motion.div>

      {/* Quick Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <motion.div
          className="p-6 bg-gradient-to-br from-gold/20 to-gold/5 rounded-xl border-2 border-gold/30"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Palette className="w-6 h-6 text-gold" />
            <span className="text-sm font-display font-semibold text-burnt-umber">
              My Artworks
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
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Star className="w-6 h-6 text-council-blue" />
            <span className="text-sm font-display font-semibold text-burnt-umber">
              Avg Quality
            </span>
          </div>
          <div className="text-4xl font-display font-bold text-council-blue">
            {avgQualityScore > 0 ? Math.round(avgQualityScore) : '--'}
          </div>
          <div className="text-xs text-burnt-umber/60 mt-1">
            {avgQualityScore === 0 ? 'No reviews yet' : 'out of 100'}
          </div>
        </motion.div>

        <motion.div
          className="p-6 bg-gradient-to-br from-vote-approve/20 to-vote-approve/5 rounded-xl border-2 border-vote-approve/30"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-6 h-6 text-vote-approve" />
            <span className="text-sm font-display font-semibold text-burnt-umber">
              Total Appreciations
            </span>
          </div>
          <div className="text-4xl font-display font-bold text-vote-approve">
            {totalAppreciations}
          </div>
        </motion.div>

        <motion.div
          className="p-6 bg-gradient-to-br from-council-purple/20 to-council-purple/5 rounded-xl border-2 border-council-purple/30"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Eye className="w-6 h-6 text-council-purple" />
            <span className="text-sm font-display font-semibold text-burnt-umber">
              Total Views
            </span>
          </div>
          <div className="text-4xl font-display font-bold text-council-purple">
            {totalViews.toLocaleString()}
          </div>
        </motion.div>
      </div>

      {/* Secondary Stats */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <motion.div
          className="p-6 bg-parchment-light rounded-xl border-2 border-burnt-umber/20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-5 h-5 text-burnt-umber/60" />
                <span className="text-sm font-display font-semibold text-burnt-umber">
                  Peer Reviews Received
                </span>
              </div>
              <div className="text-3xl font-display font-bold text-burnt-umber">
                {totalReviews}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-burnt-umber/60 mb-1">On {myArtworks.length} artworks</div>
              <div className="text-sm font-display font-semibold text-gold">
                {myArtworks.length > 0 ? (totalReviews / myArtworks.length).toFixed(1) : '0'} avg/artwork
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="p-6 bg-parchment-light rounded-xl border-2 border-burnt-umber/20"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-burnt-umber/60" />
                <span className="text-sm font-display font-semibold text-burnt-umber">
                  Reviews Given
                </span>
              </div>
              <div className="text-3xl font-display font-bold text-burnt-umber">
                {reviewsGiven}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-burnt-umber/60 mb-1">To other artists</div>
              <div className="text-sm font-display font-semibold text-council-blue">
                +{reviewsGiven * 5} REP earned
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Submit New Artwork */}
        <motion.button
          onClick={() => onNavigate?.('submit')}
          className={clsx(
            'relative p-8 rounded-2xl border-4 text-left overflow-hidden',
            'transition-all duration-300 hover:scale-105 hover:shadow-elevated',
            'bg-gradient-to-br from-gold/30 to-gold/10 border-gold'
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ y: -8 }}
        >
          <div className="absolute top-4 right-4 w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-gold" />
          </div>
          <h3 className="text-2xl font-display font-bold text-burnt-umber mb-2">
            Submit New Artwork
          </h3>
          <p className="text-burnt-umber/70">
            Share your latest creation with the community
          </p>
          <div className="mt-4 text-sm font-display font-semibold text-gold">
            Upload Now →
          </div>
        </motion.button>

        {/* Review Queue */}
        <motion.button
          onClick={() => onNavigate?.('review')}
          className={clsx(
            'relative p-8 rounded-2xl border-4 text-left overflow-hidden',
            'transition-all duration-300 hover:scale-105 hover:shadow-elevated',
            'bg-gradient-to-br from-council-purple/30 to-council-purple/10 border-council-purple'
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ y: -8 }}
        >
          <div className="absolute top-4 right-4 w-16 h-16 bg-council-purple/20 rounded-full flex items-center justify-center">
            <Star className="w-8 h-8 text-council-purple" />
          </div>
          <h3 className="text-2xl font-display font-bold text-burnt-umber mb-2">
            Review Artworks
          </h3>
          <p className="text-burnt-umber/70 mb-4">
            Help fellow artists grow with constructive feedback
          </p>
          {reviewQueue.length > 0 && (
            <div className="inline-block px-4 py-2 bg-council-purple/20 rounded-lg">
              <span className="text-lg font-display font-bold text-council-purple">
                {reviewQueue.length} artwork{reviewQueue.length !== 1 ? 's' : ''} awaiting review
              </span>
            </div>
          )}
          <div className="mt-4 text-sm font-display font-semibold text-council-purple">
            Start Reviewing →
          </div>
        </motion.button>
      </div>

      {/* Helpful Tips */}
      <motion.div
        className="mt-8 p-6 bg-council-blue/10 rounded-xl border-2 border-council-blue/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h4 className="font-display font-semibold text-burnt-umber mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-council-blue" />
          Tips for Success
        </h4>
        <ul className="space-y-2 text-sm text-burnt-umber/70">
          <li>• <strong>Quality over quantity:</strong> Submit your best work to receive meaningful feedback</li>
          <li>• <strong>Give to receive:</strong> Review others' work to earn reputation and build community</li>
          <li>• <strong>Be constructive:</strong> Thoughtful reviews help artists grow and earn you respect</li>
          <li>• <strong>Stay active:</strong> Regular participation improves your standing in the guild</li>
        </ul>
      </motion.div>
    </div>
  );
};
