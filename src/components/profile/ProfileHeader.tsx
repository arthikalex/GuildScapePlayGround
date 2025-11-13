import React from 'react';
import { motion } from 'framer-motion';
import type { User } from '@/types/user';
import { Calendar, MapPin, Globe, Edit, Shield, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@components/common/Button';
import clsx from 'clsx';

interface ProfileHeaderProps {
  user: User;
  isOwnProfile?: boolean;
  onEdit?: () => void;
  className?: string;
}

const tierColors = {
  Novice: 'from-burnt-umber/20 to-burnt-umber/10',
  Maker: 'from-green-600/20 to-green-600/10',
  Artisan: 'from-blue-600/20 to-blue-600/10',
  Master: 'from-purple-600/20 to-purple-600/10',
  Elder: 'from-gold/30 to-gold/15',
};

const tierBadgeColors = {
  Novice: 'bg-burnt-umber/20 text-burnt-umber border-burnt-umber',
  Maker: 'bg-green-600/20 text-green-600 border-green-600',
  Artisan: 'bg-blue-600/20 text-blue-600 border-blue-600',
  Master: 'bg-purple-600/20 text-purple-600 border-purple-600',
  Elder: 'bg-gold/30 text-gold border-gold',
};

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  isOwnProfile = true,
  onEdit,
  className,
}) => {
  return (
    <motion.div
      className={clsx(
        'relative bg-gradient-to-br from-parchment-light to-parchment',
        'rounded-2xl border-4 border-burnt-umber shadow-chamber overflow-hidden',
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative Background Pattern */}
      <div
        className={clsx(
          'absolute inset-0 opacity-30',
          'bg-gradient-to-br',
          tierColors[user.tier]
        )}
      />

      {/* Decorative Border Corners */}
      <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-gold rounded-tl-2xl opacity-50" />
      <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-gold rounded-tr-2xl opacity-50" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-gold rounded-bl-2xl opacity-50" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-gold rounded-br-2xl opacity-50" />

      <div className="relative p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Portrait Section */}
          <div className="flex-shrink-0">
            <motion.div
              className="relative"
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 0.8 }}
            >
              {/* Portrait Frame */}
              <div className="relative w-48 h-48 rounded-full border-8 border-gold shadow-seal overflow-hidden bg-parchment-dark">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />

                {/* Inner frame glow */}
                <div className="absolute inset-0 rounded-full border-4 border-gold/30" />
              </div>

              {/* Tier Badge Overlay */}
              <motion.div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div
                  className={clsx(
                    'px-6 py-2 rounded-full border-3 font-display font-bold text-lg',
                    'shadow-elevated backdrop-blur-sm',
                    tierBadgeColors[user.tier]
                  )}
                >
                  {user.tier}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Info Section */}
          <div className="flex-1">
            {/* Name and Title */}
            <div className="mb-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <motion.h1
                    className="text-4xl md:text-5xl font-display font-bold text-burnt-umber mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {user.name}
                  </motion.h1>

                  <motion.p
                    className="text-xl text-gold font-display font-semibold mb-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {user.title}
                  </motion.p>
                </div>

                {isOwnProfile && onEdit && (
                  <Button variant="secondary" size="sm" icon={<Edit />} onClick={onEdit}>
                    Edit Profile
                  </Button>
                )}
              </div>

              {/* Bio */}
              {user.bio && (
                <motion.p
                  className="text-burnt-umber/80 font-body leading-relaxed mb-4 max-w-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {user.bio}
                </motion.p>
              )}
            </div>

            {/* Meta Info */}
            <motion.div
              className="flex flex-wrap gap-4 text-sm text-burnt-umber/70 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Joined {format(new Date(user.joinDate), 'MMMM yyyy')}</span>
              </div>

              {user.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location}</span>
                </div>
              )}

              {user.website && (
                <a
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-gold transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>{user.website.replace(/^https?:\/\//, '')}</span>
                </a>
              )}
            </motion.div>

            {/* Quick Stats Grid */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {/* Total Reputation */}
              <div className="p-4 bg-parchment-light rounded-xl border-2 border-burnt-umber/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-council-blue" />
                  <span className="text-xs text-burnt-umber/60 font-display">Reputation</span>
                </div>
                <div className="text-2xl font-display font-bold text-council-blue">
                  {user.reputation.total.toLocaleString()}
                </div>
              </div>

              {/* Badges */}
              <div className="p-4 bg-parchment-light rounded-xl border-2 border-burnt-umber/20">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-council-purple" />
                  <span className="text-xs text-burnt-umber/60 font-display">Badges</span>
                </div>
                <div className="text-2xl font-display font-bold text-council-purple">
                  {user.badges.length}
                </div>
              </div>

              {/* Guilds */}
              <div className="p-4 bg-parchment-light rounded-xl border-2 border-burnt-umber/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 text-council-gold">🏰</div>
                  <span className="text-xs text-burnt-umber/60 font-display">Guilds</span>
                </div>
                <div className="text-2xl font-display font-bold text-council-gold">
                  {user.guilds.length}
                </div>
              </div>

              {/* Voting Power */}
              <div className="p-4 bg-parchment-light rounded-xl border-2 border-burnt-umber/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 text-gold">⚖️</div>
                  <span className="text-xs text-burnt-umber/60 font-display">Voting Power</span>
                </div>
                <div className="text-2xl font-display font-bold text-gold">
                  {user.votingPower.toLocaleString()}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
