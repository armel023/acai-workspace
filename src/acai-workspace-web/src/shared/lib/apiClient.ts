import axios from "axios";
import type {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() || "http://localhost:5215";

const ACCESS_TOKEN_KEY = "acai_access_token";

function onRequest(config: InternalAxiosRequestConfig) {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}

function onResponse(response: AxiosResponse) {
  return response;
}

function onResponseError(error: AxiosError) {
  if (error.response?.status === 401) {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  return Promise.reject(error);
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(onRequest);
apiClient.interceptors.response.use(onResponse, onResponseError);

export function setAccessToken(token: string | null) {
  if (!token) {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    return;
  }

  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | { title?: string; detail?: string; message?: string }
      | undefined;

    return (
      data?.message ||
      data?.detail ||
      data?.title ||
      error.message ||
      "Request failed. Please try again."
    );
  }

  return "Request failed. Please try again.";
}
