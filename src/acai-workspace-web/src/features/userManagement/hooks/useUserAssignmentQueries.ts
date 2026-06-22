import { useQuery } from "@tanstack/react-query";
import type { SearchUserAssignmentsRequest } from "../dto/userAssignmentDto";
import { userAssignmentService } from "../services/userAssignmentService";
import { USER_ASSIGNMENT_QUERY_KEY } from "./useUserAssignmentMutations";

export function useUserAssignmentSearch(request: SearchUserAssignmentsRequest) {
  return useQuery({
    queryKey: [USER_ASSIGNMENT_QUERY_KEY, "search", request],
    queryFn: () => userAssignmentService.searchUserAssignments(request),
    refetchOnWindowFocus: false,
    staleTime: 15000,
  });
}

export function useAssignmentUserOptions() {
  return useQuery({
    queryKey: [USER_ASSIGNMENT_QUERY_KEY, "options", "users"],
    queryFn: () => userAssignmentService.getUserOptions(),
    refetchOnWindowFocus: false,
    staleTime: 30000,
  });
}

export function useAssignmentBusinessEntityOptions() {
  return useQuery({
    queryKey: [USER_ASSIGNMENT_QUERY_KEY, "options", "business-entities"],
    queryFn: () => userAssignmentService.getBusinessEntityOptions(),
    refetchOnWindowFocus: false,
    staleTime: 30000,
  });
}

export function useAssignmentSubEntityOptions() {
  return useQuery({
    queryKey: [USER_ASSIGNMENT_QUERY_KEY, "options", "sub-entities"],
    queryFn: () => userAssignmentService.getSubEntityOptions(),
    refetchOnWindowFocus: false,
    staleTime: 30000,
  });
}

export function useAssignmentRoleOptions() {
  return useQuery({
    queryKey: [USER_ASSIGNMENT_QUERY_KEY, "options", "roles"],
    queryFn: () => userAssignmentService.getRoleOptions(),
    refetchOnWindowFocus: false,
    staleTime: 15000,
  });
}
