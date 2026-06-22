import { create } from "zustand";
import type { UserItem } from "../dto/userManagementDto";

export type UserFormMode = "create" | "edit";

type UserManagementState = {
  search: string;
  createdAtFrom: string;
  createdAtTo: string;
  sortBy: "firstName" | "lastName" | "createdAt";
  direction: "asc" | "desc";
  page: number;
  pageSize: number;
  selectedUser: UserItem | null;
  userFormMode: UserFormMode;
  userFormOpen: boolean;
  deleteDialogOpen: boolean;
  setSearch: (value: string) => void;
  setCreatedAtFrom: (value: string) => void;
  setCreatedAtTo: (value: string) => void;
  setSortBy: (value: "firstName" | "lastName" | "createdAt") => void;
  setDirection: (value: "asc" | "desc") => void;
  setPage: (value: number) => void;
  setPageSize: (value: number) => void;
  resetFilters: () => void;
  openCreateDialog: () => void;
  openEditDialog: (user: UserItem) => void;
  closeUserFormDialog: () => void;
  openDeleteDialog: (user: UserItem) => void;
  closeDeleteDialog: () => void;
};

const initialState = {
  search: "",
  createdAtFrom: "",
  createdAtTo: "",
  sortBy: "createdAt" as const,
  direction: "desc" as const,
  page: 1,
  pageSize: 10,
  selectedUser: null,
  userFormMode: "create" as const,
  userFormOpen: false,
  deleteDialogOpen: false,
};

export const useUserManagementStore = create<UserManagementState>((set) => ({
  ...initialState,
  setSearch: (value) => set({ search: value, page: 1 }),
  setCreatedAtFrom: (value) => set({ createdAtFrom: value, page: 1 }),
  setCreatedAtTo: (value) => set({ createdAtTo: value, page: 1 }),
  setSortBy: (value) => set({ sortBy: value, page: 1 }),
  setDirection: (value) => set({ direction: value, page: 1 }),
  setPage: (value) => set({ page: value }),
  setPageSize: (value) => set({ pageSize: value, page: 1 }),
  resetFilters: () =>
    set({
      search: initialState.search,
      createdAtFrom: initialState.createdAtFrom,
      createdAtTo: initialState.createdAtTo,
      sortBy: initialState.sortBy,
      direction: initialState.direction,
      page: 1,
    }),
  openCreateDialog: () =>
    set({ userFormMode: "create", selectedUser: null, userFormOpen: true }),
  openEditDialog: (user) =>
    set({ userFormMode: "edit", selectedUser: user, userFormOpen: true }),
  closeUserFormDialog: () => set({ userFormOpen: false, selectedUser: null }),
  openDeleteDialog: (user) =>
    set({ selectedUser: user, deleteDialogOpen: true }),
  closeDeleteDialog: () => set({ deleteDialogOpen: false, selectedUser: null }),
}));
