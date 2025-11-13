import React, { useState, useEffect } from 'react';
import { PageContainer } from '@components/layout/PageContainer';
import { ConversationList } from '@components/messages/ConversationList';
import { MessageThread } from '@components/messages/MessageThread';
import { ComposeMessage } from '@components/messages/ComposeMessage';
import { NotificationCenter } from '@components/messages/NotificationCenter';
import { useNavigationStore } from '@store/navigationStore';
import { useMessageStore } from '@store/messageStore';
import type { Conversation } from '@/types/message';
import { MessageSquare, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export const HeraldsChamber: React.FC = () => {
  const { setBreadcrumbs } = useNavigationStore();
  const { conversations, getUnreadNotificationCount } = useMessageStore();
  const [activeTab, setActiveTab] = useState<'messages' | 'notifications'>('messages');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  const unreadNotificationCount = getUnreadNotificationCount();

  useEffect(() => {
    setBreadcrumbs([{ label: "Herald's Chamber", path: '/messages' }]);
  }, [setBreadcrumbs]);

  const handleNewMessage = () => {
    setIsComposeOpen(true);
  };

  const handleConversationCreated = (conversationId: string) => {
    const newConv = conversations.find((c) => c.id === conversationId);
    if (newConv) {
      setSelectedConversation(newConv);
      setActiveTab('messages');
    }
  };

  const tabs = [
    {
      id: 'messages' as const,
      label: 'Messages',
      icon: MessageSquare,
      badge: null,
    },
    {
      id: 'notifications' as const,
      label: 'Notifications',
      icon: Bell,
      badge: unreadNotificationCount,
    },
  ];

  return (
    <PageContainer showBreadcrumbs={false}>
      {/* Header with Tabs */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex gap-2 border-b-2 border-burnt-umber/20">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  'relative px-6 py-3 font-display font-semibold transition-all flex items-center gap-2',
                  activeTab === tab.id
                    ? 'text-burnt-umber'
                    : 'text-burnt-umber/60 hover:text-burnt-umber'
                )}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
                {tab.badge !== null && tab.badge > 0 && (
                  <span className="px-2 py-0.5 bg-vote-reject rounded-full text-xs font-display font-bold text-parchment">
                    {tab.badge}
                  </span>
                )}
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gold"
                    layoutId="activeHeraldTab"
                  />
                )}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Content */}
      <div className="h-[calc(100vh-250px)] bg-parchment rounded-2xl border-4 border-burnt-umber overflow-hidden shadow-elevated">
        {activeTab === 'messages' ? (
          <div className="h-full grid grid-cols-12">
            {/* Conversation List */}
            <div className="col-span-4 border-r-4 border-burnt-umber bg-parchment-light">
              <ConversationList
                conversations={conversations}
                selectedConversationId={selectedConversation?.id}
                onSelectConversation={setSelectedConversation}
                onNewMessage={handleNewMessage}
              />
            </div>

            {/* Message Thread */}
            <div className="col-span-8">
              {selectedConversation ? (
                <MessageThread conversation={selectedConversation} />
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-24 h-24 bg-burnt-umber/10 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="w-12 h-12 text-burnt-umber/40" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-burnt-umber mb-2">
                    Welcome to Herald's Chamber
                  </h3>
                  <p className="text-burnt-umber/70 mb-6 max-w-md">
                    Select a conversation from the list or start a new one to connect with fellow
                    artisans
                  </p>
                  <button onClick={handleNewMessage} className="btn-primary">
                    Start New Conversation
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <NotificationCenter onNotificationClick={() => {}} />
        )}
      </div>

      {/* Compose Message Modal */}
      <ComposeMessage
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        onConversationCreated={handleConversationCreated}
      />
    </PageContainer>
  );
};
