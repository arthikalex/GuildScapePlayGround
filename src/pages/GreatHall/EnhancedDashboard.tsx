import React, { useEffect } from 'react';
import { PageContainer } from '@components/layout/PageContainer';
import { Card, CardHeader, CardBody } from '@components/common/Card';
import { Flame, TrendingUp, Clock, Trophy } from 'lucide-react';
import { useUserStore } from '@store/userStore';
import { useNavigationStore } from '@store/navigationStore';
import { mockUser, generateDailyScrolls } from '@utils/mockData';
import { motion } from 'framer-motion';
import { ActivityFeed, type ActivityItem } from '@components/dashboard/ActivityFeed';
import { TrendingArtworks, type TrendingArtwork } from '@components/dashboard/TrendingArtworks';
import { Leaderboard, type LeaderboardEntry } from '@components/dashboard/Leaderboard';
import { QuickActions } from '@components/dashboard/QuickActions';
import { UserStatsWidget } from '@components/dashboard/UserStatsWidget';

// Mock data for new features
const mockActivities: ActivityItem[] = [
  {
    id: 'a1',
    type: 'artwork',
    title: 'Uploaded new artwork',
    description: 'Digital painting: "Mystic Mountains"',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    metadata: { reputation: 10, gld: 50 },
  },
  {
    id: 'a2',
    type: 'review',
    title: 'Provided peer review',
    description: 'Reviewed "Ocean Dreams" by Sofia Martinez',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    user: {
      name: 'Sofia Martinez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sofia',
    },
    metadata: { reputation: 5 },
  },
  {
    id: 'a3',
    type: 'achievement',
    title: 'Earned new badge',
    description: 'Master Reviewer - Completed 50 peer reviews',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    metadata: { badge: 'Master Reviewer' },
  },
  {
    id: 'a4',
    type: 'purchase',
    title: 'Purchased artwork',
    description: '"Ethereal Sculpture" by Diego Martinez',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
    user: {
      name: 'Diego Martinez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=diego',
    },
    metadata: { gld: -580 },
  },
  {
    id: 'a5',
    type: 'quest',
    title: 'Completed quest',
    description: 'Master Reviewer - All steps completed',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    metadata: { reputation: 50, gld: 500 },
  },
  {
    id: 'a6',
    type: 'vote',
    title: 'Voted on proposal',
    description: 'Supported "Expand Workshop Hours"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    metadata: { reputation: 2 },
  },
  {
    id: 'a7',
    type: 'message',
    title: 'Received message',
    description: 'New message from Elena Brightwood',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 30),
    user: {
      name: 'Elena Brightwood',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elena',
    },
  },
];

const mockTrendingArtworks: TrendingArtwork[] = [
  {
    id: 't1',
    title: 'Mystic Forest at Dawn',
    artistName: 'Elena Brightwood',
    artistAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elena',
    imageUrl: 'https://picsum.photos/seed/art1/400/400',
    views: 1342,
    likes: 287,
    trending: 'hot',
  },
  {
    id: 't2',
    title: 'Urban Dreams',
    artistName: 'Marcus Stone',
    artistAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus',
    imageUrl: 'https://picsum.photos/seed/art2/400/400',
    views: 989,
    likes: 152,
    trending: 'rising',
  },
  {
    id: 't3',
    title: 'Ocean Depths',
    artistName: 'Sofia Chen',
    artistAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sofia',
    imageUrl: 'https://picsum.photos/seed/art5/400/400',
    views: 456,
    likes: 91,
    trending: 'new',
  },
  {
    id: 't4',
    title: 'Digital Dreamscape',
    artistName: 'Alex Rivera',
    artistAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    imageUrl: 'https://picsum.photos/seed/art4/400/400',
    views: 812,
    likes: 203,
    trending: 'rising',
  },
];

const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    userId: 'user-1',
    name: 'Elena Brightwood',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elena',
    reputation: 2847,
    tier: 'Master Artisan',
    change: 2,
  },
  {
    rank: 2,
    userId: 'user-2',
    name: 'Marcus Stone',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus',
    reputation: 2654,
    tier: 'Expert Artisan',
    change: -1,
  },
  {
    rank: 3,
    userId: 'current-user',
    name: 'Alexander Ironheart',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex1',
    reputation: 2341,
    tier: 'Expert Artisan',
    change: 1,
  },
  {
    rank: 4,
    userId: 'user-3',
    name: 'Sofia Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sofia',
    reputation: 2198,
    tier: 'Proficient Artisan',
    change: 0,
  },
  {
    rank: 5,
    userId: 'user-4',
    name: 'Diego Martinez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=diego',
    reputation: 2076,
    tier: 'Proficient Artisan',
    change: 3,
  },
];

export const EnhancedDashboard: React.FC = () => {
  const { currentUser, setUser, dailyScrolls, updateDailyScrolls } = useUserStore();
  const { setBreadcrumbs } = useNavigationStore();

  useEffect(() => {
    // Initialize with mock user if not set
    if (!currentUser) {
      setUser(mockUser);
    }

    // Generate daily scrolls if empty
    if (dailyScrolls.length === 0) {
      updateDailyScrolls(generateDailyScrolls());
    }

    // Set breadcrumbs
    setBreadcrumbs([{ label: 'Great Hall', path: '/' }]);
  }, [currentUser, dailyScrolls.length, setUser, updateDailyScrolls, setBreadcrumbs]);

  if (!currentUser) {
    return <PageContainer title="Great Hall">Loading...</PageContainer>;
  }

  return (
    <PageContainer
      title={`Welcome back, ${currentUser.name}`}
      subtitle={`${currentUser.tier} • ${currentUser.title}`}
      showBreadcrumbs={false}
    >
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Devotion Chain */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-r from-council-gold/10 to-gold/5">
              <CardHeader
                title="Devotion Chain"
                subtitle="Your daily commitment streak"
                icon={<Flame className="w-8 h-8 text-orange-500" />}
              />
              <CardBody>
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-5xl font-display font-bold text-burnt-umber">
                      {currentUser.devotionChain.currentStreak}
                    </div>
                    <div className="text-sm text-burnt-umber/70 mt-2">Current Streak</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-display">Next Milestone:</span>
                      <span className="text-sm font-bold text-gold">
                        {currentUser.devotionChain.nextMilestone} days
                      </span>
                    </div>
                    <div className="h-4 bg-parchment-dark rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-orange-400 to-orange-600"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(currentUser.devotionChain.currentStreak / currentUser.devotionChain.nextMilestone) * 100}%`,
                        }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-burnt-umber/60">
                      <span>{currentUser.devotionChain.currentStreak} days</span>
                      <span>{currentUser.devotionChain.nextMilestone} days</span>
                    </div>
                  </div>
                  {currentUser.devotionChain.shields > 0 && (
                    <div className="text-center px-4 py-2 bg-council-blue/10 rounded-lg">
                      <div className="text-2xl">🛡️</div>
                      <div className="text-xs text-burnt-umber/70 mt-1">
                        {currentUser.devotionChain.shields} Shield{currentUser.devotionChain.shields !== 1 ? 's' : ''}
                      </div>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* User Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <UserStatsWidget user={currentUser} />
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader
                title="Quick Actions"
                subtitle="Jump right into the action"
              />
              <CardBody>
                <QuickActions />
              </CardBody>
            </Card>
          </motion.div>

          {/* Trending Artworks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader
                title="Trending Artworks"
                subtitle="What's popular in the bazaar"
                icon={<TrendingUp className="w-6 h-6 text-gold" />}
              />
              <CardBody>
                <TrendingArtworks artworks={mockTrendingArtworks} />
              </CardBody>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - Activity & Leaderboard */}
        <div className="lg:col-span-1 space-y-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader
                title="Recent Activity"
                subtitle="Your latest actions"
                icon={<Clock className="w-6 h-6 text-council-blue" />}
              />
              <CardBody>
                <ActivityFeed activities={mockActivities} maxItems={6} />
              </CardBody>
            </Card>
          </motion.div>

          {/* Reputation Leaderboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardHeader
                title="Top Artisans"
                subtitle="Reputation leaderboard"
                icon={<Trophy className="w-6 h-6 text-gold" />}
              />
              <CardBody>
                <Leaderboard
                  entries={mockLeaderboard}
                  currentUserId="current-user"
                  maxEntries={5}
                />
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageContainer>
  );
};
