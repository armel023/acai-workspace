export type SortByCommon = "name" | "code" | "createdAt";
export type SortDirection = "asc" | "desc";

export type BusinessEntityItem = {
  id: string;
  name: string;
  code: string;
  description: string | null;
  createdAt: string | null;
  createdBy: string | null;
  modifiedAt: string | null;
  modifiedBy: string | null;
};

export type SubEntityItem = {
  id: string;
  businessEntityId: string;
  businessEntityName: string;
  name: string;
  code: string;
  description: string | null;
  createdAt: string | null;
  createdBy: string | null;
  modifiedAt: string | null;
  modifiedBy: string | null;
};

export type PagedResponse<TItem> = {
  items: TItem[];
  page: number;
  pageSize: number;
  totalCount: number;
};

export type SearchBusinessEntitiesRequest = {
  search?: string;
  createdAtFrom?: string;
  createdAtTo?: string;
  sortBy?: SortByCommon;
  direction?: SortDirection;
  page: number;
  pageSize: number;
};

export type SearchSubEntitiesRequest = {
  search?: string;
  businessEntityId?: string;
  createdAtFrom?: string;
  createdAtTo?: string;
  sortBy?: SortByCommon;
  direction?: SortDirection;
  page: number;
  pageSize: number;
};

export type CreateBusinessEntityRequest = {
  name: string;
  code: string;
  description?: string;
  createdBy?: string;
};

export type UpdateBusinessEntityRequest = {
  id: string;
  name: string;
  code: string;
  description?: string;
  modifiedBy?: string;
};

export type CreateSubEntityRequest = {
  businessEntityId: string;
  name: string;
  code: string;
  description?: string;
  createdBy?: string;
};

export type UpdateSubEntityRequest = {
  id: string;
  businessEntityId: string;
  name: string;
  code: string;
  description?: string;
  modifiedBy?: string;
};

export type DeleteResult = {
  success: boolean;
};

export type BusinessEntityOption = {
  id: string;
  name: string;
  code: string;
};
