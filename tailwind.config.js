/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          light: '#FDF6E3',
          DEFAULT: '#F5ECD7',
          dark: '#E8DCC0',
        },
        'burnt-umber': {
          light: '#A0522D',
          DEFAULT: '#8B4513',
          dark: '#654321',
        },
        gold: {
          light: '#FFD700',
          DEFAULT: '#D4AF37',
          dark: '#B8860B',
        },
        chamber: {
          stone: '#3A3A3C',
          dark: '#1C1C1E',
        },
        council: {
          blue: '#2563EB',
          red: '#DC2626',
          gold: '#D4AF37',
          purple: '#7C3AED',
        },
        vote: {
          approve: '#10B981',
          reject: '#EF4444',
          abstain: '#6B7280',
          pending: '#F59E0B',
        },
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        decorative: ['Cinzel Decorative', 'serif'],
        body: ['Crimson Text', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'seal-press': 'seal-press 800ms cubic-bezier(0.4, 0, 0.2, 1)',
        'parchment-unfurl': 'parchment-unfurl 500ms cubic-bezier(0.4, 0, 0.2, 1)',
        'coin-flip': 'coin-flip 600ms cubic-bezier(0.4, 0, 0.2, 1)',
        'bell-ring': 'bell-ring 600ms cubic-bezier(0.4, 0, 0.2, 1)',
        'liquid-fill': 'liquid-fill 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        'seal-press': {
          '0%': { transform: 'translateY(-40px) scale(1.2)', opacity: '0.5' },
          '40%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '60%': { transform: 'translateY(0) scale(0.9) rotate(-5deg)' },
          '80%': { transform: 'scale(1.05) rotate(5deg)' },
          '100%': { transform: 'scale(1) rotate(0)' },
        },
        'parchment-unfurl': {
          '0%': { opacity: '0', transform: 'scale(0.8) rotateX(-15deg)' },
          '60%': { transform: 'scale(1.05) rotateX(5deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotateX(0)' },
        },
        'coin-flip': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        'bell-ring': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-15deg)' },
          '75%': { transform: 'rotate(15deg)' },
        },
        'liquid-fill': {
          'from': { width: '0%' },
          'to': { width: 'var(--target-width)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.8)' },
        },
      },
      boxShadow: {
        'seal': '0 4px 12px rgba(212, 175, 55, 0.3)',
        'elevated': '0 8px 24px rgba(0, 0, 0, 0.15)',
        'chamber': '0 12px 32px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
}
