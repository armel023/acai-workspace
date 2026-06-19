import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getApiErrorMessage } from "../../../shared/lib/apiClient";
import { AuthLayout } from "../components/AuthLayout";
import { AuthTextField } from "../components/AuthTextField";
import { useLogin } from "../hooks/useLogin";
import { loginSchema, type LoginFormValues } from "../schemas/loginSchema";

export function LoginPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const loginMutation = useLogin();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setIsSubmitting(true);
      console.log("Submitting login form with values:", values);
      await loginMutation.mutateAsync({
        email: values.email,
        password: values.password,
        useCookie: values.rememberMe,
      });
      enqueueSnackbar("Signed in successfully.", { variant: "success" });
      navigate("/dashboard", { replace: true });
    } catch (error) {
      enqueueSnackbar(getApiErrorMessage(error), { variant: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to your Acai Workspace portal"
    >
      <Stack spacing={2.25} component="form" onSubmit={handleSubmit(onSubmit)}>
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
      </Stack>
    </AuthLayout>
  );
}
