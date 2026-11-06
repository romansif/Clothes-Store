import type { ApiErrorResponse } from "@/shared";

import router from "@/app/router/index";
import { resetCheckoutSession } from "@/entities/checkout-session";

export class ApiError extends Error {
  response?: ApiErrorResponse;

  constructor(error: any, message: string) {
    super(message);

    this.name = "ApiError";
    this.response = error?.response?.data ?? error;
  }
}

const API = import.meta.env.VITE_BASE_API;

const AUTH_ENDPOINTS = [
  "/auth/signUp",
  "/auth/signIn",
  "/auth/google",
  "/auth/send/code",
  "/auth/verify/code",
  "/auth/logout",
  "/refresh",
];
const isAuthEndpoint = (endpoint: string) => AUTH_ENDPOINTS.some((p) => endpoint.startsWith(p));

let refreshing: Promise<boolean> | null = null;

const refreshSession = () => {
  refreshing ??= fetch(`${API}/refresh`, {
    method: "POST",
    credentials: "include",
  })
    .then((r) => r.ok)
    .catch(() => false)
    .finally(() => {
      refreshing = null;
    });
  return refreshing;
};

const logout = async () => {
  localStorage.clear();
  resetCheckoutSession();

  const current = router.currentRoute.value;
  if (current.name !== "signIn") {
    await router.replace({ name: "signIn", query: { redirect: current.fullPath } });
  }
};

export const handler = async <T = any>(endpoints: string, options: RequestInit = {}, retry = false): Promise<T> => {
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API}${endpoints}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (res.status === 401 && !isAuthEndpoint(endpoints)) {
    if (retry || !(await refreshSession())) {
      await logout();
      throw new Error("Session expired, please log in again.");
    }
    return handler<T>(endpoints, options, true);
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const errorMessage = errorData.message || `Ошибка: ${res.status}`;

    throw new ApiError(errorData, errorMessage);
  }

  return res.json();
};
