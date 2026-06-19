import { apiClient } from "../../../shared/lib/apiClient";
import type {
  CurrentUserResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../dto/authDto";

export const authService = {
  login: async (request: LoginRequest): Promise<LoginResponse> =>
    apiClient
      .post<LoginResponse>("/api/auth/login", request)
      .then((r) => r.data)
      .catch((error) => {
        console.error("Error logging in:", error);
        throw error;
      }),

  register: async (request: RegisterRequest): Promise<RegisterResponse> =>
    apiClient
      .post<RegisterResponse>("/api/auth/register", request)
      .then((r) => r.data)
      .catch((error) => {
        console.error("Error registering user:", error);
        throw error;
      }),

  getCurrentUser: async (): Promise<CurrentUserResponse> =>
    apiClient
      .get<CurrentUserResponse>("/api/auth/me")
      .then((r) => r.data)
      .catch((error) => {
        console.error("Error fetching current user:", error);
        throw error;
      }),
};
