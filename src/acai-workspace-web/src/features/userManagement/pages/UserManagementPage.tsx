import { useMemo } from "react";
import {
  Alert,
  Box,
  LinearProgress,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { getApiErrorMessage } from "../../../shared/lib/apiClient";
import { ConfirmDialog } from "../../../shared/components/ConfirmDialog";
import { useDebouncedValue } from "../../../shared/hooks/useDebouncedValue";
import type { UserFormValues } from "../schemas/userFormSchema";
import { UserAssignmentsPanel } from "../components/UserAssignmentsPanel";
import { UserManagementToolbar } from "../components/UserManagementToolbar";
import { UserFormDialog } from "../components/UserFormDialog";
import { UsersDataGrid } from "../components/UsersDataGrid";
import { useUsersSearch } from "../hooks/useUsersSearch";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../hooks/useUserManagementMutations";
import { useUserManagementTabStore } from "../stores/useUserManagementTabStore";
import { useUserManagementStore } from "../stores/useUserManagementStore";

function toIsoDateStart(value: string): string | undefined {
  if (!value) {
    return undefined;
  }

  return `${value}T00:00:00Z`;
}

function toIsoDateEnd(value: string): string | undefined {
  if (!value) {
    return undefined;
  }

  return `${value}T23:59:59.999Z`;
}

export function UserManagementPage() {
  const { enqueueSnackbar } = useSnackbar();
  const { activeTab, setActiveTab } = useUserManagementTabStore();

  const {
    search,
    createdAtFrom,
    createdAtTo,
    sortBy,
    direction,
    page,
    pageSize,
    selectedUser,
    userFormMode,
    userFormOpen,
    deleteDialogOpen,
    setSearch,
    setCreatedAtFrom,
    setCreatedAtTo,
    setSortBy,
    setDirection,
    setPage,
    setPageSize,
    resetFilters,
    openCreateDialog,
    openEditDialog,
    closeUserFormDialog,
    openDeleteDialog,
    closeDeleteDialog,
  } = useUserManagementStore();

  const debouncedSearch = useDebouncedValue(search, 450);

  const request = useMemo(
    () => ({
      search: debouncedSearch,
      createdAtFrom: toIsoDateStart(createdAtFrom),
      createdAtTo: toIsoDateEnd(createdAtTo),
      sortBy,
      direction,
      page,
      pageSize,
    }),
    [
      createdAtFrom,
      createdAtTo,
      debouncedSearch,
      direction,
      page,
      pageSize,
      sortBy,
    ],
  );

  const usersQuery = useUsersSearch(request);
  const createMutation = useCreateUserMutation();
  const updateMutation = useUpdateUserMutation();
  const deleteMutation = useDeleteUserMutation();

  const isSaving = createMutation.isPending || updateMutation.isPending;

  async function handleUserSubmit(values: UserFormValues) {
    try {
      if (userFormMode === "create") {
        await createMutation.mutateAsync(values);
        enqueueSnackbar("User created successfully.", { variant: "success" });
      } else if (selectedUser) {
        await updateMutation.mutateAsync({ id: selectedUser.id, ...values });
        enqueueSnackbar("User updated successfully.", { variant: "success" });
      }

      closeUserFormDialog();
    } catch (error) {
      enqueueSnackbar(getApiErrorMessage(error), { variant: "error" });
    }
  }

  async function handleDeleteConfirm() {
    if (!selectedUser) {
      return;
    }

    try {
      const result = await deleteMutation.mutateAsync(selectedUser.id);

      if (result.success) {
        enqueueSnackbar("User deleted successfully.", { variant: "success" });
      } else {
        enqueueSnackbar("User no longer exists.", { variant: "warning" });
      }

      closeDeleteDialog();
    } catch (error) {
      enqueueSnackbar(getApiErrorMessage(error), { variant: "error" });
    }
  }

  return (
    <Stack spacing={2.25}>
      <Box
        sx={{
          p: { xs: 2, md: 2.5 },
          borderRadius: 3,
          background:
            "linear-gradient(135deg, rgba(8,47,45,0.96) 0%, rgba(15,118,110,0.95) 52%, rgba(20,184,166,0.9) 100%)",
          color: "#f0fdfa",
          border: "1px solid rgba(8,47,45,0.32)",
          boxShadow: "0 14px 34px rgba(8, 47, 45, 0.24)",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
          Enterprise User Management
        </Typography>
        <Typography sx={{ color: "rgba(240, 253, 250, 0.9)", maxWidth: 900 }}>
          Search, filter, and administer workspace identities using the live
          UserManagement API with server-side pagination and secure write
          operations.
        </Typography>
      </Box>

      <Box
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "#ffffff",
          overflow: "hidden",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(_, value) => setActiveTab(value)}
          sx={{
            px: 1.5,
            pt: 1,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Tab value="users" label="Users" sx={{ fontWeight: 700 }} />
          <Tab
            value="assignments"
            label="User Assignments"
            sx={{ fontWeight: 700 }}
          />
        </Tabs>

        <Stack spacing={2} sx={{ p: { xs: 1.5, md: 2 } }}>
          {activeTab === "users" ? (
            <>
              <UserManagementToolbar
                search={search}
                createdAtFrom={createdAtFrom}
                createdAtTo={createdAtTo}
                sortBy={sortBy}
                direction={direction}
                onSearchChange={setSearch}
                onCreatedAtFromChange={setCreatedAtFrom}
                onCreatedAtToChange={setCreatedAtTo}
                onSortByChange={setSortBy}
                onDirectionChange={setDirection}
                onReset={resetFilters}
                onAddUser={openCreateDialog}
              />

              {usersQuery.isFetching && <LinearProgress />}

              {usersQuery.isError && (
                <Alert severity="error">
                  {getApiErrorMessage(usersQuery.error)}
                </Alert>
              )}

              <UsersDataGrid
                rows={usersQuery.data?.items ?? []}
                loading={usersQuery.isLoading}
                page={usersQuery.data?.page ?? page}
                pageSize={usersQuery.data?.pageSize ?? pageSize}
                totalCount={usersQuery.data?.totalCount ?? 0}
                onPageChange={setPage}
                onPageSizeChange={setPageSize}
                onEdit={openEditDialog}
                onDelete={openDeleteDialog}
              />
            </>
          ) : (
            <UserAssignmentsPanel />
          )}
        </Stack>
      </Box>

      <UserFormDialog
        open={userFormOpen}
        mode={userFormMode}
        user={selectedUser}
        loading={isSaving}
        onClose={closeUserFormDialog}
        onSubmit={handleUserSubmit}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete user"
        description={`Are you sure you want to delete ${selectedUser?.fullName ?? "this user"}? This action can be audited and cannot be undone from the UI.`}
        confirmLabel="Delete"
        confirmColor="error"
        loading={deleteMutation.isPending}
        onClose={closeDeleteDialog}
        onConfirm={handleDeleteConfirm}
      />
    </Stack>
  );
}
