'use client'

import { useState } from 'react'
import { useForumData, useUserProfile } from '@/hooks/useGuildData'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { TextArea } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { TierMedallion } from '@/components/ui/ProgressWheel'
import clsx from 'clsx'

export default function ForumCourtyard() {
  const { threads, getThreadsByCategory, getThread, toggleUpvote, hasUpvoted, categories, pinnedThreads } = useForumData()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null)
  const [isNewThreadModalOpen, setIsNewThreadModalOpen] = useState(false)
  const [replyingToPostId, setReplyingToPostId] = useState<string | null>(null)

  const filteredThreads = selectedCategory === 'All' ? threads : getThreadsByCategory(selectedCategory)
  const selectedThread = selectedThreadId ? getThread(selectedThreadId) : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-parchment to-parchment-dark">
      {/* Header */}
      <section className="bg-gradient-to-r from-medieval-blue/10 to-medieval-green/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-guild-wood-dark mb-2 flex items-center gap-3">
                <span className="text-5xl" aria-hidden="true">💬</span>
                The Forum Courtyard
              </h1>
              <p className="text-lg text-gray-600">Where guild members gather to share and learn</p>
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={() => setIsNewThreadModalOpen(true)}
              className="flex items-center gap-2"
            >
              <span aria-hidden="true">➕</span>
              New Thread
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={clsx(
                'px-4 py-2 rounded-lg font-medium transition-all',
                selectedCategory === category
                  ? 'bg-brand-purple text-white'
                  : 'bg-parchment-dark text-guild-wood hover:bg-guild-wood/10'
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Pinned Threads */}
        {selectedCategory === 'All' && pinnedThreads.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-guild-wood-dark mb-4 flex items-center gap-2">
              <span aria-hidden="true">📌</span>
              Pinned Discussions
            </h2>
            <div className="space-y-3">
              {pinnedThreads.map((thread) => (
                <ThreadCard
                  key={thread.id}
                  thread={thread}
                  onClick={() => setSelectedThreadId(thread.id)}
                  isPinned
                />
              ))}
            </div>
          </div>
        )}

        {/* Thread List */}
        <div className="space-y-3">
          {filteredThreads
            .filter(t => !t.isPinned || selectedCategory !== 'All')
            .map((thread) => (
              <ThreadCard
                key={thread.id}
                thread={thread}
                onClick={() => setSelectedThreadId(thread.id)}
              />
            ))}
        </div>

        {filteredThreads.length === 0 && (
          <Card className="p-12 text-center">
            <div className="text-6xl mb-4" aria-hidden="true">💭</div>
            <h3 className="text-xl font-semibold text-guild-wood-dark mb-2">No threads in this category</h3>
            <p className="text-gray-600 mb-6">Be the first to start a discussion!</p>
            <Button variant="primary" onClick={() => setIsNewThreadModalOpen(true)}>
              Start a Thread
            </Button>
          </Card>
        )}
      </div>

      {/* Thread Detail Modal */}
      {selectedThread && (
        <Modal
          isOpen={!!selectedThreadId}
          onClose={() => {
            setSelectedThreadId(null)
            setReplyingToPostId(null)
          }}
          title={selectedThread.title}
          size="xl"
        >
          <div className="space-y-6">
            {/* Thread metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 pb-4 border-b border-guild-wood/20">
              <span className="px-2 py-1 bg-guild-wood/10 rounded font-medium">{selectedThread.category}</span>
              <span>by {selectedThread.authorName}</span>
              <span>{new Date(selectedThread.createdDate).toLocaleDateString()}</span>
              <span>👁️ {selectedThread.views} views</span>
              <span>💬 {selectedThread.replyCount} replies</span>
            </div>

            {/* Original post */}
            {selectedThread.posts.map((post) => (
              <div key={post.id}>
                <PostCard
                  post={post}
                  onUpvote={() => toggleUpvote(post.id)}
                  hasUpvoted={hasUpvoted(post.id)}
                  onReply={() => setReplyingToPostId(post.id)}
                />

                {/* Replies */}
                {post.replies && post.replies.length > 0 && (
                  <div className="ml-8 mt-4 space-y-4 border-l-2 border-guild-wood/20 pl-4">
                    {post.replies.map((reply) => (
                      <PostCard
                        key={reply.id}
                        post={reply}
                        onUpvote={() => toggleUpvote(reply.id)}
                        hasUpvoted={hasUpvoted(reply.id)}
                        isReply
                      />
                    ))}
                  </div>
                )}

                {/* Reply form */}
                {replyingToPostId === post.id && (
                  <div className="ml-8 mt-4 border-l-2 border-brand-purple pl-4">
                    <TextArea
                      placeholder="Write your reply..."
                      rows={3}
                      className="mb-2"
                    />
                    <div className="flex gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          alert('Reply functionality (demo only)')
                          setReplyingToPostId(null)
                        }}
                      >
                        Post Reply
                      </Button>
                      <Button
                        variant="parchment"
                        size="sm"
                        onClick={() => setReplyingToPostId(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* New Thread Modal */}
      <Modal
        isOpen={isNewThreadModalOpen}
        onClose={() => setIsNewThreadModalOpen(false)}
        title="Start a New Thread"
        size="lg"
        footer={
          <>
            <Button variant="parchment" onClick={() => setIsNewThreadModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                alert('Create thread functionality (demo only)')
                setIsNewThreadModalOpen(false)
              }}
            >
              Create Thread
            </Button>
          </>
        }
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-guild-wood-dark mb-2">
              Thread Title
            </label>
            <input
              type="text"
              className="input"
              placeholder="Enter a clear, descriptive title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-guild-wood-dark mb-2">
              Category
            </label>
            <select className="input">
              {categories.filter(c => c !== 'All').map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-guild-wood-dark mb-2">
              Content
            </label>
            <TextArea placeholder="Share your thoughts, questions, or insights..." rows={6} />
          </div>

          <div className="bg-medieval-blue/10 border border-medieval-blue/30 rounded-lg p-4 text-sm">
            <div className="font-semibold text-medieval-blue mb-2">💡 Thread Guidelines</div>
            <ul className="text-gray-700 space-y-1 text-xs">
              <li>• Be respectful and constructive in your discussions</li>
              <li>• Stay on topic and provide context for your questions</li>
              <li>• Search for existing threads before creating duplicates</li>
              <li>• Use clear, descriptive titles to help others find your thread</li>
            </ul>
          </div>
        </form>
      </Modal>
    </div>
  )
}

// Thread Card Component
function ThreadCard({
  thread,
  onClick,
  isPinned = false,
}: {
  thread: any
  onClick: () => void
  isPinned?: boolean
}) {
  const { user } = useUserProfile(thread.authorId)

  return (
    <Card
      hover
      className="p-5 cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <div className="flex items-start gap-4">
        {/* Author avatar */}
        <TierMedallion tier={user.tier} size="md" />

        {/* Thread content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-bold text-lg text-guild-wood-dark group-hover:text-brand-purple">
              {isPinned && <span className="text-wax-red mr-2" aria-label="Pinned">📌</span>}
              {thread.title}
            </h3>
            <span className="px-2 py-1 bg-guild-wood/10 rounded text-xs font-medium flex-shrink-0">
              {thread.category}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span className="font-medium text-guild-wood">{thread.authorName}</span>
            <span>•</span>
            <span>{new Date(thread.createdDate).toLocaleDateString()}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span aria-hidden="true">💬</span>
              {thread.replyCount} replies
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span aria-hidden="true">👁️</span>
              {thread.views} views
            </span>
          </div>

          <div className="text-xs text-gray-500 mt-2">
            Last activity: {new Date(thread.lastActivity).toLocaleDateString()}
          </div>
        </div>
      </div>
    </Card>
  )
}

// Post Card Component
function PostCard({
  post,
  onUpvote,
  hasUpvoted,
  onReply,
  isReply = false,
}: {
  post: any
  onUpvote: () => void
  hasUpvoted: boolean
  onReply?: () => void
  isReply?: boolean
}) {
  const { user, topBadges } = useUserProfile(post.authorId)

  return (
    <div className={clsx('bg-parchment-dark rounded-lg p-5', !isReply && 'border-2 border-guild-wood/20')}>
      {/* Post header */}
      <div className="flex items-start gap-4 mb-4">
        <TierMedallion tier={user.tier} size="md" />
        <div className="flex-1">
          <div className="font-semibold text-guild-wood-dark">{post.authorName}</div>
          <div className="text-xs text-gray-600">{user.tier} • {user.reputation} Rep</div>
          <div className="flex gap-1 mt-1">
            {topBadges.map((badge) => (
              <span key={badge.id} className="text-sm" title={badge.name} aria-label={badge.name}>
                {badge.icon}
              </span>
            ))}
          </div>
        </div>
        <div className="text-xs text-gray-500">
          {new Date(post.createdDate).toLocaleDateString()}
        </div>
      </div>

      {/* Post content */}
      <div className="prose prose-sm max-w-none mb-4 text-gray-700 leading-relaxed">
        {post.content}
      </div>

      {/* Post actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onUpvote()
          }}
          className={clsx(
            'flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-sm font-medium',
            hasUpvoted
              ? 'bg-wax-red/20 text-wax-red'
              : 'bg-parchment hover:bg-guild-wood/10 text-guild-wood'
          )}
          aria-label={hasUpvoted ? 'Remove upvote' : 'Upvote post'}
        >
          <span className="wax-seal w-6 h-6 flex items-center justify-center text-xs">
            {hasUpvoted ? '♥' : '♡'}
          </span>
          <span>{post.upvotes + (hasUpvoted ? 1 : 0)}</span>
        </button>

        {onReply && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onReply()
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-parchment hover:bg-guild-wood/10 text-guild-wood transition-all text-sm font-medium"
            aria-label="Reply to post"
          >
            <span aria-hidden="true">✍️</span>
            Reply
          </button>
        )}
      </div>
    </div>
  )
}
