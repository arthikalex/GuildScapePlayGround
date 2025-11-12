'use client'

import Link from 'next/link'
import { useCurrentUser, useReputationData, useProposalData, useBadgeData } from '@/hooks/useGuildData'
import { ProgressWheel, TierMedallion, ProgressBar } from '@/components/ui/ProgressWheel'
import { Card, ProposalCard } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import clsx from 'clsx'

const portalRooms = [
  { name: 'Workshop', path: '/workshop', icon: '🎨', description: 'Manage your artworks' },
  { name: 'Council Chamber', path: '/council', icon: '⚖️', description: 'Vote on proposals' },
  { name: 'Library', path: '/library', icon: '📚', description: 'Learn and grow' },
  { name: 'Treasury', path: '/treasury', icon: '💰', description: 'View analytics' },
  { name: 'Forum Courtyard', path: '/forum', icon: '💬', description: 'Join discussions' },
]

export default function GreatHall() {
  const user = useCurrentUser()
  const { dimensions, tierProgress } = useReputationData()
  const { votingProposals } = useProposalData()
  const { getRecentBadges } = useBadgeData()
  const recentBadges = getRecentBadges()

  return (
    <div className="min-h-screen bg-gradient-to-b from-parchment to-parchment-dark">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl animate-pulse-slow" aria-hidden="true">
            🕯️
          </div>
          <div className="absolute top-20 right-20 text-6xl animate-pulse-slow delay-100" aria-hidden="true">
            🕯️
          </div>
          <div className="absolute bottom-10 left-1/4 text-6xl animate-pulse-slow delay-200" aria-hidden="true">
            🕯️
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-guild-wood-dark mb-4">
              Welcome to the Great Hall
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The heart of the guild, where artisans gather, reputation grows, and new journeys begin
            </p>
          </div>

          {/* Personal Shield Display */}
          <Card className="max-w-4xl mx-auto mb-12 p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <TierMedallion tier={user.tier} size="lg" />
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold text-guild-wood-dark mb-2">{user.name}</h2>
                <p className="text-lg text-gray-600 mb-4">{user.tier} of the Guild</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-brand-purple">{user.reputation}</div>
                    <div className="text-sm text-gray-600">Reputation</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-medieval-gold">{user.badges.length}</div>
                    <div className="text-sm text-gray-600">Badges</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-medieval-green">{user.tier}</div>
                    <div className="text-sm text-gray-600">Tier</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tier Progress */}
            {tierProgress.nextTier && (
              <div className="mt-6 pt-6 border-t border-guild-wood/20">
                <ProgressBar
                  value={user.reputation - tierProgress.currentTier.min}
                  max={tierProgress.nextTier.min - tierProgress.currentTier.min}
                  label={`Progress to ${tierProgress.nextTier.tier}`}
                  showPercentage
                  color="#8B5CF6"
                />
                <p className="text-sm text-gray-600 mt-2 text-center">
                  {tierProgress.pointsToNext} reputation points until {tierProgress.nextTier.tier}
                </p>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Progress Tapestry */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Wheel */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-guild-wood-dark mb-6 flex items-center gap-2">
                <span aria-hidden="true">📊</span>
                Progress Tapestry
              </h2>
              <ProgressWheel dimensions={dimensions} size="md" />
            </Card>

            {/* Notice Board: Active Proposals */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-guild-wood-dark flex items-center gap-2">
                  <span aria-hidden="true">📜</span>
                  Notice Board
                </h2>
                <Link href="/council">
                  <Button variant="parchment" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {votingProposals.slice(0, 4).map((proposal) => (
                  <ProposalCard
                    key={proposal.id}
                    title={proposal.title}
                    category={proposal.category}
                    votePercentage={proposal.votePercentage}
                    totalVotes={proposal.totalVotes}
                    votingEnds={proposal.votingEnds}
                    status={proposal.status}
                    onClick={() => {
                      window.location.href = `/council?proposal=${proposal.id}`
                    }}
                  />
                ))}
              </div>
              {votingProposals.length === 0 && (
                <p className="text-center text-gray-500 py-8">No active proposals at this time</p>
              )}
            </Card>

            {/* Recent Achievements */}
            {recentBadges.length > 0 && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-guild-wood-dark flex items-center gap-2">
                    <span aria-hidden="true">🏆</span>
                    Recent Achievements
                  </h2>
                  <Link href="/library">
                    <Button variant="parchment" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {recentBadges.map((badge) => (
                    <div
                      key={badge.id}
                      className="text-center p-4 rounded-lg bg-parchment-dark hover:shadow-md transition-shadow"
                    >
                      <div className="text-4xl mb-2" aria-hidden="true">
                        {badge.icon}
                      </div>
                      <div className="text-sm font-medium text-guild-wood">{badge.name}</div>
                      {badge.earnedDate && (
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(badge.earnedDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Right Column: Navigation Portals */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-guild-wood-dark flex items-center gap-2">
              <span aria-hidden="true">🚪</span>
              Guild Spaces
            </h2>
            {portalRooms.map((room) => (
              <Link key={room.path} href={room.path}>
                <Card
                  hover
                  className={clsx(
                    'p-6 cursor-pointer group relative overflow-hidden',
                    'transform transition-all duration-300 hover:scale-105'
                  )}
                  role="button"
                  tabIndex={0}
                  aria-label={`Navigate to ${room.name}: ${room.description}`}
                >
                  {/* Decorative door frame */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity border-4 border-guild-wood/30 rounded-lg"
                    aria-hidden="true"
                  />

                  <div className="relative flex items-center gap-4">
                    <div className="text-4xl" aria-hidden="true">
                      {room.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-guild-wood-dark group-hover:text-brand-purple transition-colors">
                        {room.name}
                      </h3>
                      <p className="text-sm text-gray-600">{room.description}</p>
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-guild-wood/30 group-hover:text-brand-purple group-hover:translate-x-1 transition-all">
                    →
                  </div>
                </Card>
              </Link>
            ))}

            {/* Quick Stats */}
            <Card className="p-6 bg-gradient-to-br from-brand-purple/5 to-medieval-blue/5">
              <h3 className="font-bold text-lg text-guild-wood-dark mb-4">Guild Activity</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Proposals</span>
                  <span className="font-semibold text-brand-purple">{votingProposals.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Your Badges</span>
                  <span className="font-semibold text-medieval-gold">{user.badges.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-semibold text-gray-700">
                    {new Date(user.joinDate).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
