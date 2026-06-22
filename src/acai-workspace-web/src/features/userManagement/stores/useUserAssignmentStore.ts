import { create } from "zustand";
import type {
  UserAssignmentItem,
  UserAssignmentSortBy,
} from "../dto/userAssignmentDto";

export type UserAssignmentFormMode = "create" | "edit";
export type UserAssignmentActiveFilter = "all" | "active" | "inactive";

type UserAssignmentState = {
  search: string;
  userId: string;
  businessEntityId: string;
  isActiveFilter: UserAssignmentActiveFilter;
  sortBy: UserAssignmentSortBy;
  direction: "asc" | "desc";
  page: number;
  pageSize: number;
  selectedAssignment: UserAssignmentItem | null;
  formMode: UserAssignmentFormMode;
  formOpen: boolean;
  deleteOpen: boolean;
  setSearch: (value: string) => void;
  setUserId: (value: string) => void;
  setBusinessEntityId: (value: string) => void;
  setIsActiveFilter: (value: UserAssignmentActiveFilter) => void;
  setSortBy: (value: UserAssignmentSortBy) => void;
  setDirection: (value: "asc" | "desc") => void;
  setPage: (value: number) => void;
  setPageSize: (value: number) => void;
  resetFilters: () => void;
  openCreate: () => void;
  openEdit: (item: UserAssignmentItem) => void;
  closeForm: () => void;
  openDelete: (item: UserAssignmentItem) => void;
  closeDelete: () => void;
};

const initialState = {
  search: "",
  userId: "",
  businessEntityId: "",
  isActiveFilter: "all" as const,
  sortBy: "createdAt" as const,
  direction: "desc" as const,
  page: 1,
  pageSize: 10,
  selectedAssignment: null,
  formMode: "create" as const,
  formOpen: false,
  deleteOpen: false,
};

export const useUserAssignmentStore = create<UserAssignmentState>((set) => ({
  ...initialState,
  setSearch: (value) => set({ search: value, page: 1 }),
  setUserId: (value) => set({ userId: value, page: 1 }),
  setBusinessEntityId: (value) => set({ businessEntityId: value, page: 1 }),
  setIsActiveFilter: (value) => set({ isActiveFilter: value, page: 1 }),
  setSortBy: (value) => set({ sortBy: value, page: 1 }),
  setDirection: (value) => set({ direction: value, page: 1 }),
  setPage: (value) => set({ page: value }),
  setPageSize: (value) => set({ pageSize: value, page: 1 }),
  resetFilters: () =>
    set({
      search: initialState.search,
      userId: initialState.userId,
      businessEntityId: initialState.businessEntityId,
      isActiveFilter: initialState.isActiveFilter,
      sortBy: initialState.sortBy,
      direction: initialState.direction,
      page: 1,
    }),
  openCreate: () =>
    set({ formOpen: true, formMode: "create", selectedAssignment: null }),
  openEdit: (item) =>
    set({
      formOpen: true,
      formMode: "edit",
      selectedAssignment: item,
    }),
  closeForm: () => set({ formOpen: false, selectedAssignment: null }),
  openDelete: (item) => set({ deleteOpen: true, selectedAssignment: item }),
  closeDelete: () => set({ deleteOpen: false, selectedAssignment: null }),
}));
