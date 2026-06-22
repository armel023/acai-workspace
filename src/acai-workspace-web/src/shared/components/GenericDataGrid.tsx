import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Box,
} from "@mui/material";
import type { ReactNode } from "react";

export type GenericDataGridColumn<TItem> = {
  key: string;
  header: string;
  width?: number | string;
  align?: "left" | "center" | "right";
  render: (item: TItem) => ReactNode;
};

type GenericDataGridProps<TItem> = {
  columns: GenericDataGridColumn<TItem>[];
  rows: TItem[];
  page: number;
  pageSize: number;
  totalCount: number;
  loading?: boolean;
  emptyMessage?: string;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  getRowKey: (item: TItem) => string;
};

export function GenericDataGrid<TItem>({
  columns,
  rows,
  page,
  pageSize,
  totalCount,
  loading = false,
  emptyMessage = "No records found.",
  onPageChange,
  onPageSizeChange,
  getRowKey,
}: GenericDataGridProps<TItem>) {
  const showEmpty = !loading && rows.length === 0;

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f7f9f8" }}>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  align={column.align ?? "left"}
                  sx={{
                    fontWeight: 700,
                    width: column.width,
                    px: { xs: 2.5, md: 3.5 },
                  }}
                >
                  {column.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={getRowKey(row)} hover>
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    align={column.align ?? "left"}
                    sx={{ px: { xs: 2.5, md: 3.5 } }}
                  >
                    {column.render(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {showEmpty && (
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Typography color="text.secondary">{emptyMessage}</Typography>
        </Box>
      )}

      <TablePagination
        component="div"
        count={totalCount}
        page={Math.max(page - 1, 0)}
        onPageChange={(_, nextPage) => onPageChange(nextPage + 1)}
        rowsPerPage={pageSize}
        onRowsPerPageChange={(event) =>
          onPageSizeChange(Number(event.target.value))
        }
        rowsPerPageOptions={[10, 20, 50]}
      />
    </Paper>
  );
}
