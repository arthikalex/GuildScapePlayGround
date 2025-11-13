import React from 'react';
import { motion } from 'framer-motion';
import { Modal } from '@components/common/Modal';
import type { Quest } from '@/types/gamification';
import { CheckCircle2, Circle, Trophy, Clock, Star } from 'lucide-react';
import clsx from 'clsx';

interface QuestDetailModalProps {
  quest: Quest | null;
  isOpen: boolean;
  onClose: () => void;
  onStartQuest?: (questId: string) => void;
  onClaimRewards?: (questId: string) => void;
}

const rarityColors = {
  common: 'text-burnt-umber border-burnt-umber/30 bg-burnt-umber/10',
  uncommon: 'text-green-600 border-green-600 bg-green-600/10',
  rare: 'text-blue-600 border-blue-600 bg-blue-600/10',
  epic: 'text-purple-600 border-purple-600 bg-purple-600/10',
  legendary: 'text-gold border-gold bg-gold/10',
};

export const QuestDetailModal: React.FC<QuestDetailModalProps> = ({
  quest,
  isOpen,
  onClose,
  onStartQuest,
  onClaimRewards,
}) => {
  if (!quest) return null;

  const completedSteps = quest.steps.filter((s) => s.completed).length;
  const totalSteps = quest.steps.length;
  const canClaim = quest.status === 'active' && quest.progress === 100;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" size="xl">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className={clsx(
                  'px-3 py-1 rounded-lg border-2 text-sm font-display font-bold uppercase',
                  rarityColors[quest.rarity]
                )}>
                  {quest.rarity}
                </span>
                <span className="px-3 py-1 bg-burnt-umber/10 rounded-lg text-sm font-display font-semibold text-burnt-umber uppercase">
                  {quest.category}
                </span>
                {quest.status === 'completed' && (
                  <span className="px-3 py-1 bg-vote-approve/20 text-vote-approve rounded-lg text-sm font-display font-bold">
                    ✓ COMPLETED
                  </span>
                )}
              </div>
              <h2 className="text-3xl font-display font-bold text-burnt-umber mb-2">
                {quest.title}
              </h2>
              <p className="text-burnt-umber/70 text-lg">
                {quest.description}
              </p>
            </div>
            <div className="flex-shrink-0 ml-4">
              <div className="w-20 h-20 rounded-full border-4 border-gold bg-gold/20 flex items-center justify-center">
                <Trophy className="w-10 h-10 text-gold" />
              </div>
            </div>
          </div>

          {quest.longDescription && (
            <div className="p-4 bg-parchment-light rounded-lg border-2 border-burnt-umber/20">
              <p className="text-burnt-umber/80 leading-relaxed">
                {quest.longDescription}
              </p>
            </div>
          )}
        </div>

        {/* Progress Overview */}
        <div className="p-6 bg-gradient-to-r from-council-gold/20 to-gold/10 rounded-xl border-2 border-gold/30">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm text-burnt-umber/60 font-display mb-1">
                Overall Progress
              </div>
              <div className="text-3xl font-display font-bold text-gold">
                {quest.progress}%
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-burnt-umber/60 font-display mb-1">
                Steps Completed
              </div>
              <div className="text-3xl font-display font-bold text-burnt-umber">
                {completedSteps}/{totalSteps}
              </div>
            </div>
          </div>
          <div className="h-3 bg-parchment-dark rounded-full overflow-hidden border-2 border-burnt-umber/20">
            <motion.div
              className="h-full bg-gradient-to-r from-gold to-gold-light"
              initial={{ width: 0 }}
              animate={{ width: `${quest.progress}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        {/* Quest Steps */}
        <div>
          <h3 className="text-xl font-display font-bold text-burnt-umber mb-4 flex items-center gap-2">
            <Star className="w-6 h-6 text-gold" />
            Quest Steps
          </h3>
          <div className="space-y-3">
            {quest.steps.map((step, index) => (
              <motion.div
                key={step.id}
                className={clsx(
                  'p-4 rounded-lg border-2 transition-all',
                  step.completed
                    ? 'bg-vote-approve/10 border-vote-approve/30'
                    : 'bg-parchment-light border-burnt-umber/20'
                )}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-start gap-3">
                  {/* Step Icon */}
                  <div className={clsx(
                    'w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1',
                    step.completed
                      ? 'bg-vote-approve border-vote-approve'
                      : 'bg-parchment border-burnt-umber/30'
                  )}>
                    {step.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-parchment" />
                    ) : (
                      <Circle className="w-5 h-5 text-burnt-umber/40" />
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1">
                    <h4 className={clsx(
                      'font-display font-semibold text-burnt-umber mb-1',
                      step.completed && 'line-through text-burnt-umber/60'
                    )}>
                      {step.title}
                    </h4>
                    {step.description && (
                      <p className="text-sm text-burnt-umber/70 mb-2">
                        {step.description}
                      </p>
                    )}

                    {/* Progress Bar for partial steps */}
                    {step.progress !== undefined && step.total !== undefined && !step.completed && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-burnt-umber/60">
                            {step.progress} / {step.total}
                          </span>
                          <span className="text-xs font-display font-bold text-council-blue">
                            {Math.round((step.progress / step.total) * 100)}%
                          </span>
                        </div>
                        <div className="h-2 bg-parchment-dark rounded-full overflow-hidden">
                          <div
                            className="h-full bg-council-blue transition-all duration-300"
                            style={{ width: `${(step.progress / step.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Step Reward */}
                    {step.reward && (
                      <div className="mt-2 inline-block px-2 py-1 bg-gold/20 border border-gold/30 rounded text-xs font-display font-semibold text-burnt-umber">
                        Reward: {step.reward.name || step.reward.type}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Rewards Section */}
        <div className="p-6 bg-gradient-to-br from-gold/20 to-gold/5 rounded-xl border-2 border-gold/30">
          <h3 className="text-xl font-display font-bold text-burnt-umber mb-4 flex items-center gap-2">
            🎁 Quest Rewards
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {quest.rewards.map((reward, index) => (
              <motion.div
                key={index}
                className="p-4 bg-parchment-light rounded-lg border-2 border-burnt-umber/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="flex items-center gap-3">
                  {reward.image && (
                    <img
                      src={reward.image}
                      alt={reward.name}
                      className="w-12 h-12 rounded-lg border-2 border-gold"
                    />
                  )}
                  {!reward.image && (
                    <div className="w-12 h-12 rounded-lg border-2 border-gold bg-gold/20 flex items-center justify-center text-2xl">
                      {reward.type === 'badge' && '🏅'}
                      {reward.type === 'gld' && '💰'}
                      {reward.type === 'reputation' && '⭐'}
                      {reward.type === 'avatar-item' && '👕'}
                      {reward.type === 'unlock' && '🔓'}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="font-display font-bold text-burnt-umber">
                      {reward.name || reward.type.toUpperCase()}
                    </div>
                    {reward.amount && (
                      <div className="text-sm text-gold font-display font-semibold">
                        +{reward.amount}
                      </div>
                    )}
                    {reward.description && (
                      <div className="text-xs text-burnt-umber/60 mt-1">
                        {reward.description}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Expiry Warning */}
        {quest.expiryDate && quest.status !== 'completed' && (
          <div className="p-4 bg-vote-reject/10 border-2 border-vote-reject/30 rounded-lg flex items-center gap-3">
            <Clock className="w-6 h-6 text-vote-reject flex-shrink-0" />
            <div>
              <div className="font-display font-semibold text-vote-reject">
                Time-Limited Quest
              </div>
              <div className="text-sm text-burnt-umber/70">
                This quest expires on {quest.expiryDate.toLocaleDateString()}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          {quest.status === 'available' && onStartQuest && (
            <button
              onClick={() => {
                onStartQuest(quest.id);
                onClose();
              }}
              className="btn-primary"
            >
              Start Quest
            </button>
          )}
          {canClaim && onClaimRewards && (
            <button
              onClick={() => {
                onClaimRewards(quest.id);
                onClose();
              }}
              className="btn-primary animate-pulse"
            >
              🎉 Claim Rewards!
            </button>
          )}
          {quest.status === 'active' && !canClaim && (
            <button onClick={onClose} className="btn-secondary">
              Continue Quest
            </button>
          )}
          {quest.status === 'completed' && (
            <button onClick={onClose} className="btn-secondary">
              Close
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};
