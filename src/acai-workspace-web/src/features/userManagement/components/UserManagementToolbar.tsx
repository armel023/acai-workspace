import {
  Box,
  Button,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

type UserManagementToolbarProps = {
  search: string;
  createdAtFrom: string;
  createdAtTo: string;
  sortBy: "firstName" | "lastName" | "createdAt";
  direction: "asc" | "desc";
  onSearchChange: (value: string) => void;
  onCreatedAtFromChange: (value: string) => void;
  onCreatedAtToChange: (value: string) => void;
  onSortByChange: (value: "firstName" | "lastName" | "createdAt") => void;
  onDirectionChange: (value: "asc" | "desc") => void;
  onReset: () => void;
  onAddUser: () => void;
};

export function UserManagementToolbar({
  search,
  createdAtFrom,
  createdAtTo,
  sortBy,
  direction,
  onSearchChange,
  onCreatedAtFromChange,
  onCreatedAtToChange,
  onSortByChange,
  onDirectionChange,
  onReset,
  onAddUser,
}: UserManagementToolbarProps) {
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
          User Directory
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={onAddUser}
          sx={{ borderRadius: 2, fontWeight: 700 }}
        >
          Add User
        </Button>
      </Stack>

      <Grid container spacing={1.5} sx={{ alignItems: { md: "center" } }}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <TextField
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by name, email, or username"
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

        <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
          <TextField
            select
            label="Sort By"
            size="small"
            fullWidth
            value={sortBy}
            onChange={(event) =>
              onSortByChange(
                event.target.value as "firstName" | "lastName" | "createdAt",
              )
            }
          >
            <MenuItem value="createdAt">Created Date</MenuItem>
            <MenuItem value="firstName">First Name</MenuItem>
            <MenuItem value="lastName">Last Name</MenuItem>
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
            <MenuItem value="desc">Descending</MenuItem>
            <MenuItem value="asc">Ascending</MenuItem>
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
