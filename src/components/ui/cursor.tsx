import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useInteractive } from "@/lib/motion";

const SPRING = { stiffness: 500, damping: 40, mass: 0.5 };

// A dot that follows the mouse. It grows over links, and elements with a
// data-cursor attribute turn it into a small label.
export function Cursor() {
  const interactive = useInteractive();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);
  const [state, setState] = useState({ visible: false, link: false, label: "" });

  useEffect(() => {
    if (!interactive) return;
    const describe = (target: EventTarget | null) => {
      const element = target instanceof Element ? target : null;
      const link = Boolean(element?.closest("a, button"));
      const label = element?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor ?? "";
      setState((current) => (
        current.visible && current.link === link && current.label === label
          ? current
          : { visible: true, link, label }
      ));
    };
    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      describe(event.target);
    };
    // A click or a scroll can swap what sits under a mouse that hasn't moved.
    let refreshTimer = 0;
    const refresh = () => {
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => describe(document.elementFromPoint(x.get(), y.get())), 60);
    };
    const onLeave = () => setState((current) => ({ ...current, visible: false }));
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("click", refresh);
    window.addEventListener("scroll", refresh, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("click", refresh);
      window.removeEventListener("scroll", refresh);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [interactive, x, y]);

  if (!interactive) return null;

  const modifier = state.label ? "has-label" : state.link ? "is-link" : "";
  return (
    <motion.div className="cursor" style={{ x: springX, y: springY, opacity: state.visible ? 1 : 0 }} aria-hidden>
      <div className={`cursor-dot ${modifier}`}>{state.label}</div>
    </motion.div>
  );
}
