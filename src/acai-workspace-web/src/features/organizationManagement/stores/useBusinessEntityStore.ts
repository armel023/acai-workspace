import { create } from "zustand";
import type {
  BusinessEntityItem,
  SortDirection,
} from "../dto/organizationManagementDto";

export type BusinessEntityFormMode = "create" | "edit";

type BusinessEntityState = {
  search: string;
  createdAtFrom: string;
  createdAtTo: string;
  sortBy: "name" | "code" | "createdAt";
  direction: SortDirection;
  page: number;
  pageSize: number;
  selected: BusinessEntityItem | null;
  formOpen: boolean;
  formMode: BusinessEntityFormMode;
  deleteOpen: boolean;
  setSearch: (value: string) => void;
  setCreatedAtFrom: (value: string) => void;
  setCreatedAtTo: (value: string) => void;
  setSortBy: (value: "name" | "code" | "createdAt") => void;
  setDirection: (value: SortDirection) => void;
  setPage: (value: number) => void;
  setPageSize: (value: number) => void;
  resetFilters: () => void;
  openCreate: () => void;
  openEdit: (item: BusinessEntityItem) => void;
  closeForm: () => void;
  openDelete: (item: BusinessEntityItem) => void;
  closeDelete: () => void;
};

const initialState = {
  search: "",
  createdAtFrom: "",
  createdAtTo: "",
  sortBy: "createdAt" as const,
  direction: "desc" as const,
  page: 1,
  pageSize: 10,
  selected: null,
  formOpen: false,
  formMode: "create" as const,
  deleteOpen: false,
};

export const useBusinessEntityStore = create<BusinessEntityState>((set) => ({
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
  openCreate: () => set({ formOpen: true, formMode: "create", selected: null }),
  openEdit: (item) => set({ formOpen: true, formMode: "edit", selected: item }),
  closeForm: () => set({ formOpen: false, selected: null }),
  openDelete: (item) => set({ deleteOpen: true, selected: item }),
  closeDelete: () => set({ deleteOpen: false, selected: null }),
}));
