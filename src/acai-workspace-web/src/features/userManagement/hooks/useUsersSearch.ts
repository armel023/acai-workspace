import { useQuery } from "@tanstack/react-query";
import type { SearchUsersRequest } from "../dto/userManagementDto";
import { userManagementService } from "../services/userManagementService";
import { USER_MANAGEMENT_QUERY_KEY } from "./useUserManagementMutations";

export function useUsersSearch(request: SearchUsersRequest) {
  return useQuery({
    queryKey: [USER_MANAGEMENT_QUERY_KEY, "search", request],
    queryFn: () => userManagementService.searchUsers(request),
    refetchOnWindowFocus: false,
    staleTime: 15000,
  });
}
