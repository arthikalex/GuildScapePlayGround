import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { NoticeBoardPost } from '@/types/guild';
import { Pin, MessageSquare, Calendar, Tag } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import clsx from 'clsx';

interface NoticeBoardProps {
  posts: NoticeBoardPost[];
  onPostClick?: (post: NoticeBoardPost) => void;
  className?: string;
}

const postTypeStyles = {
  announcement: {
    bg: 'bg-council-blue/10',
    border: 'border-council-blue/30',
    icon: '📢',
    label: 'Announcement',
  },
  discussion: {
    bg: 'bg-council-purple/10',
    border: 'border-council-purple/30',
    icon: '💬',
    label: 'Discussion',
  },
  event: {
    bg: 'bg-council-gold/10',
    border: 'border-council-gold/30',
    icon: '📅',
    label: 'Event',
  },
  opportunity: {
    bg: 'bg-vote-approve/10',
    border: 'border-vote-approve/30',
    icon: '✨',
    label: 'Opportunity',
  },
};

export const NoticeBoard: React.FC<NoticeBoardProps> = ({ posts, onPostClick, className }) => {
  const [filter, setFilter] = useState<'all' | NoticeBoardPost['type']>('all');

  const filteredPosts = filter === 'all' ? posts : posts.filter((p) => p.type === filter);
  const pinnedPosts = filteredPosts.filter((p) => p.pinned);
  const regularPosts = filteredPosts.filter((p) => !p.pinned);

  return (
    <div className={className}>
      {/* Header with Filters */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-display font-bold text-burnt-umber mb-2">Notice Board</h3>
          <p className="text-burnt-umber/70 text-sm">
            {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={clsx(
              'px-3 py-2 rounded-lg text-sm font-display font-semibold transition-all',
              filter === 'all'
                ? 'bg-gold text-burnt-umber border-2 border-burnt-umber'
                : 'bg-parchment-light text-burnt-umber/70 border-2 border-burnt-umber/20 hover:border-burnt-umber/40'
            )}
          >
            All
          </button>
          {Object.entries(postTypeStyles).map(([type, style]) => (
            <button
              key={type}
              onClick={() => setFilter(type as NoticeBoardPost['type'])}
              className={clsx(
                'px-3 py-2 rounded-lg text-sm font-display font-semibold transition-all',
                filter === type
                  ? 'bg-gold text-burnt-umber border-2 border-burnt-umber'
                  : 'bg-parchment-light text-burnt-umber/70 border-2 border-burnt-umber/20 hover:border-burnt-umber/40'
              )}
            >
              {style.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Pinned Posts */}
      {pinnedPosts.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Pin className="w-4 h-4 text-council-gold" />
            <h4 className="text-sm font-display font-semibold text-burnt-umber">Pinned Posts</h4>
          </div>
          <div className="space-y-4">
            {pinnedPosts.map((post, index) => (
              <PostCard key={post.id} post={post} index={index} onClick={() => onPostClick?.(post)} />
            ))}
          </div>
        </div>
      )}

      {/* Regular Posts */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-4"
        >
          {regularPosts.map((post, index) => (
            <PostCard
              key={post.id}
              post={post}
              index={index + pinnedPosts.length}
              onClick={() => onPostClick?.(post)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12 bg-parchment-light rounded-xl border-2 border-burnt-umber/20">
          <div className="text-5xl mb-3">📋</div>
          <p className="text-burnt-umber/70">No posts to display</p>
        </div>
      )}
    </div>
  );
};

interface PostCardProps {
  post: NoticeBoardPost;
  index: number;
  onClick: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, index, onClick }) => {
  const style = postTypeStyles[post.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className={clsx(
        'relative p-6 rounded-xl border-2 cursor-pointer',
        'transition-all duration-300 hover:shadow-elevated hover:-translate-y-1',
        style.bg,
        style.border
      )}
    >
      {/* Pinned Indicator */}
      {post.pinned && (
        <div className="absolute -top-2 -right-2">
          <motion.div
            className="w-8 h-8 bg-council-gold rounded-full border-2 border-burnt-umber flex items-center justify-center shadow-seal"
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
          >
            <Pin className="w-4 h-4 text-burnt-umber" />
          </motion.div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-4 mb-3">
        {/* Author Avatar */}
        <img
          src={post.authorAvatar}
          alt={post.authorName}
          className="w-12 h-12 rounded-full border-2 border-burnt-umber"
        />

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-display font-semibold text-burnt-umber">{post.authorName}</span>
            <span className="text-xs px-2 py-0.5 bg-parchment-light rounded text-burnt-umber/70">
              {style.icon} {style.label}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-burnt-umber/60">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
            </span>
            {post.comments && post.comments.length > 0 && (
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3 h-3" />
                {post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Title */}
      <h4 className="text-lg font-display font-bold text-burnt-umber mb-2">{post.title}</h4>

      {/* Content */}
      <p className="text-burnt-umber/80 font-body text-sm leading-relaxed mb-3 line-clamp-3">
        {post.content}
      </p>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 px-2 py-1 bg-parchment-light rounded text-xs text-burnt-umber/70"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Reactions */}
      {post.reactions && post.reactions.length > 0 && (
        <div className="flex gap-3 pt-3 border-t border-burnt-umber/10">
          {post.reactions.map((reaction) => (
            <button
              key={reaction.emoji}
              className="flex items-center gap-1 px-2 py-1 bg-parchment-light rounded hover:bg-parchment-dark transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                // Handle reaction
              }}
            >
              <span className="text-base">{reaction.emoji}</span>
              <span className="text-xs font-display font-semibold text-burnt-umber">
                {reaction.count}
              </span>
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
};
