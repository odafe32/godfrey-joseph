import { useSyncExternalStore } from "react";
import { defaultSettings, type SiteSettings } from "./settings";
import { api, getToken } from "@/utils/api";

const STORE_KEY = "gj_settings";
const CHANGE_EVENT = "gj_settings_changed";

let cached: SiteSettings | null = null;
let fetching = false;

const notify = () => window.dispatchEvent(new Event(CHANGE_EVENT));

function persist(settings: SiteSettings) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(settings));
  } catch {
    // Cache still holds the data.
  }
}

function merge(partial: Partial<SiteSettings> | null): SiteSettings {
  return partial
    ? { ...defaultSettings, ...partial, socials: { ...defaultSettings.socials, ...partial.socials } }
    : defaultSettings;
}

export function loadSettings(): SiteSettings {
  if (cached) return cached;
  try {
    const raw = localStorage.getItem(STORE_KEY);
    cached = merge(raw ? (JSON.parse(raw) as Partial<SiteSettings>) : null);
  } catch {
    cached = defaultSettings;
  }
  return cached;
}

/** Fetch fresh settings from the API. */
export async function fetchSettings(): Promise<void> {
  if (fetching) return;
  fetching = true;
  try {
    cached = merge(await api<SiteSettings>("/settings"));
    persist(cached);
    notify();
  } catch {
    // API offline — cached/localStorage data stays in use.
  } finally {
    fetching = false;
  }
}

/** Save settings — PUTs to the API when authed, localStorage otherwise. */
export async function saveSettings(settings: SiteSettings): Promise<boolean> {
  cached = settings;
  persist(settings);
  notify();
  if (getToken()) {
    try {
      await api<SiteSettings>("/settings", { method: "PUT", body: settings });
    } catch {
      return false;
    }
  }
  return true;
}

export function resetSettings() {
  cached = defaultSettings;
  localStorage.removeItem(STORE_KEY);
  notify();
}

function subscribe(callback: () => void) {
  if (!subscribed) {
    subscribed = true;
    void fetchSettings();
  }
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

let subscribed = false;

/** Reactive site settings — fetched from the API on first subscribe. */
export function useSettings(): SiteSettings {
  return useSyncExternalStore(subscribe, loadSettings);
}
