import { useSyncExternalStore } from "react";
import { defaultWorks, type Work } from "./works";
import { api } from "@/utils/api";

const STORE_KEY = "gj_works";
const CHANGE_EVENT = "gj_works_changed";

let cached: Work[] | null = null;
let fetching = false;

const notify = () => window.dispatchEvent(new Event(CHANGE_EVENT));

function persist(works: Work[]) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(works));
  } catch {
    // localStorage full (large data URLs) — cache still holds the data.
  }
}

export function loadWorks(): Work[] {
  if (cached) return cached;
  try {
    const raw = localStorage.getItem(STORE_KEY);
    cached = raw ? (JSON.parse(raw) as Work[]) : defaultWorks;
  } catch {
    cached = defaultWorks;
  }
  return cached;
}

/** Fetch fresh works from the API — updates the cache + notifies subscribers. */
export async function fetchWorks(): Promise<void> {
  if (fetching) return;
  fetching = true;
  try {
    const res = await api<{ data: Work[] }>("/works");
    cached = res.data;
    persist(res.data);
    notify();
  } catch {
    // API offline — cached/localStorage data stays in use.
  } finally {
    fetching = false;
  }
}

export async function createWork(work: Omit<Work, "id"> & { id?: string }): Promise<Work> {
  const res = await api<{ data: Work }>("/works", { method: "POST", body: work });
  cached = [...loadWorks(), res.data];
  persist(cached);
  notify();
  return res.data;
}

export async function updateWork(id: string, work: Partial<Work>): Promise<Work> {
  const res = await api<{ data: Work }>(`/works/${id}`, { method: "PUT", body: work });
  cached = loadWorks().map((w) => (w.id === id ? res.data : w));
  persist(cached);
  notify();
  return res.data;
}

export async function removeWork(id: string): Promise<void> {
  await api(`/works/${id}`, { method: "DELETE" });
  cached = loadWorks().filter((w) => w.id !== id);
  persist(cached);
  notify();
}

/** Local-only write — used as an offline fallback by the admin UI. */
export function saveWorks(works: Work[]): boolean {
  cached = works;
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(works));
  } catch {
    return false;
  }
  notify();
  return true;
}

export function resetWorks() {
  cached = defaultWorks;
  localStorage.removeItem(STORE_KEY);
  notify();
}

function subscribe(callback: () => void) {
  if (!subscribed) {
    subscribed = true;
    void fetchWorks();
  }
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

let subscribed = false;

/** Reactive works — fetched from the API on first subscribe, admin edits reflect live. */
export function useWorks(): Work[] {
  return useSyncExternalStore(subscribe, loadWorks);
}
