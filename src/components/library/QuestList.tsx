import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QuestCard } from './QuestCard';
import type { Quest, QuestStatus, QuestRarity } from '@/types/gamification';
import { Search, Filter, Trophy } from 'lucide-react';
import clsx from 'clsx';

interface QuestListProps {
  quests: Quest[];
  onSelectQuest: (quest: Quest) => void;
  className?: string;
}

export const QuestList: React.FC<QuestListProps> = ({ quests, onSelectQuest, className }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | QuestStatus>('all');
  const [rarityFilter] = useState<'all' | QuestRarity>('all');
  const [sortBy, setSortBy] = useState<'progress' | 'rarity' | 'recent'>('progress');

  // Filter quests
  let filteredQuests = quests;

  if (searchQuery) {
    filteredQuests = filteredQuests.filter((q) =>
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (statusFilter !== 'all') {
    filteredQuests = filteredQuests.filter((q) => q.status === statusFilter);
  }

  if (rarityFilter !== 'all') {
    filteredQuests = filteredQuests.filter((q) => q.rarity === rarityFilter);
  }

  // Sort quests
  filteredQuests = [...filteredQuests].sort((a, b) => {
    if (sortBy === 'progress') {
      // Active quests first, then by progress
      if (a.status === 'active' && b.status !== 'active') return -1;
      if (a.status !== 'active' && b.status === 'active') return 1;
      return b.progress - a.progress;
    }
    if (sortBy === 'rarity') {
      const rarityOrder = { legendary: 5, epic: 4, rare: 3, uncommon: 2, common: 1 };
      return rarityOrder[b.rarity] - rarityOrder[a.rarity];
    }
    return 0; // recent - keep original order
  });

  // Stats
  const activeCount = quests.filter((q) => q.status === 'active').length;
  const completedCount = quests.filter((q) => q.status === 'completed').length;
  const availableCount = quests.filter((q) => q.status === 'available').length;

  return (
    <div className={className}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-display font-bold text-burnt-umber mb-2 flex items-center gap-3">
          <Trophy className="w-8 h-8 text-gold" />
          Quests
        </h2>
        <p className="text-burnt-umber/70">
          Embark on epic journeys to earn rewards and advance your mastery
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-council-blue/10 rounded-xl border-2 border-council-blue/30">
          <div className="text-sm text-burnt-umber/60 font-display mb-1">Active Quests</div>
          <div className="text-3xl font-display font-bold text-council-blue">{activeCount}</div>
        </div>
        <div className="p-4 bg-vote-approve/10 rounded-xl border-2 border-vote-approve/30">
          <div className="text-sm text-burnt-umber/60 font-display mb-1">Completed</div>
          <div className="text-3xl font-display font-bold text-vote-approve">{completedCount}</div>
        </div>
        <div className="p-4 bg-gold/10 rounded-xl border-2 border-gold/30">
          <div className="text-sm text-burnt-umber/60 font-display mb-1">Available</div>
          <div className="text-3xl font-display font-bold text-gold">{availableCount}</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 mb-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-burnt-umber/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search quests..."
            className="w-full pl-12 pr-4 py-3 bg-parchment-light border-2 border-burnt-umber/20 rounded-xl text-burnt-umber placeholder:text-burnt-umber/40 focus:outline-none focus:border-burnt-umber font-body"
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-burnt-umber/60" />
            <button
              onClick={() => setStatusFilter('all')}
              className={clsx(
                'px-4 py-2 rounded-lg text-sm font-display font-semibold transition-all',
                statusFilter === 'all'
                  ? 'bg-gold text-burnt-umber border-2 border-burnt-umber'
                  : 'bg-parchment-light text-burnt-umber/70 border-2 border-burnt-umber/20 hover:border-burnt-umber/40'
              )}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={clsx(
                'px-4 py-2 rounded-lg text-sm font-display font-semibold transition-all',
                statusFilter === 'active'
                  ? 'bg-gold text-burnt-umber border-2 border-burnt-umber'
                  : 'bg-parchment-light text-burnt-umber/70 border-2 border-burnt-umber/20 hover:border-burnt-umber/40'
              )}
            >
              Active
            </button>
            <button
              onClick={() => setStatusFilter('available')}
              className={clsx(
                'px-4 py-2 rounded-lg text-sm font-display font-semibold transition-all',
                statusFilter === 'available'
                  ? 'bg-gold text-burnt-umber border-2 border-burnt-umber'
                  : 'bg-parchment-light text-burnt-umber/70 border-2 border-burnt-umber/20 hover:border-burnt-umber/40'
              )}
            >
              Available
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={clsx(
                'px-4 py-2 rounded-lg text-sm font-display font-semibold transition-all',
                statusFilter === 'completed'
                  ? 'bg-gold text-burnt-umber border-2 border-burnt-umber'
                  : 'bg-parchment-light text-burnt-umber/70 border-2 border-burnt-umber/20 hover:border-burnt-umber/40'
              )}
            >
              Completed
            </button>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-4 py-2 bg-parchment-light border-2 border-burnt-umber/20 rounded-lg text-sm font-display text-burnt-umber focus:outline-none focus:border-burnt-umber"
          >
            <option value="progress">By Progress</option>
            <option value="rarity">By Rarity</option>
            <option value="recent">Recently Added</option>
          </select>
        </div>
      </div>

      {/* Quest Grid */}
      {filteredQuests.length > 0 ? (
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {filteredQuests.map((quest, index) => (
            <QuestCard
              key={quest.id}
              quest={quest}
              index={index}
              onClick={() => onSelectQuest(quest)}
            />
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-20 bg-parchment-light rounded-xl border-2 border-burnt-umber/20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-display font-bold text-burnt-umber mb-2">
            No Quests Found
          </h3>
          <p className="text-burnt-umber/70">
            {searchQuery
              ? `No quests match "${searchQuery}"`
              : 'Adjust your filters to see more quests'}
          </p>
        </div>
      )}
    </div>
  );
};
