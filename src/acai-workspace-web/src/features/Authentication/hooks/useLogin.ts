import { useMutation } from "@tanstack/react-query";
import { setAccessToken } from "../../../shared/lib/apiClient";
import { authService } from "../services/authService";
import type { LoginRequest } from "../dto/authDto";

export const AUTH_QUERY_KEY = "auth";

export function useLogin() {
  return useMutation({
    mutationKey: [AUTH_QUERY_KEY, "login"],
    mutationFn: (request: LoginRequest) => authService.login(request),
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
    },
  });
}
