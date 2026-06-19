import { useMemo, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getApiErrorMessage } from "../../../shared/lib/apiClient";
import { AuthLayout } from "../components/AuthLayout";
import { AuthTextField } from "../components/AuthTextField";
import { useRegister } from "../hooks/useRegister";
import {
  registerSchema,
  type RegisterFormValues,
} from "../schemas/registerSchema";

function getPasswordStrength(password: string): number {
  const checks = [
    password.length >= 10,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];

  return checks.filter(Boolean).length;
}

export function RegisterPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const registerMutation = useRegister();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");
  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      setIsSubmitting(true);
      await registerMutation.mutateAsync({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });
      enqueueSnackbar("Registration successful. You can now sign in.", {
        variant: "success",
      });
      navigate("/auth/login", { replace: true });
    } catch (error) {
      enqueueSnackbar(getApiErrorMessage(error), { variant: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const strengthPercent = (strength / 5) * 100;

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Register for secure access to Acai Workspace"
    >
      <Stack spacing={2.25} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
          }}
        >
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <AuthTextField
                {...field}
                label="First name"
                autoComplete="given-name"
                error={Boolean(errors.firstName)}
                helperText={errors.firstName?.message}
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <AuthTextField
                {...field}
                label="Last name"
                autoComplete="family-name"
                error={Boolean(errors.lastName)}
                helperText={errors.lastName?.message}
              />
            )}
          />
        </Box>

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
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              error={Boolean(errors.password)}
              helperText={
                errors.password?.message ??
                "Use 10+ chars, uppercase, number, and symbol"
              }
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((value) => !value)}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? (
                          <VisibilityOffRoundedIcon fontSize="small" />
                        ) : (
                          <VisibilityRoundedIcon fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        />

        <Box>
          <LinearProgress
            variant="determinate"
            value={strengthPercent}
            sx={{
              height: 8,
              borderRadius: 999,
              bgcolor: "#eef2f7",
              "& .MuiLinearProgress-bar": {
                borderRadius: 999,
              },
            }}
          />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 0.75, display: "block" }}
          >
            Password strength: {strength}/5
          </Typography>
        </Box>

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <AuthTextField
              {...field}
              label="Confirm password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword?.message}
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
            "Register"
          )}
        </Button>

        <Typography variant="body2" color="text.secondary">
          Already registered?{" "}
          <Box
            component={RouterLink}
            to="/auth/login"
            sx={{
              color: "primary.main",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Sign in
          </Box>
        </Typography>
      </Stack>
    </AuthLayout>
  );
}
