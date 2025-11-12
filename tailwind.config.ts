import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          DEFAULT: '#FFFEF9',
          dark: '#F5F4EE',
        },
        guild: {
          wood: '#8B4513',
          'wood-dark': '#654321',
        },
        wax: {
          red: '#DC143C',
          'red-dark': '#B71C1C',
        },
        brand: {
          purple: '#8B5CF6',
          'purple-dark': '#7C3AED',
        },
        medieval: {
          gold: '#F59E0B',
          green: '#10B981',
          blue: '#3B82F6',
        },
      },
      fontFamily: {
        serif: ['"EB Garamond"', 'serif'],
        sans: ['system-ui', 'sans-serif'],
        mono: ['monospace'],
      },
      borderRadius: {
        DEFAULT: '8px',
      },
      spacing: {
        '18': '4.5rem',
      },
      boxShadow: {
        'candlelight': '0 4px 12px rgba(139, 69, 19, 0.15)',
        'candlelight-lg': '0 8px 24px rgba(139, 69, 19, 0.2)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.4)',
        'glow-gold': '0 0 20px rgba(245, 158, 11, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
export default config
