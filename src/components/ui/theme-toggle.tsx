import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { getMode, setMode, subscribeToMode } from "@/lib/theme";

export function ThemeToggle({ className, size = 16 }: { className?: string; size?: number }) {
  const mode = useSyncExternalStore(subscribeToMode, getMode);
  const next = mode === "dark" ? "light" : "dark";

  return (
    <button type="button" className={className} aria-label={`Switch to ${next} mode`} onClick={() => setMode(next)}>
      {mode === "dark" ? <Sun size={size} /> : <Moon size={size} />}
    </button>
  );
}
