import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Artwork } from '@/types/artwork';
import { Eye, Heart, Star, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useArtworkStore } from '@store/artworkStore';
import { useUserStore } from '@store/userStore';
import clsx from 'clsx';

interface ArtworkReviewQueueProps {
  onSelectArtwork?: (artwork: Artwork) => void;
}

export const ArtworkReviewQueue: React.FC<ArtworkReviewQueueProps> = ({ onSelectArtwork }) => {
  const { getReviewQueue } = useArtworkStore();
  const { currentUser } = useUserStore();
  const [filter, setFilter] = useState<'all' | 'no-reviews' | 'few-reviews'>('all');

  if (!currentUser) return null;

  let artworksNeedingReview = getReviewQueue(currentUser.id);

  // Apply filters
  if (filter === 'no-reviews') {
    artworksNeedingReview = artworksNeedingReview.filter(a => a.peerReviews.length === 0);
  } else if (filter === 'few-reviews') {
    artworksNeedingReview = artworksNeedingReview.filter(a => a.peerReviews.length > 0 && a.peerReviews.length < 3);
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-display font-bold text-burnt-umber mb-2">
            Artworks Needing Review
          </h2>
          <p className="text-burnt-umber/70">
            Help fellow artists by providing thoughtful, constructive feedback
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={clsx(
              'px-4 py-2 rounded-lg text-sm font-display font-semibold transition-all',
              filter === 'all'
                ? 'bg-gold text-burnt-umber border-2 border-burnt-umber'
                : 'bg-parchment-light text-burnt-umber/70 border-2 border-burnt-umber/20 hover:border-burnt-umber/40'
            )}
          >
            All
          </button>
          <button
            onClick={() => setFilter('no-reviews')}
            className={clsx(
              'px-4 py-2 rounded-lg text-sm font-display font-semibold transition-all',
              filter === 'no-reviews'
                ? 'bg-gold text-burnt-umber border-2 border-burnt-umber'
                : 'bg-parchment-light text-burnt-umber/70 border-2 border-burnt-umber/20 hover:border-burnt-umber/40'
            )}
          >
            No Reviews
          </button>
          <button
            onClick={() => setFilter('few-reviews')}
            className={clsx(
              'px-4 py-2 rounded-lg text-sm font-display font-semibold transition-all',
              filter === 'few-reviews'
                ? 'bg-gold text-burnt-umber border-2 border-burnt-umber'
                : 'bg-parchment-light text-burnt-umber/70 border-2 border-burnt-umber/20 hover:border-burnt-umber/40'
            )}
          >
            Few Reviews
          </button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="mb-6 p-4 bg-council-blue/10 rounded-lg border-2 border-council-blue/30">
        <p className="text-sm text-burnt-umber/70">
          <strong>💡 Reviewing earns you reputation!</strong> Each quality review earns you 5 REP and helps build
          your reputation as a thoughtful community member.
        </p>
      </div>

      {/* Artwork Grid */}
      {artworksNeedingReview.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworksNeedingReview.map((artwork, index) => (
            <ArtworkQueueCard
              key={artwork.id}
              artwork={artwork}
              index={index}
              onClick={() => onSelectArtwork?.(artwork)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-parchment-light rounded-xl border-2 border-burnt-umber/20">
          <div className="text-6xl mb-4">✨</div>
          <h3 className="text-xl font-display font-bold text-burnt-umber mb-2">
            All Caught Up!
          </h3>
          <p className="text-burnt-umber/70">
            There are no artworks needing review at the moment. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
};

interface ArtworkQueueCardProps {
  artwork: Artwork;
  index: number;
  onClick: () => void;
}

const ArtworkQueueCard: React.FC<ArtworkQueueCardProps> = ({ artwork, index, onClick }) => {
  const reviewsNeeded = 3 - artwork.peerReviews.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className={clsx(
        'relative bg-parchment-light rounded-xl border-2 border-burnt-umber/20',
        'hover:border-burnt-umber hover:shadow-elevated hover:-translate-y-1',
        'transition-all duration-300 cursor-pointer group overflow-hidden'
      )}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-parchment-dark">
        <img
          src={artwork.image}
          alt={artwork.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Review Status Badge */}
        <div className="absolute top-3 right-3">
          <div className={clsx(
            'px-3 py-1 rounded-lg border-2 font-display font-bold text-xs backdrop-blur-sm',
            artwork.peerReviews.length === 0
              ? 'bg-vote-reject/80 border-vote-reject text-parchment'
              : 'bg-vote-pending/80 border-vote-pending text-burnt-umber'
          )}>
            {reviewsNeeded} review{reviewsNeeded !== 1 ? 's' : ''} needed
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-display font-bold text-burnt-umber mb-2 line-clamp-1 group-hover:text-gold transition-colors">
          {artwork.title}
        </h3>

        {/* Artist Info */}
        <div className="flex items-center gap-2 mb-3">
          <img
            src={artwork.artistAvatar}
            alt={artwork.artistName}
            className="w-8 h-8 rounded-full border-2 border-burnt-umber"
          />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-display font-semibold text-burnt-umber truncate">
              {artwork.artistName}
            </div>
            <div className="text-xs text-burnt-umber/60 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDistanceToNow(new Date(artwork.uploadDate), { addSuffix: true })}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-center p-2 bg-parchment rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Eye className="w-3 h-3 text-burnt-umber/60" />
            </div>
            <div className="text-sm font-display font-bold text-burnt-umber">
              {artwork.views}
            </div>
          </div>

          <div className="text-center p-2 bg-parchment rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Heart className="w-3 h-3 text-burnt-umber/60" />
            </div>
            <div className="text-sm font-display font-bold text-burnt-umber">
              {artwork.appreciations}
            </div>
          </div>

          <div className="text-center p-2 bg-parchment rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-3 h-3 text-burnt-umber/60" />
            </div>
            <div className="text-sm font-display font-bold text-burnt-umber">
              {artwork.peerReviews.length}
            </div>
          </div>
        </div>

        {/* Tags */}
        {artwork.tags && artwork.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {artwork.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-burnt-umber/10 rounded text-xs text-burnt-umber/70"
              >
                {tag}
              </span>
            ))}
            {artwork.tags.length > 2 && (
              <span className="px-2 py-1 bg-burnt-umber/10 rounded text-xs text-burnt-umber/70">
                +{artwork.tags.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Review Button */}
        <button className="w-full btn-primary text-sm">
          Review This Artwork
        </button>
      </div>
    </motion.div>
  );
};
