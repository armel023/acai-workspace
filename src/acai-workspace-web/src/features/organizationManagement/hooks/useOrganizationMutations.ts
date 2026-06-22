import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  CreateBusinessEntityRequest,
  CreateSubEntityRequest,
  UpdateBusinessEntityRequest,
  UpdateSubEntityRequest,
} from "../dto/organizationManagementDto";
import { organizationManagementService } from "../services/organizationManagementService";

export const ORGANIZATION_QUERY_KEY = "organization-management";

function invalidateAllOrganizationQueries(queryClient: QueryClient) {
  return Promise.all([
    queryClient.invalidateQueries({
      queryKey: [ORGANIZATION_QUERY_KEY, "business", "search"],
    }),
    queryClient.invalidateQueries({
      queryKey: [ORGANIZATION_QUERY_KEY, "sub", "search"],
    }),
  ]);
}

export function useCreateBusinessEntityMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [ORGANIZATION_QUERY_KEY, "business", "create"],
    mutationFn: (request: CreateBusinessEntityRequest) =>
      organizationManagementService.createBusinessEntity(request),
    onSuccess: async () => {
      await invalidateAllOrganizationQueries(queryClient);
    },
  });
}

export function useUpdateBusinessEntityMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [ORGANIZATION_QUERY_KEY, "business", "update"],
    mutationFn: (request: UpdateBusinessEntityRequest) =>
      organizationManagementService.updateBusinessEntity(request),
    onSuccess: async () => {
      await invalidateAllOrganizationQueries(queryClient);
    },
  });
}

export function useDeleteBusinessEntityMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [ORGANIZATION_QUERY_KEY, "business", "delete"],
    mutationFn: (id: string) =>
      organizationManagementService.deleteBusinessEntity(id),
    onSuccess: async () => {
      await invalidateAllOrganizationQueries(queryClient);
    },
  });
}

export function useCreateSubEntityMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [ORGANIZATION_QUERY_KEY, "sub", "create"],
    mutationFn: (request: CreateSubEntityRequest) =>
      organizationManagementService.createSubEntity(request),
    onSuccess: async () => {
      await invalidateAllOrganizationQueries(queryClient);
    },
  });
}

export function useUpdateSubEntityMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [ORGANIZATION_QUERY_KEY, "sub", "update"],
    mutationFn: (request: UpdateSubEntityRequest) =>
      organizationManagementService.updateSubEntity(request),
    onSuccess: async () => {
      await invalidateAllOrganizationQueries(queryClient);
    },
  });
}

export function useDeleteSubEntityMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [ORGANIZATION_QUERY_KEY, "sub", "delete"],
    mutationFn: (id: string) =>
      organizationManagementService.deleteSubEntity(id),
    onSuccess: async () => {
      await invalidateAllOrganizationQueries(queryClient);
    },
  });
}
