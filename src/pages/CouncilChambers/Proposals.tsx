import React, { useState, useEffect } from 'react';
import { PageContainer } from '@components/layout/PageContainer';
import { ProposalCard } from '@components/council/ProposalCard';
import { ProposalModal } from '@components/council/ProposalModal';
import { Button } from '@components/common/Button';
import { Input } from '@components/common/Input';
import { useNavigationStore } from '@store/navigationStore';
import { useProposalStore } from '@store/proposalStore';
import { useUserStore } from '@store/userStore';
import { mockProposals } from '@utils/mockData';
import { Search, Plus } from 'lucide-react';
import type { Proposal, VoteChoice } from '@/types/proposal';
import toast from 'react-hot-toast';

type ProposalFilter = 'all' | 'active' | 'passed' | 'rejected';
type ProposalSort = 'recent' | 'popular' | 'ending-soon';

export const Proposals: React.FC = () => {
  const { setBreadcrumbs } = useNavigationStore();
  const { proposals, setProposals, castVote, addVoteToHistory } = useProposalStore();
  const { currentUser } = useUserStore();

  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<ProposalFilter>('all');
  const [sort, setSort] = useState<ProposalSort>('recent');

  useEffect(() => {
    setBreadcrumbs([{ label: 'Council Chambers', path: '/council' }]);

    // Initialize proposals if empty
    if (proposals.length === 0) {
      setProposals(mockProposals);
    }
  }, [setBreadcrumbs, proposals.length, setProposals]);

  // Filter and sort proposals
  const filteredProposals = proposals
    .filter((p) => {
      // Filter by status
      if (filter !== 'all' && p.status !== filter) return false;

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          p.title.toLowerCase().includes(query) ||
          p.summary.toLowerCase().includes(query) ||
          p.tags?.some((tag) => tag.toLowerCase().includes(query))
        );
      }

      return true;
    })
    .sort((a, b) => {
      switch (sort) {
        case 'popular':
          return b.voting.totalVotes - a.voting.totalVotes;
        case 'ending-soon':
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        case 'recent':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const handleVote = async (proposalId: string, choice: VoteChoice) => {
    if (!currentUser) {
      toast.error('Please log in to vote');
      return;
    }

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Record vote in store
    castVote(proposalId, choice, currentUser.votingPower);

    // Add to vote history
    const proposal = proposals.find((p) => p.id === proposalId);
    if (proposal) {
      addVoteToHistory({
        proposalId,
        proposalTitle: proposal.title,
        vote: choice,
        timestamp: new Date(),
        votingPowerUsed: currentUser.votingPower,
      });
    }

    // Close modal and show success
    setSelectedProposal(null);
    toast.success('Vote recorded successfully!', {
      icon: '🏛️',
      duration: 3000,
    });
  };

  const activeProposals = proposals.filter((p) => p.status === 'active').length;
  const yourVotes = proposals.filter((p) => p.userVote).length;

  return (
    <PageContainer
      title="Council Chambers"
      subtitle="Participate in governance through the ancient rite of wax seal voting"
      action={
        <Button variant="primary" icon={<Plus />}>
          Submit Proposal
        </Button>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-gradient-to-br from-council-blue/10 to-council-blue/5 rounded-xl border-2 border-council-blue/30">
          <div className="text-4xl font-display font-bold text-council-blue mb-2">
            {activeProposals}
          </div>
          <div className="text-burnt-umber/70 font-display">Active Proposals</div>
        </div>

        <div className="p-6 bg-gradient-to-br from-vote-approve/10 to-vote-approve/5 rounded-xl border-2 border-vote-approve/30">
          <div className="text-4xl font-display font-bold text-vote-approve mb-2">
            {yourVotes}
          </div>
          <div className="text-burnt-umber/70 font-display">Your Votes Cast</div>
        </div>

        <div className="p-6 bg-gradient-to-br from-gold/10 to-gold/5 rounded-xl border-2 border-gold/30">
          <div className="text-4xl font-display font-bold text-gold mb-2">
            {currentUser?.votingPower || 0}
          </div>
          <div className="text-burnt-umber/70 font-display">Your Voting Power</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="flex-1">
          <Input
            placeholder="Search proposals by title, content, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="w-5 h-5" />}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as ProposalFilter)}
            className="input-medieval cursor-pointer"
          >
            <option value="all">All Proposals</option>
            <option value="active">Active</option>
            <option value="passed">Passed</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as ProposalSort)}
            className="input-medieval cursor-pointer"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="ending-soon">Ending Soon</option>
          </select>
        </div>
      </div>

      {/* Proposals List */}
      {filteredProposals.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🏛️</div>
          <h3 className="text-2xl font-display font-bold text-burnt-umber mb-2">
            No Proposals Found
          </h3>
          <p className="text-burnt-umber/70">
            {searchQuery
              ? 'Try adjusting your search or filters'
              : 'Check back later for new proposals'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredProposals.map((proposal, index) => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              onClick={() => setSelectedProposal(proposal)}
              index={index}
            />
          ))}
        </div>
      )}

      {/* Proposal Detail Modal */}
      {selectedProposal && (
        <ProposalModal
          proposal={selectedProposal}
          isOpen={!!selectedProposal}
          onClose={() => setSelectedProposal(null)}
          onVote={handleVote}
        />
      )}
    </PageContainer>
  );
};
