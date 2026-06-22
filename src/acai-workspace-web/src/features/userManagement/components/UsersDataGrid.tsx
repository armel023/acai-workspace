import { useMemo } from "react";
import { Chip, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import type { UserItem } from "../dto/userManagementDto";
import {
  GenericDataGrid,
  type GenericDataGridColumn,
} from "../../../shared/components/GenericDataGrid";

type UsersDataGridProps = {
  rows: UserItem[];
  loading?: boolean;
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onEdit: (user: UserItem) => void;
  onDelete: (user: UserItem) => void;
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

export function UsersDataGrid({
  rows,
  loading = false,
  page,
  pageSize,
  totalCount,
  onPageChange,
  onPageSizeChange,
  onEdit,
  onDelete,
}: UsersDataGridProps) {
  const columns = useMemo<GenericDataGridColumn<UserItem>[]>(
    () => [
      {
        key: "fullName",
        header: "User",
        width: "26%",
        render: (row) => (
          <Stack spacing={0.25}>
            <Typography sx={{ fontWeight: 700 }}>{row.fullName}</Typography>
            <Typography variant="caption" color="text.secondary">
              @{row.username}
            </Typography>
          </Stack>
        ),
      },
      {
        key: "email",
        header: "Email",
        width: "22%",
        render: (row) => (
          <Typography variant="body2" color="text.secondary">
            {row.email}
          </Typography>
        ),
      },
      {
        key: "createdAt",
        header: "Created",
        width: "18%",
        render: (row) => formatDate(row.createdAt),
      },
      {
        key: "modifiedAt",
        header: "Last Updated",
        width: "18%",
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
        width: "16%",
        render: (row) => (
          <Stack
            direction="row"
            spacing={0.5}
            sx={{ justifyContent: "flex-end" }}
          >
            <Tooltip title="Edit user">
              <IconButton
                size="small"
                color="primary"
                onClick={() => onEdit(row)}
              >
                <EditRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete user">
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
      emptyMessage="No users found for the selected filters."
    />
  );
}
