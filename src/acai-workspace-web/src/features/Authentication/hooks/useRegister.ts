import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/authService";
import type { RegisterRequest } from "../dto/authDto";
import { AUTH_QUERY_KEY } from "./useLogin";

export function useRegister() {
  return useMutation({
    mutationKey: [AUTH_QUERY_KEY, "register"],
    mutationFn: (request: RegisterRequest) => authService.register(request),
  });
}
