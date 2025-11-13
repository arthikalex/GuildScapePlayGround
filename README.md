# GuildScape Frontend

A medieval-themed DAO platform for physical artists, transforming blockchain complexity into delightful guild hall ceremonies.

## 🏰 Overview

GuildScape is a blockchain-based DAO platform that uses medieval guild metaphors to make Web3 governance intuitive and engaging. Every interaction is transformed into a meaningful ceremony—from wax seal voting to devotion chain streaks.

## 🎨 Design Philosophy

- **Medieval Metaphors**: Guild halls, chambers, workshops instead of technical jargon
- **Tactile Animations**: Wax seals, scrolls unfurling, coins clinking
- **Celebration-Driven**: Duolingo-style rewards and immediate feedback
- **Professional Polish**: Built for 20-30 year artistic careers

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
guildscape-frontend/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── common/       # Button, Card, Modal, etc.
│   │   ├── navigation/   # Sidebar, Breadcrumbs
│   │   └── layout/       # Page layouts
│   ├── pages/            # Route pages organized by "room"
│   ├── store/            # Zustand state management
│   ├── types/            # TypeScript definitions
│   ├── utils/            # Helper functions and mock data
│   └── styles/           # Global CSS and Tailwind
└── public/               # Static assets
```

## 🎭 Key Features

### Phase 1 (Current - Foundation)
- ✅ Project structure with Vite + React + TypeScript
- ✅ Medieval design system with Tailwind
- ✅ Custom fonts (Cinzel, Crimson Text)
- ✅ Room-based navigation with Sidebar
- ✅ Type-safe stores with Zustand
- ✅ Common components (Button, Card, Modal, Input, Tooltip)
- ✅ Page transitions with Framer Motion
- ✅ Great Hall dashboard with Devotion Chain

### Phase 2-10 (Upcoming)
- Council Chambers with wax seal voting
- Artisan's Quarters profile showcase
- Chapter Houses guild communities
- Workshop peer review system
- Complete gamification (quests, skill trees, badges)
- Herald's Chamber messaging
- And more...

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design tokens
- **State**: Zustand with persistence
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 🎨 Design Tokens

### Colors
- **Parchment**: #F5ECD7 (main background)
- **Burnt Umber**: #8B4513 (primary text)
- **Gold**: #D4AF37 (accents and highlights)
- **Chamber**: Dark tones for navigation
- **Council**: Blues, reds, purples for voting
- **Vote**: Green (approve), Red (reject), Gray (abstain)

### Typography
- **Display**: Cinzel (headings)
- **Decorative**: Cinzel Decorative (special elements)
- **Body**: Crimson Text (content)
- **Sans**: Inter (UI elements)

## 🎯 Development Guidelines

1. **Medieval Theme**: Keep all UI metaphors consistent with guild halls
2. **Animations**: Every interaction should feel delightful (60 FPS)
3. **Accessibility**: Keyboard navigation, ARIA labels, reduced motion support
4. **Performance**: Code splitting, lazy loading, optimized images
5. **Mobile First**: Responsive design for all screen sizes

## 📝 Mock Data

The application currently uses comprehensive mock data (see `src/utils/mockData.ts`) for:
- User profiles and reputation
- Proposals and voting
- Artworks and peer reviews
- Guilds and communities
- Quests and achievements

## 🤝 Contributing

1. Follow the existing code structure and naming conventions
2. Use TypeScript strictly (no `any` types)
3. Write clean, commented code
4. Test on multiple browsers
5. Ensure accessibility standards

## 📄 License

Copyright © 2025 GuildScape. All rights reserved.

---

Built with ❤️ for artists who deserve better tools.
