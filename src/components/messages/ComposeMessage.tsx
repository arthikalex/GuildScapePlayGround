import React, { useState } from 'react';
import { Modal } from '@components/common/Modal';
import { Input, Textarea } from '@components/common/Input';
import { Search, X } from 'lucide-react';
import { useMessageStore } from '@store/messageStore';
import { useUserStore } from '@store/userStore';
import toast from 'react-hot-toast';
import clsx from 'clsx';

interface ComposeMessageProps {
  isOpen: boolean;
  onClose: () => void;
  onConversationCreated?: (conversationId: string) => void;
}

// Mock user search - in production this would query the backend
const mockUsers = [
  {
    userId: 'user-042',
    name: 'Marcus Elder',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    tier: 'Artisan',
  },
  {
    userId: 'user-103',
    name: 'Sarah Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    tier: 'Maker',
  },
  {
    userId: 'user-305',
    name: 'Maya Patel',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya',
    tier: 'Artisan',
  },
];

export const ComposeMessage: React.FC<ComposeMessageProps> = ({
  isOpen,
  onClose,
  onConversationCreated,
}) => {
  const { currentUser } = useUserStore();
  const { createConversation, conversations } = useMessageStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);
  const [message, setMessage] = useState('');

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      user.userId !== currentUser?.id
  );

  const handleSend = () => {
    if (!selectedUser || !message.trim() || !currentUser) {
      toast.error('Please select a recipient and enter a message');
      return;
    }

    // Check if conversation already exists
    const existingConv = conversations.find((conv) =>
      conv.participants.some((p) => p.userId === selectedUser.userId)
    );

    if (existingConv) {
      toast.error('You already have a conversation with this user');
      onConversationCreated?.(existingConv.id);
      handleClose();
      return;
    }

    // Create new conversation
    const newConv = createConversation(
      [
        {
          userId: currentUser.id,
          name: currentUser.name,
          avatar: currentUser.avatar,
          tier: currentUser.tier,
        },
        selectedUser,
      ],
      message.trim(),
      currentUser.id,
      currentUser.name,
      currentUser.avatar
    );

    toast.success(`Message sent to ${selectedUser.name}!`);
    onConversationCreated?.(newConv.id);
    handleClose();
  };

  const handleClose = () => {
    setSearchQuery('');
    setSelectedUser(null);
    setMessage('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="New Message" size="lg">
      <div className="space-y-6">
        {/* Recipient Selection */}
        <div>
          <label className="block text-sm font-display font-semibold text-burnt-umber mb-2">
            To:
          </label>

          {selectedUser ? (
            <div className="flex items-center justify-between p-3 bg-gold/20 rounded-lg border-2 border-gold/30">
              <div className="flex items-center gap-3">
                <img
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  className="w-10 h-10 rounded-full border-2 border-burnt-umber"
                />
                <div>
                  <div className="font-display font-semibold text-burnt-umber">
                    {selectedUser.name}
                  </div>
                  <div className="text-xs text-gold">{selectedUser.tier}</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="w-8 h-8 rounded-full hover:bg-burnt-umber/10 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-burnt-umber" />
              </button>
            </div>
          ) : (
            <>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-burnt-umber/40" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for artisans..."
                  className="pl-10"
                />
              </div>

              {searchQuery && (
                <div className="max-h-60 overflow-y-auto scrollbar-medieval border-2 border-burnt-umber/20 rounded-lg">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <button
                        key={user.userId}
                        onClick={() => setSelectedUser(user)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-parchment transition-colors"
                      >
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full border-2 border-burnt-umber"
                        />
                        <div className="text-left">
                          <div className="font-display font-semibold text-burnt-umber">
                            {user.name}
                          </div>
                          <div className="text-xs text-gold">{user.tier}</div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-6 text-center text-burnt-umber/60">
                      No users found
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Message Input */}
        <div>
          <label className="block text-sm font-display font-semibold text-burnt-umber mb-2">
            Message:
          </label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message..."
            rows={6}
            disabled={!selectedUser}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button onClick={handleClose} className="btn-secondary">
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={!selectedUser || !message.trim()}
            className={clsx(
              'btn-primary',
              (!selectedUser || !message.trim()) && 'opacity-50 cursor-not-allowed'
            )}
          >
            Send Message
          </button>
        </div>
      </div>
    </Modal>
  );
};
