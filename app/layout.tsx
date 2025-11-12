import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { MobileNav } from '@/components/layout/MobileNav'

export const metadata: Metadata = {
  title: 'GuildScape - Medieval Guild Hall for Digital Artists',
  description: 'A blockchain-based DAO platform for physical artists operating as a medieval guild hall',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navigation />
        <main id="main-content" className="flex-1 pb-20 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  )
}
