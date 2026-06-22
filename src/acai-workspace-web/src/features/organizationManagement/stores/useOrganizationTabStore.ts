import { create } from "zustand";

export type OrganizationTab = "business" | "sub";

type OrganizationTabState = {
  activeTab: OrganizationTab;
  setActiveTab: (tab: OrganizationTab) => void;
};

export const useOrganizationTabStore = create<OrganizationTabState>((set) => ({
  activeTab: "business",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
