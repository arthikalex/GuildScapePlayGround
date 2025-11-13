import React from 'react';
import { motion } from 'framer-motion';
import type { Artwork } from '@/types/artwork';
import { Modal, ModalBody } from '@components/common/Modal';
import { Eye, Heart, Calendar, Palette, Ruler, Tag, Star } from 'lucide-react';
import { format } from 'date-fns';
import clsx from 'clsx';

interface ArtworkModalProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
}

const qualityColors = {
  fundamental: 'text-burnt-umber',
  proficiency: 'text-green-600',
  excellence: 'text-blue-600',
  breakthrough: 'text-gold',
};

export const ArtworkModal: React.FC<ArtworkModalProps> = ({ artwork, isOpen, onClose }) => {
  if (!artwork) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" showCloseButton>
      <ModalBody className="p-0">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Image Section */}
          <div>
            <motion.div
              className="relative aspect-[4/3] bg-parchment-dark rounded-xl overflow-hidden border-4 border-burnt-umber shadow-elevated"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-full object-cover"
              />

              {/* Featured Badge */}
              {artwork.featured && (
                <div className="absolute top-3 left-3 px-3 py-1 bg-gold rounded-lg border-2 border-burnt-umber flex items-center gap-1">
                  <Star className="w-4 h-4 fill-burnt-umber text-burnt-umber" />
                  <span className="text-xs font-display font-bold text-burnt-umber">Featured</span>
                </div>
              )}
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="p-3 bg-parchment-light rounded-lg text-center">
                <Eye className="w-5 h-5 text-burnt-umber/60 mx-auto mb-1" />
                <div className="text-lg font-display font-bold text-burnt-umber">
                  {artwork.views.toLocaleString()}
                </div>
                <div className="text-xs text-burnt-umber/60">Views</div>
              </div>

              <div className="p-3 bg-parchment-light rounded-lg text-center">
                <Heart className="w-5 h-5 text-burnt-umber/60 mx-auto mb-1" />
                <div className="text-lg font-display font-bold text-burnt-umber">
                  {artwork.appreciations}
                </div>
                <div className="text-xs text-burnt-umber/60">Hearts</div>
              </div>

              <div className="p-3 bg-parchment-light rounded-lg text-center">
                <Star className="w-5 h-5 text-burnt-umber/60 mx-auto mb-1" />
                <div className="text-lg font-display font-bold text-burnt-umber">
                  {artwork.peerReviews.length}
                </div>
                <div className="text-xs text-burnt-umber/60">Reviews</div>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            {/* Title and Quality */}
            <div>
              <h2 className="text-3xl font-display font-bold text-burnt-umber mb-3">
                {artwork.title}
              </h2>

              {artwork.quality && (
                <div className={clsx(
                  'inline-block px-4 py-2 rounded-lg border-2 font-display font-bold uppercase text-sm',
                  qualityColors[artwork.quality],
                  'bg-parchment-light'
                )}>
                  {artwork.quality} Quality
                </div>
              )}
            </div>

            {/* Description */}
            {artwork.description && (
              <div>
                <h3 className="text-lg font-display font-semibold text-burnt-umber mb-2">
                  Description
                </h3>
                <p className="text-burnt-umber/80 font-body leading-relaxed">
                  {artwork.description}
                </p>
              </div>
            )}

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Palette className="w-5 h-5 text-burnt-umber/60 mt-1" />
                <div>
                  <div className="text-sm text-burnt-umber/60">Medium</div>
                  <div className="font-display font-semibold text-burnt-umber">
                    {artwork.medium}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Ruler className="w-5 h-5 text-burnt-umber/60 mt-1" />
                <div>
                  <div className="text-sm text-burnt-umber/60">Dimensions</div>
                  <div className="font-display font-semibold text-burnt-umber">
                    {artwork.dimensions}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-burnt-umber/60 mt-1" />
                <div>
                  <div className="text-sm text-burnt-umber/60">Created</div>
                  <div className="font-display font-semibold text-burnt-umber">
                    {artwork.year}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-burnt-umber/60 mt-1" />
                <div>
                  <div className="text-sm text-burnt-umber/60">Uploaded</div>
                  <div className="font-display font-semibold text-burnt-umber">
                    {format(new Date(artwork.uploadDate), 'MMM d, yyyy')}
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            {artwork.tags && artwork.tags.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4 text-burnt-umber/60" />
                  <span className="text-sm font-display font-semibold text-burnt-umber">Tags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {artwork.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-burnt-umber/10 rounded-full text-sm text-burnt-umber"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Peer Reviews */}
            {artwork.peerReviews.length > 0 && (
              <div>
                <h3 className="text-lg font-display font-semibold text-burnt-umber mb-3">
                  Peer Reviews ({artwork.peerReviews.length})
                </h3>
                <div className="space-y-4 max-h-64 overflow-y-auto scrollbar-medieval">
                  {artwork.peerReviews.map((review) => (
                    <div key={review.id} className="p-4 bg-parchment-light rounded-lg border-2 border-burnt-umber/20">
                      <div className="flex items-start gap-3 mb-2">
                        <img
                          src={review.reviewerAvatar}
                          alt={review.reviewer}
                          className="w-10 h-10 rounded-full border-2 border-burnt-umber"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-display font-semibold text-burnt-umber">
                              {review.reviewer}
                            </span>
                            <span className="px-2 py-0.5 bg-gold/20 rounded text-xs text-gold font-display">
                              {review.reviewerTier}
                            </span>
                          </div>
                          <div className={clsx(
                            'text-sm font-display font-semibold',
                            qualityColors[review.rating]
                          )}>
                            {review.rating.toUpperCase()} Quality
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-burnt-umber/80 font-body leading-relaxed">
                        {review.feedback}
                      </p>
                      <div className="flex gap-4 mt-3 text-xs text-burnt-umber/60">
                        <span>Technical: {review.technicalScore}/100</span>
                        <span>Creativity: {review.creativityScore}/100</span>
                        <span>Craftsmanship: {review.craftsmanshipScore}/100</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* For Sale */}
            {artwork.forSale && artwork.price && (
              <div className="p-4 bg-council-gold/20 rounded-xl border-2 border-council-gold">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-burnt-umber/70">Available for Purchase</div>
                    <div className="text-2xl font-display font-bold text-burnt-umber">
                      ${artwork.price.toLocaleString()}
                    </div>
                  </div>
                  <button className="btn-primary">Contact Artist</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};
