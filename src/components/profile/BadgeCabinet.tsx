import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import type { Badge, BadgeRarity } from '@/types/user';
import { Modal, ModalBody, ModalFooter } from '@components/common/Modal';
import { Button } from '@components/common/Button';
import { Award, Calendar, Info } from 'lucide-react';
import clsx from 'clsx';

interface BadgeCabinetProps {
  badges: Badge[];
  className?: string;
}

const rarityStyles: Record<BadgeRarity, string> = {
  common: 'badge-common',
  uncommon: 'badge-uncommon',
  rare: 'badge-rare',
  epic: 'badge-epic',
  legendary: 'badge-legendary',
};

const rarityColors: Record<BadgeRarity, string> = {
  common: 'text-burnt-umber',
  uncommon: 'text-green-600',
  rare: 'text-blue-600',
  epic: 'text-purple-600',
  legendary: 'text-gold',
};

const rarityBorders: Record<BadgeRarity, string> = {
  common: 'border-burnt-umber/30',
  uncommon: 'border-green-500/40',
  rare: 'border-blue-500/40',
  epic: 'border-purple-500/40',
  legendary: 'border-gold/60',
};

export const BadgeCabinet: React.FC<BadgeCabinetProps> = ({ badges, className }) => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  // Group badges by type
  const groupedBadges = badges.reduce((acc, badge) => {
    if (!acc[badge.type]) {
      acc[badge.type] = [];
    }
    acc[badge.type].push(badge);
    return acc;
  }, {} as Record<string, Badge[]>);

  return (
    <div className={className}>
      {/* Cabinet Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-display font-bold text-burnt-umber mb-2 flex items-center gap-3">
          <Award className="w-8 h-8 text-gold" />
          Badge Cabinet
        </h2>
        <p className="text-burnt-umber/70">
          Your collection of achievement wax seals • {badges.length} badge{badges.length !== 1 ? 's' : ''} earned
        </p>
      </div>

      {/* Wooden Cabinet Shelves */}
      <div className="space-y-8">
        {Object.entries(groupedBadges).map(([type, typeBadges], shelfIndex) => (
          <motion.div
            key={type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: shelfIndex * 0.1 }}
          >
            {/* Shelf Label */}
            <div className="mb-4">
              <h3 className="text-lg font-display font-semibold text-burnt-umber capitalize">
                {type.replace('-', ' ')} Badges
              </h3>
              <div className="h-1 w-16 bg-gold rounded mt-2" />
            </div>

            {/* Shelf Background */}
            <div className="relative bg-gradient-to-b from-burnt-umber-dark to-burnt-umber p-6 rounded-2xl border-4 border-burnt-umber-dark shadow-elevated">
              {/* Wood grain texture overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-burnt-umber-light/10 to-transparent rounded-2xl pointer-events-none opacity-30" />

              {/* Badge Grid */}
              <div className="relative grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
                {typeBadges.map((badge, index) => (
                  <motion.button
                    key={badge.id}
                    onClick={() => setSelectedBadge(badge)}
                    className={clsx(
                      'group relative w-full aspect-square rounded-full',
                      'flex items-center justify-center transition-all duration-300',
                      'bg-parchment border-4',
                      rarityBorders[badge.rarity],
                      rarityStyles[badge.rarity],
                      'hover:scale-110 hover:-translate-y-2'
                    )}
                    initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{
                      delay: shelfIndex * 0.1 + index * 0.05,
                      type: 'spring',
                      stiffness: 200,
                    }}
                    whileHover={{ rotateY: 10 }}
                  >
                    {/* Badge Icon/Image */}
                    {badge.image ? (
                      <img
                        src={badge.image}
                        alt={badge.name}
                        className="w-full h-full object-cover rounded-full p-2"
                      />
                    ) : (
                      <div className="text-4xl">🏆</div>
                    )}

                    {/* Rarity Glow Effect */}
                    <div
                      className={clsx(
                        'absolute inset-0 rounded-full transition-opacity duration-300',
                        'opacity-0 group-hover:opacity-100',
                        badge.rarity === 'legendary' && 'animate-glow-pulse'
                      )}
                      style={{
                        boxShadow:
                          badge.rarity === 'legendary'
                            ? '0 0 30px rgba(212, 175, 55, 0.8)'
                            : badge.rarity === 'epic'
                            ? '0 0 20px rgba(168, 85, 247, 0.7)'
                            : badge.rarity === 'rare'
                            ? '0 0 15px rgba(59, 130, 246, 0.6)'
                            : badge.rarity === 'uncommon'
                            ? '0 0 10px rgba(34, 197, 94, 0.5)'
                            : 'none',
                      }}
                    />

                    {/* Permanent Badge Indicator */}
                    {badge.permanent && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-gold rounded-full border-2 border-burnt-umber flex items-center justify-center">
                        <span className="text-xs">∞</span>
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {badges.length === 0 && (
        <div className="text-center py-20 bg-parchment-light rounded-2xl border-4 border-burnt-umber/20">
          <Award className="w-16 h-16 text-burnt-umber/30 mx-auto mb-4" />
          <h3 className="text-xl font-display font-semibold text-burnt-umber mb-2">
            No Badges Yet
          </h3>
          <p className="text-burnt-umber/60">
            Complete achievements to earn your first wax seal badge
          </p>
        </div>
      )}

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <Modal
          isOpen={!!selectedBadge}
          onClose={() => setSelectedBadge(null)}
          title={selectedBadge.name}
          size="md"
        >
          <ModalBody>
            <div className="text-center mb-6">
              {/* Large Badge Display */}
              <motion.div
                className={clsx(
                  'inline-block w-32 h-32 rounded-full',
                  'bg-parchment border-8 p-4',
                  rarityBorders[selectedBadge.rarity],
                  rarityStyles[selectedBadge.rarity]
                )}
                initial={{ scale: 0, rotateY: -180 }}
                animate={{ scale: 1, rotateY: 0 }}
                transition={{ type: 'spring', duration: 0.8 }}
              >
                {selectedBadge.image ? (
                  <img
                    src={selectedBadge.image}
                    alt={selectedBadge.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="text-6xl">🏆</div>
                )}
              </motion.div>

              {/* Rarity Badge */}
              <div className="mt-4">
                <span
                  className={clsx(
                    'inline-block px-4 py-2 rounded-lg font-display font-bold text-sm uppercase tracking-wider',
                    'border-2',
                    rarityColors[selectedBadge.rarity],
                    rarityBorders[selectedBadge.rarity],
                    'bg-parchment-light'
                  )}
                >
                  {selectedBadge.rarity} {selectedBadge.permanent && '• Permanent'}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h4 className="text-lg font-display font-semibold text-burnt-umber mb-2 flex items-center gap-2">
                <Info className="w-5 h-5" />
                Description
              </h4>
              <p className="text-burnt-umber/80 font-body leading-relaxed">
                {selectedBadge.description}
              </p>
            </div>

            {/* Earned Date */}
            <div className="p-4 bg-parchment-light rounded-lg border-2 border-burnt-umber/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-burnt-umber/70">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-display">Earned on</span>
                </div>
                <span className="text-sm font-display font-semibold text-burnt-umber">
                  {format(new Date(selectedBadge.earnedDate), 'MMMM d, yyyy')}
                </span>
              </div>
            </div>

            {/* Criteria (if available) */}
            {selectedBadge.criteria && (
              <div className="mt-4 p-4 bg-gold/10 rounded-lg border-2 border-gold/30">
                <h4 className="text-sm font-display font-semibold text-burnt-umber mb-2">
                  How to Earn
                </h4>
                <p className="text-sm text-burnt-umber/70">{selectedBadge.criteria}</p>
              </div>
            )}
          </ModalBody>

          <ModalFooter>
            <Button variant="secondary" onClick={() => setSelectedBadge(null)}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
};
