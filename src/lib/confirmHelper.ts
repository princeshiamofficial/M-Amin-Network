"use client";

declare global {
  interface Window {
    customConfirm?: (message: string) => Promise<boolean>;
  }
}

/**
 * Custom async confirmation helper that uses our custom design confirmation modal
 * when running in the browser dashboard, falling back to native confirm() if needed.
 */
export async function confirmAction(message: string): Promise<boolean> {
  if (typeof window !== "undefined" && window.customConfirm) {
    return window.customConfirm(message);
  }
  return confirm(message);
}
