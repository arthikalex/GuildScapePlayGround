'use client'

import { useState } from 'react'
import {
  currentUser,
  mockUsers,
  mockArtworks,
  mockProposals,
  mockBadges,
  mockForumThreads,
  mockRevenueData,
  mockTrafficSources,
  mockDailyViews,
  type User,
  type Artwork,
  type Proposal,
  type Badge,
  type ForumThread,
  type TierLevel,
  type ProposalStatus,
} from '@/data/mockData'

// Hook for current user data
export function useCurrentUser() {
  const [user] = useState(currentUser)
  return user
}

// Hook for reputation data
export function useReputationData() {
  const user = useCurrentUser()

  const getReputationProgress = () => {
    const dimensions = [
      { name: 'Artwork Quality', value: user.reputationDimensions.artworkQuality, max: 500, color: '#8B5CF6' },
      { name: 'Community Engagement', value: user.reputationDimensions.communityEngagement, max: 500, color: '#10B981' },
      { name: 'Peer Review', value: user.reputationDimensions.peerReview, max: 500, color: '#3B82F6' },
      { name: 'Exhibition', value: user.reputationDimensions.exhibition, max: 500, color: '#F59E0B' },
      { name: 'Mentorship', value: user.reputationDimensions.mentorship, max: 500, color: '#DC143C' },
      { name: 'Platform Dev', value: user.reputationDimensions.platformDev, max: 500, color: '#8B4513' },
    ]
    return dimensions
  }

  const getTierProgress = () => {
    const tiers: { tier: TierLevel; min: number; max: number }[] = [
      { tier: 'Patron', min: 0, max: 499 },
      { tier: 'Apprentice', min: 500, max: 999 },
      { tier: 'Maker', min: 1000, max: 1499 },
      { tier: 'Artisan', min: 1500, max: 1999 },
      { tier: 'Elder', min: 2000, max: 9999 },
    ]

    const currentTierIndex = tiers.findIndex(t => t.tier === user.tier)
    const currentTier = tiers[currentTierIndex]
    const nextTier = currentTierIndex < tiers.length - 1 ? tiers[currentTierIndex + 1] : null

    return {
      currentTier,
      nextTier,
      progress: nextTier ? ((user.reputation - currentTier.min) / (nextTier.min - currentTier.min)) * 100 : 100,
      pointsToNext: nextTier ? nextTier.min - user.reputation : 0,
    }
  }

  return {
    reputation: user.reputation,
    dimensions: getReputationProgress(),
    tierProgress: getTierProgress(),
  }
}

// Hook for proposal data
export function useProposalData() {
  const [proposals, setProposals] = useState(mockProposals)
  const [votedProposals, setVotedProposals] = useState<Set<string>>(new Set())

  const getProposalsByStatus = (status: ProposalStatus) => {
    return proposals.filter(p => p.status === status)
  }

  const voteOnProposal = (proposalId: string, vote: 'approve' | 'reject') => {
    setProposals(prev =>
      prev.map(p => {
        if (p.id === proposalId) {
          const newTotalVotes = p.totalVotes + 1
          const voteValue = vote === 'approve' ? 1 : 0
          const newApprovalVotes = Math.round((p.votePercentage / 100) * p.totalVotes) + voteValue
          const newPercentage = Math.round((newApprovalVotes / newTotalVotes) * 100)

          return {
            ...p,
            totalVotes: newTotalVotes,
            votePercentage: newPercentage,
          }
        }
        return p
      })
    )
    setVotedProposals(prev => new Set(prev).add(proposalId))
  }

  const hasVoted = (proposalId: string) => votedProposals.has(proposalId)

  return {
    proposals,
    getProposalsByStatus,
    voteOnProposal,
    hasVoted,
    votingProposals: getProposalsByStatus('voting'),
    upcomingProposals: getProposalsByStatus('upcoming'),
  }
}

// Hook for gallery/artwork data
export function useGalleryData() {
  const [artworks] = useState(mockArtworks)
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['art-1', 'art-7', 'art-14']))

  const getArtworksByUser = (userId: string) => {
    return artworks.filter(a => a.artistId === userId)
  }

  const getArtworksByStatus = (status: 'review' | 'approved' | 'gallery') => {
    return artworks.filter(a => a.status === status)
  }

  const getArtworksByQuality = (quality: string) => {
    return artworks.filter(a => a.quality === quality)
  }

  const toggleFavorite = (artworkId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(artworkId)) {
        newFavorites.delete(artworkId)
      } else {
        newFavorites.add(artworkId)
      }
      return newFavorites
    })
  }

  const isFavorite = (artworkId: string) => favorites.has(artworkId)

  const getTopPerformers = () => {
    return [...artworks]
      .filter(a => a.status === 'gallery')
      .sort((a, b) => b.conversionRate - a.conversionRate)
      .slice(0, 5)
  }

  return {
    artworks,
    getArtworksByUser,
    getArtworksByStatus,
    getArtworksByQuality,
    toggleFavorite,
    isFavorite,
    getTopPerformers,
    reviewArtworks: getArtworksByStatus('review'),
    galleryArtworks: getArtworksByStatus('gallery'),
  }
}

// Hook for forum data
export function useForumData() {
  const [threads] = useState(mockForumThreads)
  const [upvotedPosts, setUpvotedPosts] = useState<Set<string>>(new Set())

  const getThreadsByCategory = (category: string) => {
    return threads.filter(t => t.category === category)
  }

  const getThread = (threadId: string) => {
    return threads.find(t => t.id === threadId)
  }

  const toggleUpvote = (postId: string) => {
    setUpvotedPosts(prev => {
      const newUpvoted = new Set(prev)
      if (newUpvoted.has(postId)) {
        newUpvoted.delete(postId)
      } else {
        newUpvoted.add(postId)
      }
      return newUpvoted
    })
  }

  const hasUpvoted = (postId: string) => upvotedPosts.has(postId)

  const categories = ['All', 'Technique', 'Business', 'Exhibition', 'Materials', 'Inspiration', 'Community', 'Guild Process', 'Studio Practice']

  return {
    threads,
    getThreadsByCategory,
    getThread,
    toggleUpvote,
    hasUpvoted,
    categories,
    pinnedThreads: threads.filter(t => t.isPinned),
  }
}

// Hook for badge data
export function useBadgeData() {
  const user = useCurrentUser()
  const [badges] = useState(mockBadges)

  const earnedBadges = badges.filter(b => user.badges.includes(b.id))
  const unearnedBadges = badges.filter(b => !user.badges.includes(b.id))

  const getBadgesByCategory = (category: string) => {
    return badges.filter(b => b.category === category)
  }

  const getBadgesByRarity = (rarity: string) => {
    return badges.filter(b => b.rarity === rarity)
  }

  const getRecentBadges = () => {
    return earnedBadges
      .filter(b => b.earnedDate)
      .sort((a, b) => new Date(b.earnedDate!).getTime() - new Date(a.earnedDate!).getTime())
      .slice(0, 3)
  }

  const badgeCategories = ['All', 'Membership', 'Creation', 'Community', 'Mastery', 'Recognition', 'Governance', 'Commerce', 'Progress', 'Education', 'Development', 'Growth', 'Achievement']

  return {
    badges,
    earnedBadges,
    unearnedBadges,
    getBadgesByCategory,
    getBadgesByRarity,
    getRecentBadges,
    badgeCategories,
    earnedCount: earnedBadges.length,
    totalCount: badges.length,
  }
}

// Hook for treasury/analytics data
export function useTreasuryData() {
  const [revenueData] = useState(mockRevenueData)
  const [trafficSources] = useState(mockTrafficSources)
  const [dailyViews] = useState(mockDailyViews)

  const getTotalRevenue = () => {
    return revenueData.months.reduce((sum, month) => sum + month.totalRevenue, 0) + revenueData.thisMonth.revenue
  }

  const getAverageMonthlyRevenue = () => {
    const total = revenueData.months.reduce((sum, month) => sum + month.totalRevenue, 0)
    return Math.round(total / revenueData.months.length)
  }

  const getRevenueGrowth = () => {
    const months = revenueData.months
    if (months.length < 2) return 0
    const lastMonth = months[months.length - 1].totalRevenue
    const previousMonth = months[months.length - 2].totalRevenue
    return Math.round(((lastMonth - previousMonth) / previousMonth) * 100)
  }

  return {
    revenueData,
    trafficSources,
    dailyViews,
    getTotalRevenue,
    getAverageMonthlyRevenue,
    getRevenueGrowth,
    thisMonth: revenueData.thisMonth,
  }
}

// Hook for user profile data
export function useUserProfile(userId?: string) {
  const targetUserId = userId || currentUser.id
  const [user] = useState(mockUsers.find(u => u.id === targetUserId) || currentUser)
  const [badges] = useState(mockBadges.filter(b => user.badges.includes(b.id)))

  const getTopBadges = () => {
    const rarityOrder = { 'Legendary': 5, 'Epic': 4, 'Rare': 3, 'Uncommon': 2, 'Common': 1 }
    return badges
      .sort((a, b) => rarityOrder[b.rarity] - rarityOrder[a.rarity])
      .slice(0, 3)
  }

  return {
    user,
    badges,
    topBadges: getTopBadges(),
    artworkCount: mockArtworks.filter(a => a.artistId === user.id).length,
  }
}
