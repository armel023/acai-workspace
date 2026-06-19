import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  CircularProgress,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "../components/AuthLayout";
import { AuthTextField } from "../components/AuthTextField";
import { loginSchema, type LoginFormValues } from "../schemas/loginSchema";
import { loginWithDummyData } from "../services/authDemoService";

export function LoginPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "arielle@acaiworkspace.com",
      password: "Acai@2026",
      rememberMe: true,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);

    const result = await loginWithDummyData(values.email, values.password);

    if (!result.success) {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsSubmitting(false);
      return;
    }

    enqueueSnackbar(result.message, { variant: "success" });
    setIsSubmitting(false);
    navigate("/dashboard", { replace: true });
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to your Acai Workspace portal"
    >
      <Stack spacing={2.25} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Alert severity="info" sx={{ borderRadius: 2 }}>
          Demo credentials: arielle@acaiworkspace.com / Acai@2026
        </Alert>

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <AuthTextField
              {...field}
              label="Work email"
              autoComplete="email"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <AuthTextField
              {...field}
              label="Password"
              type="password"
              autoComplete="current-password"
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />
          )}
        />

        <Controller
          name="rememberMe"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={field.value}
                  onChange={(event) => field.onChange(event.target.checked)}
                />
              }
              label="Remember this trusted device"
            />
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          variant="contained"
          size="large"
          sx={{ borderRadius: 2, py: 1.2, fontWeight: 700 }}
        >
          {isSubmitting ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            "Sign In"
          )}
        </Button>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No account yet?
          </Typography>
          <Button component={RouterLink} to="/auth/register" size="small">
            Create Account
          </Button>
        </Box>

        <Typography variant="caption" color="text.secondary">
          By continuing, you agree to enterprise security and compliance
          policies.
        </Typography>

        <Link
          component={RouterLink}
          to="/auth/register"
          underline="hover"
          sx={{ width: "fit-content" }}
        >
          Need to onboard a new user? Register here
        </Link>
      </Stack>
    </AuthLayout>
  );
}
