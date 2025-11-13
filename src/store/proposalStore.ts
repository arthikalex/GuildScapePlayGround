import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Proposal, VoteChoice, VoteHistory } from '@/types/proposal';

interface ProposalState {
  proposals: Proposal[];
  voteHistory: VoteHistory[];

  // Actions
  setProposals: (proposals: Proposal[]) => void;
  addProposal: (proposal: Proposal) => void;
  updateProposal: (proposalId: string, updates: Partial<Proposal>) => void;
  castVote: (proposalId: string, choice: VoteChoice, votingPower: number) => void;
  addVoteToHistory: (vote: VoteHistory) => void;
  getProposalById: (proposalId: string) => Proposal | undefined;
}

export const useProposalStore = create<ProposalState>()(
  persist(
    (set, get) => ({
      proposals: [],
      voteHistory: [],

      setProposals: (proposals) => set({ proposals }),

      addProposal: (proposal) =>
        set((state) => ({
          proposals: [proposal, ...state.proposals],
        })),

      updateProposal: (proposalId, updates) =>
        set((state) => ({
          proposals: state.proposals.map((p) =>
            p.id === proposalId ? { ...p, ...updates } : p
          ),
        })),

      castVote: (proposalId, choice, votingPower) =>
        set((state) => {
          const proposal = state.proposals.find((p) => p.id === proposalId);
          if (!proposal || proposal.userVote) return state;

          // Calculate new voting percentages
          const totalVotes = proposal.voting.totalVotes + 1;
          const totalPower = proposal.voting.weightedPower + votingPower;

          // Update vote counts (simplified calculation)
          const voteIncrement = (1 / totalVotes) * 100;
          const newVoting = {
            ...proposal.voting,
            totalVotes,
            weightedPower: totalPower,
            approve:
              choice === 'approve'
                ? proposal.voting.approve + voteIncrement
                : proposal.voting.approve * (proposal.voting.totalVotes / totalVotes),
            reject:
              choice === 'reject'
                ? proposal.voting.reject + voteIncrement
                : proposal.voting.reject * (proposal.voting.totalVotes / totalVotes),
            abstain:
              choice === 'abstain'
                ? proposal.voting.abstain + voteIncrement
                : proposal.voting.abstain * (proposal.voting.totalVotes / totalVotes),
            quorumCurrent: ((totalVotes / 5000) * 100), // Simplified quorum calculation
          };

          return {
            proposals: state.proposals.map((p) =>
              p.id === proposalId
                ? {
                    ...p,
                    userVote: choice,
                    voting: newVoting,
                  }
                : p
            ),
          };
        }),

      addVoteToHistory: (vote) =>
        set((state) => ({
          voteHistory: [vote, ...state.voteHistory],
        })),

      getProposalById: (proposalId) => {
        return get().proposals.find((p) => p.id === proposalId);
      },
    }),
    {
      name: 'guildscape-proposal-storage',
      partialize: (state) => ({
        proposals: state.proposals,
        voteHistory: state.voteHistory,
      }),
    }
  )
);
