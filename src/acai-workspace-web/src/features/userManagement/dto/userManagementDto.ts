export type UserItem = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  username: string;
  createdAt: string | null;
  createdBy: string | null;
  modifiedAt: string | null;
  modifiedBy: string | null;
};

export type SearchUsersRequest = {
  search?: string;
  createdAtFrom?: string;
  createdAtTo?: string;
  sortBy?: "firstName" | "lastName" | "createdAt";
  direction?: "asc" | "desc";
  page: number;
  pageSize: number;
};

export type SearchUsersResponse = {
  items: UserItem[];
  page: number;
  pageSize: number;
  totalCount: number;
};

export type CreateUserRequest = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  createdBy?: string;
};

export type CreateUserResponse = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  username: string;
  createdAt: string | null;
  createdBy: string | null;
};

export type UpdateUserRequest = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  modifiedBy?: string;
};

export type UpdateUserResponse = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  username: string;
  modifiedAt: string | null;
  modifiedBy: string | null;
};

export type DeleteUserResponse = {
  success: boolean;
};
