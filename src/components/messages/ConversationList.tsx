import React from 'react';
import { motion } from 'framer-motion';
import type { Conversation } from '@/types/message';
import { MessageSquare, Circle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useUserStore } from '@store/userStore';
import clsx from 'clsx';

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId?: string;
  onSelectConversation: (conversation: Conversation) => void;
  onNewMessage?: () => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedConversationId,
  onSelectConversation,
  onNewMessage,
}) => {
  const { currentUser } = useUserStore();

  if (!currentUser) return null;

  // Sort by most recent activity
  const sortedConversations = [...conversations].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b-2 border-burnt-umber/20 bg-parchment-light">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-display font-bold text-burnt-umber">Messages</h3>
          {onNewMessage && (
            <button onClick={onNewMessage} className="btn-secondary text-sm py-2">
              New Message
            </button>
          )}
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto scrollbar-medieval">
        {sortedConversations.length > 0 ? (
          <div className="divide-y divide-burnt-umber/10">
            {sortedConversations.map((conversation, index) => {
              // Get the other participant (not the current user)
              const otherParticipant = conversation.participants.find(
                (p) => p.userId !== currentUser.id
              );

              if (!otherParticipant) return null;

              const isSelected = conversation.id === selectedConversationId;
              const hasUnread = conversation.unreadCount > 0;

              return (
                <motion.button
                  key={conversation.id}
                  onClick={() => onSelectConversation(conversation)}
                  className={clsx(
                    'w-full p-4 text-left transition-all hover:bg-parchment',
                    isSelected && 'bg-gold/20 border-l-4 border-gold',
                    !isSelected && 'border-l-4 border-transparent'
                  )}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={otherParticipant.avatar}
                        alt={otherParticipant.name}
                        className="w-12 h-12 rounded-full border-2 border-burnt-umber"
                      />
                      {hasUnread && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-vote-reject rounded-full border-2 border-parchment flex items-center justify-center">
                          <span className="text-xs font-display font-bold text-parchment">
                            {conversation.unreadCount}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={clsx(
                          'font-display font-semibold text-burnt-umber truncate',
                          hasUnread && 'font-bold'
                        )}>
                          {otherParticipant.name}
                        </h4>
                        {conversation.lastMessage && (
                          <span className="text-xs text-burnt-umber/60 flex-shrink-0 ml-2">
                            {formatDistanceToNow(new Date(conversation.lastMessage.timestamp), {
                              addSuffix: false,
                            })}
                          </span>
                        )}
                      </div>

                      {/* Tier Badge */}
                      <div className="text-xs text-gold font-display mb-1">
                        {otherParticipant.tier}
                      </div>

                      {/* Last Message Preview */}
                      {conversation.lastMessage ? (
                        <p className={clsx(
                          'text-sm text-burnt-umber/70 line-clamp-1',
                          hasUnread && 'font-semibold text-burnt-umber'
                        )}>
                          {conversation.lastMessage.senderId === currentUser.id && 'You: '}
                          {conversation.lastMessage.content}
                        </p>
                      ) : (
                        <p className="text-sm text-burnt-umber/50 italic">
                          Start a conversation
                        </p>
                      )}
                    </div>

                    {hasUnread && (
                      <div className="flex-shrink-0 mt-2">
                        <Circle className="w-3 h-3 fill-vote-reject text-vote-reject" />
                      </div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="w-20 h-20 bg-burnt-umber/10 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="w-10 h-10 text-burnt-umber/40" />
            </div>
            <h4 className="font-display font-semibold text-burnt-umber mb-2">
              No Conversations Yet
            </h4>
            <p className="text-sm text-burnt-umber/60 mb-4">
              Start connecting with fellow artisans
            </p>
            {onNewMessage && (
              <button onClick={onNewMessage} className="btn-primary">
                Send Your First Message
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
