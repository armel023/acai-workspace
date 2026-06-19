import type { ReactNode } from "react";
import { Box, Paper, Stack, Typography, Chip } from "@mui/material";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        px: { xs: 2, md: 4 },
        py: { xs: 4, md: 6 },
        background:
          "radial-gradient(circle at 12% 8%, rgba(15, 118, 110, 0.2), transparent 36%), radial-gradient(circle at 88% 90%, rgba(180, 83, 9, 0.14), transparent 34%), linear-gradient(120deg, #f8faf8 0%, #eef4f0 48%, #f5f2eb 100%)",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 1060,
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.05fr 1fr" },
          boxShadow: "0 22px 70px rgba(15, 23, 42, 0.14)",
          backdropFilter: "blur(2px)",
          minHeight: { xs: "auto", md: 680 },
        }}
      >
        <Box
          sx={{
            p: { xs: 3, md: 5 },
            color: "#f8fafc",
            background:
              "linear-gradient(155deg, #052e2b 0%, #0f766e 48%, #134e4a 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 4,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              opacity: 0.18,
              backgroundImage:
                "linear-gradient(45deg, rgba(255,255,255,0.12) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.12) 75%, transparent 75%, transparent)",
              backgroundSize: "28px 28px",
            }}
          />

          <Stack
            direction="row"
            spacing={1}
            sx={{ zIndex: 1, alignItems: "center" }}
          >
            <WorkspacePremiumRoundedIcon />
            <Typography sx={{ fontWeight: 700, letterSpacing: 0.3 }}>
              Acai Workspace
            </Typography>
          </Stack>

          <Stack spacing={2} sx={{ zIndex: 1 }}>
            <Chip
              label="Enterprise AI Workspace"
              sx={{
                width: "fit-content",
                color: "#ecfeff",
                bgcolor: "rgba(236, 254, 255, 0.18)",
                border: "1px solid rgba(236, 254, 255, 0.26)",
                fontWeight: 600,
              }}
            />
            <Typography variant="h3" sx={{ fontWeight: 700, lineHeight: 1.12 }}>
              Secure access for modern teams and compliant AI workflows.
            </Typography>
            <Typography
              sx={{ color: "rgba(236, 254, 255, 0.86)", maxWidth: 480 }}
            >
              Role-aware identity, audit readiness, and centralized policy
              control designed for enterprise operations.
            </Typography>
          </Stack>

          <Typography sx={{ color: "rgba(236, 254, 255, 0.92)", zIndex: 1 }}>
            Single-sign-on ready architecture with enterprise access controls
            and auditable identity events.
          </Typography>
        </Box>

        <Box
          sx={{
            p: { xs: 3, md: 5 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            bgcolor: "#ffffff",
          }}
        >
          <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: "text.primary" }}
            >
              {title}
            </Typography>
            <Typography color="text.secondary">{subtitle}</Typography>
          </Stack>

          {children}
        </Box>
      </Paper>
    </Box>
  );
}
