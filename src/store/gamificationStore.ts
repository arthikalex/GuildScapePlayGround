import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Quest, MasteryTree, Milestone, AvatarCustomization } from '@/types/gamification';

interface GamificationState {
  quests: Quest[];
  masteryTrees: MasteryTree[];
  milestones: Milestone[];
  avatar: AvatarCustomization | null;

  // Actions
  updateQuest: (questId: string, updates: Partial<Quest>) => void;
  completeQuestStep: (questId: string, stepId: string) => void;
  addQuest: (quest: Quest) => void;
  updateSkillNode: (medium: string, nodeId: string, progress: number) => void;
  completeSkillNode: (medium: string, nodeId: string) => void;
  achieveMilestone: (milestoneId: string) => void;
  updateAvatar: (avatar: AvatarCustomization) => void;
  unlockAvatarItem: (item: AvatarCustomization['unlockedItems'][0]) => void;
}

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set) => ({
      quests: [],
      masteryTrees: [],
      milestones: [],
      avatar: null,

      updateQuest: (questId, updates) =>
        set((state) => ({
          quests: state.quests.map((quest) =>
            quest.id === questId ? { ...quest, ...updates } : quest
          ),
        })),

      completeQuestStep: (questId, stepId) =>
        set((state) => ({
          quests: state.quests.map((quest) => {
            if (quest.id !== questId) return quest;

            const updatedSteps = quest.steps.map((step) =>
              step.id === stepId ? { ...step, completed: true } : step
            );

            const completedSteps = updatedSteps.filter((s) => s.completed).length;
            const progress = Math.round((completedSteps / updatedSteps.length) * 100);
            const allCompleted = completedSteps === updatedSteps.length;

            return {
              ...quest,
              steps: updatedSteps,
              progress,
              status: allCompleted ? ('completed' as const) : quest.status,
            };
          }),
        })),

      addQuest: (quest) =>
        set((state) => ({
          quests: [...state.quests, quest],
        })),

      updateSkillNode: (medium, nodeId, progress) =>
        set((state) => ({
          masteryTrees: state.masteryTrees.map((tree) => {
            if (tree.medium !== medium) return tree;

            return {
              ...tree,
              nodes: tree.nodes.map((node) =>
                node.id === nodeId ? { ...node, progress } : node
              ),
            };
          }),
        })),

      completeSkillNode: (medium, nodeId) =>
        set((state) => ({
          masteryTrees: state.masteryTrees.map((tree) => {
            if (tree.medium !== medium) return tree;

            const updatedNodes = tree.nodes.map((node) =>
              node.id === nodeId ? { ...node, completed: true, progress: 100 } : node
            );

            const completedCount = updatedNodes.filter((n) => n.completed).length;

            return {
              ...tree,
              nodes: updatedNodes,
              completedNodes: completedCount,
              level: Math.floor(completedCount / 5) + 1,
            };
          }),
        })),

      achieveMilestone: (milestoneId) =>
        set((state) => ({
          milestones: state.milestones.map((milestone) =>
            milestone.id === milestoneId
              ? { ...milestone, achieved: true, achievedDate: new Date() }
              : milestone
          ),
        })),

      updateAvatar: (avatar) => set({ avatar }),

      unlockAvatarItem: (item) =>
        set((state) => {
          if (!state.avatar) return state;
          return {
            avatar: {
              ...state.avatar,
              unlockedItems: [...state.avatar.unlockedItems, item],
            },
          };
        }),
    }),
    {
      name: 'guildscape-gamification-storage',
    }
  )
);
