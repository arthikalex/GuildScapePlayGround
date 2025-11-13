export type ProposalType = 'minor' | 'standard' | 'major' | 'constitutional';

export type ProposalStatus = 'active' | 'passed' | 'rejected' | 'failed-quorum' | 'pending';

export type VoteChoice = 'approve' | 'reject' | 'abstain';

export interface ProposalVoting {
  approve: number; // percentage
  reject: number;
  abstain: number;
  totalVotes: number;
  weightedPower: number;
  quorumRequired: number;
  quorumCurrent: number;
}

export interface Comment {
  id: string;
  author: string;
  authorAvatar: string;
  authorTier: string;
  content: string;
  timestamp: Date;
  replies?: Comment[];
  upvotes?: number;
}

export interface ProposalSponsor {
  name: string;
  avatar: string;
  tier: string;
  userId: string;
}

export interface Proposal {
  id: string;
  number: number;
  title: string;
  summary: string;
  fullContent: string;
  type: ProposalType;
  status: ProposalStatus;
  voting: ProposalVoting;
  deadline: Date;
  sponsor: ProposalSponsor;
  discussion: Comment[];
  userVote?: VoteChoice;
  tags?: string[];
  impactAreas?: string[];
  createdAt: Date;
}

export interface VoteHistory {
  proposalId: string;
  proposalTitle: string;
  vote: VoteChoice;
  timestamp: Date;
  votingPowerUsed: number;
}

export interface DelegationTarget {
  userId: string;
  name: string;
  avatar: string;
  tier: string;
  expertise: string[];
  delegatedPower: number;
}
