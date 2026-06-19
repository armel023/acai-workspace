import { useQuery } from "@tanstack/react-query";
import { authService } from "../services/authService";
import { AUTH_QUERY_KEY } from "./useLogin";

export function useCurrentUser(enabled = true) {
  return useQuery({
    queryKey: [AUTH_QUERY_KEY, "me"],
    queryFn: () => authService.getCurrentUser(),
    enabled,
    refetchOnWindowFocus: false,
  });
}
