export type GuildRole = 'founder' | 'elder' | 'artisan' | 'apprentice';

export interface GuildMember {
  userId: string;
  name: string;
  avatar: string;
  tier?: string;
  role: GuildRole;
  specialties?: string[];
  joinedAt: Date;
  contributionCount: number;
  reputation: number;
  activityScore: number;
  isOnline?: boolean;
}

export interface GuildProject {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'active' | 'review' | 'completed';
  contributors: {
    userId: string;
    name: string;
    avatar: string;
    role: string;
  }[];
  progress: number; // 0-100
  startDate: Date;
  deadline: Date;
  deliverables: {
    id: string;
    title: string;
    completed: boolean;
  }[];
  rewards: {
    reputation: number;
    gld?: number;
    badges?: string[];
  };
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
  balance: number;
  income: {
    source: string;
    amount: number;
  }[];
  expenses: {
    category: string;
    amount: number;
  }[];
  transactions: {
    id: string;
    type: 'income' | 'expense';
    amount: number;
    description: string;
    date: Date;
    fromTo?: string;
  }[];
}

export interface Guild {
  id: string;
  name: string;
  tagline: string;
  crest: string;
  banner: string;
  description: string;
  tags: string[];
  members: GuildMember[];
  projects: GuildProject[];
  noticeBoard: NoticeBoardPost[];
  treasury: GuildTreasury;
  foundedDate: Date;
  requirements?: {
    minTier?: string;
    minReputation?: number;
    requiredBadges?: string[];
  };
}
