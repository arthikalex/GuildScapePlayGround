import React from 'react';
import { motion } from 'framer-motion';
import type { MarketplaceListing } from '@/types/marketplace';
import { ShoppingCart, Eye, Heart, Star, Award } from 'lucide-react';
import clsx from 'clsx';

interface ArtworkCardProps {
  listing: MarketplaceListing;
  onSelect: (listing: MarketplaceListing) => void;
  onAddToCart: (listing: MarketplaceListing) => void;
  inCart?: boolean;
  className?: string;
}

const qualityColors = {
  fundamental: 'text-burnt-umber/60 bg-burnt-umber/10',
  proficiency: 'text-council-blue bg-council-blue/10',
  excellence: 'text-council-purple bg-council-purple/10',
  breakthrough: 'text-gold bg-gold/10',
};

const licenseIcons = {
  personal: '👤',
  commercial: '💼',
  exclusive: '👑',
};

export const ArtworkCard: React.FC<ArtworkCardProps> = ({
  listing,
  onSelect,
  onAddToCart,
  inCart = false,
  className,
}) => {
  const hasDiscount = listing.originalPrice && listing.originalPrice > listing.price;
  const discountPercent = hasDiscount
    ? Math.round(((listing.originalPrice! - listing.price) / listing.originalPrice!) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(listing);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={clsx(
        'group relative bg-parchment-light rounded-xl border-2 border-burnt-umber/20 overflow-hidden transition-all cursor-pointer hover:shadow-seal',
        listing.featured && 'ring-2 ring-gold ring-offset-2',
        className
      )}
      onClick={() => onSelect(listing)}
    >
      {/* Featured Badge */}
      {listing.featured && (
        <div className="absolute top-3 left-3 z-10 px-3 py-1 bg-gold border-2 border-burnt-umber rounded-lg flex items-center gap-1 shadow-seal">
          <Star className="w-4 h-4 text-burnt-umber fill-burnt-umber" />
          <span className="text-xs font-display font-bold text-burnt-umber">Featured</span>
        </div>
      )}

      {/* Discount Badge */}
      {hasDiscount && (
        <div className="absolute top-3 right-3 z-10 px-2 py-1 bg-vote-reject border-2 border-parchment rounded-lg shadow-seal">
          <span className="text-xs font-display font-bold text-parchment">-{discountPercent}%</span>
        </div>
      )}

      {/* Limited Edition Badge */}
      {listing.isLimitedEdition && (
        <div className="absolute top-14 right-3 z-10 px-2 py-1 bg-council-purple border-2 border-parchment rounded-lg shadow-seal">
          <span className="text-xs font-display font-bold text-parchment">
            {listing.editionNumber}/{listing.totalEditions}
          </span>
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-parchment-dark">
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-burnt-umber/0 group-hover:bg-burnt-umber/20 transition-all flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <button
              onClick={handleAddToCart}
              disabled={inCart || listing.status !== 'active'}
              className={clsx(
                'px-6 py-3 rounded-xl font-display font-bold flex items-center gap-2 transition-all',
                inCart
                  ? 'bg-burnt-umber/50 text-parchment/50 cursor-not-allowed'
                  : listing.status !== 'active'
                  ? 'bg-burnt-umber/50 text-parchment/50 cursor-not-allowed'
                  : 'bg-gold text-burnt-umber border-2 border-burnt-umber hover:bg-gold-light shadow-seal'
              )}
            >
              <ShoppingCart className="w-5 h-5" />
              {inCart ? 'In Cart' : listing.status === 'sold' ? 'Sold' : 'Add to Cart'}
            </button>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-burnt-umber/80 backdrop-blur-sm px-3 py-2 flex items-center gap-4">
          <div className="flex items-center gap-1 text-parchment">
            <Eye className="w-4 h-4" />
            <span className="text-xs font-display">{listing.views}</span>
          </div>
          <div className="flex items-center gap-1 text-parchment">
            <Heart className="w-4 h-4" />
            <span className="text-xs font-display">{listing.likes}</span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="p-4">
        {/* Title & Artist */}
        <div className="mb-3">
          <h3 className="text-lg font-display font-bold text-burnt-umber mb-1 line-clamp-1">
            {listing.title}
          </h3>
          <div className="flex items-center gap-2">
            {listing.artistAvatar && (
              <img
                src={listing.artistAvatar}
                alt={listing.artistName}
                className="w-6 h-6 rounded-full border-2 border-burnt-umber/20"
              />
            )}
            <p className="text-sm text-burnt-umber/70">by {listing.artistName}</p>
          </div>
        </div>

        {/* Quality & License */}
        <div className="flex items-center gap-2 mb-3">
          {listing.quality && (
            <div className={clsx('px-2 py-1 rounded text-xs font-display font-semibold flex items-center gap-1', qualityColors[listing.quality])}>
              <Award className="w-3 h-3" />
              {listing.quality}
            </div>
          )}
          <div className="px-2 py-1 rounded text-xs font-display bg-burnt-umber/10 text-burnt-umber/70 flex items-center gap-1">
            <span>{licenseIcons[listing.licenseType]}</span>
            <span>{listing.licenseType}</span>
          </div>
        </div>

        {/* Medium */}
        <div className="mb-3">
          <span className="text-xs font-display text-burnt-umber/60 bg-burnt-umber/5 px-2 py-1 rounded">
            {listing.medium}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-display font-bold text-gold">
            {listing.price} GLD
          </span>
          {hasDiscount && (
            <span className="text-sm font-display text-burnt-umber/40 line-through">
              {listing.originalPrice} GLD
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
