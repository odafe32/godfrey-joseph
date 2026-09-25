const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api";
const TOKEN_KEY = "gj_admin_token";
const AUTH_KEY = "gj_admin_auth";
export const AUTH_EVENT = "gj_auth_changed";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export const notifyAuthChanged = () => window.dispatchEvent(new Event(AUTH_EVENT));

/** Drop the local session (token + flag) and notify listeners. */
export function clearSession() {
  clearToken();
  localStorage.removeItem(AUTH_KEY);
  notifyAuthChanged();
}

interface ApiOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  formData?: FormData;
}

/** Fetch wrapper for the Laravel API. Attaches the admin token when present. */
export async function api<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const headers: Record<string, string> = { Accept: "application/json" };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (options.body !== undefined) headers["Content-Type"] = "application/json";

  const res = await fetch(`${API_BASE}${path}`, {
    method: options.method ?? "GET",
    headers,
    body: options.formData ?? (options.body !== undefined ? JSON.stringify(options.body) : undefined),
  });

  // Expired/revoked token on an authed call → drop the session globally.
  if (res.status === 401 && token) {
    clearSession();
  }

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    const message =
      data?.message ??
      (data?.errors ? Object.values<string[]>(data.errors).flat()[0] : null) ??
      `Request failed (${res.status})`;
    throw new ApiError(message, res.status, data?.errors);
  }

  return res.json() as Promise<T>;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: Record<string, string[]>
  ) {
    super(message);
  }
}
