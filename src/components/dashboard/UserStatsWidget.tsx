import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Palette, Coins, Target, Users } from 'lucide-react';
import type { User } from '@/types/user';

interface UserStatsWidgetProps {
  user: User;
  className?: string;
}

export const UserStatsWidget: React.FC<UserStatsWidgetProps> = ({ user, className }) => {
  const stats = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: 'Reputation',
      value: user.reputation.total.toLocaleString(),
      change: '+234 this week',
      color: 'text-council-blue',
      bgColor: 'bg-council-blue/10',
    },
    {
      icon: <Award className="w-6 h-6" />,
      label: 'Badges',
      value: user.badges.length,
      change: `${user.badges.filter(b => b.rarity === 'legendary').length} legendary`,
      color: 'text-council-purple',
      bgColor: 'bg-council-purple/10',
    },
    {
      icon: <Palette className="w-6 h-6" />,
      label: 'Artworks',
      value: '24',
      change: '+3 this month',
      color: 'text-council-gold',
      bgColor: 'bg-council-gold/10',
    },
    {
      icon: <Coins className="w-6 h-6" />,
      label: 'GLD Balance',
      value: user.gldBalance.toLocaleString(),
      change: '+1,250 earned',
      color: 'text-gold',
      bgColor: 'bg-gold/10',
    },
    {
      icon: <Target className="w-6 h-6" />,
      label: 'Active Quests',
      value: '3',
      change: '5 completed',
      color: 'text-vote-approve',
      bgColor: 'bg-vote-approve/10',
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: 'Guild Members',
      value: '47',
      change: '+8 this month',
      color: 'text-burnt-umber',
      bgColor: 'bg-burnt-umber/10',
    },
  ];

  return (
    <div className={className}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="p-4 bg-parchment-light rounded-xl border-2 border-burnt-umber/20 hover:border-burnt-umber/40 transition-all"
          >
            <div className={`inline-flex p-2 rounded-lg mb-3 ${stat.bgColor} ${stat.color}`}>
              {stat.icon}
            </div>
            <div className="text-3xl font-display font-bold text-burnt-umber mb-1">
              {stat.value}
            </div>
            <div className="text-sm font-display font-semibold text-burnt-umber mb-1">
              {stat.label}
            </div>
            <div className="text-xs text-burnt-umber/60">
              {stat.change}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
