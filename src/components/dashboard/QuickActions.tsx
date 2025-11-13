import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  Award,
  MessageSquare,
  Store,
  BookOpen,
  Users,
  Vote,
  Target
} from 'lucide-react';
import clsx from 'clsx';

interface QuickAction {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  route: string;
  color: string;
  bgColor: string;
}

interface QuickActionsProps {
  className?: string;
}

const actions: QuickAction[] = [
  {
    id: 'upload',
    icon: <Upload className="w-6 h-6" />,
    label: 'Upload Artwork',
    description: 'Share your latest creation',
    route: '/workshop',
    color: 'text-council-purple',
    bgColor: 'bg-council-purple/10 hover:bg-council-purple/20',
  },
  {
    id: 'review',
    icon: <Award className="w-6 h-6" />,
    label: 'Review Peers',
    description: 'Provide thoughtful feedback',
    route: '/workshop',
    color: 'text-council-blue',
    bgColor: 'bg-council-blue/10 hover:bg-council-blue/20',
  },
  {
    id: 'vote',
    icon: <Vote className="w-6 h-6" />,
    label: 'Cast Votes',
    description: 'Participate in governance',
    route: '/council',
    color: 'text-vote-approve',
    bgColor: 'bg-vote-approve/10 hover:bg-vote-approve/20',
  },
  {
    id: 'quest',
    icon: <Target className="w-6 h-6" />,
    label: 'Complete Quests',
    description: 'Progress your journey',
    route: '/library',
    color: 'text-gold',
    bgColor: 'bg-gold/10 hover:bg-gold/20',
  },
  {
    id: 'shop',
    icon: <Store className="w-6 h-6" />,
    label: 'Browse Bazaar',
    description: 'Discover new artworks',
    route: '/bazaar',
    color: 'text-council-gold',
    bgColor: 'bg-council-gold/10 hover:bg-council-gold/20',
  },
  {
    id: 'guild',
    icon: <Users className="w-6 h-6" />,
    label: 'Visit Guild',
    description: 'Connect with your chapter',
    route: '/guilds',
    color: 'text-council-purple',
    bgColor: 'bg-council-purple/10 hover:bg-council-purple/20',
  },
  {
    id: 'learn',
    icon: <BookOpen className="w-6 h-6" />,
    label: 'Study Library',
    description: 'Grow your skills',
    route: '/library',
    color: 'text-council-blue',
    bgColor: 'bg-council-blue/10 hover:bg-council-blue/20',
  },
  {
    id: 'message',
    icon: <MessageSquare className="w-6 h-6" />,
    label: 'Send Message',
    description: 'Connect with artisans',
    route: '/messages',
    color: 'text-council-gold',
    bgColor: 'bg-council-gold/10 hover:bg-council-gold/20',
  },
];

export const QuickActions: React.FC<QuickActionsProps> = ({ className }) => {
  const navigate = useNavigate();

  return (
    <div className={clsx('grid grid-cols-2 md:grid-cols-4 gap-4', className)}>
      {actions.map((action, index) => (
        <motion.button
          key={action.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(action.route)}
          className={clsx(
            'p-4 rounded-xl border-2 border-burnt-umber/20 transition-all text-left',
            action.bgColor
          )}
        >
          <div className={clsx('mb-3', action.color)}>
            {action.icon}
          </div>
          <h4 className="font-display font-semibold text-burnt-umber text-sm mb-1">
            {action.label}
          </h4>
          <p className="text-xs text-burnt-umber/60 leading-snug">
            {action.description}
          </p>
        </motion.button>
      ))}
    </div>
  );
};
