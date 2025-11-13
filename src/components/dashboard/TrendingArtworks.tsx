import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Eye, Heart } from 'lucide-react';
import clsx from 'clsx';

export interface TrendingArtwork {
  id: string;
  title: string;
  artistName: string;
  artistAvatar?: string;
  imageUrl: string;
  views: number;
  likes: number;
  trending: 'hot' | 'rising' | 'new';
}

interface TrendingArtworksProps {
  artworks: TrendingArtwork[];
  onSelectArtwork?: (artwork: TrendingArtwork) => void;
  className?: string;
}

const trendingBadges = {
  hot: { label: '🔥 Hot', color: 'bg-vote-reject/20 text-vote-reject border-vote-reject/40' },
  rising: { label: '📈 Rising', color: 'bg-council-blue/20 text-council-blue border-council-blue/40' },
  new: { label: '✨ New', color: 'bg-council-purple/20 text-council-purple border-council-purple/40' },
};

export const TrendingArtworks: React.FC<TrendingArtworksProps> = ({
  artworks,
  onSelectArtwork,
  className,
}) => {
  if (artworks.length === 0) {
    return (
      <div className={clsx('text-center py-8', className)}>
        <TrendingUp className="w-12 h-12 text-burnt-umber/20 mx-auto mb-3" />
        <p className="text-burnt-umber/60 font-display">No trending artworks</p>
      </div>
    );
  }

  return (
    <div className={clsx('grid grid-cols-2 gap-4', className)}>
      {artworks.map((artwork, index) => {
        const badge = trendingBadges[artwork.trending];

        return (
          <motion.div
            key={artwork.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelectArtwork?.(artwork)}
            className="group relative cursor-pointer"
          >
            {/* Trending Badge */}
            <div className={clsx('absolute top-2 left-2 z-10 px-2 py-1 rounded-lg text-xs font-display font-bold border', badge.color)}>
              {badge.label}
            </div>

            {/* Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-burnt-umber/20 group-hover:border-gold/50 transition-all mb-2">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-burnt-umber/0 group-hover:bg-burnt-umber/20 transition-all" />

              {/* Stats overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-burnt-umber/80 backdrop-blur-sm px-2 py-1.5 flex items-center gap-3 text-xs text-parchment">
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>{artwork.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  <span>{artwork.likes}</span>
                </div>
              </div>
            </div>

            {/* Title & Artist */}
            <h4 className="font-display font-semibold text-burnt-umber text-sm mb-1 line-clamp-1 group-hover:text-gold transition-colors">
              {artwork.title}
            </h4>
            <div className="flex items-center gap-1.5">
              {artwork.artistAvatar && (
                <img
                  src={artwork.artistAvatar}
                  alt={artwork.artistName}
                  className="w-4 h-4 rounded-full border border-burnt-umber/20"
                />
              )}
              <p className="text-xs text-burnt-umber/70 line-clamp-1">
                {artwork.artistName}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
