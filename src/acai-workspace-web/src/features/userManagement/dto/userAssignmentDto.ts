export type SortDirection = "asc" | "desc";

export type UserAssignmentSortBy =
  | "userDisplayName"
  | "userEmail"
  | "userName"
  | "role"
  | "businessEntityName"
  | "subEntityName"
  | "modifiedAt"
  | "createdAt";

export type UserAssignmentItem = {
  id: string;
  userId: string;
  userDisplayName: string;
  userEmail: string;
  userName: string;
  roleId: string;
  role: string;
  businessEntityId: string | null;
  businessEntityName: string | null;
  subEntityId: string | null;
  subEntityName: string | null;
  isActive: boolean;
  createdAt: string | null;
  createdBy: string | null;
  modifiedAt: string | null;
  modifiedBy: string | null;
};

export type SearchUserAssignmentsRequest = {
  search?: string;
  userId?: string;
  roleId?: string;
  businessEntityId?: string;
  subEntityId?: string;
  isActive?: boolean;
  createdAtFrom?: string;
  createdAtTo?: string;
  modifiedAtFrom?: string;
  modifiedAtTo?: string;
  sortBy?: UserAssignmentSortBy;
  direction?: SortDirection;
  page: number;
  pageSize: number;
};

export type SearchUserAssignmentsResponse = {
  items: UserAssignmentItem[];
  page: number;
  pageSize: number;
  totalCount: number;
};

export type CreateUserAssignmentRequest = {
  userId: string;
  businessEntityId?: string;
  subEntityId?: string;
  roleId: string;
  isActive?: boolean;
  createdBy?: string;
};

export type CreateUserAssignmentResponse = {
  id: string;
  userId: string;
  userDisplayName: string;
  userEmail: string;
  userName: string;
  businessEntityId: string | null;
  businessEntityName: string | null;
  subEntityId: string | null;
  subEntityName: string | null;
  roleId: string;
  role: string;
  isActive: boolean;
  createdAt: string | null;
  createdBy: string | null;
};

export type UpdateUserAssignmentRequest = {
  id: string;
  userId: string;
  businessEntityId?: string;
  subEntityId?: string;
  roleId: string;
  isActive: boolean;
  modifiedBy?: string;
};

export type UpdateUserAssignmentResponse = {
  id: string;
  userId: string;
  userDisplayName: string;
  userEmail: string;
  userName: string;
  businessEntityId: string | null;
  businessEntityName: string | null;
  subEntityId: string | null;
  subEntityName: string | null;
  roleId: string;
  role: string;
  isActive: boolean;
  modifiedAt: string | null;
  modifiedBy: string | null;
};

export type DeleteUserAssignmentResponse = {
  success: boolean;
};

export type UserOption = {
  id: string;
  displayName: string;
  email: string;
  username: string;
};

export type RoleOption = {
  id: string;
  name: string;
};

export type BusinessEntityOption = {
  id: string;
  name: string;
  code: string;
};

export type SubEntityOption = {
  id: string;
  businessEntityId: string;
  name: string;
  code: string;
};
