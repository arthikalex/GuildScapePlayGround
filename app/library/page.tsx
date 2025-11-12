'use client'

import { useState } from 'react'
import { useBadgeData } from '@/hooks/useGuildData'
import { Card, BadgeCard } from '@/components/ui/Card'
import clsx from 'clsx'

type ViewMode = 'badges' | 'resources'

export default function Library() {
  const { badges, earnedBadges, unearnedBadges, getBadgesByCategory, badgeCategories, earnedCount, totalCount } = useBadgeData()
  const [viewMode, setViewMode] = useState<ViewMode>('badges')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showEarned, setShowEarned] = useState(true)
  const [showUnearned, setShowUnearned] = useState(true)

  const filteredBadges = badges.filter(badge => {
    const categoryMatch = selectedCategory === 'All' || badge.category === selectedCategory
    const earnedMatch = (showEarned && badge.earnedDate) || (showUnearned && !badge.earnedDate)
    return categoryMatch && earnedMatch
  })

  const completionPercentage = Math.round((earnedCount / totalCount) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-b from-parchment to-parchment-dark">
      {/* Header */}
      <section className="bg-gradient-to-r from-medieval-gold/10 to-brand-purple/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-guild-wood-dark mb-2 flex items-center gap-3">
            <span className="text-5xl" aria-hidden="true">📚</span>
            The Library
          </h1>
          <p className="text-lg text-gray-600 mb-6">Your journey of mastery and achievement</p>

          {/* Stats Card */}
          <Card className="p-6 bg-gradient-to-br from-parchment to-parchment-dark">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-purple">{earnedCount}</div>
                <div className="text-sm text-gray-600">Badges Earned</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-medieval-gold">{totalCount}</div>
                <div className="text-sm text-gray-600">Total Badges</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-medieval-green">{completionPercentage}%</div>
                <div className="text-sm text-gray-600">Completion</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-medieval-blue">{unearnedBadges.length}</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* View Mode Tabs */}
        <div className="flex gap-2 mb-6 border-b-2 border-guild-wood/20">
          {[
            { mode: 'badges' as ViewMode, label: 'Badge Collection', icon: '🏆' },
            { mode: 'resources' as ViewMode, label: 'Resources & Learning', icon: '📖' },
          ].map(({ mode, label, icon }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={clsx(
                'px-6 py-3 font-medium transition-all flex items-center gap-2',
                viewMode === mode
                  ? 'text-brand-purple border-b-4 border-brand-purple'
                  : 'text-guild-wood hover:text-brand-purple hover:bg-parchment-dark'
              )}
              aria-current={viewMode === mode ? 'page' : undefined}
            >
              <span aria-hidden="true">{icon}</span>
              {label}
            </button>
          ))}
        </div>

        {/* Badge Collection View */}
        {viewMode === 'badges' && (
          <div>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Category Filter */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-guild-wood-dark mb-2">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {badgeCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={clsx(
                        'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                        selectedCategory === category
                          ? 'bg-brand-purple text-white'
                          : 'bg-parchment-dark text-guild-wood hover:bg-guild-wood/10'
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Show/Hide Filter */}
              <div>
                <label className="block text-sm font-medium text-guild-wood-dark mb-2">
                  Display
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowEarned(!showEarned)}
                    className={clsx(
                      'px-4 py-1.5 rounded-lg text-sm font-medium transition-all',
                      showEarned
                        ? 'bg-medieval-green text-white'
                        : 'bg-parchment-dark text-guild-wood'
                    )}
                  >
                    ✓ Earned
                  </button>
                  <button
                    onClick={() => setShowUnearned(!showUnearned)}
                    className={clsx(
                      'px-4 py-1.5 rounded-lg text-sm font-medium transition-all',
                      showUnearned
                        ? 'bg-gray-400 text-white'
                        : 'bg-parchment-dark text-guild-wood'
                    )}
                  >
                    ○ Unearned
                  </button>
                </div>
              </div>
            </div>

            {/* Badges Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
              {filteredBadges.map((badge) => (
                <BadgeCard
                  key={badge.id}
                  name={badge.name}
                  description={badge.description}
                  rarity={badge.rarity}
                  icon={badge.icon}
                  earnedDate={badge.earnedDate}
                  progress={badge.progress}
                  requirements={badge.requirements}
                  heldByPercentage={badge.heldByPercentage}
                  isEarned={!!badge.earnedDate}
                />
              ))}
            </div>

            {filteredBadges.length === 0 && (
              <Card className="p-12 text-center">
                <div className="text-6xl mb-4" aria-hidden="true">🔍</div>
                <h3 className="text-xl font-semibold text-guild-wood-dark mb-2">
                  No badges match your filters
                </h3>
                <p className="text-gray-600">Try adjusting your category or display filters</p>
              </Card>
            )}
          </div>
        )}

        {/* Resources View */}
        {viewMode === 'resources' && (
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-guild-wood-dark mb-4 flex items-center gap-2">
                <span aria-hidden="true">📖</span>
                Mastery Chronicles
              </h2>
              <p className="text-gray-600 mb-6">
                Follow structured learning paths to develop your skills and earn recognition
              </p>

              {/* Learning Paths */}
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Artistic Foundation',
                    description: 'Master the fundamentals of visual composition and technique',
                    progress: 75,
                    badges: 8,
                    icon: '🎨',
                  },
                  {
                    title: 'Community Leadership',
                    description: 'Learn to mentor, guide, and build guild community',
                    progress: 45,
                    badges: 6,
                    icon: '🤝',
                  },
                  {
                    title: 'Business Mastery',
                    description: 'Develop skills in pricing, marketing, and sales',
                    progress: 60,
                    badges: 5,
                    icon: '💼',
                  },
                  {
                    title: 'Guild Governance',
                    description: 'Understand DAO mechanics and proposal creation',
                    progress: 30,
                    badges: 4,
                    icon: '⚖️',
                  },
                ].map((path, index) => (
                  <Card key={index} hover className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-3xl" aria-hidden="true">{path.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-guild-wood-dark">{path.title}</h3>
                        <p className="text-sm text-gray-600">{path.description}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-parchment-dark rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-brand-purple to-medieval-blue rounded-full transition-all duration-500"
                          style={{ width: `${path.progress}%` }}
                          role="progressbar"
                          aria-valuenow={path.progress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>{path.progress}% complete</span>
                        <span>{path.badges} badges available</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Guild Resources */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-guild-wood-dark mb-4 flex items-center gap-2">
                <span aria-hidden="true">📚</span>
                Guild Resources
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { title: 'Artist Handbook', category: 'Guide', icon: '📘' },
                  { title: 'Quality Standards', category: 'Documentation', icon: '⭐' },
                  { title: 'Pricing Workshop', category: 'Tutorial', icon: '💰' },
                  { title: 'Marketing Tips', category: 'Guide', icon: '📢' },
                  { title: 'Photography Guide', category: 'Tutorial', icon: '📸' },
                  { title: 'Governance FAQ', category: 'Documentation', icon: '❓' },
                ].map((resource, index) => (
                  <Card key={index} hover className="p-4 cursor-pointer">
                    <div className="text-2xl mb-2" aria-hidden="true">{resource.icon}</div>
                    <h3 className="font-semibold text-guild-wood-dark">{resource.title}</h3>
                    <p className="text-xs text-gray-500">{resource.category}</p>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6 bg-brand-purple/5">
              <h2 className="text-xl font-bold text-guild-wood-dark mb-4 flex items-center gap-2">
                <span aria-hidden="true">✨</span>
                Recent Guild Achievements
              </h2>
              <div className="space-y-3 text-sm">
                {[
                  { user: 'Marcus Chen', badge: 'Master Craftsperson', time: '2 hours ago' },
                  { user: 'Sophia Kowalski', badge: 'Community Builder', time: '5 hours ago' },
                  { user: 'Jamal Washington', badge: 'Innovation Pioneer', time: '1 day ago' },
                  { user: 'Akiko Tanaka', badge: 'Style Explorer', time: '2 days ago' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-parchment rounded-lg">
                    <div>
                      <span className="font-medium text-guild-wood">{activity.user}</span>
                      <span className="text-gray-600"> earned </span>
                      <span className="font-medium text-brand-purple">{activity.badge}</span>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
