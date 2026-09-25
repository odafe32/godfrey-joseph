import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  ClipboardCheck,
  Sparkles,
  Package,
  BookOpen,
  Wrench,
  Presentation,
  Rocket,
  Bot,
  ShoppingBag,
} from "lucide-react";

export type ProductStatus = "live" | "in-development" | "coming-soon";

export type ProductType = "software" | "ebook" | "course" | "template";

export const productTypeLabels: Record<ProductType, string> = {
  software: "Software",
  ebook: "E-book",
  course: "Course",
  template: "Template",
};

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  type: ProductType;
  status: ProductStatus;
  /** Lucide icon name — resolved via productIcons. */
  iconName: string;
  /** Optional brand logo image — replaces the icon when set. */
  logo?: string;
  /** Optional external link — defaults to /products. */
  link?: string;
  /** Optional price label — e.g. "$9.99", "₦5,000" or "Free". */
  price?: string;
  /** Shown on the homepage teaser section (top 3). */
  featured?: boolean;
}

/** Icons selectable in the admin product form. */
export const productIcons: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  "clipboard-check": ClipboardCheck,
  boxes: Boxes,
  package: Package,
  "book-open": BookOpen,
  wrench: Wrench,
  presentation: Presentation,
  rocket: Rocket,
  bot: Bot,
  "shopping-bag": ShoppingBag,
};

export const getProductIcon = (p: Product): LucideIcon =>
  productIcons[p.iconName] ?? Package;

export const defaultProducts: Product[] = [
  {
    id: "meiyo-ai",
    name: "Meiyo AI",
    tagline: "AI assistant",
    description:
      "An AI assistant for tasks, reminders and reaching your goals — part of my journey of building products of my own.",
    type: "software",
    status: "in-development",
    iconName: "sparkles",
    logo: "https://res.cloudinary.com/dllrkis3c/image/upload/v1790252792/logo-1_bslxar.png",
    featured: true,
  },
  {
    id: "kirocheck",
    name: "Kirocheck",
    tagline: "Checking & verification",
    description:
      "A system for managing checks and verification workflows — built, shipped and in use.",
    type: "software",
    status: "live",
    iconName: "clipboard-check",
    logo: "https://res.cloudinary.com/dllrkis3c/image/upload/v1790253100/kirocheck-icon_fs0fby.svg",
    featured: true,
  },
  {
    id: "inventory-system",
    name: "Inventory System",
    tagline: "Stock & operations",
    description:
      "A complete inventory management system — stock tracking, reporting and day-to-day operations.",
    type: "software",
    status: "live",
    iconName: "boxes",
    featured: true,
  },
];

export const statusStyles: Record<ProductStatus, { label: string; className: string }> = {
  live: {
    label: "Live",
    className:
      "border-green-500/40 bg-green-500/10 text-green-700 dark:text-green-400",
  },
  "in-development": {
    label: "In development",
    className:
      "border-[#d4a017]/40 bg-[#d4a017]/10 text-[#9a6f00] dark:text-[#e9c766]",
  },
  "coming-soon": {
    label: "Coming soon",
    className:
      "border-gray-300 bg-gray-100 text-gray-500 dark:border-white/10 dark:bg-white/5 dark:text-gray-400",
  },
};
