import { useMemo } from "react";
import { Alert, LinearProgress, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import { ConfirmDialog } from "../../../shared/components/ConfirmDialog";
import { useDebouncedValue } from "../../../shared/hooks/useDebouncedValue";
import { getApiErrorMessage } from "../../../shared/lib/apiClient";
import type { UserAssignmentFormValues } from "../schemas/userAssignmentFormSchema";
import { UserAssignmentToolbar } from "./UserAssignmentToolbar";
import { UserAssignmentsDataGrid } from "./UserAssignmentsDataGrid";
import { UserAssignmentFormDialog } from "./UserAssignmentFormDialog";
import {
  useAssignmentBusinessEntityOptions,
  useAssignmentRoleOptions,
  useAssignmentSubEntityOptions,
  useAssignmentUserOptions,
  useUserAssignmentSearch,
} from "../hooks/useUserAssignmentQueries";
import {
  useCreateUserAssignmentMutation,
  useDeleteUserAssignmentMutation,
  useUpdateUserAssignmentMutation,
} from "../hooks/useUserAssignmentMutations";
import { useUserAssignmentStore } from "../stores/useUserAssignmentStore";

export function UserAssignmentsPanel() {
  const { enqueueSnackbar } = useSnackbar();

  const {
    search,
    userId,
    businessEntityId,
    isActiveFilter,
    sortBy,
    direction,
    page,
    pageSize,
    selectedAssignment,
    formMode,
    formOpen,
    deleteOpen,
    setSearch,
    setUserId,
    setBusinessEntityId,
    setIsActiveFilter,
    setSortBy,
    setDirection,
    setPage,
    setPageSize,
    resetFilters,
    openCreate,
    openEdit,
    closeForm,
    openDelete,
    closeDelete,
  } = useUserAssignmentStore();

  const debouncedSearch = useDebouncedValue(search, 450);

  const request = useMemo(
    () => ({
      search: debouncedSearch,
      userId: userId || undefined,
      businessEntityId: businessEntityId || undefined,
      isActive:
        isActiveFilter === "all"
          ? undefined
          : isActiveFilter === "active"
            ? true
            : false,
      sortBy,
      direction,
      page,
      pageSize,
    }),
    [
      businessEntityId,
      debouncedSearch,
      direction,
      isActiveFilter,
      page,
      pageSize,
      sortBy,
      userId,
    ],
  );

  const assignmentsQuery = useUserAssignmentSearch(request);
  const userOptionsQuery = useAssignmentUserOptions();
  const roleOptionsQuery = useAssignmentRoleOptions();
  const businessEntityOptionsQuery = useAssignmentBusinessEntityOptions();
  const subEntityOptionsQuery = useAssignmentSubEntityOptions();

  const createMutation = useCreateUserAssignmentMutation();
  const updateMutation = useUpdateUserAssignmentMutation();
  const deleteMutation = useDeleteUserAssignmentMutation();

  const isSaving = createMutation.isPending || updateMutation.isPending;

  const lookupWarning = userOptionsQuery.isError
    ? "User lookup failed to load. Assignment form may be limited."
    : businessEntityOptionsQuery.isError || subEntityOptionsQuery.isError
      ? "Scope lookup failed to load. You can still manage assignments using known IDs and existing values."
      : roleOptionsQuery.isError
        ? "Roles lookup failed to load from /api/roles. Role selection is currently unavailable."
        : undefined;

  async function handleSubmit(values: UserAssignmentFormValues) {
    const payload = {
      userId: values.userId,
      roleId: values.roleId,
      businessEntityId: values.businessEntityId || undefined,
      subEntityId: values.subEntityId || undefined,
      isActive: values.isActive,
    };

    try {
      if (formMode === "create") {
        await createMutation.mutateAsync(payload);
        enqueueSnackbar("User assignment created successfully.", {
          variant: "success",
        });
      } else if (selectedAssignment) {
        await updateMutation.mutateAsync({
          id: selectedAssignment.id,
          ...payload,
        });
        enqueueSnackbar("User assignment updated successfully.", {
          variant: "success",
        });
      }

      closeForm();
    } catch (error) {
      enqueueSnackbar(getApiErrorMessage(error), { variant: "error" });
    }
  }

  async function handleDeleteConfirm() {
    if (!selectedAssignment) {
      return;
    }

    try {
      const result = await deleteMutation.mutateAsync(selectedAssignment.id);

      if (result.success) {
        enqueueSnackbar("User assignment deleted successfully.", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("User assignment no longer exists.", {
          variant: "warning",
        });
      }

      closeDelete();
    } catch (error) {
      enqueueSnackbar(getApiErrorMessage(error), { variant: "error" });
    }
  }

  return (
    <Stack spacing={2}>
      <UserAssignmentToolbar
        search={search}
        userId={userId}
        businessEntityId={businessEntityId}
        isActiveFilter={isActiveFilter}
        sortBy={sortBy}
        direction={direction}
        users={userOptionsQuery.data ?? []}
        businessEntities={businessEntityOptionsQuery.data ?? []}
        onSearchChange={setSearch}
        onUserIdChange={setUserId}
        onBusinessEntityIdChange={setBusinessEntityId}
        onIsActiveFilterChange={setIsActiveFilter}
        onSortByChange={setSortBy}
        onDirectionChange={setDirection}
        onReset={resetFilters}
        onAdd={openCreate}
      />

      {assignmentsQuery.isFetching && <LinearProgress />}

      {assignmentsQuery.isError && (
        <Alert severity="error">
          {getApiErrorMessage(assignmentsQuery.error)}
        </Alert>
      )}

      <UserAssignmentsDataGrid
        rows={assignmentsQuery.data?.items ?? []}
        loading={assignmentsQuery.isLoading}
        page={assignmentsQuery.data?.page ?? page}
        pageSize={assignmentsQuery.data?.pageSize ?? pageSize}
        totalCount={assignmentsQuery.data?.totalCount ?? 0}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onEdit={openEdit}
        onDelete={openDelete}
      />

      <UserAssignmentFormDialog
        open={formOpen}
        mode={formMode}
        item={selectedAssignment}
        users={userOptionsQuery.data ?? []}
        roles={roleOptionsQuery.data ?? []}
        businessEntities={businessEntityOptionsQuery.data ?? []}
        subEntities={subEntityOptionsQuery.data ?? []}
        loading={isSaving}
        lookupWarning={lookupWarning}
        onClose={closeForm}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={deleteOpen}
        title="Delete user assignment"
        description={`Are you sure you want to delete the ${selectedAssignment?.role ?? "selected"} assignment for ${selectedAssignment?.userDisplayName ?? "this user"}? This action cannot be undone from the UI.`}
        confirmLabel="Delete"
        confirmColor="error"
        loading={deleteMutation.isPending}
        onClose={closeDelete}
        onConfirm={handleDeleteConfirm}
      />
    </Stack>
  );
}
