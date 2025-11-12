'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PersonalShield } from './PersonalShield'
import clsx from 'clsx'

const navItems = [
  { name: 'Great Hall', path: '/', icon: '🏰' },
  { name: 'Workshop', path: '/workshop', icon: '🎨' },
  { name: 'Council', path: '/council', icon: '⚖️' },
  { name: 'Library', path: '/library', icon: '📚' },
  { name: 'Treasury', path: '/treasury', icon: '💰' },
  { name: 'Forum', path: '/forum', icon: '💬' },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-30 bg-parchment border-b-2 border-guild-wood/20 shadow-candlelight">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-guild-wood-dark hover:text-brand-purple transition-colors focus-visible-ring rounded"
          >
            <span className="text-2xl" aria-hidden="true">
              🏰
            </span>
            <span className="hidden sm:inline">GuildScape</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={clsx(
                    'px-4 py-2 rounded-lg font-medium transition-all duration-200 focus-visible-ring',
                    'flex items-center gap-2',
                    isActive
                      ? 'bg-brand-purple text-white shadow-md'
                      : 'text-guild-wood hover:bg-parchment-dark hover:text-brand-purple'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span aria-hidden="true">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Personal Shield + Notifications */}
          <div className="flex items-center gap-3">
            <button
              className="relative p-2 text-guild-wood hover:text-brand-purple transition-colors rounded-lg hover:bg-parchment-dark focus-visible-ring"
              aria-label="Notifications (3 new)"
            >
              <span className="text-xl" aria-hidden="true">
                🔔
              </span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-wax-red rounded-full" aria-hidden="true" />
              <span className="sr-only">3 new notifications</span>
            </button>
            <PersonalShield />
          </div>
        </div>
      </nav>
    </header>
  )
}
