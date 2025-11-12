'use client'

import { useState } from 'react'
import { useCurrentUser } from '@/hooks/useGuildData'
import { TierMedallion } from '@/components/ui/ProgressWheel'
import clsx from 'clsx'

export function PersonalShield() {
  const user = useCurrentUser()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-parchment-dark transition-all focus-visible-ring"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-label={`User profile: ${user.name}, ${user.tier} tier, ${user.reputation} reputation`}
      >
        <TierMedallion tier={user.tier} size="sm" />
        <div className="hidden sm:block text-left">
          <div className="text-sm font-semibold text-guild-wood-dark">{user.name}</div>
          <div className="text-xs text-gray-600">{user.reputation} Rep</div>
        </div>
        <span
          className={clsx(
            'text-gray-400 transition-transform',
            isExpanded && 'rotate-180'
          )}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>

      {/* Dropdown */}
      {isExpanded && (
        <div className="absolute right-0 mt-2 w-64 bg-parchment rounded-lg shadow-candlelight-lg border-2 border-guild-wood/20 py-2 animate-scale-in">
          <div className="px-4 py-3 border-b border-guild-wood/20">
            <div className="flex items-center gap-3 mb-2">
              <TierMedallion tier={user.tier} size="md" />
              <div>
                <div className="font-semibold text-guild-wood-dark">{user.name}</div>
                <div className="text-sm text-gray-600">{user.tier}</div>
              </div>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-600">Reputation</span>
              <span className="font-semibold text-brand-purple">{user.reputation}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Badges</span>
              <span className="font-semibold text-medieval-gold">{user.badges.length}</span>
            </div>
          </div>

          <div className="py-1">
            <a
              href="/profile"
              className="block px-4 py-2 text-sm text-guild-wood hover:bg-parchment-dark transition-colors"
            >
              View Profile
            </a>
            <a
              href="/settings"
              className="block px-4 py-2 text-sm text-guild-wood hover:bg-parchment-dark transition-colors"
            >
              Settings
            </a>
            <a
              href="/help"
              className="block px-4 py-2 text-sm text-guild-wood hover:bg-parchment-dark transition-colors"
            >
              Help & Support
            </a>
          </div>

          <div className="border-t border-guild-wood/20 py-1">
            <button
              className="w-full text-left px-4 py-2 text-sm text-wax-red hover:bg-parchment-dark transition-colors"
              onClick={() => {
                // Logout logic would go here
                alert('Logout functionality (demo only)')
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
