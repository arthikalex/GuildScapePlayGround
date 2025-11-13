import React, { useEffect } from 'react';
import { PageContainer } from '@components/layout/PageContainer';
import { Card, CardHeader, CardBody } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { Flame, Award, Palette, Coins, TrendingUp } from 'lucide-react';
import { useUserStore } from '@store/userStore';
import { useNavigationStore } from '@store/navigationStore';
import { mockUser, generateDailyScrolls } from '@utils/mockData';
import { motion } from 'framer-motion';

export const Dashboard: React.FC = () => {
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

  const stats = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: 'Reputation',
      value: currentUser.reputation.total,
      color: 'text-council-blue',
    },
    {
      icon: <Award className="w-6 h-6" />,
      label: 'Badges',
      value: currentUser.badges.length,
      color: 'text-council-purple',
    },
    {
      icon: <Palette className="w-6 h-6" />,
      label: 'Artworks',
      value: 12, // Mock value
      color: 'text-council-gold',
    },
    {
      icon: <Coins className="w-6 h-6" />,
      label: 'GLD Balance',
      value: currentUser.gldBalance.toLocaleString(),
      color: 'text-gold',
    },
  ];

  return (
    <PageContainer
      title={`Welcome back, ${currentUser.name}`}
      subtitle={`${currentUser.tier} • ${currentUser.title}`}
      showBreadcrumbs={false}
    >
      {/* Devotion Chain */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="mb-8 bg-gradient-to-r from-council-gold/10 to-gold/5">
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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card>
              <div className="flex items-center gap-4">
                <div className={stat.color}>{stat.icon}</div>
                <div>
                  <div className="text-2xl font-display font-bold text-burnt-umber">
                    {stat.value}
                  </div>
                  <div className="text-sm text-burnt-umber/70">{stat.label}</div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Daily Scrolls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader
            title="Daily Scrolls"
            subtitle="Gentle suggestions for today (optional)"
          />
          <CardBody>
            <div className="grid gap-4">
              {dailyScrolls.map((scroll) => (
                <div
                  key={scroll.id}
                  className="flex items-center justify-between p-4 bg-parchment-light rounded-lg border-2 border-burnt-umber/20 hover:border-gold/50 transition-all"
                >
                  <div>
                    <h4 className="font-display font-semibold text-burnt-umber mb-1">
                      {scroll.title}
                    </h4>
                    <p className="text-sm text-burnt-umber/70">{scroll.description}</p>
                    <div className="flex gap-3 mt-2 text-xs">
                      {scroll.reward.rep && (
                        <span className="text-council-blue">+{scroll.reward.rep} REP</span>
                      )}
                      {scroll.reward.gld && (
                        <span className="text-gold">+{scroll.reward.gld} GLD</span>
                      )}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled={scroll.completed}
                  >
                    {scroll.completed ? 'Completed' : 'Start'}
                  </Button>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-center"
      >
        <p className="text-burnt-umber/70 mb-4 font-body">
          Ready to create, collaborate, or contribute?
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="primary">Upload Artwork</Button>
          <Button variant="secondary">Review Peers</Button>
          <Button variant="tertiary">Cast a Vote</Button>
        </div>
      </motion.div>
    </PageContainer>
  );
};
