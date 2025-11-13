export type GuildRole = 'member' | 'contributor' | 'coordinator' | 'founder';

export interface GuildMember {
  userId: string;
  name: string;
  avatar: string;
  tier: string;
  role: GuildRole;
  specialty: string;
  joinedDate: Date;
  contributions: number;
}

export interface GuildProject {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'archived';
  contributors: {
    userId: string;
    name: string;
    avatar: string;
    role: string;
  }[];
  progress: number; // 0-100
  startDate: Date;
  deadline?: Date;
  deliverables: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

export interface NoticeBoardPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  type: 'announcement' | 'discussion' | 'event' | 'opportunity';
  title: string;
  content: string;
  timestamp: Date;
  pinned: boolean;
  tags?: string[];
  reactions?: {
    emoji: string;
    count: number;
    users: string[];
  }[];
  comments?: {
    id: string;
    authorId: string;
    authorName: string;
    content: string;
    timestamp: Date;
  }[];
}

export interface GuildTreasury {
  gldBalance: number;
  resources: {
    type: string;
    amount: number;
    value: number;
  }[];
  recentTransactions: {
    id: string;
    type: 'income' | 'expense';
    amount: number;
    description: string;
    timestamp: Date;
  }[];
  allocations: {
    category: string;
    allocated: number;
    spent: number;
  }[];
}

export interface Guild {
  id: string;
  name: string;
  tagline: string;
  crest: string;
  banner?: string;
  memberCount: number;
  activeProjects: number;
  tags: string[];
  treasury: GuildTreasury;
  founded: Date;
  description: string;
  members: GuildMember[];
  projects: GuildProject[];
  noticeBoard: NoticeBoardPost[];
  isPublic: boolean;
  requirements?: {
    minTier?: string;
    minReputation?: number;
    requiredBadges?: string[];
  };
}
