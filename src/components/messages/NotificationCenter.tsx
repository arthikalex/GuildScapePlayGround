import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SystemNotification } from '@/types/message';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Star,
  Heart,
  Award,
  Scale,
  Users,
  AtSign,
  CheckCircle2,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useMessageStore } from '@store/messageStore';
import clsx from 'clsx';

interface NotificationCenterProps {
  onNotificationClick?: () => void;
}

const notificationIcons = {
  review: Star,
  appreciation: Heart,
  badge: Award,
  proposal: Scale,
  guild: Users,
  mention: AtSign,
  system: Bell,
};

const notificationColors = {
  review: 'text-council-purple bg-council-purple/10 border-council-purple/30',
  appreciation: 'text-vote-approve bg-vote-approve/10 border-vote-approve/30',
  badge: 'text-gold bg-gold/10 border-gold/30',
  proposal: 'text-council-blue bg-council-blue/10 border-council-blue/30',
  guild: 'text-council-purple bg-council-purple/10 border-council-purple/30',
  mention: 'text-gold bg-gold/10 border-gold/30',
  system: 'text-burnt-umber bg-burnt-umber/10 border-burnt-umber/30',
};

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ onNotificationClick }) => {
  const navigate = useNavigate();
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useMessageStore();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = filter === 'unread'
    ? notifications.filter((n) => !n.read)
    : notifications;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (notification: SystemNotification) => {
    if (!notification.read) {
      markNotificationAsRead(notification.id);
    }

    if (notification.actionUrl) {
      navigate(notification.actionUrl);
      onNotificationClick?.();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b-2 border-burnt-umber/20 bg-parchment-light">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bell className="w-6 h-6 text-burnt-umber" />
            <h3 className="text-xl font-display font-bold text-burnt-umber">Notifications</h3>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 bg-vote-reject rounded-full text-xs font-display font-bold text-parchment">
                {unreadCount}
              </span>
            )}
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllNotificationsAsRead}
              className="text-sm font-display font-semibold text-council-blue hover:text-council-blue/80 flex items-center gap-1"
            >
              <CheckCircle2 className="w-4 h-4" />
              Mark all read
            </button>
          )}
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={clsx(
              'px-4 py-2 rounded-lg text-sm font-display font-semibold transition-all',
              filter === 'all'
                ? 'bg-gold text-burnt-umber border-2 border-burnt-umber'
                : 'bg-parchment-light text-burnt-umber/70 border-2 border-burnt-umber/20 hover:border-burnt-umber/40'
            )}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={clsx(
              'px-4 py-2 rounded-lg text-sm font-display font-semibold transition-all',
              filter === 'unread'
                ? 'bg-gold text-burnt-umber border-2 border-burnt-umber'
                : 'bg-parchment-light text-burnt-umber/70 border-2 border-burnt-umber/20 hover:border-burnt-umber/40'
            )}
          >
            Unread ({unreadCount})
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto scrollbar-medieval">
        {filteredNotifications.length > 0 ? (
          <AnimatePresence>
            {filteredNotifications.map((notification, index) => {
              const Icon = notificationIcons[notification.type];
              const colorClass = notificationColors[notification.type];

              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => handleNotificationClick(notification)}
                  className={clsx(
                    'p-4 border-b border-burnt-umber/10 transition-all cursor-pointer',
                    notification.read ? 'bg-parchment' : 'bg-parchment-light hover:bg-parchment',
                    notification.actionUrl && 'cursor-pointer'
                  )}
                >
                  <div className="flex gap-3">
                    {/* Icon */}
                    <div className={clsx(
                      'w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                      colorClass
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className={clsx(
                        'font-display font-semibold text-burnt-umber mb-1',
                        !notification.read && 'font-bold'
                      )}>
                        {notification.title}
                      </h4>
                      <p className="text-sm text-burnt-umber/70 mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-burnt-umber/50">
                          {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                        </span>
                        {notification.actionLabel && notification.actionUrl && (
                          <span className="text-xs font-display font-semibold text-council-blue">
                            {notification.actionLabel} →
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Unread Indicator */}
                    {!notification.read && (
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-vote-reject rounded-full"></div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="w-20 h-20 bg-burnt-umber/10 rounded-full flex items-center justify-center mb-4">
              <Bell className="w-10 h-10 text-burnt-umber/40" />
            </div>
            <h4 className="font-display font-semibold text-burnt-umber mb-2">
              {filter === 'unread' ? 'All caught up!' : 'No notifications yet'}
            </h4>
            <p className="text-sm text-burnt-umber/60">
              {filter === 'unread'
                ? 'You have no unread notifications'
                : "You'll be notified about important updates here"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
