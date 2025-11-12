# GuildScape Frontend

A fully functional React/Next.js frontend for GuildScape, a blockchain-based DAO platform for physical artists operating as a medieval guild hall metaphor.

## Overview

GuildScape transforms the typical DAO interface into an immersive medieval guild hall experience where navigation is spatial, interactions are ceremonial, and every element carries narrative weight.

## Features

### Six Primary Spaces

1. **The Great Hall (Dashboard)** - `/`
   - Personal shield with tier medallion and reputation score
   - Six-dimensional reputation progress wheel
   - Notice board with active proposals
   - Navigation portals to other spaces
   - Recent achievements display

2. **The Workshop** - `/workshop`
   - Artwork gallery with quality-based borders
   - Upload interface with 30-day review process
   - Analytics dashboard with revenue and traffic metrics
   - Top performing artworks table

3. **The Council Chamber** - `/council`
   - Governance proposal list with filtering
   - Interactive voting interface
   - Voting power calculation based on tier and reputation
   - Proposal detail modals with progress tracking

4. **The Library** - `/library`
   - Badge collection (40 total badges)
   - Mastery chronicles with learning paths
   - Guild resources and documentation
   - Recent guild achievements feed

5. **The Treasury** - `/treasury`
   - Revenue trends and analytics
   - GLD vs fiat payment split
   - Traffic source breakdown
   - Top performing artworks by conversion rate
   - Performance insights and opportunities

6. **The Forum Courtyard** - `/forum`
   - Discussion threads with categories
   - Pinned threads section
   - Post and reply interface
   - Wax seal upvotes
   - User hover cards with reputation and badges

### Design System

**Colors:**
- Parchment: #FFFEF9 (primary background)
- Guild Wood: #8B4513 (primary text/borders)
- Wax Seal Red: #DC143C (accent)
- Brand Purple: #8B5CF6 (primary actions)
- Medieval Gold: #F59E0B
- Medieval Green: #10B981
- Medieval Blue: #3B82F6

**Typography:**
- Serif: EB Garamond (body text)
- Sans-serif: System default (UI elements)
- Monospace: Data display

**Components:**
- Button variants: Primary (purple), Parchment (cream), Wax Seal (round red)
- Card variants: Standard, Hover, Ceremonial
- Modals: Standard, Ceremonial (for achievements)
- Progress indicators: 6-pillar wheel, linear bars, tier medallions
- Artwork cards with dynamic quality borders
- Badge cards with earned/unearned states

### Mock Data

- **8 Users** across 5 tier levels (Patron to Elder)
- **20 Artworks** with quality ratings and feedback
- **12 Governance Proposals** at different stages
- **40 Badges** with rarity levels and progress tracking
- **40 Forum Threads** with nested replies
- **6 months** of revenue and analytics data

### Responsive Design

- **Desktop**: Full spatial experience with hover states
- **Tablet**: Adapted layouts with maintained functionality
- **Mobile**: Bottom tab navigation, swipe interactions, optimized components

### Accessibility

- Comprehensive ARIA labels on all interactive elements
- Keyboard navigation support
- Focus indicators (2px blue outline)
- Screen reader friendly (sr-only classes)
- Semantic HTML throughout
- Color contrast meets WCAG AA standards

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Development

The app will be available at `http://localhost:3000`

### Project Structure

```
GuildScapePlayGround/
├── app/                          # Next.js 14 app directory
│   ├── page.tsx                 # Great Hall (Dashboard)
│   ├── workshop/page.tsx        # Workshop space
│   ├── council/page.tsx         # Council Chamber
│   ├── library/page.tsx         # Library
│   ├── treasury/page.tsx        # Treasury
│   ├── forum/page.tsx           # Forum Courtyard
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── ui/                      # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Input.tsx
│   │   └── ProgressWheel.tsx
│   └── layout/                  # Layout components
│       ├── Navigation.tsx
│       ├── PersonalShield.tsx
│       ├── Footer.tsx
│       └── MobileNav.tsx
├── hooks/
│   └── useGuildData.tsx         # Custom data hooks
├── data/
│   └── mockData.ts              # Mock data
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── package.json
```

## Key Interactions

### Reputation System
- Six-dimensional progress wheel (Artwork Quality, Community Engagement, Peer Review, Exhibition, Mentorship, Platform Dev)
- Tier progression (Patron → Apprentice → Maker → Artisan → Elder)
- Dynamic voting power calculation

### Artwork Quality Ratings
- **Standard**: Green border (3px)
- **Excellent**: Blue border (3px)
- **Exceptional**: Purple border (3px)
- **Innovation**: Gold border (3px) with shimmer effect

### Voting Mechanics
- Voting power = Reputation × Tier Multiplier
- Visual approval percentage bars
- Vote tracking (prevents double voting)

### Badge System
- Earned badges shown in full color with date
- Unearned badges shown in grayscale with progress
- Rarity levels: Common, Uncommon, Rare, Epic, Legendary

## Technologies Used

- **Next.js 14** (App Router)
- **React 18** with hooks
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **clsx** for conditional classes

## No Backend Required

This is a fully functional frontend-only application using:
- React hooks for state management (useState, useContext)
- Mock data from TypeScript files
- No API calls or blockchain integration
- No authentication or real file uploads

## Future Enhancements

To make this production-ready, you would add:
- Backend API integration
- Web3/blockchain wallet connection
- Real authentication system
- File upload handling
- Database integration
- Real-time notifications
- Sound effects (optional ambient audio)

## Design Philosophy

Every interaction should feel like a meaningful ceremony within a medieval guild:
- Navigation is spatial (walk through rooms, not click menus)
- Achievements are celebrated with ceremonial modals
- Progress is visualized through tangible metaphors (tapestries, medallions)
- Community interactions happen in physical spaces (courtyard, council chamber)
- Quality and reputation are displayed prominently through heraldry

## License

This is a demonstration project for GuildScape frontend implementation.
