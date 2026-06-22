import { useMemo } from "react";
import { Chip, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import type { SubEntityItem } from "../dto/organizationManagementDto";
import {
  GenericDataGrid,
  type GenericDataGridColumn,
} from "../../../shared/components/GenericDataGrid";

type SubEntitiesDataGridProps = {
  rows: SubEntityItem[];
  loading?: boolean;
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onEdit: (item: SubEntityItem) => void;
  onDelete: (item: SubEntityItem) => void;
};

function formatDate(value: string | null): string {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function SubEntitiesDataGrid({
  rows,
  loading = false,
  page,
  pageSize,
  totalCount,
  onPageChange,
  onPageSizeChange,
  onEdit,
  onDelete,
}: SubEntitiesDataGridProps) {
  const columns = useMemo<GenericDataGridColumn<SubEntityItem>[]>(
    () => [
      {
        key: "name",
        header: "Sub Entity",
        width: "24%",
        render: (row) => (
          <Stack spacing={0.25}>
            <Typography sx={{ fontWeight: 700 }}>{row.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {row.code}
            </Typography>
          </Stack>
        ),
      },
      {
        key: "businessEntityName",
        header: "Business Entity",
        width: "22%",
        render: (row) => row.businessEntityName,
      },
      {
        key: "description",
        header: "Description",
        width: "24%",
        render: (row) => (
          <Typography variant="body2" color="text.secondary">
            {row.description?.trim() ? row.description : "-"}
          </Typography>
        ),
      },
      {
        key: "createdAt",
        header: "Created",
        width: "12%",
        render: (row) => formatDate(row.createdAt),
      },
      {
        key: "modifiedAt",
        header: "Updated",
        width: "8%",
        render: (row) =>
          row.modifiedAt ? (
            formatDate(row.modifiedAt)
          ) : (
            <Chip label="-" size="small" variant="outlined" />
          ),
      },
      {
        key: "actions",
        header: "Actions",
        align: "right",
        width: "10%",
        render: (row) => (
          <Stack
            direction="row"
            spacing={0.5}
            sx={{ justifyContent: "flex-end" }}
          >
            <Tooltip title="Edit sub entity">
              <IconButton
                size="small"
                color="primary"
                onClick={() => onEdit(row)}
              >
                <EditRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete sub entity">
              <IconButton
                size="small"
                color="error"
                onClick={() => onDelete(row)}
              >
                <DeleteRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        ),
      },
    ],
    [onDelete, onEdit],
  );

  return (
    <GenericDataGrid
      columns={columns}
      rows={rows}
      loading={loading}
      page={page}
      pageSize={pageSize}
      totalCount={totalCount}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      getRowKey={(item) => item.id}
      emptyMessage="No sub entities found for the selected filters."
    />
  );
}
