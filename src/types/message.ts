export type MessageType = 'text' | 'system' | 'notification';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  type: MessageType;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: {
    userId: string;
    name: string;
    avatar: string;
    tier: string;
  }[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SystemNotification {
  id: string;
  type: 'review' | 'appreciation' | 'badge' | 'proposal' | 'guild' | 'mention' | 'system';
  title: string;
  message: string;
  actionUrl?: string;
  actionLabel?: string;
  read: boolean;
  timestamp: Date;
  metadata?: {
    artworkId?: string;
    proposalId?: string;
    guildId?: string;
    badgeId?: string;
    userId?: string;
  };
}
