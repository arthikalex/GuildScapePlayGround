import React from 'react';
import { motion } from 'framer-motion';
import { Clock, User, Award, MessageSquare, Heart, ShoppingCart, Target } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import clsx from 'clsx';

export interface ActivityItem {
  id: string;
  type: 'artwork' | 'review' | 'purchase' | 'achievement' | 'message' | 'quest' | 'vote';
  title: string;
  description?: string;
  timestamp: Date;
  user?: {
    name: string;
    avatar?: string;
  };
  metadata?: {
    reputation?: number;
    gld?: number;
    badge?: string;
  };
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  maxItems?: number;
  className?: string;
}

// Define Palette component first
const Palette = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
  </svg>
);

const activityIcons = {
  artwork: Palette,
  review: Award,
  purchase: ShoppingCart,
  achievement: Award,
  message: MessageSquare,
  quest: Target,
  vote: Heart,
};

const activityColors = {
  artwork: 'text-council-purple',
  review: 'text-council-blue',
  purchase: 'text-gold',
  achievement: 'text-vote-approve',
  message: 'text-council-gold',
  quest: 'text-council-purple',
  vote: 'text-vote-approve',
};

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  maxItems = 10,
  className,
}) => {
  const displayedActivities = activities.slice(0, maxItems);

  return (
    <div className={clsx('space-y-3', className)}>
      {displayedActivities.length === 0 ? (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-burnt-umber/20 mx-auto mb-3" />
          <p className="text-burnt-umber/60 font-display">No recent activity</p>
        </div>
      ) : (
        displayedActivities.map((activity, index) => {
          const Icon = activityIcons[activity.type];
          const colorClass = activityColors[activity.type];

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex gap-3 p-3 bg-parchment-light rounded-lg border border-burnt-umber/10 hover:border-burnt-umber/30 transition-colors"
            >
              {/* Icon */}
              <div className={clsx('flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-parchment border-2 border-burnt-umber/20', colorClass)}>
                <Icon className="w-5 h-5" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-display font-semibold text-burnt-umber text-sm">
                    {activity.title}
                  </h4>
                  <span className="text-xs text-burnt-umber/50 whitespace-nowrap flex-shrink-0">
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                  </span>
                </div>

                {activity.description && (
                  <p className="text-xs text-burnt-umber/70 mb-2 line-clamp-2">
                    {activity.description}
                  </p>
                )}

                {activity.user && (
                  <div className="flex items-center gap-2 mb-2">
                    {activity.user.avatar && (
                      <img
                        src={activity.user.avatar}
                        alt={activity.user.name}
                        className="w-4 h-4 rounded-full border border-burnt-umber/20"
                      />
                    )}
                    <span className="text-xs text-burnt-umber/60 flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {activity.user.name}
                    </span>
                  </div>
                )}

                {activity.metadata && (
                  <div className="flex gap-3 text-xs">
                    {activity.metadata.reputation && (
                      <span className="text-council-blue font-semibold">
                        +{activity.metadata.reputation} REP
                      </span>
                    )}
                    {activity.metadata.gld && (
                      <span className="text-gold font-semibold">
                        +{activity.metadata.gld} GLD
                      </span>
                    )}
                    {activity.metadata.badge && (
                      <span className="text-council-purple font-semibold flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        {activity.metadata.badge}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })
      )}
    </div>
  );
};
