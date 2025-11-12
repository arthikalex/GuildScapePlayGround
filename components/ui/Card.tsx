import { ReactNode, HTMLAttributes } from 'react'
import clsx from 'clsx'
import { QualityRating } from '@/data/mockData'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hover?: boolean
  ceremonial?: boolean
}

export function Card({ children, hover = false, ceremonial = false, className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        hover ? 'card-hover' : 'card',
        ceremonial && 'ceremonial-border',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface ArtworkCardProps {
  title: string
  artistName: string
  quality: QualityRating
  imageUrl: string
  views: number
  favorites: number
  onFavorite?: () => void
  isFavorited?: boolean
  onClick?: () => void
}

export function ArtworkCard({
  title,
  artistName,
  quality,
  imageUrl,
  views,
  favorites,
  onFavorite,
  isFavorited = false,
  onClick,
}: ArtworkCardProps) {
  const qualityColors = {
    Standard: 'border-medieval-green',
    Excellent: 'border-medieval-blue',
    Exceptional: 'border-brand-purple',
    Innovation: 'border-medieval-gold',
  }

  const qualityGlow = {
    Standard: 'shadow-[0_0_10px_rgba(16,185,129,0.3)]',
    Excellent: 'shadow-[0_0_10px_rgba(59,130,246,0.3)]',
    Exceptional: 'shadow-[0_0_15px_rgba(139,92,246,0.4)]',
    Innovation: 'shadow-[0_0_20px_rgba(245,158,11,0.5)]',
  }

  return (
    <div
      className={clsx(
        'card-hover relative overflow-hidden cursor-pointer group',
        'border-[3px]',
        qualityColors[quality],
        qualityGlow[quality]
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      aria-label={`View artwork: ${title} by ${artistName}, quality rating: ${quality}`}
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={`Artwork titled "${title}" by ${artistName}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Quality stamp on back */}
      <div className="absolute top-2 right-2 bg-parchment px-2 py-1 rounded shadow-md border border-guild-wood/30">
        <span className="text-xs font-semibold text-guild-wood">{quality}</span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 text-guild-wood">{title}</h3>
        <p className="text-sm text-gray-600 mb-3">by {artistName}</p>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span aria-hidden="true">👁️</span>
              <span className="sr-only">Views:</span>
              {views}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onFavorite?.()
              }}
              className={clsx(
                'flex items-center gap-1 transition-colors',
                isFavorited ? 'text-wax-red' : 'hover:text-wax-red'
              )}
              aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              <span aria-hidden="true">{isFavorited ? '❤️' : '🤍'}</span>
              <span className="sr-only">Favorites:</span>
              {favorites}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ProposalCardProps {
  title: string
  category: string
  votePercentage: number
  totalVotes: number
  votingEnds: string
  status: string
  onClick?: () => void
}

export function ProposalCard({
  title,
  category,
  votePercentage,
  totalVotes,
  votingEnds,
  status,
  onClick,
}: ProposalCardProps) {
  const statusColors = {
    voting: 'bg-medieval-blue',
    passed: 'bg-medieval-green',
    rejected: 'bg-wax-red',
    upcoming: 'bg-gray-400',
  }

  const daysUntil = Math.ceil(
    (new Date(votingEnds).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  )

  return (
    <div
      className="card-hover cursor-pointer group relative overflow-hidden"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      aria-label={`View proposal: ${title}, ${votePercentage}% approval, ${totalVotes} votes`}
    >
      {/* Scroll/seal decoration */}
      <div className="absolute -top-2 -right-2 w-12 h-12 wax-seal rotate-12 opacity-80" />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-guild-wood/10 text-guild-wood mb-2">
              {category}
            </span>
            <h3 className="font-semibold text-lg text-guild-wood-dark">{title}</h3>
          </div>
          <div className={clsx('px-2 py-1 rounded-full text-xs font-medium text-white', statusColors[status as keyof typeof statusColors])}>
            {status}
          </div>
        </div>

        {/* Vote progress */}
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Approval</span>
            <span className="font-semibold text-guild-wood">{votePercentage}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${votePercentage}%` }}
              role="progressbar"
              aria-valuenow={votePercentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${votePercentage}% approval`}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between text-sm text-gray-500">
          <span>{totalVotes} votes</span>
          {status === 'voting' && (
            <span className="font-medium">
              {daysUntil > 0 ? `${daysUntil} days left` : 'Ending soon'}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

interface BadgeCardProps {
  name: string
  description: string
  rarity: string
  icon: string
  earnedDate?: string
  progress?: number
  requirements: string
  heldByPercentage: number
  isEarned: boolean
}

export function BadgeCard({
  name,
  description,
  rarity,
  icon,
  earnedDate,
  progress,
  requirements,
  heldByPercentage,
  isEarned,
}: BadgeCardProps) {
  const rarityColors = {
    Common: 'border-gray-400 bg-gray-50',
    Uncommon: 'border-medieval-green bg-medieval-green/5',
    Rare: 'border-medieval-blue bg-medieval-blue/5',
    Epic: 'border-brand-purple bg-brand-purple/5',
    Legendary: 'border-medieval-gold bg-medieval-gold/5',
  }

  return (
    <div
      className={clsx(
        'card p-4 border-2 transition-all duration-300 hover:shadow-candlelight-lg',
        rarityColors[rarity as keyof typeof rarityColors],
        !isEarned && 'opacity-60 grayscale',
        isEarned && rarity === 'Legendary' && 'badge-shimmer'
      )}
      role="listitem"
    >
      {/* Icon and title */}
      <div className="flex items-start gap-3 mb-3">
        <div className="text-4xl" aria-hidden="true">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-guild-wood-dark">{name}</h3>
          <span className={clsx(
            'text-xs font-medium px-2 py-0.5 rounded',
            rarity === 'Legendary' && 'bg-medieval-gold text-white',
            rarity === 'Epic' && 'bg-brand-purple text-white',
            rarity === 'Rare' && 'bg-medieval-blue text-white',
            rarity === 'Uncommon' && 'bg-medieval-green text-white',
            rarity === 'Common' && 'bg-gray-400 text-white'
          )}>
            {rarity}
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-700 mb-3">{description}</p>

      {/* Earned info or progress */}
      {isEarned && earnedDate ? (
        <div className="text-xs text-gray-500 space-y-1">
          <p>
            <span className="font-medium">Earned:</span> {new Date(earnedDate).toLocaleDateString()}
          </p>
          <p>
            <span className="font-medium">Held by:</span> {heldByPercentage}% of members
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-xs text-gray-600">
            <span className="font-medium">Requirements:</span> {requirements}
          </p>
          {progress !== undefined && progress > 0 && (
            <div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${progress}% complete`}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{progress}% complete</p>
            </div>
          )}
          <p className="text-xs text-gray-500">
            <span className="font-medium">Held by:</span> {heldByPercentage}% of members
          </p>
        </div>
      )}
    </div>
  )
}
