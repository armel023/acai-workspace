import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";

type ComingSoonPageProps = {
  title: string;
  description: string;
};

export function ComingSoonPage({ title, description }: ComingSoonPageProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        background:
          "radial-gradient(circle at 100% 0%, rgba(20,184,166,0.18), transparent 34%), linear-gradient(140deg, #ffffff 0%, #f6fbfa 100%)",
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
        <Stack spacing={2.2}>
          <Chip
            icon={<RocketLaunchRoundedIcon fontSize="small" />}
            label="Coming Soon"
            color="secondary"
            variant="outlined"
            sx={{ width: "fit-content", fontWeight: 700 }}
          />
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 780 }}>
            {description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This module is already routed and visible in navigation. Full
            feature implementation will be added in a future iteration.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
