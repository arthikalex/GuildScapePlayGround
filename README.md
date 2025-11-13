# 🏰 GuildScape

**A Medieval-Themed DAO Platform for Artists**

GuildScape is a comprehensive web application that combines the collaborative spirit of medieval guilds with modern DAO governance, creating a vibrant community where artists create, collaborate, and prosper together.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![React](https://img.shields.io/badge/React-18.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4-purple)

---

## 📜 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Building for Production](#-building-for-production)
- [Design System](#-design-system)

---

## ✨ Features

### 🏛️ **The Great Hall (Dashboard)**
- Enhanced Dashboard with activity feed, trending artworks, and leaderboards
- Devotion Chain tracking with streak visualization
- Quick Actions for rapid navigation
- Comprehensive user statistics

### 🎨 **The Workshop**
- Artwork upload system with peer review
- 3-dimensional scoring system
- Quality rating calculation
- Review queue and submission tracking

### 📚 **The Library (Gamification)**
- Quest system with 5 rarity tiers
- Milestone tracking across 4 categories
- Mastery trees with skill progression
- Reward system (Badges, GLD, Avatar Items)

### 🏪 **The Bazaar (Marketplace)**
- Advanced marketplace with filtering
- Shopping cart with persistent state
- Offer system for price negotiation
- Transaction history tracking

### 🏛️ **Council Chambers (Governance)**
- Proposal system with voting
- Vote tracking and quorum requirements
- Proposal status management

### 👥 **Chapter Houses (Guilds)**
- Guild discovery and creation
- Member management
- Guild activities tracking

### 💬 **Herald's Chamber (Messaging)**
- Direct messaging between artisans
- Notification center
- Real-time updates

---

## 🛠️ Tech Stack

- **React 18.3** - UI library
- **TypeScript 5.6** - Type safety
- **Vite 5.4** - Build tool
- **Zustand 5.0** - State management
- **Tailwind CSS 3.4** - Styling
- **Framer Motion 11.14** - Animations
- **React Router 6.28** - Routing

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm 9+

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd GuildScapePlayGround
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start development server
   ```bash
   npm run dev
   ```

4. Open http://localhost:5173

---

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Page components
├── store/           # Zustand stores
├── types/           # TypeScript definitions
├── utils/           # Utility functions
├── App.tsx          # Main app
└── main.tsx         # Entry point
```

---

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Lint code
```

---

## 🏗️ Building for Production

```bash
npm run build
```

Build outputs to `dist/`:
- JS: ~785 KB (225 KB gzipped)
- CSS: ~66 KB (10 KB gzipped)

---

## 🎨 Design System

### Colors
- `parchment`: #F5ECD7 (Background)
- `burnt-umber`: #8B4513 (Primary)
- `gold`: #D4AF37 (Accent)

### Typography
- **Display**: Cinzel
- **Body**: Crimson Text
- **UI**: Inter

---

**Built with ⚔️ by artisans, for artisans**
