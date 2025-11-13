import { create } from 'zustand';

export type RoomType =
  | 'great-hall'
  | 'workshop'
  | 'library'
  | 'bazaar'
  | 'council-chambers'
  | 'artisan-quarters'
  | 'chapter-houses'
  | 'herald-chamber';

interface NavigationState {
  currentRoom: RoomType;
  previousRoom: RoomType | null;
  isTransitioning: boolean;
  sidebarCollapsed: boolean;
  breadcrumbs: { label: string; path: string }[];

  // Actions
  navigateToRoom: (room: RoomType) => void;
  setBreadcrumbs: (breadcrumbs: { label: string; path: string }[]) => void;
  toggleSidebar: () => void;
  setTransitioning: (isTransitioning: boolean) => void;
}

export const useNavigationStore = create<NavigationState>()((set) => ({
  currentRoom: 'great-hall',
  previousRoom: null,
  isTransitioning: false,
  sidebarCollapsed: false,
  breadcrumbs: [],

  navigateToRoom: (room) =>
    set((state) => ({
      previousRoom: state.currentRoom,
      currentRoom: room,
      isTransitioning: true,
    })),

  setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),

  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  setTransitioning: (isTransitioning) => set({ isTransitioning }),
}));

// Room metadata for navigation
export const ROOMS = {
  'great-hall': {
    name: 'Great Hall',
    description: 'Your guild headquarters',
    icon: 'Castle',
    path: '/',
  },
  'workshop': {
    name: 'Workshop',
    description: 'Create and review artworks',
    icon: 'Hammer',
    path: '/workshop',
  },
  'library': {
    name: 'Library',
    description: 'Learn and grow your skills',
    icon: 'BookOpen',
    path: '/library',
  },
  'bazaar': {
    name: 'Bazaar',
    description: 'Marketplace for art',
    icon: 'Store',
    path: '/bazaar',
  },
  'council-chambers': {
    name: 'Council Chambers',
    description: 'Governance and voting',
    icon: 'Scale',
    path: '/council',
  },
  'artisan-quarters': {
    name: "Artisan's Quarters",
    description: 'Your profile and achievements',
    icon: 'User',
    path: '/profile',
  },
  'chapter-houses': {
    name: 'Chapter Houses',
    description: 'Guild communities',
    icon: 'Users',
    path: '/guilds',
  },
  'herald-chamber': {
    name: "Herald's Chamber",
    description: 'Messages and notifications',
    icon: 'Bell',
    path: '/messages',
  },
} as const;
