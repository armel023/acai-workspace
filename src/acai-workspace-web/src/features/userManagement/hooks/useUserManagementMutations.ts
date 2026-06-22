import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  CreateUserRequest,
  UpdateUserRequest,
} from "../dto/userManagementDto";
import { userManagementService } from "../services/userManagementService";

export const USER_MANAGEMENT_QUERY_KEY = "user-management";

export function useCreateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [USER_MANAGEMENT_QUERY_KEY, "create"],
    mutationFn: (request: CreateUserRequest) =>
      userManagementService.createUser(request),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [USER_MANAGEMENT_QUERY_KEY, "search"],
      });
    },
  });
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [USER_MANAGEMENT_QUERY_KEY, "update"],
    mutationFn: (request: UpdateUserRequest) =>
      userManagementService.updateUser(request),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [USER_MANAGEMENT_QUERY_KEY, "search"],
      });
    },
  });
}

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [USER_MANAGEMENT_QUERY_KEY, "delete"],
    mutationFn: (id: string) => userManagementService.deleteUser(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [USER_MANAGEMENT_QUERY_KEY, "search"],
      });
    },
  });
}
