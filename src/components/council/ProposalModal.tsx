import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, User, Tag, Target } from 'lucide-react';
import { format } from 'date-fns';
import type { Proposal, VoteChoice } from '@/types/proposal';
import { WaxSealVoting } from './WaxSealVoting';
import { QuorumMeter } from './QuorumMeter';
import { Button } from '@components/common/Button';
import clsx from 'clsx';

interface ProposalModalProps {
  proposal: Proposal;
  isOpen: boolean;
  onClose: () => void;
  onVote: (proposalId: string, choice: VoteChoice) => Promise<void>;
}

export const ProposalModal: React.FC<ProposalModalProps> = ({
  proposal,
  isOpen,
  onClose,
  onVote,
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'discussion' | 'voting'>('details');

  if (!isOpen) return null;

  const handleVote = async (choice: VoteChoice) => {
    await onVote(proposal.id, choice);
  };

  const proposalTypeColors = {
    minor: 'text-council-blue',
    standard: 'text-council-purple',
    major: 'text-council-gold',
    constitutional: 'text-council-red',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-chamber-dark/90 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-6xl bg-gradient-to-br from-parchment-light to-parchment border-4 border-burnt-umber rounded-2xl shadow-chamber max-h-[90vh] overflow-hidden"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Header Background */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gold/10 to-transparent opacity-50" />

        {/* Header */}
        <div className="relative px-8 py-6 border-b-4 border-burnt-umber/20">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-burnt-umber/10 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-burnt-umber" />
          </button>

          <div className="flex items-start gap-4 pr-12">
            {/* Proposal Number - Large decorative */}
            <div className="flex-shrink-0">
              <span className="text-6xl font-decorative font-bold text-gold drop-shadow-lg">
                #{proposal.number}
              </span>
            </div>

            <div className="flex-1">
              {/* Type & Status Badges */}
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={clsx(
                    'px-4 py-2 rounded-lg border-2 text-sm font-display font-bold uppercase tracking-wider bg-burnt-umber/5',
                    `border-burnt-umber ${proposalTypeColors[proposal.type]}`
                  )}
                >
                  {proposal.type} Proposal
                </span>
                {proposal.status === 'active' && (
                  <span className="px-4 py-2 rounded-lg bg-vote-pending text-parchment text-sm font-display font-bold">
                    ACTIVE
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-display font-bold text-burnt-umber mb-3">
                {proposal.title}
              </h2>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-6 text-sm text-burnt-umber/70">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>
                    Sponsored by <strong>{proposal.sponsor.name}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {proposal.status === 'active'
                      ? `Deadline: ${format(new Date(proposal.deadline), 'MMM d, yyyy')}`
                      : `Created: ${format(new Date(proposal.createdAt), 'MMM d, yyyy')}`}
                  </span>
                </div>
              </div>

              {/* Tags */}
              {proposal.tags && proposal.tags.length > 0 && (
                <div className="flex items-center gap-2 mt-3">
                  <Tag className="w-4 h-4 text-burnt-umber/50" />
                  <div className="flex flex-wrap gap-2">
                    {proposal.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-burnt-umber/10 rounded-full text-xs text-burnt-umber"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b-2 border-burnt-umber/20 bg-parchment-dark/30">
          {[
            { id: 'details', label: 'Proposal Details' },
            { id: 'voting', label: 'Cast Your Vote' },
            { id: 'discussion', label: `Discussion (${proposal.discussion.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={clsx(
                'px-6 py-4 font-display font-semibold transition-all relative',
                activeTab === tab.id
                  ? 'text-burnt-umber bg-parchment'
                  : 'text-burnt-umber/60 hover:text-burnt-umber hover:bg-parchment-dark/50'
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gold"
                  layoutId="activeTab"
                />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-300px)] scrollbar-medieval">
          {/* Details Tab */}
          {activeTab === 'details' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Summary */}
              <div className="mb-8">
                <h3 className="text-xl font-display font-bold text-burnt-umber mb-3 flex items-center gap-2">
                  <span className="initial-capital">S</span>
                  <span>ummary</span>
                </h3>
                <p className="text-lg text-burnt-umber/80 font-body leading-relaxed italic">
                  {proposal.summary}
                </p>
              </div>

              {/* Full Content - Rendered as Markdown-style */}
              <div className="mb-8 prose prose-medieval max-w-none">
                <div
                  className="text-burnt-umber font-body leading-relaxed whitespace-pre-wrap"
                  style={{
                    wordBreak: 'break-word',
                  }}
                >
                  {proposal.fullContent.split('\n').map((line, idx) => {
                    // Handle markdown-style headings
                    if (line.startsWith('###')) {
                      return (
                        <h4 key={idx} className="text-lg font-display font-bold mt-6 mb-3">
                          {line.replace(/^###\s*/, '')}
                        </h4>
                      );
                    }
                    if (line.startsWith('##')) {
                      return (
                        <h3 key={idx} className="text-xl font-display font-bold mt-8 mb-4">
                          {line.replace(/^##\s*/, '')}
                        </h3>
                      );
                    }
                    // Handle bullet points
                    if (line.trim().startsWith('-')) {
                      return (
                        <li key={idx} className="ml-6 mb-2">
                          {line.replace(/^-\s*/, '')}
                        </li>
                      );
                    }
                    // Handle bold text
                    if (line.includes('**')) {
                      const parts = line.split('**');
                      return (
                        <p key={idx} className="mb-3">
                          {parts.map((part, i) =>
                            i % 2 === 1 ? (
                              <strong key={i} className="font-bold">
                                {part}
                              </strong>
                            ) : (
                              part
                            )
                          )}
                        </p>
                      );
                    }
                    // Regular paragraph
                    return line.trim() ? (
                      <p key={idx} className="mb-3">
                        {line}
                      </p>
                    ) : (
                      <br key={idx} />
                    );
                  })}
                </div>
              </div>

              {/* Impact Areas */}
              {proposal.impactAreas && proposal.impactAreas.length > 0 && (
                <div className="p-6 bg-council-gold/10 rounded-xl border-2 border-council-gold/30">
                  <h4 className="text-lg font-display font-bold text-burnt-umber mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-council-gold" />
                    Impact Areas
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {proposal.impactAreas.map((area) => (
                      <span
                        key={area}
                        className="px-4 py-2 bg-council-gold/20 rounded-lg border-2 border-council-gold text-burnt-umber font-display font-semibold"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Voting Tab */}
          {activeTab === 'voting' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid md:grid-cols-2 gap-8">
                {/* Voting Interface */}
                <div>
                  <h3 className="text-2xl font-display font-bold text-burnt-umber mb-6">
                    Cast Your Vote
                  </h3>

                  {proposal.status === 'active' ? (
                    <>
                      <p className="text-burnt-umber/70 font-body mb-8">
                        Press your seal to record your vote on this proposal. Your decision will be
                        permanently inscribed in the blockchain ledger.
                      </p>
                      <WaxSealVoting
                        onVote={handleVote}
                        userVote={proposal.userVote}
                        disabled={!!proposal.userVote}
                        proposalId={proposal.id}
                      />
                    </>
                  ) : (
                    <div className="p-6 bg-vote-abstain/10 rounded-xl border-2 border-vote-abstain/30 text-center">
                      <p className="text-burnt-umber font-display font-semibold">
                        Voting has ended for this proposal
                      </p>
                      <p className="text-sm text-burnt-umber/70 mt-2">
                        Final result: <strong>{proposal.status}</strong>
                      </p>
                    </div>
                  )}
                </div>

                {/* Quorum Meter */}
                <div>
                  <QuorumMeter
                    currentQuorum={proposal.voting.quorumCurrent}
                    requiredQuorum={proposal.voting.quorumRequired}
                    totalVotes={proposal.voting.totalVotes}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Discussion Tab */}
          {activeTab === 'discussion' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-display font-bold text-burnt-umber mb-6">
                Community Discussion
              </h3>

              {proposal.discussion.length === 0 ? (
                <div className="text-center py-12 text-burnt-umber/60">
                  <p className="font-body text-lg">No comments yet. Be the first to share your thoughts!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {proposal.discussion.map((comment) => (
                    <div
                      key={comment.id}
                      className="p-6 bg-parchment-light rounded-xl border-2 border-burnt-umber/20"
                    >
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <img
                          src={comment.authorAvatar}
                          alt={comment.author}
                          className="w-12 h-12 rounded-full border-2 border-burnt-umber"
                        />

                        <div className="flex-1">
                          {/* Author & Tier */}
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-display font-bold text-burnt-umber">
                              {comment.author}
                            </span>
                            <span className="px-2 py-1 bg-gold/20 rounded text-xs text-gold font-display font-semibold">
                              {comment.authorTier}
                            </span>
                            <span className="text-xs text-burnt-umber/50">
                              {format(new Date(comment.timestamp), 'MMM d, h:mm a')}
                            </span>
                          </div>

                          {/* Comment Content */}
                          <p className="text-burnt-umber font-body leading-relaxed">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t-2 border-burnt-umber/20 bg-parchment-dark/30 flex items-center justify-between">
          <div className="text-sm text-burnt-umber/70">
            <span className="font-display font-semibold">{proposal.voting.totalVotes.toLocaleString()}</span> votes cast •{' '}
            <span className="font-display font-semibold">{proposal.voting.weightedPower.toLocaleString()}</span> voting
            power
          </div>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
