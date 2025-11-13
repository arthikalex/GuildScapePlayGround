export type QuestRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export type QuestStatus = 'available' | 'active' | 'completed' | 'expired';

export interface QuestStep {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  progress?: number;
  total?: number;
  reward?: QuestReward;
}

export interface QuestReward {
  type: 'badge' | 'gld' | 'avatar-item' | 'reputation' | 'unlock';
  name?: string;
  amount?: number;
  image?: string;
  description?: string;
}

export interface Quest {
  id: string;
  title: string;
  rarity: QuestRarity;
  description: string;
  longDescription?: string;
  steps: QuestStep[];
  progress: number; // 0-100
  rewards: QuestReward[];
  status: QuestStatus;
  expiryDate?: Date;
  category: 'skill' | 'social' | 'achievement' | 'event' | 'seasonal';
  prerequisites?: string[];
}

export interface SkillNode {
  id: string;
  name: string;
  description: string;
  category: string;
  tier: number;
  locked: boolean;
  progress: number; // 0-100 for in-progress skills
  completed: boolean;
  prerequisites: string[];
  rewards: QuestReward[];
  requirements: {
    artworks?: number;
    quality?: string;
    peerReviews?: number;
  };
}

export interface MasteryTree {
  medium: string;
  totalNodes: number;
  completedNodes: number;
  level: number;
  nodes: SkillNode[];
}

export interface Milestone {
  id: string;
  type: 'devotion' | 'reputation' | 'artwork' | 'community';
  title: string;
  description: string;
  achieved: boolean;
  achievedDate?: Date;
  threshold: number;
  current: number;
  reward?: QuestReward;
  icon: string;
}

export interface AvatarCustomization {
  skin: string;
  hair: string;
  hairColor: string;
  outfit: string;
  outfitColor: string;
  accessory?: string;
  background: string;
  badge?: string;
  unlockedItems: {
    category: string;
    itemId: string;
    name: string;
    rarity: string;
    unlockDate: Date;
  }[];
}
