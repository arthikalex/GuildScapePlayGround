import React from 'react';
import { motion } from 'framer-motion';
import type { Quest } from '@/types/gamification';
import { Trophy, Star, Sparkles, Crown, Zap, Clock, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

interface QuestCardProps {
  quest: Quest;
  index?: number;
  onClick?: () => void;
}

const rarityStyles = {
  common: {
    bg: 'bg-burnt-umber/10',
    border: 'border-burnt-umber/30',
    text: 'text-burnt-umber',
    icon: Star,
    glow: '',
  },
  uncommon: {
    bg: 'bg-green-600/10',
    border: 'border-green-600',
    text: 'text-green-600',
    icon: Sparkles,
    glow: 'hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]',
  },
  rare: {
    bg: 'bg-blue-600/10',
    border: 'border-blue-600',
    text: 'text-blue-600',
    icon: Trophy,
    glow: 'hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]',
  },
  epic: {
    bg: 'bg-purple-600/10',
    border: 'border-purple-600',
    text: 'text-purple-600',
    icon: Crown,
    glow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]',
  },
  legendary: {
    bg: 'bg-gold/10',
    border: 'border-gold',
    text: 'text-gold',
    icon: Zap,
    glow: 'hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] hover:animate-glow-pulse',
  },
};

const categoryIcons = {
  skill: '🎯',
  social: '👥',
  achievement: '🏆',
  event: '📅',
  seasonal: '⭐',
};

export const QuestCard: React.FC<QuestCardProps> = ({ quest, index = 0, onClick }) => {
  const style = rarityStyles[quest.rarity];
  const RarityIcon = style.icon;
  const categoryEmoji = categoryIcons[quest.category];

  const completedSteps = quest.steps.filter((s) => s.completed).length;
  const totalSteps = quest.steps.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className={clsx(
        'relative p-6 rounded-xl border-2 cursor-pointer',
        'transition-all duration-300 hover:-translate-y-1',
        'bg-parchment-light',
        style.border,
        style.glow,
        quest.status === 'completed' && 'opacity-75'
      )}
    >
      {/* Rarity Badge */}
      <div className="absolute -top-3 -right-3">
        <div className={clsx(
          'w-12 h-12 rounded-full border-2 flex items-center justify-center shadow-seal',
          style.bg,
          style.border
        )}>
          <RarityIcon className={clsx('w-6 h-6', style.text)} />
        </div>
      </div>

      {/* Status Badge */}
      {quest.status === 'completed' && (
        <div className="absolute -top-3 -left-3">
          <div className="w-10 h-10 bg-vote-approve rounded-full border-2 border-burnt-umber flex items-center justify-center shadow-seal">
            <CheckCircle2 className="w-5 h-5 text-parchment" />
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start gap-3 mb-2">
          <span className="text-3xl">{categoryEmoji}</span>
          <div className="flex-1">
            <h3 className={clsx(
              'text-xl font-display font-bold mb-1',
              style.text
            )}>
              {quest.title}
            </h3>
            <div className="flex items-center gap-2">
              <span className={clsx(
                'px-2 py-0.5 rounded text-xs font-display font-bold uppercase',
                style.bg,
                style.text
              )}>
                {quest.rarity}
              </span>
              <span className="px-2 py-0.5 bg-burnt-umber/10 rounded text-xs font-display text-burnt-umber/70 uppercase">
                {quest.category}
              </span>
            </div>
          </div>
        </div>

        <p className="text-burnt-umber/70 text-sm line-clamp-2">
          {quest.description}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-display font-semibold text-burnt-umber">
            Progress: {completedSteps}/{totalSteps} steps
          </span>
          <span className={clsx('text-sm font-display font-bold', style.text)}>
            {quest.progress}%
          </span>
        </div>
        <div className="h-2 bg-parchment-dark rounded-full overflow-hidden border border-burnt-umber/20">
          <motion.div
            className={clsx('h-full', style.bg, style.border, 'border-l')}
            initial={{ width: 0 }}
            animate={{ width: `${quest.progress}%` }}
            transition={{ duration: 0.8, delay: 0.2 + index * 0.05 }}
          />
        </div>
      </div>

      {/* Rewards */}
      <div className="mb-4">
        <div className="text-xs font-display font-semibold text-burnt-umber mb-2">
          Rewards:
        </div>
        <div className="flex flex-wrap gap-2">
          {quest.rewards.map((reward, i) => (
            <div
              key={i}
              className="px-3 py-1 bg-gold/20 border border-gold/30 rounded-full text-xs font-display font-semibold text-burnt-umber"
            >
              {reward.type === 'badge' && '🏅'}
              {reward.type === 'gld' && '💰'}
              {reward.type === 'reputation' && '⭐'}
              {reward.type === 'avatar-item' && '👕'}
              {reward.type === 'unlock' && '🔓'}
              {' '}
              {reward.name || `${reward.amount} ${reward.type.toUpperCase()}`}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-burnt-umber/60">
        {quest.expiryDate && quest.status !== 'completed' && (
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Expires soon</span>
          </div>
        )}
        {quest.status === 'active' && (
          <span className="ml-auto px-2 py-1 bg-council-blue/20 text-council-blue rounded font-display font-semibold">
            IN PROGRESS
          </span>
        )}
        {quest.status === 'completed' && (
          <span className="ml-auto px-2 py-1 bg-vote-approve/20 text-vote-approve rounded font-display font-semibold">
            COMPLETED
          </span>
        )}
      </div>
    </motion.div>
  );
};
