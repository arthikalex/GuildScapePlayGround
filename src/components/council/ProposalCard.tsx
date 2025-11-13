import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, MessageSquare, Clock, TrendingUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { Proposal } from '@/types/proposal';
import clsx from 'clsx';

interface ProposalCardProps {
  proposal: Proposal;
  onClick: () => void;
  index?: number;
}

const proposalTypeColors = {
  minor: {
    badge: 'bg-council-blue/20 text-council-blue border-council-blue',
    accent: 'text-council-blue',
  },
  standard: {
    badge: 'bg-council-purple/20 text-council-purple border-council-purple',
    accent: 'text-council-purple',
  },
  major: {
    badge: 'bg-council-gold/20 text-council-gold border-council-gold',
    accent: 'text-council-gold',
  },
  constitutional: {
    badge: 'bg-council-red/20 text-council-red border-council-red',
    accent: 'text-council-red',
  },
};

const statusColors = {
  active: 'bg-vote-pending text-parchment',
  passed: 'bg-vote-approve text-parchment',
  rejected: 'bg-vote-reject text-parchment',
  'failed-quorum': 'bg-vote-abstain text-parchment',
  pending: 'bg-vote-pending text-parchment',
};

export const ProposalCard: React.FC<ProposalCardProps> = ({ proposal, onClick, index = 0 }) => {
  const typeColor = proposalTypeColors[proposal.type];
  const isActive = proposal.status === 'active';
  const timeRemaining = isActive
    ? formatDistanceToNow(new Date(proposal.deadline), { addSuffix: true })
    : null;

  // Calculate if quorum is met
  const quorumMet = proposal.voting.quorumCurrent >= proposal.voting.quorumRequired;

  // Calculate leading vote
  const leadingVote =
    proposal.voting.approve > proposal.voting.reject
      ? 'approve'
      : proposal.voting.reject > proposal.voting.approve
      ? 'reject'
      : 'tied';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className={clsx(
        'relative bg-gradient-to-br from-parchment-light to-parchment',
        'border-4 border-burnt-umber rounded-2xl p-6',
        'shadow-elevated hover:shadow-chamber hover:-translate-y-1',
        'transition-all duration-300 cursor-pointer group'
      )}
    >
      {/* Decorative corner ornaments */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gold rounded-tl-lg opacity-50" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gold rounded-tr-lg opacity-50" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gold rounded-bl-lg opacity-50" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gold rounded-br-lg opacity-50" />

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          {/* Proposal Number & Type */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl font-decorative font-bold text-gold">
              #{proposal.number}
            </span>
            <span
              className={clsx(
                'px-3 py-1 rounded-lg border-2 text-xs font-display font-bold uppercase tracking-wider',
                typeColor.badge
              )}
            >
              {proposal.type}
            </span>
            <span className={clsx('px-3 py-1 rounded-lg text-xs font-display font-bold', statusColors[proposal.status])}>
              {proposal.status.toUpperCase()}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-display font-bold text-burnt-umber mb-2 group-hover:text-gold transition-colors">
            {proposal.title}
          </h3>

          {/* Tags */}
          {proposal.tags && proposal.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {proposal.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-burnt-umber/10 rounded text-xs text-burnt-umber/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* User Vote Indicator */}
        {proposal.userVote && (
          <motion.div
            className={clsx(
              'w-12 h-12 rounded-full flex items-center justify-center border-4',
              proposal.userVote === 'approve' &&
                'bg-vote-approve border-vote-approve text-parchment',
              proposal.userVote === 'reject' && 'bg-vote-reject border-vote-reject text-parchment',
              proposal.userVote === 'abstain' &&
                'bg-vote-abstain border-vote-abstain text-parchment'
            )}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-xs font-bold">YOU</span>
          </motion.div>
        )}
      </div>

      {/* Summary */}
      <p className="text-burnt-umber/80 font-body leading-relaxed mb-4 line-clamp-2">
        {proposal.summary}
      </p>

      {/* Voting Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs font-display font-semibold mb-2">
          <span className="text-vote-approve">Approve {proposal.voting.approve}%</span>
          <span className="text-vote-reject">Reject {proposal.voting.reject}%</span>
          <span className="text-vote-abstain">Abstain {proposal.voting.abstain}%</span>
        </div>
        <div className="h-3 bg-parchment-dark rounded-full overflow-hidden flex">
          <motion.div
            className="bg-vote-approve"
            initial={{ width: 0 }}
            animate={{ width: `${proposal.voting.approve}%` }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          <motion.div
            className="bg-vote-reject"
            initial={{ width: 0 }}
            animate={{ width: `${proposal.voting.reject}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.div
            className="bg-vote-abstain"
            initial={{ width: 0 }}
            animate={{ width: `${proposal.voting.abstain}%` }}
            transition={{ duration: 1, delay: 0.7 }}
          />
        </div>
      </div>

      {/* Quorum Indicator */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-burnt-umber/70 font-display">Quorum Progress</span>
          <span
            className={clsx(
              'font-display font-bold',
              quorumMet ? 'text-vote-approve' : 'text-vote-pending'
            )}
          >
            {proposal.voting.quorumCurrent}% / {proposal.voting.quorumRequired}%
            {quorumMet && ' ✓'}
          </span>
        </div>
        <div className="h-2 bg-parchment-dark rounded-full overflow-hidden">
          <motion.div
            className={clsx(
              'h-full',
              quorumMet ? 'bg-vote-approve' : 'bg-vote-pending'
            )}
            initial={{ width: 0 }}
            animate={{
              width: `${Math.min((proposal.voting.quorumCurrent / proposal.voting.quorumRequired) * 100, 100)}%`,
            }}
            transition={{ duration: 1.2, delay: 0.9 }}
          />
        </div>
      </div>

      {/* Footer Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t-2 border-burnt-umber/20">
        {/* Sponsor */}
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-burnt-umber/60" />
          <div className="text-xs">
            <div className="text-burnt-umber/60">Sponsor</div>
            <div className="font-display font-semibold text-burnt-umber">
              {proposal.sponsor.name}
            </div>
          </div>
        </div>

        {/* Total Votes */}
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-burnt-umber/60" />
          <div className="text-xs">
            <div className="text-burnt-umber/60">Votes</div>
            <div className="font-display font-semibold text-burnt-umber">
              {proposal.voting.totalVotes.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-burnt-umber/60" />
          <div className="text-xs">
            <div className="text-burnt-umber/60">Discussion</div>
            <div className="font-display font-semibold text-burnt-umber">
              {proposal.discussion.length} comments
            </div>
          </div>
        </div>

        {/* Deadline */}
        {isActive && timeRemaining && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-burnt-umber/60" />
            <div className="text-xs">
              <div className="text-burnt-umber/60">Ends</div>
              <div className="font-display font-semibold text-burnt-umber">
                {timeRemaining}
              </div>
            </div>
          </div>
        )}

        {!isActive && (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-burnt-umber/60" />
            <div className="text-xs">
              <div className="text-burnt-umber/60">Result</div>
              <div
                className={clsx(
                  'font-display font-semibold',
                  leadingVote === 'approve' && 'text-vote-approve',
                  leadingVote === 'reject' && 'text-vote-reject',
                  leadingVote === 'tied' && 'text-vote-abstain'
                )}
              >
                {proposal.status === 'passed' && 'Passed'}
                {proposal.status === 'rejected' && 'Rejected'}
                {proposal.status === 'failed-quorum' && 'No Quorum'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Leading Vote Indicator */}
      {isActive && leadingVote !== 'tied' && (
        <motion.div
          className={clsx(
            'absolute -right-3 top-1/2 -translate-y-1/2',
            'w-16 h-16 rounded-full border-4 flex items-center justify-center',
            'font-display font-bold text-xs text-center leading-tight',
            leadingVote === 'approve' &&
              'bg-vote-approve border-vote-approve text-parchment',
            leadingVote === 'reject' && 'bg-vote-reject border-vote-reject text-parchment'
          )}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span>
            {leadingVote === 'approve' ? 'LEADING' : 'LEADING'}
            <br />
            {leadingVote.toUpperCase()}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};
