import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { MarketplaceListing } from '@/types/marketplace';
import { Modal } from '@components/common/Modal';
import { Button } from '@components/common/Button';
import {
  X,
  ShoppingCart,
  Heart,
  Eye,
  Calendar,
  Award,
  Image as ImageIcon,
  Tag,
  DollarSign,
  User,
} from 'lucide-react';
import { format } from 'date-fns';
import clsx from 'clsx';

interface ArtworkDetailModalProps {
  listing: MarketplaceListing | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (listing: MarketplaceListing) => void;
  onMakeOffer: (listing: MarketplaceListing, amount: number, message: string) => void;
  inCart: boolean;
}

const qualityColors = {
  fundamental: 'text-burnt-umber/60 bg-burnt-umber/10 border-burnt-umber/30',
  proficiency: 'text-council-blue bg-council-blue/10 border-council-blue/40',
  excellence: 'text-council-purple bg-council-purple/10 border-council-purple/40',
  breakthrough: 'text-gold bg-gold/10 border-gold/40',
};

const licenseDescriptions = {
  personal:
    'For personal, non-commercial use only. Cannot be used for business or resale purposes.',
  commercial:
    'Can be used for commercial projects, marketing, and business purposes. Resale not permitted.',
  exclusive:
    'Full exclusive rights. You will be the only owner with complete control over usage and resale.',
};

export const ArtworkDetailModal: React.FC<ArtworkDetailModalProps> = ({
  listing,
  isOpen,
  onClose,
  onAddToCart,
  onMakeOffer,
  inCart,
}) => {
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [offerAmount, setOfferAmount] = useState('');
  const [offerMessage, setOfferMessage] = useState('');

  if (!listing) return null;

  const hasDiscount = listing.originalPrice && listing.originalPrice > listing.price;
  const discountPercent = hasDiscount
    ? Math.round(((listing.originalPrice! - listing.price) / listing.originalPrice!) * 100)
    : 0;

  const handleSubmitOffer = () => {
    const amount = Number(offerAmount);
    if (amount > 0 && amount < listing.price) {
      onMakeOffer(listing, amount, offerMessage);
      setShowOfferForm(false);
      setOfferAmount('');
      setOfferMessage('');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl">
        {/* Left Column - Image */}
        <div className="relative">
          {/* Featured Badge */}
          {listing.featured && (
            <div className="absolute top-4 left-4 z-10 px-3 py-2 bg-gold border-2 border-burnt-umber rounded-lg flex items-center gap-2 shadow-seal">
              <Award className="w-5 h-5 text-burnt-umber" />
              <span className="text-sm font-display font-bold text-burnt-umber">Featured</span>
            </div>
          )}

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-4 right-4 z-10 px-3 py-2 bg-vote-reject border-2 border-parchment rounded-lg shadow-seal">
              <span className="text-lg font-display font-bold text-parchment">
                -{discountPercent}%
              </span>
            </div>
          )}

          <div className="aspect-square rounded-xl overflow-hidden border-2 border-burnt-umber/20">
            <img
              src={listing.imageUrl}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Stats */}
          <div className="mt-4 flex items-center gap-6">
            <div className="flex items-center gap-2 text-burnt-umber/70">
              <Eye className="w-5 h-5" />
              <span className="font-display">{listing.views} views</span>
            </div>
            <div className="flex items-center gap-2 text-burnt-umber/70">
              <Heart className="w-5 h-5" />
              <span className="font-display">{listing.likes} likes</span>
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="flex flex-col">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-burnt-umber/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-burnt-umber" />
          </button>

          {/* Title & Artist */}
          <div className="mb-6">
            <h2 className="text-4xl font-display font-bold text-burnt-umber mb-4">
              {listing.title}
            </h2>
            <div className="flex items-center gap-3 mb-4">
              {listing.artistAvatar && (
                <img
                  src={listing.artistAvatar}
                  alt={listing.artistName}
                  className="w-12 h-12 rounded-full border-2 border-burnt-umber/20"
                />
              )}
              <div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-burnt-umber/60" />
                  <span className="font-display font-semibold text-burnt-umber">
                    {listing.artistName}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-burnt-umber/60">
                  <Calendar className="w-4 h-4" />
                  <span>Listed {format(new Date(listing.listedDate), 'MMM d, yyyy')}</span>
                </div>
              </div>
            </div>

            {/* Quality & Limited Edition */}
            <div className="flex items-center gap-3 flex-wrap">
              {listing.quality && (
                <div
                  className={clsx(
                    'px-3 py-2 rounded-lg border-2 text-sm font-display font-semibold flex items-center gap-2',
                    qualityColors[listing.quality]
                  )}
                >
                  <Award className="w-4 h-4" />
                  {listing.quality.charAt(0).toUpperCase() + listing.quality.slice(1)} Quality
                </div>
              )}
              {listing.isLimitedEdition && (
                <div className="px-3 py-2 rounded-lg border-2 border-council-purple/40 bg-council-purple/10 text-council-purple text-sm font-display font-semibold">
                  Limited Edition {listing.editionNumber}/{listing.totalEditions}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-display font-semibold text-burnt-umber mb-2">
              Description
            </h3>
            <p className="text-burnt-umber/70 leading-relaxed">{listing.description}</p>
          </div>

          {/* Details Grid */}
          <div className="mb-6 p-4 bg-parchment-light rounded-xl border-2 border-burnt-umber/20">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-burnt-umber/60 mb-1">
                  <ImageIcon className="w-4 h-4" />
                  <span>Medium</span>
                </div>
                <div className="font-display font-semibold text-burnt-umber">
                  {listing.medium.charAt(0).toUpperCase() + listing.medium.slice(1)}
                </div>
              </div>
              {listing.dimensions && (
                <div>
                  <div className="text-sm text-burnt-umber/60 mb-1">Dimensions</div>
                  <div className="font-display font-semibold text-burnt-umber">
                    {listing.dimensions.width} × {listing.dimensions.height}{' '}
                    {listing.dimensions.unit}
                  </div>
                </div>
              )}
              {listing.fileFormat && (
                <div>
                  <div className="text-sm text-burnt-umber/60 mb-1">Format</div>
                  <div className="font-display font-semibold text-burnt-umber">
                    {listing.fileFormat}
                  </div>
                </div>
              )}
              <div>
                <div className="text-sm text-burnt-umber/60 mb-1">License</div>
                <div className="font-display font-semibold text-burnt-umber">
                  {listing.licenseType.charAt(0).toUpperCase() + listing.licenseType.slice(1)}
                </div>
              </div>
            </div>
          </div>

          {/* License Details */}
          <div className="mb-6 p-4 bg-council-blue/10 rounded-xl border-2 border-council-blue/30">
            <h4 className="font-display font-semibold text-burnt-umber mb-2 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              License Terms
            </h4>
            <p className="text-sm text-burnt-umber/70">{licenseDescriptions[listing.licenseType]}</p>
          </div>

          {/* Tags */}
          {listing.tags.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="w-4 h-4 text-burnt-umber/60" />
                <span className="text-sm font-display font-semibold text-burnt-umber">Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {listing.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-burnt-umber/10 text-burnt-umber/70 text-sm font-display rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Pricing & Actions */}
          <div className="mt-auto pt-6 border-t-2 border-burnt-umber/20">
            <div className="mb-4">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-display font-bold text-gold">{listing.price} GLD</span>
                {hasDiscount && (
                  <span className="text-xl font-display text-burnt-umber/40 line-through">
                    {listing.originalPrice} GLD
                  </span>
                )}
              </div>
              {listing.status !== 'active' && (
                <div className="px-3 py-2 bg-burnt-umber/10 text-burnt-umber/60 rounded-lg text-sm font-display font-semibold">
                  {listing.status === 'sold' && '✓ Sold'}
                  {listing.status === 'reserved' && '⏳ Reserved'}
                  {listing.status === 'removed' && '✗ No longer available'}
                </div>
              )}
            </div>

            {listing.status === 'active' && (
              <div className="space-y-3">
                <Button
                  variant="primary"
                  onClick={() => onAddToCart(listing)}
                  disabled={inCart}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {inCart ? 'Already in Cart' : 'Add to Cart'}
                </Button>

                {!showOfferForm ? (
                  <Button
                    variant="secondary"
                    onClick={() => setShowOfferForm(true)}
                    className="w-full"
                  >
                    Make an Offer
                  </Button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 bg-parchment-light rounded-xl border-2 border-burnt-umber/20"
                  >
                    <h4 className="font-display font-semibold text-burnt-umber mb-3">
                      Make an Offer
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-display text-burnt-umber mb-1">
                          Offer Amount (GLD)
                        </label>
                        <input
                          type="number"
                          value={offerAmount}
                          onChange={(e) => setOfferAmount(e.target.value)}
                          placeholder={`Less than ${listing.price} GLD`}
                          className="w-full px-3 py-2 border-2 border-burnt-umber/20 rounded-lg font-display bg-parchment text-burnt-umber focus:outline-none focus:border-council-blue"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-display text-burnt-umber mb-1">
                          Message (optional)
                        </label>
                        <textarea
                          value={offerMessage}
                          onChange={(e) => setOfferMessage(e.target.value)}
                          placeholder="Explain why you're interested..."
                          rows={3}
                          className="w-full px-3 py-2 border-2 border-burnt-umber/20 rounded-lg font-display bg-parchment text-burnt-umber focus:outline-none focus:border-council-blue resize-none"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="primary"
                          onClick={handleSubmitOffer}
                          disabled={!offerAmount || Number(offerAmount) >= listing.price}
                          className="flex-1"
                        >
                          Submit Offer
                        </Button>
                        <Button
                          variant="tertiary"
                          onClick={() => {
                            setShowOfferForm(false);
                            setOfferAmount('');
                            setOfferMessage('');
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
