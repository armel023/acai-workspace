import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import type {
  BusinessEntityOption,
  SortDirection,
} from "../dto/organizationManagementDto";

type SubEntityToolbarProps = {
  search: string;
  businessEntityId: string;
  createdAtFrom: string;
  createdAtTo: string;
  sortBy: "name" | "code" | "createdAt";
  direction: SortDirection;
  businessEntityOptions: BusinessEntityOption[];
  onSearchChange: (value: string) => void;
  onBusinessEntityIdChange: (value: string) => void;
  onCreatedAtFromChange: (value: string) => void;
  onCreatedAtToChange: (value: string) => void;
  onSortByChange: (value: "name" | "code" | "createdAt") => void;
  onDirectionChange: (value: SortDirection) => void;
  onReset: () => void;
  onAdd: () => void;
};

export function SubEntityToolbar({
  search,
  businessEntityId,
  createdAtFrom,
  createdAtTo,
  sortBy,
  direction,
  businessEntityOptions,
  onSearchChange,
  onBusinessEntityIdChange,
  onCreatedAtFromChange,
  onCreatedAtToChange,
  onSortByChange,
  onDirectionChange,
  onReset,
  onAdd,
}: SubEntityToolbarProps) {
  return (
    <Box
      sx={{
        p: { xs: 2, md: 2.5 },
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "#ffffff",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={1.5}
        sx={{
          justifyContent: "space-between",
          alignItems: { md: "center" },
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Sub Entities
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={onAdd}
          sx={{ borderRadius: 2, fontWeight: 700 }}
        >
          Add Sub Entity
        </Button>
      </Stack>

      <Grid container spacing={1.5} sx={{ alignItems: { md: "center" } }}>
        <Grid size={{ xs: 12, lg: 3 }}>
          <TextField
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by name, code, description"
            size="small"
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 2 }}>
          <TextField
            select
            label="Business Entity"
            size="small"
            fullWidth
            value={businessEntityId}
            onChange={(event) => onBusinessEntityIdChange(event.target.value)}
          >
            <MenuItem value="">All Business Entities</MenuItem>
            {businessEntityOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name} ({option.code})
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
          <TextField
            label="Created From"
            type="date"
            size="small"
            fullWidth
            value={createdAtFrom}
            onChange={(event) => onCreatedAtFromChange(event.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
          <TextField
            label="Created To"
            type="date"
            size="small"
            fullWidth
            value={createdAtTo}
            onChange={(event) => onCreatedAtToChange(event.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 1 }}>
          <TextField
            select
            label="Sort"
            size="small"
            fullWidth
            value={sortBy}
            onChange={(event) =>
              onSortByChange(
                event.target.value as "name" | "code" | "createdAt",
              )
            }
          >
            <MenuItem value="createdAt">Created</MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="code">Code</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 1 }}>
          <TextField
            select
            label="Dir"
            size="small"
            fullWidth
            value={direction}
            onChange={(event) =>
              onDirectionChange(event.target.value as SortDirection)
            }
          >
            <MenuItem value="desc">Desc</MenuItem>
            <MenuItem value="asc">Asc</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, lg: 1 }}>
          <Button
            variant="outlined"
            startIcon={<FilterAltRoundedIcon />}
            onClick={onReset}
            fullWidth
            sx={{ borderRadius: 2, whiteSpace: "nowrap" }}
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
