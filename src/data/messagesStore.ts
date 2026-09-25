import { useSyncExternalStore } from "react";
import type { ContactMessage } from "./messages";
import { api, getToken } from "@/utils/api";

const STORE_KEY = "gj_messages";
const CHANGE_EVENT = "gj_messages_changed";

let cached: ContactMessage[] | null = null;
let fetching = false;

const notify = () => window.dispatchEvent(new Event(CHANGE_EVENT));

function persist(messages: ContactMessage[]) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(messages));
  } catch {
    // Cache still holds the data.
  }
}

export function loadMessages(): ContactMessage[] {
  if (cached) return cached;
  try {
    const raw = localStorage.getItem(STORE_KEY);
    cached = raw ? (JSON.parse(raw) as ContactMessage[]) : [];
  } catch {
    cached = [];
  }
  return cached;
}

/** Fetch messages from the API (admin only — needs a token). */
export async function fetchMessages(): Promise<void> {
  if (fetching || !getToken()) return;
  fetching = true;
  try {
    const res = await api<{ data: ContactMessage[] }>("/messages");
    cached = res.data;
    persist(res.data);
    notify();
  } catch {
    // API offline or unauthorised — local copy stays in use.
  } finally {
    fetching = false;
  }
}

/** Public contact-form submit — POSTs to the API, localStorage fallback. */
export async function addMessage(
  msg: Omit<ContactMessage, "id" | "createdAt" | "read">
): Promise<void> {
  try {
    const res = await api<{ data: ContactMessage }>("/messages", {
      method: "POST",
      body: msg,
    });
    cached = [res.data, ...loadMessages()];
  } catch {
    const message: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
      read: false,
    };
    cached = [message, ...loadMessages()];
  }
  persist(cached);
  notify();
}

export async function markMessageRead(id: string, read: boolean): Promise<void> {
  try {
    const res = await api<{ data: ContactMessage }>(`/messages/${id}`, {
      method: "PUT",
      body: { read },
    });
    cached = loadMessages().map((m) => (m.id === id ? res.data : m));
  } catch {
    cached = loadMessages().map((m) => (m.id === id ? { ...m, read } : m));
  }
  persist(cached);
  notify();
}

/** Sends an email reply via the API and stores it on the thread. Returns the updated message. */
export async function replyToMessage(id: string, reply: string): Promise<ContactMessage> {
  const res = await api<{ data: ContactMessage }>(`/messages/${id}/reply`, {
    method: "POST",
    body: { reply },
  });
  cached = loadMessages().map((m) => (m.id === id ? res.data : m));
  persist(cached);
  notify();
  return res.data;
}

export async function deleteMessage(id: string): Promise<void> {
  try {
    await api(`/messages/${id}`, { method: "DELETE" });
  } catch {
    // Remove locally regardless.
  }
  cached = loadMessages().filter((m) => m.id !== id);
  persist(cached);
  notify();
}

export function saveMessages(messages: ContactMessage[]): boolean {
  cached = messages;
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(messages));
  } catch {
    return false;
  }
  notify();
  return true;
}

function subscribe(callback: () => void) {
  if (!subscribed) {
    subscribed = true;
    void fetchMessages();
  }
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

let subscribed = false;

/** Reactive contact-form messages — fetched from the API when authed. */
export function useMessages(): ContactMessage[] {
  return useSyncExternalStore(subscribe, loadMessages);
}

export function useUnreadCount(): number {
  return useMessages().filter((m) => !m.read).length;
}
