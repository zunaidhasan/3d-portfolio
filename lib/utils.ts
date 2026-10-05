import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Validates and sanitizes URLs to prevent XSS via javascript: or data: protocols.
 * Only permits http:, https:, mailto:, tel:, or relative paths.
 */
export function sanitizeUrl(url: string | undefined | null): string {
  if (!url) return "#";
  const trimmed = url.trim();
  if (trimmed.startsWith("/") || /^https?:\/\//i.test(trimmed) || /^mailto:/i.test(trimmed) || /^tel:/i.test(trimmed)) {
    return trimmed;
  }
  return "#";
}
