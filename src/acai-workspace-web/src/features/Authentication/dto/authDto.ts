export type LoginRequest = {
  email: string;
  password: string;
  useCookie: boolean;
};

export type LoginResponse = {
  accessToken: string;
  accessTokenExpiresAtUtc: string;
  refreshToken: string;
  refreshTokenExpiresAtUtc: string;
  userId: string;
  userName: string;
  email: string;
};

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  userId: string;
  fullName: string;
  email: string;
  userName: string;
  createdAtUtc: string;
};

export type CurrentUserResponse = {
  userId: string;
  userName: string;
  email: string;
  roles: string[];
  permissions: string[];
};
