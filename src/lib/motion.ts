import { useReducedMotion } from "framer-motion";
import { useEffect, useSyncExternalStore, type PointerEvent } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

function subscribeToPointer(onChange: () => void) {
  const query = window.matchMedia(FINE_POINTER);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

// Pointer-driven effects only run with a real mouse and when motion is allowed.
export function useInteractive() {
  const reduced = useReducedMotion();
  const fine = useSyncExternalStore(subscribeToPointer, () => window.matchMedia(FINE_POINTER).matches);
  return fine && !reduced;
}

// Fills the gap left by the disappearing scrollbar so the page doesn't jump.
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const { style } = document.body;
    style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    style.overflow = "hidden";
    return () => {
      style.paddingRight = "";
      style.overflow = "";
    };
  }, [active]);
}

// Moves the spotlight of the grid cell under the pointer.
export function trackCellSpot(event: PointerEvent<HTMLElement>) {
  const cell = (event.target as Element).closest<HTMLElement>(".grid-cell");
  if (!cell) return;
  const rect = cell.getBoundingClientRect();
  cell.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
  cell.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
}
