import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp } from 'lucide-react';
import clsx from 'clsx';

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar?: string;
  reputation: number;
  tier: string;
  change?: number; // Position change from previous period
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
  maxEntries?: number;
  className?: string;
}

const getRankBadge = (rank: number) => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return `#${rank}`;
};

export const Leaderboard: React.FC<LeaderboardProps> = ({
  entries,
  currentUserId,
  maxEntries = 10,
  className,
}) => {
  const displayedEntries = entries.slice(0, maxEntries);

  if (entries.length === 0) {
    return (
      <div className={clsx('text-center py-8', className)}>
        <Trophy className="w-12 h-12 text-burnt-umber/20 mx-auto mb-3" />
        <p className="text-burnt-umber/60 font-display">No leaderboard data</p>
      </div>
    );
  }

  return (
    <div className={clsx('space-y-2', className)}>
      {displayedEntries.map((entry, index) => {
        const isCurrentUser = entry.userId === currentUserId;

        return (
          <motion.div
            key={entry.userId}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={clsx(
              'flex items-center gap-3 p-3 rounded-lg border-2 transition-all',
              isCurrentUser
                ? 'bg-gold/10 border-gold/40 shadow-seal'
                : 'bg-parchment-light border-burnt-umber/10 hover:border-burnt-umber/30'
            )}
          >
            {/* Rank */}
            <div className="flex-shrink-0 w-12 text-center">
              <div className="flex items-center justify-center">
                {entry.rank <= 3 ? (
                  <span className="text-2xl">{getRankBadge(entry.rank)}</span>
                ) : (
                  <span className="text-lg font-display font-bold text-burnt-umber/60">
                    #{entry.rank}
                  </span>
                )}
              </div>
            </div>

            {/* Avatar & Name */}
            <div className="flex-1 flex items-center gap-3 min-w-0">
              {entry.avatar ? (
                <img
                  src={entry.avatar}
                  alt={entry.name}
                  className="w-10 h-10 rounded-full border-2 border-burnt-umber/20"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-burnt-umber/20 border-2 border-burnt-umber/20 flex items-center justify-center">
                  <span className="text-burnt-umber/60 font-display font-bold">
                    {entry.name.charAt(0)}
                  </span>
                </div>
              )}

              <div className="min-w-0 flex-1">
                <h4 className={clsx(
                  'font-display font-semibold text-sm truncate',
                  isCurrentUser ? 'text-gold' : 'text-burnt-umber'
                )}>
                  {entry.name}
                  {isCurrentUser && (
                    <span className="ml-2 text-xs font-normal">(You)</span>
                  )}
                </h4>
                <p className="text-xs text-burnt-umber/60">{entry.tier}</p>
              </div>
            </div>

            {/* Change indicator */}
            {entry.change !== undefined && entry.change !== 0 && (
              <div
                className={clsx(
                  'flex-shrink-0 flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded',
                  entry.change > 0
                    ? 'bg-vote-approve/20 text-vote-approve'
                    : 'bg-vote-reject/20 text-vote-reject'
                )}
              >
                <TrendingUp
                  className={clsx(
                    'w-3 h-3',
                    entry.change < 0 && 'rotate-180'
                  )}
                />
                <span>{Math.abs(entry.change)}</span>
              </div>
            )}

            {/* Reputation */}
            <div className="flex-shrink-0 text-right">
              <div className="text-lg font-display font-bold text-council-blue">
                {entry.reputation.toLocaleString()}
              </div>
              <div className="text-xs text-burnt-umber/60">REP</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
