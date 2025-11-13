import React from 'react';
import { motion } from 'framer-motion';
import type { Milestone } from '@/types/gamification';
import { Trophy, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import clsx from 'clsx';

interface MilestoneTrackerProps {
  milestones: Milestone[];
  className?: string;
}

const milestoneColors = {
  devotion: 'text-vote-reject border-vote-reject bg-vote-reject/10',
  reputation: 'text-gold border-gold bg-gold/10',
  artwork: 'text-vote-approve border-vote-approve bg-vote-approve/10',
  community: 'text-council-purple border-council-purple bg-council-purple/10',
};

export const MilestoneTracker: React.FC<MilestoneTrackerProps> = ({ milestones, className }) => {
  const achievedCount = milestones.filter((m) => m.achieved).length;
  const totalCount = milestones.length;
  const progressPercent = (achievedCount / totalCount) * 100;

  return (
    <div className={className}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-display font-bold text-burnt-umber mb-2 flex items-center gap-3">
          <Trophy className="w-8 h-8 text-gold" />
          Lifetime Milestones
        </h2>
        <p className="text-burnt-umber/70">
          Long-term achievements tracking your journey in GuildScape
        </p>
      </div>

      {/* Overall Progress */}
      <div className="mb-8 p-6 bg-gradient-to-r from-gold/20 to-gold/10 rounded-xl border-2 border-gold/30">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm text-burnt-umber/60 font-display mb-1">
              Overall Achievement
            </div>
            <div className="text-4xl font-display font-bold text-gold">
              {achievedCount}/{totalCount}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-burnt-umber/60 font-display mb-1">
              Completion Rate
            </div>
            <div className="text-4xl font-display font-bold text-burnt-umber">
              {Math.round(progressPercent)}%
            </div>
          </div>
        </div>
        <div className="h-4 bg-parchment-dark rounded-full overflow-hidden border-2 border-burnt-umber/20">
          <motion.div
            className="h-full bg-gradient-to-r from-gold to-gold-light"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>
      </div>

      {/* Milestones Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {milestones.map((milestone, index) => {
          const colorClass = milestoneColors[milestone.type];
          const progress = Math.min((milestone.current / milestone.threshold) * 100, 100);

          return (
            <motion.div
              key={milestone.id}
              className={clsx(
                'relative p-6 rounded-xl border-2 transition-all',
                milestone.achieved
                  ? 'bg-vote-approve/10 border-vote-approve'
                  : 'bg-parchment-light border-burnt-umber/20 hover:border-burnt-umber/40'
              )}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              {/* Achievement Badge */}
              {milestone.achieved && (
                <div className="absolute -top-3 -right-3">
                  <div className="w-12 h-12 bg-vote-approve rounded-full border-2 border-burnt-umber flex items-center justify-center shadow-seal">
                    <CheckCircle2 className="w-6 h-6 text-parchment" />
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className={clsx(
                  'w-16 h-16 rounded-xl border-2 flex items-center justify-center flex-shrink-0',
                  colorClass
                )}>
                  <span className="text-3xl">{milestone.icon}</span>
                </div>

                <div className="flex-1">
                  <div className={clsx(
                    'inline-block px-2 py-0.5 rounded text-xs font-display font-bold uppercase mb-2',
                    colorClass
                  )}>
                    {milestone.type}
                  </div>
                  <h3 className={clsx(
                    'text-lg font-display font-bold mb-1',
                    milestone.achieved ? 'text-vote-approve' : 'text-burnt-umber'
                  )}>
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-burnt-umber/70">
                    {milestone.description}
                  </p>
                </div>
              </div>

              {/* Progress */}
              {!milestone.achieved && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-display font-semibold text-burnt-umber">
                      {milestone.current.toLocaleString()} / {milestone.threshold.toLocaleString()}
                    </span>
                    <span className="text-sm font-display font-bold text-council-blue">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="h-3 bg-parchment-dark rounded-full overflow-hidden border border-burnt-umber/20">
                    <motion.div
                      className="h-full bg-gradient-to-r from-council-blue to-council-blue/70"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8, delay: 0.3 + index * 0.05 }}
                    />
                  </div>
                </div>
              )}

              {/* Achievement Date */}
              {milestone.achieved && milestone.achievedDate && (
                <div className="text-xs text-vote-approve font-display font-semibold">
                  ✓ Achieved on {format(milestone.achievedDate, 'MMMM d, yyyy')}
                </div>
              )}

              {/* Reward */}
              {milestone.reward && (
                <div className="mt-3 pt-3 border-t border-burnt-umber/10">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-burnt-umber/60 font-display">Reward:</span>
                    <span className="px-3 py-1 bg-gold/20 border border-gold/30 rounded-full font-display font-semibold text-burnt-umber">
                      {milestone.reward.type === 'badge' && '🏅'}
                      {milestone.reward.type === 'gld' && '💰'}
                      {milestone.reward.type === 'reputation' && '⭐'}
                      {' '}
                      {milestone.reward.name || `${milestone.reward.amount} ${milestone.reward.type.toUpperCase()}`}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
