export function Footer() {
  return (
    <footer className="hidden md:block bg-parchment-dark border-t-2 border-guild-wood/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-sm text-gray-600">
            © 2024 GuildScape. A medieval guild hall for digital artists.
          </div>

          {/* Links */}
          <div className="flex gap-6 text-sm">
            <a
              href="/about"
              className="text-guild-wood hover:text-brand-purple transition-colors focus-visible-ring rounded"
            >
              About
            </a>
            <a
              href="/governance"
              className="text-guild-wood hover:text-brand-purple transition-colors focus-visible-ring rounded"
            >
              Governance
            </a>
            <a
              href="/terms"
              className="text-guild-wood hover:text-brand-purple transition-colors focus-visible-ring rounded"
            >
              Terms
            </a>
            <a
              href="/privacy"
              className="text-guild-wood hover:text-brand-purple transition-colors focus-visible-ring rounded"
            >
              Privacy
            </a>
            <a
              href="/settings"
              className="text-guild-wood hover:text-brand-purple transition-colors focus-visible-ring rounded"
            >
              Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
