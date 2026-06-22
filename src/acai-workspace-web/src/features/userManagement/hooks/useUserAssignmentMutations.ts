import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  CreateUserAssignmentRequest,
  UpdateUserAssignmentRequest,
} from "../dto/userAssignmentDto";
import { userAssignmentService } from "../services/userAssignmentService";

export const USER_ASSIGNMENT_QUERY_KEY = "user-assignment-management";

function invalidateUserAssignmentQueries(queryClient: QueryClient) {
  return Promise.all([
    queryClient.invalidateQueries({
      queryKey: [USER_ASSIGNMENT_QUERY_KEY, "search"],
    }),
    queryClient.invalidateQueries({
      queryKey: [USER_ASSIGNMENT_QUERY_KEY, "options", "roles"],
    }),
  ]);
}

export function useCreateUserAssignmentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [USER_ASSIGNMENT_QUERY_KEY, "create"],
    mutationFn: (request: CreateUserAssignmentRequest) =>
      userAssignmentService.createUserAssignment(request),
    onSuccess: async () => {
      await invalidateUserAssignmentQueries(queryClient);
    },
  });
}

export function useUpdateUserAssignmentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [USER_ASSIGNMENT_QUERY_KEY, "update"],
    mutationFn: (request: UpdateUserAssignmentRequest) =>
      userAssignmentService.updateUserAssignment(request),
    onSuccess: async () => {
      await invalidateUserAssignmentQueries(queryClient);
    },
  });
}

export function useDeleteUserAssignmentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [USER_ASSIGNMENT_QUERY_KEY, "delete"],
    mutationFn: (id: string) => userAssignmentService.deleteUserAssignment(id),
    onSuccess: async () => {
      await invalidateUserAssignmentQueries(queryClient);
    },
  });
}
