export type Mode = "light" | "dark";

// Dark is the default (set on <html> in index.html); a saved "light" is applied there before first paint.
const STORAGE_KEY = "mode";
const THEME_COLORS: Record<Mode, string> = { light: "#fff8fb", dark: "#1c1520" };

const listeners = new Set<() => void>();

export function getMode(): Mode {
  return document.documentElement.dataset.mode === "light" ? "light" : "dark";
}

export function subscribeToMode(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setMode(mode: Mode) {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // Private windows can block storage; the choice still applies to this visit.
  }
  const apply = () => {
    document.documentElement.dataset.mode = mode;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[mode]);
    listeners.forEach((listener) => listener());
  };
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (document.startViewTransition && !reduced) document.startViewTransition(apply);
  else apply();
}
