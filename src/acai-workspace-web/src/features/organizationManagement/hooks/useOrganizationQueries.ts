import { useQuery } from "@tanstack/react-query";
import type {
  SearchBusinessEntitiesRequest,
  SearchSubEntitiesRequest,
} from "../dto/organizationManagementDto";
import { organizationManagementService } from "../services/organizationManagementService";
import { ORGANIZATION_QUERY_KEY } from "./useOrganizationMutations";

export function useBusinessEntitySearch(
  request: SearchBusinessEntitiesRequest,
) {
  return useQuery({
    queryKey: [ORGANIZATION_QUERY_KEY, "business", "search", request],
    queryFn: () =>
      organizationManagementService.searchBusinessEntities(request),
    refetchOnWindowFocus: false,
    staleTime: 15000,
  });
}

export function useSubEntitySearch(request: SearchSubEntitiesRequest) {
  return useQuery({
    queryKey: [ORGANIZATION_QUERY_KEY, "sub", "search", request],
    queryFn: () => organizationManagementService.searchSubEntities(request),
    refetchOnWindowFocus: false,
    staleTime: 15000,
  });
}

export function useBusinessEntityOptions() {
  return useQuery({
    queryKey: [ORGANIZATION_QUERY_KEY, "business", "options"],
    queryFn: () => organizationManagementService.getBusinessEntityOptions(),
    refetchOnWindowFocus: false,
    staleTime: 30000,
  });
}
