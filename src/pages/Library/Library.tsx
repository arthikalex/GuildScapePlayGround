import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Trophy, TrendingUp, Target } from 'lucide-react';
import clsx from 'clsx';
import { QuestList } from '@components/library/QuestList';
import { QuestDetailModal } from '@components/library/QuestDetailModal';
import { MilestoneTracker } from '@components/library/MilestoneTracker';
import { MasteryTree } from '@components/library/MasteryTree';
import type { Quest, Milestone, MasteryTree as MasteryTreeType, SkillNode } from '@/types/gamification';

type Tab = 'quests' | 'milestones' | 'mastery';

// Mock Data
const mockQuests: Quest[] = [
  {
    id: '1',
    title: 'First Steps',
    rarity: 'common',
    description: 'Begin your journey as an artist in GuildScape',
    longDescription: 'Every great journey begins with a single step. Complete these basic tasks to familiarize yourself with the platform.',
    steps: [
      { id: '1-1', title: 'Complete your profile', completed: true },
      { id: '1-2', title: 'Upload your first artwork', completed: true },
      { id: '1-3', title: 'Join a chapter house', completed: false },
    ],
    progress: 66,
    rewards: [
      { type: 'gld', amount: 50 },
      { type: 'reputation', amount: 10 },
    ],
    status: 'active',
    category: 'skill',
  },
  {
    id: '2',
    title: 'Master Reviewer',
    rarity: 'rare',
    description: 'Provide thoughtful peer reviews to help fellow artisans',
    longDescription: 'Your insights can help others grow. Review artworks with care and detail to earn the respect of your peers.',
    steps: [
      { id: '2-1', title: 'Complete 5 peer reviews', completed: true, progress: 5, total: 5 },
      { id: '2-2', title: 'Write detailed feedback (50+ words)', completed: true, progress: 5, total: 5 },
      { id: '2-3', title: 'Receive 3 helpful votes', completed: false, progress: 1, total: 3 },
    ],
    progress: 85,
    rewards: [
      { type: 'badge', name: 'Master Reviewer Badge', description: 'Shows your dedication to peer review' },
      { type: 'reputation', amount: 50 },
    ],
    status: 'active',
    category: 'social',
  },
  {
    id: '3',
    title: 'Digital Pioneer',
    rarity: 'epic',
    description: 'Master the art of digital creation',
    steps: [
      { id: '3-1', title: 'Upload 10 digital artworks', completed: false, progress: 3, total: 10 },
      { id: '3-2', title: 'Achieve Excellence quality', completed: false },
      { id: '3-3', title: 'Win 3 chapter votes', completed: false, progress: 0, total: 3 },
    ],
    progress: 15,
    rewards: [
      { type: 'badge', name: 'Digital Pioneer' },
      { type: 'gld', amount: 500 },
      { type: 'unlock', name: 'Digital Master Badge Frame' },
    ],
    status: 'available',
    category: 'achievement',
  },
  {
    id: '4',
    title: 'Community Builder',
    rarity: 'legendary',
    description: 'Forge lasting connections and build a thriving community',
    longDescription: 'True mastery extends beyond individual skill. Build bridges, foster collaboration, and help create a vibrant artistic community.',
    steps: [
      { id: '4-1', title: 'Recruit 5 members to your chapter', completed: false, progress: 0, total: 5 },
      { id: '4-2', title: 'Host a community event', completed: false },
      { id: '4-3', title: 'Earn 100 reputation points', completed: false, progress: 45, total: 100 },
      { id: '4-4', title: 'Mentor 3 new artisans', completed: false, progress: 0, total: 3 },
    ],
    progress: 11,
    rewards: [
      { type: 'badge', name: 'Community Pillar', description: 'Reserved for true community leaders' },
      { type: 'gld', amount: 1000 },
      { type: 'reputation', amount: 200 },
      { type: 'unlock', name: 'Golden Guild Hall Background' },
    ],
    status: 'available',
    category: 'social',
    expiryDate: new Date('2025-12-31'),
  },
];

const mockMilestones: Milestone[] = [
  {
    id: 'm1',
    type: 'devotion',
    title: 'Daily Devotion',
    description: 'Visit GuildScape every day for 30 consecutive days',
    achieved: false,
    threshold: 30,
    current: 12,
    icon: '🔥',
    reward: { type: 'badge', name: 'Devoted Artisan' },
  },
  {
    id: 'm2',
    type: 'reputation',
    title: 'Renowned Artisan',
    description: 'Reach 500 reputation points',
    achieved: false,
    threshold: 500,
    current: 234,
    icon: '⭐',
    reward: { type: 'unlock', name: 'Golden Name Color' },
  },
  {
    id: 'm3',
    type: 'artwork',
    title: 'Prolific Creator',
    description: 'Upload 50 artworks to your portfolio',
    achieved: false,
    threshold: 50,
    current: 18,
    icon: '🎨',
    reward: { type: 'gld', amount: 1000 },
  },
  {
    id: 'm4',
    type: 'community',
    title: 'Peer Mentor',
    description: 'Provide 100 peer reviews',
    achieved: true,
    achievedDate: new Date('2025-10-15'),
    threshold: 100,
    current: 100,
    icon: '👥',
    reward: { type: 'badge', name: 'Peer Mentor' },
  },
  {
    id: 'm5',
    type: 'devotion',
    title: 'Year of Mastery',
    description: 'Maintain your account for one full year',
    achieved: false,
    threshold: 365,
    current: 87,
    icon: '📅',
    reward: { type: 'badge', name: 'Year One Veteran' },
  },
  {
    id: 'm6',
    type: 'reputation',
    title: 'Master Artisan',
    description: 'Reach 1000 reputation points',
    achieved: false,
    threshold: 1000,
    current: 234,
    icon: '👑',
    reward: { type: 'unlock', name: 'Master Artisan Title Frame' },
  },
];

const mockMasteryTree: MasteryTreeType = {
  medium: 'Digital Art',
  totalNodes: 12,
  completedNodes: 3,
  level: 2,
  nodes: [
    // Tier 1 - Foundations
    {
      id: 'n1',
      name: 'Digital Basics',
      description: 'Master fundamental digital art techniques',
      category: 'foundation',
      tier: 1,
      locked: false,
      progress: 100,
      completed: true,
      prerequisites: [],
      rewards: [{ type: 'gld', amount: 100 }, { type: 'reputation', amount: 20 }],
      requirements: { artworks: 3 },
    },
    {
      id: 'n2',
      name: 'Color Theory',
      description: 'Understand color harmony and application',
      category: 'foundation',
      tier: 1,
      locked: false,
      progress: 100,
      completed: true,
      prerequisites: [],
      rewards: [{ type: 'gld', amount: 100 }],
      requirements: { artworks: 3, peerReviews: 5 },
    },
    {
      id: 'n3',
      name: 'Composition',
      description: 'Learn to arrange elements effectively',
      category: 'foundation',
      tier: 1,
      locked: false,
      progress: 60,
      completed: false,
      prerequisites: [],
      rewards: [{ type: 'gld', amount: 100 }],
      requirements: { artworks: 5, quality: 'Proficiency' },
    },
    // Tier 2 - Intermediate
    {
      id: 'n4',
      name: 'Advanced Lighting',
      description: 'Master light and shadow techniques',
      category: 'intermediate',
      tier: 2,
      locked: false,
      progress: 30,
      completed: false,
      prerequisites: ['n1'],
      rewards: [{ type: 'badge', name: 'Light Master' }, { type: 'gld', amount: 200 }],
      requirements: { artworks: 8, quality: 'Excellence' },
    },
    {
      id: 'n5',
      name: 'Character Design',
      description: 'Create compelling character designs',
      category: 'intermediate',
      tier: 2,
      locked: false,
      progress: 0,
      completed: false,
      prerequisites: ['n1', 'n2'],
      rewards: [{ type: 'gld', amount: 200 }],
      requirements: { artworks: 10 },
    },
    {
      id: 'n6',
      name: 'Environment Art',
      description: 'Design immersive environments and landscapes',
      category: 'intermediate',
      tier: 2,
      locked: true,
      progress: 0,
      completed: false,
      prerequisites: ['n3'],
      rewards: [{ type: 'gld', amount: 200 }],
      requirements: { artworks: 10, quality: 'Excellence' },
    },
    // Tier 3 - Advanced
    {
      id: 'n7',
      name: 'Cinematic Composition',
      description: 'Create dramatic, story-driven artwork',
      category: 'advanced',
      tier: 3,
      locked: true,
      progress: 0,
      completed: false,
      prerequisites: ['n4', 'n6'],
      rewards: [{ type: 'badge', name: 'Cinematic Master' }, { type: 'gld', amount: 500 }],
      requirements: { artworks: 15, quality: 'Excellence', peerReviews: 20 },
    },
    {
      id: 'n8',
      name: 'Portfolio Mastery',
      description: 'Curate a professional-grade portfolio',
      category: 'advanced',
      tier: 3,
      locked: true,
      progress: 0,
      completed: false,
      prerequisites: ['n5'],
      rewards: [{ type: 'reputation', amount: 100 }],
      requirements: { artworks: 20, quality: 'Breakthrough' },
    },
    // Tier 4 - Master
    {
      id: 'n9',
      name: 'Art Direction',
      description: 'Guide the artistic vision of projects',
      category: 'master',
      tier: 4,
      locked: true,
      progress: 0,
      completed: false,
      prerequisites: ['n7', 'n8'],
      rewards: [{ type: 'badge', name: 'Art Director' }, { type: 'gld', amount: 1000 }],
      requirements: { artworks: 30, quality: 'Breakthrough', peerReviews: 50 },
    },
  ],
};

export const Library: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('quests');
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);

  const tabs = [
    { id: 'quests' as Tab, label: 'Quests', icon: Target, count: mockQuests.filter(q => q.status === 'active').length },
    { id: 'milestones' as Tab, label: 'Milestones', icon: Trophy, count: mockMilestones.filter(m => !m.achieved).length },
    { id: 'mastery' as Tab, label: 'Mastery Trees', icon: TrendingUp, count: 0 },
  ];

  const handleStartQuest = (questId: string) => {
    console.log('Starting quest:', questId);
    // TODO: Implement quest start logic
  };

  const handleClaimRewards = (questId: string) => {
    console.log('Claiming rewards for quest:', questId);
    // TODO: Implement reward claiming logic
  };

  const handleNodeClick = (node: SkillNode) => {
    console.log('Node clicked:', node);
    // TODO: Implement node detail modal
  };

  return (
    <div className="min-h-screen bg-parchment py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-display font-bold text-burnt-umber mb-3 flex items-center justify-center gap-4">
            <BookOpen className="w-12 h-12 text-gold" />
            The Library
          </h1>
          <p className="text-xl text-burnt-umber/70 max-w-2xl mx-auto">
            Track your progress, complete quests, and unlock new abilities on your journey to mastery
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-parchment-light rounded-xl border-2 border-burnt-umber/20 p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    'relative px-6 py-3 rounded-lg font-display font-semibold transition-all flex items-center gap-2',
                    activeTab === tab.id
                      ? 'bg-gold text-burnt-umber border-2 border-burnt-umber shadow-seal'
                      : 'text-burnt-umber/70 hover:text-burnt-umber hover:bg-burnt-umber/5'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                  {tab.count > 0 && (
                    <span className={clsx(
                      'ml-2 px-2 py-0.5 rounded-full text-xs font-bold',
                      activeTab === tab.id
                        ? 'bg-burnt-umber text-gold'
                        : 'bg-council-blue text-parchment'
                    )}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'quests' && (
            <QuestList
              quests={mockQuests}
              onSelectQuest={setSelectedQuest}
            />
          )}
          {activeTab === 'milestones' && (
            <MilestoneTracker milestones={mockMilestones} />
          )}
          {activeTab === 'mastery' && (
            <MasteryTree
              masteryTree={mockMasteryTree}
              onNodeClick={handleNodeClick}
            />
          )}
        </motion.div>
      </div>

      {/* Quest Detail Modal */}
      <QuestDetailModal
        quest={selectedQuest}
        isOpen={!!selectedQuest}
        onClose={() => setSelectedQuest(null)}
        onStartQuest={handleStartQuest}
        onClaimRewards={handleClaimRewards}
      />
    </div>
  );
};
