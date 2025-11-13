import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GuildMember } from '@/types/guild';
import {
  Search,
  Users,
  Crown,
  Shield,
  Star,
  Sparkles,
  Calendar,
  Award,
  MessageSquare,
  TrendingUp,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import clsx from 'clsx';

interface MemberDirectoryProps {
  members: GuildMember[];
  onMemberClick?: (member: GuildMember) => void;
  className?: string;
}

const roleStyles = {
  founder: {
    icon: Crown,
    bg: 'bg-gold/20',
    border: 'border-gold',
    text: 'text-gold',
    label: 'Founder',
  },
  elder: {
    icon: Shield,
    bg: 'bg-council-purple/20',
    border: 'border-council-purple',
    text: 'text-council-purple',
    label: 'Elder',
  },
  artisan: {
    icon: Star,
    bg: 'bg-council-blue/20',
    border: 'border-council-blue',
    text: 'text-council-blue',
    label: 'Artisan',
  },
  apprentice: {
    icon: Sparkles,
    bg: 'bg-burnt-umber/10',
    border: 'border-burnt-umber/30',
    text: 'text-burnt-umber',
    label: 'Apprentice',
  },
};

export const MemberDirectory: React.FC<MemberDirectoryProps> = ({
  members,
  onMemberClick,
  className,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | GuildMember['role']>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'reputation' | 'contributions'>('recent');

  // Filter and search
  let filteredMembers = members;

  if (searchQuery) {
    filteredMembers = filteredMembers.filter((m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (roleFilter !== 'all') {
    filteredMembers = filteredMembers.filter((m) => m.role === roleFilter);
  }

  // Sort
  filteredMembers = [...filteredMembers].sort((a, b) => {
    if (sortBy === 'reputation') return b.reputation - a.reputation;
    if (sortBy === 'contributions') return b.contributionCount - a.contributionCount;
    return new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime(); // recent
  });

  // Role counts
  const roleCounts = {
    founder: members.filter((m) => m.role === 'founder').length,
    elder: members.filter((m) => m.role === 'elder').length,
    artisan: members.filter((m) => m.role === 'artisan').length,
    apprentice: members.filter((m) => m.role === 'apprentice').length,
  };

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-display font-bold text-burnt-umber mb-2 flex items-center gap-3">
            <Users className="w-8 h-8 text-council-blue" />
            Member Directory
          </h3>
          <p className="text-burnt-umber/70 text-sm">
            {filteredMembers.length} member{filteredMembers.length !== 1 ? 's' : ''}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        {/* Total Members Badge */}
        <div className="px-6 py-3 bg-council-blue/10 rounded-xl border-2 border-council-blue/30">
          <div className="text-xs text-burnt-umber/60">Total Members</div>
          <div className="text-3xl font-display font-bold text-council-blue">
            {members.length}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-burnt-umber/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search members by name..."
            className="w-full pl-12 pr-4 py-3 bg-parchment-light border-2 border-burnt-umber/20 rounded-xl text-burnt-umber placeholder:text-burnt-umber/40 focus:outline-none focus:border-burnt-umber font-body"
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          {/* Role Filters */}
          <div className="flex gap-2">
            <button
              onClick={() => setRoleFilter('all')}
              className={clsx(
                'px-4 py-2 rounded-lg text-sm font-display font-semibold transition-all',
                roleFilter === 'all'
                  ? 'bg-gold text-burnt-umber border-2 border-burnt-umber'
                  : 'bg-parchment-light text-burnt-umber/70 border-2 border-burnt-umber/20 hover:border-burnt-umber/40'
              )}
            >
              All ({members.length})
            </button>
            {Object.entries(roleStyles).map(([role, style]) => {
              const Icon = style.icon;
              const count = roleCounts[role as keyof typeof roleCounts];
              return (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role as GuildMember['role'])}
                  className={clsx(
                    'px-4 py-2 rounded-lg text-sm font-display font-semibold transition-all flex items-center gap-2',
                    roleFilter === role
                      ? 'bg-gold text-burnt-umber border-2 border-burnt-umber'
                      : 'bg-parchment-light text-burnt-umber/70 border-2 border-burnt-umber/20 hover:border-burnt-umber/40'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {style.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-4 py-2 bg-parchment-light border-2 border-burnt-umber/20 rounded-lg text-sm font-display text-burnt-umber focus:outline-none focus:border-burnt-umber"
          >
            <option value="recent">Recently Joined</option>
            <option value="reputation">By Reputation</option>
            <option value="contributions">By Contributions</option>
          </select>
        </div>
      </div>

      {/* Members Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={roleFilter + sortBy + searchQuery}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredMembers.map((member, index) => (
            <MemberCard
              key={member.userId}
              member={member}
              index={index}
              onClick={() => onMemberClick?.(member)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {filteredMembers.length === 0 && (
        <div className="text-center py-12 bg-parchment-light rounded-xl border-2 border-burnt-umber/20">
          <div className="text-5xl mb-3">🔍</div>
          <p className="text-burnt-umber/70">
            {searchQuery ? 'No members found matching your search' : 'No members to display'}
          </p>
        </div>
      )}
    </div>
  );
};

interface MemberCardProps {
  member: GuildMember;
  index: number;
  onClick: () => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, index, onClick }) => {
  const roleStyle = roleStyles[member.role];
  const RoleIcon = roleStyle.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      onClick={onClick}
      className={clsx(
        'relative p-5 rounded-xl border-2 cursor-pointer bg-parchment-light',
        'transition-all duration-300 hover:shadow-elevated hover:-translate-y-1',
        'border-burnt-umber/20 hover:border-burnt-umber/40'
      )}
    >
      {/* Role Badge - Top Right */}
      <div className="absolute -top-2 -right-2">
        <div className={clsx(
          'w-10 h-10 rounded-full border-2 flex items-center justify-center shadow-seal',
          roleStyle.bg,
          roleStyle.border
        )}>
          <RoleIcon className={clsx('w-5 h-5', roleStyle.text)} />
        </div>
      </div>

      {/* Avatar and Name */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative flex-shrink-0">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-16 h-16 rounded-full border-4 border-burnt-umber"
          />
          {member.isOnline && (
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-vote-approve rounded-full border-2 border-parchment-light" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-display font-bold text-burnt-umber text-lg truncate">
            {member.name}
          </h4>
          <div className={clsx(
            'text-xs font-display font-semibold uppercase inline-block px-2 py-0.5 rounded',
            roleStyle.bg,
            roleStyle.text
          )}>
            {roleStyle.label}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center p-2 bg-parchment rounded-lg">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Award className="w-3 h-3 text-gold" />
          </div>
          <div className="text-sm font-display font-bold text-gold">
            {member.reputation}
          </div>
          <div className="text-xs text-burnt-umber/60">REP</div>
        </div>

        <div className="text-center p-2 bg-parchment rounded-lg">
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingUp className="w-3 h-3 text-council-blue" />
          </div>
          <div className="text-sm font-display font-bold text-council-blue">
            {member.contributionCount}
          </div>
          <div className="text-xs text-burnt-umber/60">Contrib</div>
        </div>

        <div className="text-center p-2 bg-parchment rounded-lg">
          <div className="flex items-center justify-center gap-1 mb-1">
            <MessageSquare className="w-3 h-3 text-council-purple" />
          </div>
          <div className="text-sm font-display font-bold text-council-purple">
            {member.activityScore}
          </div>
          <div className="text-xs text-burnt-umber/60">Activity</div>
        </div>
      </div>

      {/* Specialties */}
      {member.specialties && member.specialties.length > 0 && (
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {member.specialties.slice(0, 2).map((specialty) => (
              <span
                key={specialty}
                className="px-2 py-1 bg-burnt-umber/10 rounded text-xs text-burnt-umber/70"
              >
                {specialty}
              </span>
            ))}
            {member.specialties.length > 2 && (
              <span className="px-2 py-1 bg-burnt-umber/10 rounded text-xs text-burnt-umber/70">
                +{member.specialties.length - 2}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="pt-3 border-t border-burnt-umber/10">
        <div className="flex items-center justify-between text-xs text-burnt-umber/60">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>
              Joined {formatDistanceToNow(new Date(member.joinedAt), { addSuffix: true })}
            </span>
          </div>
          {member.isOnline && (
            <span className="text-vote-approve font-display font-semibold">● Online</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
