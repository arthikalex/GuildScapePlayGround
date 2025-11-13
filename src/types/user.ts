export type UserTier = 'Novice' | 'Maker' | 'Artisan' | 'Master' | 'Elder';

export type BadgeRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export type BadgeType =
  | 'foundational'
  | 'excellence'
  | 'innovation'
  | 'leadership'
  | 'community'
  | 'mentorship'
  | 'achievement';

export interface Badge {
  id: string;
  name: string;
  description: string;
  type: BadgeType;
  rarity: BadgeRarity;
  earnedDate: Date;
  permanent: boolean;
  image: string;
  criteria?: string;
}

export interface ReputationDimensions {
  artworkQuality: number;
  communityEngagement: number;
  peerReview: number;
  exhibitionParticipation: number;
  mentorshipActivities: number;
  platformDevelopment: number;
}

export interface DevotionChain {
  currentStreak: number;
  longestStreak: number;
  lastCheckIn: Date;
  shields: number;
  nextMilestone: number;
  milestones: {
    days: number;
    achieved: boolean;
    reward?: string;
  }[];
}

export interface User {
  id: string;
  name: string;
  tier: UserTier;
  title: string;
  avatar: string;
  joinDate: Date;
  reputation: {
    total: number;
    dimensions: ReputationDimensions;
  };
  badges: Badge[];
  gldBalance: number;
  devotionChain: DevotionChain;
  guilds: string[];
  votingPower: number;
  bio?: string;
  location?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    portfolio?: string;
  };
}

export interface DailyScroll {
  id: string;
  title: string;
  description: string;
  type: 'artwork' | 'review' | 'vote' | 'social' | 'learning';
  reward: {
    rep?: number;
    gld?: number;
    badge?: string;
  };
  completed: boolean;
  progress?: {
    current: number;
    total: number;
  };
}

export interface ActivityFeedItem {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  type: 'artwork' | 'vote' | 'badge' | 'guild' | 'review' | 'milestone';
  action: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}
