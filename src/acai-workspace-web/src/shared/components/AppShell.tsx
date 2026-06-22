import { useMemo, useState, type ReactElement } from "react";
import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Chip,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import GraphicEqRoundedIcon from "@mui/icons-material/GraphicEqRounded";
import ImageSearchRoundedIcon from "@mui/icons-material/ImageSearchRounded";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import Diversity3RoundedIcon from "@mui/icons-material/Diversity3Rounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { appNavigation } from "../config/navigation";

const drawerWidth = 290;

function getNavIcon(key: string): ReactElement {
  switch (key) {
    case "dashboard":
      return <DashboardRoundedIcon fontSize="small" />;
    case "knowledge-base":
      return <HubRoundedIcon fontSize="small" />;
    case "ai-chat":
      return <ChatRoundedIcon fontSize="small" />;
    case "document-intelligence":
      return <DescriptionRoundedIcon fontSize="small" />;
    case "audio-intelligence":
      return <GraphicEqRoundedIcon fontSize="small" />;
    case "image-intelligence":
      return <ImageSearchRoundedIcon fontSize="small" />;
    case "report-generation":
      return <SummarizeRoundedIcon fontSize="small" />;
    case "multi-agent-workflows":
      return <Diversity3RoundedIcon fontSize="small" />;
    case "user-management":
      return <GroupRoundedIcon fontSize="small" />;
    case "organization-management":
      return <AccountTreeRoundedIcon fontSize="small" />;
    default:
      return <AutoAwesomeRoundedIcon fontSize="small" />;
  }
}

export function AppShell() {
  const location = useLocation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const pageTitle = useMemo(() => {
    const active = appNavigation.find(
      (item) => item.path === location.pathname,
    );
    return active?.label ?? "Acai Workspace";
  }, [location.pathname]);

  const navigationContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#082f2d",
        color: "#e6fffb",
      }}
    >
      <Stack spacing={2} sx={{ p: 2.5, pb: 2 }}>
        <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
          <Avatar
            sx={{ bgcolor: "rgba(255,255,255,0.15)", width: 36, height: 36 }}
          >
            <AutoAwesomeRoundedIcon fontSize="small" />
          </Avatar>
          <Box>
            <Typography sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              Acai Workspace
            </Typography>
          </Box>
        </Stack>
      </Stack>

      <Divider sx={{ borderColor: "rgba(230,255,251,0.12)" }} />

      <List sx={{ px: 1.5, py: 1.5, flexGrow: 1 }}>
        {appNavigation.map((item) => {
          const selected = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.key}
              component={RouterLink}
              to={item.path}
              selected={selected}
              onClick={() => setMobileOpen(false)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                alignItems: "flex-start",
                "&.Mui-selected": {
                  bgcolor: "rgba(20,184,166,0.2)",
                  color: "#99f6e4",
                },
                "&.Mui-selected:hover": {
                  bgcolor: "rgba(20,184,166,0.28)",
                },
                "&:hover": {
                  bgcolor: "rgba(230,255,251,0.08)",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 34, color: "inherit", mt: 0.35 }}>
                {getNavIcon(item.key)}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: selected ? 700 : 600,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.label}
                  </Typography>
                }
                secondary={
                  <Typography
                    sx={{
                      color: "rgba(230,255,251,0.72)",
                      fontSize: 11.5,
                      mt: 0.25,
                      lineHeight: 1.25,
                    }}
                  >
                    {item.description}
                  </Typography>
                }
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f4f7f5" }}>
      {!isDesktop && (
        <AppBar
          position="fixed"
          color="inherit"
          elevation={0}
          sx={{ borderBottom: "1px solid", borderColor: "divider" }}
        >
          <Toolbar>
            <IconButton
              onClick={() => setMobileOpen(true)}
              edge="start"
              aria-label="open navigation"
            >
              <MenuRoundedIcon />
            </IconButton>
            <Typography sx={{ ml: 1, fontWeight: 700, flexGrow: 1 }}>
              {pageTitle}
            </Typography>
            <IconButton
              component={RouterLink}
              to="/auth/login"
              aria-label="sign out"
            >
              <LogoutRoundedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
      >
        {isDesktop ? (
          <Drawer
            variant="permanent"
            sx={{
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                border: "none",
              },
            }}
            open
          >
            {navigationContent}
          </Drawer>
        ) : (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                border: "none",
              },
            }}
          >
            {navigationContent}
          </Drawer>
        )}
      </Box>

      <Box component="main" sx={{ flexGrow: 1, minWidth: 0 }}>
        <Box sx={{ px: { xs: 2, md: 3.5 }, py: { xs: 10, lg: 3.5 } }}>
          {isDesktop && (
            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3.5,
              }}
            >
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {pageTitle}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  Manage your enterprise AI workflows in one secure workspace.
                </Typography>
              </Box>
              <Chip
                icon={<LogoutRoundedIcon fontSize="small" />}
                label="Sign Out"
                clickable
                component={RouterLink}
                to="/auth/login"
              />
            </Stack>
          )}

          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
