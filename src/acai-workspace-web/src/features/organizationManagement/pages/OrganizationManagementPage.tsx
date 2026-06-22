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
import type { BusinessEntityFormValues } from "../schemas/businessEntityFormSchema";
import type { SubEntityFormValues } from "../schemas/subEntityFormSchema";
import { BusinessEntityToolbar } from "../components/BusinessEntityToolbar";
import { BusinessEntitiesDataGrid } from "../components/BusinessEntitiesDataGrid";
import { BusinessEntityFormDialog } from "../components/BusinessEntityFormDialog";
import { SubEntityToolbar } from "../components/SubEntityToolbar";
import { SubEntitiesDataGrid } from "../components/SubEntitiesDataGrid";
import { SubEntityFormDialog } from "../components/SubEntityFormDialog";
import {
  useBusinessEntityOptions,
  useBusinessEntitySearch,
  useSubEntitySearch,
} from "../hooks/useOrganizationQueries";
import {
  useCreateBusinessEntityMutation,
  useCreateSubEntityMutation,
  useDeleteBusinessEntityMutation,
  useDeleteSubEntityMutation,
  useUpdateBusinessEntityMutation,
  useUpdateSubEntityMutation,
} from "../hooks/useOrganizationMutations";
import { useBusinessEntityStore } from "../stores/useBusinessEntityStore";
import { useOrganizationTabStore } from "../stores/useOrganizationTabStore";
import { useSubEntityStore } from "../stores/useSubEntityStore";

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

export function OrganizationManagementPage() {
  const { enqueueSnackbar } = useSnackbar();

  const { activeTab, setActiveTab } = useOrganizationTabStore();

  const {
    search: businessSearch,
    createdAtFrom: businessCreatedAtFrom,
    createdAtTo: businessCreatedAtTo,
    sortBy: businessSortBy,
    direction: businessDirection,
    page: businessPage,
    pageSize: businessPageSize,
    selected: selectedBusinessEntity,
    formOpen: businessFormOpen,
    formMode: businessFormMode,
    deleteOpen: businessDeleteOpen,
    setSearch: setBusinessSearch,
    setCreatedAtFrom: setBusinessCreatedAtFrom,
    setCreatedAtTo: setBusinessCreatedAtTo,
    setSortBy: setBusinessSortBy,
    setDirection: setBusinessDirection,
    setPage: setBusinessPage,
    setPageSize: setBusinessPageSize,
    resetFilters: resetBusinessFilters,
    openCreate: openBusinessCreate,
    openEdit: openBusinessEdit,
    closeForm: closeBusinessForm,
    openDelete: openBusinessDelete,
    closeDelete: closeBusinessDelete,
  } = useBusinessEntityStore();

  const {
    search: subSearch,
    businessEntityId: subBusinessEntityId,
    createdAtFrom: subCreatedAtFrom,
    createdAtTo: subCreatedAtTo,
    sortBy: subSortBy,
    direction: subDirection,
    page: subPage,
    pageSize: subPageSize,
    selected: selectedSubEntity,
    formOpen: subFormOpen,
    formMode: subFormMode,
    deleteOpen: subDeleteOpen,
    setSearch: setSubSearch,
    setBusinessEntityId: setSubBusinessEntityId,
    setCreatedAtFrom: setSubCreatedAtFrom,
    setCreatedAtTo: setSubCreatedAtTo,
    setSortBy: setSubSortBy,
    setDirection: setSubDirection,
    setPage: setSubPage,
    setPageSize: setSubPageSize,
    resetFilters: resetSubFilters,
    openCreate: openSubCreate,
    openEdit: openSubEdit,
    closeForm: closeSubForm,
    openDelete: openSubDelete,
    closeDelete: closeSubDelete,
  } = useSubEntityStore();

  const debouncedBusinessSearch = useDebouncedValue(businessSearch, 450);
  const debouncedSubSearch = useDebouncedValue(subSearch, 450);

  const businessRequest = useMemo(
    () => ({
      search: debouncedBusinessSearch,
      createdAtFrom: toIsoDateStart(businessCreatedAtFrom),
      createdAtTo: toIsoDateEnd(businessCreatedAtTo),
      sortBy: businessSortBy,
      direction: businessDirection,
      page: businessPage,
      pageSize: businessPageSize,
    }),
    [
      businessCreatedAtFrom,
      businessCreatedAtTo,
      businessDirection,
      businessPage,
      businessPageSize,
      businessSortBy,
      debouncedBusinessSearch,
    ],
  );

  const subRequest = useMemo(
    () => ({
      search: debouncedSubSearch,
      businessEntityId: subBusinessEntityId || undefined,
      createdAtFrom: toIsoDateStart(subCreatedAtFrom),
      createdAtTo: toIsoDateEnd(subCreatedAtTo),
      sortBy: subSortBy,
      direction: subDirection,
      page: subPage,
      pageSize: subPageSize,
    }),
    [
      debouncedSubSearch,
      subBusinessEntityId,
      subCreatedAtFrom,
      subCreatedAtTo,
      subDirection,
      subPage,
      subPageSize,
      subSortBy,
    ],
  );

  const businessQuery = useBusinessEntitySearch(businessRequest);
  const subQuery = useSubEntitySearch(subRequest);
  const businessEntityOptionsQuery = useBusinessEntityOptions();

  const createBusinessMutation = useCreateBusinessEntityMutation();
  const updateBusinessMutation = useUpdateBusinessEntityMutation();
  const deleteBusinessMutation = useDeleteBusinessEntityMutation();
  const createSubMutation = useCreateSubEntityMutation();
  const updateSubMutation = useUpdateSubEntityMutation();
  const deleteSubMutation = useDeleteSubEntityMutation();

  const isBusinessSaving =
    createBusinessMutation.isPending || updateBusinessMutation.isPending;
  const isSubSaving =
    createSubMutation.isPending || updateSubMutation.isPending;

  async function handleBusinessSubmit(values: BusinessEntityFormValues) {
    try {
      if (businessFormMode === "create") {
        await createBusinessMutation.mutateAsync(values);
        enqueueSnackbar("Business entity created successfully.", {
          variant: "success",
        });
      } else if (selectedBusinessEntity) {
        await updateBusinessMutation.mutateAsync({
          id: selectedBusinessEntity.id,
          ...values,
        });
        enqueueSnackbar("Business entity updated successfully.", {
          variant: "success",
        });
      }

      closeBusinessForm();
    } catch (error) {
      enqueueSnackbar(getApiErrorMessage(error), { variant: "error" });
    }
  }

  async function handleBusinessDeleteConfirm() {
    if (!selectedBusinessEntity) {
      return;
    }

    try {
      const result = await deleteBusinessMutation.mutateAsync(
        selectedBusinessEntity.id,
      );

      if (result.success) {
        enqueueSnackbar("Business entity deleted successfully.", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Business entity no longer exists.", {
          variant: "warning",
        });
      }

      closeBusinessDelete();
    } catch (error) {
      enqueueSnackbar(getApiErrorMessage(error), { variant: "error" });
    }
  }

  async function handleSubSubmit(values: SubEntityFormValues) {
    try {
      if (subFormMode === "create") {
        await createSubMutation.mutateAsync(values);
        enqueueSnackbar("Sub entity created successfully.", {
          variant: "success",
        });
      } else if (selectedSubEntity) {
        await updateSubMutation.mutateAsync({
          id: selectedSubEntity.id,
          ...values,
        });
        enqueueSnackbar("Sub entity updated successfully.", {
          variant: "success",
        });
      }

      closeSubForm();
    } catch (error) {
      enqueueSnackbar(getApiErrorMessage(error), { variant: "error" });
    }
  }

  async function handleSubDeleteConfirm() {
    if (!selectedSubEntity) {
      return;
    }

    try {
      const result = await deleteSubMutation.mutateAsync(selectedSubEntity.id);

      if (result.success) {
        enqueueSnackbar("Sub entity deleted successfully.", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Sub entity no longer exists.", { variant: "warning" });
      }

      closeSubDelete();
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
            "linear-gradient(140deg, rgba(30,58,138,0.95) 0%, rgba(37,99,235,0.92) 52%, rgba(14,165,233,0.9) 100%)",
          color: "#eff6ff",
          border: "1px solid rgba(15,23,42,0.18)",
          boxShadow: "0 14px 34px rgba(30,58,138,0.2)",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
          Organization Management
        </Typography>
        <Typography sx={{ color: "rgba(239, 246, 255, 0.9)", maxWidth: 980 }}>
          Manage business entities and sub entities in a unified operational
          workspace with server-side search, filtering, pagination, and secured
          write operations.
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
          <Tab
            value="business"
            label="Business Entity"
            sx={{ fontWeight: 700 }}
          />
          <Tab value="sub" label="Sub Entity" sx={{ fontWeight: 700 }} />
        </Tabs>

        <Stack spacing={2} sx={{ p: { xs: 1.5, md: 2 } }}>
          {activeTab === "business" ? (
            <>
              <BusinessEntityToolbar
                search={businessSearch}
                createdAtFrom={businessCreatedAtFrom}
                createdAtTo={businessCreatedAtTo}
                sortBy={businessSortBy}
                direction={businessDirection}
                onSearchChange={setBusinessSearch}
                onCreatedAtFromChange={setBusinessCreatedAtFrom}
                onCreatedAtToChange={setBusinessCreatedAtTo}
                onSortByChange={setBusinessSortBy}
                onDirectionChange={setBusinessDirection}
                onReset={resetBusinessFilters}
                onAdd={openBusinessCreate}
              />

              {businessQuery.isFetching && <LinearProgress />}

              {businessQuery.isError && (
                <Alert severity="error">
                  {getApiErrorMessage(businessQuery.error)}
                </Alert>
              )}

              <BusinessEntitiesDataGrid
                rows={businessQuery.data?.items ?? []}
                loading={businessQuery.isLoading}
                page={businessQuery.data?.page ?? businessPage}
                pageSize={businessQuery.data?.pageSize ?? businessPageSize}
                totalCount={businessQuery.data?.totalCount ?? 0}
                onPageChange={setBusinessPage}
                onPageSizeChange={setBusinessPageSize}
                onEdit={openBusinessEdit}
                onDelete={openBusinessDelete}
              />
            </>
          ) : (
            <>
              <SubEntityToolbar
                search={subSearch}
                businessEntityId={subBusinessEntityId}
                createdAtFrom={subCreatedAtFrom}
                createdAtTo={subCreatedAtTo}
                sortBy={subSortBy}
                direction={subDirection}
                businessEntityOptions={businessEntityOptionsQuery.data ?? []}
                onSearchChange={setSubSearch}
                onBusinessEntityIdChange={setSubBusinessEntityId}
                onCreatedAtFromChange={setSubCreatedAtFrom}
                onCreatedAtToChange={setSubCreatedAtTo}
                onSortByChange={setSubSortBy}
                onDirectionChange={setSubDirection}
                onReset={resetSubFilters}
                onAdd={openSubCreate}
              />

              {subQuery.isFetching && <LinearProgress />}

              {subQuery.isError && (
                <Alert severity="error">
                  {getApiErrorMessage(subQuery.error)}
                </Alert>
              )}

              {businessEntityOptionsQuery.isError && (
                <Alert severity="warning">
                  Business entity lookup list failed to load. You can still
                  browse records, but creating or editing sub entities may be
                  limited.
                </Alert>
              )}

              <SubEntitiesDataGrid
                rows={subQuery.data?.items ?? []}
                loading={subQuery.isLoading}
                page={subQuery.data?.page ?? subPage}
                pageSize={subQuery.data?.pageSize ?? subPageSize}
                totalCount={subQuery.data?.totalCount ?? 0}
                onPageChange={setSubPage}
                onPageSizeChange={setSubPageSize}
                onEdit={openSubEdit}
                onDelete={openSubDelete}
              />
            </>
          )}
        </Stack>
      </Box>

      <BusinessEntityFormDialog
        open={businessFormOpen}
        mode={businessFormMode}
        item={selectedBusinessEntity}
        loading={isBusinessSaving}
        onClose={closeBusinessForm}
        onSubmit={handleBusinessSubmit}
      />

      <SubEntityFormDialog
        open={subFormOpen}
        mode={subFormMode}
        item={selectedSubEntity}
        businessEntityOptions={businessEntityOptionsQuery.data ?? []}
        loading={isSubSaving}
        onClose={closeSubForm}
        onSubmit={handleSubSubmit}
      />

      <ConfirmDialog
        open={businessDeleteOpen}
        title="Delete business entity"
        description={`Are you sure you want to delete ${selectedBusinessEntity?.name ?? "this business entity"}? This action cannot be undone from the UI.`}
        confirmLabel="Delete"
        confirmColor="error"
        loading={deleteBusinessMutation.isPending}
        onClose={closeBusinessDelete}
        onConfirm={handleBusinessDeleteConfirm}
      />

      <ConfirmDialog
        open={subDeleteOpen}
        title="Delete sub entity"
        description={`Are you sure you want to delete ${selectedSubEntity?.name ?? "this sub entity"}? This action cannot be undone from the UI.`}
        confirmLabel="Delete"
        confirmColor="error"
        loading={deleteSubMutation.isPending}
        onClose={closeSubDelete}
        onConfirm={handleSubDeleteConfirm}
      />
    </Stack>
  );
}
