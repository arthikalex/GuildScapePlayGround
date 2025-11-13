import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Conversation, Message } from '@/types/message';
import { Send, User } from 'lucide-react';
import { format, isSameDay } from 'date-fns';
import { useMessageStore } from '@store/messageStore';
import { useUserStore } from '@store/userStore';
import clsx from 'clsx';

interface MessageThreadProps {
  conversation: Conversation;
}

export const MessageThread: React.FC<MessageThreadProps> = ({ conversation }) => {
  const { currentUser } = useUserStore();
  const { getMessagesByConversation, sendMessage, markConversationAsRead } = useMessageStore();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const messages = getMessagesByConversation(conversation.id);

  // Get the other participant
  const otherParticipant = conversation.participants.find((p) => p.userId !== currentUser?.id);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Mark as read when opened
  useEffect(() => {
    if (currentUser) {
      markConversationAsRead(conversation.id, currentUser.id);
    }
  }, [conversation.id, currentUser, markConversationAsRead]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim() || !currentUser) return;

    sendMessage(
      conversation.id,
      currentUser.id,
      currentUser.name,
      currentUser.avatar,
      newMessage.trim()
    );

    setNewMessage('');
    inputRef.current?.focus();
  };

  if (!currentUser || !otherParticipant) return null;

  // Group messages by day
  const groupedMessages: { date: Date; messages: Message[] }[] = [];
  messages.forEach((message) => {
    const messageDate = new Date(message.timestamp);
    const existingGroup = groupedMessages.find((group) =>
      isSameDay(group.date, messageDate)
    );

    if (existingGroup) {
      existingGroup.messages.push(message);
    } else {
      groupedMessages.push({
        date: messageDate,
        messages: [message],
      });
    }
  });

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b-2 border-burnt-umber/20 bg-parchment-light">
        <div className="flex items-center gap-3">
          <img
            src={otherParticipant.avatar}
            alt={otherParticipant.name}
            className="w-12 h-12 rounded-full border-2 border-burnt-umber"
          />
          <div>
            <h3 className="text-lg font-display font-bold text-burnt-umber">
              {otherParticipant.name}
            </h3>
            <p className="text-sm text-gold font-display">{otherParticipant.tier}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-medieval p-4 space-y-4">
        <AnimatePresence>
          {groupedMessages.map((group) => (
            <div key={group.date.toISOString()}>
              {/* Date Divider */}
              <div className="flex items-center justify-center my-6">
                <div className="px-4 py-1 bg-burnt-umber/10 rounded-full">
                  <span className="text-xs font-display font-semibold text-burnt-umber/70">
                    {format(group.date, 'MMMM d, yyyy')}
                  </span>
                </div>
              </div>

              {/* Messages for this day */}
              {group.messages.map((message, index) => {
                const isOwnMessage = message.senderId === currentUser.id;
                const showAvatar = !isOwnMessage;

                return (
                  <motion.div
                    key={message.id}
                    className={clsx(
                      'flex gap-3 mb-3',
                      isOwnMessage ? 'justify-end' : 'justify-start'
                    )}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                  >
                    {showAvatar && (
                      <img
                        src={message.senderAvatar}
                        alt={message.senderName}
                        className="w-10 h-10 rounded-full border-2 border-burnt-umber flex-shrink-0"
                      />
                    )}

                    <div className={clsx('max-w-[70%]', isOwnMessage && 'flex flex-col items-end')}>
                      <div
                        className={clsx(
                          'p-3 rounded-2xl',
                          isOwnMessage
                            ? 'bg-gold/20 border-2 border-gold/30 rounded-br-sm'
                            : 'bg-parchment-light border-2 border-burnt-umber/20 rounded-bl-sm'
                        )}
                      >
                        <p className="text-burnt-umber font-body whitespace-pre-wrap break-words">
                          {message.content}
                        </p>
                      </div>
                      <span className="text-xs text-burnt-umber/50 mt-1 px-2">
                        {format(new Date(message.timestamp), 'h:mm a')}
                      </span>
                    </div>

                    {isOwnMessage && <div className="w-10" />}
                  </motion.div>
                );
              })}
            </div>
          ))}
        </AnimatePresence>

        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-burnt-umber/10 rounded-full flex items-center justify-center mb-3">
              <User className="w-8 h-8 text-burnt-umber/40" />
            </div>
            <p className="text-burnt-umber/60">
              Start the conversation with {otherParticipant.name}
            </p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t-2 border-burnt-umber/20 bg-parchment-light">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Message ${otherParticipant.name}...`}
            className="flex-1 px-4 py-3 bg-parchment border-2 border-burnt-umber/20 rounded-xl text-burnt-umber placeholder:text-burnt-umber/40 focus:outline-none focus:border-burnt-umber font-body"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className={clsx(
              'w-12 h-12 rounded-xl flex items-center justify-center transition-all',
              newMessage.trim()
                ? 'bg-gold hover:bg-gold-light border-2 border-burnt-umber'
                : 'bg-burnt-umber/10 border-2 border-burnt-umber/20 cursor-not-allowed'
            )}
          >
            <Send className={clsx('w-5 h-5', newMessage.trim() ? 'text-burnt-umber' : 'text-burnt-umber/40')} />
          </button>
        </form>
      </div>
    </div>
  );
};
