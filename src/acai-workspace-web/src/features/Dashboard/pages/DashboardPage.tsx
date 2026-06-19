import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import AutoGraphRoundedIcon from "@mui/icons-material/AutoGraphRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { appNavigation } from "../../../shared/config/navigation";

const highlights = [
  {
    title: "Secure by Design",
    description:
      "Enterprise authentication, governance controls, and compliance-first operating model.",
    icon: <SecurityRoundedIcon fontSize="small" />,
  },
  {
    title: "Scalable AI Operations",
    description:
      "Multi-workload AI platform designed for document, audio, image, and chat intelligence.",
    icon: <AutoGraphRoundedIcon fontSize="small" />,
  },
  {
    title: "Business Velocity",
    description:
      "Accelerate decision-making with orchestrated agents and report-ready outputs.",
    icon: <TrendingUpRoundedIcon fontSize="small" />,
  },
];

export function DashboardPage() {
  const features = appNavigation.filter((item) => item.key !== "dashboard");

  return (
    <Stack spacing={3.2}>
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          background:
            "radial-gradient(circle at 86% 0%, rgba(20,184,166,0.2), transparent 35%), radial-gradient(circle at 6% 100%, rgba(180,83,9,0.1), transparent 30%), linear-gradient(130deg, #ffffff 0%, #f8fbfa 100%)",
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
          <Stack spacing={2.2}>
            <Chip
              label="Welcome to Acai Workspace"
              sx={{ width: "fit-content", fontWeight: 700 }}
              color="primary"
              variant="outlined"
            />
            <Typography variant="h4" sx={{ fontWeight: 700, maxWidth: 900 }}>
              Unified enterprise AI workspace for knowledge, automation, and
              governed execution.
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 860 }}>
              This dashboard centralizes your platform modules so teams can move
              from data to action using secure and auditable AI capabilities.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
              <Button
                component={RouterLink}
                to="/knowledge-base"
                variant="contained"
              >
                Explore Platform Modules
              </Button>
              <Button
                component={RouterLink}
                to="/user-management"
                variant="text"
              >
                Open User Management
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        {highlights.map((item) => (
          <Grid key={item.title} size={{ xs: 12, md: 4 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                height: "100%",
              }}
            >
              <CardContent>
                <Stack spacing={1.2}>
                  <Chip
                    icon={item.icon}
                    label={item.title}
                    sx={{ width: "fit-content", fontWeight: 600 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1.5,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Application Features Overview
          </Typography>
          <Chip label={`${features.length} Modules`} variant="outlined" />
        </Stack>

        <Grid container spacing={2}>
          {features.map((feature) => (
            <Grid key={feature.key} size={{ xs: 12, sm: 6, xl: 4 }}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  transition: "transform 120ms ease, box-shadow 120ms ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 24px rgba(8, 47, 45, 0.08)",
                  },
                }}
              >
                <CardContent>
                  <Stack spacing={1.2}>
                    <Typography sx={{ fontWeight: 700 }}>
                      {feature.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                    <Stack
                      direction="row"
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        pt: 0.5,
                      }}
                    >
                      <Chip
                        label="Coming Soon"
                        color="secondary"
                        variant="outlined"
                        size="small"
                      />
                      <Button
                        component={RouterLink}
                        to={feature.path}
                        size="small"
                        endIcon={<ArrowForwardRoundedIcon fontSize="small" />}
                      >
                        Open
                      </Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
}
