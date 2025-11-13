import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '@components/layout/PageContainer';
import { GuildCard } from '@components/guilds/GuildCard';
import { useNavigationStore } from '@store/navigationStore';
import { useUserStore } from '@store/userStore';
import { mockGuilds } from '@utils/mockData';
import { Search, Filter, Users, Shield, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export const Guilds: React.FC = () => {
  const navigate = useNavigate();
  const { setBreadcrumbs } = useNavigationStore();
  const { currentUser } = useUserStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'open' | 'requirements'>('all');
  const [sortBy, setSortBy] = useState<'members' | 'treasury' | 'recent'>('members');

  useEffect(() => {
    setBreadcrumbs([{ label: 'Chapter Houses', path: '/guilds' }]);
  }, [setBreadcrumbs]);

  // Filter guilds
  let filteredGuilds = mockGuilds;

  // Search
  if (searchQuery) {
    filteredGuilds = filteredGuilds.filter(
      (guild) =>
        guild.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guild.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guild.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }

  // Filter by type
  if (filterType === 'open') {
    filteredGuilds = filteredGuilds.filter((g) => !g.requirements);
  } else if (filterType === 'requirements') {
    filteredGuilds = filteredGuilds.filter((g) => g.requirements);
  }

  // Sort
  filteredGuilds = [...filteredGuilds].sort((a, b) => {
    if (sortBy === 'members') return b.members.length - a.members.length;
    if (sortBy === 'treasury') return b.treasury.balance - a.treasury.balance;
    return new Date(b.foundedDate).getTime() - new Date(a.foundedDate).getTime(); // recent
  });

  // Check if user can join guilds with requirements
  const userReputation = currentUser?.reputation.total || 0;

  // Stats
  const totalGuilds = mockGuilds.length;
  const openGuilds = mockGuilds.filter((g) => !g.requirements).length;
  const totalMembers = mockGuilds.reduce((sum, g) => sum + g.members.length, 0);
  const avgTreasury = Math.round(
    mockGuilds.reduce((sum, g) => sum + g.treasury.balance, 0) / mockGuilds.length
  );

  return (
    <PageContainer>
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-display font-bold text-burnt-umber mb-3">
          Chapter Houses
        </h1>
        <p className="text-burnt-umber/70 text-lg font-body">
          Join a guild community to collaborate on projects, share knowledge, and grow together
        </p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        className="grid md:grid-cols-4 gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="p-6 bg-gradient-to-br from-council-blue/20 to-council-blue/5 rounded-xl border-2 border-council-blue/30">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-council-blue" />
            <span className="text-sm font-display font-semibold text-burnt-umber">
              Total Guilds
            </span>
          </div>
          <div className="text-3xl font-display font-bold text-council-blue">
            {totalGuilds}
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-vote-approve/20 to-vote-approve/5 rounded-xl border-2 border-vote-approve/30">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-vote-approve" />
            <span className="text-sm font-display font-semibold text-burnt-umber">
              Open to All
            </span>
          </div>
          <div className="text-3xl font-display font-bold text-vote-approve">
            {openGuilds}
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-council-purple/20 to-council-purple/5 rounded-xl border-2 border-council-purple/30">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-council-purple" />
            <span className="text-sm font-display font-semibold text-burnt-umber">
              Total Members
            </span>
          </div>
          <div className="text-3xl font-display font-bold text-council-purple">
            {totalMembers}
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-gold/20 to-gold/5 rounded-xl border-2 border-gold/30">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-gold" />
            <span className="text-sm font-display font-semibold text-burnt-umber">
              Avg Treasury
            </span>
          </div>
          <div className="text-3xl font-display font-bold text-gold">
            {avgTreasury.toLocaleString()}
          </div>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        className="mb-8 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-burnt-umber/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guilds by name, description, or tags..."
            className="w-full pl-12 pr-4 py-4 bg-parchment-light border-2 border-burnt-umber/20 rounded-xl text-burnt-umber placeholder:text-burnt-umber/40 focus:outline-none focus:border-burnt-umber font-body text-lg"
          />
        </div>

        {/* Filters and Sort */}
        <div className="flex items-center justify-between">
          {/* Filter Buttons */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-burnt-umber/60" />
            <button
              onClick={() => setFilterType('all')}
              className={clsx(
                'px-4 py-2 rounded-lg text-sm font-display font-semibold transition-all',
                filterType === 'all'
                  ? 'bg-gold text-burnt-umber border-2 border-burnt-umber'
                  : 'bg-parchment-light text-burnt-umber/70 border-2 border-burnt-umber/20 hover:border-burnt-umber/40'
              )}
            >
              All Guilds
            </button>
            <button
              onClick={() => setFilterType('open')}
              className={clsx(
                'px-4 py-2 rounded-lg text-sm font-display font-semibold transition-all flex items-center gap-2',
                filterType === 'open'
                  ? 'bg-gold text-burnt-umber border-2 border-burnt-umber'
                  : 'bg-parchment-light text-burnt-umber/70 border-2 border-burnt-umber/20 hover:border-burnt-umber/40'
              )}
            >
              <Sparkles className="w-4 h-4" />
              Open to All
            </button>
            <button
              onClick={() => setFilterType('requirements')}
              className={clsx(
                'px-4 py-2 rounded-lg text-sm font-display font-semibold transition-all flex items-center gap-2',
                filterType === 'requirements'
                  ? 'bg-gold text-burnt-umber border-2 border-burnt-umber'
                  : 'bg-parchment-light text-burnt-umber/70 border-2 border-burnt-umber/20 hover:border-burnt-umber/40'
              )}
            >
              <Shield className="w-4 h-4" />
              Has Requirements
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-burnt-umber/60 font-display">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-2 bg-parchment-light border-2 border-burnt-umber/20 rounded-lg text-sm font-display text-burnt-umber focus:outline-none focus:border-burnt-umber"
            >
              <option value="members">Most Members</option>
              <option value="treasury">Richest Treasury</option>
              <option value="recent">Recently Founded</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-burnt-umber/60 font-display">
        Showing {filteredGuilds.length} guild{filteredGuilds.length !== 1 ? 's' : ''}
        {searchQuery && ` matching "${searchQuery}"`}
      </div>

      {/* Guilds Grid */}
      <motion.div
        className="grid md:grid-cols-2 gap-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {filteredGuilds.map((guild, index) => {
          // Check if user meets requirements
          const canJoin = !guild.requirements ||
            (guild.requirements.minReputation !== undefined && userReputation >= guild.requirements.minReputation);

          return (
            <GuildCard
              key={guild.id}
              guild={guild}
              index={index}
              onEnter={() => navigate(`/guilds/${guild.id}`)}
              userCanJoin={canJoin}
            />
          );
        })}
      </motion.div>

      {/* Empty State */}
      {filteredGuilds.length === 0 && (
        <motion.div
          className="text-center py-20 bg-parchment-light rounded-xl border-2 border-burnt-umber/20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="text-6xl mb-4">🏰</div>
          <h3 className="text-xl font-display font-bold text-burnt-umber mb-2">
            No Guilds Found
          </h3>
          <p className="text-burnt-umber/70">
            {searchQuery
              ? `No guilds match "${searchQuery}". Try a different search term.`
              : 'Adjust your filters to see more guilds.'}
          </p>
        </motion.div>
      )}

      {/* Call to Action */}
      <motion.div
        className="p-8 bg-gradient-to-r from-council-gold/20 to-gold/10 rounded-2xl border-2 border-gold/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-display font-bold text-burnt-umber mb-2">
              Want to Start Your Own Guild?
            </h3>
            <p className="text-burnt-umber/70">
              Gather fellow artisans and establish a new chapter house in GuildScape
            </p>
          </div>
          <button className="btn-primary whitespace-nowrap">
            Create Guild
          </button>
        </div>
      </motion.div>
    </PageContainer>
  );
};
