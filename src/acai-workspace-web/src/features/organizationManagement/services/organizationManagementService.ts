import { apiClient } from "../../../shared/lib/apiClient";
import type {
  BusinessEntityItem,
  BusinessEntityOption,
  CreateBusinessEntityRequest,
  CreateSubEntityRequest,
  DeleteResult,
  PagedResponse,
  SearchBusinessEntitiesRequest,
  SearchSubEntitiesRequest,
  SubEntityItem,
  UpdateBusinessEntityRequest,
  UpdateSubEntityRequest,
} from "../dto/organizationManagementDto";

const BUSINESS_ENTITY_BASE = "/api/business-entities";
const SUB_ENTITY_BASE = "/api/sub-entities";

function appendCommonParams(
  params: URLSearchParams,
  request: {
    search?: string;
    createdAtFrom?: string;
    createdAtTo?: string;
    sortBy?: string;
    direction?: string;
    page: number;
    pageSize: number;
  },
) {
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
}

function toBusinessEntitySearchParams(request: SearchBusinessEntitiesRequest) {
  const params = new URLSearchParams();
  appendCommonParams(params, request);
  return params;
}

function toSubEntitySearchParams(request: SearchSubEntitiesRequest) {
  const params = new URLSearchParams();
  appendCommonParams(params, request);

  if (request.businessEntityId) {
    params.set("businessEntityId", request.businessEntityId);
  }

  return params;
}

export const organizationManagementService = {
  searchBusinessEntities: async (
    request: SearchBusinessEntitiesRequest,
  ): Promise<PagedResponse<BusinessEntityItem>> =>
    apiClient
      .get<PagedResponse<BusinessEntityItem>>(BUSINESS_ENTITY_BASE, {
        params: toBusinessEntitySearchParams(request),
      })
      .then((response) => response.data),

  createBusinessEntity: async (
    request: CreateBusinessEntityRequest,
  ): Promise<BusinessEntityItem> =>
    apiClient
      .post<BusinessEntityItem>(BUSINESS_ENTITY_BASE, request)
      .then((response) => response.data),

  updateBusinessEntity: async (
    request: UpdateBusinessEntityRequest,
  ): Promise<BusinessEntityItem> =>
    apiClient
      .put<BusinessEntityItem>(`${BUSINESS_ENTITY_BASE}/${request.id}`, request)
      .then((response) => response.data),

  deleteBusinessEntity: async (id: string): Promise<DeleteResult> =>
    apiClient
      .delete(`${BUSINESS_ENTITY_BASE}/${id}`)
      .then(() => ({ success: true }))
      .catch((error) => {
        if (error?.response?.status === 404) {
          return { success: false };
        }

        throw error;
      }),

  searchSubEntities: async (
    request: SearchSubEntitiesRequest,
  ): Promise<PagedResponse<SubEntityItem>> =>
    apiClient
      .get<PagedResponse<SubEntityItem>>(SUB_ENTITY_BASE, {
        params: toSubEntitySearchParams(request),
      })
      .then((response) => response.data),

  createSubEntity: async (
    request: CreateSubEntityRequest,
  ): Promise<SubEntityItem> =>
    apiClient
      .post<SubEntityItem>(SUB_ENTITY_BASE, request)
      .then((response) => response.data),

  updateSubEntity: async (
    request: UpdateSubEntityRequest,
  ): Promise<SubEntityItem> =>
    apiClient
      .put<SubEntityItem>(`${SUB_ENTITY_BASE}/${request.id}`, request)
      .then((response) => response.data),

  deleteSubEntity: async (id: string): Promise<DeleteResult> =>
    apiClient
      .delete(`${SUB_ENTITY_BASE}/${id}`)
      .then(() => ({ success: true }))
      .catch((error) => {
        if (error?.response?.status === 404) {
          return { success: false };
        }

        throw error;
      }),

  getBusinessEntityOptions: async (): Promise<BusinessEntityOption[]> => {
    const result = await apiClient
      .get<PagedResponse<BusinessEntityItem>>(BUSINESS_ENTITY_BASE, {
        params: {
          page: 1,
          pageSize: 200,
          sortBy: "name",
          direction: "asc",
        },
      })
      .then((response) => response.data);

    return result.items.map((item) => ({
      id: item.id,
      name: item.name,
      code: item.code,
    }));
  },
};
