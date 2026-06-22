import { apiClient } from "../../../shared/lib/apiClient";
import type { SearchUsersResponse } from "../dto/userManagementDto";
import type {
  BusinessEntityOption,
  CreateUserAssignmentRequest,
  CreateUserAssignmentResponse,
  DeleteUserAssignmentResponse,
  RoleOption,
  SearchUserAssignmentsRequest,
  SearchUserAssignmentsResponse,
  SubEntityOption,
  UpdateUserAssignmentRequest,
  UpdateUserAssignmentResponse,
  UserOption,
} from "../dto/userAssignmentDto";

type PagedEntityResponse<TItem> = {
  items: TItem[];
  page: number;
  pageSize: number;
  totalCount: number;
};

type RawBusinessEntity = {
  id: string;
  name: string;
  code: string;
};

type RawSubEntity = {
  id: string;
  businessEntityId: string;
  name: string;
  code: string;
};

const USER_ASSIGNMENT_BASE = "/api/user-assignments";

function toSearchParams(request: SearchUserAssignmentsRequest) {
  const params = new URLSearchParams();

  if (request.search?.trim()) {
    params.set("search", request.search.trim());
  }

  if (request.userId) {
    params.set("userId", request.userId);
  }

  if (request.roleId) {
    params.set("roleId", request.roleId);
  }

  if (request.businessEntityId) {
    params.set("businessEntityId", request.businessEntityId);
  }

  if (request.subEntityId) {
    params.set("subEntityId", request.subEntityId);
  }

  if (typeof request.isActive === "boolean") {
    params.set("isActive", String(request.isActive));
  }

  if (request.createdAtFrom) {
    params.set("createdAtFrom", request.createdAtFrom);
  }

  if (request.createdAtTo) {
    params.set("createdAtTo", request.createdAtTo);
  }

  if (request.modifiedAtFrom) {
    params.set("modifiedAtFrom", request.modifiedAtFrom);
  }

  if (request.modifiedAtTo) {
    params.set("modifiedAtTo", request.modifiedAtTo);
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

export const userAssignmentService = {
  searchUserAssignments: async (
    request: SearchUserAssignmentsRequest,
  ): Promise<SearchUserAssignmentsResponse> =>
    apiClient
      .get<SearchUserAssignmentsResponse>(USER_ASSIGNMENT_BASE, {
        params: toSearchParams(request),
      })
      .then((response) => response.data),

  createUserAssignment: async (
    request: CreateUserAssignmentRequest,
  ): Promise<CreateUserAssignmentResponse> =>
    apiClient
      .post<CreateUserAssignmentResponse>(USER_ASSIGNMENT_BASE, request)
      .then((response) => response.data),

  updateUserAssignment: async (
    request: UpdateUserAssignmentRequest,
  ): Promise<UpdateUserAssignmentResponse> =>
    apiClient
      .put<UpdateUserAssignmentResponse>(
        `${USER_ASSIGNMENT_BASE}/${request.id}`,
        request,
      )
      .then((response) => response.data),

  deleteUserAssignment: async (
    id: string,
  ): Promise<DeleteUserAssignmentResponse> =>
    apiClient
      .delete(`${USER_ASSIGNMENT_BASE}/${id}`)
      .then(() => ({ success: true }))
      .catch((error) => {
        if (error?.response?.status === 404) {
          return { success: false };
        }

        throw error;
      }),

  getUserOptions: async (): Promise<UserOption[]> => {
    const response = await apiClient
      .get<SearchUsersResponse>("/api/users", {
        params: {
          page: 1,
          pageSize: 200,
          sortBy: "firstName",
          direction: "asc",
        },
      })
      .then((result) => result.data);

    return response.items.map((item) => ({
      id: item.id,
      displayName: item.fullName,
      email: item.email,
      username: item.username,
    }));
  },

  getBusinessEntityOptions: async (): Promise<BusinessEntityOption[]> => {
    const response = await apiClient
      .get<PagedEntityResponse<RawBusinessEntity>>("/api/business-entities", {
        params: {
          page: 1,
          pageSize: 200,
          sortBy: "name",
          direction: "asc",
        },
      })
      .then((result) => result.data);

    return response.items.map((item) => ({
      id: item.id,
      name: item.name,
      code: item.code,
    }));
  },

  getSubEntityOptions: async (): Promise<SubEntityOption[]> => {
    const response = await apiClient
      .get<PagedEntityResponse<RawSubEntity>>("/api/sub-entities", {
        params: {
          page: 1,
          pageSize: 500,
          sortBy: "name",
          direction: "asc",
        },
      })
      .then((result) => result.data);

    return response.items.map((item) => ({
      id: item.id,
      businessEntityId: item.businessEntityId,
      name: item.name,
      code: item.code,
    }));
  },

  getRoleOptions: async (): Promise<RoleOption[]> => {
    return apiClient
      .get<RoleOption[]>("/api/roles")
      .then((result) => result.data);
  },
};
