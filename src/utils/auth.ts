import { useSyncExternalStore } from "react";
import {
  api,
  ApiError,
  AUTH_EVENT,
  clearSession,
  getToken,
  notifyAuthChanged,
  setToken,
} from "./api";

const AUTH_KEY = "gj_admin_auth";
const SESSION_CHECK_INTERVAL = 60 * 60 * 1000; // 1 hour

interface LoginResponse {
  token: string;
  user: { id: number; name: string; email: string };
}

/** Admin auth — Sanctum bearer token stored locally. */
export const auth = {
  async login(email: string, password: string): Promise<void> {
    const res = await api<LoginResponse>("/login", {
      method: "POST",
      body: { email, password },
    });
    setToken(res.token);
    localStorage.setItem(AUTH_KEY, "1");
    notifyAuthChanged();
  },

  async logout(): Promise<void> {
    try {
      await api("/logout", { method: "POST" });
    } catch {
      // Token may already be invalid — clear locally regardless.
    }
    clearSession();
  },

  isAuthed() {
    return localStorage.getItem(AUTH_KEY) === "1" && !!getToken();
  },
};

/**
 * Verify the stored token is still valid against the API.
 * A 401 kills the session; a network failure keeps it (offline tolerance).
 */
export async function checkSession(): Promise<boolean> {
  if (!auth.isAuthed()) return false;
  try {
    await api("/user");
    return true;
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      await auth.logout();
      return false;
    }
    return true;
  }
}

let watcherStarted = false;

/** Hourly session validation — drops the session if the token stops working. */
export function startSessionWatch(intervalMs = SESSION_CHECK_INTERVAL) {
  if (watcherStarted) return;
  watcherStarted = true;
  void checkSession();
  window.setInterval(() => {
    void checkSession();
  }, intervalMs);
}

function subscribeAuth(callback: () => void) {
  window.addEventListener(AUTH_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(AUTH_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/** Reactive auth state — re-renders on login/logout/token expiry. */
export function useIsAuthed(): boolean {
  return useSyncExternalStore(subscribeAuth, () => auth.isAuthed());
}
