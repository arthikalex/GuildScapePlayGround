import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Artwork, QualityRating } from '@/types/artwork';
import { Eye, Heart, Star, MessageSquare } from 'lucide-react';
import clsx from 'clsx';

interface PortfolioGridProps {
  artworks: Artwork[];
  onArtworkClick: (artwork: Artwork) => void;
  className?: string;
}

const qualityFrames: Record<QualityRating, { border: string; glow: string; badge: string }> = {
  fundamental: {
    border: 'border-burnt-umber',
    glow: '',
    badge: 'bg-burnt-umber/20 text-burnt-umber',
  },
  proficiency: {
    border: 'border-green-600',
    glow: 'hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]',
    badge: 'bg-green-600/20 text-green-600',
  },
  excellence: {
    border: 'border-blue-600',
    glow: 'hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]',
    badge: 'bg-blue-600/20 text-blue-600',
  },
  breakthrough: {
    border: 'border-gold',
    glow: 'hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:animate-glow-pulse',
    badge: 'bg-gold/20 text-gold',
  },
};

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({
  artworks,
  onArtworkClick,
  className,
}) => {
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  const filteredArtworks = filter === 'featured'
    ? artworks.filter((a) => a.featured)
    : artworks;

  return (
    <div className={className}>
      {/* Header with Filters */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-display font-bold text-burnt-umber mb-2">Portfolio</h2>
          <p className="text-burnt-umber/70">
            {filteredArtworks.length} artwork{filteredArtworks.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={clsx(
              'px-4 py-2 font-display font-semibold rounded-lg transition-all',
              filter === 'all'
                ? 'bg-gold text-burnt-umber border-2 border-burnt-umber'
                : 'bg-parchment-light text-burnt-umber/70 border-2 border-burnt-umber/30 hover:border-burnt-umber/50'
            )}
          >
            All Works
          </button>
          <button
            onClick={() => setFilter('featured')}
            className={clsx(
              'px-4 py-2 font-display font-semibold rounded-lg transition-all',
              filter === 'featured'
                ? 'bg-gold text-burnt-umber border-2 border-burnt-umber'
                : 'bg-parchment-light text-burnt-umber/70 border-2 border-burnt-umber/30 hover:border-burnt-umber/50'
            )}
          >
            Featured
          </button>
        </div>
      </div>

      {/* Masonry Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {filteredArtworks.map((artwork, index) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              index={index}
              onClick={() => onArtworkClick(artwork)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {filteredArtworks.length === 0 && (
        <div className="text-center py-20 bg-parchment-light rounded-2xl border-4 border-burnt-umber/20">
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-xl font-display font-semibold text-burnt-umber mb-2">
            No Artworks Yet
          </h3>
          <p className="text-burnt-umber/60">
            {filter === 'featured'
              ? 'No featured artworks to display'
              : 'Upload your first artwork to start your portfolio'}
          </p>
        </div>
      )}
    </div>
  );
};

interface ArtworkCardProps {
  artwork: Artwork;
  index: number;
  onClick: () => void;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, index, onClick }) => {
  const qualityStyle = artwork.quality ? qualityFrames[artwork.quality] : qualityFrames.fundamental;
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className={clsx(
        'group relative bg-parchment rounded-xl overflow-hidden cursor-pointer',
        'border-4 transition-all duration-300',
        qualityStyle.border,
        qualityStyle.glow,
        'hover:-translate-y-2 hover:shadow-elevated'
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-parchment-dark overflow-hidden">
        {/* Loading Placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Artwork Image */}
        <img
          src={artwork.image}
          alt={artwork.title}
          className={clsx(
            'w-full h-full object-cover transition-all duration-500',
            'group-hover:scale-110',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-chamber-dark/90 via-chamber-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Quick Stats */}
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
            <div className="flex items-center gap-4 text-parchment text-sm">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {artwork.views.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                {artwork.appreciations}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                {artwork.peerReviews.length}
              </span>
            </div>
          </div>
        </div>

        {/* Featured Badge */}
        {artwork.featured && (
          <div className="absolute top-3 left-3">
            <motion.div
              className="px-3 py-1 bg-gold rounded-lg border-2 border-burnt-umber flex items-center gap-1"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3 + index * 0.05, type: 'spring' }}
            >
              <Star className="w-4 h-4 fill-burnt-umber text-burnt-umber" />
              <span className="text-xs font-display font-bold text-burnt-umber">Featured</span>
            </motion.div>
          </div>
        )}

        {/* Quality Badge */}
        {artwork.quality && (
          <div className="absolute top-3 right-3">
            <motion.div
              className={clsx(
                'px-3 py-1 rounded-lg border-2 border-burnt-umber backdrop-blur-sm',
                qualityStyle.badge
              )}
              initial={{ scale: 0, rotate: 45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3 + index * 0.05, type: 'spring' }}
            >
              <span className="text-xs font-display font-bold uppercase">
                {artwork.quality}
              </span>
            </motion.div>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-4">
        <h3 className="text-lg font-display font-bold text-burnt-umber mb-1 line-clamp-1 group-hover:text-gold transition-colors">
          {artwork.title}
        </h3>

        <div className="flex items-center gap-2 text-sm text-burnt-umber/70 mb-2">
          <span>{artwork.medium}</span>
          <span>•</span>
          <span>{artwork.year}</span>
        </div>

        {artwork.description && (
          <p className="text-sm text-burnt-umber/60 line-clamp-2 font-body">
            {artwork.description}
          </p>
        )}

        {/* Tags */}
        {artwork.tags && artwork.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {artwork.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-burnt-umber/10 rounded text-xs text-burnt-umber/70"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* For Sale Indicator */}
      {artwork.forSale && artwork.price && (
        <div className="absolute bottom-4 right-4 px-3 py-1 bg-council-gold rounded-lg border-2 border-burnt-umber">
          <span className="text-sm font-display font-bold text-burnt-umber">
            ${artwork.price.toLocaleString()}
          </span>
        </div>
      )}
    </motion.div>
  );
};
