import { useMemo } from "react";
import { Chip, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import type { BusinessEntityItem } from "../dto/organizationManagementDto";
import {
  GenericDataGrid,
  type GenericDataGridColumn,
} from "../../../shared/components/GenericDataGrid";

type BusinessEntitiesDataGridProps = {
  rows: BusinessEntityItem[];
  loading?: boolean;
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onEdit: (item: BusinessEntityItem) => void;
  onDelete: (item: BusinessEntityItem) => void;
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

export function BusinessEntitiesDataGrid({
  rows,
  loading = false,
  page,
  pageSize,
  totalCount,
  onPageChange,
  onPageSizeChange,
  onEdit,
  onDelete,
}: BusinessEntitiesDataGridProps) {
  const columns = useMemo<GenericDataGridColumn<BusinessEntityItem>[]>(
    () => [
      {
        key: "name",
        header: "Business Entity",
        width: "28%",
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
        key: "description",
        header: "Description",
        width: "30%",
        render: (row) => (
          <Typography variant="body2" color="text.secondary">
            {row.description?.trim() ? row.description : "-"}
          </Typography>
        ),
      },
      {
        key: "createdAt",
        header: "Created",
        width: "16%",
        render: (row) => formatDate(row.createdAt),
      },
      {
        key: "modifiedAt",
        header: "Last Updated",
        width: "14%",
        render: (row) =>
          row.modifiedAt ? (
            formatDate(row.modifiedAt)
          ) : (
            <Chip label="Not updated" size="small" variant="outlined" />
          ),
      },
      {
        key: "actions",
        header: "Actions",
        align: "right",
        width: "12%",
        render: (row) => (
          <Stack
            direction="row"
            spacing={0.5}
            sx={{ justifyContent: "flex-end" }}
          >
            <Tooltip title="Edit business entity">
              <IconButton
                size="small"
                color="primary"
                onClick={() => onEdit(row)}
              >
                <EditRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete business entity">
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
      emptyMessage="No business entities found for the selected filters."
    />
  );
}
