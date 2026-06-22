import { apiClient } from "../../../shared/lib/apiClient";
import type {
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserResponse,
  SearchUsersRequest,
  SearchUsersResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  UserItem,
} from "../dto/userManagementDto";

const USER_MANAGEMENT_BASE = "/api/users";

function toSearchParams(request: SearchUsersRequest) {
  const params = new URLSearchParams();

  if (request.search?.trim()) {
    params.set("search", request.search.trim());
  }

  if (request.createdAtFrom) {
    params.set("createdAtFrom", request.createdAtFrom);
  }

  if (request.createdAtTo) {
    params.set("createdAtTo", request.createdAtTo);
  }

  if (request.sortBy) {
    params.set("sortBy", request.sortBy);
  }

  if (request.direction) {
    params.set("direction", request.direction);
  }

  params.set("page", request.page.toString());
  params.set("pageSize", request.pageSize.toString());

  return params;
}

export const userManagementService = {
  searchUsers: async (
    request: SearchUsersRequest,
  ): Promise<SearchUsersResponse> =>
    apiClient
      .get<SearchUsersResponse>(USER_MANAGEMENT_BASE, {
        params: toSearchParams(request),
      })
      .then((response) => response.data),

  getUserById: async (id: string): Promise<UserItem> =>
    apiClient
      .get<UserItem>(`${USER_MANAGEMENT_BASE}/${id}`)
      .then((response) => response.data),

  createUser: async (request: CreateUserRequest): Promise<CreateUserResponse> =>
    apiClient
      .post<CreateUserResponse>(USER_MANAGEMENT_BASE, request)
      .then((response) => response.data),

  updateUser: async (request: UpdateUserRequest): Promise<UpdateUserResponse> =>
    apiClient
      .put<UpdateUserResponse>(`${USER_MANAGEMENT_BASE}/${request.id}`, request)
      .then((response) => response.data),

  deleteUser: async (id: string): Promise<DeleteUserResponse> =>
    apiClient
      .delete(`${USER_MANAGEMENT_BASE}/${id}`)
      .then(() => ({ success: true }))
      .catch((error) => {
        if (error?.response?.status === 404) {
          return { success: false };
        }

        throw error;
      }),
};
