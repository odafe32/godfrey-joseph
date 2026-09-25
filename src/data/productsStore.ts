import { useSyncExternalStore } from "react";
import { defaultProducts, type Product } from "./products";
import { api } from "@/utils/api";

const STORE_KEY = "gj_products";
const CHANGE_EVENT = "gj_products_changed";

let cached: Product[] | null = null;
let fetching = false;

const notify = () => window.dispatchEvent(new Event(CHANGE_EVENT));

function persist(products: Product[]) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(products));
  } catch {
    // localStorage full (large data URLs) — cache still holds the data.
  }
}

export function loadProducts(): Product[] {
  if (cached) return cached;
  try {
    const raw = localStorage.getItem(STORE_KEY);
    const parsed = raw ? (JSON.parse(raw) as Product[]) : defaultProducts;
    // Migrate entries saved before `type` existed
    cached = parsed.map((p) => ({ ...p, type: p.type ?? "software" }));
  } catch {
    cached = defaultProducts;
  }
  return cached;
}

/** Fetch fresh products from the API — updates the cache + notifies subscribers. */
export async function fetchProducts(): Promise<void> {
  if (fetching) return;
  fetching = true;
  try {
    const res = await api<{ data: Product[] }>("/products");
    cached = res.data;
    persist(res.data);
    notify();
  } catch {
    // API offline — cached/localStorage data stays in use.
  } finally {
    fetching = false;
  }
}

export async function createProduct(product: Omit<Product, "id"> & { id?: string }): Promise<Product> {
  const res = await api<{ data: Product }>("/products", { method: "POST", body: product });
  cached = [...loadProducts(), res.data];
  persist(cached);
  notify();
  return res.data;
}

export async function updateProduct(id: string, product: Partial<Product>): Promise<Product> {
  const res = await api<{ data: Product }>(`/products/${id}`, { method: "PUT", body: product });
  cached = loadProducts().map((p) => (p.id === id ? res.data : p));
  persist(cached);
  notify();
  return res.data;
}

export async function removeProduct(id: string): Promise<void> {
  await api(`/products/${id}`, { method: "DELETE" });
  cached = loadProducts().filter((p) => p.id !== id);
  persist(cached);
  notify();
}

/** Local-only write — used as an offline fallback by the admin UI. */
export function saveProducts(products: Product[]): boolean {
  cached = products;
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(products));
  } catch {
    return false;
  }
  notify();
  return true;
}

export function resetProducts() {
  cached = defaultProducts;
  localStorage.removeItem(STORE_KEY);
  notify();
}

function subscribe(callback: () => void) {
  if (!subscribed) {
    subscribed = true;
    void fetchProducts();
  }
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

let subscribed = false;

/** Reactive products — fetched from the API on first subscribe, admin edits reflect live. */
export function useProducts(): Product[] {
  return useSyncExternalStore(subscribe, loadProducts);
}
