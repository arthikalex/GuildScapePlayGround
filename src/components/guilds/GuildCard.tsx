import React from 'react';
import { motion } from 'framer-motion';
import type { Guild } from '@/types/guild';
import { Users, Briefcase, Coins, Calendar, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import clsx from 'clsx';

interface GuildCardProps {
  guild: Guild;
  onEnter: () => void;
  index?: number;
  userCanJoin?: boolean;
}

export const GuildCard: React.FC<GuildCardProps> = ({ guild, onEnter, index = 0, userCanJoin = true }) => {
  const memberCount = guild.members.length;
  const activeProjects = guild.projects.filter((p) => p.status === 'active').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onEnter}
      className={clsx(
        'relative bg-gradient-to-br from-parchment-light to-parchment',
        'border-4 border-burnt-umber rounded-2xl overflow-hidden',
        'shadow-elevated hover:shadow-chamber hover:-translate-y-2',
        'transition-all duration-300 cursor-pointer group'
      )}
    >
      {/* Banner Image */}
      {guild.banner && (
        <div className="relative h-32 overflow-hidden bg-gradient-to-br from-chamber-stone to-chamber-dark">
          <img
            src={guild.banner}
            alt={guild.name}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-chamber-dark/80 to-transparent" />
        </div>
      )}

      {/* Crest - Overlays banner */}
      <div className="absolute top-16 left-6">
        <motion.div
          className="w-24 h-24 rounded-full bg-parchment border-4 border-gold shadow-seal p-3"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {guild.crest ? (
            <img src={guild.crest} alt={`${guild.name} crest`} className="w-full h-full object-contain" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">🏰</div>
          )}
        </motion.div>
      </div>

      {/* Content */}
      <div className="pt-16 px-6 pb-6">
        {/* Guild Name and Tagline */}
        <div className="mb-4">
          <h3 className="text-2xl font-display font-bold text-burnt-umber mb-2 group-hover:text-gold transition-colors">
            {guild.name}
          </h3>
          {guild.tagline && (
            <p className="text-sm text-gold font-display italic">"{guild.tagline}"</p>
          )}
        </div>

        {/* Description */}
        <p className="text-burnt-umber/80 font-body text-sm leading-relaxed mb-4 line-clamp-3">
          {guild.description}
        </p>

        {/* Tags */}
        {guild.tags && guild.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {guild.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gold/20 rounded-full text-xs text-burnt-umber font-display"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-3 bg-parchment-light rounded-lg">
            <Users className="w-5 h-5 text-council-blue mx-auto mb-1" />
            <div className="text-lg font-display font-bold text-burnt-umber">
              {memberCount}
            </div>
            <div className="text-xs text-burnt-umber/60">Members</div>
          </div>

          <div className="text-center p-3 bg-parchment-light rounded-lg">
            <Briefcase className="w-5 h-5 text-council-purple mx-auto mb-1" />
            <div className="text-lg font-display font-bold text-burnt-umber">
              {activeProjects}
            </div>
            <div className="text-xs text-burnt-umber/60">Projects</div>
          </div>

          <div className="text-center p-3 bg-parchment-light rounded-lg">
            <Coins className="w-5 h-5 text-gold mx-auto mb-1" />
            <div className="text-lg font-display font-bold text-burnt-umber">
              {(guild.treasury.balance / 1000).toFixed(1)}k
            </div>
            <div className="text-xs text-burnt-umber/60">Treasury</div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t-2 border-burnt-umber/20">
          <div className="flex items-center gap-2 text-xs text-burnt-umber/60">
            <Calendar className="w-4 h-4" />
            <span>Founded {format(new Date(guild.foundedDate), 'MMM yyyy')}</span>
          </div>

          <motion.div
            className="flex items-center gap-1 text-gold font-display font-semibold text-sm"
            whileHover={{ x: 4 }}
          >
            <span>Enter Hall</span>
            <ChevronRight className="w-4 h-4" />
          </motion.div>
        </div>

        {/* Requirements Badge */}
        {guild.requirements && (
          <div className="absolute top-2 right-2">
            <div className={clsx(
              'px-3 py-1 rounded-lg border-2 text-xs font-display font-bold',
              userCanJoin
                ? 'bg-vote-approve/20 border-vote-approve text-vote-approve'
                : 'bg-vote-reject/20 border-vote-reject text-vote-reject'
            )}>
              {userCanJoin ? 'ELIGIBLE' : 'REQUIREMENTS'}
            </div>
          </div>
        )}

        {!guild.requirements && (
          <div className="absolute top-2 right-2">
            <div className="px-3 py-1 bg-vote-approve/20 rounded-lg border-2 border-vote-approve text-xs font-display font-bold text-vote-approve">
              OPEN
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
