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
  UserAssignmentSortBy,
  UserOption,
} from "../dto/userAssignmentDto";
import type { UserAssignmentActiveFilter } from "../stores/useUserAssignmentStore";

type UserAssignmentToolbarProps = {
  search: string;
  userId: string;
  businessEntityId: string;
  isActiveFilter: UserAssignmentActiveFilter;
  sortBy: UserAssignmentSortBy;
  direction: "asc" | "desc";
  users: UserOption[];
  businessEntities: BusinessEntityOption[];
  onSearchChange: (value: string) => void;
  onUserIdChange: (value: string) => void;
  onBusinessEntityIdChange: (value: string) => void;
  onIsActiveFilterChange: (value: UserAssignmentActiveFilter) => void;
  onSortByChange: (value: UserAssignmentSortBy) => void;
  onDirectionChange: (value: "asc" | "desc") => void;
  onReset: () => void;
  onAdd: () => void;
};

export function UserAssignmentToolbar({
  search,
  userId,
  businessEntityId,
  isActiveFilter,
  sortBy,
  direction,
  users,
  businessEntities,
  onSearchChange,
  onUserIdChange,
  onBusinessEntityIdChange,
  onIsActiveFilterChange,
  onSortByChange,
  onDirectionChange,
  onReset,
  onAdd,
}: UserAssignmentToolbarProps) {
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
          User Assignments
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={onAdd}
          sx={{ borderRadius: 2, fontWeight: 700 }}
        >
          Add Assignment
        </Button>
      </Stack>

      <Grid container spacing={1.5} sx={{ alignItems: { md: "center" } }}>
        <Grid size={{ xs: 12, lg: 3 }}>
          <TextField
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by user, role, or scope"
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

        <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
          <TextField
            select
            label="User"
            size="small"
            fullWidth
            value={userId}
            onChange={(event) => onUserIdChange(event.target.value)}
          >
            <MenuItem value="">All Users</MenuItem>
            {users.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.displayName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
          <TextField
            select
            label="Business Entity"
            size="small"
            fullWidth
            value={businessEntityId}
            onChange={(event) => onBusinessEntityIdChange(event.target.value)}
          >
            <MenuItem value="">All Entities</MenuItem>
            {businessEntities.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name} ({option.code})
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 1.5 }}>
          <TextField
            select
            label="Status"
            size="small"
            fullWidth
            value={isActiveFilter}
            onChange={(event) =>
              onIsActiveFilterChange(
                event.target.value as UserAssignmentActiveFilter,
              )
            }
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 1.5 }}>
          <TextField
            select
            label="Sort By"
            size="small"
            fullWidth
            value={sortBy}
            onChange={(event) =>
              onSortByChange(event.target.value as UserAssignmentSortBy)
            }
          >
            <MenuItem value="createdAt">Created Date</MenuItem>
            <MenuItem value="modifiedAt">Modified Date</MenuItem>
            <MenuItem value="userDisplayName">User</MenuItem>
            <MenuItem value="role">Role</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 1 }}>
          <TextField
            select
            label="Direction"
            size="small"
            fullWidth
            value={direction}
            onChange={(event) =>
              onDirectionChange(event.target.value as "asc" | "desc")
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
