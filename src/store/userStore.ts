import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, DailyScroll, ActivityFeedItem } from '@/types/user';

interface UserState {
  currentUser: User | null;
  dailyScrolls: DailyScroll[];
  activityFeed: ActivityFeedItem[];

  // Actions
  setUser: (user: User) => void;
  updateReputation: (dimension: keyof User['reputation']['dimensions'], amount: number) => void;
  addBadge: (badge: User['badges'][0]) => void;
  updateGLDBalance: (amount: number) => void;
  checkInDevotionChain: () => void;
  useDevotionShield: () => void;
  updateDailyScrolls: (scrolls: DailyScroll[]) => void;
  completeScroll: (scrollId: string) => void;
  addActivityFeedItem: (item: ActivityFeedItem) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      currentUser: null,
      dailyScrolls: [],
      activityFeed: [],

      setUser: (user) => set({ currentUser: user }),

      updateReputation: (dimension, amount) =>
        set((state) => {
          if (!state.currentUser) return state;

          const newDimensions = {
            ...state.currentUser.reputation.dimensions,
            [dimension]: state.currentUser.reputation.dimensions[dimension] + amount,
          };

          const newTotal = Object.values(newDimensions).reduce((sum, val) => sum + val, 0);

          return {
            currentUser: {
              ...state.currentUser,
              reputation: {
                total: newTotal,
                dimensions: newDimensions,
              },
            },
          };
        }),

      addBadge: (badge) =>
        set((state) => {
          if (!state.currentUser) return state;
          return {
            currentUser: {
              ...state.currentUser,
              badges: [...state.currentUser.badges, badge],
            },
          };
        }),

      updateGLDBalance: (amount) =>
        set((state) => {
          if (!state.currentUser) return state;
          return {
            currentUser: {
              ...state.currentUser,
              gldBalance: state.currentUser.gldBalance + amount,
            },
          };
        }),

      checkInDevotionChain: () =>
        set((state) => {
          if (!state.currentUser) return state;

          const now = new Date();
          const lastCheckIn = new Date(state.currentUser.devotionChain.lastCheckIn);
          const hoursSinceLastCheckIn = (now.getTime() - lastCheckIn.getTime()) / (1000 * 60 * 60);

          let newStreak = state.currentUser.devotionChain.currentStreak;

          // If more than 48 hours (2 days), reset streak unless using shield
          if (hoursSinceLastCheckIn > 48) {
            if (state.currentUser.devotionChain.shields > 0) {
              // Use shield to protect streak
              return {
                currentUser: {
                  ...state.currentUser,
                  devotionChain: {
                    ...state.currentUser.devotionChain,
                    shields: state.currentUser.devotionChain.shields - 1,
                    lastCheckIn: now,
                  },
                },
              };
            } else {
              newStreak = 1;
            }
          } else if (hoursSinceLastCheckIn >= 24) {
            // Between 24-48 hours, increment streak
            newStreak += 1;
          }

          return {
            currentUser: {
              ...state.currentUser,
              devotionChain: {
                ...state.currentUser.devotionChain,
                currentStreak: newStreak,
                longestStreak: Math.max(newStreak, state.currentUser.devotionChain.longestStreak),
                lastCheckIn: now,
              },
            },
          };
        }),

      useDevotionShield: () =>
        set((state) => {
          if (!state.currentUser || state.currentUser.devotionChain.shields <= 0) return state;
          return {
            currentUser: {
              ...state.currentUser,
              devotionChain: {
                ...state.currentUser.devotionChain,
                shields: state.currentUser.devotionChain.shields - 1,
              },
            },
          };
        }),

      updateDailyScrolls: (scrolls) => set({ dailyScrolls: scrolls }),

      completeScroll: (scrollId) =>
        set((state) => ({
          dailyScrolls: state.dailyScrolls.map((scroll) =>
            scroll.id === scrollId ? { ...scroll, completed: true } : scroll
          ),
        })),

      addActivityFeedItem: (item) =>
        set((state) => ({
          activityFeed: [item, ...state.activityFeed].slice(0, 50), // Keep last 50 items
        })),

      clearUser: () => set({ currentUser: null, dailyScrolls: [], activityFeed: [] }),
    }),
    {
      name: 'guildscape-user-storage',
      partialize: (state) => ({
        currentUser: state.currentUser,
        dailyScrolls: state.dailyScrolls,
      }),
    }
  )
);
