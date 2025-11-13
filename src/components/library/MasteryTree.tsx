import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { MasteryTree as MasteryTreeType, SkillNode } from '@/types/gamification';
import { Lock, CheckCircle2, Star, TrendingUp } from 'lucide-react';
import clsx from 'clsx';

interface MasteryTreeProps {
  masteryTree: MasteryTreeType;
  onNodeClick?: (node: SkillNode) => void;
  className?: string;
}

export const MasteryTree: React.FC<MasteryTreeProps> = ({
  masteryTree,
  onNodeClick,
  className
}) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Group nodes by tier
  const nodesByTier = masteryTree.nodes.reduce((acc, node) => {
    if (!acc[node.tier]) acc[node.tier] = [];
    acc[node.tier].push(node);
    return acc;
  }, {} as Record<number, SkillNode[]>);

  const tiers = Object.keys(nodesByTier).map(Number).sort((a, b) => a - b);

  const getNodeStatus = (node: SkillNode) => {
    if (node.completed) return 'completed';
    if (node.locked) return 'locked';
    return 'unlocked';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          bg: 'bg-vote-approve/20',
          border: 'border-vote-approve',
          text: 'text-vote-approve',
          glow: 'shadow-[0_0_20px_rgba(34,197,94,0.3)]',
        };
      case 'unlocked':
        return {
          bg: 'bg-council-blue/20',
          border: 'border-council-blue',
          text: 'text-council-blue',
          glow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]',
        };
      case 'locked':
        return {
          bg: 'bg-burnt-umber/10',
          border: 'border-burnt-umber/30',
          text: 'text-burnt-umber/40',
          glow: '',
        };
      default:
        return {
          bg: 'bg-parchment-light',
          border: 'border-burnt-umber/20',
          text: 'text-burnt-umber',
          glow: '',
        };
    }
  };

  const completionPercent = (masteryTree.completedNodes / masteryTree.totalNodes) * 100;

  return (
    <div className={className}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-display font-bold text-burnt-umber mb-2 flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-gold" />
          {masteryTree.medium} Mastery
        </h2>
        <p className="text-burnt-umber/70">
          Unlock skills and advance through mastery tiers
        </p>
      </div>

      {/* Overall Progress */}
      <div className="mb-8 p-6 bg-gradient-to-r from-gold/20 to-gold/10 rounded-xl border-2 border-gold/30">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm text-burnt-umber/60 font-display mb-1">
              Mastery Level
            </div>
            <div className="text-4xl font-display font-bold text-gold">
              Level {masteryTree.level}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-burnt-umber/60 font-display mb-1">
              Skills Mastered
            </div>
            <div className="text-4xl font-display font-bold text-burnt-umber">
              {masteryTree.completedNodes}/{masteryTree.totalNodes}
            </div>
          </div>
        </div>
        <div className="h-4 bg-parchment-dark rounded-full overflow-hidden border-2 border-burnt-umber/20">
          <motion.div
            className="h-full bg-gradient-to-r from-gold to-gold-light"
            initial={{ width: 0 }}
            animate={{ width: `${completionPercent}%` }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>
      </div>

      {/* Skill Tree */}
      <div className="relative">
        {/* Tier Labels */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-parchment-light rounded-xl border-2 border-burnt-umber/20">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-vote-approve" />
              <span className="text-sm font-display text-burnt-umber">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-council-blue" />
              <span className="text-sm font-display text-burnt-umber">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-burnt-umber/40" />
              <span className="text-sm font-display text-burnt-umber">Locked</span>
            </div>
          </div>
        </div>

        {/* Tree Visualization */}
        <div className="space-y-12">
          {tiers.map((tier, tierIndex) => (
            <motion.div
              key={tier}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: tierIndex * 0.1 }}
            >
              {/* Tier Header */}
              <div className="text-center mb-6">
                <div className="inline-block px-4 py-2 bg-gold/20 border-2 border-gold/40 rounded-lg">
                  <span className="text-lg font-display font-bold text-burnt-umber">
                    Tier {tier}
                  </span>
                </div>
              </div>

              {/* Nodes in this tier */}
              <div
                className="grid gap-6"
                style={{
                  gridTemplateColumns: `repeat(${Math.min(nodesByTier[tier].length, 4)}, 1fr)`,
                  maxWidth: `${Math.min(nodesByTier[tier].length, 4) * 250}px`,
                  margin: '0 auto'
                }}
              >
                {nodesByTier[tier].map((node, nodeIndex) => {
                  const status = getNodeStatus(node);
                  const colors = getStatusColor(status);

                  return (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + tierIndex * 0.1 + nodeIndex * 0.05 }}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      onClick={() => !node.locked && onNodeClick?.(node)}
                      className={clsx(
                        'relative p-5 rounded-xl border-2 transition-all cursor-pointer',
                        colors.bg,
                        colors.border,
                        hoveredNode === node.id && !node.locked && colors.glow,
                        node.locked && 'cursor-not-allowed',
                        !node.locked && 'hover:-translate-y-1'
                      )}
                    >
                      {/* Status Icon */}
                      <div className="absolute -top-3 -right-3">
                        <div className={clsx(
                          'w-10 h-10 rounded-full border-2 flex items-center justify-center shadow-seal',
                          colors.bg,
                          colors.border
                        )}>
                          {node.completed && <CheckCircle2 className="w-5 h-5 text-vote-approve" />}
                          {!node.completed && !node.locked && <Star className="w-5 h-5 text-council-blue" />}
                          {node.locked && <Lock className="w-5 h-5 text-burnt-umber/40" />}
                        </div>
                      </div>

                      {/* Node Content */}
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 rounded-full border-2 bg-parchment flex items-center justify-center text-3xl border-burnt-umber/20">
                          {node.locked ? '🔒' : node.completed ? '✨' : '⭐'}
                        </div>

                        <h4 className={clsx(
                          'text-lg font-display font-bold mb-2',
                          colors.text
                        )}>
                          {node.name}
                        </h4>

                        <p className={clsx(
                          'text-sm mb-3 line-clamp-2',
                          node.locked ? 'text-burnt-umber/40' : 'text-burnt-umber/70'
                        )}>
                          {node.description}
                        </p>

                        {/* Progress Bar for unlocked incomplete nodes */}
                        {!node.locked && !node.completed && node.progress > 0 && (
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-burnt-umber/60 font-display">
                                Progress
                              </span>
                              <span className="text-xs font-display font-bold text-council-blue">
                                {node.progress}%
                              </span>
                            </div>
                            <div className="h-2 bg-parchment-dark rounded-full overflow-hidden">
                              <div
                                className="h-full bg-council-blue transition-all duration-300"
                                style={{ width: `${node.progress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Requirements */}
                        {!node.completed && (
                          <div className="text-xs text-burnt-umber/60 font-display">
                            {node.locked ? (
                              <div className="px-2 py-1 bg-burnt-umber/10 rounded">
                                Complete prerequisites
                              </div>
                            ) : (
                              <div className="space-y-1">
                                {node.requirements.artworks && (
                                  <div>🎨 {node.requirements.artworks} artworks</div>
                                )}
                                {node.requirements.peerReviews && (
                                  <div>⭐ {node.requirements.peerReviews} reviews</div>
                                )}
                                {node.requirements.quality && (
                                  <div>🏆 {node.requirements.quality} quality</div>
                                )}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Rewards */}
                        {node.completed && node.rewards.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-burnt-umber/10">
                            <div className="text-xs text-burnt-umber/60 mb-1">Rewards Earned:</div>
                            <div className="flex flex-wrap gap-1 justify-center">
                              {node.rewards.map((reward, i) => (
                                <span key={i} className="text-sm">
                                  {reward.type === 'badge' && '🏅'}
                                  {reward.type === 'gld' && '💰'}
                                  {reward.type === 'reputation' && '⭐'}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Hover Tooltip */}
                      {hoveredNode === node.id && !node.locked && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full z-10 px-3 py-1 bg-burnt-umber text-parchment text-xs font-display rounded-lg whitespace-nowrap shadow-xl"
                        >
                          Click to view details
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-burnt-umber rotate-45" />
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Connection Lines to Next Tier */}
              {tierIndex < tiers.length - 1 && (
                <div className="flex justify-center my-6">
                  <div className="w-px h-8 bg-gradient-to-b from-gold/60 to-gold/20" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
