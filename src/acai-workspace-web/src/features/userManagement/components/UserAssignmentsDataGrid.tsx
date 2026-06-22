import { useMemo } from "react";
import { Chip, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import type { UserAssignmentItem } from "../dto/userAssignmentDto";
import {
  GenericDataGrid,
  type GenericDataGridColumn,
} from "../../../shared/components/GenericDataGrid";

type UserAssignmentsDataGridProps = {
  rows: UserAssignmentItem[];
  loading?: boolean;
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onEdit: (item: UserAssignmentItem) => void;
  onDelete: (item: UserAssignmentItem) => void;
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

function renderScope(row: UserAssignmentItem) {
  if (!row.businessEntityName) {
    return "Global";
  }

  if (row.subEntityName) {
    return `${row.businessEntityName} / ${row.subEntityName}`;
  }

  return row.businessEntityName;
}

export function UserAssignmentsDataGrid({
  rows,
  loading = false,
  page,
  pageSize,
  totalCount,
  onPageChange,
  onPageSizeChange,
  onEdit,
  onDelete,
}: UserAssignmentsDataGridProps) {
  const columns = useMemo<GenericDataGridColumn<UserAssignmentItem>[]>(
    () => [
      {
        key: "userDisplayName",
        header: "User",
        width: "24%",
        render: (row) => (
          <Stack spacing={0.25}>
            <Typography sx={{ fontWeight: 700 }}>
              {row.userDisplayName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {row.userEmail}
            </Typography>
          </Stack>
        ),
      },
      {
        key: "role",
        header: "Role",
        width: "18%",
        render: (row) => (
          <Stack spacing={0.25}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {row.role}
            </Typography>
          </Stack>
        ),
      },
      {
        key: "scope",
        header: "Scope",
        width: "24%",
        render: (row) => (
          <Typography variant="body2" color="text.secondary">
            {renderScope(row)}
          </Typography>
        ),
      },
      {
        key: "status",
        header: "Status",
        width: "10%",
        render: (row) => (
          <Chip
            label={row.isActive ? "Active" : "Inactive"}
            size="small"
            color={row.isActive ? "success" : "default"}
            variant={row.isActive ? "filled" : "outlined"}
          />
        ),
      },
      {
        key: "modifiedAt",
        header: "Last Updated",
        width: "14%",
        render: (row) => formatDate(row.modifiedAt ?? row.createdAt),
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
            <Tooltip title="Edit assignment">
              <IconButton
                size="small"
                color="primary"
                onClick={() => onEdit(row)}
              >
                <EditRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete assignment">
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
      emptyMessage="No user assignments found for the selected filters."
    />
  );
}
