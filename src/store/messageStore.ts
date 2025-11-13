import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Message, Conversation, SystemNotification } from '@/types/message';

interface MessageStore {
  conversations: Conversation[];
  messages: Message[];
  notifications: SystemNotification[];

  // Actions
  setConversations: (conversations: Conversation[]) => void;
  getConversationById: (id: string) => Conversation | undefined;
  getMessagesByConversation: (conversationId: string) => Message[];
  sendMessage: (conversationId: string, senderId: string, senderName: string, senderAvatar: string, content: string) => void;
  createConversation: (participants: Conversation['participants'], initialMessage?: string, senderId?: string, senderName?: string, senderAvatar?: string) => Conversation;
  markConversationAsRead: (conversationId: string, userId: string) => void;
  markNotificationAsRead: (notificationId: string) => void;
  markAllNotificationsAsRead: () => void;
  addNotification: (notification: Omit<SystemNotification, 'id'>) => void;
  getUnreadNotificationCount: () => number;
  getUnreadMessageCount: (userId: string) => number;
}

export const useMessageStore = create<MessageStore>()(
  persist(
    (set, get) => ({
      conversations: [],
      messages: [],
      notifications: [],

      setConversations: (conversations) => set({ conversations }),

      getConversationById: (id) => {
        return get().conversations.find((c) => c.id === id);
      },

      getMessagesByConversation: (conversationId) => {
        return get().messages
          .filter((m) => m.conversationId === conversationId)
          .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      },

      sendMessage: (conversationId, senderId, senderName, senderAvatar, content) => {
        const newMessage: Message = {
          id: `msg-${Date.now()}`,
          conversationId,
          senderId,
          senderName,
          senderAvatar,
          content,
          type: 'text',
          timestamp: new Date(),
          read: false,
        };

        set((state) => {
          const updatedMessages = [...state.messages, newMessage];
          const updatedConversations = state.conversations.map((conv) => {
            if (conv.id === conversationId) {
              return {
                ...conv,
                lastMessage: newMessage,
                updatedAt: new Date(),
                unreadCount: conv.unreadCount + 1,
              };
            }
            return conv;
          });

          return {
            messages: updatedMessages,
            conversations: updatedConversations,
          };
        });
      },

      createConversation: (participants, initialMessage, senderId, senderName, senderAvatar) => {
        const newConversation: Conversation = {
          id: `conv-${Date.now()}`,
          participants,
          unreadCount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        // Send initial message if provided
        if (initialMessage && senderId && senderName && senderAvatar) {
          const firstMessage: Message = {
            id: `msg-${Date.now()}`,
            conversationId: newConversation.id,
            senderId,
            senderName,
            senderAvatar,
            content: initialMessage,
            type: 'text',
            timestamp: new Date(),
            read: false,
          };

          newConversation.lastMessage = firstMessage;

          set((state) => ({
            conversations: [newConversation, ...state.conversations],
            messages: [...state.messages, firstMessage],
          }));
        } else {
          set((state) => ({
            conversations: [newConversation, ...state.conversations],
          }));
        }

        return newConversation;
      },

      markConversationAsRead: (conversationId, userId) => {
        set((state) => {
          const updatedMessages = state.messages.map((msg) => {
            if (msg.conversationId === conversationId && msg.senderId !== userId) {
              return { ...msg, read: true };
            }
            return msg;
          });

          const updatedConversations = state.conversations.map((conv) => {
            if (conv.id === conversationId) {
              return { ...conv, unreadCount: 0 };
            }
            return conv;
          });

          return {
            messages: updatedMessages,
            conversations: updatedConversations,
          };
        });
      },

      markNotificationAsRead: (notificationId) => {
        set((state) => ({
          notifications: state.notifications.map((notif) =>
            notif.id === notificationId ? { ...notif, read: true } : notif
          ),
        }));
      },

      markAllNotificationsAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((notif) => ({ ...notif, read: true })),
        }));
      },

      addNotification: (notification) => {
        const newNotification: SystemNotification = {
          ...notification,
          id: `notif-${Date.now()}`,
        };

        set((state) => ({
          notifications: [newNotification, ...state.notifications],
        }));
      },

      getUnreadNotificationCount: () => {
        return get().notifications.filter((n) => !n.read).length;
      },

      getUnreadMessageCount: (userId) => {
        const conversations = get().conversations;
        return conversations.reduce((total, conv) => {
          // Count unread messages not sent by the current user
          const unreadInConv = get().messages.filter(
            (msg) => msg.conversationId === conv.id && !msg.read && msg.senderId !== userId
          ).length;
          return total + unreadInConv;
        }, 0);
      },
    }),
    {
      name: 'message-storage',
      partialize: (state) => ({
        conversations: state.conversations,
        messages: state.messages,
        notifications: state.notifications,
      }),
    }
  )
);
