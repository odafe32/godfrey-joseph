import { useSyncExternalStore } from "react";
import { defaultProfile, type Profile } from "./profile";
import { api, getToken } from "@/utils/api";

const STORE_KEY = "gj_profile";
const CHANGE_EVENT = "gj_profile_changed";

let cached: Profile | null = null;
let fetching = false;

const notify = () => window.dispatchEvent(new Event(CHANGE_EVENT));

function persist(profile: Profile) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(profile));
  } catch {
    // Cache still holds the data.
  }
}

export function loadProfile(): Profile {
  if (cached) return cached;
  try {
    const raw = localStorage.getItem(STORE_KEY);
    cached = raw ? { ...defaultProfile, ...(JSON.parse(raw) as Partial<Profile>) } : defaultProfile;
  } catch {
    cached = defaultProfile;
  }
  return cached;
}

/** Fetch fresh profile from the API. */
export async function fetchProfile(): Promise<void> {
  if (fetching) return;
  fetching = true;
  try {
    cached = { ...defaultProfile, ...(await api<Partial<Profile>>("/profile")) };
    persist(cached);
    notify();
  } catch {
    // API offline — cached/localStorage data stays in use.
  } finally {
    fetching = false;
  }
}

/** Save profile — PUTs to the API when authed, localStorage otherwise. */
export async function saveProfile(profile: Profile): Promise<boolean> {
  cached = profile;
  persist(profile);
  notify();
  if (getToken()) {
    try {
      await api<Profile>("/profile", { method: "PUT", body: profile });
    } catch {
      return false;
    }
  }
  return true;
}

export function resetProfile() {
  cached = defaultProfile;
  localStorage.removeItem(STORE_KEY);
  notify();
}

function subscribe(callback: () => void) {
  if (!subscribed) {
    subscribed = true;
    void fetchProfile();
  }
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

let subscribed = false;

/** Reactive profile — fetched from the API on first subscribe. */
export function useProfile(): Profile {
  return useSyncExternalStore(subscribe, loadProfile);
}
