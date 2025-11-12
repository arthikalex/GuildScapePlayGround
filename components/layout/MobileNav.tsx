'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const mobileNavItems = [
  { name: 'Hall', path: '/', icon: '🏰', label: 'Great Hall' },
  { name: 'Workshop', path: '/workshop', icon: '🎨', label: 'Workshop' },
  { name: 'Council', path: '/council', icon: '⚖️', label: 'Council Chamber' },
  { name: 'Library', path: '/library', icon: '📚', label: 'Library' },
  { name: 'Treasury', path: '/treasury', icon: '💰', label: 'Treasury' },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav
      className="md:hidden mobile-bottom-nav"
      aria-label="Mobile navigation"
    >
      <div className="flex justify-around items-center h-16 px-2">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <Link
              key={item.path}
              href={item.path}
              className={clsx(
                'flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all',
                'min-w-[44px] min-h-[44px]',
                isActive
                  ? 'text-brand-purple bg-brand-purple/10'
                  : 'text-guild-wood hover:text-brand-purple hover:bg-parchment-dark'
              )}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="text-xl" aria-hidden="true">
                {item.icon}
              </span>
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
