import { create } from "zustand";

export type UserManagementTab = "users" | "assignments";

type UserManagementTabState = {
  activeTab: UserManagementTab;
  setActiveTab: (value: UserManagementTab) => void;
};

export const useUserManagementTabStore = create<UserManagementTabState>(
  (set) => ({
    activeTab: "users",
    setActiveTab: (value) => set({ activeTab: value }),
  }),
);
